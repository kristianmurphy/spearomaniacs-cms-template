# Storefront Template Sanity Studio

This Studio powers the headless CMS for the `../spearomaniacs-template` Next.js site.

## Run locally

```bash
npm run dev
```

## Content model (editor quick start)

Use this order:
1. Open **Site Settings** and fill tabs in order:
   - `Masthead`: hero title, tagline, background image, button label
   - `Shop`: select the `Shop Page` and optional card image/blurb
   - `Page Previews`: add cards for about/videos/other internal pages
   - `Social Links`: add YouTube/Instagram/Facebook/external cards
2. Open **Core Pages** and create/edit pages with slugs:
   - `shop`
   - `about`
   - `media`
3. Add any additional pages in **All Pages**.

The frontend homepage is fully driven by `Site Settings`.

## Printful import

The Studio includes an `Import Printful Products` pane.

By default it posts to:

```bash
http://localhost:3000/api/printful/import-products
```

If your storefront runs somewhere else, set:

```bash
SANITY_STUDIO_STOREFRONT_URL=http://localhost:3000
```

## Template setup

Before first use, create a local env file for the Studio with your own Sanity project values:

```bash
cp .env.example .env.local
```
