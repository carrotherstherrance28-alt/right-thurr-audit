# Repo Organization

## Current Repos And Folders

### `/Users/thurr/thurnos-memory`

GitHub remote:

```text
git@github.com:carrotherstherrance28-alt/thurnos-memory.git
```

Role:

- Private operations memory
- n8n workflow knowledge
- automation logs
- internal Thurr Solutions operating context
- Maximax internship docs
- some early portfolio content
- some Thurr Solutions HTML pages

Recommendation:

Keep this repo as the internal operating brain. Do not use it as the public portfolio or public Right Thurr website repo.

Reason:

It contains operational context, workflow details, client context, local env files, and automation setup. Even with `.gitignore`, this repo should stay private and internal.

### `/Users/thurr/Documents/New project`

GitHub remote:

```text
none yet
```

Role:

- New Right Thurr product/brand repo
- product spec
- brand guide
- Claude Design prompts
- future website/app prototype

Recommendation:

Rename this folder to `right-thurr` and connect it to a new GitHub repo named `right-thurr`.

Suggested GitHub URL:

```text
https://github.com/carrotherstherrance28-alt/right-thurr
```

### `/Users/thurr/Documents/ThurrSolutions`

GitHub remote:

```text
none
```

Role:

- Local business/admin folder
- finance tracker
- templates
- client deliverables
- sensitive archive

Recommendation:

Do not turn this whole folder into a GitHub repo. It has client/admin/sensitive material. Keep it local or split only clean templates into a separate private repo later.

### `/Users/thurr/thurnos-memory/thurr-solutions`

GitHub remote:

```text
inside thurnos-memory repo
```

Role:

- Existing Thurr Solutions website/portfolio HTML drafts

Recommendation:

These pages can be copied into a future clean `thurr-solutions-site` repo or into the Right Thurr repo as references, but they should not make `thurnos-memory` the public website repo.

## Recommended Final Repo Setup

Use four clear buckets:

```text
thurnos-memory
Private operating brain, workflows, memory, internal automation context.

right-thurr
Public product/brand repo for Right Thurr website, brand guide, product spec, and future app prototype.

thurr-solutions-site
B2B services website for Thurr Solutions. Optional later; can start inside right-thurr.

therrance-portfolio
Personal portfolio repo for Therrance Carrothers: resume, case studies, projects, personal brand.
```

## What Belongs Where

### `thurnos-memory`

Belongs:

- n8n workflow notes
- automation memory
- client working context
- internal logs
- reusable prompts
- workflow JSON backups
- operating docs

Does not belong:

- public website source
- public portfolio source
- brand assets intended for clients/public
- exposed secrets

### `right-thurr`

Belongs:

- Right Thurr product spec
- Right Thurr brand guide
- logo sheets
- Claude Design prompts
- website copy
- app prototype
- merch and luggage tag mockups
- public-facing brand assets

Does not belong:

- client files
- n8n API keys
- private memory logs
- finance trackers

### `thurr-solutions-site`

Belongs:

- B2B services website
- service pages
- case studies approved for public use
- proposal-style brand language
- lead capture pages

Does not belong:

- internal client notes
- client contracts
- private workflow logs
- API keys

### `therrance-portfolio`

Belongs:

- personal bio
- resume
- internship case studies
- public project writeups
- selected screenshots
- links to Right Thurr and Thurr Solutions

Does not belong:

- private client data
- full internal memory system
- raw workflow credentials
- business finance files

## Recommended Next Actions

1. Keep `thurnos-memory` private and internal.
2. Rename `/Users/thurr/Documents/New project` to `/Users/thurr/Documents/right-thurr`.
3. Create a new GitHub repo named `right-thurr`.
4. Connect this folder to that GitHub repo.
5. Use this repo URL in Claude Design for Right Thurr brand and website work.
6. Later, create a separate `therrance-portfolio` repo for your personal portfolio.
7. Later, split Thurr Solutions into `thurr-solutions-site` if the B2B site grows beyond one page.

## Claude Design Repo Field

For Right Thurr brand work, use:

```text
https://github.com/carrotherstherrance28-alt/right-thurr
```

Use this only after creating that GitHub repo.

If the repo is not created yet, leave the GitHub field blank and upload the logo images directly.
