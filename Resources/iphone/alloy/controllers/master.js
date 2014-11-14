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
    function openPothole() {
        Alloy.Globals.srType = "PTHOLE";
        var win = Alloy.createController("requestDataEntry").getView();
        Alloy.Globals.requestDataEntry = win;
        addWinToNavGroup(win);
    }
    function openServiceDatesWindow() {
        var win = Alloy.createController("serviceDates").getView();
        addWinToNavGroup(win);
    }
    function openExploreMapWindow() {
        var win = Alloy.createController("cagisMap").getView();
        addWinToNavGroup(win);
    }
    function openLocatorLocalListWindow() {
        var win = Alloy.createController("locatorLocalList").getView();
        addWinToNavGroup(win);
    }
    function openContactInfoWindow() {
        var win = Alloy.createController("contactInfo").getView();
        Alloy.Globals.contactInfo = win;
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
        backgroundColor: "#fff",
        layout: "vertical",
        title: "City Hall",
        id: "master"
    });
    $.__views.master && $.addTopLevelView($.__views.master);
    $.__views.openReportCSRWindow = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        font: {
            fontSize: "18dp"
        },
        top: 10,
        text: "Request Services",
        id: "openReportCSRWindow"
    });
    $.__views.master.add($.__views.openReportCSRWindow);
    openReportCSRWindow ? $.__views.openReportCSRWindow.addEventListener("click", openReportCSRWindow) : __defers["$.__views.openReportCSRWindow!click!openReportCSRWindow"] = true;
    $.__views.openServiceDatesWindow = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        font: {
            fontSize: "18dp"
        },
        top: 10,
        text: "Service Dates",
        id: "openServiceDatesWindow"
    });
    $.__views.master.add($.__views.openServiceDatesWindow);
    openServiceDatesWindow ? $.__views.openServiceDatesWindow.addEventListener("click", openServiceDatesWindow) : __defers["$.__views.openServiceDatesWindow!click!openServiceDatesWindow"] = true;
    $.__views.openExploreMapWindow = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        font: {
            fontSize: "18dp"
        },
        top: 10,
        text: "Map",
        id: "openExploreMapWindow"
    });
    $.__views.master.add($.__views.openExploreMapWindow);
    openExploreMapWindow ? $.__views.openExploreMapWindow.addEventListener("click", openExploreMapWindow) : __defers["$.__views.openExploreMapWindow!click!openExploreMapWindow"] = true;
    $.__views.openContactInfoWindow = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        font: {
            fontSize: "18dp"
        },
        top: 10,
        text: "My Info",
        id: "openContactInfoWindow"
    });
    $.__views.master.add($.__views.openContactInfoWindow);
    openContactInfoWindow ? $.__views.openContactInfoWindow.addEventListener("click", openContactInfoWindow) : __defers["$.__views.openContactInfoWindow!click!openContactInfoWindow"] = true;
    $.__views.openLocatorLocalListWindow = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        font: {
            fontSize: "18dp"
        },
        top: 10,
        text: "Local Stored Locator List",
        id: "openLocatorLocalListWindow"
    });
    $.__views.master.add($.__views.openLocatorLocalListWindow);
    openLocatorLocalListWindow ? $.__views.openLocatorLocalListWindow.addEventListener("click", openLocatorLocalListWindow) : __defers["$.__views.openLocatorLocalListWindow!click!openLocatorLocalListWindow"] = true;
    $.__views.openPothole = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        font: {
            fontSize: "18dp"
        },
        top: 10,
        text: "Pothole",
        id: "openPothole"
    });
    $.__views.master.add($.__views.openPothole);
    openPothole ? $.__views.openPothole.addEventListener("click", openPothole) : __defers["$.__views.openPothole!click!openPothole"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    Alloy.Collections.LocationMRU && Alloy.Collections.LocationMRU.fetch();
    $.master.addEventListener("close", function() {
        $.destroy();
    });
    __defers["$.__views.openReportCSRWindow!click!openReportCSRWindow"] && $.__views.openReportCSRWindow.addEventListener("click", openReportCSRWindow);
    __defers["$.__views.openServiceDatesWindow!click!openServiceDatesWindow"] && $.__views.openServiceDatesWindow.addEventListener("click", openServiceDatesWindow);
    __defers["$.__views.openExploreMapWindow!click!openExploreMapWindow"] && $.__views.openExploreMapWindow.addEventListener("click", openExploreMapWindow);
    __defers["$.__views.openContactInfoWindow!click!openContactInfoWindow"] && $.__views.openContactInfoWindow.addEventListener("click", openContactInfoWindow);
    __defers["$.__views.openLocatorLocalListWindow!click!openLocatorLocalListWindow"] && $.__views.openLocatorLocalListWindow.addEventListener("click", openLocatorLocalListWindow);
    __defers["$.__views.openPothole!click!openPothole"] && $.__views.openPothole.addEventListener("click", openPothole);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;