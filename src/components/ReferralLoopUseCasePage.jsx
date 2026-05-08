import React from 'react';

export function ReferralLoopUseCasePage({ setPage }) {
  return (
    <main className="usecase-page" id="top">
      <section className="usecase-hero" aria-labelledby="usecase-hero-title">
        <div className="hero-copy">
          <div className="eyebrow">Use Case Template</div>
          <h1 id="usecase-hero-title">Turn “great job” moments into referrals (without gimmicks).</h1>
          <p className="lead">
            A copyable referral loop: wait for a positive signal → ask once with quiet-hours + caps → stop on reply and route
            the conversation to a human.
          </p>
          <p className="usecase-disclaimer">
            Educational example. No guarantee of referrals, revenue, compliance outcomes, deliverability, or bookings.
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
            src="/use-cases/referral-loop-hero.svg"
            alt="Three-panel flow: positive signal to one ask to thank you and route replies, with guardrails"
            loading="eager"
          />
        </div>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-what-title">
        <h2 id="usecase-what-title">What it is (plain English)</h2>
        <ul>
          <li>You wait for a positive moment: job completed, “thanks!”, or a happy check-in.</li>
          <li>You send one clean referral ask (no incentives, no pressure).</li>
          <li>You stop on reply and route the conversation to a human so it stays operator-safe.</li>
        </ul>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-how-title">
        <h2 id="usecase-how-title">How it works (4 steps)</h2>
        <ol className="usecase-steps">
          <li>
            <strong>Trigger on a “positive signal”.</strong> Use an explicit moment: completed job, positive feedback, or a short
            “how did we do?” check-in that they answered positively.
          </li>
          <li>
            <strong>Send one ask inside quiet hours.</strong> Keep it short and specific: “If you know one person who needs this, who
            should we help next?” Avoid incentives unless your policy/legal review explicitly allows them.
          </li>
          <li>
            <strong>Stop on reply; route to a human.</strong> If they reply with a name, question, or “not interested”, stop the
            automation and hand off to the operator.
          </li>
          <li>
            <strong>Follow up once (max).</strong> If there’s no response, send one reminder (only once), then stop. Don’t chase.
          </li>
        </ol>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-guardrails-title">
        <h2 id="usecase-guardrails-title">Guardrails (operator-controlled)</h2>
        <ul>
          <li>Consent-first: use the channel the customer opted into (and keep records).</li>
          <li>No promises, no pressure, and no incentive language by default.</li>
          <li>Stop on reply; escalate questions, complaints, or “wrong number” immediately.</li>
          <li>Caps + quiet hours are default features.</li>
        </ul>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-rightthurr-title">
        <h2 id="usecase-rightthurr-title">Right Thurr framing</h2>
        <p className="usecase-framing">
          <strong>Copy. Curate. Rebrand.</strong> Referrals work when the trigger is real, the ask is clean, and the stop rules keep
          it safe to run.
        </p>
      </section>

      <section className="usecase-section usecase-cta" aria-labelledby="usecase-cta-title">
        <h2 id="usecase-cta-title">If you want it built</h2>
        <p>
          Start with the Lead Flow Audit. You’ll get the exact trigger signal, the message templates, quiet-hours + caps, and the
          routing rules to keep it operator-safe.
        </p>
        <button className="stamp-button link-button" type="button" onClick={() => setPage('buildout')}>
          Start the audit
        </button>
      </section>
    </main>
  );
}

