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
  ArrowLeft,
  Factory,
  FileText,
  Gauge,
  Hammer,
  Instagram,
  Linkedin,
  Mail,
  MapPinned,
  PhoneCall,
  Send,
  Sparkles,
  Target,
  Zap,
} from 'lucide-react';
import './styles/brand-tokens.css';
import './styles/app.css';
import './styles/final-overrides.css';
import monogram from './assets/rt-monogram-clean.png';
import { SiteFooter, SiteHeader, SystemStatusBar } from './components/SiteChrome.jsx';
import { UseCasesIndexPage } from './components/UseCasesIndexPage.jsx';
import { WebsiteLandlordUseCasePage } from './components/WebsiteLandlordUseCasePage.jsx';
import { AiLeadFollowupUseCasePage } from './components/AiLeadFollowupUseCasePage.jsx';
import { MissedCallTextbackUseCasePage } from './components/MissedCallTextbackUseCasePage.jsx';
import { ReviewBoosterUseCasePage } from './components/ReviewBoosterUseCasePage.jsx';
import { NoShowSaverUseCasePage } from './components/NoShowSaverUseCasePage.jsx';
import { EstimateFollowUpUseCasePage } from './components/EstimateFollowUpUseCasePage.jsx';
import { SeasonalReactivationUseCasePage } from './components/SeasonalReactivationUseCasePage.jsx';
import { QuoteQualifierUseCasePage } from './components/QuoteQualifierUseCasePage.jsx';
import { ServiceReminderUseCasePage } from './components/ServiceReminderUseCasePage.jsx';
import { MaintenancePlanUpsellUseCasePage } from './components/MaintenancePlanUpsellUseCasePage.jsx';
import { DepositRequestUseCasePage } from './components/DepositRequestUseCasePage.jsx';
import { FinancingAssistUseCasePage } from './components/FinancingAssistUseCasePage.jsx';
import { ProjectPhotoProofUseCasePage } from './components/ProjectPhotoProofUseCasePage.jsx';
import { PartsArrivalPingUseCasePage } from './components/PartsArrivalPingUseCasePage.jsx';
import { EtaUpdateUseCasePage } from './components/EtaUpdateUseCasePage.jsx';
import { ReferralLoopUseCasePage } from './components/ReferralLoopUseCasePage.jsx';
import { CancellationSaveUseCasePage } from './components/CancellationSaveUseCasePage.jsx';
import { InvoiceFollowUpUseCasePage } from './components/InvoiceFollowUpUseCasePage.jsx';
import { AppointmentPrepUseCasePage } from './components/AppointmentPrepUseCasePage.jsx';
import { AfterHoursTriageUseCasePage } from './components/AfterHoursTriageUseCasePage.jsx';
import { ServiceRecoverySaveUseCasePage } from './components/ServiceRecoverySaveUseCasePage.jsx';
import { WarrantyClaimIntakeUseCasePage } from './components/WarrantyClaimIntakeUseCasePage.jsx';
import { ChangeOrderApprovalUseCasePage } from './components/ChangeOrderApprovalUseCasePage.jsx';
import { JobKickoffPacketUseCasePage } from './components/JobKickoffPacketUseCasePage.jsx';
import { WeatherDelayUpdateUseCasePage } from './components/WeatherDelayUpdateUseCasePage.jsx';
import { clientDiagnosticTemplates } from './data/clientDiagnosticTemplates.js';
import diagnosticLanesConfig from '../diagnostic/lanes.json';
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
  ['Lead Audit', 'audit'],
  ['Compliance', 'compliance'],
];

const socialLinks = {
  linkedin: 'https://www.linkedin.com/in/therrance-carrothers',
  instagram: 'https://www.instagram.com/thurrsolutions/',
  upwork: 'https://www.upwork.com/freelancers/~011a33e3e2e65c4bbd?mp_source=share',
};

const introVideo = {
  src: '/media/thurr-solutions-lead-system-intro.mp4',
  poster: '/media/thurr-solutions-lead-system-intro-poster.jpg',
};

const auditInitialForm = {
  businessName: '',
  ownerName: '',
  email: '',
  businessUrl: '',
  monthlyLeadsEstimate: 'Not sure',
  frustrationText: '',
};

const auditLeadVolumes = ['<25', '25–100', '100–500', '500+', 'Not sure'];

const operatorNavItems = [
  ['Command Center', 'command'],
  ['Systems', 'systems'],
];

const operatorPages = operatorNavItems.map(([, target]) => target);
const diagnosticSlugToTemplateKey = Object.entries(clientDiagnosticTemplates).reduce((acc, [key, template]) => {
  const slug = template?.slug;
  if (slug) {
    acc[slug] = key;
  }
  return acc;
}, {});

const diagnosticLaneSlugs = new Set(
  (diagnosticLanesConfig?.lanes ?? [])
    .map((lane) => String(lane?.slug ?? '').trim())
    .filter(Boolean),
);

const defaultDiagnosticSlug =
  String(diagnosticLanesConfig?.lanes?.[0]?.slug ?? '').trim() ||
  clientDiagnosticTemplates.mobileDetailing?.slug ||
  'mobile-detailing';

diagnosticLaneSlugs.add(defaultDiagnosticSlug);

const defaultDiagnosticKey = diagnosticSlugToTemplateKey[defaultDiagnosticSlug] || 'mobileDetailing';

function normalizeDiagnosticSlug(value) {
  if (!value) {
    return null;
  }

  const normalized = String(value).trim().toLowerCase();

  if (diagnosticLaneSlugs.has(normalized)) {
    return normalized;
  }

  return null;
}

function getDiagnosticSlugFromPathname(pathname) {
  if (!pathname?.startsWith('/diagnostic')) {
    return null;
  }

  const remainder = pathname.replace(/^\/diagnostic\/?/, '');
  const rawSlug = remainder.split('/')[0] || '';

  if (!rawSlug) {
    return null;
  }

  return normalizeDiagnosticSlug(rawSlug);
}

function replaceLocationPathname(nextPathname) {
  const url = new URL(window.location.href);
  url.pathname = nextPathname;
  url.searchParams.delete('diagnostic');
  window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
}

function getIsOperatorPreview() {
  if (typeof window === 'undefined') {
    return false;
  }

  return (
    window.location.pathname === '/owner/callback' ||
    new URLSearchParams(window.location.search).get('operator') === '1'
  );
}

function getInitialDiagnosticSlug() {
  if (typeof window === 'undefined') {
    return null;
  }

  const params = new URLSearchParams(window.location.search);
  const legacySlug = normalizeDiagnosticSlug(params.get('diagnostic'));

  if (legacySlug) {
    return legacySlug;
  }

  return getDiagnosticSlugFromPathname(window.location.pathname);
}

function getInitialPage() {
  if (typeof window === 'undefined') {
    return 'home';
  }

  if (window.location.pathname === '/audit/thanks' || window.location.pathname === '/audit/thanks/') {
    return 'audit-thanks';
  }

  if (window.location.pathname === '/audit' || window.location.pathname === '/audit/') {
    return 'audit';
  }

  if (window.location.pathname === '/compliance' || window.location.pathname === '/compliance/') {
    return 'compliance';
  }

  if (window.location.pathname === '/privacy' || window.location.pathname === '/privacy/') {
    return 'privacy';
  }

  if (
    window.location.pathname === '/work/restore-c' ||
    window.location.pathname === '/work/restore-c/'
  ) {
    return 'work-restore';
  }

  if (window.location.pathname === '/work/heartpathbloom' || window.location.pathname === '/work/heartpathbloom/') {
    return 'work-heartpathbloom';
  }

  if (window.location.pathname === '/work/insurance-pipeline' || window.location.pathname === '/work/insurance-pipeline/') {
    return 'work-insurance';
  }

  if (window.location.pathname === '/work' || window.location.pathname === '/work/') {
    return 'work';
  }

  if (window.location.pathname.startsWith('/use-cases/website-landlord')) {
    return 'usecase-website-landlord';
  }

  if (window.location.pathname.startsWith('/use-cases/ai-lead-followup')) {
    return 'usecase-ai-lead-followup';
  }

  if (window.location.pathname.startsWith('/use-cases/missed-call-textback')) {
    return 'usecase-missed-call-textback';
  }

  if (window.location.pathname.startsWith('/use-cases/review-booster')) {
    return 'usecase-review-booster';
  }

  if (window.location.pathname.startsWith('/use-cases/no-show-saver')) {
    return 'usecase-no-show-saver';
  }

  if (window.location.pathname.startsWith('/use-cases/estimate-follow-up')) {
    return 'usecase-estimate-follow-up';
  }

  if (window.location.pathname.startsWith('/use-cases/seasonal-reactivation')) {
    return 'usecase-seasonal-reactivation';
  }

  if (window.location.pathname.startsWith('/use-cases/quote-qualifier')) {
    return 'usecase-quote-qualifier';
  }

  if (window.location.pathname.startsWith('/use-cases/service-reminder')) {
    return 'usecase-service-reminder';
  }

  if (window.location.pathname.startsWith('/use-cases/maintenance-plan-upsell')) {
    return 'usecase-maintenance-plan-upsell';
  }

  if (window.location.pathname.startsWith('/use-cases/deposit-request')) {
    return 'usecase-deposit-request';
  }

  if (window.location.pathname.startsWith('/use-cases/financing-assist')) {
    return 'usecase-financing-assist';
  }

  if (window.location.pathname.startsWith('/use-cases/project-photo-proof')) {
    return 'usecase-project-photo-proof';
  }

  if (window.location.pathname.startsWith('/use-cases/parts-arrival-ping')) {
    return 'usecase-parts-arrival-ping';
  }

  if (window.location.pathname.startsWith('/use-cases/eta-update')) {
    return 'usecase-eta-update';
  }

  if (window.location.pathname.startsWith('/use-cases/referral-loop')) {
    return 'usecase-referral-loop';
  }

  if (window.location.pathname.startsWith('/use-cases/cancellation-save')) {
    return 'usecase-cancellation-save';
  }

  if (window.location.pathname.startsWith('/use-cases/invoice-follow-up')) {
    return 'usecase-invoice-follow-up';
  }

  if (window.location.pathname.startsWith('/use-cases/appointment-prep')) {
    return 'usecase-appointment-prep';
  }

  if (window.location.pathname.startsWith('/use-cases/after-hours-triage')) {
    return 'usecase-after-hours-triage';
  }

  if (window.location.pathname.startsWith('/use-cases/service-recovery-save')) {
    return 'usecase-service-recovery-save';
  }

  if (window.location.pathname.startsWith('/use-cases/warranty-claim-intake')) {
    return 'usecase-warranty-claim-intake';
  }

  if (window.location.pathname.startsWith('/use-cases/change-order-approval')) {
    return 'usecase-change-order-approval';
  }

  if (window.location.pathname.startsWith('/use-cases/job-kickoff-packet')) {
    return 'usecase-job-kickoff-packet';
  }

  if (window.location.pathname.startsWith('/use-cases/weather-delay-update')) {
    return 'usecase-weather-delay-update';
  }

  if (window.location.pathname === '/use-cases' || window.location.pathname === '/use-cases/') {
    return 'usecases-index';
  }

  if (getInitialDiagnosticSlug()) {
    return 'client-diagnostic';
  }

  if (window.location.pathname.startsWith('/diagnostic')) {
    return 'diagnostic-index';
  }

  return 'home';
}

const useCaseRoutes = {
  'usecases-index': '/use-cases',
  'usecase-website-landlord': '/use-cases/website-landlord',
  'usecase-ai-lead-followup': '/use-cases/ai-lead-followup',
  'usecase-missed-call-textback': '/use-cases/missed-call-textback',
  'usecase-review-booster': '/use-cases/review-booster',
  'usecase-no-show-saver': '/use-cases/no-show-saver',
  'usecase-estimate-follow-up': '/use-cases/estimate-follow-up',
  'usecase-seasonal-reactivation': '/use-cases/seasonal-reactivation',
  'usecase-quote-qualifier': '/use-cases/quote-qualifier',
  'usecase-service-reminder': '/use-cases/service-reminder',
  'usecase-maintenance-plan-upsell': '/use-cases/maintenance-plan-upsell',
  'usecase-deposit-request': '/use-cases/deposit-request',
  'usecase-financing-assist': '/use-cases/financing-assist',
  'usecase-project-photo-proof': '/use-cases/project-photo-proof',
  'usecase-parts-arrival-ping': '/use-cases/parts-arrival-ping',
  'usecase-eta-update': '/use-cases/eta-update',
  'usecase-referral-loop': '/use-cases/referral-loop',
  'usecase-cancellation-save': '/use-cases/cancellation-save',
  'usecase-invoice-follow-up': '/use-cases/invoice-follow-up',
  'usecase-appointment-prep': '/use-cases/appointment-prep',
  'usecase-after-hours-triage': '/use-cases/after-hours-triage',
  'usecase-service-recovery-save': '/use-cases/service-recovery-save',
  'usecase-warranty-claim-intake': '/use-cases/warranty-claim-intake',
  'usecase-change-order-approval': '/use-cases/change-order-approval',
  'usecase-job-kickoff-packet': '/use-cases/job-kickoff-packet',
  'usecase-weather-delay-update': '/use-cases/weather-delay-update',
};

const pageRoutes = {
  audit: '/audit',
  'audit-thanks': '/audit/thanks',
  compliance: '/compliance',
  privacy: '/privacy',
  work: '/work',
  'work-restore': '/work/restore-c',
  'work-heartpathbloom': '/work/heartpathbloom',
  'work-insurance': '/work/insurance-pipeline',
};

const buildoutWebhookUrl = import.meta.env.VITE_N8N_BUILDOUT_WEBHOOK_URL;
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabaseBuildoutUrl = supabaseUrl ? `${supabaseUrl}/rest/v1/buildout_requests` : '';
const ownerSupabaseClient =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          autoRefreshToken: true,
          detectSessionInUrl: true,
          persistSession: true,
        },
      })
    : null;

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

async function submitAuditRequest(payload) {
  const response = await fetch('/api/audit-request', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    return response.json().catch(() => ({ ok: true }));
  }

  if (response.status === 404) {
    return { ok: true, status: 'queued-local' };
  }

  const errorPayload = await response.json().catch(() => ({}));
  throw new Error(errorPayload.message || 'Lead Flow Audit request failed.');
}

function App() {
  const [page, setPage] = useState(getInitialPage);
  const [diagnosticSlug, setDiagnosticSlug] = useState(getInitialDiagnosticSlug);
  const [form, setForm] = useState(fieldDefaults);
  const [submissionState, setSubmissionState] = useState('idle');
  const [menuOpen, setMenuOpen] = useState(false);
  const isOperatorPreview = getIsOperatorPreview();
  const [operatorAccess, setOperatorAccess] = useState({ status: 'idle', message: '' });
  const [canViewOperator, setCanViewOperator] = useState(false);
  const currentStep = useMemo(() => buildSteps[form.idea.length % buildSteps.length], [form.idea]);
  const headDefaults = useMemo(() => {
    if (typeof window === 'undefined') {
      return null;
    }

    const canonicalLink = document.querySelector('link[rel="canonical"]');
    const descriptionMeta = document.querySelector('meta[name="description"]');
    const robotsMeta = document.querySelector('meta[name="robots"]');

    const ogTitleMeta = document.querySelector('meta[property="og:title"]');
    const ogDescriptionMeta = document.querySelector('meta[property="og:description"]');
    const ogUrlMeta = document.querySelector('meta[property="og:url"]');

    const twitterTitleMeta = document.querySelector('meta[name="twitter:title"]');
    const twitterDescriptionMeta = document.querySelector('meta[name="twitter:description"]');

    return {
      title: document.title || 'Thurr Solutions | AI Lead Generation Systems',
      canonicalHref: canonicalLink?.getAttribute('href') || `${window.location.origin}/`,
      description: descriptionMeta?.getAttribute('content') || '',
      robots: robotsMeta?.getAttribute('content') || null,
      ogTitle: ogTitleMeta?.getAttribute('content') || '',
      ogDescription: ogDescriptionMeta?.getAttribute('content') || '',
      ogUrl: ogUrlMeta?.getAttribute('content') || `${window.location.origin}/`,
      twitterTitle: twitterTitleMeta?.getAttribute('content') || '',
      twitterDescription: twitterDescriptionMeta?.getAttribute('content') || '',
    };
  }, []);

  async function getOwnerSession() {
    if (!ownerSupabaseClient) {
      return null;
    }

    const { data } = await ownerSupabaseClient.auth.getSession();
    return data.session || null;
  }

  async function checkOwnerAccess({ nextPageOnDeny = 'owner-access' } = {}) {
    if (!isOperatorPreview) {
      setCanViewOperator(false);
      setOperatorAccess({ status: 'idle', message: '' });
      return { allowed: false };
    }

    setOperatorAccess({ status: 'checking', message: '' });

    try {
      const session = await getOwnerSession();
      const headers = {};

      if (session?.access_token) {
        headers.Authorization = `Bearer ${session.access_token}`;
      }

      const response = await fetch('/api/owner-access', {
        method: 'GET',
        headers,
      });
      const data = await response.json().catch(() => ({}));

      if (response.ok && data.allowed) {
        setCanViewOperator(true);
        setOperatorAccess({ status: 'allowed', message: '' });
        return { allowed: true, mode: data.mode || 'supabase' };
      }

      const message = data.error || 'Owner sign-in is required to access operator screens.';
      setCanViewOperator(false);
      setOperatorAccess({ status: 'denied', message });
      setPage(nextPageOnDeny);
      return { allowed: false };
    } catch (error) {
      setCanViewOperator(false);
      setOperatorAccess({
        status: 'denied',
        message: error?.message || 'Owner access check failed.',
      });
      setPage(nextPageOnDeny);
      return { allowed: false };
    }
  }

  useEffect(() => {
    if (window.location.pathname === '/owner/callback') {
      window.history.replaceState({}, '', '/?operator=1');
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const legacySlug = normalizeDiagnosticSlug(params.get('diagnostic'));
    const pathname = window.location.pathname;
    const normalizedPathname = pathname.replace(/\/+$/, '') || '/';

    if (normalizedPathname === pageRoutes['audit-thanks']) {
      setPage('audit-thanks');
      if (pathname !== normalizedPathname) {
        replaceLocationPathname(normalizedPathname);
      }
      return;
    }

    if (normalizedPathname === pageRoutes.audit) {
      setPage('audit');
      if (pathname !== normalizedPathname) {
        replaceLocationPathname(normalizedPathname);
      }
      return;
    }

    if (normalizedPathname === pageRoutes.compliance) {
      setPage('compliance');
      if (pathname !== normalizedPathname) {
        replaceLocationPathname(normalizedPathname);
      }
      return;
    }

    if (normalizedPathname === pageRoutes.privacy) {
      setPage('privacy');
      if (pathname !== normalizedPathname) {
        replaceLocationPathname(normalizedPathname);
      }
      return;
    }

    if (normalizedPathname === pageRoutes['work-restore']) {
      setPage('work-restore');
      if (pathname !== normalizedPathname) {
        replaceLocationPathname(normalizedPathname);
      }
      return;
    }

    if (normalizedPathname === pageRoutes['work-heartpathbloom']) {
      setPage('work-heartpathbloom');
      if (pathname !== normalizedPathname) {
        replaceLocationPathname(normalizedPathname);
      }
      return;
    }

    if (normalizedPathname === pageRoutes['work-insurance']) {
      setPage('work-insurance');
      if (pathname !== normalizedPathname) {
        replaceLocationPathname(normalizedPathname);
      }
      return;
    }

    if (normalizedPathname === pageRoutes.work) {
      setPage('work');
      if (pathname !== normalizedPathname) {
        replaceLocationPathname(normalizedPathname);
      }
      return;
    }

    if (normalizedPathname === useCaseRoutes['usecase-website-landlord']) {
      setPage('usecase-website-landlord');
      if (pathname !== normalizedPathname) {
        replaceLocationPathname(normalizedPathname);
      }
      return;
    }

    if (normalizedPathname === useCaseRoutes['usecase-ai-lead-followup']) {
      setPage('usecase-ai-lead-followup');
      if (pathname !== normalizedPathname) {
        replaceLocationPathname(normalizedPathname);
      }
      return;
    }

    if (normalizedPathname === useCaseRoutes['usecase-missed-call-textback']) {
      setPage('usecase-missed-call-textback');
      if (pathname !== normalizedPathname) {
        replaceLocationPathname(normalizedPathname);
      }
      return;
    }

    if (normalizedPathname === useCaseRoutes['usecase-review-booster']) {
      setPage('usecase-review-booster');
      if (pathname !== normalizedPathname) {
        replaceLocationPathname(normalizedPathname);
      }
      return;
    }

    if (normalizedPathname === useCaseRoutes['usecase-no-show-saver']) {
      setPage('usecase-no-show-saver');
      if (pathname !== normalizedPathname) {
        replaceLocationPathname(normalizedPathname);
      }
      return;
    }

    if (normalizedPathname === useCaseRoutes['usecase-estimate-follow-up']) {
      setPage('usecase-estimate-follow-up');
      if (pathname !== normalizedPathname) {
        replaceLocationPathname(normalizedPathname);
      }
      return;
    }

    if (normalizedPathname === useCaseRoutes['usecase-seasonal-reactivation']) {
      setPage('usecase-seasonal-reactivation');
      if (pathname !== normalizedPathname) {
        replaceLocationPathname(normalizedPathname);
      }
      return;
    }

    if (normalizedPathname === useCaseRoutes['usecase-quote-qualifier']) {
      setPage('usecase-quote-qualifier');
      if (pathname !== normalizedPathname) {
        replaceLocationPathname(normalizedPathname);
      }
      return;
    }

    if (normalizedPathname === useCaseRoutes['usecase-service-reminder']) {
      setPage('usecase-service-reminder');
      if (pathname !== normalizedPathname) {
        replaceLocationPathname(normalizedPathname);
      }
      return;
    }

    if (normalizedPathname === useCaseRoutes['usecase-maintenance-plan-upsell']) {
      setPage('usecase-maintenance-plan-upsell');
      if (pathname !== normalizedPathname) {
        replaceLocationPathname(normalizedPathname);
      }
      return;
    }

    if (normalizedPathname === useCaseRoutes['usecase-deposit-request']) {
      setPage('usecase-deposit-request');
      if (pathname !== normalizedPathname) {
        replaceLocationPathname(normalizedPathname);
      }
      return;
    }

    if (normalizedPathname === useCaseRoutes['usecase-financing-assist']) {
      setPage('usecase-financing-assist');
      if (pathname !== normalizedPathname) {
        replaceLocationPathname(normalizedPathname);
      }
      return;
    }

    if (normalizedPathname === useCaseRoutes['usecase-project-photo-proof']) {
      setPage('usecase-project-photo-proof');
      if (pathname !== normalizedPathname) {
        replaceLocationPathname(normalizedPathname);
      }
      return;
    }

    if (normalizedPathname === useCaseRoutes['usecase-parts-arrival-ping']) {
      setPage('usecase-parts-arrival-ping');
      if (pathname !== normalizedPathname) {
        replaceLocationPathname(normalizedPathname);
      }
      return;
    }

    if (normalizedPathname === useCaseRoutes['usecase-eta-update']) {
      setPage('usecase-eta-update');
      if (pathname !== normalizedPathname) {
        replaceLocationPathname(normalizedPathname);
      }
      return;
    }

    if (normalizedPathname === useCaseRoutes['usecase-cancellation-save']) {
      setPage('usecase-cancellation-save');
      if (pathname !== normalizedPathname) {
        replaceLocationPathname(normalizedPathname);
      }
      return;
    }

    if (normalizedPathname === useCaseRoutes['usecase-invoice-follow-up']) {
      setPage('usecase-invoice-follow-up');
      if (pathname !== normalizedPathname) {
        replaceLocationPathname(normalizedPathname);
      }
      return;
    }

    if (normalizedPathname === useCaseRoutes['usecase-appointment-prep']) {
      setPage('usecase-appointment-prep');
      if (pathname !== normalizedPathname) {
        replaceLocationPathname(normalizedPathname);
      }
      return;
    }

    if (normalizedPathname === useCaseRoutes['usecase-after-hours-triage']) {
      setPage('usecase-after-hours-triage');
      if (pathname !== normalizedPathname) {
        replaceLocationPathname(normalizedPathname);
      }
      return;
    }

    if (normalizedPathname === useCaseRoutes['usecase-service-recovery-save']) {
      setPage('usecase-service-recovery-save');
      if (pathname !== normalizedPathname) {
        replaceLocationPathname(normalizedPathname);
      }
      return;
    }

    if (normalizedPathname === useCaseRoutes['usecase-warranty-claim-intake']) {
      setPage('usecase-warranty-claim-intake');
      if (pathname !== normalizedPathname) {
        replaceLocationPathname(normalizedPathname);
      }
      return;
    }

    if (normalizedPathname === useCaseRoutes['usecase-change-order-approval']) {
      setPage('usecase-change-order-approval');
      if (pathname !== normalizedPathname) {
        replaceLocationPathname(normalizedPathname);
      }
      return;
    }

    if (normalizedPathname === useCaseRoutes['usecase-job-kickoff-packet']) {
      setPage('usecase-job-kickoff-packet');
      if (pathname !== normalizedPathname) {
        replaceLocationPathname(normalizedPathname);
      }
      return;
    }

    if (normalizedPathname === useCaseRoutes['usecase-weather-delay-update']) {
      setPage('usecase-weather-delay-update');
      if (pathname !== normalizedPathname) {
        replaceLocationPathname(normalizedPathname);
      }
      return;
    }

    if (normalizedPathname === useCaseRoutes['usecases-index']) {
      setPage('usecases-index');
      if (pathname !== normalizedPathname) {
        replaceLocationPathname(normalizedPathname);
      }
      return;
    }

    const remainder = pathname.replace(/^\/diagnostic\/?/, '');
    const rawSlug = remainder.split('/')[0] || '';
    const pathSlug = rawSlug ? normalizeDiagnosticSlug(rawSlug) : null;

    if (legacySlug) {
      setDiagnosticSlug(legacySlug);
      setPage('client-diagnostic');
      replaceLocationPathname(`/diagnostic/${legacySlug}`);
      return;
    }

    if (pathname.startsWith('/diagnostic') && !rawSlug) {
      if (pathname !== '/diagnostic') {
        replaceLocationPathname('/diagnostic');
      }
      setPage('diagnostic-index');
      return;
    }

    if (pathname.startsWith('/diagnostic') && rawSlug && !pathSlug) {
      replaceLocationPathname('/diagnostic');
      setPage('diagnostic-index');
      return;
    }

    if (pathname.startsWith('/diagnostic') && pathSlug) {
      const canonicalPathname = `/diagnostic/${pathSlug}`;

      setDiagnosticSlug(pathSlug);
      setPage('client-diagnostic');

      if (pathname !== canonicalPathname) {
        replaceLocationPathname(canonicalPathname);
        return;
      }
    }

    if (
      (pathname === '/diagnostic' || pathname === '/diagnostic/') &&
      pathSlug
    ) {
      replaceLocationPathname(`/diagnostic/${pathSlug}`);
    }
  }, []);

  useEffect(() => {
    function upsertCanonicalLink(href) {
      let canonicalLink = document.querySelector('link[rel="canonical"]');

      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }

      canonicalLink.setAttribute('href', href);
      return canonicalLink;
    }

    function upsertMetaByName(name, content) {
      let meta = document.querySelector(`meta[name="${name}"]`);

      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }

      meta.setAttribute('content', content);
      return meta;
    }

    function upsertMetaByProperty(property, content) {
      let meta = document.querySelector(`meta[property="${property}"]`);

      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }

      meta.setAttribute('content', content);
      return meta;
    }

    const canonicalHref = headDefaults?.canonicalHref || `${window.location.origin}/`;
    const defaultTitle = headDefaults?.title || 'Thurr Solutions | AI Lead Generation Systems';

    function upsertRobotsMeta(content) {
      let robotsMeta = document.querySelector('meta[name="robots"]');

      if (!robotsMeta) {
        robotsMeta = document.createElement('meta');
        robotsMeta.setAttribute('name', 'robots');
        document.head.appendChild(robotsMeta);
      }

      robotsMeta.setAttribute('content', content);
    }

    function removeRobotsMeta() {
      const robotsMeta = document.querySelector('meta[name="robots"]');
      robotsMeta?.remove();
    }

    if (page === 'client-diagnostic') {
      const slug = diagnosticSlug || defaultDiagnosticSlug;
      const diagnosticKey = diagnosticSlugToTemplateKey[slug] || defaultDiagnosticKey;
      const diagnostic = clientDiagnosticTemplates[diagnosticKey] || clientDiagnosticTemplates[defaultDiagnosticKey];
      const shareTitle = `${diagnostic.eyebrow} | Thurr Solutions`;
      const shareDescription =
        diagnostic.intro ||
        'Run a fast diagnostic and map the simplest workflow that turns more interest into booked jobs.';
      const shareUrl = `${window.location.origin}/diagnostic/${slug}`;

      document.title = shareTitle;
      upsertCanonicalLink(shareUrl);
      upsertMetaByName('description', shareDescription);
      upsertMetaByProperty('og:title', shareTitle);
      upsertMetaByProperty('og:description', shareDescription);
      upsertMetaByProperty('og:url', shareUrl);
      upsertMetaByName('twitter:title', shareTitle);
      upsertMetaByName('twitter:description', shareDescription);
      upsertRobotsMeta('noindex, nofollow');
      return;
    }

    if (page === 'diagnostic-index') {
      const shareTitle = 'Diagnostic Lanes | Thurr Solutions';
      const shareDescription =
        'Pick a lane to run a fast diagnostic and map the simplest workflow that turns more interest into booked jobs.';
      const shareUrl = `${window.location.origin}/diagnostic`;

      document.title = shareTitle;
      upsertCanonicalLink(shareUrl);
      upsertMetaByName('description', shareDescription);
      upsertMetaByProperty('og:title', shareTitle);
      upsertMetaByProperty('og:description', shareDescription);
      upsertMetaByProperty('og:url', shareUrl);
      upsertMetaByName('twitter:title', shareTitle);
      upsertMetaByName('twitter:description', shareDescription);
      upsertRobotsMeta('noindex, nofollow');
      return;
    }

    const titlesByPage = {
      home: defaultTitle,
      audit: 'Lead Flow Audit | Thurr Solutions',
      'audit-thanks': 'Audit Request Received | Thurr Solutions',
      compliance: 'Compliance | Thurr Solutions',
      privacy: 'Privacy | Thurr Solutions',
      work: 'Selected Work | Thurr Solutions',
      'work-restore': 'Restore-C | Thurr Solutions',
      'work-heartpathbloom': 'HeartPathBloom | Thurr Solutions',
      'work-insurance': 'Insurance Pipeline Concept | Thurr Solutions',
      buildout: 'Lead System Audit | Thurr Solutions',
      solutions: 'Thurr Solutions | Services',
      'usecase-website-landlord': 'Website Landlord (Template) | Thurr Solutions',
      'usecase-ai-lead-followup': 'AI Lead Follow-Up (Template) | Thurr Solutions',
      'usecase-missed-call-textback': 'Missed Call Textback (Template) | Thurr Solutions',
      'usecase-review-booster': 'Review Booster (Template) | Thurr Solutions',
      'usecase-no-show-saver': 'No-Show Saver (Template) | Thurr Solutions',
      'usecase-estimate-follow-up': 'Estimate Follow-Up (Template) | Thurr Solutions',
      'usecase-seasonal-reactivation': 'Seasonal Reactivation (Template) | Thurr Solutions',
      'usecase-quote-qualifier': 'Quote Qualifier (Template) | Thurr Solutions',
      'usecase-service-reminder': 'Service Reminder (Template) | Thurr Solutions',
      'usecase-maintenance-plan-upsell': 'Maintenance Plan Upsell (Template) | Thurr Solutions',
      'usecase-deposit-request': 'Deposit Request (Template) | Thurr Solutions',
      'usecase-financing-assist': 'Financing Assist (Template) | Thurr Solutions',
      'usecase-project-photo-proof': 'Project Photo Proof (Template) | Thurr Solutions',
      'usecase-parts-arrival-ping': 'Parts Arrival Ping (Template) | Thurr Solutions',
      'usecase-eta-update': 'On-the-Way ETA Update (Template) | Thurr Solutions',
      'usecase-cancellation-save': 'Cancellation Save (Template) | Thurr Solutions',
      'usecase-invoice-follow-up': 'Invoice Follow-Up (Template) | Thurr Solutions',
      'usecase-appointment-prep': 'Appointment Prep Checklist (Template) | Thurr Solutions',
      'usecase-after-hours-triage': 'After-Hours Emergency Triage (Template) | Thurr Solutions',
      'usecase-service-recovery-save': 'Service Recovery Save (Template) | Thurr Solutions',
      'usecase-warranty-claim-intake': 'Warranty Claim Intake (Template) | Thurr Solutions',
      'usecase-change-order-approval': 'Change Order Approval (Template) | Thurr Solutions',
      'usecase-job-kickoff-packet': 'Job Kickoff Packet (Template) | Thurr Solutions',
      'usecase-weather-delay-update': 'Weather Delay Update (Template) | Thurr Solutions',
      report: 'Blueprint Report | Thurr Solutions',
      export: 'Export Report | Thurr Solutions',
      'owner-access': 'Owner Access | Thurr Solutions',
      command: 'Command Center | Thurr Solutions',
      systems: 'Systems | Thurr Solutions',
    };

    if (page === 'usecase-website-landlord') {
      const shareTitle = 'Website Landlord (Template) — Own the Lead Path | Thurr Solutions';
      const shareDescription =
        'Educational example: a copyable local lead-flow template (build → track → route → report). No guarantees.';
      const shareUrl = `${window.location.origin}${useCaseRoutes['usecase-website-landlord']}`;

      document.title = shareTitle;
      upsertCanonicalLink(shareUrl);
      upsertMetaByName('description', shareDescription);
      upsertMetaByProperty('og:title', shareTitle);
      upsertMetaByProperty('og:description', shareDescription);
      upsertMetaByProperty('og:url', shareUrl);
      upsertMetaByName('twitter:title', shareTitle);
      upsertMetaByName('twitter:description', shareDescription);
      upsertRobotsMeta('noindex, nofollow');
      return;
    }

    if (page === 'usecase-ai-lead-followup') {
      const shareTitle = 'AI Lead Follow-Up (Template) — Reply Fast, Book More | Thurr Solutions';
      const shareDescription =
        'Educational example: operator-controlled follow-up scripts, escalation rules, and booked handoff. No guarantees.';
      const shareUrl = `${window.location.origin}${useCaseRoutes['usecase-ai-lead-followup']}`;

      document.title = shareTitle;
      upsertCanonicalLink(shareUrl);
      upsertMetaByName('description', shareDescription);
      upsertMetaByProperty('og:title', shareTitle);
      upsertMetaByProperty('og:description', shareDescription);
      upsertMetaByProperty('og:url', shareUrl);
      upsertMetaByName('twitter:title', shareTitle);
      upsertMetaByName('twitter:description', shareDescription);
      upsertRobotsMeta('noindex, nofollow');
      return;
    }

    if (page === 'usecase-missed-call-textback') {
      const shareTitle = 'Missed Call Textback (Template) — Recover Missed Calls | Thurr Solutions';
      const shareDescription =
        'Educational example: inbound-only missed call recovery via operator-approved scripts, quiet hours, and human takeover. No guarantees.';
      const shareUrl = `${window.location.origin}${useCaseRoutes['usecase-missed-call-textback']}`;

      document.title = shareTitle;
      upsertCanonicalLink(shareUrl);
      upsertMetaByName('description', shareDescription);
      upsertMetaByProperty('og:title', shareTitle);
      upsertMetaByProperty('og:description', shareDescription);
      upsertMetaByProperty('og:url', shareUrl);
      upsertMetaByName('twitter:title', shareTitle);
      upsertMetaByName('twitter:description', shareDescription);
      upsertRobotsMeta('noindex, nofollow');
      return;
    }

    if (page === 'usecase-review-booster') {
      const shareTitle = 'Review Booster (Template) — Reviews That Don’t Feel Spammy | Thurr Solutions';
      const shareDescription =
        'Educational example: job-complete trigger, one review ask, issue routing, and referral follow-up (operator-controlled). No guarantees.';
      const shareUrl = `${window.location.origin}${useCaseRoutes['usecase-review-booster']}`;

      document.title = shareTitle;
      upsertCanonicalLink(shareUrl);
      upsertMetaByName('description', shareDescription);
      upsertMetaByProperty('og:title', shareTitle);
      upsertMetaByProperty('og:description', shareDescription);
      upsertMetaByProperty('og:url', shareUrl);
      upsertMetaByName('twitter:title', shareTitle);
      upsertMetaByName('twitter:description', shareDescription);
      upsertRobotsMeta('noindex, nofollow');
      return;
    }

    if (page === 'usecase-no-show-saver') {
      const shareTitle = 'No-Show Saver (Template) — Confirm, Remind, Reschedule | Thurr Solutions';
      const shareDescription =
        'Educational example: appointment confirmation scripts, safe reminders, and a reschedule/save path (operator-controlled). No guarantees.';
      const shareUrl = `${window.location.origin}${useCaseRoutes['usecase-no-show-saver']}`;

      document.title = shareTitle;
      upsertCanonicalLink(shareUrl);
      upsertMetaByName('description', shareDescription);
      upsertMetaByProperty('og:title', shareTitle);
      upsertMetaByProperty('og:description', shareDescription);
      upsertMetaByProperty('og:url', shareUrl);
      upsertMetaByName('twitter:title', shareTitle);
      upsertMetaByName('twitter:description', shareDescription);
      upsertRobotsMeta('noindex, nofollow');
      return;
    }

    if (page === 'usecase-estimate-follow-up') {
      const shareTitle = 'Estimate Follow-Up (Template) — Close More Without Spamming | Thurr Solutions';
      const shareDescription =
        'Educational example: operator-controlled estimate follow-up cadence with guardrails and a close outcome. No guarantees.';
      const shareUrl = `${window.location.origin}${useCaseRoutes['usecase-estimate-follow-up']}`;

      document.title = shareTitle;
      upsertCanonicalLink(shareUrl);
      upsertMetaByName('description', shareDescription);
      upsertMetaByProperty('og:title', shareTitle);
      upsertMetaByProperty('og:description', shareDescription);
      upsertMetaByProperty('og:url', shareUrl);
      upsertMetaByName('twitter:title', shareTitle);
      upsertMetaByName('twitter:description', shareDescription);
      upsertRobotsMeta('noindex, nofollow');
      return;
    }

    if (page === 'usecase-seasonal-reactivation') {
      const shareTitle = 'Seasonal Reactivation (Template) — Winbacks Without Spamming | Thurr Solutions';
      const shareDescription =
        'Educational example: segment past customers, send value-first check-ins, cap follow-ups, and track outcomes (operator-controlled). No guarantees.';
      const shareUrl = `${window.location.origin}${useCaseRoutes['usecase-seasonal-reactivation']}`;

      document.title = shareTitle;
      upsertCanonicalLink(shareUrl);
      upsertMetaByName('description', shareDescription);
      upsertMetaByProperty('og:title', shareTitle);
      upsertMetaByProperty('og:description', shareDescription);
      upsertMetaByProperty('og:url', shareUrl);
      upsertMetaByName('twitter:title', shareTitle);
      upsertMetaByName('twitter:description', shareDescription);
      upsertRobotsMeta('noindex, nofollow');
      return;
    }

    if (page === 'usecase-quote-qualifier') {
      const shareTitle = 'Quote Qualifier (Template) — Turn “How Much?” Into Booked Slots | Thurr Solutions';
      const shareDescription =
        'Educational example: a short qualifier form, routing rules, and a fast next step (operator-controlled). No guarantees.';
      const shareUrl = `${window.location.origin}${useCaseRoutes['usecase-quote-qualifier']}`;

      document.title = shareTitle;
      upsertCanonicalLink(shareUrl);
      upsertMetaByName('description', shareDescription);
      upsertMetaByProperty('og:title', shareTitle);
      upsertMetaByProperty('og:description', shareDescription);
      upsertMetaByProperty('og:url', shareUrl);
      upsertMetaByName('twitter:title', shareTitle);
      upsertMetaByName('twitter:description', shareDescription);
      upsertRobotsMeta('noindex, nofollow');
      return;
    }

    if (page === 'usecase-service-reminder') {
      const shareTitle = 'Service Reminder (Template) — Repeat Appointments Without Spamming | Thurr Solutions';
      const shareDescription =
        'Educational example: time-based service reminders with consent, caps, stop-on-reply, and human routing (operator-controlled). No guarantees.';
      const shareUrl = `${window.location.origin}${useCaseRoutes['usecase-service-reminder']}`;

      document.title = shareTitle;
      upsertCanonicalLink(shareUrl);
      upsertMetaByName('description', shareDescription);
      upsertMetaByProperty('og:title', shareTitle);
      upsertMetaByProperty('og:description', shareDescription);
      upsertMetaByProperty('og:url', shareUrl);
      upsertMetaByName('twitter:title', shareTitle);
      upsertMetaByName('twitter:description', shareDescription);
      upsertRobotsMeta('noindex, nofollow');
      return;
    }

    if (page === 'usecase-maintenance-plan-upsell') {
      const shareTitle = 'Maintenance Plan Upsell (Template) — Turn Wins Into Predictable Work | Thurr Solutions';
      const shareDescription =
        'Educational example: job-complete invite, simple enrollment, consent + caps, stop-on-reply, and human routing (operator-controlled). No guarantees.';
      const shareUrl = `${window.location.origin}${useCaseRoutes['usecase-maintenance-plan-upsell']}`;

      document.title = shareTitle;
      upsertCanonicalLink(shareUrl);
      upsertMetaByName('description', shareDescription);
      upsertMetaByProperty('og:title', shareTitle);
      upsertMetaByProperty('og:description', shareDescription);
      upsertMetaByProperty('og:url', shareUrl);
      upsertMetaByName('twitter:title', shareTitle);
      upsertMetaByName('twitter:description', shareDescription);
      upsertRobotsMeta('noindex, nofollow');
      return;
    }

    if (page === 'usecase-deposit-request') {
      const shareTitle = 'Deposit Request (Template) — Paid Next Step Without Chasing | Thurr Solutions';
      const shareDescription =
        'Educational example: acceptance gating, one secure link, receipt + confirmation, and stop rules (operator-controlled). No guarantees.';
      const shareUrl = `${window.location.origin}${useCaseRoutes['usecase-deposit-request']}`;

      document.title = shareTitle;
      upsertCanonicalLink(shareUrl);
      upsertMetaByName('description', shareDescription);
      upsertMetaByProperty('og:title', shareTitle);
      upsertMetaByProperty('og:description', shareDescription);
      upsertMetaByProperty('og:url', shareUrl);
      upsertMetaByName('twitter:title', shareTitle);
      upsertMetaByName('twitter:description', shareDescription);
      upsertRobotsMeta('noindex, nofollow');
      return;
    }

    if (page === 'usecase-financing-assist') {
      const shareTitle = 'Financing Assist (Template) — Help Customers Say “Yes” | Thurr Solutions';
      const shareDescription =
        'Educational example: quote-ready trigger, one provider link + disclosure, booking handoff, and stop rules (operator-controlled). No guarantees.';
      const shareUrl = `${window.location.origin}${useCaseRoutes['usecase-financing-assist']}`;

      document.title = shareTitle;
      upsertCanonicalLink(shareUrl);
      upsertMetaByName('description', shareDescription);
      upsertMetaByProperty('og:title', shareTitle);
      upsertMetaByProperty('og:description', shareDescription);
      upsertMetaByProperty('og:url', shareUrl);
      upsertMetaByName('twitter:title', shareTitle);
      upsertMetaByName('twitter:description', shareDescription);
      upsertRobotsMeta('noindex, nofollow');
      return;
    }

    if (page === 'usecase-project-photo-proof') {
      const shareTitle = 'Project Photo Proof (Template) — Collect Proof + Permission | Thurr Solutions';
      const shareDescription =
        'Educational example: job-complete trigger, request 3 photos, permission reply, and stop rules (operator-controlled). No guarantees.';
      const shareUrl = `${window.location.origin}${useCaseRoutes['usecase-project-photo-proof']}`;

      document.title = shareTitle;
      upsertCanonicalLink(shareUrl);
      upsertMetaByName('description', shareDescription);
      upsertMetaByProperty('og:title', shareTitle);
      upsertMetaByProperty('og:description', shareDescription);
      upsertMetaByProperty('og:url', shareUrl);
      upsertMetaByName('twitter:title', shareTitle);
      upsertMetaByName('twitter:description', shareDescription);
      upsertRobotsMeta('noindex, nofollow');
      return;
    }

    if (page === 'usecase-parts-arrival-ping') {
      const shareTitle = 'Parts Arrival Ping (Template) — Reduce “Is It In Yet?” Calls | Thurr Solutions';
      const shareDescription =
        'Educational example: part-ordered consent, arrival update, schedule/confirm next step, and stop rules (operator-controlled). No guarantees.';
      const shareUrl = `${window.location.origin}${useCaseRoutes['usecase-parts-arrival-ping']}`;

      document.title = shareTitle;
      upsertCanonicalLink(shareUrl);
      upsertMetaByName('description', shareDescription);
      upsertMetaByProperty('og:title', shareTitle);
      upsertMetaByProperty('og:description', shareDescription);
      upsertMetaByProperty('og:url', shareUrl);
      upsertMetaByName('twitter:title', shareTitle);
      upsertMetaByName('twitter:description', shareDescription);
      upsertRobotsMeta('noindex, nofollow');
      return;
    }

    if (page === 'usecase-eta-update') {
      const shareTitle = 'On-the-Way ETA Update (Template) — Reduce No-Shows | Thurr Solutions';
      const shareDescription =
        'Educational example: en route trigger, one ETA update message, confirm/reschedule outcomes, and stop rules (operator-controlled). No guarantees.';
      const shareUrl = `${window.location.origin}${useCaseRoutes['usecase-eta-update']}`;

      document.title = shareTitle;
      upsertCanonicalLink(shareUrl);
      upsertMetaByName('description', shareDescription);
      upsertMetaByProperty('og:title', shareTitle);
      upsertMetaByProperty('og:description', shareDescription);
      upsertMetaByProperty('og:url', shareUrl);
      upsertMetaByName('twitter:title', shareTitle);
      upsertMetaByName('twitter:description', shareDescription);
      upsertRobotsMeta('noindex, nofollow');
      return;
    }

    if (page === 'usecase-cancellation-save') {
      const shareTitle = 'Cancellation Save (Template) — Recover Cancellations Calmly | Thurr Solutions';
      const shareDescription =
        'Educational example: cancellation signal, one optional save offer, rebook/close outcomes, and stop rules (operator-controlled). No guarantees.';
      const shareUrl = `${window.location.origin}${useCaseRoutes['usecase-cancellation-save']}`;

      document.title = shareTitle;
      upsertCanonicalLink(shareUrl);
      upsertMetaByName('description', shareDescription);
      upsertMetaByProperty('og:title', shareTitle);
      upsertMetaByProperty('og:description', shareDescription);
      upsertMetaByProperty('og:url', shareUrl);
      upsertMetaByName('twitter:title', shareTitle);
      upsertMetaByName('twitter:description', shareDescription);
      upsertRobotsMeta('noindex, nofollow');
      return;
    }

    if (page === 'usecase-invoice-follow-up') {
      const shareTitle = 'Invoice Follow-Up (Template) — Get Paid Without Being Weird | Thurr Solutions';
      const shareDescription =
        'Educational example: unpaid trigger, one calm reminder with secure pay link, stop rules, and human escalation (operator-controlled). No guarantees.';
      const shareUrl = `${window.location.origin}${useCaseRoutes['usecase-invoice-follow-up']}`;

      document.title = shareTitle;
      upsertCanonicalLink(shareUrl);
      upsertMetaByName('description', shareDescription);
      upsertMetaByProperty('og:title', shareTitle);
      upsertMetaByProperty('og:description', shareDescription);
      upsertMetaByProperty('og:url', shareUrl);
      upsertMetaByName('twitter:title', shareTitle);
      upsertMetaByName('twitter:description', shareDescription);
      upsertRobotsMeta('noindex, nofollow');
      return;
    }

    if (page === 'usecase-appointment-prep') {
      const shareTitle = 'Appointment Prep Checklist (Template) — Reduce No-Shows | Thurr Solutions';
      const shareDescription =
        'Educational example: day-before trigger, one prep confirmation message, stop rules, and human routing (operator-controlled). No guarantees.';
      const shareUrl = `${window.location.origin}${useCaseRoutes['usecase-appointment-prep']}`;

      document.title = shareTitle;
      upsertCanonicalLink(shareUrl);
      upsertMetaByName('description', shareDescription);
      upsertMetaByProperty('og:title', shareTitle);
      upsertMetaByProperty('og:description', shareDescription);
      upsertMetaByProperty('og:url', shareUrl);
      upsertMetaByName('twitter:title', shareTitle);
      upsertMetaByName('twitter:description', shareDescription);
      upsertRobotsMeta('noindex, nofollow');
      return;
    }

    if (page === 'usecase-after-hours-triage') {
      const shareTitle = 'After-Hours Emergency Triage (Template) — Route Safely | Thurr Solutions';
      const shareDescription =
        'Educational example: after-hours inbound, one calm triage message with safety boundaries, stop rules, and schedule/human routing (operator-controlled). No guarantees.';
      const shareUrl = `${window.location.origin}${useCaseRoutes['usecase-after-hours-triage']}`;

      document.title = shareTitle;
      upsertCanonicalLink(shareUrl);
      upsertMetaByName('description', shareDescription);
      upsertMetaByProperty('og:title', shareTitle);
      upsertMetaByProperty('og:description', shareDescription);
      upsertMetaByProperty('og:url', shareUrl);
      upsertMetaByName('twitter:title', shareTitle);
      upsertMetaByName('twitter:description', shareDescription);
      upsertRobotsMeta('noindex, nofollow');
      return;
    }

    if (page === 'usecase-service-recovery-save') {
      const shareTitle = 'Service Recovery Save (Template) — Calm Next Steps | Thurr Solutions';
      const shareDescription =
        'Educational example: complaint/low-score signal, one apology + next step, and fix lane/manager routing (operator-controlled). No guarantees.';
      const shareUrl = `${window.location.origin}${useCaseRoutes['usecase-service-recovery-save']}`;

      document.title = shareTitle;
      upsertCanonicalLink(shareUrl);
      upsertMetaByName('description', shareDescription);
      upsertMetaByProperty('og:title', shareTitle);
      upsertMetaByProperty('og:description', shareDescription);
      upsertMetaByProperty('og:url', shareUrl);
      upsertMetaByName('twitter:title', shareTitle);
      upsertMetaByName('twitter:description', shareDescription);
      upsertRobotsMeta('noindex, nofollow');
      return;
    }

    if (page === 'usecase-warranty-claim-intake') {
      const shareTitle = 'Warranty Claim Intake (Template) — Evidence + Review | Thurr Solutions';
      const shareDescription =
        'Educational example: warranty claim intake with minimum evidence collection, human review routing, and operator-safe stop rules. No guarantees.';
      const shareUrl = `${window.location.origin}${useCaseRoutes['usecase-warranty-claim-intake']}`;

      document.title = shareTitle;
      upsertCanonicalLink(shareUrl);
      upsertMetaByName('description', shareDescription);
      upsertMetaByProperty('og:title', shareTitle);
      upsertMetaByProperty('og:description', shareDescription);
      upsertMetaByProperty('og:url', shareUrl);
      upsertMetaByName('twitter:title', shareTitle);
      upsertMetaByName('twitter:description', shareDescription);
      upsertRobotsMeta('noindex, nofollow');
      return;
    }

    if (page === 'usecase-change-order-approval') {
      const shareTitle = 'Change Order Approval (Template) — Stop Scope Creep | Thurr Solutions';
      const shareDescription =
        'Educational example: scope change → summary → explicit approval → invoice update, with operator-safe stop rules and human-controlled guardrails. No guarantees.';
      const shareUrl = `${window.location.origin}${useCaseRoutes['usecase-change-order-approval']}`;

      document.title = shareTitle;
      upsertCanonicalLink(shareUrl);
      upsertMetaByName('description', shareDescription);
      upsertMetaByProperty('og:title', shareTitle);
      upsertMetaByProperty('og:description', shareDescription);
      upsertMetaByProperty('og:url', shareUrl);
      upsertMetaByName('twitter:title', shareTitle);
      upsertMetaByName('twitter:description', shareDescription);
      upsertRobotsMeta('noindex, nofollow');
      return;
    }

    if (page === 'usecase-job-kickoff-packet') {
      const shareTitle = 'Job Kickoff Packet (Template) — Clean Handoff After The Yes | Thurr Solutions';
      const shareDescription =
        'Educational example: deposit/yes → kickoff packet → confirm access + prep → proceed, with operator-safe stop rules and human-controlled guardrails. No guarantees.';
      const shareUrl = `${window.location.origin}${useCaseRoutes['usecase-job-kickoff-packet']}`;

      document.title = shareTitle;
      upsertCanonicalLink(shareUrl);
      upsertMetaByName('description', shareDescription);
      upsertMetaByProperty('og:title', shareTitle);
      upsertMetaByProperty('og:description', shareDescription);
      upsertMetaByProperty('og:url', shareUrl);
      upsertMetaByName('twitter:title', shareTitle);
      upsertMetaByName('twitter:description', shareDescription);
      upsertRobotsMeta('noindex, nofollow');
      return;
    }

    if (page === 'usecase-weather-delay-update') {
      const shareTitle = 'Weather Delay Update (Template) — Keep The Job Calm | Thurr Solutions';
      const shareDescription =
        'Educational example: weather/crew delay → calm update message → confirm or reschedule, with operator-safe stop rules and human-controlled guardrails. No guarantees.';
      const shareUrl = `${window.location.origin}${useCaseRoutes['usecase-weather-delay-update']}`;

      document.title = shareTitle;
      upsertCanonicalLink(shareUrl);
      upsertMetaByName('description', shareDescription);
      upsertMetaByProperty('og:title', shareTitle);
      upsertMetaByProperty('og:description', shareDescription);
      upsertMetaByProperty('og:url', shareUrl);
      upsertMetaByName('twitter:title', shareTitle);
      upsertMetaByName('twitter:description', shareDescription);
      upsertRobotsMeta('noindex, nofollow');
      return;
    }

    document.title = titlesByPage[page] || defaultTitle;
    upsertCanonicalLink(canonicalHref);

    if (headDefaults?.description) {
      upsertMetaByName('description', headDefaults.description);
    }

    if (headDefaults) {
      if (headDefaults.ogTitle) {
        upsertMetaByProperty('og:title', headDefaults.ogTitle);
      }
      if (headDefaults.ogDescription) {
        upsertMetaByProperty('og:description', headDefaults.ogDescription);
      }
      if (headDefaults.ogUrl) {
        upsertMetaByProperty('og:url', headDefaults.ogUrl);
      }
      if (headDefaults.twitterTitle) {
        upsertMetaByName('twitter:title', headDefaults.twitterTitle);
      }
      if (headDefaults.twitterDescription) {
        upsertMetaByName('twitter:description', headDefaults.twitterDescription);
      }
    }

    if (headDefaults?.robots) {
      upsertRobotsMeta(headDefaults.robots);
    } else {
      removeRobotsMeta();
    }
  }, [diagnosticSlug, headDefaults, page]);

  useEffect(() => {
    if (!isOperatorPreview) {
      return;
    }

    checkOwnerAccess();
  }, []);

  useEffect(() => {
    if (isOperatorPreview && canViewOperator && page === 'home') {
      setPage('command');
    }
  }, [canViewOperator, page]);

  useEffect(() => {
    if (page !== 'home' || window.location.hash !== '#about-therrance') {
      return undefined;
    }

    const timeout = window.setTimeout(() => {
      const target = document.getElementById('about-therrance');
      const topbarHeight = document.querySelector('.topbar')?.getBoundingClientRect().height || 0;

      if (target) {
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - topbarHeight - 40,
          behavior: 'smooth',
        });
      }
    }, 80);

    return () => window.clearTimeout(timeout);
  }, [page]);

  function navigateToPage(target) {
    if (!canViewOperator && operatorPages.includes(target)) {
      setPage(isOperatorPreview ? 'owner-access' : 'home');
      setMenuOpen(false);
      return;
    }

    const routePath = useCaseRoutes[target] || pageRoutes[target];
    if (routePath) {
      replaceLocationPathname(routePath);
    } else if (window.location.pathname.startsWith('/use-cases') || window.location.pathname.startsWith('/audit')) {
      replaceLocationPathname('/');
    }

    if (target === 'client-diagnostic') {
      const nextSlug = diagnosticSlug || defaultDiagnosticSlug;
      replaceLocationPathname(`/diagnostic/${nextSlug}`);
      setDiagnosticSlug(nextSlug);
    } else if (target === 'diagnostic-index') {
      replaceLocationPathname('/diagnostic');
    } else if (window.location.pathname.startsWith('/diagnostic')) {
      replaceLocationPathname('/');
    }

    setPage(target);
    setMenuOpen(false);
  }

  function navigateToAbout() {
    setPage('home');
    setMenuOpen(false);
    window.setTimeout(() => {
      const target = document.getElementById('about-therrance');
      const topbarHeight = document.querySelector('.topbar')?.getBoundingClientRect().height || 0;

      if (!target) {
        return;
      }

      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - topbarHeight - 40,
        behavior: 'smooth',
      });
    }, 0);
  }

  function setDiagnosticLaneSlug(nextSlug) {
    const normalized = normalizeDiagnosticSlug(nextSlug) || defaultDiagnosticSlug;
    setDiagnosticSlug(normalized);

    if (window.location.pathname.startsWith('/diagnostic')) {
      replaceLocationPathname(`/diagnostic/${normalized}`);
    }
  }

  function startDiagnosticLane(nextSlug) {
    setDiagnosticLaneSlug(nextSlug);
    setPage('client-diagnostic');
    setMenuOpen(false);
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
  const shouldShowFooter = !isOperatorPreview && page !== 'export';
  const brand =
    page === 'home' ||
    page === 'audit' ||
    page === 'audit-thanks' ||
    page === 'solutions' ||
    page === 'compliance' ||
    page === 'privacy' ||
    page === 'work' ||
    page === 'work-restore' ||
    page === 'work-heartpathbloom' ||
    page === 'work-insurance'
      ? 'thurr-solutions'
      : 'right-thurr';

  useEffect(() => {
    document.body.dataset.brand = brand;
  }, [brand]);

  return (
    <div className="app-shell" data-brand={brand}>
      {brand === 'thurr-solutions' ? (
        <>
          <div className="grid-bg" aria-hidden="true" />
          <div className="scanlines" aria-hidden="true" />
        </>
      ) : null}
      <SystemStatusBar />
      <SiteHeader
        canViewOperator={canViewOperator}
        menuOpen={menuOpen}
        navigateToAbout={navigateToAbout}
        navigateToPage={navigateToPage}
        operatorNavItems={operatorNavItems}
        page={page}
        publicNavItems={publicNavItems}
        setMenuOpen={setMenuOpen}
        socialLinks={socialLinks}
      />

      {page === 'home' && <HomePage {...sharedProps} />}
      {page === 'audit' && <AuditPage setPage={navigateToPage} />}
      {page === 'audit-thanks' && <AuditThanksPage setPage={navigateToPage} />}
      {page === 'compliance' && <CompliancePage setPage={navigateToPage} />}
      {page === 'privacy' && <PrivacyPage setPage={navigateToPage} />}
      {page === 'work' && <WorkPage setPage={navigateToPage} />}
      {page === 'work-restore' && <WorkDetailPage slug="restore-c" setPage={navigateToPage} />}
      {page === 'work-heartpathbloom' && <WorkDetailPage slug="heartpathbloom" setPage={navigateToPage} />}
      {page === 'work-insurance' && <WorkDetailPage slug="insurance-pipeline" setPage={navigateToPage} />}
      {page === 'buildout' && <BuildoutPlanPage {...sharedProps} />}
      {page === 'solutions' && <SolutionsPage setPage={navigateToPage} />}
      {page === 'usecases-index' && <UseCasesIndexPage setPage={navigateToPage} />}
      {page === 'usecase-website-landlord' && <WebsiteLandlordUseCasePage setPage={navigateToPage} />}
      {page === 'usecase-ai-lead-followup' && <AiLeadFollowupUseCasePage setPage={navigateToPage} />}
      {page === 'usecase-missed-call-textback' && <MissedCallTextbackUseCasePage setPage={navigateToPage} />}
      {page === 'usecase-review-booster' && <ReviewBoosterUseCasePage setPage={navigateToPage} />}
      {page === 'usecase-no-show-saver' && <NoShowSaverUseCasePage setPage={navigateToPage} />}
      {page === 'usecase-estimate-follow-up' && <EstimateFollowUpUseCasePage setPage={navigateToPage} />}
      {page === 'usecase-seasonal-reactivation' && <SeasonalReactivationUseCasePage setPage={navigateToPage} />}
      {page === 'usecase-quote-qualifier' && <QuoteQualifierUseCasePage setPage={navigateToPage} />}
      {page === 'usecase-service-reminder' && <ServiceReminderUseCasePage setPage={navigateToPage} />}
      {page === 'usecase-maintenance-plan-upsell' && <MaintenancePlanUpsellUseCasePage setPage={navigateToPage} />}
      {page === 'usecase-deposit-request' && <DepositRequestUseCasePage setPage={navigateToPage} />}
      {page === 'usecase-financing-assist' && <FinancingAssistUseCasePage setPage={navigateToPage} />}
      {page === 'usecase-project-photo-proof' && <ProjectPhotoProofUseCasePage setPage={navigateToPage} />}
      {page === 'usecase-parts-arrival-ping' && <PartsArrivalPingUseCasePage setPage={navigateToPage} />}
      {page === 'usecase-eta-update' && <EtaUpdateUseCasePage setPage={navigateToPage} />}
      {page === 'usecase-referral-loop' && <ReferralLoopUseCasePage setPage={navigateToPage} />}
      {page === 'usecase-cancellation-save' && <CancellationSaveUseCasePage setPage={navigateToPage} />}
      {page === 'usecase-invoice-follow-up' && <InvoiceFollowUpUseCasePage setPage={navigateToPage} />}
      {page === 'usecase-appointment-prep' && <AppointmentPrepUseCasePage setPage={navigateToPage} />}
      {page === 'usecase-after-hours-triage' && <AfterHoursTriageUseCasePage setPage={navigateToPage} />}
      {page === 'usecase-service-recovery-save' && <ServiceRecoverySaveUseCasePage setPage={navigateToPage} />}
      {page === 'usecase-warranty-claim-intake' && <WarrantyClaimIntakeUseCasePage setPage={navigateToPage} />}
      {page === 'usecase-change-order-approval' && <ChangeOrderApprovalUseCasePage setPage={navigateToPage} />}
      {page === 'usecase-job-kickoff-packet' && <JobKickoffPacketUseCasePage setPage={navigateToPage} />}
      {page === 'usecase-weather-delay-update' && <WeatherDelayUpdateUseCasePage setPage={navigateToPage} />}
      {page === 'diagnostic-index' && (
        <DiagnosticIndexPage navigateToPage={navigateToPage} onStartLane={startDiagnosticLane} />
      )}
      {page === 'client-diagnostic' && (
        <ClientDiagnosticPage
          diagnosticKey={
            diagnosticSlugToTemplateKey[diagnosticSlug || defaultDiagnosticSlug] || defaultDiagnosticKey
          }
          diagnosticSlug={diagnosticSlug || defaultDiagnosticSlug}
          onDiagnosticSlugChange={setDiagnosticLaneSlug}
          setPage={navigateToPage}
        />
      )}
      {page === 'report' && <BlueprintReportPage setPage={navigateToPage} />}
      {page === 'export' && <ExportReportPage setPage={navigateToPage} />}
      {isOperatorPreview && !canViewOperator && page === 'owner-access' && (
        <OwnerAccessPage
          operatorAccess={operatorAccess}
          onRetry={() => checkOwnerAccess({ nextPageOnDeny: 'owner-access' })}
        />
      )}
      {canViewOperator && page === 'command' && <CommandCenterPage setPage={navigateToPage} />}
      {canViewOperator && page === 'systems' && <SystemsPage setPage={navigateToPage} />}
      {shouldShowFooter && (
        <SiteFooter navigateToAbout={navigateToAbout} navigateToPage={navigateToPage} socialLinks={socialLinks} />
      )}
    </div>
  );
}

function titleCaseDiagnosticSlug(slug) {
  if (!slug) {
    return '';
  }

  return String(slug)
    .split('-')
    .filter(Boolean)
    .map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1))
    .join(' ');
}

function DiagnosticIndexPage({ navigateToPage, onStartLane }) {
  const lanes = useMemo(
    () =>
      (diagnosticLanesConfig?.lanes ?? [])
        .map((lane) => ({
          slug: String(lane?.slug ?? '').trim(),
          label: titleCaseDiagnosticSlug(lane?.slug),
          description: String(lane?.description ?? '').trim(),
        }))
        .filter((lane) => lane.slug),
    [],
  );

  return (
    <main className="diagnostic-index-page" id="top">
      <section className="diagnostic-index-shell" aria-labelledby="diagnostic-index-title">
        <aside className="diagnostic-index-sidebar">
          <div>
            <div className="eyebrow">Thurr Solutions</div>
            <h1 id="diagnostic-index-title">Pick your diagnostic lane.</h1>
            <p>
              Choose your niche, answer a handful of questions, and get a clean workflow map for turning more inquiries into
              booked jobs.
            </p>
          </div>
          <div className="diagnostic-index-sidebar-actions">
            <button className="btn btn-secondary" type="button" onClick={() => navigateToPage('home')}>
              Back to site
            </button>
          </div>
        </aside>

        <div className="diagnostic-index-content">
          <div className="diagnostic-index-grid" role="list">
            {lanes.map((lane) => (
              <article className="diagnostic-index-card" role="listitem" key={lane.slug}>
                <div>
                  <h2>{lane.label}</h2>
                  <p>{lane.description}</p>
                </div>
                <div className="diagnostic-index-card-actions">
                  <span className="diagnostic-index-pill">3–5 minutes</span>
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={() => onStartLane(lane.slug)}
                  >
                    Start lane
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function ClientDiagnosticPage({ setPage, diagnosticKey, diagnosticSlug, onDiagnosticSlugChange }) {
  const diagnostic = clientDiagnosticTemplates[diagnosticKey] || clientDiagnosticTemplates[defaultDiagnosticKey];
  const laneOptions = useMemo(
    () =>
      (diagnosticLanesConfig?.lanes ?? [])
        .map((lane) => ({
          slug: String(lane?.slug ?? '').trim(),
          label: titleCaseDiagnosticSlug(lane?.slug),
        }))
        .filter((lane) => lane.slug),
    [],
  );

  return (
    <main className="client-diagnostic-page" id="top">
      <section className="client-diagnostic-shell" aria-labelledby="client-diagnostic-title">
        <aside className="client-diagnostic-sidebar">
          <div>
            <div className="diagnostic-sidebar-nav">
              <a
                className="diagnostic-back-to-lanes"
                href="/diagnostic"
                onClick={(event) => {
                  event.preventDefault();
                  setPage('diagnostic-index');
                }}
              >
                <ArrowLeft size={18} strokeWidth={3} />
                Back to lanes
              </a>
              <a
                className="diagnostic-back-to-site"
                href="/"
                onClick={(event) => {
                  event.preventDefault();
                  setPage('home');
                }}
              >
                Back to site
              </a>
            </div>
            <div className="diagnostic-lane-selector">
              <label className="eyebrow" htmlFor="diagnostic-lane-select">
                Diagnostic lane
              </label>
              <select
                id="diagnostic-lane-select"
                value={diagnosticSlug}
                onChange={(event) => onDiagnosticSlugChange?.(event.target.value)}
              >
                {laneOptions.map((lane) => (
                  <option key={lane.slug} value={lane.slug}>
                    {lane.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="eyebrow">{diagnostic.eyebrow}</div>
            <h1 id="client-diagnostic-title">
              {(diagnostic.titleLines || [diagnostic.title]).map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h1>
            <p>{diagnostic.intro}</p>
          </div>
          <button className="stamp-button link-button" type="button" onClick={() => setPage('buildout')}>
            {diagnostic.cta}
            <ArrowUpRight size={18} strokeWidth={3} />
          </button>
        </aside>

        <section className="client-diagnostic-content">
          <section className="client-score-panel" aria-label="Diagnostic opportunity score">
            <strong>{diagnostic.score}</strong>
            <div>
              <h2>{diagnostic.scoreTitle}</h2>
              <p>{diagnostic.scoreText}</p>
              <div className="client-score-bar" aria-hidden="true">
                <span style={{ width: `${diagnostic.score}%` }} />
              </div>
            </div>
          </section>

          <section className="client-card-grid" aria-label="Diagnostic findings">
            {diagnostic.cards.map((card) => (
              <article className="client-diagnostic-card" key={card.label}>
                <span>{card.label}</span>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            ))}
          </section>

          <section className="client-diagnostic-grid">
            <article className="client-diagnostic-list">
              <div className="eyebrow">Scorecard</div>
              {diagnostic.scorecard.map(([label, value]) => (
                <div className="client-list-row" key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </article>
            <article className="client-diagnostic-list">
              <div className="eyebrow">Intake</div>
              {diagnostic.intakeFields.map((field) => (
                <div className="client-list-row" key={field}>
                  <span>{field}</span>
                  <strong>Required</strong>
                </div>
              ))}
            </article>
          </section>

          <section className="client-system-map" aria-label="Recommended diagnostic workflow">
            <div className="section-title">
              <Zap size={22} strokeWidth={3} />
              First System Map
            </div>
            {diagnostic.systemSteps.map((step, index) => (
              <div className="client-system-step" key={step}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{step}</strong>
              </div>
            ))}
          </section>
        </section>
      </section>
    </main>
  );
}

function OwnerAccessPage({ onRetry, operatorAccess }) {
  const [ownerEmail, setOwnerEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  async function sendOwnerMagicLink(event) {
    event.preventDefault();

    if (!ownerSupabaseClient) {
      setStatus('error');
      setMessage('Supabase is not configured in the frontend environment yet.');
      return;
    }

    if (!ownerEmail) {
      setStatus('error');
      setMessage('Enter the owner email to request the secure sign-in link.');
      return;
    }

    setStatus('loading');
    setMessage('Sending owner sign-in link...');

    const redirectTo = `${window.location.origin}/owner/callback?operator=1`;
    const { error } = await ownerSupabaseClient.auth.signInWithOtp({
      email: ownerEmail,
      options: {
        emailRedirectTo: redirectTo,
        shouldCreateUser: true,
      },
    });

    if (error) {
      setStatus('error');
      setMessage(error.message);
      return;
    }

    setStatus('sent');
    setMessage('Check your email for the owner sign-in link, then retry access here.');
  }

  return (
    <main className="owner-access-page" aria-label="Owner access gate">
      <article className="owner-access-card">
        <h1>Owner sign-in required.</h1>
        <p>
          Operator screens stay private-by-default. Sign in with the owner email allowlist to unlock the Command
          Center and report review queue.
        </p>

        {operatorAccess?.message && <p className="form-note">{operatorAccess.message}</p>}

        <form className="owner-access-form" onSubmit={sendOwnerMagicLink}>
          <label htmlFor="owner-access-email">
            Owner Email
            <input
              id="owner-access-email"
              type="email"
              autoComplete="email"
              value={ownerEmail}
              placeholder="therrance@thurrsolutions.com"
              onChange={(event) => setOwnerEmail(event.target.value)}
            />
          </label>
          <button className="stamp-button link-button" type="submit" disabled={status === 'loading'}>
            SEND OWNER LINK
            <ArrowUpRight size={18} strokeWidth={3} />
          </button>
        </form>

        <button className="text-link button-link" type="button" onClick={onRetry} disabled={operatorAccess?.status === 'checking'}>
          Retry owner access
        </button>

        {message && <p className={status === 'error' ? 'form-note error-note' : 'form-note'}>{message}</p>}
      </article>
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

      <ReportReviewQueue />
      <MissionActivityFeed />
      <AIEngineOrchestra />
      <FinanceCommandCenter />
    </main>
  );
}

function formatReviewDate(value) {
  if (!value) {
    return 'Not stamped yet';
  }

  return new Date(value).toLocaleString();
}

function formatReportSectionTitle(key) {
  return key
    .replaceAll('_', ' ')
    .replaceAll('-', ' ')
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function formatReportSectionValue(value) {
  if (Array.isArray(value)) {
    return value
      .map((item) => (typeof item === 'object' ? Object.values(item).filter(Boolean).join(' — ') : item))
      .filter(Boolean)
      .join('\n');
  }

  if (value && typeof value === 'object') {
    return Object.entries(value)
      .map(([key, entryValue]) => `${formatReportSectionTitle(key)}: ${formatReportSectionValue(entryValue)}`)
      .filter(Boolean)
      .join('\n');
  }

  return String(value || '').trim();
}

function getReportSections(sections) {
  if (!sections || typeof sections !== 'object') {
    return [];
  }

  return Object.entries(sections)
    .map(([key, value]) => ({
      title: formatReportSectionTitle(key),
      body: formatReportSectionValue(value),
    }))
    .filter((section) => section.body);
}

function getExternalHref(value) {
  if (!value) {
    return '';
  }

  return /^https?:\/\//i.test(value) ? value : `https://${value}`;
}

function ReportReviewQueue() {
  const [reports, setReports] = useState([]);
  const [reviewStatus, setReviewStatus] = useState('auth_required');
  const [reviewMessage, setReviewMessage] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [ownerSession, setOwnerSession] = useState(null);

  async function getOwnerSession() {
    if (!ownerSupabaseClient) {
      return null;
    }

    const { data } = await ownerSupabaseClient.auth.getSession();
    return data.session || null;
  }

  async function loadReports() {
    if (!ownerSupabaseClient) {
      setReviewStatus('auth_required');
      setReviewMessage('Owner auth needs the Supabase URL and anon key in the frontend environment.');
      return;
    }

    const session = await getOwnerSession();
    setOwnerSession(session);

    if (!session?.access_token) {
      setReviewStatus('auth_required');
      setReviewMessage('Sign in with the owner email to load private blueprint reports.');
      return;
    }

    setReviewStatus('loading');
    setReviewMessage('');

    try {
      const response = await fetch('/api/review-reports', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Review reports could not be loaded.');
      }

      setReports(data.reports || []);
      setReviewStatus('ready');
    } catch (error) {
      setReviewStatus('error');
      setReviewMessage(error.message);
    }
  }

  useEffect(() => {
    loadReports();

    if (!ownerSupabaseClient) {
      return undefined;
    }

    const {
      data: { subscription },
    } = ownerSupabaseClient.auth.onAuthStateChange((_event, session) => {
      setOwnerSession(session);

      if (session?.access_token) {
        loadReports();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function sendOwnerMagicLink(event) {
    event.preventDefault();

    if (!ownerSupabaseClient || !ownerEmail) {
      setReviewStatus('auth_required');
      setReviewMessage('Enter the owner email to request the secure sign-in link.');
      return;
    }

    setReviewStatus('loading');
    setReviewMessage('Sending owner sign-in link...');

    const redirectTo = `${window.location.origin}/owner/callback?operator=1`;
    const { error } = await ownerSupabaseClient.auth.signInWithOtp({
      email: ownerEmail,
      options: {
        emailRedirectTo: redirectTo,
        shouldCreateUser: true,
      },
    });

    if (error) {
      setReviewStatus('auth_required');
      setReviewMessage(error.message);
      return;
    }

    setReviewStatus('auth_required');
    setReviewMessage('Check your email for the owner sign-in link, then come back to the Command Center.');
  }

  async function signOutOwner() {
    if (ownerSupabaseClient) {
      await ownerSupabaseClient.auth.signOut();
    }

    setOwnerSession(null);
    setReports([]);
    setReviewStatus('auth_required');
    setReviewMessage('Owner session signed out. Private reports are locked again.');
  }

  async function approveReport(reportId) {
    const session = ownerSession || (await getOwnerSession());

    if (!session?.access_token) {
      setReviewStatus('auth_required');
      setReviewMessage('Sign in as the owner before approving reports.');
      return;
    }

    setReviewStatus('approving');
    setReviewMessage('Approving report without sending email...');

    try {
      const response = await fetch('/api/approve-report', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          report_id: reportId,
          send_email: false,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Report approval failed.');
      }

      setReviewMessage('Report approved for follow-up. Email was not sent.');
      await loadReports();
    } catch (error) {
      setReviewStatus('error');
      setReviewMessage(error.message);
    }
  }

  return (
    <section className="review-queue-panel" aria-label="Blueprint report review queue">
      <div className="section-copy">
        <div className="eyebrow">REPORT REVIEW QUEUE</div>
        <h2>Approve the blueprint before it leaves the machine.</h2>
        <p>
          Generated reports wait here after Thurnos drafts them. Approving from this panel marks
          the report ready for delivery, but it does not send email.
        </p>
      </div>

      <div className="review-queue-list">
        {reviewStatus === 'auth_required' && (
          <article className="review-empty-state">
            <span>PRIVATE QUEUE LOCKED</span>
            <strong>Owner sign-in required before loading lead reports.</strong>
            <p>
              The Command Center preview stays open for workflow review. Real lead details load only
              after Supabase verifies your owner session.
            </p>
            <form className="owner-access-form compact-owner-form" onSubmit={sendOwnerMagicLink}>
              <label htmlFor="owner-email">
                Owner Email
                <input
                  id="owner-email"
                  type="email"
                  autoComplete="email"
                  value={ownerEmail}
                  placeholder="therrance@thurrsolutions.com"
                  onChange={(event) => setOwnerEmail(event.target.value)}
                />
              </label>
              <button className="stamp-button link-button" type="submit">
                SEND OWNER LINK
                <ArrowUpRight size={18} strokeWidth={3} />
              </button>
            </form>
          </article>
        )}
        {reviewStatus === 'loading' && <p className="form-note">Loading review queue...</p>}
        {reviewStatus === 'error' && <p className="form-note error-note">{reviewMessage}</p>}
        {reviewStatus === 'ready' && reports.length === 0 && (
          <article className="review-empty-state">
            <span>QUEUE CLEAR</span>
            <strong>No reports waiting for operator review.</strong>
            <p>New blueprint drafts will appear here after intake and generation finish.</p>
          </article>
        )}
        {reports.map((report) => {
          const sections = getReportSections(report.sections);
          const crmTags = report.request?.crm_tags || [];
          const leadStatus = report.request?.lead_status || report.request?.status || 'awaiting review';
          const sourceHref = getExternalHref(report.request?.website_or_social);

          return (
            <article className="review-report-card" key={report.id}>
              <div className="review-report-meta">
                <span>{report.report_status.replaceAll('_', ' ')}</span>
                <time>{formatReviewDate(report.updated_at || report.created_at)}</time>
              </div>
              <h3>{report.title}</h3>
              <p>{report.summary}</p>
            <div className="review-report-grid">
              <div>
                <span>Lead</span>
                <strong>{report.request?.name || 'Unknown lead'}</strong>
              </div>
              <div>
                <span>Contact</span>
                <strong>{report.request?.email || report.request?.phone || 'Not set'}</strong>
              </div>
              <div>
                <span>Industry</span>
                <strong>{report.request?.industry || 'Not set'}</strong>
              </div>
              <div>
                <span>Goal</span>
                <strong>{report.request?.main_goal || 'Not set'}</strong>
              </div>
              <div>
                <span>System</span>
                <strong>{report.system?.name || 'Draft system'}</strong>
              </div>
              <div>
                <span>Next move</span>
                <strong>{report.system?.next_move || report.request?.main_goal || 'Review draft'}</strong>
              </div>
            </div>
              <div className="review-intake-details">
                <div>
                  <span>Idea / Request</span>
                  <p>{report.request?.business_idea || 'No intake idea captured.'}</p>
                </div>
                <div>
                  <span>Bottleneck</span>
                  <p>{report.request?.biggest_bottleneck || 'No bottleneck captured.'}</p>
                </div>
                <div>
                  <span>Source</span>
                  {sourceHref ? (
                    <a href={sourceHref} target="_blank" rel="noreferrer">
                      Open source link
                      <ArrowUpRight size={15} strokeWidth={3} />
                    </a>
                  ) : (
                    <p>No website/social link captured.</p>
                  )}
                </div>
              </div>
              <div className="review-crm-strip" aria-label="CRM status">
                <span>{leadStatus.replaceAll('_', ' ')}</span>
                {crmTags.length > 0 ? (
                  crmTags.map((tag) => <span key={tag}>{tag}</span>)
                ) : (
                  <span>crm tags pending</span>
                )}
              </div>
              {sections.length > 0 && (
                <details className="review-report-sections">
                  <summary>Review generated blueprint sections</summary>
                  <div className="review-section-grid">
                    {sections.slice(0, 8).map((section) => (
                      <section key={section.title}>
                        <span>{section.title}</span>
                        <p>{section.body}</p>
                      </section>
                    ))}
                  </div>
                </details>
              )}
            <div className="review-report-actions">
              {report.report_status === 'needs_review' ? (
                <button
                  className="stamp-button link-button"
                  type="button"
                  disabled={reviewStatus === 'approving'}
                  onClick={() => approveReport(report.id)}
                >
                  APPROVE, DO NOT SEND
                  <ArrowUpRight size={18} strokeWidth={3} />
                </button>
              ) : (
                <span className="review-ready-stamp">Ready for delivery</span>
              )}
              <small>Email send waits for one approved test recipient.</small>
            </div>
            </article>
          );
        })}
      </div>

      {ownerSession && reviewStatus !== 'loading' && (
        <button className="text-link button-link owner-signout-button" type="button" onClick={signOutOwner}>
          Lock owner queue
        </button>
      )}
      {reviewMessage && reviewStatus !== 'error' && <p className="form-note">{reviewMessage}</p>}
    </section>
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
            This is the client-facing report view Thurr can generate after the intake. It
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
          <div className="eyebrow">THURR</div>
          <h1>AI lead generation systems for local service businesses.</h1>
          <p>
            Thurr Solutions builds and manages the intake, follow-up, automation, and AI support
            layer that helps contractors, beauty businesses, insurance teams, and service companies
            respond faster and stop losing warm leads.
          </p>
          <div className="hero-actions">
            <button className="stamp-button link-button" type="button" onClick={() => setPage('audit')}>
              BOOK A LEAD SYSTEM AUDIT
              <ArrowUpRight size={18} strokeWidth={3} />
            </button>
            <button className="text-link dark-link button-link" type="button" onClick={() => setPage('audit')}>
              View audit form
            </button>
          </div>
        </div>
        <aside className="solutions-proof">
          <div className="proof-header">
            <span>OPERATING PROMISE</span>
            <span className="activity-glyph">✓</span>
          </div>
          <h2 className="profit-promise">
            We build.
            <span>You profit.</span>
          </h2>
          <p>
            Capture the lead, qualify the job, notify the team, trigger follow-up, and keep the
            owner updated without adding another manual handoff.
          </p>
          <div className="proof-stats">
            <div>
              <span>Front door</span>
              <strong>Lead generation</strong>
            </div>
            <div>
              <span>Retainer path</span>
              <strong>Managed automation</strong>
            </div>
            <div>
              <span>Guardrail</span>
              <strong>System safety</strong>
            </div>
          </div>
        </aside>
      </section>

      <section className="solutions-services" id="solutions-services">
        <FlowCard
          icon={Target}
          title="AI Lead Generation"
          text="Capture inquiries, qualify prospects, route opportunities, and move leads toward a booked next step."
        />
        <FlowCard
          icon={MapPinned}
          title="Growth Websites"
          text="Mobile-friendly service pages, offer copy, lead forms, booking paths, SEO metadata, and follow-up automations."
        />
        <FlowCard
          icon={PhoneCall}
          title="Missed-Call Text-Back"
          text="Reply to missed calls automatically, capture the lead by text, and show the owner what each recovered inquiry could be worth."
        />
        <FlowCard
          icon={Zap}
          title="Managed AI Automation"
          text="Monitor, fix, and improve the workflows after launch so the system keeps earning its place."
        />
        <FlowCard
          icon={ClipboardCheck}
          title="AI Consulting"
          text="Audit the workflow, identify the biggest leak, and create a battle plan before money gets burned on the wrong build."
        />
        <FlowCard
          icon={Bot}
          title="AI Agent Development"
          text="Add AI receptionists, intake assistants, lead qualifiers, and reporting assistants when they serve the workflow."
        />
        <FlowCard
          icon={Gauge}
          title="System Safety"
          text="Design credential hygiene, access controls, audit trails, and compliance-aware guardrails into the automation."
        />
        <FlowCard
          icon={BriefcaseBusiness}
          title="Client Intake Systems"
          text="Turn forms, DMs, booking links, and scattered notes into one trackable path from first contact to follow-up."
        />
      </section>

      <section className="solutions-packages" id="solutions-packages" aria-labelledby="solutions-packages-title">
        <div className="section-copy">
          <div className="eyebrow">THE OFFER LADDER</div>
          <h2 id="solutions-packages-title">The audit tells us what to fix. The build fixes it.</h2>
          <p>
            Start small enough to avoid wasting money, then move into the next phase only when the
            diagnosis shows it will help revenue, response speed, or owner visibility.
          </p>
        </div>
        <div className="offer-ladder">
          <article>
            <div className="ladder-step">Starter</div>
            <h3>Lead Flow Audit</h3>
            <strong>$250-$350</strong>
            <p>
              Diagnose the website, booking path, lead intake, follow-up, and owner visibility.
              Deliver a scorecard, priority fix list, and recommended battle plan.
            </p>
            <div className="ladder-next">If the website is leaking trust or inquiries, move to Growth Website + Intake.</div>
          </article>
          <article>
            <div className="ladder-step">Phase 1</div>
            <h3>Growth Website + Intake</h3>
            <strong>$500-$1,500</strong>
            <p>
              Build or improve the service site, lead form, booking/inquiry flow, SEO basics, and
              first follow-up handoff so the business can capture demand cleanly.
            </p>
            <div className="ladder-next">If leads need faster response and routing, move to Automation Build.</div>
          </article>
          <article>
            <div className="ladder-step">Phase 2</div>
            <h3>Automation Build</h3>
            <strong>$1,000-$3,500+</strong>
            <p>
              Connect forms, CRM or sheets, alerts, follow-up sequences, AI summaries, and routing
              so leads move without constant manual chasing.
            </p>
            <div className="ladder-next">If the system becomes business-critical, move to Managed Automation.</div>
          </article>
          <article>
            <div className="ladder-step">Add-On</div>
            <h3>Missed-Call Recovery</h3>
            <strong>$500-$1,500</strong>
            <p>
              Add an automatic missed-call text-back, lead capture path, owner alert, and simple
              ROI calculator so service businesses can see the value of faster response.
            </p>
            <div className="ladder-next">Best for contractors, beauty, real estate, insurance, and appointment-based teams.</div>
          </article>
          <article>
            <div className="ladder-step">Retainer</div>
            <h3>Managed AI Automation</h3>
            <strong>$250-$750/mo</strong>
            <p>
              Monitor workflows, fix breaks, improve prompts, update routing, review errors, and
              keep the lead path useful after launch.
            </p>
            <div className="ladder-next">Best once the workflow is tied to real leads, bookings, or client communication.</div>
          </article>
        </div>
        <div className="ladder-rule">
          <strong>The audit fee can be credited toward the build.</strong>
          <span>That keeps the first step low-risk without turning strategy into free work.</span>
        </div>
      </section>

      <section className="solutions-process">
        <div className="section-copy">
          <div className="eyebrow">HOW IT WORKS</div>
          <h2>Strategy first. Systems second. Proof always.</h2>
          <p>
            Thurr starts with the business case, then builds the workflow around the
            outcome. The goal is not more tools. The goal is fewer leaks.
          </p>
        </div>
        <section className="backend-map">
          <div className="section-title">
            <BriefcaseBusiness size={22} strokeWidth={3} />
            Project Flow
          </div>
          {[
            'Lead path audit',
            'Offer, ROI, and workflow plan',
            'Lead capture and follow-up build',
            'AI assistant and reporting layer',
            'Testing and owner handoff',
            'Managed automation support',
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
          <h2>Thurr builds the systems. The client keeps the brand.</h2>
          <p>
            Client diagnostic funnels are built by Thurr and can use the same backend
            engine, but the visual system stays client-owned unless the asset is a Thurr Solutions
            sales page, proposal, or case study.
          </p>
        </div>
        <div className="solutions-cta-card">
          <span>RECOMMENDED NEXT STEP</span>
          <strong>Request the audit first. Build only after the leak is clear.</strong>
          <a className="text-link" href="mailto:hello@thurrsolutions.com">
            Email Thurr <Mail size={18} strokeWidth={3} />
          </a>
        </div>
      </section>
    </main>
  );
}

function HomePage({ setPage }) {
  return (
    <main className="b2b-home-page visual-home-page" id="top" data-brand="thurr-solutions">
      <VisualHero />
      <PipelineDiagram />
      <VisualMethodology />
      <VisualAuditCta />
      <VisualSelectedWork />
      <VisualComplianceStrip />
      <VisualOperatorSection />
      <TerminalWidget />
    </main>
  );
}

function VisualHero() {
  return (
    <section className="visual-hero" aria-labelledby="hero-title">
      <div className="hero-tag">AI Automation Engineer · Houston · Est. 2026</div>
      <h1 id="hero-title" className="visual-hero-title" aria-label="Your leads come in. Most go nowhere.">
        <span className="hero-word" style={{ '--word-delay': '0s' }}>Your</span>{' '}
        <span className="hero-word" style={{ '--word-delay': '0.08s' }}>leads</span>{' '}
        <span className="hero-word" style={{ '--word-delay': '0.16s' }}>come</span>{' '}
        <span className="hero-word" style={{ '--word-delay': '0.24s' }}>in.</span>
        <br />
        <em className="hero-word" style={{ '--word-delay': '0.32s' }}>Most go nowhere.</em>
      </h1>
      <p className="visual-hero-sub">
        Thurr Solutions builds consent-aware lead capture, follow-up pipelines, and intake systems
        for local service businesses that can't afford to waste a single inquiry.
      </p>
      <div className="visual-hero-actions">
        <a className="visual-primary-btn" href="#audit">Get the Lead Flow Audit →</a>
        <a className="visual-secondary-btn" href="#work">See selected work</a>
      </div>
      <div className="hero-meta-strip" aria-label="Current engagement status">
        <span><i className="meta-dot dot-green" />Restore-C — Live</span>
        <span><i className="meta-dot dot-orange" />HeartPathBloom — In Build</span>
        <span><i className="meta-dot dot-muted" />Thurr Solutions LLC · Missouri</span>
      </div>
    </section>
  );
}

function PipelineDiagram() {
  const nodes = [
    ['LEAD SOURCE', 'Facebook / Google', '/ Direct Inquiry', 20],
    ['CAPTURE', 'Landing page +', 'consent form', 200],
    ['QUALIFY', 'Instant response', '+ follow-up seq.', 380],
    ['TRACK', 'Lead CRM /', 'status pipeline', 560],
    ['BOOKED CALL', 'Calendar routing', '+ confirmation', 740],
  ];

  return (
    <section className="pipeline-section" aria-labelledby="pipeline-title">
      <div className="pipeline-label" id="pipeline-title">// Lead Flow Architecture — Phase 1 Standard</div>
      <div className="pipeline-wrap">
        <svg className="pipeline-svg" viewBox="0 0 900 160" role="img" aria-label="Lead flow from source to booked call">
          <defs>
            <marker id="pipe-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(217,98,31,0.4)" />
            </marker>
            <filter id="dot-glow" x="-80%" y="-80%" width="260%" height="260%">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#D9621F" />
            </filter>
          </defs>
          <path id="pipeline-motion-path" d="M 145 80 L 755 80" fill="none" stroke="transparent" />
          {[145, 325, 505, 685].map((x) => (
            <g key={x}>
              <line className="connector-path" x1={x} y1="80" x2={x + 55} y2="80" markerEnd="url(#pipe-arrow)" />
              {x === 145 ? <line className="connector-path connector-active" x1={x} y1="80" x2={x + 55} y2="80" /> : null}
            </g>
          ))}
          {nodes.map(([title, sub1, sub2, x], index) => (
            <g className="pipe-node" key={title}>
              <rect className="node-box" x={x} y="42" width="125" height="76" rx="2" />
              {index === 0 ? <rect x={x} y="42" width="4" height="76" fill="#D9621F" /> : null}
              {index === 4 ? <rect x={x + 121} y="42" width="4" height="76" fill="#4F7A3A" /> : null}
              <text className="node-label-main" x={x + 62.5} y="68">{title}</text>
              <text className="node-label-sub" x={x + 62.5} y="88">{sub1}</text>
              <text className="node-label-sub" x={x + 62.5} y="103">{sub2}</text>
            </g>
          ))}
          <circle r="5" fill="#D9621F" filter="url(#dot-glow)">
            <animateMotion dur="4s" repeatCount="indefinite">
              <mpath href="#pipeline-motion-path" />
            </animateMotion>
          </circle>
        </svg>
        <div className="pipeline-status-row">
          <span><i className="meta-dot dot-green" />Consent capture: enabled</span>
          <span><i className="meta-dot dot-orange" />Follow-up: 3-touch sequence</span>
          <span><i className="meta-dot dot-muted" />TCPA-safe · Compliance gate active</span>
          <strong>BUILD_ID: TS-PHASE1-001</strong>
        </div>
      </div>
    </section>
  );
}

function VisualMethodology() {
  const items = [
    ['01 // PHASE ONE', 'AUDIT', 'We map your current lead flow and find exactly where prospects disappear. No assumptions. No generic recommendations.', 'DIAGNOSTIC'],
    ['02 // PHASE TWO', 'BUILD', 'We build the intake, follow-up, and booking system around your real process — consent-aware, compliant, and built to last.', 'IMPLEMENTATION'],
    ['03 // ONGOING', 'MANAGE', 'We keep it running. Workflow adjustments, reporting, sequence updates, and campaign coordination after launch.', 'RETAINER'],
  ];

  return (
    <section className="visual-methodology" id="how-it-works" aria-label="Audit Build Manage methodology">
      {items.map(([phase, title, body, tag]) => (
        <article key={title}>
          <span>{phase}</span>
          <h2>{title}</h2>
          <p>{body}</p>
          <strong>{tag}</strong>
        </article>
      ))}
    </section>
  );
}

function VisualAuditCta() {
  const [form, setForm] = useState({
    businessName: '',
    industry: 'Roofing / Contracting',
    leadSource: '',
    email: '',
    consent: false,
  });
  const [state, setState] = useState('idle');

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!form.consent) {
      setState('consent');
      return;
    }
    setState('sending');
    try {
      await submitAuditRequest({
        businessName: form.businessName,
        ownerName: form.businessName,
        email: form.email,
        businessUrl: 'Not provided from homepage form',
        monthlyLeadsEstimate: 'Not sure',
        frustrationText: `Industry: ${form.industry}. Lead source: ${form.leadSource}`,
      });
      setState('queued');
      window.history.pushState({}, '', '/audit/thanks');
      window.dispatchEvent(new PopStateEvent('popstate'));
    } catch {
      setState('error');
    }
  }

  return (
    <section className="visual-audit-cta" id="audit" aria-labelledby="audit-title">
      <div>
        <h2 id="audit-title">Find out where your <em>pipeline breaks.</em></h2>
        <p>
          The Lead Flow Audit is a $250 paid diagnostic. I review your current process,
          identify where leads are slipping, and deliver a written summary with a clear
          recommended first step.
        </p>
        <div className="audit-price-line"><strong>$250</strong> · 1 business day turnaround · Thurr reviews personally</div>
      </div>
      <form className="visual-audit-form" onSubmit={handleSubmit}>
        <label>
          <span>Business name</span>
          <input required value={form.businessName} placeholder="e.g. Restore-C" onChange={(event) => updateField('businessName', event.target.value)} />
        </label>
        <label>
          <span>Industry</span>
          <select value={form.industry} onChange={(event) => updateField('industry', event.target.value)}>
            <option>Roofing / Contracting</option>
            <option>Beauty / Nail Studio</option>
            <option>Life Insurance</option>
            <option>Healthcare / Hospice</option>
            <option>Other</option>
          </select>
        </label>
        <label>
          <span>Where do your leads come from?</span>
          <input required value={form.leadSource} placeholder="Facebook ads, referrals, Google..." onChange={(event) => updateField('leadSource', event.target.value)} />
        </label>
        <label>
          <span>Email address</span>
          <input required type="email" value={form.email} placeholder="you@yourbusiness.com" onChange={(event) => updateField('email', event.target.value)} />
        </label>
        <label className="visual-consent">
          <input type="checkbox" checked={form.consent} onChange={(event) => updateField('consent', event.target.checked)} />
          <span>I agree to be contacted by Thurr Solutions about my audit results.</span>
        </label>
        <button className="visual-primary-btn" type="submit">
          {state === 'sending' ? 'Submitting...' : 'Submit Audit Request — $250 →'}
        </button>
        {state === 'consent' ? <p className="form-note">Consent is required before I can contact you about the audit.</p> : null}
        {state === 'error' ? <p className="form-note">The request did not save. Use the full audit page or email hello@thurrsolutions.com.</p> : null}
      </form>
    </section>
  );
}

function VisualSelectedWork() {
  const cards = [
    ['LIVE', 'Restore-C', 'Storm Lead Capture System', "Dedicated storm damage lead capture page with source tracking and routing for a contracting company's seasonal campaign.", 'live'],
    ['IN BUILD', 'HeartPathBloom', 'Youth Wellness — Intake & Consent System', 'Designing intake, consent, and care routing infrastructure for a youth mental health platform. Compliance-first architecture.', 'build'],
    ['PROPOSAL', 'Insurance Lead Pipeline', 'Life Insurance — Lead Capture & Booking', 'Scoped a consent-aware lead capture, follow-up sequence, and appointment routing system for a nationwide independent agent.', 'proposal'],
  ];

  return (
    <section className="visual-work" id="work" aria-labelledby="work-title">
      <div className="visual-section-label">Selected work</div>
      <div className="visual-work-grid">
        {cards.map(([status, title, type, body, tone]) => (
          <article key={title}>
            <span className={`work-status ${tone}`}>{status}</span>
            <h2>{title}</h2>
            <strong>{type}</strong>
            <p>{body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function VisualComplianceStrip() {
  return (
    <section className="visual-compliance-strip" aria-label="Compliance trust layer">
      {['HIPAA-Aware System Design', 'TCPA-Safe Follow-Up Architecture', 'COPPA-Compliant Where Required', 'Compliance Sign-Off Required Before Launch'].map((item) => (
        <span key={item}><i>✓</i>{item}</span>
      ))}
      <strong>NO SYSTEM GOES LIVE WITHOUT CLIENT APPROVAL</strong>
    </section>
  );
}

function VisualOperatorSection() {
  return (
    <section className="visual-operator" aria-labelledby="operator-title">
      <span id="operator-title">// About the Operator</span>
      <p>
        I'm Thurr — <strong>AI Automation Engineer</strong> and the operator behind Thurr Solutions.
        I build lead systems, intake flows, and follow-up pipelines for local service businesses that
        are too busy to chase leads manually. <strong>Every system I build, I run.</strong> <strong>Every
        client I take on, I work directly.</strong> No account managers. No handoffs.
      </p>
    </section>
  );
}

function TerminalWidget() {
  return (
    <aside className="terminal-widget" aria-label="System status widget">
      <header>// SYS STATUS</header>
      {[
        ['PIPELINE_STATUS', 'ACTIVE', 'green'],
        ['AUDIT_QUEUE', 'OPEN', 'warm'],
        ['COMPLY_GATE', 'ENABLED', 'green'],
        ['OPERATOR', 'THURR / SOLO', 'warm'],
        ['BUILD_ENV', 'PRODUCTION', 'warm'],
      ].map(([label, value, tone]) => (
        <div key={label}>
          <span>{label}</span>
          <strong className={tone}>→ {value}</strong>
        </div>
      ))}
    </aside>
  );
}

function HomeOfferLadderSection({ setPage }) {
  const offers = [
    {
      title: 'Lead Flow Audit',
      price: '$250',
      text: 'Three days. One report. The biggest leak named, ranked, and priced. You get a PDF report, a 10-minute Loom walkthrough, and a fixed-price quote for the fix.',
      next: 'Audit credit applies to your build if you start within 30 days.',
      action: (
        <a className="stamp-button link-button" href="/audit">
          Book Audit
          <ArrowUpRight size={18} strokeWidth={3} />
        </a>
      ),
    },
    {
      title: 'Growth Website + Intake',
      price: '$500-$1,500',
      text: 'A site that takes leads in clean and routes them where they belong. Form + auto-response + owner alert + connected to your tools (Calendar, CRM, SMS, email).',
      next: null,
      action: (
        <a className="text-link dark-link" href="/work">
          See Sample Build
        </a>
      ),
    },
    {
      title: 'Managed Automation',
      price: '$250-$750/month',
      text: 'We run the system. You see the dashboard. Issues get caught before clients call you. Monthly report, on-call adjustments, and no surprise invoices.',
      next: null,
      action: (
        <a className="text-link dark-link" href="mailto:thurr@thurrsolutions.com">
          Talk to Thurr
        </a>
      ),
    },
  ];

  return (
    <section className="solutions-packages homepage-offer-ladder" aria-labelledby="offer-ladder-title">
      <div className="section-copy">
        <div className="eyebrow">03 / OFFER LADDER</div>
        <h2 id="offer-ladder-title">Start low-risk. Move up only after proof.</h2>
        <p>
          The audit is the front door. Everything else is optional and only happens after the leak is clear.
        </p>
      </div>
      <div>
        <div className="offer-ladder">
          {offers.map((offer) => (
            <article key={offer.title}>
              <h3>{offer.title}</h3>
              <strong>{offer.price}</strong>
              <p>{offer.text}</p>
              {offer.next ? <div className="ladder-next">{offer.next}</div> : null}
              {offer.action ? <div className="ladder-action">{offer.action}</div> : null}
            </article>
          ))}
        </div>
        <div className="ladder-rule">
          <strong>The audit fee can be credited toward the build.</strong>
          <span>Keep step one low-risk without turning strategy into free work.</span>
        </div>
      </div>
    </section>
  );
}

function ThreeStepsSection() {
  const steps = [
    {
      number: '01',
      title: 'AUDIT',
      text:
        "3 days. We map every place a lead enters your business and grade where they're dying. Output: a written report + Loom walkthrough naming your top 3 leaks. $250–$350",
    },
    {
      number: '02',
      title: 'BUILD',
      text:
        "1–3 weeks. One focused fix — intake site, automation workflow, or missed-call recovery. We don't redesign your business. We patch the leak. $500–$3,500",
    },
    {
      number: '03',
      title: 'MANAGE',
      text:
        "Monthly. We run the system, catch issues before clients do, and report what's working. $250–$750/month",
    },
  ];

  return (
    <section className="three-steps-section" id="how-it-works" aria-labelledby="three-steps-title">
      <div className="section-copy">
        <div className="eyebrow">01 / HOW IT WORKS</div>
        <h2 id="three-steps-title">How this actually works.</h2>
      </div>
      <div className="three-steps-grid">
        {steps.map((step) => (
          <article key={step.number}>
            <span>{step.number}</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </article>
        ))}
      </div>
      <p className="three-steps-tagline">
        The audit tells us what to fix. The build fixes it. The retainer keeps it working.
      </p>
    </section>
  );
}

function IntroVideoStage() {
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    fetch(introVideo.src, { method: 'HEAD' })
      .then((response) => {
        if (isMounted && response.ok) {
          setVideoReady(true);
        }
      })
      .catch(() => {
        if (isMounted) {
          setVideoReady(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="video-stage" aria-label="Lead system walkthrough video">
      <div className="video-topline">
        <span>60-second walkthrough</span>
        <strong>{videoReady ? 'Ready to watch' : 'Video slot ready'}</strong>
      </div>
      {videoReady ? (
        <video
          className="video-player"
          controls
          playsInline
          preload="metadata"
          poster={introVideo.poster}
          aria-label="Thurr Solutions lead system intro video"
        >
          <source src={introVideo.src} type="video/mp4" />
        </video>
      ) : (
        <div className="video-screen">
          <div className="video-play-mark" aria-hidden="true">▶</div>
          <div>
            <span>Lead System Audit</span>
            <strong>Website → Intake → Follow-up → Managed automation</strong>
          </div>
        </div>
      )}
      <div className="video-timeline" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

function OperatorSystemPanel() {
  const rows = [
    ['AUDIT', 'OPERATIONAL', 'LEAD FLOW'],
    ['BUILD', 'OPERATIONAL', 'INTAKE PATH'],
    ['MANAGE', 'OPERATIONAL', 'MONTHLY'],
  ];

  return (
    <aside className="operator-system-panel" aria-label="Thurr Solutions operating status">
      <div className="operator-panel-header">
        <span>SYSTEM STATUS</span>
        <strong>Infrastructure view</strong>
      </div>
      <div className="operator-status-list">
        {rows.map(([label, status, time]) => (
          <div className="operator-status-row" key={label}>
            <span className="status-dot" />
            <strong>{label}</strong>
            <span>{status}</span>
            <time>{time}</time>
          </div>
        ))}
      </div>
      <p>Documented process. Visible artifacts. No tool pile-up before the leak is clear.</p>
    </aside>
  );
}

function MethodologySection({ setPage }) {
  const steps = [
    {
      number: '01',
      name: 'Audit',
      duration: 'Week 1',
      text:
        'One week. Output: a written diagnostic showing where leads leak, what is costing money, and what to fix first.',
      gets: ['Lead-flow scorecard', 'Leak map and priority fix list', 'Effort/impact recommendation'],
    },
    {
      number: '02',
      name: 'Build',
      duration: 'Weeks 2-4',
      text:
        'Two to four weeks. Output: a working lead capture, intake, and follow-up system tied to your CRM, your phone, and your team.',
      gets: ['Capture and intake path', 'Owner alerts and routing', 'Follow-up workflow'],
    },
    {
      number: '03',
      name: 'Manage',
      duration: 'Monthly',
      text:
        'Monthly. Output: monitoring, optimization, and reporting. The system stays running while you run the business.',
      gets: ['Workflow monitoring', 'Prompt and routing updates', 'Reporting and next-action review'],
    },
  ];

  return (
    <section className="methodology-section" id="methodology" aria-labelledby="methodology-title">
      <div className="section-copy">
        <div className="eyebrow">01 / METHODOLOGY</div>
        <h2 id="methodology-title">The audit tells us what to fix. The build fixes it. The retainer keeps it working.</h2>
      </div>
      <div className="methodology-timeline">
        {steps.map((step) => (
          <article className="methodology-step" key={step.number}>
            <div className="methodology-marker">{step.number}</div>
            <div>
              <div className="methodology-meta">{step.duration}</div>
              <h3>{step.number} · {step.name}</h3>
              <p>{step.text}</p>
              <div className="methodology-list">
                <span>What you get</span>
                {step.gets.map((item) => (
                  <strong key={item}>{item}</strong>
                ))}
              </div>
            </div>
          </article>
        ))}
        <button className="text-link dark-link button-link methodology-cta" type="button" onClick={() => setPage('audit')}>
          Start with the audit →
        </button>
      </div>
    </section>
  );
}

function AuditFeatureSection({ setPage }) {
  const checks = [
    'Speed-to-lead measurement',
    'Intake form audit',
    'Follow-up sequence audit',
    'CRM and pipeline visibility check',
    'Compliance flags',
    'Effort/impact fix ranking',
  ];

  return (
    <section className="audit-feature-section" aria-labelledby="audit-feature-title">
      <div className="audit-feature-copy">
        <div className="eyebrow">02 / ENTRY POINT</div>
        <h2 id="audit-feature-title">A $250 diagnostic that pays for itself in one closed lead.</h2>
        <p>
          Most local service businesses do not have a lead problem. They have a leak. The Lead Flow
          Audit is a structured one-week diagnostic where I trace every step a lead takes from form
          submit to follow-up to closed job.
        </p>
        <p>
          You get a written report with prioritized fixes, a score, and a recommended path forward.
          No pressure to continue. The report is yours either way.
        </p>
        <div className="audit-check-grid">
          {checks.map((check) => (
            <span key={check}>{check}</span>
          ))}
        </div>
        <button className="stamp-button link-button" type="button" onClick={() => setPage('audit')}>
          REQUEST THE AUDIT
          <ArrowUpRight size={18} strokeWidth={3} />
        </button>
      </div>
      <aside className="audit-report-preview" aria-label="Sample audit report preview">
        <div className="sample-watermark">SAMPLE</div>
        <div className="report-preview-top">
          <span>Lead Flow Audit</span>
          <strong>Diagnostic Report</strong>
        </div>
        <div className="report-score-line">
          <span>Speed to lead</span>
          <strong>Needs action</strong>
        </div>
        <div className="redacted-line wide" />
        <div className="redacted-line" />
        <div className="redacted-line short" />
        <div className="report-fix-list">
          <span>01 / Fix first</span>
          <span>02 / Automate handoff</span>
          <span>03 / Review weekly</span>
        </div>
      </aside>
    </section>
  );
}

function IndustriesSection() {
  const industries = [
    {
      label: 'Roofing & Contractors',
      leak: 'Storm leads decay in hours.',
      fix: 'We build instant-response and follow-up systems that close the gap between form submit and first call.',
    },
    {
      label: 'Beauty & Service Studios',
      leak: 'No-shows and missed bookings cost more than ads.',
      fix: 'We build intake, confirmation, and rebooking flows that protect the chair.',
    },
    {
      label: 'Insurance Agents',
      leak: 'Carrier and compliance review constrains what you can automate.',
      fix: "We build within your upline's rules.",
    },
    {
      label: 'Healthcare & Hospice',
      tag: 'COMPLIANCE-FIRST',
      leak: 'Compliance-first engagements only.',
      fix: 'HIPAA-aware intake, BAA required, no shortcuts.',
    },
  ];

  return (
    <section className="industries-section" aria-labelledby="industries-title">
      <div className="section-copy">
        <div className="eyebrow">03 / INDUSTRIES</div>
        <h2 id="industries-title">Built for local operators.</h2>
      </div>
      <div className="industry-grid">
        {industries.map((industry) => (
          <article className="industry-card" key={industry.label}>
            <div className="industry-card-top">
              <h3>{industry.label}</h3>
              {industry.tag ? <span>{industry.tag}</span> : null}
            </div>
            <p>{industry.leak}</p>
            <p>{industry.fix}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function SystemDiagramSection() {
  const nodes = [
    ['FORM SUBMIT', 40, 110],
    ['INSTANT SMS', 220, 110],
    ['CRM LOG', 400, 110],
    ['PIPELINE ROUTE', 580, 110],
    ['REPLY → STOP', 760, 62],
    ['NO REPLY → 24H', 760, 158],
    ['72H FOLLOW-UP', 940, 158],
    ['ARCHIVE', 1120, 158],
  ];

  return (
    <section className="system-diagram-section" aria-labelledby="system-diagram-title">
      <div className="section-copy">
        <div className="eyebrow">04 / WHAT&apos;S INSIDE A BUILD</div>
        <h2 id="system-diagram-title">A real system, not a deliverable list.</h2>
      </div>
      <div className="system-diagram-shell">
        <svg viewBox="0 0 1280 270" role="img" aria-labelledby="workflow-title workflow-desc">
          <title id="workflow-title">Lead follow-up workflow diagram</title>
          <desc id="workflow-desc">Lead capture moves through SMS, CRM, pipeline routing, reply stop, and follow-up branches.</desc>
          <defs>
            <marker id="arrow-active" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
              <path d="M0,0 L10,5 L0,10 Z" fill="var(--op-accent)" />
            </marker>
            <marker id="arrow-muted" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
              <path d="M0,0 L10,5 L0,10 Z" fill="var(--op-text-dim)" />
            </marker>
          </defs>
          <path className="diagram-path active" d="M170 135 H220 M350 135 H400 M530 135 H580 M710 135 H750" markerEnd="url(#arrow-active)" />
          <path className="diagram-path muted" d="M710 135 C740 135 740 87 760 87" markerEnd="url(#arrow-muted)" />
          <path className="diagram-path muted" d="M710 135 C740 135 740 183 760 183 H940 M1070 183 H1120" markerEnd="url(#arrow-muted)" />
          {nodes.map(([label, x, y]) => (
            <g className="diagram-node" key={label} transform={`translate(${x} ${y})`}>
              <rect width="130" height="50" />
              <text x="65" y="31" textAnchor="middle">{label}</text>
            </g>
          ))}
        </svg>
      </div>
    </section>
  );
}

function FieldNotesSection() {
  const notes = [
    {
      client: 'Restore-C',
      label: 'STORM LEAD CAPTURE',
      problem: 'Indianapolis roofing/siding/gutter operator with no instant response and weak landing infrastructure.',
      solution: 'Built a storm lead capture page, instant SMS, and pipeline routing across multiple markets.',
      status: 'Active retainer.',
    },
    {
      client: 'HeartPathBloom',
      label: 'YOUTH WELLNESS APP',
      problem: 'Founders building a guided wellness experience for young users.',
      solution: 'Compliance-first build under COPPA with clinical reviewer in scope.',
      status: 'In build, Phase 1.',
    },
  ];

  return (
    <section className="field-notes-section" aria-labelledby="field-notes-title">
      <div className="section-copy">
        <div className="eyebrow">05 / FIELD NOTES</div>
        <h2 id="field-notes-title">Recent engagements.</h2>
      </div>
      <div className="field-notes-grid">
        {notes.map((note) => (
          <article className="field-note-card" key={note.client}>
            <span>{note.client} · {note.label}</span>
            <p>{note.problem}</p>
            <p>{note.solution}</p>
            <strong>{note.status}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}

function FounderOperatorSection() {
  return (
    <section className="operator-founder-section" id="about-therrance" aria-labelledby="founder-title">
      <div className="founder-photo-frame">
        <img src={monogram} alt="Thurr Solutions monogram placeholder for Therrance Carrothers headshot" />
        <span>HEADSHOT PENDING</span>
      </div>
      <div className="section-copy">
        <div className="eyebrow">06 / OPERATOR</div>
        <h2 id="founder-title">Run by Therrance Carrothers.</h2>
        <p>
          AI Automation Engineer. Built and shipped lead systems for roofing, hospice intake, and
          youth wellness clients. BBA Finance, University of Missouri. AWS and AI Automation
          Specialist certifications. Based in Houston, operating across the U.S.
        </p>
      </div>
    </section>
  );
}

function FinalCtaSection({ setPage }) {
  return (
    <section className="final-audit-cta" aria-labelledby="final-cta-title">
      <div className="eyebrow">07 / NEXT STEP</div>
      <h2 id="final-cta-title">Start with the audit.</h2>
      <p>One week. $250. A written diagnostic of where your leads are leaking and what to fix first.</p>
      <button className="stamp-button link-button" type="button" onClick={() => setPage('audit')}>
        Run a Lead Flow Audit →
        <ArrowUpRight size={18} strokeWidth={3} />
      </button>
    </section>
  );
}

function AuditPage({ setPage }) {
  const [auditForm, setAuditForm] = useState(auditInitialForm);
  const [auditState, setAuditState] = useState('idle');

  function updateAuditField(field, value) {
    setAuditForm((current) => ({ ...current, [field]: value }));
  }

  async function handleAuditSubmit(event) {
    event.preventDefault();
    setAuditState('sending');

    try {
      await submitAuditRequest({
        business_name: auditForm.businessName,
        owner_name: auditForm.ownerName,
        email: auditForm.email,
        business_url: auditForm.businessUrl,
        monthly_leads_estimate: auditForm.monthlyLeadsEstimate,
        frustration_text: auditForm.frustrationText,
      });
      setAuditState('queued');
      setAuditForm(auditInitialForm);
      setPage('audit-thanks');
    } catch {
      setAuditState('error');
    }
  }

  return (
    <main className="audit-page" id="top" data-brand="thurr-solutions">
      <section className="audit-hero">
        <div className="hero-copy">
          <div className="eyebrow">LEAD FLOW AUDIT</div>
          <h1>Find your leak in 3 days. $250.</h1>
          <p>We map every place a lead enters your business and rank where they&apos;re dying — by revenue impact.</p>
          <div className="hero-actions">
            <a className="stamp-button link-button" href="#audit-request-form">
              Start your audit
              <ArrowUpRight size={18} strokeWidth={3} />
            </a>
            <button className="text-link dark-link button-link" type="button" onClick={() => setPage('home')}>
              Back to home
            </button>
          </div>
        </div>
        <aside className="audit-price-card">
          <span>Three-day diagnostic</span>
          <strong>$250</strong>
          <p>If you move into the Build within 30 days, your audit fee is credited in full.</p>
        </aside>
      </section>

      <section className="audit-steps audit-deliverables" aria-labelledby="audit-deliverables-title">
        <div className="section-copy">
          <div className="eyebrow">WHAT YOU GET</div>
          <h2 id="audit-deliverables-title">What you get.</h2>
          <p>Three days after kickoff, you receive:</p>
        </div>
        <ol>
          <li>A written report (PDF) ranking your top 3 lead-flow leaks by revenue impact.</li>
          <li>A 10-minute Loom walkthrough where I explain each one in plain English.</li>
          <li>A fixed-price quote for the fix — broken into Build phases so you can stop after any phase.</li>
        </ol>
        <p className="audit-deliverables-note">You can keep the audit and stop. No retainer trap, no upsell pressure.</p>
        <p className="audit-deliverables-credit">
          If you move into the Build within 30 days, your audit fee is credited in full.
        </p>
      </section>

      <section className="buildout-section audit-form-section" id="audit-request-form" aria-labelledby="audit-form-title">
        <div className="section-copy">
          <div className="eyebrow">THE REQUEST</div>
          <h2 id="audit-form-title">Start your audit.</h2>
          <p>
            Tell me about your business. I review every audit request personally and respond within one business day.
          </p>
        </div>
        <AuditRequestForm
          auditForm={auditForm}
          auditState={auditState}
          handleAuditSubmit={handleAuditSubmit}
          updateAuditField={updateAuditField}
        />
      </section>
    </main>
  );
}

function AuditThanksPage() {
  return (
    <main className="audit-page" id="top" data-brand="thurr-solutions">
      <section className="audit-hero audit-thanks-hero">
        <div className="hero-copy">
          <div className="eyebrow">REQUEST RECEIVED</div>
          <h1>Got it. Your audit request is in.</h1>
          <p>
            I&apos;ll reply within 1 business day with two things: 1. A 15-minute kickoff call invite
            to confirm scope. 2. The $250 invoice. Your audit starts the day payment clears. Three
            days after that, you&apos;ll have your report. — Thurr
          </p>
          <div className="hero-actions">
            <a className="stamp-button link-button" href="/#how-it-works">
              While you wait, here&apos;s how the build works →
              <ArrowUpRight size={18} strokeWidth={3} />
            </a>
          </div>
        </div>
        <aside className="audit-price-card">
          <span>AUDIT REQUEST RECEIVED</span>
          <strong>Review first</strong>
          <p>No blind build. No tool pile-up. No fake automation theater.</p>
        </aside>
      </section>
    </main>
  );
}

function AuditRequestForm({ auditForm, auditState, handleAuditSubmit, updateAuditField }) {
  return (
    <form className="buildout-form audit-request-form" onSubmit={handleAuditSubmit}>
      <label>
        Business name
        <input
          value={auditForm.businessName}
          onChange={(event) => updateAuditField('businessName', event.target.value)}
          placeholder="Business name"
          required
        />
      </label>
      <label>
        Owner name
        <input
          value={auditForm.ownerName}
          onChange={(event) => updateAuditField('ownerName', event.target.value)}
          placeholder="Your name"
          required
        />
      </label>
      <label>
        Email
        <input
          type="email"
          value={auditForm.email}
          onChange={(event) => updateAuditField('email', event.target.value)}
          placeholder="you@example.com"
          required
        />
      </label>
      <label>
        Business URL
        <input
          type="url"
          value={auditForm.businessUrl}
          onChange={(event) => updateAuditField('businessUrl', event.target.value)}
          placeholder="https://..."
          required
        />
      </label>
      <label>
        Approx. monthly lead volume
        <select
          value={auditForm.monthlyLeadsEstimate}
          onChange={(event) => updateAuditField('monthlyLeadsEstimate', event.target.value)}
          required
        >
          {auditLeadVolumes.map((volume) => (
            <option key={volume}>{volume}</option>
          ))}
        </select>
      </label>
      <label className="wide-field">
        Where do you think leads are slipping through?
        <textarea
          value={auditForm.frustrationText}
          onChange={(event) => updateAuditField('frustrationText', event.target.value)}
          rows={4}
          placeholder="Where do you think leads are slipping through?"
          required
        />
      </label>
      <button className="stamp-button wide-field" type="submit" disabled={auditState === 'sending'}>
        {auditState === 'sending' ? 'SENDING...' : 'Submit Audit Request'}
        <ArrowUpRight size={18} strokeWidth={3} />
      </button>
      {auditState === 'error' && (
        <p className="form-note error-note wide-field">
          Audit request could not be saved. Check the configured endpoint and try again.
        </p>
      )}
    </form>
  );
}

function CompliancePage({ setPage }) {
  const sections = [
    {
      title: 'TCPA',
      body:
        'Text and call workflows are gated by consent, opt-out language, and source review. We do not build homeowner blasting systems or treat purchased lists as permission to contact people.',
    },
    {
      title: 'HIPAA',
      body:
        'Healthcare and hospice engagements require a Business Associate Agreement before protected health information touches any workflow. We separate marketing intake from clinical or patient data by default.',
    },
    {
      title: 'COPPA',
      body:
        'Youth-facing projects are scoped with parent/guardian consent, data minimization, reviewer visibility, and strict AI exclusion rules before any production build.',
    },
    {
      title: 'Insurance',
      body:
        'Insurance marketing and follow-up are reviewed against carrier, upline, TCPA, and state-specific constraints. Automations support process visibility; they do not replace licensed advice or compliance review.',
    },
  ];

  return (
    <main className="compliance-page" id="top" data-brand="thurr-solutions">
      <section className="compliance-hero">
        <div className="eyebrow">LEGAL &amp; COMPLIANCE</div>
        <h1>How we gate engagements.</h1>
        <p>
          Thurr Solutions builds practical automation systems, but regulated work gets reviewed
          before tools, prompts, forms, or follow-up sequences go live.
        </p>
      </section>
      <section className="compliance-grid" aria-label="Compliance stance">
        {sections.map((section) => (
          <article className="compliance-card" id={section.title.toLowerCase()} key={section.title}>
            <span>{section.title}</span>
            <p>{section.body}</p>
          </article>
        ))}
      </section>
      <section className="final-audit-cta compliance-cta">
        <div className="eyebrow">NEXT STEP</div>
        <h2>Start with the audit.</h2>
        <p>Compliance gates are part of the diagnostic, not a surprise after the build starts.</p>
        <button className="stamp-button link-button" type="button" onClick={() => setPage('audit')}>
          Run a Lead Flow Audit →
          <ArrowUpRight size={18} strokeWidth={3} />
        </button>
      </section>
    </main>
  );
}

function AboutTherranceSection() {
  return (
    <section className="founder-section" id="about-therrance">
      <img className="founder-watermark" src={monogram} alt="" aria-hidden="true" />
      <div className="founder-stamp">
        <span>Founder / Operator</span>
        <strong>
          <span className="founder-name-line">Therrance</span>
          <span className="founder-name-line">Carrothers</span>
        </strong>
      </div>
      <div className="founder-copy">
        <div className="eyebrow">ABOUT THERRANCE CARROTHERS</div>
        <h2>AI automation builder with finance, operations, and design-system instincts.</h2>
        <div className="founder-credential" aria-label="Careerist certification">
          Careerist Certified AI Automation Specialist
        </div>
        <p>
          Therrance Carrothers designs and deploys automation systems using n8n, LLMs, APIs,
          Supabase, and workflow logic that turns manual business processes into repeatable
          operating systems.
        </p>
        <p>
          His background blends AI automation, trucking operations, finance, lead intelligence,
          proposal automation, onboarding systems, and brand-aware UI design. Therrance is building
          the public Right Thurr buildout engine, while Thurr Solutions is the implementation arm
          behind client systems, diagnostic funnels, content assets, and private operator workflows.
        </p>
        <div className="founder-socials" aria-label="Therrance Carrothers social links">
          <a href={socialLinks.linkedin} target="_blank" rel="noreferrer">
            <Linkedin size={18} strokeWidth={3} />
            LinkedIn
          </a>
          <a href={socialLinks.instagram} target="_blank" rel="noreferrer">
            <Instagram size={18} strokeWidth={3} />
            Instagram
          </a>
          <a href={socialLinks.upwork} target="_blank" rel="noreferrer">
            <BriefcaseBusiness size={18} strokeWidth={3} />
            Upwork
          </a>
          <a href="mailto:hello@thurrsolutions.com">
            <Mail size={18} strokeWidth={3} />
            Email
          </a>
        </div>
      </div>
    </section>
  );
}

function BuildoutPlanPage({ form, updateField, handleSubmit, submissionState, currentStep, setPage }) {
  return (
    <main className="buildout-page" id="top">
      <section className="buildout-hero">
        <div className="hero-copy">
          <div className="eyebrow">LEAD SYSTEM AUDIT</div>
          <h1>Find the leak before you build.</h1>
          <p>
            Thurr reviews your website, lead path, follow-up, and current tools, then maps the
            simplest system worth building first.
          </p>
          <div className="hero-actions">
            <a className="stamp-button link-button" href="#buildout-form">
              START THE AUDIT
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
          <h2>Lead System Audit</h2>
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
          <h2 id="buildout-page-title">Tell us where leads come from now.</h2>
          <p>
            This gives enough context to diagnose the current path before recommending a website,
            workflow, AI assistant, or retainer.
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
          title="Growth Websites"
          text="Service pages, booking paths, inquiry forms, SEO metadata, and follow-up handoffs built around conversion."
        />
        <FlowCard
          icon={Zap}
          title="Automation Build"
          text="n8n workflows for forms, alerts, follow-up, summaries, and client-ready handoffs."
        />
        <FlowCard
          icon={Bot}
          title="AI Intake"
          text="AI assistants can qualify, summarize, and route leads when the workflow justifies the extra complexity."
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
        REQUEST THE AUDIT
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
        Thurr Autopilot Blueprint
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
          <span>THURR REPORT ENGINE</span>
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

      <article className="export-report-sheet" aria-label="Export-ready Thurr Autopilot Blueprint">
        <header className="export-report-cover">
          <div>
            <div className="eyebrow">Thurr Autopilot Blueprint</div>
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
              Approve the starter offer and let Thurr build the first lead-to-booking
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
          <p>Your blueprint shows what to build. Thurr builds the first system for you.</p>
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
    <section className="mission-feed-grid" aria-label="Thurr mission activity feed">
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
          <span>THURR ACTIVITY LOG</span>
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
    <section className="system-cockpit" aria-label="Thurr system workspace">
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
          Thurr keeps the workspace organized so the next build step is always visible.
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
    <section className="finance-command-grid" aria-label="Thurr finance command center">
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
    <section className="ai-orchestra-grid" aria-label="Thurr AI Engine orchestration">
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
              <input type="checkbox" defaultChecked={index === 0} aria-label={task} />
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
          <h2>Thurr builds the system. Client brands stay client-owned.</h2>
          <p>
            The same execution engine can power owned products, B2B services, and client
            diagnostics. The brand layer changes depending on who the system is for.
          </p>
        </div>
        <div className="brand-lane-grid">
          <article>
            <Target size={24} strokeWidth={3} />
            <h3>Thurr</h3>
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

function PrivacyPage({ setPage }) {
  const privacyRows = [
    ['What the audit form collects', 'Business name, owner name, email, website URL, approximate lead volume, and the operational lead-flow issue you describe.'],
    ['What not to submit', 'Do not submit patient health information, youth/minor private content, passwords, payment details, SSNs, insurance health details, or confidential customer records.'],
    ['How it is used', 'Audit submissions are used to review fit, prepare a first response, and create internal follow-up records for Thurr Solutions.'],
    ['Where it may route internally', 'A submission may create a private Supabase row, owner alert, Notion prospect record, and Linear review task. These systems are for internal operations only.'],
    ['Retention', 'Prospect records are kept only as long as needed for sales, delivery, compliance, and business recordkeeping. Delete requests can be sent by email.'],
  ];

  return (
    <main className="compliance-page" id="top" data-brand="thurr-solutions">
      <section className="compliance-hero">
        <div className="eyebrow">PRIVACY</div>
        <h1>How audit request data is handled.</h1>
        <p>
          This page explains the operational data boundary for Thurr Solutions audit requests.
          It is not a substitute for legal review, and the policy should be reviewed before
          public launch or paid traffic.
        </p>
      </section>
      <section className="compliance-grid" aria-label="Privacy handling">
        {privacyRows.map(([title, body]) => (
          <article className="compliance-card" key={title}>
            <span>{title}</span>
            <p>{body}</p>
          </article>
        ))}
      </section>
      <section className="final-audit-cta compliance-cta">
        <div className="eyebrow">CONTACT</div>
        <h2>Questions about your audit request?</h2>
        <p>Email Thurr Solutions directly before submitting regulated or sensitive information.</p>
        <a className="stamp-button link-button" href="mailto:hello@thurrsolutions.com">
          Email Thurr Solutions →
          <ArrowUpRight size={18} strokeWidth={3} />
        </a>
        <button className="text-link dark-link button-link" type="button" onClick={() => setPage('audit')}>
          Back to Lead Flow Audit →
        </button>
      </section>
    </main>
  );
}

const selectedWork = {
  'restore-c': {
    eyebrow: 'LIVE CLIENT',
    title: 'Restore-C — storm lead capture',
    body:
      'Live deployment for a residential contractor capturing storm-damage leads with instant routing. Case study in progress.',
    detail:
      'Restore-C is the real client proof point for contractor lead capture. The next useful add-on is a residential close-system presentation that shows the custom app experience without promising a giant enterprise platform.',
    status: 'Active retainer',
  },
  heartpathbloom: {
    eyebrow: 'SIGNED BUILD',
    title: 'HeartPathBloom — youth wellness MVP',
    body:
      'Phase 1 build for a youth-facing wellness product with COPPA scope, crisis-review guardrails, and owned production infrastructure.',
    detail:
      'This is the strongest signal that Thurr Solutions can handle more than a landing page. Keep all claims compliance-aware: no clinical promises, no minor data screenshots, and no public details beyond the approved scope.',
    status: 'In build, Phase 1',
  },
  'insurance-pipeline': {
    eyebrow: 'PIPELINE CONCEPT',
    title: 'Insurance lead pipeline — proposal concept',
    body:
      'A compliance-aware lead capture and follow-up concept for a licensed insurance agent: consent language, source tracking, response routing, and calendar handoff.',
    detail:
      'Use this as a forward-looking concept until the deal closes. It is stronger than a generic demo because it maps directly to the kind of client Thurr is pursuing, without implying a signed engagement.',
    status: 'Proposal-ready',
  },
};

function WorkPage() {
  return (
    <main className="b2b-home-page work-page" id="top" data-brand="thurr-solutions">
      <section className="audit-hero">
        <div className="eyebrow">SELECTED WORK</div>
        <h1>Selected work.</h1>
        <p>
          Real engagements and reference builds that show the mechanism: capture the lead,
          route it fast, and make the next action visible.
        </p>
      </section>

      <section className="field-notes-section" aria-label="Selected work">
        <div className="field-notes-grid">
          {Object.entries(selectedWork).map(([slug, item]) => (
            <a className="field-note-card work-card-link" href={`/work/${slug}`} key={slug}>
              <span>{item.eyebrow}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <strong>{item.status}</strong>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}

function WorkDetailPage({ slug, setPage }) {
  const item = selectedWork[slug] || selectedWork['restore-c'];

  return (
    <main className="b2b-home-page work-page" id="top" data-brand="thurr-solutions">
      <section className="audit-hero">
        <div className="eyebrow">{item.eyebrow}</div>
        <h1>{item.title}</h1>
        <p>{item.body}</p>
      </section>

      <section className="final-audit-cta">
        <div className="eyebrow">WORK NOTE</div>
        <h2>{item.status}</h2>
        <p>{item.detail}</p>
        <button className="text-link dark-link button-link" type="button" onClick={() => setPage('work')}>
          Back to selected work →
        </button>
      </section>
    </main>
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
