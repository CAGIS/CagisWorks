function onServerDataCall_Success(_jsonReply) {
    Ti.API.info(JSON.stringify(_jsonReply));
    setAddressList(_jsonReply);
}

function onServerDataCall_Error(_e) {
    Ti.API.info(JSON.stringify(_e));
}

function setAddressList(geoResultsObj) {
    Ti.API.info("Building Addresses: " + JSON.stringify(geoResultsObj));
    if (0 == geoResultsObj.ResultsCount) {
        var alertDialog = Titanium.UI.createAlertDialog({
            title: "NO ADDRESS FOUND",
            message: "Unable to find " + geoResultsObj.OriginalLocation + ".",
            buttonNames: [ "Please try a different address." ]
        });
        alertDialog.show();
        return;
    }
    try {
        var tvData = [];
        (2 == geoResultsObj.ResultType || 5 == geoResultsObj.ResultType) && (tvData = processAddressTypeResults(geoResultsObj));
        6 == geoResultsObj.ResultType && (tvData = processIntersectionResults(geoResultsObj));
        1 == tvData.length ? Ti.App.fireEvent("locselected", {
            data: tvData[0]
        }) : ShowLocationSelection(tvData);
    } catch (e) {
        Ti.API.info(JSON.stringify(e));
    }
}

function processAddressTypeResults(geoResultsObj) {
    Ti.API.info("New address search success results:");
    Ti.API.info("ResultsCount: " + geoResultsObj.ResultsCount);
    Ti.API.info(JSON.stringify(geoResultsObj.addressList[0]));
    var tvData = [];
    for (var i = 0, l = geoResultsObj.ResultsCount; l > i; i++) {
        var addressFound = false;
        if (0 == i) {
            geoResultsObj.addressList[i].id = geoResultsObj.addressList[i].cagaddressid;
            geoResultsObj.addressList[i].juris = geoResultsObj.addressList[i].cagjuris;
            geoResultsObj.addressList[i].title = geoResultsObj.addressList[i].addressWCity;
            geoResultsObj.addressList[i].ResultType = "Address";
            tvData.push(geoResultsObj.addressList[i]);
        } else {
            for (var x = 0; x < tvData.length; x++) tvData[x].addressWCity == geoResultsObj.addressList[i].addressWCity && (addressFound = true);
            if (false == addressFound) {
                geoResultsObj.addressList[i].id = geoResultsObj.addressList[i].cagaddressid;
                geoResultsObj.addressList[i].juris = geoResultsObj.addressList[i].cagjuris;
                geoResultsObj.addressList[i].title = geoResultsObj.addressList[i].addressWCity;
                geoResultsObj.addressList[i].ResultType = "Address";
                tvData.push(geoResultsObj.addressList[i]);
            }
        }
    }
    return tvData;
}

function processIntersectionTypeResults(geoResultsObj) {
    Ti.API.info("New intersection search results:ResultsCount: " + geoResultsObj.ResultsCount + JSON.stringify(geoResultsObj.interxList[0]));
    var tvData = [];
    for (var i = 0, l = geoResultsObj.ResultsCount; l > i; i++) {
        geoResultsObj.interxList[i].id = geoResultsObj.interxList[i].IntersectionID;
        geoResultsObj.interxList[i].juris = geoResultsObj.interxList[i].jurisabbrv;
        geoResultsObj.interxList[i].title = geoResultsObj.interxList[i].Intersection;
        geoResultsObj.interxList[i].ResultType = "Intersection";
        tvData.push(geoResultsObj.interxList[i]);
    }
    return tvData;
}

function ShowLocationSelection(_tableData) {
    var controller = Alloy.createController("locationSelectionList");
    controller.setTableViewData(_tableData);
    var win = controller.getView();
    win.open();
    Ti.API.info("locationSelectionList .opened");
}

var webCalls = require("webcalls");

exports.getLocationFromString = function(locationString) {
    webCalls.JSONrequest({
        method: "GET",
        action: Alloy.Globals.cagapp.geoDomain + Alloy.Globals.cagapp.geoVirtualDir + "GeoLocator/GetRealAddress_Cascade",
        parameters: {
            location: locationString,
            StreetMatchMode: 2,
            StreetContext: "ExpandSearch"
        },
        success: onServerDataCall_Success,
        error: onServerDataCall_Error
    });
};

exports.storeLocationMRU = function(locationObj) {
    var id = locationObj.id;
    var locItem = Alloy.Collections.LocationMRU.get(id);
    if (!locItem) {
        locItem = Alloy.createModel("LocationMRU", {
            id: id,
            DESCRIPTION: locationObj.title,
            json_obj: JSON.stringify(locationObj)
        });
        locItem.save();
        Alloy.Collections.LocationMRU.add(locItem);
    }
};