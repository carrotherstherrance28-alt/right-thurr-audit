import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { createClient } from '@supabase/supabase-js';
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
import { fieldDefaults, rightThurrMockData } from './data/rightThurrMockData.js';

const {
  activityEvents,
  activityMetrics,
  aiAgents,
  aiExecutionPath,
  aiStats,
  attentionItems,
  blueprintSections,
  buildSteps,
  financeAttentionItems,
  moneyEvents,
  moneyMetrics,
  reportCards,
  reportMetrics,
  roadmapWeeks,
  systemAssetKeys,
  systems,
  tasks,
} = rightThurrMockData;

const publicNavItems = [
  ['Home', 'home'],
  ['Buildout Plan', 'buildout'],
  ['Thurr Solutions LLC', 'solutions'],
];

const operatorNavItems = [
  ['Command Center', 'command'],
  ['Systems', 'systems'],
];

const operatorPages = operatorNavItems.map(([, target]) => target);

function getIsOperatorPreview() {
  if (typeof window === 'undefined') {
    return false;
  }

  return new URLSearchParams(window.location.search).get('operator') === '1';
}

const buildoutWebhookUrl = import.meta.env.VITE_N8N_BUILDOUT_WEBHOOK_URL;
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabaseBuildoutUrl = supabaseUrl ? `${supabaseUrl}/rest/v1/buildout_requests` : '';
const authClient = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

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
  const [authSession, setAuthSession] = useState(null);
  const [authReady, setAuthReady] = useState(!authClient);
  const [ownerAccess, setOwnerAccess] = useState({ status: 'idle', allowed: false, message: '' });
  const isOperatorPreview = getIsOperatorPreview();
  const canViewOperator = isOperatorPreview && ownerAccess.allowed;
  const currentStep = useMemo(() => buildSteps[form.idea.length % buildSteps.length], [form.idea]);

  useEffect(() => {
    if (!authClient) {
      return undefined;
    }

    let mounted = true;

    authClient.auth.getSession().then(({ data }) => {
      if (mounted) {
        setAuthSession(data.session);
        setAuthReady(true);
      }
    });

    const {
      data: { subscription },
    } = authClient.auth.onAuthStateChange((_event, session) => {
      setAuthSession(session);
      setAuthReady(true);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (canViewOperator && page === 'home') {
      setPage('command');
    }
  }, [canViewOperator, page]);

  useEffect(() => {
    if (!isOperatorPreview) {
      return undefined;
    }

    if (!authSession?.access_token) {
      setOwnerAccess({ status: 'idle', allowed: false, message: '' });
      return undefined;
    }

    const controller = new AbortController();
    setOwnerAccess({ status: 'checking', allowed: false, message: '' });

    fetch('/api/owner-access', {
      headers: {
        Authorization: `Bearer ${authSession.access_token}`,
      },
      signal: controller.signal,
    })
      .then(async (ownerResponse) => {
        const data = await ownerResponse.json().catch(() => ({}));

        if (!ownerResponse.ok || !data.allowed) {
          setOwnerAccess({
            status: 'denied',
            allowed: false,
            message: data.error || 'This account is not on the owner allowlist.',
          });
          return;
        }

        setOwnerAccess({ status: 'allowed', allowed: true, message: '' });
      })
      .catch((error) => {
        if (error.name !== 'AbortError') {
          setOwnerAccess({
            status: 'denied',
            allowed: false,
            message: 'Owner access could not be verified.',
          });
        }
      });

    return () => {
      controller.abort();
    };
  }, [authSession, isOperatorPreview]);

  function navigateToPage(target) {
    if (!canViewOperator && operatorPages.includes(target)) {
      setPage('home');
      return;
    }

    setPage(target);
  }

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
    setPage: navigateToPage,
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="brand-lockup brand-button" type="button" onClick={() => navigateToPage('home')}>
          <img src={monogram} alt="" className="brand-mark" />
        </button>
        <nav className="nav-tabs" aria-label="Primary navigation">
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
        <div className={canViewOperator ? 'system-live owner-live' : 'system-live'}>
          <span className="live-dot" />
          {canViewOperator ? 'OWNER MODE' : 'SYSTEM LIVE'}
        </div>
      </header>

      {isOperatorPreview && !canViewOperator ? (
        <OwnerAccessGate authReady={authReady} authSession={authSession} ownerAccess={ownerAccess} />
      ) : (
        <>
          {page === 'home' && <HomePage {...sharedProps} />}
          {page === 'buildout' && <BuildoutPlanPage {...sharedProps} />}
          {page === 'solutions' && <SolutionsPage setPage={navigateToPage} />}
          {page === 'report' && <BlueprintReportPage setPage={navigateToPage} />}
          {page === 'export' && <ExportReportPage setPage={navigateToPage} />}
          {canViewOperator && page === 'command' && <CommandCenterPage setPage={navigateToPage} />}
          {canViewOperator && page === 'systems' && <SystemsPage setPage={navigateToPage} />}
        </>
      )}
    </div>
  );
}

function OwnerAccessGate({ authReady, authSession, ownerAccess }) {
  const [email, setEmail] = useState('');
  const [authMessage, setAuthMessage] = useState('');
  const [authStatus, setAuthStatus] = useState('idle');
  const signedInEmail = authSession?.user?.email || '';
  const isRejectedOwner = signedInEmail && ownerAccess.status === 'denied';

  async function handleOwnerSignIn(event) {
    event.preventDefault();

    if (!authClient) {
      setAuthStatus('error');
      setAuthMessage('Supabase Auth is not configured yet.');
      return;
    }

    setAuthStatus('sending');
    setAuthMessage('');

    const { error } = await authClient.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.href,
      },
    });

    if (error) {
      setAuthStatus('error');
      setAuthMessage(error.message);
      return;
    }

    setAuthStatus('sent');
    setAuthMessage('Check your email for the owner access link.');
  }

  async function handleSignOut() {
    if (!authClient) {
      return;
    }

    await authClient.auth.signOut();
  }

  return (
    <main className="owner-access-page">
      <section className="owner-access-card">
        <div className="eyebrow">OWNER ACCESS</div>
        <h1>Sign in to view the operator machine.</h1>
        <p>
          Command Center and Systems are private owner screens. Public visitors only see the
          website, buildout intake, and Thurr Solutions LLC service pages.
        </p>

        {!authReady && <p className="form-note">Checking owner session...</p>}

        {ownerAccess.status === 'checking' && (
          <p className="form-note">Verifying owner access...</p>
        )}

        {isRejectedOwner && (
          <div className="owner-auth-warning">
            <strong>{signedInEmail}</strong>
            <span>{ownerAccess.message || 'This account is not on the owner allowlist.'}</span>
            <button className="text-link dark-link button-link" type="button" onClick={handleSignOut}>
              Sign out
            </button>
          </div>
        )}

        <form className="owner-access-form" onSubmit={handleOwnerSignIn}>
          <label>
            Owner email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              required
            />
          </label>
          <button className="stamp-button" type="submit" disabled={authStatus === 'sending'}>
            {authStatus === 'sending' ? 'SENDING ACCESS LINK' : 'SEND OWNER ACCESS LINK'}
            <ArrowUpRight size={18} strokeWidth={3} />
          </button>
        </form>

        {authMessage && (
          <p className={authStatus === 'error' ? 'form-note error-note' : 'form-note'}>
            {authMessage}
          </p>
        )}
      </section>
    </main>
  );
}

function CommandCenterPage({ setPage }) {
  return (
    <main className="command-page" id="top">
      <section className="activity-hero">
        <div className="hero-copy">
          <div className="eyebrow">OWNER COMMAND CENTER</div>
          <h1>One place to see what the machine is doing.</h1>
          <p>
            Activity, AI orchestration, revenue signals, issues, and next moves belong together.
            Systems stay separate because that is where each business workspace lives.
          </p>
          <div className="hero-actions">
            <button className="stamp-button link-button" type="button" onClick={() => setPage('systems')}>
              VIEW SYSTEMS
              <ArrowUpRight size={18} strokeWidth={3} />
            </button>
            <button className="text-link dark-link button-link" type="button" onClick={() => setPage('buildout')}>
              Queue buildout
            </button>
          </div>
        </div>
        <aside className="activity-hero-stamp">
          <span>Autopilot Active</span>
          <strong>Current Mission</strong>
          <p>Build lead capture system</p>
        </aside>
      </section>

      <MissionActivityFeed />
      <AIEngineOrchestra />
      <FinanceCommandCenter />
    </main>
  );
}

function SystemsPage({ setPage }) {
  const [selectedSystemId, setSelectedSystemId] = useState(systems[0].id);
  const selectedSystem = systems.find((system) => system.id === selectedSystemId) ?? systems[0];

  return (
    <main className="systems-page" id="top">
      <section className="systems-hero">
        <div className="hero-copy">
          <div className="eyebrow">MY SYSTEMS</div>
          <h1>Each business gets its own machine.</h1>
          <p>
            A System is the workspace for the offer, landing page, CRM, automations, agents,
            revenue tracking, logs, and next action.
          </p>
          <div className="hero-actions">
            <button className="stamp-button link-button" type="button" onClick={() => setPage('buildout')}>
              START A NEW SYSTEM
              <ArrowUpRight size={18} strokeWidth={3} />
            </button>
            <button className="text-link dark-link button-link" type="button" onClick={() => setPage('command')}>
              View command center
            </button>
          </div>
        </div>
        <aside className="systems-hero-stamp">
          <span>Systems Running</span>
          <strong>{systems.length}</strong>
          <p>One workspace per business build.</p>
        </aside>
      </section>

      <SystemCockpit
        selectedSystem={selectedSystem}
        selectedSystemId={selectedSystemId}
        setSelectedSystemId={setSelectedSystemId}
      />
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
            This is the client-facing report view Thurr Solutions LLC can generate after the intake. It
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
            <button className="text-link dark-link button-link" type="button" onClick={() => setPage('export')}>
              Export-ready view
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
          <div className="eyebrow">THURR SOLUTIONS LLC</div>
          <h1>Private AI systems for local service businesses.</h1>
          <p>
            Custom AI agents, automations, lead intake, follow-up, and backend systems that help
            contractors, salons, realtors, and service companies stop losing money from missed
            leads and manual work.
          </p>
          <div className="hero-actions">
            <a className="stamp-button link-button" href="#solutions-services">
              START A PROJECT
              <ArrowUpRight size={18} strokeWidth={3} />
            </a>
            <button className="text-link dark-link button-link" type="button" onClick={() => setPage('home')}>
              View buildout plan
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
            Thurr Solutions LLC starts with the business case, then builds the workflow around the
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
          <h2>Thurr Solutions LLC builds the systems. The client keeps the brand.</h2>
          <p>
            Client diagnostic funnels are built by Thurr Solutions LLC and can use the same backend
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
            Thurr Solutions LLC turns business ideas and missed-lead problems into visible action:
            blueprint, offer, page copy, automations, tasks, and the next move.
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
        <Metric icon={Gauge} label="Private Systems" value="Built" />
        <Metric icon={Factory} label="Lead Intake" value="Automated" />
        <Metric icon={DollarSign} label="Revenue Leaks" value="Tracked" />
        <Metric icon={ClipboardCheck} label="Follow-Up" value="Handled" />
        <Metric icon={Zap} label="Owner Alerts" value="Live" />
      </section>

      <AuthoritySection />

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
            Thurr Solutions LLC analyzes your idea, niche, goal, and current assets, then maps the
            private AI system we would build first.
          </p>
          <div className="hero-actions">
            <a className="stamp-button link-button" href="#buildout-form">
              START THE BLUEPRINT
              <ArrowUpRight size={18} strokeWidth={3} />
            </a>
            <button className="text-link dark-link button-link" type="button" onClick={() => setPage('home')}>
              Back to home
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

function AuthoritySection() {
  return (
    <section className="authority-section" id="authority">
      <div className="section-copy">
        <div className="eyebrow">BUILT FOR OPERATORS</div>
        <h2>AI automation without turning your business into a course.</h2>
        <p>
          The long-term brand can grow into content and community, but the first offer stays
          client-focused: private systems for local service businesses that need leads handled,
          follow-up done, and the owner kept in the loop.
        </p>
      </div>
      <div className="authority-card-grid">
        <FlowCard
          icon={Target}
          title="Lead Intake"
          text="Capture the request, qualify the opportunity, and route it before the lead cools off."
        />
        <FlowCard
          icon={Zap}
          title="Automation Build"
          text="n8n workflows for forms, alerts, follow-up, summaries, and client-ready handoffs."
        />
        <FlowCard
          icon={Bot}
          title="Private AI Agents"
          text="Internal agents draft reports, summarize activity, and help decide the next best move."
        />
        <FlowCard
          icon={BriefcaseBusiness}
          title="Owner Visibility"
          text="The command center shows what happened, what changed, and what needs attention."
        />
      </div>
    </section>
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
        Thurr Solutions LLC Autopilot Blueprint
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
          <span>THURR SOLUTIONS LLC REPORT ENGINE</span>
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
            Ideas do not pay you. Systems do. Your blueprint shows what to build. Thurr Solutions
            LLC builds the first system for you.
          </p>
        </section>
      </section>

      <aside className="report-activity-rail">
        <div className="eyebrow">WHAT THE SYSTEM DID</div>
        {activityEvents.map((event) => (
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

function ExportReportPage({ setPage }) {
  return (
    <main className="export-report-page" id="top">
      <section className="export-report-toolbar">
        <button className="text-link dark-link button-link" type="button" onClick={() => setPage('report')}>
          Back to blueprint
        </button>
        <button className="stamp-button link-button" type="button" onClick={() => window.print()}>
          PRINT / SAVE PDF
          <FileText size={18} strokeWidth={3} />
        </button>
      </section>

      <article className="export-report-sheet" aria-label="Export-ready Thurr Solutions LLC Autopilot Blueprint">
        <header className="export-report-cover">
          <div>
            <div className="eyebrow">Thurr Solutions LLC Autopilot Blueprint</div>
            <h1>Build the system that captures leads before they cool off.</h1>
          </div>
          <div className="export-report-status">Ready for Review</div>
        </header>

        <section className="export-report-summary">
          <article className="export-report-panel">
            <h2>Your Business Opportunity</h2>
            <p>
              Mobile detailing has urgent buyer intent, strong local search behavior, and
              repeat-purchase potential. The first build should make the offer easy to understand
              and easy to book.
            </p>
            <div className="export-report-metrics">
              {reportMetrics.map(([label, value]) => (
                <div className="export-report-metric" key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          </article>
          <aside className="export-report-panel dark">
            <h2>Recommended Next Step</h2>
            <p>
              Approve the starter offer and let Thurr Solutions LLC build the first lead-to-booking
              system.
            </p>
          </aside>
        </section>

        <section className="export-report-section">
          <div className="export-report-section-title">Blueprint Sections</div>
          <div className="export-ticket-grid">
            {reportCards.map((card, index) => (
              <article className="export-ticket" key={card.label}>
                <span>{String(index + 1).padStart(2, '0')} {card.label}</span>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="export-report-section">
          <div className="export-report-section-title">30-Day Launch Roadmap</div>
          <div className="export-roadmap">
            {roadmapWeeks.map(([week, item]) => (
              <div className="export-roadmap-row" key={week}>
                <span>{week}</span>
                <strong>{item}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="export-report-cta">
          <strong>Ideas do not pay you. Systems do.</strong>
          <p>Your blueprint shows what to build. Thurr Solutions LLC builds the first system for you.</p>
        </section>
      </article>
    </main>
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
        {activityEvents.map((event) => (
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
    <section className="mission-feed-grid" aria-label="Thurr Solutions LLC mission activity feed">
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
          <span>THURR SOLUTIONS LLC ACTIVITY LOG</span>
          <span className="activity-glyph">✓</span>
        </div>
        {activityEvents.map((event) => (
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

function SystemCockpit({ selectedSystem, selectedSystemId, setSelectedSystemId }) {
  return (
    <section className="system-cockpit" aria-label="Thurr Solutions LLC system workspace">
      <aside className="system-selector-panel">
        <div className="eyebrow">SYSTEMS</div>
        <div className="system-selector-list">
          {systems.map((system) => (
            <button
              className={system.id === selectedSystemId ? 'system-selector active' : 'system-selector'}
              key={system.id}
              type="button"
              onClick={() => setSelectedSystemId(system.id)}
            >
              <strong>{system.name}</strong>
              <span>{system.status}</span>
            </button>
          ))}
        </div>
      </aside>

      <section className="system-workspace-panel">
        <div className="status-stamp">{selectedSystem.status}</div>
        <h2>{selectedSystem.name}</h2>
        <p>{selectedSystem.mission}</p>
        <div className="system-asset-grid">
          {systemAssetKeys.map(([label, key]) => (
            <article className="system-asset" key={label}>
              <span>{label}</span>
              <h3>{selectedSystem[key]}</h3>
            </article>
          ))}
        </div>
      </section>

      <aside className="system-next-panel">
        <div className="eyebrow">NEXT ACTION</div>
        <h3>{selectedSystem.next}</h3>
        <p>
          Thurr Solutions LLC keeps the workspace organized so the next build step is always visible.
        </p>
        <div className="system-mini-stats">
          <div>
            <span>Revenue</span>
            <strong>{selectedSystem.revenue}</strong>
          </div>
          <div>
            <span>Last Action</span>
            <strong>{selectedSystem.action}</strong>
          </div>
        </div>
      </aside>
    </section>
  );
}

function FinanceCommandCenter() {
  return (
    <section className="finance-command-grid" aria-label="Thurr Solutions LLC finance command center">
      <aside className="finance-summary-panel">
        <div className="eyebrow">FINANCE AGENT</div>
        <h2>$1,648</h2>
        <p>
          Profit after tracked expenses. The screen explains where money came from and what needs
          attention before the next system move.
        </p>
        <div className="finance-metric-stack">
          {moneyMetrics.slice(0, 3).map(([label, value]) => (
            <div className="finance-metric" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
      </aside>

      <section className="money-events-panel">
        <div className="proof-header">
          <span>MONEY EVENTS</span>
          <span className="activity-glyph">$</span>
        </div>
        {moneyEvents.map((event) => (
          <article className="money-event-row" key={`${event.time}-${event.event}`}>
            <time>{event.time}</time>
            <div>
              <strong>{event.event}</strong>
              <p>{event.system}</p>
            </div>
            <span>{event.impact}</span>
          </article>
        ))}
      </section>

      <aside className="finance-attention-panel">
        <div className="eyebrow">NEEDS ATTENTION</div>
        {financeAttentionItems.map((item) => (
          <article className="finance-note-card" key={item.title}>
            <span>{item.label}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
        <div className="finance-mini-grid">
          {moneyMetrics.slice(3).map(([label, value]) => (
            <div key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
      </aside>
    </section>
  );
}

function AIEngineOrchestra() {
  return (
    <section className="ai-orchestra-grid" aria-label="Thurr Solutions LLC AI Engine orchestration">
      <aside className="ai-mission-panel">
        <div className="eyebrow">ORCHESTRATOR</div>
        <h2>Build lead funnel.</h2>
        <p>
          The Orchestrator routes the mission to the right agent, model, memory, and tool action.
        </p>
        <div className="ai-stat-stack">
          {aiStats.map(([label, value]) => (
            <div className="ai-stat" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
      </aside>

      <section className="ai-agent-panel">
        <div className="proof-header">
          <span>SPECIALIZED AGENTS</span>
          <span className="activity-glyph">✓</span>
        </div>
        <div className="ai-agent-list">
          {aiAgents.map((agent) => (
            <article className="ai-agent-card" key={agent.name}>
              <b>{agent.glyph}</b>
              <div>
                <h3>{agent.name}</h3>
                <p>{agent.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <aside className="ai-path-panel">
        <div className="eyebrow">EXECUTION PATH</div>
        {aiExecutionPath.map((step, index) => (
          <div className="ai-path-step" key={step}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <strong>{step}</strong>
          </div>
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
        {activityEvents.map((event) => (
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
            {systems.map((system) => (
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
          <h2>Thurr Solutions LLC builds the system. Client brands stay client-owned.</h2>
          <p>
            The same execution engine can power owned products, B2B services, and client
            diagnostics. The brand layer changes depending on who the system is for.
          </p>
        </div>
        <div className="brand-lane-grid">
          <article>
            <Target size={24} strokeWidth={3} />
            <h3>Thurr Solutions LLC</h3>
            <p>Public buildout plan, B2B services, and private automation systems.</p>
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
