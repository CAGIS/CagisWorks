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
    this.__controllerPath = "index";
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
    if (Alloy.isTablet) {
        $.__views.master = Alloy.createController("master", {
            id: "master"
        });
        $.__views.detail = Alloy.createController("cagisMap", {
            id: "detail"
        });
        $.__views.index = Ti.UI.iPad.createSplitWindow({
            masterView: $.__views.master.getViewEx({
                recurse: true
            }),
            detailView: $.__views.detail.getViewEx({
                recurse: true
            }),
            id: "index"
        });
        $.__views.index && $.addTopLevelView($.__views.index);
    }
    if (!Alloy.isTablet) {
        $.__views.master = Alloy.createController("master", {
            id: "master"
        });
        $.__views.index = Ti.UI.iOS.createNavigationWindow({
            window: $.__views.master.getViewEx({
                recurse: true
            }),
            id: "index"
        });
        $.__views.index && $.addTopLevelView($.__views.index);
    }
    exports.destroy = function() {};
    _.extend($, $.__views);
    true && Alloy.isTablet;
    var usesNavGroup = true && Alloy.isHandheld || false;
    Alloy.Globals.usesNavGroup = usesNavGroup;
    usesNavGroup && (Alloy.Globals.navgroup = $.index);
    $.index.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;