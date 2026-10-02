define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onClick defined for btnCancel **/
    AS_Button_e2fb21efe67a413a921998c80ec95f8d: function AS_Button_e2fb21efe67a413a921998c80ec95f8d(eventobject) {
        var self = this;
        var ntf = new kony.mvc.Navigation({
            "appName": "konyonlinebankingvanathi",
            "friendlyName": "frmPortfolioOverview"
        });
        ntf.navigate();
        kony.application.destroyForm("frmCurrencyConverter");
    },
    /** preShow defined for frmCurrencyConverterAcknowledge **/
    AS_Form_b4eeda4ec46f460c9ae5dd6df5df5814: function AS_Form_b4eeda4ec46f460c9ae5dd6df5df5814(eventobject) {
        var self = this;
        return self.preShow.call(this);
    },
    /** init defined for frmCurrencyConverterAcknowledge **/
    AS_Form_ee0dd01b3016409f947bb3dfcc7c7c74: function AS_Form_ee0dd01b3016409f947bb3dfcc7c7c74(eventobject) {
        var self = this;
        return self.init.call(this);
    },
    /** postShow defined for frmCurrencyConverterAcknowledge **/
    AS_Form_j382fe6b555a4d30a2a9989eadb4e666: function AS_Form_j382fe6b555a4d30a2a9989eadb4e666(eventobject) {
        var self = this;
        return self.postShow.call(this);
    }
});