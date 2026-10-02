define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onClick defined for btnChecksChecking **/
    AS_Button_aed33baeda8c40faa84d6682154c6335: function AS_Button_aed33baeda8c40faa84d6682154c6335(eventobject) {
        var self = this;
        this.presenter.Transactions.showChecks();
    },
    /** onClick defined for btnMakeTransfer **/
    AS_Button_b86f0b9fb79344678e17324a5ce90e5a: function AS_Button_b86f0b9fb79344678e17324a5ce90e5a(eventobject) {
        var self = this;
        //test
    },
    /** onClick defined for confirmButtons.btnConfirm **/
    AS_Button_c9c3a0c9cdfb496287ccbab9995ca970: function AS_Button_c9c3a0c9cdfb496287ccbab9995ca970(eventobject) {
        var self = this;
        this.BackToAccountsDetails();
    },
    /** onClick defined for btnPurchasesCredit **/
    AS_Button_d80cf3cffa454fd2b5976eb15a90bdb2: function AS_Button_d80cf3cffa454fd2b5976eb15a90bdb2(eventobject) {
        var self = this;
        this.presenter.Transactions.showPurchase();
    },
    /** onClick defined for btnWithdrawDeposit **/
    AS_Button_da9325cbe40346b6acd538a57c5d2c90: function AS_Button_da9325cbe40346b6acd538a57c5d2c90(eventobject) {
        var self = this;
        this.presenter.Transactions.showWithdrawals();
    },
    /** onClick defined for btnAllChecking **/
    AS_Button_db058c4251a0406db8efc47907d0f288: function AS_Button_db058c4251a0406db8efc47907d0f288(eventobject) {
        var self = this;
        this.presenter.Transactions.showAll();
    },
    /** onClick defined for btnDepositsChecking **/
    AS_Button_de94fd7dc8dc456a8a5beee49439d358: function AS_Button_de94fd7dc8dc456a8a5beee49439d358(eventobject) {
        var self = this;
        this.presenter.Transactions.showDeposits();
    },
    /** onClick defined for btnAllDeposit **/
    AS_Button_e6b198ffd59247a197e5765e0783d5ff: function AS_Button_e6b198ffd59247a197e5765e0783d5ff(eventobject) {
        var self = this;
        this.presenter.Transactions.showAll();
    },
    /** onClick defined for btnAllLoan **/
    AS_Button_f19c3e48c7164d6c90597dc986e2ddb5: function AS_Button_f19c3e48c7164d6c90597dc986e2ddb5(eventobject) {
        var self = this;
        this.presenter.Transactions.showAll();
    },
    /** onClick defined for btnTransfersChecking **/
    AS_Button_f94299e52d1d4aef97c1ae2d79dd3246: function AS_Button_f94299e52d1d4aef97c1ae2d79dd3246(eventobject) {
        var self = this;
        this.presenter.Transactions.showTransfers();
    },
    /** onClick defined for btnPayABill **/
    AS_Button_g16d4b800b324495836d3cae5adf9e1d: function AS_Button_g16d4b800b324495836d3cae5adf9e1d(eventobject) {
        var self = this;
        //test
    },
    /** onClick defined for confirmButtons.btnModify **/
    AS_Button_g1f5eef63d5348c18819c9f3c55321d6: function AS_Button_g1f5eef63d5348c18819c9f3c55321d6(eventobject) {
        var self = this;
        this.MoveToAccountsLandingPage();
    },
    /** onClick defined for btnPaymentsCredit **/
    AS_Button_g63b7ea21a884599bf4ef22505f0988f: function AS_Button_g63b7ea21a884599bf4ef22505f0988f(eventobject) {
        var self = this;
        this.presenter.Transactions.showPayment();
    },
    /** onClick defined for btnWithdrawsChecking **/
    AS_Button_gc5e06cd8afc4fffaef056a3022d34c1: function AS_Button_gc5e06cd8afc4fffaef056a3022d34c1(eventobject) {
        var self = this;
        this.presenter.Transactions.showWithdrawals();
    },
    /** onClick defined for btnDepositDeposit **/
    AS_Button_h8921900becf47429f102bb44d9dbd51: function AS_Button_h8921900becf47429f102bb44d9dbd51(eventobject) {
        var self = this;
        this.presenter.Transactions.showDeposits();
    },
    /** onClick defined for btnAllCredit **/
    AS_Button_hbd7d377f4344676bfa25ecf3412bfa6: function AS_Button_hbd7d377f4344676bfa25ecf3412bfa6(eventobject) {
        var self = this;
        this.presenter.Transactions.showAll();
    },
    /** onClick defined for btnInterestDeposit **/
    AS_Button_j1bbf11663434227b581ed7c02716466: function AS_Button_j1bbf11663434227b581ed7c02716466(eventobject) {
        var self = this;
        this.presenter.Transactions.showInterest();
    },
    /** onBreakpointChange defined for frmAccountsDetails **/
    AS_Form_abbcfc91b73f406781f26b34d47f9f92: function AS_Form_abbcfc91b73f406781f26b34d47f9f92(eventobject, breakpoint) {
        var self = this;
        this.onBreakpointChange(breakpoint);
    },
    /** onDeviceBack defined for frmAccountsDetails **/
    AS_Form_d2c95aad04d24a50bbcce19bc10796a6: function AS_Form_d2c95aad04d24a50bbcce19bc10796a6(eventobject) {
        var self = this;
        //Have to Consolidate
        kony.print("Back Button Pressed");
    },
    /** onTouchEnd defined for frmAccountsDetails **/
    AS_Form_ef02bd910fb04f22ad9daa9bc454523d: function AS_Form_ef02bd910fb04f22ad9daa9bc454523d(eventobject, x, y) {
        var self = this;
        hidePopups();
    },
    /** init defined for frmAccountsDetails **/
    AS_Form_f8aea1b7f61843bd906101be866f633f: function AS_Form_f8aea1b7f61843bd906101be866f633f(eventobject) {
        var self = this;
        this.initFrmAccountDetails();
    },
    /** preShow defined for frmAccountsDetails **/
    AS_Form_g2660024916f4f939511fc6bf325d5bc: function AS_Form_g2660024916f4f939511fc6bf325d5bc(eventobject) {
        var self = this;
        this.preshowFrmAccountDetails();
    },
    /** postShow defined for frmAccountsDetails **/
    AS_Form_i89b033fd6b04805a7caa26fe32cb50b: function AS_Form_i89b033fd6b04805a7caa26fe32cb50b(eventobject) {
        var self = this;
        this.postShowFrmAccountDetails();
    }
});