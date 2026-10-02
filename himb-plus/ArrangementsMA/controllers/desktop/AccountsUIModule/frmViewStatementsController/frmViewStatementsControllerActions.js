define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onTouchEnd defined for frmViewStatements **/
    AS_Form_a556ff33d54a4d87b90c7e122318a300: function AS_Form_a556ff33d54a4d87b90c7e122318a300(eventobject, x, y) {
        var self = this;
        hidePopups();
    },
    /** postShow defined for frmViewStatements **/
    AS_Form_aae97ff7c78e4c6d97d9e58ac69b6bd0: function AS_Form_aae97ff7c78e4c6d97d9e58ac69b6bd0(eventobject) {
        var self = this;
        this.postShowFrmAccountDetails();
    },
    /** preShow defined for frmViewStatements **/
    AS_Form_ccb2f9b5921a452d80df9237ee3af1d0: function AS_Form_ccb2f9b5921a452d80df9237ee3af1d0(eventobject) {
        var self = this;
        this.preshowFrmAccountDetails();
    },
    /** init defined for frmViewStatements **/
    AS_Form_dd401fa4e6c84690bb190bdadd036569: function AS_Form_dd401fa4e6c84690bb190bdadd036569(eventobject) {
        var self = this;
        this.initFrmAccountDetails();
    },
    /** onBreakpointChange defined for frmViewStatements **/
    AS_Form_j18e2b65860a41a2b0aab4c8d91fcfd3: function AS_Form_j18e2b65860a41a2b0aab4c8d91fcfd3(eventobject, breakpoint) {
        var self = this;
        this.onBreakpointChange(breakpoint);
    },
    /** onDeviceBack defined for frmViewStatements **/
    AS_Form_jf394542d18e43f3aea460e011e693b9: function AS_Form_jf394542d18e43f3aea460e011e693b9(eventobject) {
        var self = this;
        //Have to Consolidate
        kony.print("Back Button Pressed");
    }
});