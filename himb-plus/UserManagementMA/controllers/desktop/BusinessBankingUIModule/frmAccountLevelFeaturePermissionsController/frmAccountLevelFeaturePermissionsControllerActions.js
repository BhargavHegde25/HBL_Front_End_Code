define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onClick defined for btnYes **/
    AS_Button_a26dcad059274de5a5035bbd49a06b95: function AS_Button_a26dcad059274de5a5035bbd49a06b95(eventobject) {
        var self = this;
        this.btnYesTakeSurvey();
    },
    /** onClick defined for btnNo **/
    AS_Button_f0a9754b86174606956969274c9a6a05: function AS_Button_f0a9754b86174606956969274c9a6a05(eventobject) {
        var self = this;
        this.btnNoTakeSurvey();
    },
    /** onClick defined for flxCross **/
    AS_FlexContainer_h04c924873e6483193fdf531b4763399: function AS_FlexContainer_h04c924873e6483193fdf531b4763399(eventobject) {
        var self = this;
        this.onFeedbackCrossClick();
    },
    /** onBreakpointChange defined for frmAccountLevelFeaturePermissions **/
    AS_Form_bdac722fba4a47ffb2b403db0e97ea92: function AS_Form_bdac722fba4a47ffb2b403db0e97ea92(eventobject, breakpoint) {
        var self = this;
        return self.onBreakpointChange.call(this, breakpoint);
    },
    /** init defined for frmAccountLevelFeaturePermissions **/
    AS_Form_cadc4801326c4db097e8f34f95d8d706: function AS_Form_cadc4801326c4db097e8f34f95d8d706(eventobject) {
        var self = this;
        this.initActions();
    },
    /** preShow defined for frmAccountLevelFeaturePermissions **/
    AS_Form_g2c94fd3ce9b48f9ae417929ad0d123a: function AS_Form_g2c94fd3ce9b48f9ae417929ad0d123a(eventobject) {
        var self = this;
        this.preShow();
    }
});