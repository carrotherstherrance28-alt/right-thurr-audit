import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const backlogRelativePath = 'docs/project/Codex-Ready-Backlog.md';
const csvRelativePath = 'docs/project/linear-backlog-import.csv';
const backlogPath = path.join(repoRoot, backlogRelativePath);
const csvPath = path.join(repoRoot, csvRelativePath);

const fieldNames = ['Title', 'Description', 'Priority', 'Status', 'Labels'];

function readText(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function csvEscape(value) {
  const text = String(value ?? '');
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function normalizeLinearPriority(priority) {
  const normalized = String(priority || '').trim().toUpperCase();

  if (normalized === 'P0') return 'Urgent';
  if (normalized === 'P1') return 'High';
  if (normalized === 'P2') return 'Medium';

  return 'Low';
}

function normalizeLinearStatus(ticket) {
  const status = String(ticket.status || '').toUpperCase();
  const owner = String(ticket.owner || '').toLowerCase();

  if (status.includes('DONE')) return 'Done';
  if (status.includes('BLOCKED') || owner.includes('thurr') || owner.includes('client')) return 'Blocked';
  return 'Todo';
}

function splitTicketLine(line) {
  const raw = line.replace(/^TICKET:\s*/, '').trim();
  const match = raw.match(/^([A-Z]+-\d+)\s+—\s+(.+)$/);

  if (!match) {
    return {
      id: raw.startsWith('DECISION BLOCKER') ? 'DECISION BLOCKER' : raw,
      title: raw,
      fullTitle: raw,
    };
  }

  return {
    id: match[1],
    title: match[2],
    fullTitle: raw,
  };
}

function parseBacklog(markdown) {
  const tickets = [];
  let current = null;

  for (const rawLine of markdown.split('\n')) {
    const line = rawLine.trim();

    if (line.startsWith('TICKET:')) {
      if (current) tickets.push(current);
      current = splitTicketLine(line);
      continue;
    }

    if (!current) continue;

    const separatorIndex = line.indexOf(':');
    if (separatorIndex === -1) continue;

    const key = line.slice(0, separatorIndex).trim().toLowerCase();
    const value = line.slice(separatorIndex + 1).trim();

    if (key === 'goal') current.goal = value;
    if (key === 'acceptance') current.acceptance = value;
    if (key === 'status') current.status = value;
    if (key === 'dependencies') current.dependencies = value;
    if (key === 'owner') current.owner = value;
    if (key === 'priority') current.priority = value;
    if (key === 'now / next / later') current.bucket = value;
  }

  if (current) tickets.push(current);
  return tickets;
}

function safeDescription(ticket) {
  const lines = [
    `Backlog ID: ${ticket.id}`,
    `Queue: ${ticket.bucket || 'Unassigned'}`,
    `Owner: ${ticket.owner || 'Unassigned'}`,
    `Status: ${normalizeLinearStatus(ticket)}`,
    `Source: ${backlogRelativePath}`,
  ];

  for (const [label, value] of [
    ['Goal', ticket.goal],
    ['Acceptance', ticket.acceptance],
    ['Dependencies', ticket.dependencies],
  ]) {
    if (value && !/secret|token|credential|api[_ -]?key/i.test(value)) {
      lines.push(`${label}: ${value}`);
    }
  }

  return lines.join(' | ');
}

function labelsFor(ticket) {
  const labels = ['codex-backlog'];

  if (ticket.id && ticket.id !== 'DECISION BLOCKER') labels.push(ticket.id.split('-')[0].toLowerCase());
  if (ticket.id === 'DECISION BLOCKER') labels.push('decision-blocker');
  if (ticket.bucket) labels.push(ticket.bucket.toLowerCase());
  if (normalizeLinearStatus(ticket) === 'Blocked') labels.push('blocked');

  return labels.join(';');
}

function buildCsv(tickets) {
  const rows = tickets.map((ticket) => [
    ticket.fullTitle,
    safeDescription(ticket),
    normalizeLinearPriority(ticket.priority),
    normalizeLinearStatus(ticket),
    labelsFor(ticket),
  ]);

  return [fieldNames, ...rows].map((row) => row.map(csvEscape).join(',')).join('\n') + '\n';
}

const tickets = parseBacklog(readText(backlogPath));
fs.writeFileSync(csvPath, buildCsv(tickets), 'utf8');

const dryRunReport = {
  mode: 'dry-run',
  source: backlogRelativePath,
  csv: csvRelativePath,
  ticket_count: tickets.length,
  blocked_count: tickets.filter((ticket) => normalizeLinearStatus(ticket) === 'Blocked').length,
  done_count: tickets.filter((ticket) => normalizeLinearStatus(ticket) === 'Done').length,
  todo_count: tickets.filter((ticket) => normalizeLinearStatus(ticket) === 'Todo').length,
  would_call_linear_api: false,
};

console.log(JSON.stringify(dryRunReport, null, 2));
