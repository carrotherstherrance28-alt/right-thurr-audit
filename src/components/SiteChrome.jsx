import React from 'react';
import { BriefcaseBusiness, ChevronDown, Instagram, Linkedin, Mail, Menu } from 'lucide-react';
import monogram from '../assets/rt-monogram-clean.png';

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
  canViewOperator,
  menuOpen,
  navigateToAbout,
  navigateToPage,
  operatorNavItems,
  page,
  publicNavItems,
  setMenuOpen,
  socialLinks,
}) {
  return (
    <header className="topbar">
      <button className="brand-lockup brand-button" type="button" onClick={() => navigateToPage('home')}>
        <img src={monogram} alt="" className="brand-mark" />
        <span className="brand-name">Thurr Solutions</span>
      </button>

      <div className="topbar-actions">
        <div className={canViewOperator ? 'system-live owner-live' : 'system-live'}>
          <span className="live-dot" />
          {canViewOperator ? 'OWNER MODE' : 'SYSTEM LIVE'}
        </div>
        <div className="nav-menu">
          <button
            className={menuOpen ? 'menu-trigger active' : 'menu-trigger'}
            type="button"
            aria-expanded={menuOpen}
            aria-controls="primary-menu"
            onClick={() => setMenuOpen((current) => !current)}
          >
            <Menu size={18} strokeWidth={3} />
            Menu
            <ChevronDown size={16} strokeWidth={3} />
          </button>
          {menuOpen && (
            <nav className="nav-dropdown" id="primary-menu" aria-label="Primary navigation">
              {publicNavItems.map(([label, target]) => (
                <button
                  className={page === target ? 'nav-tab active' : 'nav-tab'}
                  key={label}
                  type="button"
                  onClick={() => navigateToPage(target)}
                >
                  {label}
                </button>
              ))}
              <button className="nav-tab" type="button" onClick={navigateToAbout}>
                About Therrance
              </button>
              <div className="nav-social-links" aria-label="Therrance Carrothers social links">
                <a href={socialLinks.linkedin} target="_blank" rel="noreferrer">
                  <Linkedin size={16} strokeWidth={3} />
                  LinkedIn
                </a>
                <a href={socialLinks.instagram} target="_blank" rel="noreferrer">
                  <Instagram size={16} strokeWidth={3} />
                  Instagram
                </a>
                <a href={socialLinks.upwork} target="_blank" rel="noreferrer">
                  <BriefcaseBusiness size={16} strokeWidth={3} />
                  Upwork
                </a>
                <a href="mailto:hello@thurrsolutions.com">
                  <Mail size={16} strokeWidth={3} />
                  Email
                </a>
              </div>
              {canViewOperator &&
                operatorNavItems.map(([label, target]) => (
                  <button
                    className={page === target ? 'nav-tab active operator-nav-tab' : 'nav-tab operator-nav-tab'}
                    key={label}
                    type="button"
                    onClick={() => navigateToPage(target)}
                  >
                    {label}
                  </button>
                ))}
            </nav>
          )}
        </div>
      </div>

      <nav className="nav-tabs desktop-nav" aria-label="Primary navigation">
        {canViewOperator &&
          operatorNavItems.map(([label, target]) => (
            <button
              className={page === target ? 'nav-tab active operator-nav-tab' : 'nav-tab operator-nav-tab'}
              key={label}
              type="button"
              onClick={() => navigateToPage(target)}
            >
              {label}
            </button>
          ))}
      </nav>
    </header>
  );
}

export function SiteFooter({ navigateToAbout, navigateToPage, socialLinks }) {
  return (
    <footer className="site-footer" aria-label="Thurr Solutions footer">
      <div className="site-footer-column">
        <span>Services</span>
        <button type="button" onClick={() => navigateToPage('audit')}>Lead Flow Audit</button>
        <button type="button" onClick={() => navigateToPage('home')}>Intake Automation</button>
        <button type="button" onClick={() => navigateToPage('home')}>Managed AI Support</button>
      </div>

      <div className="site-footer-column">
        <span>Method</span>
        <button type="button" onClick={() => navigateToPage('home')}>Audit</button>
        <button type="button" onClick={() => navigateToPage('home')}>Build</button>
        <button type="button" onClick={() => navigateToPage('home')}>Manage</button>
      </div>

      <div className="site-footer-column">
        <span>Legal</span>
        <button type="button" onClick={() => navigateToPage('compliance')}>Compliance</button>
        <button type="button" onClick={navigateToAbout}>Founder</button>
        <a href="mailto:hello@thurrsolutions.com">Contact</a>
      </div>

      <div className="site-footer-socials" aria-label="Therrance Carrothers links">
        <a href={socialLinks.linkedin} target="_blank" rel="noreferrer">
          <Linkedin size={17} strokeWidth={3} />
          LinkedIn
        </a>
        <a href={socialLinks.instagram} target="_blank" rel="noreferrer">
          <Instagram size={17} strokeWidth={3} />
          Instagram
        </a>
        <a href={socialLinks.upwork} target="_blank" rel="noreferrer">
          <BriefcaseBusiness size={17} strokeWidth={3} />
          Upwork
        </a>
        <a href="mailto:hello@thurrsolutions.com">
          <Mail size={17} strokeWidth={3} />
          Email
        </a>
      </div>
      <p className="site-footer-disclosure">
        Thurr Solutions LLC does not provide legal, financial, or medical advice. We do not
        guarantee leads, closed jobs, or specific revenue outcomes. Healthcare engagements require
        a Business Associate Agreement. Insurance engagements require carrier and compliance review.
      </p>
    </footer>
  );
}
