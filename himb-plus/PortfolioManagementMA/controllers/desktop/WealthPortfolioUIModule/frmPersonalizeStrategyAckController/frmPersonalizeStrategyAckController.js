/* eslint-disable */
define(['FormControllerUtility', 'ViewConstants', 'CommonUtilities', 'OLBConstants', 'CampaignUtility'], function(FormControllerUtility, ViewConstants, CommonUtilities, OLBConstants, CampaignUtility){
  return{
  //Type your controller code here 
  onNavigate: function(){
    this.view.preShow = this.preShow;
    this.view.postShow = this.postShow;
  },
    postShow: function(){
      if(kony.application.getCurrentBreakpoint() >= 1024){
		  // WIW-863 Strategy and acknowledgment box size and height is not matching
        var element = document.querySelector('[kwp="frmPersonalizeStrategyAck_formTemplate12_flxStrategy"]');
        if(element) {
          this.view.formTemplate12.flxContentTCCenter.flxAck.height = element.offsetHeight + "px";
        }
        // this.view.formTemplate12.flxContentTCCenter.flxAck.height = this.view.formTemplate12.flxContentTCCenter.flxStrategy.minHeight;
      }else{
        this.view.formTemplate12.flxContentTCCenter.flxAck.height = "410dp";
      }
    },
  preShow: function() {
    this.view.formTemplate12.flxPageFooter.isVisible = false;
    this.view.onTouchEnd = this.onFormTouchEnd;
    var data = applicationManager.getNavigationManager().getCustomInfo('personalizedStrategyData');

    //creating the template
    let template = JSON.stringify({
      "templateID": "flxSegPersonalizeStrategyOLB",
      "microAppName": "PortfolioManagementMA"
    });
    let configParam = {
      "serviceParameters": {},
      "dataMapping": {
        "segListDetail": {
          "segmentMasterData": "${CNTX.segData}",
          "segmentUI": {
            "rowTemplate": {
              //segment widget mapping
              "lblSegment": "${segmentMasterData.assetName}",
              "lblRecommended": "${segmentMasterData.weight1}",
              "lblTarget": "${segmentMasterData.weight2}"
            }
          }
        }
      },
      "rowTemplateConfig": template,
      "headerTemplateConfig": ""
    };
    this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxAckMain.flxStrategy.flxSegment.segList.setConfigsFromParent(configParam);
    this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxAckMain.flxStrategy.flxSegment.segList.updateContext(data);

    this.view.formTemplate12.flxContentTCCenter.lblPercentage2.text = applicationManager.getNavigationManager().getCustomInfo('personalizedWeight');

  },


  onFormTouchEnd : function(){
    var currFormObj = kony.application.getCurrentForm();
    if (currFormObj.customheadernew.flxContextualMenu.isVisible === true) {
      setTimeout(function() {
        currFormObj.customheadernew.flxContextualMenu.setVisibility(false);
        currFormObj.customheadernew.flxTransfersAndPay.skin = ViewConstants.SKINS.BLANK_SKIN_TOPMENU;
        currFormObj.customheadernew.imgLblTransfers.text = "O";
      }, "17ms")
    }
  }
}
});
