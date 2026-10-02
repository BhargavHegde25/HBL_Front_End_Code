define(['./ParserUtilsManager'],function (ParserUtilsManager) {

  return {
    constructor: function (baseConfig, layoutConfig, pspConfig) {
//this.columnPickerInitialData=["Quantity","Latest Price","Average Cost","Market Value","Weight%","Unrealised P&L","Asset Class","Region","Sector","Currency","Exchange Rate","Market Value(pos ccy)","Cost Value","Cost Exchange Rate","Unrealised P&L %","Daily P&L","Daily P&L %"];
this.columnPickerFinalData=[];
this.popupInitialData=[];
this.popupFinalData=[];
this.initialPopupLoad=true;
this.defaultChange=true;
//WIW-1312 - issue fix start
this.optionalColoumns = [
    kony.i18n.getLocalizedString("i18n.wealth.assetClass"),
	kony.i18n.getLocalizedString("i18n.wealth.subAssetClass"),
	kony.i18n.getLocalizedString("i18n.wealth.region"),
	kony.i18n.getLocalizedString("i18n.wealth.sector"),
	kony.i18n.getLocalizedString("i18n.wealth.watchlist.currency"),
	kony.i18n.getLocalizedString("i18n.ForeignExchange.ExchangeRate"),
	kony.i18n.getLocalizedString("i18n.wealth.marketValuePosCcy"),
	kony.i18n.getLocalizedString("i18n.wealth.holdings.unrealisedPL"),
	kony.i18n.getLocalizedString("i18n.wealth.costExchangeRate"),
	kony.i18n.getLocalizedString("i18n.wealth.holdings.dailyPL"),
	kony.i18n.getLocalizedString("i18n.wealth.holdings.dailyPLPercent"),
] 
//WIW-1312 - issue fix end
//this.selectedColumn=["0","1","2","3","4","5"];
       //Parser Util Object
      this.parserUtilsManager = new ParserUtilsManager();
     

    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function () {
      defineGetter(this, 'displayNames', () => {
        return this._displayNames;
      });
      defineSetter(this, 'displayNames', value => {
        this._displayNames = value;
      });
      defineGetter(this, 'selectedColumns', () => {
        return this._selectedColumns;
      });
      defineSetter(this, 'selectedColumns', value => {
        this._selectedColumns = value;
      });
    },
    
    setColumnArray: function(data){
      this.selectedColumn=data.selectedColumnForSettings;
      if(data.selectedDisplayNames === "" || data.selectedDisplayNames === undefined){
        var initialData=this.getFieldValue(this._displayNames);
        this.columnPickerInitialData=initialData.split(',');
      }
      else{
        this.columnPickerInitialData = data.selectedDisplayNames;
      }
          this.onClickSettings();
    },
    postshow: function () {
      var flex=this.view.flxParent.widgets();
			for(i=0;i<flex.length-1;i++){
				this.view[flex[i].id].setVisibility(true);
			}
      var initialData=this.getFieldValue(this._displayNames);
      this.columnPickerInitialData=initialData.split(',');
      var columnValues=this.getFieldValue(this._selectedColumns);
      this.selectedColumn=columnValues.split(',');
      this.view.flxClose.onTouchEnd=this.closePopUp;
      this.view.btnSave.onClick=this.onClickSaveChanges;
      this.view.btnDefaultMode.onClick=this.onDefaultModeClick;
      this.enableDragAndDrop();
      this.checkboxClick();
      this.onClickSettings();
    },
    /**
     * Component getFieldValue
     * Parse the exposed contract value based on accountType selected and breakpoint consideration
     * @param: Value{string} - value collected from exposed contract
     * @param: key{string} - lookup key in the JSON string
     * @return : {string} - Processed value
     */
    getFieldValue: function(Value,key) {
      try 
      {
        var value = Value;
        if(typeof(Value) == "string"){
          value = JSON.parse(Value);
        }
        if(value[this.accountType]){
          value = value[this.accountType];
        }
        if(!this.isEmptyNullUndefined(value) && !this.isEmptyNullUndefined(key)){
          value = value[key];
        }
        if (value !== null && value !== "" && value !== undefined) {
          if(typeof(value)=="string")
            return this.getProcessedText(value);
          else{
            var text=this.breakPointParser(value,kony.application.getCurrentBreakpoint());
            return this.getProcessedText(text);
          }
        } else return "";
      }  
      catch(err)
      {
        kony.print(err);
      }
      return this.getProcessedText(Value);
    },
      /**
     * Component breakPointParser
     * Helper method to parse the exposed contract based on the current breakpoint
     * inputJSON {JSONObject} - object containing information about various breakpoints and associated texts
     * lookUpKey {string}     - current breakpoint value to be looked upon the above object
     * @return : value of the lookup key in the input object
     */
    breakPointParser:function(inputJSON,lookUpKey){
      var self = this;
      try
      {
        if(inputJSON.hasOwnProperty(lookUpKey)){
          return inputJSON[lookUpKey];
        }
        else if(inputJSON.hasOwnProperty("default")){
          return inputJSON["default"];
        }
        return inputJSON;
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in parsing th break point",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
  
     /**
     * Component getProcessedText
     * Pass the text to format util to obtained the processed value.
     * text {string} - value to be processed
     * @return : {string} - processed value
     */
    getProcessedText:function(text){
      return this.parserUtilsManager.getParsedValue(text);
    },
   
    
    isEmptyNullUndefined:function(data){
      if(data === null || data === undefined || data === "")
        return true;
      return false;
    },
    resetFlex: function(){
      this.view.flxR1.setVisibility(false);
      this.view.flxR2.setVisibility(false);
      this.view.flxR3.setVisibility(false);
      this.view.flxR4.setVisibility(false);
      this.view.flxR5.setVisibility(false);
      this.view.flxR6.setVisibility(false);
      this.view.flxR7.setVisibility(false);
      this.view.flxR8.setVisibility(false);
      this.view.flxR9.setVisibility(false);
      this.view.flxR10.setVisibility(false);
      this.view.flxR11.setVisibility(false);
      this.view.flxR12.setVisibility(false);
      this.view.flxR13.setVisibility(false);
      this.view.flxR14.setVisibility(false);
      this.view.flxR15.setVisibility(false);
      this.view.flxR16.setVisibility(false);
      this.view.flxR17.setVisibility(false);
       this.view.flxR18.setVisibility(false);
    },
    setColumnPicker: function() {
      		this.resetFlex();
            var scope = this;
                var parent = this.view.flxParent.widgets();
                var temp;
                var lbl;
                var dummylbl;
                var flxCheck;
                var img;
                // for(i=0;i<parent.length-1;i++){
                for (i = 0; i < this.selectedColumn.length; i++) {
                    this.view[parent[i].id].setVisibility(true);
                    temp = this.view[parent[i].id].widgets();
                    lbl = temp[0];
                    dummylbl = temp[2];
                    flxCheck = temp[3];
                    img = this.view[flxCheck.id].widgets();
                    this.view[lbl.id].text = this.columnPickerInitialData[parseInt(this.selectedColumn[i])];
                    this.view[dummylbl.id].text = this.selectedColumn[i];
                    this.view[img[0].id].src = "activecheckbox.png";
                    if (parseInt(this.selectedColumn[i]) < 6) {
                        this.view[img[0].id].setEnabled(false);
                    } else {
                        this.view[img[0].id].setEnabled(true);
                    }
                }
                var count=0;                      
                for (j = 0; j < parent.length - 1; j++) {
                  if (!this.selectedColumn.includes(j.toString())) {
                    let t = this.selectedColumn.length + count;
                    temp = this.view[parent[t].id].widgets();
                    lbl = temp[0];
                    dummylbl = temp[2];
                    flxCheck = temp[3];
                    img = this.view[flxCheck.id].widgets();
                    if(this.columnPickerInitialData[j]){
                      this.view[parent[t].id].setVisibility(true);
                      this.view[lbl.id].text = this.columnPickerInitialData[j];
                      this.view[dummylbl.id].text = j.toString();
                    }
                    this.view[img[0].id].src = "inactivecheckbox.png";
                    this.view[img[0].id].setEnabled(true); //WIW-1312
                    count++;
                  }
                }
              
    },
    
    onClickSettings:function(){
      var scope = this;
      this.setColumnPicker();
      this.popupInitialData=scope.view.flxParent.widgets();
      var currForm = kony.application.getCurrentForm();
      currForm.forceLayout();
      this.view.btnSave.setEnabled(false);
      this.view.btnSave.skin="ICSknbtnDisablede2e9f036px";
      this.enableDragAndDrop();
    },
    closePopUp:function(){
      this.offVisibility();
    },

    onClickSaveChanges:function(){
       this.selectedColumn=[];
       this.defaultChange=false;
       this.popupFinalData=this.view.flxParent.widgets();
      for(i=0;i< this.popupFinalData.length-1;i++){
        var temp=this.view[ this.popupFinalData[i].id].widgets();
        var flxCheck=temp[3];
        var img=this.view[flxCheck.id].widgets();
        if(this.view[img[0].id].src==="activecheckbox.png"){
           this.selectedColumn.push(this.view[temp[2].id].text);
        
        }
      }
	  this.reAllignFlex();
      this.closePopUp();
     // this.setColumnArrays(holdingsData, this.selectedColumn);
      applicationManager.getPresentationUtility().showLoadingScreen();
      this.onClickSave(this.selectedColumn);
    },
	
	reAllignFlex : function(){
      var flxParent = this.view.flxParent;
      var parentArray = flxParent.widgets();
      for(i=0; i<parentArray.length; i++){
        if(parentArray[i].id==="flxPlaceholder") 
          continue;
        var tempObj = flxParent.removeAt(i);
        flxParent.addAt(tempObj,parseInt(tempObj.id.slice(4))-1);

      }
    },
    onDefaultModeClick:function(){
       this.selectedColumn=[];
      var scope = this;
        this.defaultChange=true;
      this.selectedColumn=["0","1","2","3","4","5"];
       this.closePopUp();
       this.reAllignFlex();
      this.onClickDefault(this.selectedColumn);
    },
    checkboxClick:function(){
      this.view.imgCheck1.onTouchEnd=this.checkboxOnClick.bind(this,this.view.imgCheck1);
      this.view.imgCheck2.onTouchEnd=this.checkboxOnClick.bind(this,this.view.imgCheck2);
      this.view.imgCheck3.onTouchEnd=this.checkboxOnClick.bind(this,this.view.imgCheck3);
      this.view.imgCheck4.onTouchEnd=this.checkboxOnClick.bind(this,this.view.imgCheck4);
      this.view.imgCheck5.onTouchEnd=this.checkboxOnClick.bind(this,this.view.imgCheck5);
      this.view.imgCheck6.onTouchEnd=this.checkboxOnClick.bind(this,this.view.imgCheck6);
      this.view.imgCheck7.onTouchEnd=this.checkboxOnClick.bind(this,this.view.imgCheck7);
      this.view.imgCheck8.onTouchEnd=this.checkboxOnClick.bind(this,this.view.imgCheck8);
      this.view.imgCheck9.onTouchEnd=this.checkboxOnClick.bind(this,this.view.imgCheck9);
      this.view.imgCheck10.onTouchEnd=this.checkboxOnClick.bind(this,this.view.imgCheck10);
      this.view.imgCheck11.onTouchEnd=this.checkboxOnClick.bind(this,this.view.imgCheck11);
      this.view.imgCheck12.onTouchEnd=this.checkboxOnClick.bind(this,this.view.imgCheck12);
      this.view.imgCheck13.onTouchEnd=this.checkboxOnClick.bind(this,this.view.imgCheck13);
      this.view.imgCheck14.onTouchEnd=this.checkboxOnClick.bind(this,this.view.imgCheck14);
      this.view.imgCheck15.onTouchEnd=this.checkboxOnClick.bind(this,this.view.imgCheck15);
      this.view.imgCheck16.onTouchEnd=this.checkboxOnClick.bind(this,this.view.imgCheck16);
      this.view.imgCheck17.onTouchEnd=this.checkboxOnClick.bind(this,this.view.imgCheck17);
      this.view.imgCheck18.onTouchEnd=this.checkboxOnClick.bind(this,this.view.imgCheck18);
    
    },
    checkboxOnClick:function(widget){
        //WIW-1312 - issue fix start
        var id = parseInt(widget.id.match(/\d+/)[0]);
        var label = "lblR" + id;
        if(this.optionalColoumns.includes(widget.parent.parent[label].text) && id <= 6){
        var widgetId = widget.id;
        var checkbox = this.view[widgetId].src;
        if(checkbox === "activecheckbox.png"){
            this.view[widgetId].src = "inactivecheckbox_2.png";
        }else{
            this.view[widgetId].src = "activecheckbox.png";
        }
        }
        //WIW-1312 - issue fix end
      if (widget.id === "imgCheck7") {
        if (this.view.imgCheck7.src === "activecheckbox.png") {
          this.view.imgCheck7.src = "inactivecheckbox_2.png";
        } else {
          this.view.imgCheck7.src = "activecheckbox.png";
        }
      } else if (widget.id === "imgCheck8") {
        if (this.view.imgCheck8.src === "activecheckbox.png") {
          this.view.imgCheck8.src = "inactivecheckbox_2.png";
        } else {
          this.view.imgCheck8.src = "activecheckbox.png";
        }
      } else if (widget.id === "imgCheck9") {
        if (this.view.imgCheck9.src === "activecheckbox.png") {
          this.view.imgCheck9.src = "inactivecheckbox_2.png";
        } else {
          this.view.imgCheck9.src = "activecheckbox.png";
        }
      } else if (widget.id === "imgCheck10") {
        if (this.view.imgCheck10.src === "activecheckbox.png") {
          this.view.imgCheck10.src = "inactivecheckbox_2.png";
        } else {
          this.view.imgCheck10.src = "activecheckbox.png";
        }
      } else if (widget.id === "imgCheck11") {
        if (this.view.imgCheck11.src === "activecheckbox.png") {
          this.view.imgCheck11.src = "inactivecheckbox_2.png";
        } else {
          this.view.imgCheck11.src = "activecheckbox.png";
        }
      } else if (widget.id === "imgCheck12") {
        if (this.view.imgCheck12.src === "activecheckbox.png") {
          this.view.imgCheck12.src = "inactivecheckbox_2.png";
        } else {
          this.view.imgCheck12.src = "activecheckbox.png";
        }
      } else if (widget.id === "imgCheck13") {
        if (this.view.imgCheck13.src === "activecheckbox.png") {
          this.view.imgCheck13.src = "inactivecheckbox_2.png";
        } else {
          this.view.imgCheck13.src = "activecheckbox.png";
        }
      } else if (widget.id === "imgCheck14") {
        if (this.view.imgCheck14.src === "activecheckbox.png") {
          this.view.imgCheck14.src = "inactivecheckbox_2.png";
        } else {
          this.view.imgCheck14.src = "activecheckbox.png";
        }
      } else if (widget.id === "imgCheck15") {
        if (this.view.imgCheck15.src === "activecheckbox.png") {
          this.view.imgCheck15.src = "inactivecheckbox_2.png";
        } else {
          this.view.imgCheck15.src = "activecheckbox.png";
        }
      } else if (widget.id === "imgCheck16") {
        if (this.view.imgCheck16.src === "activecheckbox.png") {
          this.view.imgCheck16.src = "inactivecheckbox_2.png";
        } else {
          this.view.imgCheck16.src = "activecheckbox.png";
        }
      } else if (widget.id === "imgCheck17") {
        if (this.view.imgCheck17.src === "activecheckbox.png") {
          this.view.imgCheck17.src = "inactivecheckbox_2.png";
        } else {
          this.view.imgCheck17.src = "activecheckbox.png";
        }
      } else if (widget.id === "imgCheck18") {
        if (this.view.imgCheck18.src === "activecheckbox.png") {
          this.view.imgCheck18.src = "inactivecheckbox_2.png";
        } else {
          this.view.imgCheck18.src = "activecheckbox.png";
        }
      }
       this.view.btnSave.setEnabled(true);
       this.view.btnSave.skin="sknBtnSSPBg0273e3Border0273e3";
    },
   
    enableDragAndDrop: function () {
      this.enableDrag(this.view.flxDrag1, this.view.flxR1, this.view.flxParent, this.view.flxPlaceholder);
      this.enableDrag(this.view.flxDrag2, this.view.flxR2, this.view.flxParent, this.view.flxPlaceholder);
      this.enableDrag(this.view.flxDrag3, this.view.flxR3, this.view.flxParent, this.view.flxPlaceholder);
      this.enableDrag(this.view.flxDrag4, this.view.flxR4, this.view.flxParent, this.view.flxPlaceholder);
      this.enableDrag(this.view.flxDrag5, this.view.flxR5, this.view.flxParent, this.view.flxPlaceholder);
      this.enableDrag(this.view.flxDrag6, this.view.flxR6, this.view.flxParent, this.view.flxPlaceholder);
      this.enableDrag(this.view.flxDrag7, this.view.flxR7, this.view.flxParent, this.view.flxPlaceholder);
      this.enableDrag(this.view.flxDrag8, this.view.flxR8, this.view.flxParent, this.view.flxPlaceholder);
      this.enableDrag(this.view.flxDrag9, this.view.flxR9, this.view.flxParent, this.view.flxPlaceholder);
      this.enableDrag(this.view.flxDrag10, this.view.flxR10, this.view.flxParent, this.view.flxPlaceholder);
      this.enableDrag(this.view.flxDrag11, this.view.flxR11, this.view.flxParent, this.view.flxPlaceholder);
      this.enableDrag(this.view.flxDrag12, this.view.flxR12, this.view.flxParent, this.view.flxPlaceholder);
      this.enableDrag(this.view.flxDrag13, this.view.flxR13, this.view.flxParent, this.view.flxPlaceholder);
      this.enableDrag(this.view.flxDrag14, this.view.flxR14, this.view.flxParent, this.view.flxPlaceholder);
      this.enableDrag(this.view.flxDrag15, this.view.flxR15, this.view.flxParent, this.view.flxPlaceholder);
      this.enableDrag(this.view.flxDrag16, this.view.flxR16, this.view.flxParent, this.view.flxPlaceholder);
      this.enableDrag(this.view.flxDrag17, this.view.flxR17, this.view.flxParent, this.view.flxPlaceholder);
      this.enableDrag(this.view.flxDrag18, this.view.flxR18, this.view.flxParent, this.view.flxPlaceholder);
      
      this.enableDrop(this.view.flxR1, this.view.flxParent, this.view.flxPlaceholder);
      this.enableDrop(this.view.flxR2, this.view.flxParent, this.view.flxPlaceholder);
      this.enableDrop(this.view.flxR3, this.view.flxParent, this.view.flxPlaceholder);
      this.enableDrop(this.view.flxR4, this.view.flxParent, this.view.flxPlaceholder);
      this.enableDrop(this.view.flxR5, this.view.flxParent, this.view.flxPlaceholder);
      this.enableDrop(this.view.flxR6, this.view.flxParent, this.view.flxPlaceholder);
      this.enableDrop(this.view.flxR7, this.view.flxParent, this.view.flxPlaceholder);
      this.enableDrop(this.view.flxR8, this.view.flxParent, this.view.flxPlaceholder);
      this.enableDrop(this.view.flxR9, this.view.flxParent, this.view.flxPlaceholder);
      this.enableDrop(this.view.flxR10, this.view.flxParent, this.view.flxPlaceholder);
      this.enableDrop(this.view.flxR11, this.view.flxParent, this.view.flxPlaceholder);
      this.enableDrop(this.view.flxR12, this.view.flxParent, this.view.flxPlaceholder);
      this.enableDrop(this.view.flxR13, this.view.flxParent, this.view.flxPlaceholder);
      this.enableDrop(this.view.flxR14, this.view.flxParent, this.view.flxPlaceholder);
      this.enableDrop(this.view.flxR15, this.view.flxParent, this.view.flxPlaceholder);
      this.enableDrop(this.view.flxR16, this.view.flxParent, this.view.flxPlaceholder);
      this.enableDrop(this.view.flxR17, this.view.flxParent, this.view.flxPlaceholder);
      this.enableDrop(this.view.flxR18, this.view.flxParent, this.view.flxPlaceholder);



    },
    enableDrop: function (flxDropTarget, flxParent, flxPlaceholder) {
      let scopeObj = this;
      let element = document.querySelector(`[kwp=${kony.application.getCurrentForm().id}_${scopeObj.view.id}_${flxDropTarget.id}]`);
      if (!element) {
        element = document.querySelector(`[kwp=${scopeObj.view.id}_${flxDropTarget.id}]`)
      }
      element.addEventListener('mouseover', function () {
        if (scopeObj.dragging) {
          let hoverTargetIndex = flxParent.widgets().map(e => e.id).indexOf(flxDropTarget.id);
          let placeholder = flxPlaceholder.clone();
          placeholder.isVisible = true;
          scopeObj.view[flxPlaceholder.id].removeFromParent();
          flxParent.addAt(placeholder, hoverTargetIndex);
        }
      })
       this.view.btnSave.setEnabled(true);
       this.view.btnSave.skin="sknBtnSSPBg0273e3Border0273e3";
    },
    enableDrag: function (flxDragPoint, flxDragBox, flxParent, flxPlaceholder) {
      let scopeObj = this;

      function onTouchMoveCallback(source, x, y) {
        // drag begin
        scopeObj.dragging = true;
        // index of flxDragBox in parent
        let insertPosition = flxParent.widgets().map(e => e.id).indexOf(flxDragBox.id);
        let rowWidget = flxDragBox.clone();
        let placeholder = flxPlaceholder.clone();
        scopeObj.view[flxDragBox.id].removeFromParent();
        scopeObj.view[flxPlaceholder.id].removeFromParent();
        placeholder.isVisible = true;
        flxParent.addAt(placeholder, insertPosition);
        // adding it to bigger scope
        scopeObj.view.flxMoveArea.isVisible = true;
        scopeObj.view.flxMoveArea.addAt(rowWidget, 0);
        window.onmousemove = function (e) {
          rowWidget.top = e.clientY - 20 + "dp";
          rowWidget.left = e.clientX - 20 + "dp";
          rowWidget.forceLayout();
        }
        // drop in place of placeholder
        window.onmouseup = function () {
          let dropIndex = flxParent.widgets().map(e => e.id).indexOf(flxPlaceholder.id);
          let placeholder = flxPlaceholder.clone();
          flxParent.removeAt(dropIndex);
          let addRowWidget = rowWidget.clone();
          rowWidget.removeFromParent();
          flxParent.addAt(addRowWidget, dropIndex);
          flxParent.addAt(placeholder, flxParent.widgets().length);
          // disable move area
          scopeObj.view.flxMoveArea.isVisible = false;
          // remove window mouse move
          addRowWidget.top = "0dp";
          addRowWidget.left = "0dp";
          addRowWidget.forceLayout();
          window.onmousemove = null;
          window.onmouseup = null;
          // adding drop event to new clone
          scopeObj.enableDrop(addRowWidget, flxParent, flxPlaceholder);
          // drag over
          scopeObj.dragging = false;
        }
      }
      flxDragPoint.onTouchMove = onTouchMoveCallback;
    }


  };
});