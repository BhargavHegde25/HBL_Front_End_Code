define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onTouchStart defined for flxMenu **/
    AS_FlexContainer_a07edfd3bbe443b5ad589fc2603bdbe3: function AS_FlexContainer_a07edfd3bbe443b5ad589fc2603bdbe3(eventobject, x, y, context) {
        var self = this;
        this.setClickOrigin();
    },
    /** onTouchEnd defined for flxContent **/
    AS_FlexContainer_bcdba945318145319129d82f7bc6fcd6: function AS_FlexContainer_bcdba945318145319129d82f7bc6fcd6(eventobject, x, y, context) {
        var self = this;
        this.accountPressed(context);
    },
    /** onClick defined for flxFavorite **/
    AS_FlexContainer_c73fb08523a744edb59d1e4016937ca7: function AS_FlexContainer_c73fb08523a744edb59d1e4016937ca7(eventobject, context) {
        var self = this;
        event.stopPropagation();
        this.imgPressed(context);
    },
    /** onClick defined for flxMenu **/
    AS_FlexContainer_fbb9763a8b5343c99a6770c2d718ea37: function AS_FlexContainer_fbb9763a8b5343c99a6770c2d718ea37(eventobject, context) {
        var self = this;
        this.menuPressed();
    }
});