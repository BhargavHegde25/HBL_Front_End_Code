define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    AS_BarButtonItem_c03a570312b9438a988439da4953181e: function AS_BarButtonItem_c03a570312b9438a988439da4953181e(eventobject) {
        var self = this;
        this.flxBackOnClick();
    },
    AS_BarButtonItem_d8f0e18ad40142ee9b7661f02bea5331: function AS_BarButtonItem_d8f0e18ad40142ee9b7661f02bea5331(eventobject) {
        var self = this;
        this.flxBackOnClick();
    },
    /** preShow defined for frmCreditCardBillPayment **/
    AS_Form_f7d7886c777e40c69213dc7dde88062d: function AS_Form_f7d7886c777e40c69213dc7dde88062d(eventobject) {
        var self = this;
        this.preShow();
    },
    /** onTouchEnd defined for imgclosePopup **/
    AS_Image_c019c4e862724fb9a644f2175cf6cc27: function AS_Image_c019c4e862724fb9a644f2175cf6cc27(eventobject, x, y) {
        var self = this;

        function _ide_onTouchEnd_a3235eadb57a49e09320eb3883e820e8_Callback() {}
        self.view.flxPopupcontainer.animate(kony.ui.createAnimation({
            "100": {
                "bottom": "-100%",
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
            "animationEnd": _ide_onTouchEnd_a3235eadb57a49e09320eb3883e820e8_Callback
        });
        this.view.flxPopupfrombottom.setVisibility(false);
    },
    /** onDone defined for txtAmountDetail **/
    AS_TextField_b828b0c96c1f4a2eb2e81e0d033ebf91: function AS_TextField_b828b0c96c1f4a2eb2e81e0d033ebf91(eventobject, changedtext) {
        var self = this;
        this.view.txtAmount.text = this.formatAmount(this.view.txtAmount.text)[1];
    },
    /** onTextChange defined for txtAccountholder **/
    AS_TextField_e01dbb9ea17e4a89a8c8b37a33dc25c8: function AS_TextField_e01dbb9ea17e4a89a8c8b37a33dc25c8(eventobject, changedtext) {
        var self = this;
        //this.navigateToVerifyScreen();
    }
});