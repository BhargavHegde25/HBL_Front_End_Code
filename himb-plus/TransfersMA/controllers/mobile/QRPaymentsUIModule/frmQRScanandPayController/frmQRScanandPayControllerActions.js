define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** preShow defined for frmQRScanandPay **/
    AS_Form_b2202743cded413d84e9ed8da6312f37: function AS_Form_b2202743cded413d84e9ed8da6312f37(eventobject) {
        var self = this;
        this.preshow();
    },
    /** onDone defined for txtAmount **/
    AS_TextField_a8ed5a75c7fa4450a807e89b8c4fdb97: function AS_TextField_a8ed5a75c7fa4450a807e89b8c4fdb97(eventobject, changedtext) {
        var self = this;
        this.view.txtAmount.text = this.formatAmount(this.view.txtAmount.text);
    },
    /** onTextChange defined for txtRemarks **/
    AS_TextField_e83e3288f6f640c6a31d69b2c99fb07b: function AS_TextField_e83e3288f6f640c6a31d69b2c99fb07b(eventobject, changedtext) {
        var self = this;
        //this.navigateToVerifyScreen();
    }
});