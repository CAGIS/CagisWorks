var args = arguments[0] || {};
$.actIndicator.show();
var serviceDatesProcessing=require('serviceDatesProcessing');

$.lbl_serviceLocation.text='Location: ' + Alloy.Globals.locObj.addressWCity;
serviceDatesProcessing.getCombinedServicesfromServer($,Alloy.Globals.locObj.cagaddressid);
