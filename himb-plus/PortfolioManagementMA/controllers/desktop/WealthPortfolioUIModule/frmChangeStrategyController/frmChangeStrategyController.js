/*eslint-disable*/
define(['FormControllerUtility', 'ViewConstants', 'CommonUtilities', 'OLBConstants', 'CampaignUtility'], function (FormControllerUtility, ViewConstants, CommonUtilities, OLBConstants, CampaignUtility) {
  var orientationHandler = new OrientationHandler();
  var responsiveUtils = new ResponsiveUtils();
  //Type your controller code here
  return {
    init: function () {
      this.view.onBreakpointChange = this.onBreakpointChange;
      this.view.onTouchEnd = this.onFormTouchEnd;
      this.view.preShow = this.preShow;
      this.view.postShow = this.postShow;
      this.initActions();
    },
    
    initActions: function () {
    },

    postShow: function () {
      this.checkPermission();
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

    preShow: function () {
       let params = {};
      if(kony.application.getPreviousForm().id === "frmRiskAppetite" ){
        scope_WealthPresentationController.isQuestionnaireFlow = true;
          params = {
          "portfolioId": applicationManager.getModulesPresentationController("WealthPortfolioUIModule").getPortfolioId(),
          "portfolioServiceType": "Advisory",
           "score": scope_WealthPresentationController.score
        };
      }
      else {
         params = {
          "portfolioId": applicationManager.getModulesPresentationController("WealthPortfolioUIModule").getPortfolioId(),
          "portfolioServiceType": "Advisory",
           "strategyName" : scope_WealthPresentationController.strategyName
        };
        scope_WealthPresentationController.isQuestionnaireFlow = false;
      }
      var scope = this;
      try {
        let wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
        this.graphData = {};
       
        wealthModule.getAllStrategies(params);
      }
      catch (err) {
        kony.print(err);
      }
    },

    setData: function (data) {
      var scope = this;
      try {
        var labelData = "";
        let chartArray = [];
        let responseArray = [];
        let imageArray = [];
        let colorArray = [];
        let max = 0;
        let startIndex = 0;
        let currentStrategyName = "";
        let currentStrategyId = "";
        let altFlag = false;
        var selectedResponse;
        var response = data;
        var navManager = applicationManager.getNavigationManager();
        
        //IW-4073 - Lakshminarayanan - When navigate back to choose strategy from questinnaire flow
        //for the first time user, this strategyname is required as there wont be any score again
        scope_WealthPresentationController.strategyName = response.recStrategy[0].strategyName;
        
        if(kony.application.getPreviousForm().id === "frmStrategyAllocation"){
          this.view.lblStrategy.text = kony.i18n.getLocalizedString("i18n.wealth.changeStrategy");
        }
        
        if(kony.application.getPreviousForm().id === "frmRiskAppetite" ){
          this.view.lblStrategy.text = kony.i18n.getLocalizedString("i18n.wealth.chooseStrategy");
          selectedResponse = response.recStrategy[0].strategyName;
          currentStrategyName = response.recStrategy[0].strategyName;
          currentStrategyId = response.recStrategy[0].strategyId;
        }
        else if(kony.application.getPreviousForm().id === "frmMyStrategyAck"){
          selectedResponse = navManager.getCustomInfo('frmChangeStrategy').strategyName;
          currentStrategyName = navManager.getCustomInfo('frmChangeStrategy').strategyName;
          currentStrategyId = navManager.getCustomInfo('frmChangeStrategy').strategyId;
        }
        else if(navManager.getCustomInfo("frmChooseStrategy") !== undefined){
           selectedResponse = navManager.getCustomInfo("frmChooseStrategy").myStrategyName;
           currentStrategyName = navManager.getCustomInfo("frmChooseStrategy").myStrategyName;
           currentStrategyId = navManager.getCustomInfo("frmChooseStrategy").strategyId;
        }
        else{
           selectedResponse = navManager.getCustomInfo('StrategyNameData');
        }
        this.view.lblStrategyChange.text = selectedResponse;
        if (response.recStrategy[0].strategyName === selectedResponse) {
          var navManager = applicationManager.getNavigationManager();
          navManager.setCustomInfo('frmChangeStrategy', response.recStrategy[0]);
          scope.view.flxMainStrategy.skin = "sknflx04A615f";
          scope.view.lblSelectedStrategy.text = kony.i18n.getLocalizedString("i18n.wealth.selectedStrategy");
          scope.view.flxGreen.skin = "sknflxGreen0ba407a4468e045";
          scope.view.img2.src = "success.png";
        } else {
          scope.view.lblSelectedStrategy.text = kony.i18n.getLocalizedString("i18n.wealth.selectStrategy");
          scope.view.flxMainStrategy.skin = "sknFlxBgFFFFFFBorderE3E3E3Radius4Px";
          scope.view.flxGreen.skin = "sknFlxBgFFFFFFBorderE3E3E3Radius4Px";
          scope.view.img2.src = "radioinactivebb.png";
          for (let i in response.alternateStrategy) {
            if (response.alternateStrategy[i].strategyName === selectedResponse) {
              var navManager = applicationManager.getNavigationManager();
              navManager.setCustomInfo('frmChangeStrategy', response.alternateStrategy[i]);
              startIndex = i;
              altFlag = true;
              break;
            }
          }
        }
        this.view.WealthDonutSeg.setVisibility(true);
        this.view.flxMainStrategy.onTouchEnd = function () {
          scope.view.img4.src = "active1.png";
          CommonUtilities.disableButton(scope.view.btnConfirm);
          scope.view.flxMainStrategy.skin = "sknflx04A615f";
          scope.view.lblSelectedStrategy.text = kony.i18n.getLocalizedString("i18n.wealth.selectedStrategy");
          scope.view.flxGreen.skin = "sknflxGreen0ba407a4468e045";
          scope.view.img2.src = "success.png";
          scope.view.lblStrategyChange.text = response.recStrategy[0].strategyName;
          currentStrategyName = response.recStrategy[0].strategyName;
          currentStrategyId = response.recStrategy[0].strategyId;
          var navManager = applicationManager.getNavigationManager();
          navManager.setCustomInfo('frmChangeStrategy', response.recStrategy[0]);
          scope.view.chooseStrategy.onToggleToRecommendStrategy();
        };
        this.view.img4.onTouchEnd = function () {
          if (scope.view.img4.src === "active1.png") {
            scope.view.img4.src = "activecheckbox.png";
            CommonUtilities.enableButton(scope.view.btnConfirm);
          }
          else {
            scope.view.img4.src = "active1.png";
            CommonUtilities.disableButton(scope.view.btnConfirm);
          }
        };
        this.view.chooseStrategy.onToggle = function (data) {
          scope.view.img4.src = "active1.png";
          CommonUtilities.disableButton(scope.view.btnConfirm);
          scope.view.lblSelectedStrategy.text = kony.i18n.getLocalizedString("i18n.wealth.selectStrategy");
          scope.view.flxMainStrategy.skin = "sknFlxBgFFFFFFBorderE3E3E3Radius4Px";
          scope.view.flxGreen.skin = "sknFlxBgFFFFFFBorderE3E3E3Radius4Px";
          scope.view.lblStrategyChange.text = data;
          scope.view.img2.src = "radioinactivebb.png";
          currentStrategyName = data;
          for (let i in response.alternateStrategy) {
            if (response.alternateStrategy[i].strategyName === data) {
              currentStrategyId = response.alternateStrategy[i].strategyId;
              var navManager = applicationManager.getNavigationManager();
              navManager.setCustomInfo('frmChangeStrategy', response.alternateStrategy[i]);
              break;
            }
          }
        };
        this.view.btnConfirm.onTouchEnd = function () {
          scope.view.WealthDonutSeg.setVisibility(false);
          let wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
          let params = {};
          if(scope_WealthPresentationController.isQuestionnaireFlow){
            let params = {
                        "strategyId": currentStrategyId,
                        "strategyName": currentStrategyName, 
                        "portfolioId": applicationManager.getModulesPresentationController("WealthPortfolioUIModule").getPortfolioId(),
                        "portfolioServiceType": "Advisory",
                        "questionnaireHistoCode": scope_WealthPresentationController.questionnaireHistoCode
                       };
             wealthModule.confirmStrategyFromQuestion(params);
          }else{
             params = {
                        "strategyId": currentStrategyId,
                        "strategyName": currentStrategyName, 
                        "portfolioId": applicationManager.getModulesPresentationController("WealthPortfolioUIModule").getPortfolioId(),
                        "portfolioServiceType": "Advisory"
                       };
             wealthModule.confirmChangeStrat(params);
          }
          
         
        };
        this.view.btnCancel.onTouchEnd = function () {
          scope.view.WealthDonutSeg.setVisibility(false);
          var navManager = applicationManager.getNavigationManager();
        var data = navManager.getCustomInfo("frmFirstUserVal");
        if(data !== undefined){
          data = undefined;
          navManager.setCustomInfo("frmFirstUserVal", data);
            new kony.mvc.Navigation({
                "appName": "PortfolioManagementMA",
                "friendlyName": "frmPortfolioOverview"
            }).navigate();
        }else{
            new kony.mvc.Navigation({
                "appName": "PortfolioManagementMA",
                "friendlyName": "frmStrategyAllocation"
            }).navigate();
      }
        };
        CommonUtilities.disableButton(scope.view.btnConfirm);
        //scope.view.lblStrategyChange.text = response.recStrategy[0].strategyName;
        let dataMapping = {
          lblAsset: "assetName",
          lblValue: "weight",
          flxDot: "background",
        }
        colorArray =["0475C4","43A2CA","7BCCC4","BAE4BC","6753EC","E3E3E3","424242"];
       // currentStrategyName = response.recStrategy[0].strategyName;
       // currentStrategyId = response.recStrategy[0].strategyId;
        for (let i in response.alternateStrategy) {
          chartArray[i] = [];
          for (let j in response.alternateStrategy[i].assetsCompo) {
            chartArray[i].push(response.alternateStrategy[i].assetsCompo[j].weight);
            response.alternateStrategy[i].assetsCompo[j].weight = response.alternateStrategy[i].assetsCompo[j].weight + "%";
            response.alternateStrategy[i].assetsCompo[j].background = {
              backgroundColor: colorArray[j]
            }
          }
          responseArray.push(response.alternateStrategy[i].assetsCompo);
          imageArray.push(response.alternateStrategy[i].strategyName);
          max = max < response.alternateStrategy[i].assetsCompo.length ? response.alternateStrategy[i].assetsCompo.length : max;
        }
        //Pulkit, IW-3316 - fix start
        //let donutRadius = 15;
        let donutRadius = 35;
        //IW-3316 ends
        let no_of_cards = 3;
        this.view.flxDivision.height = 370 + ((max - 1) * 30);
        this.view.lblAlternative.text = kony.i18n.getLocalizedString("i18n.wealth.alternativeStrategy")+" (" + response.alternateStrategy.length + ")";
        if (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) {
          no_of_cards = 2;
        }
        labelData = response.recStrategy[0].strategyName;
        for (let j in response.recStrategy[0].assetsCompo) {
          response.recStrategy[0].assetsCompo[j].background = {
            backgroundColor: colorArray[j]
          };
          response.recStrategy[0].assetsCompo[j].weightWithPercent = response.recStrategy[0].assetsCompo[j].weight + "%";
        }
        this.view.WealthDonutSeg.goContext(response, labelData);
        this.view.chooseStrategy.setData(responseArray, chartArray, donutRadius, imageArray, dataMapping, startIndex, no_of_cards, max, altFlag);
      }
      catch (err) {
        kony.print(err);
      }
    },
    
    
    checkPermission: function() {
            var configManager = applicationManager.getConfigurationManager();
          var checkUserPermission = function (permission) {
            return configManager.checkUserPermission(permission);
          }; 
           var wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
           var isChangeStrategyConfirmation = applicationManager.getConfigurationManager().checkUserPermission("CHANGE_STRATEGY_CONFIRMATION");
          

          
            let self = this;
            //Portfolio Details page Permission
 			
            self.view.flxConfirmation.isVisible = isChangeStrategyConfirmation;
			self.view.btnConfirm.isVisible = isChangeStrategyConfirmation;

          
          if(!isChangeStrategyConfirmation){
            this.view.btnCancel.left = "75%";
          }
     
     },
    

    setActiveHeaderHamburger: function () {
      this.view.customheadernew.activateMenu("Accounts", "My Accounts");
      this.view.customheadernew.flxContextualMenu.setVisibility(false);
      this.view.customheadernew.flxAccounts.skin = ViewConstants.SKINS.BLANK_SKIN_TOPMENU;
    },
    onBreakpointChange: function (form, width) {
      responsiveUtils.onOrientationChange(this.onBreakpointChange);
      this.view.customheadernew.onBreakpointChangeComponent(width);
      this.view.customfooternew.onBreakpointChangeComponent(width);
    }
  };
});