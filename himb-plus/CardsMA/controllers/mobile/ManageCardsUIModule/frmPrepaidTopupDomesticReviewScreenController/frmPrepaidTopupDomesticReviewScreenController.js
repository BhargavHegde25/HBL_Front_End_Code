define({
    preShow: function () {
        try {
            if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
                this.view.flxBody.top = "5dp";
            } else {
                this.view.flxBody.top = "58dp";
            }

            this.view.onDeviceBack = this.goBack;
            this.view.customHeader.flxBack.onClick = this.goBack;
            this.view.customHeader.btnRight.onClick = this.onCancelClick;

            this.setData();
            this.view.btnTransfer.onClick = this.topUpPrepaidDomesticServiceCall;
            applicationManager.getPresentationUtility().dismissLoadingScreen();
        } catch (err) {
            kony.print("preShow" + err);
        }
    },

    setData: function () {
        try {
            var formatUtil = applicationManager.getFormatUtilManager();
            var navManager = applicationManager.getNavigationManager();
            var reviewData = applicationManager.getNavigationManager().getCustomInfo("topUpPrepaidDomesticCardData");
            this.view.lblTransferAmountTitle.text = formatUtil.formatAmountandAppendCurrencySymbol(reviewData.amount, reviewData.toAccountCurrency);//amount
            this.view.flxReviewFromAccDetails.lblFromAccHolderName.text = reviewData.debtorName;//from acc holder name
            this.view.flxReviewFromAccDetails.lblFromAccNumber.text = reviewData.fromAccountNumber;//from acc number
            this.view.flxReviewCardDetailsC.lblFromAccHolderName.text = reviewData.cardHolderName;//card holder name
            this.view.flxReviewCardDetailsC.lblFromAccNumber.text = reviewData.cardNumber;//card number
            // this.view.lblAmountValue.text = formatUtil.formatAmountandAppendCurrencySymbol(reviewData.amount, reviewData.toAccountCurrency); //amount
            // this.view.lblExchagevalue.text = reviewData.exchagevalue;//exchange value
            // this.view.lblDebitValue.text = reviewData.convertedAmount;//debit value
            this.view.lblCardTypevalues.text = reviewData.transactionsNotes;//limit
        } catch (err) {
            kony.print("setData" + err);
        }
    },

    makeDollorTopup: function () {
        try {
            var navManager = applicationManager.getNavigationManager();
            applicationManager.getPresentationUtility().showLoadingScreen();
            var params = applicationManager.getNavigationManager().getCustomInfo("topUpPrepaidDomesticCardData");
            var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
            manageCardsModule.presentationController.intraBankTransferMB(params);
        } catch (err) {
            kony.print("makeDollorTopup" + err);
        }
    },

    goBack: function () {
        try {
            var navManager = applicationManager.getNavigationManager();
            navManager.goBack();
        } catch (err) {
            kony.print("goBack" + err);
        }
    },
    onCancelClick: function () {
        try {
            applicationManager.getNavigationManager().setCustomInfo("fromAccFlag", null);
            var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
            manageCardsModule.presentationController.onCancelClick();
        } catch (err) {
            kony.print("onCancelClick" + err);
        }
    },

    topUpPrepaidDomesticServiceCall: function (response) {
        try {
            applicationManager.getPresentationUtility().showLoadingScreen();
            var navManager = applicationManager.getNavigationManager();
            var param = navManager.getCustomInfo("topUpPrepaidDomesticCardData");
            var ackData = navManager.getCustomInfo("topUpCardAckData");
            // var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
            // manageCardsModule.presentationController.topUpCardMB(params);
            var ManageCardsUIModulePresenter = applicationManager.getModulesPresentationController({
                "appName": "CardsMA",
                "moduleName": "ManageCardsUIModule"
            });

            if (response.hasOwnProperty("referenceId") && response.hasOwnProperty("status") && !(kony.sdk.util.isNullOrUndefinedOrEmptyObject(response.referenceId)) && response.status === "success") {
                delete param.validate;
                param.transactionId = response.referenceId;
                ManageCardsUIModulePresenter.cardPrepaidTopupDomestic(param);//updated param second hit
            } else {
                ManageCardsUIModulePresenter.cardPrepaidTopupDomestic(param);//first hit
            }
            //cardPrepaidTopupDomestic
        } catch (err) {
            kony.print("topUpPrepaidDomesticServiceCall" + err);
        }
    },

    postShow: function () { },
});