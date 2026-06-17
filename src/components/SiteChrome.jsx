import React from 'react';

export function SystemStatusBar() {
  const statuses = ['CONSULT · OPERATIONAL', 'BUILD · OPERATIONAL', 'MANAGE · OPERATIONAL'];
  const buildTime = typeof __BUILD_TIME__ === 'string' ? new Date(__BUILD_TIME__) : new Date();
  const statusTime = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(buildTime);

  return (
    <div className="system-status-bar" aria-label="Thurr Solutions system status">
      <div className="status-bar-desktop">
        {statuses.map((status) => (
          <span className="status-pill" key={status}>
            <span className="status-dot" />
            {status}
          </span>
        ))}
      </div>
      <div className="status-bar-mobile">
        <span className="status-pill">
          <span className="status-dot" />
          ALL SYSTEMS OPERATIONAL
        </span>
      </div>
      <span className="status-updated">LAST UPDATED {statusTime}</span>
    </div>
  );
}

export function SiteHeader({
  consultationUrl = 'https://calendly.com/thurr',
  navigateToPage,
  onToggleTheme,
  uiTheme = 'dark',
}) {
  const nextThemeLabel = uiTheme === 'dark' ? 'Light' : 'Dark';

  return (
    <header className="topbar">
      <button className="brand-lockup brand-button" type="button" onClick={() => navigateToPage('home')} aria-label="Go to Thurr Solutions home">
        <span className="nav-wordmark-dot" aria-hidden="true" />
        <span className="brand-name">THURR SOLUTIONS</span>
      </button>

      <div className="topbar-actions">
        <button
          className="theme-toggle"
          type="button"
          aria-label={`Switch to ${nextThemeLabel.toLowerCase()} mode`}
          onClick={onToggleTheme}
        >
          <span className={uiTheme === 'dark' ? 'active' : ''}>Dark</span>
          <span className={uiTheme === 'light' ? 'active' : ''}>Light</span>
        </button>
        <a className="nav-cta" href={consultationUrl} target="_blank" rel="noreferrer">Book a consultation</a>
      </div>
    </header>
  );
}

export function SiteFooter({ navigateToAbout, navigateToPage }) {
  return (
    <footer className="site-footer" aria-label="Thurr Solutions footer">
      <div className="site-footer-column site-footer-promise">
        <span>Thurr Solutions</span>
        <strong>
          Consult first. <span>Build second.</span>
        </strong>
      </div>
      <div className="site-footer-column">
        <span>Navigate</span>
        <button type="button" onClick={() => navigateToPage('home')}>Home</button>
        <button type="button" onClick={() => navigateToPage('audit')}>Consultation</button>
        <button type="button" onClick={() => navigateToPage('work')}>Selected Work</button>
        <button type="button" onClick={navigateToAbout}>About Thurr</button>
      </div>
      <div className="site-footer-column">
        <span>Review</span>
        <button type="button" onClick={() => navigateToPage('compliance')}>Compliance</button>
        <button type="button" onClick={() => navigateToPage('privacy')}>Privacy Policy</button>
      </div>
      <div className="site-footer-column">
        <span>Contact</span>
        <a href="mailto:hello@thurrsolutions.com">hello@thurrsolutions.com</a>
      </div>
      <p className="site-footer-trust-strip">
        HIPAA-aware system design. TCPA-safe follow-up architecture. COPPA-compliant where
        required. Compliance sign-off required before any regulated system goes live.
      </p>
      <p className="site-footer-disclosure">
        Thurr Solutions builds lead capture, intake, and automation systems. Legal,
        healthcare, youth, insurance, and SMS compliance decisions remain with the client&apos;s
        authorized reviewer before public launch.
      </p>
    </footer>
  );
}
