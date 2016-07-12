(function(){ // :)

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

  delete e.data.CD_IFRAME_MSG;

  switch (e.data.requestType) {
    case 'setSize':
      iframe.style.height = e.data.size + 'px';
      break;
  }
}, false);

})(); // :)
