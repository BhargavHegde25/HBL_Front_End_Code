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
    /** onDeviceBack defined for frmStopPayments **/
    AS_Form_e66572dec0724bd28a59bc5ee6cfb78b: function AS_Form_e66572dec0724bd28a59bc5ee6cfb78b(eventobject) {
        var self = this;
        kony.print("on device back");
    },
    /** init defined for frmStopPayments **/
    AS_Form_f3e78a5e6a0342a7b9f626ade63f074d: function AS_Form_f3e78a5e6a0342a7b9f626ade63f074d(eventobject) {
        var self = this;
        this.frmStopPaymentsInitAction();
    },
    /** postShow defined for frmStopPayments **/
    AS_Form_f72b4190d92c4539a0ddde4bfa559352: function AS_Form_f72b4190d92c4539a0ddde4bfa559352(eventobject) {
        var self = this;
        this.AdjustScreen();
    },
    /** preShow defined for frmStopPayments **/
    AS_Form_fdf57158ecc04edbb39ed92a1cc23511: function AS_Form_fdf57158ecc04edbb39ed92a1cc23511(eventobject) {
        var self = this;
        this.preShowStopPayments();
    },
    /** onTouchStart defined for lblOpenAccountFrom **/
    AS_Label_debd1d7e24444de09fb663bc1019df80: function AS_Label_debd1d7e24444de09fb663bc1019df80(eventobject, x, y) {
        var self = this;
        var nuoModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("NAOModule");
        nuoModule.presentationController.showNewAccountOpening();
    },
    /** onTouchStart defined for lblOpenNewAccountFrom **/
    AS_Label_heb9746e19264a6aa2228b08c7e2c251: function AS_Label_heb9746e19264a6aa2228b08c7e2c251(eventobject, x, y) {
        var self = this;
        var nuoModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("NAOModule");
        nuoModule.presentationController.showNewAccountOpening();
    }
});