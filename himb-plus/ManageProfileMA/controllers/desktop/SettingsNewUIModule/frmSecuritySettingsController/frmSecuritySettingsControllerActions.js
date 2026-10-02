define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onClick defined for btnSecuritySettingsProceed **/
    AS_Button_i8ed8b8cded444fea2a3032f734ba423: function AS_Button_i8ed8b8cded444fea2a3032f734ba423(eventobject) {
        var self = this;
        var self = this;
        self.view.flxErrorEditSecuritySettings.setVisibility(false);
        var SettingsNewUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
            "moduleName": "SettingsNewUIModule",
            "appName": "ManageProfileMA"
        });
        SettingsNewUIModule.presentationController.requestOtp(self.onSaveSecurityQuestions());
    },
    /** init defined for frmSecuritySettings **/
    AS_Form_f047a07040f042eaad796a65cddc2a3e: function AS_Form_f047a07040f042eaad796a65cddc2a3e(eventobject) {
        var self = this;
        return self.init.call(this);
    }
});