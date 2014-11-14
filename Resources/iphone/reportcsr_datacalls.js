function addWinToNavGroup(win) {
    Alloy.Globals.usesNavGroup && Alloy.Globals.navgroup.openWindow(win);
}

var onServerDataCall_GetSRConfig_Success = function(_jsonReply) {
    Alloy.Globals.QAControlList = [];
    Ti.API.info("successfully retrieved SR configuration data");
    Ti.API.info(JSON.stringify(_jsonReply));
    var myPurpose = _jsonReply.SRDataInfo.SRPURPOSE;
    Ti.API.info(myPurpose);
    var myType = _jsonReply.SRDataInfo.SRTYPECODE;
    Ti.API.info(myType);
    var myEmailList = _jsonReply.SRDataInfo.EMAILLIST;
    Ti.API.info(myEmailList);
    var $ = exports.parentHandle;
    var QA = _jsonReply.questions;
    Ti.API.info("QA: " + JSON.stringify(QA));
    Ti.API.info(QA.length);
    $.SRDesc.text = myPurpose;
    var data = [];
    try {
        var myQuestionObj = {
            AnswerType: "none",
            Information: "",
            Question: "Please provide any additional information that may help us serve you.",
            SortID: QA.length + 1,
            TheAnswer: "",
            Updateable: "true",
            picklist: null
        };
    } catch (e) {
        Ti.API.info(e);
    }
    try {
        QA.push(myQuestionObj);
    } catch (e) {
        Ti.API.info(e);
    }
    for (var i = 0; i <= QA.length - 1; i++) {
        Ti.API.info(i);
        var myLabel = Ti.UI.createLabel({
            color: "black",
            top: "5dp",
            left: "20dp",
            right: "20dp",
            font: {
                fontSize: 12
            }
        });
        myLabel.text = QA[i].Question;
        Ti.API.info(QA[i].Question);
        var tvr = Ti.UI.createTableViewRow({
            touchEnabled: false,
            layout: "vertical"
        });
        tvr.backgroundColor = i % 2 == 0 ? "#FFFFFF" : "#E0E0E0";
        tvr.add(myLabel);
        Ti.API.info(JSON.stringify(tvr));
        if ("yesno" === QA[i].AnswerType) {
            var yn = Ti.UI.createSwitch({
                id: QA[i].SortID,
                right: "10dp",
                titleOn: "Yes",
                titleOff: "No",
                SortID: QA[i].SortID,
                Question: QA[i].Question,
                TheAnswer: "No",
                bottom: "5dp"
            });
            if (true == Alloy.Globals.isAndroid) {
                yn.setStyle(Titanium.UI.Android.SWITCH_STYLE_CHECKBOX);
                yn.setBorderRadius(7);
                yn.setColor("blue");
                yn.setTitle("No");
                yn.setTextAlign(Ti.UI.TEXT_ALIGNMENT_CENTER);
                yn.setWidth("60dp");
                yn.addEventListener("click", function(e) {
                    Ti.API.info(JSON.stringify(e));
                    if (true == e.source.value) {
                        e.source.setTitle("Yes");
                        e.source.TheAnswer = "Yes";
                    } else {
                        e.source.setTitle("No");
                        e.source.TheAnswer = "No";
                    }
                });
            } else yn.addEventListener("change", function(e) {
                Ti.API.info(JSON.stringify(e));
                e.source.TheAnswer = true == e.source.value ? "Yes" : "No";
            });
            myLabel.right = "70dp";
            Alloy.Globals.QAControlList.push(yn);
            tvr.add(yn);
        }
        if ("dropdownlist" === QA[i].AnswerType) {
            var horizontalVW = Ti.UI.createView({
                style: "horizontal",
                height: "20dp",
                bottom: "10dp"
            });
            var qLbl = Ti.UI.createLabel({
                className: "contentLabel",
                height: "auto",
                id: "srqdd_label" + QA[i].SortID,
                SortID: QA[i].SortID,
                Question: QA[i].Question,
                TheAnswer: "",
                text: "Select an answer from this list:",
                left: "80dp",
                font: {
                    fontSize: 12
                }
            });
            horizontalVW.add(qLbl);
            var btn = Ti.UI.createButton({
                id: QA[i].SortID,
                title: "Select",
                right: "10dp",
                backgroundColor: "transparent",
                color: "blue",
                SortID: QA[i].SortID,
                Question: QA[i].Question,
                TheAnswer: QA[i].TheAnswer,
                font: {
                    fontSize: 12
                },
                picklist: QA[i].picklist.Answers
            });
            myLabel.right = "70dp";
            Alloy.Globals.QAControlList.push(qLbl);
            btn.addEventListener("click", function(e) {
                var win = Ti.UI.createWindow({
                    exitOnClose: false,
                    height: "100%",
                    width: "100%"
                });
                var vw = Ti.UI.createView({
                    height: "100%",
                    width: "100%",
                    backgroundColor: "#dcdcdc",
                    layout: "vertical",
                    borderColor: "black",
                    borderWidth: "2dp"
                });
                win.add(vw);
                var picker = Ti.UI.createPicker({
                    color: "black",
                    top: "50dp",
                    visible: true,
                    top: "0dp",
                    useSpinner: true
                });
                var data = [];
                for (var ix = 0; ix < e.source.picklist.length; ix++) data[ix] = Ti.UI.createPickerRow({
                    title: e.source.picklist[ix]
                });
                picker.add(data);
                picker.selectionIndicator = true;
                picker.show();
                vw.add(picker);
                var btn2 = Ti.UI.createButton({
                    title: "Select"
                });
                btn2.addEventListener("click", function() {
                    var sr = picker.getSelectedRow(0);
                    var optID = e.source.SortID;
                    var rObj;
                    try {
                        for (var q = 0, ql = Alloy.Globals.QAControlList.length; ql > q; q++) Alloy.Globals.QAControlList[q].SortID === optID && (rObj = Alloy.Globals.QAControlList[q]);
                    } catch (e) {
                        Ti.API.info(e);
                    }
                    rObj.text = sr.getTitle();
                    rObj.TheAnswer = rObj.text;
                    rObj.left = 20;
                    rObj.width = "90%";
                    rObj.color = "black";
                    rObj.font = {
                        fontWeight: "bold",
                        fontSize: 12
                    };
                    win.close();
                });
                vw.add(btn2);
                win.open();
                Ti.API.info("button clicked 2");
            });
            horizontalVW.add(btn);
            tvr.add(horizontalVW);
        }
        if ("none" === QA[i].AnswerType || "multiple" === QA[i].AnswerType) {
            var tf = Ti.UI.createTextField({
                id: QA[i].SortID,
                borderStyle: Titanium.UI.INPUT_BORDERSTYLE_BEZEL,
                top: "10dp",
                bottom: "10dp",
                right: "20dp",
                left: "20dp",
                height: "35dp",
                color: "black",
                font: {
                    fontSize: 12
                },
                SortID: QA[i].SortID,
                Question: QA[i].Question,
                TheAnswer: QA[i].TheAnswer
            });
            tf.setHintText(i == QA.length - 1 ? "Additional information" : "Answer");
            tf.addEventListener("change", function(e) {
                e.source.TheAnswer = e.source.value;
            });
            tvr.layout = "vertical";
            Alloy.Globals.QAControlList.push(tf);
            tvr.add(tf);
        }
        data.push(tvr);
    }
    var buttonTvr = Ti.UI.createTableViewRow({
        height: Titanium.UI.SIZE
    });
    var btnContinue = Ti.UI.createButton({
        title: "Continue",
        right: "45%",
        top: "10dp",
        width: "100dp",
        buttom: "10dp"
    });
    btnContinue.addEventListener("click", function() {
        Ti.API.info(JSON.stringify(Alloy.Globals.QAControlList));
        var QA = Alloy.Globals.QAControlList;
        for (var i = 0; i < QA.length; i++) {
            Ti.API.info("-----------------");
            Ti.API.info(QA[i].SortID);
            Ti.API.info(QA[i].Question);
            Ti.API.info(QA[i].TheAnswer);
        }
    });
    var btnCancel = Ti.UI.createButton({
        title: "Cancel",
        left: "55%",
        top: "10dp",
        width: "100dp",
        buttom: "10dp"
    });
    buttonTvr.add(btnContinue);
    buttonTvr.add(btnCancel);
    data.push(buttonTvr);
    $.tvQA.setData(data);
    if ("ERROR" == _jsonReply.Status) {
        var alertDialog = Titanium.UI.createAlertDialog({
            title: "Problem Encountered",
            message: "Sorry, we had problems getting the service request questions.\n\nPlease try again.",
            buttonNames: [ "OK" ]
        });
        alertDialog.show();
        return;
    }
};

var myTestFunction = function(QAElement) {
    var data = [];
    Ti.API.info(QAElement.Question);
    var tvr = Ti.UI.createTableViewRow();
    tvr.title = QAElement.Question;
    data.push(tvr);
    $.tvLocationChoice.setData(data);
};

var onServerDataCall_GetSRConfig_Error = function(_e) {
    Ti.API.info("onServerDataCall_GetSRConfig_Error" + JSON.stringify(_e));
    Ti.API.info("this is my failure");
    var alertDialog = Titanium.UI.createAlertDialog({
        title: "Problem Encountered",
        message: "Sorry, we had problems getting the service request questions.\n\nPlease try again.",
        buttonNames: [ "OK" ]
    });
    alertDialog.show();
};

var webCalls = require("webcalls");

exports.getSRConfigDatafromServer = function(parentHandle, SR_TypeID, theCityID) {
    exports.parentHandle = parentHandle;
    "GRFITI" == SR_TypeID && (theCityID = "CINC");
    "LITR-PRV" == SR_TypeID && (theCityID = "CINC");
    "RF-COLLT" == SR_TypeID && (theCityID = "CINC");
    "PTHOLE" == SR_TypeID && (theCityID = "CINC");
    "BLD-RES" == SR_TypeID && (theCityID = "CINC");
    "" === theCityID && (theCityID = "CINC");
    webCalls.JSONrequest({
        method: "GET",
        action: Alloy.Globals.cagapp.csrDomain + Alloy.Globals.cagapp.csrVirtualDir + "CinciServices/ServiceRequestTypesConfig",
        parameters: {
            id: SR_TypeID,
            juris: theCityID
        },
        success: onServerDataCall_GetSRConfig_Success,
        error: onServerDataCall_GetSRConfig_Error
    });
};

var onServerDataCall_submitCSR_Success = function() {};

var submitCSR = function(submitJSONObj) {
    cag.app.csrDomain + cag.app.csrVirtualDir + "CinciServices/posttests";
    Ti.API.info(submitJSONObj);
    var URL = cag.app.csrDomain + cag.app.csrVirtualDir + "CinciServices/posttests";
    cag.webrequestutil.JSONpost(URL, submitJSONObj);
    return;
};

var myFunction = function(submitJSONObj) {
    var URL = cag.app.csrDomain + cag.app.csrVirtualDir + "CinciServices/posttests";
    cag.webrequestutil.JSONpost(URL, submitJSONObj);
};

var onServerDataCall_GetGroupData_Success = function(_jsonReply) {
    Ti.API.info("List returned from server: " + JSON.stringify(_jsonReply));
    var $ = exports.parentHandle;
    $.actIndicator.hide();
    if ("ERROR" == _jsonReply.Status) return;
    Alloy.Globals.allSRTypes = _jsonReply;
    var data = [];
    var groupArray = _jsonReply.ServiceRequestCategories;
    for (var i = 0; i < groupArray.length; i++) {
        var myLabel = Ti.UI.createLabel({
            color: "black",
            top: "5dp",
            left: "20dp",
            right: "20dp",
            font: {
                fontSize: 12
            }
        });
        myLabel.text = groupArray[i];
        var tvr = Ti.UI.createTableViewRow({
            hasChild: true
        });
        tvr.id = groupArray[i];
        tvr.add(myLabel);
        tvr.name = groupArray[i];
        tvr.addEventListener("click", function(e) {
            Alloy.Globals.selectedGroup = true == Alloy.Globals.isAndroid ? e.row.id : e.rowData.id;
            Ti.API.info("This is th problem");
            var win = Alloy.createController("requestGroupSRList").getView();
            Alloy.Globals.requestGroupSRList = win;
            addWinToNavGroup(win);
        });
        data.push(tvr);
    }
    data.sort(sortSRData);
    $.tvGroups.setData(data);
};

var onServerDataCall_GetGroupData_Error = function(_e) {
    Ti.API.info("onServerDataCall_GetSRConfig_Error" + JSON.stringify(_e));
    Ti.API.info("this is my failure");
    var alertDialog = Titanium.UI.createAlertDialog({
        title: "Problem Encountered",
        message: "Sorry, we had problems getting the service request descriptions.\n\nPlease try again.",
        buttonNames: [ "OK" ]
    });
    alertDialog.show();
};

var onServerDataCall_GetFavoritesData_Success = function(_jsonReply) {
    var $ = exports.parentHandle;
    $.actIndicator.hide();
    Ti.API.info("Favorites list returned from server: " + JSON.stringify(_jsonReply));
    if ("ERROR" == _jsonReply.Status) return;
    var data = [];
    var favArray = _jsonReply.ServiceRequests;
    for (var i = 0; i < favArray.length; i++) {
        Ti.API.info(favArray[i].description);
        var myLabel = Ti.UI.createLabel({
            color: "black",
            top: "5dp",
            left: "20dp",
            right: "20dp",
            font: {
                fontSize: 12
            }
        });
        myLabel.text = favArray[i].description;
        var tvr = Ti.UI.createTableViewRow({
            hasChild: true
        });
        tvr.add(myLabel);
        tvr.id = favArray[i].id;
        data.push(tvr);
        tvr.addEventListener("click", function(e) {
            Alloy.Globals.srType = true == Alloy.Globals.isAndroid ? e.row.id : e.rowData.id;
            var win = Alloy.createController("requestDataEntry").getView();
            Alloy.Globals.requestDataEntry = win;
            addWinToNavGroup(win);
        });
    }
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
    myLabel.text = "More requests";
    tvr.add(myLabel);
    tvr.addEventListener("click", function(e) {
        Alloy.Globals.srType = true == Alloy.Globals.isAndroid ? e.row.id : e.rowData.id;
        var win = Alloy.createController("requestGroups").getView();
        Alloy.Globals.requestDataEntry = win;
        addWinToNavGroup(win);
    });
    data.push(tvr);
    $.tvFavorites.setData(data);
};

var onServerDataCall_GetTempFavoritesData_Success = function(_jsonReply) {
    var mException = JSON.stringify(_jsonReply);
    var mInt = mException.indexOf("Exception");
    Ti.API.info("Temp Favorites list returned from server: " + JSON.stringify(_jsonReply));
    Ti.App.TempFavoriteSRTypeRequestList = (mInt = -1) ? _jsonReply : null;
    if ("ERROR" == _jsonReply.Status) return;
};

var onServerDataCall_GetFavoritesData_Error = function(_e) {
    Ti.API.info("onServerDataCall_GetSRConfig_Error" + JSON.stringify(_e));
    var $ = exports.parentHandle;
    $.actIndicator.hide();
    var alertDialog = Titanium.UI.createAlertDialog({
        title: "Problem Encountered",
        message: "Sorry, we had problems getting the service request descriptions.\n\nPlease try again.",
        buttonNames: [ "OK" ]
    });
    alertDialog.show();
};

var onServerDataCall_GetTempFavoritesData_Error = function(_e) {
    Ti.API.info("onServerDataCall_GetSRConfig_Error" + JSON.stringify(_e));
    Ti.API.info("this is my failure");
};

exports.getSRGroupDatafromServer = function(parentHandle, category, theCityID) {
    "" === theCityID && (theCityID = "CINC");
    exports.parentHandle = parentHandle;
    var connectionString = "CinciServices/ServiceRequestTypes?juris=" + theCityID;
    webCalls.JSONrequest({
        method: "GET",
        action: Alloy.Globals.cagapp.csrDomain + Alloy.Globals.cagapp.csrVirtualDir + connectionString,
        parameters: {
            category: category
        },
        success: onServerDataCall_GetGroupData_Success,
        error: onServerDataCall_GetGroupData_Error
    });
};

exports.getFavoriteSRListfromServer = function(parentHandle, theCityID, theSeason) {
    "" === theCityID && (theCityID = "CINC");
    exports.parentHandle = parentHandle;
    var connectionString = "CinciServices/FavoriteServiceRequestTypes?juris=" + theCityID + "&" + theSeason;
    webCalls.JSONrequest({
        method: "GET",
        action: Alloy.Globals.cagapp.csrDomain + Alloy.Globals.cagapp.csrVirtualDir + connectionString,
        parameters: {
            category: "",
            keyword: theSeason
        },
        success: onServerDataCall_GetFavoritesData_Success,
        error: onServerDataCall_GetFavoritesData_Error
    });
};

var getTempFavoriteSRListfromServer = function(theCityID, theSeason) {
    "" === theCityID && (theCityID = "CINC");
    var connectionString = "CinciServices/FavoriteServiceRequestTypes?juris=" + theCityID + "&" + theSeason;
    cag.webrequestutil.JSONrequest({
        method: "GET",
        action: cag.app.csrDomain + cag.app.csrVirtualDir + connectionString,
        parameters: {
            category: "",
            keyword: theSeason
        },
        success: onServerDataCall_GetTempFavoritesData_Success,
        error: onServerDataCall_GetTempFavoritesData_Error
    });
};

var sortSRData = function(a, b) {
    var nameA = a.name.toLowerCase();
    var nameB = b.name.toLowerCase();
    if (nameB > nameA) return -1;
    if (nameA > nameB) return 1;
    return 0;
};