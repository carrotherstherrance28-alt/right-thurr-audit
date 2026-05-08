import React from 'react';

export function MissedCallTextbackUseCasePage({ setPage }) {
  return (
    <main className="usecase-page" id="top">
      <section className="usecase-hero" aria-labelledby="usecase-hero-title">
        <div className="hero-copy">
          <div className="eyebrow">Use Case Template</div>
          <h1 id="usecase-hero-title">Recover missed calls.</h1>
          <p className="lead">A copyable call-recovery system: missed call → textback → booked (operator-controlled).</p>
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
            src="/use-cases/missed-call-textback-hero.svg"
            alt="Three-panel flow: missed call to textback follow-up to booked handoff"
            loading="eager"
          />
        </div>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-what-title">
        <h2 id="usecase-what-title">What it is (plain English)</h2>
        <ul>
          <li>When a call is missed, the lead gets a real reply quickly (usually via text).</li>
          <li>Follow-ups happen only for inbound calls/voicemails — no list blasting.</li>
          <li>You keep control: scripts, hours, stop list, and when a human takes over.</li>
        </ul>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-how-title">
        <h2 id="usecase-how-title">How it works (4 steps)</h2>
        <ol className="usecase-steps">
          <li>
            <strong>Detect missed calls.</strong> Pull from your phone system, call tracking, or CRM activity feed.
          </li>
          <li>
            <strong>Send a short textback.</strong> One sentence + one question (simple, human, operator-approved).
          </li>
          <li>
            <strong>Follow up + escalate.</strong> Quiet hours, stop list, and “human takeover” rules are always available.
          </li>
          <li>
            <strong>Track outcomes.</strong> Booked, no response, wrong number — so you can improve the front-end offer.
          </li>
        </ol>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-guardrails-title">
        <h2 id="usecase-guardrails-title">Guardrails (operator-controlled)</h2>
        <ul>
          <li>Inbound-only: missed calls and voicemails, not purchased lists.</li>
          <li>Quiet hours + stop list + human takeover are default features, not add-ons.</li>
          <li>Compliance depends on your industry, region, and messaging approach — this page is not legal advice.</li>
        </ul>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-rightthurr-title">
        <h2 id="usecase-rightthurr-title">Right Thurr framing</h2>
        <p className="usecase-framing">
          <strong>Copy. Curate. Rebrand.</strong> Missed call recovery is right there — but the messaging has to fit your market.
        </p>
      </section>

      <section className="usecase-section usecase-cta" aria-labelledby="usecase-cta-title">
        <h2 id="usecase-cta-title">If you want it built</h2>
        <p>
          Start with the Lead Flow Audit. You’ll get a clean map of your inbound calls, your missed-call volume, and the simplest
          build list to recover the conversations you already paid for.
        </p>
        <button className="stamp-button link-button" type="button" onClick={() => setPage('buildout')}>
          Start the audit
        </button>
      </section>
    </main>
  );
}

