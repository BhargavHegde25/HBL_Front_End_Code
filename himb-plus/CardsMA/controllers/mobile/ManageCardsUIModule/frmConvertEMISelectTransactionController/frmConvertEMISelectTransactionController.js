define({

    preShow: function () {
        try{
        this.view.customHeader.btnRight.onClick = this.cancelOnClick;
        this.view.customHeader.flxBack.onClick = this.cancelOnClick;
        this.setTitleBarVisibility();
        this.setSegmentData();
        this.view.segTransactionEMI.onRowClick = this.setDataToEmiConvertion;
        this.view.btnTransfer.setEnabled(false);
        this.view.btnTransfer.skin = "sknBtnE2E9F0Rounded";
        this.view.btnTransfer.onClick = this.navigateToEmiReview;
        }catch(err){
        applicationManager.getDataProcessorUtility().showToastMessageError(this, kony.i18n.getLocalizedString("kony.mb.enroll.SomethingWrong"));
        kony.print("preShow"+ err);
      }
    },

    cancelOnClick: function () {
        var navManager = applicationManager.getNavigationManager();
        navManager.goBack();
    },

    setTitleBarVisibility: function () {
        try{
        if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
            this.view.flxHeader.isVisible = true;
            this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("i18n.HBL.Cards.ConvertToEMI");
            this.view.customHeader.imgBack.src = "backbutton.png";
        } else {
            this.view.flxHeader.isVisible = false;
            this.view.title = kony.i18n.getLocalizedString("i18n.HBL.Cards.ConvertToEMI");
            this.view.flxMainScrollContainer.top = "0dp";
        }
        }catch(err){
        kony.print("setTitleBarVisibility"+ err);
      }
    },

    getNavManager: function () {
        return applicationManager.getNavigationManager();
    },

    setSegmentData: function () {
        try{
        var scopeObj = this;
        var eligibleEmiData = [];
        var data = scopeObj.getNavManager().getCustomInfo("frmConvertEMISelectTransaction");
        for (var i in data) {
            data[i].formattedMerchantCategoryCode = !kony.sdk.isNullOrUndefined(data[i].merchantCategoryCode) ? data[i].merchantCategoryCode.slice(0, 20) + " ..." : "";
            data[i].formattedDateAndRefNo = ((!kony.sdk.isNullOrUndefined(data[i].transactionDate)) && (!kony.sdk.isNullOrUndefined(data[i].referenceNumber)))
                ? applicationManager.getFormatUtilManager().getFormatedDateString(new Date(data[i].transactionDate.split(" ")[0]), "d M") + " | Ref No: " + data[i].referenceNumber : "";
            data[i].isEligibleEmi = true;// ((!kony.sdk.isNullOrUndefined(data[i].transactionAmount)) && (parseInt(data[i].transactionAmount) >= parseInt(scope_configManager.setMaxAmountForEmiEligible)))
                // ? true : false;
            data[i].imgRadioSelectEMI = "radiobtninactive.png";
            data[i].radioBtnStatus = false;

        }
        for (var i in data) {
            if (data[i].isEligibleEmi) {
                eligibleEmiData.push(data[i]);
            }
        }
        this.view.segTransactionEMI.widgetDataMap = {
            "imgRadioSelectEMI": "imgRadioSelectEMI",//radiobuttonactive.png radiobtninactive.png
            "lblEMITransactionTitle": "formattedMerchantCategoryCode",
            "lblDateNdRefNo": "formattedDateAndRefNo",
            "lblTransactionAmount": "formattedAmount",
            "authCode": "authCode"
        };
        this.view.segTransactionEMI.setData(eligibleEmiData);
        }catch(err){
        applicationManager.getDataProcessorUtility().showToastMessageError(this, kony.i18n.getLocalizedString("kony.mb.enroll.SomethingWrong"));
        kony.print("setSegmentData"+ err);
      }
    },
    setDataToEmiConvertion: function () {
        try{
        let rowindex = this.view.segTransactionEMI.selectedRowIndex[1];
        let segData = this.view.segTransactionEMI.data;
        let segSelectedData = this.view.segTransactionEMI.selectedRowItems;
        applicationManager.getNavigationManager().setCustomInfo("frmUnBilledTranConvertEMIReviewScreen", segSelectedData[0]);

        var activeRadio = "radiobuttonactive.png";
        var inActiveRadio = "radiobtninactive.png";
        //changing all rows "radioBtnStatus" and "imgCheckbox"
        for (var i in segData) {
            segData[i]["imgRadioSelectEMI"] = inActiveRadio;
            segData[i]["radioBtnStatus"] = false;
        }
        //changing radioBtnStatus "true" to selected row
        segData[rowindex]["radioBtnStatus"] = true;
        //assigning active image to selected row
        if (segData[rowindex]["radioBtnStatus"]) {
            segData[rowindex]["imgRadioSelectEMI"] = activeRadio;
        }
        //assigning inactive image to unselected row
        for (var i in segData) {
            if (!segData[i]["radioBtnStatus"]) {
                segData[i]["imgRadioSelectEMI"] = inActiveRadio;
            }
        }
        //assigning updated seg data
        this.view.segTransactionEMI.setData(segData);
        this.view.btnTransfer.setEnabled(true);
        this.view.btnTransfer.skin = "sknBtn055BAF26px";//enabled
        }catch(err){
        applicationManager.getDataProcessorUtility().showToastMessageError(this, kony.i18n.getLocalizedString("kony.mb.enroll.SomethingWrong"));
        kony.print("setDataToEmiConvertion"+ err);
      }
    },

    navigateToEmiReview: function () {
        var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
        manageCardsModule.presentationController.commonFunctionForNavigation("frmUnBilledTranConvertEMIReviewScreen");
    },

    showPopUp:function(res){
        applicationManager.getDataProcessorUtility().showToastMessageError(this, res);
    },

});