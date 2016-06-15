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

})(document, window);
