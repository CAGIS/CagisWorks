var args = arguments[0] || {};
console.info("Hi Dan");

var bSVV=require('buildScrollableViewViews');


Ti.API.info("Dan - just opened the window")	;
Ti.API.info('Dan - ' + Alloy.Globals.srType);

//reportCSRData.getSRConfigDatafromServer($,Alloy.Globals.srType,'CINC');
//console.info("bSVV: " + JSON.stringify(bSVV));
//bSVV.testFunction($);
bSVV.getSRConfigDatafromServer($,Alloy.Globals.srType,'CINC');