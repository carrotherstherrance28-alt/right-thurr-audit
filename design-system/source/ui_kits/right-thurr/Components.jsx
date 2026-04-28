// Right Thurr — UI Kit Components
// All components attached to window for cross-script usage.
const { useState, useEffect, useRef } = React;

// -------------------- Header / Sticky Nav --------------------
function RTHeader({ active = "Dashboard" }) {
  const items = ["Dashboard", "Blueprint", "Offer", "Tasks", "Money"];
  return (
    <header style={rtHeaderStyles.bar}>
      <div style={rtHeaderStyles.brand}>
        <img src="../../assets/rt-monogram-clean.png" alt="" style={{ height: 36, display: "block" }} />
        <div style={rtHeaderStyles.brandText}>RIGHT THURR</div>
      </div>
      <nav style={rtHeaderStyles.nav}>
        {items.map(i => (
          <a key={i} href="#" style={{
            ...rtHeaderStyles.navItem,
            ...(i === active ? rtHeaderStyles.navItemActive : {})
          }}>{i}</a>
        ))}
      </nav>
      <div style={rtHeaderStyles.right}>
        <span style={rtHeaderStyles.statusDot}></span>
        <span style={rtHeaderStyles.statusLabel}>SYSTEM LIVE</span>
        <div style={rtHeaderStyles.avatar}>JM</div>
      </div>
    </header>
  );
}
const rtHeaderStyles = {
  bar: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "12px 24px", background: "var(--rt-paper-cold)",
    borderBottom: "3px solid var(--rt-ink-900)", position: "sticky", top: 0, zIndex: 10,
  },
  brand: { display: "flex", alignItems: "center", gap: 10 },
  brandText: {
    fontFamily: "var(--font-subhead)", fontWeight: 700, letterSpacing: ".18em",
    fontSize: 15, color: "var(--rt-ink-900)",
  },
  nav: { display: "flex", gap: 4 },
  navItem: {
    fontFamily: "var(--font-subhead)", textTransform: "uppercase",
    letterSpacing: ".14em", fontSize: 12, fontWeight: 700,
    color: "var(--rt-ink-700)", textDecoration: "none",
    padding: "8px 14px", border: "2px solid transparent",
  },
  navItemActive: {
    color: "var(--rt-paper-cold)", background: "var(--rt-ink-900)",
    border: "2px solid var(--rt-ink-900)",
  },
  right: { display: "flex", alignItems: "center", gap: 12 },
  statusDot: {
    width: 10, height: 10, borderRadius: 999, background: "var(--rt-success)",
    boxShadow: "0 0 0 2px var(--rt-paper-cold), 0 0 0 3px var(--rt-ink-900)",
    animation: "pulse 1.6s ease-in-out infinite",
  },
  statusLabel: {
    fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700,
    letterSpacing: ".1em", color: "var(--rt-success)",
  },
  avatar: {
    width: 34, height: 34, borderRadius: 0, background: "var(--rt-orange-500)",
    border: "2px solid var(--rt-ink-900)", display: "flex",
    alignItems: "center", justifyContent: "center",
    fontFamily: "var(--font-subhead)", fontWeight: 700, fontSize: 12,
    color: "var(--rt-paper-cold)", letterSpacing: ".06em",
  },
};

// -------------------- Stamp Button --------------------
function StampButton({ children, variant = "primary", onClick, style }) {
  const variants = {
    primary: { bg: "var(--rt-orange-500)", fg: "var(--rt-paper-cold)" },
    secondary: { bg: "var(--rt-paper-cold)", fg: "var(--rt-ink-900)" },
    ink: { bg: "var(--rt-ink-900)", fg: "var(--rt-paper-cold)" },
  };
  const v = variants[variant];
  return (
    <button className="rt-stamp-btn" onClick={onClick}
      style={{ ...stampBtnStyles.base, background: v.bg, color: v.fg, ...style }}>
      {children}
    </button>
  );
}
const stampBtnStyles = {
  base: {
    fontFamily: "var(--font-subhead)", fontWeight: 700, textTransform: "uppercase",
    letterSpacing: ".14em", fontSize: 13, padding: "13px 22px",
    border: "3px solid var(--rt-ink-900)", borderRadius: 4,
    boxShadow: "6px 6px 0 0 var(--rt-ink-900)", cursor: "pointer",
    transition: "transform 120ms cubic-bezier(.2,.9,.3,1.2), box-shadow 120ms cubic-bezier(.2,.9,.3,1.2)",
  },
};

// -------------------- TagStamp --------------------
function TagStamp({ children, color = "orange", rotate = -2, style }) {
  const colors = {
    orange: { bg: "var(--rt-orange-500)", fg: "var(--rt-paper-cold)" },
    ink: { bg: "var(--rt-ink-900)", fg: "var(--rt-paper-cold)" },
    paper: { bg: "var(--rt-paper-cold)", fg: "var(--rt-ink-900)" },
    success: { bg: "var(--rt-success)", fg: "var(--rt-paper-cold)" },
  };
  const c = colors[color] || colors.orange;
  return (
    <span style={{
      display: "inline-block",
      fontFamily: "var(--font-subhead)", fontWeight: 700, textTransform: "uppercase",
      letterSpacing: ".14em", fontSize: 11, padding: "5px 12px",
      border: "2px solid var(--rt-ink-900)", background: c.bg, color: c.fg,
      transform: `rotate(${rotate}deg)`, ...style,
    }}>{children}</span>
  );
}

// -------------------- Hero Composer --------------------
function HeroComposer({ onSubmit }) {
  const [val, setVal] = useState("");
  return (
    <section style={composerStyles.wrap}>
      <div style={composerStyles.eyebrow}>STEP 01 · DROP THE IDEA</div>
      <h1 style={composerStyles.h1}>Turn your idea into<br/>a business system.</h1>
      <p style={composerStyles.sub}>Right Thurr generates your blueprint, offer, landing page, and task list — then runs them. You ship today.</p>
      <form style={composerStyles.form} onSubmit={(e) => { e.preventDefault(); onSubmit && onSubmit(val); }}>
        <input
          style={composerStyles.input}
          placeholder="A lawn-care side hustle in Austin"
          value={val} onChange={e => setVal(e.target.value)}
        />
        <StampButton>BUILD IT →</StampButton>
      </form>
      <div style={composerStyles.recent}>
        <span style={composerStyles.recentLabel}>RECENT IDEAS:</span>
        <TagStamp color="paper" rotate={-1}>Mobile dog wash</TagStamp>
        <TagStamp color="paper" rotate={1.5}>Pickup-truck moving</TagStamp>
        <TagStamp color="paper" rotate={-1.5}>Backyard taco pop-up</TagStamp>
      </div>
    </section>
  );
}
const composerStyles = {
  wrap: { padding: "56px 64px 64px", maxWidth: 920, margin: "0 auto", textAlign: "left" },
  eyebrow: {
    fontFamily: "var(--font-subhead)", fontWeight: 700, textTransform: "uppercase",
    letterSpacing: ".18em", fontSize: 12, color: "var(--rt-orange-600)", marginBottom: 18,
  },
  h1: {
    fontFamily: "var(--font-display-rt)", fontSize: 84, lineHeight: 1.0,
    color: "var(--rt-ink-900)", margin: "0 0 22px", letterSpacing: 0,
  },
  sub: {
    fontFamily: "var(--font-body)", fontSize: 18, lineHeight: 1.55,
    color: "var(--rt-ink-700)", maxWidth: 560, margin: "0 0 32px",
  },
  form: { display: "flex", gap: 12, alignItems: "stretch", marginBottom: 24, maxWidth: 720 },
  input: {
    flex: 1, fontFamily: "var(--font-body)", fontSize: 17, padding: "14px 18px",
    background: "var(--rt-paper-cold)", border: "3px solid var(--rt-ink-900)",
    borderRadius: 4, outline: "none",
    boxShadow: "6px 6px 0 0 var(--rt-ink-900)",
  },
  recent: { display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginTop: 12 },
  recentLabel: {
    fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--rt-ink-600)",
    letterSpacing: ".05em", marginRight: 4,
  },
};

Object.assign(window, { RTHeader, StampButton, TagStamp, HeroComposer });
