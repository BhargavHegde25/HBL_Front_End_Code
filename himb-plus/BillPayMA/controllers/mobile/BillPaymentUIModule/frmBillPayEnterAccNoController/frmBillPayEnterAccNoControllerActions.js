define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    AS_BarButtonItem_c8141c0309224e238a1ed6ee38865081: function AS_BarButtonItem_c8141c0309224e238a1ed6ee38865081(eventobject) {
        var self = this;
        this.flxBackOnClick();
    },
    AS_BarButtonItem_g487a007a1d64d79ad2af5df83063f88: function AS_BarButtonItem_g487a007a1d64d79ad2af5df83063f88(eventobject) {
        var self = this;
        this.onClickCancel();
    },
    /** onClick defined for btnEight **/
    AS_Button_a75e8b5e531d49c9b7edae9c12363d52: function AS_Button_a75e8b5e531d49c9b7edae9c12363d52(eventobject) {
        var self = this;
        this.setKeypadChar(8);
    },
    /** onClick defined for btnSix **/
    AS_Button_bb947477cbdb4d2995cf5c9fdd69ab2b: function AS_Button_bb947477cbdb4d2995cf5c9fdd69ab2b(eventobject) {
        var self = this;
        this.setKeypadChar(6);
    },
    /** onClick defined for btnNine **/
    AS_Button_d120c5f4681b4d4d87703df00990d819: function AS_Button_d120c5f4681b4d4d87703df00990d819(eventobject) {
        var self = this;
        this.setKeypadChar(9);
    },
    /** onClick defined for btnTwo **/
    AS_Button_d8bdc816124a4c73810dd852e2552b90: function AS_Button_d8bdc816124a4c73810dd852e2552b90(eventobject) {
        var self = this;
        this.setKeypadChar(2);
    },
    /** onClick defined for btnFive **/
    AS_Button_d8e20fb2e5664a33886a807e3359666a: function AS_Button_d8e20fb2e5664a33886a807e3359666a(eventobject) {
        var self = this;
        this.setKeypadChar(5);
    },
    /** onClick defined for btnOne **/
    AS_Button_f5befcc5afe244939f3641d6c84abb5e: function AS_Button_f5befcc5afe244939f3641d6c84abb5e(eventobject) {
        var self = this;
        this.setKeypadChar(1);
    },
    /** onClick defined for btnSeven **/
    AS_Button_g2f96fecf33b41aeb632f913aa73912a: function AS_Button_g2f96fecf33b41aeb632f913aa73912a(eventobject) {
        var self = this;
        this.setKeypadChar(7);
    },
    /** onClick defined for btnThree **/
    AS_Button_h286c43696d04f52ba3b11c173a60b4f: function AS_Button_h286c43696d04f52ba3b11c173a60b4f(eventobject) {
        var self = this;
        this.setKeypadChar(3);
    },
    /** onClick defined for btnFour **/
    AS_Button_i8927e276e284992bbf5cc7110df4f85: function AS_Button_i8927e276e284992bbf5cc7110df4f85(eventobject) {
        var self = this;
        this.setKeypadChar(4);
    },
    /** onClick defined for btnZero **/
    AS_Button_je50201fc8e348f28c4f4df881076c18: function AS_Button_je50201fc8e348f28c4f4df881076c18(eventobject) {
        var self = this;
        this.setKeypadChar(0);
    },
    /** init defined for frmBillPayEnterAccNo **/
    AS_Form_ad5cee80de4742f080073e63d24dbbed: function AS_Form_ad5cee80de4742f080073e63d24dbbed(eventobject) {
        var self = this;
        this.init();
    },
    /** preShow defined for frmBillPayEnterAccNo **/
    AS_Form_fb2e14a17ae642f5adf6533df7e4f5ab: function AS_Form_fb2e14a17ae642f5adf6533df7e4f5ab(eventobject) {
        var self = this;
        return self.frmPreshow.call(this);
    },
    /** onTouchEnd defined for imgClearKeypad **/
    AS_Image_b4b7bf19ad314be29ce6f421ded37a44: function AS_Image_b4b7bf19ad314be29ce6f421ded37a44(eventobject, x, y) {
        var self = this;
        this.clearKeypadChar();
    }
});