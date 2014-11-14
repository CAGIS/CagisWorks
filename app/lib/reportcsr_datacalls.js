
var onServerDataCall_GetSRConfig_Success=function(_jsonReply, _xhr){
	Alloy.Globals.QAControlList = [];
   Ti.API.info('successfully retrieved SR configuration data');
   Ti.API.info(JSON.stringify(_jsonReply)); 
   var myPurpose = _jsonReply.SRDataInfo.SRPURPOSE;
   Ti.API.info(myPurpose);
   var myType = _jsonReply.SRDataInfo.SRTYPECODE;
   Ti.API.info(myType);
   var myEmailList = _jsonReply.SRDataInfo.EMAILLIST;
   Ti.API.info(myEmailList);
   var $=exports.parentHandle;
   var QA = _jsonReply.questions;
   Ti.API.info('QA: ' + JSON.stringify(QA));
   Ti.API.info(QA.length);
   $.SRDesc.text = myPurpose;
   var data = [];
   /////////////////////
   try{
	   var myQuestionObj = {
		     AnswerType:'none',
		     Information:'',
		     Question:'Please provide any additional information that may help us serve you.',
		     SortID:QA.length+1,
		     TheAnswer:'',
		     Updateable:'true',
		     picklist:null  
	   };
	} catch (e) {
		Ti.API.info(e);
	};
   try{
   	 QA.push(myQuestionObj);
   } catch(e) {
   		Ti.API.info(e);
   }
  
   ////////////////////
   for (var i=0; i<=QA.length-1; i++){
   		Ti.API.info(i);
   		//myTestFunction(QA[i]);
   		var myLabel = Ti.UI.createLabel({
   			color:'black',
   			top:'5dp',
   			left:'20dp',
   			right:'20dp',
			font:{fontSize:12}
   		});
   		myLabel.text = QA[i].Question;
		Ti.API.info(QA[i].Question);
		var tvr = Ti.UI.createTableViewRow({
			touchEnabled:false,
			layout:'vertical'
		});
		
		if(i % 2 == 0){
			tvr.backgroundColor ='#FFFFFF';
		} else {
			tvr.backgroundColor ='#E0E0E0';
		}
		
		
		
		tvr.add(myLabel);
		Ti.API.info(JSON.stringify(tvr));
		
		if (QA[i].AnswerType === 'yesno') {
						
			var yn = Ti.UI.createSwitch({
				id:QA[i].SortID,
				right:'10dp',
    			titleOn:'Yes',
    			titleOff:'No',
    			SortID:QA[i].SortID,
    			Question:QA[i].Question,
    			TheAnswer:'No',
    			bottom:'5dp'
			});
			
			
			if (Alloy.Globals.isAndroid == true){
				yn.setStyle(
					Titanium.UI.Android.SWITCH_STYLE_CHECKBOX
				);
				
				yn.setBorderRadius(7);
				yn.setColor('blue');
				yn.setTitle('No');
				yn.setTextAlign(Ti.UI.TEXT_ALIGNMENT_CENTER);
				yn.setWidth('60dp');
				yn.addEventListener('click', function(e){
					Ti.API.info(JSON.stringify(e));
					if (e.source.value == true){
						e.source.setTitle('Yes');
						e.source.TheAnswer = 'Yes';
					} else {
						e.source.setTitle('No');
						e.source.TheAnswer = 'No';
					}
				});
			} else {
				yn.addEventListener('change', function(e){
					Ti.API.info(JSON.stringify(e));
					if (e.source.value == true){
						e.source.TheAnswer = 'Yes';
					} else {
						e.source.TheAnswer = 'No';
					}
				});				
			};
			myLabel.right = "70dp";
			Alloy.Globals.QAControlList.push(yn);
			tvr.add(yn);
		}
		if (QA[i].AnswerType === 'dropdownlist') {
			var horizontalVW = Ti.UI.createView({
				style:'horizontal',
				height:'20dp',
				bottom:'10dp'
			});
		      var qLbl = Ti.UI.createLabel({
		      	className:'contentLabel',
				//bottom:5,
				height:'auto',
	            id:'srqdd_label' + QA[i].SortID,
	            SortID:QA[i].SortID,      
	            Question:QA[i].Question,
	            TheAnswer:'',
	            text:'Select an answer from this list:',
	            left:'80dp',
	            font:{
    				fontSize:12
    			},
	          });
	          horizontalVW.add(qLbl);
			var btn = Ti.UI.createButton({
				id:QA[i].SortID,
				title:"Select",
				right:'10dp',
				backgroundColor:'transparent',
				color:'blue',
				SortID:QA[i].SortID,
    			Question:QA[i].Question,
    			TheAnswer:QA[i].TheAnswer,
	            font:{
    				fontSize:12
    			},
    			picklist:QA[i].picklist.Answers  			
			});
			myLabel.right = "70dp";
			Alloy.Globals.QAControlList.push(qLbl);
			//btn.picklist = QA[i].picklist.Answers;
			//Ti.API.info("New button picklist: " + JSON.stringify(QA[i].picklist.Answers));
			btn.addEventListener('click', function(e){ 

				var win = Ti.UI.createWindow({
  					exitOnClose: false,
					height:'100%',
					width:'100%'
  				
				});
				var vw = Ti.UI.createView({
					height:'100%',
					width:'100%',
					backgroundColor:'#dcdcdc',
					layout:'vertical',
					borderColor:'black',
					borderWidth:'2dp'
				});
				win.add(vw);
				var picker = Ti.UI.createPicker({
					color:'black',
					top:'50dp',
					visible:true,
					top:'0dp',
					useSpinner:true
				});
					
					var data = [];
					for (var ix = 0; ix<e.source.picklist.length; ix++){
						data[ix] = Ti.UI.createPickerRow({title:e.source.picklist[ix]});
					}
					picker.add(data);
					
					picker.selectionIndicator = true;
					picker.show();
					vw.add(picker);
					
					var btn2 = Ti.UI.createButton({
						title:'Select'
					});
					btn2.addEventListener('click', function(){
						var sr = picker.getSelectedRow(0);
						//]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
							var optID=e.source.SortID;
			                var rObj;
			                try {
				                for(var q=0,ql=Alloy.Globals.QAControlList.length;q<ql;q++){
				                  if(Alloy.Globals.QAControlList[q].SortID===optID){
				                    rObj=Alloy.Globals.QAControlList[q];
				                  }
				                }			                	
			                } catch (e) {
			                	Ti.API.info(e);
			                };

			                rObj.text=sr.getTitle();
			                rObj.TheAnswer=rObj.text;
			                rObj.left=20;
			                rObj.width='90%';
			                rObj.color = 'black';
			                rObj.font ={fontWeight:'bold', fontSize:12};
                
						
						//]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
						win.close();
					});
					vw.add(btn2);
					
					win.open();
					Ti.API.info('button clicked 2');
			});				
			
			horizontalVW.add(btn);
			tvr.add(horizontalVW);
		}
		
		if ((QA[i].AnswerType === 'none')  || (QA[i].AnswerType === 'multiple')){
			var tf = Ti.UI.createTextField({
				id:QA[i].SortID,
				borderStyle : Titanium.UI.INPUT_BORDERSTYLE_BEZEL,
    			top : '10dp',
    			bottom:'10dp',
    			right:'20dp',
    			left:'20dp',
    			height : '35dp',
    			color:'black',
    			font:{
    				fontSize:12
    			},
    			SortID:QA[i].SortID,
    			Question:QA[i].Question,
    			TheAnswer:QA[i].TheAnswer
			});
			if (i==QA.length - 1){
				tf.setHintText('Additional information');
			} else {
				tf.setHintText('Answer');
			}
			
			tf.addEventListener('change', function(e){
				e.source.TheAnswer = e.source.value;
			});
			
			tvr.layout='vertical';
			Alloy.Globals.QAControlList.push(tf);
			tvr.add(tf);
		}
		data.push(tvr);
		
   }
   ///////////
	var buttonTvr = Ti.UI.createTableViewRow({
		height:Titanium.UI.SIZE//,
		//layout:'horizontal'
	});
	var btnContinue = Ti.UI.createButton({
		title:'Continue',
		right:'45%',
		top:'10dp',
		width:'100dp',
		buttom:'10dp'
	});
	btnContinue.addEventListener('click', function(e) {
		
		Ti.API.info(JSON.stringify(Alloy.Globals.QAControlList));
		var QA = Alloy.Globals.QAControlList;
		for (var i=0; i < QA.length; i++){
			Ti.API.info('-----------------');
			Ti.API.info(QA[i].SortID);
			Ti.API.info(QA[i].Question);
			Ti.API.info(QA[i].TheAnswer);
			
		};
		
	});
	var btnCancel = Ti.UI.createButton({
		title:'Cancel',
		left:'55%',
		top:'10dp',
		width:'100dp',
		buttom:'10dp'
	});
	buttonTvr.add(btnContinue);
	buttonTvr.add(btnCancel);
	data.push(buttonTvr);
   $.tvQA.setData(data);
   
   /*if($('#' + myType + '_actind')[0]) {
   	 $('#' + myType + '_actind')[0].hide();
   };*/
   

      
   //showServerResultsDialog(JSON.stringify(_jsonReply));
   //TODO - parse response for errors
   if(_jsonReply.Status=='ERROR'){
     //alert('this');
     //cag.ui.alert('Error retrieving service request configuration','Please try again.');
         			var alertDialog = Titanium.UI.createAlertDialog({ title: 'Problem Encountered',
                    		message: 'Sorry, we had problems getting the service request questions.\n\nPlease try again.', 
                    		buttonNames: ['OK']
                    }); 
                	alertDialog.show();     		
     
     return;
   };
   //srtypeConfig_test
   //createSRDetailForm(_jsonReply);      
};

var myTestFunction=function(QAElement){
	var data = [];
	Ti.API.info(QAElement.Question);
	var tvr = Ti.UI.createTableViewRow();
	tvr.title = QAElement.Question;
	data.push(tvr);
	$.tvLocationChoice.setData(data);
	
};

 /* --------------------------------------------------------------*/
var onServerDataCall_GetSRConfig_Error=function(_e, _xhr){
    Ti.API.info("onServerDataCall_GetSRConfig_Error"+JSON.stringify(_e));
    //alert('that');
    Ti.API.info('this is my failure');
    //cag.ui.alert('Server response Failed','Sorry, please try again.');
             		var alertDialog = Titanium.UI.createAlertDialog({ title: 'Problem Encountered',
                    		message: 'Sorry, we had problems getting the service request questions.\n\nPlease try again.', 
                    		buttonNames: ['OK']
                    }); 
                	alertDialog.show();
};

 /* --------------------------------------------------------------*/
var webCalls=require('webcalls');
exports.getSRConfigDatafromServer=function(parentHandle, SR_TypeID, theCityID){
  //info('for dan young: ' + SR_TypeID);
  
  exports.parentHandle=parentHandle;
  //alert(CityID);
      if (SR_TypeID == 'GRFITI'){
        theCityID = 'CINC';
      };
      if (SR_TypeID == 'LITR-PRV'){
        theCityID = 'CINC';
      };
      if (SR_TypeID == 'RF-COLLT'){
        theCityID = 'CINC';
      };
      if (SR_TypeID == 'PTHOLE'){
        theCityID = 'CINC';
      };
      if (SR_TypeID == 'BLD-RES'){
        theCityID = 'CINC';
      };
 	 
 	 if (theCityID === '') theCityID = 'CINC';
 	 
      webCalls.JSONrequest(
      {
          method:'GET',
          action:Alloy.Globals.cagapp.csrDomain + Alloy.Globals.cagapp.csrVirtualDir +'CinciServices/ServiceRequestTypesConfig',
          parameters: {id:SR_TypeID,juris:theCityID},
          //parameters: {id:SR_TypeID,juris:'CINC'},
          success: onServerDataCall_GetSRConfig_Success,
          error: onServerDataCall_GetSRConfig_Error         
          
          
               
    });  //end getFAQfromServer
};

 /* --------------------------------------------------------------*/
var onServerDataCall_submitCSR_Success=function(_jsonReply, _xhr){
  //alert("success");
};

 /* --------------------------------------------------------------*/
var submitCSR=function(submitJSONObj){

  
  var sendingURL = cag.app.csrDomain + cag.app.csrVirtualDir +'CinciServices/posttests';
  Ti.API.info(submitJSONObj);
  
  //the function cag.webrequestutil.JSONpost is in cagis_shared/webcalls @ line 194
  var URL = cag.app.csrDomain + cag.app.csrVirtualDir +'CinciServices/posttests';
  cag.webrequestutil.JSONpost(URL,submitJSONObj);
  
  return;

};
 /* --------------------------------------------------------------*/
var myFunction = function(submitJSONObj){
  var URL = cag.app.csrDomain + cag.app.csrVirtualDir +'CinciServices/posttests';
  cag.webrequestutil.JSONpost(URL,submitJSONObj);
};
 /* --------------------------------------------------------------*/
 
 var onServerDataCall_GetGroupData_Success=function(_jsonReply, _xhr){
   
   Ti.API.info("List returned from server: " + JSON.stringify(_jsonReply)); 
 	var $=exports.parentHandle;
 	$.actIndicator.hide();
        //Ti.API.SRTypeRequestList = _jsonReply;
        //myParentWin.requestTypesLoaded = true;
        //TI.API.info('requestTypesLoaded: ' + myParentWin.requestTypesLoaded); 
        //Ti.App.fireEvent('requestTypesLoaded');     
   //showServerResultsDialog(JSON.stringify(_jsonReply));
   //TODO - parse response for errors
   if(_jsonReply.Status=='ERROR'){

     return;
   };
   Alloy.Globals.allSRTypes = _jsonReply;
   var data = [];
   var groupArray = _jsonReply.ServiceRequestCategories;
   for (var i = 0; i < groupArray.length; i++){
   		
   	   	var myLabel = Ti.UI.createLabel({
   			color:'black',
   			top:'5dp',
   			left:'20dp',
   			right:'20dp',
			font:{fontSize:12}
   		});
   		myLabel.text = groupArray[i];
   	
   		var tvr = Ti.UI.createTableViewRow({
			hasChild:true
		});
		tvr.id = groupArray[i];
		tvr.add(myLabel);
		tvr.name=groupArray[i];
		
		tvr.addEventListener('click', function(e){
			if (Alloy.Globals.isAndroid == true){
				Alloy.Globals.selectedGroup = e.row.id;
			} else {
				Alloy.Globals.selectedGroup = e.rowData.id;
			}
			Ti.API.info("This is th problem");
			//Alloy.Globals.selectedGroup = e.rowData.id;
			var win=Alloy.createController("requestGroupSRList").getView();
			Alloy.Globals.requestGroupSRList = win;
			addWinToNavGroup(win);
		});
				
   		data.push(tvr);
   };
   
   data.sort(sortSRData);
   
   $.tvGroups.setData(data);
   
     
};

 /* --------------------------------------------------------------*/
var onServerDataCall_GetGroupData_Error=function(_e, _xhr){
    Ti.API.info("onServerDataCall_GetSRConfig_Error"+JSON.stringify(_e));
    Ti.API.info('this is my failure');
    //cag.ui.alert('Server response Failed','Sorry, please try again.');
             		var alertDialog = Titanium.UI.createAlertDialog({ title: 'Problem Encountered',
                    		message: 'Sorry, we had problems getting the service request descriptions.\n\nPlease try again.', 
                    		buttonNames: ['OK']
                    }); 
                	alertDialog.show();
};

 /* --------------------------------------------------------------*/
 
 var onServerDataCall_GetFavoritesData_Success=function(_jsonReply, _xhr){

   var $=exports.parentHandle;
   $.actIndicator.hide();
   Ti.API.info("Favorites list returned from server: " + JSON.stringify(_jsonReply)); 
   //Ti.App.FavoriteSRTypeRequestList = _jsonReply;
      
   //showServerResultsDialog(JSON.stringify(_jsonReply));
   //TODO - parse response for errors
   if(_jsonReply.Status=='ERROR'){

     return;
   };   
   
   var data = [];
   var favArray = _jsonReply.ServiceRequests;
   for (var i = 0; i < favArray.length; i++){
   	
   		Ti.API.info(favArray[i].description);
   		
   	   	var myLabel = Ti.UI.createLabel({
   			color:'black',
   			top:'5dp',
   			left:'20dp',
   			right:'20dp',
			font:{fontSize:12}
   		});
   		myLabel.text = favArray[i].description;

		var tvr = Ti.UI.createTableViewRow({
			hasChild:true
		});
		//tvr.title = QA[i].Question;
		tvr.add(myLabel);
		tvr.id = favArray[i].id;
		data.push(tvr);
		
		tvr.addEventListener('click', function(e){
			//Ti.API.info(JSON.stringify(e.row.id));
			if (Alloy.Globals.isAndroid == true){
				Alloy.Globals.srType = e.row.id;
			} else {
				Alloy.Globals.srType = e.rowData.id;
			}
			
			var win=Alloy.createController("requestDataEntry").getView();
			Alloy.Globals.requestDataEntry = win;
			addWinToNavGroup(win);	
		});
		
   };
   
		var tvr = Ti.UI.createTableViewRow({
			hasChild:true
		});
		var myLabel = Ti.UI.createLabel({
   			color:'black',
   			top:'5dp',
   			left:'20dp',
   			right:'20dp',
			font:{fontSize:12}
   		});
   		myLabel.text = 'More requests';
		   tvr.add(myLabel);
		   
		tvr.addEventListener('click', function(e){
			//Ti.API.info(JSON.stringify(e.rowData.id));
			if (Alloy.Globals.isAndroid == true){
				Alloy.Globals.srType = e.row.id;
			} else {
				Alloy.Globals.srType = e.rowData.id;
			}
			//Alloy.Globals.srType = e.rowData.id;
			var win=Alloy.createController("requestGroups").getView();
			Alloy.Globals.requestDataEntry = win;
			addWinToNavGroup(win);	
		});
		   
		   
		   data.push(tvr);

      $.tvFavorites.setData(data);
};

 /* --------------------------------------------------------------*/
 
 var onServerDataCall_GetTempFavoritesData_Success=function(_jsonReply, _xhr){
 	
 	var mException = JSON.stringify(_jsonReply);
 	var mInt = mException.indexOf('Exception');
   
   Ti.API.info("Temp Favorites list returned from server: " + JSON.stringify(_jsonReply)); 
   
   if (mInt = -1){
   		Ti.App.TempFavoriteSRTypeRequestList = _jsonReply;
   }
   else{
   		Ti.App.TempFavoriteSRTypeRequestList = null;
   };
      
   //showServerResultsDialog(JSON.stringify(_jsonReply));
   //TODO - parse response for errors
   if(_jsonReply.Status=='ERROR'){
     //alert('this');
     return;
   };   
};

 /* --------------------------------------------------------------*/

var onServerDataCall_GetFavoritesData_Error=function(_e, _xhr){
    Ti.API.info("onServerDataCall_GetSRConfig_Error"+JSON.stringify(_e));
	   var $=exports.parentHandle;
   	$.actIndicator.hide();
    //cag.ui.alert('Server response Failed','Sorry, please try again.');
             		var alertDialog = Titanium.UI.createAlertDialog({ title: 'Problem Encountered',
                    		message: 'Sorry, we had problems getting the service request descriptions.\n\nPlease try again.', 
                    		buttonNames: ['OK']
                    }); 
                	alertDialog.show();
};

 /* --------------------------------------------------------------*/

var onServerDataCall_GetTempFavoritesData_Error=function(_e, _xhr){
    Ti.API.info("onServerDataCall_GetSRConfig_Error"+JSON.stringify(_e));

    Ti.API.info('this is my failure');
    //cag.ui.alert('Server response Failed','Sorry, please try again.');
};

 /* --------------------------------------------------------------*/
 
 exports.getSRGroupDatafromServer=function(parentHandle,category,theCityID){
     if (theCityID ==='') theCityID = 'CINC';
     exports.parentHandle=parentHandle;
      var connectionString = 'CinciServices/ServiceRequestTypes?juris=' + theCityID;
      webCalls.JSONrequest(
      {
          method:'GET',
          action:Alloy.Globals.cagapp.csrDomain + Alloy.Globals.cagapp.csrVirtualDir + connectionString,
          parameters: {category:category},
          success: onServerDataCall_GetGroupData_Success,
          error: onServerDataCall_GetGroupData_Error          
    }); 
    
    //end getFAQfromServer
}; 

 /* --------------------------------------------------------------*/
 /* --------------------------------------------------------------*/
 
 exports.getFavoriteSRListfromServer=function(parentHandle, theCityID, theSeason){
     if (theCityID ==='') theCityID = 'CINC';
       exports.parentHandle=parentHandle;

      var connectionString = 'CinciServices/FavoriteServiceRequestTypes?juris=' + theCityID + '&' + theSeason;
      webCalls.JSONrequest(
      {
          method:'GET',
          action: Alloy.Globals.cagapp.csrDomain + Alloy.Globals.cagapp.csrVirtualDir + connectionString,
          parameters: {category:'',keyword:theSeason},
          success: onServerDataCall_GetFavoritesData_Success,
          error: onServerDataCall_GetFavoritesData_Error          
    }); 
}; 

 /* --------------------------------------------------------------*/
 
 var getTempFavoriteSRListfromServer=function(theCityID, theSeason){
     if (theCityID ==='') theCityID = 'CINC';
     
      var connectionString = 'CinciServices/FavoriteServiceRequestTypes?juris=' + theCityID + '&' + theSeason;
      cag.webrequestutil.JSONrequest(
      {
          method:'GET',
          action:cag.app.csrDomain + cag.app.csrVirtualDir +connectionString,
          parameters: {category:'',keyword:theSeason},
          success: onServerDataCall_GetTempFavoritesData_Success,
          error: onServerDataCall_GetTempFavoritesData_Error          
    }); 
};

function addWinToNavGroup(win){
	if (Alloy.Globals.usesNavGroup) {
		if (OS_MOBILEWEB) {
			Alloy.Globals.navgroup.open(win);
		} else {
			Alloy.Globals.navgroup.openWindow(win);
		}
	} else if (OS_ANDROID) {
		win.open();
	}
			
};

var sortSRData = function(a,b){
	var nameA = a.name.toLowerCase();
	var nameB = b.name.toLowerCase();
	if (nameA < nameB) {return -1};
	if (nameA > nameB){return 1};
	return 0;
};

 /* --------------------------------------------------------------*/
