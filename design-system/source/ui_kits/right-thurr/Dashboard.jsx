// Right Thurr — Dashboard parts
const { useState: useS, useEffect: useE, useRef: useR } = React;

// -------------------- MoneyTracker --------------------
function MoneyTracker({ start = 1247 }) {
  const [v, setV] = useS(start);
  useE(() => {
    const id = setInterval(() => setV(prev => prev + Math.floor(Math.random() * 28 + 4)), 1800);
    return () => clearInterval(id);
  }, []);
  return (
    <div style={mtStyles.wrap}>
      <div style={mtStyles.eyebrow}>MONEY TRACKER · LAST 9 DAYS</div>
      <div style={mtStyles.amount}>${v.toLocaleString()}<span style={mtStyles.cents}>.{(v * 13 % 100).toString().padStart(2,"0")}</span></div>
      <div style={mtStyles.row}>
        <div style={mtStyles.metric}>
          <div style={mtStyles.metricLabel}>COLLECTED</div>
          <div style={mtStyles.metricVal}>$1,247</div>
        </div>
        <div style={mtStyles.metric}>
          <div style={mtStyles.metricLabel}>OUTSTANDING</div>
          <div style={mtStyles.metricVal}>$320</div>
        </div>
        <div style={mtStyles.metric}>
          <div style={mtStyles.metricLabel}>JOBS DONE</div>
          <div style={mtStyles.metricVal}>14</div>
        </div>
      </div>
    </div>
  );
}
const mtStyles = {
  wrap: {
    background: "var(--rt-orange-500)", color: "var(--rt-paper-cold)",
    border: "4px solid var(--rt-ink-900)", padding: "20px 24px",
    boxShadow: "6px 6px 0 0 var(--rt-ink-900)",
  },
  eyebrow: {
    fontFamily: "var(--font-subhead)", fontWeight: 700, textTransform: "uppercase",
    letterSpacing: ".18em", fontSize: 11, opacity: .85, marginBottom: 6,
  },
  amount: {
    fontFamily: "var(--font-display-ts)", fontSize: 56, lineHeight: 1, letterSpacing: "-.02em",
  },
  cents: { fontSize: 28, opacity: .65 },
  row: { display: "flex", gap: 28, marginTop: 14, paddingTop: 12, borderTop: "2px solid rgba(245,239,226,.4)" },
  metric: { display: "flex", flexDirection: "column", gap: 2 },
  metricLabel: {
    fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: ".08em", opacity: .8,
  },
  metricVal: {
    fontFamily: "var(--font-mono)", fontSize: 16, fontWeight: 700,
  },
};

// -------------------- ActivityFeed --------------------
const SEED_EVENTS = [
  { t: "02:21", k: "task", msg: "Task added: call back Marcus re: Tuesday quote" },
  { t: "02:17", k: "money", msg: "First $40 collected from Hayley K." },
  { t: "02:14", k: "deploy", msg: "Landing page deployed → /lawn-care-deluxe" },
  { t: "02:14", k: "build", msg: "Offer drafted: $89 first visit" },
  { t: "02:13", k: "build", msg: "Blueprint generated for Lawn Care · Austin" },
];
function ActivityFeed() {
  const [events, setEvents] = useS(SEED_EVENTS);
  useE(() => {
    const stream = [
      { k: "task", msg: "Task added: post to Nextdoor (Cherrywood)" },
      { k: "money", msg: "$60 collected from Devon R." },
      { k: "build", msg: "Follow-up email queued for 3 leads" },
      { k: "deploy", msg: "Booking widget published → /book" },
    ];
    let i = 0;
    const id = setInterval(() => {
      const e = stream[i % stream.length]; i++;
      const now = new Date();
      const t = `${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}`;
      setEvents(prev => [{ ...e, t, fresh: true }, ...prev].slice(0, 10));
    }, 3200);
    return () => clearInterval(id);
  }, []);
  const dot = { task: "var(--rt-warning)", money: "var(--rt-success)", build: "var(--rt-orange-500)", deploy: "var(--rt-info)" };
  return (
    <div style={afStyles.wrap}>
      <div style={afStyles.head}>
        <span style={afStyles.title}>ACTIVITY FEED</span>
        <span style={afStyles.live}><span style={afStyles.liveDot}></span>LIVE</span>
      </div>
      <div style={afStyles.list}>
        {events.map((e, i) => (
          <div key={i} style={{ ...afStyles.row, ...(e.fresh && i === 0 ? afStyles.rowFresh : {}) }}>
            <span style={afStyles.time}>{e.t}</span>
            <span style={{ ...afStyles.dot, background: dot[e.k] }}></span>
            <span style={afStyles.msg}>{e.msg}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
const afStyles = {
  wrap: {
    background: "var(--rt-paper-cold)", border: "4px solid var(--rt-ink-900)",
    boxShadow: "6px 6px 0 0 var(--rt-ink-900)", padding: 0, height: "100%",
    display: "flex", flexDirection: "column",
  },
  head: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "12px 16px", borderBottom: "3px solid var(--rt-ink-900)",
    background: "var(--rt-ink-900)", color: "var(--rt-paper-cold)",
  },
  title: {
    fontFamily: "var(--font-subhead)", fontWeight: 700, letterSpacing: ".18em", fontSize: 12,
  },
  live: { display: "flex", alignItems: "center", gap: 6, fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--rt-orange-300)" },
  liveDot: {
    width: 8, height: 8, borderRadius: 999, background: "var(--rt-orange-500)",
    animation: "pulse 1.4s ease-in-out infinite",
  },
  list: { padding: "8px 0", overflowY: "auto", flex: 1 },
  row: {
    display: "grid", gridTemplateColumns: "52px 14px 1fr", alignItems: "center",
    gap: 8, padding: "8px 16px", fontSize: 13, color: "var(--rt-ink-800)",
    transition: "background 200ms",
  },
  rowFresh: { background: "var(--rt-orange-100)" },
  time: { fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--rt-ink-600)" },
  dot: { width: 10, height: 10, borderRadius: 999, border: "1.5px solid var(--rt-ink-900)" },
  msg: { fontFamily: "var(--font-body)", lineHeight: 1.35 },
};

// -------------------- TaskList --------------------
function TaskList() {
  const [tasks, setTasks] = useS([
    { id: 1, done: true, label: "Generate blueprint" },
    { id: 2, done: true, label: "Draft offer ($89 first visit)" },
    { id: 3, done: true, label: "Deploy landing page" },
    { id: 4, done: false, label: "Call back Marcus re: Tuesday quote" },
    { id: 5, done: false, label: "Post to Nextdoor (Cherrywood)" },
    { id: 6, done: false, label: "Follow up with 3 leads from form" },
    { id: 7, done: false, label: "Buy domain — rightthurrlawn.com" },
  ]);
  const toggle = id => setTasks(t => t.map(x => x.id === id ? { ...x, done: !x.done } : x));
  const open = tasks.filter(t => !t.done).length;
  return (
    <div style={tlStyles.wrap}>
      <div style={tlStyles.head}>
        <span style={tlStyles.title}>TASK LIST</span>
        <TagStamp color="orange" rotate={-2} style={{ fontSize: 10 }}>{open} OPEN</TagStamp>
      </div>
      <ul style={tlStyles.list}>
        {tasks.map(t => (
          <li key={t.id} style={tlStyles.row} onClick={() => toggle(t.id)}>
            <span style={{ ...tlStyles.box, ...(t.done ? tlStyles.boxDone : {}) }}>
              {t.done ? "✓" : ""}
            </span>
            <span style={{ ...tlStyles.label, ...(t.done ? tlStyles.labelDone : {}) }}>
              {t.label}
            </span>
            <span style={tlStyles.tid}>#{String(t.id).padStart(3,"0")}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
const tlStyles = {
  wrap: {
    background: "var(--rt-paper-cold)", border: "4px solid var(--rt-ink-900)",
    boxShadow: "6px 6px 0 0 var(--rt-ink-900)",
  },
  head: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "12px 16px", borderBottom: "3px solid var(--rt-ink-900)",
  },
  title: { fontFamily: "var(--font-subhead)", fontWeight: 700, letterSpacing: ".18em", fontSize: 12, color: "var(--rt-ink-900)" },
  list: { listStyle: "none", margin: 0, padding: 0 },
  row: {
    display: "grid", gridTemplateColumns: "26px 1fr auto",
    gap: 12, alignItems: "center", padding: "10px 16px",
    borderBottom: "1px solid var(--rt-ink-200)", cursor: "pointer",
  },
  box: {
    width: 22, height: 22, border: "2.5px solid var(--rt-ink-900)",
    borderRadius: 0, display: "flex", alignItems: "center", justifyContent: "center",
    fontWeight: 800, fontSize: 14, color: "var(--rt-paper-cold)",
  },
  boxDone: { background: "var(--rt-orange-500)" },
  label: { fontSize: 14, color: "var(--rt-ink-900)" },
  labelDone: { textDecoration: "line-through", color: "var(--rt-ink-500)" },
  tid: { fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--rt-ink-500)" },
};

// -------------------- OfferCard --------------------
function OfferCard() {
  return (
    <div style={ofStyles.wrap}>
      <div style={ofStyles.tagHole}></div>
      <div style={ofStyles.eyebrow}>YOUR OFFER · LIVE</div>
      <div style={ofStyles.title}>Lawn Care Deluxe</div>
      <div style={ofStyles.price}>
        <span style={ofStyles.dollar}>$</span>89
        <span style={ofStyles.unit}>/ first visit</span>
      </div>
      <ul style={ofStyles.bullets}>
        <li>Mow, edge, blow — front + back</li>
        <li>Hedge trim included</li>
        <li>Booking confirmed in under 4 hours</li>
      </ul>
      <div style={ofStyles.row}>
        <StampButton variant="ink" style={{ fontSize: 11, padding: "10px 14px" }}>EDIT OFFER</StampButton>
        <span style={ofStyles.url}>rightthurr.app/lawn-care-deluxe</span>
      </div>
    </div>
  );
}
const ofStyles = {
  wrap: {
    background: "var(--rt-orange-500)", color: "var(--rt-paper-cold)",
    border: "4px solid var(--rt-ink-900)", padding: "22px 22px 18px",
    boxShadow: "8px 8px 0 0 var(--rt-ink-900)", position: "relative",
    transform: "rotate(-1deg)",
  },
  tagHole: {
    position: "absolute", top: 12, right: 18, width: 16, height: 16, borderRadius: 999,
    background: "var(--rt-paper)", border: "2.5px solid var(--rt-ink-900)",
  },
  eyebrow: { fontFamily: "var(--font-subhead)", letterSpacing: ".18em", fontSize: 11, fontWeight: 700, opacity: .85, marginBottom: 6 },
  title: { fontFamily: "var(--font-display-rt)", fontSize: 36, lineHeight: 1, color: "var(--rt-paper-cold)", marginBottom: 8 },
  price: { fontFamily: "var(--font-display-ts)", fontSize: 48, lineHeight: 1, marginBottom: 12, display: "flex", alignItems: "baseline", gap: 6 },
  dollar: { fontSize: 28, marginRight: 0 },
  unit: { fontSize: 16, fontFamily: "var(--font-body)", opacity: .85 },
  bullets: { listStyle: "none", padding: 0, margin: "0 0 16px", display: "flex", flexDirection: "column", gap: 4, fontFamily: "var(--font-body)", fontSize: 14 },
  row: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, paddingTop: 12, borderTop: "2px solid rgba(245,239,226,.4)" },
  url: { fontFamily: "var(--font-mono)", fontSize: 11, opacity: .85 },
};

Object.assign(window, { MoneyTracker, ActivityFeed, TaskList, OfferCard });
