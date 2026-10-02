define(['FormControllerUtility','OLBConstants', 'CommonUtilities'], function (FormControllerUtility, OLBConstants , CommonUtilities){ 
   return {
        amountFees: [],
        transactionPurpose: [],
        preShow: function() {
            // applicationManager.getPresentationUtility().showLoadingScreen();         
            var ManageActivitiesPresenter = applicationManager.getModulesPresentationController({
                "appName": "TransfersMA",
                "moduleName": "ManageActivitiesUIModule"
            });
            ManageActivitiesPresenter.getAccountList();
            ManageActivitiesPresenter.getEsewaFees();
            this.resetOrClearningValues();
        },
        init: function() {
            var scope = this;
            scope.groupIdentifier = {
                "internal": {
                    "identifier": "accountTypeKey"
                },
                "segregation": {
                    "Checking": "Checking Account",
                    "CreditCard": "Credit Card Account",
                    "Deposit": "Deposit Account",
                    "Loan": "Loan Account",
                    "Savings": "Saving Account",
                    "default": "All Payees"
                }
            };
            scope.view.flxFromAccountTextBoxAndIcon.skin = "sknFlxBgHeader";
            scope.view.segFromAccounts.onRowClick = scope.onFromAccountSelection.bind(this);
            scope.view.flxFromAccountList.onClick = function() {
                if (scope.view.lblConsenttypedropdown.text == "P") {
                    scope.view.lblConsenttypedropdown.text = "O";
                    scope.view.flxFromAccountSegment.setVisibility(false);
                    scope.view.flxFromAccountTextBoxAndIcon.skin = "sknFlxBgHeader";
                } else {
                    scope.view.lblConsenttypedropdown.text = "P";
                    scope.view.flxFromAccountSegment.setVisibility(true);
                    scope.view.flxFromAccountTextBoxAndIcon.skin = "sknSegAccountHover";
                }
            };
            scope.view.btn2.onClick = function() {
                kony.application.showLoadingScreen();
                var amount = scope.view.tbxAmount.text.replace(",", "")
                var amt = scope.view.lblFromRecordField2.text.split(" ");
                var navManager = applicationManager.getNavigationManager();
                var accNum = navManager.getCustomInfo("AccountIdconsent");
                if ((amt[1]).replace(/,/g, '') >= parseInt(amount)) {
                    param = {
                        "targetedMobile": scope.view.tbxEsewaId.text,
                        "targetedAmount": amount,
                        "frmAccNumber" : accNum
                    }
                    var ManageActivitiesPresenter = applicationManager.getModulesPresentationController({
                        "appName": "TransfersMA",
                        "moduleName": "ManageActivitiesUIModule"
                    });
                    ManageActivitiesPresenter.getValidationEsewaId(param);
                
                }else{
                    kony.application.dismissLoadingScreen();
                    scope.view.rtxErrorMessage.text = "Entered amount less than available balance";
                    scope.view.flxErrorMessage.setVisibility(true);
                }
            }
            scope.view.btn1.onClick =  function() {
                var navMan = applicationManager.getNavigationManager();
                var configManager = applicationManager.getConfigurationManager();
                var data = applicationManager.getUserPreferencesManager().getUserObj();
                navMan.navigateTo({
                    "appName": "TransfersMA",
                    "friendlyName": "frmUTFLanding"
                }, false, data);
            }
            scope.view.tbxEsewaId.onTextChange = function() {
                scope.view.tbxEsewaId.text = scope.view.tbxEsewaId.text.replace(/[^0-9.]/g, "");
            }
            scope.view.tbxEsewaId.onEndEditing = function() {
                scope.enableContinue();
            }
            scope.view.tbxAmount.onTextChange = function() {
                scope.view.tbxAmount.text = scope.view.tbxAmount.text.replace(/[^0-9.]/g, "");
                if (scope.view.tbxAmount.text.length > 10) {
                    scope.view.tbxAmount.text = scope.view.tbxAmount.text.slice(0, 10);
                }
            }
            scope.view.tbxAmount.onEndEditing = function() {
                if (scope.view.tbxAmount.text != null && scope.view.tbxAmount.text != "") {
                    scope.view.tbxAmount.text = applicationManager.getFormatUtilManager().convertAmountValue(scope.view.tbxAmount.text, "");
                    scope.enableContinue();
                }
            }
            scope.setPurposeDropdown(OLBConstants.CLIENT_PROPERTIES.ESEWA_PURPOSE);
            scope.view.segPurposeList.onRowClick = scope.onPurposeSelection.bind(this);
            scope.view.flxPurposeTypeValues.onClick = function() {
                if (scope.view.lblPurposeDropdownIcon.text == "P") {
                    scope.view.lblPurposeDropdownIcon.text = "O";
                    scope.view.flxPurposeList.setVisibility(false);
                    scope.view.flxPurposeTypeDropdown.skin = "bbSknFlxBordere3e3e3radius6px";
                } else {
                    scope.view.lblPurposeDropdownIcon.text = "P";
                    scope.view.flxPurposeList.setVisibility(true);
                    scope.view.flxPurposeTypeDropdown.skin = "skntbxBGffffBrB67677";
                    var segData = scope.view.segPurposeList.data;
                    for (var i = 0; i < segData.length; i++) {
                     segData[i]["flxAccountTypes"] = {
                        "hoverSkin": "sknSegAccountHoverSquareborder"
                    };
                }
                }
            };
        scope.view.postShow = scope.postShow;
        },
        postShow: function(){
            if(kony.application.getCurrentBreakpoint() === 640){
                this.view.flxFormContent.top = "50px";
                this.view.flxButtons.width = "100%";
                this.view.flxButtons.right = "0px"
                this.view.flxActionButtons.width = "90%";
                this.view.flxActionButtons.centerX = "50%";
                this.view.btn2.width = "100%";
                this.view.btn2.left = "0px";
                this.view.btn1.width = "100%";
                this.view.btn1.left = "0px";
                this.view.flxFooter.top = "600dp";
                this.view.flxFooter.height = "250px";
                this.view.flxPurposeLabel.width = "25%";
                }
                if(kony.application.getCurrentBreakpoint() === 1024){
                    
                    this.view.flxFooter.top = "600dp";
                    this.view.customfooternew.flxFooterMenu.left = "10dp";
                    this.view.customfooternew.lblCopyright.left = "10dp";
                }
                if(kony.application.getCurrentBreakpoint() === 1366){
                    this.view.flxFooter.top = "600dp";
                   
                }
            },
        setRepeatValue: function(data){
            this.view.tbxAmount.text = data.amount;
            this.view.tbxEsewaId.text = data.eSewaId;
            this.view.lblPurposeDuration.text = data.purpose;
            this.setRepeatAccount(data.accNum);
        },
        setModifyValue: function(data) {
            this.view.tbxAmount.text = data.amount.split(" ")[1];
            this.view.tbxEsewaId.text = data.eSewaId;
            this.view.lblPurposeDuration.text = data.purpose;
        },
        resetOrClearningValues: function() {
            this.view.tbxAmount.text = "";
            this.view.tbxEsewaId.text = "";
            this.view.lblPurposeDuration.text = "Please Select";
            this.view.flxErrorMessage.setVisibility(false);
        },
        setRepeatAccount: function(accNum){
            var scope = this;
            this.view.flxFromAccountList.setVisibility(true);
            scope.view.lblFromRecordField2.skin = "sknlblA51C3013px";
            var navManager = applicationManager.getNavigationManager();
            defaultPrimaryAccount = accNum;
            for (i = 0; i < scope_configManager.userAccounts['length']; i++) {
                if (defaultPrimaryAccount == scope_configManager.userAccounts[i].account_id && scope_configManager.userAccounts[i].currencyCode == "NPR") {
                    if (scope_configManager.userAccounts[i].accountType === "Savings" || scope_configManager.userAccounts[i].accountType === "Checking") {
                        var account_name = CommonUtilities.mergeAccountNameNumber(this.collectionObj[i].nickName || this.collectionObj[i].accountName, this.collectionObj[i].Account_id);
                    }
                    var navManager = applicationManager.getNavigationManager();
                    navManager.setCustomInfo("accountname_id", account_name);
                    navManager.setCustomInfo("AccountHolderName", scope_configManager.userAccounts[i].accountName);
                    // var Available_balance = (scope_configManager.userAccounts[i].currencyCode) + " " + scope_configManager.userAccounts[i].availableBalance;
                    var Available_balance = applicationManager.getFormatUtilManager().convertAmountValue(scope_configManager.userAccounts[i].availableBalance, scope_configManager.userAccounts[i].currencyCode);
                    var navManager = applicationManager.getNavigationManager();
                    navManager.setCustomInfo("Account_balance", Available_balance);
                    scope.view["lblFromRecordField1"].setVisibility(true);
                    scope.view["lblFromRecordField2"].setVisibility(true);
                    scope.view["lblFromRecordField1"].text = account_name || "";
                    scope.view["lblFromRecordField2"].text = Available_balance || "";
                    navManager.setCustomInfo("AccountIdconsent", scope_configManager.userAccounts[i].account_id);
                    break;
                }
            }
        },
        onFromAccountSelection: function() {
            kony.application.showLoadingScreen();
            var scope = this;
            this.view.lblConsenttypedropdown.text = "O";
            try {
                var selectedRecord = this.view["segFromAccounts"].selectedRowItems[0];
                scope.view["flxClearFromText"].setVisibility(false);
                scope.view["tbxFromAccount"].setVisibility(false);
                scope.view["lblFromRecordField1"].setVisibility(true);
                scope.view["lblFromRecordField2"].setVisibility(true);
                scope.view["tbxFromAccount"].text = selectedRecord.lblRecordField1 || "";
                scope.view["lblFromRecordField1"].text = selectedRecord.lblRecordField1 || "";
                scope.view["lblFromRecordField2"].text = selectedRecord.lblRecordField2 || "";
                var navManager = applicationManager.getNavigationManager();
                navManager.setCustomInfo("AccountIdconsent", selectedRecord.lblRecordField4);
                scope.view.flxFromAccountSegment.setVisibility(false);
                this.view.flxLoadingIndicatorFrom.setVisibility(false);
                var configManager = applicationManager.getConfigurationManager();
                for (var i = 0; i < scope_configManager.userAccounts.length; i++) {
                    accId = applicationManager.getNavigationManager().getCustomInfo("AccountIdconsent");
                    if (accId == scope_configManager.userAccounts[i].accountID) {
                        navManager.setCustomInfo("AccountHolderName", scope_configManager.userAccounts[i].accountName);
                    }
                }
                kony.application.dismissLoadingScreen();
            } catch (err) {
                var errorObj = {
                    "level": "ComponentController",
                    "method": "onFromAccountSelection",
                    "error": err
                };
                kony.application.dismissLoadingScreen();
            }
        },
        updateFormUI: function(context) {
            if (context.AccListSuccess) {
                var scope = this;
                scope.setFromAccountsList(context.AccListSuccess);
            }
            if (context.getEsewaFees) {
                this.amountFees = context.getEsewaFees;
            }
            if (context.validationEsewaIdSuccess) {
                this.callIntrabankParkingService(context.validationEsewaIdSuccess);
            }
            if (context.validateFailureresponse) {
                kony.application.dismissLoadingScreen();
                this.view.rtxErrorMessage.text = context.validateFailureresponse.message;
                this.view.flxErrorMessage.setVisibility(true);
            }
            if (context.Failureresponse) {
                kony.application.dismissLoadingScreen();
                this.view.rtxErrorMessage.text = context.Failureresponse.errorMessage;
                this.view.flxErrorMessage.setVisibility(true);
            }
            if (context.loadeSewaFailureresponse) {
                kony.application.dismissLoadingScreen();
                this.view.rtxErrorMessage.text = context.loadeSewaFailureresponse.errorMessage;
                this.view.flxErrorMessage.setVisibility(true);
            }
            if (context.intraBankFailureResponse) {
                kony.application.dismissLoadingScreen();
                this.view.rtxErrorMessage.text = context.intraBankFailureResponse.errorMessage;
                this.view.flxErrorMessage.setVisibility(true);
            }
            if (context.modify) {
                this.setModifyValue(context.modify);
            }
            if (context.repeat) {
                this.setRepeatValue(context.repeat);
            }
        },
        callIntrabankParkingService: function(response) {
            kony.application.showLoadingScreen();
            var navManager = applicationManager.getNavigationManager();
            var name = navManager.getCustomInfo("AccountHolderName");
            var accNum = navManager.getCustomInfo("AccountIdconsent");
            var dateVal = navManager.getCustomInfo("bankDates");
            var date = new Date(dateVal); // This assumes midnight UTC of that date
            var isoString = dateVal.currentWorkingDate + "T00:00:00.000Z";
            var chargeValue = this.setChargeValue(this.amountFees);
            var amountVal = this.view.tbxAmount.text.replace(",", "")
            var amount = (chargeValue == "NA") ? chargeValue : JSON.parse(amountVal) + JSON.parse(chargeValue);
            var amountCharge;
            if (amount !== "NA") {
                amountCharge = amount;
            } else {
                amountCharge = amountVal;
            }
            var dateformat = new Date(dateVal.currentWorkingDate);
            var day = String(dateformat.getDate()).padStart(2, '0');
            var month = String(dateformat.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
            var year = dateformat.getFullYear();

            var formattedDate = `${day}/${month}/${year}`;
            var result = {
                "fromAccount": accNum,
                "receiverName": response.accountName,
                "fromAccountHolderName": name,
                "receiverID": response.accountNumber,
                "charges": chargeValue,
                "date": dateVal.currentWorkingDate,
                "dateFormat" : formattedDate,
                "purpose": this.view.lblPurposeDuration.text,
                "amount": amountVal,
                "fromAccMasked": this.view.lblFromRecordField1.text,
                "totalAmount": applicationManager.getFormatUtilManager().convertAmountValue(amountCharge, "NPR")
            }
            var params = {
                "ExternalAccountNumber": OLBConstants.CLIENT_PROPERTIES.ESEWA_TOPUP_PAYABLE_ACCOUNT,
                "amount": amountCharge,
                "beneficiaryAddressLine1": "",
                "beneficiaryAddressLine2": "",
                "beneficiaryCity": "",
                "beneficiarycountry": "",
                "beneficiaryEmail": "",
                "beneficiaryName": name,
                "beneficiaryNickname": "",
                "beneficiaryPhone": "",
                "beneficiaryState": "",
                "beneficiaryZipcode": "",
                "createWithPaymentId": "true",
                "deletedDocuments": "",
                "frequencyEndDate": isoString,
                "frequencyStartDate": isoString,
                "frequencyType": "Once",
                "fromAccountCurrency": "NPR",
                "fromAccountNumber": accNum,
                "iban": "",
                "isScheduled": "0",
                "numberOfRecurrences": "",
                "paidBy": "",
                "paymentType": "",
                "scheduledDate": isoString,
                "serviceName": "INTRA_BANK_FUND_TRANSFER_CREATE",
                "swiftCode": "",
                "toAccountCurrency": "NPR",
                "toAccountNumber": OLBConstants.CLIENT_PROPERTIES.ESEWA_TOPUP_PAYABLE_ACCOUNT,
                "transactionCurrency": "NPR",
                "transactionId": "",
                "transactionType": "ExternalTransfer",
                "transactionsNotes": "",
                "uploadedattachments": "",
                "userId": "",
                "validate": "true"
            }
            var ManageActivitiesPresenter = applicationManager.getModulesPresentationController({
                "appName": "TransfersMA",
                "moduleName": "ManageActivitiesUIModule"
            });
            ManageActivitiesPresenter.eSewaIntraBankTransfer(params, result);
        },
        setChargeValue: function(res) {
            var amount = this.view.tbxAmount.text.replace(",", "")
            var amountValue = JSON.parse(amount);
            var feeArray = res.eSewaLoadFee;
            var charge = 0;
            if (feeArray.length > 0) {
                for (i = 0; i < feeArray.length; i++) {
                    if (amountValue >= parseFloat(feeArray[i].minRange) && amountValue <= parseFloat(feeArray[i].maxRange)) {
                        var fees = feeArray[i].feeValue ? feeArray[i].feeValue : "NA";
                        if (fees != "NA") {
                            charge = applicationManager.getFormatUtilManager().convertAmountValue(fees, "");
                        } else {
                            charge = "NA";
                        }
                    }
                }
            } else {
                return "NA";
            }
            return charge;
        },
        setPurposeDropdown: function(response) {
            this.view.flxPurposeList.setEnabled(true);
            this.view.flxPurposeList.skin = "ICSknFlxffffffBordere3e3e31pxRadius3px";
            response = response.replace(/[{}"]/g, '');
            var purposeType = response.split(",");
            var segData = purposeType.map(function(item) {
                return {
                    lblUsers: item.trim() // trim to remove extra spaces
                };
            });
            this.view.segPurposeList.widgetDataMap = {
                lblUsers: "lblUsers"
            };
            this.transactionPurpose = segData;
            this.view.segPurposeList.setData(segData);
        },
        onPurposeSelection: function() {
            let selectedData = this.view.segPurposeList.selectedRowItems[0];
            this.view.lblPurposeDuration.text = selectedData["lblUsers"];
            this.view.lblPurposeDuration.skin = "ICSknLbl42424215PX";
            this.hidePurposeDropdown();
            this.enableContinue();
        },
        hidePurposeDropdown: function() {
            var scope = this;
            if (scope.view.lblPurposeDropdownIcon.text == "P") {
                scope.view.lblPurposeDropdownIcon.text = "O";
                scope.view.flxPurposeList.setVisibility(false);
                scope.view.flxPurposeTypeDropdown.skin = "bbSknFlxBordere3e3e3radius6px";
            } else {
                scope.view.lblPurposeDropdownIcon.text = "P";
                scope.view.flxPurposeList.setVisibility(true);
                scope.view.flxPurposeTypeDropdown.skin = "skntbxBGffffBrB67677";
            }
        },
        setFromAccountsList: function(accounts) {
            this.collectionObj = accounts.Accounts;
            var scope = this;
            try {
                scope.setAccountsSegmentTemplateAndWidgetMap(scope.view.segFromAccounts);
                var allAccounts = applicationManager.getAccountManager().getInternalAccounts();
                var segmentData = [];
                for (var i = 0; i < this.collectionObj.length; i++) {
                    if ((this.collectionObj[i].accountType === "Savings" || this.collectionObj[i].accountType === "Checking") && this.collectionObj[i].currencyCode == "NPR" && this.collectionObj[i].supportTransferFrom == 1) {
                        var account_name = CommonUtilities.mergeAccountNameNumber(this.collectionObj[i].nickName || this.collectionObj[i].accountName, this.collectionObj[i].Account_id);
                        var navManager = applicationManager.getNavigationManager();
                        navManager.setCustomInfo("accountname_id", account_name);
                        navManager.setCustomInfo("AccountHolderName", this.collectionObj[i].accountName);
                        // var Available_balance = (this.collectionObj[i].currencyCode) + " " + (this.collectionObj[i].availableBalance);
                        var Available_balance = applicationManager.getFormatUtilManager().convertAmountValue(this.collectionObj[i].availableBalance, this.collectionObj[i].currencyCode)
                        var navManager = applicationManager.getNavigationManager();
                        navManager.setCustomInfo("Account_balance", Available_balance);
                        var match = allAccounts.find(acc => acc.accountID === this.collectionObj[i].accountID);
                        var accountTypeText = (match && match.description) ? match.description : this.collectionObj[i].accountType;
                        var segData = {
                            lblRecordField1: account_name,
                            lblRecordField2: Available_balance,
                            lblRecordField3: accountTypeText,
                            lblRecordField4: this.collectionObj[i].Account_id,
                            accountTypeKey: this.collectionObj[i].accountType
                        }
                        segmentData.push(segData);
                    }
                }
                this.view.segFromAccounts.setData(segmentData);
                var segData = segmentData;
                for (var i = 0; i < segData.length; i++) {
                    segData[i]["flxRecordFieldTypeIcon2"] = {
                        "isVisible": false
                    };
                    segData[i]["flxAccountsDropdownList"] = {
                        "height": "53dp",
                        "hoverSkin": "sknSegAccountHoverSquareborder"
                    };
                    segData[i]["flxAccountsDropdownListMobile"] = {
                        "height": "60dp"
                    };
                }
                if (scope.groupIdentifier != undefined) {
                    scope.groupedFromRecords = scope.prepareAccountsSegmentData(segmentData, "From");
                } else {
                    scope.groupedFromRecords = segData;
                }
                scope.view.segFromAccounts.setData(scope.groupedFromRecords);
                if (scope.view.segFromAccounts.length == 0) {
                    CommonUtilities.hideProgressBar(this.view);
                    this.view.GenericMessageNew.setContext(kony.i18n.getLocalizedString("i18n.HBL.RequestFDError"));
                    this.view.flxError.setVisibility(true);
                    kony.application.dismissLoadingScreen();
                }
                scope.SetDefaultAccount();
                // scope.showLoadingIndicator(false, "From");
            } catch (err) {
                var errorObj = {
                    "level": "ComponentController",
                    "method": "setFromAccountsList",
                    "error": err
                };
            }
        },
        SetDefaultAccount: function() {
            var scope = this;
            this.view.flxFromAccountList.setVisibility(true);
            scope.view.lblFromRecordField2.skin = "sknlblA51C3013px";
            var navManager = applicationManager.getNavigationManager();
            var defaultPrimaryAccount = applicationManager.getUserPreferencesManager().getDefaultAccountforTransfers();
            if (defaultPrimaryAccount == "" || defaultPrimaryAccount == undefined || defaultPrimaryAccount == null) {
                defaultPrimaryAccount = navManager.getCustomInfo("defaultAcc").Accounts[0].accountID;
            }
            for (i = 0; i < scope_configManager.userAccounts['length']; i++) {
                if (defaultPrimaryAccount == scope_configManager.userAccounts[i].account_id && scope_configManager.userAccounts[i].currencyCode == "NPR") {
                    if (scope_configManager.userAccounts[i].accountType === "Savings" || scope_configManager.userAccounts[i].accountType === "Checking") {
                        var account_name = CommonUtilities.mergeAccountNameNumber(this.collectionObj[i].nickName || this.collectionObj[i].accountName, this.collectionObj[i].Account_id);
                    }
                    var navManager = applicationManager.getNavigationManager();
                    navManager.setCustomInfo("accountname_id", account_name);
                    navManager.setCustomInfo("AccountHolderName", scope_configManager.userAccounts[i].accountName);
                    // var Available_balance = (scope_configManager.userAccounts[i].currencyCode) + " " + scope_configManager.userAccounts[i].availableBalance;
                    var Available_balance = applicationManager.getFormatUtilManager().convertAmountValue(scope_configManager.userAccounts[i].availableBalance, scope_configManager.userAccounts[i].currencyCode);
                    var navManager = applicationManager.getNavigationManager();
                    navManager.setCustomInfo("Account_balance", Available_balance);
                    scope.view["lblFromRecordField1"].setVisibility(true);
                    scope.view["lblFromRecordField2"].setVisibility(true);
                    scope.view["lblFromRecordField1"].text = account_name || "";
                    scope.view["lblFromRecordField2"].text = Available_balance || "";
                    navManager.setCustomInfo("AccountIdconsent", scope_configManager.userAccounts[i].account_id);
                    break;
                } else if (scope.view.segFromAccounts.data.length != 0) {
                    var acc = this.view.segFromAccounts.data[0];
                    var accData = acc[1];
                    scope.view["lblFromRecordField1"].setVisibility(true);
                    scope.view["lblFromRecordField2"].setVisibility(true);
                    scope.view["lblFromRecordField1"].text = accData[0].lblRecordField1 || "";
                    scope.view["lblFromRecordField2"].text = accData[0].lblRecordField2 || "";
                    navManager.setCustomInfo("AccountIdconsent", accData[0].lblRecordField4);
                }
            }
        },
        prepareAccountsSegmentData: function(recordsList, fieldType) {
            var scope = this;
            try {
                var data = [];
                var groupedRecordsList = this.groupAccountsData(recordsList);
                var types = Object.keys(groupedRecordsList);
                if (types.length != 0) {
                    for (var i = 0; i < types.length; i++) {
                        var displayText;
                        if (types[i] != "undefined") {
                            displayText = this.groupIdentifier["segregation"][types[i]];
                        } else {
                            displayText = this.groupIdentifier["segregation"]["default"];
                        }
                        if (displayText != undefined) {
                            displayText = types[i];
                        }
                        data[i] = [{
                                "lblRecordType": {
                                    "text": displayText + " (" + groupedRecordsList[types[i]].length + ")"
                                },
                                "lblDropdownIcon": {
                                    "text": "P",
                                    "accessibilityConfig": {
                                        "a11yHidden": true
                                    }
                                },
                                "flxDropdownIcon": {
                                    "onClick": scope.showOrHideAccountSection.bind(scope, fieldType)
                                }
                            },
                            groupedRecordsList[types[i]]
                        ]
                    }
                }
                return data;
            } catch (err) {
                var errorObj = {
                    "level": "ComponentController",
                    "method": "prepareAccountsSegmentData",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },
        prepareAccountsSegmentData: function(recordsList, fieldType) {
            var scope = this;
            try {
                var data = [];
                var groupedRecordsList = this.groupAccountsData(recordsList);
                var types = Object.keys(groupedRecordsList);
                if (types.length != 0) {
                    for (var i = 0; i < types.length; i++) {
                        var displayText;
                        if (types[i] != "undefined") {
                            displayText = this.groupIdentifier["segregation"][types[i]];
                        } else {
                            displayText = this.groupIdentifier["segregation"]["default"];
                        }
                        if (displayText != undefined) {
                            displayText = types[i];
                        }
                        data[i] = [{
                                "lblRecordType": {
                                    "text": displayText + " (" + groupedRecordsList[types[i]].length + ")",
                                    "skin": "sknlblA51C3013px"
                                },
                                "lblDropdownIcon": {
                                    "text": "P",
                                    "accessibilityConfig": {
                                        "a11yHidden": true
                                    }
                                },
                                "flxDropdownIcon": {
                                    "onClick": scope.showOrHideAccountSection.bind(scope, fieldType)
                                }
                            },
                            groupedRecordsList[types[i]]
                        ]
                    }
                }
                return data;
            } catch (err) {
                var errorObj = {
                    "level": "ComponentController",
                    "method": "prepareAccountsSegmentData",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },
        groupAccountsData: function(data) {
            var scope = this;
            try {
                var internalContract = this.groupIdentifier["internal"];
                if (!internalContract != undefined) {
                    var interalKey = internalContract.identifier;
                }
                if (data !== undefined) {
                    return data.reduce(function(value, obj) {
                        if (!(interalKey === null || interalKey === undefined || interalKey === "")) {
                            (value[obj[interalKey]] = value[obj[interalKey]] || []).push(obj);
                            return value;
                        } else {
                            (value[obj["GroupField"]] = value[obj["GroupField"]] || []).push(obj);
                            return value;
                        }
                    }, {});
                } else return {};
            } catch (err) {
                var errorObj = {
                    "level": "ComponentController",
                    "method": "groupAccountsData",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },
        showOrHideAccountSection: function(fieldType) {
            var scope = this;
            var sectionIndex = scope.view["seg" + fieldType + "Accounts"].selectedRowIndex[0];
            var segData = scope.view["seg" + fieldType + "Accounts"].data;
            var isRowVisible = true;
            if (segData[sectionIndex][0].lblDropdownIcon["text"] === "P") {
                segData[sectionIndex][0].flxDropdownIcon.accessibilityConfig = {
                    a11yLabel: segData[sectionIndex][0].lblRecordType.text,
                    a11yARIA: {
                        "aria-expanded": false,
                        "role": "button",
                        tabindex: 0
                    },
                }
                segData[sectionIndex][0].lblDropdownIcon["text"] = "O";
                isRowVisible = false;
            } else {
                segData[sectionIndex][0].flxDropdownIcon.accessibilityConfig = {
                    a11yLabel: segData[sectionIndex][0].lblRecordType.text,
                    a11yARIA: {
                        "aria-expanded": true,
                        "role": "button",
                        tabindex: 0
                    },
                }
                segData[sectionIndex][0].lblDropdownIcon["text"] = "P";
                isRowVisible = true;
            }
            var rowFlex = kony.application.getCurrentBreakpoint() === 640 ? "flxAccountsDropdownListMobile" : "flxAccountsDropdownList";
            scope.view["seg" + fieldType + "Accounts"].setSectionAt(segData[sectionIndex], sectionIndex);
            for (var i = 0; i < segData[sectionIndex][1].length; i++) {
                var rowDataTobeUpdated = segData[sectionIndex][1][i];
                rowDataTobeUpdated[rowFlex] = {
                    "height": isRowVisible ? "60dp" : "0dp",
                    "isVisible": isRowVisible ? true : false
                };
                scope.view["seg" + fieldType + "Accounts"].setDataAt(rowDataTobeUpdated, i, sectionIndex);
            }
            scope.setAccountsDropdownHeight(fieldType);
            if (fieldType == "To") {
                scope.view.segToAccounts.setActive(-1, sectionIndex, "flxAccountsDropdownHeader.flxRecordType.flxDropdownIcon");
            } else {
                scope.view.segFromAccounts.setActive(-1, sectionIndex, "flxAccountsDropdownHeader.flxRecordType.flxDropdownIcon");
            }
        },
        setAccountsSegmentTemplateAndWidgetMap: function(segWidget) {
            var scope = this;
            try {
                if (kony.application.getCurrentBreakpoint() === 640) {
                    segWidget.sectionHeaderTemplate = "flxAccountsDropdownHeaderMobile";
                    segWidget.rowTemplate = "flxAccountsDropdownListMobile";
                } else {
                    segWidget.sectionHeaderTemplate = "flxAccountsDropdownHeader";
                    segWidget.rowTemplate = "flxAccountsDropdownList";
                }
                segWidget.widgetDataMap = {
                    "lblRecordType": "lblRecordType",
                    "lblDropdownIcon": "lblDropdownIcon",
                    "flxRecordFieldType": "flxRecordFieldType",
                    "lblRecordField1": "lblRecordField1",
                    "lblRecordField2": "lblRecordField2",
                    "flxRecordFieldTypeIcon1": "flxRecordFieldTypeIcon1",
                    "flxRecordFieldTypeIcon2": "flxRecordFieldTypeIcon2",
                    "lblRecordFieldTypeIcon1": "lblRecordFieldTypeIcon1",
                    "imgRecordFieldTypeIcon2": "imgRecordFieldTypeIcon2",
                    "lblRecordField3": "lblRecordField3",
                    "flxAccountsDropdownList": "flxAccountsDropdownList",
                    "flxAccountsDropdownListMobile": "flxAccountsDropdownListMobile",
                    "flxDropdownIcon": "flxDropdownIcon"
                };
            } catch (err) {
                var errorObj = {
                    "level": "ComponentController",
                    "method": "setAccountsSegmentTemplateAndWidgetMap",
                    "error": err
                };
                scope.onError(errorObj);
            };
        },
        enableContinue: function() {
            let isAmount = (this.view.tbxAmount.text !== "");
            let isEsewa = (this.view.tbxEsewaId.text !== "");
            let amount = (this.view.lblPurposeDuration.text !== "" && this.view.lblPurposeDuration.text !== "Please Select");
            let isEnabled = (isAmount && isEsewa && amount);
            this.view.btn2.setEnabled(isEnabled);
            this.view.btn2.skin = isEnabled ? "sknBtnNormalSSPFFFFFF15pxradius6" : "ICSknbtnDisablede2e9f036px";
            this.view.btn2.hoverSkin = isEnabled ? "sknBtnNormalSSPFFFFFF15pxradius6" : "ICSknbtnDisablede2e9f036px";
            this.view.btn2.focusSkin = isEnabled ? "sknBtnNormalSSPFFFFFF15pxradius6" : "ICSknbtnDisablede2e9f036px";
        },
    }

 });