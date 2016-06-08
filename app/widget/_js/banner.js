var animations = {
  banner: {
    options: {},

    init: function(options) {
      this.options = options;
      return this;
    },

    start: function() {

      if (this.options.theme == 'dark')
        document.body.className = 'dark';

      if (this.options.widgetText)
        document.querySelector('h1').textContent = this.options.widgetText;

      if (this.options.buttonText)
        document.getElementById('button').textContent = this.options.buttonText;

      document.getElementById('main').addEventListener('click', this.doClick.bind(this), false);
    },

    getUrl: function() {
      return sanitize(this.options.url)+'?from=banner';
    },

    doClick: function(e) {
      e.preventDefault();

      if (e.target == document.getElementById('close'))
        return sendMessage('stop');

      window.open(animations.banner.getUrl());
      trackLeaderboardStat({
        stat: 'click',
        data: animations.banner.getUrl(),
          callback: function() {}
      });
    }
  }
}
