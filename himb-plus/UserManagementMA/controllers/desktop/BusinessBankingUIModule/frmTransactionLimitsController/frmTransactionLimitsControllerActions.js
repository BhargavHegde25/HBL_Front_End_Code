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
    /** init defined for frmTransactionLimits **/
    AS_Form_a28958fe5b9b46b58983d80320cd061b: function AS_Form_a28958fe5b9b46b58983d80320cd061b(eventobject) {
        var self = this;
        this.initActions();
    },
    /** onDeviceBack defined for frmTransactionLimits **/
    AS_Form_a458f3b12f5549d38427dac37c15b3c5: function AS_Form_a458f3b12f5549d38427dac37c15b3c5(eventobject) {
        var self = this;
        kony.print("Back Button Pressed");
    },
    /** onBreakpointChange defined for frmTransactionLimits **/
    AS_Form_d91d5f4944b440b3958432a43f927677: function AS_Form_d91d5f4944b440b3958432a43f927677(eventobject, breakpoint) {
        var self = this;
        return self.onBreakpointChange.call(this, breakpoint);
    },
    /** preShow defined for frmTransactionLimits **/
    AS_Form_e30f5bb8b2f740c28985b7e6c6f6a853: function AS_Form_e30f5bb8b2f740c28985b7e6c6f6a853(eventobject) {
        var self = this;
        this.preShow();
    },
    /** postShow defined for frmTransactionLimits **/
    AS_Form_g6488fddbb5a4d51b9749179c345ee18: function AS_Form_g6488fddbb5a4d51b9749179c345ee18(eventobject) {
        var self = this;
        this.postShow();
    }
});