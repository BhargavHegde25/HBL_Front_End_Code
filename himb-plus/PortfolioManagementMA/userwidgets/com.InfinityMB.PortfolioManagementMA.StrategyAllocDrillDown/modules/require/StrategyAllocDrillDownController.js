define(function() {

  return {

    constructor: function(baseConfig, layoutConfig, pspConfig) {

      this.itemArray;
      this.data;
      this.currentLevel=0;
      this.breadCrumbData =[];
      this.jsonPath = [];
      this.setChartData;

      this.segheader=[{
        'lblSegment': kony.i18n.getLocalizedString("i18n.wealth.segment"),
        'lblStrategyWeightHeader': kony.i18n.getLocalizedString("i18n.wealth.strategyWeight")
      }];

      this.dataMapping={
        "lblSegName": "name",
        "lblStrategyWeight": "strategyWeight"
      }
    },

    initGettersSetters: function() {

    },
    setData: function(response, setChartData){
      
      this.setChartData = setChartData;

      //Newly added
      this.currentLevel=0;
      this.breadCrumbData =[];
      this.jsonPath = [];

      this.data = response;
      this.modifiedResponse = JSON.parse(JSON.stringify(response));
      for(var i=0; i<response.Assets.length; i++){
        for(var j=0; j<response.Assets.length; j++){
          if(response.Assets[i].ID === response.Assets[j].parentId){
            var tempValue = response.Assets[i].name;
            this.modifiedResponse.Assets[i].name = {
              skin: "sknlbl003E7536px",
              text: tempValue
            }
            break;
          }
        }
        this.modifiedResponse.Assets[i].strategyWeight =  this.modifiedResponse.Assets[i].strategyWeight + "%";
      }

      this.itemArray=[];
      this.currentLevel=0;

      this.view.segDrillDown.widgetDataMap = this.dataMapping;
      this.view.segDrillDown.onRowClick = this.handleRowClick;

      this.jsonPath.push(
        {
          "selectedRowItems": [
            {
              ID: "1",
              name: kony.i18n.getLocalizedString("kony.mb.login.Assets")
            }
          ]
        }
      );

      this.view.breadCrumb.setContext(["0", kony.i18n.getLocalizedString("kony.mb.login.Assets")], this.handleBreadcrumb)
      this.loadData();
    },

    loadData: function(){

      var resultData = [];
      var segData=[...this.segheader];
      var tSegData = this.getInitialSegment();
      if(tSegData && tSegData.length>0){
        segData.push(tSegData);
        resultData.push(segData);
        this.view.segDrillDown.removeAll();
        this.view.segDrillDown.setData(resultData);
        
        //lines for updating chart
        this.setChartData(tSegData, this.itemArray);
      }
    },

    getInitialSegment: function(){
      var initialData = this.data;
      var segData = [];
      for(let i=0; i<initialData.Assets.length; i++){
        
        if(Number(initialData.Assets[i].level) === 1){ //IW-4006 
          segData.push(this.modifiedResponse.Assets[i]);
        }
      }
      return segData;
    },

    getSegmentData: function(){
      var initialData = this.data;
      var segData = [];
      for(let i=0; i<initialData.Assets.length; i++){
        if(initialData.Assets[i].parentId === this.itemArray){
          segData.push(this.modifiedResponse.Assets[i]);
          continue;
        }
      }
      return segData;
    },

    handleBreadcrumb: function(btnObj){
      var level = Number(btnObj.id.substr(3, btnObj.id.length));
      this.jsonPath = this.jsonPath.slice(0, level);
      if(level===1){
        this.loadData();
      } else {
        var context = {};
        context.selectedRowItems = [];
        context.selectedRowItems[0] = {
          ID: this.jsonPath[level-1].selectedRowItems[0].ID,
          name : {
            skin: "sknlbl003E7536px",
            text: this.jsonPath[level-1].selectedRowItems[0].name,
          }
        }
        this.handleRowClick(context, 3);
      }
    },

    //isChangebreadCrumb takes 2 values, 1 the segment number, here by default its 0. 
    //But we are using it to verify if the breadcrumb changes is required. Do not change it.
    handleRowClick: function(context, isChangebreadcrumb){
      if(context.selectedRowItems[0].name.skin !== 'sknlbl003E7536px'){
        return;
      }
      var selectedRowItem = context.selectedRowItems[0].ID;
      let selectdRowName = context.selectedRowItems[0].name.text;

      this.jsonPath.push(
        {
          "selectedRowItems": [
            {
              ID : context.selectedRowItems[0].ID,
              name: context.selectedRowItems[0].name.text
            }
          ]
        }
      );

      if(this.data.Assets.filter(obj => { return obj.parentId  === selectedRowItem}).length !== 0){

        if(isChangebreadcrumb!=3){
          this.breadCrumbData.length = 0;
          this.breadCrumbData.push(selectedRowItem,selectdRowName);
          this.view.breadCrumb.loadButtons(this.breadCrumbData);
        }

        this.itemArray = selectedRowItem;
        var resultData = [];
        var segData=[...this.segheader];
        var tSegData = this.getSegmentData();
        if(tSegData && tSegData.length>0){
          segData.push(tSegData);
          resultData.push(segData);
          this.view.segDrillDown.removeAll();
          this.view.segDrillDown.setData(resultData);
          
          //lines for updating chart
          this.setChartData(tSegData, this.itemArray);
        } 
      }
    },
  };
});