import React from 'react';

export function DepositRequestUseCasePage({ setPage }) {
  return (
    <main className="usecase-page" id="top">
      <section className="usecase-hero" aria-labelledby="usecase-hero-title">
        <div className="hero-copy">
          <div className="eyebrow">Use Case Template</div>
          <h1 id="usecase-hero-title">Turn “yes” into a paid scheduled next step (without chasing).</h1>
          <p className="lead">
            A copyable deposit request system: clear acceptance signal → one secure link → receipt + next-step confirmation
            with operator-safe stop rules.
          </p>
          <p className="usecase-disclaimer">
            Educational example. No guarantee of bookings, revenue, payment acceptance, compliance outcomes, or deliverability.
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
            src="/use-cases/deposit-request-hero.svg"
            alt="Three-panel flow: quote accepted to deposit payment link to confirmed next step, with guardrails"
            loading="eager"
          />
        </div>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-what-title">
        <h2 id="usecase-what-title">What it is (plain English)</h2>
        <ul>
          <li>You only request a deposit after the customer clearly accepts the quote.</li>
          <li>You send one secure payment link with a short, calm explanation of what the deposit does.</li>
          <li>After payment, you send a receipt plus the next step (schedule, start date, or prep instructions).</li>
        </ul>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-how-title">
        <h2 id="usecase-how-title">How it works (4 steps)</h2>
        <ol className="usecase-steps">
          <li>
            <strong>Define an acceptance signal.</strong> A signed estimate, an “approved” status in your CRM, or an explicit “yes”
            reply — not “sounds good” in a vague thread.
          </li>
          <li>
            <strong>Send the deposit request.</strong> One message, one link, and one next step. Keep the explanation short: what it
            reserves and that it’s applied to the total.
          </li>
          <li>
            <strong>Confirm payment + next step.</strong> Receipt, calendar link (if needed), and what to expect next.
          </li>
          <li>
            <strong>Follow up once (max).</strong> If they don’t pay, send one reminder inside quiet hours, then stop. Route replies
            and payment questions to a human.
          </li>
        </ol>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-guardrails-title">
        <h2 id="usecase-guardrails-title">Guardrails (operator-controlled)</h2>
        <ul>
          <li>Consent-first: use the channel the customer opted into (and keep records).</li>
          <li>Caps + quiet hours are default features.</li>
          <li>Stop on reply; escalate complaints, “not interested”, or billing disputes to a human.</li>
          <li>Never include sensitive payment data in messages; always use a secure provider link.</li>
        </ul>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-rightthurr-title">
        <h2 id="usecase-rightthurr-title">Right Thurr framing</h2>
        <p className="usecase-framing">
          <strong>Copy. Curate. Rebrand.</strong> Deposits work when the rules are clear: accept-signal gating, one-link simplicity,
          and stop rules that keep it operator-safe.
        </p>
      </section>

      <section className="usecase-section usecase-cta" aria-labelledby="usecase-cta-title">
        <h2 id="usecase-cta-title">If you want it built</h2>
        <p>
          Start with the Lead Flow Audit. You’ll get the acceptance signal definition, deposit policy copy, receipt/next-step message,
          and the guardrails to keep it safe to run.
        </p>
        <button className="stamp-button link-button" type="button" onClick={() => setPage('buildout')}>
          Start the audit
        </button>
      </section>
    </main>
  );
}

