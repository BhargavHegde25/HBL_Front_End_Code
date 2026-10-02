define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onClick defined for btnYes **/
    AS_Button_e6227a89fd5e4389bab3617b7c421105: function AS_Button_e6227a89fd5e4389bab3617b7c421105(eventobject) {
        var self = this;
        this.btnYesTakeSurvey();
    },
    /** onClick defined for btnNo **/
    AS_Button_i806e35651e04b1cbdbad15322d6e745: function AS_Button_i806e35651e04b1cbdbad15322d6e745(eventobject) {
        var self = this;
        this.btnNoTakeSurvey();
    },
    /** init defined for frmEnrollBusiness **/
    AS_Form_c3edd1d8b97942a2b8aff4ddb5102ee0: function AS_Form_c3edd1d8b97942a2b8aff4ddb5102ee0(eventobject) {
        var self = this;
        this.initActions();
    },
    /** postShow defined for frmEnrollBusiness **/
    AS_Form_cd0629d79c9640289a9106da94be0e80: function AS_Form_cd0629d79c9640289a9106da94be0e80(eventobject) {
        var self = this;
        this.postShow();
    },
    /** onTouchEnd defined for frmEnrollBusiness **/
    AS_Form_d11489da236d436eb49117357b28928a: function AS_Form_d11489da236d436eb49117357b28928a(eventobject, x, y) {
        var self = this;
        hidePopups();
    },
    /** preShow defined for frmEnrollBusiness **/
    AS_Form_f08124bb5c17467cadf8be4c900593bd: function AS_Form_f08124bb5c17467cadf8be4c900593bd(eventobject) {
        var self = this;
        this.preShow();
    },
    /** onBreakpointChange defined for frmEnrollBusiness **/
    AS_Form_g94abbcb919545d88db8f2d6aba35fa8: function AS_Form_g94abbcb919545d88db8f2d6aba35fa8(eventobject, breakpoint) {
        var self = this;
        return self.onBreakpointChange.call(this, breakpoint);
    }
});