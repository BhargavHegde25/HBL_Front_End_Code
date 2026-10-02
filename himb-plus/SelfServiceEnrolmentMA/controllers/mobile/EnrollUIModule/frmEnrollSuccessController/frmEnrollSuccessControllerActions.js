define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    AS_BarButtonItem_j54e81e8e5214dd29eb2de35853628de: function AS_BarButtonItem_j54e81e8e5214dd29eb2de35853628de(eventobject) {
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
    AS_Button_ic09e542654945f3b8587fbcd38d0ebd: function AS_Button_ic09e542654945f3b8587fbcd38d0ebd(eventobject) {
        var self = this;
        //var enrollMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("EnrollModule");
        //enrollMod.presentationController.commonFunctionForNavigation("frmLogin");
        //new kony.mvc.Navigation({"appName" : "AuthenticationMA", "friendlyName" : "frmLogin"}).navigate();
    },
    /** init defined for frmEnrollSuccess **/
    AS_Form_e1e41c288506444bbbaef9b03561c463: function AS_Form_e1e41c288506444bbbaef9b03561c463(eventobject) {
        var self = this;
        this.onInit();
    }
});