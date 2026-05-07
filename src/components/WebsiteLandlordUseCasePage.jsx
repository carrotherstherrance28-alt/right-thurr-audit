import React from 'react';

export function WebsiteLandlordUseCasePage({ setPage }) {
  return (
    <main className="usecase-page" id="top">
      <section className="usecase-hero" aria-labelledby="usecase-hero-title">
        <div className="hero-copy">
          <div className="eyebrow">Use Case Template</div>
          <h1 id="usecase-hero-title">Own the lead path.</h1>
          <p className="lead">
            A copyable local lead-flow template: build → track → route → report.
          </p>
          <p className="usecase-disclaimer">
            Educational example. No guarantee of rankings, leads, revenue, or retention.
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
            src="/use-cases/website-landlord-hero.svg"
            alt="Three-panel flow: site to tracking to operator routing"
            loading="eager"
          />
        </div>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-what-title">
        <h2 id="usecase-what-title">What it is (plain English)</h2>
        <ul>
          <li>You own a niche + city website that can generate inquiries over time.</li>
          <li>You route those inquiries to a local operator for a flat monthly fee.</li>
          <li>The “asset” is the measurable lead path — not hype or screenshots.</li>
        </ul>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-how-title">
        <h2 id="usecase-how-title">How it works (4 steps)</h2>
        <ol className="usecase-steps">
          <li>
            <strong>Pick niche + city.</strong> Start narrow so the offer and pages stay focused.
          </li>
          <li>
            <strong>Build for calls + forms.</strong> Clear next step, clean copy, simple proof, fast load.
          </li>
          <li>
            <strong>Earn visibility (carefully).</strong> It depends on the market. No guarantees.
          </li>
          <li>
            <strong>Track + route to an operator.</strong> If you can’t measure it, you can’t rent it.
          </li>
        </ol>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-real-title">
        <h2 id="usecase-real-title">What makes it real (tracking + reporting)</h2>
        <ul>
          <li>Call tracking and form tracking (generic examples only).</li>
          <li>UTM/source notes so you can explain “where did this come from?”</li>
          <li>Simple reporting that makes the value obvious without promises.</li>
        </ul>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-pricing-title">
        <h2 id="usecase-pricing-title">Pricing positioning (no numbers)</h2>
        <p>
          Flat monthly is common. Ranges depend on market demand, lead quality, and how measurable the system is. Public-facing
          copy should avoid quoting specific dollar amounts unless explicitly approved.
        </p>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-rightthurr-title">
        <h2 id="usecase-rightthurr-title">Right Thurr framing</h2>
        <p className="usecase-framing">
          <strong>Copy. Curate. Rebrand.</strong> The play is right there — but the system still has to work.
        </p>
      </section>

      <section className="usecase-section usecase-cta" aria-labelledby="usecase-cta-title">
        <h2 id="usecase-cta-title">If you want it built</h2>
        <p>
          Start with the Lead Flow Audit. You’ll get a clean map of the lead path, the risks, the requirements, and a first build
          list for your niche.
        </p>
        <button className="stamp-button link-button" type="button" onClick={() => setPage('buildout')}>
          Start the audit
        </button>
      </section>
    </main>
  );
}

