var args = arguments[0] || {};
//fetch MRU data
Alloy.Collections.LocationMRU && Alloy.Collections.LocationMRU.fetch();

function doClick(e) {
    alert($.labeltop.text);
};

function openReportCSRWindow(){
	//alert('openReportCSRWindow');
	var win=Alloy.createController("requestFavorites").getView();
	Alloy.Globals.requestFavorites = win;
	addWinToNavGroup(win);	
};
function openPothole(){
	Alloy.Globals.srType = 'PTHOLE';
	var win=Alloy.createController("requestDataEntry").getView();
	Alloy.Globals.requestDataEntry = win;
	addWinToNavGroup(win);
}

function openPothole2(){
	Alloy.Globals.srType = 'PTHOLE';
	var win=Alloy.createController("scrollableView").getView();
	//win.setToolbar([],{barColor:'#00aeef', translucent:false});
	Alloy.Globals.requestDataEntry = win;
	addWinToNavGroup(win);
}

function openServiceDatesWindow(){
	var win=Alloy.createController("serviceDates").getView();
	addWinToNavGroup(win);	
};

function openExploreMapWindow(){
	var win=Alloy.createController("cagisMap").getView();
	addWinToNavGroup(win);		
};

function openLocatorLocalListWindow(){
	var win=Alloy.createController("locatorLocalList").getView();
	addWinToNavGroup(win);	
};

function openLatestTweetsWindow(){
	alert('openLatestTweetsWindow');
};
function openContactInfoWindow(){
	//alert('openApplicationInfoWindow');
	var win=Alloy.createController("contactInfo").getView();
	Alloy.Globals.contactInfo = win;
	addWinToNavGroup(win);
};
function openCityFAQsWindow(){
	alert('openCityFAQsWindow');
};

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



// Free model-view data binding resources when this view-controller closes
$.master.addEventListener('close', function() {
    $.destroy();
});