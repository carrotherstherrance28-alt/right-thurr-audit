import React from 'react';

export function SystemStatusBar() {
  const statuses = ['AUDIT · OPERATIONAL', 'BUILD · OPERATIONAL', 'MANAGE · OPERATIONAL'];
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
        <a className="nav-cta" href="#audit">Get the Lead Flow Audit — $250</a>
      </div>
    </header>
  );
}

export function SiteFooter({ navigateToPage }) {
  return (
    <footer className="site-footer" aria-label="Thurr Solutions footer">
      <div className="footer-brand">THURR SOLUTIONS</div>
      <p>Thurr Solutions LLC · Missouri · Houston Office · AI Automation Engineer</p>
      <div className="footer-links">
        <button type="button" onClick={() => navigateToPage('privacy')}>Privacy Policy</button>
        <a href="mailto:hello@thurrsolutions.com">hello@thurrsolutions.com</a>
      </div>
    </footer>
  );
}
