window.addEventListener('message', function(e) {
    if (!e.data || !e.data.CD_WIDGET_MSG)
        return;

    delete e.data.CD_WIDGET_MSG;

    if (e.data.HOST_NAME)
    {
        host = e.data.HOST_NAME;
        delete e.data.HOST_NAME;
    }

    switch (e.data.requestType) {
        case 'putAnimation':
            trackLeaderboardStat({
                stat: 'display_widget',
                data: e.data.modalAnimation
            });
            animations[e.data.modalAnimation].init(e.data).start();
            break;
    }
});

var sanitize = function(str)
{
    str = str.replace(/\</g, '&lt;');
    str = str.replace(/javascript\:/gi, 'lolscript -');
    return str;
}

var sendMessage = function(requestType, data)
{
    data || (data = {});
    data.requestType = requestType;
    data.CD_IFRAME_MSG = true;
    parent.postMessage(data, '*');
    console.log('sending messsage');
}

var trackLeaderboardStat = function(options)
{
    options || (options = {});
    options.stat || (options.stat = 'unknown');
    options.data || (options.data = null);
    options.callback || (options.callback = function() {});

    if (!host)
        return;

    var data = {
        campaign: 'eunetneutrality',
        stat: options.stat,
        data: options.data,
        host: host,
        session: session
    };

    // Serialize data
    var params = '';
    for (var key in data) {
        if (params.length !== 0) {
            params += '&';
        }

        params += key + '=' + data[key];
    }

    var http = new XMLHttpRequest();
    var url = 'https://fftf-host-counter.herokuapp.com/log';
    http.open('POST', url, true);

    // Send the proper header information along with the request
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

     // Call a function when the state changes.
    http.onreadystatechange = function() {
        if (http.readyState == 4 && http.status == 200) {
            var res = JSON.parse(http.responseText);
            options.callback(res);
        }
    };

    http.send(params);
}

/**
 * Generates a GUID string.
 * @returns {String} The generated GUID.
 * @example af8a8416-6e18-a307-bd9c-f2c947bbb3aa
 * @author Slavik Meltser (slavik@meltser.info).
 * @link http://slavik.meltser.info/?p=142
 */
var guid = function() {
    var _p8 = function(s) {
        var p = (Math.random().toString(16)+"000000000").substr(2,8);
        return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
    }
    return _p8() + _p8(true) + _p8(true) + _p8();
}

function onDOMReady() {
    sendMessage('getAnimation');
}

var readyState = document.readyState;
if (readyState === 'interactive' || readyState === "complete") {
    onDOMReady();
} else {
    document.addEventListener('DOMContentLoaded', onDOMReady);
}

var host = null;  // this will get populated with the domain of the widget install
var session = guid();

