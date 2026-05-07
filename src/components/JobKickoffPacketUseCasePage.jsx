import React from 'react';

export function JobKickoffPacketUseCasePage({ setPage }) {
  return (
    <main className="usecase-page" id="top">
      <section className="usecase-hero" aria-labelledby="usecase-hero-title">
        <div className="hero-copy">
          <div className="eyebrow">Use Case Template</div>
          <h1 id="usecase-hero-title">Turn the “yes” into a clean kickoff (so the job doesn’t start messy).</h1>
          <p className="lead">
            A copyable kickoff workflow: deposit/yes → send one calm “what to expect” packet → confirm access + prep → proceed
            with operator-controlled guardrails.
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
            src="/use-cases/job-kickoff-packet-hero.svg"
            alt="Three-panel flow: deposit or yes trigger to kickoff packet message to outcomes including confirmed and proceed or clarify on a quick call"
            loading="eager"
          />
        </div>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-what-title">
        <h2 id="usecase-what-title">What it is (plain English)</h2>
        <ul>
          <li>You send one consistent “here’s what to expect” message immediately after a customer says yes.</li>
          <li>You confirm the details that cause day-of chaos (access, parking, pets, prep, and best contact).</li>
          <li>You set stop rules so the team doesn’t spiral into endless texting.</li>
        </ul>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-how-title">
        <h2 id="usecase-how-title">How it works (4 steps)</h2>
        <ol className="usecase-steps">
          <li>
            <strong>Trigger on the “yes”.</strong> Deposit paid, quote accepted, signed estimate, or a clear “let’s do it.”
          </li>
          <li>
            <strong>Send one kickoff packet.</strong> Date/time window + arrival policy + prep list + 2-bullet scope recap.
          </li>
          <li>
            <strong>Ask for the friction killers.</strong> Access/gate code, parking, pets, fragile items, and best day-of
            contact.
          </li>
          <li>
            <strong>Capture the outcome.</strong> Confirmed → proceed. Confused → schedule a quick call. No reply → one follow-up
            max.
          </li>
        </ol>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-guardrails-title">
        <h2 id="usecase-guardrails-title">Guardrails (operator-controlled)</h2>
        <ul>
          <li>No promises outside the written scope; route change requests into a change-order step.</li>
          <li>One follow-up max if they don’t reply; stop on any response.</li>
          <li>If the customer seems confused, escalate to a call (don’t debate by text).</li>
          <li>Keep the kickoff packet short; it should reduce anxiety, not create it.</li>
        </ul>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-rightthurr-title">
        <h2 id="usecase-rightthurr-title">Right Thurr framing</h2>
        <p className="usecase-framing">
          <strong>Clean handoffs create clean jobs.</strong> Most “day-of issues” are really “kickoff issues.” This packet makes
          the next step obvious, and it gives the operator a consistent way to stay in control.
        </p>
      </section>

      <section className="usecase-section usecase-cta" aria-labelledby="usecase-cta-title">
        <h2 id="usecase-cta-title">If you want it built</h2>
        <p>
          Start with the Lead Flow Audit. You’ll get a kickoff packet that matches your offer, your tone, and the stop rules that
          keep it operator-safe.
        </p>
        <button className="stamp-button link-button" type="button" onClick={() => setPage('buildout')}>
          Start the audit
        </button>
      </section>
    </main>
  );
}

