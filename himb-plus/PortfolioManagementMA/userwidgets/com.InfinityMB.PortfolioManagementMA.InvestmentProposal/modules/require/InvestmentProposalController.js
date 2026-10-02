/* eslint-disable */
define(function() {

  return {
    postShow:function(){
      this.view.btnPast.onClick = this.navigatetoPastProposal;
      this.view.btnNew.onClick = this.navigateToNewProposal;
      this.view.btnPastProposal.onClick = this.navigatetoPastProposal;
      this.view.flxInfoButton.onTouchEnd = this.infoPopup;
      this.view.flxInfoButton1.onTouchEnd = this.infoPopup;
    },

    setComponentUI :function (response){
      try{
      var navManager = applicationManager.getNavigationManager();
      var rejectProposal =  navManager.getCustomInfo('isProposalRejected');
      navManager.setCustomInfo('isProposalRejected', undefined);

      if(response.isNewProp === "true" && !rejectProposal){
        this.view.flxNewAdvice.setVisibility(true);
        this.view.flxNoAdvice.setVisibility(false);
        if(response.pastProposal !== undefined && response.pastProposal.length !==0){
          this.view.btnPast.isVisible = true;
        }else{
          this.view.btnPast.isVisible = false;
        }
      }
      else
      {
        this.view.flxNewAdvice.setVisibility(false);
        this.view.flxNoAdvice.setVisibility(true);
         if(response.pastProposal !== undefined && response.pastProposal.length !==0){
          this.view.btnPastProposal.isVisible = true;
		  this.view.lblAdvice1.text = kony.i18n.getLocalizedString("i18n.wealth.reviewPastProposalsHere");
        }else{
          this.view.btnPastProposal.isVisible = false;
		   this.view.lblAdvice1.text = kony.i18n.getLocalizedString("i18n.wealth.noNewAdviceContent");  
        }
       /* if(rejectProposal === true)
        {
          this.view.lblAdvice1.text = "You can review past proposals here.";
        }
        else
        {
          this.view.lblAdvice1.text = kony.i18n.getLocalizedString("i18n.wealth.noNewAdviceContent");
        }*/
      }
        } catch(err) {
        this.setError(err, "setComponentUI");
      }     
    },
    
    infoPopup : function (){
      try{
      let scope = this;
      this.view.imgInfo.src = "group_10_copy_4.png";
      this.view.imgInfo1.src = "group_10_copy_4.png";
      var basicProperties =
          {
            "message": kony.i18n.getLocalizedString("i18n.wealth.strategy.infoInvestmentProposal"),
            "alertType": constants.ALERT_TYPE_INFO,
            "alertTitle": kony.i18n.getLocalizedString("i18n.wealth.investmentProposal"),
            "noLabel": "",
            "yesLabel": kony.i18n.getLocalizedString("kony.mb.common.close"),
            "alertIcon": "",
            "alertHandler": function(response) {
              scope.view.imgInfo.src = "group_10_copy_4.png";
              scope.view.imgInfo1.src = "group_10_copy_4.png";
            }
          };
      var pspConfig = {
        "contentAlignment": constants.ALERT_CONTENT_ALIGN_CENTER
      };

      applicationManager.getPresentationUtility().showAlertMessage(basicProperties, pspConfig);
   } catch(err) {
        this.setError(err, "infoPopup");
      }     
      },

    navigatetoPastProposal:function(){
      var navManager = applicationManager.getNavigationManager();
      navManager.navigateTo("frmPastProposal");
    },

    navigateToNewProposal : function(){
      var navManager = applicationManager.getNavigationManager();
      navManager.navigateTo("frmReviewNewProposal");
    },
    setError: function(errorMsg, method) {
      var scope = this;
      var errorObj = {
        "level" : "ComponentController",
        "method" : method,
        "error": errorMsg
      };
	
	scope.onErrorMain(errorObj);
    },
    onErrorMain:function(err){
      kony.print(JSON.stringify(err));
    }

  };
});