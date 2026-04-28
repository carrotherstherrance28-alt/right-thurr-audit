# Right Thurr Product Spec

## Product Definition

Right Thurr turns an idea into a live business system, then shows the user what that system is doing.

The product should not feel like a passive dashboard. It should feel like a business-building machine that is actively creating, organizing, tracking, and reporting progress.

The user gives Right Thurr a business idea. Right Thurr creates a System with a blueprint, offer, landing page copy, first task list, activity log, money tracker, and next move.

## MVP Positioning

Right Thurr V1 helps local service side hustlers turn an idea into a trackable business system.

Primary example:

> "I want to start a mobile detailing business in Dallas."

Right Thurr turns that into:

- Business System: Dallas Mobile Detailing Engine
- Business blueprint
- Starter offer
- Landing page copy
- First action plan
- Activity feed
- Manual revenue tracker
- System status
- Next recommended move

## First Target User

The first user is a local service side hustler.

Examples:

- Mobile detailing
- Lawn care
- Cleaning
- Pressure washing
- Beauty services
- Handyman work
- Junk removal
- Local consulting

This user is ideal because the value is concrete: get leads, explain the offer, follow up, track money, and know what to do next.

## Product Promise

Give Right Thurr an idea. It turns it into a business system and shows every move it makes.

## MVP Scope

V1 should prove four things:

1. Input: the user tells Right Thurr what they want to build.
2. Build: AI generates the blueprint, offer, landing page copy, and first task list.
3. Operate: the system logs each meaningful action in an activity feed.
4. Track: the user can see status, next move, and money.

## Core Object: System

The app should call each business unit a System.

Avoid:

- Business
- Project
- Funnel
- Campaign

Use:

- System
- Engine
- Machine
- Build
- Next Move
- Activity
- Revenue

Each System includes:

- Blueprint
- Offer
- Landing Page
- Leads
- Automations
- Money
- Activity
- Next Moves

## Recommended App Navigation

Keep the first version focused:

- Start Build
- Command Center
- Systems
- Activity
- Money
- AI Engine

## Screen 1: Start Build

Purpose:

Capture the user's business idea and create the first System.

Primary UI copy:

> Tell us what you're building.

Fields:

- Business idea
- Location
- Target customer
- Service type
- Starting budget
- Goal
- Experience level

Recommended starter business types:

- Local service funnel
- Digital product
- Lead generation

For V1, prioritize local service funnel.

Backend logic:

- Save onboarding answers.
- Create new System record.
- Send answers to Business Architect Agent.
- Generate blueprint.
- Generate offer.
- Generate landing page copy.
- Generate first task list.
- Write each step to Activity Log.

Primary agent:

- Business Architect Agent

Agent job:

Turn the user's idea into a structured business model.

## Screen 2: Building System

Purpose:

Make the user feel the machine is actively working.

Primary UI copy:

> Building your system.

Progress states:

- Reading business idea
- Creating blueprint
- Drafting offer
- Writing landing page copy
- Creating first task list
- Setting next move
- System ready

Backend logic:

- Run the generation sequence.
- Save generated assets to database.
- Update System build status.
- Write Activity Log records after each step.

Primary agent:

- Build Agent

Agent job:

Build the first version of the business assets.

## Screen 3: Command Center

Purpose:

Show the user the current health and movement of their System.

Primary UI signals:

- Autopilot Status: Active
- System Build: 78%
- Revenue: $0
- Tasks Completed: 6
- Issues Found: 0
- Next Move: Approve landing page copy

Recommended sections:

- Status strip
- Current System card
- Next Move panel
- Recent Activity
- Money snapshot
- Agent status

Backend sources:

- System records
- Activity Log
- Task records
- Manual revenue entries
- Agent task history

Primary agent:

- Operator Agent

Agent job:

Watch the System and explain what happened.

## Screen 4: Systems

Purpose:

Show every System the user is building or operating.

Example System card:

> Dallas Mobile Detailing Engine
>
> Status: Live
>
> Revenue: $427
>
> Last Action: Landing page copy drafted
>
> Next Move: Approve offer

System statuses:

- Building
- Live
- Needs Review
- Paused
- Issue Found

Backend logic:

- Each System has its own workspace.
- Store generated assets by System ID.
- Store activity, revenue, and task history by System ID.

Primary agent:

- System Manager Agent

Agent job:

Keep each business system organized and running.

## Screen 5: Activity

Purpose:

Make the product feel alive.

Primary UI copy:

> What your system did today.

Example feed:

- 10:42 AM - Created business blueprint
- 11:15 AM - Drafted starter offer
- 12:03 PM - Wrote landing page headline
- 1:20 PM - Created first task list
- 2:44 PM - Logged $327 in new revenue

Activity Log fields:

- timestamp
- system_id
- agent_name
- action_type
- summary
- status
- revenue_impact

Statuses:

- Completed
- Running
- Needs Approval
- Failed

Backend rule:

Every meaningful workflow and agent action should write to the Activity Log.

This is one of the most important parts of the app.

## Screen 6: Money

Purpose:

Track early revenue without requiring complex integrations in V1.

V1 metrics:

- Revenue
- Expenses
- Profit
- Payouts
- Projected monthly revenue

V1 input:

- Manual revenue entry
- Manual expense entry
- Category
- System
- Notes

Later integrations:

- Stripe
- PayPal
- Square
- Shopify
- Gumroad
- Printify
- Printful

Primary agent:

- Finance Agent

Agent job:

Explain where money came from and what needs attention.

## Screen 7: AI Engine

Purpose:

Show the user that Right Thurr has an active AI operations layer.

Primary UI signals:

- AI Engine: Active
- Current Mission: Build local service funnel
- Model: Hermes / LLaMA / Qwen
- Tasks Completed Today: 12
- Queue: 3 pending

Connected systems:

- Ollama local server
- Agent memory
- Task queue
- System records
- Activity Log
- Generated files

Agents:

- Orchestrator Agent
- Business Architect Agent
- Build Agent
- Research Agent
- Copy Agent
- Finance Agent
- Operator Agent

Simple architecture:

```text
User Request
-> App Backend
-> Orchestrator Agent
-> Specialized Agent
-> Ollama Model
-> Tool or API Action
-> Database Update
-> Activity Log
-> UI Update
```

## Recommended Backend Stack

Frontend:

- Web app first
- Mobile later

Backend:

- Supabase
- Postgres
- Supabase Auth
- Supabase Storage

Automation layer:

- n8n

AI layer:

- Ollama
- Local models such as Hermes, LLaMA, and Qwen Coder

Agent layer:

- Orchestrator Agent
- Specialized agents

Storage:

- Postgres records
- File storage
- Vector memory later

Integrations later:

- Stripe
- Google Sheets
- Airtable
- Gmail
- Slack
- Twilio
- Shopify
- Printify
- Webhooks

## MVP Backend Flow

```text
User fills onboarding form
-> Backend creates System
-> AI generates business blueprint
-> AI generates offer
-> AI generates landing page copy
-> AI creates first task list
-> Backend logs each action
-> Dashboard shows System status
-> Activity feed shows what happened
-> Money screen tracks manual revenue
```

## Suggested Database Tables

systems:

- id
- user_id
- name
- type
- status
- location
- target_customer
- current_mission
- next_move
- build_progress
- created_at
- updated_at

system_assets:

- id
- system_id
- asset_type
- title
- content
- status
- created_by_agent
- created_at

activity_logs:

- id
- system_id
- agent_name
- action_type
- summary
- status
- revenue_impact
- created_at

tasks:

- id
- system_id
- title
- description
- status
- priority
- assigned_agent
- due_at
- created_at

money_entries:

- id
- system_id
- entry_type
- amount
- category
- source
- notes
- created_at

agent_runs:

- id
- system_id
- agent_name
- mission
- status
- input
- output_summary
- started_at
- completed_at

## Demo Story

The first demo should use this scenario:

> I want to start a mobile detailing business in Dallas.

Right Thurr creates:

- Dallas Mobile Detailing Engine
- Business blueprint
- Starter offer
- Landing page headline and copy
- First 7 tasks
- Activity history
- Next move
- Manual revenue tracker

The dashboard should show:

- Autopilot Status: Active
- System Built: 78%
- Next Move: Approve landing page copy
- Revenue: $0
- Tasks Completed: 6
- Issues Found: 0

## Voice And UI Language

The product should sound confident, practical, and alive.

Use:

- Tell us what you're building.
- Building your system.
- Your machine is running.
- System Status: Live
- Next Move Ready
- Revenue Logged
- Agent completed task
- Issue found
- Needs your approval
- Blueprint generated
- Offer drafted
- Page copy ready

Avoid:

- Generic dashboard language
- Overly futuristic AI language
- Fake hype
- Complicated automation jargon

## Visual Direction

The app should feel like:

> A serious business machine with a bold local-brand personality.

Recommended mix:

- Gritty entrepreneurial
- Clean command center
- Small western details

Use brand flavor in:

- Logo
- Headings
- Badges
- Borders
- System stamps
- Empty states

Keep operational screens clean and usable.

## Logo Evaluation Checklist

When reviewing logos, ask:

- Does it feel like a business-building machine?
- Does it communicate movement or direction?
- Can the mark work as an app icon?
- Does the R+T monogram feel ownable?
- Does it match a bold local entrepreneur brand?
- Does it avoid looking too corporate?
- Does it avoid looking too cartoon western?
- Does it pair well with dashboard UI?
- Would it look good as a stamp, badge, or system status mark?

Best logo direction:

- Directional arrow
- R+T monogram
- Bold border
- Hand-drawn western accent
- Practical, not gimmicky

## What Not To Build First

Do not build all integrations in V1.

Delay:

- Full Stripe integration
- PayPal integration
- Shopify integration
- SMS automation
- Lead scraping
- Email sending
- Printify and Printful
- Full vector memory
- Multi-agent marketplace
- Advanced analytics

These can come after the core System loop works.

## V1 Success Criteria

The first version succeeds if it proves:

> Right Thurr can take an idea, turn it into a business system, and show the user what it is doing.

The product is not the logo.

The product is not the dashboard.

The product is the machine.
