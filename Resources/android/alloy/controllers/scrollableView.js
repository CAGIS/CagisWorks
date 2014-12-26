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
    this.__controllerPath = "scrollableView";
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
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "#fff",
        layout: "vertical",
        navBarHidden: true,
        id: "win"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    var __alloyId22 = [];
    $.__views.view1 = Ti.UI.createView({
        id: "view1",
        backgroundColor: "#FF00AEEF"
    });
    __alloyId22.push($.__views.view1);
    $.__views.__alloyId23 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#fff",
        font: {
            fontSize: "18dp"
        },
        transform: Alloy.Globals.rotateLeft,
        id: "__alloyId23"
    });
    $.__views.view1.add($.__views.__alloyId23);
    $.__views.scrollableView = Ti.UI.createScrollableView({
        backgroundColor: "#FF00AEEF",
        views: __alloyId22,
        id: "scrollableView",
        showPagingControl: "true"
    });
    $.__views.win.add($.__views.scrollableView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    console.info("Hi Dan");
    var bSVV = require("buildScrollableViewViews");
    Ti.API.info("Dan - just opened the window");
    Ti.API.info("Dan - " + Alloy.Globals.srType);
    bSVV.getSRConfigDatafromServer($, Alloy.Globals.srType, "CINC");
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;