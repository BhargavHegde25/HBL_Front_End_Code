define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onClick defined for btnCancel **/
    AS_Button_aa13974666a14aba845b0bdd5a5582a2: function AS_Button_aa13974666a14aba845b0bdd5a5582a2(eventobject) {
        var self = this;
        this.view.flxDownladstatementspopup.setVisibility(false);
    },
    /** onClick defined for btnDownloadStatements **/
    AS_Button_b327ea659ba04b38b7151c4754cbdd87: function AS_Button_b327ea659ba04b38b7151c4754cbdd87(eventobject) {
        var self = this;
        this.showdownloadpopup();
    },
    /** onClick defined for btnDownload **/
    AS_Button_c49aeb49ac3b4cbcbea92bbafb973cb9: function AS_Button_c49aeb49ac3b4cbcbea92bbafb973cb9(eventobject) {
        var self = this;
        this.view.flxDownladstatementspopup.setVisibility(false);
        //this.view.flxGenerateStatementsPopup.setVisibility(true);
        this.generateCombinedStatement();
    },
    /** onClick defined for btnCancelStatement **/
    AS_Button_deffb6475d224738b167372143757305: function AS_Button_deffb6475d224738b167372143757305(eventobject) {
        var self = this;
        this.backToViewStatement(this.accounts[0]);
    },
    /** onClick defined for btnOkay **/
    AS_Button_ea6036f7f9514380a64426aa4b1ef38a: function AS_Button_ea6036f7f9514380a64426aa4b1ef38a(eventobject) {
        var self = this;
        this.navigateToAccountDetails();
    },
    /** postShow defined for frmConsolidatedStatements **/
    AS_Form_accf4eda64bd4f20bc046b4aa90e2167: function AS_Form_accf4eda64bd4f20bc046b4aa90e2167(eventobject) {
        var self = this;
        this.postShowConsolidatedStatements();
    },
    /** onDeviceBack defined for frmConsolidatedStatements **/
    AS_Form_aee0f71f77a448518033de9d76dce140: function AS_Form_aee0f71f77a448518033de9d76dce140(eventobject) {
        var self = this;
        kony.print("on device back");
    },
    /** init defined for frmConsolidatedStatements **/
    AS_Form_cad29a755ad54f1bb4e686a74f6cccd9: function AS_Form_cad29a755ad54f1bb4e686a74f6cccd9(eventobject) {
        var self = this;
        this.init();
    },
    /** preShow defined for frmConsolidatedStatements **/
    AS_Form_d84b2cfd8de24751a9b5502c3eb3dc32: function AS_Form_d84b2cfd8de24751a9b5502c3eb3dc32(eventobject) {
        var self = this;
        this.preShowConsolidatedStatements();
    },
    /** onTouchEnd defined for frmConsolidatedStatements **/
    AS_Form_f678db6110074ef19e33dc7d5cef0e50: function AS_Form_f678db6110074ef19e33dc7d5cef0e50(eventobject, x, y) {
        var self = this;
        hidePopups();
    },
    /** onTouchStart defined for imgClose **/
    AS_Image_c8fbb9053bcb4c5a8ae803cc949aa7f7: function AS_Image_c8fbb9053bcb4c5a8ae803cc949aa7f7(eventobject, x, y) {
        var self = this;
        this.view.flxDownladstatementspopup.setVisibility(false);
    },
    /** onTouchStart defined for imgNotificationClose **/
    AS_Image_dad257f1c3504ddf853a195260b6e318: function AS_Image_dad257f1c3504ddf853a195260b6e318(eventobject, x, y) {
        var self = this;
        this.view.flxGenerateStatementsPopup.setVisibility(false);
    }
});