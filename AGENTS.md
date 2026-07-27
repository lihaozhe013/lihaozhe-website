# AGENTS.md

## Project Overview

This is a Hugo static site using the `hugo-blog-awesome` theme (git submodule). It is a bilingual personal website supporting English (default) and Chinese.

## Key Files

| File | Purpose |
|------|---------|
| `hugo.toml` | Site config: multilingual setup (with `contentDir` per language), menus, global params |
| `content/en/` | English content (default language, URL prefix: none) |
| `content/zh-cn/` | Chinese content (URL prefix: `/zh-cn/`) |
| `i18n/en.yaml` | English UI translation strings |
| `i18n/zh-cn.yaml` | Chinese UI translation strings |
| `assets/css/fonts.css` | All `@font-face` declarations (Noto Serif, ZhuqueFangsong, Noto Serif SC) |
| `assets/css/custom.css` | Global styles and font-family stack |
| `assets/js/lang.js` | Browser language detection + localStorage persistence |
| `layouts/index.html` | Custom homepage template (uses `{{ i18n }}` for i18n) |
| `layouts/partials/header.html` | Overridden: always-visible language switcher (replaces theme's version) |
| `layouts/partials/custom-head.html` | Injects fonts.css, custom.css, lang.js, and KaTeX into `<head>` |
| `layouts/_default/rss.xml` | Custom RSS template override |
| `themes/hugo-blog-awesome/` | Theme submodule |

## Multilingual Architecture

### URL Structure

- **English (default):** `/posts/my-post/` — no language prefix
- **Chinese:** `/zh-cn/posts/my-post/` — prefixed with `/zh-cn/`
- `defaultContentLanguageInSubdir = false` ensures English has no `/en/` prefix.

### Content Directory Mapping

Hugo requires `contentDir` per language in `hugo.toml`:

```toml
[languages.en]
  contentDir = 'content/en'
  ...

[languages.zh-cn]
  contentDir = 'content/zh-cn'
  ...
```

Without this, Hugo cannot detect the page language from the directory structure, and all pages render as the default language.

### Translation Linking

Hugo links translations by matching the same relative path under each language's `contentDir`:

- `content/en/posts/My-Post/index.md` ↔ `content/zh-cn/posts/My-Post/index.md`

Both files must have the same directory name. Hugo automatically detects them as translations.

### Language Switcher

The theme's default `header.html` only shows the language switcher when `.IsTranslated` is true (i.e. the current page has a translation in another language). This project overrides `layouts/partials/header.html` to:

1. **Always show** the language switcher on every page
2. For pages with translations: link to the translated page
3. For pages without translations: link to the target language's homepage

### Browser Language Detection (`assets/js/lang.js`)

The language detection script handles first-visit redirection and language persistence:

| Scenario | Behavior |
|----------|----------|
| First visit (no localStorage) | Detect `navigator.language`, redirect to matching language homepage, save to localStorage |
| Subsequent visits | Save current URL's language to localStorage, **no redirect** |
| User switches language via `<select>` | Save choice to localStorage, navigate to selected URL |

Key design decision: the script does **not** redirect on every page load. Language state is maintained by URL structure. The script only redirects on the very first visit to provide a good default, then stays out of the way.

### i18n Strings

UI strings use Hugo's `{{ i18n "key" }}` function, defined in `i18n/en.yaml` and `i18n/zh-cn.yaml`. If a key is missing from the current language file, Hugo falls back to the default language's value.

## Adding Content

### Adding a new language

1. Add a `[languages.xx]` block in `hugo.toml` with `contentDir`, `locale`, `label`, `title`, menu items, and params.
2. Create `i18n/xx.yaml` with translated UI strings.
3. Create `content/xx/` directory with translated content.

### Adding a Chinese post translation

```bash
mkdir -p content/zh-cn/posts/<post-slug>
# Create content/zh-cn/posts/<post-slug>/index.md
```

Hugo will automatically detect it and link it to the English version. The language switcher will show both options for that post.

### Translating the homepage

The homepage (`layouts/index.html`) uses `{{ i18n }}` for its text. To translate it:

1. Add the translation keys to `i18n/xx.yaml`
2. Optionally create `content/xx/_index.md` if you want markdown content to override the i18n strings

## Build & Dev

```bash
hugo server -D          # Dev server with drafts
hugo build              # Production build to public/
```

## Conventions

- Use `rg` (ripgrep) and `fd` instead of `grep` and `find` for searching locally.
- Do not modify files under `themes/` directly; override in the project's `layouts/` or `assets/` instead.
- Font CSS is split into `fonts.css` (all `@font-face` rules) and `custom.css` (styles) to keep files manageable.
- Custom CSS, fonts, and JS are injected via `layouts/partials/custom-head.html`, not by editing theme templates.
