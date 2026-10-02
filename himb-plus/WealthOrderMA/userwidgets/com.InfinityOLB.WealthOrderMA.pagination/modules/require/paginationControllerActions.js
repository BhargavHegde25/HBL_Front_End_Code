define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** preShow defined for pagination **/
    AS_FlexContainer_a6f2c2fc3bcf4804a7458fb5bc17eebc: function AS_FlexContainer_a6f2c2fc3bcf4804a7458fb5bc17eebc(eventobject) {
        var self = this;
        this.preshow();
    },
    /** postShow defined for pagination **/
    AS_FlexContainer_dab5e412589142de9b813976eed34088: function AS_FlexContainer_dab5e412589142de9b813976eed34088(eventobject) {
        var self = this;
        this.postshow();
    },
    /** onHide defined for pagination **/
    AS_FlexContainer_f4ba280a9a00495e8b64a49bd423a44b: function AS_FlexContainer_f4ba280a9a00495e8b64a49bd423a44b(eventobject) {
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
    AS_FlexContainer_g4e374158166465cbe45782a38c5d93b: function AS_FlexContainer_g4e374158166465cbe45782a38c5d93b(eventobject, breakpoint) {
        var self = this;
        this.onBreakPointChange();
    }
});