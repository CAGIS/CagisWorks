
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

Ti.API.info("Dan - just opened the window")	;
Ti.API.info('Dan - ' + Alloy.Globals.srType);

reportCSRData.getSRConfigDatafromServer($,Alloy.Globals.srType,'CINC');



