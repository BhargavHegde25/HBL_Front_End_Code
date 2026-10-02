
define(['./suitabilityRiskAppetiteBusinessController'],function(suitabilityRiskAppetiteBusinessController) {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.businessController = new suitabilityRiskAppetiteBusinessController();
      this.context = {};
      this.serviceParams = {};
      segData: []
      currQnum: 0
      flag: 0
      answerArray: []
      response: {}
      optionIndex: 0


    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      /*defineGetter(this, 'serviceCall', () => {
        return this._serviceCall;
      });*/
      /*defineSetter(this, 'serviceCall', value => {
        this._serviceCall = value;
      });*/
      /*defineGetter(this, 'serviceCall2', () => {
        return this._serviceCall2;
      });*/
      /*defineSetter(this, 'serviceCall2', value => {
        this._serviceCall2 = value;
      });*/
    },

    setContext: function(context,serviceParams){
      this.view.flxQuestion.isVisible=false;
      this.view.flxAnswers.isVisible=false;
      this.view.flxButtons.isVisible=false;
      this.answerArray=[];
      var scope = this;
      try {
        this.context = context;
        this.serviceParams = serviceParams;
        this.businessController.fetchDetails(this.serviceParams.ServiceName,this.serviceParams.OperationName1,this.serviceParams.ObjectName,this.context,this.getStrategyQuestionsServiceSuccess,this.onError);

      } catch (err) {
        scope.setError(err, "setContext");
      }



    },
    getStrategyQuestionsServiceSuccess: function(response){
      this.response = {
        questions: response.questions.filter(
          item => item.option && item.option.length > 0
        )
      }

      if(this.response && this.response.questions) {
        this.currQnum=0;
        this.formLoad(this.response);
      }
      else{
        let errorObj = {
          "level": "ComponentViewController",
          "method": "onServiceSuccess",
          "error": "Response is invalid"
        };
        this.onError(errorObj);
      }
    },

    formLoad: function(response){
      this.view.flxQuestion.isVisible=true;
      this.view.flxAnswers.isVisible=true;
      this.view.flxButtons.isVisible=true;
      this.view.lblQuestion.text = response.questions[this.currQnum].question;
      this.populateSegment();
      this.view.btn2.skin="sknBtnffffffBorder0273e31pxRadius2px";
      this.view.btn2.focusSkin="sknBtnffffffBorder0273e31pxRadius2px";
      this.view.flxButtons.top="443dp";
      this.view.btn2.text=kony.i18n.getLocalizedString("i18n.wealth.previous");
      this.view.btn1.text=kony.i18n.getLocalizedString("i18n.wealth.cancel");
      this.view.btn3.text= kony.i18n.getLocalizedString("i18n.wealth.next");
      this.view.btn1.isVisible=true;
      this.view.btn1.text = kony.i18n.getLocalizedString("i18n.wealth.cancel");
      this.view.btn1.skin="sknBtnffffffBorder0273e31pxRadius2px"
      this.view.btn1.focusSkin="sknBtnffffffBorder0273e31pxRadius2px";
      if (this.answerArray[this.currQnum] === undefined){
        this.view.btn3.skin = "ICSknbtnDisablede2e9f036px";
        this.view.btn3.focusSkin = "ICSknbtnDisablede2e9f036px";
      }
      if(this.currQnum===0){
        this.view.btn1.isVisible = false;
        this.view.btn2.text=kony.i18n.getLocalizedString("i18n.wealth.cancel");
      }
      if(this.currQnum=== this.response.questions.length-1){
        this.view.btn3.text=kony.i18n.getLocalizedString("i18n.wealth.submit");
      }
      if(kony.application.getCurrentBreakpoint()>=1366){
        if(response.questions[this.currQnum].question.length <= 66){
          this.view.flxAnswers.top="120dp";
        }
        else{
          this.view.flxAnswers.top="155dp";
        }
      }
      else if(kony.application.getCurrentBreakpoint()===1024){
        this.view.flxAnswers.top="155dp";
      }
      this.view.btn3.onClick = this.loadAnotherQues;
      this.view.btn2.onClick = this.goToPrevQues;
      this.view.btn1.onClick = this.navPortfolioOverview;

    },

    populateSegment: function() {
      this.segData = [];
      var QoptionsArray = this.response.questions[this.currQnum].option;
      this.optionIndex = 0;
      this.flag = 0;
      var storeData;
      for (var k = 0; k < QoptionsArray.length; k++) {
        storeData = {
          img: {
            "src": "radio_btn_inactive_1.png"
          },
          ImgnSkinChange: {
            "onClick": function(event, context) {
              this.onSegmentRowClick(event, context);
            }.bind(this)
          },

          options: {
            "text": QoptionsArray[k].desc,
            "skin": "sknlbl424242SSPReg15px"
          },
        };
        if(storeData.options.text.length >= 97){
          storeData.ImgnSkinChange['height'] = "50dp";
        }
        this.segData.push(storeData);
      }
      this.view.segAnswers.widgetDataMap = {
        imgRadioButton: "img",
        flximg: "ImgnSkinChange",
        lblAnswer: "options"
      };
      if (this.answerArray[this.currQnum] !== undefined) {
        var optionArray = [];
        var answerName = this.answerArray[this.currQnum];
        for (var z = 0; z < QoptionsArray.length; z++) {
          optionArray.push(QoptionsArray[z].name);
        }
        this.optionIndex = optionArray.indexOf(answerName);
        this.segData[this.optionIndex] = Object.assign(this.segData[this.optionIndex], {
          img: {
            "src": "radiobtn_active.png"
          }
        });
        this.segData[this.optionIndex].options.skin = "sknlbl424242SSP15pxSemibold";
        this.view.btn3.skin = "sknBtnSSPffffff15pxBg0273e3";
      }
      this.view.segAnswers.removeAll();
      this.view.segAnswers.setData(this.segData);
    },

    onSegmentRowClick: function(event, context) {
      var rowindex = context.rowIndex;
      this.segData[this.flag].img.src = "radio_btn_inactive_1.png";
      this.segData[this.flag].options.skin = "sknlbl424242SSPReg15px";
      this.flag = rowindex;
      this.segData[rowindex] = Object.assign(this.segData[rowindex], {
        img: {
          "src": "radiobtn_active.png"
        }
      });
      this.segData[rowindex].options.skin = "sknlbl424242SSP15pxSemibold";
      if (this.answerArray[this.currQnum] !== undefined && this.flag!==this.optionIndex) {

        this.segData[this.optionIndex] = Object.assign(this.segData[this.optionIndex], {
          img: {
            "src": "radio_btn_inactive_1.png"
          }
        });
        this.segData[this.optionIndex].options.skin = "sknlbl424242SSPReg15px";


      }
      this.view.segAnswers.removeAll();
      this.view.segAnswers.setData(this.segData);
      this.view.btn3.skin = "sknBtnSSPffffff15pxBg0273e3";
      this.answerArray.splice(this.currQnum, 1, this.response.questions[this.currQnum].option[rowindex].name);
    },

    loadAnotherQues: function(){
      if(this.view.btn3.text=== kony.i18n.getLocalizedString("i18n.wealth.next") && this.view.btn3.skin==="sknBtnSSPffffff15pxBg0273e3"){
        this.currQnum++;
        this.formLoad(this.response);
      }
      if(this.view.btn3.text=== kony.i18n.getLocalizedString("i18n.wealth.submit") && this.view.btn3.skin==="sknBtnSSPffffff15pxBg0273e3"){

        var questionCodeArray=[];
        var reqPayload={};
        for(var c=0;c<this.response.questions.length;c++){
          questionCodeArray.push(this.toCamelCase(this.response.questions[c].questionCode))
          reqPayload[questionCodeArray[c]] = this.answerArray[c];
        }
        try{
          reqPayload.portfolioId = applicationManager.getModulesPresentationController("WealthPortfolioUIModule").getPortfolioId();
          reqPayload.portfolioServiceType = "Advisory";
          reqPayload.financialNeeds = reqPayload.easeofMeetingUnforseenFinancialNeeds;
          reqPayload.investmentKnowledge = reqPayload.knowledgeofInvestments;
          reqPayload.maxLossToleranceCapacity = reqPayload.maximumLossToleranceCapacity;
          
          reqPayload.portfolioCode =  applicationManager.getModulesPresentationController("WealthPortfolioUIModule").getPortfolioId();
          this.businessController.fetchDetails(this.serviceParams.ServiceName,this.serviceParams.OperationName2,this.serviceParams.ObjectName,reqPayload,this.submitStrategyQuesServiceSuccess,this.onError);
        }catch (err) {
          scope.setError(err, "setContext");
        }
      }
    },

    toCamelCase : function(str){
      // remove spaces and replace with empty string
      str = str.replace(/[\s]/g, '');

      // convert first character to lowercase
      return str.charAt(0).toLowerCase() + str.slice(1);
    },


    submitStrategyQuesServiceSuccess: function(resp){

      if(resp.status==="success"){
        scope_WealthPresentationController.score = resp.score;
        scope_WealthPresentationController.questionnaireHistoCode = resp.questionnaireHistoCode;
        //write code to navigate to frmChangeStrategy
        var navManager = applicationManager.getNavigationManager();
        var newUserBoolean = navManager.getCustomInfo('newUserData');
        if(newUserBoolean === 'true'){
          this.businessController.fetchDetails(this.serviceParams.ServiceName,this.serviceParams.OperationName3,this.serviceParams.ObjectName,this.context,this.getMyStrategyServiceSuccess,this.onError);
        }
        else{
          new kony.mvc.Navigation({
            "appName": "PortfolioManagementMA",
            "friendlyName": "frmChangeStrategy"
          }).navigate();
        }}
    },

    getMyStrategyServiceSuccess : function(stratResponse){
      var strategyName = stratResponse.myStrategyName;
      var navManager = applicationManager.getNavigationManager();
      navManager = navManager.setCustomInfo('StrategyNameData',strategyName);
      new kony.mvc.Navigation({
        "appName": "PortfolioManagementMA",
        "friendlyName": "frmChangeStrategy"
      }).navigate(); 
    },

    goToPrevQues: function(){
      if(this.view.btn2.text=== kony.i18n.getLocalizedString("i18n.wealth.previous")){
        this.currQnum--;
        this.formLoad(this.response);
      }
      else{
        //write nav code to frmPortfolioOverview
		var navManager = applicationManager.getNavigationManager();
        var data = navManager.getCustomInfo("frmFirstUserVal");
        if(data !== undefined){
          data = undefined;
          navManager.setCustomInfo("frmFirstUserVal", data);
            new kony.mvc.Navigation({
                "appName": "PortfolioManagementMA",
                "friendlyName": "frmPortfolioOverview"
            }).navigate();
        }else{
            new kony.mvc.Navigation({
                "appName": "PortfolioManagementMA",
                "friendlyName": "frmStrategyAllocation"
            }).navigate();
      }
      }
    },

    navPortfolioOverview: function(){
      //write nav code to frmPortfolioOverview
      var navManager = applicationManager.getNavigationManager();
       var data = navManager.getCustomInfo("frmFirstUserVal");
      if(data !== undefined){
        data = undefined;
        navManager.setCustomInfo("frmFirstUserVal", data);
            new kony.mvc.Navigation({
                "appName": "PortfolioManagementMA",
                "friendlyName": "frmPortfolioOverview"
            }).navigate();
      }else{
            new kony.mvc.Navigation({
                "appName": "PortfolioManagementMA",
                "friendlyName": "frmStrategyAllocation"
            }).navigate();
      }
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