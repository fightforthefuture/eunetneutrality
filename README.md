# Save EU Net Neutrality!

This repository contains the source code for the [SaveNetNeutrality.eu][1]
website and embeddable widgets. The site is built using HTML and Jekyll, and
hosted on Github Pages. Read on for instructions on setting up your own
development environment, translating the site, and more information on
customizing the widget!

----

## Embed the widget on your site

If you have a site, you can run our widget to help drive EU citizens to take
action on Net Neutrality! It's as easy as dropping one line of code on your
page.

### Banner Widget

Place this code on your page before the closing `</BODY>` tag:

```html
<script src="https://www.savenetneutrality.eu/widget.js"></script>
```
![Banner Widget](https://www.savenetneutrality.eu/images/example-banner.png)

### Banner Widget (dark theme)

Place this code on your page before the closing `</BODY>` tag:

```html
<script type="text/javascript">
var _cd_options = { theme: 'dark' };
</script>
<script src="https://www.savenetneutrality.eu/widget.js"></script>
```
![Banner Widget (dark)](https://www.savenetneutrality.eu/images/example-banner-dark.png)

### Modal Widget

Place this code on your page before the closing `</BODY>` tag:

```html
<script type="text/javascript">
var _cd_options = { animation: 'modal' };
</script>
<script src="https://www.savenetneutrality.eu/widget.js"></script>
```
![Modal Widget](https://www.savenetneutrality.eu/images/example-modal.png)

### Customizing the widget text

You can customize the text and button. Simply use the `_cd_options` hash and
specify the `widgetText` or `buttonText` properties. For example, to change the
text on the dark banner, do as follows:

```html
<script type="text/javascript">
var _cd_options = {
  theme: 'dark',
  widgetText: 'Save net neutrality lol',
  buttonText: 'Click here omg'
};
</script>
<script src="https://www.savenetneutrality.eu/widget.js"></script>
```

**NOTE:** If you're customizing because your language is not showing up, you
may wish to submit a translation to us instead, so we can still show the cool
countdown. See the section below on translating, if that interests you.

### How to set the widget to opt-out of mailing list signups

The [SaveNetNeutrality.eu][1] page has a checkbox to subscribe users to
[Fight for the Future][4]'s mailing list. If you prefer this box to be unchecked
by default, define the `_cd_options` hash and set the `defaultOptout` parameter
to `true`. Example:

```html
<script type="text/javascript">
var _cd_options = {
  defaultOptout: true
};
</script>
<script src="https://www.savenetneutrality.eu/widget.js"></script>
```

### Important note about cookies!

The widget uses cookies to keep track of when the user closes it, so it doesn't
show up again. You'll need to have a note on your site about cookies to comply
with EU law. If this is a problem, we can release a version that doesn't use
cookies but will always display on every page. Just file a [Github Issue][2] if
this is something you want.

----

## Setting up a development environment

(This is only needed if you want to make changes to the site. If you just want
info on embedding the widget, skip this section.)

### Prerequisites:

* Ruby
* NodeJS
* A computer

### Running the development environment:

Simply clone the site to the folder of your choice. To install the dependencies
and start the server, run:

```
cp env.example .env
npm install
npm start
```

Then you can access the site at http://localhost:9047.

----

## Translating the site

The site and widget both support localized (translated) text. We need help
translating this into as many languages as possible, so please submit a Pull
Request if you can help. It's easy:

1. Edit the [l10n.yaml file][3] and follow the format to add a translation for
   your language. Use the correct [2 letter ISO locale code][5] for your
   language if it's not already on the list.

2. Copy the English homepage file (`/app/index.md`) into a file called
   `/app/_translations/LOCALE.md`, replacing `LOCALE` with the 2 letter code for
   your language (eg. `/app/_translations/es.md` for Spanish)

3. Translate all the language in the new page translation file you created.
   Make sure the text-related meta variables on top of this file are
   translated as well.

4. Once it's translated, make sure the `page_translation: true` is set in the
   `l10n.yaml` file for your language. This will automatically redirect the
   site to your page for visitors with your language.

2. Submit a [Pull Request][6] and we'll review and merge it in!


[1]: https://www.savenetneutrality.eu
[2]: https://github.com/fightforthefuture/eunetneutrality/issues
[3]: https://github.com/fightforthefuture/eunetneutrality/blob/master/app/_data/l10n.yaml
[4]: https://www.fightforthefuture.org
[5]: https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
[6]: https://github.com/fightforthefuture/eunetneutrality/pulls
