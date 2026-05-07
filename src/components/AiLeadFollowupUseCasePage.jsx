import React from 'react';

export function AiLeadFollowupUseCasePage({ setPage }) {
  return (
    <main className="usecase-page" id="top">
      <section className="usecase-hero" aria-labelledby="usecase-hero-title">
        <div className="hero-copy">
          <div className="eyebrow">Use Case Template</div>
          <h1 id="usecase-hero-title">Reply fast. Book more.</h1>
          <p className="lead">A copyable follow-up system: capture → follow up → booked (operator-controlled).</p>
          <p className="usecase-disclaimer">
            Educational example. No guarantee of bookings, revenue, response rates, or compliance outcomes.
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
            src="/use-cases/ai-lead-followup-hero.svg"
            alt="Three-panel flow: lead capture to AI follow-up to booked calendar handoff"
            loading="eager"
          />
        </div>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-what-title">
        <h2 id="usecase-what-title">What it is (plain English)</h2>
        <ul>
          <li>Your leads get a real reply fast, with follow-ups if they go quiet.</li>
          <li>The system routes high-intent conversations to a human when needed.</li>
          <li>You get a paper trail: messages, outcomes, and “what happened?” reporting.</li>
        </ul>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-how-title">
        <h2 id="usecase-how-title">How it works (4 steps)</h2>
        <ol className="usecase-steps">
          <li>
            <strong>Connect lead capture.</strong> Forms, missed calls, DMs, or chat — start with the highest-volume source.
          </li>
          <li>
            <strong>Write scripts + tone.</strong> Short, operator-safe replies. Clear “next step” prompts.
          </li>
          <li>
            <strong>Define escalation rules.</strong> When to stop, when to pause, when to hand off to a human.
          </li>
          <li>
            <strong>Track outcomes.</strong> Booked, not a fit, no response — so you can improve lead quality over time.
          </li>
        </ol>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-guardrails-title">
        <h2 id="usecase-guardrails-title">Guardrails (operator-controlled)</h2>
        <ul>
          <li>No blasting lists. Follow-up is tied to inbound leads or explicit consent paths.</li>
          <li>Quiet hours + stop list + human takeover are always available.</li>
          <li>
            Compliance depends on your industry, region, and messaging approach — this page is not legal advice.
          </li>
        </ul>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-rightthurr-title">
        <h2 id="usecase-rightthurr-title">Right Thurr framing</h2>
        <p className="usecase-framing">
          <strong>Copy. Curate. Rebrand.</strong> The follow-up system is right there — but the offer and lead quality still
          matter.
        </p>
      </section>

      <section className="usecase-section usecase-cta" aria-labelledby="usecase-cta-title">
        <h2 id="usecase-cta-title">If you want it built</h2>
        <p>
          Start with the Lead Flow Audit. You’ll get a clean map of your capture points, follow-up gaps, and the simplest build
          list for your industry.
        </p>
        <button className="stamp-button link-button" type="button" onClick={() => setPage('buildout')}>
          Start the audit
        </button>
      </section>
    </main>
  );
}

