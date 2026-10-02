define(['CampaignUtility', 'CommonUtilities','FooterMenuUtility'], function(CampaignUtility, CommonUtilities,FooterMenuUtility) {
  return{
    count : "",
    deleteMerchantPayload:{},
    init: function(){
      var navManager = applicationManager.getNavigationManager();
      var currentForm=navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
      var configManager = applicationManager.getConfigurationManager();
      var MenuHandler = applicationManager.getMenuHandler();
       MenuHandler.setUpHamburgerForForm(this, configManager.constants.MENUACCOUNTS);
      this.view.preShow = this.preShow;
      this.view.postShow = this.postShow;
    },
    preShow: function(){
      try{
        var scope= this;
		 var uiData= applicationManager.getNavigationManager().getCustomInfo("BillPayAllCategories");
		 if(!kony.sdk.isNullOrUndefined(uiData)){
			 applicationManager.getNavigationManager().setCustomInfo("searchCategory",uiData.categories);
	    var segData = uiData.categories;
        this.setSegmentData(segData);
        var presenter = applicationManager.getModulesPresentationController({
            'appName': 'BillPayMA',
            'moduleName': 'BillPaymentUIModule'
        });
        if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
      this.view.flxHeader.isVisible = false;
      //this.view.flxSearch.top ="10dp"
      this.view.flxScrollBody.top ="10dp";
       this.view.flxScrollBody.bottom ="55dp";
      this.view.flxFooter.setVisibility(true);
      //this.view.flxFooter.bottom ="-1%";
    }
     else{
        scope.footerMenuUtility.setFooterMenuItems(this, "flxPrimary500");
        this.view.flxFooter.setVisibility(false);
        this.view.flxHeader.isVisible = true;
         this.view.flxScrollBody.top ="60dp";
         this.view.flxScrollBody.bottom ="0dp";
     }
	}
      
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        var navManager = applicationManager.getNavigationManager();
        // var configManager = applicationManager.getConfigurationManager();
        //  var MenuHandler =  applicationManager.getMenuHandler();
        //MenuHandler.setUpHamburgerForForm(scope,configManager.constants.MENUBILLPAY);
        this.view.customHeader.flxBack.onClick = function() {
         scope.onCancelClick();
        };
        this.view.tbxSearch.text ="";
        this.view.customHeader.btnRight.onClick= function(){
            scope.onCancelClick();
        };
        this.view.flxClose.onClick = function(){
            scope.clearSearchText();
        };
          var userObj = applicationManager.getUserPreferencesManager();
            var accountObj = applicationManager.getAccountManager();
        var acctId = userObj.getDefaultAccountforBillPay();
            var billPayDefaultAcc  = accountObj.getInternalAccountByID(acctId);
        var dashDefault =applicationManager.getDefaultDashboardObj().Accounts[0];
        if(billPayDefaultAcc!=null){
         // var presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('BillPaymentUIModule');
          presenter.selectedAccount =billPayDefaultAcc.accountName+"........."+billPayDefaultAcc.account_id;
          presenter.selectedAccountBalance =billPayDefaultAcc.availableBalance;
           presenter.selectedAccountID =billPayDefaultAcc.account_id;
          presenter.selectedAccountName= billPayDefaultAcc.accountName;
          presenter.selectedAccountAvailableBalance=billPayDefaultAcc.availableBalance;
          presenter.selectedAccountCurrencyCode= billPayDefaultAcc.currencyCode;
          presenter.selectedAccounted =billPayDefaultAcc;
        }else{
          presenter.selectedAccount =dashDefault.accountName+"........."+dashDefault.account_id;
          presenter.selectedAccountBalance =dashDefault.availableBalance;
          presenter.selectedAccountID =dashDefault.account_id;
          presenter.selectedAccountName= dashDefault.accountName;
          presenter.selectedAccountAvailableBalance=dashDefault.availableBalance;
           presenter.selectedAccountCurrencyCode= dashDefault.currencyCode;
           presenter.selectedAccounted =dashDefault;
        }
        this.view.tbxSearch.onTextChange = this.setSearchCategory.bind(this);
    this.view.btnFavourite.onClick =this.manageFavourite.bind(this);
    this.view.btnFavouriteCancel.onClick = this.showFavHomeScreen.bind(this);
this.view.flxFavMerchants1.onClick=this.storeMerchantSelected1toDelete;
    this.view.flxFavMerchants2.onClick=this.storeMerchantSelected2toDelete;
    this.view.flxFavMerchants3.onClick=this.storeMerchantSelected3toDelete;
    this.view.flxFavMerchants4.onClick=this.storeMerchantSelected4toDelete;
    this.view.flxFavMerchants5.onClick=this.storeMerchantSelected5toDelete;
        // scope.getAllcategories();
        // scope.setSegmentData();
      }catch(err){
        kony.print("preShow"+ err);
      }  
    },
    postShow: function(){
        try{
      this.view.segBillPay.onRowClick = this.segBillPayRowclick.bind(this);
        }catch(err){
            kony.print("postShow"+ err);
        }
    },
    onNavigate: function(uidata){
        try{
    if(uidata.FavMerchantData){
      this.setFavoritesData(uidata.FavMerchantData)
    } if (uidata.deleteFavoriteMerchantSuccess) {
    this.deleteFavoriteMerchantSuccess(uidata.deleteFavoriteMerchantSuccess);
  }if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
        var footerMenuUtility = require("FooterMenuUtility");
            if(this.count === ""){
        this.footerMenuUtility =
        footerMenuUtility.getFooterMenuUtilityInstance();
              this.count = 1;
            }else {
              this.footerMenuUtility =
        footerMenuUtility.footerInstanceWhenlanguageChange();
            }
        var cm = applicationManager.getConfigurationManager();
        this.footerMenuUtility.entitlements = {
        features: cm.getUserFeatures(),
        permissions: cm.getUserPermissions(),
        };
        this.footerMenuUtility.scope = this;
      }
  /*if(uidata.categories){
        applicationManager.getNavigationManager().setCustomInfo("searchCategory",uidata.categories);
        var segData = uidata.categories;
        this.setSegmentData(segData);
      }*/
       }catch(err){
            kony.print("onNavigate"+ err);
        }
    },
    onBackClick:function(){},
    setSegmentData: function(segData){
      try{
       var os ="";
       if(applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone"){
        os ="iPhone";
       }else{
        os= "Android";
       }
        this.view.segBillPay.widgetDataMap ={
          "lblBillPay":"lblBillPay",
          "imgArrow":"imgArrow",
          "imgIcon":"imgIcon",
          "flxLabel":"flxLabel",
          "flxIcon":"flxIcon",
          "flxMain":"flxMain",
          "flxBillPay":"flxBillPay"
        };
        var data =[];
        for(var i=0;i<segData.length;i++){
          var logoUrl = segData[i].logoUrl;
          if (logoUrl == undefined || logoUrl == null || logoUrl == "null") {
            /*if (segData[i].code == "Utilities"){
              if(os="Android"){
                logoUrl ="utilities_payment_white.png"
              }else{
                logoUrl ="utilities_payment_white.png"
              }
             }*/
           if (segData[i].code == "Utilities") logoUrl = "utilities_payment_white.png"
            if (segData[i].code == "CorporatePayment") logoUrl = "corporate_payment_white.png";
            if (segData[i].code == "Creditor") logoUrl = "creditors_payment_white.png";
            if (segData[i].code == "FinancialInstitution") logoUrl = "financial_institution.png";
            if (segData[i].code == "Government") logoUrl = "gon_payment_white.png";
            if (segData[i].code == "TRANSACTION_HISTORY") logoUrl = "transactionhistory_white.png";
            if (segData[i].code == "FundTransfer") logoUrl = "fund_transfer_white.png";
            if (segData[i].code == "Insurance") logoUrl = "insurance_white.png";
            if (segData[i].code == "Others") logoUrl = "others_white.png";
            if (segData[i].code == "Wallet") logoUrl = "wallets_white.png";
        }
          data.push({

            "lblBillPay":{
              "text": segData[i].labelText,
              "skin":"sknLbl115000000"
            },
            "imgArrow": {"src":"hblinfopage.png"},
            "imgIcon":{"src":logoUrl},
            "flxSeprator":{
              "skin":"sknFlx851A1CBG",
              "isVisible":true
            }
          });
        }
        this.view.segBillPay.setData(data);
      }catch(err){
        alert("err"+err);
      }
    },
    setSearchCategory: function(){
       var categories = applicationManager.getNavigationManager().getCustomInfo("searchCategory"); 
        var searchTerm = this.view.tbxSearch.text;
        if(searchTerm.length>= 3){
        var results = [];
        var lowercaseSearchTerm = searchTerm.toLowerCase().trim();
        for (var i = 0; i < categories.length; i++) {
          var category = categories[i];
          var lowercaseLabelText = category.labelText.toLowerCase();
          if (lowercaseLabelText.includes(lowercaseSearchTerm)) {
            results.push(category);
          }
        }
        this.setSegmentData(results);
      }else{
        if(searchTerm.length==0){
          var subCategoryData =categories;
          this.setSegmentData(subCategoryData);
        }
      } 
    },
    clearSearchText: function(){
        var categories = applicationManager.getNavigationManager().getCustomInfo("searchCategory"); 
        this.view.tbxSearch.text ="";
         var subCategoryData =categories;
          this.setSegmentData(subCategoryData);
    },
    /* getAllcategories: function(){
        var data = {"code":"ALL"};
        var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
        billPayMod.presentationController.getCategories(data);
    },*/
    onCancelClick: function(){
        applicationManager.setBillPayFlow ="onCancel";
         applicationManager.getPresentationUtility().showLoadingScreen();
            var configurationManager = applicationManager.getConfigurationManager();
            const isAccUIModulePresent = configurationManager.isMicroAppPresent('HomepageMA');
            if (isAccUIModulePresent) {
                var accMode = kony.mvc.MDAApplication.getSharedInstance().moduleManager.getModule({
                    appName: "HomepageMA",
                    moduleName: "AccountsUIModule"
                });
                accMode.presentationController.showDashboard();
                }
    },
    segBillPayRowclick: function(){
        try{
      var dynamicData= [];
      var navManager = applicationManager.getNavigationManager();
      var allData= navManager.getCustomInfo("BillPayAllCategories");
      //var getcategoryData = allData.categories.category;
      //var test = this.view.segBillPay.selectedRowItems;
      applicationManager.getPresentationUtility().showLoadingScreen();
      var rowItems = this.view.segBillPay.selectedRowItems[0].lblBillPay.text;
      navManager.setCustomInfo("selectedLabel",rowItems);
      for(var i =0 ;i<allData.categories.length;i++){
        if(rowItems===allData.categories[i].labelText){
          var categoryCode = allData.categories[i].code;
        }
      }
      if(categoryCode==="TRANSACTION_HISTORY"){
        var data = {"code":categoryCode};	
        var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
        billPayMod.presentationController.getBillHistory(data);
      }else{
       var data = {"code":categoryCode};	
      navManager.setCustomInfo("backDynamic",data);
        var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
        billPayMod.presentationController.getCategories(data);
      }
     }catch(err){
            kony.print("segBillPayRowclick"+ err);
        }
    },
    setFavoritesData: function(res){
        this.view.flxScrollBody.setVisibility(true);
    this.view.flxNoCategory.setVisibility(false);
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
        if(res.favoriteMerchants.length <3) {
            this.view.flxAddFav2.setVisibility(false);
        }else{
            this.view.flxAddFav2.setVisibility(true);
        }
        this.view.flxFavourites.setVisibility(false);
        for (i = 0; i < res.favoriteMerchants.length; i++) {
          var payeeId = res.favoriteMerchants[i].payeeId;
          var logoUrl = res.favoriteMerchants[i].logoUrl;
          var merchantName = res.favoriteMerchants[i].merchantName;
          var merchantCode = res.favoriteMerchants[i].merchantCode;
          if (i == 0) {
            //this.view.flxFavMerchants1.onHover = this.onHoverNoEventCallback;
            this.view.flxFavMerchants1.setVisibility(true);
             this.view.flxBorderForImage1.skin ="slFbox";
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
            this.view.flxBorderForImage2.skin ="slFbox";
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
            this.view.flxBorderForImage3.skin ="slFbox";
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
            this.view.flxBorderForImage4.skin ="slFbox";
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
            this.view.flxBorderForImage5.skin ="slFbox";
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
        this.view.flxBorderForImage5.skin="slFbox";
        this.view.flxFavMerchants5.setVisibility(true);
        this.view.imgFavMerchant5.src = "plus_add.png";
        this.view.lblFavMerchantName5.text = "";
        break;
    }
}
        
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
              this.view.flxBorderForImage1.skin ="sknflx424242op50";
              this.view.imgDelete1.setVisibility(true);
              this.view.imgFavMerchant1.src = logoUrl;
              this.view.lblFavMerchantName1.text = merchantName;
              this.view.lblFavMerchantName1.info = {"payeeId":payeeId};
          }
          if (i == 1) {
              this.view.flxFavMerchants2.setVisibility(true);
              this.view.flxBorderForImage2.skin ="sknflx424242op50";
              this.view.imgDelete2.setVisibility(true);
              this.view.imgFavMerchant2.src = logoUrl;
              this.view.lblFavMerchantName2.text = merchantName;
              this.view.lblFavMerchantName2.info = {"payeeId":payeeId};
          }
          if (i == 2) {
              this.view.flxFavMerchants3.setVisibility(true);
              this.view.flxBorderForImage3.skin ="sknflx424242op50";
              this.view.imgDelete3.setVisibility(true);
              this.view.imgFavMerchant3.src = logoUrl;
              this.view.lblFavMerchantName3.text = merchantName;
              this.view.lblFavMerchantName3.info = {"payeeId":payeeId};
          }
          if (i == 3) {
              this.view.flxFavMerchants4.setVisibility(true);
              this.view.flxBorderForImage4.skin ="sknflx424242op50";
              this.view.imgDelete4.setVisibility(true);
              this.view.imgFavMerchant4.src = logoUrl;
              this.view.lblFavMerchantName4.text = merchantName;
              this.view.lblFavMerchantName4.info = {"payeeId":payeeId};
          }
          if (i == 4) {
              this.view.flxFavMerchants5.setVisibility(true);
              this.view.flxBorderForImage5.skin ="sknflx424242op50";
              this.view.imgDelete5.setVisibility(true);
              this.view.imgFavMerchant5.src = logoUrl;
              this.view.lblFavMerchantName5.text = merchantName;
              this.view.lblFavMerchantName5.info = {"payeeId":payeeId};
          }
      }
      this.view.btnFavourite.setVisibility(false);
      this.view.btnFavouriteCancel.setVisibility(true);
},
showFavHomeScreen: function() {
   applicationManager.getPresentationUtility().showLoadingScreen();
  var presenter = applicationManager.getModulesPresentationController({
      'appName': 'BillPayMA',
      'moduleName': 'BillPaymentUIModule'
  });
  presenter.getFavMerchantsMB();
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
closeAllCategory: function(){
    var scope =this;
    this.view.flxScrollBody.setVisibility(false);
    this.view.flxNoCategory.setVisibility(true);
    var basicProperties = {
    "message": kony.i18n.getLocalizedString("i18n.olb.billpay.NoMerchatFound"),
    "alertType": constants.ALERT_TYPE_CONFIRMATION,
    "alertTitle": "",
    "yesLabel": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.Yes"),
    "noLabel": "",
    "alertIcon": "",
    "alertHandler": function(response) {
        if (response) {
            scope.onCancelClick();
        }
    }
};
applicationManager.getPresentationUtility().showAlertMessage(basicProperties, {});
},

  }
});