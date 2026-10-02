define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onClick defined for btnTermsAndConditions **/
    AS_Button_a60336b951bd4ae98578fdd1fa9e4a26: function AS_Button_a60336b951bd4ae98578fdd1fa9e4a26(eventobject) {
        var self = this;
        this.showConfirmationPopUp();
        this.destinationForm = "TandC";
    },
    /** onClick defined for btnYes **/
    AS_Button_c15eade7c6934d27876cb93d586bfe6f: function AS_Button_c15eade7c6934d27876cb93d586bfe6f(eventobject) {
        var self = this;
        return self.onYesOfConfirmationPopup.call(this);
    },
    /** onClick defined for btnPrivacy **/
    AS_Button_e368251b7681494d88096a1a3c1622ef: function AS_Button_e368251b7681494d88096a1a3c1622ef(eventobject) {
        var self = this;
        this.showConfirmationPopUp();
        this.destinationForm = "PrivacyPolicy";
    },
    /** onClick defined for btnLocateUs **/
    AS_Button_e8d5d3b5b5884ff79d83dcd8118c5dfc: function AS_Button_e8d5d3b5b5884ff79d83dcd8118c5dfc(eventobject) {
        var self = this;
        this.showConfirmationPopUp();
        this.destinationForm = "LocateUs";
    },
    /** onClick defined for btnFaqs **/
    AS_Button_eb139130b0d2447eb99688b53295cced: function AS_Button_eb139130b0d2447eb99688b53295cced(eventobject) {
        var self = this;
        this.showConfirmationPopUp();
        this.destinationForm = "showFAQs";
    },
    /** onClick defined for flxCross **/
    AS_Button_eb919f04ae7f4b9a876e57a05fe8901a: function AS_Button_eb919f04ae7f4b9a876e57a05fe8901a(eventobject) {
        var self = this;
        return self.hideConfirmationPopUp.call(this);
    },
    /** onClick defined for btnNo **/
    AS_Button_fb1c16e39b5d4b85a5256d0d34551247: function AS_Button_fb1c16e39b5d4b85a5256d0d34551247(eventobject) {
        var self = this;
        return self.hideConfirmationPopUp.call(this);
    },
    /** onClick defined for btnContactUs **/
    AS_Button_i7b1e630e0df45a18290b104341db3ea: function AS_Button_i7b1e630e0df45a18290b104341db3ea(eventobject) {
        var self = this;
        this.showConfirmationPopUp();
        this.destinationForm = "ContactUs";
    },
    /** postShow defined for frmEmbedOrigination **/
    AS_Form_h0526d3bfff34533980caa363a5c04d0: function AS_Form_h0526d3bfff34533980caa363a5c04d0(eventobject) {
        var self = this;
        return self.showPreLoginView.call(this);
    },
    /** preShow defined for frmEmbedOrigination **/
    AS_Form_id14bf33104c4a1d95f1210ae1f15fe2: function AS_Form_id14bf33104c4a1d95f1210ae1f15fe2(eventobject) {
        var self = this;
        return self.preShowOfEmbeddedForm.call(this);
    }
});