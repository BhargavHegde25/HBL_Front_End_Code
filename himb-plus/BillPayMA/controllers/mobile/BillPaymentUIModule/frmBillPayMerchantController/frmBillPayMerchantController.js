define(function(){ 
    var navManager = applicationManager.getNavigationManager();
return{
    timerCounter: 0,
    dataToPush: {},
    dataArray: [],
    repeatTransfer:"",
     isRequiredData: {},
     btnEnable:"",
     parentLabel:"",
     dataofsegments:"",
	segsec:"",
    init: function(){
         var currentForm=navManager.getCurrentForm();
            applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
        this.view.preShow = this.preShow;
    },
    onNavigate: function(uidata){
        try{
    var navManager = applicationManager.getNavigationManager();
  if(uidata.internalMerchants != undefined && uidata.internalMerchants.length > 0 && uidata.internalMerchants[0].merchantFields != undefined){
     var subCategories = uidata.internalMerchants[0].merchantFields[0].requiredFields;
     navManager.setCustomInfo("responseFieldMapping", uidata.internalMerchants[0].merchantFields[0].responseFieldMapping);
  } else{
   if(uidata.externalMerchants != undefined && uidata.externalMerchants.length > 0 && uidata.externalMerchants[0].merchantFields != undefined){
        var subCategories = uidata.externalMerchants[0].merchantFields[0].requiredFields;
         navManager.setCustomInfo("responseFieldMapping", uidata.externalMerchants[0].merchantFields[0].responseFieldMapping);
    }
  }
  if(uidata.billInfo){
    var resData = uidata.billInfo;
    this.resBillInquiry(uidata);
 }
     if(! kony.sdk.isNullOrUndefined(subCategories)){
    var merchantData = subCategories;
    navManager.setCustomInfo("merFieldData",merchantData);
    this.noRowFlex(merchantData);
        } 
        if(uidata.selectedAcc){
    this.selectedAcc();
   }if(uidata.serverError){
			this.errorResponse(uidata.serverError);
			}if(uidata.BillError){
    this.errorResponse(uidata.BillError);
   }
   }catch(err){
            kony.print("onNavigate"+ err);
        }
    },
    preShow: function(){
        try{
        var scope= this;
        var presenter = applicationManager.getModulesPresentationController({
            'appName': 'BillPayMA',
            'moduleName': 'BillPaymentUIModule'
        });
        if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
      this.view.flxHeader.isVisible = false;
      this.view.flxScrMain.top="5dp";
    }
     else{
        this.view.flxHeader.isVisible = true;
     this.view.flxScrMain.top="57dp";
     }
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        this.view.customHeader.flxBack.onClick = function() {
            scope.onBackClick();
        }.bind(this);
            //navManager.goBack();
            this.view.customHeader.btnRight.onClick = function(){
             applicationManager.getPresentationUtility().showLoadingScreen();
             scope.onCancelClick(); 
            }.bind(this);
            this.view.flxAccDetails.onClick = function(){
            this.setFromAccData();
            }.bind(this);
            this.view.flxPopupfrombottom.setVisibility(false);
           /* this.view.lblAccDetails.text = presenter.presentationController.selectedAccount;
         this.view.btnInquiry.onClick = function(){
            navManager.setCustomInfo("dataInquiry", this.dataToPush);
            var presenter = applicationManager.getModulesPresentationController({
            'appName': 'BillPayMA',
            'moduleName': 'BillPaymentUIModule'
        });
        //this.dataToPush.counterCode="201";
        presenter.makeNewInquiryCall(this.dataToPush);
        }.bind(this);*/
      var merchantField = navManager.getCustomInfo("merchantField");
      if(!kony.sdk.isNullOrUndefined(merchantField))
        this.view.lblMerchant.text = merchantField.labelText;
        this.view.imgMerchant.src = merchantField.logoUrl;
        var bPayModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
        if(kony.sdk.isNullOrUndefined(bPayModule.presentationController.selectedAccount)){
        this.view.lblAccDetails.text =kony.i18n.getLocalizedString("i18n.kony.Bulkpayments.selectFromAccount");
         }else{
          this.view.lblAccDetails.text=bPayModule.presentationController.selectedAccount;
         }
         this.view.segBills.onRowClick = this.dataFromSeg;
        this.view.segMerchantbranch.onRowClick = this.dataFromSeg;
         this.view.imgClose.onTouchStart = this.closePopup;
         this.view.flxPopupfrombottom.onClick = this.closePopup;
         //this.view.tbxSearch.onTextChange =this.serachby;
       }catch(err){
            kony.print("preShow"+ err);
        }
         },
     onCancelClick: function(){
        applicationManager.getPresentationUtility().showLoadingScreen();
    applicationManager.setBillPayFlow ="onCancel";
        var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
        billPayMod.presentationController.onCancelClick();
    },
      setFromAccData: function(){
    try{
        applicationManager.getPresentationUtility().showLoadingScreen();
        var presenter = applicationManager.getModulesPresentationController({
        'appName': 'BillPayMA',
        'moduleName': 'BillPaymentUIModule'
    });
        var billPayAcccounts = this.getDataWithAccountTypeSections(presenter.navFromAccountsPage());  
    }catch(err){
    kony.print("setFromAccData:"+ err);
    }
    },
    selectedAcc: function(){
    try{
    var presenter = applicationManager.getModulesPresentationController({
            'appName': 'BillPayMA',
            'moduleName': 'BillPaymentUIModule'
        });
        if(presenter.selectedAccountBankDone == true){
        this.view.lblAccDetails.text= presenter.selectedAccount;
        }
         }catch(err){
            kony.print("selectedAcc"+ err);
        }
 },
    onBackClick:function(){
        applicationManager.getPresentationUtility().showLoadingScreen();
        var isRepeatPaymentFlow = applicationManager.getNavigationManager().getCustomInfo("isRepeatPaymentFlow")
            if (isRepeatPaymentFlow) {
              this.onCancelClick();   
            }else{
       var navManager= applicationManager.getNavigationManager()
       navManager.goBack();
            }
    //     navManager.setCustomInfo("previousForm","frmBillPayDynamic");
    //    var data= navManager.getCustomInfo("backDynamic");
    //     var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
    //     billPayMod.presentationController.getCategories(data);
    },
    noRowFlex: function(merchantData){
        try{
      this.view.flxDynamic.removeAll();
	this.isRequiredData ={};
    this.dynamicParentFlex(this.view.flxDynamic,"flxname",merchantData.length);
    if(this.view.flxDynamic.widgets().length !=0){
    for(var i=0;i<merchantData.length;i++){
        this.dynamicLabel(this.view.flxDynamic.widgets()[i],merchantData[i]);
        if(merchantData[i].fieldType==="TEXTFIELD"){
        if(merchantData[i].fieldLabel==="Remarks"||merchantData[i].fieldLabel==="Address"){
        this.dynamicTextbx(this.view.flxDynamic.widgets()[i],merchantData[i],"75");
        }else{
        this.dynamicTextbx(this.view.flxDynamic.widgets()[i],merchantData[i],"45")
        }
        }else{
        //this.dynamicListbx(this.view.flxDynamic.widgets()[i],"lstbxValue"+[i]);
        this.setOptionData(merchantData[i],this.view.flxDynamic.widgets()[i])
        // this.dynamicSegmentFlex(this.view.flxDynamic.widgets()[i],"flxSeg"+[i],"40");
        // this.dynamicLabel(this.view.flxDynamic.widgets()[i].widgets()[i],"lblseg"+[i],"select from below");
        //this.dynamicImage(this.view.flxDynamic.widgets()[i].widgets()[i],"imgSeg"+[i],this.categoryOnclick.bind(this.view.flxDynamic.widgets()[i].widgets()[i]))
        }
     }
      this.dynamicButton(this.view.flxDynamic);
       this.enableDisableEnquieryButton();
    }
     }catch(err){
            kony.print("noRowFlex"+ err);
        }
},
dynamicParentFlex: function(parentflx,flxname,noofFlex){
    try{
if(parentflx,flxname,noofFlex){
for(var i=0;i<noofFlex;i++){
    // var flxname = flxname+i;
    var flexContainer = new kony.ui.FlexContainer({
    "id": flxname+i,
    "top": "10dp",
    "left": "0dp",
    "width": "100%",
    // "height": kony.flex.USE_PREFERED_SIZE,
    "height":"90dp",
    "zIndex": 50,
    "isVisible": true,
    // "skin":"skntbxBGffffBrB67677",
    "skin":"slFbox",
    "clipBounds": false,
    "layoutType": kony.flex.FLOW_VERTICAL,
        
        //"onClick":onClick
});
    //  flexContainer.skin="sknflx";
    parentflx.add(flexContainer);
    }
}
 }catch(err){
            kony.print("dynamicParentFlex"+ err);
        }
},

dynamicLabel: function(flxParent,fieldData){
    try{
   var required = "";
            if (fieldData.isRequired == "true") {
                var Name = fieldData.fieldName;
                this.isRequiredData[Name] = "";
                required = "*";
            } else {
                required = "";
            }
    if(flxParent){
    var label = new kony.ui.Label({
        "id": "lblKey"+ fieldData.fieldName + fieldData.fieldcategory,
        //"skin": "lblSkn",
        "skin":"sknHBLLblSemiBold100pr6a6a6a",//"sknLblHeadingRegular36px",
        "text": fieldData.fieldLabel,
        "isVisible": true,
        "width":"80%",
        "info":{
                    "fieldName": fieldData.fieldName,
					"fieldCategory": fieldData.fieldcategory
                    },
        //"centerX":"50%",
        "left":"10dp",
        "height": "25dp",
        "zIndex":10,
        "centreX":"50%",
        "wrapping":constants.WIDGET_TEXT_WORD_WRAP
    });
    flxParent.add(label);
    }
     }catch(err){
            kony.print("dynamicLabel"+ err);
        }
},

dynamicTextbx: function(flxParent,fieldData,height){
    try{
        var required = "";
            if (fieldData.isRequired == "true") {
                var Name = fieldData.fieldName;
                this.isRequiredData[Name] = "";
                required = "*";
            } else {
                required = "";
            }
    if(flxParent){
        var textbox = new kony.ui.TextBox2({
        "id": "txtField" + fieldData.fieldName + fieldData.fieldcategory,
        "text":this.populateResponseFieldsData(fieldData,fieldData.fieldName),
     "placeholder":fieldData.inputFormat ? fieldData.inputFormat : fieldData.fieldLabel,
        "maxTextLength":parseInt(fieldData.dataType[0].length ? fieldData.dataType[0].length : 20),
        "info":{"fieldName":fieldData.fieldName,
                "fieldCategory": fieldData.fieldcategory
                },
        "isVisible": true,
        //"onTouchStart":this.txtbxClick.bind(this),
        "top":"10dp",
        "width":"95%",
        //"centreX":"50%",
        "left":"10dp",
        "height":height+"dp",
       "focusSkin": "sknlbl949494SSPR18px",//"sknTbxcea3a4Br",
        "placeholderSkin":"sknlbl949494SSPR18px",//"sknTbxcea3a4Br",
        "skin":"sknTbxcea3a4Br",
        "autoCapitalize": constants.TEXTBOX_AUTO_CAPITALIZE_SENTENCES,
        "widgetAlignment": constants.WIDGET_ALIGN_TOP_LEFT,
        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
         "padding": [2,2,2,2],
         "onTextChange":this.txtbxClick.bind(this)
        // "onTouchEnd": this.getFieldData.bind(this),
        });
        flxParent.add(textbox);
    }
     }catch(err){
            kony.print("dynamicTextbx"+ err);
        }
    },
    dynamicButton: function(flxParent){
        try{
            var scope = this;
     if(flxParent){
       var button = new kony.ui.Button({
        "id": "btnInquiry",
        "top":"20dp",
        "height":"55dp",
        "width":"80%",
        "isVisible": true,
        "enable":(scope.btnEnable==true)?true:false,
        "skin": (scope.btnEnable==true)?"sknHBLBtn851a1cRounded8pxffffff100pr":"sknHBLBtnf4f5f8Rounded8pxffffff100pr",
      "focusSkin":(scope.btnEnable==true)?"sknHBLBtn851a1cRounded8pxffffff100pr":"sknHBLBtnf4f5f8Rounded8pxffffff100pr",
      "centerX":"50%",
      "text": kony.i18n.getLocalizedString("i18n.billpay.Inquiry"),
      "onClick": scope.makeInquirycall.bind(this),
         });
         flxParent.add(button);
     }
      }catch(err){
            kony.print("dynamicButton"+ err);
        }
    },
    txtbxClick: function(eventobj){
        var scope =this;
        var event =eventobj;
        this.isRequiredData[eventobj.info.fieldName]=eventobj.text;
        scope.enableDisableEnquieryButton();
    },
  setOptionData: function(fieldData,parentFlx){
try{
    var scope = this;
   var flexContainer = new kony.ui.FlexContainer({
    "id": "flxRow"+fieldData.fieldName,
    "info": {
                    "fieldName": fieldData.fieldName,
					"fieldCategory": fieldData.fieldcategory
                    },
    "top": "0dp",
    "left": "5dp",
    "width": "95%",
    "height": "40dp",
    "centerX":"50%",
    "zIndex": 100,
    "isVisible": true,
    "skin":"skntbxBGffffBrB67677",
    "clipBounds": false,
    "layoutType": kony.flex.FREE_FORM,
    "onClick":  scope.bottomPopup.bind(scope,fieldData)//scope.dropdownOnclick.bind(scope, fieldData)
    
        // "onClick":scope.segAction(flexContainer.widgets())
});
    var label = new kony.ui.Label({
        "id": "lblOptionFieldLabel" + fieldData.fieldName,
        //"skin": "lblSkn",
        "skin":"sknLblHeadingRegular36px",
        "info": {
                    "fieldName": fieldData.fieldName,
					"fieldCategory": fieldData.fieldcategory
                    },
        "text": this.searchDropdownValue(fieldData,fieldData.fieldName),
        "isVisible": true,
        "width":"80%",
        "top":"10dp",
        "left":"10dp",
        "height": "25dp",
        "zIndex":10,
       //"centerY ":"50%",
        "wrapping":constants.WIDGET_TEXT_WORD_WRAP
    });
    var imgDynamic = new kony.ui.Image2 ({
        "id": "img" + fieldData.fieldName,
        "isVisible": true,
        "info": {
                    "fieldName": fieldData.fieldName,
					"fieldCategory": fieldData.fieldcategory
                    },
        "src": "chevron.png",
     "width":"40dp",
        "height":"40dp",
        "right": "15dp",
        "centerY ": "50%",
        "top":"10dp"
        //"onTouchEnd":this.dropdownOnclick.bind(this, fieldData)
    });
    var segment = new kony.ui.SegmentedUI2({
        "id": "seg" + fieldData.fieldName,
        "isVisible": false,
         "info": {
                    "fieldName": fieldData.fieldName,
					"fieldCategory": fieldData.fieldcategory
                    },
        "top": "50dp",
        "left": "10dp",
        "height": "100%",
        "width": "95%",
        "zIndex": 5,
        "skin":"sknSegfffff",
        //"onRowClick": this.rowClick.bind(), 
       // "onRowClick":this.segData.bind(),
        "widgetDataMap": {
            "flxDetails":"flxDetails",
            "flxMain":"flxMain",
		   "lblDetail":"lblDetail",
		   "lblDetailValue":"lblDetailValue",
		   "flxSeparator":"flxSeparator"
        },
        //"rowTemplate" : "segAccountDetailsController"
       "rowTemplate": "flxDetails"
    }); 
    var fieldValues = [];
        if (fieldData.fieldvalue != undefined && fieldData.fieldvalue != null && fieldData.fieldvalue != "") {
            fieldValues = JSON.parse(fieldData.fieldvalue);
        }
    var segData=[];
    for (i = 0; i < fieldValues.length; i++) {
    segData.push({
	"lblDetail":{isVisible:false},
        "lblDetailValue": {
            text: fieldValues[i].value,
             "info":{"key": fieldValues[i].key, "value":fieldValues[i].value},
            // "onTouchEnd": function(eventobj) {
			// 			scope.segmentData(eventobj,label,fieldData);
            //         }
        },
        })
   }
     segment.setData(segData);
		if(fieldData.fieldName !== "branchcode"){
		this.segsec = "segBills";
     scope.view.segBills.info ={
                    "fieldName": fieldData.fieldName,
					"fieldCategory": fieldData.fieldcategory
                    },
     scope.view.segBills.setData(segData);
		}else{
		this.segsec ="segMerchantbranch";
		scope.view.segMerchantbranch.info ={
		"fieldName": fieldData.fieldName,
		"fieldCategory": fieldData.fieldcategory
		},
		scope.view.segMerchantbranch.setData(segData);
		}
     this.dataofsegments=segData;
     parentFlx.add(flexContainer);
    flexContainer.add(label);
    flexContainer.add(imgDynamic);
    flexContainer.add(segment);
}catch(err){
kony.print("setOptionData:"+ err);
}
},
dataFromSeg:function(){
try{
    var segment =this.view["seg" + this.parentLabel];
		if(segment.info.fieldName !== "branchcode"){
		var segDatas = this.view.segBills.selectedRowIndex;
		}else{
		var segDatas =this.view.segMerchantbranch.selectedRowIndex;	
		}
		segment.selectedRowIndex = segDatas;
		if(segment.info.fieldName !== "branchcode"){
		var segDatae = this.view.segBills.selectedRowItems[0];
		}else{
		var segDatae =this.view.segMerchantbranch.selectedRowItems[0];
		}
		// var segDatas = this.view.segBills.selectedRowItems[0];
		this.view["lblOptionFieldLabel"+this.parentLabel].text = segDatae.lblDetailValue.text;
		this.isRequiredData[segment.info.fieldName] = segDatae.lblDetailValue.text;
		this.view.flxPopupfrombottom.setVisibility(false);
		this.enableDisableEnquieryButton();
}catch(err){
kony.print("segerr"+ err);
}
},
rowClick: function(eventObj){
    var scope=this;
    try{
 if(kony.sdk.isNullOrUndefined(eventObj)){
        return;
 }else{
var seg = eventObj.id;
eventObj.parent.widgets()[0].text =this.view[seg].selectedRowItems[0].lblDetailValue.text;
this.isRequiredData[eventObj.info.fieldName]=this.view[seg].selectedRowItems[0].lblDetailValue.text;
scope.dropdownOnclick(eventObj);
}
this.view.forceLayout(); 
 }catch(err){
            kony.print("rowClick"+ err);
        }
},
bottomPopup: function(fieldData){
this.parentLabel = fieldData.fieldName;
		if(fieldData.fieldName !== "branchcode"){
		this.view.segBills.setVisibility(true);
		this.view.segMerchantbranch.setVisibility(false);
		}else{
		this.view.segBills.setVisibility(false);
		this.view.segMerchantbranch.setVisibility(true);
		}
this.view.flxPopupfrombottom.setVisibility(true);
 this.view.lblselectaccount.text =fieldData.inputFormat;
 this.view.flxPopupcontainer.animate(kony.ui.createAnimation({
    "100": {
    "bottom": "-5%",
    "stepConfig": {
    "timingFunction": kony.anim.EASE
    }
    }
    }), {
    "delay": 0,
    "iterationCount": 1,
    "fillMode": kony.anim.FILL_MODE_FORWARDS,
    "duration": 1.0
    },
    );
},
dropdownOnclick: function(fieldData){
    try{
    if(!kony.sdk.isNullOrUndefined(fieldData.fieldName)){
    var currFlx = this.view["flxRow"+fieldData.fieldName];
    var currsegment = this.view["seg" + fieldData.fieldName];
    var currImg = this.view["img" + fieldData.fieldName];
    var currLabel = this.view["lblOptionFieldLabel"+fieldData.fieldName];
    //this.rowClick(fieldData,currLabel);
    if (currsegment.isVisible) {
        currFlx.height ="40dp";
        currFlx.parent.height ="70dp";
     currFlx.skin = "skntbxBGffffBrB67677";
        currsegment.isVisible = false;
        currImg.src = "arrowdown.png";
    } else {
        currFlx.height ="185dp";
        currFlx.parent.height ="220dp";
        currsegment.height ="80dp";
        currsegment.top ="70dp";
        currsegment.isVisible = true;
        currFlx.skin = "ICSknFlxffffffNoShadow";
        currImg.src = "arrowup.png";
    }
    }else{
        fieldData.parent.height ="40dp";
        fieldData.parent.parent.height ="70dp";
        fieldData.parent.widgets()[2].isVisible =false;
        fieldData.parent.widgets()[1].src ="arrowdown.png";
    }
    this.enableDisableEnquieryButton();
    this.view.forceLayout(); 
     }catch(err){
            kony.print("dropdownOnclick"+ err);
        }
    },
    segmentData: function(eventobj,label,fieldData){
    if(kony.sdk.isNullOrUndefined(eventobj)||kony.sdk.isNullOrUndefined(label)){
        return;
    }else{
   label.text = eventobj.text;
 var labelData = label.text;
 //this.dataToPush[labelData] = labelData;
 //this.getFieldData(label);
 this.dropdownOnclick(fieldData);
// this.dataToPush[labelData.fieldName] = eventObj.info.key;
    }   
},

makeInquirycall: function(eventObj){
    try{
 this.dataToPush = {};
    applicationManager.getPresentationUtility().showLoadingScreen();
    var isRepeatPaymentFlow = applicationManager.getNavigationManager().getCustomInfo("isRepeatPaymentFlow")
     if (!isRepeatPaymentFlow) {
       
        for(var i=0;i<this.view.flxDynamic.widgets().length-1;i++){
    var data1 = this.view.flxDynamic.widgets()[i];
	var j=0;
	for(;j<data1.widgets().length;j++){ 
	var findflx =data1.widgets()[j].id;
	if(findflx.substr(0,6) =="flxRow"){
	//var dataKeyValue =data1.widgets()[j].widgets()[0].text;
    if(kony.sdk.isNullOrUndefined(data1.widgets()[j].widgets()[2].selectedRowItems)){
       // alert("Fields are not selected");
         applicationManager.getPresentationUtility().dismissLoadingScreen();
         break; 
    }else{
    var dataKeyValue =data1.widgets()[j].widgets()[2].selectedRowItems[0].lblDetailValue.info.key;
    if(!kony.sdk.isNullOrUndefined(dataKey)){
        if(dataKey== "counterCode"){
        var datakeys ="counterValue";
      this.dataToPush[datakeys] =data1.widgets()[j].widgets()[2].selectedRowItems[0].lblDetailValue.info.value;
      applicationManager.getNavigationManager().setCustomInfo("counterValue", data1.widgets()[j].widgets()[2].selectedRowItems[0].lblDetailValue.info.value);
    }
    }
    }
	}else if(findflx.substr(0,8) =="txtField"){
	var dataKeyValue=data1.widgets()[j].text;
	}else{
	var dataKey = data1.widgets()[j].info.fieldName;
    }
	}
	this.dataToPush[dataKey]= dataKeyValue;
}
            var presenter = applicationManager.getModulesPresentationController({
            'appName': 'BillPayMA',
            'moduleName': 'BillPaymentUIModule'
        });
		var merchantAggregator = navManager.getCustomInfo("BillPayMerchantCategories")
		if(merchantAggregator.internalMerchants[0].paymentAggregator == "KUKL"){
		this.dataToPush.paymentAggregator ="KUKL";
		}  
		navManager.setCustomInfo("dataInquiry", this.dataToPush);
		var getMerchantField = navManager.getCustomInfo("merFieldData");
        presenter.makeNewInquiryCall(this.dataToPush);
     }else{
        navManager.setCustomInfo("dataInquiry", this.dataToPush);
     var getMerchantField = navManager.getCustomInfo("merFieldData");
     
            var presenter = applicationManager.getModulesPresentationController({
            'appName': 'BillPayMA',
            'moduleName': 'BillPaymentUIModule'
        });
        //this.dataToPush.counterCode="201";
        presenter.makeNewInquiryCall(this.dataToPush);
     }
         }catch(err){
            kony.print("makeInquirycall"+ err);
        }
    },
    resBillInquiry: function(response){
        try{
        var scopeObj = this;
        var timerId = "timerPopupBillPay" + scopeObj.timerCounter;
        var errorMsg = '';
         if (!kony.sdk.isNullOrUndefined(scopeObj.timerCounter)) {
            scopeObj.timerCounter = parseInt(scopeObj.timerCounter) + 1;
        } else {
            scopeObj.timerCounter = 1;
        }
        if (response.errorObj) {
            for (i = 0; i < response.errorObj.length; i++) {
                errorMsg = errorMsg + response.errorObj[i].dbpErrMsg + "\n";
            }
          scopeObj.view.customPopup.imgPopup.src = "errormessage.png";
        scopeObj.view.customPopup.lblPopup.text = errorResponse;
        scopeObj.view.customPopup.flxPopupWrapper.skin = "sknflxff5d6e";
        scopeObj.view.flxPopup.setVisibility(true);
        }
         else if (response.billInfo[0].transactionDetails[0].code!="0") {
            var errorMsg=response.billInfo[0].transactionDetails[0].message	;
            scopeObj.view.customPopup.imgPopup.src = "errormessage.png";
            if(!kony.sdk.isNullOrUndefined(errorMsg)){
                scopeObj.view.customPopup.lblPopup.text = errorMsg;
            }else{
                scopeObj.view.customPopup.lblPopup.text = kony.i18n.getLocalizedString("i18n.common.errorCodes.10083");
            }
        scopeObj.view.customPopup.flxPopupWrapper.skin = "sknflxff5d6e";
        scopeObj.view.flxPopup.setVisibility(true);
         } else{}
         kony.timer.schedule(timerId, function () {
            scopeObj.view.flxPopup.setVisibility(false);
            scopeObj.view.forceLayout();
        }, 1.5, false);
         this.view.forceLayout();
  }catch(err){
            kony.print("resBillInquiry"+ err);
        }
    },
 getFieldData: function(eventObject){
     if(kony.sdk.isNullOrUndefined(eventObject.text)){
        return;
    }else{
     var fieldName = eventObject.info.fieldName
    var data = eventObject.text;
    if (data) {
            this.dataToPush[fieldName] = data;
        }
    }
},
searchDropdownValue: function(response, fieldId) {
            var value = "";
            var key = "";
            var defaultOption = "Select " + response.fieldLabel;
            var isRepeatPaymentFlow = applicationManager.getNavigationManager().getCustomInfo("isRepeatPaymentFlow")
            if (isRepeatPaymentFlow) {
                var servicedata = applicationManager.getNavigationManager().getCustomInfo("repeatPaymentServiceRecord");
                var servicePayload = servicedata.servicepayload;
                var dropdownfieldValues = JSON.parse(response.fieldvalue);
                if (servicePayload) {
                    if (fieldId in servicePayload) {
                        key = servicePayload[fieldId];
                    }
                    if (key !== "") {
                        var dropdownrecord = dropdownfieldValues.find(record => record.key === key);
                        value = dropdownrecord != undefined ? dropdownrecord.value : defaultOption;
                        this.dataToPush[fieldId] = key;
                        if(fieldId == "counterCode"){
                        var datas = "counterValue"
                      this.dataToPush[datas] =value
                        }
                        if (Object.keys(this.isRequiredData).length > 0) {
                            for (i = 0; i < Object.keys(this.isRequiredData).length; i++) {
                                if (Object.keys(this.isRequiredData)[i] == fieldId) {
                                    this.isRequiredData[fieldId] = key;
                                    //Object.values(this.isRequiredData)[i]=key;
                                }
                            }
                        }
                    } else {
                        value = defaultOption;
                    }
                }
            } else {
                value = defaultOption;
            }
             this.enableDisableEnquieryButton();
            return value;
        },
        populateResponseFieldsData: function(response, fieldId) {
            var value = "";
            var isRepeatPaymentFlow = applicationManager.getNavigationManager().getCustomInfo("isRepeatPaymentFlow");
            if (isRepeatPaymentFlow) {
                var servicedata = applicationManager.getNavigationManager().getCustomInfo("repeatPaymentServiceRecord");
                var servicePayload = servicedata.servicepayload;
                if (servicePayload) {
                    if (fieldId in servicePayload) {
                        value = servicePayload[fieldId];
                        this.dataToPush[fieldId] = value;
                        if (Object.keys(this.isRequiredData).length > 0) {
                            for (i = 0; i < Object.keys(this.isRequiredData).length; i++) {
                                if (Object.keys(this.isRequiredData)[i] == fieldId) {
                                    this.isRequiredData[fieldId] = value;
                                    //Object.values(this.isRequiredData)[i]=value;
                                }
                            }
                        }
                    }
                }
            }
             this.enableDisableEnquieryButton();
            return value;
          },
        enableDisableEnquieryButton: function(){
            var count = 0;
            if (Object.values(this.isRequiredData).length > 0) {
                for (i = 0; i < Object.values(this.isRequiredData).length; i++) {
                    if (Object.values(this.isRequiredData)[i] == "") {
                        var count = count + 1;
                    }
                }
                if (count == 0) {
                    var btns =this.view["btnInquiry"];
                    if(!kony.sdk.isNullOrUndefined(btns)){
                         this.btnEnable = true;
                         this.view["btnInquiry"].enable =true;
                         this.view["btnInquiry"].skin ="sknHBLBtn851a1cRounded8pxffffff100pr";
                    }
                }if (count != 0) {
                    this.btnEnable = false;
                }
            }else{
                this.btnEnable=false;
            }

        },
    closePopup: function(){
     this.view.flxPopupfrombottom.setVisibility(false);   
    },
    serachby: function(){
    var segData = this.dataofsegments;
    var searchTerm = this.view.tbxSearch.text;
    if(searchTerm.length>= 3){
        var results = [];
        var lowercaseSearchTerm = searchTerm.toLowerCase().trim();
        for (var i = 0; i < segData.length; i++) {
          var category = segData[i];
          var lowercaseLabelText = category.lblDetailValue.text.toLowerCase();
          if (lowercaseLabelText.includes(lowercaseSearchTerm)) {
            results.push(category);
          }
        }
        this.view.segBills.setData(results);
      }else{
        if(searchTerm.length==0){
          this.view.segBills.setData(segData);
        }
      } 
    },
    errorResponse: function(err){
        var scope =this;
	if(!kony.sdk.isNullOrUndefined(err.errorMessage.errorMessage)){
			applicationManager.getDataProcessorUtility().showToastMessageError(scope, err.errorMessage.errorMessage);
			}else  if(!kony.sdk.isNullOrUndefined(err.errorMessage)){
       applicationManager.getDataProcessorUtility().showToastMessageError(scope, err.errorMessage);
        }else if(!kony.sdk.isNullOrUndefined(err.serverErrorRes.dbpErrMsg)){
             applicationManager.getDataProcessorUtility().showToastMessageError(scope, err.serverErrorRes.dbpErrMsg);
        }else{
             applicationManager.getDataProcessorUtility().showToastMessageError(scope, "Something went wrong....");
        }
        applicationManager.getPresentationUtility().dismissLoadingScreen();
    },
};
});