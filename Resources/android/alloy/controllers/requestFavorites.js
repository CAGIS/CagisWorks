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
    this.__controllerPath = "requestFavorites";
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
    $.__views.serviceWindow = Ti.UI.createWindow({
        backgroundColor: "#fff",
        layout: "vertical",
        navBarHidden: true,
        id: "serviceWindow",
        title: "Request a Service",
        backButtonTitle: "Home"
    });
    $.__views.serviceWindow && $.addTopLevelView($.__views.serviceWindow);
    $.__views.header = Ti.UI.createView({
        backgroundColor: "black",
        height: Titanium.UI.SIZE,
        id: "header",
        layout: "vertical"
    });
    $.__views.serviceWindow.add($.__views.header);
    $.__views.locationLbl = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "white",
        font: {
            fontSize: 12
        },
        left: "10dp",
        bottom: "5dp",
        id: "locationLbl"
    });
    $.__views.header.add($.__views.locationLbl);
    $.__views.__alloyId16 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "white",
        font: {
            fontSize: 12
        },
        left: "10dp",
        bottom: "5dp",
        text: "Step 2 - Select Request",
        id: "__alloyId16"
    });
    $.__views.header.add($.__views.__alloyId16);
    $.__views.__alloyId17 = Ti.UI.createView({
        top: "0dp",
        layout: "vertical",
        id: "__alloyId17"
    });
    $.__views.serviceWindow.add($.__views.__alloyId17);
    $.__views.tvFavorites = Ti.UI.createTableView({
        height: Titanium.UI.SIZE,
        id: "tvFavorites"
    });
    $.__views.__alloyId17.add($.__views.tvFavorites);
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
    $.__views.__alloyId17.add($.__views.actIndicator);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.actIndicator.show();
    var reportCSRData = require("reportcsr_datacalls");
    Ti.API.info("reportCSRData" + reportCSRData);
    $.locationLbl.text = "Location: " + Alloy.Globals.locObj.addressWCity;
    reportCSRData.getFavoriteSRListfromServer($, "CINC", "Summer");
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;