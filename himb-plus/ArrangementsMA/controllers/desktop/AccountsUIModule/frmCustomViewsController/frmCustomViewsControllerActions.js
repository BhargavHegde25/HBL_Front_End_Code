define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** preShow defined for frmCustomViews **/
    AS_Form_a200d61062584e018259e9afb4d8db97: function AS_Form_a200d61062584e018259e9afb4d8db97(eventobject) {
        var self = this;
        this.preShow();
    },
    /** postShow defined for frmCustomViews **/
    AS_Form_b02a19b40b304f36b28d55c110e4410e: function AS_Form_b02a19b40b304f36b28d55c110e4410e(eventobject) {
        var self = this;
        this.postShow();
    },
    /** onBreakpointChange defined for frmCustomViews **/
    AS_Form_b11bb57ff53a40dc9eda290ecf13139d: function AS_Form_b11bb57ff53a40dc9eda290ecf13139d(eventobject, breakpoint) {
        var self = this;
        this.onBreakpointChange(breakpoint);
    },
    /** init defined for frmCustomViews **/
    AS_Form_b8ffb19db7b34c69a7100497900a39f5: function AS_Form_b8ffb19db7b34c69a7100497900a39f5(eventobject) {
        var self = this;
        this.init();
    },
    /** onDeviceBack defined for frmCustomViews **/
    AS_Form_d6d14b7d90ac42359ca1b54b4ec66343: function AS_Form_d6d14b7d90ac42359ca1b54b4ec66343(eventobject) {
        var self = this;
        kony.print("Back Button is clicked");
    },
    /** onTouchEnd defined for frmCustomViews **/
    AS_Form_h269d1b058734236b3e770e1298f0644: function AS_Form_h269d1b058734236b3e770e1298f0644(eventobject, x, y) {
        var self = this;
        hidePopups();
    }
});