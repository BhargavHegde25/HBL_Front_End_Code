define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onClick defined for btnRight **/
    AS_Button_d7c0a19692cf4f6a9359be4a26ee3971: function AS_Button_d7c0a19692cf4f6a9359be4a26ee3971(eventobject) {
        var self = this;
        var ntf = new kony.mvc.Navigation({
            "appName": "CardsMA",
            "friendlyName": "frmtopUpDomesticCardReviewScreen"
        });
        ntf.navigate();
    },
    /** preShow defined for frmTopUpDomesticCardConsentScreen **/
    AS_Form_d4c2a96658e84172a209cf61de459d24: function AS_Form_d4c2a96658e84172a209cf61de459d24(eventobject) {
        var self = this;
        this.preShow();
    },
    AS_BarButtonItem_a777d43039314d12b4b0219896deeafe: function AS_BarButtonItem_a777d43039314d12b4b0219896deeafe(eventobject) {
        var self = this;
        this.onCancelClick();
    },
    AS_BarButtonItem_e45cdfe29c4e43ffa22d85a89c694e4b: function AS_BarButtonItem_e45cdfe29c4e43ffa22d85a89c694e4b(eventobject) {
        var self = this;
        this.navBack();
    }
});