define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onClick defined for flxPopupfrombottoms **/
    AS_FlexContainer_ccf5a86897404104a8a7768670abc9e2: function AS_FlexContainer_ccf5a86897404104a8a7768670abc9e2(eventobject) {
        var self = this;

        function _ide_onClick_c4d055cf2f5a4fcf943f7d3270fcfee5_Callback() {}
        self.view.flxPopupfrombottoms.animate(
        kony.ui.createAnimation({
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
            "animationEnd": _ide_onClick_c4d055cf2f5a4fcf943f7d3270fcfee5_Callback
        });
        this.view.flxPopupfrombottoms.setVisibility(false);
    },
    /** preShow defined for frmScheduleDomestic **/
    AS_Form_a9d62ea0dd4343d7b2cbef853872bd03: function AS_Form_a9d62ea0dd4343d7b2cbef853872bd03(eventobject) {
        var self = this;
        this.preShow();
    },
    /** init defined for frmScheduleDomestic **/
    AS_Form_ae13bd005bc24781b6890fc51ade5364: function AS_Form_ae13bd005bc24781b6890fc51ade5364(eventobject) {
        var self = this;
        this.init()
    },
    /** onTouchEnd defined for imgclose **/
    AS_Image_c019c4e862724fb9a644f2175cf6cc27: function AS_Image_c019c4e862724fb9a644f2175cf6cc27(eventobject, x, y) {
        var self = this;
        this.view.flxPopupfrombottoms.setVisibility(false);
    },
    AS_BarButtonItem_afe09765548b41e48bb942d453e9cb31: function AS_BarButtonItem_afe09765548b41e48bb942d453e9cb31(eventobject) {
        var self = this;
        this.oncancelClick();
    },
    AS_BarButtonItem_a350befa9f3a4186907c5716e8c99046: function AS_BarButtonItem_a350befa9f3a4186907c5716e8c99046(eventobject) {
        var self = this;
        this.flxBackOnClick();
    }
});