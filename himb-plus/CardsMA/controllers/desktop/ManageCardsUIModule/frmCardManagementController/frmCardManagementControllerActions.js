define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onClick defined for btnBreadcrumb1 **/
    AS_Button_fb5a0d943cbd487ea26c5488b18a8748: function AS_Button_fb5a0d943cbd487ea26c5488b18a8748(eventobject) {
        var self = this;
        var accountModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountsModule");
        accountModule.presentationController.showAccountsDashboard();
    },
    /** onDeviceBack defined for frmCardManagement **/
    AS_Form_bd9d54643e8e4dbea529d79f89d9f901: function AS_Form_bd9d54643e8e4dbea529d79f89d9f901(eventobject) {
        var self = this;
        kony.print("on device back");
    },
    /** postShow defined for frmCardManagement **/
    AS_Form_cf48919e45714f268daa73ee7b928732: function AS_Form_cf48919e45714f268daa73ee7b928732(eventobject) {
        var self = this;
        this.PostShowfrmCardManagement();
    },
    /** preShow defined for frmCardManagement **/
    AS_Form_e6c0940ed634451a841fe1815961cbfa: function AS_Form_e6c0940ed634451a841fe1815961cbfa(eventobject) {
        var self = this;
        this.formPreShowFunction();
    },
    /** onTouchEnd defined for frmCardManagement **/
    AS_Form_gd108bb6da8042b7b4ec54ad6ed88408: function AS_Form_gd108bb6da8042b7b4ec54ad6ed88408(eventobject, x, y) {
        var self = this;
        hidePopups();
    },
    /** init defined for frmCardManagement **/
    AS_Form_jeea1b6f492642399617bfdf6d3fe509: function AS_Form_jeea1b6f492642399617bfdf6d3fe509(eventobject) {
        var self = this;
        this.init();
    }
});