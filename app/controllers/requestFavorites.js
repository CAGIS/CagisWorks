/*function doSomething(e) {
	//alert("You clicked me");
		var win=Alloy.createController("requestDataEntry").getView();
		Alloy.Globals.requestDataEntry = win;
	addWinToNavGroup(win);	
};*/
$.actIndicator.show();
function addWinToNavGroup(win){
	if (Alloy.Globals.usesNavGroup) {
		if (OS_MOBILEWEB) {
			Alloy.Globals.navgroup.open(win);
		} else {
			Alloy.Globals.navgroup.openWindow(win);
		}
	} else if (OS_ANDROID) {
		win.open();
	}			
};

var reportCSRData=require('reportcsr_datacalls');
Ti.API.info('reportCSRData' + reportCSRData);

$.locationLbl.text = 'Location: ' + Alloy.Globals.locObj.addressWCity;
reportCSRData.getFavoriteSRListfromServer($,'CINC','Summer');