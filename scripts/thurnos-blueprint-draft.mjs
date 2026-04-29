import fs from 'node:fs/promises';
import { generateBlueprintDraft } from '../src/server/thurnosBlueprint.js';

async function readPayload() {
  const inputPath = process.argv[2];
  const raw = inputPath ? await fs.readFile(inputPath, 'utf8') : await fs.readFile(0, 'utf8');

  if (!raw.trim()) {
    throw new Error('Provide an intake payload JSON file or pipe JSON to stdin.');
  }

  return JSON.parse(raw);
}

const payload = await readPayload();
const draft = await generateBlueprintDraft(payload);

console.log(JSON.stringify(draft, null, 2));
