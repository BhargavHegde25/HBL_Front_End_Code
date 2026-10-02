/* eslint-disable */
define(function() {

  return {
    toggle : false,
    filter : [],
    constructor: function(baseConfig, layoutConfig, pspConfig) {

    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
    },


    toggleFilter : function() {
      if(this.toggle)
      {
        this.view.imgAdvancedFilter.src = "filter_wealth.png";
        this.view.flxFiltersList.setVisibility(false);
        this.toggle = false;
      }
      else
      {
        this.view.imgAdvancedFilter.src = "advance_search.png";
        this.view.flxFiltersList.setVisibility(true);        
        this.toggle = true;
      }
    },

    setFilterSegment: function(resp, callback){
      var scope= this;
      scope.callback = callback;
      this.view.lblCurrentOption.text = resp[0];
      this.view.flxAdvancedFilter.onTouchEnd = this.toggleFilter;
      this.view.sgmtFilterOptions.onRowClick = this.onFilterRowClick;
      var results = [];
      for(var i in resp){
        if(i==="0"){
          var storeFilter = {
            Option : {
              text : resp[i],
              skin : "sknlbl4176a4SSPR35px"
            },
            flxSeparator: {
              "isVisible": true
            },
            FilterClick: {
              "onClick": function(event, context) {
                scope.onFilterRowClick(event, context);
              }.bind(this)
            },
            isSelected : true
          };
          results.push(storeFilter);
        }
        else{
          storeFilter = {
            Option : {
              text : resp[i],
              skin : "sknlbl424242SSPR35px"
            },
            flxSeparator: {
              "isVisible": true
            },
            FilterClick: {
              "onClick": function(event, context) {
                scope.onFilterRowClick(event, context);
              }.bind(this)
            },
            isSelected : false
          };
          results.push(storeFilter);
        }
        this.filter = results;
      }
      this.view.sgmtFilterOptions.widgetDataMap = {
        lblFilterOption : "Option",
        flxSeparator : "flxSeparator",
        flxPastProposalFilter:"FilterClick"
      };
      this.view.sgmtFilterOptions.setData(results);
    },

    onFilterRowClick: function (event, context){
    
      //var rowindex=context.selectedRowIndex[1];
      var rowindex;
      if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){  
        rowindex=context.rowIndex;
      }
      else
      {
        rowindex=this.view.sgmtFilterOptions.selectedRowIndex[1];
      }
      this.filterone = this.filter;
      this.selectedRow = rowindex;
      this.filterone.forEach(function(e){
        e.isSelected = false;
        e.Option.skin = "sknlbl424242SSPR35px"
      });
      this.filterone[rowindex].isSelected = true;
      this.filterone[rowindex].Option = {
        "skin" : "sknlbl4176a4SSPR35px",
        "text" : this.filterone[rowindex].Option.text
      };
      this.view.sgmtFilterOptions.removeAll();
      this.view.sgmtFilterOptions.setData(this.filterone);
      this.view.lblCurrentOption.text = this.filterone[rowindex].Option.text;
      var val = Object.keys(this.view.sgmtFilterOptions.data[rowindex])[0];
      //this.callback(this.view.sgmtFilterOptions.data[rowindex][val]);
	  this.callback(this.filterone[rowindex].Option);
      this.toggle = true;
      this.toggleFilter();
    },

    goBack:function(){
      if(this.filter !== 0 || this.filter !== "0" || this.filter.length !== 0){
        this.gopast = this.filter;
        this.view.sgmtFilterOptions.removeAll();
        this.view.sgmtFilterOptions.setData(this.gopast);
        this.view.flxFiltersList.setVisibility(false);
      }
    }

  }
});