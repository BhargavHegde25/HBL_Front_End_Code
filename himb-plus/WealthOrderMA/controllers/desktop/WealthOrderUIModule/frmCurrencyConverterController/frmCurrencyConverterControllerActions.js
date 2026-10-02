define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onClick defined for btnModalAdd **/
    AS_Button_ecb175e20060405fb39d011b48e0b205: function AS_Button_ecb175e20060405fb39d011b48e0b205(eventobject) {
        var self = this;
        return self.setValueTo.call(this);
    },
    /** onClick defined for btnCancel **/
    AS_Button_f9b07d96bdb248aebd1c7c76876e6650: function AS_Button_f9b07d96bdb248aebd1c7c76876e6650(eventobject) {
        var self = this;
        var ntf = new kony.mvc.Navigation({
            "appName": "PortfolioManagementMA",
            "friendlyName": "frmPortfolioOverview"
        });
        ntf.navigate();
        kony.application.destroyForm("frmCurrencyConverter");
    },
    /** onClick defined for btnSwitch **/
    AS_Button_i38e8c8f66d04c1ca45f13673dc5e721: function AS_Button_i38e8c8f66d04c1ca45f13673dc5e721(eventobject) {
        var self = this;
        return self.switchCurrency.call(this);
    },
    /** init defined for frmCurrencyConverter **/
    AS_Form_a021490617a84d1fb003f8b5ad5bb033: function AS_Form_a021490617a84d1fb003f8b5ad5bb033(eventobject) {
        var self = this;
        return self.init.call(this);
    },
    /** postShow defined for frmCurrencyConverter **/
    AS_Form_eed9b7d65118441f82317291e6d7428a: function AS_Form_eed9b7d65118441f82317291e6d7428a(eventobject) {
        var self = this;
        return self.postShow.call(this);
    },
    /** preShow defined for frmCurrencyConverter **/
    AS_Form_i7f88a1ef68a40f0a5896cdbdc1ab325: function AS_Form_i7f88a1ef68a40f0a5896cdbdc1ab325(eventobject) {
        var self = this;
        return self.preShow.call(this);
    },
    /** onTextChange defined for textSearchInput **/
    AS_TextField_i270363903ff488aa29e84be09ea985e: function AS_TextField_i270363903ff488aa29e84be09ea985e(eventobject, changedtext) {
        var self = this;
        return self.searchInModal.call(this);
    },
    /** onTextChange defined for txtLeftAmountValue **/
    AS_TextField_j16ffac4edd64392b0b9b4fa17ef5551: function AS_TextField_j16ffac4edd64392b0b9b4fa17ef5551(eventobject, changedtext) {
        var self = this;
        return self.convertCurrency.call(this);
    },
    /** onFilterChanged defined for investmentLineChart **/
    AS_UWI_cb20e678c2c94b4b95445611585d325f: function AS_UWI_cb20e678c2c94b4b95445611585d325f(filter) {
        var self = this;
        return self.chartService.call(this, filter);
    }
});