define({ 
 init : function(){
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },
  preShow:function(){
  try{
    if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
      this.view.flxHeader.isVisible = true;
    }
    else{
      this.view.flxHeader.isVisible = false;
    }
   var navManager = applicationManager.getNavigationManager();
   var activityDetail = navManager.getCustomInfo("frmActivityDetails");
   var actDetail=activityDetail.details;
    this.setDataToSegment(actDetail);
    this.initActions();
    }catch(err){
      this.setError(err, "preShow");
    }
  },
  initActions:function(){
    try{
      this.view.customHeader.flxBack.onTouchEnd = this.onBack;
    }catch(err){
      this.setError(err, "initActions");
    }
  },
  onBack : function () {
    try{
      var navMan = applicationManager.getNavigationManager();
      navMan.navigateTo("frmAccounts");
    }catch(err){
      this.setError(err, "onBack");
    }
  },

setDataToSegment:function(activityDetail){
    try{
  var result = [];
for(var i in activityDetail){
let temp = {
name : kony.i18n.getLocalizedString(i),
value: activityDetail[i]
};
result.push(temp);
}
 var currForm = kony.application.getCurrentForm();
 var segData = [];
      for(var list in result){	
        var storeData;
        storeData = {
          name: result[list].name,
          value: result[list].value
        };
        segData.push(storeData);
      }

      this.view.segActivityDetail.widgetDataMap = {
        lblName: "name",
        lblValue: "value"
      };		
      this.view.segActivityDetail.setData(segData);
      currForm.forceLayout(); 
    }catch(err){
      this.setError(err, "setDataToSegment");
    }
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
