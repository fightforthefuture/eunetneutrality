---
---
/**
 *
 * @source: https://github.com/fightforthefuture/eunetneutrality
 *
 * @licstart  The following is the entire license notice for the
 *  JavaScript code in this page.
 *
 * Copyright (C) Fight for the Future
 *
 *
 * The JavaScript code in this page is free software: you can
 * redistribute it and/or modify it under the terms of the GNU
 * General Public License (GNU GPL) as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option)
 * any later version.  The code is distributed WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.
 *
 * As additional permission under GNU GPL version 3 section 7, you
 * may distribute non-source (e.g., minimized or compacted) forms of
 * that code without the copy of the GNU GPL normally required by
 * section 4, provided you include this license notice and a URL
 * through which recipients can access the Corresponding Source.
 *
 * @licend  The above is the entire license notice
 * for the JavaScript code in this page.
 *
 */

var language  = (window.navigator.userLanguage || window.navigator.language).toLowerCase(),
    iso       = language.substr(0, 2);

window.l10n || (window.l10n = {});

switch (iso) {
  {% for locale in site.data.l10n %}
    case '{{ locale.code }}':
      {% for keyval in locale %}window.l10n['{{ keyval[0] | upcase}}'] = '{{ keyval[1] | strip | replace: "'", "’" }}';
      {% endfor %}
      break;
  {% endfor %}

    default:
      {% for keyval in site.data.l10n[0] %}window.l10n['{{ keyval[0] | upcase}}'] = '{{ keyval[1] | strip | replace: "'", "’" }}';
      {% endfor %}
}

var fullPageTranslations = [
  {% for locale in site.data.l10n %}{% if locale.page_translation %}'{{ locale.code }}',{% endif %}{% endfor %}
];

if (fullPageTranslations.indexOf(iso) !== -1 && iso != 'en' && window.location.pathname == '/')
  window.location.replace('/' + iso + window.location.search);
