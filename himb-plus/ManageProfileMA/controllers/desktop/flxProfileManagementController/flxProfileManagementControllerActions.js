define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onClick defined for flxImgElipses **/
    AS_FlexContainer_c3ddb645ae7a447a8f1d049f1f680feb: function AS_FlexContainer_c3ddb645ae7a447a8f1d049f1f680feb(eventobject, context) {
        var self = this;
        if (this.view.flxEdit.isVisible === false) {
            this.view.flxImgElipses.onclick = this.view.flxEdit.setVisibility(true);
            this.view.flxImgElipses.accessibilityConfig = {
                "a11yARIA": {
                    "aria-expanded": true,
                    "role": "button"
                }
            }
        } else {
            this.view.flxImgElipses.onclick = this.view.flxEdit.setVisibility(false);
            this.view.flxImgElipses.accessibilityConfig = {
                "a11yARIA": {
                    "aria-expanded": false,
                    "role": "button"
                }
            }
        }
    },
    /** onKeyPress defined for flxImgElipses **/
    AS_FlexContainer_d9690b1f392c4d26824d96e794cfc91a: function AS_FlexContainer_d9690b1f392c4d26824d96e794cfc91a(eventobject, eventPayload, context) {
        var self = this;
        var scopeObj = this;
        var addFrm = kony.application.getCurrentForm();
        if (eventPayload.keyCode === 9 && eventPayload.shiftKey) {
            var data = addFrm.segprofilemanagementAddressnew.data;
            for (var i = 0; i < data.length; i++) {
                if (data[i].flxEdit !== undefined) {
                    if (data[i].flxEdit.isVisible === true) {
                        data[i].flxEdit.isVisible = false;
                        var addr = data[i].flxImgElipses.accessibilityConfig.a11yLabel;
                        data[i].flxImgElipses.accessibilityConfig = {
                            "a11yLabel": addr,
                            "a11yARIA": {
                                "aria-expanded": false,
                                "aria-haspopup": "dialog",
                                "aria-labelledby": "lblHome",
                                "role": "button",
                                "tabindex": 0
                            }
                        }
                    }
                }
            }
            addFrm.segprofilemanagementAddressnew.setData(data);
        }
    }
});