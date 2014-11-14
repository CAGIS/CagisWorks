function doSomething(e) {
	//alert("You clicked me");
	var win = Alloy.Globals.requestService;
	console.info(JSON.stringify(win.getChildren()));
	var kids = win.getChildren();
	var label = kids[2];
	label.text = "changed text in controller for 3rd window and closed both 2nd & 3rd window";
	win = Alloy.Globals.requestService2;
	win.close();
	Titanium.App.fireEvent('csr.submitSRStart');
	win = Alloy.Globals.requestService3;
	win.close();
	
};