define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onClick defined for flxMainContainer **/
    AS_FlexContainer_fbcf334cf8914206a1ba3c7449911284: function AS_FlexContainer_fbcf334cf8914206a1ba3c7449911284(eventobject) {
        var self = this;
        kony.print("pooja");
    },
    /** onDeviceBack defined for frmNotificationsAndMessages **/
    AS_Form_c25de95e48a04ccb81587c1758e62be0: function AS_Form_c25de95e48a04ccb81587c1758e62be0(eventobject) {
        var self = this;
        //Need to Consolidate
        kony.print("Back button pressed");
    },
    /** postShow defined for frmNotificationsAndMessages **/
    AS_Form_c577f98e99594a89ada0d0eeef83e7ae: function AS_Form_c577f98e99594a89ada0d0eeef83e7ae(eventobject) {
        var self = this;
        this.postShowNotifications();
    },
    /** preShow defined for frmNotificationsAndMessages **/
    AS_Form_ddf367ae84c94d78b2c653aa25fbbe6f: function AS_Form_ddf367ae84c94d78b2c653aa25fbbe6f(eventobject) {
        var self = this;
        this.preShowFunction();
    },
    /** onTouchEnd defined for frmNotificationsAndMessages **/
    AS_Form_jc89e0f1798348888ad96f03a01930d5: function AS_Form_jc89e0f1798348888ad96f03a01930d5(eventobject, x, y) {
        var self = this;
        hidePopups();
    }
});