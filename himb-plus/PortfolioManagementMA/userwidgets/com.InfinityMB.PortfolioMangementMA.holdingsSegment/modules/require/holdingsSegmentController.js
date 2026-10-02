define(['./ParserUtilsManager', './FormatUtils', './WealthDetailsListDAO'], function(ParserUtilsManager, FormatUtils, WealthDetailsListDAO) {
  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      //global declarations
      this.refCurrency = "";
      this._currencyCode = "secCCy";
      this._featuresAndPermission = "";
      this._actionImgIsVisible = "";
      this.response = [];
      this.fullResponse = {};
      this.portfolioDetailsPLs = {};
      this.unformattedTotalValue = "";
      this.formatSkins = {};
      this.formattingJSON = {};
      this.context = {};
      this.includeOrderParams = {};
      this.excludeOrderParams = {};
      this.isIncludeOrder = false;
      this.imageDisable = "disabletoggle.png";
      //Parser util object
      this.parserUtilsManager = new ParserUtilsManager();
      //Format util object
      this.formatUtils = new FormatUtils();
      this.wealthDetailsListDao = new WealthDetailsListDAO();
      this.view.preShow = this.preShow;
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      defineGetter(this, 'featuresAndPermissions', () => {
        return this._featuresAndPermissions;
      });
      defineSetter(this, 'featuresAndPermissions', value => {
        this._featuresAndPermissions = value;
      });
      defineGetter(this, 'amountFormat', () => {
        return this._amountFormat;
      });
      defineSetter(this, 'amountFormat', value => {
        this._amountFormat = value;
      });
    },
    /**
     * Component preshow
     **/
    preShow: function() {
      try {
        if (scope_WealthPresentationController.isMockIntegration || scope_WealthPresentationController.isTapIntegration) {
          this.view.flxToggle.isVisible = true;
        } else {
          this.view.flxToggle.isVisible = false;
        }
        if (scope_WealthPresentationController.isOpenOrdersIncluded) {
          this.isIncludeOrder = true;
          this.context.isIncludeOrders = "true";
          let currentTheme = kony.theme.getCurrentTheme();
          if(currentTheme === "default"){
          this.view.imgToggle.src = "enabletoggle.png";
          }else{
          this.view.imgToggle.src = "enabletoggledark.png";
          }
          this.includeOrderParams = this.context;
        } else {
          this.isIncludeOrder = false;
          this.context.isIncludeOrders = "false";
          this.view.imgToggle.src = this.imageDisable;
          this.excludeOrderParams = this.context;
          this.includeOrderParams = this.context;
        }
        this.view.imgToggle.onTouchEnd = this.toggle;
        this.view.SearchAndFilterWealth.placeholderText = kony.i18n.getLocalizedString("i18n.wealth.searchByInstrument");
        this.view.SearchAndFilterWealth.onSearchTextChange = this.onSearchChangeCall;
        this.formattingJSON = {
          "amountFormat": JSON.parse(this._amountFormat),
          "dateFormat": "m/d/Y",
          "backenddateformat": "Y-m-d"
        };
        this.formatSkins = {
          TEXT_SKIN: "sknlbl424242SSPR40px",
          TEXT_HIDDEN: "sknHidden",
          POSITIVE_PERCENTAGE_SKIN: "sknIbl2f8523SSPsb45px",
          NEGATIVE_PERCENTAGE_SKIN: "sknIblEE0005SSPsb45px",
          DATE_SKIN: "sknLbl424242SSPReg26px",
          AMOUNT_SKIN: "sknLbl424242SSPReg26px",
        };
        this.getWealthList();
      } catch (err) {
        this.setError(err, "preShow");
      }
    },
    /**
     * method to set Euroflow
     **/
    setEuroFlow(isEuroFlow) {
      try {
        this.formatUtils.setEuropeFlow(isEuroFlow);
      } catch (err) {
        this.setError(err, "checkPermission");
      }
    },
    toggle: function() {
      if (this.view.imgToggle.src === this.imageDisable) { // for include orders
          let currentTheme = kony.theme.getCurrentTheme();
          if(currentTheme === "default"){
          this.view.imgToggle.src = "enabletoggle.png";
          }else{
          this.view.imgToggle.src = "enabletoggledark.png";
          }
        scope_WealthPresentationController.isOpenOrdersIncluded = true;
        this.includeOrderParams.isIncludeOrders = "true";
        this.includeOrderParams.sortBy = scope_WealthPresentationController.sortByValueHoldingsIncludeOrders;
        this.isIncludeOrder = true;
        this.view.SearchAndFilterWealth.clearSearchOnToggle();
        this.includeOrderParams.searchByInstrumentName = " ";
        this.view.SearchAndFilterWealth.placeholderText = kony.i18n.getLocalizedString("i18n.wealth.searchByInstrument");
      } else { //to exclude include orders
        this.view.imgToggle.src = this.imageDisable
        scope_WealthPresentationController.isOpenOrdersIncluded = false;
        this.excludeOrderParams.isIncludeOrders = "false";
        this.excludeOrderParams.sortBy = scope_WealthPresentationController.sortByValueHoldingsExcludeOrders;
        this.isIncludeOrder = false;
        this.view.SearchAndFilterWealth.clearSearchOnToggle();
        this.excludeOrderParams.searchByInstrumentName = " ";
        this.view.SearchAndFilterWealth.placeholderText = kony.i18n.getLocalizedString("i18n.wealth.searchByInstrument");
      }
      this.getWealthList();
    },
    /**
     * Method triggered on change in searchtext of searchbar
     **/
    onSearchChangeCall: function(params) {
      try {
        var existingparam = this.context;
        if (params !== "" || params !== undefined) {
          existingparam.searchByInstrumentName = params;
          this.context = existingparam;
        }
        this.setContext(existingparam);
        this.getWealthList();
      } catch (err) {
        this.setError(err, "onSearchChangeCall");
      }
    },
    /**
     * Component setContext
     * To collect the context object required for the component 
     * context{JSONobject} - account object 
     */
    setContext: function(context) {
      var self = this;
      try {
        this.context = context;
      } catch (err) {
        var errorObj = {
          "errorInfo": "Error in the preshow of the component.",
          "errorLevel": "Configuration",
          "error": err
        };
        self.onError(errorObj);
      }
    },
    /**
     * Business call for getPortfolioHoldings
     **/
    getWealthList: function() {
      var self = this;
      this.view.segList.setVisibility(false);
      if (this.isIncludeOrder) {
        this.context = this.includeOrderParams;
      } else {
        this.context = this.excludeOrderParams;
      }
      this.onRequestStart();
      try {
        this.wealthDetailsListDao.fetchHoldingsList("PortfolioServicing", "getPortfolioHoldings", "PortfolioDetails", this.context, this.processResponse, this.onError);
      } catch (err) {
        this.onRequestEnd();
        var errorObj = {
          "errorInfo": "Error in doing service call to fetch transactions",
          "errorLevel": "Business",
          "error": err
        };
        self.onError(errorObj);
      }
    },
    /**
     *  Method triggered when there is no Holdings data
     **/
    onError: function(errorObj) {
      this.view.segList.setVisibility(false);
      this.view.lblError.setVisibility(true);
      this.view.lblError.text = kony.i18n.getLocalizedString("i18n.wealth.noHoldings");
      this.onRequestEnd();
    },
    /**
     * Method that returns features and permisssion
     **/
    getFeaturesAndPermissions: function() {
      try {
        var scope = this;
        return scope._featuresAndPermissions;
      } catch (err) {
        this.setError(err, "checkPermission");
      }
    },
    /**
     * Method to return DataMapping for the segment
     **/
    getWidgetDataMap: function() {
      try {
        return {
          "lblName": "lblName",
          "imgLogo": "imgLogo",
          "imgChevron": "imgChevron",
          "lblId": "lblId",
          "lblLatestPriceValue": "lblLatestPriceValue",
          "lblLatestPriceKey": "lblLatestPriceKey",
          "lblQtyValue": "lblQtyValue",
          "lblQtyKey": "lblQtyKey",
          "lblAverageCostValue": "lblAverageCostValue",
          "lblAverageCostKey": "lblAverageCostKey",
          "lblPandLValue": "lblPandLValue",
          "lblPandLKey": "lblPandLKey",
          "lblMarketValValue": "lblMarketValValue",
          "lblMarketValKey": "lblMarketValKey",
          "flxBottomBorder": "flxBottomBorder",
          "flxClick": "flxClick",
          "flxRowOne": "flxRowOne",
          "flxRowTwo": "flxRowTwo",
          "flxLatestPrice": "flxLatestPrice",
          "flxRowThree": "flxRowThree",
          "flxQty": "flxQty",
          "flxAverageCost": "flxAverageCost",
          "flxRowFour": "flxRowFour",
          "flxPandL": "flxPandL",
          "flxMarket": "flxMarket",
          "lblStatus": "lblStatus",
          "lblStatusKey": "lblStatusKey",
          "flxStatus": "flxStatus",
          "imgStatus": "imgStatus"
        };
      } catch (err) {
        this.setError(err, "getWidgetDataMap");
      }
    },
    /**
     * Method used to get the Total Value, UnrealisedPL and Today's value {holdings TopDetails}
     **/
    getHoldingsTopDetails: function(portfolioDetails) {
      this.portfolioDetailsPLs = portfolioDetails;
    },
    /**
     * Method called on servicess success to set  the Total Value, UnrealisedPL and Today's value {holdings TopDetails}
     **/
    processResponse: function(listResponse) {
      try {
        this.fullResponse = listResponse;
        this.response = this.fullResponse["portfolioHoldings"];
        var scope = this;
        var navManager = applicationManager.getNavigationManager();
        var objArr = navManager.getCustomInfo("frmHoldingsRef");
        if ((listResponse["referenceCurrency"] === undefined || listResponse["referenceCurrency"] === "")) {
          listResponse["referenceCurrency"] = objArr.response.referenceCurrency ? objArr.response.referenceCurrency : "USD";
        }
        var unrealizedPLPercentage = "";
        this.unformattedTotalValue = this.portfolioDetailsPLs.marketValue;
        var formattedAmt = this.formatUtils.formatText(this.portfolioDetailsPLs.marketValue, "Amount", this.formatSkins, this.formattingJSON, listResponse["referenceCurrency"]);
        this.refCurrency = listResponse["referenceCurrency"];
        this.view.lblTotalVal.text = formattedAmt.text;
        var unrealizedPL = this.formatUtils.formatText(this.portfolioDetailsPLs.unRealizedPLAmount, "Amount", this.formatSkins, this.formattingJSON, listResponse["referenceCurrency"]);
        if (this.portfolioDetailsPLs.unRealizedPLPercentage !== undefined && this.portfolioDetailsPLs.unRealizedPLPercentage !== "") {
          unrealizedPLPercentage = (this.formatUtils.formatAmount(this.portfolioDetailsPLs.unRealizedPLPercentage)).replace(",", ".");
        }
        if (this.portfolioDetailsPLs.unRealizedPL == "P") {
          this.view.lblUnrealizedPLValue.skin = "sknIbl2f8523SSPsb45px";
          this.view.lblUnrealizedPLValue.text = unrealizedPLPercentage !== "" ? ("+" + unrealizedPL.text + " (+" + unrealizedPLPercentage + "%)") : "+" + unrealizedPL.text;
        } else {
          this.view.lblUnrealizedPLValue.skin = "sknIblEE0005SSPsb45px";
          this.view.lblUnrealizedPLValue.text = unrealizedPLPercentage !== "" ? ("-" + unrealizedPL.text + " (-" + unrealizedPLPercentage + "%)") : "-" + unrealizedPL.text;
        }
        this.modifySegmentData();
        this.onRequestEnd();
      } catch (err) {
        this.setError(err, "checkPermission");
      }
    },
    /**
     * Method returns the context
     **/
    getCriteriaObjValue: function() {
      try {
        return this.context;
      } catch (err) {
        this.setError(err, "checkPermission");
      }
    },
    /**
     * Method to set contextualDots visibility
     **/
    setVisibleActionImage: function(isVisible) {
      try {
        if (isVisible) {
          this._actionImgIsVisible = "true";
        } else {
          this._actionImgIsVisible = "false";
        }
      } catch (err) {
        this.setError(err, "checkPermission");
      }
    },
    /**
     * Helper method to assign currency
     **/
    splitValueField: function(valueToSplit, resObj) {
      try {
        let temp = [];
        temp = valueToSplit.split(",");
        var result = {};
        var curr = "";
        if (temp.length == 1) {
          curr = resObj[this._currencyCode];
          if (curr == undefined) {
            curr = this.refCurrency;
          }
          result = {
            value: temp[0],
            currency: curr
          };
        } else {
          curr = this.fullResponse[temp[1]];
          if (curr == undefined) {
            curr = resObj[temp[1]];
          }
          result = {
            value: temp[0],
            currency: curr
          };
        }
        return result;
      } catch (err) {
        this.setError(err, "checkPermission");
      }
    },
    /**
     * Method to populate the segment
     **/
    modifySegmentData: function() {
      try {
        if (this.response.length !== 0) {
          this.view.lblError.setVisibility(false);
          this.view.segList.setVisibility(false);
          var segData = [];
          var formUtilityMan = applicationManager.getFormatUtilManager();
          var scopeObj = this;
          for (var i in this.response) {
            var record = {};
            var resObj = this.response[i];
            var skinId = "";
            let valueObj;
            if (resObj["description"]) {
              var truncatedText = this.formatUtils.truncateStringWithGivenLength(resObj["description"], 38);
              record["lblName"] = {
                "text": truncatedText
              };
            } else {
              record["lblName"] = {
                "text": ""
              };
            }
            /*ISIN and holdingsType - Starts*/
            var ISIN = (resObj["ISIN"] !== undefined && resObj["ISIN"] !== "") ? (resObj["ISIN"]) : "";
            var holdingsType = (resObj["holdingsType"] !== undefined && resObj["holdingsType"] !== "") ? (resObj["holdingsType"]) : "";
            var ISINText = (ISIN && ISIN != "") ? ((holdingsType && holdingsType != "") ? (ISIN + " | " + holdingsType) : ISIN) : ((holdingsType && holdingsType != "") ? holdingsType : "");
            var isISINTextVisible = (ISINText !== "") ? true : false;
            record["lblId"] = {
              "text": ISINText,
              "isVisible": isISINTextVisible
            };
            /*ISIN and holdingsType - Ends*/
            /*LabelOne Key value - Starts*/
            record["lblLatestPriceKey"] = {
              "text": kony.i18n.getLocalizedString("i18n.wealth.latestPricemb"),
              "isVisible": true
            };
            valueObj = this.splitValueField("marketPrice", resObj);
            record["lblLatestPriceValue"] = this.formatUtils.formatText(resObj[valueObj.value], "Amount", this.formatSkins, this.formattingJSON, valueObj.currency);
            record["lblLatestPriceValue"].isVisible = (valueObj.value !== "") ? true : false
            /*LabelOne Key value - Ends*/
            /*LabelTwo Key value - Starts*/
            record["lblQtyKey"] = {
              "text": kony.i18n.getLocalizedString("i18n.wealth.qtymb")
            };
            valueObj = this.splitValueField("quantity", resObj);
            record["lblQtyValue"] = this.formatUtils.formatText(resObj[valueObj.value], "Text", this.formatSkins, this.formattingJSON, valueObj.currency);
            record["lblQtyValue"].isVisible = (valueObj.value !== "") ? true : false
            record["flxQty"] = {
              "width": valueObj.value.length >= 12 ? "45%" : "30%"
            }
            /*LabelTwo Key value - Ends*/
            record["lblMarketValKey"] = {
              "text": kony.i18n.getLocalizedString("i18n.wealth.mktValue"),
              "isVisible": true
            };
            valueObj = this.splitValueField("marketValue,referenceCurrency", resObj);
            record["lblMarketValValue"] = this.formatUtils.formatText(resObj[valueObj.value], "Amount", this.formatSkins, this.formattingJSON, valueObj.currency);
            record["lblMarketValValue"].isVisible = (valueObj.value !== "") ? true : false
            record["flxMarket"] = {
              "width": 85 - Number(record["flxQty"].width.slice(0, -1)) + "%"
            }
            /*LabelThree Key value - Ends*/
            /*LabelFour Key value - Starts*/
            record["lblPandLKey"] = {
              "text": kony.i18n.getLocalizedString("i18n.wealth.pl")
            };
            valueObj = this.splitValueField("unrealPLMkt,referenceCurrency", resObj);
            record["lblPandLValue"] = this.formatUtils.formatText(resObj[valueObj.value], "PL", this.formatSkins, this.formattingJSON, valueObj.currency);
            record["lblPandLValue"].isVisible = (valueObj.value !== "") ? true : false
            /*LabelFour Key value - Ends*/
            /*LabelFive Key value - Starts*/
            if (resObj["status"] === "" || resObj["status"] === undefined) {
              record["lblAverageCostValue"] = {
                "isVisible": true
              };
              record["lblAverageCostKey"] = {
                "text": kony.i18n.getLocalizedString("i18n.wealth.avgCost"),
                "isVisible": true
              };
              valueObj = this.splitValueField("costPrice", resObj);
              record["lblAverageCostValue"] = this.formatUtils.formatText(resObj[valueObj.value], "Amount", this.formatSkins, this.formattingJSON, valueObj.currency);
              record["lblAverageCostValue"].isVisible = (valueObj.value !== "") ? true : false
              record["flxStatus"] = {
                "isVisible": false
              };
              record["flxAverageCostValue"] = {
                "isVisible": true
              };
            } else {
              var imageName = resObj["status"].toLowerCase();
              record["lblAverageCostValue"] = {
                "isVisible": false
              };
              record["lblAverageCostKey"] = {
                "isVisible": false
              };
              record["lblStatusKey"] = {
                "isVisible": true,
                "text": kony.i18n.getLocalizedString("i18n.wealth.statuswithColon")
              };
              record["lblStatus"] = {
                "text": resObj["status"]
              };
              record["imgStatus"] = {
                "src": imageName + ".png",
                "isVisible": true
              };
              record["flxStatus"] = {
                "isVisible": true
              };
              record["flxAverageCostValue"] = {
                "isVisible": false
              };
            }
            /*LabelFive Key value - Ends*/
            record["imgChevron"] = {
              "src": "more_detail.png",
              "isVisible": (scopeObj._actionImgIsVisible === "true") ? true : false
            };
            record["flxClick"] = {
              "text": "",
              "isVisible": (scopeObj._actionImgIsVisible === "true") ? true : false
            };
            scope_WealthPresentationController.rtlLocale.includes(kony.i18n.getCurrentLocale()) ? record["flxClick"].left = "-2dp" : record["flxClick"].right = "10dp";
            segData.push(record);
          }
          this.view.segList.setVisibility(true);
          this.view.segList.widgetDataMap = scopeObj.getWidgetDataMap();
          this.view.segList.data = segData;
        } else {
          this.view.segList.setVisibility(false);
          this.view.lblError.setVisibility(true);
          this.view.lblError.text = kony.i18n.getLocalizedString("i18n.wealth.noHoldings");
          this.onRequestEnd();
        }
      } catch (err) {
        this.setError(err, "checkPermission");
      }
    },
    /**
     * Method triggered on click of contextualDots (3 dots)
     **/
    onActionSelect: function(context) {
      try {
        var rowindex = context.row;
        var details = {};
        details.rowdetails = this.response[rowindex];
        if (this.isIncludeOrder) {
          var newResp = this.response.filter(function(el) {
            return el.holdingsId === details.rowdetails.holdingsId && el.status === "";
          });
          details.rowdetails = {};
          details.rowdetails = newResp.length > 0 ? newResp[0] : this.response[rowindex];
        }
        details.totalValue = this.unformattedTotalValue;
        this.onActionButtonClicked(context, details);
      } catch (err) {
        this.setError(err, "onActionSelect");
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
        "method": method,
        "error": errorMsg
      };
      scope.onErrorMain(errorObj);
    },
    onErrorMain: function(err) {
      kony.print(JSON.stringify(err));
    }
  };
});