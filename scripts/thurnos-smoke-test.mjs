const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434';
const THURNOS_MODEL = process.env.THURNOS_MODEL || 'thurnos:latest';

const response = await fetch(`${OLLAMA_URL}/api/generate`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model: THURNOS_MODEL,
    stream: false,
    prompt:
      'You are Thurnos, the internal operations agent for Thurr Solutions. Reply in one concise sentence confirming you are available for Right Thurr operator work.',
  }),
});

if (!response.ok) {
  throw new Error(`Thurnos request failed: ${response.status}`);
}

const data = await response.json();
console.log(data.response.trim());
