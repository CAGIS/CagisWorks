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
    this.__controllerPath = "serviceDates";
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
    $.__views.serviceDates = Ti.UI.createWindow({
        backgroundColor: "#fff",
        layout: "vertical",
        navBarHidden: true,
        title: "Service Schedule",
        backButtonTitle: "",
        id: "serviceDates"
    });
    $.__views.serviceDates && $.addTopLevelView($.__views.serviceDates);
    $.__views.header = Ti.UI.createView({
        backgroundColor: "black",
        height: Titanium.UI.SIZE,
        id: "header",
        layout: "vertical"
    });
    $.__views.serviceDates.add($.__views.header);
    $.__views.lbl_serviceLocation = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "white",
        font: {
            fontSize: 12
        },
        left: "10dp",
        bottom: "5dp",
        id: "lbl_serviceLocation",
        text: "Location: "
    });
    $.__views.header.add($.__views.lbl_serviceLocation);
    $.__views.__alloyId24 = Ti.UI.createView({
        top: "0dp",
        layout: "vertical",
        id: "__alloyId24"
    });
    $.__views.serviceDates.add($.__views.__alloyId24);
    $.__views.TV_serviceDates = Ti.UI.createTableView({
        height: Titanium.UI.SIZE,
        id: "TV_serviceDates"
    });
    $.__views.__alloyId24.add($.__views.TV_serviceDates);
    $.__views.actIndicator = Ti.UI.createActivityIndicator({
        font: {
            fontFamily: "Helvetica Neue",
            fontSize: 26,
            fontWeight: "bold"
        },
        message: "Loading...",
        style: Ti.UI.ActivityIndicatorStyle.BIG_DARK,
        top: 10,
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        id: "actIndicator"
    });
    $.__views.__alloyId24.add($.__views.actIndicator);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    $.actIndicator.show();
    var serviceDatesProcessing = require("serviceDatesProcessing");
    $.lbl_serviceLocation.text = "Location: " + Alloy.Globals.locObj.addressWCity;
    serviceDatesProcessing.getCombinedServicesfromServer($, Alloy.Globals.locObj.cagaddressid);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;