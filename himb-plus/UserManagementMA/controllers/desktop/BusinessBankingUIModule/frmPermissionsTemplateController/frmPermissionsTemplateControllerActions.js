define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onClick defined for btnNo **/
    AS_Button_bfa946591aa44f0bb8805395f57c2f77: function AS_Button_bfa946591aa44f0bb8805395f57c2f77(eventobject) {
        var self = this;
        this.btnNoTakeSurvey();
    },
    /** onClick defined for btnYes **/
    AS_Button_jaa860a95c814d1584a783bca4c87293: function AS_Button_jaa860a95c814d1584a783bca4c87293(eventobject) {
        var self = this;
        this.btnYesTakeSurvey();
    },
    /** onClick defined for flxCross **/
    AS_FlexContainer_eaa803b31ae9427da2caea5955095a30: function AS_FlexContainer_eaa803b31ae9427da2caea5955095a30(eventobject) {
        var self = this;
        this.onFeedbackCrossClick();
    },
    /** postShow defined for frmPermissionsTemplate **/
    AS_Form_adfa8b4914f04b5383eddea811e493d6: function AS_Form_adfa8b4914f04b5383eddea811e493d6(eventobject) {
        var self = this;
        this.postShow();
    },
    /** init defined for frmPermissionsTemplate **/
    AS_Form_ca732a97ad7e4a0bb5fe8cb068357774: function AS_Form_ca732a97ad7e4a0bb5fe8cb068357774(eventobject) {
        var self = this;
        this.initActions();
    },
    /** onTouchEnd defined for frmPermissionsTemplate **/
    AS_Form_e5ea3b040f85462298efdca2cac027f1: function AS_Form_e5ea3b040f85462298efdca2cac027f1(eventobject, x, y) {
        var self = this;
        hidePopups();
    },
    /** preShow defined for frmPermissionsTemplate **/
    AS_Form_f28e161f6ad74d54955a0ea1adc31d62: function AS_Form_f28e161f6ad74d54955a0ea1adc31d62(eventobject) {
        var self = this;
        this.preShow();
    },
    /** onBreakpointChange defined for frmPermissionsTemplate **/
    AS_Form_h1d3e39a359a41979c7bc150bec9b3d3: function AS_Form_h1d3e39a359a41979c7bc150bec9b3d3(eventobject, breakpoint) {
        var self = this;
        return self.onBreakpointChange.call(this, breakpoint);
    }
});