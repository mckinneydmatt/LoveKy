# Pages Index

Astro file-based routes in [`src/pages/`](../src/pages/). Each page uses `BaseLayout` and calls `getSite()` in frontmatter.

| Route | File | Doc |
|-------|------|-----|
| `/` | `index.astro` | [home.md](home.md) |
| `/order` | `order.astro` | [order.md](order.md) |
| `/about` | `about.astro` | [about.md](about.md) |
| `/contact` | `contact.astro` | [contact.md](contact.md) |
| `/reviews` | `reviews.astro` | [reviews.md](reviews.md) |

## Common pattern

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import { getSite } from "../lib/getSite";
import { pageDescriptions } from "../content/seo";

const site = await getSite();
const descriptions = pageDescriptions(site);
---

<BaseLayout title="PageName" description={descriptions.pagename}>
  <!-- sections -->
</BaseLayout>
```

See [What is Astro?](../02-what-is-astro.md) for frontmatter vs template.
