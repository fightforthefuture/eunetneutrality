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
(function(){

var myselfSelfSelf = document.querySelector('script#fftf_logo_cloud'),
    urlPrefix = (window.location.href.indexOf('localhost') !== -1 ? '' : 'https://www.savenetneutrality.eu');

var iframe = document.createElement('IFRAME');
iframe.src = urlPrefix + '/logos';
iframe.frameBorder = 0;
iframe.allowTransparency = true;
iframe.style = 'width: 100%; height: 100px;';

myselfSelfSelf.parentNode.appendChild(iframe);

var method = window.addEventListener ? "addEventListener" : "attachEvent";
var eventer = window[method];
var messageEvent = method == "attachEvent" ? "onmessage" : "message";

eventer(messageEvent,function(e) {
  if (!e.data || !e.data.LOGO_CLOUD_IFRAME_MSG)
    return;

  switch (e.data.requestType) {
    case 'setSize':
      iframe.style.height = e.data.size + 'px';
      break;
  }
}, false);

})();
