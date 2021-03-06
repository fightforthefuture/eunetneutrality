(function(){ // :)

// Default URL for animation iframe. This gets overlay'ed over your page.
var defaultUrl = 'https://www.savenetneutrality.eu/widget';

/**
--------------------------------------------------------------------------------
CONFIGURATION OPTIONS
--------------------------------------------------------------------------------
These are default configuration values for the widget. You can override any of
these by pre-defining an object named _cd_options and setting the appropriate
properties as desired.
--------------------------------------------------------------------------------
*/

// The _cd_options object is created if it isn't already defined by you
if (typeof _cd_options == "undefined")
	_cd_options = {};

// The path to the iframe that gets injected over your page
if (typeof _cd_options.iframe_base_path == "undefined")
	_cd_options.iframe_base_path = defaultUrl;

// Which design to show, either "modal" or "banner" (see _cd_animations below)
if (typeof _cd_options.animation == "undefined")
	_cd_options.animation = 'banner';

// Usually a cookie is used to dismiss the widget. You can override here.
if (typeof _cd_options.always_show_widget == "undefined")
	_cd_options.always_show_widget = false;

// Should the widget default to opt-out users on the savenetneutrality.eu page?
if (typeof _cd_options.defaultOptout == "undefined")
  _cd_options.defaultOptout = true;

// What path to use for the cookie, using "/" by default.
if (typeof _cd_options.cookie_path == "undefined")
	_cd_options.cookie_path = "/";

// What domain to use for the cookie, using current domain by default but when
// having a multi-subdomain-site you might want to change this to ".domain.com"
// (this sets a cookie for all subdomains)
if (typeof _cd_options.cookie_domain == "undefined")
	_cd_options.cookie_domain = document.location.hostname;

/**
--------------------------------------------------------------------------------
ANIMATION DEFINITIONS
--------------------------------------------------------------------------------
Here's where the functionality and defaults for each of the animations (either
"modal" or "banner" to begin with). Each animation has its own options property,
which is an object containing default behaviors for that animation. These can be
overridden by passing the appropriately-named properties into the _cd_options
object (above). This will get merged over the defaults when init is called.
--------------------------------------------------------------------------------
*/

// THIS OBJECT (WILL) CONTAIN OUR ANIMATIONS
var _cd_animations = {

  // COMMON ANIMATION FUNCTIONALITY
  _base: {

    animationReady: function() {
      setTimeout(function() {
        document.getElementById('_cd_iframe').className = '_cd_visible';
      }, 100);
    },

    stop: function() {
      document.getElementById('_cd_iframe').className = '';
      _cd_util.setCookie('_COUNTDOWN_WIDGET_DISMISSED', 'true', 365);
      setTimeout(function() {
        _cd_util.destroyIframe();
      }, 750);
    }

  }
};

// BANNER ANIMATION
_cd_animations.banner =  {

	// Default options: Override these with _cd_options object (see above)
	options: {
		modalAnimation: 'banner',
		url: 'https://www.savenetneutrality.eu/',
    // widgetText: 'Making food is just like science, with tools that blend and baste. And every fun appliance gives the food a different taste.',
    // buttonText: 'Click here, lol',
    // theme: 'dark'
	},

	// init copies the _cd_options properties over the default options
	init: function(options) {
		for (var k in options) this.options[k] = options[k];
		return this;
	},

	// what to do when the animation starts
	start: function() {

		var css = '#_cd_iframe { width: 450px; height: 170px; position: fixed;     \
      right: 0px; bottom: 10px; -ms-transition: all .75s ease-in;              \
      -o-transition: all .75s ease-in; -moz-transition: all .75s ease-in;      \
      -webkit-transition: all .75s ease-in; transition: all .75s ease-in;      \
      opacity: 0; border-radius: 0px; z-index: 9001; }                         \
      @media screen and (min-width: 450px) {                                   \
      #_cd_iframe._cd_visible { opacity: 1; } }';
		_cd_util.injectCSS('_cd_iframe_css', css);

		var el = document.body;
		var iframe = _cd_util.createIframe(el, this.options.modalAnimation);
		_cd_util.bindIframeCommunicator(iframe, this);
	},

	// This animation has an anim
	animationReady: _cd_animations._base.animationReady,

	// This animation allows the user to close it
	stop: _cd_animations._base.stop
};

// MODAL ANIMATION
_cd_animations.modal = {

  // Default options: Override these with _cd_options object (see above)
  options: {
    modalAnimation: 'modal',
    url: 'https://www.savenetneutrality.eu/',
    // widgetText: 'Making food is just like science, with tools that blend and baste. And every fun appliance gives the food a different taste.',
    // buttonText: 'Click here, lol',
  },

  // init copies the _cd_options properties over the default options
  init: function(options) {
    for (var k in options) this.options[k] = options[k];
    return this;
  },

  // what to do when the animation starts
  start: function() {

    var css = 'body { height: 100%; } #_cd_iframe { width: 100%; height: 100%; \
      position: fixed; left: 0px; top: 0px; -ms-transition: all .75s ease-in;  \
      -o-transition: all .75s ease-in; -moz-transition: all .75s ease-in;      \
      -webkit-transition: all .75s ease-in; transition: all .75s ease-in;      \
      opacity: 0; border-radius: 0px; z-index: 9001; }                         \
      #_cd_iframe._cd_visible { opacity: 1; }';
    _cd_util.injectCSS('_cd_iframe_css', css);

    var el = document.body;
    var iframe = _cd_util.createIframe(el, this.options.modalAnimation);
    _cd_util.bindIframeCommunicator(iframe, this);
  },

  // This animation has an anim
  animationReady: _cd_animations._base.animationReady,

  // This animation allows the user to close it
  stop: _cd_animations._base.stop
};


/**
--------------------------------------------------------------------------------
UTILITY FUNCTIONS
--------------------------------------------------------------------------------
*/
var _cd_util = {

	// Inject CSS styles into the page
	injectCSS: function(id, css)
	{
		var style = document.createElement('style');
		style.type = 'text/css';
		style.id = id;
		if (style.styleSheet) style.styleSheet.cssText = css;
		else style.appendChild(document.createTextNode(css));
		document.head.appendChild(style);
	},

	// Create the iframe used to display the animation
	createIframe: function(el, animation) {
		var iframe = document.createElement('iframe');
		iframe.id = '_cd_iframe';
		iframe.src = _cd_options.iframe_base_path + '/' + animation + '/index.html';
		iframe.frameBorder = 0;
		iframe.allowTransparency = true;
    iframe.style.display = 'none';
		el.appendChild(iframe);
		return iframe;
	},

	// Destroy the iframe used to display the animation
	destroyIframe: function() {
		var iframe = document.getElementById('_cd_iframe');
		iframe.parentNode.removeChild(iframe);
	},

	// Sends / receives event messages to the iframe (IE9+)
	// Necessary because the iframe lives on a different domain and we can't
	// just call Javascript functions to/from it due to XSS protections.
	bindIframeCommunicator: function(iframe, animation) {
		var sendMessage = function(requestType, data)
		{
			data || (data = {});
			data.requestType = requestType;
			data.CD_WIDGET_MSG = true;
			data.HOST_NAME = hostname;
			iframe.contentWindow.postMessage(data, '*');
		}

		var method = window.addEventListener ? "addEventListener" : "attachEvent";
		var eventer = window[method];
		var messageEvent = method == "attachEvent" ? "onmessage":"message";

		var hostname = window.location.host.replace('www.', '');

		eventer(messageEvent,function(e) {
			if (!e.data || !e.data.CD_IFRAME_MSG)
				return;

			delete e.data.CD_IFRAME_MSG;

			switch (e.data.requestType) {
				case 'getAnimation':
					iframe.style.display = 'block';
					if (typeof animation.animationReady == "function")
						animation.animationReady();
					sendMessage('putAnimation', animation.options);
					break;
				case 'stop':
					animation.stop();
					break;
			}
		}, false);

	},

	// Set a cookie. Used to permanently dismiss the bottomBar widget.
	setCookie: function(name,val,exdays)
	{
		var d = new Date();
		d.setTime(d.getTime()+(exdays*24*60*60*1000));
		var path = "path="+_cd_options.cookie_path;
		var domain = "domain="+_cd_options.cookie_domain;
		var expires = "expires="+d.toGMTString();
		document.cookie = name+"="+val+";"+path+";"+domain+";"+expires;
	},

	// Get a cookie. Used to permanently dismiss the bottomBar widget.
	getCookie: function(cname)
	{
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i=0; i<ca.length; i++)
  		{
  			var c = ca[i].trim();
  			if (c.indexOf(name)==0)
  				return c.substring(name.length,c.length);
  		}
		return "";
	}
}

/**
--------------------------------------------------------------------------------
MAIN FUNCTIONALITY (called once the page is ready)
--------------------------------------------------------------------------------
*/
var ready = function() {
	// The bottomBar widget can be permanently dismissed (via cookie).
	// Should we show the widget, regardless?
	var url_override = window.location.href.indexOf('SHOW_CD_WIDGET') > -1;
	if (!_cd_options.always_show_widget && url_override == false)
		if (_cd_util.getCookie('_COUNTDOWN_WIDGET_DISMISSED'))
  		return;

	var animation = _cd_animations[_cd_options.animation];
	animation.init(_cd_options).start();
}

// Wait for DOM content to load.
var curState = document.readyState;
if (curState=="complete" || curState=="loaded" || curState=="interactive") {
	ready();
} else if (document.addEventListener) {
	document.addEventListener('DOMContentLoaded', ready, false);
}

})(); // :)
