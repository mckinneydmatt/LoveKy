# ReviewCard and InstagramEmbed

---

## `ReviewCard.astro`

**Purpose:** Display one customer review as a styled blockquote card.

### Props (lines 2–8)

| Prop | Type | Purpose |
|------|------|---------|
| `quote` | string | Review text |
| `author` | string | Customer name |
| `isPlaceholder` | boolean | Shows "Placeholder" badge for draft reviews |

### Template (lines 11–30)

- Heart icon from `/icons/filled-heart-red.png` (static)
- Quote in italics with curly quotes
- Author as `<cite>`
- Placeholder badge with screen-reader text when `isPlaceholder`

**No client script** — pure static HTML.

**Data source:** `site.reviews` from Sanity Site Settings.

---

## `InstagramEmbed.astro`

**Purpose:** Embed Instagram profile widget on homepage.

### No frontmatter

Entire file is template + script. No Sanity connection.

### Template (lines 1–125)

Instagram oEmbed-style `<blockquote class="instagram-media">` with:

- Hardcoded profile URL: `https://www.instagram.com/love.kycakes/`
- Placeholder skeleton styling until Instagram JS loads
- Link text "View this profile on Instagram"

### Script (line 127)

```html
<script async src="https://www.instagram.com/embed.js" is:inline></script>
```

- **`async`** — load without blocking page
- **`is:inline`** — Astro directive: do not bundle; emit script tag as-is

Instagram's script transforms the blockquote into the live embed.

### To change the handle

Edit URLs in this file — not configurable in Sanity.

---

## See also

- [Home page](../07-pages/home.md)
- [Reviews page](../07-pages/reviews.md)
