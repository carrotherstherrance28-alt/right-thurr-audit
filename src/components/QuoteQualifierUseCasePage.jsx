import React from 'react';

export function QuoteQualifierUseCasePage({ setPage }) {
  return (
    <main className="usecase-page" id="top">
      <section className="usecase-hero" aria-labelledby="usecase-hero-title">
        <div className="hero-copy">
          <div className="eyebrow">Use Case Template</div>
          <h1 id="usecase-hero-title">Turn “how much?” into booked slots (without chasing).</h1>
          <p className="lead">
            A copyable quote qualifier system: short form → routing rules → fast next step (operator-controlled).
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
            src="/use-cases/quote-qualifier-hero.svg"
            alt="Three-panel flow: inquiry to qualifier to booked call with follow-up guardrails"
            loading="eager"
          />
        </div>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-what-title">
        <h2 id="usecase-what-title">What it is (plain English)</h2>
        <ul>
          <li>You replace endless “how much?” threads with a short qualifier that captures pricing context.</li>
          <li>You route leads based on urgency + fit, then send a clean next step (call now or schedule link).</li>
          <li>You follow up once (max), then stop — so the system stays operator-safe.</li>
        </ul>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-how-title">
        <h2 id="usecase-how-title">How it works (4 steps)</h2>
        <ol className="usecase-steps">
          <li>
            <strong>Ask 6 questions.</strong> Project type, urgency, location, timeline, budget band, and preferred contact method.
          </li>
          <li>
            <strong>Confirm + set expectations.</strong> Fast acknowledgment with one clear next step (no “instant quotes” unless you can).
          </li>
          <li>
            <strong>Route the lead.</strong> Urgent → call now (human). Planned + high-fit → booking link. Low-fit → polite close.
          </li>
          <li>
            <strong>Follow up once.</strong> Stop on reply, honor opt-outs, and keep quiet hours/frequency caps.
          </li>
        </ol>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-guardrails-title">
        <h2 id="usecase-guardrails-title">Guardrails (operator-controlled)</h2>
        <ul>
          <li>Quiet hours + daily caps are default features.</li>
          <li>Stop on reply, and escalate complaints or “not interested” to a human.</li>
          <li>Compliance depends on your industry, region, and consent records — this page is not legal advice.</li>
        </ul>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-rightthurr-title">
        <h2 id="usecase-rightthurr-title">Right Thurr framing</h2>
        <p className="usecase-framing">
          <strong>Copy. Curate. Rebrand.</strong> The qualifier questions are easy — the routing rules and caps keep it safe to run.
        </p>
      </section>

      <section className="usecase-section usecase-cta" aria-labelledby="usecase-cta-title">
        <h2 id="usecase-cta-title">If you want it built</h2>
        <p>
          Start with the Lead Flow Audit. You’ll get a clean map of your qualifier questions, routing rules, and the simplest build list
          to keep it operator-safe.
        </p>
        <button className="stamp-button link-button" type="button" onClick={() => setPage('buildout')}>
          Start the audit
        </button>
      </section>
    </main>
  );
}

