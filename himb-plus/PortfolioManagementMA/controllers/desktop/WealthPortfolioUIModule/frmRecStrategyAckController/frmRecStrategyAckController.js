
define(['FormControllerUtility', 'ViewConstants', 'CommonUtilities', 'OLBConstants', 'CampaignUtility'], function(FormControllerUtility, ViewConstants, CommonUtilities, OLBConstants, CampaignUtility){
  var orientationHandler = new OrientationHandler();
  var responsiveUtils = new ResponsiveUtils();
  
  return{
    
    
    onNavigate: function(){
      this.view.onBreakpointChange = this.onBreakpointChange;
      this.view.preShow = this.preShow;
      this.view.postShow = this.postShow;
      this.initActions();
    },
    initActions: function(){
      this.view.btnReview.onClick = this.navStrategyAllocation;
      this.view.onTouchEnd = this.onFormTouchEnd;
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

    preShow: function ()
    {
      this.view.acknowledgmentModify.flxSep.top="54px";
      this.view.acknowledgmentModify.confirmHeaders.lblHeading.left="30px";
      this.view.acknowledgmentModify.confirmHeaders.lblHeading.skin = "sknlbl424242SSPR15px" ;
      this.view.acknowledgmentModify.lblTransactionMessage.skin = "sknlbl424242SSPReg24px" ;
      this.view.acknowledgmentModify.lblRefrenceNumberValue.skin = "sknlbl424242SSPReg17px";

      var data = applicationManager.getNavigationManager().getCustomInfo('frmRecommendStrategyConfirmation');
      var response = JSON.parse(JSON.stringify(data));

      var assetArray= response.assets;
      var labelData=response.recStrategyName;

      let template=JSON.stringify({"templateID": "flxSegMyStrategyOLB", "microAppName": "PortfolioManagementMA"});
      let configParam = {
        "serviceParameters": {},
        "dataMapping": {
          "segListDetail": {
            "segmentMasterData": "${CNTX.assets}",
            "segmentUI": {
              "rowTemplate": {
                "lblAsset": "${segmentMasterData.assetName}",
                "lblValue": "${segmentMasterData.weight}",
                "flxDot": "${segmentMasterData.backgroundColor}"



              }
            }
          }
        },
        "rowTemplateConfig": template,
        "headerTemplateConfig" : ""
      };
     
      var graphData=[];
      for(var i=0;i<assetArray.length;i++){
        graphData.push(Number(assetArray[i].weight));
      }

      var finalSegListArray=[];
      var listValue;
      var colArray =["0475C4","43A2CA","7BCCC4","BAE4BC","6753EC","E3E3E3","424242"];
      var j=0;
      for(var k=0;k<assetArray.length;k++){
        listValue={
          assetName: assetArray[k].assetName,
          weight:assetArray[k].weight + '%',
          backgroundColor:{
            backgroundColor: colArray[j]

          }
        };
        if(listValue.assetName !== "IRS_IP_ACTIVE") {
          finalSegListArray.push(listValue);
        }
        j++;
      }
      response.assets=finalSegListArray;

      if ( labelData !== undefined ){
        this.view.lblActive.text = labelData;    
        this.view.flxActive.setVisibility(true);

    // Setting this to false as part of IW-3189 fix - as this is no longer needed
        this.view.imgActive.isVisible=false;
       // this.view.imgActive.src = labelData==="Active"?"active_one.png":labelData.toLowerCase()+".png";
        this.view.acknowledgmentModify.lblRefrenceNumberValue.text=kony.i18n.getLocalizedString("i18n.wealth.yourRcmdStrategy")+ " " +labelData ;

      }else {
        this.view.flxActive.setVisibility(false);
      }

      this.view.segList.setConfigsFromParent(configParam);
      this.view.wealthDonut.drawDataChart(graphData);
      this.view.segList.updateContext(response);
    },
    navStrategyAllocation: function(){
      var navManager = applicationManager.getNavigationManager();
      navManager.navigateTo("frmStrategyAllocation");
    },

    postShow: function(){
      this.checkPermission();
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
           var isRecommendedStrategyAcknowledgement = applicationManager.getConfigurationManager().checkUserPermission("RECOMMENDED_STRATEGY_ACKNOWLEDGEMENT");
           var isRecommendedStrategyAcknowledgementChart = applicationManager.getConfigurationManager().checkUserPermission("RECOMMENDED_STRATEGY_ACKNOWLEDGEMENT_CHART");


          
            let self = this;
            //Portfolio Details page Permission
 			
      
         self.view.flxAck.setVisibility(isRecommendedStrategyAcknowledgement);
         self.view.flxStrategy.setVisibility(isRecommendedStrategyAcknowledgementChart);
            if(kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet){
           self.view.flxStrategy.width = "100%";
          }
          else{
          if(!isRecommendedStrategyAcknowledgement){
            self.view.flxStrategy.width = "100%";
            self.view.segList.width = "50%";
            self.view.flxDonutSeg.width = "50%";
          }
          }
     
       
         if(kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet){
           self.view.flxAck.width = "100%";
          }
          else{
          if(!isRecommendedStrategyAcknowledgementChart){
            self.view.flxAck.width = "100%";
          }
          }
      if(kony.application.getCurrentBreakpoint() >= 1024){
         self.view.flxAck.height = self.view.flxStrategy.minHeight;
         }else{
           self.view.flxAck.height = "410dp";
         }
     
     },
    
    
    onBreakpointChange: function(form, width) {
      responsiveUtils.onOrientationChange(this.onBreakpointChange);
      this.view.customheadernew.onBreakpointChangeComponent(width);
      this.view.customfooternew.onBreakpointChangeComponent(width);
    }
  };
});

