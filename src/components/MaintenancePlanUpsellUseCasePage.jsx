import React from 'react';

export function MaintenancePlanUpsellUseCasePage({ setPage }) {
  return (
    <main className="usecase-page" id="top">
      <section className="usecase-hero" aria-labelledby="usecase-hero-title">
        <div className="hero-copy">
          <div className="eyebrow">Use Case Template</div>
          <h1 id="usecase-hero-title">Turn one great job into predictable repeat work.</h1>
          <p className="lead">
            A copyable maintenance plan invite system: job complete trigger → short invite → clean enrollment → operator-safe follow-up rules.
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
            src="/use-cases/maintenance-plan-upsell-hero.svg"
            alt="Three-panel flow: job complete to plan invite to enrollment confirmation with guardrails"
            loading="eager"
          />
        </div>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-what-title">
        <h2 id="usecase-what-title">What it is (plain English)</h2>
        <ul>
          <li>You invite a customer to a simple plan right after a successful job.</li>
          <li>The invite is short: 2–3 benefits, one CTA (link or “reply YES”).</li>
          <li>If they don’t respond, you follow up once (max), then stop.</li>
        </ul>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-how-title">
        <h2 id="usecase-how-title">How it works (4 steps)</h2>
        <ol className="usecase-steps">
          <li>
            <strong>Pick the invite trigger.</strong> Typically “job completed + satisfied signal,” with exclusions (open complaint,
            warranty issue, unpaid invoice, do-not-contact).
          </li>
          <li>
            <strong>Send the invite.</strong> One message, one CTA, and clear terms (“cancel anytime” language and what’s included).
          </li>
          <li>
            <strong>Enroll cleanly.</strong> Confirm consent, capture the plan choice, and send a receipt/confirmation message.
          </li>
          <li>
            <strong>Follow up once.</strong> Stop on reply, honor opt-outs, and enforce quiet hours + frequency caps.
          </li>
        </ol>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-guardrails-title">
        <h2 id="usecase-guardrails-title">Guardrails (operator-controlled)</h2>
        <ul>
          <li>Consent-first: invite only through the channel the customer opted into (and keep records).</li>
          <li>Exclude open complaints/issues; route anything sensitive to a human.</li>
          <li>Stop on reply; “not interested” ends the sequence immediately.</li>
          <li>Compliance depends on your industry, region, and consent records — this page is not legal advice.</li>
        </ul>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-rightthurr-title">
        <h2 id="usecase-rightthurr-title">Right Thurr framing</h2>
        <p className="usecase-framing">
          <strong>Copy. Curate. Rebrand.</strong> The magic isn’t the pitch — it’s the trigger exclusions, caps, and clean enrollment confirmation.
        </p>
      </section>

      <section className="usecase-section usecase-cta" aria-labelledby="usecase-cta-title">
        <h2 id="usecase-cta-title">If you want it built</h2>
        <p>
          Start with the Lead Flow Audit. You’ll get a clean map of trigger rules, consent assumptions, message templates, and the build list to keep
          it operator-safe.
        </p>
        <button className="stamp-button link-button" type="button" onClick={() => setPage('buildout')}>
          Start the audit
        </button>
      </section>
    </main>
  );
}

