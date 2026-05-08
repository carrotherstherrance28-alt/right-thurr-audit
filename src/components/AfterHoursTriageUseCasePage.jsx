import React from 'react';

export function AfterHoursTriageUseCasePage({ setPage }) {
  return (
    <main className="usecase-page" id="top">
      <section className="usecase-hero" aria-labelledby="usecase-hero-title">
        <div className="hero-copy">
          <div className="eyebrow">Use Case Template</div>
          <h1 id="usecase-hero-title">Protect your team (and your customer) with one calm after-hours triage message.</h1>
          <p className="lead">
            A copyable after-hours triage system: after-hours inbound → one message with safety boundaries → schedule next
            business day or escalate to a human (stop rules included).
          </p>
          <p className="usecase-disclaimer">
            Educational example. No guarantee of revenue, compliance outcomes, safety outcomes, or operational results.
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
            src="/use-cases/after-hours-triage-hero.svg"
            alt="Three-panel flow: after-hours inbound trigger to a calm triage message to emergency, human escalation, or next-day scheduling outcomes with stop rules"
            loading="eager"
          />
        </div>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-what-title">
        <h2 id="usecase-what-title">What it is (plain English)</h2>
        <ul>
          <li>You answer after-hours inbound with one message that sets boundaries.</li>
          <li>You prioritize safety: emergencies route to emergency services (not troubleshooting by text).</li>
          <li>You schedule what can wait, and you route anything unclear or risky to a human on-call operator.</li>
        </ul>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-how-title">
        <h2 id="usecase-how-title">How it works (4 steps)</h2>
        <ol className="usecase-steps">
          <li>
            <strong>Trigger on after-hours inbound.</strong> Use inbound messages/calls, not outbound “blasts”. Apply consent rules and
            quiet hours.
          </li>
          <li>
            <strong>Send one calm triage message.</strong> Ask for address + a one-line description, and include a safety boundary for
            emergencies.
          </li>
          <li>
            <strong>Route to the right lane.</strong> Emergency: emergency services. High-risk/unclear: human escalation. Not urgent:
            offer next business day scheduling.
          </li>
          <li>
            <strong>Stop fast.</strong> Stop on reply. Cap follow-ups. Keep an audit trail and route “back-and-forth” to a human.
          </li>
        </ol>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-guardrails-title">
        <h2 id="usecase-guardrails-title">Guardrails (operator-controlled)</h2>
        <ul>
          <li>No “DIY safety advice” by text. When in doubt, route to a human or emergency services.</li>
          <li>Stop on reply; cap follow-ups; respect quiet hours.</li>
          <li>Keep it minimal: address + 1-line description is usually enough to schedule.</li>
          <li>Never collect sensitive data over SMS.</li>
        </ul>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-rightthurr-title">
        <h2 id="usecase-rightthurr-title">Right Thurr framing</h2>
        <p className="usecase-framing">
          <strong>Fast boundaries beat long explanations.</strong> The goal isn’t to “solve it by text” — it’s to keep people safe,
          capture the minimum context, and move the work into the right lane.
        </p>
      </section>

      <section className="usecase-section usecase-cta" aria-labelledby="usecase-cta-title">
        <h2 id="usecase-cta-title">If you want it built</h2>
        <p>
          Start with the Lead Flow Audit. You’ll get the after-hours rules, the exact triage message, and the stop rules to keep it
          operator-safe.
        </p>
        <button className="stamp-button link-button" type="button" onClick={() => setPage('buildout')}>
          Start the audit
        </button>
      </section>
    </main>
  );
}

