define(['CampaignUtility', 'CommonUtilities'], function (CampaignUtility, CommonUtilities) {
    return {
        preShow: function () {
            var scope = this;
            var currentFormObject = kony.application.getCurrentForm();
            var currentForm = currentFormObject.id;
            applicationManager.getPresentationFormUtility().initCommonActions(this, "CALLBACK", currentForm, scope.flxBackOnClick);
            this.setTitleBarVisibility();
            var ackSuccessData = applicationManager.getNavigationManager().getCustomInfo("creditCardPaymentAckRespose");
            !kony.sdk.util.isNullOrUndefinedOrEmptyObject(ackSuccessData) ? this.setData(ackSuccessData):this.showErrorScreen() ;
            if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
                var rightBarButtonItem = new kony.ui.BarButtonItem({
                    type: constants.BAR_BUTTON_TITLE,
                    style: constants.BAR_ITEM_STYLE_PLAIN,
                    enabled: true,
                    action: this.flxBackOnClick,
                    tintColor: "FFFFFF00",
                    metaData: {
                        title: kony.i18n.getLocalizedString("i18n.konybb.common.cancel")
                    }
                });
                this.view.setRightBarButtonItems({
                    items: [rightBarButtonItem],
                    animated: true
                });
            }
            
            // this.view.customHeader.btnRight.onClick = this.onClickCancel;
            this.view.btnSuccessAction1.text = kony.i18n.getLocalizedString("i18n.CardManagement.GoToMyCards");
            this.view.btnSuccessAction2.text = kony.i18n.getLocalizedString("i18n.CardManagement.GoToMyDashboard");
            this.view.btnSuccessAction1.onClick = this.navigateToCardsHome;
            this.view.btnSuccessAction2.onClick = this.flxBackOnClick;
            this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
            this.view.customHeader.btnRight.onClick = this.flxBackOnClick;
            this.view.btnSuccessAction3.isVisible = false;
            this.view.btnSuccessAction4.isVisible = false;
            this.view.btnFailureAction1.onClick = this.flxBackOnClick;
        },

        navigateToCardsHome: function () {
            var navManager = applicationManager.getNavigationManager();
            navManager.navigateTo({ "appName": "CardsMA", "friendlyName": "ManageCardsUIModule/frmCardManageHome" });

        },

        flxBackOnClick: function () {
            var navManager = applicationManager.getNavigationManager();
            navManager.navigateTo({ "appName": "HomepageMA", "friendlyName": "AccountsUIModule/frmHBLUnifiedDashboard" });
            // kony.application.destroyForm({
            //     "appName": "TransfersMA",
            //     "friendlyName": "UnifiedTransferFlowUIModule/frmCreditCardPaymentAcknowledgement"
            // });
        },

        setData: function (data) {
            var scope = this;
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            var navManager = applicationManager.getNavigationManager();
            var reviewData = navManager.getCustomInfo("reviewDataFrmCreditCardBillPaymentReview");
            this.view.lblSuccessMessage.text = data.message;
            this.view.lblCurrency.text = data.transactionCurrency;//transaction currency
            let splitedAmount = data.transactionAmount.split(".");
            this.view.lblWholeAmount.text = data.transactionCurrency + " " + splitedAmount[0];//before decimal
            this.view.lblDecimal.text = "."+splitedAmount[1];//after decimal

            this.view.lblFromAccountName.text = reviewData.formattedFromAccountName;//acc name
            this.view.lblFromAccountNumber.text = scope.maskAccNum(data.fromAccountNumber);//masked acc number

            this.view.lblToAccountName.text = reviewData.cardHolderName;//card holder name
            
            var d = data.scheduledDate.split("T")
            this.view.btnSuccessAction3.isVisible = false;
            this.view.btnSuccessAction4.isVisible = false;
            var selectedCardDetails = navManager.getCustomInfo("selectedCreditCardDetails");
            var cardNumebr = selectedCardDetails.pan;
            var first = cardNumebr.slice(0, 4);
            var second = cardNumebr.slice(0, 6).slice(-2) + "XX";
            var third = "XXXX";
            var fourth = cardNumebr.slice(-4);
            var maskedCardNumber = first + " " + second + " " +third+" "+fourth;
            this.view.lblToAccountNumber.text = maskedCardNumber;//masked card number
          var ackProccessedData = {
            //"From Account Number: ": scope.maskAccNum(data.fromAccountNumber),//from
           // "To:":maskedCardNumber,
            // "Message: ":data.message,
            "Reference Id: ": data.referenceId,//ref id
            "Amount: ": data.transactionCurrency+" "+data.amount,//amount
            // "Frequency Type: ": data.frequencyType,//freq
            "Transaction Currency: ": data.transactionCurrency,//transfer curr
            "Send On: ": applicationManager.getFormatUtilManager().getFormatedDateString(new Date(d[0]), "d/m/Y"),//send on date
            // "Total Amount: ": response.transactionCurrency+" "+response.totalAmount,
            // "Transaction Amount: ": data.transactionAmount,
            "Transactions Notes: ": data.transactionsNotes,//notes
          };
            var ackProccessedResponse = ackProccessedData;
            this.view.flxSuccess.isVisible = true;
            this.view.flxSuccessButtons.isVisible = true;
            this.view.flxFail.isVisible = false;
            navManager.setCustomInfo("creditCardPaymentAckRespose", null);
            var segAckData = [];
            this.view.segTransferDetails.widgetDataMap = {
                "lblKey": "key",
                "lblValue": "value"
            }
            if (!kony.sdk.util.isNullOrUndefinedOrEmptyObject(ackProccessedResponse)) {
                for (var i in ackProccessedResponse) {
                    segAckData.push({
                        "key": i,
                        "value": ackProccessedResponse[i]
                    });
                }
                this.view.segTransferDetails.setData([]);
                this.view.segTransferDetails.setData(segAckData);
            }
        },

        maskAccNum: function(data){
            var accNum = data;
            var first = accNum.slice(0, 4);
            var third = "XXXXXX";
            var fourth = accNum.slice(-4);
            return maskedAccNum = first + third + fourth;
        },

        onClickCancel: function () {
            var navManager = applicationManager.getNavigationManager();
            navManager.navigateTo({ "appName": "HomepageMA", "friendlyName": "AccountsUIModule/frmHBLUnifiedDashboard" });
        },
        navigateToCreditCardPaymentReview: function () {
            applicationManager.getPresentationUtility().showLoadingScreen();
            var configurationManager = applicationManager.getConfigurationManager();
            const isAccUIModulePresent = configurationManager.isMicroAppPresent('HomepageMA');
            if (isAccUIModulePresent) {
                var accMode = kony.mvc.MDAApplication.getSharedInstance().moduleManager.getModule({
                    appName: "HomepageMA",
                    moduleName: "AccountsUIModule"
                });
                accMode.presentationController.dashboardService();
            }
        },

        setTitleBarVisibility: function () {
            if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
                this.view.flxHeader.isVisible = true;
                this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("i18n.transfers.Acknowledgement");
                // this.view.customHeader.imgBack.src = "backbutton.png";
                this.view.customHeader.imgBack.isVisible = false;
            } else {
                this.view.flxHeader.isVisible = false;
                this.view.title = kony.i18n.getLocalizedString("i18n.transfers.Acknowledgement");
            }
        },

        showErrorScreen: function (response) {
            this.view.flxSuccess.isVisible = false;
            this.view.flxSuccessButtons.isVisible = false;

            this.view.flxFail.isVisible = true;
            //this.view.lblFailTitle.isVisible = true;
            //this.view.lblFailTitle.text = response.errorMessage;
            
            // applicationManager.getDataProcessorUtility().showToastMessageError(this, response.errorMessage);
        },

    };
});
