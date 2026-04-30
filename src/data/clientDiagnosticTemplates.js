export const clientDiagnosticTemplates = {
  mobileDetailing: {
    eyebrow: 'Mobile Detailing Diagnostic',
    title: 'Find the first system your detailing business should build.',
    titleLines: ['Find the first', 'system your', 'detailing', 'business should', 'build.'],
    intro:
      'Review offer clarity, quote capture, response speed, proof, and follow-up. Then map the simplest workflow that turns more interest into booked jobs.',
    cta: 'Start Diagnostic',
    score: 68,
    scoreTitle: 'Opportunity Score',
    scoreText: 'Enough demand to grow, but the follow-up path needs a real system.',
    cards: [
      {
        label: 'Leak',
        title: 'Slow first reply',
        text: 'New quote requests wait too long before the owner responds.',
      },
      {
        label: 'Fix',
        title: 'Fast reply workflow',
        text: 'Send confirmation, notify the owner, and create a follow-up task.',
      },
      {
        label: 'Build',
        title: 'Quote-to-booking system',
        text: 'Capture the details needed to price and schedule the job.',
      },
    ],
    scorecard: [
      ['Offer clarity', '4/5'],
      ['Quote readiness', '3/5'],
      ['Speed to lead', '2/5'],
      ['Trust/proof strength', '3/5'],
      ['Follow-up reliability', '2/5'],
    ],
    intakeFields: [
      'Business name',
      'Website or social link',
      'Service area',
      'Main detailing offer',
      'Biggest lead problem',
      'Current booking method',
    ],
    systemSteps: [
      'Lead lands on diagnostic page',
      'n8n validates and saves the lead',
      'AI drafts a custom diagnostic',
      'Owner reviews the report',
      'Approved follow-up invites the prospect into the buildout conversation',
    ],
  },
};
