define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onClick defined for btnYes **/
    AS_Button_df81df32f9514ce58f354101a9fcefa0: function AS_Button_df81df32f9514ce58f354101a9fcefa0(eventobject) {
        var self = this;
        this.btnYesTakeSurvey();
    },
    /** onClick defined for btnNo **/
    AS_Button_jf17ecbdccfd41f9841f325d647290ae: function AS_Button_jf17ecbdccfd41f9841f325d647290ae(eventobject) {
        var self = this;
        this.btnNoTakeSurvey();
    },
    /** onClick defined for flxCross **/
    AS_FlexContainer_eb49eed0e1174a8a959dff0b5b3f0c16: function AS_FlexContainer_eb49eed0e1174a8a959dff0b5b3f0c16(eventobject) {
        var self = this;
        this.onFeedbackCrossClick();
    },
    /** preShow defined for frmUserCreationSuccess **/
    AS_Form_c370bc46ee44491d9407cde5518ada44: function AS_Form_c370bc46ee44491d9407cde5518ada44(eventobject) {
        var self = this;
        this.preShow();
    },
    /** onBreakpointChange defined for frmUserCreationSuccess **/
    AS_Form_c3e9b3cd0e7248f5849418c1473ccf2f: function AS_Form_c3e9b3cd0e7248f5849418c1473ccf2f(eventobject, breakpoint) {
        var self = this;
        return self.onBreakpointChange.call(this, breakpoint);
    },
    /** onTouchEnd defined for frmUserCreationSuccess **/
    AS_Form_ca723bacd47543ae8edafbfa0b3e1be1: function AS_Form_ca723bacd47543ae8edafbfa0b3e1be1(eventobject, x, y) {
        var self = this;
        hidePopups();
    },
    /** init defined for frmUserCreationSuccess **/
    AS_Form_da48cb1970b8420d85a896a350c8fc49: function AS_Form_da48cb1970b8420d85a896a350c8fc49(eventobject) {
        var self = this;
        this.initActions();
    }
});