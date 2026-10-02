/* eslint-disable */
define(['./SuitabilityProfileBusinessController'],function(SuitabilityProfileBusinessController) {
  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
//       flag: false;
     this.businessController = new SuitabilityProfileBusinessController();
      this.context = {};
    },
    //Logic for getters/setters of custom properties
     initGettersSetters: function() {
            defineGetter(this, 'servicecall', () => {
                return this._servicecall;
            });
            defineSetter(this, 'servicecall', value => {
                this._servicecall = value;
            });
        },
    
    
           setBtnTwo: function(isPermission){
        
          this.view.btnRisk.isVisible = isPermission;
       
       
        
      },

    
    setContext: function (context) {
      this.view.btnRisk.onClick = this.navRiskAppetite;
      var scope = this;
      try {
        this.context = context;
        this.businessController.fetchDetails(this._servicecall.ServiceName,this._servicecall.OperationName,this._servicecall.ObjectName,this.context,this.onServiceSuccess,this.onError);
      } catch (err) {
        scope.setError(err, "setContext");
      }
    },
    navRiskAppetite : function(){
      var navManager = applicationManager.getNavigationManager();
      new kony.mvc.Navigation({
        "appName" : "PortfolioManagementMA",
        "friendlyName": "frmIntroRiskAppetite"
      }).navigate();
    },

    onServiceSuccess: function(response) {
     this.view.lblDate.text = response.expiryDate;
      if(response.isValid === "true"){
       this.view.imgValid.src =  "correct.png";
        this.view.lblValid.text = response.message;
		this.view.lblExpires.text =kony.i18n.getLocalizedString("i18n.wealth.expiresWithColon");//WIW-458 - padmasris
      }else{
         this.view.imgValid.src = "info.png";
         this.view.lblValid.text = response.message;
		 this.view.lblExpires.text =kony.i18n.getLocalizedString("i18n.wealth.expiredWithColon");//IW-3978 - bharath
      }
      
    },
    setError: function (errorMsg, method) {
      let errorObj = {
        "level": "ComponentViewController",
        "method": method,
        "error": errorMsg
      };
      this.onError(errorObj);
    },
    onError: function(err) {
      kony.print(JSON.stringify(err));
    },
        resizeComponent: function(absHeight, segLength){
          var scope = this;
          scope.view.flxMain.height = absHeight;
          scope.view.flxMain.forceLayout();
        }

  };
});