define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    AS_BarButtonItem_c8e9cbdbcc6b42c0a5a80907da9695d3: function AS_BarButtonItem_c8e9cbdbcc6b42c0a5a80907da9695d3(eventobject) {
        var self = this;
        this.flxBackOnClick();
    },
    AS_BarButtonItem_f74021eb87e7428f813cc44d13b8e538: function AS_BarButtonItem_f74021eb87e7428f813cc44d13b8e538(eventobject) {
        var self = this;
        this.flxBackOnClick();
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
    /** preShow defined for frmFundTransferMain **/
    AS_Form_g49218d6f0fc4d5abe68afb29050421a: function AS_Form_g49218d6f0fc4d5abe68afb29050421a(eventobject) {
        var self = this;
        return self.preShow.call(this);
    },
    /** init defined for frmFundTransferMain **/
    AS_Form_h1ce65bffc5447cd8e88d1dbcc028a05: function AS_Form_h1ce65bffc5447cd8e88d1dbcc028a05(eventobject) {
        var self = this;
        return self.init.call(this);
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
    },
    /** onTextChange defined for lblTxtAccNo **/
    AS_TextField_bdefd434141b4918bbc414154279f145: function AS_TextField_bdefd434141b4918bbc414154279f145(eventobject, changedtext) {
        var self = this;
        //this.navigateToVerifyScreen();
    },
    /** onTextChange defined for txtAccountholder **/
    AS_TextField_d3c08c94ca49486bbaf47b97837f0e51: function AS_TextField_d3c08c94ca49486bbaf47b97837f0e51(eventobject, changedtext) {
        var self = this;
        //this.navigateToVerifyScreen();
    },
    /** onTextChange defined for txtRemarks **/
    AS_TextField_e092ed8c4e674b97841329cc0908e319: function AS_TextField_e092ed8c4e674b97841329cc0908e319(eventobject, changedtext) {
        var self = this;
        //this.navigateToVerifyScreen();
    },
    /** onDone defined for txtAmount **/
    AS_TextField_f158506a512e4140be8c287732ab0ace: function AS_TextField_f158506a512e4140be8c287732ab0ace(eventobject, changedtext) {
        var self = this;
    }
});