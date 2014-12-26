console.info('poop');

exports.testFunction = function(win){
	exports.parentHandle = win;
	console.info("This may get interesting");
	var newView = Ti.UI.createView({
		id:"dantestView2"
	});
	console.info(JSON.stringify( newView));
	var newLabel = Ti.UI.createLabel({
		text:"I wonder if this will work"
	});
	console.info(JSON.stringify(newLabel));
	newView.add(newLabel);
	//$.scrollableView.views.push(newView);
	
	var myViews = win.scrollableView.views;
	myViews.push(newView);
	win.scrollableView.setViews(myViews);
	console.info(JSON.stringify(win.scrollableView));
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

var onServerDataCall_GetSRConfig_Success=function(_jsonReply, _xhr){
   Alloy.Globals.QAControlList = [];
   Ti.API.info('successfully retrieved SR configuration data');
   Ti.API.info(JSON.stringify(_jsonReply)); 
   var myPurpose = _jsonReply.SRDataInfo.SRPURPOSE;
   Ti.API.info(myPurpose);
   var mySRDescription = _jsonReply.SRDataInfo.SRDESCRIPTION;
   console.info(mySRDescription);
   var myType = _jsonReply.SRDataInfo.SRTYPECODE;
   Ti.API.info(myType);
   var myEmailList = _jsonReply.SRDataInfo.EMAILLIST;
   Ti.API.info(myEmailList);
   var $=exports.parentHandle;
   var QA = _jsonReply.questions;
   Ti.API.info('QA: ' + JSON.stringify(QA));
   Ti.API.info("Number of questions:" + QA.length);
   //$.SRDesc.text = myPurpose;
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
  //return;
   ////////////////////
   
   var myViews = [];
   for (var i=0; i<=QA.length-1; i++){
   		Ti.API.info(i);
   		//myTestFunction(QA[i]);
   		
   		var descLab = Ti.UI.createLabel({
   			color:'#fff',
   			top:'15dp',
   			left:'20dp',
   			right:'20dp',
			font:{fontSize:16},
			text:(mySRDescription + '  (' + (i+1) + " of " + (QA.length+1) + ")").toUpperCase()
   			
   			
   		});
   		
   		
   		
   		var myLabel = Ti.UI.createLabel({
   			color:'#fff',
   			top:'75dp',
   			left:'20dp',
   			right:'20dp',
			font:{fontSize:18}
   		});
   		myLabel.text = QA[i].Question;
		Ti.API.info(QA[i].Question);
		/*var tvr = Ti.UI.createTableViewRow({
			touchEnabled:false,
			layout:'vertical'
		});*/
		
		
		
		
	//console.info(JSON.stringify(win.scrollableView));
		
		//******************************************************
		var newView = Ti.UI.createView({
			id:"dantestView"+i,
			layout:"vertical"
		});
		console.info(JSON.stringify( newView));
	/*var newLabel = Ti.UI.createLabel({
		text:"I wonder if this will work"
	});*/
		console.info(JSON.stringify(myLabel));
		newView.add(descLab);
		newView.add(myLabel);
	
		/*var myViews = $.scrollableView.views;
		myViews.push(newView);
		$.scrollableView.setViews(myViews);
		console.info(JSON.stringify($.scrollableView));*/
		
		
		
		
		//******************************************************
		/*if(i % 2 == 0){
			tvr.backgroundColor ='#FFFFFF';
		} else {
			tvr.backgroundColor ='#E0E0E0';
		}*/
		
		
		
		//tvr.add(myLabel);
		//Ti.API.info(JSON.stringify(tvr));
		
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
				//yn.borderColor = '#808080';
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
				yn.thumbTintColor = '#808080';
				yn.tintColor='gray';
				yn.onTintColor = 'blue';
				yn.opacity=1.0;
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
			newView.add(yn);
		}
		if (QA[i].AnswerType === 'dropdownlist') {
			var horizontalVW = Ti.UI.createView({
				style:'horizontal',
				height:'20dp',
				top:'20dp'
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
			                rObj.width=Titanium.UI.SIZE;
			                rObj.color = 'white';
			                rObj.font ={fontWeight:'bold', fontSize:12};
                
						
						//]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
						win.close();
					});
					vw.add(btn2);
					
					win.open();
					Ti.API.info('button clicked 2');
			});				
			
			horizontalVW.add(btn);
			newView.add(horizontalVW);
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
    			backgroundColor:"#fff",
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
			
			newView.layout='vertical';
			Alloy.Globals.QAControlList.push(tf);
			newView.add(tf);
		}
		//data.push(tvr);
		//var myViews = $.scrollableView.views;
		myViews.push(newView);
		//$.scrollableView.setViews(myViews);
		//console.info(JSON.stringify($.scrollableView));
   }
   ///////////
	/*var buttonTvr = Ti.UI.createTableViewRow({
		height:Titanium.UI.SIZE//,
		//layout:'horizontal'
	});*/
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
	
	/*var newView = Ti.UI.createView({
			id:"dantestView"+i,
			layout:"vertical"
	});*/
	
	//newView.add(btnContinue);
	//var myViews = $.scrollableView.views;
	//myViews.push(newView);
	var preViews = $.scrollableView.views;
	
	var x = preViews.length - 1;
	preViews[x].add(btnContinue);
	
	
	var mergedViews = myViews.concat(preViews);
	
	$.scrollableView.setViews(mergedViews);
	console.info(JSON.stringify($.scrollableView));
	/*var btnCancel = Ti.UI.createButton({
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
   */  
   /*if($('#' + myType + '_actind')[0]) {
   	 $('#' + myType + '_actind')[0].hide();
   };*/
   

    
   
   //TODO - parse response for errors
   /*if(_jsonReply.Status=='ERROR'){
     //alert('this');
     //cag.ui.alert('Error retrieving service request configuration','Please try again.');
         			var alertDialog = Titanium.UI.createAlertDialog({ title: 'Problem Encountered',
                    		message: 'Sorry, we had problems getting the service request questions.\n\nPlease try again.', 
                    		buttonNames: ['OK']
                    }); 
                	alertDialog.show();     		
     
     return;
   };*/
     
};






   