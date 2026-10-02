/**
 * Description of Module representing a Confirm form.
 * @module frmOneTimePaymentConfirmController
 */
define(['CommonUtilities', 'OLBConstants', 'ViewConstants', 'FormControllerUtility'], function(CommonUtilities, OLBConstants, ViewConstants, FormControllerUtility) {

    return /** @alias module:frmOneTimePaymentConfirmController */ {
        /**
         * updateFormUI - the entry point method for the form controller.
         * @param {Object} uiDataMap - it contains the set of view properties and keys.
         */
        profileAccess: "",
        updateFormUI: function(uiDataMap) {
            if (uiDataMap.isLoading === true) {
                FormControllerUtility.showProgressBar(this.view);
            } else if (uiDataMap.isLoading === false) {
                FormControllerUtility.hideProgressBar(this.view);
            }
            if (uiDataMap.serverError) {
                this.view.lblWarning.text = uiDataMap.serverError;
                this.view.flxWarning.setVisibility(true);
                applicationManager.getPresentationUtility().dismissLoadingScreen();
                this.view.flxFormContent.forceLayout();
            }
            if (uiDataMap.payABill) {
                this.bindSingleBillPayData(uiDataMap.payABill);
                this.bindTnCData(uiDataMap.payABill.TnCcontentTransfer);
            }
            /*if (uiDataMap.transferCall) {
                this.transferSecondCall(uiDataMap.transferCall);
            }
            if (uiDataMap.transferSecondCall) {
                this.ConfirmBillPayCall(uiDataMap.transferSecondCall);
            }*/
            if (uiDataMap.WebView) {
                this.WebView(uiDataMap.WebView);
            }
            if (uiDataMap.confirmBillPayError) {
                this.NavigatetoPreviousScreen(uiDataMap.confirmBillPayError);
            }
            if (uiDataMap.InsufficientBalance) {
                this.NavigatetoPreviousScreenwithError(uiDataMap.InsufficientBalance);
            }
            if (uiDataMap.ConvertedAmountData) {
                var flag = navManager.getCustomInfo("merchantflowtype");
                if (flag == "webview") {
                this.mapDataWithConvertedAmountData(uiDataMap.ConvertedAmountData);
                }
                else{
                    this.mapDataNEAConvertedAmountData(uiDataMap.ConvertedAmountData);
                }
            }
            if (uiDataMap.maxTransactionLimitExceed) {
                this.maxTransactionLimitExceedError(uiDataMap.maxTransactionLimitExceed);
            }
            if(uiDataMap.PinNotSet) {
                this.NavigatetoPreviousScreenwithPinError(uiDataMap.PinNotSet);
              }
              if(uiDataMap.mapConfirmationscreenFields) {
                this.setResponseField();
              }
              if(uiDataMap.mapConfirmationFields){
                this.setResponseFieldforTopupNepal(uiDataMap.mapConfirmationFields);
              }
        },
        init: function() {
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function() {};
            this.view.onBreakpointChange = this.onBreakpointChange;
            this.view.flxConfirmBillpayData.setVisibility(true);
            this.presenter = applicationManager.getModulesPresentationController({
                'appName': 'BillPayMA',
                'moduleName': 'BillPaymentUIModule'
            });
        },
        onBreakpointChange: function(form, width) {
            var scopeObj = this;
            FormControllerUtility.setupFormOnTouchEnd(width);
            this.view.customheadernew.onBreakpointChangeComponent(width);
            this.view.customfooternew.onBreakpointChangeComponent(width);
            // this.view.CustomPopup.onBreakpointChangeComponent(scopeObj.view.CustomPopup, width);
            // this.view.CancelPopup.onBreakpointChangeComponent(scopeObj.view.CancelPopup, width);
        },
        preShow: function() {
            let self = this;
            //this.setSenderAccountData();
            //this.view.flxExchangeRate.setVisibility(false);
            this.view.btnconfirm.skin = "ICSknbtnDisablede2e9f036px";
            this.view.btnconfirm.setEnabled(false);
            this.view.txtboxNotes.onTextChange=this.CheckFieldValidations;
            this.view.flxSenderDetails.setVisibility(false);
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            this.profileAccess = applicationManager.getUserPreferencesManager().profileAccess;
            this.view.customheadernew.activateMenu("Bill Pay", "Make One Time Payment");
            FormControllerUtility.updateWidgetsHeightInInfo(this, ['flxHeader', 'flxFooter']);
            // this.view.imgCloseWarning.toolTip = kony.i18n.getLocalizedString("i18n.common.close");
            //this.view.btnTermsAndConditions.toolTip = kony.i18n.getLocalizedString("i18n.ProfileManagement.TermsAndConditions");
            // this.view.btnConfirm.toolTip = kony.i18n.getLocalizedString("i18n.common.confirm");
            // this.view.btnModify.toolTip = kony.i18n.getLocalizedString("i18n.common.modifiy");
            //this.view.btnCancel.toolTip = kony.i18n.getLocalizedString("i18n.transfers.Cancel");
            // this.view.imgClose.toolTip = kony.i18n.getLocalizedString("i18n.common.close");
            this.view.rtxTC.setVisibility(!CommonUtilities.isMirrorLayoutEnabled())
            this.view.rtxTCArabic.setVisibility(CommonUtilities.isMirrorLayoutEnabled());
            this.view.btnCancel.onClick=this.navigateToHomeScreen.bind(this);
            this.view.customheadernew.btnSkipNav.onClick = function() {
                self.view.lblConfirmBillPay.setActive(true);
            };
            self.view.btnModify.onClick = this.NavigatetoPrevScreen.bind(this);
            /*this.view.btnconfirm.onClick = function() {
                    FormControllerUtility.showProgressBar(this.view);
                    var presenter = applicationManager.getModulesPresentationController({
                        'appName': 'BillPayMA',
                        'moduleName': 'BillPaymentUIModule'
                    });
                    var payload = applicationManager.getNavigationManager().getCustomInfo("Bilpayload");
                    if (Object.keys(payload).length != 0) {
                        presenter.confirmBillPayCall(payload);
                    }
                    /* if ((data.gettingFromOneTimePayment && CommonUtilities.isCSRMode()) || (data.isScheduleEditFlow && CommonUtilities.isCSRMode())) {
                        scopeObj.viewbtnConfirm.skin = CommonUtilities.disableButtonSkinForCSRMode();
                        scopeObj.view.btnConfirm.hoverSkin = CommonUtilities.disableButtonSkinForCSRMode();
                        scopeObj.view.btnConfirm.focusSkin = CommonUtilities.disableButtonSkinForCSRMode();
                    } else {
                        FormControllerUtility.showProgressBar(this.view);
                        data.languageAmount = data.amount;
                        var deformatedAmount = this.deformatAmount(data.amount);
                        data.amount = deformatedAmount;
                        scopeObj.presenter.checkMFAForOneTimePayment(data);
                    }*/
               // }.bind(this);
            //this.setAccessibiliyValues();
            this.view.segDropdown.onRowClick = function() {
                this.view.segDropdown.setVisibility(false);
                this.view.imgdropdown.src = "dropdownhbl.png";
                this.view.lblFrequencyValue.text="NPR " + this.convertAmountValue(applicationManager.getNavigationManager().getCustomInfo("totalDebitAmount"));
                this.view.lblSelectAccount.text = this.view.segDropdown.selectedRowItems[0].lblAccountName.text;
                var accountsList = this.loadStopPaymentsModule().presentationController.getAccounts();
                for (i = 0; i < accountsList.length; i++) {
                    if (accountsList[i].accountID == this.view.segDropdown.selectedRowItems[0].accountID) {
                        //var SelectedAccountName=accountsList[i].accountName;
                        this.view.segDropdown.selectedRowItems[0].accountName=accountsList[i].nickName;
                        applicationManager.getNavigationManager().setCustomInfo("SelectedAccountInfoWebView", accountsList[i]);
                    }
                }
                if(this.view.segDropdown.selectedRowItems[0].currencyCode!="NPR"){
                    PayloadExchangeRate={
                        "fromAccountCurrency":this.view.segDropdown.selectedRowItems[0].currencyCode,
                        "transactionCurrency":"NPR",
                        "transactionAmount":applicationManager.getNavigationManager().getCustomInfo("totalDebitAmount")
                    }
                    var presenter = applicationManager.getModulesPresentationController({
                        'appName': 'BillPayMA',
                        'moduleName': 'BillPaymentUIModule'
                    });
                    presenter.fetchExchangeRate(PayloadExchangeRate);
                }
                applicationManager.getNavigationManager().setCustomInfo("SelectedAccountDataWebView", this.view.segDropdown.selectedRowItems[0].lblAccountName.text);
                //applicationManager.getNavigationManager().setCustomInfo("SelectedAccountInfoWebView", this.view.segDropdown.selectedRowItems[0]);
                //this.dataToPush.debtorAccount = this.view.segDropdown.selectedRowItems[0].accountID;
                //this.dataToPush.debtorBranch = "";
                var data = applicationManager.getConfigurationManager().UserAttributes;
                var name;
                if (!data.FullName) {
                    name = (data.userlastname === null) ? data.userfirstname : (data.userfirstname === null) ? data.userlastname : data.userfirstname + " " + data.userlastname;
                } else {
                    name = data.FullName;
                }
                //this.dataToPush.debtorName = name;
            }.bind(this);
            /*this.view.imgdropdown.onTouchEnd = function() {
                if (this.view.segDropdown.isVisible) {
                    this.view.segDropdown.setVisibility(false);
                    this.view.imgdropdown.src = "dropdownhbl.png";
                } else {
                    this.view.segDropdown.setVisibility(true);
                    this.view.imgdropdown.src = "dropuphbl.png";
                }
                this.view.forceLayout();
            }.bind(this);
            */
            this.view.flxFrmAccountDropdown.onClick = function() {
                if (this.view.segDropdown.isVisible) {
                    this.view.segDropdown.setVisibility(false);
                    this.view.imgdropdown.src = "dropdownhbl.png";
                } else {
                    this.view.segDropdown.setVisibility(true);
                    this.view.imgdropdown.src = "dropuphbl.png";
                }
            }.bind(this);
            self.view.btnconfirm.onClick = function() {
               this.ConfirmBillPayCall();
            }.bind(this);
            this.view.flxLogout.onKeyPress = this.onKeyPressCallBack;
            this.view.flxTermsAndConditionsPopUp.flxTC.onKeyPress = this.onTCKeyPressCallBack;
            this.view.flxCancelPopup.CancelPopup.onKeyPress = this.onKeyPressCallBack;
            var navManager = applicationManager.getNavigationManager();
            var flag = navManager.getCustomInfo("merchantflowtype");
            //if(flag=="manual"){
            //this.setResponseField();
            //}
        },
        mapDataWithConvertedAmountData:function(response){
            this.view.lblPaymentDateValue.text=response.midRevalRate;
            //this.view.lblFrequencyValue.text = response.currenceCode  +" "+ response.convertedAmount;
            this.view.lblFrequencyValue.text = CommonUtilities.formatCurrencyWithCommas(response.convertedAmount, false,response.currenceCode );
            this.view.flxSenderDetails.setVisibility(true);
            this.view.flxFrom.setVisibility(false);
            kony.application.dismissLoadingScreen();
            //applicationManager.getNavigationManager().setCustomInfo("totalDebitAmount", response.convertedAmount);
        },
        mapDataNEAConvertedAmountData:function(response){
            this.view.lblPaymentDateValue.text=response.midRevalRate;
            this.view.lblFrequencyValue.text = response.currenceCode  +" "+ response.convertedAmount;
            //this.view.lblFrequencyValue.text = CommonUtilities.formatCurrencyWithCommas(response.convertedAmount, false,response.currenceCode );
            this.view.flxSenderDetails.setVisibility(false);
            this.view.flxFrom.setVisibility(true);
            kony.application.dismissLoadingScreen();
        },
        CheckFieldValidations:function(){
           if(this.view.txtboxNotes.text!=""){
            applicationManager.getNavigationManager().setCustomInfo("NotesValuewebView", this.view.txtboxNotes.text);
            this.view.btnconfirm.skin = "sknBtnNormalSSPFFFFFF15pxradius6";
            this.view.btnconfirm.setEnabled(true);
           }
           else{
            this.view.btnconfirm.skin = "ICSknbtnDisablede2e9f036px";
            this.view.btnconfirm.setEnabled(false);
           }
        },
        loadStopPaymentsModule: function() {
            return kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "appName": "ArrangementsMA",
                "moduleName": "StopPaymentsUIModule"
            });
        },
        navigateToHomeScreen:function(){
            /*var navMan = applicationManager.getNavigationManager();
                        navMan.navigateTo({
                            "appName": "BillPayMA",
                            "friendlyName": "frmBillPayNew"
                        });*/
            kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
            appName: "BillPayMA",
            moduleName: "BillPaymentUIModule"
            }).presentationController.showBillPaymentScreen({
            context: "PayABill",
            payload: {"code": "ALL"}
            });
            kony.application.showLoadingScreen();              
        },
        WebView:function(res){
            this.setWebViewData(res);
        },
        showOrHideAccountRows: function(context) {
            var section = context.rowContext.sectionIndex;
            var segData = this.view.segDropdown.data;
            var isRowVisible = true;
            if (segData[section][0].imgDropDown.text === "O") {
                segData[section][0]["imgDropDown"] = {
                    text: "P"
                };
                isRowVisible = true;
            } else {
                segData[section][0]["imgDropDown"] = {
                    text: "O"
                };
                isRowVisible = false;
            }
            for (var i = 0; i < segData[section][1].length; i++) {
                var flxAccountListItem = JSON.parse(JSON.stringify(segData[section][1][i].flxAccountListItem));
                flxAccountListItem["isVisible"] = isRowVisible;
                this.updateKeyAt("flxAccountListItem", flxAccountListItem, i, section);
            }
            segData = this.view.segDropdown.data;
            this.view.segDropdown.setSectionAt(segData[section], section);
        },
        getDataWithAccountTypeSections: function(accounts) {
            var scopeObj = this;
            var finalData = {};
            var isCombinedUser = applicationManager.getConfigurationManager().getConfigurationValue('isCombinedUser') === "true";
            var prioritizeAccountTypes = applicationManager.getTypeManager().getAccountTypesByPriority();
            accounts.forEach(function(account) {
                var accountType = applicationManager.getTypeManager().getAccountType(account.accountType);
                var currencyCode = account.currencyCode;
                if (finalData.hasOwnProperty(accountType)) {
                    if (accountType != "Deposit" || accountType != "Loan" || accountType != "Mortgage") {
                        if (currencyCode == "NPR") {
                        finalData[accountType][1].push(scopeObj.createSegmentData(account));
					    }
				    }
                } else {
                    if(accountType!="Deposit" || accountType!="Loan" || accountType!="Mortgage"){
                        if(currencyCode=="NPR"){
                    finalData[accountType] = [{
                            lblTransactionHeader: {
                                text: accountType,
                                left: "10dp"
                            },
                            lblSeparator: {
                                "isVisible": "true"
                            },
                            imgDropDown: "P",
                            flxDropDown: {
                                "onClick": function(context) {
                                    scopeObj.showOrHideAccountRows(context);
                                }.bind(this),
                                "isVisible": false
                            },
                            template: "flxTransfersFromListHeader",
                        },
                        [scopeObj.createSegmentData(account)]
                    ];
                }
            }
        }
            });
            this.sectionData = [];
            var data = [];
            for (var key in prioritizeAccountTypes) {
                var accountType = prioritizeAccountTypes[key];
                if (finalData.hasOwnProperty(accountType)) {
                    data.push(finalData[accountType]);
                    this.sectionData.push(accountType);
                }
            }
            return data;
        },
        createSegmentData: function(account) {
            var dataObject = {
                //"lblAccountName": (account.accountID || account.Account_id) ? CommonUtilities.getAccountDisplayName(account) : (account.nickName ? account.nickName : account.name),
                "lblAccountName":{ 
                    text: (account.accountID || account.Account_id) ? CommonUtilities.truncateStringWithGivenLength(account.accountName + "....", 26) + CommonUtilities.getLastFourDigit(account.accountID) : CommonUtilities.getAccountDisplayName(account),
                "top":"5dp",
				"left": "10dp",
                },
                "flxAmount":{
					"top": "-5dp"
				},
                "lblAmount": ((account.accountType !== "CreditCard") && (account.accountType !== "Loan")) ? (account.availableBalance ? applicationManager.getFormatUtilManager().convertAmountValue(account.availableBalance, account.currencyCode) : (account.bankName || account.phone || account.email)) : (applicationManager.getFormatUtilManager().convertAmountValue(account.outstandingBalance, account.currencyCode)),
                "accountID": account.Account_id || account.accountID || account.accountNumber || account.payPersonId || account.PayPersonId,
                "currencyCode": account.currencyCode,
                "imgIcon": {
                    text: account.isBusinessAccount === "true" ? "r" : "s",
                    isVisible: this.profileAccess === "both" ? true : false
                },
                "flxIcons":{
					"height": kony.flex.USE_PREFERED_SIZE,
					"width": kony.flex.USE_PREFERED_SIZE,
					"left": "10dp"
				},
                "lblAccType": {
					text: account.description || account.accountType,
					"height": kony.flex.USE_PREFERED_SIZE,
					"contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
					"width":"120dp",
					"left": "0dp"
				},
                "flxBankIcon": {
                    "isVisible": account.externalIndicator === "true" ? true : false,
                },
                "imgBankIcon": {
                    "src": "bank_icon_hdfc.png"
                },
                "flxAccountListItem": {
                    "isVisible": true,
                    "skin":"ICsknFlxffffff"
                }
            };
            return dataObject;
        },
        setSenderAccountData: function() {
            //this.view.lblSelectAccount.text = kony.i18n.getLocalizedString("kony.mb.CM.selectAccount");
            var billPaydefaultAcc=kony.store.getItem("BillPayDefaultAccountid");
            var accountsList = this.loadStopPaymentsModule().presentationController.getAccounts();
            
            for (i = 0; i < accountsList.length; i++) {
                if (accountsList[i].accountID == billPaydefaultAcc) {
                    this.view.lblSelectAccount.text=CommonUtilities.mergeAccountNameNumber(accountsList[i].nickName || accountsList[i].accountName, accountsList[i].account_id);
                    applicationManager.getNavigationManager().setCustomInfo("SelectedAccountDataWebView",  this.view.lblSelectAccount.text);
                    applicationManager.getNavigationManager().setCustomInfo("SelectedAccountInfoWebView",accountsList[i]);
                    break;
                }
            }
            var defaultAccData=applicationManager.getNavigationManager().getCustomInfo("SelectedAccountInfoWebView");
            if(defaultAccData.currencyCode!="NPR"){
                kony.application.showLoadingScreen();
                PayloadExchangeRate = {
                    "fromAccountCurrency": defaultAccData.currencyCode,
                    "transactionCurrency": "NPR",
                    "transactionAmount": applicationManager.getNavigationManager().getCustomInfo("totalDebitAmount")
                }
                var presenter = applicationManager.getModulesPresentationController({
                    'appName': 'BillPayMA',
                    'moduleName': 'BillPaymentUIModule'
                });
                presenter.fetchExchangeRate(PayloadExchangeRate);
            }
            this.view.imgdropdown.src = "dropdownhbl.png";
            var presenter = applicationManager.getModulesPresentationController({
                'appName': 'BillPayMA',
                'moduleName': 'BillPaymentUIModule'
            });
            var billPayAcccounts = this.getDataWithAccountTypeSections(presenter.getSingelBillPaySupportedAccounts());
            this.view.segDropdown.widgetDataMap = {
                "flxFromAccountsList": "flxFromAccountsList",
                "flxAccountListItem": "flxAccountListItem",
                "lblAccountName": "lblAccountName",
                "flxAmount": "flxAmount",
                "flxSeparator": "flxSeparator",
                "lblAmount": "lblAmount",
                "lblCurrencySymbol": "lblCurrencySymbol",
                "flxTransfersFromListHeader": "flxTransfersFromListHeader",
                "lblTransactionHeader": "lblTransactionHeader",
                "imgDropDown": "imgDropDown",
                "flxDropDown": "flxDropDown",
                "flxIcons": "flxIcons",
                "imgIcon": "imgIcon",
                "flxBankIcon": "flxBankIcon",
                "imgBankIcon": "imgBankIcon",
                "lblAccType": "lblAccType"
            };
            if (billPayAcccounts) {
                this.view.segDropdown.setData(billPayAcccounts);
            }
            this.view.forceLayout();
        },
        CallBillPayFinalService:function(){
            var payload={};
            var merchantInfo= applicationManager.getNavigationManager().getCustomInfo("Biller_Code");
            var notes=this.view.txtboxNotes.text;
                    var bankDate= applicationManager.getNavigationManager().getCustomInfo("bankDates");
			        var currentBankDate="";
			        if(bankDate){
				        currentBankDate=bankDate.currentWorkingDate;
				        if(currentBankDate)
				        currentBankDate=currentBankDate+"T00:00:00.000Z";
			        }
                    var navManager = applicationManager.getNavigationManager();
                var res=navManager.getCustomInfo("WebViewRes");
                var nofRows = JSON.parse(res.npiObjectData).fieldLabelMapping.length;
                for (var i = 0; i < nofRows; i++) {
                    for (var j = 0; j < Object.keys(JSON.parse(res.npiObjectData).cipsTransactionDetail).length; j++) {
                        if (JSON.parse(res.npiObjectData).fieldLabelMapping[i].mapField == Object.keys(JSON.parse(res.npiObjectData).cipsTransactionDetail)[j]) {
                            var x=JSON.parse(res.npiObjectData).fieldLabelMapping[i].mapField;
                            var y=Object.values(JSON.parse(res.npiObjectData).cipsTransactionDetail)[j];
                                payload[x]=y;
                    }
                }
            }
            var AccDetails = applicationManager.getNavigationManager().getCustomInfo("SelectedAccountInfoWebView");
            var amount= JSON.parse(res.npiObjectData).cipsTransactionDetail.amount;
			var serviceCharge = applicationManager.getNavigationManager().getCustomInfo("totalFee");
            var ServiceChargePayload=serviceCharge;
            if(serviceCharge=="NA"){
                var ServiceChargePayload=0;
            }
			var transactionAmount = parseFloat(serviceCharge) + parseInt(amount);//applicationManager.getNavigationManager().getCustomInfo("totalDebitAmount");
            var debitInformation = {};
            debitInformation.debtorName = AccDetails.AccountName;
            debitInformation.debtorAccount = AccDetails.accountID;
            debitInformation.fromAccountCurrency = "NPR";
            debitInformation.debtorAgent = scope_configManager.getDebtorAgentBankIdValue();
            debitInformation.debtorBranch = scope_configManager.getDebtorAgentBranchId();
            debitInformation.amount=JSON.parse(res.npiObjectData).cipsTransactionDetail.amount;
            debitInformation.fee=applicationManager.getNavigationManager().getCustomInfo("totalFee");
            debitInformation.totalDebitAmount=applicationManager.getNavigationManager().getCustomInfo("totalDebitAmount");
            var transactionAmountwithFee=applicationManager.getNavigationManager().getCustomInfo("totalDebitAmount");
            //debitInformation.totalDebitAmount=debitInformation.amount+debitInformation.fee;
            for(j=0;j<scope_configManager.userAccounts.length;j++){
                if(AccDetails.accountID==scope_configManager.userAccounts[j].account_id){
                    var AvailableBalance=parseFloat(scope_configManager.userAccounts[j].availableBalance);
                    break;
                }
            }
            if(AvailableBalance>=parseFloat(debitInformation.totalDebitAmount)){
                var maxTransactionlimit=kony.mvc.MDAApplication.getSharedInstance().appContext.getMerchantPaymentCharges.maxTransactionLimit;
                    if(maxTransactionlimit!=null && maxTransactionlimit!=""&& maxTransactionlimit!=undefined){
                if(parseFloat(debitInformation.totalDebitAmount)<=parseFloat(kony.mvc.MDAApplication.getSharedInstance().appContext.getMerchantPaymentCharges.maxTransactionLimit)){
            var navManager = applicationManager.getNavigationManager();
                navManager.setCustomInfo("debitInformation",debitInformation);
            var cipsTransactionDetail = JSON.parse(res.npiObjectData).cipsTransactionDetail;
            var cipsBatchDetail = JSON.parse(res.npiObjectData).cipsBatchDetail;
            var data = [{
                cipsBatchDetail,
                cipsTransactionDetail,
                debitInformation
            }];
            applicationManager.getPresentationUtility().showLoadingScreen();
            var paymentAggregator = applicationManager.getNavigationManager().getCustomInfo("PaymentAggregatorType");
                var Payload = { "payeeNickName":merchantInfo.labelText,"payeeId":merchantInfo.code,"amount":transactionAmountwithFee,"fromAccountNumber":AccDetails.accountID,"transactionCurrency":"NPR","serviceCharge":ServiceChargePayload,"transactionAmount":amount,"transactionType":"BillPay","serviceName":"BILL_PAY_CREATE","frequencyType":"Once","paymentAggregator":paymentAggregator,"transactionDetails":data, 
                "notes": notes,
                "scheduledDate":currentBankDate,
				"merchantName":merchantInfo.labelText,
				"merchantCode":merchantInfo.code
                };
            var presenter = applicationManager.getModulesPresentationController({
                'appName': 'BillPayMA',
                'moduleName': 'BillPaymentUIModule'
            });
                presenter.confirmBillPayCall(Payload);
    }
        else{
            applicationManager.getNavigationManager().updateForm({
                "maxTransactionLimitExceed": res
                }, "frmOneTimePaymentConfirm");
        }
        }
        else{
            var navManager = applicationManager.getNavigationManager();
                navManager.setCustomInfo("debitInformation",debitInformation);
            var cipsTransactionDetail = JSON.parse(res.npiObjectData).cipsTransactionDetail;
            var cipsBatchDetail = JSON.parse(res.npiObjectData).cipsBatchDetail;
            var data = [{
                cipsBatchDetail,
                cipsTransactionDetail,
                debitInformation
            }];
            applicationManager.getPresentationUtility().showLoadingScreen();
            var paymentAggregator = applicationManager.getNavigationManager().getCustomInfo("PaymentAggregatorType");
                var Payload = { "payeeNickName":merchantInfo.labelText,"payeeId":merchantInfo.code,"amount":transactionAmountwithFee,"fromAccountNumber":AccDetails.accountID,"transactionCurrency":"NPR","serviceCharge":ServiceChargePayload,"transactionAmount":amount,"transactionType":"BillPay","serviceName":"BILL_PAY_CREATE","frequencyType":"Once","paymentAggregator":paymentAggregator,"transactionDetails":data, 
                "notes": notes,
                "scheduledDate":currentBankDate,
				"merchantName":merchantInfo.labelText,
				"merchantCode":merchantInfo.code
                };
            var presenter = applicationManager.getModulesPresentationController({
                'appName': 'BillPayMA',
                'moduleName': 'BillPaymentUIModule'
            });
                presenter.confirmBillPayCall(Payload);
        }
    }
        else{
            applicationManager.getNavigationManager().updateForm({
                "InsufficientBalance": res
                }, "frmOneTimePaymentConfirm");
        }
        },
        ConfirmBillPayCall:function(){
            kony.application.showLoadingScreen();
            this.view.flxWarning.setVisibility(false);
            var navManager = applicationManager.getNavigationManager();
                    var flag = navManager.getCustomInfo("merchantflowtype");
                    var notes=this.view.txtboxNotes.text;
                    applicationManager.getNavigationManager().setCustomInfo("NotesValue",notes);
			        var merchantInfo= applicationManager.getNavigationManager().getCustomInfo("Biller_Code");
                    var bankDate= applicationManager.getNavigationManager().getCustomInfo("bankDates");
			        var currentBankDate="";
			        if(bankDate){
				        currentBankDate=bankDate.currentWorkingDate;
				        if(currentBankDate)
				        currentBankDate=currentBankDate+"T00:00:00.000Z";
			        }
                    if (flag == "webview") {
                        this.CallBillPayFinalService();
        }
        else{
                var navMan = applicationManager.getNavigationManager();
                var inquiryData = navMan.getCustomInfo("dataInquiry");
                var AccDetails = applicationManager.getNavigationManager().getCustomInfo("SelectedAccountInfo");
            var transactionAmount=applicationManager.getNavigationManager().getCustomInfo("totalDebitAmount");
            var ServiceChargePayload=applicationManager.getNavigationManager().getCustomInfo("totalFee");
            for(k=0;k<scope_configManager.userAccounts.length;k++){
                if(AccDetails.account_id==scope_configManager.userAccounts[k].account_id){
                    var AvailableBalance=parseFloat(scope_configManager.userAccounts[k].availableBalance);
                    break;
                }
            }
            if(applicationManager.getNavigationManager().getCustomInfo("PaymentAggregatorType")=="KUKL"){
                var response = applicationManager.getNavigationManager().getCustomInfo("LodgebillpayRes").billInfo[0].transactionDetails[0];
                this.callKUKLConfirmBillPay(AvailableBalance);
            }
            else if(applicationManager.getNavigationManager().getCustomInfo("PaymentAggregatorType")=="TOP-UP-NEPAL"){
                this.callTopupNepalConfirmBillPay(AvailableBalance);
            }
            else{
                var response = applicationManager.getNavigationManager().getCustomInfo("LodgebillpayRes").billInfo[0].transactionDetails[0];
            if(AvailableBalance>=parseFloat(transactionAmount)){
                
                var maxTransactionlimit=kony.mvc.MDAApplication.getSharedInstance().appContext.getMerchantPaymentCharges.maxTransactionLimit;
                    if(maxTransactionlimit!=null && maxTransactionlimit!=""&& maxTransactionlimit!=undefined){
                if(parseFloat(transactionAmount)<=parseFloat(kony.mvc.MDAApplication.getSharedInstance().appContext.getMerchantPaymentCharges.maxTransactionLimit)){
                Payload = {
                    "payeeNickName":merchantInfo.labelText,
                    "payeeId":merchantInfo.code,
                    "paymentAggregator": applicationManager.getNavigationManager().getCustomInfo("PaymentAggregatorType"),
                    "scno": response.scno,
                    "counterValue":applicationManager.getNavigationManager().getCustomInfo("counterValue"),
                    "consumerId": response.consumerid,
                    "counterCode": inquiryData.counterCode,
                    "amount": transactionAmount,
					"fromAccountNumber": AccDetails.accountID,
                    "transactionCurrency": "NPR",
                    "serviceCharge": ServiceChargePayload,
                    //"transactionAmount": response.paybleamount, applicationManager.getNavigationManager().getCustomInfo("TextboxenteredValues");
                    "transactionAmount":  applicationManager.getNavigationManager().getCustomInfo("TextboxenteredValues"),
                    "transactionType": "BillPay",
                    "serviceName": "BILL_PAY_CREATE",
                    "frequencyType": "Once",
                    "scheduledDate":currentBankDate,
					"notes": notes,
					"merchantName":merchantInfo.labelText,
					"merchantCode":merchantInfo.code
                };
                var presenter = applicationManager.getModulesPresentationController({
                    'appName': 'BillPayMA',
                    'moduleName': 'BillPaymentUIModule'
                });
                    presenter.confirmBillPayCallNEA(Payload);
        }
                else{
                    applicationManager.getNavigationManager().updateForm({
                        "maxTransactionLimitExceed": "true"
                        }, "frmOneTimePaymentConfirm");
                }
            }
            else{
                Payload = {
                    "payeeNickName":merchantInfo.labelText,
                    "payeeId":merchantInfo.code,
                    "paymentAggregator": applicationManager.getNavigationManager().getCustomInfo("PaymentAggregatorType"),
                    "scno": response.scno,
                    "counterValue":applicationManager.getNavigationManager().getCustomInfo("counterValue"),
                    "consumerId": response.consumerid,
                    "counterCode": inquiryData.counterCode,
                    "amount": transactionAmount,
					"fromAccountNumber": AccDetails.accountID,
                    "transactionCurrency": "NPR",
                    "serviceCharge": ServiceChargePayload,
                    //"transactionAmount": response.paybleamount,
                    "transactionAmount":  applicationManager.getNavigationManager().getCustomInfo("TextboxenteredValues"),
                    "transactionType": "BillPay",
                    "serviceName": "BILL_PAY_CREATE",
                    "frequencyType": "Once",
                    "scheduledDate":currentBankDate,
					"notes": notes,
					"merchantName":merchantInfo.labelText,
					"merchantCode":merchantInfo.code
                };
                var presenter = applicationManager.getModulesPresentationController({
                    'appName': 'BillPayMA',
                    'moduleName': 'BillPaymentUIModule'
                });
                    presenter.confirmBillPayCallNEA(Payload);
            }
            }
            else{
                applicationManager.getNavigationManager().updateForm({
                    "InsufficientBalance": "true"
                    }, "frmOneTimePaymentConfirm");
            }
        }
        }
        },
        callTopupNepalConfirmBillPay:function(AvailableBalance){
            //var response = applicationManager.getNavigationManager().getCustomInfo("fieldValues");
                var AccDetails = applicationManager.getNavigationManager().getCustomInfo("SelectedAccountInfo");
                var transactionAmount=applicationManager.getNavigationManager().getCustomInfo("totalDebitAmount");
                var ServiceChargePayload=applicationManager.getNavigationManager().getCustomInfo("totalFee");
                var merchantInfo= applicationManager.getNavigationManager().getCustomInfo("Biller_Code");
                var notes=this.view.txtboxNotes.text;
                var bankDate= applicationManager.getNavigationManager().getCustomInfo("bankDates");
			    var currentBankDate="";
			    if(bankDate){
				    currentBankDate=bankDate.currentWorkingDate;
				    if(currentBankDate)
				    currentBankDate=currentBankDate+"T00:00:00.000Z";
			        }
            var fieldValues=applicationManager.getNavigationManager().getCustomInfo("fieldValues");
            var MerchantCode=applicationManager.getNavigationManager().getCustomInfo("MerchantCode");
            if(MerchantCode=="TOP-UP-NEPAL_INTERNET"){
                var Action="";
                if(fieldValues['ADSL Type']=="Unlimited"){
                    Action="NTCADSL"
                    var connectionType="NTC ADSL Unlimited";
                }
                else{
                    Action="NTCADSLVOL"
                    var connectionType="NTC Volume Based";
                }
                applicationManager.getNavigationManager().setCustomInfo("ActionTypeValue",Action);
                applicationManager.getNavigationManager().setCustomInfo("connectionType",connectionType);
            }
            for(i=0;i<Object.keys(fieldValues).length;i++){
            if(Object.keys(fieldValues)[i].toLowerCase()=="amount"){
                var amountValue=Object.values(fieldValues)[i];
            }if(Object.keys(fieldValues)[i].toLowerCase()=="mobileno" || Object.keys(fieldValues)[i].toLowerCase()=="mobile number"|| Object.keys(fieldValues)[i].toLowerCase()=="landline number"){
                var mobilenoValue=Object.values(fieldValues)[i];
             }
            }
            if(AvailableBalance>=parseFloat(transactionAmount)){
                var maxTransactionlimit=kony.mvc.MDAApplication.getSharedInstance().appContext.getMerchantPaymentCharges.maxTransactionLimit;
                    if(maxTransactionlimit!=null && maxTransactionlimit!=""&& maxTransactionlimit!=undefined){
                if(parseFloat(transactionAmount)<=parseFloat(kony.mvc.MDAApplication.getSharedInstance().appContext.getMerchantPaymentCharges.maxTransactionLimit)){
                Payload = {
                    "mobileno":mobilenoValue,
                    "Action":applicationManager.getNavigationManager().getCustomInfo("ActionTypeValue"),
                    "serviceProvider":applicationManager.getNavigationManager().getCustomInfo("connectionType"),
                    "payeeNickName":merchantInfo.labelText,
                    "payeeId":merchantInfo.code,
                    "paymentAggregator": applicationManager.getNavigationManager().getCustomInfo("PaymentAggregatorType"),
                    "amount": transactionAmount,
					"fromAccountNumber": AccDetails.accountID,
                    "transactionCurrency": "NPR",
                    "serviceCharge": ServiceChargePayload,
                    "transactionAmount": amountValue,
                    "transactionType": "BillPay",
                    "serviceName": "BILL_PAY_CREATE",
                    "frequencyType": "Once",
                    "scheduledDate":currentBankDate,
					"notes": notes,
					"merchantName":merchantInfo.labelText,
					"merchantCode":merchantInfo.code
                };
                var presenter = applicationManager.getModulesPresentationController({
                    'appName': 'BillPayMA',
                    'moduleName': 'BillPaymentUIModule'
                });
                    presenter.confirmBillPayCallTopupNepal(Payload);
        }
                else{
                    applicationManager.getNavigationManager().updateForm({
                        "maxTransactionLimitExceed": "true"
                        }, "frmOneTimePaymentConfirm");
                }
            }
            else{
                Payload = {
                    "mobileno":mobilenoValue,
                    "Action":applicationManager.getNavigationManager().getCustomInfo("ActionTypeValue"),
                    "serviceProvider":applicationManager.getNavigationManager().getCustomInfo("connectionType"),
                    "payeeNickName":merchantInfo.labelText,
                    "payeeId":merchantInfo.code,
                    "paymentAggregator": applicationManager.getNavigationManager().getCustomInfo("PaymentAggregatorType"),
                    "amount": transactionAmount,
					"fromAccountNumber": AccDetails.accountID,
                    "transactionCurrency": "NPR",
                    "serviceCharge": ServiceChargePayload,
                    "transactionAmount": amountValue,
                    "transactionType": "BillPay",
                    "serviceName": "BILL_PAY_CREATE",
                    "frequencyType": "Once",
                    "scheduledDate":currentBankDate,
					"notes": notes,
					"merchantName":merchantInfo.labelText,
					"merchantCode":merchantInfo.code
                };
                var presenter = applicationManager.getModulesPresentationController({
                    'appName': 'BillPayMA',
                    'moduleName': 'BillPaymentUIModule'
                });
                    presenter.confirmBillPayCallTopupNepal(Payload);
            }
            }
            else{
                applicationManager.getNavigationManager().updateForm({
                    "InsufficientBalance": "true"
                    }, "frmOneTimePaymentConfirm");
        }
    },
        callKUKLConfirmBillPay:function(AvailableBalance){
            var response = applicationManager.getNavigationManager().getCustomInfo("LodgebillpayRes").billInfo[0].transactionDetails[0];
                var AccDetails = applicationManager.getNavigationManager().getCustomInfo("SelectedAccountInfo");
                var transactionAmount=applicationManager.getNavigationManager().getCustomInfo("totalDebitAmount");
                var ServiceChargePayload=applicationManager.getNavigationManager().getCustomInfo("totalFee");
                var merchantInfo= applicationManager.getNavigationManager().getCustomInfo("Biller_Code");
                var notes=this.view.txtboxNotes.text;
                    var bankDate= applicationManager.getNavigationManager().getCustomInfo("bankDates");
			        var currentBankDate="";
			        if(bankDate){
				        currentBankDate=bankDate.currentWorkingDate;
				        if(currentBankDate)
				        currentBankDate=currentBankDate+"T00:00:00.000Z";
			        }
                    var customerBillInfores=applicationManager.getNavigationManager().getCustomInfo("getCustomerBillInfoResponse");
                    var boardAmount=false;
                    for(h=0;h<Object.keys(customerBillInfores.billInfo[0].transactionDetails[0]).length;h++){
                        if("board_amount"==Object.keys(customerBillInfores.billInfo[0].transactionDetails[0])[h]){
                            var boardAmount=true;
                        }
                    }
            if(AvailableBalance>=parseFloat(transactionAmount)){
                var maxTransactionlimit=kony.mvc.MDAApplication.getSharedInstance().appContext.getMerchantPaymentCharges.maxTransactionLimit;
                    if(maxTransactionlimit!=null && maxTransactionlimit!=""&& maxTransactionlimit!=undefined){
                if(parseFloat(transactionAmount)<=parseFloat(kony.mvc.MDAApplication.getSharedInstance().appContext.getMerchantPaymentCharges.maxTransactionLimit)){
                Payload = {
                    "payeeNickName":merchantInfo.labelText,
                    "payeeId":merchantInfo.code,
                    "paymentAggregator": applicationManager.getNavigationManager().getCustomInfo("PaymentAggregatorType"),
                    "connectionNo": response.connectionNo,
                    "customerNo":response.customerNo,
                    "module":boardAmount? "Board Payment":"KUKL Payment",
                    "amount": transactionAmount,
					"fromAccountNumber": AccDetails.accountID,
                    "transactionCurrency": "NPR",
                    "serviceCharge": ServiceChargePayload,
                    "transactionAmount": applicationManager.getNavigationManager().getCustomInfo("TextboxenteredValues"),
                    "transactionType": "BillPay",
                    "serviceName": "BILL_PAY_CREATE",
                    "frequencyType": "Once",
                    "scheduledDate":currentBankDate,
					"notes": notes,
					"merchantName":merchantInfo.labelText,
					"merchantCode":merchantInfo.code
                };
                var presenter = applicationManager.getModulesPresentationController({
                    'appName': 'BillPayMA',
                    'moduleName': 'BillPaymentUIModule'
                });
                    presenter.confirmBillPayCallKUKL(Payload);
        }
                else{
                    applicationManager.getNavigationManager().updateForm({
                        "maxTransactionLimitExceed": "true"
                        }, "frmOneTimePaymentConfirm");
                }
            }
            else{
                Payload = {
                    "payeeNickName":merchantInfo.labelText,
                    "payeeId":merchantInfo.code,
                    "paymentAggregator": applicationManager.getNavigationManager().getCustomInfo("PaymentAggregatorType"),
                    "connectionNo": response.connectionNo,
                    "customerNo":response.customerNo,
                    "module":"",
                    "amount": transactionAmount,
					"fromAccountNumber": AccDetails.accountID,
                    "transactionCurrency": "NPR",
                    "serviceCharge": ServiceChargePayload,
                    "transactionAmount":applicationManager.getNavigationManager().getCustomInfo("TextboxenteredValues"),
                    "transactionType": "BillPay",
                    "serviceName": "BILL_PAY_CREATE",
                    "frequencyType": "Once",
                    "scheduledDate":currentBankDate,
					"notes": notes,
					"merchantName":merchantInfo.labelText,
					"merchantCode":merchantInfo.code
                };
                var presenter = applicationManager.getModulesPresentationController({
                    'appName': 'BillPayMA',
                    'moduleName': 'BillPaymentUIModule'
                });
                    presenter.confirmBillPayCallKUKL(Payload);
            }
            }
            else{
                applicationManager.getNavigationManager().updateForm({
                    "InsufficientBalance": "true"
                    }, "frmOneTimePaymentConfirm");
            }
        },
        postShow: function() {
            // this.view.btnconfirm.skin="sknBtnNormalSSPFFFFFF15pxradius6";
            // this.view.btnconfirm.hoverSkin="sknBtnNormalSSPFFFFFF15pxradius6";
            // this.view.btnconfirm.focusSkin="sknBtnNormalSSPFFFFFF15pxradius6";
            if(kony.application.getCurrentBreakpoint() == 640){
            this.view.btnconfirm.width="95%";
            this.view.btnconfirm.top="20dp";
            }
            this.view.segDropdown.skin="seg2Normal2";
            this.view.btnModify.skin="sknBtnBorderPx2eaebf1";
            this.view.btnModify.hoverSkin="SknbtnroundcornerA51C306pxradius";
            this.view.btnModify.focusSkin="sknBtnBorderPx2eaebf1";
            this.view.btnCancel.skin="SknbtnroundcornerA51C306pxradius";
            this.view.btnCancel.hoverSkin="sknBtnNormalSSPFFFFFF15pxradius6";
            this.view.btnCancel.focusSkin="SknbtnroundcornerA51C306pxradius";
            this.view.flxConfirmBillPayDetails.skin="slFbox";
            this.view.txtboxNotes.skin="skntbxroundborderhbl";
            this.view.flxMain.skin="flxWhite";
            this.view.lblConfirmBillPay.skin="sknLbl851a1cPx20";
            this.view.lblHeadingDetails.skin="sknSSPSemiBold42424215px";
            this.view.flxMainContainer.skin="sknFlxffffffBorderRoundedLeftRed";
            this.view.flxFooter.top="25px";
            this.view.flxMainContainer.width="95%";
            this.view.flxMainContainer.left="2.5%";
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            applicationManager.getNavigationManager().applyUpdates(this);
            this.setAccessibiliyValues();
            this.view.CustomPopup.doLayout = CommonUtilities.centerPopupFlex;
            this.view.CancelPopup.doLayout = CommonUtilities.centerPopupFlex;
            this.view.flxTC.doLayout = CommonUtilities.centerPopupFlex;
            this.view.lblConfirmBillPay.text = "One-Time Bill Payment- Confirmation";
            this.view.lblConfirmBillPay.accessibilityConfig = {
                "a11yARIA": {
                    tabindex: -1
                }
            }
        },
        setAccessibiliyValues: function() {
            // this.view.flxImgCheckBox.accessibilityConfig = {
            //  "a11yLabel": "I accept all terms and conditions",
            //  a11yARIA: {
            //    "tabindex" : 0,
            //  "aria-checked": false,
            //  "role": "checkbox"
            // },
            // };
            this.view.flxTC.isModalContainer = true;
            this.view.flxTC.accessibilityConfig = {
                "a11yARIA": {
                    "role": "dialog",
                    "tabindex": -1,
                },
            };
            this.view.flxTC.flxClose.accessibilityConfig = {
                "a11yLabel": "Close this pop-up",
                a11yARIA: {
                    "tabindex": 0,
                    role: "button"
                },
            };
            this.view.flxTC.lblTermsAndConditions.accessibilityConfig = {
                "a11yARIA": {
                    "tabindex": -1,
                },
            };
            this.view.CancelPopup.btnYes.accessibilityConfig = {
                "a11yARIA": {
                    "tabindex": 0
                },
                "a11yLabel": "Yes, cancel this transaction"
            }
            this.view.CancelPopup.btnNo.accessibilityConfig = {
                "a11yARIA": {
                    "tabindex": 0,
                },
                "a11yLabel": "No, don't cancel this transaction"
            }
            this.view.CancelPopup.flxCross.accessibilityConfig = {
                "a11yARIA": {
                    "tabindex": 0,
                },
                "a11yLabel": "Close this pop-up"
            }
        },
        onKeyPressCallBack: function(eventObject, eventPayload) {
            var self = this;
            if (eventPayload.keyCode === 27) {
                if (self.view.flxLogout.isVisible === true) {
                    self.view.flxDialogs.isVisible = false;
                    self.view.flxLogout.isVisible = false;
                    self.view.customheadernew.btnLogout.setActive(true);
                } else if (self.view.flxCancelPopup.isVisible === true) {
                    self.view.flxDialogs.isVisible = false;
                    self.view.flxCancelPopup.isVisible = false;
                    self.view.btnCancel.setFocus(true);
                }
            }
        },
        onTCKeyPressCallBack: function(eventObject, eventPayload) {
            var self = this;
            if (eventPayload.keyCode === 27) {
                if (self.view.flxTermsAndConditionsPopUp.isVisible === true) {
                    self.view.flxDialogs.isVisible = false;
                    self.view.flxTermsAndConditionsPopUp.isVisible = false;
                    self.view.btnTermsAndConditions.setActive(true);
                }
            }
        },
        /**
         * bind one time billPay Data values
         * @param {object} data
         */
        bindSingleBillPayData: function(data) {
            var scopeObj = this;
            var transactionCurrency = applicationManager.getFormatUtilManager().getCurrencySymbol(data.transactionCurrency);
            if (data.statusOfDefaultAccountSetUp === true) {
                scopeObj.view.flxWarning.setVisibility(true);
                CommonUtilities.setText(this.view.lblWarning, data.defaultAccountBillPay + kony.i18n.getLocalizedString("i18n.billPay.setDefaultPopUpConfirmBillPayee"), CommonUtilities.getaccessibilityConfig());
            } else {
                scopeObj.view.flxWarning.setVisibility(false);
            }
            // this.view.imgCloseWarning.onTouchEnd = function() {
            //     scopeObj.view.flxWarning.setVisibility(false);
            //     scopeObj.view.forceLayout();
            // };
            this.view.flxCloseWarning.onClick = function() {
                scopeObj.view.flxWarning.setVisibility(false);
                scopeObj.view.forceLayout();
            };
            CommonUtilities.setText(scopeObj.view.lblFromValue, data.payFrom, CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.lblToValue, data.payeeName, CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.lblAmountKey, kony.i18n.getLocalizedString("i18n.transfers.lblAmount") + "(" + transactionCurrency + ")" + ":", CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.lblAmountValue, data.amount, CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.lblPaymentDateValue, data.sendOn, CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.lblDeliverByValue, data.deliveryDate, CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.lblFrequencyValue, data.frequencyType, CommonUtilities.getaccessibilityConfig());
            if (data.notes === "") {
                data.notes = "None";
            }
            CommonUtilities.setText(scopeObj.view.lblNotesValue, data.notes, CommonUtilities.getaccessibilityConfig());
            //if(applicationManager.getConfigurationManager().isCombinedUser === "true"){
            if (this.profileAccess === "both") {
                this.view.flxFromIcon.setVisibility(true);
                //this.view.flxToIcon.setVisibility(true);
                //this.view.lblToIcon.setVisibility(true);
                this.view.lblFromIcon.setVisibility(true);
                this.view.lblFromIcon.text = scopeObj.presenter.isBusinessAccount(data.fromAccountNumber) === "true" ? "r" : "s";
            }
            CommonUtilities.enableButton(scopeObj.view.btnConfirm);
            scopeObj.view.btnCancel.onClick = function() {
                scopeObj.showCancelPopup();
            };
            /*scopeObj.view.btnModify.onClick = function() {
                kony.mvc.getNavigationManager().navigate({
                    context: this,
                    callbackModelConfig: {
                        oneTimePayment: true
                    }
                });
            }.bind(this);*/
            //scopeObj.view.btnModify.onClick=this.NavigatetoPrevScreen.bind(this);
            scopeObj.view.btnConfirm.onClick = function() {
                FormControllerUtility.showProgressBar(this.view);
                var presenter = applicationManager.getModulesPresentationController({
                    'appName': 'BillPayMA',
                    'moduleName': 'BillPaymentUIModule'
                });
                var payload = applicationManager.getNavigationManager().setCustomInfo("Bilpayload")
                if (Object.keys(payload).length != 0) {
                presenter.confirmBillPayCall(payload);
            }
                /* if ((data.gettingFromOneTimePayment && CommonUtilities.isCSRMode()) || (data.isScheduleEditFlow && CommonUtilities.isCSRMode())) {
                    scopeObj.viewbtnConfirm.skin = CommonUtilities.disableButtonSkinForCSRMode();
                    scopeObj.view.btnConfirm.hoverSkin = CommonUtilities.disableButtonSkinForCSRMode();
                    scopeObj.view.btnConfirm.focusSkin = CommonUtilities.disableButtonSkinForCSRMode();
                } else {
                    FormControllerUtility.showProgressBar(this.view);
                    data.languageAmount = data.amount;
                    var deformatedAmount = this.deformatAmount(data.amount);
                    data.amount = deformatedAmount;
                    scopeObj.presenter.checkMFAForOneTimePayment(data);
                }*/
            }.bind(this);
            scopeObj.view.flxContent.forceLayout();
        },
        NavigatetoPrevScreen:function(){
            var flowTypePrev="Back";
            applicationManager.getNavigationManager().setCustomInfo("flowTypePrev",flowTypePrev);
            var navMan = applicationManager.getNavigationManager();
            navMan.navigateTo({
                "appName": "BillPayMA",
                "friendlyName": "frmBillPayNew"
            });
            //applicationManager.getNavigationManager().updateForm({
              //  "returningfromconfirmationscreen": flowTypePrev
            //}, "frmBillPayNew");
        },
        NavigatetoPreviousScreen:function(res){
            var flowTypePrev="Back"
            applicationManager.getNavigationManager().setCustomInfo("flowTypePrev",flowTypePrev);
            var navMan = applicationManager.getNavigationManager();
            navMan.navigateTo({
                "appName": "BillPayMA",
                "friendlyName": "frmBillPayNew"
            });
            applicationManager.getNavigationManager().updateForm({
                "confirmBillPayErr": res
                }, "frmBillPayNew");
    },
    NavigatetoPreviousScreenwithError: function(res) {
        var flowTypePrev = "Back"
        applicationManager.getNavigationManager().setCustomInfo("flowTypePrev", flowTypePrev);
        var navMan = applicationManager.getNavigationManager();
        navMan.navigateTo({
            "appName": "BillPayMA",
            "friendlyName": "frmBillPayNew"
        });
        applicationManager.getNavigationManager().updateForm({
            "InsufficientBalance": res
        }, "frmBillPayNew");
    },
    maxTransactionLimitExceedError: function(res) {
        var flowTypePrev = "Back"
        applicationManager.getNavigationManager().setCustomInfo("flowTypePrev", flowTypePrev);
        var navMan = applicationManager.getNavigationManager();
        navMan.navigateTo({
            "appName": "BillPayMA",
            "friendlyName": "frmBillPayNew"
        });
        applicationManager.getNavigationManager().updateForm({
            "maxTransactionLimitExceedError": res
        }, "frmBillPayNew");
    },
    NavigatetoPreviousScreenwithPinError: function(res) {
        var flowTypePrev = "Back"
        applicationManager.getNavigationManager().setCustomInfo("flowTypePrev", flowTypePrev);
        var navMan = applicationManager.getNavigationManager();
        navMan.navigateTo({
            "appName": "BillPayMA",
            "friendlyName": "frmBillPayNew"
        });
        applicationManager.getNavigationManager().updateForm({
            "PinError": res
        }, "frmBillPayNew");
    },
        /**
         * used to get the amount
         * @param {number} amount amount
         * @returns {number} amount
         */
        deformatAmount: function(amount) {
            return applicationManager.getFormatUtilManager().deFormatAmount(amount);
        },
        /**
         * used to bind Terms and condition data on Activation screen
         * @param {object} TnCcontent bill pay supported sccounts
         */
        bindTnCData: function(TnCcontent) {
            var scopeObj = this;
            if (TnCcontent.alreadySigned) {
                scopeObj.view.flxCheckBoxTnC.setVisibility(false);
            } else {
                //CommonUtilities.disableButton(scopeObj.view.btnConfirm);
                scopeObj.view.imgCheckBox.text = "D";
                scopeObj.view.imgCheckBox.skin = "skn0273e320pxolbfonticons";
                scopeObj.view.flxImgCheckBox.onClick = this.toggleCheckBox.bind(scopeObj);
                scopeObj.view.flxCheckBoxTnC.setVisibility(true);
                if (TnCcontent.contentTypeId === OLBConstants.TERMS_AND_CONDITIONS_URL) {
                    scopeObj.view.btnTermsAndConditions.onClick = function() {
                        window.open(TnCcontent.termsAndConditionsContent);
                    }
                } else {
                    scopeObj.view.btnTermsAndConditions.onClick = function() {
                        scopeObj.view.flxDialogs.setVisibility(true);
                        scopeObj.view.flxTermsAndConditionsPopUp.setVisibility(true);
                        scopeObj.view.flxTermsAndConditionsPopUp.lblTermsAndConditions.setActive(true);
                    };
                    scopeObj.view.rtxTC.text = TnCcontent.termsAndConditionsContent;
                    /*  if (document.getElementById("iframe_brwBodyTnC").contentWindow.document.getElementById("viewer")) {
                        document.getElementById("iframe_brwBodyTnC").contentWindow.document.getElementById("viewer").innerHTML = TnCcontent.termsAndConditionsContent;
                        } else {
                        if (!document.getElementById("iframe_brwBodyTnC").newOnload) {
                            document.getElementById("iframe_brwBodyTnC").newOnload = document.getElementById("iframe_brwBodyTnC").onload;
                        }
                        document.getElementById("iframe_brwBodyTnC").onload = function () {
                            document.getElementById("iframe_brwBodyTnC").newOnload();
                            document.getElementById("iframe_brwBodyTnC").contentWindow.document.getElementById("viewer").innerHTML = TnCcontent.termsAndConditionsContent;
                        };
                        } */
                }
                scopeObj.view.flxClose.onClick = function() {
                    scopeObj.view.flxDialogs.setVisibility(false);
                    scopeObj.view.flxTermsAndConditionsPopUp.setVisibility(false);
                    scopeObj.view.btnTermsAndConditions.setActive(true);
                };
            }
        },
        /**
         * used to toggle checkbox and confirm button
         */
        toggleCheckBox: function() {
            var scopeObj = this;
            if (scopeObj.view.imgCheckBox.text === "D") {
                scopeObj.view.imgCheckBox.text = "C";
                scopeObj.view.imgCheckBox.skin = "sknFontIconCheckBoxSelected";
                this.view.flxImgCheckBox.accessibilityConfig = {
                    "a11yLabel": "I accept all terms and conditions",
                    a11yARIA: {
                        "tabindex": 0,
                        "aria-checked": true,
                        "role": "checkbox"
                    },
                };
                CommonUtilities.enableButton(scopeObj.view.btnConfirm);
            } else {
                scopeObj.view.imgCheckBox.text = "D";
                scopeObj.view.imgCheckBox.skin = "skn0273e320pxolbfonticons";
                this.view.flxImgCheckBox.accessibilityConfig = {
                    "a11yLabel": "I accept all terms and conditions",
                    a11yARIA: {
                        "tabindex": 0,
                        "aria-checked": false,
                        "role": "checkbox"
                    },
                };
                //  CommonUtilities.disableButton(scopeObj.view.btnConfirm);
            }
            scopeObj.view.flxImgCheckBox.setActive(true);
        },
        /**
         * show or hide cancel popup
         */
        showCancelPopup: function() {
            var scopeObj = this;
            scopeObj.view.flxDialogs.setVisibility(true);
            scopeObj.view.flxCancelPopup.setVisibility(true);
            scopeObj.view.CancelPopup.btnYes.onClick = function() {
                scopeObj.view.flxDialogs.setVisibility(false);
                scopeObj.view.flxCancelPopup.setVisibility(false);
                scopeObj.presenter.showBillPaymentScreen({
                    context: "BulkPayees",
                    loadBills: true
                });
            };
            scopeObj.view.CancelPopup.btnNo.onClick = function() {
                scopeObj.view.flxDialogs.setVisibility(false);
                scopeObj.view.flxCancelPopup.setVisibility(false);
                scopeObj.view.btnCancel.setFocus(true);
            };
            scopeObj.view.CancelPopup.flxCross.onClick = function() {
                scopeObj.view.flxDialogs.setVisibility(false);
                scopeObj.view.flxCancelPopup.setVisibility(false);
                scopeObj.view.btnCancel.setFocus(true);
            };
            scopeObj.view.CancelPopup.lblHeading.setActive(true);
        },
        setWebViewData:function(res){
            this.view.flxAmount.setVisibility(false);
            this.view.flxExchangeRate.setVisibility(false);
            this.view.flxFrom.setVisibility(false);
            var navManager = applicationManager.getNavigationManager();
            navManager.setCustomInfo("WebViewRes", res);
            this.view.flxConfirmBillpayData.height="30dp";
            this.view.flxConfirmBillWebViewData.setVisibility(true);
            this.view.flxConfirmBillDataNew.setVisibility(false);
            this.view.flxSenderDetails.setVisibility(true);
            this.view.flxContent.setVisibility(true);
            this.view.txtboxNotes.text="";
            this.view.flxConfirmBillDataNew.removeAll();
            var amountValue=JSON.parse(res.npiObjectData).cipsTransactionDetail.amount;
            var charge=JSON.parse(res.npiObjectData).cipsTransactionDetail.chargeLiability;
            if(charge=="CG"){
                charge=JSON.parse(res.npiObjectData).cipsTransactionDetail.chargeAmount;
            }
            else{
                charge=0;
            }
            this.view.lblDeliverByValue.text = "NPR "+this.convertAmountValue(charge);
            var totalDebitAmount=parseFloat(charge)+amountValue;
            var totalFee=parseFloat(charge);
           // var feeArray=kony.mvc.MDAApplication.getSharedInstance().appContext.getMerchantPaymentCharges.paymentCharges;
        //     if(feeArray.length>0){
        //         var count=0;
        //     for(i=0;i<feeArray.length;i++){
        //         if(amountValue>=parseFloat(feeArray[i].minAmount) && amountValue<=parseFloat(feeArray[i].maxAmount)){
        //             count=1;
        //             var fees =feeArray[i].fee ? feeArray[i].fee : "NA";
        //             if (fees != "NA") {
        //                 //this.view.lblDeliverByValue.text = "NPR " + fees;
        //                 this.view.lblDeliverByValue.text = "NPR "+this.convertAmountValue(fees);
        //                 //this.view.lblDeliverByValue.text=CommonUtilities.formatCurrencyWithCommas(fees, false, "NPR");
        //             }
        //             else{
        //             this.view.lblDeliverByValue.text="NA";
        //             }
        //             if(fees!="NA"){
        //             var totalDebitAmount=parseFloat(feeArray[i].fee)+amountValue;
        //             var totalFee=parseFloat(feeArray[i].fee);
        //             }
        //             if(fees=="NA"){
        //             var totalDebitAmount=amountValue;
        //             var totalFee="NA";
        //             }
        //         }
        //     }
        //     if(count==0){
        //             this.view.lblDeliverByValue.text="NA";
        //             var totalDebitAmount=amountValue;
        //             var totalFee=0;
        //         }
        //     if(amountValue<=0){
        //         this.view.lblDeliverByValue.text="NPR 0";
        //         var totalDebitAmount = amountValue;
        //             var totalFee = 0;
        //     }
        // }
        // else{
        //     this.view.lblDeliverByValue.text="NA";
        //     var totalDebitAmount=amountValue;
        //     var totalFee=0;
        // }
        var merchantInfo = applicationManager.getNavigationManager().getCustomInfo("Biller_Code");
        //this.view.lblFrequencyValue.text = "NPR " + totalDebitAmount;
        this.view.lblFrequencyValue.text ="NPR "+this.convertAmountValue(totalDebitAmount);
        //CommonUtilities.formatCurrencyWithCommas(totalDebitAmount, false,"NPR" );
            this.view.lblToValue.text=merchantInfo.labelText;
            applicationManager.getNavigationManager().setCustomInfo("totalDebitAmount",totalDebitAmount);
            applicationManager.getNavigationManager().setCustomInfo("totalFee",totalFee);
            this.view.flxConfirmBillWebViewData.removeAll();
            this.setSenderAccountData();
            this.view.flxConfirmBillDataNew.height=kony.flex.USE_PREFERED_SIZE;
            var nofRows=JSON.parse(res.npiObjectData).fieldLabelMapping.length;
                for (var i = 0; i < nofRows; i++) {
                    //var c=JSON.parse(res).fieldLabelMapping[i].mapField;
                    for(var j=0;j<Object.keys(JSON.parse(res.npiObjectData).cipsTransactionDetail).length;j++){
                        if(JSON.parse(res.npiObjectData).fieldLabelMapping[i].mapField==Object.keys(JSON.parse(res.npiObjectData).cipsTransactionDetail)[j]){
                    var flexRow = new kony.ui.FlexContainer({
                        "id": "flxRowWebView" + JSON.parse(res.npiObjectData).fieldLabelMapping[i].mapField,
                        "left": "0dp",
                        "top": "10dp",
                        "width": "100%",
                        //         "height": kony.flex.USE_PREFERRED_SIZE,
                        //"height": (i==nofRows-1)?"60dp":"20dp",
                        "height": "20dp",
                        "zIndex": 10,
                        "isVisible": true,
                        "skin": "sknflx",
                        "clipBounds": false,
                        "layoutType": kony.flex.FLOW_HORIZONTAL
                    });
                    var labelWidget = new kony.ui.Label({
                        "id": "lblCategoryKey"+JSON.parse(res.npiObjectData).fieldLabelMapping[i].mapField,
                        "text":JSON.parse(res.npiObjectData).fieldLabelMapping[i].fieldLabel + " :",
                        "height": kony.flex.USE_PREFERED_SIZE,
                        "isVisible": true,
                        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                        "width": "25%",
                        "left": "10dp",
                        "right": "",
                        "top": "0dp",
                        "skin": "sknlblFontCol000000Sanproreg",
                        "zIndex": 1
                    });
                    if(JSON.parse(res.npiObjectData).fieldLabelMapping[i].mapField=="amount"){
                        var value="NPR " +this.convertAmountValue(Object.values(JSON.parse(res.npiObjectData).cipsTransactionDetail)[j]);
                    }else{
                    var value=Object.values(JSON.parse(res.npiObjectData).cipsTransactionDetail)[j];
                    }
                    var labelWidget2 = new kony.ui.Label({
                        "id": "lblvalue"+JSON.parse(res.npiObjectData).fieldLabelMapping[i].mapField,
                        "text":  value.toString(),
                        "height": kony.flex.USE_PREFERED_SIZE,
                        "isVisible": true,
                        "width": "35%",
                        "left": "0dp",
                        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                        "right": "",
                        "top": "0dp",
                        "skin": "sknlblFontCol000000Sanproreg",
                        "zIndex": 1
                    });
                    flexRow.add(labelWidget);
                    flexRow.add(labelWidget2);
                    this.view.flxConfirmBillWebViewData.add(flexRow);
                }
            }  
                }
        },
        convertAmountValue:function(amount){
            return parseFloat(amount).toLocaleString(kony.i18n.getCurrentDeviceLocale().name, {
            useGrouping: true,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
            });
        },
        createFieldsfortopUpNepal:function(MerchantFieldData){
            if (MerchantFieldData) {
                        for(var j=0;j<Object.keys(MerchantFieldData).length;j++){
                        // Create a new FlexContainer for each row
                        //if(Object.keys((MerchantFieldData))[j]=="Amount(NPR)" || Object.keys((MerchantFieldData))[j]=="amount(NPR)"){
                          //  Object.keys((MerchantFieldData))[j]="Amount"
                        //}
                        var flexRow = new kony.ui.FlexContainer({
                            "id": "flxRow" + Object.keys((MerchantFieldData))[j].replaceAll(' ', ''),
                            "left": "0dp",
                            "top": "10dp",
                            "width": "100%",
                            //         "height": kony.flex.USE_PREFERRED_SIZE,
                            //"height": (i==nofRows-1)?"60dp":"20dp",
                            "height": "20dp",
                            "zIndex": 10,
                            "isVisible": true,
                            "skin": "sknflx",
                            "clipBounds": false,
                            "layoutType": kony.flex.FLOW_HORIZONTAL
                        });
                        var labelWidget = new kony.ui.Label({
                            "id": "lblCategoryKeylabel"+Object.keys((MerchantFieldData))[j].replaceAll(' ', ''),
                            "text":Object.keys((MerchantFieldData))[j] + " :",
                            "height": kony.flex.USE_PREFERED_SIZE,
                            "isVisible": true,
                            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                            "width": "25%",
                            "left": "10dp",
                            "right": "",
                            "top": "5dp",
                            "skin": "sknlblFontCol000000Sanproreg",
                            "zIndex": 1
                        });
                        if(Object.keys((MerchantFieldData))[j].toLowerCase()=="amount"){
                        var value="NPR " +this.convertAmountValue(Object.values((MerchantFieldData))[j]);
                    }else{
                    var value=Object.values((MerchantFieldData))[j];
                    }
                        var labelWidget2 = new kony.ui.Label({
                            "id": "lblvaluelabel"+Object.values((MerchantFieldData))[j].replace(/-/g, "").replaceAll(" ", ""),
                            "text":value.toString() ? value.toString() : "NA",
                            "height": kony.flex.USE_PREFERED_SIZE,
                            "isVisible": true,
                            "width": "35%",
                            "left": "0dp",
                            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                            "right": "",
                            "top": "5dp",
                            "skin": "sknlblFontCol000000Sanproreg",
                            "zIndex": 1
                        });
                        // Add the FlexContainer to the form
                        this.view.flxConfirmBillDataNew.add(flexRow);
                        flexRow.add(labelWidget);
                        flexRow.add(labelWidget2);
                }
        }
        },
        setResponseFieldforTopupNepal:function(MerchantFieldData){
                this.view.flxFrom.setVisibility(true);
                this.view.flxExchangeRate.setVisibility(false);
                this.view.txtboxNotes.text="";
                this.view.flxConfirmBillpayData.height="50dp";
                this.view.flxConfirmBillWebViewData.setVisibility(false);
                this.view.flxConfirmBillDataNew.setVisibility(true);
                this.view.flxContent.setVisibility(true);
                this.view.flxConfirmBillDataNew.removeAll();
                this.view.flxConfirmBillDataNew.height=kony.flex.USE_PREFERED_SIZE;
                var navMan = applicationManager.getNavigationManager();
                this.view.lblFromValue.text=navMan.getCustomInfo("SelectedAccountData");
                this.getAmountValueBasedOnAggregator();
                this.createFieldsfortopUpNepal(MerchantFieldData);
        },
            setResponseField: function() {
                this.view.flxFrom.setVisibility(true);
                this.view.flxExchangeRate.setVisibility(true);
                this.view.txtboxNotes.text="";
                this.view.flxConfirmBillpayData.height="50dp";
                var navMan = applicationManager.getNavigationManager();
                var MerchantFieldData=navMan.getCustomInfo("getCustomerBillInfoResponse");
                this.view.flxConfirmBillWebViewData.setVisibility(false);
                this.view.flxConfirmBillDataNew.setVisibility(true);
                this.view.flxContent.setVisibility(true);
                this.view.flxConfirmBillDataNew.removeAll();
                this.view.flxConfirmBillDataNew.height=kony.flex.USE_PREFERED_SIZE;
                this.view.lblFromValue.text=navMan.getCustomInfo("SelectedAccountData");
                this.getAmountValueBasedOnAggregator();
                var nofRows;
                if (MerchantFieldData) {
                    nofRows = Object.keys(JSON.parse(MerchantFieldData.responseFieldMapping)).length;
                    for (var i = 0; i < nofRows; i++) {
                            for(var j=0;j<Object.keys(MerchantFieldData.billInfo[0].transactionDetails[0]).length;j++){
                                if(Object.keys(JSON.parse(MerchantFieldData.responseFieldMapping))[i]==Object.keys(MerchantFieldData.billInfo[0].transactionDetails[0])[j]){
                        // Create a new FlexContainer for each row
                        var flexRow = new kony.ui.FlexContainer({
                            "id": "flxRow" + Object.keys(JSON.parse(MerchantFieldData.responseFieldMapping))[i],
                            "left": "0dp",
                            "top": "10dp",
                            "width": "100%",
                            //         "height": kony.flex.USE_PREFERRED_SIZE,
                            //"height": (i==nofRows-1)?"60dp":"20dp",
                            "height": "20dp",
                            "zIndex": 10,
                            "isVisible": true,
                            "skin": "sknflx",
                            "clipBounds": false,
                            "layoutType": kony.flex.FLOW_HORIZONTAL
                        });
                        var labelWidget = new kony.ui.Label({
                            "id": "lblCategoryKeylabel"+Object.keys(JSON.parse(MerchantFieldData.responseFieldMapping))[i],
                            "text":Object.values(JSON.parse(MerchantFieldData.responseFieldMapping))[i] + " :",
                            "height": kony.flex.USE_PREFERED_SIZE,
                            "isVisible": true,
                            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                            "width": "25%",
                            "left": "10dp",
                            "right": "",
                            "top": "5dp",
                            "skin": "sknlblFontCol000000Sanproreg",
                            "zIndex": 1
                        });
                        var labelWidget2 = new kony.ui.Label({
                            "id": "lblvaluelabel"+Object.keys(JSON.parse(MerchantFieldData.responseFieldMapping))[i],
                            "text": Object.values(MerchantFieldData.billInfo[0].transactionDetails[0])[j] ? Object.values(MerchantFieldData.billInfo[0].transactionDetails[0])[j] : "NA",
                            "height": kony.flex.USE_PREFERED_SIZE,
                            "isVisible": true,
                            "width": "35%",
                            "left": "0dp",
                            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                            "right": "",
                            "top": "5dp",
                            "skin": "sknlblFontCol000000Sanproreg",
                            "zIndex": 1
                        });
                        // Add the FlexContainer to the form
                        this.view.flxConfirmBillDataNew.add(flexRow);
                        flexRow.add(labelWidget);
                        flexRow.add(labelWidget2);
                    }
                }
            }
        }
    },
    getAmountValueforNEA:function(MerchantFieldData){
            this.view.flxAmount.setVisibility(true);
            this.view.lblAmountValue.text="NPR "+this.convertAmountValue(parseFloat(MerchantFieldData.billInfo[0].totaldueamount));
             //var amountValue = parseFloat(MerchantFieldData.billInfo[0].totaldueamount) + parseFloat(MerchantFieldData.billInfo[0].servicecharge);
             var amountValue = applicationManager.getNavigationManager().getCustomInfo("TextboxenteredValues");
             this.view.lblPaymentDateValue.text="NPR "+this.convertAmountValue(applicationManager.getNavigationManager().getCustomInfo("TextboxenteredValues"));
             return amountValue;
    },
    getAmountValueforKUKL:function(){
        this.view.flxAmount.setVisibility(false);
            var transactionAmount=applicationManager.getNavigationManager().getCustomInfo("TextboxenteredValues");
            var amountValue=transactionAmount;
            this.view.lblPaymentDateValue.text="NPR "+this.convertAmountValue(applicationManager.getNavigationManager().getCustomInfo("TextboxenteredValues"));
            return amountValue;
    },
    getAmountValuefortopUpNepal: function() {
            var MerchantCode = applicationManager.getNavigationManager().getCustomInfo("MerchantCode");
            this.view.flxAmount.setVisibility(false);
            if (MerchantCode == "TOP-UP-NEPAL-MOBILE") {
                //this.view.lblAmountKey.text = "Connection";
                this.view.flxAmount.setVisibility(false);
                //this.view.lblAmountValue.text = applicationManager.getNavigationManager().getCustomInfo("connectionType");
            } else if (MerchantCode == "TOP-UP-NEPAL_INTERNET") {
                this.view.flxAmount.setVisibility(false);
            } else if (MerchantCode == "TOP-UP-NEPAL-LANDLINE") {
                var Action="NTCPSTN";
                var connectionType="NTC Landline";
                applicationManager.getNavigationManager().setCustomInfo("ActionTypeValue",Action);
                applicationManager.getNavigationManager().setCustomInfo("connectionType",connectionType);
                this.view.flxAmount.setVisibility(false);
            }
            var fieldValues = applicationManager.getNavigationManager().getCustomInfo("fieldValues");
            for (i = 0; i < Object.keys(fieldValues).length; i++) {
                if (Object.keys(fieldValues)[i] == "Amount" || Object.keys(fieldValues)[i] == "Amount(NPR)" || Object.keys(fieldValues)[i] == "amount") {
                    var amountValue = Object.values(fieldValues)[i];
                }
            }
            //var amountValue=transactionAmount.;
            this.view.lblPaymentDateValue.text = "NPR " + this.convertAmountValue(amountValue);
            return amountValue;
        },
    getAmountValueBasedOnAggregator:function(){
        var paymentAggregator=applicationManager.getNavigationManager().getCustomInfo("PaymentAggregatorType");
        var navMan = applicationManager.getNavigationManager();
        var MerchantFieldData=navMan.getCustomInfo("getCustomerBillInfoResponse");
        if(paymentAggregator=="NEA"){
            var amountValue=this.getAmountValueforNEA(MerchantFieldData);
        }
        if(paymentAggregator=="KUKL"){
            var amountValue=this.getAmountValueforKUKL();
        }
        if (paymentAggregator == "TOP-UP-NEPAL") {
            var amountValue=this.getAmountValuefortopUpNepal();
            }
        this.calculateFeeOnTransactionAmount(amountValue);
    },
        calculateFeeOnTransactionAmount:function(amountValue){
            var feeArray=kony.mvc.MDAApplication.getSharedInstance().appContext.getMerchantPaymentCharges.paymentCharges;
            if(feeArray.length>0){
                var count=0;
                for(i=0;i<feeArray.length;i++){
                    if(parseFloat(amountValue)>=parseFloat(feeArray[i].minAmount) && parseFloat(amountValue)<=parseFloat(feeArray[i].maxAmount)){
                        count=1;
                        var fees =feeArray[i].fee ? feeArray[i].fee : "NA";
                        if (fees != "NA") {
                            this.view.lblDeliverByValue.text = "NPR "+this.convertAmountValue(fees);
                        }
                        else{
                        this.view.lblDeliverByValue.text="NA";
                        }
                        var totalDebitAmount=(parseFloat(feeArray[i].fee)+parseFloat(amountValue));
                        var totalFee=parseFloat(feeArray[i].fee);
                    }
                }
                if(count==0){
                    this.view.lblDeliverByValue.text="NA";
                    var totalDebitAmount=amountValue;
                    var totalFee=0;
                }
                if(parseFloat(amountValue)<=0){
                    this.view.lblDeliverByValue.text="NPR 0";
                    var totalDebitAmount = parseFloat(amountValue);
                        var totalFee = 0;
                }
                var totalTransactionAmount = totalFee + parseFloat(amountValue);
            }
            else{
                this.view.lblDeliverByValue.text="NA";
                var totalDebitAmount=parseFloat(amountValue);
                var totalFee=0;
                var totalTransactionAmount = parseFloat(amountValue);
            }
                var merchantInfo= applicationManager.getNavigationManager().getCustomInfo("Biller_Code");
                this.view.lblToValue.text = merchantInfo.labelText;
                this.view.lblFrequencyValue.text ="NPR "+this.convertAmountValue(totalTransactionAmount);
                applicationManager.getNavigationManager().setCustomInfo("totalDebitAmount",totalDebitAmount);
                applicationManager.getNavigationManager().setCustomInfo("totalFee",totalFee);
        },
    };
    });