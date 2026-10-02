define({ 
preShow: function(){
     if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
       this.view.flxHeader.isVisible = false;
       this.view.flxBody.top ="5dp";
       }else{
         this.view.flxHeader.isVisible = true;
       this.view.flxBody.top ="58dp";
       }
},
postShow: function(){
	var navMan = applicationManager.getNavigationManager();
       var consentDetails = navMan.getCustomInfo("consentDetail");
       this.view.lblAmountValue.text=consentDetails.amountValue;
       this.view.lblCardTypevalues.text=consentDetails.note;
},

 });