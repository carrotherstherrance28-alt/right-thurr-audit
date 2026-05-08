import React from 'react';

export function WarrantyClaimIntakeUseCasePage({ setPage }) {
  return (
    <main className="usecase-page" id="top">
      <section className="usecase-hero" aria-labelledby="usecase-hero-title">
        <div className="hero-copy">
          <div className="eyebrow">Use Case Template</div>
          <h1 id="usecase-hero-title">Handle warranty claims with calm intake + human-controlled outcomes.</h1>
          <p className="lead">
            A copyable warranty intake system: claim received → collect the minimum evidence → route to a human review queue →
            schedule repair or close the loop (stop rules included).
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
            src="/use-cases/warranty-claim-intake-hero.svg"
            alt="Three-panel flow: warranty claim trigger to intake evidence checklist to outcomes including schedule repair, request more info once, deny with reason, or goodwill credit with stop rules"
            loading="eager"
          />
        </div>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-what-title">
        <h2 id="usecase-what-title">What it is (plain English)</h2>
        <ul>
          <li>You acknowledge a warranty claim fast without promising a specific outcome.</li>
          <li>You collect the minimum proof needed to review (photos, short summary, receipt if available).</li>
          <li>You route it to a human-controlled decision lane, then close the loop with a clear next step.</li>
        </ul>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-how-title">
        <h2 id="usecase-how-title">How it works (4 steps)</h2>
        <ol className="usecase-steps">
          <li>
            <strong>Trigger on a “warranty claim” signal.</strong> A reply, a form submission, a call note, or a “this
            shouldn’t have happened” message.
          </li>
          <li>
            <strong>Send one intake message.</strong> Confirm receipt, request 2–3 photos and a one-line issue summary, and
            set an honest review timeline range.
          </li>
          <li>
            <strong>Route to human review.</strong> Operator-safe rules decide the lane (standard queue vs manager vs safety
            escalation).
          </li>
          <li>
            <strong>Close the loop.</strong> Schedule inspection/repair, request more info once, deny with a reason template,
            or offer goodwill credit (if approved).
          </li>
        </ol>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-guardrails-title">
        <h2 id="usecase-guardrails-title">Guardrails (operator-controlled)</h2>
        <ul>
          <li>No coverage promises: “We’ll review and call” beats “It’s covered”.</li>
          <li>No refund/discount promises without human approval.</li>
          <li>One follow-up max for missing photos; stop on reply.</li>
          <li>If it’s heated, move to a call with a human; don’t argue over text/email.</li>
        </ul>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-rightthurr-title">
        <h2 id="usecase-rightthurr-title">Right Thurr framing</h2>
        <p className="usecase-framing">
          <strong>Speed + clarity beats debate.</strong> A warranty workflow is a trust moment: acknowledge fast, collect clean
          evidence, and route decisions to a human lane with an audit trail.
        </p>
      </section>

      <section className="usecase-section usecase-cta" aria-labelledby="usecase-cta-title">
        <h2 id="usecase-cta-title">If you want it built</h2>
        <p>
          Start with the Lead Flow Audit. You’ll get the exact intake script, the routing rules, and the stop rules that keep it
          operator-safe.
        </p>
        <button className="stamp-button link-button" type="button" onClick={() => setPage('buildout')}>
          Start the audit
        </button>
      </section>
    </main>
  );
}

