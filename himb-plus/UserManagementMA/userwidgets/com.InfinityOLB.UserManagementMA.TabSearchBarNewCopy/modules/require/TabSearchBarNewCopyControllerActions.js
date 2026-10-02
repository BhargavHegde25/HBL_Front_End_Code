define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** preShow defined for TabSearchBarNewCopy **/
    AS_FlexContainer_d15c2bc7e1cf481baca028ce2ae81401: function AS_FlexContainer_d15c2bc7e1cf481baca028ce2ae81401(eventobject) {
        var self = this;
        //this.invokePreShow();
    },
    /** onTouchStart defined for imgOption0 **/
    AS_Image_f165605ba66a49afb02f1a9c1264172e: function AS_Image_f165605ba66a49afb02f1a9c1264172e(eventobject, x, y) {
        var self = this;
        if (this.view.imgOption0.src === "radioinactivebb.png") {
            this.view.imgOption0.src = "radioactivebb.png";
            this.view.imgOption1.src = "radioinactivebb.png";
            this.view.flxToggleOptions.forceLayout();
            if (this.onOptionToggle !== undefined && this.onOptionToggle !== null) {
                this.onOptionToggle();
            }
        }
    },
    /** onTouchStart defined for imgOption1 **/
    AS_Image_f71336f103df447c856545b35ff5b232: function AS_Image_f71336f103df447c856545b35ff5b232(eventobject, x, y) {
        var self = this;
        if (this.view.imgOption1.src === "radioinactivebb.png") {
            this.view.imgOption1.src = "radioactivebb.png";
            this.view.imgOption0.src = "radioinactivebb.png";
            this.view.flxToggleOptions.forceLayout();
            if (this.onOptionToggle !== undefined && this.onOptionToggle !== null) {
                this.onOptionToggle();
            }
        }
    }
});