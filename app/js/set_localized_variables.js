---
---
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


