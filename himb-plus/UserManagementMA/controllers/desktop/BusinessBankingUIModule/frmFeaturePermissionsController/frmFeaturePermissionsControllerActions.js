define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onClick defined for btnYes **/
    AS_Button_ae124fc7e0f7420d8fe0818bc5c5d9c9: function AS_Button_ae124fc7e0f7420d8fe0818bc5c5d9c9(eventobject) {
        var self = this;
        this.btnYesTakeSurvey();
    },
    /** onClick defined for btnNo **/
    AS_Button_f047a3f977a8401a87cbc1297a9a3e64: function AS_Button_f047a3f977a8401a87cbc1297a9a3e64(eventobject) {
        var self = this;
        this.btnNoTakeSurvey();
    },
    /** onClick defined for flxCross **/
    AS_FlexContainer_gc85593b4dca4a4291b48e96d99d1fab: function AS_FlexContainer_gc85593b4dca4a4291b48e96d99d1fab(eventobject) {
        var self = this;
        this.onFeedbackCrossClick();
    },
    /** onBreakpointChange defined for frmFeaturePermissions **/
    AS_Form_b7df112c8e1a4dc485ed16e674e9e35e: function AS_Form_b7df112c8e1a4dc485ed16e674e9e35e(eventobject, breakpoint) {
        var self = this;
        return self.onBreakpointChange.call(this, breakpoint);
    },
    /** preShow defined for frmFeaturePermissions **/
    AS_Form_bae15d6d36ec44f9b6a21a368b3a4edb: function AS_Form_bae15d6d36ec44f9b6a21a368b3a4edb(eventobject) {
        var self = this;
        this.preShow();
    },
    /** postShow defined for frmFeaturePermissions **/
    AS_Form_dc4100ba6c96467a850c8e07c99955b9: function AS_Form_dc4100ba6c96467a850c8e07c99955b9(eventobject) {
        var self = this;
        this.postShow();
    },
    /** onDeviceBack defined for frmFeaturePermissions **/
    AS_Form_gde7e6480aaf4835859363840657c09a: function AS_Form_gde7e6480aaf4835859363840657c09a(eventobject) {
        var self = this;
        kony.print("Back Button Pressed");
    },
    /** init defined for frmFeaturePermissions **/
    AS_Form_j3a34e5d554041e9b9260bda8345205c: function AS_Form_j3a34e5d554041e9b9260bda8345205c(eventobject) {
        var self = this;
        this.initActions();
    }
});