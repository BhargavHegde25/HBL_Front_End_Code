/* eslint-disable */
define(['./strategyAllocationDAO'],function(strategyAllocationDAO) {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.businessController = new strategyAllocationDAO();
      this.context = {};
      this.view.postShow = this.postShow;

    },

    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
            defineGetter(this, 'serviceParam', () => {
                return this._serviceParam;
            });
            defineSetter(this, 'serviceParam', value => {
                this._serviceParam = value;
            });
        },
    
    setPersonalizeStrategyBtn: function(isVisible){
      this.view.btnStartegy.isVisible = isVisible;

    },
    
    setContext: function(context) {
      this.context = context;
      scope_WealthPresentationController.isStrategyAllocation = true;
      if(typeof(this._serviceParam) === 'string'){
            this._serviceParam = JSON.parse(this._serviceParam);
       }
      this.businessController.fetchDetails(
        this._serviceParam.ServiceName,
        this._serviceParam.OperationName,
        this._serviceParam.ObjectName,
        this.context,
        this.onServiceSuccess,
        this.onServiceSuccess
      );
    },

    postShow: function() {
      this.view.btnStartegy.onClick = this.PersonalizeYourStrategy;
    },
    PersonalizeYourStrategy : function(){
      new kony.mvc.Navigation({"appName": "PortfolioManagementMA","friendlyName": "frmPersonalizeStrategy"}).navigate();
    },

    onServiceSuccess: function(response) {
      var data = response.strategyAlloc;
      for(var i=0;i<data.length;i++){
        data[i].item = i;
        data[i].level = parseInt(data[i].level);
      }
      this.setIntialSegment(data);
      var chartData = this.getChartData(data,true);
      if(kony.application.getCurrentBreakpoint() === 1024){
        if(chartData.labelArray.length > 4){
          var requiredHeight = chartData.labelArray.length * 75;
          this.view.flxGraph.height = (requiredHeight) + "px";
        }else{
          this.view.flxGraph.height = "300px";
        }
      }
      this.view.AllocationGraph.setData(chartData);
      this.view.AllocationGraph.checkVisibility(false);
    },


    setIntialSegment : function(data){
      var isRTL = scope_WealthPresentationController.rtlLocale.includes(kony.i18n.getCurrentLocale());
      var initialData = [];
      for (var i = 0; i < data.length; i++) {
		  // for TAP.T24,MOCK level must start from 1
        if (data[i].level === 1) {
          var imageArrow = "";
          for(var j=0;j<data.length;j++){
            if (data[j] && data[j].level === data[i].level + 1 && (parseInt(data[i].ID)) === (parseInt(data[j].parentId))) {
              imgArrow = isRTL ?"arrow_left.png" : "right_arrow.png" 
              break;
            } else {
              imgArrow = "";
            }
          }
          var shrt = {
            "toolTip": data[i].name,
            "text": data[i].name
          };
          if (data[i].name.length > 25) {
            shrt = {
              "toolTip": data[i].name,
              "text": data[i].name.substr(0, 24) + '...'
            };
          }
          var decfixstratwt = data[i].strategyWeight.split(".");
          var storeData = {
            assetName: shrt,
            StrategyWeight: (decfixstratwt[1] !== undefined && (decfixstratwt[1] === "00" || decfixstratwt[1] === "0" || decfixstratwt[1][1] === "0" || decfixstratwt[1][1] === undefined))? parseFloat(data[i].strategyWeight).toFixed(1) + "%" : parseFloat(data[i].strategyWeight).toFixed(2) + '%',
            item: data[i].item,
            level: data[i].level,
            imgArrow : imgArrow,
            isExpanded: false,
            ID: data[i].ID,
            parentId: data[i].parentId,
            flxSep:{}
          };

          initialData.push(storeData);

        }
      }
      if (initialData[initialData.length - 1].flxSep) 
      {
        initialData[initialData.length - 1].flxSep.isVisible = false;
            this.view.sampledrilldown.setData(data, initialData);
      }
      var scope = this;
      this.view.sampledrilldown.sendData = function(selectedIndex, segData, isDelete, data) {
        var newArr = [...segData]
        var rowData = segData[selectedIndex];
        var graphData = [];
        var data = this.data;


        //Remove background skins
        for(var index=0; index< newArr.length; index++){ 
          newArr[index].flxAllocation={};
        }

        //Toggle arrow mark
        var arrow = isRTL ? "arrow_left.png" : "right_arrow.png";
        if(newArr[selectedIndex].imgArrow === arrow){
          newArr[selectedIndex].imgArrow="arrow_down.png";
        } else if(newArr[selectedIndex].imgArrow==="arrow_down.png"){
          newArr[selectedIndex].imgArrow= arrow;
        }
        //set background skin for selected row
        newArr[selectedIndex].flxAllocation = {
          skin: "sknFlxf5f5f5BottomBorder"
        };
        //Toggle expanded row
        newArr[selectedIndex].isExpanded = !newArr[selectedIndex].isExpanded;
        if(newArr[selectedIndex].imgArrow === ""){
          newArr[selectedIndex].isExpanded = false;
        }
        //(!isDelete) is Adding rows
        if (!isDelete) {
          for (var i = 0; i < newArr.length; i++) {


            if (selectedIndex !== i && rowData.level < newArr[i].level) {

              if(newArr[i].parentId === newArr[i-1].ID){
                newArr[i-1].isExpanded = false;
                newArr[i-1].imgArrow = isRTL ?"arrow_left.png" : "right_arrow.png";
              }

              newArr.splice(i, 1);
              if(i<selectedIndex)
                selectedIndex--;
              i--;
            }

          }

          var insertIndex = selectedIndex + 1;
          for (var i = rowData.item + 1; i < data.length; i++) {
            if (rowData.level + 1 === data[i].level && (parseInt(rowData.ID)) === (parseInt(data[i].parentId))) {
              var shrt = {
                "toolTip": data[i].name,
                "text": data[i].name
              };
              if (data[i].name.length > 25) {
                shrt = {
                  "toolTip": data[i].name,
                  "text": data[i].name.substr(0, 24) + '...'
                };
              }
              for(var j=0;j< data.length;j++){
                if (data[j] && data[i].level+1 === data[j].level && (parseInt(data[i].ID)) === (parseInt(data[j].parentId))) {
                  imgArrow = isRTL ?"arrow_left.png" : "right_arrow.png"
                  break;
                } else {
                  imgArrow = ""
                }
              }
              var decfixstratwt = data[i].strategyWeight.split(".");
              var storeData = {
                assetName: shrt,
                StrategyWeight: (decfixstratwt[1] !== undefined && (decfixstratwt[1] === "00" || decfixstratwt[1] === "0" || decfixstratwt[1][1] === "0" || decfixstratwt[1][1] === undefined))? parseFloat(data[i].strategyWeight).toFixed(1) + "%" : parseFloat(data[i].strategyWeight).toFixed(2) + '%',
                item: data[i].item,
                level: data[i].level,
                imgArrow : imgArrow,
                isExpanded: false,
                ID: data[i].ID,
                parentId: data[i].parentId
              };
              graphData.push(storeData);
              newArr.splice(insertIndex++, 0, storeData);
            } else if (rowData.level === data[i].level) {
              continue;
            }
          }
        } else {
          var j=selectedIndex+1;
          while(j<data.length && j<newArr.length){
            if(rowData.level < newArr[j].level){
              newArr.splice(j, 1);
            } else {
              break;
            }
          }
          for(var k= 0;k<newArr.length;k++){
            if(rowData.level+1 === newArr[k].level)
            {
              graphData.push(newArr[k]);
            }            
            else if(rowData.parentId === newArr[k].parentId){
              graphData.push(newArr[k]);
            }
          }
        }
        
        // for drill down graph
        if (!(graphData.length)) {
          for (var k = 0; k < newArr.length; k++) {
            if(rowData.level  === newArr[k].level){
              graphData.push( newArr[k]);
            }
          }

        }
        var chartData = scope.getChartData(graphData,false);
        if(kony.application.getCurrentBreakpoint() === 1024){
          if(chartData.labelArray.length > 4){
            var requiredHeight = chartData.labelArray.length * 75;
            scope.view.flxGraph.height = (requiredHeight) + "px";
          }else{
            scope.view.flxGraph.height = "300px";
          }
        }
        scope.view.AllocationGraph.setData(chartData);
        scope.view.AllocationGraph.checkVisibility(false);
        for (var index = 0; index < newArr.length; index++) {
          if (newArr[index + 1] && newArr[index + 1].level === newArr[index].level + 1) {
            newArr[index].imgArrow = "arrow_down.png"
          }
          var leftSize = ((newArr[index].level + 1) * 2) + "%";
          newArr[index].flxAssetName = {
            left: leftSize
          };
        }
        return newArr;
      }
    },
    getChartData: function(flatData,flag){
      var chartData={};
      var labelArray = [];
      var arrIndex=0;
      var seriesArray = [];
      seriesArray[0] = [];  //Strategy Weight
      const colArray = ["#E8705B","#BF04C4","#7E04C4","#3AB1D6","#3E75A6", "#2C82BE", "#24BFEC", "#76DDFB", "#C7CCD5", "#3E75A6", "#2C82BE", "#24BFEC"];
      if(flag === true){
        for(var index=0; index<flatData.length; index++){
		// for TAP.T24,MOCK level must start from 1
          if(flatData[index].level===1){
            seriesArray[0][arrIndex] = flatData[index].strategyWeight;
            labelArray[arrIndex] = flatData[index].name;
            arrIndex++;
          }
        }
      }else{
        for(var index=0; index<flatData.length; index++){
          seriesArray[0][arrIndex] = flatData[index].StrategyWeight.slice(0,-1);
          labelArray[arrIndex] = flatData[index].assetName.text;
          arrIndex++;
        }
      }

      chartData.labelArray = labelArray;
      chartData.seriesArray = seriesArray;
      chartData.colArray = colArray;
      chartData.offSetVal = false;

      return chartData;
    },



    /**
    * @api: setError
    * Gets trigerred when any exception occurs in any method in view controller
    * @arg1: errorMsg {String} - error message
    * @arg2: method {String} - method from which error message is received
    * @return: NA
    **/
    setError: function (errorMsg, method) {
      let errorObj = {
        "level": "ComponentViewController",
        "method": method,
        "error": errorMsg
      };
      this.onError(errorObj);
    },
    onError: function(err) {
      kony.print(JSON.stringify(err));
    },
  };
});