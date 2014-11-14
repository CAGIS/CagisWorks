function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function __alloyId2() {
        $.__views.cagisMap.removeEventListener("open", __alloyId2);
        if ($.__views.cagisMap.activity) $.__views.cagisMap.activity.onCreateOptionsMenu = function(e) {
            var __alloyId0 = {
                showAsAction: Ti.Android.SHOW_AS_ACTION_ALWAYS,
                icon: Ti.Android.R.drawable.ic_menu_preferences,
                id: "item1",
                title: "Settings"
            };
            $.__views.item1 = e.menu.add(_.pick(__alloyId0, Alloy.Android.menuItemCreateArgs));
            $.__views.item1.applyProperties(_.omit(__alloyId0, Alloy.Android.menuItemCreateArgs));
            var __alloyId1 = {
                showAsAction: Ti.Android.SHOW_AS_ACTION_ALWAYS,
                icon: Ti.Android.R.drawable.ic_menu_search,
                id: "item2",
                title: "Search"
            };
            $.__views.item2 = e.menu.add(_.pick(__alloyId1, Alloy.Android.menuItemCreateArgs));
            $.__views.item2.applyProperties(_.omit(__alloyId1, Alloy.Android.menuItemCreateArgs));
            if ($.__views.cagisMap.activity.actionBar) {
                $.__views.cagisMap.activity.actionBar.title = "My XML Menu";
                $.__views.cagisMap.activity.actionBar.displayHomeAsUp = true;
                $.__views.cagisMap.activity.actionBar.icon = "/ic_menu_add.png";
            }
        }; else {
            Ti.API.warn("You attempted to attach an Android Menu to a lightweight Window");
            Ti.API.warn("or other UI component which does not have an Android activity.");
            Ti.API.warn("Android Menus can only be opened on TabGroups and heavyweight Windows.");
        }
    }
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
        navBarHidden: "false",
        title: "CAGIS Map",
        backButtonTitle: "",
        id: "cagisMap"
    });
    $.__views.cagisMap && $.addTopLevelView($.__views.cagisMap);
    $.__views.cagisMap.addEventListener("open", __alloyId2);
    $.__views.locField = Ti.UI.Android.createSearchView({
        height: "43dp",
        showCancel: "true",
        width: "100%",
        id: "locField",
        hintText: "Enter Location",
        showBookmark: "true"
    });
    $.__views.cagisMap.add($.__views.locField);
    cancelSearch ? $.__views.locField.addEventListener("cancel", cancelSearch) : __defers["$.__views.locField!cancel!cancelSearch"] = true;
    closeKeyboard ? $.__views.locField.addEventListener("submit", closeKeyboard) : __defers["$.__views.locField!submit!closeKeyboard"] = true;
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
    if (true && Ti.Platform.Android.API_LEVEL >= 11) {
        var search = Alloy.createController("searchView").getView();
        $.cagisMap.addEventListener("open", function() {
            $.cagisMap.activity.onCreateOptionsMenu = function(e) {
                e.menu.add({
                    title: "Table Search",
                    icon: Ti.Android.R.drawable.ic_menu_search ? Ti.Android.R.drawable.ic_menu_search : "my_search.png",
                    actionView: search,
                    showAsAction: Ti.Android.SHOW_AS_ACTION_ALWAYS | Ti.Android.SHOW_AS_ACTION_COLLAPSE_ACTION_VIEW
                });
            };
            $.cagisMap.activity.invalidateOptionsMenu();
        });
    }
    Ti.App.addEventListener("locselected", onLocationSelection);
    $.on("close", function() {
        Ti.App.removeEventListener("locselected", onLocationSelection);
    });
    __defers["$.__views.locField!cancel!cancelSearch"] && $.__views.locField.addEventListener("cancel", cancelSearch);
    __defers["$.__views.locField!submit!closeKeyboard"] && $.__views.locField.addEventListener("submit", closeKeyboard);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;