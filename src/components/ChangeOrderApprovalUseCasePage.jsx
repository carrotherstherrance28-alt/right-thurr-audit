import React from 'react';

export function ChangeOrderApprovalUseCasePage({ setPage }) {
  return (
    <main className="usecase-page" id="top">
      <section className="usecase-hero" aria-labelledby="usecase-hero-title">
        <div className="hero-copy">
          <div className="eyebrow">Use Case Template</div>
          <h1 id="usecase-hero-title">Approve scope changes without drama (and without surprise invoices).</h1>
          <p className="lead">
            A copyable change-order workflow: scope change signal → summarize in 2 bullets → get explicit approval → update the
            invoice + schedule with human-controlled guardrails.
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
            src="/use-cases/change-order-approval-hero.svg"
            alt="Three-panel flow: scope change signal to approval script with not-to-exceed range to outcomes including update invoice and proceed or pause and rescope"
            loading="eager"
          />
        </div>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-what-title">
        <h2 id="usecase-what-title">What it is (plain English)</h2>
        <ul>
          <li>You stop “scope creep” by requiring explicit approval before extra work starts.</li>
          <li>You summarize the change in a way a busy customer can approve quickly.</li>
          <li>You update invoice + schedule only after a human-controlled approval step.</li>
        </ul>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-how-title">
        <h2 id="usecase-how-title">How it works (4 steps)</h2>
        <ol className="usecase-steps">
          <li>
            <strong>Trigger on a “scope change” signal.</strong> A customer request (“can we add…”), an on-site surprise, or an
            operator note.
          </li>
          <li>
            <strong>Write the summary in 2 bullets.</strong> What changed + what stays the same. Add one photo if it helps.
          </li>
          <li>
            <strong>Send one approval message.</strong> Provide a delta range + a not-to-exceed amount (human approved), then a
            single approve/decline CTA.
          </li>
          <li>
            <strong>Apply the outcome.</strong> If approved: update invoice version + schedule and proceed. If declined: revert
            scope or reschedule—no back-and-forth over text.
          </li>
        </ol>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-guardrails-title">
        <h2 id="usecase-guardrails-title">Guardrails (operator-controlled)</h2>
        <ul>
          <li>No extra work until approval is captured (written or recorded).</li>
          <li>No hard promises: use a range + not-to-exceed amount that’s human approved.</li>
          <li>One follow-up max if they don’t respond; stop on reply or “not interested”.</li>
          <li>If pricing gets emotional or heated, escalate to a human call—don’t debate by text.</li>
        </ul>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-rightthurr-title">
        <h2 id="usecase-rightthurr-title">Right Thurr framing</h2>
        <p className="usecase-framing">
          <strong>Clarity beats conflict.</strong> A clean change order protects both sides: the customer feels respected, the
          operator keeps control, and the team gets an audit trail.
        </p>
      </section>

      <section className="usecase-section usecase-cta" aria-labelledby="usecase-cta-title">
        <h2 id="usecase-cta-title">If you want it built</h2>
        <p>
          Start with the Lead Flow Audit. You’ll get the exact “change order” script, the approval capture step, and the stop
          rules that keep it operator-safe.
        </p>
        <button className="stamp-button link-button" type="button" onClick={() => setPage('buildout')}>
          Start the audit
        </button>
      </section>
    </main>
  );
}

