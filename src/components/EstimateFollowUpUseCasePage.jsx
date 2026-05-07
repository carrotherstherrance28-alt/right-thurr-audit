import React from 'react';

export function EstimateFollowUpUseCasePage({ setPage }) {
  return (
    <main className="usecase-page" id="top">
      <section className="usecase-hero" aria-labelledby="usecase-hero-title">
        <div className="hero-copy">
          <div className="eyebrow">Use Case Template</div>
          <h1 id="usecase-hero-title">Estimates shouldn’t go stale.</h1>
          <p className="lead">
            A copyable estimate follow-up system: lead → estimate → check-in cadence → close (operator-controlled).
          </p>
          <p className="usecase-disclaimer">Educational example. No guarantee of conversion rate, close rate, or outcomes.</p>
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
            src="/use-cases/estimate-follow-up-hero.svg"
            alt="Three-panel flow: lead captured to estimate sent to follow-up rules and close outcome"
            loading="eager"
          />
        </div>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-what-title">
        <h2 id="usecase-what-title">What it is (plain English)</h2>
        <ul>
          <li>Every estimate gets one owner and one next action.</li>
          <li>Follow-up is a simple cadence (not a spam loop) that stops on reply.</li>
          <li>Won and close-lost are both real outcomes — tracked weekly so the team improves.</li>
        </ul>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-how-title">
        <h2 id="usecase-how-title">How it works (4 steps)</h2>
        <ol className="usecase-steps">
          <li>
            <strong>Capture + assign.</strong> New lead from a form, call, or DM gets an owner + a next action.
          </li>
          <li>
            <strong>Send the estimate.</strong> Estimate is timestamped, logged, and attached to the lead record.
          </li>
          <li>
            <strong>Run a safe cadence.</strong> Receipt check → one check-in → objection routing (human takeover).
          </li>
          <li>
            <strong>Close and learn.</strong> Mark won or close-lost, capture a reason, review weekly.
          </li>
        </ol>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-guardrails-title">
        <h2 id="usecase-guardrails-title">Guardrails (operator-controlled)</h2>
        <ul>
          <li>Quiet hours + stop list + opt-out keywords are default features.</li>
          <li>Stop on reply. No endless follow-up loops.</li>
          <li>This page is not legal advice; compliance depends on your industry, region, and message content.</li>
        </ul>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-rightthurr-title">
        <h2 id="usecase-rightthurr-title">Right Thurr framing</h2>
        <p className="usecase-framing">
          <strong>Copy. Curate. Rebrand.</strong> The follow-up workflow is right there — but you control the rules and
          tone.
        </p>
      </section>

      <section className="usecase-section usecase-cta" aria-labelledby="usecase-cta-title">
        <h2 id="usecase-cta-title">If you want it built</h2>
        <p>
          Start with the Lead Flow Audit. You’ll get a clean map of your estimate pipeline, the follow-up cadence to approve, and
          the guardrails to keep it operator-safe.
        </p>
        <button className="stamp-button link-button" type="button" onClick={() => setPage('buildout')}>
          Start the audit
        </button>
      </section>
    </main>
  );
}

