function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function __alloyId18(e) {
        if (e && e.fromAdapter) return;
        __alloyId18.opts || {};
        var models = __alloyId17.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId14 = models[i];
            __alloyId14.__transform = {};
            var __alloyId16 = Ti.UI.createTableViewRow({
                color: "red",
                font: {
                    fontSize: 10
                },
                title: "undefined" != typeof __alloyId14.__transform["DESCRIPTION"] ? __alloyId14.__transform["DESCRIPTION"] : __alloyId14.get("DESCRIPTION")
            });
            rows.push(__alloyId16);
        }
        $.__views.TV_LocationMRU.setData(rows);
    }
    function closeKeyboard(e) {
        e.source.blur();
        LocationFromString();
    }
    function LocationFromString() {
        var locationString = $.locField.value;
        if ("" == locationString) return;
        locSearchCalls.getLocationFromString(locationString);
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
    var __defers = {};
    $.__views.locatorLocalList = Ti.UI.createWindow({
        backgroundColor: "#fff",
        layout: "vertical",
        title: "My Locations",
        id: "locatorLocalList"
    });
    $.__views.locatorLocalList && $.addTopLevelView($.__views.locatorLocalList);
    $.__views.locField = Ti.UI.createSearchBar({
        id: "locField",
        value: "1617 b",
        hintText: "Enter Location"
    });
    closeKeyboard ? $.__views.locField.addEventListener("return", closeKeyboard) : __defers["$.__views.locField!return!closeKeyboard"] = true;
    $.__views.TV_LocationMRU = Ti.UI.createTableView({
        height: Titanium.UI.SIZE,
        search: $.__views.locField,
        id: "TV_LocationMRU",
        hideSearchOnSelection: "true"
    });
    $.__views.locatorLocalList.add($.__views.TV_LocationMRU);
    var __alloyId17 = Alloy.Collections["LocationMRU"] || LocationMRU;
    __alloyId17.on("fetch destroy change add remove reset", __alloyId18);
    exports.destroy = function() {
        __alloyId17.off("fetch destroy change add remove reset", __alloyId18);
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
    __defers["$.__views.locField!return!closeKeyboard"] && $.__views.locField.addEventListener("return", closeKeyboard);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;