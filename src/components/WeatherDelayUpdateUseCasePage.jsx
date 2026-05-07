import React from 'react';

export function WeatherDelayUpdateUseCasePage({ setPage }) {
  return (
    <main className="usecase-page" id="top">
      <section className="usecase-hero" aria-labelledby="usecase-hero-title">
        <div className="hero-copy">
          <div className="eyebrow">Use Case Template</div>
          <h1 id="usecase-hero-title">Keep weather delays calm (so cancellations don’t pile up).</h1>
          <p className="lead">
            A copyable delay workflow: weather/crew delay → send one calm update with a new window → confirm or reschedule, with
            operator-controlled guardrails.
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
            src="/use-cases/weather-delay-update-hero.svg"
            alt="Three-panel flow: weather or crew delay trigger to calm update message to outcomes including confirmed and reschedule"
            loading="eager"
          />
        </div>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-what-title">
        <h2 id="usecase-what-title">What it is (plain English)</h2>
        <ul>
          <li>You send a calm “window shift” message as soon as you know you’re running late.</li>
          <li>You offer one realistic alternate window (instead of vague “sometime later”).</li>
          <li>You collect a clear outcome: confirm, pick a new time, or escalate to a quick call.</li>
        </ul>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-how-title">
        <h2 id="usecase-how-title">How it works (4 steps)</h2>
        <ol className="usecase-steps">
          <li>
            <strong>Trigger early.</strong> Weather turns, conditions aren’t safe, or the crew is delayed — decide before the
            customer is left wondering.
          </li>
          <li>
            <strong>Send one calm update.</strong> Short heads-up + the new ETA window + a simple confirmation ask.
          </li>
          <li>
            <strong>Offer two paths.</strong> Reply “YES” to confirm the new window, or send a better time to reschedule.
          </li>
          <li>
            <strong>Capture the outcome.</strong> Confirmed → proceed. New time → reschedule. Stress/anger → offer a quick call.
          </li>
        </ol>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-guardrails-title">
        <h2 id="usecase-guardrails-title">Guardrails (operator-controlled)</h2>
        <ul>
          <li>One follow-up max if they don’t reply; stop on any response.</li>
          <li>Use realistic windows; don’t promise weather-dependent work if it’s not safe.</li>
          <li>Don’t debate by text if they’re upset — offer a quick call or manager handoff.</li>
          <li>Keep the message calm and specific: what changed, what you can do, and what you need from them.</li>
        </ul>
      </section>

      <section className="usecase-section" aria-labelledby="usecase-rightthurr-title">
        <h2 id="usecase-rightthurr-title">Right Thurr framing</h2>
        <p className="usecase-framing">
          <strong>Most cancellations are emotional, not logistical.</strong> A calm update with a real option reduces anxiety and
          keeps the operator in control of the next step.
        </p>
      </section>

      <section className="usecase-section usecase-cta" aria-labelledby="usecase-cta-title">
        <h2 id="usecase-cta-title">If you want it built</h2>
        <p>
          Start with the Lead Flow Audit. You’ll get a delay update template that matches your offer, your tone, and the stop
          rules that keep it operator-safe.
        </p>
        <button className="stamp-button link-button" type="button" onClick={() => setPage('buildout')}>
          Start the audit
        </button>
      </section>
    </main>
  );
}

