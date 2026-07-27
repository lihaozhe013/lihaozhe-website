# lihaozhe-website

Haozhe Li's personal website built with [Hugo](https://gohugo.io/) and the [hugo-blog-awesome](https://github.com/hugo-sid/hugo-blog-awesome) theme. Deployed to GitHub Pages at `https://lihaozhe013.github.io/lihaozhe-website/`.

## Quick Start

```bash
# Clone with submodules (theme)
git clone --recurse-submodules https://github.com/lihaozhe013/lihaozhe-website.git
cd lihaozhe-website

# If you forgot --recurse-submodules
git submodule update --init --recursive

# Start dev server
hugo server -D
```

## Project Structure

```
lihaozhe-website/
├── assets/
│   ├── css/
│   │   ├── custom.css          # Global styles (font-family, layout, etc.)
│   │   └── fonts.css           # @font-face definitions (Noto Serif, ZhuqueFangsong, Noto Serif SC)
│   ├── avatar.svg
│   └── sass/                   # Theme SCSS (via submodule)
├── content/
│   ├── en/                     # English content (default language)
│   │   ├── _index.md           # Homepage
│   │   ├── pages/about.md
│   │   └── posts/              # Blog posts
│   └── zh-cn/                  # Chinese content (/zh-cn/ prefix)
│       ├── _index.md           # (optional) Chinese homepage
│       ├── pages/about.md      # (optional) Chinese about page
│       └── posts/              # (optional) Chinese posts
├── i18n/
│   ├── en.yaml                 # English UI strings
│   └── zh-cn.yaml              # Chinese UI strings
├── layouts/
│   ├── index.html              # Custom homepage (i18n-enabled)
│   ├── _default/rss.xml        # Custom RSS template
│   └── partials/
│       └── custom-head.html    # Injects fonts.css, custom.css, and KaTeX
├── static/
│   └── fonts/                  # Font files (Noto Serif, ZhuqueFangsong, Noto Serif SC)
├── themes/
│   └── hugo-blog-awesome/      # Theme (git submodule)
└── hugo.toml                   # Site config (multilingual, menus, params)
```

## Multilingual

The site supports **English** (default) and **Chinese** (`/zh-cn/`).

- English pages are served from the root (e.g. `/posts/my-post/`).
- Chinese pages are served under `/zh-cn/` (e.g. `/zh-cn/posts/my-post/`).
- Untranslated Chinese pages fall back to the English version automatically.
- A language switcher dropdown appears in the navigation bar.

### Adding a Chinese translation of a post

Create the corresponding file under `content/zh-cn/posts/`:

```bash
mkdir -p content/zh-cn/posts/My-Post
# Then create content/zh-cn/posts/My-Post/index.md with the Chinese content
```

### Translating UI strings

Edit `i18n/en.yaml` and `i18n/zh-cn.yaml`. Each entry has an `id` and a `translation`. Hugo's `{{ i18n "id" }}` function looks up the string for the current language.

### Multilingual config in hugo.toml

Menus and site name are defined per language under `[languages.en]` and `[languages.zh-cn]`. Shared params (author, social links, webmanifest, etc.) live in the global `[params]` block.

## Fonts

Three font families are loaded via `assets/css/fonts.css`:

| Font | Role | Weights |
|------|------|---------|
| Noto Serif | English body text | 100–900, normal + italic |
| ZhuqueFangsong | Chinese body text | Regular |
| Noto Serif SC | Chinese fallback (CJK coverage) | 100–900 |

Font files are served from `static/fonts/` via the URL prefix `https://lihaozhe013.github.io/lihaozhe-website/fonts/`.

## Updating the theme submodule

```bash
git submodule update --recursive --remote
```
