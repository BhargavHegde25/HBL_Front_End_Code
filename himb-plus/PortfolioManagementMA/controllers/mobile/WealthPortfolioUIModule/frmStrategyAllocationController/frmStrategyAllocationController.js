define([],function(){

//Type your controller code here
return{
onNavigate: function()
{
this.view.preShow= this.preShow;
this.view.postShow= this.postShow;

      
},
initActions: function(){
this.view.customHeader.flxBack.onTouchEnd= this.navigateCustomBack;
},
navigateCustomBack: function() {
var navMan = applicationManager.getNavigationManager();
navMan.navigateTo("frmPortfolioDetails");
},
preShow: function(){
  try{
if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
   this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("i18n.wealth.reviewStrategy");
 this.view.title = kony.i18n.getLocalizedString("i18n.wealth.reviewStrategy");
  this.view.flxHeader.isVisible = false;
} else {
this.view.flxHeader.isVisible = true;

}
   this.initActions();
  
  this.checkPermissions();
}catch(err) {
        this.setError(err, "preShow");
      } 
},
  
checkPermissions: function(){
  try{
        var configManager =  applicationManager.getConfigurationManager();
           var checkUserPermission = function (permission) {
            return applicationManager.getConfigurationManager().checkUserPermission(permission);
          }
        
             var checkFeature = function (feature) {
            return applicationManager.getConfigurationManager().checkUserFeature(feature);
          }
        	
  			var isMyStrategyView = applicationManager.getConfigurationManager().checkUserPermission("MY_STRATEGY_VIEW");
  			var isMyStrategyChangeStrategyView = applicationManager.getConfigurationManager().checkUserPermission("MY_STRATEGY_CHANGE_STRATEGY_VIEW");
  			var isRecommendedStrategyView = applicationManager.getConfigurationManager().checkUserPermission("RECOMMENDED_STRATEGY_VIEW");
  			var isRecommendedStrategyUseStrategyView = applicationManager.getConfigurationManager().checkUserPermission("RECOMMENDED_STRATEGY_USE_VIEW");
  			var isSuitabilityProfileView = applicationManager.getConfigurationManager().checkUserPermission("SUITABILITY_PROFILE_VIEW");
  			var isSuitabilityProfileReviewView = applicationManager.getConfigurationManager().checkUserPermission("SUITABILITY_PROFILE_REVIEW_VIEW");
  			var isStrategyAllocationView = applicationManager.getConfigurationManager().checkUserPermission("STRATEGY_ALLOCATION_VIEW");
        var isPersonalizeStrategy = applicationManager.getConfigurationManager().checkUserPermission("STRATEGY_ALLOCATION_PERSONALIZE");
  			
        let self = this;
  
  			self.view.flxMyStrategy.isVisible = isMyStrategyView;
  			self.view.flxRecommendedStrategy.isVisible = isRecommendedStrategyView;
  			self.view.flxSuitabilityProfile.isVisible = isSuitabilityProfileView;
  			self.view.flxStrategyAllocation.isVisible = isStrategyAllocationView;
  	        
        self.view.strategyAllocation.setPersonalizeStrategyBtn(isPersonalizeStrategy);
  			self.view.myStrategyCard.hideFlex(isMyStrategyChangeStrategyView);
  			self.view.myRecommendedStrategyNew.hideFlex(isRecommendedStrategyUseStrategyView);
  			self.view.RiskProfiling.hideFlex(isSuitabilityProfileReviewView);
    }catch(err) {
        this.setError(err, "checkPermissions");
      } 
},
  
postShow: function(){
try{
      debugger; // eslint-disable-line no-debugger
      var reqParams = {
        "portfolioId": applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portfolioId,
        "portfolioServiceType": "Advisory"
      } ;
      this.view.myStrategyCard.setContext(reqParams,this.navigateToChangeStrategy);
      this.view.myRecommendedStrategyNew.setData(reqParams);
      this.view.RiskProfiling.setContext(reqParams, this.navigateToReview);
      this.view.strategyAllocation.setContext(reqParams);
      
      this.view.myRecommendedStrategyNew.onClickChooseStrategy = function(){
      var navMan = applicationManager.getNavigationManager();
      navMan.navigateTo("frmRecommendedStrategy");
    };
  }catch(err) {
        this.setError(err, "postShow");
      } 

},
  navigateToReview:function(){
    try{
    var navManager = applicationManager.getNavigationManager();
            new kony.mvc.Navigation({
                "appName": "PortfolioManagementMA",
                "friendlyName": "frmReviewSuitability"
            }).navigate();
      }catch(err) {
        this.setError(err, "navigateToReview");
      } 
  },
navigateToChangeStrategy:function(){
  try{
    var navManager = applicationManager.getNavigationManager();
            new kony.mvc.Navigation({
                "appName": "PortfolioManagementMA",
                "friendlyName": "frmChangeStrategy"
            }).navigate();
    }catch(err) {
        this.setError(err, "navigateToChangeStrategy");
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

};

});