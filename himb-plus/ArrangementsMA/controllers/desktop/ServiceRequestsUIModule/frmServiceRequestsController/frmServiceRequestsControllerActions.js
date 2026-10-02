define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** init defined for frmServiceRequests **/
    AS_Form_ec831d0047024b6891b28ea0e4830b85: function AS_Form_ec831d0047024b6891b28ea0e4830b85(eventobject) {
        var self = this;
        return self.init.call(this);
    },
    /** onTouchEnd defined for frmServiceRequests **/
    AS_Form_ecdb436b4aaf481f9fab7ba4ee759deb: function AS_Form_ecdb436b4aaf481f9fab7ba4ee759deb(eventobject, x, y) {
        var self = this;
        hidePopups();
    },
    /** postShow defined for frmServiceRequests **/
    AS_Form_i27852a29b2d4f97babce056eb1ef7a6: function AS_Form_i27852a29b2d4f97babce056eb1ef7a6(eventobject) {
        var self = this;
        return self.postShow.call(this);
    },
    /** preShow defined for frmServiceRequests **/
    AS_Form_jd7f539d12ad459fbc5f3e46d38c6959: function AS_Form_jd7f539d12ad459fbc5f3e46d38c6959(eventobject) {
        var self = this;
        return self.preShow.call(this);
    },
    /** showErrorMessage defined for viewRequests **/
    AS_UWI_b4d27738c04140cea11ae11ecf7e2d92: function AS_UWI_b4d27738c04140cea11ae11ecf7e2d92(error) {
        var self = this;
        this.view.flxDowntimeWarning.setVisibility(true);
        this.view.rtxDowntimeWarning.text = error;
        this.view.forceLayout();
    },
    /** onError defined for viewRequests **/
    AS_UWI_be3271a8fc56401c9440a74f6971022e: function AS_UWI_be3271a8fc56401c9440a74f6971022e(error) {
        var self = this;
        // add error
    }
});