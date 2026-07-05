# Components Overview

Reusable UI in [`src/components/`](../src/components/). Each is an `.astro` file — see [What is Astro?](../02-what-is-astro.md) for the three-part structure.

| Component | Doc | Purpose |
|-----------|-----|---------|
| `Navbar.astro` | [navbar-footer.md](navbar-footer.md) | Header navigation + mobile menu |
| `Footer.astro` | [navbar-footer.md](navbar-footer.md) | Footer contact + social |
| `SocialIcon.astro` | [navbar-footer.md](navbar-footer.md) | SVG icons |
| `OrderForm.astro` | [order-form.md](order-form.md) | Order request form + Formspree |
| `ReviewCard.astro` | [review-instagram.md](review-instagram.md) | Review quote card |
| `InstagramEmbed.astro` | [review-instagram.md](review-instagram.md) | Instagram profile embed |

## Props pattern

Components receive data from parent pages/layouts:

```astro
<Navbar site={site} />
<OrderForm site={site} products={products} />
<ReviewCard quote={review.quote} author={review.author} />
```

Child reads props via `Astro.props` in frontmatter.

## Client scripts

Only `Navbar` and `OrderForm` include `<script>` blocks for browser interactivity. Other components are static HTML.
