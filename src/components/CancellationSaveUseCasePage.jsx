import React from 'react';

export function CancellationSaveUseCasePage({ setPage }) {
  return (
    <main className="usecase-page" id="top">
      <section className="usecase-hero" aria-labelledby="usecase-hero-title">
        <div className="hero-copy">
          <div className="eyebrow">Use Case Template</div>
          <h1 id="usecase-hero-title">Save cancellations (without pressure, spam, or awkward chasing).</h1>
          <p className="lead">
            A copyable cancellation-save system: cancellation signal → one optional save offer → rebook/close, with operator-safe stop
            rules.
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
            src="/use-cases/cancellation-save-hero.svg"
            alt="Three-panel flow: cancellation trigger to optional save offer to rebook or close, with guardrails"
            loading="eager"
          />
        </div>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-what-title">
        <h2 id="usecase-what-title">What it is (plain English)</h2>
        <ul>
          <li>You detect when an appointment is canceled.</li>
          <li>You send one polite, optional “want to reschedule?” message (with a link).</li>
          <li>You stop fast: stop on reply, cap follow-ups, honor opt-out, and log the outcome.</li>
        </ul>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-how-title">
        <h2 id="usecase-how-title">How it works (4 steps)</h2>
        <ol className="usecase-steps">
          <li>
            <strong>Trigger on a real cancel signal.</strong> Use your CRM, calendar, or booking tool event — not “guesswork”.
          </li>
          <li>
            <strong>Gate timing + context.</strong> Only run inside business hours, and only if the cancellation happened recently.
          </li>
          <li>
            <strong>Send one optional save offer.</strong> Keep it pressure-free: “No worries — want to reschedule instead?” Include one
            link.
          </li>
          <li>
            <strong>Stop on reply. Follow up once (max).</strong> If no response, send one reminder, then close the loop and stop
            messaging.
          </li>
        </ol>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-guardrails-title">
        <h2 id="usecase-guardrails-title">Guardrails (operator-controlled)</h2>
        <ul>
          <li>Consent-first: only message customers who opted into the channel.</li>
          <li>Stop on reply; escalate complaints or “not interested” to a human.</li>
          <li>Caps + quiet hours are default features.</li>
          <li>No pressure language. Provide a clean “ignore to keep canceled” path.</li>
        </ul>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-rightthurr-title">
        <h2 id="usecase-rightthurr-title">Right Thurr framing</h2>
        <p className="usecase-framing">
          <strong>Speed saves.</strong> The fastest way to recover a cancellation is a calm, optional reschedule path sent right after
          the cancel event — not a long “sales sequence”.
        </p>
      </section>

      <section className="usecase-section usecase-cta" aria-labelledby="usecase-cta-title">
        <h2 id="usecase-cta-title">If you want it built</h2>
        <p>
          Start with the Lead Flow Audit. You’ll get the cancellation triggers, the save-offer language, and the guardrails to keep it
          operator-safe.
        </p>
        <button className="stamp-button link-button" type="button" onClick={() => setPage('buildout')}>
          Start the audit
        </button>
      </section>
    </main>
  );
}

