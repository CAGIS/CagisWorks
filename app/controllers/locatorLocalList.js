var args = arguments[0] || {};
//fetch MRU data
Alloy.Collections.LocationMRU && Alloy.Collections.LocationMRU.fetch();

var locSearchCalls=require('locationSearchProcessing');
locSearchCalls.parentController=$;

function addTestMRU(){
	var testItem=Alloy.Collections.LocationMRU.get('testMRU');
	if(!testItem){
		testItem=Alloy.createModel('LocationMRU',{'id':'testMRU','DESCRIPTION':'Test MRU Item by RC','json_obj':'{x:1,y:2,z:3}'});
		testItem.save();
	}
	
}
//addTestMRU();
// Free model-view data binding resources when this view-controller closes
$.locatorLocalList.addEventListener('close', function() {
    $.destroy();
});

Ti.App.addEventListener('locselected', onLocationSelection);  
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
      //setAddressInMap(SelLocObj);
      //store selection in MRU
      locSearchCalls.storeLocationMRU(SelLocObj);
};   