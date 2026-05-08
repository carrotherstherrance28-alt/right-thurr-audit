import React from 'react';

export function NoShowSaverUseCasePage({ setPage }) {
  return (
    <main className="usecase-page" id="top">
      <section className="usecase-hero" aria-labelledby="usecase-hero-title">
        <div className="hero-copy">
          <div className="eyebrow">Use Case Template</div>
          <h1 id="usecase-hero-title">No-shows don’t have to win.</h1>
          <p className="lead">
            A copyable appointment confirmation system: booked → confirm/remind → reschedule/save (operator-controlled).
          </p>
          <p className="usecase-disclaimer">
            Educational example. No guarantee of attendance, booking rate, or outcomes.
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
            src="/use-cases/no-show-saver-hero.svg"
            alt="Three-panel flow: appointment booked to confirmation and reminders to reschedule and save"
            loading="eager"
          />
        </div>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-what-title">
        <h2 id="usecase-what-title">What it is (plain English)</h2>
        <ul>
          <li>When someone books, they get one confirmation question (yes or reschedule).</li>
          <li>They get a reminder (or two) at safe times — and the system stops on reply.</li>
          <li>If they can’t make it, you offer a clean reschedule path so the slot doesn’t just die.</li>
        </ul>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-how-title">
        <h2 id="usecase-how-title">How it works (4 steps)</h2>
        <ol className="usecase-steps">
          <li>
            <strong>Trigger from “booked”.</strong> New calendar appointment, form submission, or manual entry.
          </li>
          <li>
            <strong>Ask for confirmation.</strong> One question + one easy reschedule option (operator-approved).
          </li>
          <li>
            <strong>Send reminders (lightweight).</strong> A 24-hour reminder + a 2-hour reminder (quiet hours enforced).
          </li>
          <li>
            <strong>Save the appointment.</strong> Stop on reply, route edge cases to a human, and track outcomes weekly.
          </li>
        </ol>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-guardrails-title">
        <h2 id="usecase-guardrails-title">Guardrails (operator-controlled)</h2>
        <ul>
          <li>Quiet hours + stop list + opt-out keywords are default features.</li>
          <li>Stop on reply. No endless follow-up loops.</li>
          <li>Compliance depends on your industry, region, and message content — this page is not legal advice.</li>
        </ul>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-rightthurr-title">
        <h2 id="usecase-rightthurr-title">Right Thurr framing</h2>
        <p className="usecase-framing">
          <strong>Copy. Curate. Rebrand.</strong> The confirmation workflow is right there — but you decide the rules.
        </p>
      </section>

      <section className="usecase-section usecase-cta" aria-labelledby="usecase-cta-title">
        <h2 id="usecase-cta-title">If you want it built</h2>
        <p>
          Start with the Lead Flow Audit. You’ll get a clean map of your booking-to-confirmation path, the scripts to approve, and
          the guardrails to keep it operator-safe.
        </p>
        <button className="stamp-button link-button" type="button" onClick={() => setPage('buildout')}>
          Start the audit
        </button>
      </section>
    </main>
  );
}

