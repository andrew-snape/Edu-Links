# Edu Links

A Jekyll site of planning resources, organised by subject as link cards
(logo, link, description), with site-wide search.

## Structure

- `_data/links.yml` — all the links, grouped by subject and then by
  sub-area (e.g. `maths` → `warm_ups`, `rich_tasks`). Keys are
  `snake_case`; the layout turns them into readable headings (e.g.
  `fluency_and_number_facts` → "Fluency And Number Facts"). Each link
  needs `name`, `url` and `description`; card logos are fetched
  automatically from each site's favicon unless a `logo:` URL is given,
  and fall back to a letter tile if the favicon can't be loaded.
  **Edit this file to add, remove or reorganise links** — nothing else
  needs touching.
- `_config.yml` — the `subjects` list controls the navigation and the
  order of subjects on the homepage. `key` must match the corresponding
  top-level key in `_data/links.yml`; `slug` is the page's URL segment.
  The `acronyms` list keeps words like `ATL` and `PYP` correctly cased in
  auto-generated headings.
- `_includes/heading.html` — turns a snake_case key into a display
  heading, respecting `acronyms`.
- `_includes/card.html` — renders a single link card.
- `search.json` — a generated index of every link, used by the search box.
- `assets/js/search.js` — client-side search across all subjects. Purely
  progressive enhancement: without JavaScript you simply browse by page.
- One page per subject at the repo root (`maths.md`, `literacy.md`,
  `class-utilities.md`, `research.md`, `pyp.md`, `christian-studies.md`),
  each using the `subject` layout to render its cards.
- `index.md` — the homepage. Lists the subject tiles and a short "how to
  use" blurb explaining browsing vs. search; edit the blurb here if the
  wording needs to change.
- `_includes/footer.html` — the site footer: a "Last updated" date and a
  `© Andrew Snape` credit linking to
  [andrew-snape.github.io](https://andrew-snape.github.io/). Both the date
  and the copyright year are pulled from `site.time` (the Jekyll build
  time), so they refresh automatically on every deploy with no manual
  editing.

## Adding a new subject

1. Add an entry to `subjects:` in `_config.yml` (`key` = data key, `slug`
   = URL segment).
2. Add a matching top-level key to `_data/links.yml`.
3. Add a page (e.g. `new-subject.md`) with front matter like:

   ```yaml
   ---
   layout: subject
   title: New Subject
   subject: new_subject
   icon: "🎨"
   permalink: /new-subject/
   ---
   ```

## Local development

```sh
bundle install
bundle exec jekyll serve
```

Then visit http://localhost:4000/edsites/ (the `baseurl` in `_config.yml`
matches the deployed path, so local links behave the same as production).

## Deployment

Pushing to `main` builds and deploys the site via the GitHub Actions
workflow in `.github/workflows/pages.yml`, publishing to
https://andrew-snape.github.io/edsites/. Pull requests run the same build
as a check, without deploying.

One-time setup: in the repo settings, set **Pages → Source** to
**GitHub Actions**.

The workflow passes the Pages base path to Jekyll as `--baseurl`, so the
site works correctly when served from a project subpath such as
`/Edu-Links/`.
