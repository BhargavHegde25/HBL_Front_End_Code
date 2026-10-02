/* eslint-disable */
define(['./proposalListDAO','./ParserUtilsManager','./FormatUtils','CommonUtilities', './CacheUtils','./ViewConstants'],function(proposalListDAO,ParserUtilsManager,FormatUtils,CommonUtilities,CacheUtils,ViewConstants) {

  return {
    data : {},
    dataFromForm : {},
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      //       this._objService="";
      //       this._objName="";
      //       this._operation="";
      //       this._criteria = {};
               this.parserUtilsManager = new ParserUtilsManager();
               this.FormatUtils = new FormatUtils();
      //       //this.portFolioId = "",
      //       //this.instruData = {};
               this.proposalListDAO = new proposalListDAO();

      //       defineSetter(this, 'objService', function (val) {
      //         if (typeof val === 'string' && val !== '') {
      //           this._objService = val;
      //         }
      //       });
      //       defineGetter(this, 'objService', function () {
      //         return this._objService;
      //       });
      //       defineSetter(this, 'objName', function (val) {
      //         if (typeof val === 'string' && val !== '') {
      //           this._objName = val;
      //         }
      //       });
      //       defineGetter(this, 'objName', function () {
      //         return this._objName;
      //       });
      //       defineSetter(this, 'operation', function (val) {
      //         if (typeof val === 'string' && val !== '') {
      //           this._operation = val;
      //         }
      //       });
      //       defineGetter(this, 'operation', function () {
      //         return this._operation;
      //       });
      //       defineSetter(this, 'criteria', function (val) {
      //         if (typeof val === 'string' && val !== '') {
      //           this._criteria = val;
      //         }
      //       });
      //       defineGetter(this, 'criteria', function () {
      //         return this._criteria;
      //       });
    },

    preShow : function () {
      var scope = this;
      scope.initActions();
    },

    initActions: function(){
      var self = this;
      try
      {
        this.makeDaoCallproposalList();
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting the actions to columns.",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    makeDaoCallproposalList: function(){
      try{
        var navMan = applicationManager.getNavigationManager();
        var date = navMan.getCustomInfo("frmReviewNewProposal");
	this.proposalDate = date;
        let objectName = "InvestmentProposal";
        let objectServiceName = "PortfolioServicing";
        let operationName = "getOrderProposal";
        let serviceResponseIdentifier = "S1";
        this.dataFromForm = navMan.getCustomInfo("frmReviewNew");
        if(kony.application.getPreviousForm().id === "frmPortfolioOverview" || kony.application.getPreviousForm().id === "frmPortfolioHealthCheck" ||(kony.application.getPreviousForm().id === "frmContactAdvisor" && this.dataFromForm.newprop === true))
        {
          var criteria = {
            "portfolioId": applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portofId,
            "sortBy": "currentWeight",
            "sortOrder": "desc",
            "searchByInstrumentName": "",
            "pageSize": "10",
            "pageOffset": "0",
            "type": "orderProposal",
            "pastProposalId": "",
            "portfolioServiceType": "Advisory",
            "funcResultCode":scope_WealthPresentationController.funcResultCode
          };
        }
        else if (kony.application.getPreviousForm().id === "frmPastProposal" || (kony.application.getPreviousForm().id === "frmContactAdvisor" && this.dataFromForm.pastprop === true))
        {
          var criteria = {
            "portfolioId": applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portofId,
            "sortBy": "instrumentName",
            "sortOrder": "desc",
            "searchByInstrumentName": "", 
            "pageSize": "10",
            "pageOffset": "0",
            "portfolioServiceType": "Advisory",
            "pastProposalId": "",
            "type": "pastProposal"
          };
        }

        this.proposalListDAO.fetchDetails(objectServiceName,operationName,objectName,criteria,serviceResponseIdentifier,this.onServiceSuccess,this.onError);
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in making service call.",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    onServiceSuccess: function(response){
      //var data = response.orderProposal;
      var formUtilityMan = applicationManager.getFormatUtilManager();	
      var amtLatest = formUtilityMan.formatAmountandAppendCurrencySymbol(response.totalOrderAmount,response.orderAmountCurrency);
   //   var taxesLatest = formUtilityMan.formatAmountandAppendCurrencySymbol(response.totalFeesTaxes,response.orderAmountCurrency);
      this.view.lblAmount.text = amtLatest;
   //   this.view.lblFeesandTaxesVal.text = taxesLatest;
      if(kony.application.getPreviousForm().id === "frmPortfolioOverview" || kony.application.getPreviousForm().id === "frmPortfolioHealthCheck" ||(kony.application.getPreviousForm().id === "frmContactAdvisor" && this.dataFromForm.newprop === true))
      {
        this.view.lblValue.text = response.proposaldateTime;
      }
      else if (kony.application.getPreviousForm().id === "frmPastProposal" || (kony.application.getPreviousForm().id === "frmContactAdvisor" && this.dataFromForm.pastprop === true))
      {
        this.view.lblValue.text = this.proposalDate;
      }
      this.bindProposalListInstruments(response);
    },

    onError: function(errorObj){
      // error fetch
    },

    bindProposalListInstruments: function(data) {
      this.data = data;	
      if (data === 0 || data === undefined || data.length == 0) {
        if(kony.application.getPreviousForm().id === "frmPortfolioOverview" || kony.application.getPreviousForm().id === "frmPortfolioHealthCheck" ||(kony.application.getPreviousForm().id === "frmContactAdvisor" && this.dataFromForm.newprop === true))
        {
          this.view.lblNoResults.text = "No New Proposals";
        }
        else if (kony.application.getPreviousForm().id === "frmPastProposal" || (kony.application.getPreviousForm().id === "frmContactAdvisor" && this.dataFromForm.pastprop === true))
        {
          this.view.lblNoResults.text = "No Past Proposals";

        }
        this.view.segProposalList.removeAll();
        this.view.flxNoResults.setVisibility(true);
        this.view.flxHeader.setVisibility(false);
        this.view.flxMiddle.setVisibility(false);
        this.view.flxSegmentContainer.setVisibility(false);
      } else {
        this.view.flxNoResults.setVisibility(false);
        this.view.flxHeader.setVisibility(true);
        this.view.flxMiddle.setVisibility(true);
        this.view.flxSegmentContainer.setVisibility(true);
        scopeObj = this;
        var widgetDataMap = {
//           "lblValue" : "lblValue",
//           "lblAmount":"lblAmount",
//           "lblFeesandTaxesVal" :"lblFeesandTaxesVal",
          "lblOrder" : "lblOrder",
          "lblInstrumentName":"lblInstrumentName",
  //        "lblISIN" :"lblISIN",
  //        "lblCurrentWeight" : "lblCurrentWeight",
 //         "lblTargetWeight":"lblTargetWeight",
          "lblOrderQuantity": "lblOrderQuantity",
          "lblOrderAmount" : "lblOrderAmount",
  //        "lblInvestorDocuments" : "lblInvestorDocuments"
        };
        var formUtilityMan = applicationManager.getFormatUtilManager();	
        if(kony.application.getPreviousForm().id === "frmPortfolioOverview" || kony.application.getPreviousForm().id === "frmPortfolioHealthCheck" ||(kony.application.getPreviousForm().id === "frmContactAdvisor" && this.dataFromForm.newprop === true))
        {
          var proposalSegmentData = data.orderProposal.map(function(itemData) {
          /*  var currWeight = "";
            if(itemData.currentWeight !== "")
            {
              currWeight = itemData.currentWeight + "%";
            }

            var targWeight = "";
            if(itemData.targetWeight !== "")
            {
              targWeight = itemData.targetWeight + "%";
            }*/

            if (kony.application.getCurrentBreakpoint() === 1024){
              if(itemData.instrumentName.length>21){
                var insname = itemData.instrumentName.slice(0,20);
                var instruname = insname + "...";
              }
              else{
                instruname = itemData.instrumentName;
              }
            }
            else{
              instruname = itemData.instrumentName;
            }
            var flxNews = {"toolTip" : itemData.instrumentName,
						"text" : instruname}
            var ordAmt = formUtilityMan.formatAmountandAppendCurrencySymbol(itemData.orderAmount,data.orderAmountCurrency);

            var objectData = {
              //             "lblValue" : data.proposaldateTime,
              //             "lblAmount":amtLatest,
              //             "lblFeesandTaxesVal" :taxesLatest,
              "lblOrder" : itemData.order,
              "lblInstrumentName":flxNews,
            //  "lblISIN" :itemData.isinExchange,
           //   "lblCurrentWeight" : currWeight,
           //   "lblTargetWeight":targWeight,
              "lblOrderQuantity": itemData.orderQty,
              "lblOrderAmount" : ordAmt,
          //    "lblInvestorDocuments" : itemData.investorDocuments
            };
            return objectData;
          });
        }
        else if (kony.application.getPreviousForm().id === "frmPastProposal" || (kony.application.getPreviousForm().id === "frmContactAdvisor" && this.dataFromForm.pastprop === true))
        {
          var proposalSegmentData = data.pastProposal.map(function(itemData) {
          /*  var currWeight = "";
            if(itemData.currentWeight !== "")
            {
              currWeight = itemData.currentWeight + "%";
            }

            var targWeight = "";
            if(itemData.targetWeight !== "")
            {
              targWeight = itemData.targetWeight + "%";
            }*/
			if (kony.application.getCurrentBreakpoint() === 1024){
              if(itemData.instrumentName.length>21){
                var insname = itemData.instrumentName.slice(0,20);
                var instruname = insname + "...";
              }
              else{
                instruname = itemData.instrumentName;
              }
            }
            else{
              instruname = itemData.instrumentName;
            }
            var flxNews = {"toolTip" : itemData.instrumentName,
						"text" : instruname}
            var ordAmt = formUtilityMan.formatAmountandAppendCurrencySymbol(itemData.orderAmount,data.orderAmountCurrency);

            var objectData = {
              //             "lblValue" : data.proposaldateTime,
              //             "lblAmount":amtLatest,
              //             "lblFeesandTaxesVal" :taxesLatest,
              "lblOrder" : itemData.order,
              "lblInstrumentName":flxNews,
     //         "lblISIN" :itemData.isinExchange,
    //          "lblCurrentWeight" : currWeight,
    //          "lblTargetWeight":targWeight,
              "lblOrderQuantity": itemData.orderQty,
              "lblOrderAmount" : ordAmt,
   //           "lblInvestorDocuments" : itemData.investorDocuments
            };
            return objectData;
          });
        }
        scopeObj.view.segProposalList.widgetDataMap = widgetDataMap;
        scopeObj.view.segProposalList.setData(proposalSegmentData); 
        scopeObj.view.forceLayout();
      }
    }
  };
});