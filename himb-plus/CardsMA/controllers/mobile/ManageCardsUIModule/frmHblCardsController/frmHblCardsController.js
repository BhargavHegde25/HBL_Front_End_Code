define(['CampaignUtility'], function (CampaignUtility) {
  return {

    init : function () {
      try {
        var navManager = applicationManager.getNavigationManager();
        var currentForm = navManager.getCurrentForm();
        applicationManager.getPresentationFormUtility().initCommonActions(this, "YES", currentForm);
      } catch (err) {
        kony.print("Error in Cards preshow-->" + err);
      }
    },

    preShow: function () {
      var scope = this;
      try {
        //scope.init();
        //this.view.postShow = this.postShow;
        this.view.btnDebit.skin = "sknHBLBtn851a1cRounded8pxffffff100pr";
        this.view.btnPrepaid.skin = "sknHBLBtnf3e9e9Rounded8px851a1c100pr";
        this.view.btnVirtual.skin = "sknHBLBtnf3e9e9Rounded8px851a1c100pr";
        this.view.flxDebitCard.isVisible = true;
        this.view.flxPrepaidCard.isVisible = false;
        this.view.flxVirtualCard.isVisible = false;
        this.setSegmentDataDebit();
        var device = applicationManager.getPresentationFormUtility().getDeviceName();
        if (device !== "iPhone") {
          this.view.flxHeader.isVisible = true;
          this.view.flxMainContainer.top = "56dp";
        }
        else {
          this.view.title = kony.i18n.getLocalizedString("i18n.HBL.Cards.ApplyForCards");
          this.view.flxHeader.isVisible = false;
          this.view.flxMainContainer.top = "0dp";
        }
      } catch (err) {
        kony.print("Error in Cards preshow-->" + err);
      }
    },

    postShow : function () {
      var scope = this;
      try {
        scope.view.customHeader.flxBack.onClick = scope.flxBackOnClick;
        scope.view.customHeader.btnRight.onClick = scope.flxBackOnClick;
        scope.view.btnDebit.onClick = scope.btnDebitOnClick;
        scope.view.btnPrepaid.onClick = scope.btnPrepaidOnClick;
        scope.view.btnVirtual.onClick = scope.btnVirtualOnClick;
        applicationManager.getPresentationUtility().dismissLoadingScreen();
      } catch (err) {
        kony.print("Error in Cards postshow -->" + err);
      }
    },

    btnDebitOnClick: function () {
      this.view.btnDebit.skin = "sknHBLBtn851a1cRounded8pxffffff100pr";
      this.view.btnDebit.focusSkin = "sknHBLBtn851a1cRounded8pxffffff100pr";
      this.view.btnPrepaid.skin = "sknHBLBtnf3e9e9Rounded8px851a1c100pr";
      this.view.btnVirtual.skin = "sknHBLBtnf3e9e9Rounded8px851a1c100pr";
      this.view.flxDebitCard.isVisible = true;
      this.view.flxPrepaidCard.isVisible = false;
      this.view.flxVirtualCard.isVisible = false;
    },

    btnPrepaidOnClick: function () {
      this.view.btnDebit.skin = "sknHBLBtnf3e9e9Rounded8px851a1c100pr";
      this.view.btnPrepaid.skin = "sknHBLBtn851a1cRounded8pxffffff100pr";
      this.view.btnPrepaid.focusSkin = "sknHBLBtn851a1cRounded8pxffffff100pr";
      this.view.btnVirtual.skin = "sknHBLBtnf3e9e9Rounded8px851a1c100pr";
      this.view.flxDebitCard.isVisible = false;
      this.view.flxPrepaidCard.isVisible = true;
      this.view.flxVirtualCard.isVisible = false;
    },

    btnVirtualOnClick: function () {
      this.view.btnDebit.skin = "sknHBLBtnf3e9e9Rounded8px851a1c100pr";
      this.view.btnPrepaid.skin = "sknHBLBtnf3e9e9Rounded8px851a1c100pr";
      this.view.btnVirtual.skin = "sknHBLBtn851a1cRounded8pxffffff100pr";
      this.view.btnVirtual.focusSkin = "sknHBLBtn851a1cRounded8pxffffff100pr";
      this.view.flxDebitCard.isVisible = false;
      this.view.flxPrepaidCard.isVisible = false;
      this.view.flxVirtualCard.isVisible = true;
    },

    flxBackOnClick: function () {
      var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
        "moduleName": "ManageCardsUIModule",
        "appName": "CardsMA"
      });
      manageCardsModule.presentationController.isFirstTime = true;
      var navManager = applicationManager.getNavigationManager();
      navManager.setCustomInfo("frmCardManageHome",{"isMainScreen": false});
      manageCardsModule.presentationController.showCardsHome();
    },

    flxCancelOnClick: function () {
      var navManager = applicationManager.getNavigationManager();
      navManager.navigateTo({ "appName": "HomepageMA", "friendlyName": "AccountsUIModule/frmHBLUnifiedDashboard" });
    },

    setSegmentDataDebit: function () {
      try {
        var scope = this;
        var navManager = applicationManager.getNavigationManager();
        var selectedCardSubType = navManager.getCustomInfo("selectedCardSubType");
        var data = navManager.getCustomInfo("cardSpecifications");
        data = data.cardConfigLimit.filter(function (card) {
          if (card.cardType == "Debit Card") return card;
        });

        if (data.length > 0) {
          for (var i = 0; i < data.length; i++) {
            var dataItem = data[i];
            dataItem.limits = this.formatLimits(JSON.parse(dataItem.cardLimits).limits);
          
            if (dataItem.cardImage) {
              data[i]["imgCard"] = {
                src: dataItem.cardImage,
                isVisible: true
              };
            } else {
              data[i]["imgCard"] = {
                src: "card.png",
                isVisible: true
              };
            }
            // productName
            if (dataItem.productName) {
              data[i]["lblHeading"] = {
                text: dataItem.productName,
                isVisible: true
              };
            } else {
              data[i]["lblHeading"] = {
                text: "",
                isVisible: false
              };
            }

            // cardDescription
            if (dataItem.cardDescription) {
              data[i]["rtxDescription"] = {
                text: dataItem.cardDescription,
                isVisible: true
              };
            } else {
              data[i]["rtxDescription"] = {
                text: "",
                isVisible: false
              };
            }

            // shortDescription
            if (dataItem.shortDescription) {
              data[i].lblSubHeading = {
                text: dataItem.shortDescription,
                isVisible: true
              };
            } else {
              data[i].lblSubHeading = {
                text: "",
                isVisible: false
              };
            }
            data[i]["lblKey1"] = {
              "isVisible": this.isEmptyNullOrUndefined(dataItem.limits[0]) ? false : true,
              "text": this.isEmptyNullOrUndefined(dataItem.limits[0]) ? "" : dataItem.limits[0].split(":")[0],

            },
              data[i]["lblValue1"] = {
                "isVisible": this.isEmptyNullOrUndefined(dataItem.limits[0]) ? false : true,
                "text": this.isEmptyNullOrUndefined(dataItem.limits[0]) ? "" : dataItem.limits[0].split(":")[1],

              },
              data[i]["lblKey2"] = {
                "isVisible": this.isEmptyNullOrUndefined(dataItem.limits[1]) ? false : true,
                "text": this.isEmptyNullOrUndefined(dataItem.limits[1]) ? "" : dataItem.limits[1].split(":")[0],

              },
              data[i]["lblValue2"] = {
                "isVisible": this.isEmptyNullOrUndefined(dataItem.limits[1]) ? false : true,
                "text": this.isEmptyNullOrUndefined(dataItem.limits[1]) ? "" : dataItem.limits[1].split(":")[1],
              },
              data[i]["lblKey3"] = {
                "isVisible": this.isEmptyNullOrUndefined(dataItem.limits[2]) ? false : true,
                "text": this.isEmptyNullOrUndefined(dataItem.limits[2]) ? "" : dataItem.limits[2].split(":")[0],

              },
              data[i]["lblValue3"] = {
                "isVisible": this.isEmptyNullOrUndefined(dataItem.limits[2]) ? false : true,
                "text": this.isEmptyNullOrUndefined(dataItem.limits[2]) ? "" : dataItem.limits[2].split(":")[1],
              },

              data[i]["btnSelectProduct"] = {
                "text": kony.i18n.getLocalizedString("i18n.CardManagement.ApplyNow"),
                "onClick": function (widget, context) {
                  applicationManager.getPresentationUtility().showLoadingScreen();
                  var r = context["rowIndex"];
                  var data1 = context.widgetInfo.data[r];
                  scope.buildformattedLimits(data1.limits);
                  var requestCardFlowType = "debitCard";
                  var navManager = applicationManager.getNavigationManager();
                  navManager.setCustomInfo("requestCardFlowType", requestCardFlowType);
                  navManager.setCustomInfo("requestNewCardDetails", data1);
                  var param = "";
                  var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                    "moduleName": "ManageCardsUIModule",
                    "appName": "CardsMA"
                  });
                  manageCardsModule.presentationController.navigateToHBLNewCardFlow(param);
                }
              }
          }
          this.view.segDebit.rowTemplate = "flxSegHblCardsNew";
          this.view.segDebit.widgetDataMap = {
            "imgCard": "imgCard",
            "lblHeading": "lblHeading",
            "rtxDescription": "rtxDescription",
            "lblSubHeading": "lblSubHeading",
            "lblKey1": "lblKey1",
            "lblKey2": "lblKey2",
            "lblKey3": "lblKey3",
            "lblValue1": "lblValue1",
            "lblValue2": "lblValue2",
            "lblValue3": "lblValue3",
            "btnSelectProduct": "btnSelectProduct"
          };

          this.view.segDebit.setData(data);
          this.view.lblNoProductDebit.setVisibility(false);
          this.view.segDebit.setVisibility(true);

        } else {

          this.view.segDebit.setVisibility(false);
          this.view.lblNoProductDebit.setVisibility(true);
        }
        this.setSegmentDataDomesticPrepaid();
      } catch (err) {
        kony.print("Error in Cards setSegmentDataDebit -->" + err);
      }
    },

    setSegmentDataDomesticPrepaid: function () {
      try {
        var scope = this;
        var navManager = applicationManager.getNavigationManager();

        var data = navManager.getCustomInfo("cardSpecifications");
        data = data.cardConfigLimit.filter(function (card) {
          if (
            card.cardCategory.toLowerCase().includes("domestic") &&
            card.cardType === "Physical Prepaid Card"
          ) {
            return card;
          }
        });

        if (data.length > 0) {
          for (var i = 0; i < data.length; i++) {
            var dataItem = data[i];
            dataItem.limits = this.formatLimits(JSON.parse(dataItem.cardLimits).limits);

            if (dataItem.cardImage) {
              data[i]["imgCard"] = {
                src: dataItem.cardImage,
                isVisible: true
              };
            } else {
              data[i]["imgCard"] = {
                src: "card.png",
                isVisible: true
              };
            }

            // productName
            if (dataItem.productName) {
              data[i]["lblHeading"] = {
                text: dataItem.productName,
                isVisible: true
              };
            } else {
              data[i]["lblHeading"] = {
                text: "",
                isVisible: false
              };
            }

            // cardDescription
            if (dataItem.cardDescription) {
              data[i]["rtxDescription"] = {
                text: dataItem.cardDescription,
                isVisible: true
              };
            } else {
              data[i]["rtxDescription"] = {
                text: "",
                isVisible: false
              };
            }

            // shortDescription
            if (dataItem.shortDescription) {
              data[i].lblSubHeading = {
                text: dataItem.shortDescription,
                isVisible: true
              };
            } else {
              data[i].lblSubHeading = {
                text: "",
                isVisible: false
              };
            }
            data[i]["lblKey1"] = {
              "isVisible": this.isEmptyNullOrUndefined(dataItem.limits[0]) ? false : true,
              "text": this.isEmptyNullOrUndefined(dataItem.limits[0]) ? "" : dataItem.limits[0].split(":")[0],

            },
              data[i]["lblValue1"] = {
                "isVisible": this.isEmptyNullOrUndefined(dataItem.limits[0]) ? false : true,
                "text": this.isEmptyNullOrUndefined(dataItem.limits[0]) ? "" : dataItem.limits[0].split(":")[1],

              },
              data[i]["lblKey2"] = {
                "isVisible": this.isEmptyNullOrUndefined(dataItem.limits[1]) ? false : true,
                "text": this.isEmptyNullOrUndefined(dataItem.limits[1]) ? "" : dataItem.limits[1].split(":")[0],

              },
              data[i]["lblValue2"] = {
                "isVisible": this.isEmptyNullOrUndefined(dataItem.limits[1]) ? false : true,
                "text": this.isEmptyNullOrUndefined(dataItem.limits[1]) ? "" : dataItem.limits[1].split(":")[1],
              },
              data[i]["lblKey3"] = {
                "isVisible": this.isEmptyNullOrUndefined(dataItem.limits[2]) ? false : true,
                "text": this.isEmptyNullOrUndefined(dataItem.limits[2]) ? "" : dataItem.limits[2].split(":")[0],

              },
              data[i]["lblValue3"] = {
                "isVisible": this.isEmptyNullOrUndefined(dataItem.limits[2]) ? false : true,
                "text": this.isEmptyNullOrUndefined(dataItem.limits[2]) ? "" : dataItem.limits[2].split(":")[1],

              },

              data[i]["btnSelectProduct"] = {
                "text": kony.i18n.getLocalizedString("i18n.CardManagement.ApplyNow"),
                "onClick": function (widget, context) {
                  applicationManager.getPresentationUtility().showLoadingScreen();
                  var r = context["rowIndex"];
                  var data1 = context.widgetInfo.data[r];
                  scope.buildformattedLimits(data1.limits);
                  var requestCardFlowType = "domesticPrepaidCard";
                  var navManager = applicationManager.getNavigationManager();
                  navManager.setCustomInfo("requestCardFlowType", requestCardFlowType);
                  navManager.setCustomInfo("requestNewCardDetails", data1);
                  var param = "";
                  var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                    "moduleName": "ManageCardsUIModule",
                    "appName": "CardsMA"
                  });
                  manageCardsModule.presentationController.navigateToHBLNewCardFlow(param);
                }
              }
          }
          this.view.segDomesticPrepaid.rowTemplate = "flxSegHblCardsNew";
          this.view.segDomesticPrepaid.widgetDataMap = {
            "imgCard": "imgCard",
            "lblHeading": "lblHeading",
            "rtxDescription": "rtxDescription",
            "lblSubHeading": "lblSubHeading",
            "lblKey1": "lblKey1",
            "lblKey2": "lblKey2",
            "lblKey3": "lblKey3",
            "lblValue1": "lblValue1",
            "lblValue2": "lblValue2",
            "lblValue3": "lblValue3",
            "btnSelectProduct": "btnSelectProduct"
          };
          this.view.segDomesticPrepaid.setData(data);
          this.view.segDomesticPrepaid.setVisibility(true);
          this.view.lblNoProductDomesticPrepaid.setVisibility(false);
        } else {
          this.view.segDomesticPrepaid.setVisibility(false);
          this.view.lblNoProductDomesticPrepaid.setVisibility(true);
        }
        this.setSegmentDataInternationalPrepaid();
      } catch (err) {
        kony.print("Error in Cards setSegmentDataDomesticPrepaid -->" + err);
      }
    },

    setSegmentDataInternationalPrepaid: function () {
      try {
        var scope = this;
        var navManager = applicationManager.getNavigationManager();
        var data = navManager.getCustomInfo("cardSpecifications");
        data = data.cardConfigLimit.filter(function (card) {
          if (
            card.cardCategory.toLowerCase().includes("international") &&
            card.cardType === "Physical Prepaid Card"
          ) {
            return card;
          }
        });

        if (data.length > 0) {
          for (var i = 0; i < data.length; i++) {
            var dataItem = data[i];
            dataItem.limits = this.formatLimits(JSON.parse(dataItem.cardLimits).limits);

            if (dataItem.cardImage) {
              data[i]["imgCard"] = {
                src: dataItem.cardImage,
                isVisible: true
              };
            } else {
              data[i]["imgCard"] = {
                src: "card.png",
                isVisible: true
              };
            }

            // productName
            if (dataItem.productName) {
              data[i]["lblHeading"] = {
                text: dataItem.productName,
                isVisible: true
              };
            } else {
              data[i]["lblHeading"] = {
                text: "",
                isVisible: false
              };
            }

            // cardDescription
            if (dataItem.cardDescription) {
              data[i]["rtxDescription"] = {
                text: dataItem.cardDescription,
                isVisible: true
              };
            } else {
              data[i]["rtxDescription"] = {
                text: "",
                isVisible: false
              };
            }

            // shortDescription
            if (dataItem.shortDescription) {
              data[i].lblSubHeading = {
                text: dataItem.shortDescription,
                isVisible: true
              };
            } else {
              data[i].lblSubHeading = {
                text: "",
                isVisible: false
              };
            }
            data[i]["lblKey1"] = {
              "isVisible": this.isEmptyNullOrUndefined(dataItem.limits[0]) ? false : true,
              "text": this.isEmptyNullOrUndefined(dataItem.limits[0]) ? "" : dataItem.limits[0].split(":")[0],

            },
              data[i]["lblValue1"] = {
                "isVisible": this.isEmptyNullOrUndefined(dataItem.limits[0]) ? false : true,
                "text": this.isEmptyNullOrUndefined(dataItem.limits[0]) ? "" : dataItem.limits[0].split(":")[1],

              },
              data[i]["lblKey2"] = {
                "isVisible": this.isEmptyNullOrUndefined(dataItem.limits[1]) ? false : true,
                "text": this.isEmptyNullOrUndefined(dataItem.limits[1]) ? "" : dataItem.limits[1].split(":")[0],

              },
              data[i]["lblValue2"] = {
                "isVisible": this.isEmptyNullOrUndefined(dataItem.limits[1]) ? false : true,
                "text": this.isEmptyNullOrUndefined(dataItem.limits[1]) ? "" : dataItem.limits[1].split(":")[1],
              },
              data[i]["lblKey3"] = {
                "isVisible": this.isEmptyNullOrUndefined(dataItem.limits[2]) ? false : true,
                "text": this.isEmptyNullOrUndefined(dataItem.limits[2]) ? "" : dataItem.limits[2].split(":")[0],
              },
              data[i]["lblValue3"] = {
                "isVisible": this.isEmptyNullOrUndefined(dataItem.limits[2]) ? false : true,
                "text": this.isEmptyNullOrUndefined(dataItem.limits[2]) ? "" : dataItem.limits[2].split(":")[1],
              },

              data[i]["btnSelectProduct"] = {
                "text": kony.i18n.getLocalizedString("i18n.CardManagement.ApplyNow"),
                "onClick": function (widget, context) {
                  applicationManager.getPresentationUtility().showLoadingScreen();
                  var r = context["rowIndex"];
                  var data1 = context.widgetInfo.data[r];
                  scope.buildformattedLimits(data1.limits);
                  var requestCardFlowType = "internationalPrepaidCard";
                  var navManager = applicationManager.getNavigationManager();
                  navManager.setCustomInfo("requestCardFlowType", requestCardFlowType);
                  navManager.setCustomInfo("requestNewCardDetails", data1);
                  var param = "";
                  var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                    "moduleName": "ManageCardsUIModule",
                    "appName": "CardsMA"
                  });
                  manageCardsModule.presentationController.navigateToHBLNewCardFlow(param);
                }
              }
          }
          this.view.segInternationalPrepaid.rowTemplate = "flxSegHblCardsNew";
          this.view.segInternationalPrepaid.widgetDataMap = {
            "imgCard": "imgCard",
            "lblHeading": "lblHeading",
            "rtxDescription": "rtxDescription",
            "lblSubHeading": "lblSubHeading",
            "lblKey1": "lblKey1",
            "lblKey2": "lblKey2",
            "lblKey3": "lblKey3",
            "lblValue1": "lblValue1",
            "lblValue2": "lblValue2",
            "lblValue3": "lblValue3",
            "btnSelectProduct": "btnSelectProduct"
          };
          this.view.segInternationalPrepaid.setData(data);
          this.view.segInternationalPrepaid.setVisibility(true);
          this.view.lblNoProductInternationalPrepaid.setVisibility(false);
        } else {
          this.view.segInternationalPrepaid.setVisibility(false);
          this.view.lblNoProductInternationalPrepaid.setVisibility(true);
        }
        this.setSegmentDataVirtual();
      } catch (err) {
        kony.print("Error in Cards setSegmentDataInternationalPrepaid -->" + err);
      }
    },

    setSegmentDataVirtual: function () {
      try {
        var scope = this;
        var navManager = applicationManager.getNavigationManager();

        var selectedCardSubType = navManager.getCustomInfo("selectedCardSubType");
        var data = navManager.getCustomInfo("cardSpecifications");
        data = data.cardConfigLimit.filter(function (card) {
          if (card.cardType == "Virtual Prepaid Card") return card;
        });

        if (data.length > 0) {
          for (var i = 0; i < data.length; i++) {
            var dataItem = data[i];
            dataItem.limits = this.formatLimits(JSON.parse(dataItem.cardLimits).limits);
          
            if (dataItem.cardImage) {
              data[i]["imgCard"] = {
                src: dataItem.cardImage,
                isVisible: true
              };
            } else {
              data[i]["imgCard"] = {
                src: "card.png",
                isVisible: true
              };
            }

            // productName
            if (dataItem.productName) {
              data[i]["lblHeading"] = {
                text: dataItem.productName,
                isVisible: true
              };
            } else {
              data[i]["lblHeading"] = {
                text: "",
                isVisible: false
              };
            }

            // cardDescription
            if (dataItem.cardDescription) {
              data[i]["rtxDescription"] = {
                text: dataItem.cardDescription,
                isVisible: true
              };
            } else {
              data[i]["rtxDescription"] = {
                text: "",
                isVisible: false
              };
            }

            // shortDescription
            if (dataItem.shortDescription) {
              data[i].lblSubHeading = {
                text: dataItem.shortDescription,
                isVisible: true
              };
            } else {
              data[i].lblSubHeading = {
                text: "",
                isVisible: false
              };
            }

            data[i]["lblKey1"] = {
              "isVisible": this.isEmptyNullOrUndefined(dataItem.limits[0]) ? false : true,
              "text": this.isEmptyNullOrUndefined(dataItem.limits[0]) ? "" : dataItem.limits[0].split(":")[0],

            },
              data[i]["lblValue1"] = {
                "isVisible": this.isEmptyNullOrUndefined(dataItem.limits[0]) ? false : true,
                "text": this.isEmptyNullOrUndefined(dataItem.limits[0]) ? "" : dataItem.limits[0].split(":")[1],

              },
              data[i]["lblKey2"] = {
                "isVisible": this.isEmptyNullOrUndefined(dataItem.limits[1]) ? false : true,
                "text": this.isEmptyNullOrUndefined(dataItem.limits[1]) ? "" : dataItem.limits[1].split(":")[0],

              },
              data[i]["lblValue2"] = {
                "isVisible": this.isEmptyNullOrUndefined(dataItem.limits[1]) ? false : true,
                "text": this.isEmptyNullOrUndefined(dataItem.limits[1]) ? "" : dataItem.limits[1].split(":")[1],
              },
              data[i]["lblKey3"] = {
                "isVisible": this.isEmptyNullOrUndefined(dataItem.limits[2]) ? false : true,
                "text": this.isEmptyNullOrUndefined(dataItem.limits[2]) ? "" : dataItem.limits[2].split(":")[0],

              },
              data[i]["lblValue3"] = {
                "isVisible": this.isEmptyNullOrUndefined(dataItem.limits[2]) ? false : true,
                "text": this.isEmptyNullOrUndefined(dataItem.limits[2]) ? "" : dataItem.limits[2].split(":")[1],

              },

              data[i]["btnSelectProduct"] = {
                "text": kony.i18n.getLocalizedString("i18n.CardManagement.ApplyNow"),
                "onClick": function (widget, context) {
                  applicationManager.getPresentationUtility().showLoadingScreen();
                  var r = context["rowIndex"];
                  var data1 = context.widgetInfo.data[r];
                  scope.buildformattedLimits(data1.limits);
                  var requestCardFlowType = "virtualCard";
                  var navManager = applicationManager.getNavigationManager();
                  navManager.setCustomInfo("requestCardFlowType", requestCardFlowType);
                  navManager.setCustomInfo("requestNewCardDetails", data1);
                  var param = "";
                  var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                    "moduleName": "ManageCardsUIModule",
                    "appName": "CardsMA"
                  });
                  manageCardsModule.presentationController.navigateToHBLNewCardFlow(param);
                }
              }
              
          }
          this.view.segVirtual.rowTemplate = "flxSegHblCardsNew";
          this.view.segVirtual.widgetDataMap = {
            "imgCard": "imgCard",
            "lblHeading": "lblHeading",
            "rtxDescription": "rtxDescription",
            "lblSubHeading": "lblSubHeading",
            "lblKey1": "lblKey1",
            "lblKey2": "lblKey2",
            "lblKey3": "lblKey3",
            "lblValue1": "lblValue1",
            "lblValue2": "lblValue2",
            "lblValue3": "lblValue3",
            "btnSelectProduct": "btnSelectProduct"
          };
          this.view.segVirtual.setData(data);
          this.view.segVirtual.setVisibility(true);
          this.view.lblNoProductVirtual.setVisibility(false);
        } else {
          this.view.segVirtual.setVisibility(false);
          this.view.lblNoProductVirtual.setVisibility(true);
        }
      } catch (err) {
        kony.print("Error in Cards setSegmentDataVirtual -->" + err);
      }

    },
    isEmptyNullOrUndefined: function (val) {
      try {
        if (val == null || val == undefined || val == "" || val == [])
          return true;
        else
          return false;
      } catch (err) {
        kony.print("Error in Cards isEmptyNullOrUndefined -->" + err);
      }
    },

    formatLimits: function (limits) {
      try {
        var limitsData = [];
        for (var key in limits) {
          if (limits.hasOwnProperty(key)) {
            var keynVal = key + ":" + (limits[key]);
            limitsData.push(keynVal);
          }
        }
        return limitsData;
      } catch (err) {
        kony.print("Exception in formatLimits: " + JSON.stringify(err));
      }
    },

    buildformattedLimits: function (inputData) {
      try {
     
        var result = {};

        for (var key in inputData) {
          if (inputData.hasOwnProperty(key)) {
            var item = inputData[key];
            if (item.indexOf(":") !== -1) {
              var parts = item.split(":");
              var keyPart = parts[0].trim();
              var valuePart = parts.slice(1).join(":").trim(); 
              result[keyPart] = valuePart;
            }
          }
        }
        var navManager = applicationManager.getNavigationManager();
        navManager.setCustomInfo("cardDetailsFromSelectCard", result);
        return result;
      } catch (err) {
        kony.print("Exception in buildformattedLimits: " + JSON.stringify(err));
      }
    },
  };
});