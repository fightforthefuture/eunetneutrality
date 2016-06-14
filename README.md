# Save EU Net Neutrality!

This repository contains the source code for the [SaveNetNeutrality.eu][1]
website and embeddable widgets. The site is built using HTML and Jekyll, and
hosted on Github Pages. Read on for instructions on setting up your own
development environment, translating the site, and more information on
customizing the widget!

----

## Embed the widget on your site!

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

### Customizing the text

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
npm install
npm start
```

Then you can access the site at http://localhost:9047.

----

## Translating the site

Right now, the widgets support localized (translated) text. We need help
translating this into as many languages as possible, so please submit a Pull
Request if you can help. It's easy:

1. Edit the [l10n.yaml file][3] and follow the format to add a translation for
   your language.

2. Submit a Pull Request and we'll review and merge it in!




[1]: https://www.savenetneutrality.eu
[2]: https://github.com/fightforthefuture/eunetneutrality/issues
[3]: https://github.com/fightforthefuture/eunetneutrality/blob/master/app/_data/l10n.yaml
