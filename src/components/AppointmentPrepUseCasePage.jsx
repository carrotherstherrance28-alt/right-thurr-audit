import React from 'react';

export function AppointmentPrepUseCasePage({ setPage }) {
  return (
    <main className="usecase-page" id="top">
      <section className="usecase-hero" aria-labelledby="usecase-hero-title">
        <div className="hero-copy">
          <div className="eyebrow">Use Case Template</div>
          <h1 id="usecase-hero-title">Show up ready (and reduce no-shows) with one calm “prep checklist” message.</h1>
          <p className="lead">
            A copyable appointment-prep system: 18–24 hours before → one confirmation + quick prep questions → stop rules
            + human routing.
          </p>
          <p className="usecase-disclaimer">
            Educational example. No guarantee of revenue, compliance outcomes, deliverability, attendance, or scheduling
            results.
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
            src="/use-cases/appointment-prep-hero.svg"
            alt="Three-panel flow: day-before trigger to a prep confirmation message to confirmed, notes, and human-routed outcomes with stop rules"
            loading="eager"
          />
        </div>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-what-title">
        <h2 id="usecase-what-title">What it is (plain English)</h2>
        <ul>
          <li>You check in once, the day before the appointment.</li>
          <li>You confirm the time window and collect the details that cause delays (gate code, parking notes, pets, etc.).</li>
          <li>You stop fast: stop on reply, cap follow-ups, respect quiet hours, and route changes/questions to a human.</li>
        </ul>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-how-title">
        <h2 id="usecase-how-title">How it works (4 steps)</h2>
        <ol className="usecase-steps">
          <li>
            <strong>Trigger on tomorrow’s confirmed appointments.</strong> Use your booking tool status, not “guesses”. Skip if canceled,
            rescheduled, or already confirmed.
          </li>
          <li>
            <strong>Gate by consent + business hours.</strong> Only message customers who opted into the channel. Default to quiet hours.
          </li>
          <li>
            <strong>Send one short message with one ask.</strong> “Reply YES to confirm” plus 1–3 prep questions (gate code, parking, pets).
          </li>
          <li>
            <strong>Stop on reply. One follow-up (max).</strong> If no reply, send one reminder (optional), then stop. Any change requests
            or questions route to a human.
          </li>
        </ol>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-guardrails-title">
        <h2 id="usecase-guardrails-title">Guardrails (operator-controlled)</h2>
        <ul>
          <li>Stop on reply; treat “change requests” as human work.</li>
          <li>Cap follow-ups (default: one max) and enforce quiet hours.</li>
          <li>Keep it calm: no pressure language, no “multiple reminders” drip by default.</li>
          <li>Don’t collect sensitive data over SMS (codes/notes are fine; payment credentials are not).</li>
        </ul>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-rightthurr-title">
        <h2 id="usecase-rightthurr-title">Right Thurr framing</h2>
        <p className="usecase-framing">
          <strong>Prepared beats pushy.</strong> Most “no-shows” are confusion, friction, or logistics. One calm confirmation + a small
          prep checklist reduces wasted trips without annoying people.
        </p>
      </section>

      <section className="usecase-section usecase-cta" aria-labelledby="usecase-cta-title">
        <h2 id="usecase-cta-title">If you want it built</h2>
        <p>
          Start with the Lead Flow Audit. You’ll get the triggers, the prep checklist language, and the guardrails to keep it
          operator-safe.
        </p>
        <button className="stamp-button link-button" type="button" onClick={() => setPage('buildout')}>
          Start the audit
        </button>
      </section>
    </main>
  );
}

