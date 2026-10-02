define(function() {

  return {
    data: {},
    segheader: [{
      lblAssetName: "Segment",
      lblCurrentWeight: "Current Weight",
      lblStrategyWeight: "Strategy Weight"
    }],
    constructor: function(baseConfig, layoutConfig, pspConfig) {

    },
    initGettersSetters: function() {

    },
    setData: function(data) {
      this.data = data;
      this.view.segDrillDown.onRowClick = this.handleRowClick;
      this.view.postShow = this.postShow;

      this.view.segDrillDown.widgetDataMap = {
        "flxAllocation": "flxAllocation",
        "lblAssetName": "lblAssetName",
		"lblCurrentWeight" : "lblCurrentWeight",
        "lblStrategyWeight": "lblStrategyWeight",
		"imgHealth": "imgHealth",
        "imgArrow": "imgArrow",
        "flxAssetName": "flxAssetName"
      };

      var resultData = [];
      var segData=[...this.segheader];
      var initSegData = this.getInitialData(this.data);
      segData.push(initSegData);
      resultData.push(segData);
      
      
      this.view.segDrillDown.setData(resultData);
    },

    postShow: function(){
      var resultData = [];
      var segData=[...this.segheader];
      var initSegData = this.getInitialData(this.data);
      segData.push(initSegData);
      resultData.push(segData);
      this.view.segDrillDown.setData(resultData);
    },

    getInitialData: function(data){
      var initialData = [];
      for(var i=0; i<data.length; i++){
        kony.print(data[i].level)
        if(data[i].level===0){
          var image="";
          if(data[i].healthStatus==="0"){
            image = "success_icon.png"
          } else {
            image = "alert.png"
          }

          var obj={
            "lblAssetName": data[i].name,
            "lblCurrentWeight": data[i].currentWeight+"%",
            "lblStrategyWeight": data[i].strategyWeight+"%",
            "item": data[i].item,
            "level": data[i].level,
            "imgHealth": image,
            "isExpanded": false
          }

          if(data[i+1] && data[i+1].level === data[i].level+1){
            obj.imgArrow = "right_arrow.png"
          } else {
            obj.imgArrow = "";
          }

          initialData.push(obj);
        }
      }
      return initialData;
    },

    handleRowClick: function(context) {
      var selectedIndex = context.selectedRowIndex[1];
      var segData = context.data[0][1];
      var selectedRow = segData[selectedIndex];

      var resultData = [];
      var tsegData=[...this.segheader];
      var segData = this.setRows(selectedIndex, segData, selectedRow.isExpanded);
      tsegData.push(segData);
      resultData.push(tsegData);
      
      //segData = this.setRows(selectedIndex, segData, selectedRow.isExpanded);

      this.view.segDrillDown.removeAll();
      this.view.segDrillDown.setData(resultData);

    },
    setRows: function(selectedIndex, segData, isDelete) {

      var newArr=[...segData]
      var rowData = segData[selectedIndex];
      var data = this.data;

      //Remove background skins
      for(var index=0; index< newArr.length; index++){ 
        newArr[index].flxAllocation={};
      }
      
      //Toggle arrow mark
      if(newArr[selectedIndex].imgArrow==="right_arrow.png"){
        newArr[selectedIndex].imgArrow="arrow_down.png";
      } else if(newArr[selectedIndex].imgArrow==="arrow_down.png"){
        newArr[selectedIndex].imgArrow="right_arrow.png"
      }

      //set background skin for selected row
      newArr[selectedIndex].flxAllocation = {skin: "sknFlxf5f5f5BottomBorder"};
      
      //Toggle expanded row
      newArr[selectedIndex].isExpanded = !newArr[selectedIndex].isExpanded;
      
      var insertIndex = selectedIndex+1;

      //(!isDelete) is Adding rows
      if(!isDelete){
        
        for(var i=rowData.item+1; i<data.length; i++){
          if(rowData.level+1 === data[i].level){
            var image="";
            if(data[i].healthStatus==="0"){
              image = "success_icon.png"
            } else {
              image = "alert.png"
            }
            
            var shrt = {"toolTip" : data[i].name,
              "text" : data[i].name};
            if(data[i].name.length > 25){
              shrt = {"toolTip" : data[i].name,
						"text" : data[i].name.substr(0, 24) + '...'};
            }
            
            
            

            var obj={
              "lblAssetName": shrt,
              "lblCurrentWeight": data[i].currentWeight+"%",
              "lblStrategyWeight": data[i].strategyWeight+"%",
              "item": data[i].item,
              "level": data[i].level,
              "isExpanded": false,
              "imgHealth": image
            }

            if(data[i+1] && data[i+1].level === data[i].level+1) {
              obj.imgArrow = "right_arrow.png"
            } else {
               obj.imgArrow = ""
            }

            newArr.splice(insertIndex++, 0, obj);

          } else if ( rowData.level === data[i].level ){
            break;
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
      }

      for(var index=0; index< newArr.length; index++){
        if(newArr[index+1] && newArr[index+1].level === newArr[index].level+1) {
          newArr[index].imgArrow = "arrow_down.png"
        }
        var leftSize = ((newArr[index].level+1)*2) + "%";
        newArr[index].flxAssetName = { left: leftSize };
        
      }

      return newArr;
    }
  };
});