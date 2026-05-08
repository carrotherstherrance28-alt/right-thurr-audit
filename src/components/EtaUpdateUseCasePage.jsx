import React from 'react';

export function EtaUpdateUseCasePage({ setPage }) {
  return (
    <main className="usecase-page" id="top">
      <section className="usecase-hero" aria-labelledby="usecase-hero-title">
        <div className="hero-copy">
          <div className="eyebrow">Use Case Template</div>
          <h1 id="usecase-hero-title">Send a calm ETA update that reduces no-shows (without spamming customers).</h1>
          <p className="lead">
            A copyable on-the-way ETA system: tech marked en route → one ETA message with one ask → stop rules + human routing.
          </p>
          <p className="usecase-disclaimer">
            Educational example. No guarantee of revenue, compliance outcomes, deliverability, or attendance.
          </p>
          <div className="usecase-hero-actions">
            <button className="stamp-button link-button" type="button" onClick={() => setPage('buildout')}>
              Start with the Lead Flow Audit
            </button>
            <button className="stamp-button ghost-button" type="button" onClick={() => setPage('solutions')}>
              See Thurr Solutions services
            </button>
          </div>
        </div>
        <div className="usecase-hero-card" role="presentation">
          <img
            className="usecase-hero-visual"
            src="/use-cases/eta-update-hero.svg"
            alt="Three-panel flow: en route trigger to a single ETA update message to confirmed/reschedule/human outcomes, with guardrails"
            loading="eager"
          />
        </div>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-what-title">
        <h2 id="usecase-what-title">What it is (plain English)</h2>
        <ul>
          <li>You detect when the job is truly on the way (not just “scheduled”).</li>
          <li>You send one ETA update with one simple ask: confirm you’ll be there (or reply with questions).</li>
          <li>You stop fast: stop on reply, cap follow-ups, honor opt-out, and route questions to a human.</li>
        </ul>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-how-title">
        <h2 id="usecase-how-title">How it works (4 steps)</h2>
        <ol className="usecase-steps">
          <li>
            <strong>Trigger on “en route”.</strong> Use your dispatch/field-service status, not a guessed ETA window.
          </li>
          <li>
            <strong>Gate quiet hours + consent.</strong> Only send during business hours and only to contacts opted into the channel.
          </li>
          <li>
            <strong>Send one ETA update with one ask.</strong> Keep it short: ETA range + “reply YES to confirm” + “reply with questions”.
          </li>
          <li>
            <strong>Stop on reply. Route questions to a human.</strong> If the customer replies with anything other than a simple confirmation,
            treat it as a human-handled message thread and stop automation.
          </li>
        </ol>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-guardrails-title">
        <h2 id="usecase-guardrails-title">Guardrails (operator-controlled)</h2>
        <ul>
          <li>No drip sequences: one ETA update by default.</li>
          <li>Stop on reply; honor opt-out immediately.</li>
          <li>Do not over-promise: use “~” and ranges; keep language cautious.</li>
          <li>Route any questions, access issues, or reschedules to a human.</li>
        </ul>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-rightthurr-title">
        <h2 id="usecase-rightthurr-title">Right Thurr framing</h2>
        <p className="usecase-framing">
          <strong>Certainty saves schedules.</strong> Most no-shows aren’t “ghosting” — they’re confusion, timing, or a missed message.
          A calm ETA update with one clear confirmation ask reduces wasted drive time without turning into spam.
        </p>
      </section>

      <section className="usecase-section usecase-cta" aria-labelledby="usecase-cta-title">
        <h2 id="usecase-cta-title">If you want it built</h2>
        <p>
          Start with the Lead Flow Audit. You’ll get the dispatch trigger, the ETA language, and the guardrails to keep it operator-safe.
        </p>
        <button className="stamp-button link-button" type="button" onClick={() => setPage('buildout')}>
          Start the audit
        </button>
      </section>
    </main>
  );
}

