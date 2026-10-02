define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    AS_BarButtonItem_eedc52fa13ee44ca8d9d72e93bcf7e09: function AS_BarButtonItem_eedc52fa13ee44ca8d9d72e93bcf7e09(eventobject) {
        var self = this;
        this.navBack();
    },
    AS_BarButtonItem_g63d9831d55a4de886e1d37019ce8d67: function AS_BarButtonItem_g63d9831d55a4de886e1d37019ce8d67(eventobject) {
        var self = this;
        if (this.view.flxMainContainer.setVisibility) {
            this.navBack();
        } else {
            this.view.activateProfile.navigateToScreen(1);
        }
    },
    /** onClick defined for btnRight **/
    AS_Button_bccdd148f545430ba4f819367c5fa246: function AS_Button_bccdd148f545430ba4f819367c5fa246(eventobject) {
        var self = this;
        //var enrollMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("EnrollModule");
        //enrollMod.presentationController.commonFunctionForNavigation("frmLogin");
        //new kony.mvc.Navigation({"appName" : "AuthenticationMA", "friendlyName" : "frmLogin"}).navigate();
    },
    /** preShow defined for frmEnrollActivateProfile **/
    AS_Form_cc03c790c039457284764371625ed0b8: function AS_Form_cc03c790c039457284764371625ed0b8(eventobject) {
        var self = this;
        return self.frmEnrollActivateProfilePreShow.call(this);
    },
    /** onNavigate defined for frmEnrollActivateProfile **/
    onNavigate: function AS_Form_e80726659a43464dbc248385f8bcac1b(eventobject) {
        var self = this;
        this.view.customHeader.btnRight.info = eventobject;
    }
});