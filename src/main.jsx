import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Activity,
  ArrowUpRight,
  Bot,
  BriefcaseBusiness,
  ClipboardCheck,
  DollarSign,
  Factory,
  FileText,
  Gauge,
  Hammer,
  Mail,
  MapPinned,
  Send,
  Sparkles,
  Target,
  Zap,
} from 'lucide-react';
import './styles/brand-tokens.css';
import './styles/app.css';
import wordmark from './assets/right-thurr-wordmark-clean.png';
import monogram from './assets/rt-monogram-clean.png';

const buildSteps = [
  'Reading business idea',
  'Mapping business opportunity',
  'Drafting starter offer',
  'Building funnel strategy',
  'Planning automations',
  'Writing 30-day roadmap',
];

const blueprintSections = [
  'Your Business Opportunity',
  'Best Business Model For You',
  'Revenue Potential',
  'What To Build First',
  'Your Funnel Strategy',
  'Automation Stack Needed',
  'AI Agents Needed',
  '30-Day Launch Roadmap',
  'Biggest Bottlenecks',
  'Recommended Next Step',
];

const initialEvents = [
  {
    time: '04:42',
    glyph: '✓',
    agent: 'Opportunity Agent',
    text: 'Identified Dallas mobile detailing as the fastest first System.',
    impact: 'Blueprint',
  },
  {
    time: '04:45',
    glyph: '✓',
    agent: 'Funnel Agent',
    text: 'Drafted premium express detail offer and booking path.',
    impact: 'Offer',
  },
  {
    time: '04:49',
    glyph: '▲',
    agent: 'Automation Agent',
    text: 'Mapped lead capture, follow-up, CRM, and daily summary workflows.',
    impact: 'n8n',
  },
  {
    time: '04:52',
    glyph: '→',
    agent: 'Execution Agent',
    text: 'Queued first 10 launch tasks for the 30-day roadmap.',
    impact: 'Tasks',
  },
];

const systemCards = [
  {
    name: 'Dallas Mobile Detailing Engine',
    status: 'Building',
    revenue: '$0',
    action: 'Autopilot Blueprint generated',
  },
  {
    name: 'Roofing Lead Engine',
    status: 'Needs Review',
    revenue: '$427',
    action: 'Lead follow-up sequence drafted',
  },
  {
    name: 'Cleaning Booking Engine',
    status: 'Live',
    revenue: '$1,280',
    action: 'Daily revenue summary sent',
  },
];

const tasks = [
  'Approve starter offer',
  'Review landing page copy',
  'Connect lead form to CRM',
  'Create first outreach list',
  'Log first manual revenue entry',
];

const fieldDefaults = {
  name: '',
  email: '',
  idea: 'I want to start a mobile detailing business in Dallas.',
  industry: 'Local service',
  goal: 'Get leads and launch my first system',
  link: '',
};

const buildoutWebhookUrl = import.meta.env.VITE_N8N_BUILDOUT_WEBHOOK_URL;

function App() {
  const [page, setPage] = useState('home');
  const [form, setForm] = useState(fieldDefaults);
  const [submissionState, setSubmissionState] = useState('idle');
  const currentStep = useMemo(() => buildSteps[form.idea.length % buildSteps.length], [form.idea]);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmissionState('sending');

    const payload = {
      source: 'right-thurr-buildout-page',
      brand: 'right-thurr',
      submitted_at: new Date().toISOString(),
      lead: {
        name: form.name,
        email: form.email,
        phone: '',
        website_or_social: form.link,
      },
      intake: {
        business_idea: form.idea,
        industry: form.industry,
        main_goal: form.goal,
        location: '',
        budget_level: '',
        timeline: '',
        biggest_bottleneck: '',
      },
      routing: {
        report_type: 'right-thurr-autopilot-blueprint',
        demo_niche: 'mobile-detailing',
        owned_brand_design: true,
        client_reskin_required: false,
      },
    };

    if (!buildoutWebhookUrl) {
      setSubmissionState('queued-local');
      return;
    }

    try {
      const response = await fetch(buildoutWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Webhook request failed');
      }

      setSubmissionState('queued');
    } catch {
      setSubmissionState('error');
    }
  }

  const sharedProps = {
    form,
    updateField,
    handleSubmit,
    submissionState,
    currentStep,
    setPage,
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="brand-lockup brand-button" type="button" onClick={() => setPage('home')}>
          <img src={monogram} alt="" className="brand-mark" />
        </button>
        <nav className="nav-tabs" aria-label="Primary navigation">
          {[
            ['Home', 'home'],
            ['Buildout Plan', 'buildout'],
            ['Thurr Solutions', 'solutions'],
          ].map(([label, target]) => (
            <button
              className={page === target ? 'nav-tab active' : 'nav-tab'}
              key={label}
              type="button"
              onClick={() => setPage(target)}
            >
              {label}
            </button>
          ))}
          {page === 'home' && (
            <>
              <a className="nav-tab" href="#blueprint">Blueprint</a>
              <a className="nav-tab" href="#machine">Machine</a>
              <a className="nav-tab" href="#app-preview">App Preview</a>
            </>
          )}
        </nav>
        <div className="system-live">
          <span className="live-dot" />
          SYSTEM LIVE
        </div>
      </header>

      {page === 'home' && <HomePage {...sharedProps} />}
      {page === 'buildout' && <BuildoutPlanPage {...sharedProps} />}
      {page === 'solutions' && <SolutionsPage setPage={setPage} />}
    </div>
  );
}

function SolutionsPage({ setPage }) {
  return (
    <main className="solutions-page" data-brand="thurr-solutions">
      <section className="solutions-hero">
        <div className="hero-copy">
          <div className="eyebrow">THURR SOLUTIONS</div>
          <h1>AI systems for small business operators.</h1>
          <p>
            Thurr Solutions builds the automation, lead handling, reporting, and AI workflows that
            make a business easier to run and easier to scale.
          </p>
          <div className="hero-actions">
            <a className="stamp-button link-button" href="#solutions-services">
              START A PROJECT
              <ArrowUpRight size={18} strokeWidth={3} />
            </a>
            <button className="text-link dark-link button-link" type="button" onClick={() => setPage('home')}>
              View Right Thurr product
            </button>
          </div>
        </div>
        <aside className="solutions-proof">
          <div className="proof-header">
            <span>OPERATING SYSTEM</span>
            <span className="activity-glyph">✓</span>
          </div>
          <h2>Lead-to-close automation</h2>
          <p>
            Capture the lead, qualify the job, notify the team, trigger follow-up, and keep the
            owner updated without adding another manual handoff.
          </p>
          <div className="proof-stats">
            <div>
              <span>Primary tool</span>
              <strong>n8n workflows</strong>
            </div>
            <div>
              <span>AI layer</span>
              <strong>Qualification + reporting</strong>
            </div>
            <div>
              <span>Outcome</span>
              <strong>Less dropped revenue</strong>
            </div>
          </div>
        </aside>
      </section>

      <section className="solutions-services" id="solutions-services">
        <FlowCard
          icon={Target}
          title="Workflow Audit"
          text="Map the current process, find delay points, and define the system worth building."
        />
        <FlowCard
          icon={Zap}
          title="Automation Build"
          text="Create n8n workflows for lead capture, routing, follow-up, alerts, and reporting."
        />
        <FlowCard
          icon={Bot}
          title="AI Operations"
          text="Add AI agents for qualification, summaries, decision support, and client-ready reports."
        />
      </section>

      <section className="solutions-process">
        <div className="section-copy">
          <div className="eyebrow">HOW IT WORKS</div>
          <h2>Strategy first. Systems second. Proof always.</h2>
          <p>
            Thurr Solutions starts with the business case, then builds the workflow around the
            outcome. The goal is not more tools. The goal is fewer leaks.
          </p>
        </div>
        <section className="backend-map">
          <div className="section-title">
            <BriefcaseBusiness size={22} strokeWidth={3} />
            Project Flow
          </div>
          {[
            'Business process audit',
            'ROI and workflow plan',
            'n8n workflow build',
            'AI prompt and agent layer',
            'Testing and owner handoff',
            'Monitoring and improvement',
          ].map((item, index) => (
            <div className="backend-step" key={item}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{item}</strong>
            </div>
          ))}
        </section>
      </section>

      <section className="brand-boundary solutions-boundary">
        <div>
          <div className="eyebrow">BRAND SPLIT</div>
          <h2>Right Thurr is the product. Thurr Solutions is the builder.</h2>
          <p>
            Client diagnostic funnels are built by Thurr Solutions and can use the same backend
            engine, but the visual system stays client-owned unless the asset is a Thurr Solutions
            sales page, proposal, or case study.
          </p>
        </div>
        <div className="solutions-cta-card">
          <span>READY FOR BUILDOUT</span>
          <strong>Start with the workflow that stops the biggest leak.</strong>
          <a className="text-link" href="mailto:hello@thurrsolutions.com">
            Start a project <Mail size={18} strokeWidth={3} />
          </a>
        </div>
      </section>
    </main>
  );
}

function HomePage({ form, updateField, handleSubmit, submissionState, currentStep, setPage }) {
  return (
    <main id="top">
      <section className="landing-hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <div className="eyebrow">AI BUSINESS BUILDOUT PLAN</div>
          <h1 id="hero-title">See what business Thurr could build for you in 5 minutes.</h1>
          <p>
            Drop the idea. Right Thurr maps the opportunity, offer, funnel, automation stack,
            agents, and first 30 days of execution.
          </p>
          <div className="hero-actions">
            <button className="stamp-button link-button" type="button" onClick={() => setPage('buildout')}>
              GET MY BUILDOUT PLAN
              <ArrowUpRight size={18} strokeWidth={3} />
            </button>
            <a className="text-link dark-link" href="#app-preview">
              See the machine working
            </a>
          </div>
        </div>

        <aside className="hero-proof-card" aria-label="Autopilot Blueprint sample">
          <div className="proof-header">
            <span>RIGHT THURR AUTOPILOT BLUEPRINT</span>
            <span className="activity-glyph">✓</span>
          </div>
          <h2>Dallas Mobile Detailing Engine</h2>
          <div className="proof-stats">
            <div>
              <span>Best first offer</span>
              <strong>$149 express detail</strong>
            </div>
            <div>
              <span>Launch path</span>
              <strong>30 days</strong>
            </div>
            <div>
              <span>First build</span>
              <strong>Lead capture system</strong>
            </div>
          </div>
          <p>
            Ideas do not pay you. Systems do. Your blueprint shows what to build. Right Thurr
            builds it for you.
          </p>
        </aside>
      </section>

      <section className="buildout-section" id="buildout" aria-labelledby="buildout-title">
        <div className="section-copy">
          <div className="eyebrow">START HERE</div>
          <h2 id="buildout-title">Get the buildout plan before you build the wrong thing.</h2>
          <p>
            This form will feed the n8n intake workflow first. V1 can notify you and save the lead,
            then the report engine generates the Autopilot Blueprint.
          </p>
        </div>
        <BuildoutForm
          form={form}
          updateField={updateField}
          handleSubmit={handleSubmit}
          submissionState={submissionState}
        />
      </section>

      <section className="metric-strip" aria-label="Autopilot metrics">
        <Metric icon={Gauge} label="Autopilot" value="Active" />
        <Metric icon={Factory} label="Systems Running" value="4" />
        <Metric icon={DollarSign} label="Revenue Today" value="$427" />
        <Metric icon={ClipboardCheck} label="Tasks Completed" value="89" />
        <Metric icon={Zap} label="Issues Found" value="1" />
      </section>

      <section className="blueprint-showcase" id="blueprint">
        <div className="section-copy">
          <div className="eyebrow">THE REPORT</div>
          <h2>Not a funnel audit. A buildout blueprint.</h2>
          <p>
            The report explains the business angle, revenue path, funnel, automations, agents,
            bottlenecks, and next move.
          </p>
        </div>
        <BlueprintPanel />
      </section>

      <section className="machine-section" id="machine">
        <BuildPanel currentStep={currentStep} title="Dallas Mobile Detailing Engine" heading="BUILDING NOW" />
        <ActivityPanel />
      </section>

      <AppPreview />
      <BrandBoundary />
    </main>
  );
}

function BuildoutPlanPage({ form, updateField, handleSubmit, submissionState, currentStep, setPage }) {
  return (
    <main className="buildout-page" id="top">
      <section className="buildout-hero">
        <div className="hero-copy">
          <div className="eyebrow">FREE AI BUSINESS BUILDOUT PLAN</div>
          <h1>Get the blueprint before you build.</h1>
          <p>
            Right Thurr analyzes your idea, niche, goal, and current assets, then maps the business
            System we would build first.
          </p>
          <div className="hero-actions">
            <a className="stamp-button link-button" href="#buildout-form">
              START THE BLUEPRINT
              <ArrowUpRight size={18} strokeWidth={3} />
            </a>
            <button className="text-link dark-link button-link" type="button" onClick={() => setPage('home')}>
              Back to product page
            </button>
          </div>
        </div>

        <div className="report-card">
          <div className="proof-header">
            <span>REPORT SAMPLE</span>
            <span className="activity-glyph">✓</span>
          </div>
          <h2>Autopilot Blueprint</h2>
          <div className="report-mini-list">
            {blueprintSections.slice(0, 6).map((section, index) => (
              <div key={section}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{section}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="diagnostic-flow">
        <FlowCard icon={Target} title="Diagnose" text="Opportunity, audience, offer, and bottleneck." />
        <FlowCard icon={Factory} title="Buildout" text="Funnel, automation stack, agents, and tasks." />
        <FlowCard icon={Send} title="Execute" text="Report delivery, CRM tag, Slack alert, and next step." />
      </section>

      <section className="buildout-section" id="buildout-form" aria-labelledby="buildout-page-title">
        <div className="section-copy">
          <div className="eyebrow">THE INTAKE</div>
          <h2 id="buildout-page-title">Tell us what you want to build.</h2>
          <p>
            V1 sends this into n8n, saves the lead, notifies you, and prepares the report generation
            step. Later this becomes the first onboarding screen inside the app.
          </p>
        </div>
        <BuildoutForm
          form={form}
          updateField={updateField}
          handleSubmit={handleSubmit}
          submissionState={submissionState}
        />
      </section>

      <section className="machine-section">
        <BuildPanel currentStep={currentStep} title="Dallas Mobile Detailing Engine" heading="REPORT ENGINE" />
        <BackendMap />
      </section>
    </main>
  );
}

function BuildoutForm({ form, updateField, handleSubmit, submissionState }) {
  return (
    <form className="buildout-form" onSubmit={handleSubmit}>
      <label>
        Name
        <input
          value={form.name}
          onChange={(event) => updateField('name', event.target.value)}
          placeholder="Therrance"
        />
      </label>
      <label>
        Email
        <input
          type="email"
          value={form.email}
          onChange={(event) => updateField('email', event.target.value)}
          placeholder="you@example.com"
        />
      </label>
      <label className="wide-field">
        Current business or idea
        <textarea
          value={form.idea}
          onChange={(event) => updateField('idea', event.target.value)}
          rows={4}
        />
      </label>
      <label>
        Industry
        <input
          value={form.industry}
          onChange={(event) => updateField('industry', event.target.value)}
          placeholder="Local service"
        />
      </label>
      <label>
        Main goal
        <select value={form.goal} onChange={(event) => updateField('goal', event.target.value)}>
          <option>Get leads and launch my first system</option>
          <option>Turn my idea into an offer</option>
          <option>Build a funnel</option>
          <option>Automate my follow-up</option>
          <option>Track revenue and tasks</option>
        </select>
      </label>
      <label className="wide-field">
        Website or social link
        <input
          value={form.link}
          onChange={(event) => updateField('link', event.target.value)}
          placeholder="Optional for V1"
        />
      </label>
      <button className="stamp-button wide-field" type="submit">
        GET MY BUILDOUT PLAN
        <ArrowUpRight size={18} strokeWidth={3} />
      </button>
      {submissionState === 'sending' && (
        <p className="form-note wide-field">
          Sending blueprint request...
        </p>
      )}
      {submissionState === 'queued-local' && (
        <p className="form-note wide-field">
          Blueprint queued locally. Add the n8n webhook URL to send live requests.
        </p>
      )}
      {submissionState === 'queued' && (
        <p className="form-note wide-field">
          Blueprint queued. Watch your inbox for the report.
        </p>
      )}
      {submissionState === 'error' && (
        <p className="form-note error-note wide-field">
          Blueprint could not be queued. Check the webhook URL and try again.
        </p>
      )}
    </form>
  );
}

function BlueprintPanel() {
  return (
    <section className="blueprint-panel">
      <div className="section-title">
        <FileText size={22} strokeWidth={3} />
        Right Thurr Autopilot Blueprint
      </div>
      <div className="blueprint-list">
        {blueprintSections.map((section, index) => (
          <div key={section} className="blueprint-row">
            <span>{String(index + 1).padStart(2, '0')}</span>
            <strong>{section}</strong>
            <small>{index < 5 ? 'Generated' : 'Queued'}</small>
          </div>
        ))}
      </div>
    </section>
  );
}

function BuildPanel({ currentStep, title, heading }) {
  return (
    <div className="build-panel" aria-label="System build status">
      <div className="tag-hole" />
      <div className="panel-heading">
        <span>{heading}</span>
        <span className="glyph">▲</span>
      </div>
      <h2>{title}</h2>
      <p>{currentStep}</p>
      <div className="build-meter">
        <span style={{ width: '78%' }} />
      </div>
      <div className="build-steps">
        {buildSteps.map((step, index) => (
          <div key={step} className={index < 4 ? 'step done' : 'step'}>
            <span>{index < 4 ? '✓' : '●'}</span>
            {step}
          </div>
        ))}
      </div>
    </div>
  );
}

function ActivityPanel() {
  return (
    <section className="activity-panel">
      <div className="section-title">
        <Activity size={22} strokeWidth={3} />
        What Your System Did Today
      </div>
      <div className="activity-list">
        {initialEvents.map((event) => (
          <article className="activity-item" key={`${event.time}-${event.text}`}>
            <time>{event.time}</time>
            <span className="activity-glyph">{event.glyph}</span>
            <div>
              <strong>{event.agent}</strong>
              <p>{event.text}</p>
              <small>{event.impact}</small>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function AppPreview() {
  return (
    <section className="workspace-grid" id="app-preview">
      <div className="primary-column">
        <section className="systems-section">
          <div className="section-title">
            <Hammer size={22} strokeWidth={3} />
            My Systems
          </div>
          <div className="system-grid">
            {systemCards.map((system) => (
              <article className="system-card" key={system.name}>
                <div className="status-stamp">{system.status}</div>
                <h3>{system.name}</h3>
                <dl>
                  <div>
                    <dt>Revenue</dt>
                    <dd>{system.revenue}</dd>
                  </div>
                  <div>
                    <dt>Last Action</dt>
                    <dd>{system.action}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </section>
      </div>

      <aside className="side-column">
        <section className="ai-panel">
          <div className="section-title">
            <Bot size={22} strokeWidth={3} />
            AI Engine
          </div>
          <div className="engine-status">
            <Sparkles size={28} strokeWidth={3} />
            <div>
              <span>Current Mission</span>
              <strong>Build local service funnel</strong>
            </div>
          </div>
          <ul className="agent-list">
            {['Opportunity', 'Funnel', 'Revenue', 'Automation', 'Execution'].map((agent) => (
              <li key={agent}>
                <span>✓</span>
                {agent} Agent
              </li>
            ))}
          </ul>
        </section>

        <section className="task-panel">
          <div className="section-title">
            <Send size={22} strokeWidth={3} />
            Next Moves
          </div>
          {tasks.map((task, index) => (
            <label className="task-row" key={task}>
              <input type="checkbox" defaultChecked={index === 0} />
              <span>{task}</span>
            </label>
          ))}
        </section>
      </aside>
    </section>
  );
}

function BackendMap() {
  return (
    <section className="backend-map">
      <div className="section-title">
        <Zap size={22} strokeWidth={3} />
        Backend Flow
      </div>
      {[
        'Landing page form',
        'n8n webhook',
        'Validate and tag lead',
        'AI blueprint generation',
        'Report page or PDF',
        'Email delivery and Slack alert',
      ].map((item, index) => (
        <div className="backend-step" key={item}>
          <span>{String(index + 1).padStart(2, '0')}</span>
          <strong>{item}</strong>
        </div>
      ))}
    </section>
  );
}

function BrandBoundary() {
  return (
    <>
      <section className="split-proof">
        <FlowCard icon={Target} title="Right Thurr" text="Product/app/public brand. Builds Systems from ideas." />
        <FlowCard
          icon={BriefcaseBusiness}
          title="Thurr Solutions"
          text="B2B services and implementation arm. Builds client automations and diagnostics."
        />
        <FlowCard
          icon={MapPinned}
          title="Client Funnels"
          text="Same backend engine, re-skinned to the client brand by default."
        />
      </section>

      <section className="brand-boundary" id="brand-boundary">
        <div className="watermark-panel" aria-label="R plus T watermark preview">
          <img src={monogram} alt="" />
        </div>
        <div>
          <div className="eyebrow">BRAND BOUNDARY</div>
          <h2>Owned brand system only.</h2>
          <p>
            Right Thurr and Thurr Solutions use this orange, ink, paper, arrow, border, and R+T
            language. Client diagnostic funnels can use the same backend engine, but they stay
            structurally reusable and visually re-skinnable.
          </p>
          <a className="text-link" href="mailto:hello@rightthurr.com">
            Launch first System <Mail size={18} strokeWidth={3} />
          </a>
        </div>
      </section>
    </>
  );
}

function FlowCard({ icon: Icon, title, text }) {
  return (
    <article>
      <Icon size={28} strokeWidth={3} />
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

function Metric({ icon: Icon, label, value }) {
  return (
    <div className="metric-card">
      <Icon size={24} strokeWidth={3} />
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
