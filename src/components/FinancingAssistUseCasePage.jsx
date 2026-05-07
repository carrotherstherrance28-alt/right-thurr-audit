import React from 'react';

export function FinancingAssistUseCasePage({ setPage }) {
  return (
    <main className="usecase-page" id="top">
      <section className="usecase-hero" aria-labelledby="usecase-hero-title">
        <div className="hero-copy">
          <div className="eyebrow">Use Case Template</div>
          <h1 id="usecase-hero-title">Help customers say “yes” with financing options (without promises).</h1>
          <p className="lead">
            A copyable financing assist system: quote is clear → one provider link + disclosure → confirm the next step, with
            operator-safe stop rules.
          </p>
          <p className="usecase-disclaimer">
            Educational example. No guarantee of approvals, rates, revenue, compliance outcomes, deliverability, or bookings.
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
            src="/use-cases/financing-assist-hero.svg"
            alt="Three-panel flow: quote ready to financing options link to booked next step, with guardrails"
            loading="eager"
          />
        </div>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-what-title">
        <h2 id="usecase-what-title">What it is (plain English)</h2>
        <ul>
          <li>You make the quote clear (scope, price range, and the next step).</li>
          <li>You offer one financing options link for customers who want to split the cost.</li>
          <li>You keep it operator-safe: stop on reply, cap follow-ups, and route questions to a human.</li>
        </ul>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-how-title">
        <h2 id="usecase-how-title">How it works (4 steps)</h2>
        <ol className="usecase-steps">
          <li>
            <strong>Gate it with a “quote is ready” signal.</strong> Only offer financing after the scope is clear and the customer has
            enough context to decide.
          </li>
          <li>
            <strong>Send one link + one disclosure.</strong> Keep it short: “Here are financing options” + “approvals/terms are handled
            by the provider.”
          </li>
          <li>
            <strong>Confirm the next step.</strong> Once they confirm a path (cash/finance), book the consult, schedule, or site visit
            — and set expectations.
          </li>
          <li>
            <strong>Follow up once (max).</strong> If there’s no response, send one reminder inside quiet hours, then stop. Route
            financing questions to a human.
          </li>
        </ol>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-guardrails-title">
        <h2 id="usecase-guardrails-title">Guardrails (operator-controlled)</h2>
        <ul>
          <li>Consent-first: use the channel the customer opted into (and keep records).</li>
          <li>Never promise approval, rates, or outcomes; keep it educational.</li>
          <li>Stop on reply; escalate questions, complaints, or “not interested” to a human.</li>
          <li>Caps + quiet hours are default features.</li>
        </ul>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-rightthurr-title">
        <h2 id="usecase-rightthurr-title">Right Thurr framing</h2>
        <p className="usecase-framing">
          <strong>Copy. Curate. Rebrand.</strong> Financing offers work when the quote is clear, the disclosure is consistent, and the
          stop rules keep it safe to run.
        </p>
      </section>

      <section className="usecase-section usecase-cta" aria-labelledby="usecase-cta-title">
        <h2 id="usecase-cta-title">If you want it built</h2>
        <p>
          Start with the Lead Flow Audit. You’ll get the “quote ready” signal, compliant disclosure language, the message templates,
          and the guardrails to keep it operator-safe.
        </p>
        <button className="stamp-button link-button" type="button" onClick={() => setPage('buildout')}>
          Start the audit
        </button>
      </section>
    </main>
  );
}

