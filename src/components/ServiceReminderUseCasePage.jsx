import React from 'react';

export function ServiceReminderUseCasePage({ setPage }) {
  return (
    <main className="usecase-page" id="top">
      <section className="usecase-hero" aria-labelledby="usecase-hero-title">
        <div className="hero-copy">
          <div className="eyebrow">Use Case Template</div>
          <h1 id="usecase-hero-title">Turn “we should probably do that” into repeat appointments.</h1>
          <p className="lead">
            A copyable service reminder system: time-based trigger → one clear next step → operator-safe follow-up rules.
          </p>
          <p className="usecase-disclaimer">
            Educational example. No guarantee of bookings, revenue, deliverability, or compliance outcomes.
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
            src="/use-cases/service-reminder-hero.svg"
            alt="Three-panel flow: last service to reminder message to scheduled appointment with guardrails"
            loading="eager"
          />
        </div>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-what-title">
        <h2 id="usecase-what-title">What it is (plain English)</h2>
        <ul>
          <li>You trigger a reminder when a customer is likely due for the next service.</li>
          <li>You give one clean next step: schedule link, “reply to book”, or “call me”.</li>
          <li>You follow up once (max), then stop — so it stays operator-safe.</li>
        </ul>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-how-title">
        <h2 id="usecase-how-title">How it works (4 steps)</h2>
        <ol className="usecase-steps">
          <li>
            <strong>Pick the trigger.</strong> “90+ days since last service” or “seasonal window hit,” with exclusions
            (open jobs, unresolved issues, do-not-contact).
          </li>
          <li>
            <strong>Send a single reminder.</strong> Friendly, short, and specific — one CTA and no pressure.
          </li>
          <li>
            <strong>Route replies.</strong> Questions/reschedules go to a human. Booking clicks go to your scheduler.
          </li>
          <li>
            <strong>Follow up once.</strong> Stop on reply, honor opt-outs, and enforce quiet hours + frequency caps.
          </li>
        </ol>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-guardrails-title">
        <h2 id="usecase-guardrails-title">Guardrails (operator-controlled)</h2>
        <ul>
          <li>Consent-first: use the channel the customer opted into (and keep records).</li>
          <li>Caps + quiet hours are default features.</li>
          <li>Stop on reply; escalate complaints, “not interested”, or sensitive requests to a human.</li>
          <li>Compliance depends on your industry, region, and consent records — this page is not legal advice.</li>
        </ul>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-rightthurr-title">
        <h2 id="usecase-rightthurr-title">Right Thurr framing</h2>
        <p className="usecase-framing">
          <strong>Copy. Curate. Rebrand.</strong> The reminder message is easy — the trigger exclusions + caps keep it safe to run.
        </p>
      </section>

      <section className="usecase-section usecase-cta" aria-labelledby="usecase-cta-title">
        <h2 id="usecase-cta-title">If you want it built</h2>
        <p>
          Start with the Lead Flow Audit. You’ll get a clean map of trigger rules, consent assumptions, reply routing, and the build
          list to keep it operator-safe.
        </p>
        <button className="stamp-button link-button" type="button" onClick={() => setPage('buildout')}>
          Start the audit
        </button>
      </section>
    </main>
  );
}

