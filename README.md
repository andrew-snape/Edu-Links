# Edu Links

A Jekyll site of planning resources, organised by subject as link cards
(logo, link, description).

## Structure

- `_data/links.yml` — all the links, grouped by subject and then by
  sub-area (e.g. Maths → Warm Ups, Rich Tasks). Edit this file to add,
  remove or reorganise links; card logos are fetched automatically from
  each site's favicon unless a `logo:` URL is given.
- `_config.yml` — the `subjects` list controls the navigation and the
  order of subjects on the homepage.
- One page per subject at the repo root (`maths.md`, `literacy.md`,
  `class-utilities.md`, `research.md`, `pyp.md`, `christian-studies.md`),
  each using the `subject` layout to render its cards.

## Adding a new subject

1. Add an entry to `subjects:` in `_config.yml`.
2. Add a matching top-level key to `_data/links.yml`.
3. Add a page (e.g. `new-subject.md`) with front matter like:

   ```yaml
   ---
   layout: subject
   title: New Subject
   subject: new-subject
   icon: "🎨"
   permalink: /new-subject/
   ---
   ```

## Local development

```sh
bundle install
bundle exec jekyll serve
```

Then visit http://localhost:4000.

## Deployment

Pushing to `main` builds and deploys the site via the GitHub Actions
workflow in `.github/workflows/pages.yml`. In the repo settings, set
**Pages → Source** to **GitHub Actions**.
