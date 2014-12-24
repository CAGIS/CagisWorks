function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function onLocationSelected(e) {
        Ti.API.info("triggering .locselected-rowdata" + JSON.stringify(e.rowData));
        var addrSelLocObj = JSON.parse(JSON.stringify(e.rowData));
        Ti.App.fireEvent("locselected", {
            data: addrSelLocObj
        });
        $.locationSelectionList.close();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "locationSelectionList";
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
    $.__views.locationSelectionList = Ti.UI.createWindow({
        backgroundColor: "#fff",
        layout: "vertical",
        navBarHidden: true,
        id: "locationSelectionList"
    });
    $.__views.locationSelectionList && $.addTopLevelView($.__views.locationSelectionList);
    $.__views.lbl_headerview = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        font: {
            fontSize: "24dp"
        },
        text: "Select Location",
        id: "lbl_headerview"
    });
    $.__views.locListTableView = Ti.UI.createTableView({
        top: Alloy.Globals.top,
        headerView: $.__views.lbl_headerview,
        id: "locListTableView"
    });
    $.__views.locationSelectionList.add($.__views.locListTableView);
    onLocationSelected ? $.__views.locListTableView.addEventListener("click", onLocationSelected) : __defers["$.__views.locListTableView!click!onLocationSelected"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    exports.setTableViewData = function(_tableData) {
        $.locListTableView.setData(_tableData);
        Ti.API.info("exports.setTableViewData");
    };
    __defers["$.__views.locListTableView!click!onLocationSelected"] && $.__views.locListTableView.addEventListener("click", onLocationSelected);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;