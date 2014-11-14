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
    this.__controllerPath = "CopycagisMap";
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
    $.__views.CopycagisMap = Ti.UI.createWindow({
        backgroundColor: "#fff",
        layout: "vertical",
        navBarHidden: true,
        title: "CAGIS Map",
        modal: "true",
        backButtonTitle: "",
        id: "CopycagisMap"
    });
    $.__views.CopycagisMap && $.addTopLevelView($.__views.CopycagisMap);
    $.__views.header = Ti.UI.createView({
        backgroundColor: "black",
        height: Titanium.UI.SIZE,
        id: "header"
    });
    $.__views.CopycagisMap.add($.__views.header);
    $.__views.locField = Ti.UI.Android.createSearchView({
        id: "locField",
        hintText: "Enter Location"
    });
    $.__views.CopycagisMap.add($.__views.locField);
    closeKeyboard ? $.__views.locField.addEventListener("submit", closeKeyboard) : __defers["$.__views.locField!submit!closeKeyboard"] = true;
    $.__views.cagMapWebView = Ti.UI.createWebView({
        id: "cagMapWebView",
        url: "/webViews/local_webview.html",
        willHandleTouches: "false"
    });
    $.__views.CopycagisMap.add($.__views.cagMapWebView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.locField!submit!closeKeyboard"] && $.__views.locField.addEventListener("submit", closeKeyboard);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;