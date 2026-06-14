# Love, Ky Cakes — Handoff Plan

Complete checklist for handing the site from occasional technical help to Kylee (hosting, maintaining, and owning the business accounts). Written for the `cursor/sanity-live-merge` branch and later.

**Last updated:** June 2026 — CMS live on Netlify; transfer Sanity project `1bzd5noi` (not a new project) for ownership handoff.

---

## Current status

### Done (technical helper)

- [x] **CMS branch built** — `cursor/sanity-live-merge` wires the Astro site and order form to Sanity at build time
- [x] **Sanity schema** — **Site Settings** and **Products** (split from older single-document layout)
- [x] **Seed scripts** — `npm run sanity:seed:all` loads current live copy + chocolate cake product
- [x] **Production build passes** — `npm run build` succeeds on the CMS branch
- [x] **Studio deployed** — https://love-ky-cakes.sanity.studio/ (hostname: `love-ky-cakes`)
- [x] **Studio app ID pinned** — `sanity/sanity.cli.ts` includes `appId` so future `npm run sanity:deploy` runs skip the prompt
- [x] **CMS content seeded** — on project `1bzd5noi` / dataset `production` (helper's Sanity account for now)
- [x] **Order page** — product name, price, ingredients, and descriptions come from Sanity
- [x] **Handoff doc** — this file
- [x] **CMS branch merged** — `cursor/sanity-live-merge` merged into Netlify's production deploy branch
- [x] **Netlify deploy branch** — production deploys point at the CMS branch
- [x] **Netlify env vars** — `PUBLIC_SANITY_PROJECT_ID` and `PUBLIC_SANITY_DATASET=production` set; site redeployed
- [x] **Formspree form** — created on helper's account; URL pasted in Studio → **Site Settings** → **Formspree order endpoint** and published
- [x] **Order form UX** — submissions stay on-site with an inline thank-you (no redirect to formspree.io)

### Remaining (before Kylee owns everything)

- [ ] **Netlify ownership** — confirm site is on Kylee's Netlify team (transfer if still on helper's account — see [Netlify transfer](#netlify-transfer-to-kylees-account))
- [ ] **Sanity ownership** — **transfer** project `1bzd5noi` to Kylee's org (preferred — see [Sanity transfer](#sanity-transfer-to-kylees-account))
- [ ] **Formspree ownership** — change the Formspree login email from the helper's to `lovekycakes@gmail.com` (see [Formspree email transfer](#formspree-email-transfer))
- [ ] **Auto-rebuild webhook** — Netlify build hook + Sanity webhook (see Phase 4)
- [ ] **Custom domain** — point her purchased domain at the Netlify site (exact URL TBD — see [Custom domain setup](#custom-domain-setup))
- [ ] **End-to-end test** — publish a CMS edit → site rebuilds; submit test order → email arrives

### Temporary config (change at handoff)


| Item           | Current value                                                                | Target                                           |
| -------------- | ---------------------------------------------------------------------------- | ------------------------------------------------ |
| Sanity project | `1bzd5noi` (helper account) | Same ID — transfer ownership to Kylee's org |
| Studio URL | https://love-ky-cakes.sanity.studio/ | Same — no redeploy needed after transfer |
| Deploy branch | Configured in Netlify (CMS branch live) | Same unless branch strategy changes |
| Live URL | Netlify subdomain (e.g. `*.netlify.app`) | Her purchased custom domain (exact URL TBD) |
| Formspree account | Helper's email (form live in Sanity) | Login email = `lovekycakes@gmail.com` |
| Formspree URL  | Set in Site Settings (helper's account) | Same URL — no Sanity change needed after email transfer |


---

## Ownership model


| Service              | Owner                 | Why                                        |
| -------------------- | --------------------- | ------------------------------------------ |
| **Formspree**        | Kylee                 | Order emails go to her                     |
| **Sanity project**   | Kylee                 | She edits content long-term                |
| **Hosting + domain** | Kylee                 | She deploys and owns the live site         |
| **Technical helper** | Optional collaborator | Invited to Sanity or Netlify only when helping |


**Rule:** Anything that receives orders or controls the live site should be on Kylee's accounts before handoff is complete.

---

## What she's inheriting

- **Static Astro site** — builds to HTML at deploy time
- **Sanity CMS** with two content areas:
  - **Site Settings** — business info, homepage, about, reviews, order page copy, Formspree URL
  - **Products** — cakes (currently one chocolate cake; more can be added later)
- **Order form** — posts to Formspree; product name, price, and ingredients come from Sanity

**Important:** After editing content in Sanity, the live site only updates after a **rebuild** (automatic via webhook, or a manual deploy).

---

## Phase 0 — Before handoff (technical helper)

**Goal:** The CMS branch is ready to become production.

- [x] Merge `cursor/sanity-live-merge` into the branch the host deploys from
- [x] Confirm `npm run build` passes on that branch
- [ ] Confirm the live site still looks right after Netlify deploys the CMS branch (homepage, about, order form layout)

**Note:** If using the recommended [Sanity transfer](#sanity-transfer-to-kylees-account), project ID `1bzd5noi` stays the same — no changes to `sanity.env` or Netlify env vars.

**Deliverable for Kylee:** a working live site and this document.

---

## Phase 1 — Accounts (Kylee, ~30 min)

### 1A. Formspree

**Already done (helper):** Form created on the helper's Formspree account; form URL saved in Studio → **Site Settings** → **Formspree order endpoint** and published. The order page submit button is enabled.

**Remaining — transfer login to Kylee:** Formspree has no one-click "transfer account" like Sanity. Change the account's primary login email to hers so she owns the inbox and dashboard going forward. The form URL stays the same — nothing to change in Sanity.

See [Formspree email transfer](#formspree-email-transfer) (Phase 5) for step-by-step instructions.

**Verify (now):** Live `/order` page submit button works; test submission arrives at the notification email configured in Formspree.

**Verify (after transfer):** Kylee logs in at [formspree.io](https://formspree.io) with `lovekycakes@gmail.com` and sees the order form and submissions.

### 1B. Sanity

**Recommended: transfer the existing project** (`1bzd5noi`) rather than create a new one. Content, Studio, Netlify env vars, and webhooks already point at this project — transfer changes ownership only.

1. Kylee creates a free account at [sanity.io](https://sanity.io)
2. She creates an **organization** (e.g. "Love, Ky Cakes") at [sanity.io/manage/create-new-team](https://www.sanity.io/manage/create-new-team)
3. Helper transfers the project — see [Sanity transfer](#sanity-transfer-to-kylees-account)

**Verify:** Kylee logs in at [sanity.io/manage](https://sanity.io/manage) and sees **Bakery Site** (`1bzd5noi`) under her organization.

**Alternate (new project):** Only if transfer is not possible. Create a new project, update `sanity.env` and Netlify env vars, run `npm run sanity:seed:all`, and `npm run sanity:deploy` (update `appId` in `sanity/sanity.cli.ts` if prompted).

### 1C. Hosting (Netlify)

Kylee may already have a Netlify account and domain. Confirm:

- [ ] Hosting account is **hers** (not the helper's) — see [Netlify transfer](#netlify-transfer-to-kylees-account) if needed
- [ ] Custom domain connected — her purchased domain points at the Netlify site (see [Custom domain setup](#custom-domain-setup))
- [x] Production deploy branch configured for CMS (merged `cursor/sanity-live-merge`)

**To change deploy branch (Netlify):** Site configuration → Build & deploy → Continuous deployment → **Branch to deploy** → save → trigger deploy.

**Verify:** She can open the host dashboard and see the site and deploy history. Visiting her custom domain loads the Love, Ky Cakes site (not a Netlify placeholder or wrong page).

---

## Phase 2 — Connect Sanity to the repo (together, ~20 min)

**Who:** Kylee runs commands; the helper can screen-share or do the first pass.

**If transferring project `1bzd5noi` (recommended):** Phase 2 is largely **already done** — content seeded, Studio deployed, `sanity.env` and Netlify env vars set. Skip to Phase 3 after [Sanity transfer](#sanity-transfer-to-kylees-account).

### 2A. Update project config

**Skip if transferring** — project ID stays `1bzd5noi`.

Only needed for a **new** Sanity project. Edit `sanity.env` in the repo root:

```env
PUBLIC_SANITY_PROJECT_ID=<her-project-id>
PUBLIC_SANITY_DATASET=production
SANITY_DATASET=production
SANITY_STUDIO_DATASET=production
```

Commit and push.

### 2B. Install and log in

From the project root:

```bash
npm install
npm install --prefix sanity
npx sanity login
```

Log in with **Kylee's** Sanity account.

### 2C. Seed initial content

**Skip if transferring** — content already exists on `1bzd5noi`.

Only needed for a **new** Sanity project:

```bash
npm run sanity:seed:all
```

This creates:

- **Site Settings** — current live copy (about, homepage spotlight, contact, social, etc.)
- **Products** — one chocolate cake ($44, ingredients, etc.)

**Verify:** In [sanity.io/manage](https://sanity.io/manage) → her project → **Datasets** → `production` → **Documents**, she sees `siteSettings` and `product-chocolate-cake`.

### 2D. Deploy Sanity Studio

**Done** — Studio is live at https://love-ky-cakes.sanity.studio/. Only re-run if using a new Sanity project.

```bash
npm run sanity:deploy
```

The repo pins `appId` in `sanity/sanity.cli.ts` so redeploys do not prompt for the application ID.

**Verify:** She can open Studio, see **Site Settings** and **Products**, and edit a field without errors.

---

## Phase 3 — Connect hosting (Kylee, ~15 min)

### 3A. Environment variables

In the host dashboard → Site settings → Environment variables, add:


| Variable                   | Value                 |
| -------------------------- | --------------------- |
| `PUBLIC_SANITY_PROJECT_ID` | Her Sanity project ID |
| `PUBLIC_SANITY_DATASET`    | `production`          |


Redeploy after saving.

**Done:** Both vars are set on Netlify (currently `1bzd5noi` / `production`) and a redeploy has run.

**Verify:** Build logs show no Sanity config errors; the site builds successfully.

### 3B. Formspree in Sanity

**Done:** Formspree URL is in Studio → **Site Settings** → **Formspree order endpoint** and published.

**Verify:** The order page submit button is enabled (not grayed out with "Formspree is not configured").

### 3C. Test order end-to-end

1. Visit `/order` on the live site
2. Submit a test order (use a personal email)
3. Confirm Kylee receives the Formspree email
4. Delete or archive the test submission in Formspree

**Verify:** Email arrives with correct product name, price, and form fields.

### 3D. Custom domain

Connect Kylee's purchased domain so visitors use her URL instead of a Netlify subdomain. See [Custom domain setup](#custom-domain-setup).

**Verify:** Her domain and `www.` (if enabled) load the site with a valid SSL certificate.

---

## Phase 4 — Auto-rebuild on content changes (~10 min)

The Astro site reads Sanity at **build time**. Publishing in Studio does nothing on the live site until the host runs a new build. This phase connects **Sanity publish → Netlify rebuild**.

**Prerequisites:** Netlify deploy branch and env vars are correct; a manual deploy succeeds.

### 4A. Create a Netlify build hook

1. [app.netlify.com](https://app.netlify.com) → open the Love, Ky Cakes site
2. **Site configuration** → **Build & deploy** → **Build hooks** → **Add build hook**
3. **Name:** `Sanity publish`
4. **Branch to build:** same as production (`cursor/sanity-live-merge` or `main` after merge)
5. **Save** and copy the URL (e.g. `https://api.netlify.com/build_hooks/...`)

Keep this URL private — anyone with it can trigger builds.

**Optional sanity check:** Trigger the hook once from Netlify and confirm a deploy starts before wiring Sanity.

### 4B. Add Sanity webhook

1. [sanity.io/manage](https://sanity.io/manage) → her project → **API** → **Webhooks** → **Create webhook**
2. Configure:


| Field                 | Value                                           |
| --------------------- | ----------------------------------------------- |
| **Name**              | `Rebuild site on publish`                       |
| **URL**               | Netlify build hook from 4A                      |
| **Dataset**           | `production`                                    |
| **Trigger on**        | Create, Update, Delete                          |
| **Filter** (optional) | `_type in ["siteSettings", "product"]`          |
| **Include drafts**    | Off — only **published** changes should rebuild |


1. **Save**

If the Netlify site is **transferred** later, the build hook usually moves with it. If the hook URL changes, update this webhook in Sanity.

### 4C. Verify the loop

1. Studio → **Site Settings** → change something obvious (e.g. tagline) → **Publish**
2. Wait 2–5 minutes
3. Netlify → **Deploys** — new deploy triggered by build hook (not git push)
4. Hard-refresh live site — change should appear

**If it fails:** Check Sanity webhook **Attempts** tab; confirm env vars, deploy branch, and that you clicked **Publish** (not just saved a draft).

---

## Custom domain setup

Kylee has already purchased a custom domain (exact URL still TBD — use whatever she registered, e.g. `lovekycakes.com`). Point that domain at the Netlify site so the public URL matches the live site.

When the final domain is confirmed, update the codebase so sitemap and SEO use the same URL:

- `astro.config.mjs` → `site`
- `src/content/seo.ts` → `siteUrl`
- `public/robots.txt` → sitemap URL

Then commit, push, and trigger a Netlify redeploy.

### Where the domain lives

The domain may be registered at GoDaddy, Google Domains, Namecheap, Netlify, or elsewhere. Kylee should log in wherever she bought it — DNS changes happen there unless she moves DNS fully to Netlify.

### Steps (Netlify + DNS)

Replace `yourdomain.com` below with her actual domain.

1. [app.netlify.com](https://app.netlify.com) → open the Love, Ky Cakes site
2. **Domain management** → **Add a domain** → enter `yourdomain.com`
3. Optionally add `www.yourdomain.com` and set **Primary domain** to the version you want (usually the apex with www redirecting)
4. Netlify shows the DNS records needed. At Kylee's domain registrar, add or update:
   - **Apex (`yourdomain.com`):** A record → `75.2.60.5` (Netlify load balancer), *or* ALIAS/ANAME to `apex-loadbalancer.netlify.com` if the registrar supports it
   - **www (`www.yourdomain.com`):** CNAME → your site's Netlify subdomain (e.g. `something.netlify.app`)
5. Wait for DNS to propagate (often 15 minutes–48 hours)
6. In Netlify → **Domain management**, confirm **HTTPS** shows a certificate issued (Let's Encrypt — automatic once DNS is correct)

**Alternative:** In the registrar, change **nameservers** to Netlify's if using Netlify DNS — then manage all records inside Netlify → **Domain management** → **DNS**.

### Verify

- [ ] Her custom domain loads the bakery site
- [ ] Browser shows a padlock (valid SSL)
- [ ] Old Netlify URL still works or redirects to the custom domain (optional but tidy)
- [ ] `astro.config.mjs` and related files use the same domain (after URL is confirmed)

### If the domain was on another host

Remove old A/CNAME records pointing at a previous site or parking page before the new Netlify records take effect.

---

## Formspree email transfer

**Recommended over creating a new form.** The form URL is already in Sanity — changing the login email transfers ownership without touching the site.

Formspree does not have a formal account transfer like Sanity. Instead, change the account's **primary login email** to Kylee's address.

### Why email transfer (not a new account)

| | Change login email | Kylee creates new account |
|--|-------------------|---------------------------|
| Form URL in Sanity | **No change** | Must paste new URL and republish |
| Past submissions | Kept | Lost on old account |
| Order form on site | Keeps working | Broken until new URL is published |

### Prerequisites

- Kylee's email (`lovekycakes@gmail.com`) is **not** already the primary email on a different Formspree account
- Form notification email in Formspree is set to `lovekycakes@gmail.com` (Form → **Settings** → notification email)

### Steps

1. Kylee (or helper on her behalf) adds `lovekycakes@gmail.com` under Formspree → **Account** → **Linked emails**, if not already listed
2. Kylee opens the verification email from Formspree and confirms the address
3. In Formspree → **Account**, click **Change Email** and set `lovekycakes@gmail.com` as the primary login email
4. Kylee logs out; Kylee logs in with `lovekycakes@gmail.com` and sets her password
5. Helper confirms they can no longer access the account (or is removed if team access was added)

**Docs:** [Changing your account email](https://help.formspree.io/articles/account-management/changing-your-account-email)

### After transfer

- Form URL in Sanity stays the same — no republish or redeploy needed
- Kylee manages submissions at [formspree.io](https://formspree.io)
- Helper should not retain login access after handoff is complete

---

## Sanity transfer to Kylee's account

**Recommended over creating a new project.** ~5 minutes, no code or Netlify changes.

### Why transfer

| | Transfer `1bzd5noi` | New project |
|--|---------------------|-------------|
| Project ID | Stays the same | New ID — update `sanity.env`, Netlify, redeploy |
| Content & uploads | Kept | Re-seed; re-upload images |
| Studio URL | Unchanged | Redeploy; may need new `appId` |
| Netlify env vars | **No change** | Update + redeploy |

### Steps

1. Kylee has a Sanity account and an **organization** (not just a personal account)
2. Helper is **project administrator** on `1bzd5noi`
3. [sanity.io/manage](https://sanity.io/manage) → **Bakery Site** → **Settings**
4. Scroll to **Danger zone** → **Transfer ownership**
5. Select Kylee's organization → confirm
6. Kylee adds helper as **Editor** if ongoing help is needed; remove helper access when done

### After transfer

- Project ID remains `1bzd5noi` — `sanity.env` and Netlify env vars stay as-is
- Studio at https://love-ky-cakes.sanity.studio/ keeps working
- Kylee creates the Sanity webhook (Phase 4) under her org
- Helper loses project ownership (intended for handoff)

---

## Netlify transfer to Kylee's account

**Difficulty:** Easy — usually 10–15 minutes, no code changes, typically no downtime.

### Self-serve (preferred)

Works when the helper is an **Owner** on the current site team and an **Owner** or **Developer** on Kylee's Netlify team:

1. Kylee has a Netlify account (free is fine)
2. She invites the helper to her team temporarily
3. Helper: **Site configuration** → **General** → **Project information** → **Transfer project** → select Kylee's team
4. Remove helper from her team when done (optional)

### Via Netlify Support

If there is no shared team access, open a ticket at [netlify.com/support](https://www.netlify.com/support) with the site name, her domain, and Kylee's Netlify email. Usually 1–2 business days.

### After transfer

- Domain, SSL, env vars, and build hooks usually move with the site
- Sanity webhook URL only needs updating if the build hook URL changed

---

## Phase 5 — Final ownership cleanup (Kylee)

- [ ] Formspree login email is `lovekycakes@gmail.com` (not the helper's) — see [Formspree email transfer](#formspree-email-transfer)
- [ ] Sanity project `1bzd5noi` transferred to Kylee's organization (see [Sanity transfer](#sanity-transfer-to-kylees-account))
- [ ] Netlify site is on her team (see [Netlify transfer](#netlify-transfer-to-kylees-account))
- [ ] Custom domain points at the Netlify site (see [Custom domain setup](#custom-domain-setup))
- [ ] Build hook and Sanity webhook are configured and tested
- [ ] Bookmarks: Studio (https://love-ky-cakes.sanity.studio/), Netlify dashboard, Formspree inbox, her live site URL

**Optional:** Invite the technical helper to Sanity as **Editor** or Netlify as **Developer** when needed. Remove or downgrade access later if desired.

---

## Day-to-day guide for Kylee

### Edit website copy, hours, about page, reviews

1. Open Studio (deployed `*.sanity.studio` URL, or run `npm run sanity:dev` locally)
2. **Site Settings** → edit → **Publish**
3. Wait for auto-rebuild (~2–5 min) or trigger deploy manually

### Change cake price, name, or ingredients

1. Studio → **Products** → open the cake → edit → **Publish**
2. Wait for rebuild

### Add another cake later

1. Studio → **Products** → **Create new**
2. Fill name, slug, price, ingredients
3. Set **Available to order** = on
4. Set **Sort order** (lower = first)
5. **Publish** → rebuild

The order page shows a product picker when there is more than one active product.

### Receive orders

- Check email (Formspree notifications)
- Or log in to [formspree.io](https://formspree.io) → form → Submissions

### Upload photos (hero, about, gallery)

1. Studio → **Site Settings** → relevant image field
2. Upload image → **Publish** → rebuild

Uploaded images are served from Sanity CDN. Static images in `/public/images/` still work as fallbacks when no CMS image is set.

### Change Formspree URL

Studio → **Site Settings** → **Formspree order endpoint** → **Publish** → rebuild.

---

## Local dev reference


| Command                   | Purpose                                         |
| ------------------------- | ----------------------------------------------- |
| `npm run dev`             | Site at `localhost:4321`                        |
| `npm run sanity:dev`      | Studio at `localhost:3333`                      |
| `npm run build`           | Production build test                           |
| `npm run sanity:seed:all` | Reset CMS from defaults (careful on production) |
| `npm run sanity:deploy`   | Publish Studio to `*.sanity.studio`             |


After switching branches or editing `sanity.env`, restart dev servers.

Sanity project ID and dataset live in **`sanity.env`** at the repo root. Use **`.env`** only for optional secrets (see `.env.example`).

---

## Troubleshooting


| Problem                                       | Likely cause                                                               | Fix                                                                           |
| --------------------------------------------- | -------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Products empty; cake info under Site Settings | Old CMS data from before the schema split                                  | Run `npm run sanity:seed:all`, then hard-refresh Studio (`Cmd+Shift+R`)       |
| Spotlight fields empty in Studio              | Site Settings never re-seeded after schema update                          | Run `npm run sanity:seed:all` (safe to re-run; resets to defaults)            |
| Studio shows schema/validation errors         | Stale fields from old schema (e.g. `order.product`, `social.instagramUrl`) | Run `npm run sanity:seed:all` to replace documents with the current structure |
| Site shows old content                        | Rebuild didn't run                                                         | Check Sanity webhook and Netlify build hook; deploy manually                  |
| Publish in Studio, no Netlify deploy          | Webhook not set up or draft-only save                                      | Must click **Publish**; check Sanity webhook Attempts tab                     |
| Netlify deploys but site unchanged            | Wrong deploy branch                                                        | Set branch to `cursor/sanity-live-merge` (or merged branch)                   |
| Order button disabled                         | Formspree URL empty                                                        | Add URL in Site Settings → Publish → rebuild                                  |
| No order emails                               | Wrong notification email in Formspree or spam folder                       | Formspree → form → Settings → notification email; check spam folder           |
| Studio won't load                             | Wrong login or project                                                     | `npx sanity login` with her account; check `sanity.env`                       |
| Build fails                                   | Missing env vars on host                                                   | Set `PUBLIC_SANITY_PROJECT_ID` and `PUBLIC_SANITY_DATASET`                    |
| Custom domain shows wrong site or won't load  | DNS still pointing at old host or records not propagated                   | Update A/CNAME at registrar per [Custom domain setup](#custom-domain-setup); wait for DNS |
| Site works but CMS doesn't                    | Seed not run                                                               | `npm run sanity:seed:all` on her project                                      |
| Images broken after upload                    | Publish without rebuild                                                    | Publish in Studio, wait for webhook deploy                                    |


**Fallback:** If Sanity is down or misconfigured, the site still builds using defaults in `src/content/site.ts` and `src/content/products.ts`. The site won't go blank, but CMS edits won't appear until Sanity is fixed.

---

## Free tier limits (what Kylee should know)

Editing in Studio is effectively unlimited. The caps that matter for a small bakery:


| Service           | Free tier limit                                                   | Impact on this site                                                                 |
| ----------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| **Sanity**        | 10,000 documents; 1 dataset; 20 users                             | Nowhere near limits (~2 documents today)                                            |
| **Sanity Studio** | Hosted free at `*.sanity.studio`                                  | Already deployed                                                                    |
| **Netlify**       | ~300 credits/month (new plans); ~15 credits per production deploy | ~20 rebuilds/month if each publish triggers a deploy — batch edits and publish once |
| **Formspree**     | **50 submissions/month**                                          | Most likely limit to hit if orders pick up; upgrade ~$10/mo if needed               |


**Netlify note:** Each Sanity **Publish** → webhook → one deploy. Frequent tweak-and-publish sessions use credits faster than occasional edits.

**Formspree note:** When the monthly cap is hit, new order submissions are rejected until the next calendar month or she upgrades.

---

## Suggested timeline


| When             | What                                             | Status    |
| ---------------- | ------------------------------------------------ | --------- |
| **Done**         | CMS branch, seed, Studio deploy                  | Complete  |
| **Done**         | Netlify merge, deploy branch, env vars, redeploy | Complete  |
| **Next**         | Confirm live site; custom domain; Sanity transfer; Formspree email change; webhook | Remaining |
| **Day 1**        | Custom domain live; Sanity ownership transfer; Formspree email transfer; test order | Remaining |
| **Day 1–2**      | Webhook + verify auto-rebuild                    | Remaining |
| **Day 2**        | Netlify ownership cleanup                        | Remaining |
| **Ongoing**      | Kylee edits in Studio; help only when asked      | —         |


---

## One-page checklist

```
TECHNICAL (helper) — mostly done
[x] CMS branch built and pushed (cursor/sanity-live-merge)
[x] npm run build passes
[x] Studio deployed — https://love-ky-cakes.sanity.studio/
[x] Content seeded on project 1bzd5noi (temporary)
[x] Merge CMS branch to production deploy branch

[x] Formspree form created (helper account); URL in Site Settings
[x] Order form stays on-site after submit (no formspree.io redirect)

ACCOUNTS
[ ] Formspree — login email changed to lovekycakes@gmail.com
[ ] Sanity — transfer project 1bzd5noi to Kylee's org (preferred)
[ ] Netlify — site on Kylee's team (transfer if needed)

SANITY SETUP
[x] sanity.env — 1bzd5noi (unchanged after transfer)
[x] Content seeded on 1bzd5noi
[x] Studio URL bookmarked — love-ky-cakes.sanity.studio
[ ] Project ownership transferred to Kylee's org

HOSTING
[x] Production deploy branch configured (CMS live)
[x] PUBLIC_SANITY_PROJECT_ID set on Netlify
[x] PUBLIC_SANITY_DATASET=production set on Netlify
[ ] Custom domain added in Netlify + DNS updated at registrar
[ ] Custom domain loads the site with SSL
[ ] astro.config.mjs updated once final domain is confirmed
[ ] Deploy succeeds with CMS content — confirm live site looks right

FORMSPREE
[x] URL pasted in Site Settings → Formspree order endpoint
[x] Published + site rebuilt
[ ] Login email transferred to lovekycakes@gmail.com
[ ] Test order submitted and email received

AUTO-REBUILD
[ ] Netlify build hook created
[ ] Sanity webhook → build hook
[ ] Test edit in Studio appears on live site after rebuild

HANDOFF COMPLETE
[ ] All accounts owned by Kylee
[ ] She can edit content, receive orders, and deploy without help
```

