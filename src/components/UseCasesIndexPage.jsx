import React, { useMemo } from 'react';
import { ArrowUpRight } from 'lucide-react';

const useCases = [
  {
    slug: 'website-landlord',
    title: 'Website Landlord',
    description: 'Rank-and-rent lead flow explainer + copyable page outline.',
    tags: ['rebrandable', 'lead-flow', 'local-services'],
    time: '5–8 min read',
    page: 'usecase-website-landlord',
  },
  {
    slug: 'ai-lead-followup',
    title: 'AI Lead Follow-Up',
    description: 'Operator-controlled follow-up scripts, escalation rules, and booked handoff.',
    tags: ['rebrandable', 'follow-up', 'operator-safe'],
    time: '4–6 min read',
    page: 'usecase-ai-lead-followup',
  },
  {
    slug: 'missed-call-textback',
    title: 'Missed Call Textback',
    description: 'Recover missed calls with inbound-only textback + follow-up (operator-controlled).',
    tags: ['rebrandable', 'call-recovery', 'operator-safe'],
    time: '4–6 min read',
    page: 'usecase-missed-call-textback',
  },
  {
    slug: 'review-booster',
    title: 'Review Booster',
    description: 'One-ask review workflow with issue routing + referral follow-up (operator-controlled).',
    tags: ['rebrandable', 'reviews', 'operator-safe'],
    time: '4–6 min read',
    page: 'usecase-review-booster',
  },
  {
    slug: 'no-show-saver',
    title: 'No-Show Saver',
    description: 'Appointment confirmation + reminder workflow with reschedule/save path (operator-controlled).',
    tags: ['rebrandable', 'appointments', 'operator-safe'],
    time: '4–6 min read',
    page: 'usecase-no-show-saver',
  },
  {
    slug: 'estimate-follow-up',
    title: 'Estimate Follow-Up',
    description: 'Estimate follow-up cadence with guardrails + close outcome (operator-controlled).',
    tags: ['rebrandable', 'pipeline', 'operator-safe'],
    time: '4–6 min read',
    page: 'usecase-estimate-follow-up',
  },
  {
    slug: 'seasonal-reactivation',
    title: 'Seasonal Reactivation',
    description: 'Winback cadence for past customers with caps + opt-out (operator-controlled).',
    tags: ['rebrandable', 'winback', 'operator-safe'],
    time: '4–6 min read',
    page: 'usecase-seasonal-reactivation',
  },
  {
    slug: 'quote-qualifier',
    title: 'Quote Qualifier',
    description: 'Short qualifier form + routing rules + booked next step (operator-controlled).',
    tags: ['rebrandable', 'qualification', 'operator-safe'],
    time: '4–6 min read',
    page: 'usecase-quote-qualifier',
  },
  {
    slug: 'service-reminder',
    title: 'Service Reminder',
    description: 'Time-based reminder cadence + one CTA + guardrails (operator-controlled).',
    tags: ['rebrandable', 'retention', 'operator-safe'],
    time: '4–6 min read',
    page: 'usecase-service-reminder',
  },
  {
    slug: 'maintenance-plan-upsell',
    title: 'Maintenance Plan Upsell',
    description: 'Invite-to-plan workflow after a great job, with caps + stop rules (operator-controlled).',
    tags: ['rebrandable', 'retention', 'operator-safe'],
    time: '4–6 min read',
    page: 'usecase-maintenance-plan-upsell',
  },
  {
    slug: 'deposit-request',
    title: 'Deposit Request',
    description: 'Quote-accept → secure link → receipt + next step, with stop rules (operator-controlled).',
    tags: ['rebrandable', 'payments', 'operator-safe'],
    time: '4–6 min read',
    page: 'usecase-deposit-request',
  },
  {
    slug: 'financing-assist',
    title: 'Financing Assist',
    description: 'Quote-ready → financing options link + disclosure → booked next step (operator-controlled).',
    tags: ['rebrandable', 'payments', 'operator-safe'],
    time: '4–6 min read',
    page: 'usecase-financing-assist',
  },
  {
    slug: 'project-photo-proof',
    title: 'Project Photo Proof',
    description: 'Job complete → request 3 photos → permission reply (operator-controlled).',
    tags: ['rebrandable', 'marketing', 'operator-safe'],
    time: '4–6 min read',
    page: 'usecase-project-photo-proof',
  },
  {
    slug: 'parts-arrival-ping',
    title: 'Parts Arrival Ping',
    description: 'Part ordered → arrival update → schedule/confirm install, with stop rules (operator-controlled).',
    tags: ['rebrandable', 'status-updates', 'operator-safe'],
    time: '4–6 min read',
    page: 'usecase-parts-arrival-ping',
  },
  {
    slug: 'eta-update',
    title: 'On-the-Way ETA Update',
    description: 'En route trigger → one ETA update → confirm/reschedule/human routing (operator-controlled).',
    tags: ['rebrandable', 'status-updates', 'operator-safe'],
    time: '4–6 min read',
    page: 'usecase-eta-update',
  },
  {
    slug: 'referral-loop',
    title: 'Referral Loop',
    description: 'Positive signal → one ask → thank you + routing (operator-controlled).',
    tags: ['rebrandable', 'referrals', 'operator-safe'],
    time: '4–6 min read',
    page: 'usecase-referral-loop',
  },
  {
    slug: 'cancellation-save',
    title: 'Cancellation Save',
    description: 'Cancellation signal → one save offer → rebook/close, with stop rules (operator-controlled).',
    tags: ['rebrandable', 'appointments', 'operator-safe'],
    time: '4–6 min read',
    page: 'usecase-cancellation-save',
  },
  {
    slug: 'invoice-follow-up',
    title: 'Invoice Follow-Up',
    description: 'Invoice unpaid → one calm reminder + secure link → stop rules + human escalation (operator-controlled).',
    tags: ['rebrandable', 'payments', 'operator-safe'],
    time: '4–6 min read',
    page: 'usecase-invoice-follow-up',
  },
  {
    slug: 'appointment-prep',
    title: 'Appointment Prep Checklist',
    description: 'Day-before check-in → confirm + collect gate/parking/pets notes → stop rules + human routing (operator-controlled).',
    tags: ['rebrandable', 'appointments', 'operator-safe'],
    time: '4–6 min read',
    page: 'usecase-appointment-prep',
  },
  {
    slug: 'after-hours-triage',
    title: 'After-Hours Emergency Triage',
    description: 'After-hours inbound → safety-first triage message → schedule or human escalation (operator-controlled).',
    tags: ['rebrandable', 'after-hours', 'operator-safe'],
    time: '4–6 min read',
    page: 'usecase-after-hours-triage',
  },
  {
    slug: 'service-recovery-save',
    title: 'Service Recovery Save',
    description: 'Complaint/low-score signal → one apology + next step → fix lane or manager call-back (operator-controlled).',
    tags: ['rebrandable', 'retention', 'operator-safe'],
    time: '4–6 min read',
    page: 'usecase-service-recovery-save',
  },
  {
    slug: 'warranty-claim-intake',
    title: 'Warranty Claim Intake',
    description: 'Warranty claim → collect minimum evidence → human review routing → schedule repair or close (operator-controlled).',
    tags: ['rebrandable', 'retention', 'operator-safe'],
    time: '4–6 min read',
    page: 'usecase-warranty-claim-intake',
  },
  {
    slug: 'change-order-approval',
    title: 'Change Order Approval',
    description: 'Scope change → summarize → approve/decline → update invoice + schedule (operator-controlled).',
    tags: ['rebrandable', 'pricing', 'operator-safe'],
    time: '4–6 min read',
    page: 'usecase-change-order-approval',
  },
  {
    slug: 'job-kickoff-packet',
    title: 'Job Kickoff Packet',
    description: 'Deposit/yes → send kickoff packet → confirm access + prep → proceed (operator-controlled).',
    tags: ['rebrandable', 'onboarding', 'operator-safe'],
    time: '4–6 min read',
    page: 'usecase-job-kickoff-packet',
  },
  {
    slug: 'weather-delay-update',
    title: 'Weather Delay Update',
    description: 'Weather/crew delay → send calm window update → confirm or reschedule (operator-controlled).',
    tags: ['rebrandable', 'status-updates', 'operator-safe'],
    time: '4–6 min read',
    page: 'usecase-weather-delay-update',
  },
];

function formatTags(tags) {
  if (!Array.isArray(tags) || tags.length === 0) {
    return '';
  }

  return tags.join(' • ');
}

export function UseCasesIndexPage({ setPage }) {
  const cards = useMemo(() => useCases.filter((entry) => entry?.slug && entry?.title), []);

  return (
    <main className="usecases-index-page" id="top">
      <section className="usecases-index-shell" aria-labelledby="usecases-index-title">
        <aside className="usecases-index-sidebar">
          <div>
            <div className="eyebrow">Thurr Solutions</div>
            <h1 id="usecases-index-title">Use-cases you can copy + brand.</h1>
            <p>
              Pick a business model, skim the workflow, and grab the assets. Each use-case is written to be rebranded for a
              specific operator.
            </p>
          </div>

          <div className="usecases-index-sidebar-actions">
            <button className="btn btn-secondary" type="button" onClick={() => setPage?.('home')}>
              Back to site
            </button>
          </div>
        </aside>

        <div className="usecases-index-content">
          <div className="usecases-index-list" role="list">
            {cards.map((useCase) => (
              <article className="usecases-index-row" role="listitem" key={useCase.slug}>
                <div>
                  <div className="usecases-index-row-top">
                    <h2>{useCase.title}</h2>
                    <span className="usecases-index-pill">{useCase.time}</span>
                  </div>
                  <p>{useCase.description}</p>
                  <div className="usecases-index-tags">{formatTags(useCase.tags)}</div>
                </div>
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => setPage?.(useCase.page)}
                >
                  Open
                  <ArrowUpRight size={18} strokeWidth={3} />
                </button>
              </article>
            ))}

            <article className="usecases-index-row is-placeholder" role="listitem" aria-disabled="true">
              <div>
                <div className="usecases-index-row-top">
                  <h2>Coming next</h2>
                  <span className="usecases-index-pill">In progress</span>
                </div>
                <p>More copyable use-cases will appear here as they ship.</p>
                <div className="usecases-index-tags">curated • rebrandable • operator-safe</div>
              </div>
              <button className="btn btn-secondary" type="button" disabled>
                Locked
              </button>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
