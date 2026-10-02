define({


  onNavigate: function(){
	this.view.preShow = this.preShow;
    this.initActions();
  },
  initActions: function(){
    try{
    this.view.customHeader.flxSearch.onClick = this.onClickFlexPopup;
    this.view.flxCancel.onClick = this.onClickCancel;
    this.view.btnReviewStrategy.onClick = this.navigateStrategyAllocation;
    this.view.btnPersonalStrategy.onClick = this.navPersonalizedStrategy;
    this.view.lblActiveStatus.text = kony.i18n.getLocalizedString("i18n.wealth.strategy.userCurrentStrategy") + "Individual";
      }catch(err) {
        this.setError(err, "initActions");
      }
  },

  preShow: function() 
  {
    try{
    //var navManager = applicationManager.getNavigationManager();
    //var response = navManager.getCustomInfo('frmRecommendedStrategy');
    //this.view.lblActiveStatus.text = "Your recommended strategy is" + " " +  response.recStrategyName  + " " ;
    if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
      this.view.flxHeader.setVisibility(false);
    }
    if (kony.i18n.getCurrentLocale() === "ar_AE"){
      this.view.customHeader.lblLocateUs.right = "43%";
    }else{
      this.view.customHeader.lblLocateUs.left = "30%";
    }
    this.view.imgConfirmation.src = (kony.theme.getCurrentTheme() === "darkTheme") ? 'success_ack_dark.png' : 'greentickack.png';
       }catch(err) {
        this.setError(err, "preShow");
      }
  },  

  navigateStrategyAllocation: function()
  {
    var navMan = applicationManager.getNavigationManager();     
    navMan.navigateTo("frmStrategyAllocation");
  },
  navPersonalizedStrategy: function()
  {
    var navMan = applicationManager.getNavigationManager();     
    navMan.navigateTo("frmPersonalizeStrategy");
  },

  onClickFlexPopup: function()
  {
    /*
    this.view.flxAdditionalOptions.isVisible = true;
    this.view.btnReviewStrategy.isVisible= false;
    */
  },

  onClickCancel: function()
  {
    this.view.flxAdditionalOptions.isVisible = false;  
    this.view.btnReviewStrategy.isVisible= true;
  },
  /**
	* @api : setError
	* triggered as a error call back for any service
    * @arg1: errorMsg {String} - error message
    * @arg2: method {String} - method from which error message is received
	* @return : NA
	*/
    setError: function(errorMsg, method) {
      var scope = this;
      var errorObj = {
        "method" : method,
        "error": errorMsg
      };
      var wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
        wealthModule.onError(errorObj);
    }

});