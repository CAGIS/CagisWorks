function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function __alloyId14(e) {
        if (e && e.fromAdapter) return;
        __alloyId14.opts || {};
        var models = __alloyId13.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId10 = models[i];
            __alloyId10.__transform = {};
            var __alloyId12 = Ti.UI.createTableViewRow({
                color: "red",
                font: {
                    fontSize: 10
                },
                title: "undefined" != typeof __alloyId10.__transform["DESCRIPTION"] ? __alloyId10.__transform["DESCRIPTION"] : __alloyId10.get("DESCRIPTION")
            });
            rows.push(__alloyId12);
        }
        $.__views.TV_LocationMRU.setData(rows);
    }
    function onLocationSelection(_e) {
        Ti.API.info("onLocationSelection" + JSON.stringify(_e));
        var SelLocObj = _e.data;
        Ti.API.info("The current location object: " + JSON.stringify(SelLocObj));
        locSearchCalls.storeLocationMRU(SelLocObj);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "locatorLocalList";
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
    $.__views.locatorLocalList = Ti.UI.createWindow({
        backgroundColor: "#fff",
        layout: "vertical",
        navBarHidden: true,
        title: "My Locations",
        id: "locatorLocalList"
    });
    $.__views.locatorLocalList && $.addTopLevelView($.__views.locatorLocalList);
    $.__views.TV_LocationMRU = Ti.UI.createTableView({
        height: Titanium.UI.SIZE,
        id: "TV_LocationMRU",
        hideSearchOnSelection: "true"
    });
    $.__views.locatorLocalList.add($.__views.TV_LocationMRU);
    var __alloyId13 = Alloy.Collections["LocationMRU"] || LocationMRU;
    __alloyId13.on("fetch destroy change add remove reset", __alloyId14);
    exports.destroy = function() {
        __alloyId13.off("fetch destroy change add remove reset", __alloyId14);
    };
    _.extend($, $.__views);
    arguments[0] || {};
    Alloy.Collections.LocationMRU && Alloy.Collections.LocationMRU.fetch();
    var locSearchCalls = require("locationSearchProcessing");
    locSearchCalls.parentController = $;
    $.locatorLocalList.addEventListener("close", function() {
        $.destroy();
    });
    Ti.App.addEventListener("locselected", onLocationSelection);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;