# OCMT — Website (4 pages)

- `index.html` — Home
- `about.html` — About
- `expeditions.html` — Expeditions
- `contact.html` — Contact
- `styles.css` — shared design system, variables documented at the top
- `script.js` — mobile menu, shared by all 4 pages
- `assets/hero.jpg` — your real expedition photo

## View it locally
Double-click `index.html` — no install needed.

## Update your live GitHub site
You already have the repo connected to GitHub Pages. To push these
updated files:

1. Go to your repo → **Add file → Upload files**
2. Drag in all 6 items (`index.html`, `about.html`, `expeditions.html`,
   `contact.html`, `styles.css`, `script.js`) **plus** the `assets` folder
   — drop them straight into the repo root, not inside a subfolder
3. Commit changes
4. Wait ~1 minute, then refresh your live URL

## Add a trip report
No code and no install. GitHub builds the pages by itself, about a minute after
the commit. The list, the language selector and the sitemap update on their own.

1. **Photos.** Upload them to `assets/reports/<date-name>/`, for example
   `assets/reports/2026-08-pico-de-orizaba/`. JPG, about 1800 px wide, under 500 KB each.
2. **Spanish and English first.** These are the two versions aimed at Google. Copy
   `_reports/_TEMPLATE.md` to `_reports/es/2026-08-20-pico-de-orizaba.md`
   (the date of the outing, then the name), fill in the fields and write the text.
3. **Delete the line `published: false`,** otherwise the report stays hidden.
4. **Put the translation in `_reports/en/`,** and in `_reports/it/` if you want Italian too,
   with exactly the same file name. A report that isn't translated still appears in
   the other languages' lists, marked with its language.
5. **Commit.**

- If a text field contains a colon, wrap it in quotes: `title: "Orizaba: the north face"`.
- `description` is the text shown on Google: one sentence of about 150 characters,
  with the name of the mountain and the route in it.
- If the page doesn't update, a field is probably badly written. Check the repo's
  **Actions** tab: the live site keeps the previous version until the build passes.
- Interface text in the three languages lives in `_data/report_langs.yml`.

**Before uploading files from your computer:** download the latest version first.
An older local copy of a page removes the "Trip Reports" link from its menu.

## Change colors or type
Open `styles.css`, first ~40 lines (`:root { ... }`). Every variable
has a comment explaining what it controls.

## Change text
All copy lives directly in each `.html` file, in plain English —
find the sentence, edit it, save.

## Still to fill in (search each file for "EDIT ME")
- A real email address: the site lists none for now, `hello@ocmt.com` belonged to another company
- Registration form link for the Summer Series, once you have one
