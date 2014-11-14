function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function cancelSearch(e) {
        e.source.blur();
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
        setAddressInMap(SelLocObj);
        locSearchCalls.storeLocationMRU(SelLocObj);
    }
    function setAddressInMap(addrSelLocObj) {
        var xCoord = 0;
        var yCoord = 0;
        void 0 !== addrSelLocObj.IntersectionX && (xCoord = addrSelLocObj.IntersectionX);
        void 0 !== addrSelLocObj.IntersectionY && (yCoord = addrSelLocObj.IntersectionY);
        void 0 !== addrSelLocObj.x_coord && (xCoord = addrSelLocObj.x_coord);
        void 0 !== addrSelLocObj.y_coord && (yCoord = addrSelLocObj.y_coord);
        Ti.API.info("setAddressInMap: " + JSON.stringify({
            toX: xCoord,
            toY: yCoord,
            mapContext: Alloy.Globals.mapContext,
            zoom: true
        }));
        Ti.App.fireEvent("map.centerAndZoom", {
            toX: xCoord,
            toY: yCoord,
            mapContext: Alloy.Globals.mapContext,
            zoom: true
        });
        $.locField.value = addrSelLocObj.address;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "cagisMap";
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
    $.__views.cagisMap = Ti.UI.createWindow({
        backgroundColor: "#000",
        layout: "vertical",
        title: "CAGIS Map",
        backButtonTitle: "",
        navBarHidden: "false",
        id: "cagisMap"
    });
    $.__views.cagisMap && $.addTopLevelView($.__views.cagisMap);
    $.__views.locField = Ti.UI.createSearchBar({
        height: "43dp",
        showCancel: "true",
        width: "100%",
        id: "locField",
        hintText: "Enter Location",
        showBookmark: "true"
    });
    $.__views.cagisMap.add($.__views.locField);
    cancelSearch ? $.__views.locField.addEventListener("cancel", cancelSearch) : __defers["$.__views.locField!cancel!cancelSearch"] = true;
    closeKeyboard ? $.__views.locField.addEventListener("return", closeKeyboard) : __defers["$.__views.locField!return!closeKeyboard"] = true;
    $.__views.cagMapWebView = Ti.UI.createWebView({
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        borderRadius: "1",
        touchEnabled: true,
        id: "cagMapWebView",
        url: "/webViews/local_webview.html",
        willHandleTouches: "true"
    });
    $.__views.cagisMap.add($.__views.cagMapWebView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var locSearchCalls = require("locationSearchProcessing");
    locSearchCalls.parentController = $;
    Ti.App.addEventListener("locselected", onLocationSelection);
    $.on("close", function() {
        Ti.App.removeEventListener("locselected", onLocationSelection);
    });
    __defers["$.__views.locField!cancel!cancelSearch"] && $.__views.locField.addEventListener("cancel", cancelSearch);
    __defers["$.__views.locField!return!closeKeyboard"] && $.__views.locField.addEventListener("return", closeKeyboard);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;