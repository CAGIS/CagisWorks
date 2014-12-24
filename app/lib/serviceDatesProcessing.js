var webCalls=require('webcalls');
exports.parentHandle=null;
exports.getCombinedServicesfromServer = function(parentHandle,cagaddressid){
	var addrID=cagaddressid;
	exports.parentHandle=parentHandle;
	
    webCalls.JSONrequest(
      {
          method:'GET',
          //action:Alloy.Globals.cagapp.csrDomain + Alloy.Globals.cagapp.csrVirtualDir + 'CinciServices/services',
          action:Alloy.Globals.cagapp.csrDomain + Alloy.Globals.cagapp.csrVirtualDir + 'CinciServices/servicesList',
          parameters: {addressid:addrID},
          success: onServerDataCall_Success_services,
          error: onServerDataCall_Failure_services          
     });
};
var onServerDataCall_Success_services=function(_jsonReply,_xhr){
	//Ti.API.info(JSON.stringify(_jsonReply));
	//exports.parentHandle.trash_lbl.text=JSON.stringify(_jsonReply);
	var $=exports.parentHandle;
	$.actIndicator.hide();
	if(_jsonReply.Status==='SUCCESS') processResults(_jsonReply.Services);
		else alert(_jsonReply.Status);
	//Ti.App.fireEvent('scheduledServicesDataReturned', _jsonReply);
	
};

var onServerDataCall_Failure_services = function(_jsonReply,_xhr){
	$.actIndicator.hide();
};
function processResults(data)
{	
	var serviceData = [];
	for (i=0;i<data.length;i++){
		var groupName = data[i].ServiceType;
		var serviceDescription = data[i].Description;
		groupName = groupName.replace(/\\n/g,'\n');
		groupName = groupName.replace(/\n /g,'\n');
		serviceDescription = serviceDescription.replace(/\\n/g,'\n');
		serviceDescription = serviceDescription.replace(/\n /g,'\n');
		serviceDescription = serviceDescription.replace(/\nRecycling/g, ' Recycling');
		serviceDescription = serviceDescription.replace(/\n\nPlease/g, ' Please');
				
		var link = '';
		var buttonTitle = '';
		if (data[i].additionalData !== undefined){
			if (data[i].additionalData !== null){
				link = data[i].additionalData[0].link;
				buttonTitle = data[i].additionalData[0].title;
			};
		};		
		var serviceObj = {
			'service':groupName,
			'value':serviceDescription,
			'link':link,
			'buttonTitle':buttonTitle
		};
		serviceData.push(serviceObj);
	};	
	createServicesSections(serviceData);	
}
var createServicesSections = function(serviceData){
	var $=exports.parentHandle;
	var fData = [];
	for (var i =0; i<serviceData.length; i++){
		var tableViewSection = Ti.UI.createTableViewSection({
			headerTitle:serviceData[i].service
		});
		var tvr = Ti.UI.createTableViewRow();
/*	
		var txtAreaArgs = {
		    classes: ['rowTextArea'],
		    value: serviceData[i].value
		};	
		var txtArea = $.UI.create("TextArea", txtAreaArgs); 
		tvr.add(txtArea);	
*/
		var lblArgs = {
		    classes: ['rowLabel'],
		    text: serviceData[i].value
		};
		var txtLbl = $.UI.create("Label", lblArgs);
		
		tvr.add(txtLbl);		
			
		if (serviceData[i].buttonTitle !== ''){
			var btnArgs = {
			    classes: ['rowDocumentButton'],
			    title: serviceData[i].buttonTitle
			};			
			var documentButton = $.UI.create("Button", btnArgs);
			mLink = serviceData[i].link;
			documentButton.addEventListener('click', function(){
				Titanium.Platform.openURL(mLink);
			});
			tvr.add(documentButton);
		};				
		tableViewSection.add(tvr);
		fData.push(tableViewSection);
	};
	$.TV_serviceDates.setData(fData);
};

