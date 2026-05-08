import React from 'react';

export function ProjectPhotoProofUseCasePage({ setPage }) {
  return (
    <main className="usecase-page" id="top">
      <section className="usecase-hero" aria-labelledby="usecase-hero-title">
        <div className="hero-copy">
          <div className="eyebrow">Use Case Template</div>
          <h1 id="usecase-hero-title">Collect photo proof + permission (without awkward follow-up).</h1>
          <p className="lead">
            A copyable photo proof system: job complete → request 3 photos → one permission reply, with operator-safe stop rules.
          </p>
          <p className="usecase-disclaimer">
            Educational example. No guarantee of revenue, compliance outcomes, deliverability, or bookings.
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
            src="/use-cases/project-photo-proof-hero.svg"
            alt="Three-panel flow: job complete to photo request to permission reply, with guardrails"
            loading="eager"
          />
        </div>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-what-title">
        <h2 id="usecase-what-title">What it is (plain English)</h2>
        <ul>
          <li>You ask for three simple photos after a successful job.</li>
          <li>You ask for one clear permission reply (“YES/NO”) to use them in your portfolio.</li>
          <li>You keep it operator-safe: stop on reply, cap follow-ups, and honor takedown requests.</li>
        </ul>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-how-title">
        <h2 id="usecase-how-title">How it works (4 steps)</h2>
        <ol className="usecase-steps">
          <li>
            <strong>Gate it with a “job complete” signal.</strong> Trigger only after delivery is finished and the customer is happy.
          </li>
          <li>
            <strong>Ask for 3 angles (specific).</strong> Wide context, close detail, and the “result” moment. Make it easy to comply.
          </li>
          <li>
            <strong>Ask for permission in one sentence.</strong> “Reply YES if we can use these photos in our portfolio. Reply NO to keep
            them private.”
          </li>
          <li>
            <strong>Follow up once (max), then stop.</strong> If there’s no response, send one reminder inside quiet hours, then stop.
            Route questions to a human.
          </li>
        </ol>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-guardrails-title">
        <h2 id="usecase-guardrails-title">Guardrails (operator-controlled)</h2>
        <ul>
          <li>Consent-first: use the channel the customer opted into (and keep records).</li>
          <li>Stop on reply; escalate complaints or “not interested” to a human.</li>
          <li>Caps + quiet hours are default features.</li>
          <li>Honor takedown requests quickly; log the action.</li>
        </ul>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-rightthurr-title">
        <h2 id="usecase-rightthurr-title">Right Thurr framing</h2>
        <p className="usecase-framing">
          <strong>Proof closes.</strong> A clean library of real work (with permission) makes everything else convert better — ads,
          landing pages, and follow-up scripts.
        </p>
      </section>

      <section className="usecase-section usecase-cta" aria-labelledby="usecase-cta-title">
        <h2 id="usecase-cta-title">If you want it built</h2>
        <p>
          Start with the Lead Flow Audit. You’ll get the “job complete” trigger, the permission language, and the guardrails to keep
          it operator-safe.
        </p>
        <button className="stamp-button link-button" type="button" onClick={() => setPage('buildout')}>
          Start the audit
        </button>
      </section>
    </main>
  );
}

