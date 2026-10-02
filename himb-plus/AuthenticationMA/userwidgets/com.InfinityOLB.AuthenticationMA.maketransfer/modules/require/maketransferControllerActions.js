define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** preShow defined for maketransfer **/
    AS_FlexContainer_c34a9de111bb4ee3b6e3d30bb0ccf858: function AS_FlexContainer_c34a9de111bb4ee3b6e3d30bb0ccf858(eventobject) {
        var self = this;
        //this.createACustomCalendarWidget();
    },
    /** postShow defined for maketransfer **/
    AS_FlexContainer_h8dc98fe1614471fb74ee48079e8fcbf: function AS_FlexContainer_h8dc98fe1614471fb74ee48079e8fcbf(eventobject) {
        var self = this;
        this.renderCalendarMakeTransfer();
    },
    /** onTouchEnd defined for imgAddAttachment **/
    AS_Image_ddf3753121a4418eb48863413365fe08: function AS_Image_ddf3753121a4418eb48863413365fe08(eventobject, x, y) {
        var self = this;
        return self.attachDocumentsTransfer.call(this);
    },
    /** onSelection defined for lbxFrequencymod **/
    AS_ListBox_c2621569d1444ccc9bf2c44878e25a2a: function AS_ListBox_c2621569d1444ccc9bf2c44878e25a2a(eventobject) {
        var self = this;
        this.getFrequencyAndFormLayout();
    },
    /** onSelection defined for lbxForHowLongmod **/
    AS_ListBox_dadc522b499a4f589921489825a1bee4: function AS_ListBox_dadc522b499a4f589921489825a1bee4(eventobject) {
        var self = this;
        this.getForHowLongandFormLayout();
    }
});