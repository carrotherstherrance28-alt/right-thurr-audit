import React from 'react';

export function SeasonalReactivationUseCasePage({ setPage }) {
  return (
    <main className="usecase-page" id="top">
      <section className="usecase-hero" aria-labelledby="usecase-hero-title">
        <div className="hero-copy">
          <div className="eyebrow">Use Case Template</div>
          <h1 id="usecase-hero-title">Bring back past customers (without spamming).</h1>
          <p className="lead">
            A copyable winback system: segment past customers → value-first seasonal check-in → booked schedule (operator-controlled).
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
            src="/use-cases/seasonal-reactivation-hero.svg"
            alt="Three-panel flow: past customers to value offer to booked schedule with guardrails"
            loading="eager"
          />
        </div>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-what-title">
        <h2 id="usecase-what-title">What it is (plain English)</h2>
        <ul>
          <li>You re-contact customers who already know you — using careful segments and caps.</li>
          <li>You lead with value (maintenance reminder, seasonal check, safety note), not pressure.</li>
          <li>You track replies, opt-outs, and bookings so the system improves instead of getting noisier.</li>
        </ul>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-how-title">
        <h2 id="usecase-how-title">How it works (4 steps)</h2>
        <ol className="usecase-steps">
          <li>
            <strong>Build segments.</strong> Group past customers by last service date, service type, and location.
          </li>
          <li>
            <strong>Send a value-first check-in.</strong> Short, specific, and operator-approved (no hype, no fear tactics).
          </li>
          <li>
            <strong>Follow up once (max).</strong> Always include opt-out language and stop on reply.
          </li>
          <li>
            <strong>Review outcomes weekly.</strong> Bookings, replies, opt-outs, complaints, and revenue — then tighten the segments.
          </li>
        </ol>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-guardrails-title">
        <h2 id="usecase-guardrails-title">Guardrails (operator-controlled)</h2>
        <ul>
          <li>Quiet hours + frequency caps + stop list are default features.</li>
          <li>Stop on reply, and route complaints or “not interested” to a human.</li>
          <li>Compliance depends on your industry, region, and consent records — this page is not legal advice.</li>
        </ul>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-rightthurr-title">
        <h2 id="usecase-rightthurr-title">Right Thurr framing</h2>
        <p className="usecase-framing">
          <strong>Copy. Curate. Rebrand.</strong> The workflow is the easy part — the segment rules and guardrails make it safe to run.
        </p>
      </section>

      <section className="usecase-section usecase-cta" aria-labelledby="usecase-cta-title">
        <h2 id="usecase-cta-title">If you want it built</h2>
        <p>
          Start with the Lead Flow Audit. You’ll get a clean map of your segments, messaging rules, and the simplest build list to keep
          it operator-safe.
        </p>
        <button className="stamp-button link-button" type="button" onClick={() => setPage('buildout')}>
          Start the audit
        </button>
      </section>
    </main>
  );
}

