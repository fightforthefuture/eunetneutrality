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
    document.getElementById('opt-in').checked = false;



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
