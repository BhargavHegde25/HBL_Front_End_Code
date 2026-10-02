define(['CampaignUtility'], function (CampaignUtility) {
  return {
    cardProducts: null,
    init: function () {
      var navManager = applicationManager.getNavigationManager();
      var currentForm = navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().initCommonActions(this, "YES", currentForm);
    },
    preShow: function () {
      var navManager = applicationManager.getNavigationManager();
      var flow = navManager.getCustomInfo("cardSelectionType");
      if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
        if (flow === "debitCard") {
          this.view.lblSubHeader.text = kony.i18n.getLocalizedString("i18n.HBl.Cards.SelectDebitCard");
          this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("i18n.HBL.Cards.RequestDebitCard");
        } else if (flow === "physicalPrepaidCard") {
          this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("i18n.HBL.Cards.RequestPrepaidCard");
          this.view.lblSubHeader.text = kony.i18n.getLocalizedString("i18n.HBl.Cards.SelectPrepaidCard");
        }
        this.view.flxHeader.isVisible = true;
        this.view.flxSelectProducts.top = "56dp";
      } else {
        if (flow === "debitCard") {
          this.view.title = kony.i18n.getLocalizedString("i18n.HBL.Cards.RequestDebitCard");
          this.view.lblSubHeader.text = kony.i18n.getLocalizedString("i18n.HBl.Cards.SelectDebitCard");
        } else if (flow === "physicalPrepaidCard") {
          this.view.title = kony.i18n.getLocalizedString("i18n.HBL.Cards.RequestPrepaidCard");
          this.view.lblSubHeader.text = kony.i18n.getLocalizedString("i18n.HBl.Cards.SelectPrepaidCard");
        }
        this.view.flxHeader.isVisible = false;
        this.view.flxSelectProducts.top = "0dp";
      }
      this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
      this.view.customHeader.btnRight.onClick = this.cancelCommon;
      this.setSegmentData();
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    },

    /*
                 cardProductDetails = cardProductDetails.filter(function(card) {
                if (card.type == "DebitCard" && scope.requestCardFlow == "debitcard") return card;
                else if (card.category.includes(scope.selectedCardSubType) && card.type == "Prepaid Card" && scope.requestCardFlow == "physicalPrepaidCard" && card.category.split(" ")[0] !== "Virtual") {
                    return card;
                }
            });
     */

    filterCardsByType: function (cardType) {
      var navMan = applicationManager.getNavigationManager();
      var data = navMan.getCustomInfo("cardSpecifications");
      var filteredCards = data.cardConfigLimit.filter(function (card) {
        return card.cardType === cardType;
      });
      return filteredCards;
    },


    setSegmentData: function () {
      var navMan = applicationManager.getNavigationManager();

      var requestCardFlow = navMan.getCustomInfo("cardSelectionType");
      var selectedCardSubType = navMan.getCustomInfo("selectedCardSubType");

      var data = navMan.getCustomInfo("cardSpecifications");
      data = data.cardConfigLimit.filter(function (card) {
        if (card.cardType == "Debit Card" && requestCardFlow == "debitCard") return card;
        else if (card.cardCategory.includes(selectedCardSubType) && card.cardType == "Physical Prepaid Card" && requestCardFlow == "physicalPrepaidCard" && card.cardCategory.split(" ")[0] !== "Virtual") {
          return card;
        }
      });


      if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {
          var dataItem = data[i];
          dataItem.limits = this.formatLimits(JSON.parse(dataItem.cardLimits).limits);
          dataItem.productName = this.setProductName(dataItem.cardCategory, dataItem.cardType);
          data[i]["imgCard"] = {
            "src": this.getCardImage(dataItem.productName)
          }
          data[i]["lblCardName"] = {
            "text": dataItem.productName
          }//lblAccess
          data[i]["lblAccess"] = {
            "text": dataItem.cardDescription
          }
          data[i]["lblDailyPurchaseLimit"] = {
            "isVisible": this.isEmptyNullOrUndefined(dataItem.limits[0]) ? false : true,
            "text": this.isEmptyNullOrUndefined(dataItem.limits[0]) ? "" : dataItem.limits[0].split(":")[0] + " : "  + dataItem.limits[0].split(":")[1],
          },
            data[i]["lblDailyWithdrawleLimit"] = {
              "isVisible": this.isEmptyNullOrUndefined(dataItem.limits[1]) ? false : true,
              "text": this.isEmptyNullOrUndefined(dataItem.limits[1]) ? "" : dataItem.limits[1].split(":")[0] + " : "  + dataItem.limits[1].split(":")[1]
            },
            data[i]["lblAnnualChanrges"] = {
              "isVisible": this.isEmptyNullOrUndefined(dataItem.limits[2]) ? false : true,
              "text": this.isEmptyNullOrUndefined(dataItem.limits[2]) ? "" : dataItem.limits[2].split(":")[0] + " : "  + dataItem.limits[2].split(":")[1],
            },

            data[i]["btnSelectProduct"] = {
              "text": kony.i18n.getLocalizedString("i18n.ACH.Select"),
              "onClick": function (widget, context) {
                var r = context["rowIndex"];
                var data1 = context.widgetInfo.data[r];

                var navManager = applicationManager.getNavigationManager();
                navManager.setCustomInfo("cardDetailsFromSelectCard", data1);
                navManager.navigateTo({ "appName": "CardsMA", "friendlyName": "ManageCardsUIModule/frmManageNewCardName" });
              }
            }
          data[i]["btnLearnMore"] = {
            "text": kony.i18n.getLocalizedString("kony.mb.login.learnMore"),
            "onClick": function (widget, context) {
              var r = context["rowIndex"];
              var data1 = context.widgetInfo.data[r];
              var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
              manageCardsModule.presentationController.navigateToLearnMore(data1);
            }
          }
        }
        this.view.segSelectProducts.widgetDataMap = {
          "lblCardName": "productName",
          "lblAccess": "lblAccess",
          "imgCard": "imgCard",
          "lblDailyPurchaseLimit": "lblDailyPurchaseLimit",
          "lblDailyWithdrawleLimit": "lblDailyWithdrawleLimit",
          "lblAnnualChanrges": "lblAnnualChanrges",
          "rtxCardDetails": "featureOverview",
          "btnLearnMore": "btnLearnMore",
          "btnSelectProduct": "btnSelectProduct"
        };
        this.view.segSelectProducts.setData(data);
        this.view.flxNoProducts.setVisibility(false);
      } else {
        this.view.flxNoProducts.setVisibility(true);
      }

    },

    formatCardsData: function (response) {
      var data = response;
      var navManager = applicationManager.getNavigationManager();
      var details = navManager.getCustomInfo("selectedCardAccountDetails");
      navManager.setCustomInfo("cardHolderName", name);
      var cardName = data.lblCardName.text;
      var name = details.nickName;
      navManager.setCustomInfo("cardHolderName", name);
      var accId = details.accountID
      var formattedName = name + "...." + accId.slice(-4);
      var limit1Visibility = data.lblDailyPurchaseLimit.isVisible;
      var limit2Visibility = data.lblDailyWithdrawleLimit.isVisible;
      var limit3Visibility = data.lblAnnualChanrges.isVisible;
      let jsonData = {};
      if (limit1Visibility === "true") {
        jsonData.limitData1 = data.lblDailyPurchaseLimit.text;
      }
      if (limit2Visibility === "true") {
        jsonData.limitData2 = data.lblDailyWithdrawleLimit.text;
      }
      if (limit3Visibility === "true") {
        jsonData.limitData3 = data.lblAnnualChanrges.text;
      }
      var dataNew = {
        [kony.i18n.getLocalizedString("i18n.UnifiedTransfer.FromAccount")]: formattedName,
        [kony.i18n.getLocalizedString("kony.mb.accdetails.cardType")]: cardName
      };
      for (let key in dataNew) {
        jsonData[key] = dataNew[key];
      }
      navManager.setCustomInfo("cardDetailsFromSelectCard", jsonData);
    },
    isEmptyNullOrUndefined: function (val) {
      if (val == null || val == undefined || val == "" || val == [])
        return true;
      else
        return false;
    },
    formatLimits: function (limits) {
      var limitsData = [];
      for (var key in limits) {
        if (limits.hasOwnProperty(key)) {
          var keynVal = key + ":" + (limits[key]);
          limitsData.push(keynVal);
        }
      }
      return limitsData;
    },
    setProductName: function (category, type) {
      if (type == "Debit Card" || category[0] == "D") {
        switch (category) {
          case "Visa" || "VISA":
            return "Visa Debit Card";
          case "Master Card" || "MASTERCARD":
            return "Master Debit Card";
          case "SCT UPI":
            return "SCT UPI Debit Card";
          case "Union Pay":
            return "Union Pay Debit Card";
          case "Nepal Pay":
            return "Nepal Pay Debit Card";
        }
      }
      else if (type == "Physical Prepaid Card" || category[0] == "P") {
        switch (category) {
          case "Visa International" || "VISA":
            return "Physical Visa International Prepaid Card";
          case "AMEX Domestic":
            return "Physical AMEX Domestic Prepaid Card";
          case "AMEX International":
            return "Physical AMEX International Prepaid Card";
          case "Visa Domestic" || "VISA":
            return "Physical Visa Domestic Prepaid Card";
        }
      }
      else if (type == "Virtual Prepaid Card" || category[0] == "V") {
        switch (category) {
          case "Visa Domestic" || "VISA":
            return "Virtual Visa Domestic Prepaid Card";
          case "AMEX Domestic":
            return "Virtual AMEX Domestic Prepaid Card";
          case "Visa International" || "VISA":
            return "Virtual Visa International Prepaid Card";
          case "AMEX International":
            return "Virtual AMEX International Prepaid Card";
        }
      }
    },
    getCardImage: function (cardProductName) {
      var cards = {
        "Visa Debit Card": 'visadebit.png',
        "Master Debit Card": 'mastercarddebit.png',
        "SCT UPI Debit Card": 'sctupi.png',
        "Union Pay Debit Card": 'unionpay.png',
        "Nepal Pay Debit Card": "nepalpaydebit.png",
        "Physical Visa International Prepaid Card": "visaprepaid.png",
        "Physical AMEX Domestic Prepaid Card": "amexprepaid.png",
        "Physical AMEX International Prepaid Card": "amexprepaid.png",
        "Physical Visa Domestic Prepaid Card": "visaprepaid.png",
        "Virtual Visa Domestic Prepaid Card": "visaprepaid.png",
        "Virtual AMEX Domestic Prepaid Card": "amexprepaid.png",
        "Virtual Visa International Prepaid Card": "visaprepaid.png",
        "Virtual AMEX International Prepaid Card": "amexprepaid.png"
      };
      if (cards[cardProductName] !== null || cards[cardProductName] !== undefined)
        return cards[cardProductName];
      else return 'platinum_card.png';
    },
    flxBackOnClick: function () {
      var navMan = applicationManager.getNavigationManager();
      navMan.goBack();
    },
    cancelCommon: function () {
      var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
      manageCardsModule.presentationController.cancelCommon();
    }

  };
});