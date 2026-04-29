const notionToken = process.env.NOTION_API_KEY || process.env.NOTION_TOKEN;
const parentPageId = process.env.NOTION_COMMAND_CENTER_PAGE_ID || '34ca6f1d252381dbae98fd09da37ae32';
const notionVersion = '2022-06-28';

if (!notionToken) {
  console.error('Missing NOTION_API_KEY. Create a Notion integration token and add it to .env.local.');
  process.exit(1);
}

function notionHeaders() {
  return {
    Authorization: `Bearer ${notionToken}`,
    'Content-Type': 'application/json',
    'Notion-Version': notionVersion,
  };
}

async function notionRequest(path, body) {
  const response = await fetch(`https://api.notion.com/v1${path}`, {
    method: 'POST',
    headers: notionHeaders(),
    body: JSON.stringify(body),
  });
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(`${path} failed: ${response.status} ${data.message || JSON.stringify(data)}`);
  }

  return data;
}

function titleValue(value) {
  return [{ type: 'text', text: { content: value } }];
}

function richTextValue(value) {
  return value ? [{ type: 'text', text: { content: value } }] : [];
}

function selectValue(name) {
  return name ? { name } : null;
}

function dateValue(start) {
  return start ? { start } : null;
}

const databases = [
  {
    title: 'Task Tracker',
    properties: {
      Name: { title: {} },
      Status: { select: { options: ['Backlog', 'Planned', 'In Progress', 'Blocked', 'Done'].map((name) => ({ name })) } },
      Phase: {
        select: {
          options: ['Website', 'Backend', 'CRM', 'Content', 'Client Diagnostic', 'Automation', 'Setup'].map((name) => ({ name })),
        },
      },
      Priority: { select: { options: ['High', 'Medium', 'Low'].map((name) => ({ name })) } },
      Owner: { select: { options: ['Therrance', 'Codex', 'Claude', 'n8n'].map((name) => ({ name })) } },
      Type: { select: { options: ['Code', 'Design', 'Backend', 'Content', 'Setup', 'QA', 'Docs'].map((name) => ({ name })) } },
      'Blocked By': { rich_text: {} },
      'Repo Link': { rich_text: {} },
      'Due Date': { date: {} },
      'Last Updated': { date: {} },
    },
    rows: [
      ['Finalize owner auth and RLS', 'Planned', 'Backend', 'High', 'Codex', 'Backend', 'Supabase auth/RLS decision', 'docs/backend/Supabase-Owner-Auth.md'],
      ['Connect owner queue to CRM lifecycle fields', 'Planned', 'CRM', 'High', 'Codex', 'Code', 'Owner auth and RLS', 'src/main.jsx'],
      ['Build client diagnostic V1', 'Planned', 'Client Diagnostic', 'High', 'Codex', 'Docs', 'First niche decision', 'docs/product/Thurr-Solutions-Diagnostic-Sales-Version.md'],
      ['Choose first client diagnostic niche', 'Planned', 'Client Diagnostic', 'High', 'Therrance', 'Setup', '', 'docs/product/Lead-Gen-Niche-Prompt-Packs.md'],
      ['Create first LinkedIn content batch', 'Planned', 'Content', 'Medium', 'Therrance', 'Content', 'First niche decision', 'docs/project/LinkedIn-First-B2B-Content-Plan.md'],
      ['Decide Notion sync path', 'Planned', 'Automation', 'Medium', 'Therrance', 'Setup', 'Notion write access or n8n Notion credential', 'docs/project/Notion-Command-Center-Alignment.md'],
      ['Decide Linear mirror scope', 'Planned', 'Setup', 'Low', 'Therrance', 'Setup', 'Linear connector access', 'docs/project/Linear-Update-2026-04-29.md'],
    ],
  },
  {
    title: 'Content Calendar',
    properties: {
      Title: { title: {} },
      Status: { select: { options: ['Idea', 'Drafting', 'Scheduled', 'Posted', 'Repurpose', 'Archived'].map((name) => ({ name })) } },
      Channel: { select: { options: ['LinkedIn', 'Instagram', 'YouTube', 'Website', 'Email', 'Remotion'].map((name) => ({ name })) } },
      'Content Pillar': {
        select: {
          options: ['Missed Lead Leaks', 'Buildout Blueprint', 'BTS Builds', 'Local Service Automation', 'Founder Perspective', 'Offer'].map((name) => ({ name })),
        },
      },
      CTA: { rich_text: {} },
      'Publish Date': { date: {} },
      'Asset Link': { rich_text: {} },
      'Source Doc': { rich_text: {} },
      'Performance Notes': { rich_text: {} },
    },
    rows: [
      ['Most businesses do not have a lead problem. They have a follow-up leak.', 'Idea', 'LinkedIn', 'Missed Lead Leaks', 'Ask where leads get stuck', 'docs/project/LinkedIn-First-B2B-Content-Plan.md'],
      ['Ideas do not pay you. Systems do.', 'Idea', 'LinkedIn', 'Offer', 'Invite buildout plan', 'docs/project/LinkedIn-First-B2B-Content-Plan.md'],
      ['Built today: form to n8n to Supabase to Discord.', 'Idea', 'LinkedIn', 'BTS Builds', 'Ask what owners want to see daily', 'docs/project/LinkedIn-First-B2B-Content-Plan.md'],
      ['Contact forms are not systems.', 'Idea', 'LinkedIn', 'Local Service Automation', 'Invite lead-flow review', 'docs/project/LinkedIn-First-B2B-Content-Plan.md'],
      ['We build. You profit. What that actually means.', 'Idea', 'LinkedIn', 'Offer', 'Start a project', 'docs/project/LinkedIn-First-B2B-Content-Plan.md'],
      ['AI agents should prepare decisions, not replace owner judgment.', 'Idea', 'LinkedIn', 'Founder Perspective', 'Ask what should stay human', 'docs/project/LinkedIn-First-B2B-Content-Plan.md'],
      ['Mobile detailing lead-to-booking system breakdown.', 'Idea', 'Remotion', 'Buildout Blueprint', 'Request a system map', 'docs/project/Remotion-Content-Starter.md'],
    ],
  },
  {
    title: 'AI Ideas Log',
    properties: {
      Idea: { title: {} },
      Category: { select: { options: ['Content', 'Product', 'Client Offer', 'Automation', 'Design', 'Community', 'Sales'].map((name) => ({ name })) } },
      Source: { select: { options: ['Codex', 'Claude', 'Thurnos', 'Client', 'Social', 'Manual'].map((name) => ({ name })) } },
      Status: { select: { options: ['Raw', 'Review', 'Approved', 'Tasked', 'Archived'].map((name) => ({ name })) } },
      'Next Action': { rich_text: {} },
      'Related Task': { rich_text: {} },
      'Related Content': { rich_text: {} },
    },
    rows: [
      ['Wedding branding diagnostic funnel', 'Client Offer', 'Codex', 'Review', 'Choose if wedding/event niche is first', 'Choose first client diagnostic niche', 'docs/product/Lead-Gen-Niche-Prompt-Packs.md'],
      ['Funeral home follow-up automation offer', 'Client Offer', 'Codex', 'Review', 'Validate compliance-sensitive follow-up boundaries', 'Choose first client diagnostic niche', 'docs/product/Lead-Gen-Niche-Prompt-Packs.md'],
      ['Mobile detailing quote workflow demo', 'Automation', 'Codex', 'Approved', 'Turn into first public diagnostic example', 'Build client diagnostic V1', 'docs/product/Lead-Gen-Niche-Prompt-Packs.md'],
      ['Client report-to-content repurposing', 'Content', 'Codex', 'Review', 'Map report sections to LinkedIn posts', 'Create first LinkedIn content batch', 'docs/project/LinkedIn-First-B2B-Content-Plan.md'],
      ['Daily owner summary automation', 'Automation', 'Codex', 'Review', 'Add after owner auth/RLS is stable', 'Finalize owner auth and RLS', 'docs/project/Notion-Command-Center-Alignment.md'],
      ['Prototype requests through Discord', 'Product', 'Codex', 'Review', 'Keep private until auth and routing are safe', 'Finalize owner auth and RLS', 'docs/backend/Thurnos-Hermes-Bridge.md'],
    ],
  },
];

function propertiesForRow(databaseTitle, row) {
  if (databaseTitle === 'Task Tracker') {
    const [name, status, phase, priority, owner, type, blockedBy, repoLink] = row;
    return {
      Name: { title: titleValue(name) },
      Status: { select: selectValue(status) },
      Phase: { select: selectValue(phase) },
      Priority: { select: selectValue(priority) },
      Owner: { select: selectValue(owner) },
      Type: { select: selectValue(type) },
      'Blocked By': { rich_text: richTextValue(blockedBy) },
      'Repo Link': { rich_text: richTextValue(repoLink) },
      'Last Updated': { date: dateValue('2026-04-29') },
    };
  }

  if (databaseTitle === 'Content Calendar') {
    const [title, status, channel, pillar, cta, sourceDoc] = row;
    return {
      Title: { title: titleValue(title) },
      Status: { select: selectValue(status) },
      Channel: { select: selectValue(channel) },
      'Content Pillar': { select: selectValue(pillar) },
      CTA: { rich_text: richTextValue(cta) },
      'Source Doc': { rich_text: richTextValue(sourceDoc) },
    };
  }

  const [idea, category, source, status, nextAction, relatedTask, relatedContent] = row;
  return {
    Idea: { title: titleValue(idea) },
    Category: { select: selectValue(category) },
    Source: { select: selectValue(source) },
    Status: { select: selectValue(status) },
    'Next Action': { rich_text: richTextValue(nextAction) },
    'Related Task': { rich_text: richTextValue(relatedTask) },
    'Related Content': { rich_text: richTextValue(relatedContent) },
  };
}

for (const database of databases) {
  console.log(`Creating database: ${database.title}`);
  const createdDatabase = await notionRequest('/databases', {
    parent: { type: 'page_id', page_id: parentPageId },
    title: titleValue(database.title),
    properties: database.properties,
  });

  for (const row of database.rows) {
    await notionRequest('/pages', {
      parent: { database_id: createdDatabase.id },
      properties: propertiesForRow(database.title, row),
    });
  }

  console.log(`Created ${database.title}: ${createdDatabase.url}`);
}
