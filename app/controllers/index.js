var isIpad = OS_IOS && Alloy.isTablet;
var usesNavGroup = (OS_IOS && Alloy.isHandheld) || OS_MOBILEWEB;

Alloy.Globals.usesNavGroup=usesNavGroup;
// save a global reference to the navgroup on iPhone
if (usesNavGroup) {
	Alloy.Globals.navgroup = OS_MOBILEWEB ? $.navgroup : $.index;
}

if (OS_ANDROID) {
	$.master.getView().open();
} else {
	$.index.open();
}


