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
Ti.API.info(reportCSRData);

$.locationLbl.text = 'Location: ' + Alloy.Globals.locObj.addressWCity;

var selectedGroup = Alloy.Globals.selectedGroup;
var getGroup_SRList=function(selectedGroup){
	Ti.API.info('selected group: ' + selectedGroup);
  var myList = Alloy.Globals.allSRTypes;
  Ti.API.info('SRTypeRequestList: ' + myList);
  var srCatAry=myList.ServiceRequestCategoryList;
  var data = [];
       for(var c=0;c<srCatAry.length;c++){
         var catList=srCatAry[c];
          if(catList.category==selectedGroup){
            //return catList.ServiceRequests;
            Ti.API.info(JSON.stringify('Selected group request types: ' + JSON.stringify(catList.ServiceRequests)));
           
            for (var i=0; i < catList.ServiceRequests.length; i++){
            	var tvr = Ti.UI.createTableViewRow({
            		hasChild:true
            	});
	            var myLabel = Ti.UI.createLabel({
		   			color:'black',
		   			top:'5dp',
		   			left:'20dp',
		   			right:'20dp',
					font:{fontSize:12}
		   		});
	   			myLabel.text = catList.ServiceRequests[i].description;
	   			tvr.id = catList.ServiceRequests[i].id;
	   			tvr.name = catList.ServiceRequests[i].description;
	   			
	   			tvr.add(myLabel);
	   			
	   			tvr.addEventListener('click', function(e){
	   				if (Alloy.Globals.isAndroid == true){
						Alloy.Globals.srType = e.row.id;
					} else {
						Alloy.Globals.srType = e.rowData.id;
					}
	   				
					var win=Alloy.createController("requestDataEntry").getView();
					Alloy.Globals.requestDataEntry = win;
					addWinToNavGroup(win);
	   			});
	   			
	   			data.push(tvr);
            }
            
         };
       };
          data.sort(sortSRData);
$.tvSRs.setData(data);

};

var sortSRData = function(a,b){
	var nameA = a.name.toLowerCase();
	var nameB = b.name.toLowerCase();
	if (nameA < nameB) {return -1};
	if (nameA > nameB){return 1};
	return 0;
};

getGroup_SRList(selectedGroup);


