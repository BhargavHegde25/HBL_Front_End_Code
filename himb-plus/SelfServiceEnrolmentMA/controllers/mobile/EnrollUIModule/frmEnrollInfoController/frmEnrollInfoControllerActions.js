define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    AS_BarButtonItem_a69d71958cbb4350a986670efb4893ef: function AS_BarButtonItem_a69d71958cbb4350a986670efb4893ef(eventobject) {
        var self = this;
        var scope = this;
        var navManager = applicationManager.getNavigationManager();
        navManager.setCustomInfo("flag", scope.myForm);
        var  enrollMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
            "moduleName": "EnrollUIModule",
            "appName": "SelfServiceEnrolmentMA"
        });
        enrollMod.presentationController.resetEnrollObj();
    },
    /** onClick defined for btnRight **/
    AS_Button_bccdd148f545430ba4f819367c5fa246: function AS_Button_bccdd148f545430ba4f819367c5fa246(eventobject) {
        var self = this;
        //var enrollMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("EnrollModule");
        //enrollMod.presentationController.commonFunctionForNavigation("frmLogin");
        //new kony.mvc.Navigation({"appName" : "AuthenticationMA", "friendlyName" : "frmLogin"}).navigate();
    },
    /** init defined for frmEnrollInfo **/
    AS_Form_bf5c991f45a04e8d9a9ac4d4b4405be7: function AS_Form_bf5c991f45a04e8d9a9ac4d4b4405be7(eventobject) {
        var self = this;
        this.onInit();
    }
});