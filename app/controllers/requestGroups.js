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

$.actIndicator.show();
var reportCSRData=require('reportcsr_datacalls');
Ti.API.info(reportCSRData);

$.locationLbl.text = 'Location: ' + Alloy.Globals.locObj.addressWCity;
reportCSRData.getSRGroupDatafromServer($,'','CINC');