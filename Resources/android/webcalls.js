function addToURL(url, parameters) {
    newURL = url;
    if (null != parameters) {
        var toAdd = formEncode(parameters);
        if (toAdd.length > 0) {
            var q = url.indexOf("?");
            newURL += 0 > q ? "?" : "&";
            newURL += toAdd;
        }
    }
    return newURL;
}

function formEncode(parameters) {
    var form = "";
    var list = getParameterList(parameters);
    for (var p = 0; p < list.length; ++p) {
        var value = list[p][1];
        null == value && (value = "");
        "" != form && (form += "&");
        form += percentEncode(list[p][0]) + "=" + percentEncode(value);
    }
    return form;
}

function getParameterList(parameters) {
    if (null == parameters) return [];
    if ("object" != typeof parameters) return decodeForm(parameters + "");
    if (parameters instanceof Array) return parameters;
    var list = [];
    for (var p in parameters) p && list.push([ p, parameters[p] ]);
    return list;
}

function formEncode(parameters) {
    var form = "";
    var list = getParameterList(parameters);
    for (var p = 0; p < list.length; ++p) {
        var value = list[p][1];
        null == value && (value = "");
        "" != form && (form += "&");
        form += percentEncode(list[p][0]) + "=" + percentEncode(value);
    }
    return form;
}

function decodeForm(form) {
    var list = [];
    var nvps = form.split("&");
    for (var n = 0; n < nvps.length; ++n) {
        var nvp = nvps[n];
        if ("" == nvp) continue;
        var equals = nvp.indexOf("=");
        var name;
        var value;
        if (0 > equals) {
            name = decodePercent(nvp);
            value = null;
        } else {
            name = decodePercent(nvp.substring(0, equals));
            value = decodePercent(nvp.substring(equals + 1));
        }
        list.push([ name, value ]);
    }
    return list;
}

function percentEncode(s) {
    if (null == s) return "";
    if (s instanceof Array) {
        var e = "";
        for (var i = 0; i < s.length; ++s) {
            "" != e && (e += "&");
            e += percentEncode(s[i]);
        }
        return e;
    }
    s = encodeURIComponent(s);
    s = s.replace(/\!/g, "%21");
    s = s.replace(/\*/g, "%2A");
    s = s.replace(/\'/g, "%27");
    s = s.replace(/\(/g, "%28");
    s = s.replace(/\)/g, "%29");
    return s;
}

function decodePercent(s) {
    null != s && (s = s.replace(/\+/g, " "));
    return decodeURIComponent(s);
}

exports.JSONrequest = function(_params) {
    var message = {
        method: _params.method,
        action: _params.action,
        parameters: []
    };
    var moreParams = _params.parameters || {};
    for (var key in moreParams) moreParams.hasOwnProperty(key) && message.parameters.push([ key, moreParams[key] ]);
    var postingUrl = addToURL(message.action, message.parameters);
    var xhr = Titanium.Network.createHTTPClient({
        enableKeepAlive: false
    });
    xhr.onerror = function(e) {
        Ti.API.error("There was an error connecting to server: " + JSON.stringify(e));
        _params.error ? _params.error(e, xhr) : handleError(e, xhr);
    };
    xhr.onload = function() {
        try {
            if (this.responseText.match(/html xmlns/)) {
                _params.error ? _params.error(this.responseText, xhr) : handleError(this.responseText, xhr);
                Ti.API.error("Server Error: " + this.responseText);
                return;
            }
            Ti.API.info("webcalls.js - xhr.onload: " + this.responseText);
            var jsonReply = JSON.parse(this.responseText);
            _params.success && _params.success(jsonReply, xhr);
        } catch (exception) {
            _params.error ? _params.error(exception, xhr) : handleError(exception, xhr);
        }
    };
    Ti.API.info(postingUrl);
    xhr.timeout = 15e3;
    xhr.open(_params.method, postingUrl);
    xhr.setRequestHeader("accept", "application/json");
    xhr.send();
};

exports.JSONpost = function(postURL, submitJSONObj) {
    var xhr = Titanium.Network.createHTTPClient({
        enableKeepAlive: false
    });
    xhr.onerror = function() {
        Ti.App.fireEvent("webcall.FailedToCreateSR", jsonReply);
    };
    xhr.onload = function() {
        Ti.App.fireEvent("csr.submitSREnd");
        Ti.API.info("Response text: " + this.responseText);
        Ti.API.info("Response status: " + this.status);
        var jsonReply = JSON.parse(this.responseText);
        var apdNum = "";
        var apdStatus = "";
        void 0 !== jsonReply.APD && null !== jsonReply.APD && (apdNum = jsonReply.APD);
        void 0 !== jsonReply.Status && null !== jsonReply.Status && (apdStatus = jsonReply.Status);
        "SUCCESS" == apdStatus && "" !== apdNum ? Ti.App.fireEvent("webcall.RequestNumberReturned", jsonReply) : Ti.App.fireEvent("webcall.FailedToCreateSR", jsonReply);
    };
    Ti.API.info("sending: " + JSON.stringify(submitJSONObj));
    xhr.open("POST", postURL);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("token", "00a6e1a3-a7f0-472b-9d87-4476cc4548cd");
    xhr.send(JSON.stringify(submitJSONObj));
};