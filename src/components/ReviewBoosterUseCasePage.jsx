import React from 'react';

export function ReviewBoosterUseCasePage({ setPage }) {
  return (
    <main className="usecase-page" id="top">
      <section className="usecase-hero" aria-labelledby="usecase-hero-title">
        <div className="hero-copy">
          <div className="eyebrow">Use Case Template</div>
          <h1 id="usecase-hero-title">Reviews that don’t feel spammy.</h1>
          <p className="lead">A copyable review system: job complete → ask once → route issues → referral (operator-controlled).</p>
          <p className="usecase-disclaimer">
            Educational example. No guarantee of ratings, review volume, retention, or compliance outcomes.
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
            src="/use-cases/review-booster-hero.svg"
            alt="Three-panel flow: job complete to review ask to referral and repeat business"
            loading="eager"
          />
        </div>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-what-title">
        <h2 id="usecase-what-title">What it is (plain English)</h2>
        <ul>
          <li>After a job is complete, the customer gets one simple review request.</li>
          <li>If something is wrong, the system routes it to a human — fast.</li>
          <li>You track outcomes so you can improve the service and the follow-up.</li>
        </ul>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-how-title">
        <h2 id="usecase-how-title">How it works (4 steps)</h2>
        <ol className="usecase-steps">
          <li>
            <strong>Trigger from “job complete”.</strong> Invoice paid, appointment ended, or a manual “done” button.
          </li>
          <li>
            <strong>Send one review ask.</strong> One sentence + one link + one question (operator-approved).
          </li>
          <li>
            <strong>Route issues to a human.</strong> Low ratings, complaints, or “not happy” replies pause automation.
          </li>
          <li>
            <strong>Report outcomes.</strong> Completed → asked → reviewed → escalated → referred, so you can tune the system.
          </li>
        </ol>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-guardrails-title">
        <h2 id="usecase-guardrails-title">Guardrails (operator-controlled)</h2>
        <ul>
          <li>No bribing, gating, or faking reviews.</li>
          <li>Quiet hours + stop list + opt-out keywords are default features.</li>
          <li>Compliance depends on your industry, region, and message content — this page is not legal advice.</li>
        </ul>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-rightthurr-title">
        <h2 id="usecase-rightthurr-title">Right Thurr framing</h2>
        <p className="usecase-framing">
          <strong>Copy. Curate. Rebrand.</strong> The review workflow is right there — but the delivery still matters most.
        </p>
      </section>

      <section className="usecase-section usecase-cta" aria-labelledby="usecase-cta-title">
        <h2 id="usecase-cta-title">If you want it built</h2>
        <p>
          Start with the Lead Flow Audit. You’ll get a clean map of your post-job follow-up, the review path, and the simplest build
          list to keep it operator-safe.
        </p>
        <button className="stamp-button link-button" type="button" onClick={() => setPage('buildout')}>
          Start the audit
        </button>
      </section>
    </main>
  );
}

