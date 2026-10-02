/* eslint-disable */
define(['./suitabilityReviewDAO'],function(suitabilityReviewDAO) {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.businessController = new suitabilityReviewDAO();
      this.view.btnPrev.onClick = this.prevClick;
      this.view.btnNext.onClick = this.nextClick;
      this.view.btnNextOne.onClick = this.initialNext;
      this.context = {};
      this.value = [];
      this.data = {};
      this.next = 0;
      this.prev= 1;
      this.prevClick = 0;
      this.suitability = [];
      this.questionData = {};
      this.newArray = [];
      this.firstuser = false;
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
            defineGetter(this, 'widgetMapping', () => {
                return this._widgetMapping;
            });
            defineSetter(this, 'widgetMapping', value => {
                this._widgetMapping = value;
            });
            defineGetter(this, 'serviceCall', () => {
                return this._serviceCall;
            });
            defineSetter(this, 'serviceCall', value => {
                this._serviceCall = value;
            });
        },
    
    setContext: function (context, navigateChooseStrategy,firstuser) {
      var self = this;
      try {
        this.onRequestStart();
        this.view.btnNext.text = kony.i18n.getLocalizedString("i18n.wealth.next");
        this.view.flxSuitability.setVisibility(false);
        this.view.flxNextButton.setVisibility(true);
        this.view.flxPrevNext.setVisibility(false);
        this.context = context;
        this.firstuser = firstuser;
        this.navigateToChoose = navigateChooseStrategy;
        this.businessController.fetchDetails(this._serviceCall.ServiceName,this._serviceCall.OperationName,this._serviceCall.ObjectName,this.context,this.onServiceSuccess,this.onError);
      } catch (err) {
        this.onRequestEnd();
        self.setError(err, "setContext");
      }
    },
    
    onServiceSuccess: function(response){
      try{
      var self = this;
      this.clickresp = [];
     var response = {
        questions: response.questions.filter(
          item => item.option && item.option.length > 0
        )
      }
      if(response.questions){
      for(var i=0;i<response.questions.length;i++){
        this.clickresp.push({operator : []});
        for(var j=0;j<response.questions[i].option.length;j++){
          Object.assign(response.questions[i].option[j], {
            "img" : "inactive_1x.png"
          });
        }
      }
      this.data = response;
      this.newArray.push(...this.data.questions);
      this.storeDatafunc(0, response);
      }else{
        self.setError("Empty Response", "onServiceSuccess");
      }
        }catch(err) {
        this.setError(err, "onServiceSuccess");
      }
    },
    
    prevClick:function(){
      try{
      this.view.btnNext.skin = "ICSknBtnF6F6F615px";
      this.view.btnNextOne.skin = "ICSknBtnF6F6F615px";
      if(this.prev === 1){
        this.next = 0;
        this.prev = 1;
        this.view.flxNextButton.setVisibility(true);
        this.view.flxPrevNext.setVisibility(false);
        this.storeDatafunc(this.next,this.data);
      }else if(!this.view.flxNextButton.isVisible){
        this.view.btnNext.text = kony.i18n.getLocalizedString("i18n.wealth.next");
        this.next--;
        this.prev--;
        this.storeDatafunc(this.prev,this.data); 
      }
        }catch(err) {
        this.setError(err, "prevClick");
      }
    },

    initialNext:function(){
      try{
      if(this.view.btnNext.skin !== "sknBtnE2E9F0Rounded"){
      this.view.flxNextButton.setVisibility(false);
      this.view.flxPrevNext.setVisibility(true);
      this.next++;
      this.storeDatafunc(this.next,this.data);
      }
        }catch(err) {
        this.setError(err, "initialNext");
      }
    },
    
    nextClick:function(){
      try{
     if(this.view.btnNext.skin !== "sknBtnE2E9F0Rounded"){
      if(this.view.btnNext.text === kony.i18n.getLocalizedString("i18n.wealth.submit")){
        this.submitContext();
      }
      else if(this.next === (this.data.questions.length-1)){
        this.next = 0;
        this.prev = 1;
      }else if(!this.view.flxNextButton.isVisible){
        if(this.next === (this.data.questions.length-2)){
          this.view.btnNext.text = kony.i18n.getLocalizedString("i18n.wealth.submit");
        }
        this.next++;
        this.prev++;
        this.storeDatafunc(this.next,this.data); 
      }
     }
        }catch(err) {
        this.setError(err, "nextClick");
      }
    },
    
    storeDatafunc:function(val, response){
      try{
      this.view.lblHeading.text = (val+1).toString() + ". " + response.questions[val].question;
      var segData=[];
      var storeData;
      var suitabilityArray =  response.questions;
      for(var k=0;k<suitabilityArray[val].option.length;k++){
        storeData={
          onClickevent : {"onClick": function(event, context) {
            this.onSegmentRowClick(event, context);
          }.bind(this)},
          suitabilityName: suitabilityArray[val].option[k].desc,
          submitname : suitabilityArray[val].option[k].name,
          img : (suitabilityArray[val].option[k].img === "active_1x.png") ? "active_1x.png" : "inactive_1x.png",
        };
        segData.push(storeData);
        this.suitability = segData;
      }
      if(this.clickresp[val].operator.length !== 0){
        for(var x=0;x<suitabilityArray[val].option.length;x++){
          if(this.clickresp[val].operator[x].img ==="active_1x.png"){
            this.view.btnNext.skin = "ICSknBtnF6F6F615px";
            this.view.btnNextOne.skin = "ICSknBtnF6F6F615px";
          }}
      }
      else{
        this.view.btnNext.skin = "sknBtnE2E9F0Rounded";
        this.view.btnNextOne.skin = "sknBtnE2E9F0Rounded";
      }
      this.view.segSuitability.widgetDataMap = this._widgetMapping;
      this.view.segSuitability.setData(segData);
      this.view.flxSuitability.setVisibility(true);
      this.onRequestEnd();
        }catch(err) {
        this.setError(err, "storeDatafunc");
      }
    },
    
     onSegmentRowClick: function(event, context) {
       try{
      var rowindex = context.rowIndex;
      this.clickresp[this.next].operator = this.suitability;
       this.newArray[this.next] = [];
       if(this.prevClick >= this.data.questions[this.next].option.length){
         this.prevClick = 0;
       }
      for(var x=0;x<this.data.questions[this.next].option.length;x++){
        if(this.clickresp[this.next].operator[x].img ==="active_1x.png"){
            this.prevClick = x;
          }
      }
       this.newArray[this.next]=this.suitability[rowindex].submitname;
      this.clickresp[this.next].operator[this.prevClick].img = "inactive_1x.png";
      this.data.questions[this.next].option[this.prevClick].img = "inactive_1x.png";
      this.prevClick = rowindex;
      this.clickresp[this.next].operator[rowindex] = Object.assign(this.clickresp[this.next].operator[rowindex],{
        suitabilityName : this.suitability[rowindex].suitabilityName,
        img : "active_1x.png"
      });
      this.data.questions[this.next].option[rowindex].img = "active_1x.png";
       this.view.btnNext.skin = "ICSknBtnF6F6F615px";
      this.view.btnNextOne.skin = "ICSknBtnF6F6F615px";
      this.view.segSuitability.removeAll();
     this.view.segSuitability.setData(this.clickresp[this.next].operator);
         }catch(err) {
        this.setError(err, "onSegmentRowClick");
      }
    },
    
    submitContext: function () {
      var scope = this;
      try {
        this.prevClick = 0;
        this.next = 0;
        this.prev= 1;
        var submitques = [];
        for(var x=0;x<this.data.questions.length;x++){
        	submitques.push(this.toCamelCase(this.data.questions[x].questionCode));
        	this.questionData[submitques[x]] = this.newArray[x];
        }
        this.questionData.portfolioId = applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portfolioId;
        this.questionData.portfolioServiceType = "Advisory";
        this.questionData.portfolioCode = applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portfolioId
        this.questionData.financialNeeds = this.questionData.easeofMeetingUnforseenFinancialNeeds;
		this.questionData.investmentKnowledge = this.questionData.knowledgeofInvestments;
		this.questionData.maxLossToleranceCapacity = this.questionData.maximumLossToleranceCapacity;
        this.view.flxPopup.setVisibility(true);
        this.ServiceName = "PortfolioServicing";
        this.OperationName = "submitStrategyQuestionnaire";
        this.ObjectName = "Strategies";
         this.businessController.fetchDetails(this.ServiceName,this.OperationName,this.ObjectName,this.questionData,this.onSubmitSuccess,this.onError);
      } catch (err) {
        scope.setError(err, "setContext");
      }
    },
    
    
    
    toCamelCase : function(str) {
      // remove spaces and replace with empty string
      str = str.replace(/[\s]/g, '');

      // convert first character to lowercase
      return str.charAt(0).toLowerCase() + str.slice(1);
    },

    
    
    onSubmitSuccess : function(resp){
      scope_WealthPresentationController.score = resp.score;
	  scope_WealthPresentationController.questionnaireHistoCode = resp.questionnaireHistoCode;
      this.newArray = [];
      this.questionData = {};
      this.view.flxPopup.setVisibility(false);
      this.navigateToChoose();
    },
    
    onCancel:function(){
      this.prevClick = 0;
      this.next = 0;
      this.prev= 1;
      this.newArray = [];
      this.questionData = {};
      this.view.btnNext.skin = "sknBtnE2E9F0Rounded";
      this.view.btnNextOne.skin = "sknBtnE2E9F0Rounded";
    },
    
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
    }

  };
});