# the Fight for the Future / Center for Rights campaign boilerplate 

**CAMPAIGN AND WRITING PEOPLE READ HERE PLEASE**

- Generally, content is written in Markdown format. You can find documentation
for this wonderful plain text formatting syntax all over:
    - [daringfireball][07], the source of markdown
    - [github][08]'s docs are super easy to follow
    - [kramdown][09] documents some extra features we have available to us
- Any content that is blog-post-like in nature can be found in `app/_posts`.
- Any additional post should follow the naming convention
`YYYY-MM-DD-post-title.md`
- If the footer requires additional copy, you can add it in
`app/_includes/footer-extra-copy.md`
- If there’s text you need to update, but can't find, it might be hiding in
`app/_layouts/default.html` or `app/index.html`.
- If you are unclear on updating the html, ask a dev and we’re happy to help!

## For developers:

### Frameworks and libraries

- [Composer.js][02] JavaScript MVC
- [Jekyll][03]
- [Grunt.js][04]
- [Liquid templating language][05]

### Installing & running the server

- Install/switch to Ruby 2.2.2 (i recommend [rbenv][01])
- In `package.json`, update `"name"`, `"description"`, `"author"` and, using the
`username/repo` shorthand, update `"repository"`
- In `Gruntfile.js`, find the ports used for the local server (L102-103) and
change them to… something else. Try not to collide with existing projects in
case you ever want two servers running at once.
- `gem install bundler` if it’s not already installed
- `npm install` to install packages,
- `npm start` to run grunt (compiles assets, then watches for changes and
compiles those too.)
- A browser window will open pointed to the local server! 🎉

### Setting up Free Progress for social A/B testing

Free Progress employs a domain security token mechanism to whitelist new domains
automatically. This can be built into the deploy process for campaign sites.
The build task stored in `generate_fp_token.js` creates a file called
`dist/freeprogress.txt` which is a SHA256 hash of the Free Progress domain
security token concatenated with the site's CNAME. In order for this to work,
please do the following:

- Rename the `env.example` to `.env` (this is file is ignored via .gitignore)
- Edit the `FP_DOMAIN_SECURITY_TOKEN` export in `.env` to the correct value
  stored in the Free Progress environment.
- Load the `.env` file into your development environment (`source .env`)
- Also add `FP_DOMAIN_SECURITY_TOKEN` as a hidden environment variable in Travis

### Deploying

This boilerplate is set up to make travis autodeploys the easiest thing ever.
To set them up, enable builds at
https://travis-ci.org/$USERNAME/$REPO/settings/

#### Recommended setup:

General settings:

- [X] Build only if .travis.yml is present
- [X] Build pushes
- [ ] Limit concurrent jobs
- [X] Build pull requests

Environment variables:

- GH_REF: `github.com/$USERNAME/$REPO`
- GH_TOKEN: you can generate this at <https://github.com/settings/tokens>

So, assuming `deploy-ghpages.sh` is written correctly (lol front-end developer
writing bash) travis will build pull requests to make sure they don't break, but
only actually deploy when things are merged to master. SO DON'T COMMIT TO
UPSTREAM MASTER. (i'm looking at you, lyon.)

### Code Structure

#### CSS/Less

```
app/_less
├── base
│   ├── common.less
│   └── variables.less
├── components
│   ├── animation.less
│   └── typography.less
├── core.less
├── lib
│   └── reset.less
└── partials
    └── footer.less
```

- All Less files compiled and minified to `dist/css/core.css`
- When in doubt, make a new Less file and import it in `core.less`—there’s no
real performance hit as a result of good organization
- Don’t worry about browser prefixes. Grunt handles that too.

#### Javascript

- `js/main.js` will generally be used to contain the main page logic.
- `js/controllers` will contain all Composer controllers
- `js/models` is there for Composer models and collections
- `js/views` for Compser views. Use raw markup where you can, for speed.
- This all compiles down to `dist/js/core.js` via grunt, which also uglifies it
- If you’re adding a javascript file, make sure to add its path to the files
array around L167 of `Gruntfile.js`


### Implementing design

- [ ] TODO: design pattern library
- [ ] TODO: build pattern library
- [ ] TODO: launch pattern library
- [ ] TODO: link pattern library here

- Get the formal title, description, and planned URL from campaigner—use this to
make appropriate changes to `config.yml`
- Is this something that could be considered a stand-alone webapp? If so, check
out `app/_includes/apple-touch-icons.html` & include in `<head>` of
`app/_layouts/default.html`
- delete one of the footers from `app/_layouts/default.html` (fftf or fftfef).
if there is additional text to be added to the footer, use the markdown file at
`app/_includes/footer-extra-copy.md`

### Sample jekyll/liquid code

Cycle through markdown files in `_posts` directory

```liquid
{% for post in site.posts %}

# [{{ post.title }}](#{{ post.slug }})

<time datetime="{{ post.date | date_to_rfc822 }}"></time>

{{ post.content }}

{% endfor %}
```

[01]: https://github.com/sstephenson/rbenv
[02]: https://lyonbros.github.io/composer.js/
[03]: http://jekyllrb.com/docs/home/
[04]: http://gruntjs.com/getting-started
[05]: https://github.com/Shopify/liquid/wiki/Liquid-for-Designers

[07]: http://daringfireball.net/projects/markdown/syntax
[08]: https://help.github.com/articles/markdown-basics/
[09]: http://kramdown.gettalong.org/syntax.html
