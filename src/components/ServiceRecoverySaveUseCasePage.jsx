import React from 'react';

export function ServiceRecoverySaveUseCasePage({ setPage }) {
  return (
    <main className="usecase-page" id="top">
      <section className="usecase-hero" aria-labelledby="usecase-hero-title">
        <div className="hero-copy">
          <div className="eyebrow">Use Case Template</div>
          <h1 id="usecase-hero-title">Turn “not happy” into a calm next step with one recovery message.</h1>
          <p className="lead">
            A copyable service recovery system: complaint or low-score signal → one apology + next step → schedule a fix
            lane or escalate to a manager (stop rules included).
          </p>
          <p className="usecase-disclaimer">
            Educational example. No guarantee of revenue, compliance outcomes, reputation outcomes, or operational results.
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
            src="/use-cases/service-recovery-save-hero.svg"
            alt="Three-panel flow: complaint or low-score signal to apology-plus-next-step message to fix lane, manager call-back, or human escalation outcomes with stop rules"
            loading="eager"
          />
        </div>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-what-title">
        <h2 id="usecase-what-title">What it is (plain English)</h2>
        <ul>
          <li>You respond to negative feedback with one calm message — not a long back-and-forth.</li>
          <li>You collect the minimum detail needed to route to the right person.</li>
          <li>You turn emotion into a next step: fix visit, manager call-back, or safe escalation.</li>
        </ul>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-how-title">
        <h2 id="usecase-how-title">How it works (4 steps)</h2>
        <ol className="usecase-steps">
          <li>
            <strong>Trigger on a “something went wrong” signal.</strong> Complaint reply, low-score survey, unhappy email,
            chargeback-risk flag, or an operator note.
          </li>
          <li>
            <strong>Send one recovery message.</strong> Apologize, ask for a one-line issue summary, and offer a call-back or
            fix-lane scheduling.
          </li>
          <li>
            <strong>Route to the right lane.</strong> Quick fix: schedule a redo. Complex/angry: manager call-back. Risky/safety:
            immediate human escalation.
          </li>
          <li>
            <strong>Stop fast.</strong> Stop on reply. One follow-up max. Keep an audit trail and close the loop when resolved.
          </li>
        </ol>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-guardrails-title">
        <h2 id="usecase-guardrails-title">Guardrails (operator-controlled)</h2>
        <ul>
          <li>No arguing by text. If it’s heated, move to a call with a human.</li>
          <li>No refund/discount promises without human approval.</li>
          <li>Keep promises small: “We’ll call today” beats “We’ll fix everything tonight”.</li>
          <li>Stop on reply; cap follow-ups; respect quiet hours and consent rules.</li>
        </ul>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-rightthurr-title">
        <h2 id="usecase-rightthurr-title">Right Thurr framing</h2>
        <p className="usecase-framing">
          <strong>Speed + empathy beats debate.</strong> Your job is to convert “friction” into a next step the operator can
          execute — fast, calm, and documented.
        </p>
      </section>

      <section className="usecase-section usecase-cta" aria-labelledby="usecase-cta-title">
        <h2 id="usecase-cta-title">If you want it built</h2>
        <p>
          Start with the Lead Flow Audit. You’ll get the exact recovery script, the routing rules, and the stop rules that keep it
          operator-safe.
        </p>
        <button className="stamp-button link-button" type="button" onClick={() => setPage('buildout')}>
          Start the audit
        </button>
      </section>
    </main>
  );
}

