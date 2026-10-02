define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    AS_BarButtonItem_f0c359b1f4cf42fba85079ae4f8fe82b: function AS_BarButtonItem_f0c359b1f4cf42fba85079ae4f8fe82b(eventobject) {
        var self = this;
        this.flxBacks();
    },
    /** onClick defined for flxApprovalsCounter **/
    AS_FlexContainer_g8bc9d5039d04dd8a26ef32f5e3f113c: function AS_FlexContainer_g8bc9d5039d04dd8a26ef32f5e3f113c(eventobject) {
        var self = this;
        return self.navigate2ApprovalsPending.call(this);
    },
    /** onClick defined for flxRequestCounter **/
    AS_FlexContainer_jab21009dec64ec1bf08c1539358941a: function AS_FlexContainer_jab21009dec64ec1bf08c1539358941a(eventobject) {
        var self = this;
        return self.navigate2RequestsPending.call(this);
    },
    /** onTouchStart defined for flxDummyHorizontalScroll **/
    AS_FlexScrollContainer_g6584c4709cc4755936aa5f22dde64ef: function AS_FlexScrollContainer_g6584c4709cc4755936aa5f22dde64ef(eventobject, x, y) {
        var self = this;
        this.bringFlxDashboardHeaderToFront()
    },
    /** init defined for frmUnifiedDashboard **/
    AS_Form_afdd309d4f7840038605f9d642d03cb8: function AS_Form_afdd309d4f7840038605f9d642d03cb8(eventobject) {
        var self = this;
        this.init();
    },
    /** postShow defined for frmUnifiedDashboard **/
    AS_Form_f7a6ed7a50ab441a98540d15de73db4b: function AS_Form_f7a6ed7a50ab441a98540d15de73db4b(eventobject) {
        var self = this;
        this.postShow();
    },
    /** preShow defined for frmUnifiedDashboard **/
    AS_Form_h735b85568be4874b480cbb5aa2ab465: function AS_Form_h735b85568be4874b480cbb5aa2ab465(eventobject) {
        var self = this;
        this.preshow();
    },
    /** onDownloadComplete defined for imgAd2 **/
    AS_Image_a3bd2fe3dff84ddca14b1bbc33b2b745: function AS_Image_a3bd2fe3dff84ddca14b1bbc33b2b745(eventobject, imagesrc, issuccess) {
        var self = this;
        this.onAdDownloadComplete(issuccess, 2);
    },
    /** onDownloadComplete defined for imgAd4 **/
    AS_Image_eccd2511d05041b6af6900eeaf5d3af4: function AS_Image_eccd2511d05041b6af6900eeaf5d3af4(eventobject, imagesrc, issuccess) {
        var self = this;
        this.onAdDownloadComplete(issuccess, 4);
    },
    /** onDownloadComplete defined for imgAd3 **/
    AS_Image_f6e4c65edfa04f4cbf10360a18fcb0ee: function AS_Image_f6e4c65edfa04f4cbf10360a18fcb0ee(eventobject, imagesrc, issuccess) {
        var self = this;
        this.onAdDownloadComplete(issuccess, 3);
    },
    /** onDownloadComplete defined for imgAd5 **/
    AS_Image_gbd44edef48043b29fd0829645f7e2c2: function AS_Image_gbd44edef48043b29fd0829645f7e2c2(eventobject, imagesrc, issuccess) {
        var self = this;
        this.onAdDownloadComplete(issuccess, 5);
    },
    /** onDownloadComplete defined for imgAd1 **/
    AS_Image_hac84a91a21749f2a46b960152954fd4: function AS_Image_hac84a91a21749f2a46b960152954fd4(eventobject, imagesrc, issuccess) {
        var self = this;
        this.onAdDownloadComplete(issuccess, 1);
    },
    /** onFilterChanged defined for investmentLineChart **/
    AS_UWI_ga0c80cd09bd4d3ca5688c951c69a1f9: function AS_UWI_ga0c80cd09bd4d3ca5688c951c69a1f9(filter) {
        var self = this;
        return self.onFilterChanged.call(this, filter);
    }
});