/* eslint-disable */
define(function() {

  return {

    constructor: function(baseConfig, layoutConfig, pspConfig) {

    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },
    //declaring global variables
    jsonPath: [],
    breadCrumbData: [],
    prop: [],
    flxrow1: 0,
    flxrow2: 0,
    rowData: {},
    counter: 0,
    prevValue: 0,
    currentSelectedTarget: 0,
    targetDiff: 0,
    totalTarget:0,
    selectedRowIndex: 0,
    totalTargetValue:"",
    totalArray: [],
    jsonTree: [],
    availableNodes : [],
    originalArray :[],
    pinVisibility: false,



    // setting values to the segment
    setContext: function(assetArray,totalArray) {
      var scope = this;
      var segData = [];
      scope.prop=[];
      var storeData;    
      var totalRecommendedWeight = 0;
      var totalTargetWeight = 0;
      this.counter = 0;
      this.rowData = assetArray;
      this.totalArray = totalArray; 
      var flag = this.setTotalValue(assetArray);
      for (var k = 0; k < assetArray.length; k++) {      
        //storing the data into array
    if (!assetArray[k].isVisited) {
          this.counter++;
        }
        this.pinVisibility = (assetArray[k].isCustomized == "true") ? true : false;
        totalRecommendedWeight = totalRecommendedWeight + parseFloat(assetArray[k].recommendedWeight);
        totalTargetWeight = totalTargetWeight + parseFloat(assetArray[k].targetWeight);
        var decfixrec = assetArray[k].recommendedWeight.split(".");
        var decfixtar = assetArray[k].targetWeight.split(".");
        var a = decfixrec[1]? decfixrec[1].split(""):decfixrec[1];
        var b = decfixtar[1]? decfixtar[1].split("") : decfixtar[1];
        storeData = {  
         isVisitedProp : assetArray[k].isVisited,

          slideNo : "slide"+k,
          assetName: {
                        "text": assetArray[k].Name.length > 13 ? (assetArray[k].Name.substr(0, 12)+"...") : assetArray[k].Name,
                        "toolTip": assetArray[k].Name,
                        "skin":assetArray[k].lastlevel === "false" ? "SknLbl3B74A6SSPR15Px" : "bbSknLbl424242SSP15Px",
                    },
          //recWeight: parseFloat(assetArray[k].recommendedWeight).toFixed(2) + '%', //IW-3989 BHARATH
          recWeight: (decfixrec[1]===undefined || decfixrec[1].length === 1 || a[1] === "0")? parseFloat(assetArray[k].recommendedWeight).toFixed(1) + "%" : parseFloat(assetArray[k].recommendedWeight).toFixed(2) + '%',
          weight: (decfixtar[1]===undefined || decfixtar[1].length === 1 || b[1] === "0")? parseFloat(assetArray[k].targetWeight).toFixed(1) + "%" : parseFloat(assetArray[k].targetWeight).toFixed(2) + '%',
          slide: {                        
            selectedValue: parseInt(assetArray[k].targetWeight),
            "onSelection": function(event, context,k) {                            
              this.onSlideCallBack(event, context,k);                        
            }.bind(this),     
          },

          flx1: {                        
            "onClick": function(event, context) {  
              this.onflex1(event, context);  
            }.bind(this),
          },
          flx2: {                        
            "onClick": function(event, context) {   
              this.onflex2(event, context);                        
            }.bind(this)                    
          },
          img: {
            "isVisible": this.pinVisibility
          },
          flx: 
          assetArray[k].lastlevel === "false" ?
          {
            "onClick": function(eventobject, context) {     
              this.onbutton(eventobject, context);                        
            }.bind(this),
			 width : assetArray[k].Name.length >= 13?"75%":(assetArray[k].Name.length <= 12 && assetArray[k].Name.length >= 10)?"60%":(assetArray[k].Name.length < 10 && assetArray[k].Name.length >= 7)?"55%":"30%"
          } : ""
        };                
        segData.push(storeData);                
        scope.prop.push(storeData);            
      // this.view.lblPercentage.text = Math.round(totalRecommendedWeight) + ".00%";
//        this.view.lblPercentage2.text = Math.round(totalTargetWeight) + ".00%";
        //IW-3687
      /*  if (totalTargetWeight >= 99.91 && totalTargetWeight <= 100.09) {
                    this.view.lblPercentage2.text = "100.00%";    
                }else{
                this.view.lblPercentage2.text = (totalTargetWeight).toFixed(2) + "%";
                }*/
      }            
      //segment widget mapping
      this.view.segSlider.widgetDataMap = {  
        lblSegmentname:"assetName",
        lblValue1: "recWeight",
        lblValue2: "weight",
        sliderincdec: "slide",
        flxMinus: "flx1",
        flxPlus: "flx2",
        imgPin: "img",
        flxLabel: "flx"
      };    
      this.view.segSlider.removeAll();
      this.view.segSlider.setData(segData);
    },

    // asset name click event to load breadcrumb values
    onbutton: function(event, context,k) {
      var rowIndex=context.rowIndex;
      var selectedRowData=this.rowData[rowIndex];
      this.breadCrumbData.length = 0;
      this.totalTarget = this.prop[rowIndex].weight.substring(0, this.prop[rowIndex].weight.length - 1);
      this.breadCrumbData.push(selectedRowData, selectedRowData.Name);
      // method used to set breadcrumb values through the form
      this.setButtonValues(this.breadCrumbData,selectedRowData,this.totalTarget);
    },
    
    onLoop : function(){
      var scope = this;
      for (var k = 0; k < scope.rowData.length; k++) {
        var decfixrec = scope.rowData[k].recommendedWeight.split(".");
        var decfixtar = scope.rowData[k].targetWeight.split(".");
        var a = decfixrec[1] ? decfixrec[1].split("") : decfixrec[1];
        var b = decfixtar[1] ? decfixtar[1].split("") : decfixtar[1];
        scope.prop[k].weight = (decfixtar[1] === undefined || decfixtar[1].length === 1 || b[1] === "0") ? parseFloat(scope.rowData[k].targetWeight).toFixed(1) + "%" : parseFloat(scope.rowData[k].targetWeight).toFixed(2) + '%';
        scope.prop[k].recWeight = (decfixrec[1] === undefined || decfixrec[1].length === 1 || a[1] === "0") ? parseFloat(scope.rowData[k].recommendedWeight).toFixed(1) + "%" : parseFloat(scope.rowData[k].recommendedWeight).toFixed(2) + '%';
      }
    },

    // slider call back method
    onSlideCallBack: function(event, context) {
      var scope = this;
      scope_WealthPresentationController.computedStrategy = "";
      var rowindex = context.rowIndex;
      var selectedRowData = this.rowData[rowindex];
      selectedRowData.targetWeight = event.selectedValue + '.00';
      var currentWeight = 0;
      var tempTree= [];
      let calculatedTargetWeight = 0;
      var assetList = this.totalArray;
      var isCompute;
      let availableTargetWeight = 0;
      tempTree = scope.buildTree(assetList); // call to build new tree structure
      scope.jsonTree = tempTree;
      var originalArray = scope_WealthPresentationController.orginalAssetArray;
      var originalTargetWeight =0;
      for(var item of originalArray.personalizedStrategy){
        if(item.ID === selectedRowData.ID){
          originalTargetWeight = parseFloat(item.targetWeight);
        }
      }
      if(parseFloat(selectedRowData.targetWeight) > originalTargetWeight){
        for (const root of tempTree) {
          scope.addCustomizedWeightSum(root,selectedRowData.ID);
        }
        for (const root of scope.availableNodes) {
          availableTargetWeight += parseFloat(root.targetWeight);
        }
        scope.availableNodes = [];
        currentWeight = parseFloat(selectedRowData.targetWeight) - originalTargetWeight;
        calculatedTargetWeight = availableTargetWeight - parseFloat(currentWeight);
        isCompute = calculatedTargetWeight < 0 ? false: true;
      }else{
        isCompute = tempTree.some(rootNode => scope.doesAnyNodeMatch(rootNode,selectedRowData.ID));
      }
      selectedRowData.targetWeight = event.selectedValue.toString();
      selectedRowData.originalTargetWeight = originalTargetWeight;
      scope.onLoop(scope.rowData);
      var decfixnewwt = event.selectedValue.toString().split(".");
      var a = decfixnewwt[1]? decfixnewwt[1].split(""):decfixnewwt[1];
      this.prop[rowindex] = Object.assign(this.prop[rowindex], {
        weight: (decfixnewwt[1]===undefined || decfixnewwt[1].length === 1 || a[1] === "0")? event.selectedValue.toFixed(1) + "%" : event.selectedValue.toFixed(2) + '%'
      });


      this.view.segSlider.removeAll();
      this.view.segSlider.setData(this.prop);
      var flag = this.setTotalValue(this.prop);

      this.sendUpdatedTarget(selectedRowData,isCompute); // event to send updated target weight to the form
    },

    // decreament click event
    onflex1: function(event, context) {
      scope_WealthPresentationController.computedStrategy = "";
      var scope = this;
      var assetList = this.totalArray;
      var rowNumber = context.rowIndex;
      scope.flxrow1 = rowNumber;
      var selectedRowData = scope.rowData[rowNumber];
      var tempTree= [];
      var currentWeight = 0;
      var isCompute;   
      let calculatedTargetWeight = 0;
      let availableTargetWeight = 0;
      tempTree = scope.buildTree(assetList); // call to build new tree structure
      scope.jsonTree = tempTree;
      var originalArray = scope_WealthPresentationController.orginalAssetArray;
      var originalTargetWeight =0;
      for(var item of originalArray.personalizedStrategy){
        if(item.ID === selectedRowData.ID){
          originalTargetWeight = parseFloat(item.targetWeight);
        }
      }
       if(parseFloat(selectedRowData.targetWeight) > originalTargetWeight){
        for (const root of tempTree) {
          scope.addCustomizedWeightSum(root,selectedRowData.ID);
        }
        for (const root of scope.availableNodes) {
          availableTargetWeight += parseFloat(root.targetWeight);
        }
        scope.availableNodes = [];
        currentWeight = (parseFloat(selectedRowData.targetWeight) - 1) - originalTargetWeight;
        calculatedTargetWeight = availableTargetWeight - parseFloat(currentWeight);
        isCompute = calculatedTargetWeight < 0 ? false: true;
      }else{
        isCompute = tempTree.some(rootNode => scope.doesAnyNodeMatch(rootNode,selectedRowData.ID));
      }
      var newweight1 = (parseFloat(scope.prop[scope.flxrow1].weight.split("%")[0]) - 1);
      if(newweight1<0){
        newweight1 = 0;
      }else if(newweight1 > 100){
        newweight1 = 100;
      }
      selectedRowData.targetWeight = newweight1;
      selectedRowData.targetWeight = selectedRowData.targetWeight.toString();
      selectedRowData.originalTargetWeight = originalTargetWeight;
      scope.onLoop(scope.rowData);
      var decfixnewwt = newweight1.toString().split(".");
      var a = decfixnewwt[1]? decfixnewwt[1].split(""):decfixnewwt[1];
      scope.prop[scope.flxrow1] = Object.assign(scope.prop[scope.flxrow1], {                
        weight:(decfixnewwt[1]===undefined || decfixnewwt[1].length === 1 || a[1] === "0")? newweight1.toFixed(1) + "%" : newweight1.toFixed(2) + '%'
      }); 
      scope.prop[scope.flxrow1] = Object.assign(scope.prop[scope.flxrow1], {                
        slide: {                        
          selectedValue: parseInt(newweight1),
          "onSelection": function(event, context) {                            
            scope.onSlideCallBack(event, context);                        
          }.bind(scope),
        }
      }); 
      scope.view.segSlider.removeAll();            
      scope.view.segSlider.setData(scope.prop);
      var flag = scope.setTotalValue(scope.prop);

      scope.sendUpdatedTarget(selectedRowData,isCompute); // event to send updated target weight to the form

    },

    // increament click event
    onflex2: function(event, context) { 
      scope_WealthPresentationController.computedStrategy = "";
      var scope = this;       
      var rowNumber = context.rowIndex;
      scope.flxrow2 = rowNumber;
      var selectedRowData = scope.rowData[rowNumber];
      var assetList = scope.totalArray;
      var tempTree= [];
      let calculatedTargetWeight = 0;
      var currentWeight = 0;
      var isCompute;
      let availableTargetWeight = 0;
      var originalArray = scope_WealthPresentationController.orginalAssetArray;
      var originalTargetWeight =0;
      var newweight2 = (parseFloat(scope.prop[scope.flxrow2].weight.split("%")[0]) + 1);
      if(newweight2<0){
        newweight2 = 0;
      }else if(newweight2 > 100){
        newweight2 = 100;
      }
      selectedRowData.targetWeight = newweight2;
      for(var item of originalArray.personalizedStrategy){
        if(item.ID === selectedRowData.ID){
          originalTargetWeight = parseFloat(item.targetWeight);
        }
      }
      tempTree = scope.buildTree(assetList); // call to build new tree structure
      scope.jsonTree = tempTree;
     
      if(parseFloat(selectedRowData.targetWeight) > originalTargetWeight){
        for (const root of tempTree) {
          scope.addCustomizedWeightSum(root,selectedRowData.ID);
        }
        for (const root of scope.availableNodes) {
          availableTargetWeight += parseFloat(root.targetWeight);
        }
        scope.availableNodes = [];
        currentWeight = parseFloat(selectedRowData.targetWeight) - originalTargetWeight;
        calculatedTargetWeight = availableTargetWeight - parseFloat(currentWeight);
        isCompute = calculatedTargetWeight < 0 ? false: true;
      }else{
        isCompute = tempTree.some(rootNode => scope.doesAnyNodeMatch(rootNode,selectedRowData.ID));
      }
      selectedRowData.targetWeight = selectedRowData.targetWeight.toString();
      selectedRowData.originalTargetWeight = originalTargetWeight;
      scope.onLoop(scope.rowData);
      var decfixnewwt = newweight2.toString().split(".");
      var a = decfixnewwt[1]? decfixnewwt[1].split(""):decfixnewwt[1];
      scope.prop[scope.flxrow2] = Object.assign(scope.prop[scope.flxrow2], {                
        weight:(decfixnewwt[1]===undefined || decfixnewwt[1].length === 1 || a[1] === "0")? newweight2.toFixed(1) + "%" : newweight2.toFixed(2) + '%'
      });
      scope.prop[scope.flxrow2] = Object.assign(scope.prop[scope.flxrow2], {                
        slide: {                        
          selectedValue:parseInt(newweight2),
          "onSelection": function(event, context) {                            
            scope.onSlideCallBack(event, context);                        
          }.bind(scope),
        }
      }); 
      scope.view.segSlider.removeAll();            
      scope.view.segSlider.setData(scope.prop);
      var flag = scope.setTotalValue(scope.prop);      
      scope.sendUpdatedTarget(selectedRowData,isCompute);// event to send updated target weight to the form
    },

    //Method to set totalTargetweight to the  total target label
    setTotalValue: function(data){
      var totalTargetWeight = 0;
      var totalRecommendedWeight = 0;
      for (var k = 0; k < data.length; k++) {
		  //IW-3989 - START bharath
        data[k].recWeight = parseFloat(data[k].recWeight).toFixed(2) + "%";
        data[k].weight = parseFloat(data[k].weight).toFixed(2) + "%";
       if(data[k].recWeight === "0.00%"){
           totalRecommendedWeight = totalRecommendedWeight + (parseFloat(data[k].recWeight));
         }else{
           totalRecommendedWeight = totalRecommendedWeight + (parseFloat(data[k].recWeight)?parseFloat(data[k].recWeight):parseFloat(data[k].recommendedWeight));
         }//IW-3989 - end bharath
        //iw-3857 fix - Yash
        if(data[k].weight === "0.00%"){
                    totalTargetWeight = totalTargetWeight + (parseFloat(data[k].weight));
                }
                else{
                totalTargetWeight = totalTargetWeight + (parseFloat(data[k].weight) ? parseFloat(data[k].weight) : parseFloat(data[k].targetWeight));
                }
        //fix end

      }
      var decfixrecTot = totalRecommendedWeight.toString().split(".");
      var decfixtarTot = totalTargetWeight.toString().split(".");
      var a = decfixrecTot[1]? decfixrecTot[1].split(""):decfixrecTot[1];
      var b = decfixtarTot[1]? decfixtarTot[1].split("") : decfixtarTot[1];
      this.view.lblPercentage.text = (decfixrecTot[1]===undefined || decfixrecTot[1].length === 1 || a[1] === "0")? totalRecommendedWeight.toFixed(1) + "%" : totalRecommendedWeight.toFixed(2) + '%';
      this.view.lblPercentage2.text = (decfixtarTot[1]===undefined || decfixtarTot[1].length === 1 || b[1] === "0")? totalTargetWeight.toFixed(1) + "%" : totalTargetWeight.toFixed(2) + '%';
      if(data && data[0] && data[0].level==='1')
        applicationManager.getNavigationManager().setCustomInfo('personalizedWeight', this.view.lblPercentage2.text);
      // this.view.lblPercentage.text = Math.round(totalRecommendedWeight) + ".00%";
      //    this.view.lblPercentage2.text = Math.round(totalTargetWeight) + ".00%";
      //IW-3687
     /* if (totalTargetWeight >= 99.91 && totalTargetWeight <= 100.09) {
        this.view.lblPercentage2.text = "100.00%";    
      }else{
        this.view.lblPercentage2.text = (totalTargetWeight).toFixed(2) + "%";
      }*/
      
      this.totalTargetValue = this.view.lblPercentage2.text.replace(/%/g, '');
      //          // event to send total target value to the form
      //          scope.sendTotalTargetValue(totalTargetValue);
      if(Math.round(totalTargetWeight) !== Math.round(totalRecommendedWeight)){
        return true;
      }
      else{
        return false;
      }

    },

    // Function to build the new JSON tree  structure 
    buildTree: function(data) {
      const tree = {};
      for (const item of data) {
        if (!tree[item.ID]) {
          tree[item.ID] = Object.assign({}, item, { children: [] });
        } else {
          tree[item.ID] = Object.assign({}, tree[item.ID], item);
        }
        if (!tree[item.parentId]) {
          tree[item.parentId] = { children: [] };
        }
        tree[item.parentId].children.push(tree[item.ID]);
      }
      return tree["2"].children;
    },

    // summing up the target values from the new tree formed in buildtree method
    calculateCustomizedWeightSum: function(node,selectedID) {
      var scope = this;
      if(node.isCustomized === "false" && node.ID!==selectedID) {
        if (node.children.length === 0) {
          if(node.isCustomized === "false") {
            scope.availableNodes.push(node) 
          }
          return;
        }
      }
    },

    // calculating totalTargetWeight of the customized field
    addCustomizedWeightSum: function(node,selectedID) {
      var scope = this;
      node.customizedWeightSum = scope.calculateCustomizedWeightSum(node, selectedID);
      for (const child of node.children) {
        if(node.isCustomized === "false" && node.ID!==selectedID) {
          scope.addCustomizedWeightSum(child, selectedID);
        }

      }
    },

    // Method returns true if any one of the asset is not customized 
    doesAnyNodeMatch: function(node,selectedID) {
     if(node.isCustomized === "false" && node.ID!==selectedID) {
      if (node.children.length === 0) {
            return true;
      }
      for (const child of node.children) {
       if(this.doesAnyNodeMatch(child, selectedID)) return true;
      }

    }
    return false;
    },

  };
});



