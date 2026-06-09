# Love, Ky Cakes — Handoff Plan

Complete checklist for handing the site from occasional technical help to Kylee (hosting, maintaining, and owning the business accounts). Written for the `cursor/sanity-live-merge` branch and later.

---

## Ownership model

| Service | Owner | Why |
|---------|-------|-----|
| **Formspree** | Kylee | Order emails go to her |
| **Sanity project** | Kylee | She edits content long-term |
| **Hosting + domain** | Kylee | She deploys and owns the live site |
| **GitHub repo** | Kylee (or shared) | She can push/deploy without outside help |
| **Technical helper** | Optional collaborator | Invited to Sanity/GitHub only when helping |

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

- [ ] Merge `cursor/sanity-live-merge` into the branch the host deploys from
- [ ] Confirm `npm run build` passes on that branch
- [ ] Confirm the live site still looks right (homepage, about, order form layout)
- [ ] Replace project ID `1bzd5noi` in `sanity.env` if that is a personal Sanity project — Kylee should use **her** project ID before seeding

**Deliverable for Kylee:** a working branch, repo access, and this document.

---

## Phase 1 — Accounts (Kylee, ~30 min)

### 1A. Formspree

1. Go to [formspree.io](https://formspree.io) and sign up with `lovekycakes@gmail.com`
2. Create a new form (e.g. "Order requests")
3. Set notification email to her address
4. Copy the form URL: `https://formspree.io/f/xxxxxxxx`
5. **Do not** paste it into code — it goes in Sanity (Phase 3)

**Verify:** Formspree dashboard shows the form and "waiting for submissions."

### 1B. Sanity

1. Go to [sanity.io](https://sanity.io) and create a free account
2. Create a new project: **"Love, Ky Cakes"**
3. Note the **Project ID** from [sanity.io/manage](https://sanity.io/manage)
4. Use dataset **`production`** (default is fine)

**If content already exists in project `1bzd5noi`:** transfer ownership in Sanity → Project settings → Transfer. Otherwise start fresh on her project (recommended — the seed script has all current copy).

**Verify:** She can log in at sanity.io/manage and see her project.

### 1C. Hosting (if not already done)

Confirm she has:

- [ ] Hosting account (Netlify, Vercel, Cloudflare Pages, etc.)
- [ ] Domain pointed at the host (`lovekycakes.com`)
- [ ] Site connected to the GitHub repo
- [ ] Deploys from the correct branch

**Verify:** She can open the host dashboard and see the site and deploy history.

### 1D. GitHub

- [ ] Kylee has access to the repo (Owner or Admin)
- [ ] She knows which branch triggers production deploys

**Optional:** Invite the technical helper as a collaborator when needed.

---

## Phase 2 — Connect Sanity to the repo (together, ~20 min)

**Who:** Kylee runs commands; the helper can screen-share or do the first pass.

### 2A. Update project config

Edit `sanity.env` in the repo root:

```env
PUBLIC_SANITY_PROJECT_ID=<her-project-id>
PUBLIC_SANITY_DATASET=production
SANITY_DATASET=production
SANITY_STUDIO_DATASET=production
```

Commit and push (or edit in GitHub).

### 2B. Install and log in

From the project root:

```bash
npm install
npm install --prefix sanity
npx sanity login
```

Log in with **Kylee's** Sanity account.

### 2C. Seed initial content

```bash
npm run sanity:seed:all
```

This creates:

- **Site Settings** — current live copy (about, homepage spotlight, contact, social, etc.)
- **Products** — one chocolate cake ($44, ingredients, etc.)

**Verify:** In [sanity.io/manage](https://sanity.io/manage) → her project → **Datasets** → `production` → **Documents**, she sees `siteSettings` and `product-chocolate-cake`.

### 2D. Deploy Sanity Studio

```bash
npm run sanity:deploy
```

Choose a Studio hostname (e.g. `love-ky-cakes`). Bookmark the URL (e.g. `https://love-ky-cakes.sanity.studio`).

**Verify:** She can open Studio, see **Site Settings** and **Products**, and edit a field without errors.

---

## Phase 3 — Connect hosting (Kylee, ~15 min)

### 3A. Environment variables

In the host dashboard → Site settings → Environment variables, add:

| Variable | Value |
|----------|--------|
| `PUBLIC_SANITY_PROJECT_ID` | Her Sanity project ID |
| `PUBLIC_SANITY_DATASET` | `production` |

Redeploy after saving.

**Verify:** Build logs show no Sanity config errors; the site builds successfully.

### 3B. Formspree in Sanity

1. Open Studio → **Site Settings**
2. Paste the Formspree URL into **Formspree order endpoint**
3. **Publish**

Trigger a rebuild (next phase or manual deploy).

**Verify:** The order page submit button is enabled (not grayed out with "Formspree is not configured").

### 3C. Test order end-to-end

1. Visit `/order` on the live site
2. Submit a test order (use a personal email)
3. Confirm Kylee receives the Formspree email
4. Delete or archive the test submission in Formspree

**Verify:** Email arrives with correct product name, price, and form fields.

---

## Phase 4 — Auto-rebuild on content changes (Kylee, ~10 min)

Without this, she must manually redeploy after every Sanity edit.

### 4A. Create a build hook on the host

**Netlify:** Site settings → Build & deploy → Build hooks → Add build hook  
**Vercel:** Project settings → Git → Deploy Hooks → Create hook

Copy the webhook URL (e.g. `https://api.netlify.com/build_hooks/...`).

### 4B. Add Sanity webhook

1. [sanity.io/manage](https://sanity.io/manage) → her project → **API** → **Webhooks**
2. Create webhook:
   - **Name:** Rebuild site on publish
   - **URL:** Build hook from 4A
   - **Dataset:** `production`
   - **Trigger:** Create, Update, Delete (published documents)
   - **Filter (optional):** `_type in ["siteSettings", "product"]`

**Verify:**

1. Change something small in Studio (e.g. tagline) → **Publish**
2. Wait 2–5 minutes
3. Confirm the host shows a new deploy
4. Confirm the change appears on the live site

---

## Phase 5 — Final ownership cleanup (Kylee)

- [ ] Formspree account is hers (not the helper's)
- [ ] Sanity project is under her account/org
- [ ] Hosting and domain are hers
- [ ] `sanity.env` uses her project ID (not `1bzd5noi` unless that project was transferred to her)
- [ ] Build hook and Sanity webhook are configured
- [ ] Studio URL is bookmarked
- [ ] Host dashboard is bookmarked
- [ ] Formspree inbox is bookmarked

**Optional:** Invite the technical helper to Sanity as **Editor** and GitHub as **Collaborator** when needed. Remove or downgrade access later if desired.

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

| Command | Purpose |
|---------|---------|
| `npm run dev` | Site at `localhost:4321` |
| `npm run sanity:dev` | Studio at `localhost:3333` |
| `npm run build` | Production build test |
| `npm run sanity:seed:all` | Reset CMS from defaults (careful on production) |
| `npm run sanity:deploy` | Publish Studio to `*.sanity.studio` |

After switching branches or editing `sanity.env`, restart dev servers.

Sanity project ID and dataset live in **`sanity.env`** at the repo root. Use **`.env`** only for optional secrets (see `.env.example`).

---

## Troubleshooting

| Problem | Likely cause | Fix |
|---------|--------------|-----|
| Products empty; cake info under Site Settings | Old CMS data from before the schema split | Run `npm run sanity:seed:all`, then hard-refresh Studio (`Cmd+Shift+R`) |
| Spotlight fields empty in Studio | Site Settings never re-seeded after schema update | Run `npm run sanity:seed:all` (safe to re-run; resets to defaults) |
| Studio shows schema/validation errors | Stale fields from old schema (e.g. `order.product`, `social.instagramUrl`) | Run `npm run sanity:seed:all` to replace documents with the current structure |
| Site shows old content | Rebuild didn't run | Check Sanity webhook and host build hook; deploy manually |
| Order button disabled | Formspree URL empty | Add URL in Site Settings → Publish → rebuild |
| No order emails | Wrong Formspree account or email | Check Formspree form settings and spam folder |
| Studio won't load | Wrong login or project | `npx sanity login` with her account; check `sanity.env` |
| Build fails | Missing env vars on host | Set `PUBLIC_SANITY_PROJECT_ID` and `PUBLIC_SANITY_DATASET` |
| Site works but CMS doesn't | Seed not run | `npm run sanity:seed:all` on her project |
| Images broken after upload | Publish without rebuild | Publish in Studio, wait for webhook deploy |

**Fallback:** If Sanity is down or misconfigured, the site still builds using defaults in `src/content/site.ts` and `src/content/products.ts`. The site won't go blank, but CMS edits won't appear until Sanity is fixed.

---

## Suggested timeline

| When | What |
|------|------|
| **Day 1** | Phases 1–2: accounts, `sanity.env`, seed, deploy Studio |
| **Day 1** | Phase 3: host env vars, Formspree, test order |
| **Day 2** | Phase 4: webhook and verify auto-rebuild |
| **Day 2** | Phase 5: ownership cleanup |
| **Ongoing** | Kylee edits in Studio; help only when asked |

---

## One-page checklist

```
ACCOUNTS
[ ] Formspree — Kylee's account, form created
[ ] Sanity — Kylee's project created, project ID noted
[ ] Hosting — domain live, repo connected
[ ] GitHub — Kylee has access

SANITY SETUP
[ ] sanity.env updated with her project ID
[ ] npm run sanity:seed:all
[ ] npm run sanity:deploy — Studio URL bookmarked

HOSTING
[ ] PUBLIC_SANITY_PROJECT_ID set on host
[ ] PUBLIC_SANITY_DATASET=production set on host
[ ] Deploy succeeds

FORMSPREE
[ ] URL pasted in Site Settings → Formspree order endpoint
[ ] Published + site rebuilt
[ ] Test order submitted and email received

AUTO-REBUILD
[ ] Host build hook created
[ ] Sanity webhook → build hook
[ ] Test edit in Studio appears on live site after rebuild

HANDOFF COMPLETE
[ ] All accounts owned by Kylee
[ ] She can edit content, receive orders, and deploy without help
```
