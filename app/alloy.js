// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};
if (OS_IOS || OS_ANDROID) {
	
	Alloy.Globals.top = 0;
	Alloy.Globals.tableTop = '50dp';
	try {
		// check for iOS7
		if (OS_IOS && parseInt(Titanium.Platform.version.split(".")[0], 10) >= 7) {
			Alloy.Globals.top = '20dp';
			Alloy.Globals.tableTop = '70dp';
		}
	} catch(e) {
		// catch and ignore
	}
}

if (OS_ANDROID) {
	Alloy.Globals.isAndroid = true;
} else {
	Alloy.Globals.isAndroid = false;
}
//-////////////////////////////////////////////////////////////////////////////////
Alloy.Globals.QAControlList = [];
Alloy.Globals.mapContext='location'; //'property'||'location'
Alloy.Globals.cagapp = {
	webMapURL:'http://cagisonline.hamilton-co.org/CagisOnline/maps/mobilemap.html',
	geoDomain:'https://cagismaps.hamilton-co.org/',
	geoVirtualDir:'CagisGeoWebServicesV2010/',
	csrDomain:'https://cagismaps.hamilton-co.org/',
	csrVirtualDir:'CSRWebServices/',
	csrRecordDomain:'http://cagisperm.hamilton-co.org/',
	csrRecordDir:'cincsr/search/'
	
};

Alloy.Globals.locObj={
 	"cagaddressid":"00010BROAD0601617000",
 	"address":"1617 BROADWAY",
 	"addressWCity":"1617 BROADWAY, CINC",
 	"cagjuris":"CINC",
 	"cagjurisName":"CINCINNATI","cagrecid":"00860002036801617B",
 	"aliasflg":"",
 	"isInterpolatedRecord":false,"I_Parity":"","I_addmastr_X":"","I_addmastr_Y":"","I_addr_RightLeftSide":"","
 	LocatorType":7,"StreetNameID":"BROAD06","StreetSegmentFID":"HAM50903","StreetSegmentID":"3368506153033685351848","USState":"OH",
 	"buildingid":"GJ1536132284","cagaddressstatus":"ASSIGNED","cagaddresstype":"BLD","
 	caggroupparcelid":"008600020368","cagparcelid":"008600020368","cagplace":"",
 	"cagstreetname":"BROADWAY","cagstreetsuffix":"","cityid":"CINC","condoflg":"","countyCode":"HAM",
 	"floor":"","multiunit":"","BLDG_LinkType":"",
 	"originallocation":"","streetdir":"","streetfrac":"","streetno":"1617","streetnoSFX":"",
 	"tanAssetID":"S-HAM50903","unitid":"","usngcode":"GJ1536132284",
 	"x_coord":"1398488.795060","y_coord":"411760.4230",
 	"x_intp":"1398525.9880","y_intp":"411757.626240",
 	
 	"zipcode":"45202"
};
//-////////////////////////////////////////////////////////////////////////////////
// This will create a singleton collection object if it has not been previously created,
// or retrieves the singleton if it already exists.
Alloy.Collections.instance('LocationMRU');  //accessed thru Alloy.Collections.LocationMRU
Alloy.Collections.instance('contactInformation');

//Ti.UI.backgroundColor = "#00aeef";
