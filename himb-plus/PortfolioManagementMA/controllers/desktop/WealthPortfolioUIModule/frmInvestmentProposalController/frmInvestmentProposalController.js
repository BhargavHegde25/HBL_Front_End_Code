/* eslint-disable */
define("PortfolioManagementMA/WealthPortfolioUIModule/userfrmInvestmentProposalController", ['FormControllerUtility', 'ViewConstants', 'CommonUtilities', 'OLBConstants', 'CampaignUtility'], function(FormControllerUtility, ViewConstants, CommonUtilities, OLBConstants, CampaignUtility) {
  var responsiveUtils = new ResponsiveUtils();
  var orientationHandler = new OrientationHandler();
  return {
    newprop : true,
    pastprop : true,
    newProposalBack:true,
    pastProposalBack:true,
	isRTL:'',
    onNavigate: function() {
      this.view.preShow = this.preShow;
      this.view.postShow = this.postShow;
      this.init();
    },

    init: function() {
      this.view.onBreakpointChange = this.onBreakpointChange;
      this.view.btnConfirm.onClick = this.onConfirm;
      this.view.btnBackToAccountDet.onClick = this.backToPortfolio;
      this.initActions();
    },

    riskAnalysisFlexChange: function(size, chartData) {
      if (kony.application.getCurrentBreakpoint() > 1024) {
        //this.view.AllocationGraph.setLegendHeight(chartData.seriesArray[0].length*37);
      if (chartData.seriesArray[0].length === 3) {
          //this.view.AllocationGraph.setLegendHeight((chartData.seriesArray[0].length*37)+(chartData.seriesArray[0].length - 3)*26);
       this.view.flxAssetAllocationcheck.bottom = 60 + (chartData.seriesArray[0].length*25);
       } 
       else if (chartData.seriesArray[0].length > 3) {
          //this.view.AllocationGraph.setLegendHeight((chartData.seriesArray[0].length*37)+(chartData.seriesArray[0].length - 3)*26);
       this.view.flxAssetAllocationcheck.bottom = 120 + (chartData.seriesArray[0].length*25);
       } else if(chartData.seriesArray[0].length !== 3){
          this.view.flxAssetAllocationcheck.bottom = "15dp";
        }
      } 
    },
    initActions:function(){
      this.view.flxBack.onTouchEnd = this.goBack;
      this.view.onTouchEnd = this.onFormTouchEnd;
      this.view.customheadernew.flxAccounts.onTouchEnd = this.backToAccounts;
      this.view.imgConfirmation.onTouchEnd = this.imageChange;
      this.view.btnContactAdvisor.onClick = this.ContactAdvisor; 
      this.view.btnReject.onClick = this.rejectProposal;
      this.view.rejectProposalPopup.flxCross.onClick = this.closePopup;
      this.view.rejectProposalPopup.btnNo.onClick = this.closePopup;
      this.view.rejectProposalPopup.btnYes.onClick = this.returnToPortfolio; 
    },
    
     onFormTouchEnd:function(){
      var currFormObj = kony.application.getCurrentForm();
    if (currFormObj.customheadernew.flxContextualMenu.isVisible === true) {
      setTimeout(function() {
        currFormObj.customheadernew.flxContextualMenu.setVisibility(false);
        currFormObj.customheadernew.flxTransfersAndPay.skin = ViewConstants.SKINS.BLANK_SKIN_TOPMENU;
        currFormObj.customheadernew.imgLblTransfers.text = "O";
      }, "17ms")
    }
    },
    
    closePopup: function(){
        this.view.flxRejectProposalPopup.isVisible = false;
      },
    
    returnToPortfolio:function(){      
      var scope = this;
      var navManager = applicationManager.getNavigationManager();
      navManager.setCustomInfo("isProposalRejected", true);   
      var wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
      var portfolioid = wealthModule.getPortfolioId();
      try {        
        let params = {
          "portfolioId": portfolioid,
          "portfolioDimensionE": "Portfolio",
          "sessionStatusE": "Rejected",
          "funcResultCode": scope_WealthPresentationController.funcResultCode
        };
        wealthModule.rejectProposals(params);
      }
      catch (err) {
        kony.print(err);
      }
      
    },
	backToAccounts: function () {
	    this.newprop = true;
            this.pastprop = true;
	},
    
    goBack: function() {      
      if(kony.application.getPreviousForm().id === "frmPortfolioOverview")        
      {
        var navManager = applicationManager.getNavigationManager();
        navManager.navigateTo("frmPortfolioOverview");
      }
      else if(kony.application.getPreviousForm().id === "frmPastProposal")
      {
        var navManager = applicationManager.getNavigationManager();
        navManager.navigateTo("frmPastProposal");
      }
      else if(kony.application.getPreviousForm().id === "frmPortfolioHealthCheck")
      {
        var navManager = applicationManager.getNavigationManager();
        navManager.navigateTo("frmPortfolioHealthCheck");
      }
      else if(kony.application.getPreviousForm().id === "frmContactAdvisor" && this.pastProposalBack === true)
      {
        var navManager = applicationManager.getNavigationManager();
        navManager.navigateTo("frmPastProposal");
      }
      else if(kony.application.getPreviousForm().id === "frmContactAdvisor" && this.newProposalBack === true)
      {
        var navManager = applicationManager.getNavigationManager();
        navManager.navigateTo("frmPortfolioOverview");
      }
      else if(kony.application.getPreviousForm().id === "frmContactAdvisor" && this.newProposalBack === false)
      {
        var navManager = applicationManager.getNavigationManager();
        navManager.navigateTo("frmPortfolioHealthCheck");
      }      
      this.newprop = true;
      this.pastprop = true;
    },

    preShow: function() {
	  this.isRTL = scope_WealthPresentationController.rtlLocale.includes(kony.i18n.getCurrentLocale());
	  this.view.imgBack.src = this.isRTL ? "right_arrow.png" : "back_icon_blue.png";
   // this.view.rejectProposalPopup.lblHeading.text = kony.i18n.getLocalizedString("i18n.wealth.rejectinvestmentPropsal");
      var navManager = applicationManager.getNavigationManager();
	  this.view.flxMainContainer.setVisibility(true);
      this.view.flxAcknowledgement.setVisibility(false);
      this.view.imgConfirmation.src = "inactivecheckbox_2.png";
      this.view.btnConfirm.skin = "sknBtnBlockedSSPFFFFFF15Px";
      if((kony.application.getPreviousForm().id === "frmPortfolioOverview" || kony.application.getPreviousForm().id === "frmContactAdvisor" || kony.application.getPreviousForm().id === "frmPortfolioHealthCheck") && this.newprop === true)
      {
        if(kony.application.getPreviousForm().id === "frmPortfolioOverview")
        {
          this.newProposalBack = true;
          this.pastProposalBack = false;
        }
        else if(kony.application.getPreviousForm().id === "frmPortfolioHealthCheck")
        {
          this.newProposalBack = false;
          this.pastProposalBack = false;
        }
        this.view.flxRejectProposalPopup.setVisibility(false);
        this.view.lblProposalHeader.text = kony.i18n.getLocalizedString("i18n.wealth.confirmInvestmentProposal");
        this.view.btnConfirm.setVisibility(true);
        this.view.btnReject.setVisibility(true);
        //this.view.btnContactAdvisor.right = "360dp";
        //this.view.btnReject.right = "190dp";
        this.view.flxConfirmation.setVisibility(true);
        this.newprop = true;
        this.pastprop = false;
        var dataToSegment = {"newprop" : true,
        "pastprop" : false}
        navManager.setCustomInfo("frmReviewNew",dataToSegment);
      }
      else if((kony.application.getPreviousForm().id === "frmPastProposal" || kony.application.getPreviousForm().id === "frmContactAdvisor") && this.pastprop === true)
      {
        if(kony.application.getPreviousForm().id === "frmPastProposal")
        {
          this.pastProposalBack = true;
        }
        this.view.flxRejectProposalPopup.setVisibility(false);
        this.view.lblProposalHeader.text = kony.i18n.getLocalizedString("i18n.wealth.pastProposals");
        this.view.flxConfirmation.setVisibility(false);
        this.view.btnConfirm.setVisibility(false);       
        this.view.btnReject.setVisibility(false);
        //this.view.btnContactAdvisor.right = "20dp";
        this.newprop = false;
        this.pastprop = true;
        var dataToSegment = {"newprop" : false,
        "pastprop" : true}
        navManager.setCustomInfo("frmReviewNew",dataToSegment);
      }
      
      var wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
      var portfolioid = wealthModule.getPortfolioId();
       if((kony.application.getPreviousForm().id === "frmPortfolioOverview" || kony.application.getPreviousForm().id === "frmContactAdvisor" || kony.application.getPreviousForm().id === "frmPortfolioHealthCheck") && this.newprop === true){
      var ConstParm ={
        /*"objectServiceName": "PortfolioServicing",
        "operationName": "getConstraintsIP",
        "objectName": "InvestmentProposal",
        "Criteria": {"portfolioId": portfolioid,
                     "type": "",
                     "pastProposalId": "",
                     "portfolioServiceType": "Advisory"
                    }*/
        //changing as a part of WIW-2117
        "objectServiceName": "PortfolioServicing",
		"operationName": "getInvestmentConstraintsHC",
		"objectName": "PortfolioHealth",
		"Criteria": {"portfolioId": portfolioid,
                    "portfolioServiceType": "Advisory"
					}
        
      };
      var RecomParm = {
        "objectServiceName": "PortfolioServicing",
        "operationName": "getRcmdInstrumentIP",
        "objectName": "InvestmentProposal",
        "Criteria": { "portfolioId": portfolioid,
                     "type": "",
                     "pastProposalId": "",
                     "portfolioServiceType": "Advisory"
                    }
      };
         var params={
           "portfolioId" :portfolioid,
           "portfolioServiceType": "Advisory"
         };
    }
    else if((kony.application.getPreviousForm().id === "frmPastProposal" || kony.application.getPreviousForm().id === "frmContactAdvisor") && this.pastprop === true){
      var ConstParm ={
        "objectServiceName": "PortfolioServicing",
        "operationName": "getConstraintsIP",
        "objectName": "InvestmentProposal",
        "Criteria": {"portfolioId": portfolioid,
                     "portfolioServiceType": "Advisory",
                     "pastProposalId": "2",
 					 "type": "pastProposal"
                    }
      };
      var RecomParm = {
        "objectServiceName": "PortfolioServicing",
        "operationName": "getRcmdInstrumentIP",
        "objectName": "InvestmentProposal",
        "Criteria": { "portfolioId": portfolioid,
                     "portfolioServiceType": "Advisory",
                     "pastProposalId": "2",
 					 "type": "pastProposal"
                    }
      };
      var params={
        "portfolioId" :portfolioid,
        "portfolioServiceType": "Advisory",
        "type": "pastProposal"
      };
    }
	this.view.RiskAnalysisGraph.setContext(params);
    this.view.investmentConstraints.setServiceParm(ConstParm, this.constraintsFlexSize);
    this.view.recommendedInstruments.setServiceParm(RecomParm, this.recomFlexSize);
    this.checkPermission();
    },

    constraintsFlexSize:function(response){
      if(Number(response.investmentConstraintStatus)){
        this.view.flxConstraintsSeg.height = "290dp";
      }else{
        this.view.flxConstraintsSeg.height = "115dp";
      }
    },
    
    recomFlexSize:function(response){
      if(Number(response.recommendedInstrumentStatus)){
        this.view.flxRecommendationSeg.height = "290dp";
      }else{
        this.view.flxRecommendationSeg.height = "115dp";
      }
    },


    postShow: function() {
	  var wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
      var portfolioId = wealthModule.getPortfolioId();
      var navManager = applicationManager.getNavigationManager();      
      var InvestmentProposal =  navManager.getCustomInfo('InvestmentProposal');    
      let params = {};
     if(InvestmentProposal === "PastProposal"){
       params = 
          {
            "portfolioId" :portfolioId,
            "portfolioServiceType": "Advisory",
            "navPage": "Portfolio",
            "sortBy"  : "",
            "sortOrder": "",
            "searchByInstrumentName": "",
            "pageSize": "",
            "pageOffset": "",
            "type": "pastProposal"
          };
     }
      else{
         params = 
          {
            "portfolioId" :portfolioId,
            "portfolioServiceType": "Advisory",
             "funcResultCode":scope_WealthPresentationController.funcResultCode,
            "navPage": "Portfolio",
            "sortBy": "",
            "sortOrder": "",
            "searchByInstrumentName": "",
            "pageSize": "",
			"type": "",
            "pageOffset": ""
          };
      }
//       if(this.view.lblProposalHeader.text === "Past Proposals")
//       {
//         this.view.flxConfirmation.setVisibility(false);
//         this.view.btnConfirm.setVisibility(false);       
//         this.view.btnReject.setVisibility(false);
//       }
//       else
//       {
//         this.view.btnConfirm.setVisibility(true);
//         this.view.btnReject.setVisibility(true);        
//         this.view.flxConfirmation.setVisibility(true);
//         this.view.btnContactAdvisor.right = "20dp";
//       }      
      this.view.AllocationCheck.setContext(params,false, this.riskAnalysisFlexChange);
	  var scope = this;
      scope.view.flxRisk.isVisible = true;
      this.view.RiskAnalysisGraph.disableRiskanalysisGraphVisibility = function(){
      scope.view.flxRisk.isVisible = false;
      }
      this.checkPermission();
      this.setActiveHeaderHamburger();
    },


    setActiveHeaderHamburger: function() {
      this.view.customheadernew.activateMenu("Accounts", "My Accounts");
      this.view.customheadernew.flxContextualMenu.setVisibility(false);
      this.view.customheadernew.flxAccounts.skin = ViewConstants.SKINS.BLANK_SKIN_TOPMENU;
    },
    
    checkPermission: function() {
            var configManager = applicationManager.getConfigurationManager();
          var checkUserPermission = function (permission) {
            return configManager.checkUserPermission(permission);
          };
           var wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
           var isPortfolioInvestmentProposalNewProposalCreate = applicationManager.getConfigurationManager().checkUserPermission("INVESTMENT_PROPOSAL_NEW_PROPOSAL_CREATE");
           
          
            let self = this;
      if((kony.application.getPreviousForm().id === "frmPortfolioOverview" || kony.application.getPreviousForm().id === "frmContactAdvisor" || kony.application.getPreviousForm().id === "frmPortfolioHealthCheck") && this.newprop === true)
      {
        this.view.flxConfirmation.isVisible = isPortfolioInvestmentProposalNewProposalCreate;
        this.view.btnConfirm.isVisible = isPortfolioInvestmentProposalNewProposalCreate;
        //this.view.btnReject.isVisible = isPortfolioInvestmentProposalNewProposalCreate;
      }          
	if(!isPortfolioInvestmentProposalNewProposalCreate){
         	 this.view.btnContactAdvisor.right="20dp";
      
        	}

      
     },

    onBreakpointChange: function(form, width) {
      responsiveUtils.onOrientationChange(this.onBreakpointChange);
      this.view.customheadernew.onBreakpointChangeComponent(width);
      this.view.customfooternew.onBreakpointChangeComponent(width);
    },

    ContactAdvisor:function(){
      var navManager = applicationManager.getNavigationManager();
      navManager.navigateTo("frmContactAdvisor");
    },
    
    imageChange:function(){
      if(this.view.imgConfirmation.src === "inactivecheckbox_2.png"){
      this.view.imgConfirmation.src = "activecheckbox.png";
        this.view.btnConfirm.skin = "sknBtnSSPBg0273e3Border0273e3";
    }
    else if(this.view.imgConfirmation.src === "activecheckbox.png"){
      this.view.imgConfirmation.src = "inactivecheckbox_2.png";
      this.view.btnConfirm.skin = "sknBtnBlockedSSPFFFFFF15Px";
    }
    },
    
    backToPortfolio:function(){
      this.view.flxMainContainer.setVisibility(true);
      this.view.flxAcknowledgement.setVisibility(false);
      var navManager = applicationManager.getNavigationManager();
      navManager.navigateTo("frmPortfolioOverview");
    },
    
    rejectProposal:function(){
      this.view.flxRejectProposalPopup.isVisible = true;
      this.view.rejectProposalPopup.lblHeading.text = kony.i18n.getLocalizedString("i18n.wealth.rejectinvestmentPropsal");
    },
        

    onConfirm:function(){
      if(this.view.imgConfirmation.src === "activecheckbox.png"){
     
      var wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
      var portfolioId = wealthModule.getPortfolioId();
        let params = {
          "portfolioId": portfolioId,
          "funcResultCode" :scope_WealthPresentationController.funcResultCode
        }
        wealthModule.confirmOrdersIP(params);
      }
        
    },
    
    confirmIP:function(){
       this.view.flxMainContainer.setVisibility(false);
      this.view.flxAcknowledgement.setVisibility(true);
    }
  };
});
