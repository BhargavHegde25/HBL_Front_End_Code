define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** postShow defined for pagination **/
    AS_FlexContainer_f901be43d6e84d42b0d62e2906286477: function AS_FlexContainer_f901be43d6e84d42b0d62e2906286477(eventobject) {
        var self = this;
        this.postshow();
    },
    /** onHide defined for pagination **/
    AS_FlexContainer_fa4d33ef5c764cbf85a562b60e5b4e01: function AS_FlexContainer_fa4d33ef5c764cbf85a562b60e5b4e01(eventobject) {
        var self = this;
        var currentPage = 0;
        var totalPages = 0;
        var currentPageSize = 0;
        var totalRecordsCount = 0;
        var startIndex = 1;
        var endIndex = 0;
        var isMaxLimitReached = false;
        var tokens = {
            "currentPage": "",
            "totalPages": "",
            "currentPageSize": "",
            "totalRecords": "",
            "startIndex": "",
            "endIndex": ""
        };
    },
    /** onBreakpointChange defined for pagination **/
    AS_FlexContainer_g6277e532e834f27a88bd9e222649a78: function AS_FlexContainer_g6277e532e834f27a88bd9e222649a78(eventobject, breakpoint) {
        var self = this;
        this.onBreakPointChange();
    },
    /** preShow defined for pagination **/
    AS_FlexContainer_i330723b0da541b088e7962ccb9c50fe: function AS_FlexContainer_i330723b0da541b088e7962ccb9c50fe(eventobject) {
        var self = this;
        this.preshow();
    }
});