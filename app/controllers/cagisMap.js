
 // - ///////////////////////////////////////////////////////////////////////////////////    
 //All requires should be done below::
var locSearchCalls=require('locationSearchProcessing');
locSearchCalls.parentController=$;
 // - ///////////////////////////////////////////////////////////////////////////////////    

if (OS_ANDROID && Ti.Platform.Android.API_LEVEL >= 11) {
    // use action bar search view
    var search = Alloy.createController("searchView").getView();
    $.cagisMap.addEventListener("open", function() {
        $.cagisMap.activity.onCreateOptionsMenu = function(e) {
            e.menu.add({
                title: "Table Search",
                icon: (Ti.Android.R.drawable.ic_menu_search ? Ti.Android.R.drawable.ic_menu_search : "my_search.png"),
                actionView: search,
                showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS | Ti.Android.SHOW_AS_ACTION_COLLAPSE_ACTION_VIEW
            });
        }
        $.cagisMap.activity.invalidateOptionsMenu();
    });
} 
 // - ///////////////////////////////////////////////////////////////////////////////////    
 //All event listening and clearing should be done below::
Ti.App.addEventListener('locselected', onLocationSelection);   
     // you can plug  leak by removing the event listener, for example when the window is closed
$.on('close', function() {
    // to remove an event listener, you must use the exact same function signature
    // as when the listener was added
    Ti.App.removeEventListener('locselected',onLocationSelection);
});
// - /////////////////////////////////////////////////////////////////////////////////// 

function cancelSearch(e) {
	e.source.blur();
}

function closeKeyboard(e) {
    e.source.blur();
    LocationFromString();
}

function LocationFromString(){	
    var locationString=$.locField.value;
    if (locationString == '' ) {return;}
	locSearchCalls.getLocationFromString(locationString);
}	
   
function onLocationSelection(_e){
	Ti.API.info('onLocationSelection' + JSON.stringify(_e));
      var SelLocObj=_e.data;    
      Ti.API.info("The current location object: " + JSON.stringify(SelLocObj));
      setAddressInMap(SelLocObj);
      //store selection in MRU
      locSearchCalls.storeLocationMRU(SelLocObj);
};   
   
 function setAddressInMap(addrSelLocObj){
      var xCoord = 0;
      var yCoord = 0;
      //RC-Not sure why the two lines below are needed at all?? both addr and intx objects have same x & Y cooord field names
      if (addrSelLocObj.IntersectionX !== undefined)  xCoord=addrSelLocObj.IntersectionX; 
      if (addrSelLocObj.IntersectionY !== undefined)  yCoord=addrSelLocObj.IntersectionY;
      /////
      if (addrSelLocObj.x_coord !== undefined)  xCoord=addrSelLocObj.x_coord;
      if (addrSelLocObj.y_coord !== undefined)  yCoord=addrSelLocObj.y_coord; //x_intp y_intp
	  Ti.API.info("setAddressInMap: " + JSON.stringify({toX:xCoord,toY:yCoord, mapContext:Alloy.Globals.mapContext, zoom:true}));
      Ti.App.fireEvent('map.centerAndZoom',{toX:xCoord,toY:yCoord, mapContext:Alloy.Globals.mapContext, zoom:true});   
      $.locField.value =  addrSelLocObj.address; 
};

function doMenuClick(){
	
}
//***************************************************************************************************************************************************
//Reference 
/*//address object only
{
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
} + "ResultType":"Address",'title','id' //added locally by location selection window
*/
/*//intersection object only
   {
   "IntersectionID":"GJ15073154",
   "Intersection":"WALNUT ST & E COURT ST",
   "jurisabbrv":"CINC",
   "XStreet1":"WALNUT ST",
   "XStreet2":"E COURT ST",
   "x_coord":"1397426.6733",
   "y_coord":"409373.680630"
   } + "ResultType":"Intersection",'title','id' //added locally by location selection window
*/

