define({ 
init: function(){
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
	this.view.onNavigate = this.onNavigate;
  this.view.preShow = this.preShow;
  this.view.postShow = this.postShow;
},
  preShow: function(){
    var navManager = applicationManager.getNavigationManager();
    var WIP = navManager.getCustomInfo("work");
     //WIP ===1?this.view.customHeader.lblLocateUs.text ="Request Fixed Deposit": WIP ===2?this.view.customHeader.lblLocateUs.text="Cross Border Consent" :this.view.customHeader.lblLocateUs.text= "Other Bank Transfer" 
      WIP ===1?this.view.customHeader.lblLocateUs.text =kony.i18n.getLocalizedString("i18n.HBL.RequestFixedDeposit"): WIP ===2?this.view.customHeader.lblLocateUs.text=kony.i18n.getLocalizedString("i18n.HBL.CBC.CrossBorderConsentPayment") :this.view.customHeader.lblLocateUs.text= kony.i18n.getLocalizedString("i18n.HBL.OtherBankTransfer") 
  },
   onNavigate: function(uidata){
if(uidata){}
},
postShow: function(){
  this.view.customHeader.flxBack.onClick = this.backNavigation;
},

backNavigation: function(){
  var navManager = applicationManager.getNavigationManager();
  navManager.goBack();
},

 });