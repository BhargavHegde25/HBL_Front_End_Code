define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** preShow defined for accountsTransactionListNative **/
    AS_FlexContainer_fe08877a8dda4bca82cf0a1d48b4cebb: function AS_FlexContainer_fe08877a8dda4bca82cf0a1d48b4cebb(eventobject) {
        var self = this;
        return self.preShow.call(this);
    },
    /** onRowClick defined for segTransactionsList **/
    AS_Segment_ba38f3958af74f0ca0a9ad05b7142b56: function AS_Segment_ba38f3958af74f0ca0a9ad05b7142b56(eventobject, sectionNumber, rowNumber) {
        var self = this;
        return self.getTransactionsDetails.call(this);
    },
    /** onReachingEnd defined for segTransactionsList **/
    AS_Segment_h196540cd9704bd18121a53ec75f18cc: function AS_Segment_h196540cd9704bd18121a53ec75f18cc(eventobject) {
        var self = this;
        return self.onscrollEnd.call(this);
    }
});