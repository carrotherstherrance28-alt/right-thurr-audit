# Follow-Up Automation Templates

These templates are starting points for diagnostic and buildout follow-up workflows. They should be re-skinned for each client and never sent blindly without checking tone, offer, sender identity, and compliance needs.

## Shared Automation Rules

- Keep messages short and human.
- Make the next step obvious.
- Do not over-automate sensitive moments.
- Stop follow-up when someone replies, books, opts out, or becomes a bad fit.
- Use the client's sender identity and reply-to.
- Log every sent message and status change in the CRM.
- Keep promises modest: no guaranteed revenue, rankings, approvals, or results.

## Meeting Thank-You

Trigger: meeting completed.

Subject:

```txt
Good talking with you today
```

Email:

```txt
Hey {{first_name}},

Good talking with you today.

The main thing I heard was: {{primary_problem}}.

The next best move is {{recommended_next_step}}. I will send over {{deliverable_or_summary}} by {{date_or_timeframe}}.

If anything important was missed, reply here and I will fold it in.

{{sender_name}}
```

CRM updates:

```txt
lead_status = meeting_completed
crm_tags = meeting-completed, follow-up-needed
last_activity_at = now()
```

## Diagnostic Delivered

Trigger: diagnostic report approved and sent.

Subject:

```txt
Your diagnostic is ready
```

Email:

```txt
Hey {{first_name}},

Your diagnostic is ready.

The biggest opportunity I found is {{biggest_opportunity}}.

The fastest win is {{fastest_win}}.

The report also maps the system I would build first: {{recommended_system}}.

You can reply here with questions, or book the next step here:
{{booking_link}}

{{sender_name}}
```

CRM updates:

```txt
lead_status = diagnostic_delivered
crm_tags = diagnostic-delivered, consult-invite-sent
last_activity_at = now()
```

## Post-Project Thank-You

Trigger: project marked complete.

Subject:

```txt
Thank you for trusting us with this
```

Email:

```txt
Hey {{first_name}},

Thank you for trusting us with {{project_name}}.

The system now helps with {{system_outcome_1}}, {{system_outcome_2}}, and {{system_outcome_3}}.

For the next week, keep an eye on {{thing_to_watch}}. If anything feels off, reply here and we will tighten it up.

Appreciate you,
{{sender_name}}
```

CRM updates:

```txt
lead_status = project_completed
crm_tags = project-completed, check-in-needed
last_activity_at = now()
```

## Referral Request

Trigger: project complete and client satisfied.

Subject:

```txt
Quick favor
```

Email:

```txt
Hey {{first_name}},

I am glad {{project_name}} is working well.

If someone you know is dealing with {{problem_solved}}, I would appreciate an intro.

The best fit is usually a business that has leads or operations moving, but too much still depends on manual follow-up.

You can forward this email or send them here:
{{referral_or_booking_link}}

Thank you again,
{{sender_name}}
```

CRM updates:

```txt
lead_status = referral_requested
crm_tags = referral-requested
last_activity_at = now()
```

## Deliverable Reminder

Trigger: client has not reviewed an important deliverable.

Subject:

```txt
Reminder to review {{deliverable_name}}
```

Email:

```txt
Hey {{first_name}},

Quick reminder to review {{deliverable_name}} when you get a chance:
{{deliverable_link}}

The main thing I need from you is {{specific_decision_or_feedback}}.

Once I have that, I can move to {{next_step}}.

{{sender_name}}
```

CRM updates:

```txt
lead_status = waiting_on_client
crm_tags = deliverable-reminder-sent
last_activity_at = now()
```

## No-Reply Diagnostic Nudge

Trigger: diagnostic delivered and no reply after 2-3 business days.

Subject:

```txt
Want me to map the next step?
```

Email:

```txt
Hey {{first_name}},

Wanted to bump this once.

Based on the diagnostic, I would start with {{recommended_system}} because it addresses {{biggest_leak}}.

If you want, I can map the build path and what it would take to get the first version live.

{{sender_name}}
```

CRM updates:

```txt
lead_status = follow_up_sent
crm_tags = diagnostic-follow-up-sent
last_activity_at = now()
```

