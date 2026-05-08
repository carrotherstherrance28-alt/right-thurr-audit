import React from 'react';

export function InvoiceFollowUpUseCasePage({ setPage }) {
  return (
    <main className="usecase-page" id="top">
      <section className="usecase-hero" aria-labelledby="usecase-hero-title">
        <div className="hero-copy">
          <div className="eyebrow">Use Case Template</div>
          <h1 id="usecase-hero-title">Get invoices paid (without threats, spam, or awkward chasing).</h1>
          <p className="lead">
            A copyable invoice-follow-up system: invoice unpaid → one calm reminder with a secure link → stop rules + human
            escalation.
          </p>
          <p className="usecase-disclaimer">
            Educational example. No guarantee of revenue, compliance outcomes, deliverability, or payment collection.
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
            src="/use-cases/invoice-follow-up-hero.svg"
            alt="Three-panel flow: unpaid invoice trigger to a friendly reminder with pay link to paid/question/closed outcomes, with guardrails"
            loading="eager"
          />
        </div>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-what-title">
        <h2 id="usecase-what-title">What it is (plain English)</h2>
        <ul>
          <li>You detect when an invoice is still unpaid after a short window.</li>
          <li>You send one friendly “quick check-in” reminder with a secure payment link.</li>
          <li>You stop fast: stop on reply, cap follow-ups, honor opt-out, and route disputes/questions to a human.</li>
        </ul>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-how-title">
        <h2 id="usecase-how-title">How it works (4 steps)</h2>
        <ol className="usecase-steps">
          <li>
            <strong>Trigger on a real unpaid state.</strong> Use your invoicing tool status (sent/open/unpaid), not “guesswork”.
          </li>
          <li>
            <strong>Gate timing + channel.</strong> Wait at least 24 hours (or your policy) and run only in business hours. Only message
            customers who opted into the channel.
          </li>
          <li>
            <strong>Send one calm reminder with one link.</strong> Keep it simple: invoice number + amount + secure pay link + “reply if
            you have a question”.
          </li>
          <li>
            <strong>Stop on reply. Follow up once (max).</strong> If no response, send one reminder (optional), then close the loop and
            stop messaging.
          </li>
        </ol>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-guardrails-title">
        <h2 id="usecase-guardrails-title">Guardrails (operator-controlled)</h2>
        <ul>
          <li>No threats, pressure, or “final notice” language by default.</li>
          <li>Stop on reply; disputes/questions route to a human.</li>
          <li>Caps + quiet hours are default features.</li>
          <li>Use a secure provider link (Stripe/QuickBooks/etc.) — no raw card collection over SMS.</li>
        </ul>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-rightthurr-title">
        <h2 id="usecase-rightthurr-title">Right Thurr framing</h2>
        <p className="usecase-framing">
          <strong>Clarity collects.</strong> Most unpaid invoices aren’t “refusals” — they’re confusion or busy. A calm reminder with one
          clean pay link + a reply-to-help path collects without damaging trust.
        </p>
      </section>

      <section className="usecase-section usecase-cta" aria-labelledby="usecase-cta-title">
        <h2 id="usecase-cta-title">If you want it built</h2>
        <p>
          Start with the Lead Flow Audit. You’ll get the invoice triggers, the reminder language, and the guardrails to keep it
          operator-safe.
        </p>
        <button className="stamp-button link-button" type="button" onClick={() => setPage('buildout')}>
          Start the audit
        </button>
      </section>
    </main>
  );
}

