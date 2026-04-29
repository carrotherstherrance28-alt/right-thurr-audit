const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434';
const THURNOS_PROVIDER = process.env.THURNOS_PROVIDER || 'ollama';
const THURNOS_OLLAMA_MODEL =
  process.env.THURNOS_OLLAMA_MODEL || process.env.THURNOS_MODEL || 'thurnos:latest';
const THURNOS_OPENAI_MODEL = process.env.THURNOS_OPENAI_MODEL || 'gpt-5.2';

export const reportKeys = [
  'business_opportunity',
  'best_business_model',
  'revenue_potential',
  'what_to_build_first',
  'funnel_strategy',
  'automation_stack_needed',
  'ai_agents_needed',
  'thirty_day_launch_roadmap',
  'biggest_bottlenecks',
  'recommended_next_step',
];

export function buildBlueprintPrompt(payload) {
  return `
You are Thurnos, the internal Right Thurr / Thurr Solutions blueprint drafting agent.

Create a draft "Right Thurr Autopilot Blueprint" from the intake below.

Rules:
- Return JSON only. No markdown. No code fences.
- Keep this as an internal draft for operator review.
- Do not claim guaranteed revenue.
- Do not invent exact customer counts or revenue projections unless clearly labeled as scenario math.
- Prefer the current Right Thurr stack: Vercel, Supabase, n8n, Discord, Ollama/OpenAI, and manual owner review.
- Do not recommend Netlify, Airtable, or a different stack unless the intake specifically asks for it.
- Do not recommend legal documents like NDAs unless the intake specifically asks for legal/IP protection.
- Be specific enough that a builder can act on it.
- Keep lead contact details out of summaries unless needed for routing.
- Use plain business language.
- Include all required keys exactly.

Required JSON shape:
{
  "title": "Right Thurr Autopilot Blueprint",
  "summary": "",
  "sections": {
    "business_opportunity": "",
    "best_business_model": "",
    "revenue_potential": "",
    "what_to_build_first": "",
    "funnel_strategy": "",
    "automation_stack_needed": "",
    "ai_agents_needed": "",
    "thirty_day_launch_roadmap": "",
    "biggest_bottlenecks": "",
    "recommended_next_step": ""
  },
  "starter_system": {
    "name": "",
    "type": "",
    "current_mission": "",
    "next_move": ""
  },
  "launch_tasks": [
    { "title": "", "description": "", "priority": "high", "assigned_agent": "Execution Agent" }
  ],
  "activity_log": [
    { "agent_name": "Thurnos", "action_type": "blueprint_draft_generated", "summary": "", "status": "draft" }
  ]
}

Intake payload:
${JSON.stringify(payload, null, 2)}
`.trim();
}

export function extractJson(text) {
  const trimmed = text.trim();

  if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
    return JSON.parse(trimmed);
  }

  const start = trimmed.indexOf('{');
  const end = trimmed.lastIndexOf('}');

  if (start === -1 || end === -1 || end <= start) {
    throw new Error('Thurnos did not return JSON.');
  }

  return JSON.parse(trimmed.slice(start, end + 1));
}

export function normalizeBlueprintDraft(draft, payload) {
  const sections = draft.sections || {};
  const intake = payload?.intake || {};
  const routing = payload?.routing || {};
  const lead = payload?.lead || {};
  const industry = intake.industry || 'Business system';
  const idea = String(intake.business_idea || 'New buildout request').replace(/[.!?]+$/g, '');
  const mainGoal = String(intake.main_goal || 'launch a business system').replace(/[.!?]+$/g, '');
  const budget = intake.budget_level || 'not provided';
  const sourceUrl = intake.website_or_social || lead.website_or_social || 'No website or social link provided';
  const leadName = lead.name || 'the prospect';
  const fallbackSections = {
    business_opportunity: `${leadName} wants to build around ${idea}. The first opportunity is a focused ${industry} system that captures demand, explains the offer clearly, and routes interested prospects into a follow-up path.`,
    best_business_model:
      'Start with a service-led buildout instead of a complicated product. Package one clear offer, collect leads, qualify them, and use automation to keep follow-up consistent while the offer is refined.',
    revenue_potential: `Revenue should be framed as a range to validate, not a guarantee. The strongest early signal will come from booked calls, quote requests, paid deposits, and repeatable follow-up activity. Budget level captured: ${budget}.`,
    what_to_build_first:
      'Build the first lead capture system: landing page, intake form, CRM record, Discord owner alert, follow-up email/SMS path, and a manual review step before anything is sent externally.',
    funnel_strategy: `Use one direct CTA: get the AI Business Buildout Plan. The funnel should move from intake to blueprint draft to owner review to booked execution call. Source link to review: ${sourceUrl}.`,
    automation_stack_needed:
      'V1 stack: Vercel form, n8n webhook, Supabase records, Thurnos blueprint draft, Discord alert, and manual owner approval. Add payment, email delivery, and CRM tagging after the draft path is stable.',
    ai_agents_needed:
      'Use Opportunity, Funnel, Revenue, Automation, and Execution agents under Thurnos. Their job is to turn the intake into a useful draft, not send promises directly to the lead.',
    thirty_day_launch_roadmap:
      'Week 1: clarify offer and page copy. Week 2: wire intake, CRM, and alerts. Week 3: draft follow-up sequence and report. Week 4: test the full path with real conversations and refine based on conversion data.',
    biggest_bottlenecks:
      'The main risks are unclear offer positioning, weak follow-up, no proof, and trying to build too many channels at once. Keep the first system narrow until there is traction.',
    recommended_next_step: `Review this draft, choose the first offer, then launch the smallest working system that can capture demand and prove whether ${mainGoal} is realistic.`,
  };
  const normalizedSections = Object.fromEntries(
    reportKeys.map((key) => [
      key,
      String(sections[key] || draft[key] || fallbackSections[key] || '').trim(),
    ]),
  );

  if (/1000 customers|\$[0-9,.]+k?\/year|guaranteed|that's \$?/i.test(normalizedSections.revenue_potential)) {
    normalizedSections.revenue_potential = fallbackSections.revenue_potential;
  }

  if (/netlify|airtable/i.test(normalizedSections.automation_stack_needed)) {
    normalizedSections.automation_stack_needed = fallbackSections.automation_stack_needed;
  }

  if (/nda|netlify|legal document/i.test(normalizedSections.recommended_next_step)) {
    normalizedSections.recommended_next_step = fallbackSections.recommended_next_step;
  }

  const title = String(draft.title || 'Right Thurr Autopilot Blueprint').trim();
  const summary = String(draft.summary || normalizedSections.business_opportunity || '').trim();
  const firstTaskTitle = `Clarify ${industry} offer and launch path`;

  return {
    ok: true,
    status: 'draft_generated',
    created_by_agent: 'Thurnos',
    report_type: routing.report_type || 'right-thurr-autopilot-blueprint',
    title,
    summary,
    sections: normalizedSections,
    starter_system: {
      name: String(draft.starter_system?.name || `${industry} Buildout System`).trim(),
      type: String(draft.starter_system?.type || 'ai-business-buildout').trim(),
      current_mission: String(draft.starter_system?.current_mission || idea).trim(),
      next_move: String(
        draft.starter_system?.next_move || normalizedSections.what_to_build_first || firstTaskTitle,
      ).trim(),
    },
    launch_tasks:
      Array.isArray(draft.launch_tasks) && draft.launch_tasks.length > 0
        ? draft.launch_tasks.slice(0, 10).map((task) => ({
            title: String(task.title || firstTaskTitle).trim(),
            description: String(task.description || '').trim(),
            priority: String(task.priority || 'normal').trim(),
            assigned_agent: String(task.assigned_agent || 'Execution Agent').trim(),
          }))
        : [
            {
              title: firstTaskTitle,
              description: 'Review the intake and approve the first system build scope.',
              priority: 'high',
              assigned_agent: 'Execution Agent',
            },
          ],
    activity_log:
      Array.isArray(draft.activity_log) && draft.activity_log.length > 0
        ? draft.activity_log.map((event) => ({
            agent_name: String(event.agent_name || 'Thurnos').trim(),
            action_type: String(event.action_type || 'blueprint_draft_generated').trim(),
            summary: String(event.summary || summary || 'Blueprint draft generated.').trim(),
            status: String(event.status || 'draft').trim(),
          }))
        : [
            {
              agent_name: 'Thurnos',
              action_type: 'blueprint_draft_generated',
              summary: summary || 'Blueprint draft generated for operator review.',
              status: 'draft',
            },
          ],
  };
}

async function generateWithOllama(prompt) {
  const response = await fetch(`${OLLAMA_URL}/api/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: THURNOS_OLLAMA_MODEL,
      stream: false,
      format: 'json',
      prompt,
    }),
  });

  if (!response.ok) {
    throw new Error(`Ollama Thurnos request failed: ${response.status}`);
  }

  const data = await response.json();
  return data.response || '';
}

async function generateWithOpenAI(prompt) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is required when THURNOS_PROVIDER=openai');
  }

  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: THURNOS_OPENAI_MODEL,
      input: prompt,
      text: {
        format: {
          type: 'json_object',
        },
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI Thurnos request failed: ${response.status}`);
  }

  const data = await response.json();
  return data.output_text || '';
}

export async function generateBlueprintDraft(payload) {
  const prompt = buildBlueprintPrompt(payload);
  const rawDraft =
    THURNOS_PROVIDER === 'openai' ? await generateWithOpenAI(prompt) : await generateWithOllama(prompt);

  return normalizeBlueprintDraft(extractJson(rawDraft), payload);
}
