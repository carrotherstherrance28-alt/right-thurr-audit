import React from 'react';

export function PartsArrivalPingUseCasePage({ setPage }) {
  return (
    <main className="usecase-page" id="top">
      <section className="usecase-hero" aria-labelledby="usecase-hero-title">
        <div className="hero-copy">
          <div className="eyebrow">Use Case Template</div>
          <h1 id="usecase-hero-title">Reduce “is it in yet?” calls — and book the install in one motion.</h1>
          <p className="lead">
            A copyable parts-arrival update system: part ordered → arrival ping → schedule/confirm install with operator-safe
            guardrails (no delivery promises, caps, and human routing).
          </p>
          <p className="usecase-disclaimer">
            Educational example. No guarantee of bookings, revenue, customer satisfaction, compliance outcomes, or deliverability.
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
            src="/use-cases/parts-arrival-ping-hero.svg"
            alt="Three-panel flow: part ordered to arrival ping to scheduled install, with guardrails"
            loading="eager"
          />
        </div>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-what-title">
        <h2 id="usecase-what-title">What it is (plain English)</h2>
        <ul>
          <li>You only message customers who opted into updates.</li>
          <li>When the part arrives, you send one calm update with one clear next step (schedule/confirm).</li>
          <li>You stop quickly and route anything complicated to a human.</li>
        </ul>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-how-title">
        <h2 id="usecase-how-title">How it works (4 steps)</h2>
        <ol className="usecase-steps">
          <li>
            <strong>Capture consent + expectations.</strong> At intake or quote approval, ask if they want text updates about parts
            and scheduling.
          </li>
          <li>
            <strong>Log the part order state.</strong> “Ordered”, “arrived”, and “installed” is enough. The trigger is the status
            flip to <em>arrived</em>.
          </li>
          <li>
            <strong>Send the arrival ping.</strong> No delivery promises, no fluff — just “it arrived” and two time options or a
            booking link.
          </li>
          <li>
            <strong>Confirm or stop.</strong> If they pick a time, confirm. If they don’t respond, send one nudge inside quiet hours,
            then stop.
          </li>
        </ol>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-guardrails-title">
        <h2 id="usecase-guardrails-title">Guardrails (operator-controlled)</h2>
        <ul>
          <li>Never promise shipping/delivery timelines; only state what you know (“arrived”).</li>
          <li>Stop on reply and route complaints, confusion, or “when will it be done?” to a human.</li>
          <li>Caps + quiet hours are default features.</li>
          <li>Opt-out language is always included.</li>
        </ul>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-rightthurr-title">
        <h2 id="usecase-rightthurr-title">Right Thurr framing</h2>
        <p className="usecase-framing">
          <strong>Copy. Curate. Rebrand.</strong> This is the small “status update” workflow that prevents frustration: permission,
          one clear message, and fast handoff when it gets messy.
        </p>
      </section>

      <section className="usecase-section usecase-cta" aria-labelledby="usecase-cta-title">
        <h2 id="usecase-cta-title">If you want it built</h2>
        <p>
          Start with the Lead Flow Audit. You’ll get the opt-in language, the arrival ping templates, the stop rules, and the routing
          plan for edge cases.
        </p>
        <button className="stamp-button link-button" type="button" onClick={() => setPage('buildout')}>
          Start the audit
        </button>
      </section>
    </main>
  );
}

