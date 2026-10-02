/**
 * Description of Module representing a Confirm form.
 * @module frmBulkPayeesController
 */

define(['CommonUtilities', 'OLBConstants', 'ViewConstants', 'FormControllerUtility'], function(CommonUtilities, OLBConstants, ViewConstants, FormControllerUtility) {
    var orientationHandler = new OrientationHandler();
    var fromAccounts;
    var segLastRowClicked =null;
    return /** @alias module:frmBulkPayeesController */ {
        /** updates the present Form based on required function.
         * @param {uiDataMap[]} uiDataMap
         */
        updateFormUI: function(uiDataMap) {
            if (uiDataMap.isLoading) {
                FormControllerUtility.showProgressBar(this.view);
            }
            if (!uiDataMap.isLoading) {
                FormControllerUtility.hideProgressBar(this.view);
            }
            if (uiDataMap.serverError) {
                this.setServerError(uiDataMap.serverError);
            } else {
                this.view.flxDowntimeWarning.setVisibility(false);
            }
            if (uiDataMap.selectedBeneficiaries) {
                this.setSelectedBeneficiariesData(uiDataMap);
            }
        },
        init: function() {
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function() {};
            this.view.onBreakpointChange = this.onBreakpointChange;
            this.presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PayMultipleBeneficiariesUIModule").presentationController;
            this.initActions();
        },
        preShow: function() {
            this.view.customheadernew.activateMenu("Bill Pay", "Pay a Bill");
            var self = this;
            this.view.btnBulkConfirm.onClick = this.onContinueClicked;
            var data = this.view.segmentBillpay.data;
            if (data) {
                this.calculateTotalAmount();
            }
            // this.view.btnBulkConfirm.toolTip = kony.i18n.getLocalizedString("i18n.common.proceed");
            // this.view.btnBack.toolTip = kony.i18n.getLocalizedString("i18n.ProfileManagement.BACK");
            // this.view.btnProceed.toolTip = kony.i18n.getLocalizedString("i18n.common.yes");
            // this.view.btnCancel.toolTip = kony.i18n.getLocalizedString("i18n.common.no");
            this.view.flxLogout.onKeyPress = this.onKeyPressCallBack;
            this.view.flxCancelPopup.onKeyPress = this.onKeyPressCallBackSignOutPopup;
            this.view.customheadernew.btnSkipNav.onClick = function() {
                self.view.lblTransactions.setActive(true);
            }
        },
        /**
         * used perform the initialize activities.
         *
         */
        initActions: function() {
            var scopeObj = this;
            this.presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PayMultipleBeneficiariesUIModule").presentationController;
            this.view.flxAddABeneficiaryWrapper.onClick = function() {
                this.presenter.showPayMultipleBeneficiaries({
                    "showAddBeneficiary": true
                })
            }.bind(this);
            //scopeObj.setSorting();
        },
        /**
         * sorting configurations to beneficiaries
         */
        setSorting: function() {
            var scopeObj = this;
            scopeObj.beneficiaryNameSortMap = [{
                name: 'beneficiaryName',
                imageFlx: scopeObj.view.imgSortBeneficiaryName,
                clickContainer: scopeObj.view.flxBeneficiaryNameWrapper
            }];
            FormControllerUtility.setSortingHandlers(scopeObj.beneficiaryNameSortMap, scopeObj.onBeneficiaryNameClickHandler, scopeObj);
        },
        /**
         * Manage payee biller name sorting handler
         * @param {object} event
         * @param {object} data
         */
        onBeneficiaryNameClickHandler: function(event, data) {
            FormControllerUtility.showProgressBar(this.view);
            //this.presenter.manageBeneficiaryPagination(data);
        },
        /**
         * used to perform the post show activities
         *
         */
        postShow: function() {
            var scope = this;
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.frame.height - this.view.flxFooter.frame.height + "dp";
            applicationManager.getNavigationManager().applyUpdates(this);
            applicationManager.executeAuthorizationFramework(this);
            this.view.btnBypassBlock.onClick = function() {
                scope.view.flxAddBeneficiary.setActive(true);
            }
            this.view.CustomPopupCancel.doLayout = CommonUtilities.centerPopupFlex;
        },
        onKeyPressCallBack: function(eventObject, eventPayload) {
            var self = this;
            if (eventPayload.keyCode === 27) {
                if (self.view.flxLogout.isVisible === true) {
                    self.view.flxLogout.isVisible = false;
                    self.view.flxDialogs.isVisible = false;
                    //  self.view.customheadernew.btnLogout.setFocus(true);
                    self.view.customheadernew.onKeyPressCallBack(eventObject, eventPayload);
                }
            }
        },

        onKeyPressCallBackSignOutPopup: function(eventObject, eventPayload) {
            var self = this;
            if (eventPayload.keyCode === 27) {
                if (self.view.flxCancelPopup.isVisible === true) {
                    self.view.flxCancelPopup.isVisible = false;
                    self.view.flxDialogs.isVisible = false;
                    self.view.segmentBillpay.setActive(segLastRowClicked, -1, "flxBeneficiariesSelected.flxMainGroup.flxSubGroup.flxContent.flxdetails.flxAttachmentAndDelete.flxViewEBill.btnViewEBill");

                    //  self.view.customheadernew.btnLogout.setFocus(true);
                  //  self.view.customheadernew.onKeyPressCallBackSignOutPopup(eventObject, eventPayload);
                }
            }
        },
        showAddBeneficiaryFlx: function() {
            this.view.flxAddABeneficiaryWrapper.setVisibility(true);
        },
        hideAddBeneficiaryFlx: function() {
            this.view.flxAddABeneficiaryWrapper.setVisibility(false);
        },
        //UI Code
        /**
         * onBreakpointChange : Handles ui changes on .
         * @member of {frmConfirmtransferController}
         * @param {integer} width - current browser width
         * @return {}
         * @throws {}
         */
        onBreakpointChange: function(form, width) {
            var scope = this;
            this.view.CustomPopupLogout.onBreakpointChangeComponent(scope.view.CustomPopupLogout, width);
            this.view.CustomPopupCancel.onBreakpointChangeComponent(scope.view.CustomPopupCancel, width);
            FormControllerUtility.setupFormOnTouchEnd(width);
            this.view.customheadernew.onBreakpointChangeComponent(width);
            this.view.customfooternew.onBreakpointChangeComponent(width);
        },
        setServerError: function(errorMessage) {
            this.view.rtxDowntimeWarning.text = errorMessage;
            this.view.flxDowntimeWarning.setVisibility(true);
            this.view.flxFormContent.forceLayout();
        },
        hideErrorFlex: function() {
            this.view.flxDowntimeWarning.setVisibility(false);
        },
        setSelectedBeneficiariesData: function(data) {
            FormControllerUtility.showProgressBar(this.view);
            var scopeObj = this;
            beneficiariesData = data.selectedBeneficiaries;
            fromAccounts = data.fromAccounts;
            preferredFromAccount = this.presenter.getDefaultFromAccount();
            var dataMap = {
                "flxBeneficiariesSelected": "flxBeneficiariesSelected",
                "flxIdentifier": "flxIdentifier",
                "lblIdentifier": "lblIdentifier",
                "flxContent": "flxContent",
                "flxBillPayAllPayees": "flxBillPayAllPayees",
                "flxBillPayAllPayeesWrapper": "flxBillPayAllPayeesWrapper",
                "flxDropdown": "flxDropdown",
                "lblDropdown": "lblDropdown",
                "flxWrapper": "flxWrapper",
                "flxPayee": "flxPayee",
                "flxBill": "flxBill",
                "flxAmount": "flxAmount",
                "flxPayeeWrapper": "flxPayeeWrapper",
                "lblBeneficiaryName": "lblBeneficiaryName",
                "lblBankDetails": "lblBankDetails",
                "lblAccountName": "lblAccountName",
                "flxAmountDollar": "flxAmountDollar",
                "lblDollar": "lblDollar",
                "txtAmount": "txtAmount",
                "lblSeparator": "lblSeparator",
                "lblError": "lblError",
                "flxdetails": "flxdetails",
                "flxPayFrom": "flxPayFrom",
                "flxInstantTransfer": "flxInstantTransfer",
                "flxPaymentReference": "flxPaymentReference",
                "flxAttachmentAndDelete": "flxAttachmentAndDelete",
                "lblPayFrom": "lblPayFrom",
                "lstPayFrom": "lstPayFrom",
                "lblInstantTransfer": "lblInstantTransfer",
                "lblPaymentReference": "lblPaymentReference",
                "flxNotesValue": "flxNotesValue",
                "txtNotes": "txtNotes",
                "flxAttachDocuments": "flxAttachDocuments",
                "lblAttachment": "lblAttachment",
                "flxViewEBill": "flxViewEBill",
                "btnViewEBill": "btnViewEBill",
                "flxCheckbox": "flxCheckbox",
                "lblCheckbox": "lblCheckbox",
                "lblBankName": "lblBankName",
                "lblAccountNumber": "lblAccountNumber",
                "lblSeparatorBottom": "lblSeparatorBottom",
                "lblBankNameWithAccountNumber": "lblBankNameWithAccountNumber",
                "lblPaymentType": "lblPaymentType",
                "lblEndingBalance": "lblEndingBalance",
                "fromAccountCurrency": "fromAccountCurrency",
                "isInstantPayAvailable": "isInstantPayAvailable",
                "lblBeneficiaryName1": "lblBeneficiaryName1",
                "lblAccountName1": "lblAccountName1",
                "txtAmount1": "txtAmount1",
                "lblAmount1": "lblAmount1"
            };
            const specialCharactersSet = "!@#&*_'-~^|$%()+=}{][/|?,.><`:;\"\\";
            const alphabetsSet = "abcdefghijklmnopqrstuvwxyz";
            if (beneficiariesData.length > 0) {
                this.view.lblBeneficiariesSelected.text = beneficiariesData.length + " " + kony.i18n.getLocalizedString("i18n.Transfers.BeneficiariesSelected");
                var manageBeneficiaries = beneficiariesData.map(function(dataItem, index) {
                    var manageBeneficiary = {
                        "flxBeneficiariesSelected": {
                            "height": "80dp"
                        },
                        "flxdetails": {
                            "isVisible": false
                        },
                        "flxBillPayAllPayees": {
                            "height": "80dp"
                        },
                        "lblPayFrom": {
                            "text": kony.i18n.getLocalizedString("i18n.billPay.PayFrom")
                        },
                        "lblSeparatorBottom": {
                            "text": ""
                        },
                        "lblBeneficiaryName": {
                            "text": dataItem.lblBeneficiaryName
                        },
                        "lblBankDetails": {
                            "text": dataItem.lblBankNameWithAccountNumber
                        },
                        "lstPayFrom": {
                            "masterData": FormControllerUtility.getListBoxDataFromObjects(fromAccounts, "accountID", CommonUtilities.getAccountDisplayNameWithBalance),
                            "selectedKey": preferredFromAccount.accountID ? preferredFromAccount.accountID : fromAccounts[0].accountID,
                            "onSelection": scopeObj.setSelectedKeyValueForListbox.bind(this, index, fromAccounts)
                        },
                        "lblAccountName": {
                            "a11yLabel": "From" + " " + preferredFromAccount.accountID ? CommonUtilities.getAccountDisplayName(preferredFromAccount) : CommonUtilities.getAccountDisplayName(fromAccounts[0]),
                            "text": preferredFromAccount.accountID ? CommonUtilities.getAccountDisplayName(preferredFromAccount) : CommonUtilities.getAccountDisplayName(fromAccounts[0])
                        },
                        "lblDollar": applicationManager.getConfigurationManager().getCurrencyCode(),
                        "flxAttachDocuments": {
                            "onTouchStart": scopeObj.attachDocuments.bind(this)
                        },
                        "fromAccountCurrency": {
                            "text": preferredFromAccount.accountID ? preferredFromAccount.transactionCurrency || preferredFromAccount.currencyCode : fromAccounts[0].transactionCurrency || fromAccounts[0].currencyCode
                        },
                        "lblBankName": {
                            "text": dataItem.bankName
                        },
                        "lblAccountNumber": {
                            "text": dataItem.accountNumber
                        },
                        "lblBankNameWithAccountNumber": {
                            "text": dataItem.lblBankNameWithAccountNumber
                        },
                        "txtNotes": {
                            "placeholder": kony.i18n.getLocalizedString("i18n.transfers.optional")
                        },
                        "lblCheckbox": {
                            "text": "D",
                            "skin": dataItem.isInstantPayAvailable === true ? "sknlblDelete20px" : "sknFontIconCheckBoxDisabled",
                           // "onTouchStart": dataItem.isInstantPayAvailable === true ? scopeObj.toggleCheckbox.bind(this, index, fromAccounts) : function() {}
                        },
                        "flxCheckbox":{
                            "onClick" : dataItem.isInstantPayAvailable === true ? scopeObj.toggleCheckbox.bind(this, index, fromAccounts) : function() {},
                            "accessibilityConfig": {
                                "a11yLabel": "Instant Transfer",
                                "a11yARIA": {
                                    "tabindex": dataItem.isInstantPayAvailable === true ? 0 : -1,
                                    "aria-checked": false,
                                    "role": "checkbox",
                                }
                            }
                        },
                        "lblInstantTransfer": {
                            "text": kony.i18n.getLocalizedString("i18n.Transfers.InstantTransfer")
                        },
                        "lblPaymentReference": {
                            "text": kony.i18n.getLocalizedString("i18n.TransfersEur.PaymentReference")
                        },
                        "lblAttachment": {
                            "text": kony.i18n.getLocalizedString("i18n.TransfersEur.AttachSupportingDocuments")
                        },
                        "btnViewEBill": {
                            "text": kony.i18n.getLocalizedString("i18n.payments.backBeneficiaries"),
                            "onClick": scopeObj.deleteFromList.bind(this, index, fromAccounts)
                        },
                        "lblDropdown": {
                            "text": "O"
                        },
                        "lblSeparator": {
                            "isVisible": false
                        },
                        "txtAmount": {
                            "placeholder": kony.i18n.getLocalizedString("i18n.common.EnterAmount"),
                            "text": "",
                            "onTextChange": scopeObj.calculateTotalAmount.bind(this, index),
                            "restrictCharactersSet": specialCharactersSet.replace(',.', '') + alphabetsSet + alphabetsSet.toUpperCase()
                        },
                        "flxIdentifier": {
                            "skin": "sknFlxIdentifier",
                            "isVisible": false
                        },
                        "lblIdentifier": {
                            "skin": "sknffffff15pxolbfonticons"
                        },
                        "flxBeneficiariesWrapper": {
                            "height": "50dp",
                            "skin": "sknflxffffffnoborder"
                        },
                        "lblPaymentType": {
                            "text": kony.i18n.getLocalizedString("i18n.payments.Standard")
                        },
                        "lblEndingBalance": {
                            "text": applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(fromAccounts[0].availableBalance, applicationManager.getConfigurationManager().getCurrencyCode())
                        },
                        "flxDropdown": {
                            "accessibilityConfig": {
                                "a11yLabel": "show more details for" +" " + dataItem.lblBeneficiaryName,
                                "a11yARIA": {
                                    "role": "button",
                                    "aria-expanded": false
                                }
                            }
                        },
                        "lblBeneficiaryName1": {
                            "text": (kony.i18n.getLocalizedString("i18n.TransfersEur.BeneficiaryName")) + " " + dataItem.lblBeneficiaryName + " " + dataItem.lblBankNameWithAccountNumber
                        },
                        "lblAccountName1": {
                            "text": preferredFromAccount.accountID ? "From " + CommonUtilities.getAccountDisplayName(preferredFromAccount) : "From " + CommonUtilities.getAccountDisplayName(fromAccounts[0])
                        },
                        // "lblAmount1": {
                        //     // "text":"data exists" ? "data" : (kony.i18n.getLocalizedString("i18n.common.EnterAmount")),
                        //     "placeholder": kony.i18n.getLocalizedString("i18n.common.EnterAmount"),
                        //     "text": kony.i18n.getLocalizedString("i18n.common.EnterAmount"),
                        //     "onTextChange": scopeObj.calculateTotalAmount.bind(this, index),
                        //     "a11yLabel": "a11yLabel"
                        // },
                        "isInstantPayAvailable": dataItem.isInstantPayAvailable
                    };
                    return manageBeneficiary;
                });
            }
            this.view.segmentBillpay.widgetDataMap = dataMap;
            this.view.segmentBillpay.setData(manageBeneficiaries);
            this.view.btnBack.onClick = this.onBackClicked.bind(this, beneficiariesData);
            this.calculateTotalAmount();
            FormControllerUtility.hideProgressBar(this.view);
            this.view.forceLayout();
        },
        calculateTotalAmount: function(index) {
            var self = this;
            const segData = this.view.segmentBillpay.data;
            const errMsg = kony.i18n.getLocalizedString("i18n.Profilemanagement.lblInvalidAmount");
            if (!kony.sdk.isNullOrUndefined(index)) {
                const enteredAmount = segData[index].txtAmount.text;
                if (enteredAmount && isNaN(enteredAmount) && enteredAmount > 0) {
                    self.setServerError(errMsg);
                    CommonUtilities.disableButton(this.view.btnBulkConfirm);
                    return;
                }
            }
            let totalAmount = 0,
                rowCount = 0;
            for (const data of segData) {
                var amount = data.txtAmount.text
                if (amount && !isNaN(amount) && amount > 0) {
                    totalAmount += parseFloat(applicationManager.getFormatUtilManager().deFormatAmount(amount));
                    rowCount++;
                } else {
                    CommonUtilities.disableButton(this.view.btnBulkConfirm);
                    return;
                }
            }
            currencySymbol = applicationManager.getConfigurationManager().getCurrencyCode();
            this.view.lblTotalAmount.text = applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(totalAmount, currencySymbol);
            if (rowCount === segData.length) {
                CommonUtilities.enableButton(this.view.btnBulkConfirm);
                this.view.flxDowntimeWarning.setVisibility(false);
            } else {
                CommonUtilities.disableButton(this.view.btnBulkConfirm);
            }
        },
        setSelectedKeyValueForListbox: function(index, fromAccounts) {
            var data = this.view.segmentBillpay.data;
            var selectedKey = data[index].lstPayFrom.selectedKey;
            var selectedAccount = fromAccounts.filter(function(account) {
                if (account.accountID === selectedKey) return account;
            })
            data[index].lblAccountName.text = CommonUtilities.getAccountDisplayName(selectedAccount[0]);
            data[index].lblAccountName1.text = CommonUtilities.getAccountDisplayName(selectedAccount[0]);
            data[index].lblEndingBalance.text = applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(selectedAccount[0].availableBalance, applicationManager.getConfigurationManager().getCurrencyCode());
            data[index].fromAccountCurrency.text = selectedAccount[0].transactionCurrency || selectedAccount[0].currencyCode;
            this.view.segmentBillpay.setDataAt(data[index], index);
        },
        onContinueClicked: function() {
            var data = this.view.segmentBillpay.data;
            var records = [];
            var self = this;
            var isInputSelected = false;
            var errMsg = kony.i18n.getLocalizedString("i18n.Profilemanagement.lblInvalidAmount");
            for (var record in data) {
                var amount = parseFloat(applicationManager.getFormatUtilManager().deFormatAmount(data[record].txtAmount.text));
                if (!isNaN(amount)) {
                    isInputSelected = true;
                    records.push({
                        "lblBeneficiaryName": data[record].lblBeneficiaryName.text,
                        "lblBankName": data[record].lblBankName.text,
                        "toAccountNumber": data[record].lblAccountNumber.text,
                        "lblAccountNumber": data[record].lstPayFrom.selectedKey,
                        "lblBankNameWithAccountNumber": data[record].lblBankNameWithAccountNumber.text,
                        "lblAccountName": data[record].lblAccountName.text,
                        "lblAccountName1": data[record].lblAccountName.text,
                        "paymentType": data[record].lblPaymentType.text ? data[record].lblPaymentType.text : data[record].isInstantPayAvailable === true ? "Standard" : "",
                        "lblEndingBalance": "Ending balance : " + data[record].lblEndingBalance.text,
                        "lblAmount": applicationManager.getFormatUtilManager().formatAmount(amount),
                        "transactionNotes": data[record].txtNotes.text,
                        "fromAccountCurrency": data[record].fromAccountCurrency.text
                    });
                } else {
                    isInputSelected = false;
                    break;
                }
            }
            if (isInputSelected) {
                self.hideErrorFlex();
                var beneficiaries = {};
                beneficiaries.records = records;
                beneficiaries.totalAmount = this.view.lblTotalAmount.text;
                beneficiaries.fromAccounts = fromAccounts;
                this.presenter.showPayMultipleBeneficiaries({
                    "selectedBeneficiariesConfirm": beneficiaries
                });
            } else {
                self.setServerError(errMsg);
            }
        },
        onBackClicked: function(data) {
            this.presenter.showPayMultipleBeneficiaries({
                "backToBeneficiariesLandingPage": data || true
            });
        },
        attachDocuments: function() {},
        toggleCheckbox: function(index) {
            var data = this.view.segmentBillpay.data;
            if (data[index].lblCheckbox.text === "D") {
                data[index].lblCheckbox.text = "C";
                data[index].lblPaymentType.text = kony.i18n.getLocalizedString("i18n.unified.paymentMethodHeader2");
                this.setAccessibility(data[index].flxCheckbox, true);
            } else {
                data[index].lblCheckbox.text = "D";
                data[index].lblPaymentType.text = kony.i18n.getLocalizedString("i18n.payments.Standard");
                this.setAccessibility(data[index].flxCheckbox, false)
            }
            this.view.segmentBillpay.setDataAt(data[index], index);
            this.view.segmentBillpay.setActive(index, -1, "flxInstantTransfer.flxCheckbox");
        },

        setAccessibility: function(widget, visibility){
            widget.accessibilityConfig = {
                "a11yLabel": "Instant Transfer",
                "a11yARIA": {
                   "tabindex": 0,
                   "aria-checked": visibility,
                   "role": "checkbox",
                  }
              }
        },
        
        deleteFromList: function(index, fromAccounts) {
            segLastRowClicked = index;
            var self = this;
            var data = self.view.segmentBillpay.data;
            self.view.flxDialogs.setVisibility(true);
            self.view.flxCancelPopup.setVisibility(true);
            this.view.CustomPopupCancel.lblHeading.text = kony.i18n.getLocalizedString("kony.mb.common.Delete");
            self.view.CustomPopupCancel.lblHeading.setFocus(true);
            this.view.CustomPopupCancel.lblPopupMessage.text = kony.i18n.getLocalizedString("i18n.payments.deleteBeneficiariesList");
            this.view.CustomPopupCancel.btnYes.accessibilityConfig={
                "a11yLabel": "Yes, delete this beneficiary from this list"
            }
            this.view.CustomPopupCancel.btnYes.onClick = function() {
                self.view.flxCancelPopup.setVisibility(false);
                self.view.flxDialogs.setVisibility(false);
                if (data.length === 1) {
                    self.onBackClicked();
                }
                beneficiariesData.splice(index, 1);
                data.splice(index, 1);
                for (var i = index; i < data.length; i++) {
                    data[i].lblCheckbox.onTouchStart = self.toggleCheckbox.bind(self, i);
                    data[i].txtAmount.onTextChange = self.calculateTotalAmount.bind(self, i);
                    data[i].btnViewEBill.onClick = self.deleteFromList.bind(self, i, fromAccounts);
                }
                self.view.lblBeneficiariesSelected.text = data.length + " " + kony.i18n.getLocalizedString("i18n.Transfers.BeneficiariesSelected");
                self.view.segmentBillpay.setData(data);
                self.calculateTotalAmount();
            };
            this.view.CustomPopupCancel.btnNo.accessibilityConfig={
                "a11yLabel": "No, don't delete this beneficiary from this list"
            }
            this.view.CustomPopupCancel.btnNo.onClick = function() {
                self.view.flxCancelPopup.setVisibility(false);
                self.view.flxDialogs.setVisibility(false);
                self.view.forceLayout();
                self.view.segmentBillpay.setActive(segLastRowClicked, -1, "flxBeneficiariesSelected.flxMainGroup.flxSubGroup.flxContent.flxdetails.flxAttachmentAndDelete.flxViewEBill.btnViewEBill");

            };
            this.view.CustomPopupCancel.flxCross.onClick = function() {
                self.view.flxCancelPopup.setVisibility(false);
                self.view.flxDialogs.setVisibility(false);
                self.view.forceLayout();
                self.view.segmentBillpay.setActive(segLastRowClicked, -1, "flxBeneficiariesSelected.flxMainGroup.flxSubGroup.flxContent.flxdetails.flxAttachmentAndDelete.flxViewEBill.btnViewEBill");


            };
            self.view.flxDialogs.isModalContainer = true;
            this.view.CustomPopupCancel.lblHeading.setActive(true);
        }
    };
});