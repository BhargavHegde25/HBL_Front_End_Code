    define(function(){ 
    return{
    deleteMerchantPayload:{},
    urlWeb: "",
    responseView:"",
    init: function(){
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
    this.view.preShow = this.preShow;
    //this.view.postShow = this.postShow;
    },
    preShow: function(){
    try{
    var scope= this;
    var navManager = applicationManager.getNavigationManager();
    var uidata = applicationManager.getNavigationManager().getCustomInfo("BillPayCategories");
    if(uidata.categories){
    var filterBill = uidata.categories.filter(filterBill => filterBill.isActive =="true")
    if(filterBill.length!= 0){
    this.view.flxNoData.isVisible = false;
    this.view.flxDynamic.isVisible =true;
    var subCategories = filterBill;
    if(!(subCategories === ""|| null || undefined)){
    var selectedLabel= navManager.getCustomInfo("selectedLabel");
    this.view.customHeader.lblLocateUs.text =selectedLabel;
    var subCategoryData = subCategories;
    this.noRowFlex(subCategoryData);
    } 
    }else{
    this.view.flxDynamic.isVisible =false;
    this.view.flxNoData.isVisible = true;
    }
    }
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var presenter = applicationManager.getModulesPresentationController({
    'appName': 'BillPayMA',
    'moduleName': 'BillPaymentUIModule'
    });
    //presenter.getFavMerchantsMB();
    if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
    this.view.flxHeader.isVisible = false;
    this.view.flxScrollNew.top ="5dp";
    }
    else{
    this.view.flxHeader.isVisible = true;
    this.view.flxScrollNew.top ="50dp";
    }
    // var configManager = applicationManager.getConfigurationManager();
    // var MenuHandler =  applicationManager.getMenuHandler();
    // MenuHandler.setUpHamburgerForForm(scope,configManager.constants.MENUBILLPAY);
    this.view.customHeader.flxBack.onClick = function() {
    scope.onCancelClick();
    };
    this.view.tbxSearch.text ="";
    this.view.flxClose.onClick = function(){
    scope.clearSearchText();
    };
    this.view.tbxSearch.onTextChange = function(){
    scope.setSearchCategory();
    };
    this.view.customHeader.btnRight.onClick= function(){
    scope.onCancelClick();
    };
    this.view.btnFavourite.onClick =this.manageFavourite.bind(this);
    this.view.btnFavouriteCancel.onClick = this.showFavHomeScreen.bind(this);
    this.view.flxFavMerchants1.onClick=this.storeMerchantSelected1toDelete;
    this.view.flxFavMerchants2.onClick=this.storeMerchantSelected2toDelete;
    this.view.flxFavMerchants3.onClick=this.storeMerchantSelected3toDelete;
    this.view.flxFavMerchants4.onClick=this.storeMerchantSelected4toDelete;
    this.view.flxFavMerchants5.onClick=this.storeMerchantSelected5toDelete;

    //alert("naviugate success");
    /*  var subCategories = navManager.getCustomInfo("BillPaySubCategories");
    if(!(subCategories === ""|| null || undefined)){
    scope.view.customHeader.lblLocateUs.text = subCategories[0].category;
    var subCategoryData = subCategories;
    this.noRowFlex(subCategoryData);
    // this.dynamicFlex(this.view.flxDynamic,"flxSubCateory",flxItem);
    }*/
    }catch(err){
    kony.print("preShow"+ err);
    }
    },
    setSearchCategory: function(){
    try{
    var navManager = applicationManager.getNavigationManager();
    var categories = navManager.getCustomInfo("BillPayCategories");
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
    onNavigate: function(uidata){
    try{
    var navManager = applicationManager.getNavigationManager();
    /*if(uidata.FavMerchantData){
    this.setFavoritesData(uidata.FavMerchantData)
    } if (uidata.deleteFavoriteMerchantSuccess) {
    this.deleteFavoriteMerchantSuccess(uidata.deleteFavoriteMerchantSuccess);}*/
    if(uidata.loadCategoriesSuccess){
    var subcategory =uidata.merchantBasicInfo.categories[0];
    this.categoryOnclick(subcategory);
    }if(uidata.serverError){
    this.toastMsg(uidata.serverError);
    }if(uidata.MerchantPayment){
    this.onContiuneFlow();
    }if(uidata.categories){
    applicationManager.getNavigationManager().setCustomInfo("isRepeatPaymentFlow", false);
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
    clearSearchText: function(){
    var navManager = applicationManager.getNavigationManager();
    var categories = navManager.getCustomInfo("BillPayCategories");
    this.view.tbxSearch.text ="";
    var subCategoryData =categories.categories;
    this.noRowFlex(subCategoryData);
    },
    onCancelClick: function(){
    applicationManager.setBillPayFlow ="onCancel";
    var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
    billPayMod.presentationController.onCancelClick();
    },
    toastMsg: function(data){
    if(data.errorMessage){
    applicationManager.getDataProcessorUtility().showToastMessageError(this, kony.i18n.getLocalizedString("kony.appleWatch.serverError"));
    }
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
     this.view.lblCategoryHeading.text= subCategoryData[0].subcategoryof;
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
    var flxHeightCal =this.view.flxDynamic.widgets().length;
    flxHeightCal =flxHeightCal*120;
    flxHeightCal =flxHeightCal+20;
    var flxHeight= flxHeightCal.toString();
    this.view.flxDynamic.height =flxHeight+"dp";
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
  
    //this.dynamicFlex(this.view.flxDynamic,"flxSubCateory",rowDetails);
     }catch(err){
            kony.print("noRowFlex"+ err);
        }
    },
    dynamicParentFlex: function(parentflx,flxname,noofFlex,onClick){
        try{
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
    for(var i=0;i<noofFles;i++){
    var flxname = flexName+i;
    var flexContainer = new kony.ui.FlexContainer({
        "id": flxname,
        "top": "0dp",
        "left": "4%", 
        //  "top": this.getTopValue(flxParent,i),
        //"left": this.getleftValue(flxParent,i),
       // "width": "33%",
       "width": "100dp",
        //"height": "100%",
        "height": "75dp",
        "zIndex": 10,
        "isVisible": true,
        "skin":"slFSBox",
        "clipBounds": false,
        "skin":"slFbox",
        "layoutType": kony.flex.FLOW_VERTICAL,
       // "skin":"sknflx424242op50",
        "onClick":onClick,
    });
    //  flexContainer.skin="sknflx";
    flxParent.add(flexContainer);
    }
     }catch(err){
            kony.print("dynamicFlex"+ err);
        }
    },
    
    categoryOnclick: function(subCatergoryData){
    try{
    applicationManager.getPresentationUtility().showLoadingScreen();
    applicationManager.getNavigationManager().setCustomInfo("billPayscreen","frmBillPayDynamic");
    applicationManager.getNavigationManager().setCustomInfo("Biller_Code",subCatergoryData);
    applicationManager.getNavigationManager().setCustomInfo("PaymentAggregatorType", subCatergoryData.paymentAggregator);
    var navManager = applicationManager.getNavigationManager();
    var data = {
    "code":subCatergoryData.code,
    "merchantType": subCatergoryData.merchantType
    };
    if (subCatergoryData.category == "APP") {
    params = {
        "merchantCode": subCatergoryData.code
    };
    var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
    billPayMod.presentationController.getMerchantPaymentChargesMB(params,"frmBillPayDynamic");
            if(subCatergoryData.merchantType === "Automatic"){
                navManager.setCustomInfo("backSubCategory",data);
                navManager.setCustomInfo("previousForm", "frmBillPayDashboardNew");
    var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
   // billPayMod.presentationController.getCategories(data);
     billPayMod.presentationController.getMerchantPaymentChargesMB(params, "frmBillPaySubCategory");
        }
        else{
            var data = {
        "appCode":subCatergoryData.code,
        "merchantType": subCatergoryData.merchantType
        };
        var merchantField ={
            "labelText":subCatergoryData.labelText,
            "logoUrl":subCatergoryData.logoUrl
        };
        navManager.setCustomInfo("merchantField",merchantField);
        navManager.setCustomInfo("previousForm", "frmBillPayDashboardNew");
    var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
    billPayMod.presentationController.getmerchantfield(data);
        } 
        }else{
             navManager.setCustomInfo("backSubCategory",data);
             navManager.setCustomInfo("previousForm", "frmBillPayDashboardNew");
        var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
    billPayMod.presentationController.getCategories(data);
    }
     }catch(err){
            kony.print("categoryOnclick"+ err);
        } 
    },

    dynamicImageSet: function(flxParent,imgURL,imgID){
        try{
      if(flxParent,imgURL,imgID){
        var imgDynamic = new kony.ui.Image2 ({
          "id": imgID,
          "isVisible": true,
          "src": imgURL,
          "top":"10dp",
          "width":"45dp",
          "height":"45dp",
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
          //"skin": "sknLbl115000000",
          "skin": "sknLblHeadingsemiBold31px",
          "text": labeltxt,
          "isVisible": true,
          "top":"20dp",
          "width":"90%",
          "contentAlignment":constants.CONTENT_ALIGN_CENTER,
          "centerX":"52%",
          "height":kony.flex.USE_PREFERED_SIZE,
        }); 
        flxParent.add(lableDynamic);

      }
       }catch(err){
            kony.print("dynamicLabelSet"+ err);
        }
    }, 
    setFavoritesData: function(res){
      this.view.btnFavouriteCancel.setVisibility(false);
      this.view.btnFavourite.setVisibility(true);
      this.view.imgDelete1.setVisibility(false);
      this.view.imgDelete2.setVisibility(false);
      this.view.imgDelete3.setVisibility(false);
      this.view.imgDelete4.setVisibility(false);
      this.view.imgDelete5.setVisibility(false);
      if (res.favoriteMerchants.length == 0) {
        this.view.flxAddFavourites.setVisibility(false);
        this.view.flxFavourites.setVisibility(true);
         applicationManager.getPresentationUtility().dismissLoadingScreen();
      }else{
        this.view.flxAddFavourites.setVisibility(true);
        this.view.flxFavourites.setVisibility(false);
        for (i = 0; i < res.favoriteMerchants.length; i++) {
          var payeeId = res.favoriteMerchants[i].payeeId;
          var logoUrl = res.favoriteMerchants[i].logoUrl;
          var merchantName = res.favoriteMerchants[i].merchantName;
          var merchantCode = res.favoriteMerchants[i].merchantCode;
          if (i == 0) {
            //this.view.flxFavMerchants1.onHover = this.onHoverNoEventCallback;
            this.view.flxFavMerchants1.setVisibility(true);
            this.view.flxBorderForImage1.skin="sknflx424242op50";
            this.view.imgFavMerchant1.src = logoUrl;
            this.view.lblFavMerchantName1.text = merchantName;
            this.view.lblFavMerchantName1.info = {
                "payeeId": payeeId,
                "billercode": merchantCode
            };
        }
        if (i == 1) {
           // this.view.flxFavMerchants2.onHover = this.onHoverNoEventCallback;
            this.view.flxFavMerchants2.setVisibility(true);
            this.view.flxBorderForImage2.skin="sknflx424242op50";
            this.view.imgFavMerchant2.src = logoUrl;
            this.view.lblFavMerchantName2.text = merchantName;
            this.view.lblFavMerchantName2.info = {
                "payeeId": payeeId,
                "billercode": merchantCode
            };
        }
        if (i == 2) {
            //this.view.flxFavMerchants3.onHover = this.onHoverNoEventCallback;
            this.view.flxFavMerchants3.setVisibility(true);
            this.view.flxBorderForImage3.skin="sknflx424242op50";
            this.view.imgFavMerchant3.src = logoUrl;
            this.view.lblFavMerchantName3.text = merchantName;
            this.view.lblFavMerchantName3.info = {
                "payeeId": payeeId,
                "billercode": merchantCode
            };
        }
        if (i == 3) {
          //  this.view.flxFavMerchants4.onHover = this.onHoverNoEventCallback;
            this.view.flxFavMerchants4.setVisibility(true);
            this.view.flxBorderForImage4.skin="sknflx424242op50";
            this.view.imgFavMerchant4.src = logoUrl;
            this.view.lblFavMerchantName4.text = merchantName;
            this.view.lblFavMerchantName4.info = {
                "payeeId": payeeId,
                "billercode": merchantCode
            };
        }
        if (i == 4) {
           // this.view.flxFavMerchants5.onHover = this.onHoverNoEventCallback;
            this.view.flxFavMerchants5.setVisibility(true);
            this.view.flxBorderForImage5.skin="sknflx424242op50";
            this.view.imgFavMerchant5.src = logoUrl;
            this.view.lblFavMerchantName5.text = merchantName;
            this.view.lblFavMerchantName5.info = {
                "payeeId": payeeId,
                "billercode": merchantCode
            };
        }
    }
     applicationManager.getPresentationUtility().dismissLoadingScreen();
}
var favMerchantCount = res.favoriteMerchants.length;
for (i = favMerchantCount + 1; i < 6; i++) {
    if (i == 1) {
        this.view.flxFavMerchants1.setVisibility(true);
        this.view.flxBorderForImage1.skin="sknflx424242op50";
        this.view.imgFavMerchant1.src = "plus_add.png";
        this.view.lblFavMerchantName1.text = "";
        break;
    }
    if (i == 2) {
       // this.view.flxFavMerchants2.onHover = this.onHoverEventCallback2;
        this.view.flxBorderForImage2.skin="sknflx424242op50";
        this.view.flxFavMerchants2.setVisibility(true);
        this.view.imgFavMerchant2.src = "plus_add.png";
        this.view.lblFavMerchantName2.text = "";
        break;
    }
    if (i == 3) {
       // this.view.flxFavMerchants3.onHover = this.onHoverEventCallback3;
        this.view.flxBorderForImage3.skin="sknflx424242op50";
        this.view.flxFavMerchants3.setVisibility(true);
        this.view.imgFavMerchant3.src = "plus_add.png";
        this.view.lblFavMerchantName3.text = "";
        break;
    }
    if (i == 4) {
      //  this.view.flxFavMerchants4.onHover = this.onHoverEventCallback4;
        this.view.flxBorderForImage4.skin="sknflx424242op50";
        this.view.flxFavMerchants4.setVisibility(true);
        this.view.imgFavMerchant4.src = "plus_add.png";
        this.view.lblFavMerchantName4.text = "";
        break;
    }
    if (i == 5) {
       // this.view.flxFavMerchants5.onHover = this.onHoverEventCallback5;
        this.view.flxBorderForImage5.skin="sknflx424242op50";
        this.view.flxFavMerchants5.setVisibility(true);
        this.view.imgFavMerchant5.src = "plus_add.png";
        this.view.lblFavMerchantName5.text = "";
        break;
    }
}
        
      },
manageFavourite: function(){
  var res= applicationManager.getNavigationManager().getCustomInfo("favMerchantsList");
        this.view.flxFavMerchants1.setVisibility(false);
        this.view.flxFavMerchants2.setVisibility(false);
        this.view.flxFavMerchants3.setVisibility(false);
        this.view.flxFavMerchants4.setVisibility(false);
        this.view.flxFavMerchants5.setVisibility(false);
        for (i = 0; i < res.favoriteMerchants.length; i++) {
          var payeeId = res.favoriteMerchants[i].payeeId;
          var logoUrl = res.favoriteMerchants[i].logoUrl;
          var merchantName = res.favoriteMerchants[i].merchantName;
          if (i == 0) {
              this.view.flxFavMerchants1.setVisibility(true);
              this.view.imgDelete1.setVisibility(true);
              this.view.imgFavMerchant1.src = logoUrl;
              this.view.lblFavMerchantName1.text = merchantName;
              this.view.lblFavMerchantName1.info = {"payeeId":payeeId};
          }
          if (i == 1) {
              this.view.flxFavMerchants2.setVisibility(true);
              this.view.imgDelete2.setVisibility(true);
              this.view.imgFavMerchant2.src = logoUrl;
              this.view.lblFavMerchantName2.text = merchantName;
              this.view.lblFavMerchantName2.info = {"payeeId":payeeId};
          }
          if (i == 2) {
              this.view.flxFavMerchants3.setVisibility(true);
              this.view.imgDelete3.setVisibility(true);
              this.view.imgFavMerchant3.src = logoUrl;
              this.view.lblFavMerchantName3.text = merchantName;
              this.view.lblFavMerchantName3.info = {"payeeId":payeeId};
          }
          if (i == 3) {
              this.view.flxFavMerchants4.setVisibility(true);
              this.view.imgDelete4.setVisibility(true);
              this.view.imgFavMerchant4.src = logoUrl;
              this.view.lblFavMerchantName4.text = merchantName;
              this.view.lblFavMerchantName4.info = {"payeeId":payeeId};
          }
          if (i == 4) {
              this.view.flxFavMerchants5.setVisibility(true);
              this.view.imgDelete5.setVisibility(true);
              this.view.imgFavMerchant5.src = logoUrl;
              this.view.lblFavMerchantName5.text = merchantName;
              this.view.lblFavMerchantName5.info = {"payeeId":payeeId};
          }
      }
      this.view.btnFavourite.setVisibility(false);
      this.view.btnFavouriteCancel.setVisibility(true);
},
alertPopUp: function(){
  var scope =this;  
  var basicProperties = {
    "message": kony.i18n.getLocalizedString("i18n.BillPay,deleteFavourite"),
    "alertType": constants.ALERT_TYPE_CONFIRMATION,
    "alertTitle": "",
    "yesLabel": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.Yes"),
    "noLabel": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.AlertNo"),
    "alertIcon": "",
    "alertHandler": function(response) {
        if (response) {
            scope.deleteFavMerchantCall();
        }
    }
};
applicationManager.getPresentationUtility().showAlertMessage(basicProperties, {});
},
storeMerchantSelected1toDelete: function(){
  if(this.view.btnFavouriteCancel.isVisible){
    var payeeId = this.view.lblFavMerchantName1.info.payeeId;
    this.deleteMerchantPayload = {
        "payeeId": payeeId
    }
    this.alertPopUp();
    //this.view.flxAddFavSuccessMain.setVisibility(true);
} else if(this.view.imgFavMerchant1.src == "plus_add.png"){
  applicationManager.getDataProcessorUtility().showToastMessageInfo(this, kony.i18n.getLocalizedString("i18n.AddFavMsg"));
}else{
  var presenter = applicationManager.getModulesPresentationController({
      'appName': 'BillPayMA',
      'moduleName': 'BillPaymentUIModule'
  });
  params = {
      "code": this.view.lblFavMerchantName1.info.billercode
  }
  presenter.getCategoriesByMerchantMB(params);
}
},
storeMerchantSelected2toDelete:function(){
  if(this.view.btnFavouriteCancel.isVisible){
  var payeeId=this.view.lblFavMerchantName2.info.payeeId;
  this.deleteMerchantPayload={
      "payeeId":payeeId
  }
  this.alertPopUp();
  //this.view.flxAddFavSuccessMain.setVisibility(true);
}
else if(this.view.imgFavMerchant2.src == "plus_add.png"){
  applicationManager.getDataProcessorUtility().showToastMessageInfo(this, kony.i18n.getLocalizedString("i18n.AddFavMsg"));
}
else{
  var presenter = applicationManager.getModulesPresentationController({
      'appName': 'BillPayMA',
      'moduleName': 'BillPaymentUIModule'
  });
  params = {
      "code": this.view.lblFavMerchantName2.info.billercode
  }
  presenter.getCategoriesByMerchantMB(params);
}
},
storeMerchantSelected3toDelete:function(){
  if(this.view.btnFavouriteCancel.isVisible){
  var payeeId=this.view.lblFavMerchantName3.info.payeeId;
  this.deleteMerchantPayload={
      "payeeId":payeeId
  }
  this.alertPopUp();
  //this.view.flxAddFavSuccessMain.setVisibility(true);
}
else if(this.view.imgFavMerchant3.src == "plus_add.png"){
  applicationManager.getDataProcessorUtility().showToastMessageInfo(this, kony.i18n.getLocalizedString("i18n.AddFavMsg"));
}
  else{
      var presenter = applicationManager.getModulesPresentationController({
          'appName': 'BillPayMA',
          'moduleName': 'BillPaymentUIModule'
      });
      params = {
          "code": this.view.lblFavMerchantName3.info.billercode
      }
      presenter.getCategoriesByMerchantMB(params);
  }
},
storeMerchantSelected4toDelete:function(){
  if(this.view.btnFavouriteCancel.isVisible){
  var payeeId=this.view.lblFavMerchantName4.info.payeeId;
  this.deleteMerchantPayload={
      "payeeId":payeeId
  }
  this.alertPopUp();
}
else if(this.view.imgFavMerchant4.src == "plus_add.png"){
  applicationManager.getDataProcessorUtility().showToastMessageInfo(this, kony.i18n.getLocalizedString("i18n.AddFavMsg"));
}
  else{
      var presenter = applicationManager.getModulesPresentationController({
          'appName': 'BillPayMA',
          'moduleName': 'BillPaymentUIModule'
      });
      params = {
          "code": this.view.lblFavMerchantName4.info.billercode
      }
      presenter.getCategoriesByMerchantMB(params);
  }
},
storeMerchantSelected5toDelete:function(){
  if(this.view.btnFavouriteCancel.isVisible){
  var payeeId=this.view.lblFavMerchantName5.info.payeeId;
  this.deleteMerchantPayload={
      "payeeId":payeeId
  }
  this.alertPopUp();
}
else if(this.view.imgFavMerchant5.src == "plus_add.png"){
  applicationManager.getDataProcessorUtility().showToastMessageInfo(this, kony.i18n.getLocalizedString("i18n.AddFavMsg"));
}
  else{
      var presenter = applicationManager.getModulesPresentationController({
          'appName': 'BillPayMA',
          'moduleName': 'BillPaymentUIModule'
      });
      params = {
          "code": this.view.lblFavMerchantName5.info.billercode
      }
      presenter.getCategoriesByMerchantMB(params);
  }
},
deleteFavMerchantCall:function(){
   applicationManager.getPresentationUtility().showLoadingScreen();
  var deletePayload = this.deleteMerchantPayload;
  var presenter = applicationManager.getModulesPresentationController({
      'appName': 'BillPayMA',
      'moduleName': 'BillPaymentUIModule'
  });
  presenter.deleteFavMerchantMB(deletePayload);
},
deleteFavoriteMerchantSuccess: function(){
applicationManager.getDataProcessorUtility().showToastMessageSuccess(this, kony.i18n.getLocalizedString("i18n.BillPay.deleteFavouriteSucess"));
  var presenter = applicationManager.getModulesPresentationController({
    'appName': 'BillPayMA',
    'moduleName': 'BillPaymentUIModule'
    });
    presenter.getFavMerchantsMB();
    },
    showFavHomeScreen: function() {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var presenter = applicationManager.getModulesPresentationController({
    'appName': 'BillPayMA',
    'moduleName': 'BillPaymentUIModule'
    });
    presenter.getFavMerchantsMB();
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