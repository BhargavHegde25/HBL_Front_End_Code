define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onClick defined for btnYes **/
    AS_Button_c3acaf66900f46aa8d7f6301a73b1a5d: function AS_Button_c3acaf66900f46aa8d7f6301a73b1a5d(eventobject) {
        var self = this;
        this.btnYesTakeSurvey();
    },
    /** onClick defined for btnNo **/
    AS_Button_haacf2bd9d8c4417b053f825e7b4f161: function AS_Button_haacf2bd9d8c4417b053f825e7b4f161(eventobject) {
        var self = this;
        this.btnNoTakeSurvey();
    },
    /** onClick defined for flxCross **/
    AS_FlexContainer_aae36bd4a8754bfaaaadc481e0986509: function AS_FlexContainer_aae36bd4a8754bfaaaadc481e0986509(eventobject) {
        var self = this;
        this.onFeedbackCrossClick();
    },
    /** init defined for frmUpdatePermissionsInBulk **/
    AS_Form_a2e829c4edbe44c5b054b552e5c646d2: function AS_Form_a2e829c4edbe44c5b054b552e5c646d2(eventobject) {
        var self = this;
        this.initActions();
    },
    /** onTouchEnd defined for frmUpdatePermissionsInBulk **/
    AS_Form_c5226b39c41d4b4e8ce74a1d4cc9b05d: function AS_Form_c5226b39c41d4b4e8ce74a1d4cc9b05d(eventobject, x, y) {
        var self = this;
        hidePopups();
    },
    /** onBreakpointChange defined for frmUpdatePermissionsInBulk **/
    AS_Form_ed377e97c2b447baba80462f1f1cf2fe: function AS_Form_ed377e97c2b447baba80462f1f1cf2fe(eventobject, breakpoint) {
        var self = this;
        return self.onBreakpointChange.call(this, breakpoint);
    },
    /** preShow defined for frmUpdatePermissionsInBulk **/
    AS_Form_f0b08b08a6fc4fdca8566537a88f78a0: function AS_Form_f0b08b08a6fc4fdca8566537a88f78a0(eventobject) {
        var self = this;
        this.preShow();
    }
});