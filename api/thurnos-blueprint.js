import { generateBlueprintDraft } from '../src/server/thurnosBlueprint.js';

function sendJson(response, statusCode, body) {
  response.statusCode = statusCode;
  response.setHeader('Content-Type', 'application/json');
  response.end(JSON.stringify(body));
}

function getPayload(request) {
  if (typeof request.body === 'string') {
    return JSON.parse(request.body);
  }

  return request.body || {};
}

function getBuildoutRequestId(body) {
  return (
    body.buildout_request_id ||
    body.buildoutRequestId ||
    body.request_id ||
    body.saved_request?.id ||
    body.savedRequest?.id ||
    body.buildout_request?.id ||
    body.buildoutRequest?.id
  );
}

function getIntakePayload(body) {
  return body.intake_payload || body.intakePayload || body.payload || body.body || body;
}

function getSupabaseConfig() {
  return {
    url: process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL,
    elevatedKey: process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY,
  };
}

function supabaseHeaders(elevatedKey, prefer = 'return=representation') {
  return {
    apikey: elevatedKey,
    Authorization: `Bearer ${elevatedKey}`,
    'Content-Type': 'application/json',
    Prefer: prefer,
  };
}

async function supabaseRequest(path, options) {
  const { url, elevatedKey } = getSupabaseConfig();

  if (!url || !elevatedKey) {
    throw new Error('Supabase elevated-key persistence is not configured.');
  }

  const supabaseResponse = await fetch(`${url}/rest/v1/${path}`, {
    ...options,
    headers: {
      ...supabaseHeaders(elevatedKey, options.prefer),
      ...(options.headers || {}),
    },
  });

  if (!supabaseResponse.ok) {
    const detail = await supabaseResponse.text();
    throw new Error(`Supabase ${path} failed: ${supabaseResponse.status} ${detail}`);
  }

  if (options.prefer === 'return=minimal' || supabaseResponse.status === 204) {
    return null;
  }

  return supabaseResponse.json();
}

async function insertRow(table, row) {
  const rows = await supabaseRequest(table, {
    method: 'POST',
    body: JSON.stringify(row),
  });

  return Array.isArray(rows) ? rows[0] : null;
}

async function insertRows(table, rows) {
  if (rows.length === 0) {
    return [];
  }

  const savedRows = await supabaseRequest(table, {
    method: 'POST',
    body: JSON.stringify(rows),
  });

  return Array.isArray(savedRows) ? savedRows : [];
}

const reviewTask = {
  title: 'Review and approve blueprint draft',
  description:
    'Operator must review the generated blueprint, edit any weak claims, and approve the next action before the report is sent externally.',
  status: 'needs_review',
  priority: 'high',
  assigned_agent: 'Operator Agent',
};

function getManualReviewEnabled(body) {
  return body.manual_review !== false && body.manualReview !== false;
}

async function updateBuildoutRequest(buildoutRequestId, status) {
  await supabaseRequest(`buildout_requests?id=eq.${encodeURIComponent(buildoutRequestId)}`, {
    method: 'PATCH',
    prefer: 'return=minimal',
    body: JSON.stringify({
      status,
      updated_at: new Date().toISOString(),
    }),
  });
}

async function updateBuildoutCrm(buildoutRequestId, row) {
  await supabaseRequest(`buildout_requests?id=eq.${encodeURIComponent(buildoutRequestId)}`, {
    method: 'PATCH',
    prefer: 'return=minimal',
    body: JSON.stringify({
      ...row,
      last_activity_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }),
  }).catch(() => null);
}

async function persistBlueprintDraft({ buildoutRequestId, draft, payload, manualReviewEnabled }) {
  const starterSystem = await insertRow('systems', {
    buildout_request_id: buildoutRequestId,
    name: draft.starter_system.name,
    type: draft.starter_system.type,
    status: manualReviewEnabled ? 'review' : 'building',
    location: payload?.intake?.location,
    current_mission: draft.starter_system.current_mission,
    next_move: draft.starter_system.next_move,
    build_progress: 10,
  });

  const report = await insertRow('generated_reports', {
    buildout_request_id: buildoutRequestId,
    system_id: starterSystem?.id,
    report_type: draft.report_type,
    title: draft.title,
    report_status: manualReviewEnabled ? 'needs_review' : 'draft',
    summary: draft.summary,
    sections: draft.sections,
    created_by_agent: draft.created_by_agent,
  });

  const launchTasks = manualReviewEnabled
    ? [reviewTask, ...draft.launch_tasks].slice(0, 10)
    : draft.launch_tasks;
  const tasks = await insertRows(
    'tasks',
    launchTasks.map((task) => ({
      system_id: starterSystem?.id,
      title: task.title,
      description: task.description,
      status: task.status || 'open',
      priority: task.priority,
      assigned_agent: task.assigned_agent,
    })),
  );

  const activityEvents = manualReviewEnabled
    ? [
        ...draft.activity_log,
        {
          agent_name: 'CRM Agent',
          action_type: 'crm_tag_applied',
          summary: 'Lead tagged: blueprint-needs-review, report-draft-ready',
          status: 'completed',
        },
        {
          agent_name: 'Operator Agent',
          action_type: 'manual_review_required',
          summary: 'Blueprint draft is ready for operator review before any external delivery.',
          status: 'needs_review',
        },
      ]
    : draft.activity_log;
  const activityLogs = await insertRows(
    'activity_logs',
    activityEvents.map((event) => ({
      system_id: starterSystem?.id,
      buildout_request_id: buildoutRequestId,
      agent_name: event.agent_name,
      action_type: event.action_type,
      summary: event.summary,
      status: event.status,
    })),
  );

  await updateBuildoutRequest(buildoutRequestId, manualReviewEnabled ? 'awaiting_review' : 'draft_generated');
  await updateBuildoutCrm(buildoutRequestId, {
    lead_status: manualReviewEnabled ? 'blueprint_ready_for_review' : 'blueprint_draft_generated',
    crm_tags: manualReviewEnabled
      ? ['blueprint-ready-for-review', 'report-draft-ready']
      : ['blueprint-draft-generated', 'report-draft-ready'],
  });

  return {
    manual_review_required: manualReviewEnabled,
    system_id: starterSystem?.id,
    generated_report_id: report?.id,
    task_ids: tasks.map((task) => task.id),
    activity_log_ids: activityLogs.map((event) => event.id),
  };
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    sendJson(response, 405, {
      ok: false,
      status: 'method_not_allowed',
      message: 'Use POST to generate a Thurnos blueprint draft.',
    });
    return;
  }

  const sharedSecret = process.env.THURNOS_SHARED_SECRET;
  const providedSecret = request.headers['x-thurnos-secret'];

  if (!sharedSecret || providedSecret !== sharedSecret) {
    sendJson(response, 401, {
      ok: false,
      status: 'unauthorized',
      message: 'Missing or invalid Thurnos bridge secret.',
    });
    return;
  }

  try {
    const body = getPayload(request);
    const buildoutRequestId = getBuildoutRequestId(body);
    const payload = getIntakePayload(body);
    const dryRun = body.dry_run === true || body.dryRun === true;
    const manualReviewEnabled = getManualReviewEnabled(body);

    if (!payload?.lead || !payload?.intake) {
      sendJson(response, 400, {
        ok: false,
        status: 'validation_error',
        message: 'Send the original buildout intake payload under payload or intake_payload.',
      });
      return;
    }

    if (!dryRun && !buildoutRequestId) {
      sendJson(response, 400, {
        ok: false,
        status: 'missing_buildout_request_id',
        message: 'A saved buildout_request_id is required before persisting a blueprint draft.',
      });
      return;
    }

    const draft = await generateBlueprintDraft(payload);
    const persistence = dryRun
      ? { dry_run: true, manual_review_required: manualReviewEnabled }
      : await persistBlueprintDraft({ buildoutRequestId, draft, payload, manualReviewEnabled });

    sendJson(response, 201, {
      ok: true,
      status: dryRun
        ? 'draft_generated_dry_run'
        : manualReviewEnabled
          ? 'blueprint_ready_for_review'
          : 'draft_generated_and_saved',
      buildout_request_id: buildoutRequestId,
      draft,
      persistence,
    });
  } catch (error) {
    sendJson(response, 500, {
      ok: false,
      status: 'thurnos_blueprint_error',
      message: 'Thurnos could not generate or save the blueprint draft.',
      detail: error.message,
    });
  }
}
