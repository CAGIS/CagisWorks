

function addToURL(url, parameters) {
        newURL = url;
        if (parameters != null) {
            var toAdd = formEncode(parameters);
            if (toAdd.length > 0) {
                var q = url.indexOf('?');
                if (q < 0) {
                  newURL += '?';
                } else {
                  newURL += '&';
                }
                newURL += toAdd;
            }
        }
        return newURL;
};

function formEncode(parameters) {
        var form = "";
        var list = getParameterList(parameters);
        for (var p = 0; p < list.length; ++p) {
            var value = list[p][1];
           if (value == null) {
              value = "";
            }
            if (form != "") {
              form += '&';
      }
            form += percentEncode(list[p][0]) +'='+ percentEncode(value);
        }
        return form;
};
        
function getParameterList(parameters) {
        if (parameters == null) {
            return [];
        }
        if (typeof parameters != "object") {
            return decodeForm(parameters + "");
        }
        if (parameters instanceof Array) {
            return parameters;
        }
        var list = [];
        for (var p in parameters) {
          if(p){
              list.push([p, parameters[p]]);
            }
        }
        return list;
};

function formEncode(parameters) {
        var form = "";
        var list = getParameterList(parameters);
        for (var p = 0; p < list.length; ++p) {
            var value = list[p][1];
            if (value == null) {
              value = "";
            }
            if (form != "") {
              form += '&';
      }
            form += percentEncode(list[p][0]) +'='+ percentEncode(value);
        }
        return form;
};
function decodeForm(form) {
        var list = [];
        var nvps = form.split('&');
        for (var n = 0; n < nvps.length; ++n) {
            var nvp = nvps[n];
            if (nvp == "") {
                continue;
            }
            var equals = nvp.indexOf('=');
            var name;
            var value;
            if (equals < 0) {
                name = decodePercent(nvp);
                value = null;
            } else {
                name = decodePercent(nvp.substring(0, equals));
                value = decodePercent(nvp.substring(equals + 1));
            }
            list.push([name, value]);
        }
        return list;
};
    
function percentEncode(s) {
        if (s == null) {
            return "";
        }
        if (s instanceof Array) {
            var e = "";
            for (var i = 0; i < s.length; ++s) {
                if (e != ""){
                  e += '&';
                }
                e += percentEncode(s[i]);
            }
            return e;
        }
        s = encodeURIComponent(s);
        // Now replace the values which encodeURIComponent doesn't do
        // encodeURIComponent ignores: - _ . ! ~ * ' ( )
        // OAuth dictates the only ones you can ignore are: - _ . ~
        // Source: http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:Global_Functions:encodeURIComponent
        s = s.replace(/\!/g, "%21");
        s = s.replace(/\*/g, "%2A");
        s = s.replace(/\'/g, "%27");
        s = s.replace(/\(/g, "%28");
        s = s.replace(/\)/g, "%29");
        return s;
};

function decodePercent(s) {
        if (s != null) {
            // Handle application/x-www-form-urlencoded, which is defined by
            // http://www.w3.org/TR/html4/interact/forms.html#h-17.13.4.1
            s = s.replace(/\+/g, " ");
        }
        return decodeURIComponent(s);
};

//can send callbacks as key:value parameters in _params object
exports.JSONrequest = function(/*Object*/ _params) {

      var message = {
       	//method:'GET',
        //action:cag.app.geoDomain + geoVirtualDir + 'GeoLocator/GeoCodeLocator',
        method: _params.method,
        action: _params.action,
        parameters: []
      };
      //load up additional parameters for the request
      var moreParams = _params.parameters||{};
      for (var key in moreParams) {
        if (moreParams.hasOwnProperty(key)) {
          message.parameters.push([key,moreParams[key]]);
        }
      }
      var postingUrl = addToURL(message.action, message.parameters);
     var xhr = Titanium.Network.createHTTPClient({enableKeepAlive:false});
      xhr.onerror = function(e) {
        Ti.API.error('There was an error connecting to server: '+JSON.stringify(e));
        if (_params.error) {
          _params.error(e,xhr);
        } else {
        	handleError(e,xhr);
        }
      };

      xhr.onload = function(){
        try {
          if(this.responseText.match(/html xmlns/)){  
	        if (_params.error) {
	          _params.error(this.responseText,xhr);
	        } else {
	        	handleError(this.responseText,xhr);
	        }
            Ti.API.error('Server Error: '+this.responseText);
            return;
          } 
          Ti.API.info("webcalls.js - xhr.onload: " + this.responseText);
          var jsonReply = JSON.parse(this.responseText);
          //w00t!
          if (_params.success) {
            _params.success(jsonReply,xhr);
          }
        } catch(exception) {
	        if (_params.error) {
	          _params.error(exception,xhr);
	        } else {
	        	handleError(exception,xhr);
	        }      	
        }
      };
      Ti.API.info(postingUrl);
      //i just changed this from 15000 to 45000....15 seconds to 45 seconds
      xhr.timeout=15000; //set the server response time out in milliseconds
      xhr.open(_params.method, postingUrl);
      xhr.setRequestHeader('accept','application/json');
      xhr.send();
};  
  
/*  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */

exports.JSONpost = function(postURL,submitJSONObj){
  var xhr = Titanium.Network.createHTTPClient({enableKeepAlive:false});
  xhr.onerror = function(e){
  	//alert(this.status + '\n' + this.responseText + '\n' + 'Error: ' + e.error);
  	Ti.App.fireEvent('webcall.FailedToCreateSR', jsonReply);
  };  //xhr_onError function working 
  
  xhr.onload = function() {
   		Ti.App.fireEvent('csr.submitSREnd');
        Ti.API.info('Response text: ' + this.responseText);
        Ti.API.info('Response status: ' + this.status);
        /*if(this.status == 200) {
            Ti.API.info('Getting back: ' + this.responseText);
            var jsonReply = JSON.parse(this.responseText);
            Ti.App.fireEvent('webcall.RequestNumberReturned', jsonReply);           
        } else {
           Ti.App.fireEvent('webcall.FailedToCreateSR', jsonReply);
        };*/
        
        var jsonReply = JSON.parse(this.responseText);
        var apdNum = '';
        var apdStatus = '';
        
        if (jsonReply.APD !== undefined){
        	if (jsonReply.APD !== null){
        		apdNum = jsonReply.APD;
        	};
        };

        if (jsonReply.Status !== undefined){
        	if (jsonReply.Status !== null){
        		apdStatus = jsonReply.Status;
        	};
        };
        
        if (apdStatus == 'SUCCESS'){
        	if (apdNum !== ''){
        		Ti.App.fireEvent('webcall.RequestNumberReturned', jsonReply);
        	}
        	else {
        		Ti.App.fireEvent('webcall.FailedToCreateSR', jsonReply);
        	};  	
        }
        else {
        	Ti.App.fireEvent('webcall.FailedToCreateSR', jsonReply);
        };
        
        
        
        
        
        
    };
 
  Ti.API.info("sending: " + JSON.stringify(submitJSONObj));
 
  xhr.open('POST', postURL); // index.php is just print_r($_POST) or print_r($_REQUEST)
  //; charset=utf-8
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('Accept', 'application/json');
  xhr.setRequestHeader('token','00a6e1a3-a7f0-472b-9d87-4476cc4548cd');
  xhr.send(JSON.stringify(submitJSONObj));
};
 /*  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */
 