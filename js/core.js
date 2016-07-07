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

/**
 *  util : random grab bag functions
 */

var $c  = document.createElement.bind(document);
var $el = document.getElementById.bind(document);

if (!util) var util = {};

util.getReferrerTag = function() {
  var ref = document.referrer;
  if (ref.indexOf('facebook.com') !== -1)
    return 'from-facebook';
  else if (ref.indexOf('twitter.com') !== -1 || ref.indexOf('t.co') !== -1)
    return 'from-twitter';
  else if (ref.indexOf('reddit.com') !== -1)
    return 'from-reddit';
  else if (window.location.href.indexOf('_src=ga') !== -1)
    return 'from-google-adwords';
  else if (ref.indexOf('google.com') !== -1)
    return 'from-google';
};

util.parseQueryString = function () {
  var
    i,
    pairs,
    queryObject = {},
    queryString = window.location.search;

  if (queryString[0] === '?') {
    queryString = queryString.substr(1);
  }

  pairs = queryString.split('&');
  i = pairs.length;

  while (i--) {
    queryObject[pairs[i].split('=')[0]] = pairs[i].split('=')[1];
  }

  return queryObject;
};


window.components = window.components || {};
window.components.petitions = function (doc, win) {
  /**
   * Retrieves petition data from Action Network API, then submits signature
   * @param {object} doc - Document object
   * @param {object} win - Window object
   * */
  "use strict";

  var
    body = doc.getElementsByTagName('body')[0],
    petitionSignatureForm = doc.getElementById('petition-form'),
    apiHost = petitionSignatureForm.dataset.host,
    objectIdentifier = petitionSignatureForm.dataset.petitionId,
    submitButton = body.querySelector('[type="submit"]'),
    countryInput = doc.getElementById('hidden-country'),
    countrySelect = doc.getElementById('select-country'),
    countryLabel = doc.querySelector('[for="select-country"]'),
    queryString = win.util.parseQueryString();

  function numberCommafier(number) {
    /**
     * Returns a string representing a number with commas
     * @param {int} number - the number to transform
     * */

    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function progressBar(targetValue, targetGoal) {
    /**
     * Animates the value of a progress bar
     * @param {int} targetValue - the target value attribute of the progress bar
     * @param {int} targetGoal - the target max attribute of the progress bar
     * */

    var
      guardedTargetVal = targetValue.isNaN ? 0 : targetValue,
      animate,
      value = 0,
      progressbar = doc.getElementById('signatures-progress-bar'),
      max = parseInt(targetGoal),
      step = (guardedTargetVal / 1500) * 30; // 1500 ms total, 30ms minimum
                                             // interval

    if (!progressbar)
      return false;

    function loading() {
      value += step;
      value = Math.ceil(value);
      if (value >= guardedTargetVal || value >= max) {
        value = guardedTargetVal;
        clearInterval(animate);
      }

      var
        commafiedNumber = numberCommafier(value);

      progressbar.setAttribute('max', max.toString(10));
      progressbar.setAttribute('value', value.toString(10));
      progressbar.setAttribute('title', commafiedNumber + ' signatures');
      doc.getElementById('total-sigs').textContent = commafiedNumber;
      doc.getElementById('sigs-to-go').textContent = numberCommafier(targetGoal - value) + ' needed to reach ' + numberCommafier(targetGoal);
      progressbar.textContent = commafiedNumber + ' signatures';
    }

    animate = setInterval(function () {
      loading();
    }, 30);
  }

  function handleProgressBarError() {
    /**
     * Sets values for the progress bar even if there's a server or XHR error
     * */
    progressBar(1519, 2500);
  }

  function requestAPIInfo() {
    /**
     * Builds and sends request to API server
     * */
    var
      apiData,
      anRequest = new XMLHttpRequest();

    anRequest.open('GET', apiHost + '/petition?identifier=' + objectIdentifier, true);
    anRequest.addEventListener('load', function () {
      if (anRequest.status >= 200 && anRequest.status < 400) {

          apiData = JSON.parse(anRequest.responseText);

        progressBar(apiData.signatures, apiData.goal);
      } else {
        handleProgressBarError();
      }
    });
    anRequest.addEventListener('error', handleProgressBarError);
    anRequest.send();
  }

  function updateZIPPlaceholder() {
    /**
     * Updates placeholder on ZIP/Post Code field to be appropriate for country
     * selected
     * */
    var
      ZIPLabel = doc.getElementById('form-zip_code');

    if (countrySelect.value !== 'US') {
      ZIPLabel.setAttribute('placeholder', 'Post Code');
    } else {
      ZIPLabel.setAttribute('placeholder', 'ZIP');
    }
  }

  function toggleCountryField() {
    /**
     * Hides the label and shows the select when someone changes their signature
     * country.
     * */

    countryInput.parentNode.removeChild(countryInput);
    countrySelect.setAttribute('name', 'signature[country]');
    countrySelect.classList.add('visible');
    countryLabel.classList.add('hidden');
  }

  function submitForm(event) {
    /**
     * Submits the form to ActionNetwork. If the script doesn’t, by now, know
     * the action_network identifier, default isn’t prevented on the event and
     * form submission proceeds as normal.
     * @param {event} event - Form submission event
     * */

    if (objectIdentifier) {
      event.preventDefault();
    }

    var
      signatureSubmission = new XMLHttpRequest();

    win.callbacks.petitions.preSubmit();

    function compilePayload() {
      /**
       * Compiles the form data into a JSON payload for Ajax submission
       * @return {object} petitionFormData - just the info the API needs
       * */
      var tags = JSON.parse(doc.querySelector('[name="subscription[tag_list]"]').value);
      if (util.getReferrerTag())
        tags.push(util.getReferrerTag());

      var formData = new FormData();
      formData.append('guard', '');
      formData.append('hp_enabled', true);
      formData.append('org', 'fftf');
      formData.append('an_tags', JSON.stringify(tags));
      formData.append('an_url', win.location.href);
      formData.append('an_petition', petitionSignatureForm.action.replace('/signatures', ''));
      formData.append('member[first_name]', doc.getElementById('form-first_name').value);
      formData.append('member[email]', doc.getElementById('form-email').value);
      formData.append('member[postcode]', doc.getElementById('form-zip_code').value);
      formData.append('member[country]', countrySelect.value);

      if (doc.getElementById('opt-in') && doc.getElementById('opt-in').getAttribute('type') === 'checkbox' && doc.getElementById('opt-in').checked === false) {
        formData.append('opt_out', true);
      }

      if (doc.getElementById('form-street_address')) {
        formData.append('member[street_address]', doc.getElementById('form-street_address').value);
      }

      if (doc.getElementById('form-comments')) {
        formData.append('action_comment', doc.getElementById('form-comments').value);
      }

      if (queryString.source) {
        formData.append('subscription[source]', queryString.source);
      }

      var autoresponderHours = document.querySelector('meta[name="autoresponder_hours"]');
      formData.append('autoresponder_hours', autoresponderHours ? autoresponderHours.content : 72);

      var mothershipTag = document.querySelector('input[name="_mothership_tag"]');
      if (mothershipTag && mothershipTag.value)
        formData.append('tag', mothershipTag.value);
      else
        formData.append('tag', window.location.pathname);

      return formData;
    }

    signatureSubmission.open('POST', 'https://queue.fightforthefuture.org/action', true);
    // signatureSubmission.open('POST', 'http://localhost:9001/action', true); // JL DEBUG ~
    signatureSubmission.addEventListener('error', win.callbacks.petitions.handleSigningError);
    signatureSubmission.addEventListener('load',  win.callbacks.petitions.loadSignatureResponse);
    signatureSubmission.send(compilePayload());
  }

  function addEventListeners() {
    /**
     * Attaches all the listeners all the places
     * */
    countryLabel.addEventListener('click', toggleCountryField);
    countrySelect.addEventListener('change', updateZIPPlaceholder);
    petitionSignatureForm.addEventListener('submit', submitForm);
  }

  function init() {
    requestAPIInfo();
    addEventListeners();
  }

  init();
};

(function (doc, win) {
  "use strict";

  win.callbacks = win.callbacks || {};
  win.callbacks.petitions = {
     preSubmit: function() {
      /**
       * Fires up the loading modal and disables the form
       * @return {object} - modal with spinner
       * */
      doc.querySelector('[type="submit"]').setAttribute('disabled', true); // JL DEBUG ~ disable for testing
    },

    loadSignatureResponse: function(e) {
      /**
       * Does the thing after we get a response from the API server
       * */

      var xhr = e.target;

      if (xhr.status >= 200 && xhr.status < 400) {

        hideForm()

      } else {
        win.callbacks.petitions.handleSigningError(xhr);
      }
    },

    handleSigningError: function(e) {
      /**
       * Figures out what to say at just the right moment
       * @param {event|XMLHttpRequest} e - Might be an event, might be a response
       * from an XMLHttpRequest
       * */


      doc.querySelector('[type="submit"]').removeAttribute('disabled');

      alert('AN ERROR OCCURRED DURING SUBMISSION :(\n\nPlease contact team@fightforthefuture.org');
    }
  }

})(document, window);

(function (doc, win) {
  "use strict";

  function triggerComponents() {
    win.components = win.components || {};
    var
      i = 0,
      components = doc.getElementsByTagName('body')[0].dataset.components;

    if (components !== undefined) {
      components = components.split(' ');
      i = components.length;

      while (i--) {
        if (components[i] !== '' && win.components[components[i]] !== undefined) {
          win.components[components[i]](doc, win);
        }
      }
    }
  }

  triggerComponents();

  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status == 200)
    {
      var response = JSON.parse(xhr.response);
      if (response.country && response.country.iso_code) {
        var country = response.country.iso_code;
        var option = document.getElementById('select-country').querySelector('option[value="'+country+'"');
        if (option)
          option.selected = true;
      }
    }
  };
  xhr.open("get", 'https://fftf-geocoder.herokuapp.com', true);
  xhr.send();

  if (window.location.href.indexOf('optout') !== -1)
    document.getElementById('opt-in').checked = false; //



  var onDomContentLoaded =function() {
    var fb = document.querySelectorAll('a.share');
    for (var i = 0; i < fb.length; i++)
      fb[i].addEventListener('click', function(e) {
        e.preventDefault();
        FreeProgress.share();
      }, false);

    var tw = document.querySelectorAll('a.tweet');
    for (var i = 0; i < tw.length; i++)
      tw[i].addEventListener('click', function(e) {
        e.preventDefault();
        FreeProgress.tweet();
      }, false);

    if (window.location.href.indexOf('video=true') !== -1)
      window.location.hash = 'video';
  };

  var isReady = document.readyState;

  if (isReady == "complete" || isReady == "loaded" || isReady == "interactive")
    onDomContentLoaded();
  else if (document.addEventListener)
    document.addEventListener('DOMContentLoaded', onDomContentLoaded, false);

  window.hideForm = function() {
    document.querySelector('dl:first-of-type').style.opacity = 0;
    setTimeout(function() {
      document.querySelector('dl:first-of-type').style.display = 'none';
      document.querySelector('h3').style.display = 'block';
      setTimeout(function() {
        document.querySelector('h3').style.opacity = 1;
      }, 10);
    }, 400);
  }

  var twitterConnectButtons = document.querySelectorAll('a[href="#twitter"]');
  for (var i = 0; i < twitterConnectButtons.length; i++) {
    twitterConnectButtons[i].addEventListener('click', function(e) {
      e.preventDefault();
      var url = 'https://mothership-js.fightforthefuture.org/connect/twitter?tag=eu-nn';
      var properties = 'width=600,height=500,toolbar=no,status=no,menubar=no';

      window.open(url, 'idl_connect', properties);
    });
  }

})(document, window);
