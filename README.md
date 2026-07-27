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
│   ├── js/
│   │   └── lang.js             # Browser language detection + localStorage persistence
│   └── avatar.svg
├── content/
│   ├── en/                     # English content (default language)
│   │   ├── _index.md           # Homepage
│   │   ├── pages/about.md
│   │   └── posts/              # Blog posts (each post is a leaf bundle: Post-Name/index.md)
│   └── zh-cn/                  # Chinese content (/zh-cn/ prefix)
│       ├── _index.md           # Chinese homepage (optional, falls back to i18n strings)
│       ├── pages/about.md      # (optional) Chinese about page
│       └── posts/              # (optional) Chinese posts — same directory names as English
├── i18n/
│   ├── en.yaml                 # English UI strings
│   └── zh-cn.yaml              # Chinese UI strings
├── layouts/
│   ├── index.html              # Custom homepage (i18n-enabled)
│   ├── _default/rss.xml        # Custom RSS template
│   └── partials/
│       ├── header.html         # Overridden: always-visible language switcher
│       └── custom-head.html    # Injects fonts.css, custom.css, lang.js, and KaTeX
├── static/
│   └── fonts/                  # Font files (Noto Serif, ZhuqueFangsong, Noto Serif SC)
├── themes/
│   └── hugo-blog-awesome/      # Theme (git submodule)
└── hugo.toml                   # Site config (multilingual, menus, params)
```

## Multilingual

The site supports **English** (default) and **Chinese** (`/zh-cn/`).

### How it works

- English pages are served from the root: `/posts/my-post/`
- Chinese pages are served under `/zh-cn/`: `/zh-cn/posts/my-post/`
- A language switcher dropdown appears on **every** page in the navigation bar
- For pages with translations, the switcher links to the translated version
- For pages without translations, the switcher links to the target language's homepage
- First-time visitors are auto-redirected based on browser language (via `assets/js/lang.js`)
- Language preference is saved in `localStorage` and persists across visits

### Adding a Chinese translation of a post

Create the corresponding file under `content/zh-cn/posts/` with the **same directory name** as the English version:

```bash
mkdir -p content/zh-cn/posts/My-Post
# Then create content/zh-cn/posts/My-Post/index.md with the Chinese content
```

Hugo automatically links translations by matching directory paths under each language's `contentDir`.

### Translating UI strings

Edit `i18n/en.yaml` and `i18n/zh-cn.yaml`. Each entry has an `id` and a `translation`. Hugo's `{{ i18n "id" }}` function looks up the string for the current language. If a key is missing from a language file, Hugo falls back to the default language.

### hugo.toml multilingual config

Each language has its own `contentDir`, `locale`, `label`, `title`, and menu entries:

```toml
[languages.en]
  contentDir = 'content/en'
  locale = 'en-us'
  label = 'English'
  ...
  [[languages.en.menu.main]]
    name = 'Posts'
    url = '/en/posts/'

[languages.zh-cn]
  contentDir = 'content/zh-cn'
  locale = 'zh-cn'
  label = '中文'
  ...
  [[languages.zh-cn.menu.main]]
    name = '文章'
    url = '/zh-cn/posts/'
```

Shared params (author, social links, webmanifest, etc.) live in the global `[params]` block.

## Fonts

Three font families are loaded via `assets/css/fonts.css`:

| Font           | Role                            | Weights                  |
| -------------- | ------------------------------- | ------------------------ |
| Noto Serif     | English body text               | 100–900, normal + italic |
| ZhuqueFangsong | Chinese body text               | Regular                  |
| Noto Serif SC  | Chinese fallback (CJK coverage) | 100–900                  |

Font files are served from `static/fonts/` via the URL prefix `https://lihaozhe013.github.io/lihaozhe-website/fonts/`.

## Updating the theme submodule

```bash
git submodule update --recursive --remote
```
