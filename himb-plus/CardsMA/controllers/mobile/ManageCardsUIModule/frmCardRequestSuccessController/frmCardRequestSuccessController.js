define(['CampaignUtility', 'CommonUtilities'], function (CampaignUtility, CommonUtilities) {
    return {
        init: function () {
            var scope = this;
            var currentFormObject = kony.application.getCurrentForm();
            var currentForm = currentFormObject.id;
            applicationManager.getPresentationFormUtility().initCommonActions(this, "CALLBACK", currentForm, scope.flxBackOnClick);
            this.view.onNavigate = this.onNavigate;
        },

        onNavigate: function (uidata) {
            if (!kony.sdk.isNullOrUndefined(uidata.applyCards)) {
                this.response = uidata.applyCards;
                this.updateAcknowledgementData(uidata.applyCards);
            }
        },
        updateAcknowledgementData: function (data) {
            if ((data !== null) && (data !== "") && (data !== undefined)) {
                var response = data;
                this.view.lblRequestIdValue.text = response.ReferenceNumber;
            }
            this.addDataIntoSegment();
        },

        addDataIntoSegmentOld: function () {
            var navManager = applicationManager.getNavigationManager();
            let clientProperties = CommonUtilities.CLIENT_PROPERTIES;
            if (Object.keys(clientProperties).length > 0) {
                if (!kony.sdk.isNullOrUndefined(clientProperties)) {
                    var cardEstimatedTime = clientProperties.CARD_ESTIMATED_TIME;
                    if (!kony.sdk.isNullOrUndefined(cardEstimatedTime)) {
                        var estimatedTime = cardEstimatedTime;
                    }
                }
            }
            var flow = navManager.getCustomInfo("requestCardFlowType");
            if (flow === "debitCard") {
                if (!kony.sdk.isNullOrUndefined(estimatedTime)) {
                    this.view.lblMessage.text = kony.i18n.getLocalizedString("i18n.CardManagement.receivemessage").replace("X", estimatedTime);
                }
            } else if (flow === "domesticPrepaidCard" || flow === "internationalPrepaidCard") {
                if (!kony.sdk.isNullOrUndefined(estimatedTime)) {
                    this.view.lblMessage.text = kony.i18n.getLocalizedString("i18n.CardManagement.receivemessage").replace("X", estimatedTime);
                }
            } else if (flow === "virtualCard") {
                this.view.lblMessage.text = kony.i18n.getLocalizedString("i18n.HBL.Cards.virtualCardAcknowledgment");
            }
        },

        addDataIntoSegment: function () {
            var navManager = applicationManager.getNavigationManager();
            var clientProperties = CommonUtilities.CLIENT_PROPERTIES;
            var locale = kony.i18n.getCurrentLocale();
            var localizedMessage = "";

            if (!kony.sdk.isNullOrUndefined(clientProperties) && Object.keys(clientProperties).length > 0) {
                var flow = navManager.getCustomInfo("requestCardFlowType");

                
                if (flow === "debitCard") {
                    var cardETA = clientProperties.CARD_REQUEST_DEBIT_ETA;
                    if (!kony.sdk.isNullOrUndefined(cardETA)) {
                        try {
                            var parsedETA = JSON.parse(cardETA);
                            localizedMessage = parsedETA[locale] || parsedETA["en_US"];
                        } catch (e) {
                            kony.print("Error parsing CARD_REQUEST_DEBIT_ETA: " + e.message);
                        }
                    }
                }

                else if (flow === "domesticPrepaidCard" || flow === "internationalPrepaidCard") {
                    var prepaidETA = clientProperties.CARD_REQUEST_PREPAID_ETA;
                    if (!kony.sdk.isNullOrUndefined(prepaidETA)) {
                        try {
                            var parsedETA = JSON.parse(prepaidETA);
                            localizedMessage = parsedETA[locale] || parsedETA["en_US"];
                        } catch (e) {
                            kony.print("Error parsing CARD_REQUEST_PREPAID_ETA: " + e.message);
                        }
                    }
                }

                else if (flow === "virtualCard") {
                    var virtualETA = clientProperties.CARD_REQUEST_VIRTUAL_ETA;
                    if (!kony.sdk.isNullOrUndefined(virtualETA)) {
                        try {
                            var parsedETA = JSON.parse(virtualETA);
                            localizedMessage = parsedETA[locale] || parsedETA["en_US"];
                        } catch (e) {
                            kony.print("Error parsing CARD_REQUEST_VIRTUAL_ETA: " + e.message);
                        }
                    }
                }
            }

            if (!kony.sdk.isNullOrUndefined(localizedMessage) && localizedMessage !== "") {
                this.view.lblMessage.text = localizedMessage;
            } else {
               
                //this.view.lblMessage.text = kony.i18n.getLocalizedString("i18n.HBL.Cards.virtualCardAcknowledgment");
            }
        },

        preShow: function () {
            this.view.postShow = this.postShow;
            if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
                this.view.flxHeader.isVisible = true;
                this.view.flxMainScroll.top = "56dp";
            }
            else {
                this.view.flxHeader.isVisible = false;
                this.view.flxMainScroll.top = "0dp";
            }
            var navManager = applicationManager.getNavigationManager();
            var flow = navManager.getCustomInfo("requestCardFlowType");
            var data = navManager.getCustomInfo("setHblNewCardDetails");
            var data1 = navManager.getCustomInfo("setHblConfirmDetails");
            if (flow === "debitCard" || flow === "virtualCard") {
                this.view.lblAccountName.text = data.accName;
                var AccountFormatedArray = [];
                if (data.accNo.length == 16) {
                    AccountFormatedArray = ["XXXX", "XXXX", "XXXX"];
                    AccountFormatedArray.push(data.accNo.slice(-4));
                } else if (data.accNo.length == 14) {
                    AccountFormatedArray = ["XXXX", "XXXXXX"];
                    AccountFormatedArray.push(data.accNo.slice(-4));
                }
                var FormatedAccountNumber = AccountFormatedArray.join(" ");
                this.view.lblAccNo.text = FormatedAccountNumber;
            }
            this.setCardLimitDetails();
        },

        setCardLimitDetails: function () {
            var navManager = applicationManager.getNavigationManager();
            var data = navManager.getCustomInfo("setHblConfirmDetails");
            var details = navManager.getCustomInfo("setHblNewCardDetails");
            var cardNameKey = kony.i18n.getLocalizedString("i18n.HBL.Cards.CardName");
            var segmentData = [];
            segmentData.push({
                lblKey: cardNameKey,
                lblValue: details.cardName
            });

            for (var key in data) {
                if (data.hasOwnProperty(key) && key !== cardNameKey) {
                    segmentData.push({
                        lblKey: key,
                        lblValue: data[key]
                    });
                }
            }

            this.view.segCardDetails.widgetDataMap = {
                "lblKey": "lblKey",
                "lblValue": "lblValue"
            };

            this.view.segCardDetails.setData(segmentData);
        },

        postShow: function () {
            this.view.btnPrimary.onClick = this.btnPrimaryOnclick;
            this.view.btnCancel.onClick = this.navigateToCards;
            this.setWidgetVisibilityBasedOnCard();
            applicationManager.getPresentationUtility().dismissLoadingScreen();
        },

        navigateToCards: function () {
            var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "ManageCardsUIModule",
                "appName": "CardsMA"
            });
            manageCardsModule.presentationController.isFirstTime = true;
            var navManager = applicationManager.getNavigationManager();
            navManager.setCustomInfo("frmCardManageHome",{"isMainScreen": false});
            manageCardsModule.presentationController.showCardsHome();
        },

        setWidgetVisibilityBasedOnCard: function () {
            var navManager = applicationManager.getNavigationManager();
            var flow = navManager.getCustomInfo("requestCardFlowType");
            if (flow === "debitCard") {
                this.view.flxAccountDetails.setVisibility(true);
            } else if (flow === "domesticPrepaidCard") {
                this.view.flxAccountDetails.setVisibility(false);
            } else if (flow === "internationalPrepaidCard") {
                this.view.flxAccountDetails.setVisibility(false);
            } else if (flow === "virtualCard") {
                this.view.flxAccountDetails.setVisibility(true);
            }
        },

        btnPrimaryOnclick: function () {
            var navManager = applicationManager.getNavigationManager();
            navManager.navigateTo({ "appName": "HomepageMA", "friendlyName": "AccountsUIModule/frmHBLUnifiedDashboard" });
        },

    };
});
