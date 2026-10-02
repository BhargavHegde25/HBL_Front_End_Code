define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onClick defined for flxInfoIcon **/
    AS_FlexContainer_ec667afa80aa4658a81f8059023e3d11: function AS_FlexContainer_ec667afa80aa4658a81f8059023e3d11(eventobject) {
        var self = this;
        this.view.flxInfoIcon.onclick = this.view.flxInfo.setVisibility(true);
        this.view.flxInfoIcon.accessibilityConfig = {
            a11yARIA: {
                role: "button",
                "aria-haspopup": "dialog",
                "aria-expanded": true
            },
            "a11yLabel": kony.i18n.getLocalizedString("i18n.settings.knowMoreAboutAddress")
        };
        this.view.lblInfo.setActive(true);
    },
    /** onClick defined for flxCloseIcon **/
    AS_FlexContainer_g670a3be248848e9bca96927db0add9e: function AS_FlexContainer_g670a3be248848e9bca96927db0add9e(eventobject) {
        var self = this;
        this.view.flxCloseIcon.onclick = this.view.flxInfo.setVisibility(false);
        this.view.flxInfoIcon.accessibilityConfig = {
            a11yARIA: {
                role: "button",
                "aria-haspopup": "dialog",
                "aria-expanded": false
            },
            "a11yLabel": kony.i18n.getLocalizedString("i18n.settings.knowMoreAboutAddress")
        };
        this.view.flxInfoIcon.setActive(true);
    },
    /** init defined for frmAddressSettings **/
    AS_Form_efa8f2b442c641af8bbed6eaeaa90744: function AS_Form_efa8f2b442c641af8bbed6eaeaa90744(eventobject) {
        var self = this;
        this.init();
    }
});