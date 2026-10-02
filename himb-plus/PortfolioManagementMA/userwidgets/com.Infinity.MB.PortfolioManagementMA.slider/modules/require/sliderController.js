/* eslint-disable */

define(function() {
  return {
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
    assetList: [],
    jsonTree: [],
    availableNodes : [],
    pinVisibility: false,


    constructor: function(baseConfig, layoutConfig, pspConfig) {
      //this.businessController = new sliderDAO();
      this.context = {};
    },


    initGettersSetters: function() {
      defineGetter(this, 'serviceParam', () => {
        return this._serviceParam;
      });
      defineSetter(this, 'serviceParam', value => {
        this._serviceParam = value;
      });
      defineGetter(this, 'configParam', () => {
        return this._configParam;
      });
      defineSetter(this, 'configParam', value => {
        this._configParam = value;
      });
    },


    setContext: function(response, totalTarget,fullArray) {
      try{
      var scope = this;
      var segData = [];
      scope.prop = [];
      var storeData;
      var totalRecommendedWeight = 0;
      var totalTargetWeight = 0;
      this.counter = 0;
      this.rowData = response;
      this.assetList = fullArray;
      this.setTotalValue(response);
      this.totalTarget = totalTarget; // the target which we need to achieve
      for (var k = 0; k < response.length; k++) {
        if (!response[k].isVisited) {
          this.counter++;
        }
        this.pinVisibility = (response[k].isCustomized == "true") ? true : false;
        totalRecommendedWeight = totalRecommendedWeight + parseFloat(response[k].recommendedWeight);
        totalTargetWeight = totalTargetWeight + parseFloat(response[k].targetWeight);
        var decfixrec = response[k].recommendedWeight.split(".");
        var decfixtar = response[k].targetWeight.split(".");
        var a = decfixrec[1]? decfixrec[1].split(""):decfixrec[1];
        var b = decfixtar[1]? decfixtar[1].split("") : decfixtar[1];
        storeData = {
          isVisitedProp : response[k].isVisited,

          slideNo : "slide"+k,
          assetName: {
            text: response[k].Name,
            skin: response[k].lastlevel === "false" ? "sknlbl003e75SSPR15px":"sknlbl424242SSPR40px",
            
//             onClick: function (eventobject, context, k) {
//               this.onbutton(eventobject, context, k);
//             }.bind(this),
          },
		  //IW-3989 Start Bharath
         // weight: parseFloat(response[k].targetWeight).toFixed(2) + "%",
          weight: (decfixtar[1]===undefined || decfixtar[1].length === 1 || b[1] === "0")? parseFloat(response[k].targetWeight).toFixed(1) + "%" : parseFloat(response[k].targetWeight).toFixed(2) + '%',
          rec: (decfixrec[1]===undefined || decfixrec[1].length === 1 || a[1] === "0")? parseFloat(response[k].recommendedWeight).toFixed(1) + "%" : parseFloat(response[k].recommendedWeight).toFixed(2) + '%',
          //rec: parseFloat(response[k].recommendedWeight).toFixed(2) + "%",
			//IW-3989 end Bharath
          //weight: response[k].strategyWeight + "%",
          //rec: response[k].strategyWeight + "%",

          slide: {
            selectedValue: parseInt(response[k].targetWeight),
            thumbOffset : 25,
            onSelection: function (event, context, k) {
              this.onSlideCallBack(event, context, k);
            }.bind(this),
          },
          button: {
            onClick: function (eventobject, context) {
              this.onbutton(eventobject, context);
            }.bind(this),
          },
          flx1: {
            onClick: function (event, context) {
              this.onflex1(event, context);
            }.bind(this),
          },
          flx2: {
            onClick: function (event, context) {
              this.onflex2(event, context);
            }.bind(this),
          },
          img: {
            "isVisible": this.pinVisibility
          },
          flx:
            response[k].lastlevel === "false" ?
          {
            "onClick": function(eventobject, context) {     
              this.onbutton(eventobject, context);                        
            }.bind(this)
          } : {}
        };
        segData.push(storeData);
        scope.prop.push(storeData);
        //this.view.lblRecTotalValue.text = Math.round(totalRecommendedWeight) + ".00%";
        //this.view.lblTotalTarget.text = Math.round(totalTargetWeight) + ".00%"; //iw-3687 - Yash
        //IW-3687
       /* if (totalTargetWeight >= 99.91 && totalTargetWeight <= 100.09) {
                    this.view.lblTotalTarget.text = "100.00%";    
                }else{
                this.view.lblTotalTarget.text = (totalTargetWeight).toFixed(2) + "%";
                }*/
      }
      this.view.segSlider.widgetDataMap = {
        lblHead: "assetName",
        flxDummy:"flx",
        lblRecValue: "rec",
        lblTargetValue: "weight",
        sliderincdec: "slide",
        flxMinus: "flx1",
        flxPlus: "flx2",
        imgPin: "img"
      };
      this.view.segSlider.removeAll();
      this.view.segSlider.setData(segData);
        }catch(err) {
        this.setError(err, "setContext");
      }
    },

    onbutton: function (event, context, k) {
      try{
//       var c = k;
//       var value = this.view.segSlider.data[c];
//       //var row = context.rowIndex;
//       //console.log(this.view.segSlider.selectedRowIndex[1]);
//       //var rowIndex = selectedRowIndex;
//       //var rowIndex = this.view.segSlider.selectedRowIndex[1];
      var rowIndex = context.rowIndex;
      var selectedRowData = this.rowData[rowIndex];
      this.breadCrumbData.length = 0;
      this.totalTarget = this.prop[rowIndex].weight.substring(0, this.prop[rowIndex].weight.length - 1);
      this.breadCrumbData.push(selectedRowData, selectedRowData.Name);
      this.setBtnValues(this.breadCrumbData, selectedRowData,this.totalTarget);
        }catch(err) {
        this.setError(err, "onbutton");
      }

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
    
    onSlideCallBack: function (event, context) {
      try{
      //      var rowindex = context.rowIndex;
	if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
      var rowindex = this.view.segSlider.selectedRowIndex?this.view.segSlider.selectedRowIndex[1]:"";
    } else {
      var rowindex = context.rowIndex; //iw-3785
    }
      if(rowindex !== ""){
      
      var selectedRowData = this.rowData[rowindex];
      selectedRowData.targetWeight = event.selectedValue;
      var currentWeight = 0;
      var tempTree= [];
      let totalCustomizedWeightSum = 0;
      let calculatedTargetWeight = 0;
      var assetList = this.assetList;
	  let availableTargetWeight = 0;
      var isCompute;
      tempTree = this.buildTree(assetList); // call to build new tree structure
     // this.jsonTree = tempTree;
	  var originalArray = scope_WealthPresentationController.orginalAssetArray;
      var originalTargetWeight =0;
      for(var item of originalArray.personalizedStrategy){
        if(item.ID === selectedRowData.ID){
          originalTargetWeight = parseFloat(item.targetWeight);
        }
      }
      if(parseFloat(selectedRowData.targetWeight) > originalTargetWeight){
      for (const root of tempTree) {
          this.addCustomizedWeightSum(root,selectedRowData.ID);
        }
        for (const root of this.availableNodes) {
          availableTargetWeight += parseFloat(root.targetWeight);
        }
		this.availableNodes = [];
        currentWeight = parseFloat(selectedRowData.targetWeight) - originalTargetWeight;
        calculatedTargetWeight = availableTargetWeight - parseFloat(currentWeight);
        isCompute = calculatedTargetWeight < 0 ? false: true;
      }else{
        isCompute = tempTree.some(rootNode => this.doesAnyNodeMatch(rootNode,selectedRowData.ID));
      }
      selectedRowData.targetWeight = event.selectedValue.toString();
      selectedRowData.originalTargetWeight = originalTargetWeight;
      this.onLoop(this.rowData);
      var decfixnewwt = event.selectedValue.toString().split(".");
      var a = decfixnewwt[1]? decfixnewwt[1].split(""):decfixnewwt[1];
      this.prop[rowindex] = Object.assign(this.prop[rowindex], {
        weight: (decfixnewwt[1]===undefined || decfixnewwt[1].length === 1 || a[1] === "0")? event.selectedValue.toFixed(1) + "%" : event.selectedValue.toFixed(2) + '%',
        slide: {
          selectedValue: parseInt(event.selectedValue),
          onSelection: function (event, context) {
            this.onSlideCallBack(event, context);
          }.bind(this),
        },
      });

      this.view.segSlider.removeAll();
      this.view.segSlider.setData(this.prop);
      this.setTotalValue(this.prop);
      this.sendUpdatedTarget(selectedRowData,isCompute);
	  }
        }catch(err) {
        this.setError(err, "onSlideCallBack");
      }
    },

    onflex1: function (event, context) {
      try{
      //var rowNumber = this.view.segSlider.selectedRowIndex[1];
      var rowNumber = context.rowIndex;
      var scope = this;
      scope.flxrow1 = rowNumber;
      var newweight1 = 
          parseFloat(scope.prop[scope.flxrow1].weight.split("%")[0]) - 1;
      if(newweight1<0){
         newweight1 = 0;
       }else if(newweight1 > 100){
         newweight1 = 100;
       }
      var selectedRowData = this.rowData[rowNumber];
      selectedRowData.targetWeight = newweight1;
      var assetList = scope.assetList;  
      var tempTree= [];
      let totalCustomizedWeightSum = 0;
      var currentWeight = 0;
      var isCompute;
      let calculatedTargetWeight = 0;
      let availableTargetWeight = 0;
	  tempTree = scope.buildTree(assetList); // call to build new tree structure 
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
       selectedRowData.targetWeight = selectedRowData.targetWeight.toString();
       selectedRowData.originalTargetWeight = originalTargetWeight;
      scope.onLoop(scope.rowData);
      var decfixnewwt = newweight1.toString().split(".");
      var a = decfixnewwt[1]? decfixnewwt[1].split(""):decfixnewwt[1];
      scope.prop[scope.flxrow1] = Object.assign(scope.prop[scope.flxrow1], {
        weight: (decfixnewwt[1]===undefined || decfixnewwt[1].length === 1 || a[1] === "0")? newweight1.toFixed(1) + "%" : newweight1.toFixed(2) + '%'
      });
      scope.prop[scope.flxrow1] = Object.assign(scope.prop[scope.flxrow1], {
        slide: {
          selectedValue: newweight1,
          onSelection: function (event, context) {
            scope.onSlideCallBack(event, context);
          }.bind(scope),
        },
      });
      scope.view.segSlider.removeAll();
      scope.view.segSlider.setData(scope.prop);
      scope.setTotalValue(scope.prop);
      scope.sendUpdatedTarget(selectedRowData,isCompute);
      //}
        }catch(err) {
        this.setError(err, "onflex1");
      }
    },
    onflex2: function (event, context) {
      try{
      var rowNumber = context.rowIndex;
      var scope = this;
      scope.flxrow2 = rowNumber;
      var newweight2 =
          parseFloat(scope.prop[scope.flxrow2].weight.split("%")[0]) + 1;
      if(newweight2<0){
         newweight2 = 0;
       }else if(newweight2 > 100){
         newweight2 = 100;
       }
      var selectedRowData = this.rowData[rowNumber];
      selectedRowData.targetWeight = newweight2;
      var assetList = scope.assetList;
      var tempTree= [];
      let totalCustomizedWeightSum = 0;
      let calculatedTargetWeight = 0;
      var currentWeight = 0;
      var isCompute;
      let availableTargetWeight = 0;
      var originalArray = scope_WealthPresentationController.orginalAssetArray;
      var originalTargetWeight =0;
      for(var item of originalArray.personalizedStrategy){
        if(item.ID === selectedRowData.ID){
          originalTargetWeight = parseFloat(item.targetWeight);
        }
      }
      tempTree = scope.buildTree(assetList); // call to build new tree structure
      //scope.jsonTree = tempTree;
	  
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
        weight: (decfixnewwt[1]===undefined || decfixnewwt[1].length === 1 || a[1] === "0")? newweight2.toFixed(1) + "%" : newweight2.toFixed(2) + '%'
      });
      scope.prop[scope.flxrow2] = Object.assign(scope.prop[scope.flxrow2], {
        slide: {
          selectedValue: newweight2,
          onSelection: function (event, context) {
            scope.onSlideCallBack(event, context);
          }.bind(scope),
        },
      });
      scope.view.segSlider.removeAll();
      scope.view.segSlider.setData(scope.prop);
      scope.setTotalValue(scope.prop);
      scope.sendUpdatedTarget(selectedRowData,isCompute);
        }catch(err) {
        this.setError(err, "onflex2");
      }
    },

    setTotalValue: function(data){
      try{
      var totalTargetWeight = 0;
      var totalRecommendedWeight = 0;
      for (var k = 0; k < data.length; k++) {
		  //IW-3989 Start Bharath
        data[k].rec = parseFloat(data[k].rec).toFixed(2) + "%";
        data[k].weight = parseFloat(data[k].weight).toFixed(2) + "%";
		  if(data[k].rec === "0.00%"){
          totalRecommendedWeight =data[k].rec ==="0%" ? totalRecommendedWeight + 0 : totalRecommendedWeight + (parseFloat(data[k].rec));
        }else{
        totalRecommendedWeight =data[k].rec ==="0%" ? totalRecommendedWeight + 0 : totalRecommendedWeight + (parseFloat(data[k].rec) ? parseFloat(data[k].rec) : parseFloat(data[k].recommendedWeight));
        }
		  //IW-3989 end Bharath
    
        if(data[k].weight === "0.00%"){
        totalTargetWeight = data[k].weight === "0%" ? totalRecommendedWeight + 0  : totalTargetWeight + (parseFloat(data[k].weight));  
        }
        else{
        totalTargetWeight = data[k].weight === "0%" ? totalRecommendedWeight + 0 : totalTargetWeight + (parseFloat(data[k].weight) ? parseFloat(data[k].weight) : parseFloat(data[k].targetWeight));
      }
      }
     // this.view.lblRecTotalValue.text = Math.round(totalRecommendedWeight) + ".00%";
      //this.view.lblTotalTarget.text = Math.round(totalTargetWeight) + ".00%";
      //IW-3687
     /* if (totalTargetWeight >= 99.91 && totalTargetWeight <= 100.09) {
                    this.view.lblTotalTarget.text = "100.00%";    
                }else{
                this.view.lblTotalTarget.text = (totalTargetWeight).toFixed(2) + "%";
                }*/
      var decfixrecTot = totalRecommendedWeight.toString().split(".");
      var decfixtarTot = totalTargetWeight.toString().split(".");
      var a = decfixrecTot[1]? decfixrecTot[1].split(""):decfixrecTot[1];
      var b = decfixtarTot[1]? decfixtarTot[1].split("") : decfixtarTot[1];
      this.view.lblRecTotalValue.text = (decfixrecTot[1]===undefined || decfixrecTot[1].length === 1 || a[1] === "0")? totalRecommendedWeight.toFixed(1) + "%" : totalRecommendedWeight.toFixed(2) + '%';
      this.view.lblTotalTarget.text = (decfixtarTot[1]===undefined || decfixtarTot[1].length === 1 || b[1] === "0")? totalTargetWeight.toFixed(1) + "%" : totalTargetWeight.toFixed(2) + '%';
      }catch(err) {
        this.setError(err, "setTotalValue");
      }

    },
    /**
	* @api : setError
	* triggered as a error call back for any service
    * @arg1: errorMsg {String} - error message
    * @arg2: method {String} - method from which error message is received
	* @return : NA
	*/
    setError: function(errorMsg, method) {
      var scope = this;
      var errorObj = {
        "method" : method,
        "error": errorMsg
      };
      var wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
        wealthModule.onError(errorObj);
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

   
    /**
    *Method returns true if any one of the asset is not customized 
    */
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
