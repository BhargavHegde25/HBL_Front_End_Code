define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    AS_BarButtonItem_ee39ceb271d84cbda1e129aee7b24a15: function AS_BarButtonItem_ee39ceb271d84cbda1e129aee7b24a15(eventobject) {
        var self = this;
        this.flxBackOnClick();
    },
    AS_BarButtonItem_f1baa842961747f8a54c81ea895b082e: function AS_BarButtonItem_f1baa842961747f8a54c81ea895b082e(eventobject) {
        var self = this;
        this.flxBackOnClick();
    },
    /** onClick defined for flxPopupfrombottoms **/
    AS_FlexContainer_db784cdd317e4f4e82a2d2e300ebd488: function AS_FlexContainer_db784cdd317e4f4e82a2d2e300ebd488(eventobject) {
        var self = this;

        function _ide_onClick_d484f958c2f44199a4bdeff8fa8f7cec_Callback() {}
        self.view.flxPopupfrombottoms.animate(kony.ui.createAnimation({
            "100": {
                "stepConfig": {
                    "timingFunction": kony.anim.EASE
                }
            }
        }), {
            "delay": 0,
            "iterationCount": 1,
            "fillMode": kony.anim.FILL_MODE_FORWARDS,
            "duration": 0.25
        }, {
            "animationEnd": _ide_onClick_d484f958c2f44199a4bdeff8fa8f7cec_Callback
        });
        this.view.flxPopupfrombottoms.setVisibility(false);
    },
    /** preShow defined for frmFundDomesticTransferMain **/
    AS_Form_a18813aaf09e4d6ca6f7bce4b7e6bbce: function AS_Form_a18813aaf09e4d6ca6f7bce4b7e6bbce(eventobject) {
        var self = this;
        this.preShow();
    },
    /** init defined for frmFundDomesticTransferMain **/
    AS_Form_e2636a2964974b70a9de0e04d7a1485d: function AS_Form_e2636a2964974b70a9de0e04d7a1485d(eventobject) {
        var self = this;
        this.init();
    },
    /** onTouchEnd defined for imgclose **/
    AS_Image_c019c4e862724fb9a644f2175cf6cc27: function AS_Image_c019c4e862724fb9a644f2175cf6cc27(eventobject, x, y) {
        var self = this;
        this.view.flxPopupfrombottoms.setVisibility(false);
    },
    /** onDone defined for txtAmount **/
    AS_TextField_b828b0c96c1f4a2eb2e81e0d033ebf91: function AS_TextField_b828b0c96c1f4a2eb2e81e0d033ebf91(eventobject, changedtext) {
        var self = this;
    },
    /** onTextChange defined for txtAccountholder **/
    AS_TextField_e01dbb9ea17e4a89a8c8b37a33dc25c8: function AS_TextField_e01dbb9ea17e4a89a8c8b37a33dc25c8(eventobject, changedtext) {
        var self = this;
        //this.navigateToVerifyScreen();
    },
    /** onTextChange defined for txtRemarks **/
    AS_TextField_e2241916564d465aa12a2b3b54182ee2: function AS_TextField_e2241916564d465aa12a2b3b54182ee2(eventobject, changedtext) {
        var self = this;
        //this.navigateToVerifyScreen();
    },
    /** onTextChange defined for lblTxtAccNo **/
    AS_TextField_e3ab803857e14e6b90fb2c70f75ae557: function AS_TextField_e3ab803857e14e6b90fb2c70f75ae557(eventobject, changedtext) {
        var self = this;
        //this.navigateToVerifyScreen();
    }
});