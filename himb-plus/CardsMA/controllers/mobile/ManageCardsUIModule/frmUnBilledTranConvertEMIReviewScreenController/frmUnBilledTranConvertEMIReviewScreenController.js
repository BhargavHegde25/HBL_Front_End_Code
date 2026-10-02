define({
    emiData: "",
    dummyNavigation:"",
    preShow: function () {
        try{
        var scope = this;
        this.view.btnContinue.onClick = this.termsAndConditions;
        this.view.customHeader.flxBack.onClick = this.flxBackClick;
        this.view.customHeader.btnRight.onClick = this.navigateToAccountsDashboard;
        this.emiData = applicationManager.getNavigationManager().getCustomInfo("frmUnBilledTranConvertEMIReviewScreen");
        var firstFourDigit = this.emiData.pan.slice(0, 4);
        var lastFourDigit = this.emiData.pan.slice(-4);
        this.emiData.maskedCardNumber = firstFourDigit + " XXXX " + " XXXX " + lastFourDigit;//accountNumberMaskExceptFirstFourLastFour();
        this.setTitleBarVisibility();
        this.setData();
        this.view.flxTermsNdCond.setVisibility(false);
        this.view.btnContinue.setEnabled(true);
        this.view.btnContinue.skin = "sknBtn055BAF26px";
        this.view.flxImageContainer.onClick = this.enableContinueBtn;
        
        this.view.flxReviewFromAccDetails.imgPeek.onTouchStart = function () {
            if (scope.view.flxReviewFromAccDetails.imgPeek.src === "eyeclose.png") {
                scope.view.flxReviewFromAccDetails.imgPeek.src = "eyeopen.png";
                scope.view.flxReviewFromAccDetails.lblFromAccNumber.text = scope.emiData.pan;
            } else {
                scope.view.flxReviewFromAccDetails.imgPeek.src = "eyeclose.png";
                scope.view.flxReviewFromAccDetails.lblFromAccNumber.text = scope.emiData.maskedCardNumber;
            }
        }
         }catch(err){
        applicationManager.getDataProcessorUtility().showToastMessageError(this, kony.i18n.getLocalizedString("kony.mb.enroll.SomethingWrong"));
        kony.print("preShow"+ err);
      }
    },

    enableContinueBtn: function () {
        if (this.view.imgCheckbox.src === "checkbox_normal.png") {
            this.view.imgCheckbox.src = "checkboxtick.png";
            this.view.btnContinue.setEnabled(true);
            this.view.btnContinue.skin = "sknBtn055BAF26px";
            // this.dummyNavigation = "goToServiceCall";
        } else {
            this.view.imgCheckbox.src = "checkbox_normal.png"
            this.view.btnContinue.setEnabled(false);
            this.view.btnContinue.skin = "sknBtnE2E9F0Rounded";
            // this.dummyNavigation = "goToAckScreen";
        }
    },
    
    flxBackClick: function () {
        var navManager = applicationManager.getNavigationManager();
        navManager.navigateTo("frmConvertEMISelectTransaction");
    },
    navigateToCardsDashboard: function () {
        var navManager = applicationManager.getNavigationManager();
        navManager.navigateTo("frmCardManageHome");
    },

    navigateToAccountsDashboard: function () {
        var navManager = applicationManager.getNavigationManager();
        navManager.navigateTo({ "appName": "HomepageMA", "friendlyName": "AccountsUIModule/frmHBLUnifiedDashboard" });
    },

    setTitleBarVisibility: function () {
        if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
            this.view.flxHeader.isVisible = true;
            this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("i18n.HBL.Cards.ConvertToEMI");
            this.view.customHeader.imgBack.src = "backbutton.png";
        } else {
            this.view.flxHeader.isVisible = false;
            this.view.title = kony.i18n.getLocalizedString("i18n.HBL.Cards.ConvertToEMI");
            this.view.flxMainContainer.top = "0dp";
        }
    },

    setData: function () {
        try{
        this.view.flxReviewFromAccDetails.lblFromAccHolderName.text = this.emiData.cardHolderName
        this.view.flxReviewFromAccDetails.imgPeek.src = "eyeclose.png";
        this.view.flxReviewFromAccDetails.lblFromAccNumber.text = this.emiData.maskedCardNumber;
        this.view.lblCardValue.text = this.emiData.pan;
        this.view.lblTransactionDescValue.text = this.emiData.formattedMerchantCategoryCode;
        this.view.lblTransactionRefNumValue.text = this.emiData.referenceNumber;
        this.view.lblTransactionDateValue.text = this.emiData.formattedPostingDate;
        this.view.lblTransactionAmntValue.text = this.emiData.formattedAmount;
        this.view.lblTermsNdCondContent.text = kony.i18n.getLocalizedString("i18n.HBl.Cards.TermsAndCondition");
        this.view.imgCheckbox.src = "checkbox_normal.png";//"activecheckbox.png"
        this.view.btnContinue.setEnabled(false);
        this.view.btnContinue.skin = "sknBtnE2E9F0Rounded";
        var rate = scope_configManager.getEmiInterestDate().split("%");
        var time = scope_configManager.getEmiTenureMonth().match(/\d+/);
         }catch(err){
        applicationManager.getDataProcessorUtility().showToastMessageError(this, kony.i18n.getLocalizedString("kony.mb.enroll.SomethingWrong"));
        kony.print("setData"+ err);
      }
    },

    convertToEmi: function () {
        try{
        var manageCardModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
        var cardData = {
            "Card Number": this.emiData.pan,
            "Transaction Description": this.emiData.formattedMerchantCategoryCode,
            "Reference Number": this.emiData.referenceNumber,
            "Transaction Date": this.emiData.formattedPostingDate,
            "Transaction Amount": this.emiData.formattedAmount,
        };
        var dummyCardData = {
            "Card Number": this.emiData.pan,
            "Transaction Description": this.emiData.formattedMerchantCategoryCode,
            "Reference Number": this.emiData.referenceNumber,
            "Transaction Date": this.emiData.formattedPostingDate,
            "Transaction Amount": this.emiData.formattedAmount,
            "ReferenceNumber":"213413412",
            "formattedAmount":"213123",
            "formattedPostingDate":"12/12/2023"
        };
        var navMan = applicationManager.getNavigationManager();
        var convertEmiParam = { "authCode": this.emiData.authCode }//"208711255474" }
        navMan.setCustomInfo("cardConvertEmiDataAck", cardData);
        navMan.setCustomInfo("emiFLow", "isConvertEmiFlow");
        navMan.setCustomInfo("updatedEmiData", this.emiData);

        // if (this.dummyNavigation === "goToServiceCall") {

       manageCardModule.presentationController.getConvertEMIRequest(convertEmiParam);

        // } else if (this.dummyNavigation === "goToAckScreen") {
        // navMan.navigateTo({ "appName": "CardsMA", "friendlyName": "ManageCardsUIModule/frmCardsAcknowledgement" }, true, cardData);
        // }

        // var navManager = applicationManager.getNavigationManager();
        // navManager.navigateTo({ "appName": "CardsMA", "friendlyName": "ManageCardsUIModule/frmCardsAcknowledgementScreen"}, true, {"emiSuccess":dummyCardData});
     }catch(err){
        applicationManager.getDataProcessorUtility().showToastMessageError(this, kony.i18n.getLocalizedString("kony.mb.enroll.SomethingWrong"));
        kony.print("convertToEmi"+ err);
      }
    },

    termsAndConditions: function () {
        try {
            var manageCardsUIModule = applicationManager.getModulesPresentationController({
                "moduleName": "ManageCardsUIModule",
                "appName": "CardsMA"
            });
            manageCardsUIModule.getTermsandConditionsForEmiConvertion();
        } catch (e) {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
        }
    },

});