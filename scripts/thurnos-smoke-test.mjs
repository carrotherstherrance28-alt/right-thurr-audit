const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434';
const THURNOS_PROVIDER = process.env.THURNOS_PROVIDER || 'ollama';
const THURNOS_OLLAMA_MODEL = process.env.THURNOS_OLLAMA_MODEL || process.env.THURNOS_MODEL || 'thurnos:latest';
const THURNOS_OPENAI_MODEL = process.env.THURNOS_OPENAI_MODEL || 'gpt-5.2';

const prompt =
  'You are Thurnos, the internal operations agent for Thurr Solutions. Reply in one concise sentence confirming you are available for Right Thurr operator work.';

if (THURNOS_PROVIDER === 'openai') {
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
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI Thurnos request failed: ${response.status}`);
  }

  const data = await response.json();
  console.log((data.output_text || '').trim());
} else {
  const response = await fetch(`${OLLAMA_URL}/api/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: THURNOS_OLLAMA_MODEL,
      stream: false,
      prompt,
    }),
  });

  if (!response.ok) {
    throw new Error(`Thurnos request failed: ${response.status}`);
  }

  const data = await response.json();
  console.log(data.response.trim());
}
