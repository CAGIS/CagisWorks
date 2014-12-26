function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function openReportCSRWindow() {
        var win = Alloy.createController("requestFavorites").getView();
        Alloy.Globals.requestFavorites = win;
        addWinToNavGroup(win);
    }
    function openServiceDatesWindow() {
        var win = Alloy.createController("serviceDates").getView();
        addWinToNavGroup(win);
    }
    function addWinToNavGroup(win) {
        Alloy.Globals.usesNavGroup && Alloy.Globals.navgroup.openWindow(win);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "master";
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
    $.__views.master = Ti.UI.createWindow({
        backgroundColor: "#EBEDC8",
        layout: "vertical",
        statusBarStyle: Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
        barColor: "FF00AEEF",
        navTintColor: "#fff",
        title: "City Hall",
        id: "master"
    });
    $.__views.master && $.addTopLevelView($.__views.master);
    $.__views.homeGrid = Ti.UI.createView({
        id: "homeGrid",
        backgroundColor: "transparent",
        width: "90%",
        top: "15%",
        layout: "vertical"
    });
    $.__views.master.add($.__views.homeGrid);
    $.__views.__alloyId19 = Ti.UI.createView({
        top: "0dip",
        height: "80dip",
        id: "__alloyId19"
    });
    $.__views.homeGrid.add($.__views.__alloyId19);
    $.__views.__alloyId20 = Ti.UI.createView({
        width: "65%",
        backgroundColor: "#00AEEF",
        height: "80dp",
        left: "0dip",
        layout: "absolute",
        id: "__alloyId20"
    });
    $.__views.__alloyId19.add($.__views.__alloyId20);
    openReportCSRWindow ? $.__views.__alloyId20.addEventListener("click", openReportCSRWindow) : __defers["$.__views.__alloyId20!click!openReportCSRWindow"] = true;
    $.__views.openReportCSRWindow = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "white",
        font: {
            fontSize: "18dp"
        },
        top: "50dip",
        text: "Request Services",
        id: "openReportCSRWindow"
    });
    $.__views.__alloyId20.add($.__views.openReportCSRWindow);
    $.__views.__alloyId21 = Ti.UI.createView({
        width: "34%",
        backgroundColor: "#D5E04D",
        height: "80dp",
        right: "0dip",
        id: "__alloyId21"
    });
    $.__views.__alloyId19.add($.__views.__alloyId21);
    openServiceDatesWindow ? $.__views.__alloyId21.addEventListener("click", openServiceDatesWindow) : __defers["$.__views.__alloyId21!click!openServiceDatesWindow"] = true;
    $.__views.__alloyId22 = Ti.UI.createView({
        top: "3dp",
        height: "80dip",
        id: "__alloyId22"
    });
    $.__views.homeGrid.add($.__views.__alloyId22);
    $.__views.__alloyId23 = Ti.UI.createView({
        width: "34%",
        backgroundColor: "#1A6196",
        height: "80dp",
        left: "0dip",
        id: "__alloyId23"
    });
    $.__views.__alloyId22.add($.__views.__alloyId23);
    $.__views.__alloyId24 = Ti.UI.createView({
        width: "65%",
        backgroundColor: "#00457C",
        height: "80dp",
        right: "0dip",
        id: "__alloyId24"
    });
    $.__views.__alloyId22.add($.__views.__alloyId24);
    $.__views.__alloyId25 = Ti.UI.createView({
        top: "3dp",
        height: "80dip",
        id: "__alloyId25"
    });
    $.__views.homeGrid.add($.__views.__alloyId25);
    $.__views.__alloyId26 = Ti.UI.createView({
        width: "44%",
        backgroundColor: "#00AEEF",
        height: "80dp",
        left: "0dp",
        id: "__alloyId26"
    });
    $.__views.__alloyId25.add($.__views.__alloyId26);
    $.__views.__alloyId27 = Ti.UI.createView({
        width: "55%",
        backgroundColor: "#D5E04D",
        height: "80dp",
        right: "0dp",
        id: "__alloyId27"
    });
    $.__views.__alloyId25.add($.__views.__alloyId27);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    Alloy.Collections.LocationMRU && Alloy.Collections.LocationMRU.fetch();
    $.master.addEventListener("close", function() {
        $.destroy();
    });
    __defers["$.__views.__alloyId20!click!openReportCSRWindow"] && $.__views.__alloyId20.addEventListener("click", openReportCSRWindow);
    __defers["$.__views.__alloyId21!click!openServiceDatesWindow"] && $.__views.__alloyId21.addEventListener("click", openServiceDatesWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;