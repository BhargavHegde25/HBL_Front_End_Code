define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    AS_BarButtonItem_a5dc3a4b4c5647a6bc49971c78e271ab: function AS_BarButtonItem_a5dc3a4b4c5647a6bc49971c78e271ab(eventobject) {
        var self = this;
        this.goback();
    },
    AS_BarButtonItem_cc1b52161d1e4f26bd4c29399bc43c3f: function AS_BarButtonItem_cc1b52161d1e4f26bd4c29399bc43c3f(eventobject) {
        var self = this;
        this.goback();
    },
    /** onClick defined for flxPopupfrombottom **/
    AS_FlexContainer_ea0f4078ea8840959739f4128175e66f: function AS_FlexContainer_ea0f4078ea8840959739f4128175e66f(eventobject) {
        var self = this;

        function _ide_onClick_f255783346434a80a3e072d63509861e_Callback() {}
        self.view.flxPopupfrombottom.animate(kony.ui.createAnimation({
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
            "animationEnd": _ide_onClick_f255783346434a80a3e072d63509861e_Callback
        });
        this.view.flxPopupfrombottom.setVisibility(false);
    },
    /** init defined for frmEsewaLoad **/
    AS_Form_cd79782927944dde83ebddf59c804180: function AS_Form_cd79782927944dde83ebddf59c804180(eventobject) {
        var self = this;
        this.init();
    },
    /** onTouchEnd defined for imgclose **/
    AS_Image_ddf3d33fa34445128cf5bdb9b0b10266: function AS_Image_ddf3d33fa34445128cf5bdb9b0b10266(eventobject, x, y) {
        var self = this;

        function MOVE_ACTION_jd4a941ed21f45578725caa4b1d2e622_Callback() {}
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
            "animationEnd": MOVE_ACTION_jd4a941ed21f45578725caa4b1d2e622_Callback
        });
        this.view.flxPopupfrombottom.setVisibility(false);
    }
});