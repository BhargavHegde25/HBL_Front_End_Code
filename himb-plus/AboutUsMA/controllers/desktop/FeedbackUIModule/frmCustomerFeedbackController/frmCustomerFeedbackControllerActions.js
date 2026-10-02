define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onClick defined for confirmButtons.btnModify **/
    AS_Button_c667bf53388c4a81b111f208040f9e49: function AS_Button_c667bf53388c4a81b111f208040f9e49(eventobject) {
        var self = this;
        this.addCancelAction();
    },
    /** onClick defined for btnDone **/
    AS_Button_cbbb8d01036e407fb4e2de2921cf18ae: function AS_Button_cbbb8d01036e407fb4e2de2921cf18ae(eventobject) {
        var self = this;
        this.btnAckDoneAction();
    },
    /** onClick defined for confirmButtons.btnConfirm **/
    AS_Button_de264b9824ac4f68843c416991eff063: function AS_Button_de264b9824ac4f68843c416991eff063(eventobject) {
        var self = this;
        this.addSubmitAction();
    },
    /** onClick defined for flxRating1 **/
    AS_FlexContainer_a4a94fb507bd48198e03f507309b9df6: function AS_FlexContainer_a4a94fb507bd48198e03f507309b9df6(eventobject) {
        var self = this;
        this.showRatingAction(1);
    },
    /** onClick defined for flxRating5 **/
    AS_FlexContainer_b4530ef487bb472a862380bfb551c0d3: function AS_FlexContainer_b4530ef487bb472a862380bfb551c0d3(eventobject) {
        var self = this;
        this.showRatingAction(5);
    },
    /** onClick defined for flxRating2 **/
    AS_FlexContainer_d51cd9167b614bbd8ab68e4c039a1d68: function AS_FlexContainer_d51cd9167b614bbd8ab68e4c039a1d68(eventobject) {
        var self = this;
        this.showRatingAction(2);
    },
    /** onClick defined for flxRating3 **/
    AS_FlexContainer_e00aaf44e15a4151b448616bf7a89e56: function AS_FlexContainer_e00aaf44e15a4151b448616bf7a89e56(eventobject) {
        var self = this;
        this.showRatingAction(3);
    },
    /** onClick defined for flxRating4 **/
    AS_FlexContainer_hda99f509f614811ab2e5e30282c8b21: function AS_FlexContainer_hda99f509f614811ab2e5e30282c8b21(eventobject) {
        var self = this;
        this.showRatingAction(4);
    },
    /** onClick defined for flxAddFeatureRequestandimg **/
    AS_FlexContainer_i82dddffde6e4f2ea6bffbf21f35369a: function AS_FlexContainer_i82dddffde6e4f2ea6bffbf21f35369a(eventobject) {
        var self = this;
        this.addFeatureRequestAction();
    },
    /** onDeviceBack defined for frmCustomerFeedback **/
    AS_Form_b2492b13fe2c403b9d131432c35ebb80: function AS_Form_b2492b13fe2c403b9d131432c35ebb80(eventobject) {
        var self = this;
        kony.print("on device back");
    },
    /** postShow defined for frmCustomerFeedback **/
    AS_Form_c0671ee55270431889671eb0bea88a72: function AS_Form_c0671ee55270431889671eb0bea88a72(eventobject) {
        var self = this;
        this.postShowCustomerFeedback();
    },
    /** preShow defined for frmCustomerFeedback **/
    AS_Form_fb3f66c1ddce478e8b2bc220d94107c3: function AS_Form_fb3f66c1ddce478e8b2bc220d94107c3(eventobject) {
        var self = this;
        this.preShowCustomerFeedback();
    },
    /** onTouchEnd defined for frmCustomerFeedback **/
    AS_Form_h0e63388a380494f8b404b73e01bd89f: function AS_Form_h0e63388a380494f8b404b73e01bd89f(eventobject, x, y) {
        var self = this;
        hidePopups();
    }
});