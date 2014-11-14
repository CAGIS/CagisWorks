function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "requestDataEntry";
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
    $.__views.requestDataEntry = Ti.UI.createWindow({
        backgroundColor: "#fff",
        layout: "vertical",
        navBarHidden: true,
        title: "Request a Service",
        backButtonTitle: "Back",
        id: "requestDataEntry"
    });
    $.__views.requestDataEntry && $.addTopLevelView($.__views.requestDataEntry);
    $.__views.purpose = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        backgroundColor: "black",
        touchEnabled: false,
        id: "purpose"
    });
    $.__views.requestDataEntry.add($.__views.purpose);
    $.__views.SRDesc = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "white",
        font: {
            fontSize: "10dp"
        },
        top: "10dp",
        left: "20dp",
        right: "20dp",
        bottom: "10dp",
        touchEnabled: false,
        id: "SRDesc"
    });
    $.__views.purpose.add($.__views.SRDesc);
    $.__views.__alloyId15 = Ti.UI.createView({
        id: "__alloyId15"
    });
    $.__views.requestDataEntry.add($.__views.__alloyId15);
    $.__views.tvQA = Ti.UI.createTableView({
        height: Titanium.UI.SIZE,
        scrollable: "true",
        scrollsToTop: "true",
        top: "0dp",
        id: "tvQA"
    });
    $.__views.__alloyId15.add($.__views.tvQA);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var reportCSRData = require("reportcsr_datacalls");
    Ti.API.info("Dan - just opened the window");
    Ti.API.info("Dan - " + Alloy.Globals.srType);
    reportCSRData.getSRConfigDatafromServer($, Alloy.Globals.srType, "CINC");
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;