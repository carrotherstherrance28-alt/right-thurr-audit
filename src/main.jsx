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

const reportMetrics = [
  ['Confidence', '87%'],
  ['Launch Path', '30 days'],
  ['Money Path', 'Booked jobs'],
];

const roadmapWeeks = [
  ['W1', 'Offer, landing page, intake form, CRM fields'],
  ['W2', 'n8n lead routing, email/SMS follow-up, owner alerts'],
  ['W3', 'Local lead sources, outreach list, content starter pack'],
  ['W4', 'Revenue review, bottleneck fix, second offer test'],
];

const reportCards = [
  {
    label: 'Your Business Opportunity',
    title: 'Local service demand with urgent buyer intent.',
    text: 'Mobile detailing has search intent, repeat potential, and a clear before/after offer. The first system should make the business easy to understand and easy to book.',
  },
  {
    label: 'Best Business Model',
    title: 'Service revenue first, recurring packages second.',
    text: 'Start with a simple express-detail offer, then add memberships and fleet packages after the lead-to-booking path proves reliable.',
  },
  {
    label: 'Funnel Strategy',
    title: 'One page, one offer, one action.',
    text: 'Use a local landing page with proof, pricing anchor, booking CTA, and fast response automation for leads that do not book immediately.',
  },
  {
    label: 'Automation Stack',
    title: 'Webhook, CRM, alerts, follow-up, daily summary.',
    text: 'n8n receives the form, saves the lead, tags the opportunity, triggers email/SMS follow-up, and sends an operator summary.',
  },
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

const activityMetrics = [
  ['Tasks Done', '89'],
  ['Issues Found', '1'],
  ['Revenue Today', '$427'],
];

const attentionItems = [
  {
    label: 'Issue Found',
    title: 'Slack credential is noisy.',
    text: 'Discord is now the V1 leads alert path. Slack can wait until the workspace access is worth fixing.',
  },
  {
    label: 'Next Move',
    title: 'Review blueprint draft.',
    text: 'Approve the offer before generating client-facing copy or outreach assets.',
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
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabaseBuildoutUrl = supabaseUrl ? `${supabaseUrl}/rest/v1/buildout_requests` : '';

function mapBuildoutPayloadToSupabaseRow(payload) {
  return {
    source: payload.source,
    brand: payload.brand,
    name: payload.lead.name,
    email: payload.lead.email,
    phone: payload.lead.phone,
    website_or_social: payload.lead.website_or_social,
    business_idea: payload.intake.business_idea,
    industry: payload.intake.industry,
    main_goal: payload.intake.main_goal,
    location: payload.intake.location,
    budget_level: payload.intake.budget_level,
    timeline: payload.intake.timeline,
    biggest_bottleneck: payload.intake.biggest_bottleneck,
    report_type: payload.routing.report_type,
    status: 'requested',
  };
}

async function submitBuildoutRequest(payload) {
  if (buildoutWebhookUrl) {
    const response = await fetch(buildoutWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Webhook request failed');
    }

    return 'queued';
  }

  if (supabaseBuildoutUrl && supabaseAnonKey) {
    const response = await fetch(supabaseBuildoutUrl, {
      method: 'POST',
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(mapBuildoutPayloadToSupabaseRow(payload)),
    });

    if (!response.ok) {
      throw new Error('Supabase request failed');
    }

    return 'queued-supabase';
  }

  const response = await fetch('/api/buildout-request', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    return 'queued-supabase';
  }

  if (response.status !== 404) {
    throw new Error('Buildout request API failed');
  }

  return 'queued-local';
}

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

    try {
      const nextState = await submitBuildoutRequest(payload);
      setSubmissionState(nextState);
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
            ['Blueprint Report', 'report'],
            ['Activity Feed', 'activity'],
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
      {page === 'report' && <BlueprintReportPage setPage={setPage} />}
      {page === 'activity' && <ActivityFeedPage setPage={setPage} />}
    </div>
  );
}

function ActivityFeedPage({ setPage }) {
  return (
    <main className="activity-page" id="top">
      <section className="activity-hero">
        <div className="hero-copy">
          <div className="eyebrow">WHAT YOUR SYSTEM DID TODAY</div>
          <h1>The machine should show its work.</h1>
          <p>
            Every workflow, agent action, issue, and revenue event becomes a visible operator feed
            so the owner can see the business-building system moving.
          </p>
          <div className="hero-actions">
            <button className="stamp-button link-button" type="button" onClick={() => setPage('buildout')}>
              QUEUE A BUILDOUT
              <ArrowUpRight size={18} strokeWidth={3} />
            </button>
            <button className="text-link dark-link button-link" type="button" onClick={() => setPage('report')}>
              View blueprint report
            </button>
          </div>
        </div>
        <aside className="activity-hero-stamp">
          <span>AI Engine Active</span>
          <strong>Current Mission</strong>
          <p>Build lead capture system</p>
        </aside>
      </section>

      <MissionActivityFeed />
    </main>
  );
}

function BlueprintReportPage({ setPage }) {
  return (
    <main className="report-page" id="top">
      <section className="report-hero">
        <div className="hero-copy">
          <div className="eyebrow">GENERATED AUTOPILOT BLUEPRINT</div>
          <h1>Your first system is a lead-to-booking engine.</h1>
          <p>
            This is the client-facing report view Right Thurr can generate after the intake. It
            turns an idea into a model, revenue path, funnel, automation plan, agent map, and launch
            queue.
          </p>
          <div className="hero-actions">
            <button className="stamp-button link-button" type="button" onClick={() => setPage('buildout')}>
              START ANOTHER BLUEPRINT
              <ArrowUpRight size={18} strokeWidth={3} />
            </button>
            <button className="text-link dark-link button-link" type="button" onClick={() => setPage('home')}>
              Back to machine
            </button>
          </div>
        </div>
        <aside className="report-summary-stamp">
          <img src={monogram} alt="" />
          <span>Report Ready</span>
          <strong>Dallas Mobile Detailing Engine</strong>
        </aside>
      </section>

      <BlueprintCommandReport />
    </main>
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
      <section className="landing-hero machine-first-hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <div className="eyebrow">YOUR SYSTEM IS ALREADY MOVING</div>
          <h1 id="hero-title">Ideas do not pay you. Systems do.</h1>
          <p>
            Right Thurr turns the idea into visible action: blueprint, offer, page copy,
            automations, tasks, and the next move.
          </p>
          <div className="hero-actions">
            <button className="stamp-button link-button" type="button" onClick={() => setPage('buildout')}>
              GET MY BUILDOUT PLAN
              <ArrowUpRight size={18} strokeWidth={3} />
            </button>
            <a className="text-link dark-link" href="#machine">
              Watch the system work
            </a>
          </div>
          <div className="hero-pulse-row" aria-label="Live system proof">
            <span>Blueprint generated</span>
            <span>Tasks queued</span>
            <span>Revenue tracked</span>
          </div>
        </div>

        <HeroActivityPanel />
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
          <button className="text-link dark-link button-link" type="button" onClick={() => setPage('report')}>
            View generated report
          </button>
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
          required
        />
      </label>
      <label>
        Email
        <input
          type="email"
          value={form.email}
          onChange={(event) => updateField('email', event.target.value)}
          placeholder="you@example.com"
          required
        />
      </label>
      <label className="wide-field">
        Current business or idea
        <textarea
          value={form.idea}
          onChange={(event) => updateField('idea', event.target.value)}
          rows={4}
          required
        />
      </label>
      <label>
        Industry
        <input
          value={form.industry}
          onChange={(event) => updateField('industry', event.target.value)}
          placeholder="Local service"
          required
        />
      </label>
      <label>
        Main goal
        <select value={form.goal} onChange={(event) => updateField('goal', event.target.value)} required>
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
          Blueprint queued locally. Add the n8n webhook URL or Supabase env vars to send live
          requests.
        </p>
      )}
      {submissionState === 'queued-supabase' && (
        <p className="form-note wide-field">
          Blueprint request saved. Connect n8n next to generate and deliver the report.
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

function BlueprintCommandReport() {
  return (
    <section className="blueprint-command-report" aria-label="Generated Autopilot Blueprint report">
      <aside className="report-nav-rail">
        {blueprintSections.map((section) => (
          <a href="#report-body" key={section}>
            {section}
          </a>
        ))}
      </aside>

      <section className="report-command-center" id="report-body">
        <div className="proof-header">
          <span>RIGHT THURR REPORT ENGINE</span>
          <span className="activity-glyph">✓</span>
        </div>
        <div className="eyebrow">AI BUSINESS BUILDOUT PLAN</div>
        <h2>Build the system that captures leads before they cool off.</h2>
        <p>
          The fastest first move is a focused lead-to-booking system: landing page, offer, intake,
          CRM routing, follow-up, owner alerts, and a weekly revenue review.
        </p>
        <div className="report-metric-grid">
          {reportMetrics.map(([label, value]) => (
            <div className="report-metric" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>

        <div className="report-card-grid">
          {reportCards.map((card) => (
            <article className="report-info-card" key={card.label}>
              <span>{card.label}</span>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>

        <section className="report-roadmap">
          <div className="section-title">
            <ClipboardCheck size={22} strokeWidth={3} />
            30-Day Launch Roadmap
          </div>
          <div className="roadmap-list">
            {roadmapWeeks.map(([week, item]) => (
              <div className="roadmap-row" key={week}>
                <span>{week}</span>
                <strong>{item}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="report-next-step">
          <span>Recommended Next Step</span>
          <strong>Your blueprint is ready. The only thing missing is execution.</strong>
          <p>
            Ideas do not pay you. Systems do. Your blueprint shows what to build. Right Thurr builds
            the first system for you.
          </p>
        </section>
      </section>

      <aside className="report-activity-rail">
        <div className="eyebrow">WHAT THE SYSTEM DID</div>
        {initialEvents.map((event) => (
          <article className="report-feed-item" key={`${event.time}-${event.agent}`}>
            <time>{event.time}</time>
            <div>
              <strong>{event.agent}</strong>
              <p>{event.text}</p>
            </div>
          </article>
        ))}
        <div className="report-agent-stack">
          <span>Agents Used</span>
          <strong>Opportunity · Funnel · Revenue · Automation · Execution</strong>
        </div>
      </aside>
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

function MissionActivityFeed() {
  return (
    <section className="mission-feed-grid" aria-label="Right Thurr mission activity feed">
      <aside className="mission-status-panel">
        <div className="eyebrow">CURRENT MISSION</div>
        <h2>Build lead capture system.</h2>
        <p>
          Activity is grouped around the mission the machine is trying to finish right now, not just
          dumped into a log.
        </p>
        <div className="mission-metrics">
          {activityMetrics.map(([label, value]) => (
            <div className="mission-metric" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
      </aside>

      <section className="mission-feed-panel">
        <div className="proof-header">
          <span>RIGHT THURR ACTIVITY LOG</span>
          <span className="activity-glyph">✓</span>
        </div>
        {initialEvents.map((event) => (
          <article className="mission-feed-row" key={`${event.time}-${event.agent}-mission`}>
            <time>{event.time}</time>
            <span className="activity-glyph">{event.glyph}</span>
            <div>
              <strong>{event.agent}</strong>
              <h3>{event.text}</h3>
              <p>{event.impact} event written to the activity log.</p>
            </div>
          </article>
        ))}
      </section>

      <aside className="mission-attention-panel">
        <div className="eyebrow">NEEDS ATTENTION</div>
        {attentionItems.map((item) => (
          <article className="attention-card" key={item.title}>
            <span>{item.label}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </aside>
    </section>
  );
}

function HeroActivityPanel() {
  return (
    <aside className="hero-activity-card" aria-label="Live system activity sample">
      <div className="proof-header">
        <span>AUTOPILOT STATUS: ACTIVE</span>
        <span className="activity-glyph">✓</span>
      </div>
      <div className="hero-command-grid">
        <div>
          <span>Systems Running</span>
          <strong>4</strong>
        </div>
        <div>
          <span>Revenue Today</span>
          <strong>$427</strong>
        </div>
        <div>
          <span>Tasks Done</span>
          <strong>89</strong>
        </div>
        <div>
          <span>Issues Found</span>
          <strong>1</strong>
        </div>
      </div>
      <div className="hero-feed">
        {initialEvents.map((event) => (
          <article className="hero-feed-item" key={`${event.time}-${event.agent}`}>
            <time>{event.time}</time>
            <div>
              <strong>{event.agent}</strong>
              <p>{event.text}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="hero-current-mission">
        <span>CURRENT MISSION</span>
        <strong>Build lead capture system</strong>
      </div>
    </aside>
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
      <section className="brand-boundary architecture-boundary" id="brand-boundary">
        <div className="watermark-panel" aria-label="R plus T watermark preview">
          <img src={monogram} alt="" />
        </div>
        <div>
          <div className="eyebrow">BRAND BOUNDARY</div>
          <h2>Right Thurr is the product. Thurr Solutions is the builder.</h2>
          <p>
            The same execution engine can power owned products, B2B services, and client
            diagnostics. The brand layer changes depending on who the system is for.
          </p>
        </div>
        <div className="brand-lane-grid">
          <article>
            <Target size={24} strokeWidth={3} />
            <h3>Right Thurr</h3>
            <p>Product, app, public buildout plan, and owned systems from ideas.</p>
          </article>
          <article>
            <BriefcaseBusiness size={24} strokeWidth={3} />
            <h3>Thurr Solutions</h3>
            <p>B2B services, implementation, proposals, case studies, and client delivery.</p>
          </article>
          <article>
            <MapPinned size={24} strokeWidth={3} />
            <h3>Client Funnels</h3>
            <p>Same backend engine, re-skinned to the client brand by default.</p>
          </article>
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
