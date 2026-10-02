define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onClick defined for btnModify **/
    AS_Button_c7cc1f1d240d4ec58c801122f9a75e65: function AS_Button_c7cc1f1d240d4ec58c801122f9a75e65(eventobject) {
        var self = this;
        var ntf = new kony.mvc.Navigation({
            "appName": "konyonlinebankingvanathi",
            "friendlyName": "frmCurrencyConverter"
        });
        ntf.navigate();
    },
    /** onClick defined for btnConvert **/
    AS_Button_d4dd76034ccb4e33b82748e126914ff0: function AS_Button_d4dd76034ccb4e33b82748e126914ff0(eventobject) {
        var self = this;
        var ntf = new kony.mvc.Navigation({
            "appName": "konyonlinebankingvanathi",
            "friendlyName": "frmCurrencyConverterAcknowledge"
        });
        ntf.navigate();
    },
    /** onClick defined for btnCancel **/
    AS_Button_i3dad01228b94960ad25774288d359c8: function AS_Button_i3dad01228b94960ad25774288d359c8(eventobject) {
        var self = this;
        var ntf = new kony.mvc.Navigation({
            "appName": "konyonlinebankingvanathi",
            "friendlyName": "frmPortfolioOverview"
        });
        ntf.navigate();
        kony.application.destroyForm("frmCurrencyConverter");
    },
    /** preShow defined for frmCurrencyConverterConfirm **/
    AS_Form_c74727bd6d2147b582a5cd709474dec3: function AS_Form_c74727bd6d2147b582a5cd709474dec3(eventobject) {
        var self = this;
        return self.preShow.call(this);
    },
    /** postShow defined for frmCurrencyConverterConfirm **/
    AS_Form_d20c5d2fe6624c31abd7a0997a446c46: function AS_Form_d20c5d2fe6624c31abd7a0997a446c46(eventobject) {
        var self = this;
        return self.postShow.call(this);
    },
    /** init defined for frmCurrencyConverterConfirm **/
    AS_Form_ja47a2fdb3b54ed08088491b57ac927d: function AS_Form_ja47a2fdb3b54ed08088491b57ac927d(eventobject) {
        var self = this;
        return self.init.call(this);
    }
});