/* eslint-disable */
define([],function(){

  return {
    newprop : true,
    pastprop : true,
  onNavigate: function() {
    try{
    this.view.preShow = this.preShow;
    this.view.postShow = this.postShow;
    this.initActions();
      }catch(err) {
        this.setError(err, "onNavigate");
      }
  },
    
  postShow: function() {
    try{
    this.checkPermissions();
    }catch(err) {
        this.setError(err, "postShow");
      }
  },
  
  preShow: function() {
    try{
    this.view.flxAdditionalOptions.setVisibility(false);
    this.view.flxScroll.setVisibility(true);
    this.view.flxAck.setVisibility(false);
    this.view.customHeader.flxBack.setVisibility(true);
    this.view.imgCheckBox.src = "checkbox_normal.png";
    this.view.btnConfirm.skin = "sknBtnE2E9F0Rounded";
    var navManager = applicationManager.getNavigationManager();
    var configManager = applicationManager.getConfigurationManager();
    if(configManager.getBaseCurrency() === 'EUR'){
      this.view.segmentDetailsWealth.setEuroFlow(true);
    }
    else{
      this.view.segmentDetailsWealth.setEuroFlow(false);
    }
    if((kony.application.getPreviousForm().id === "frmPortfolioDetails" || kony.application.getPreviousForm().id === "frmContactAdvisor" || kony.application.getPreviousForm().id === "frmDetailedPortfolioHealth" || kony.application.getPreviousForm().id === "frmHealthCheck") && this.newprop === true){
      this.view.segmentDetailsWealth.topFlex = "ReviewProposals";
      this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("i18n.wealth.reviewProposal");
      this.view.title = kony.i18n.getLocalizedString("i18n.wealth.reviewProposal");
      var params = {
      "portfolioId": applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portfolioId,
      "sortBy": "instrumentName",
      "sortOrder": "desc",
      "searchByInstrumentName": " ",
      "pageSize": "10",
      "pageOffset": "0",
      "pastProposalId": " ",
      "type": "orderProposal",
      "portfolioServiceType": "Advisory",
      "funcResultCode": scope_WealthPresentationController.funcResultCode
    };
      this.newprop = true;
      this.pastprop = false;
    }
    else if((kony.application.getPreviousForm().id === "frmPastProposal" || kony.application.getPreviousForm().id === "frmContactAdvisor" || kony.application.getPreviousForm().id === "frmDetailedPortfolioHealth" || kony.application.getPreviousForm().id === "frmHealthCheck") && this.pastprop === true)
    {
      this.view.segmentDetailsWealth.topFlex = "ReviewPastProposals";
      this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("i18n.wealth.reviewPastProposal");
      this.view.title = kony.i18n.getLocalizedString("i18n.wealth.reviewPastProposal");
      var params = {
        "portfolioId": applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portfolioId,
        "sortBy": "instrumentName",
        "sortOrder": "desc",
        "searchByInstrumentName": " ",
        "pageSize": "10",
        "pageOffset": "0",
        "portfolioServiceType": "Advisory",
		"pastProposalId": "",
        "type":"pastProposal"
      };
      this.newprop = false;
      this.pastprop = true;
    }
	this.view.segmentDetailsWealth.setContext(params);
    
    
	if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
      this.view.flxHeader.isVisible = true;
    } else {
      this.view.flxHeader.isVisible = false;
      this.view.flxScroll.scrollToWidget(this.view.segmentDetailsWealth);
    }
	this.view.flxAdditionalOptions.isVisible = false;
    
    if(this.view.segmentDetailsWealth.topFlex === "ReviewProposals"){
      this.view.flxConfirmTop.setVisibility(true);
      this.view.btnConfirm.setVisibility(true);
      this.view.btnReject.setVisibility(true);
      this.view.flxConfirmation.height = "300dp";
      //this.view.btnContactAdv.height = "48dp";
    }
    else if(this.view.segmentDetailsWealth.topFlex === "ReviewPastProposals"){
      this.view.flxConfirmTop.setVisibility(false);
      this.view.btnReject.setVisibility(false);
      this.view.btnConfirm.setVisibility(false);
      this.view.flxConfirmation.height = "102dp";
      //this.view.btnContactAdv.height = "80%";
    }
    
    if(this.view.segmentDetailsWealth.topFlex === "ReviewProposals"){
	  var newProposal =  navManager.setCustomInfo('InvestmentProposal','NewProposal'); 
      var ConstParm ={
        "objectServiceName": "PortfolioServicing",
        "operationName": "getInvestmentConstraintsHC",
        "objectName": "PortfolioHealth",
        "Criteria": {"portfolioId": applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portfolioId,
                     "portfolioServiceType": "Advisory"
                    }
      };
      var RecomParm = {
        "objectServiceName": "PortfolioServicing",
        "operationName": "getRcmdInstrumentIP",
        "objectName": "InvestmentProposal",
        "Criteria": { "portfolioId": applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portfolioId,
                      "pastProposalId": "",
                      "type": "",
                     "portfolioServiceType": "Advisory"
                    }
      };
	  var allocationParams = 
          {
            "portfolioId" :applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portfolioId,
            "portfolioServiceType": "Advisory",
            "navPage": "Portfolio",
            "sortBy": "",
            "sortOrder": "",
            "searchByInstrumentName": "",
            "pageSize": "",
			"type": "",
            "pageOffset": "",
            "funcResultCode": scope_WealthPresentationController.funcResultCode
          };
      var riskparam = {
      "portfolioId": applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portfolioId,
 	  "portfolioServiceType": "Advisory"
    };
    }
    else if(this.view.segmentDetailsWealth.topFlex === "ReviewPastProposals"){
      var ConstParm ={
        "objectServiceName": "PortfolioServicing",
        "operationName": "getConstraintsIP",
        "objectName": "InvestmentProposals",
        "Criteria": {"portfolioId": applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portfolioId,
                     "portfolioServiceType": "Advisory",
                     "pastProposalId": "2",
 					 "type": "pastProposal"
                    }
      };
      var RecomParm = {
        "objectServiceName": "PortfolioServicing",
        "operationName": "getRecommendedInstrIP",
        "objectName": "InvestmentProposals",
        "Criteria": { "portfolioId": applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portfolioId,
                     "portfolioServiceType": "Advisory",
                     "pastProposalId": "2",
 					 "type": "pastProposal"
                    }
      };
	  var allocationParams = 
          {
            "portfolioId" :applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portfolioId,
            "portfolioServiceType": "Advisory",
            "navPage": "Portfolio",
            "sortBy"  : "",
            "sortOrder": "",
            "searchByInstrumentName": "",
            "pageSize": "",
            "pageOffset": "",
            "type": "pastProposal"
          };
      var riskparam = {
      "portfolioId": applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portfolioId,
 	  "portfolioServiceType": "Advisory",
       "type":"pastProposal"
    };
    }
    this.view.Constraints.setConstSerParm(ConstParm);
    this.view.Recommendation.setRecomSerParm(RecomParm);
	this.view.AllocationCheck.setContext(allocationParams,false);
    this.view.riskAnalysis.setContext(riskparam);

    this.checkPermissions();
     }catch(err) {
        this.setError(err, "preShow");
      }
  },
    
  checkPermissions: function(){
    try{
    var configManager =  applicationManager.getConfigurationManager();
           var checkUserPermission = function (permission) {
            return applicationManager.getConfigurationManager().checkUserPermission(permission);
          }
        
             var checkFeature = function (feature) {
            return applicationManager.getConfigurationManager().checkUserFeature(feature);
          }
    
    var isInvestmentProposalNewProposalCreate = applicationManager.getConfigurationManager().checkUserPermission("INVESTMENT_PROPOSAL_NEW_PROPOSAL_CREATE");
    
    let self = this;
    
    if(isInvestmentProposalNewProposalCreate){
      
      this.view.btnConfirm.onClick = this.navigateToAck;
      //this.view.btnConfirm.skin = "sknIWBtnBgFFFFFFBorder1px003E7540px";
      this.view.btnConfirm.skin = "sknBtnE2E9F0Rounded";
      this.view.imgCheckBox.onTouchEnd = this.imgCkeckBoxChange;
    }
    else
      {
    
        this.view.flxConfirmTop.isVisible = false;
        this.view.btnConfirm.isVisible = false;
        this.view.flxConfirmation.height = "172dp";
      }
      }catch(err) {
        this.setError(err, "checkPermissions");
      }
    
  },

  initActions: function() {
    try{
    this.view.segmentDetailsWealth.onActionButtonClicked = this.setUpActionSheet;
    this.view.segmentDetailsWealth.onRequestStart = function() {
      applicationManager.getPresentationUtility().showLoadingScreen();
    };
    this.view.segmentDetailsWealth.onRequestEnd = function() {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    };
    this.view.customHeader.flxBack.onTouchEnd = this.navigateCustomBack;
    
    this.view.btnContactAdv.onClick = this.navigateToContactAdv;
    this.view.btnReject.onClick = this.rejectProposalPopup;
    this.view.btnNavToPortfolioDetails.onClick = this.navigateToPortfolio;
   
    this.view.segmentDetailsWealth.onRowClickEvent = this.onInvestmentSelect;
   }catch(err) {
        this.setError(err, "initActions");
      }
    },
  onInvestmentSelect:function(){

  },
  navigateToAck:function(){
    try{
    if(this.view.imgCheckBox.src === "checkbox_ticked.png"){
    
     var wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
	var portfolioId = wealthModule.portfolioId;
	let params = {
	"portfolioId": portfolioId,
	"funcResultCode" : scope_WealthPresentationController.funcResultCode
	}
	wealthModule.confirmOrdersIP(params);
	}
      }catch(err) {
        this.setError(err, "navigateToAck");
      }
  },
    
    confirmIP:function(){
     try{
     if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
    this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("i18n.wealth.acknowledgement");
    this.view.title = kony.i18n.getLocalizedString("i18n.wealth.acknowledgement");
    this.view.customHeader.flxBack.setVisibility(false);
    this.view.flxScroll.setVisibility(false);
    this.view.flxAdditionalOptions.setVisibility(false);
    this.view.flxAck.setVisibility(true);
     }else{
       this.newprop = true;
       this.pastprop = true;
       var navMan = applicationManager.getNavigationManager();
       navMan.navigateTo("frmInvestmentProposalAck");
     }
     }catch(err) {
        this.setError(err, "confirmIP");
      }
    
  },
  
  navigateToPortfolio:function(){
    try{
    this.newprop = true;
    this.pastprop = true;
    var navMan = applicationManager.getNavigationManager();
    navMan.navigateTo("frmPortfolioDetails");
      }catch(err) {
        this.setError(err, "navigateToPortfolio");
      }
  },
  
  navigateToContactAdv:function(){
    try{
    var navMan = applicationManager.getNavigationManager();
    navMan.navigateTo("frmContactAdvisor");
      }catch(err) {
        this.setError(err, "navigateToContactAdv");
      }
  },
  
  imgCkeckBoxChange:function(){
    try{
    if(this.view.imgCheckBox.src === "checkbox_normal.png"){
      this.view.imgCheckBox.src = "checkbox_ticked.png";
      this.view.btnConfirm.skin = "ICSknBtnF6F6F615px";
    }
    else if(this.view.imgCheckBox.src === "checkbox_ticked.png"){
      this.view.imgCheckBox.src = "checkbox_normal.png";
      this.view.btnConfirm.skin = "sknBtnE2E9F0Rounded";
    }
      }catch(err) {
        this.setError(err, "imgCkeckBoxChange");
      }
  },
  
  setUpActionSheet: function(params, details) {
    try{
    if (this.view.segmentDetailsWealth.topFlex === "ReviewProposals" || this.view.segmentDetailsWealth.topFlex === "ReviewPastProposals") {
      this.view.lblPerformance.text =  kony.i18n.getLocalizedString("i18n.wealth.downloadDocument");
      this.view.flxPerformance.onTouchEnd = this.onClickDownloadTxns;
      this.view.flxCancelOption.onTouchEnd = this.onClickCancel;
    } else {
      this.view.flxAccounts.isVisible = false;
    }
    this.view.flxAdditionalOptions.isVisible = true;
      }catch(err) {
        this.setError(err, "setUpActionSheet");
      }
  },

  onClickDownloadTxns: function() {
    try{
    this.view.flxHeader.setEnabled(true);
    this.view.flxScroll.setEnabled(true);
    this.view.flxAdditionalOptions.isVisible = false;
    alert("Download Document");
      }catch(err) {
        this.setError(err, "onClickDownloadTxns");
      }
  },
  
  onClickCancel: function() {
    try{
    this.view.flxHeader.setEnabled(true);
    this.view.flxScroll.setEnabled(true);
    this.view.flxAdditionalOptions.isVisible = false;
      }catch(err) {
        this.setError(err, "onClickCancel");
      }
  },
    
    rejectProposalPopup: function() {
      try{
      var basicConfig = {
        "alertType": constants.ALERT_TYPE_CONFIRMATION,
        "alertTitle": applicationManager.getPresentationUtility().getStringFromi18n("i18n.wealth.rejectProposal"),
        "message": applicationManager.getPresentationUtility().getStringFromi18n("i18n.wealth.rejectPopupheading"),
        "yesLabel": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.AlertYes"),
        "noLabel": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.AlertNo"),

        "alertHandler": this.rejectProposal
      };
//       var pspConfig = {
//         "contentAlignment": constants.ALERT_CONTENT_ALIGN_CENTER
//       };
      applicationManager.getPresentationUtility().showAlertMessage(basicConfig, {});
      }catch(err) {
        this.setError(err, "rejectProposalPopup");
      }
      },
    
    rejectProposal: function(response) {
      try{
      if (response === true) 
      {     
        var scope = this;
        var navManager = applicationManager.getNavigationManager();
        navManager.setCustomInfo("isProposalRejected", true);   
        var wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
        var portfolioid = wealthModule.portfolioId;
          let params = {
            "portfolioId": portfolioid,
            "portfolioDimensionE": "Portfolio",
            "sessionStatusE": "Rejected",
            "funcResultCode": scope_WealthPresentationController.funcResultCode
          };
          wealthModule.rejectProposals(params);
      } 
        }catch(err) {
        this.setError(err, "rejectProposal");
      }
    },
  
  navigateCustomBack: function() {
    try{
    this.view.imgCheckBox.src = "checkbox_normal.png";
    this.newprop = true;
    this.pastprop = true;
    if(this.view.segmentDetailsWealth.topFlex === "ReviewProposals"){
      var navMan = applicationManager.getNavigationManager();
      navMan.navigateTo("frmPortfolioDetails");
    }
    else if(this.view.segmentDetailsWealth.topFlex ==="ReviewPastProposals")
    {
      var navMan = applicationManager.getNavigationManager();
      navMan.navigateTo("frmPastProposal");
    }
    else
      {
        
      }
    }catch(err) {
        this.setError(err, "navigateCustomBack");
      }
  }
}
});