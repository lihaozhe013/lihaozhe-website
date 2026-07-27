/**
 * Language detection and persistence for multilingual Hugo site.
 *
 * - First visit: detect browser language, redirect to matching language homepage, save to localStorage.
 * - Subsequent visits: save current language to localStorage (no redirect).
 * - Language switch (via <select>): save choice to localStorage, then navigate.
 */
(function () {
  var STORAGE_KEY = 'preferred_lang';
  var BASE = '/lihaozhe-website/';

  function normalise(lang) {
    if (!lang) return '';
    lang = lang.toLowerCase();
    if (lang === 'zh' || lang.startsWith('zh-')) return 'zh-cn';
    if (lang === 'en' || lang.startsWith('en-')) return 'en';
    return '';
  }

  function currentLang() {
    var p = location.pathname;
    if (p.indexOf(BASE + 'zh-cn/') === 0 || p === BASE + 'zh-cn') return 'zh-cn';
    return 'en';
  }

  /* ---- Run on page load ---- */
  var saved = localStorage.getItem(STORAGE_KEY);

  if (saved && normalise(saved)) {
    // Returning visitor — just update localStorage to match current page
    localStorage.setItem(STORAGE_KEY, currentLang());
  } else {
    // First visit — detect from browser language and redirect if needed
    var browserLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
    var detected = normalise(browserLang);
    var cur = currentLang();

    if (detected && detected !== cur) {
      // Redirect to the same page under the detected language
      var p = location.pathname;
      var oldPrefix, newPrefix;

      if (cur === 'zh-cn') {
        oldPrefix = BASE + 'zh-cn/';
      } else {
        oldPrefix = BASE;
      }

      if (detected === 'zh-cn') {
        newPrefix = BASE + 'zh-cn/';
      } else {
        newPrefix = BASE;
      }

      var rest = p.slice(oldPrefix.length);
      var target = newPrefix + rest + location.search + location.hash;

      localStorage.setItem(STORAGE_KEY, detected);
      location.replace(target);
      return;
    }

    // No redirect needed — save current language
    localStorage.setItem(STORAGE_KEY, cur);
  }

  /* ---- Intercept language <select> to persist choice ---- */
  document.addEventListener('DOMContentLoaded', function () {
    var sel = document.getElementById('select-language');
    if (!sel) return;
    sel.removeAttribute('onchange');
    sel.addEventListener('change', function () {
      var opt = sel.options[sel.selectedIndex];
      var lang = opt ? normalise(opt.id) : '';
      if (lang) localStorage.setItem(STORAGE_KEY, lang);
      location.href = sel.value;
    });
  });
})();
