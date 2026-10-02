/* eslint-disable */
define(function() {

	return {

      init:function(){
        this.view.flxinfo.onClick = this.ShowInfovisibility;
        this.view.flxInfoNoAdv.onTouchEnd = this.ShowInfovisibility;
        this.view.InfoIconInvestmentProposal.flxCross.onClick = this.HideInfovisibility;
        this.view.btnPastProposal.onClick = this.navigatetoPastProposal;
        this.view.btnReviewNew.onClick = this.navigatetoReviewNew;
        this.view.btnNoAdvPastProposal.onClick = this.navigatetoPastProposal;
      },
      
      setData:function(response){
         this.isRTL = scope_WealthPresentationController.rtlLocale.includes(kony.i18n.getCurrentLocale());
		  
        this.view.flxInvestmentInfo.setVisibility(false);
        var navManager = applicationManager.getNavigationManager();
        var rejectProposal = navManager.getCustomInfo('isProposalRejected');
        navManager.setCustomInfo('isProposalRejected', undefined);
		  //this.view.imgAdvice.src = "imgnewadvice.png";
		  this.view.imgInfo.src = "group_10_copy_4.png";
		  this.view.imgNoAdvInfo.src = "group_10_copy_4.png";

        if (response) {

          if(response.isNewProp === "true" && !rejectProposal){

            this.view.flxMainNewAdvice.setVisibility(true);
            this.view.flxMainNoAdvice.setVisibility(false);
            if(response.pastProposal !== undefined && response.pastProposal.length !==0 ){
              this.view.btnPastProposal.isVisible= true;
            }else{
              this.view.btnPastProposal.isVisible= false;
            }
          }
          else
          {
            this.view.flxMainNewAdvice.setVisibility(false);
            this.view.flxMainNoAdvice.setVisibility(true);
            if(response.pastProposal !== undefined && response.pastProposal.length !==0 ){
              this.view.btnNoAdvPastProposal.isVisible= true;
			  this.view.lblNoAdvice.text = kony.i18n.getLocalizedString("i18n.wealth.reviewPastProposalsHere");
            }else{
              this.view.btnNoAdvPastProposal.isVisible= false;
			  this.view.lblNoAdvice.text = kony.i18n.getLocalizedString("i18n.wealth.noNewAdviceContent");
            }
           /* if (rejectProposal === true) {
              this.view.lblNoAdvice.text = "You can review past proposals here.";
            } else {
              this.view.lblNoAdvice.text = kony.i18n.getLocalizedString("i18n.wealth.noNewAdviceContent");
            }*/
          }
        }
      },
      
      navigatetoPastProposal:function(){
        var navManager = applicationManager.getNavigationManager();
        navManager.navigateTo("frmPastProposal");
      },
	  
	  navigatetoReviewNew:function(){
        var navManager = applicationManager.getNavigationManager();
        navManager.navigateTo("frmInvestmentProposal");
      },
      
      ShowInfovisibility:function(){
        this.view.imgInfo.src = "bluealert_2.png";
        this.view.imgNoAdvInfo.src = "bluealert_2.png";
        this.view.flxInvestmentInfo.setVisibility(true);
      },
      
      HideInfovisibility:function(){
        this.view.imgInfo.src = "group_10_copy_4.png";
        this.view.imgNoAdvInfo.src = "group_10_copy_4.png";
        this.view.flxInvestmentInfo.setVisibility(false);
      }
      
      
	};
});