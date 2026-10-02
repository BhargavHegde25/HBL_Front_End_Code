/*eslint-disable*/
define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {

    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      defineGetter(this, 'rowTemplateId', () => {
        return this._rowTemplateId;
      });
      defineSetter(this, 'rowTemplateId', value => {
        this._rowTemplateId = value;
      });
      defineGetter(this, 'headerTemaplateId', () => {
        return this._headerTemaplateId;
      });
      defineSetter(this, 'headerTemaplateId', value => {
        this._headerTemaplateId = value;
      });
      defineGetter(this, 'widgetMapping', () => {
        return this._widgetMapping;
      });
      defineSetter(this, 'widgetMapping', value => {
        this._widgetMapping = value;
      });
      defineGetter(this, 'segHeader', () => {
        return this._segHeader;
      });
      defineSetter(this, 'segHeader', value => {
        this._segHeader = value;
      });
    },
    segheader:[],

    setData: function(data,initialstoreData) {
      this.segheader = [];
      this.segheader.push(this._segHeader);
      this.data = data;
      this.initialstoreData = initialstoreData;
      this.view.segDrillDown.onRowClick = this.handleRowClick;
      this.view.postShow = this.postShow;
      this.view.segDrillDown.rowTemplate =  this._rowTemplateId;
      if(scope_WealthPresentationController.ishealthcheck || scope_WealthPresentationController.isStrategyAllocation){
	  this.view.segDrillDown.sectionHeaderTemplate =  this._headerTemaplateId;
      }else{
        this.view.segDrillDown.sectionHeaderTemplate =  "flxAllocHead";
      }
      this.view.segDrillDown.widgetDataMap = this._widgetMapping;

      var resultData = [];
      var segData=[...this.segheader];
      var initSegData = this.initialstoreData;
      segData.push(initSegData);
      resultData.push(segData);
      this.view.segDrillDown.removeAll();

      this.view.segDrillDown.setData(resultData);
    },
    postShow: function(){
      var resultData = [];
      var segData=[...this.segheader];
      var initSegData = this.initialstoreData;
      segData.push(initSegData);
      resultData.push(segData);
      this.view.segDrillDown.removeAll();
      this.view.segDrillDown.setData(resultData);
    },

    handleRowClick: function(context) {
      var selectedIndex = context.selectedRowIndex[1];
      var segData = context.data[0][1];
      var selectedRow = segData[selectedIndex];

      var resultData = [];
      var tsegData=[...this.segheader];
      var segData = this.sendData(selectedIndex, segData, selectedRow.isExpanded,this.data);
      tsegData.push(segData);
      resultData.push(tsegData);


      this.view.segDrillDown.removeAll();
      this.view.segDrillDown.setData(resultData);

    }

  };
});