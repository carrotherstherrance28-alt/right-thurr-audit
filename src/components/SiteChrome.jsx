import React from 'react';
import { BriefcaseBusiness, ChevronDown, Instagram, Linkedin, Mail, Menu } from 'lucide-react';
import monogram from '../assets/rt-monogram-clean.png';

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
      <div className="site-footer-promise">
        <span>Thurr</span>
        <strong>
          We build.
          <span>You profit.</span>
        </strong>
      </div>

      <div className="site-footer-capabilities" aria-label="Core capabilities">
        <span>Blueprints</span>
        <span>Automation</span>
        <span>AI Agents</span>
        <span>Revenue Ops</span>
      </div>

      <nav className="site-footer-links" aria-label="Footer navigation">
        <button type="button" onClick={() => navigateToPage('home')}>
          Home
        </button>
        <button type="button" onClick={() => navigateToPage('buildout')}>
          Buildout Plan
        </button>
        <button type="button" onClick={() => navigateToPage('solutions')}>
          Thurr
        </button>
        <button type="button" onClick={navigateToAbout}>
          About
        </button>
      </nav>

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
    </footer>
  );
}
