    define(function(){ 
     return{
    urlWeb: "",
    responseView:"",
    init: function(){
         var navManager = applicationManager.getNavigationManager();
      var currentForm=navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
      this.view.preShow = this.preShow;
    },
    preShow: function(){ 
        try{
            if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
      this.view.flxHeader.isVisible = false;
      this.view.flxScrollNew.top ="5dp";
         }
     else{
        this.view.flxHeader.isVisible = true;
        this.view.flxScrollNew.top ="50dp";
     }
        applicationManager.getPresentationUtility().dismissLoadingScreen();
      var scope = this;
       var navManager = applicationManager.getNavigationManager();
    this.view.customHeader.flxBack.onClick = function() {
        scope.onBackClick();
      };
      this.view.tbxSearch.text ="";
      this.view.flxClose.onClick= function(){
        scope.clearSearchText();
      };
      this.view.tbxSearch.onTextChange= function(){
        scope.setSearchCategory();
      };
  this.view.customHeader.btnRight.onClick = function(){
        scope.onCancelClick();
      };
         }catch(err){
            kony.print("preShow"+ err);
        }
     },
     
    onNavigate: function(uidata){
        try{
         var navManager = applicationManager.getNavigationManager();
    if(uidata.MerchantPayment){
        this.onContiuneFlow();
        return;
      }if(uidata.loadCategoriesSuccess){
    var subcategory =uidata.merchantBasicInfo.categories[0];
    this.categoryOnclick(subcategory);
      }
      if(uidata.categories){
      var filterBill = uidata.categories.filter(filterBill => filterBill.isActive =="true")
      if(uidata.categories.length!= 0){
            this.view.flxNoData.isVisible = false;
             this.view.flxDynamic.isVisible =true;
    var subcategory = filterBill;
        this.noRowFlex(subcategory);
      }else{
    this.view.flxDynamic.isVisible =false;
    this.view.flxNoData.isVisible = true;
    }
    }if(uidata.appCode){
    this.broswerSet();
    }
    if (uidata.formFieldsURL) {
    var getResponse = applicationManager.getNavigationManager().getCustomInfo("Biller_Code");
    if (!kony.sdk.isNullOrUndefined(getResponse)) {
    var appendCode = getResponse.code;
    }
    var url = uidata.formFieldsURL;
    url = url + appendCode;
    var urlConf = {
    URL: url,
    requestMethod: constants.BROWSER_REQUEST_METHOD_GET
    };
    if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
    this.broswerSetUrl(urlConf);
    }else{
    this.browserAndroidUrl(urlConf)
    }
    }
    }catch(err){
    kony.print("onNavigate"+ err);
    }
    },
    onCancelClick: function(){
        applicationManager.setBillPayFlow ="onCancel";
        var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
        billPayMod.presentationController.onCancelClick();
    },
    onBackClick:function(){
        var navManager = applicationManager.getNavigationManager();
        navManager.setCustomInfo("previousForm","frmBillPayDynamic");
        var data =navManager.getCustomInfo("backDynamic");
        var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
       billPayMod.presentationController.getCategories(data);
    },
   setSearchCategory: function(){
    try{
      var navManager = applicationManager.getNavigationManager();
     var categories = navManager.getCustomInfo("BillPaySubCategories");
      var searchTerm = this.view.tbxSearch.text;
      if(searchTerm.length>= 3){
        var results = [];
        var lowercaseSearchTerm = searchTerm.toLowerCase().trim();
        for (var i = 0; i < categories.categories.length; i++) {
          var category = categories.categories[i];
          var lowercaseLabelText = category.labelText.toLowerCase();
          if (lowercaseLabelText.includes(lowercaseSearchTerm)) {
            results.push(category);
          }
        }
        this.noRowFlex(results);
      }else{
        if(searchTerm.length==0){
          var subCategoryData =categories.categories;
          this.noRowFlex(subCategoryData);
        }
      }
     }catch(err){
            kony.print("setSearchCategory"+ err);
        }
    },
    clearSearchText: function(){
         var navManager = applicationManager.getNavigationManager();
     var categories = navManager.getCustomInfo("BillPaySubCategories");
        this.view.tbxSearch.text ="";
         var subCategoryData =categories.categories;
          this.noRowFlex(subCategoryData);
    
    },
    noRowFlex: function(subCategoryData){
        try{
     var navManager = applicationManager.getNavigationManager();
     subCategoryData = subCategoryData.filter(filterBill => filterBill.isActive == "true")
    if(subCategoryData.length ==0){
    this.view.flxNoData.isVisible = true;
    this.view.flxDynamic.isVisible = false; 
    }else{
    this.view.flxNoData.isVisible = false;
    this.view.flxDynamic.isVisible = true;
      this.view.lblCategoryHeading.text =subCategoryData[0].subcategoryof;
      this.view.flxDynamic.removeAll();
      var rowDetails = Math.ceil(subCategoryData.length/3);
      this.dynamicParentFlex(this.view.flxDynamic,"flxname",rowDetails);
      var j=1;
      for(var i=0;i<rowDetails;i++){
        if(this.view.flxDynamic.widgets().length !=0){
          for(;j<=subCategoryData.length;j++){
            if(j%3===0){
              this.dynamicFlex(this.view.flxDynamic.widgets()[i], "flx" + j + subCategoryData[j - 1].labelText.replace(/ +/g, "").replace(/[&\/\\/-/#, +()$~%.'":*?<>{}]/g, '').replace('-', "").replace(/\n/g, ''), 1, this.categoryOnclick.bind(this, subCategoryData[j - 1]));
              j++ ;
              break;  
            }else{
              this.dynamicFlex(this.view.flxDynamic.widgets()[i],"flx" + j + subCategoryData[j - 1].labelText.replace(/ +/g, "").replace(/[&\/\\/-/#, +()$~%.'":*?<>{}]/g, '').replace('-', "").replace(/\n/g, ''), 1, this.categoryOnclick.bind(this, subCategoryData[j - 1]));
            }
          }
        }
      }
      var flxHeightCal = this.view.flxDynamic.widgets().length;
      flxHeightCal = flxHeightCal * 120;
      flxHeightCal = flxHeightCal + 20;
      var flxHeight = flxHeightCal.toString();
      this.view.flxDynamic.height = flxHeight + "dp";
      // for(var i=0;i<rowDetails;i++){
      var j=0; var x =0;
      for(;j<this.view.flxDynamic.widgets().length;){
        var k =0;
        for(;k<this.view.flxDynamic.widgets()[j].widgets().length;k++){

          this.dynamicImageSet(this.view.flxDynamic.widgets()[j].widgets()[k],subCategoryData[x].logoUrl,"img"+ x + subCategoryData[x].labelText.replace(/ +/g, "").replace(/[&\/\\/-/#, +()$~%.'":*?<>{}]/g, '').replace('-', "").replace(/\n/g, ''));
          this.dynamicLabelSet(this.view.flxDynamic.widgets()[j].widgets()[k],subCategoryData[x].labelText,"lbl"+ x + subCategoryData[x].labelText.replace(/ +/g, "").replace(/[&\/\\/-/#, +()$~%.'":*?<>{}]/g, '').replace('-', "").replace(/\n/g, ''));
          x++;
        }
        j++;
        //break;
      }
    }
      //  }

      //this.dynamicFlex(this.view.flxDynamic,"flxSubCateory",rowDetails);
     }catch(err){
            kony.print("noRowFlex"+ err);
        }
    },
    dynamicParentFlex: function(parentflx,flxname,noofFlex,onClick){
        try{
     var navManager = applicationManager.getNavigationManager();
      if(parentflx,flxname,noofFlex){
        for(var i=0;i<noofFlex;i++){
          var flxname = flxname+i;
          var flexContainer = new kony.ui.FlexContainer({
            "id": flxname,
            "top": "5dp",
            "left": "0dp",
            "width": "100%",
            "height": "120dp",
            "zIndex": 10,
            "isVisible": true,
            "skin":"sknflx",
            "clipBounds": false,
            "layoutType": kony.flex.FLOW_HORIZONTAL,
            "onClick":onClick
          });
          //  flexContainer.skin="sknflx";
          parentflx.add(flexContainer);
        }
      }
       }catch(err){
            kony.print("dynamicParentFlex"+ err);
        }
    },

    dynamicFlex: function(flxParent,flexName,noofFles,onClick){
        try{
    var navManager = applicationManager.getNavigationManager();
      for(var i=0;i<noofFles;i++){
        var flxname = flexName+i;
        var flexContainer = new kony.ui.FlexContainer({
          "id": flxname,
          "top": "0dp",
          "left": "3%", 
          "width": "100dp",
         "height": "75dp",
          "zIndex": 10,
          "isVisible": true,
          "skin":"slFbox",
          "clipBounds": false,
         // "skin":"sknflx424242op50",
          "layoutType": kony.flex.FLOW_VERTICAL,
          "onClick":onClick,
        });
        //  flexContainer.skin="sknflx";
        flxParent.add(flexContainer);
      }
    }catch(err){
            kony.print("dynamicFlex"+ err);
        }
    },
    categoryOnclick:function(subCatergoryData){
    try{
    var navManager = applicationManager.getNavigationManager();
    applicationManager.getPresentationUtility().showLoadingScreen();
    applicationManager.getNavigationManager().setCustomInfo("billPayscreen","frmBillPaySubCategory");
    applicationManager.getNavigationManager().setCustomInfo("Biller_Code", subCatergoryData);
    
    //var subCatergoryData =navManager.getCustomInfo("Biller_Code");
   // await this.getPaymentCharges(subCatergoryData);
      if(subCatergoryData.category ==="APP"){
        applicationManager.getNavigationManager().setCustomInfo("PaymentAggregatorType",subCatergoryData.paymentAggregator);
      if(subCatergoryData.merchantType==="Automatic"){
	 // var data = {"appCode":subCatergoryData.code,
       //  "merchantType": subCatergoryData.merchantType
       // };
        var  params={
                    "merchantCode":subCatergoryData.code
                };
          var billPayModule= kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
           billPayModule.presentationController.getMerchantPaymentChargesMB(params,"frmBillPaySubCategory");       
		 //navManager.navigateTo({"appName": "BillPayMA","friendlyName": "frmBillPayConsent"},true,data);
	  }else{
        var data = {"appCode":subCatergoryData.code,
         "merchantType": subCatergoryData.merchantType
        };
         var merchantField ={
            "labelText":subCatergoryData.labelText,
            "logoUrl":subCatergoryData.logoUrl
        };
        navManager.setCustomInfo("merchantField",merchantField);
        var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
        billPayMod.presentationController.getmerchantfield(data);
      }
	  }
      else if(subCatergoryData.category ==="CATEGORY"){
        var data = {"code":subCatergoryData.code,
          "merchantType": subCatergoryData.merchantType
        };
        navManager.setCustomInfo("BillPaySubCategories","");
        var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
        billPayMod.presentationController.getCategories(data);
      }
     }catch(err){
            kony.print("onContinue"+ err);
        }
    },
    getPaymentCharges: async function(subCatergoryData){
   var  params={
                    "merchantCode":subCatergoryData.code
                };
   applicationManager.getNavigationManager().setCustomInfo("Biller_Code", subCatergoryData);
    var billPayModule= kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
       var bill =billPayModule.presentationController.getMerchantPaymentChargesMB(params);
       return bill;
    },
   /*categoryOnclick: function(subCatergoryData){
    var  params={
                    "merchantCode":subCatergoryData.code
                };
   applicationManager.getNavigationManager().setCustomInfo("Biller_Code", subCatergoryData);
     kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule")
                .presentationController.getMerchantPaymentChargesMB(params,"frmBillPayCatergory");
    },*/

    dynamicImageSet: function(flxParent,imgURL,imgID){
        try{
        var navManager = applicationManager.getNavigationManager();
      if(flxParent,imgURL,imgID){
        var imgDynamic = new kony.ui.Image2 ({
          "id": imgID,
          "isVisible": true,
          "src": imgURL,
          "top":"10dp",
          "width":"40dp",
          "height":"40dp",
          "centerX":"50%",
        });
        flxParent.add(imgDynamic);
      }
      }catch(err){
            kony.print("dynamicImageSet"+ err);
        }
    },
    dynamicLabelSet: function(flxParent,labeltxt,lblID){
        try{
      if(flxParent,labeltxt,lblID){
        var lableDynamic = new kony.ui.Label({
          "id": lblID,
          "skin": "sknLblHeadingsemiBold31px",//code skin same as billpay dynamic screen
          "text": labeltxt,
          "isVisible": true,
          "top":"25dp",
          "width":"90%",
          "contentAlignment":constants.CONTENT_ALIGN_CENTER,
          "height":kony.flex.USE_PREFERED_SIZE,
          "centerX":"52%"
        }); 
        flxParent.add(lableDynamic);

    }
    }catch(err){
    kony.print("dynamicLabelSet"+ err);
    }
    },
    broswerSetUrl: function(urlConf) {
    try {
    var scope= this;
    scope.urlWeb = urlConf.URL;
    var myURLManagerMain = objc.import("MyPaymentUrlFramework");
    var  networkInstance  = myURLManagerMain.alloc().jsinit();  
    kony.print("--2-networkInstance--"+networkInstance);
    kony.print("--3-networkInstance--"+Object.keys(networkInstance));
    var  urlString=scope.urlWeb;
    networkInstance.loadURLCallback(urlString,scope.navConfirmPage);
    } catch (err) {
    kony.print("broswerSetUrl" + err);
    }
    },
    browserAndroidUrl: function(urlConf){
    var scope =this;
    this.urlWeb = urlConf.URL;
    var urlConfs = {
    URL: this.urlWeb,
    requestMethod: constants.BROWSER_REQUEST_METHOD_GET,
    };
    scope.NCTest();
    scope.addNativeWebView();
    },
    NCTest: function() {
    // this.MyKonyExtension = java.import("com.example.newweb.MainView");
    this.MyKonyExtension = java.import("com.example.browserview.MainView");
    this.KonyMain = java.import("com.konylabs.android.KonyMain");
    this.konyContext = this.KonyMain.getActivityContext();
    this.layoutView = java.import("android.widget.LinearLayout");
    this.viewGroup = java.import("android.view.ViewGroup");
    this.eventObject = null;
    },
    addNativeWebView: function(){
    try{
    var scope =this;
    this.linearLayout = new this.layoutView(this.konyContext);
    this.linearLayout.setLayoutParams(new this.viewGroup.LayoutParams(this.viewGroup.LayoutParams.MATCH_PARENT, this.viewGroup.LayoutParams.MATCH_PARENT));
    this.linearLayout.setId(1234);
    var parentView = this.linearLayout.getLayoutParams();
    scope.addNativeWebViewAndroid(parentView);
    }catch(err){
    kony.print("addNativeWebView"+ err);
    }
    },
    addNativeWebViewAndroid: function(parentView) {
    this.MyKonyExtension.invokeBrowser(this.navConfirmPage, this.urlWeb);
    },
    navConfirmPage: function(payload){
    try{
    var merchantPayload = JSON.parse(payload);
    if (merchantPayload.type === "submit_form_payload") {
    payload = merchantPayload.data;
    PayLoad = {
            "npiObject": payload
        }
        //alert("payload received:"+payload);
    var presenter = applicationManager.getModulesPresentationController({
        'appName': 'BillPayMA',
        'moduleName': 'BillPaymentUIModule'
    });
    presenter.getWebViewdata(PayLoad);
    }
    }catch(err){
    kony.print("navConfirmPage"+err);
    }
    },
    broswerSet: function() {
    try {
    var name;
    if (kony.os.deviceInfo().name === "android") {
    name = "Android";
    } else {
    name = "IOS";
    }
    var params = {
    "channelName": "mobile",
    "platform": name
    };
    var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
    billPayMod.presentationController.getNPSBillerDetails(params);

    } catch (err) {
    kony.print("broswerSet" + err);
    }
    }, 
    };
    });