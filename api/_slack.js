function getWebhookUrl() {
  return process.env.SLACK_ALERTS_WEBHOOK_URL || process.env.SLACK_WEBHOOK_URL || '';
}

export async function postSlackAlert({ text, blocks } = {}) {
  const webhookUrl = getWebhookUrl();

  if (!webhookUrl) {
    return { ok: false, status: 'skipped_missing_webhook' };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: text || 'Thurr alert',
        ...(blocks ? { blocks } : {}),
      }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => '');
      return { ok: false, status: 'failed', detail: detail || `Slack returned ${response.status}` };
    }

    return { ok: true, status: 'sent' };
  } catch (error) {
    return { ok: false, status: 'failed', detail: error?.message || 'Slack request failed' };
  }
}

