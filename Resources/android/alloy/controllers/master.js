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
    $.__views.master = Ti.UI.createWindow({
        backgroundColor: "#EBEDC8",
        layout: "vertical",
        navBarHidden: true,
        exitOnClose: true,
        title: "City Hall",
        id: "master"
    });
    $.__views.master && $.addTopLevelView($.__views.master);
    $.__views.homeGrid = Ti.UI.createView({
        id: "homeGrid",
        backgroundColor: "black",
        width: "90%",
        height: "80%"
    });
    $.__views.master.add($.__views.homeGrid);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    Alloy.Collections.LocationMRU && Alloy.Collections.LocationMRU.fetch();
    $.master.addEventListener("close", function() {
        $.destroy();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;