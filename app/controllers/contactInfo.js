Alloy.Collections.contactInformation && Alloy.Collections.contactInformation.fetch();
//var myInfo= Alloy.Collections.contactInformation;
var contactInfo = Alloy.Collections.contactInformation.get("1");

if(contactInfo){

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
$.contactInfo.addEventListener('close', function(){ //in this case, $.contactInfo is the window itself
	
	var firstName = $.txtFirstName.getValue();
	var lastName = $.txtLastName.getValue();
	var phone = $.txtPhone.getValue();
	var eMail = $.txtEmail.getValue();

		var oldValue = Alloy.Collections.contactInformation.get("1");
		if (oldValue){
			oldValue.destroy();
		}
		
		var infoItem=Alloy.createModel('contactInformation',{"id":"1","FirstName":firstName,"LastName":lastName, "Phone":phone, "Email":eMail});
		
		Alloy.Collections.contactInformation.add(infoItem);
		
		infoItem.save();
		$.destroy();
		$.off();
		Ti.API.info("didnt fail silently");	
});


//var processSelectedPerson = function(e) {
//	Ti.API.info(JSON.stringify(e.person));	
//};


var performAddressBookFunction = function(){

	var singleValue = [
	  'recordId', 'firstName', 'middleName', 'lastName', 'fullName', 'prefix', 'suffix', 
	  'nickname', 'firstPhonetic', 'middlePhonetic', 'lastPhonetic', 'organization', 
	  'jobTitle', 'department', 'note', 'birthday', 'created', 'modified', 'kind'
	];
	var multiValue = [
	  'email', 'address', 'phone', 'instantMessage', 'relatedNames', 'date', 'url'
	];
	var people = Titanium.Contacts.getAllPeople();
	Ti.API.info('Total contacts: ' + people.length);
	Ti.API.info(JSON.stringify(people));
	for (var i=0, ilen=people.length; i<ilen; i++){
	  Ti.API.info('---------------------');
	  var person = people[i];
	  for (var j=0, jlen=singleValue.length; j<jlen; j++){
	    Ti.API.info(singleValue[j] + ': ' + person[singleValue[j]]);
	  }
	  for (var j=0, jlen=multiValue.length; j<jlen; j++){
	    Ti.API.info(multiValue[j] + ': ' + JSON.stringify(person[multiValue[j]]));
	  }
	}
	
			var mPeople = Titanium.Contacts.getAllPeople();
		Titanium.Contacts.showContacts({
		selectedPerson: function(e) {
			
			processSelectedPerson(e);
		}

		});
};
var addressBookDisallowed = function(){	
	Ti.API.info("not allowed");
};

Ti.API.info(Ti.Contacts.contactsAuthorization);

var displayContacts = function() {
	
			if (Ti.Contacts.contactsAuthorization == Ti.Contacts.AUTHORIZATION_AUTHORIZED){
		    performAddressBookFunction();
		} else if (Ti.Contacts.contactsAuthorization == Ti.Contacts.AUTHORIZATION_UNKNOWN){
		    Ti.Contacts.requestAuthorization(function(e){
		        if (e.success) {
		            performAddressBookFunction();
		        } else {
		            addressBookDisallowed();
		        }
		    });
		} else {
		    addressBookDisallowed();
		}

};

var processSelectedPerson = function(e) {
		
		var myPerson = e.person;
		
		if (e.person.phone.home !== undefined){
			if (e.person.phone.work !== undefined){
				var alertDialog = Titanium.UI.createAlertDialog({ title: 'Multiple Phone Found',
                    		message: 'Use Work or Home Address?', 
                    		buttonNames: ['Work','Home']
                    		}); 
                    		alertDialog.addEventListener('click', function(e) {
                    			
                    			if (e.index == 1){

                    				useHomeAddress(myPerson);
                    			}
                    			else{

                    				useWorkAddress(myPerson);
                    			}
                    		});
                			alertDialog.show();
			}
			else{
				useHomeAddress(myPerson);
			};
		}
		else{
			useWorkAddress(myPerson);
		};


	};
	
	var useHomeAddress = function(person) {

		var mFirstName = '';
		if (person.firstName !== undefined){
			if (person.firstName !== null){
				mFirstName = person.firstName;
			};		
		};
		var mLastName = '';
		if (person.lastName !== undefined){
			if (person.lastName !== null){
				mLastName = person.lastName;
			};			
		};
		
		var mName = '';
		if (mFirstName !== ''){
			mName += mFirstName;
		};
		if (mName !== ''){
			mName += ' ';
		};
		if (mLastName !== ''){
			mName += mLastName;
		};
		Ti.API.info(mName);
		
		if ((mFirstName === '') && (mLastName === '')) {
			if (person.fullName !== undefined){
				if (person.fullName !== null){
					var x = person.fullName.indexOf(" ");
					if (x>-1){
						var fName = person.fullName;
						mFirstName = fName.substr(0,x);
						mLastName = fName.substr(x, fName.length-x);
					}	
				}	
			}
		}
		
		$.txtFirstName.setValue(mFirstName);
		$.txtLastName.setValue(mLastName);
		//$.txtPhone.setValue(contactInfo.get("Phone"));
		///$.txtEmail.setValue(contactInfo.get("Email"));
		
		
		/*
		txtName.value = mName;

		if (person.address.home !== undefined){
			var mHomeAddress = person.address.home;
			var mStreet = mHomeAddress.Street;
			txtAddress.value = mHomeAddress[0].Street;
			txtState.value = mHomeAddress[0].State;
			txtCity.value = mHomeAddress[0].City;
			txtZip.value = mHomeAddress[0].ZIP;
		}
		else{
			txtAddress.value = null;
			txtState.value = null;
			txtCity.value = null;
			txtZip.value = null;
		};*/
		
		if (person.phone.home !== undefined){
			$.txtPhone.value = person.phone.home[0];
		}
		else{
			if (person.phone.work !== undefined){
				$.txtPhone.value = person.phone.work[0];
			}
			else{
				if (person.phone.mobile !== undefined){
					$.txtPhone.value = person.phone.mobile[0];
				}
				else{
					$.txtPhone.value = "";	
				}	
			}
		};
		
		if (person.email.home !== undefined){
			$.txtEmail.value = person.email.home[0];
		}
		else{
			if (person.email.work !== undefined){
				$.txtEmail.value = person.email.work[0];
			}
			else{
				$.txtEmail.value = "";	
			}
		};
	};	
	
	var useWorkAddress = function(person) {
				
		var mFirstName = '';
		if (person.firstName !== undefined){
			if (person.firstName !== null){
				mFirstName = person.firstName;
			};		
		};
		var mLastName = '';
		if (person.lastName !== undefined){
			if (person.lastName !== null){
				mLastName = person.lastName;
			};			
		};

		var mName = '';
		if (mFirstName !== ''){
			mName += mFirstName;
		};
		if (mName !== ''){
			mName += ' ';
		};
		if (mLastName !== ''){
			mName += mLastName;
		};
		
				if ((mFirstName === '') && (mLastName === '')) {
			if (person.fullName !== undefined){
				if (person.fullName !== null){
					var x = person.fullName.indexOf(" ");
					if (x>-1){
						var fName = person.fullName;
						mFirstName = fName.substr(0,x);
						mLastName = fName.substr(x+1, fName.length-x);
					}	
				}	
			}
		}
		
		$.txtFirstName.setValue(mFirstName);
		$.txtLastName.setValue(mLastName);
				
		Ti.API.info(mName);
		
		/*txtName.value = mName;

		if (person.address.home !== undefined){
			var mHomeAddress = person.address.work;
			var mStreet = mHomeAddress.Street;
			txtAddress.value = mHomeAddress[0].Street;
			txtState.value = mHomeAddress[0].State;
			txtCity.value = mHomeAddress[0].City;
			txtZip.value = mHomeAddress[0].ZIP;
		}
		else{
			txtAddress.value = null;
			txtState.value = null;
			txtCity.value = null;
			txtZip.value = null;
		};*/
		
		if (person.phone.work !== undefined){
			$.txtPhone.value = person.phone.work[0];
		}
		else{
			if (person.phone.home !== undefined){
				$.txtPhone.value = person.phone.home[0];
			}
			else{
				if (person.phone.mobile !== undefined){
					$.txtPhone.value = person.phone.mobile[0];
				}
				else{
					$.txtPhone.value = "";	
				}	
			}
		};
		
		if (person.email.work !== undefined){
			$.txtEmail.value = person.email.work[0];
		}
		else{
			if (person.email.home !== undefined){
				$.txtEmail.value = person.email.home[0];
			}
			else{
			$.txtEmail.value = "";	
			}			
		};

	};



