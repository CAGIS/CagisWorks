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
    this.__controllerPath = "contactInfo";
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
    $.__views.contactInfo = Ti.UI.createWindow({
        backgroundColor: "#fff",
        layout: "vertical",
        statusBarStyle: Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
        barColor: "FF00AEEF",
        navTintColor: "#fff",
        id: "contactInfo",
        title: "Contact Info",
        backButtonTitle: "Done"
    });
    $.__views.contactInfo && $.addTopLevelView($.__views.contactInfo);
    $.__views.__alloyId5 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId5"
    });
    $.__views.contactInfo.add($.__views.__alloyId5);
    $.__views.buttonVw = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        layout: "composite",
        id: "buttonVw"
    });
    $.__views.__alloyId5.add($.__views.buttonVw);
    $.__views.clearAllButton = Ti.UI.createButton({
        left: "10dp",
        top: "10dp",
        title: "Clear All",
        id: "clearAllButton"
    });
    $.__views.buttonVw.add($.__views.clearAllButton);
    clearAll ? $.__views.clearAllButton.addEventListener("click", clearAll) : __defers["$.__views.clearAllButton!click!clearAll"] = true;
    $.__views.contactsButton = Ti.UI.createButton({
        right: "10dp",
        top: "10dp",
        title: "Contacts",
        id: "contactsButton"
    });
    $.__views.buttonVw.add($.__views.contactsButton);
    displayContacts ? $.__views.contactsButton.addEventListener("click", displayContacts) : __defers["$.__views.contactsButton!click!displayContacts"] = true;
    var __alloyId6 = [];
    $.__views.__alloyId7 = Ti.UI.createTableViewRow({
        borderColor: "#ffffff",
        borderWidth: "0dp",
        right: "0dp",
        id: "__alloyId7"
    });
    __alloyId6.push($.__views.__alloyId7);
    $.__views.txtFirstName = Ti.UI.createTextField({
        color: "#336699",
        top: "10dp",
        left: "10dp",
        right: "0dp",
        height: "40dp",
        backgroundColor: "#DCDCDC",
        clearButtonMode: "Titanium.UI.INPUT_BUTTONMODE_ONFOCUS",
        paddingLeft: "5dp",
        paddingRight: "5dp",
        id: "txtFirstName",
        hintText: "First Name"
    });
    $.__views.__alloyId7.add($.__views.txtFirstName);
    $.__views.__alloyId8 = Ti.UI.createTableViewRow({
        borderColor: "#ffffff",
        borderWidth: "0dp",
        right: "0dp",
        id: "__alloyId8"
    });
    __alloyId6.push($.__views.__alloyId8);
    $.__views.txtLastName = Ti.UI.createTextField({
        color: "#336699",
        top: "10dp",
        left: "10dp",
        right: "0dp",
        height: "40dp",
        backgroundColor: "#DCDCDC",
        clearButtonMode: "Titanium.UI.INPUT_BUTTONMODE_ONFOCUS",
        paddingLeft: "5dp",
        paddingRight: "5dp",
        id: "txtLastName",
        hintText: "Last Name"
    });
    $.__views.__alloyId8.add($.__views.txtLastName);
    $.__views.__alloyId9 = Ti.UI.createTableViewRow({
        borderColor: "#ffffff",
        borderWidth: "0dp",
        right: "0dp",
        id: "__alloyId9"
    });
    __alloyId6.push($.__views.__alloyId9);
    $.__views.txtPhone = Ti.UI.createTextField({
        color: "#336699",
        top: "10dp",
        left: "10dp",
        right: "0dp",
        height: "40dp",
        backgroundColor: "#DCDCDC",
        clearButtonMode: "Titanium.UI.INPUT_BUTTONMODE_ONFOCUS",
        paddingLeft: "5dp",
        paddingRight: "5dp",
        id: "txtPhone",
        hintText: "Telephone Number"
    });
    $.__views.__alloyId9.add($.__views.txtPhone);
    $.__views.__alloyId10 = Ti.UI.createTableViewRow({
        borderColor: "#ffffff",
        borderWidth: "0dp",
        right: "0dp",
        id: "__alloyId10"
    });
    __alloyId6.push($.__views.__alloyId10);
    $.__views.txtEmail = Ti.UI.createTextField({
        color: "#336699",
        top: "10dp",
        left: "10dp",
        right: "0dp",
        height: "40dp",
        backgroundColor: "#DCDCDC",
        clearButtonMode: "Titanium.UI.INPUT_BUTTONMODE_ONFOCUS",
        paddingLeft: "5dp",
        paddingRight: "5dp",
        id: "txtEmail",
        hintText: "Email Address"
    });
    $.__views.__alloyId10.add($.__views.txtEmail);
    $.__views.contactInfoTableView = Ti.UI.createTableView({
        right: "10dp",
        height: Titanium.UI.SIZE,
        top: "0dp",
        data: __alloyId6,
        id: "contactInfoTableView"
    });
    $.__views.__alloyId5.add($.__views.contactInfoTableView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Alloy.Collections.contactInformation && Alloy.Collections.contactInformation.fetch();
    var contactInfo = Alloy.Collections.contactInformation.get("1");
    if (contactInfo) {
        $.txtFirstName.value = contactInfo.get("FirstName");
        $.txtLastName.setValue(contactInfo.get("LastName"));
        $.txtPhone.setValue(contactInfo.get("Phone"));
        $.txtEmail.setValue(contactInfo.get("Email"));
    }
    var clearAll = function() {
        $.txtFirstName.value = "";
        $.txtLastName.setValue("");
        $.txtPhone.setValue("");
        $.txtEmail.setValue("");
    };
    $.contactInfo.addEventListener("close", function() {
        var firstName = $.txtFirstName.getValue();
        var lastName = $.txtLastName.getValue();
        var phone = $.txtPhone.getValue();
        var eMail = $.txtEmail.getValue();
        var oldValue = Alloy.Collections.contactInformation.get("1");
        oldValue && oldValue.destroy();
        var infoItem = Alloy.createModel("contactInformation", {
            id: "1",
            FirstName: firstName,
            LastName: lastName,
            Phone: phone,
            Email: eMail
        });
        Alloy.Collections.contactInformation.add(infoItem);
        infoItem.save();
        $.destroy();
        $.off();
        Ti.API.info("didnt fail silently");
    });
    var performAddressBookFunction = function() {
        var singleValue = [ "recordId", "firstName", "middleName", "lastName", "fullName", "prefix", "suffix", "nickname", "firstPhonetic", "middlePhonetic", "lastPhonetic", "organization", "jobTitle", "department", "note", "birthday", "created", "modified", "kind" ];
        var multiValue = [ "email", "address", "phone", "instantMessage", "relatedNames", "date", "url" ];
        var people = Titanium.Contacts.getAllPeople();
        Ti.API.info("Total contacts: " + people.length);
        Ti.API.info(JSON.stringify(people));
        for (var i = 0, ilen = people.length; ilen > i; i++) {
            Ti.API.info("---------------------");
            var person = people[i];
            for (var j = 0, jlen = singleValue.length; jlen > j; j++) Ti.API.info(singleValue[j] + ": " + person[singleValue[j]]);
            for (var j = 0, jlen = multiValue.length; jlen > j; j++) Ti.API.info(multiValue[j] + ": " + JSON.stringify(person[multiValue[j]]));
        }
        Titanium.Contacts.getAllPeople();
        Titanium.Contacts.showContacts({
            selectedPerson: function(e) {
                processSelectedPerson(e);
            }
        });
    };
    var addressBookDisallowed = function() {
        Ti.API.info("not allowed");
    };
    Ti.API.info(Ti.Contacts.contactsAuthorization);
    var displayContacts = function() {
        Ti.Contacts.contactsAuthorization == Ti.Contacts.AUTHORIZATION_AUTHORIZED ? performAddressBookFunction() : Ti.Contacts.contactsAuthorization == Ti.Contacts.AUTHORIZATION_UNKNOWN ? Ti.Contacts.requestAuthorization(function(e) {
            e.success ? performAddressBookFunction() : addressBookDisallowed();
        }) : addressBookDisallowed();
    };
    var processSelectedPerson = function(e) {
        var myPerson = e.person;
        if (void 0 !== e.person.phone.home) if (void 0 !== e.person.phone.work) {
            var alertDialog = Titanium.UI.createAlertDialog({
                title: "Multiple Phone Found",
                message: "Use Work or Home Address?",
                buttonNames: [ "Work", "Home" ]
            });
            alertDialog.addEventListener("click", function(e) {
                1 == e.index ? useHomeAddress(myPerson) : useWorkAddress(myPerson);
            });
            alertDialog.show();
        } else useHomeAddress(myPerson); else useWorkAddress(myPerson);
    };
    var useHomeAddress = function(person) {
        var mFirstName = "";
        void 0 !== person.firstName && null !== person.firstName && (mFirstName = person.firstName);
        var mLastName = "";
        void 0 !== person.lastName && null !== person.lastName && (mLastName = person.lastName);
        var mName = "";
        "" !== mFirstName && (mName += mFirstName);
        "" !== mName && (mName += " ");
        "" !== mLastName && (mName += mLastName);
        Ti.API.info(mName);
        if ("" === mFirstName && "" === mLastName && void 0 !== person.fullName && null !== person.fullName) {
            var x = person.fullName.indexOf(" ");
            if (x > -1) {
                var fName = person.fullName;
                mFirstName = fName.substr(0, x);
                mLastName = fName.substr(x, fName.length - x);
            }
        }
        $.txtFirstName.setValue(mFirstName);
        $.txtLastName.setValue(mLastName);
        $.txtPhone.value = void 0 !== person.phone.home ? person.phone.home[0] : void 0 !== person.phone.work ? person.phone.work[0] : void 0 !== person.phone.mobile ? person.phone.mobile[0] : "";
        $.txtEmail.value = void 0 !== person.email.home ? person.email.home[0] : void 0 !== person.email.work ? person.email.work[0] : "";
    };
    var useWorkAddress = function(person) {
        var mFirstName = "";
        void 0 !== person.firstName && null !== person.firstName && (mFirstName = person.firstName);
        var mLastName = "";
        void 0 !== person.lastName && null !== person.lastName && (mLastName = person.lastName);
        var mName = "";
        "" !== mFirstName && (mName += mFirstName);
        "" !== mName && (mName += " ");
        "" !== mLastName && (mName += mLastName);
        if ("" === mFirstName && "" === mLastName && void 0 !== person.fullName && null !== person.fullName) {
            var x = person.fullName.indexOf(" ");
            if (x > -1) {
                var fName = person.fullName;
                mFirstName = fName.substr(0, x);
                mLastName = fName.substr(x + 1, fName.length - x);
            }
        }
        $.txtFirstName.setValue(mFirstName);
        $.txtLastName.setValue(mLastName);
        Ti.API.info(mName);
        $.txtPhone.value = void 0 !== person.phone.work ? person.phone.work[0] : void 0 !== person.phone.home ? person.phone.home[0] : void 0 !== person.phone.mobile ? person.phone.mobile[0] : "";
        $.txtEmail.value = void 0 !== person.email.work ? person.email.work[0] : void 0 !== person.email.home ? person.email.home[0] : "";
    };
    __defers["$.__views.clearAllButton!click!clearAll"] && $.__views.clearAllButton.addEventListener("click", clearAll);
    __defers["$.__views.contactsButton!click!displayContacts"] && $.__views.contactsButton.addEventListener("click", displayContacts);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;