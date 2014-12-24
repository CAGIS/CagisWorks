function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function addWinToNavGroup(win) {
        Alloy.Globals.usesNavGroup ? Alloy.Globals.navgroup.openWindow(win) : win.open();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "requestGroupSRList";
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
    $.__views.serviceWindow = Ti.UI.createWindow({
        backgroundColor: "#fff",
        layout: "vertical",
        navBarHidden: true,
        id: "serviceWindow",
        title: "Request a Service",
        backButtonTitle: "Back"
    });
    $.__views.serviceWindow && $.addTopLevelView($.__views.serviceWindow);
    $.__views.header = Ti.UI.createView({
        backgroundColor: "black",
        height: Titanium.UI.SIZE,
        id: "header",
        layout: "vertical"
    });
    $.__views.serviceWindow.add($.__views.header);
    $.__views.locationLbl = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "white",
        font: {
            fontSize: 12
        },
        left: "10dp",
        bottom: "5dp",
        id: "locationLbl"
    });
    $.__views.header.add($.__views.locationLbl);
    $.__views.__alloyId18 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "white",
        font: {
            fontSize: 12
        },
        left: "10dp",
        bottom: "5dp",
        text: "Step 2 - Select Request",
        id: "__alloyId18"
    });
    $.__views.header.add($.__views.__alloyId18);
    $.__views.__alloyId19 = Ti.UI.createView({
        top: "0dp",
        layout: "vertical",
        id: "__alloyId19"
    });
    $.__views.serviceWindow.add($.__views.__alloyId19);
    $.__views.tvSRs = Ti.UI.createTableView({
        height: Titanium.UI.SIZE,
        id: "tvSRs"
    });
    $.__views.__alloyId19.add($.__views.tvSRs);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var reportCSRData = require("reportcsr_datacalls");
    Ti.API.info(reportCSRData);
    $.locationLbl.text = "Location: " + Alloy.Globals.locObj.addressWCity;
    var selectedGroup = Alloy.Globals.selectedGroup;
    var getGroup_SRList = function(selectedGroup) {
        Ti.API.info("selected group: " + selectedGroup);
        var myList = Alloy.Globals.allSRTypes;
        Ti.API.info("SRTypeRequestList: " + myList);
        var srCatAry = myList.ServiceRequestCategoryList;
        var data = [];
        for (var c = 0; c < srCatAry.length; c++) {
            var catList = srCatAry[c];
            if (catList.category == selectedGroup) {
                Ti.API.info(JSON.stringify("Selected group request types: " + JSON.stringify(catList.ServiceRequests)));
                for (var i = 0; i < catList.ServiceRequests.length; i++) {
                    var tvr = Ti.UI.createTableViewRow({
                        hasChild: true
                    });
                    var myLabel = Ti.UI.createLabel({
                        color: "black",
                        top: "5dp",
                        left: "20dp",
                        right: "20dp",
                        font: {
                            fontSize: 12
                        }
                    });
                    myLabel.text = catList.ServiceRequests[i].description;
                    tvr.id = catList.ServiceRequests[i].id;
                    tvr.name = catList.ServiceRequests[i].description;
                    tvr.add(myLabel);
                    tvr.addEventListener("click", function(e) {
                        Alloy.Globals.srType = true == Alloy.Globals.isAndroid ? e.row.id : e.rowData.id;
                        var win = Alloy.createController("requestDataEntry").getView();
                        Alloy.Globals.requestDataEntry = win;
                        addWinToNavGroup(win);
                    });
                    data.push(tvr);
                }
            }
        }
        data.sort(sortSRData);
        $.tvSRs.setData(data);
    };
    var sortSRData = function(a, b) {
        var nameA = a.name.toLowerCase();
        var nameB = b.name.toLowerCase();
        if (nameB > nameA) return -1;
        if (nameA > nameB) return 1;
        return 0;
    };
    getGroup_SRList(selectedGroup);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;