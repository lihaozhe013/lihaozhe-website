# AGENTS.md

## Project Overview

This is a Hugo static site using the `hugo-blog-awesome` theme (git submodule). It is a bilingual personal website supporting English (default) and Chinese.

## Key Files

| File | Purpose |
|------|---------|
| `hugo.toml` | Site config: multilingual setup, menus, global params |
| `content/en/` | English content (default language, no URL prefix) |
| `content/zh-cn/` | Chinese content (URL prefix `/zh-cn/`) |
| `i18n/en.yaml` | English UI translation strings |
| `i18n/zh-cn.yaml` | Chinese UI translation strings |
| `assets/css/fonts.css` | All `@font-face` declarations (Noto Serif, ZhuqueFangsong, Noto Serif SC) |
| `assets/css/custom.css` | Global styles and font-family stack |
| `layouts/index.html` | Custom homepage template (uses `{{ i18n }}` for i18n) |
| `layouts/partials/custom-head.html` | Injects fonts.css, custom.css, and KaTeX into `<head>` |
| `layouts/_default/rss.xml` | Custom RSS template override |
| `themes/hugo-blog-awesome/` | Theme submodule |

## Multilingual Architecture

- **Default language**: English (`en`). Served from root, no URL prefix.
- **Chinese**: `zh-cn`. Served under `/zh-cn/`.
- `defaultContentLanguageInSubdir = false` in `hugo.toml` so English pages live at `/posts/...` not `/en/posts/...`.
- Menus are defined per language under `[languages.en.menu.main]` and `[languages.zh-cn.menu.main]` in `hugo.toml`.
- UI strings use Hugo's `{{ i18n "key" }}` function, defined in `i18n/en.yaml` and `i18n/zh-cn.yaml`.
- Untranslated Chinese pages automatically fall back to the English version.
- The theme's `partials/header.html` provides a language switcher dropdown (shown when `.IsTranslated` is true).

### Adding a new language

1. Add a `[languages.xx]` block in `hugo.toml` with `locale`, `label`, `title`, menu items, and params.
2. Create `i18n/xx.yaml` with translated UI strings.
3. Create `content/xx/` directory with translated content.

### Adding a Chinese post translation

```bash
mkdir -p content/zh-cn/posts/<post-slug>
# Create content/zh-cn/posts/<post-slug>/index.md
```

Hugo will automatically detect it and show the Chinese option in the language switcher for that post.

## Build & Dev

```bash
hugo server -D          # Dev server with drafts
hugo build              # Production build to public/
```

## Conventions

- Use `rg` (ripgrep) and `fd` instead of `grep` and `find` for searching locally.
- Do not modify files under `themes/` directly; override in the project's `layouts/` or `assets/` instead.
- Font CSS is split into `fonts.css` (all `@font-face` rules) and `custom.css` (styles) to keep files manageable.
- Custom CSS and fonts are injected via `layouts/partials/custom-head.html`, not by editing theme templates.
