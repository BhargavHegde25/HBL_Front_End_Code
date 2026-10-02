define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onTouchStart defined for flxMenu **/
    AS_FlexContainer_a714750d75434487a606321993cf2753: function AS_FlexContainer_a714750d75434487a606321993cf2753(eventobject, x, y, context) {
        var self = this;
        this.setClickOrigin();
    },
    /** onClick defined for flxContent **/
    AS_FlexContainer_b3ec5585f59b4aadbd26c9ec57f44f54: function AS_FlexContainer_b3ec5585f59b4aadbd26c9ec57f44f54(eventobject, context) {
        var self = this;
        this.accountPressed(context);
    },
    /** onClick defined for flxFavorite **/
    AS_FlexContainer_cb39f151405341c99c318ba999ffd0cb: function AS_FlexContainer_cb39f151405341c99c318ba999ffd0cb(eventobject, context) {
        var self = this;
        event.stopPropagation();
        this.imgPressed(context);
    },
    /** onClick defined for flxMenu **/
    AS_FlexContainer_f93f419560b8404fb95ac17a2b1f56f4: function AS_FlexContainer_f93f419560b8404fb95ac17a2b1f56f4(eventobject, context) {
        var self = this;
        this.menuPressed();
    }
});