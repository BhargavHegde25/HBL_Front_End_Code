define({
	init : function(){
		var navManager = applicationManager.getNavigationManager();
		var currentForm=navManager.getCurrentForm();
		applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
	},
    frmPreshow : function(){
      if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
        this.view.flxHeader.isVisible = false;
        this.view.flxFooter.isVisible = false;
      }else{
        this.view.flxHeader.isVisible = true;
        this.view.flxFooter.isVisible = false;
        this.view.customHeader.flxSearch.setVisibility(false);
      }
       if(kony.i18n.getCurrentLocale() === "ar_AE"){
          this.view.customHeader.imgBack.src = "chevronwhiteright.png";
      }else{ 
          this.view.customHeader.imgBack.src = "backbutton.png";
      }
      this.initActions();
      //this.setAccountsSegmentData();
      this.setSegDefaultAcct();
      var navManager = applicationManager.getNavigationManager();
      var currentForm = navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().logFormName(currentForm);
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    },
    initActions: function () {
        this.view.segSelectAccounts.onRowClick=this.segDefaultAccountOnClick;
        this.view.customHeader.flxBack.onClick = this.flxBackOnclick;
    },
  flxBackOnclick: function () {
          var navManager = applicationManager.getNavigationManager();
          var navigation = applicationManager.getNavigationManager().getCustomInfo("navigation");
          if(!kony.sdk.isNullOrUndefined(navigation)){
    applicationManager.getNavigationManager().setCustomInfo("navigation",null);
         applicationManager.getPresentationUtility().showLoadingScreen();
            var configurationManager = applicationManager.getConfigurationManager();
            const isAccUIModulePresent = configurationManager.isMicroAppPresent('HomepageMA');
            if (isAccUIModulePresent) {
                var accMode = kony.mvc.MDAApplication.getSharedInstance().moduleManager.getModule({
                    appName: "HomepageMA",
                    moduleName: "AccountsUIModule"
                });
                accMode.presentationController.dashboardService();
                }
          }   
          else{   
          navManager.navigateTo({"friendlyName": "SettingsUIModule/frmSettings","appName": "ManageProfileMA"});
          }
    },
    noEligibleAccounts : function () {
      this.showErrorPopup();
    },
    showErrorPopup : function () {
      kony.ui.Alert({
        "alertType": constants.ALERT_TYPE_INFO,
        "alertTitle": "",
        "message": kony.i18n.getLocalizedString("i18n.Accounts.NoEligibleAccounts"),
        "alertHandler": this.alertCallback,
        "yesLabel": kony.i18n.getLocalizedString("i18n.savingsPot.ok"),
      }, {});
    },
    alertCallback: function () {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    },
	setSegDefaultAcct : function(){
		var self=this;
        var navManager = applicationManager.getNavigationManager();
		var configManager = applicationManager.getConfigurationManager();
        var data=navManager.getCustomInfo("frmSetDefaultAccount");
       if (kony.i18n.getCurrentLocale() === "ar_AE"){
         data.map(e => e.imgArrow = "chevron_reverse.png");
        }
        if((data.popUpMsg!==null)&&(data.popUpMsg!=="")&&(data.popUpMsg !== undefined))
       {
         var scopeObj=this;
         applicationManager.getDataProcessorUtility().showToastMessageSuccess(scopeObj,data.popUpMsg);
      }
      data.popUpMsg="";
        this.view.segSelectAccounts.widgetDataMap={
          "lblTitle":"lblTitle",
          "lblValue":"lblValue",
          "imgArrow":"imgArrow",
          "lblAccId":"lblAccId"
        };
        /*
        if (configManager.isFastTransfersFlowEnabled()) {
            data = data.filter(function(obj) {
                return (obj.lblTitle === kony.i18n.getLocalizedString("i18n.TransfersEur.Tabs.Transfers") || obj.lblTitle === kony.i18n.getLocalizedString("i18n.P2P.PayPersonP2P")) ? false : true;
            });
        }
        */ 
       //isFastTransfersFlowEnabled condition is not required for hbl
       for(i=0;i<data.length;i++){
        if(data[i].lblTitle=="Loan Payment"){
            data.splice(i, 1);
        }
       }
	   if(configManager.checkUserFeature("VIEW_ONLY_ROLE")){
		  data=self.getViewonlyData(data); 
	   }
        this.view.segSelectAccounts.setData(data);
    },
  	segDefaultAccountOnClick :function(){
        applicationManager.getPresentationUtility().showLoadingScreen();
        var navManager = applicationManager.getNavigationManager();
		var selectedAcntRow = this.view.segSelectAccounts.selectedIndex[1];
		var settingsMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageArrangementsUIModule");
		var selectedRecord = this.view.segSelectAccounts.data[selectedAcntRow];
		var data = [];
		data[0]=selectedRecord;
		navManager.setCustomInfo("frmPreferencesDefaultAccount",data);
		settingsMode.presentationController.setDataDefaultAccLogin(selectedAcntRow);
  },
  getViewonlyData:function(data){
	  var filterdData=[];
	  for(i=0;i<data.length;i++){
		  if(data[i].lblTitle=="Dashboard"){
			   filterdData.push(data[i]);
			   break;
		  }
	  }
	  if(filterdData.length!=0){
		  return filterdData;
	  }
	  else{
		  filterdData=[{}];
		  return data;
	  }
  }
});