var webCalls=require('webcalls');
exports.getLocationFromString=function(locationString){		
     webCalls.JSONrequest(
      {
          method:'GET',

          action:Alloy.Globals.cagapp.geoDomain + Alloy.Globals.cagapp.geoVirtualDir + 'GeoLocator/GetRealAddress_Cascade',
            parameters: {
                        location:locationString,
                        StreetMatchMode:2,
                        StreetContext:'ExpandSearch'
                  },
          success: onServerDataCall_Success,
          error: onServerDataCall_Error          
    }); 
};
function onServerDataCall_Success(_jsonReply, _xhr){
   Ti.API.info(JSON.stringify(_jsonReply));   
    setAddressList(_jsonReply); 
       
};
function onServerDataCall_Error(_e, _xhr){
    Ti.API.info(JSON.stringify(_e));
};
//-///////////////////////////////////////////////////////////////////////////////////////////
/* ***** EXPECTED RESULT TYPE VALUES ********************
  <xs:simpleType name="EnumGeocodeResultType">
    <xs:restriction base="xs:string">
      0-<xs:enumeration value="Error_Processing" />
      1-<xs:enumeration value="None" />
      2-<xs:enumeration value="Recorded_Address" />
      3-<xs:enumeration value="Interpolated_Address" />
      4-<xs:enumeration value="SoundsLike_Addresses" />
      5-<xs:enumeration value="Block_Addresses" />
      6-<xs:enumeration value="Intersection" />
      7-<xs:enumeration value="Expressway_Exits" />
    </xs:restriction>
  </xs:simpleType>
***********************************************************/  
function  setAddressList(geoResultsObj) {
   	Ti.API.info('Building Addresses: ' + JSON.stringify(geoResultsObj));
   		if (geoResultsObj.ResultsCount == 0 ) {
   		 var alertDialog = Titanium.UI.createAlertDialog({ title: 'NO ADDRESS FOUND',
           message: 'Unable to find ' + geoResultsObj.OriginalLocation + '.', 
           buttonNames: ['Please try a different address.']
           }); 
           alertDialog.show();
   			return;
   		}
	//-///////////////////////////////////////////////////////////////////////////////////////////
   			try {
   				var tvData=[];
   				//results are coming in from GetRealAddress_Cascade - so process only for result types - 2,5,6
   				//alert(geoResultsObj.ResultType);
   				if (geoResultsObj.ResultType == 2 || geoResultsObj.ResultType == 5){ //RECORDED_ADDRESSES & BLOCK_ADDRESSES
 					tvData=processAddressTypeResults(geoResultsObj);
        		};
   				if (geoResultsObj.ResultType == 6){ //INTERSECTIONS   					
 					tvData=processIntersectionResults(geoResultsObj);
        		};
	//-///////////////////////////////////////////////////////////////////////////////////////////
				if (tvData.length==1){
					Ti.App.fireEvent('locselected',{'data':tvData[0]});
				}else {
					ShowLocationSelection(tvData);
				}
	//-///////////////////////////////////////////////////////////////////////////////////////////	
        		/*
        		// RC 2014-05: ?????why is the code block below need to be in place?????
        		if (geoResultsObj.count > 0){
        			//the results obj for a list of building addresses has the count attrribute with a lowercase c and in
        			//a different part of the model, but doesn't have aResultType
        			if (geoResultsObj.count == 1){
        				alert('only one address, dude');
        			}
        			else{
        				var tvData = [];
        				for (var i=0,l=geoResultsObj.count;i<l;i++) {
        					var addressFound = false;
        					if (i==0) {
        						geoResultsObj.ListOfAddresses[i].title=geoResultsObj.ListOfAddresses[i].addressWCity;
          						tvData.push(geoResultsObj.ListOfAddresses[i]);
          						geoResultsObj.ListOfAddresses[i].ResultType="Address";        						
        					}
        					else {
        						for (var x = 0; x < tvData.length; x++){
        							
        							if (tvData[x].addressWCity == geoResultsObj.ListOfAddresses[i].addressWCity){
        								addressFound = true;
        							}
        						};
        						if (addressFound == false){
        							geoResultsObj.ListOfAddresses[i].title=geoResultsObj.ListOfAddresses[i].addressWCity;
          							tvData.push(geoResultsObj.ListOfAddresses[i]);
          							geoResultsObj.ListOfAddresses[i].ResultType="Address";        							
        						};	
        					};
          					
        				}
        				tableView.setData(tvData);
        				vwList.show(); 
        			};

        		}		       
				*/
      		}
      	catch (e) {
        				Ti.API.info(JSON.stringify(e)); 
      				}
     
     }; 
 function processAddressTypeResults(geoResultsObj){
        				Ti.API.info('New address search success results:');
        				Ti.API.info('ResultsCount: ' + geoResultsObj.ResultsCount);
        				Ti.API.info(JSON.stringify(geoResultsObj.addressList[0])); 					
        				var tvData = [];
        				//RC what is going on with code below? trying to make something unique on addressWCity? why?
        				for (var i=0,l=geoResultsObj.ResultsCount;i<l;i++) {
        					var addressFound = false;
        					if (i==0) {
        						geoResultsObj.addressList[i].id=geoResultsObj.addressList[i].cagaddressid;
        						geoResultsObj.addressList[i].juris=geoResultsObj.addressList[i].cagjuris;
        						geoResultsObj.addressList[i].title=geoResultsObj.addressList[i].addressWCity;
          						geoResultsObj.addressList[i].ResultType="Address";        						
          						tvData.push(geoResultsObj.addressList[i]);
        					}
        					else {
        						for (var x = 0; x < tvData.length; x++){
        							
        							if (tvData[x].addressWCity == geoResultsObj.addressList[i].addressWCity){
        								addressFound = true;
        							}
        						};
        						if (addressFound == false){
         							geoResultsObj.addressList[i].id=geoResultsObj.addressList[i].cagaddressid;
         							geoResultsObj.addressList[i].juris=geoResultsObj.addressList[i].cagjuris;
       								geoResultsObj.addressList[i].title=geoResultsObj.addressList[i].addressWCity;
           							geoResultsObj.addressList[i].ResultType="Address";        							
         							tvData.push(geoResultsObj.addressList[i]);
        						};	 
        					};
          					
        				}
        					return tvData;
        		/*}	*/
 }    
 function processIntersectionTypeResults(geoResultsObj){
		Ti.API.info('New intersection search results:' + 'ResultsCount: ' + geoResultsObj.ResultsCount + JSON.stringify(geoResultsObj.interxList[0]));
			var tvData = [];
			for (var i=0,l=geoResultsObj.ResultsCount;i<l;i++) {
				geoResultsObj.interxList[i].id=geoResultsObj.interxList[i].IntersectionID;
				geoResultsObj.interxList[i].juris=geoResultsObj.interxList[i].jurisabbrv;
				geoResultsObj.interxList[i].title=geoResultsObj.interxList[i].Intersection;
				geoResultsObj.interxList[i].ResultType="Intersection";
				tvData.push(geoResultsObj.interxList[i]);
			};
		return tvData;
 }
function ShowLocationSelection(_tableData){
     		// get the location selection controller and window references
			var controller =  Alloy.createController('locationSelectionList');
			controller.setTableViewData(_tableData);
			var win = controller.getView();		
			win.open();
			Ti.API.info('locationSelectionList .opened');
};
exports.storeLocationMRU=function(locationObj){
	var id=locationObj.id;
	var locItem=Alloy.Collections.LocationMRU.get(id);
	if(!locItem){
		locItem=Alloy.createModel('LocationMRU',{'id':id,'DESCRIPTION':locationObj.title,'json_obj':JSON.stringify(locationObj)});
		locItem.save();
		Alloy.Collections.LocationMRU.add(locItem);
	}	
}; 