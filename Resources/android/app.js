var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Alloy.Globals.top = 0;

Alloy.Globals.tableTop = "50dp";

try {} catch (e) {}

Alloy.Globals.isAndroid = true;

Alloy.Globals.QAControlList = [];

Alloy.Globals.mapContext = "location";

Alloy.Globals.cagapp = {
    webMapURL: "http://cagisonline.hamilton-co.org/CagisOnline/maps/mobilemap.html",
    geoDomain: "https://cagismaps.hamilton-co.org/",
    geoVirtualDir: "CagisGeoWebServicesV2010/",
    csrDomain: "https://cagismaps.hamilton-co.org/",
    csrVirtualDir: "CSRWebServices/",
    csrRecordDomain: "http://cagisperm.hamilton-co.org/",
    csrRecordDir: "cincsr/search/"
};

Alloy.Globals.locObj = {
    cagaddressid: "00010BROAD0601617000",
    address: "1617 BROADWAY",
    addressWCity: "1617 BROADWAY, CINC",
    cagjuris: "CINC",
    cagjurisName: "CINCINNATI",
    cagrecid: "00860002036801617B",
    aliasflg: "",
    isInterpolatedRecord: false,
    I_Parity: "",
    I_addmastr_X: "",
    I_addmastr_Y: "",
    I_addr_RightLeftSide: "",
    "\n 	LocatorType": 7,
    StreetNameID: "BROAD06",
    StreetSegmentFID: "HAM50903",
    StreetSegmentID: "3368506153033685351848",
    USState: "OH",
    buildingid: "GJ1536132284",
    cagaddressstatus: "ASSIGNED",
    cagaddresstype: "BLD",
    "\n 	caggroupparcelid": "008600020368",
    cagparcelid: "008600020368",
    cagplace: "",
    cagstreetname: "BROADWAY",
    cagstreetsuffix: "",
    cityid: "CINC",
    condoflg: "",
    countyCode: "HAM",
    floor: "",
    multiunit: "",
    BLDG_LinkType: "",
    originallocation: "",
    streetdir: "",
    streetfrac: "",
    streetno: "1617",
    streetnoSFX: "",
    tanAssetID: "S-HAM50903",
    unitid: "",
    usngcode: "GJ1536132284",
    x_coord: "1398488.795060",
    y_coord: "411760.4230",
    x_intp: "1398525.9880",
    y_intp: "411757.626240",
    zipcode: "45202"
};

Alloy.Collections.instance("LocationMRU");

Alloy.Collections.instance("contactInformation");

Alloy.createController("index");