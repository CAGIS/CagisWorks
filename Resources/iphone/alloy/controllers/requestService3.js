function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function doSomething() {
        var win = Alloy.Globals.requestService;
        console.info(JSON.stringify(win.getChildren()));
        var kids = win.getChildren();
        var label = kids[2];
        label.text = "changed text in controller for 3rd window and closed both 2nd & 3rd window";
        win = Alloy.Globals.requestService2;
        win.close();
        Titanium.App.fireEvent("csr.submitSRStart");
        win = Alloy.Globals.requestService3;
        win.close();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "requestService3";
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.requestService3 = Ti.UI.createWindow({
        backgroundColor: "#fff",
        layout: "vertical",
        statusBarStyle: Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
        barColor: "FF00AEEF",
        navTintColor: "#fff",
        title: "Request a Service",
        backButtonTitle: "",
        id: "requestService3"
    });
    $.__views.requestService3 && $.addTopLevelView($.__views.requestService3);
    $.__views.header = Ti.UI.createView({
        backgroundColor: "black",
        height: Titanium.UI.SIZE,
        id: "header"
    });
    $.__views.requestService3.add($.__views.header);
    $.__views.lblchooseLocation = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        font: {
            fontSize: "18dp"
        },
        id: "lblchooseLocation",
        text: "requestService3"
    });
    $.__views.header.add($.__views.lblchooseLocation);
    doSomething ? $.__views.lblchooseLocation.addEventListener("click", doSomething) : __defers["$.__views.lblchooseLocation!click!doSomething"] = true;
    $.__views.tvLocationChoice = Ti.UI.createTableView({
        id: "tvLocationChoice"
    });
    $.__views.requestService3.add($.__views.tvLocationChoice);
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.lblchooseLocation!click!doSomething"] && $.__views.lblchooseLocation.addEventListener("click", doSomething);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;