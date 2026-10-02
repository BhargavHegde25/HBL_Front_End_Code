define(['FormControllerUtility', 'CommonUtilities'], function (FormControllerUtility, CommonUtilities) {
  return {
    TenureInterest: {},
        updateFormUI: function(context) {
            if (context.TnCFD) {
                // this.view.rtxTC.text = context.TnCFD.termsAndConditionsContent;
                this.view.rtxFDTC.text = context.TnCFD.termsAndConditionsContent;
                FormControllerUtility.setHtmlToBrowserWidget(this, this.view.brwBodyTnC, context.TnCFD.termsAndConditionsContent);
            }
            if (context.modify) {
                var amt = applicationManager.getNavigationManager().getCustomInfo("Req_amount");
                amt = amt.split(" ", 2);
                this.view.tbxAmount.text = amt[1];
                this.view.lblFromRecordField2.text = applicationManager.getNavigationManager().getCustomInfo("Req_Account_balance");
                this.view.lblFromRecordField1.text = applicationManager.getNavigationManager().getCustomInfo("Req_accountname_id");
                this.view.lblInterestRate.text = applicationManager.getNavigationManager().getCustomInfo("Req_interestRate");
                this.view.lblDepositTypeDuration.text = applicationManager.getNavigationManager().getCustomInfo("Req_Depositetype");
                this.view.lblTenure.text = applicationManager.getNavigationManager().getCustomInfo("Req_Tenure");
            }
            if (context.Failureresponse) {
                CommonUtilities.hideProgressBar(this.view);
                this.view.GenericMessageNew.setContext(context.Failureresponse);
                this.view.flxError.setVisibility(true);
                kony.application.dismissLoadingScreen();
            }
            if (context.interestFailureresponse) {
                CommonUtilities.hideProgressBar(this.view);
                this.view.GenericMessageNew.setContext(context.interestFailureresponse);
                this.view.flxError.setVisibility(true);
                kony.application.dismissLoadingScreen();
            }
            if (context.interestSuccessResponse) {
                CommonUtilities.hideProgressBar(this.view);
                this.view.lblInterestRate.text = context.interestSuccessResponse.depositInterestRate + "%";
                kony.application.dismissLoadingScreen();
            }
            if (context.FixedDepositTenureSuccessResponse) {
                CommonUtilities.hideProgressBar(this.view);
                this.setTenureValue(context.FixedDepositTenureSuccessResponse);
                kony.application.dismissLoadingScreen();
            }
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
            scope.view.segFromAccounts.onRowClick = scope.onFromAccountSelection.bind(this);
            scope.view.segDepositTypeList.onRowClick = scope.onDepositeTypeSelection.bind(this);
            scope.view.segTenureList.onRowClick = scope.onTenureSelection.bind(this);
            scope.setFromAccountsList();
            scope.setDepositeType();
            //scope.view.btn1.skin="SknbtnDisabledRoundcorner6pxradius";
            //scope.view.btn1.hoverSkin="SknbtnroundcornerA51C306pxradius";
            // scope.setTenureValue();
            this.view.flxError.setVisibility(false);
            scope.view.flxFromAccountTextBoxAndIcon.skin="sknFlxBgHeader";
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
            scope.view.flxDepositTypeValues.onClick = function() {
                if (scope.view.lblDepositTypeDropdownIcon.text == "P") {
                    scope.view.lblDepositTypeDropdownIcon.text = "O";
                    scope.view.flxDepositTypeList.setVisibility(false);
                    scope.view.flxTenureMain.top = "35dp";
                    scope.view.flxDepositTypeDropdown.skin = "ICSknFlxffffffBordere3e3e31pxRadius3px";
                } else {
                    scope.view.lblDepositTypeDropdownIcon.text = "P";
                    scope.view.flxDepositTypeList.setVisibility(true);
                    scope.view.flxTenureMain.top = "180dp";
                    scope.view.flxDepositTypeDropdown.skin = "skntbxBGffffBrB67677";
                }
            };
            // scope.view.flxLblFontIcon.onClick = function () {
			// 	    var checkBox = scope.view.lblCheckBox;
			// 	    if (checkBox.text === "D") {
			// 		    checkBox.text = "C";
			// 	    } else {
			// 		    checkBox.text = "D";
			// 	    }
			// 	    scope.enableContinue(); 
			//       };
            scope.view.btnTC.onClick = function() {
                scope.view.flxTermsAndConditions.height ="1000px";
                scope.termsAndConditionsPopUp();
            }
            scope.view.flxTenure.onClick = function() {
                if (scope.view.lblTenureDropdownIcon.text == "P") {
                    scope.view.lblTenureDropdownIcon.text = "O";
                    scope.view.flxTenureList.setVisibility(false);
                    // scope.view.flxTenureMain.top = "15dp";
                    scope.view.flxTenureDropdown.skin = "ICSknFlxffffffBordere3e3e31pxRadius3px";
                } else {
                    scope.view.lblTenureDropdownIcon.text = "P";
                    scope.view.flxTenureList.setVisibility(true);
                    // scope.view.flxTenureMain.top = "150dp";
                    scope.view.flxTenureDropdown.skin = "skntbxBGffffBrB67677";
                }
            };
            scope.view.btn1.onClick = function() {
                var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                    "appName": "AuthenticationMA",
                    "moduleName": "AuthUIModule"
                });
                kony.application.showLoadingScreen();
                var navManager = applicationManager.getNavigationManager();
                var x = navManager.getCustomInfo('AuthParam');
                authModule.presentationController.postLoginCall(x);
            };
            scope.view.btn2.onClick = function() {
                kony.application.showLoadingScreen();
                var navManager = applicationManager.getNavigationManager();
                navManager.setCustomInfo("Req_Depositetype", scope.view.lblDepositTypeDuration.text);
                navManager.setCustomInfo("Req_amount", scope.view.lblSelectedCurrencySymbol.text + " " + scope.view.tbxAmount.text);
                navManager.setCustomInfo("Req_Branch", scope.view.lblBranchName.text);
                navManager.setCustomInfo("Req_interestRate", scope.view.lblInterestRate.text);
                navManager.setCustomInfo("Req_Tenure", scope.view.lblTenure.text);
                navManager.setCustomInfo("Req_Account_balance", scope.view.lblFromRecordField2.text);
                navManager.setCustomInfo("Req_accountname_id", scope.view.lblFromRecordField1.text);
                var amt = scope.view.lblFromRecordField2.text.split(" ", 2);
                for (var i = 0; i < scope_configManager.userAccounts.length; i++) {
                    accId = applicationManager.getNavigationManager().getCustomInfo("AccountIdconsent");
                    if (accId == scope_configManager.userAccounts[i].accountID) {
                        navManager.setCustomInfo("Req_accountType", scope_configManager.userAccounts[i].productId);
                    }
                }
                for (var i = 0; i < scope.TenureInterest.length; i++) {
                    if (scope.TenureInterest[i].term == scope.view.lblTenure.text.split(" ", 1)) {
                        var amount = scope.view.tbxAmount.text.replace(/,/g, '');
                        if ((amt[1]).replace(/,/g, '') >= parseInt(amount)) {
                        //     if (parseInt(scope.view.tbxAmount.text) >= scope.TenureInterest[i].minEligibilityAmt) {
                        //         applicationManager.getNavigationManager().navigateTo("frmRequestFDConfirmation");
                        //         break;
                        //     } else {
                        //         scope.view.flxErrorMessage.setVisibility(true);
                        //         scope.view.rtxErrorMessage.text = "Entered Account Is Less Than Minimun Eligible Amount " + scope.TenureInterest[i].minEligibilityAmt;
                        //         kony.application.dismissLoadingScreen();
                        //         break;
                        //     }
                        // } else {
                        //     scope.view.flxErrorMessage.setVisibility(true);
                        //     scope.view.rtxErrorMessage.text = "Amount Entered is more than the Available balance";
                        //     kony.application.dismissLoadingScreen();
                        //     break;
                        // }
                        kony.application.dismissLoadingScreen();
                        if(scope.view.lblDepositTypeDuration.text === "Normal FD"){
                            if (parseInt(amount) >= scope_configManager.normalFDMinAmt) {
                                applicationManager.getNavigationManager().navigateTo("frmRequestFDConfirmation");
                            } else {
                                scope.view.flxErrorMessage.setVisibility(true);
                                scope.view.rtxErrorMessage.text = "Entered Account Is Less Than Minimun Eligible Amount " + scope_configManager.normalFDMinAmt;
                            }
                        }else if(scope.view.lblDepositTypeDuration.text === "Himal Remit FD"){
                            if (parseInt(amount) >= scope_configManager.himalRemitMinAmt) {
                                applicationManager.getNavigationManager().navigateTo("frmRequestFDConfirmation");
                            } else {
                                scope.view.flxErrorMessage.setVisibility(true);
                                scope.view.rtxErrorMessage.text = "Entered Account Is Less Than Minimun Eligible Amount " + scope_configManager.himalRemitMinAmt;
                            }

                        }else if(scope.view.lblDepositTypeDuration.text === "Structured FD"){
                            if ( parseInt(amount) >= scope_configManager.structureFDMinAmt) {
                                applicationManager.getNavigationManager().navigateTo("frmRequestFDConfirmation");
                            } else {
                                scope.view.flxErrorMessage.setVisibility(true);
                                scope.view.rtxErrorMessage.text = "Entered Account Is Less Than Minimun Eligible Amount " + scope_configManager.structureFDMinAmt;
                            }
                        }
                    } else {
                        scope.view.flxErrorMessage.setVisibility(true);
                        scope.view.rtxErrorMessage.text = "Amount Entered is more than the Available balance";
                        kony.application.dismissLoadingScreen();
                        break;
                    }
                }
                };
            }
            scope.view.preShow = scope.preShow;
            scope.view.postShow = scope.postShow;
            scope.enableContinue();
        },
        preShow: function() {
            var scope = this;
            scope.view.btn1.skin="SknbtnDisabledRoundcorner6pxradius";
            scope.view.btn1.hoverSkin="SknbtnroundcornerA51C306pxradius";
            scope.view.flxFromAccountTextBoxAndIcon.skin="sknFlxBgHeader";
            scope.view.flxFromAccountTextBoxAndIcon.hoverSkin="sknSegAccountHover";
            scope.CHECKBOX_UNSELECTED_SKIN = 'skn0273e320pxolbfonticons';
            scope.CHECKBOX_SELECTED_SKIN = 'sknFontIconCheckBoxSelected';
            scope.view.flxError.setVisibility(false);
            scope.SetDefaultAccount();
            scope.view.lblDepositTypeDuration.text = "Please Select Deposit Type";
            scope.view.lblTenure.text = "Please Select Tenure";
            scope.view.lblInterestRate.text ="-";
            scope.view.lblSelectedCurrencySymbol.text = "NPR";
            scope.view.lblCheckBox.text = "D";
			scope.view.lblCheckBox.skin = scope.CHECKBOX_UNSELECTED_SKIN;
            scope.view.tbxAmount.onTextChange = function() {
                scope.view.tbxAmount.text = scope.view.tbxAmount.text.replace(/[^0-9.]/g, "");
                if (scope.view.tbxAmount.text != null && scope.view.tbxAmount.text != "") {
                    if (scope.view.tbxAmount.text.includes(".")) {
                        const parts = scope.view.tbxAmount.text.split('.');
                        if (parts[1].length > 2) {
                            parts[1] = parts[1].substring(0, 2);
                            scope.view.tbxAmount.text = parts.join('.');
                        }
                    }
                }
            scope.enableContinue();
            };
            scope.view.tbxAmount.onEndEditing = function() {
                if (scope.view.tbxAmount.text != null && scope.view.tbxAmount.text != "") {
                    // if (scope.view.tbxAmount.text.includes(".")) {
                    //     const parts = scope.view.tbxAmount.text.split('.');
                    //     if (parts[1].length == 0) {
                    //         parts[1] = "00";
                    //         scope.view.tbxAmount.text = parts.join('.');
                    //     } else if (parts[1].length == 1) {
                    //         parts[1] = parts[1] + "0";
                    //         scope.view.tbxAmount.text = parts.join('.');
                    //     }
                    // } else {
                    //     scope.view.tbxAmount.text = scope.view.tbxAmount.text + ".00";
                    // }    
                    // scope.view.tbxAmount.text = scope.formatNumber(scope.view.tbxAmount.text);
                    scope.view.tbxAmount.text = applicationManager.getFormatUtilManager().convertAmountValue(scope.view.tbxAmount.text, "");
                }
            };
            scope.view.flxErrorMessage.setVisibility(false);
            scope.view.tbxAmount.text = "";
            scope.view.flxLoadingContainerFrom.setVisibility(false);
        },
        postShow: function(){
            if(kony.application.getCurrentBreakpoint() === 640){
                this.view.flxFormContent.top = "50px";
                //this.view.flxFormContent.layoutType = kony.flex.FLOW_VERTICAL;
                this.view.flxAmount.width = "100%";
                this.view.flxAmountTextBox.width = "100%";
                this.view.flxAmountValue.width = "77%";
                this.view.flxAmountValue.left = "30px";
                this.view.tbxAmount.width = "98%";
                this.view.flxButtons.width = "100%";
                this.view.flxButtons.right = "0px"
                this.view.flxActionButtons.width = "90%";
                this.view.flxActionButtons.centerX = "50%";
                this.view.btn2.width = "100%";
                this.view.btn2.left = "0px";
                this.view.btn1.width = "100%";
                this.view.btn1.left = "0px";
                this.view.lblTermsHead.centerY = "50%";
                this.view.btnTC.centerY = "50%";
                this.view.flxFooter.top = "1000dp";
                this.view.flxFooter.height = "250px";
                this.view.flxTCActionButtons.layoutType = kony.flex.FLOW_HORIZONTAL;
                this.view.flxTCActionButtons.height = "50px";
                this.view.flxTCContent.height = "81%";
                this.view.flxTCContents.height = "85%";
                this.view.btnAccept.left = "55%";
                this.view.btnCancel.top = "0px";
                this.view.btnCancel.left = "10px";
                }
                if(kony.application.getCurrentBreakpoint() === 1024){
                    this.view.flxFields.top = "10px";
                    this.view.flxAmount.width = "100%";
                    this.view.flxAmountTextBox.width = "100%";
                    this.view.flxAmountValue.width = "75%";
                    this.view.flxAmountValue.left = "30px";
                    this.view.tbxAmount.width = "98%";
                    this.view.lblTermsHead.centerY = "50%";
                    this.view.flxTCContent.height = "85%";
                    this.view.flxTCContents.height = "90%";
                    this.view.btnTC.centerY = "50%";
                    this.view.flxFooter.top = "1000dp";
                    this.view.customfooternew.flxFooterMenu.left = "10dp";
                    this.view.customfooternew.lblCopyright.left = "10dp";
                }
                if(kony.application.getCurrentBreakpoint() === 1366){
                    this.view.flxFooter.top = "1000dp";
                    this.view.flxTCContent.height = "90%";
                    this.view.flxTCContents.height = "90%";
                    this.view.flxAmountValue.width = "75%";
                    this.view.tbxAmount.width = "98%";
                }
            },
        formatNumber: function(num) {
            return parseFloat(num).toFixed(2).toLocaleString('en-US');
        },
        termsAndConditionsPopUp : function(){
            var scope = this;
            this.view.btnCancel.hoverSkin="SknbtnroundcornerA51C306pxradius";
            scope.view.btnAccept.hoverSkin="sknBtnfffffHoverradius6";
            scope.view.flxTermsAndConditions.setVisibility(true);
            scope.view.btnAccept.onClick = function() {
                scope.view.flxTermsAndConditions.setVisibility(false);
                scope.view.lblCheckBox.text ="C";
                scope.enableContinue(); 
            }
            scope.view.btnCancel.onClick = function() {
                scope.view.flxTermsAndConditions.setVisibility(false);
                scope.view.lblCheckBox.text ="D";
                scope.enableContinue(); 
            }
            scope.view.btnClose.onClick = function() {
                scope.view.flxTermsAndConditions.setVisibility(false);
                scope.view.lblCheckBox.text ="D";
                scope.enableContinue(); 
            }
        },
        setTenureValue: function(response) {
            // this.view.flxTenureList.setEnabled(true);
            // this.view.flxTenureList.skin = "ICSknFlxffffffBordere3e3e31pxRadius3px";
            // var tenureVal = '[{"key":"1","value":"100 Days HBL Special FD"},{"key":"2","value":"200 Days HBL Special FD"},{"key":"3","value":"Dep 1 Year Up to 5 Years"},{"key":"1","value":"Dep 5 Years Up to 10 Years"},{"key":"2","value":"Deposit 3 months"},{"key":"3","value":"Deposit 6 months"},{"key":"1","value":"Deposit 9 months"},{"key":"2","value":"Himal Remit Fixed Deposit"},{"key":"3","value":"Structured Dep (3M to 5 yrs)"}]';
            // var tenure = JSON.parse(tenureVal);
            // this.view.segTenureList.widgetDataMap = {
            //     "lblUsers": "value"
            // };
            // this.view.segTenureList.setData(tenure);
            this.TenureInterest = response.result;
            this.view.flxTenureList.setEnabled(true);
            this.view.flxTenureList.skin = "ICSknFlxffffffBordere3e3e31pxRadius3px";
            //   var tenureVal = '[{"key":"1","value":"100 Days HBL Special FD"},{"key":"2","value":"200 Days HBL Special FD"},{"key":"3","value":"Dep 1 Year Up to 5 Years"},{"key":"1","value":"Dep 5 Years Up to 10 Years"},{"key":"2","value":"Deposit 3 months"},{"key":"3","value":"Deposit 6 months"},{"key":"1","value":"Deposit 9 months"},{"key":"2","value":"Himal Remit Fixed Deposit"},{"key":"3","value":"Structured Dep (3M to 5 yrs)"}]';
            //   var tenure = JSON.parse(tenureVal);
            this.view.segTenureList.widgetDataMap = {
                "lblUsers": "lblUsers"
            };
            this.view.lblTenure.text = "Please Select Tenure";
            this.view.lblInterestRate.text = "-";
            if (response.result != undefined) {
                var segData = [];
                for (var i = 0; i < response.result.length; i++) {
                    var data = {
                        "lblUsers": response.result[i].term + " Months"
                    }
                    segData.push(data);
                }
                this.view.segTenureList.setData(segData);
            }
        },
        setDepositeType: function() {
            this.view.flxDepositTypeList.setEnabled(true);
            this.view.flxDepositTypeList.skin = "ICSknFlxffffffBordere3e3e31pxRadius3px";
            var depositType = '[{"key":"NFD","value":"Normal FD"},{"key":"HFD​","value":"Himal Remit FD"},{"key":"SFD​","value":"Structured FD"}]';
            var deposit = JSON.parse(depositType);
            this.view.segDepositTypeList.widgetDataMap = {
                "lblUsers": "value"
            };
            this.view.segDepositTypeList.setData(deposit);
        },
        setFromAccountsList: function() {
            this.collectionObj = scope_configManager.userAccounts;
            var scope = this;
            try {
                scope.setAccountsSegmentTemplateAndWidgetMap(scope.view.segFromAccounts);
                var allAccounts = applicationManager.getAccountManager().getInternalAccounts();
				var segmentData = [];
                for (var i = 0; i < this.collectionObj.length; i++) {
                    if ((this.collectionObj[i].accountType === "Savings" || this.collectionObj[i].accountType === "Checking") && this.collectionObj[i].currencyCode == "NPR") {
                        var account_name = CommonUtilities.mergeAccountNameNumber(this.collectionObj[i].nickName || this.collectionObj[i].accountName, this.collectionObj[i].Account_id);
                        var navManager = applicationManager.getNavigationManager();
                        navManager.setCustomInfo("accountname_id", account_name);
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
                    segData[i]["flxRecordFieldTypeIcon1"] = {
                        "isVisible": false
                    };
                    segData[i]["flxAccountsDropdownList"] = {
                        "hoverSkin":"sknSegAccountHoverSquareborder",
                        "height": "53dp"
                    };
                    segData[i]["flxAccountsDropdownListMobile"] = {
                        "height": "60dp"
                    };
                }
                //scope.view.flxAccountsDropdownList.hoverSkin="sknSegAccountHoverSquareborder";
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
                // scope.showLoadingIndicator(false, "From");
            } catch (err) {
                var errorObj = {
                    "level": "ComponentController",
                    "method": "setFromAccountsList",
                    "error": err
                };
            }
        },
        onTenureSelection: function() {
            let selectedData = this.view.segTenureList.selectedRowItems[0];
            this.view.lblTenure.text = selectedData.lblUsers;
            this.view.lblTenure.skin = "ICSknLbl42424215PX";
            this.hideTenureDropdown();
            this.view.flxTenureDropdown.setActive(true);
            for (var i = 0; i < this.TenureInterest.length; i++) {
                if (this.TenureInterest[i].term == selectedData.lblUsers.split(" ", 1)) {
                    this.view.lblInterestRate.text = this.TenureInterest[i].rate + " %";
                    navManager.setCustomInfo("Req_ProductID", this.TenureInterest[i].aaProductId);
                    break;
                }
            }
            // var param = {
            //     productId: selectedData.value
            // }
            // var ManageActivitiesPresenter = applicationManager.getModulesPresentationController({
            //     "appName": "TransfersMA",
            //     "moduleName": "ManageActivitiesUIModule"
            // });
            // ManageActivitiesPresenter.getInterestRate(param);
            this.enableContinue();
        },
        onDepositeTypeSelection: function() {
            let selectedData = this.view.segDepositTypeList.selectedRowItems[0];
            this.view.lblDepositTypeDuration.text = selectedData["value"];
            this.view.lblDepositTypeDuration.skin = "ICSknLbl42424215PX";
            this.hideDepositeDropdown();
            var param = {
                    "depositType": (selectedData["value"] == "Normal FD") ? "1" : (selectedData["value"] == "Structured FD") ? "3" : "2"
                }
                // if (selectedData["value"] == "Normal FD") {
                //     var param = {
                //         "depositType": "Normal Fixed Deposit"
                //     }
                // } else if (selectedData["value"] == "Structured FD") {
                //     var param = {
                //         "depositType": "Structure Fixed Deposit"
                //     }
                // } else {
                //     var param = {
                //         "depositType": "Himal Remit Fixed Deposit​"
                //     }
                // }
                // var param = {
                //         "depositType": selectedData.key// (selectedData["value"]== "Normal FD") ? "Normal Fixed Deposit" :(selectedData["value"]== "Structured FD​")? "Structure Fixed Deposit​" : "Himal Remit Fixed Deposit​"
                //     }
            var ManageActivitiesPresenter = applicationManager.getModulesPresentationController({
                "appName": "TransfersMA",
                "moduleName": "ManageActivitiesUIModule"
            });
            ManageActivitiesPresenter.getFixedDepositTenureIntrest(param);
            this.view.flxDepositTypeDropdown.setActive(true);
            this.enableContinue();
        },
        enableContinue: function() {
            let isDepositeType = (this.view.lblDepositTypeDuration.text != '' && this.view.lblDepositTypeDuration.text != "Please Select Deposit Type");
            let isAmount = (this.view.tbxAmount.text !== "");
            let amount = (this.view.lblFromRecordField2.text.split(" ")[0] =="NPR");
            let isCheckboxChecked = this.view.lblCheckBox.text === "C";
            let isEnabled = isDepositeType && isAmount && amount && isCheckboxChecked;
            this.view.btn2.setEnabled(isEnabled);
            this.view.btn2.skin = isEnabled ? "sknBtnNormalSSPFFFFFF15pxradius6" : "SknbtnDisabledRoundcorner6pxradius";
            this.view.btn2.hoverSkin = isEnabled ? "sknBtnfffffHoverradius6" : "SknbtnDisabledRoundcorner6pxradius";
            this.view.btn2.focusSkin = isEnabled ? "sknBtnNormalSSPFFFFFF15PxFocus" : "sknBtnBlockedSSP0273e315px";
        },
        hideTenureDropdown: function() {
            if (this.view.lblTenureDropdownIcon.text == "P") {
                this.view.lblTenureDropdownIcon.text = "O";
                this.view.flxTenureList.setVisibility(false);
                // this.view.flxTenureMain.top ="15dp";
                this.view.flxTenureDropdown.skin = "ICSknFlxffffffBordere3e3e31pxRadius3px";
            } else {
                this.view.lblTenureDropdownIcon.text = "P";
                this.view.flxTenureList.setVisibility(true);
                // this.view.flxTenureMain.top ="150dp";
                this.view.flxTenureDropdown.skin = "skntbxBGffffBrB67677";
            }
        },
        hideDepositeDropdown: function() {
            if (this.view.lblDepositTypeDropdownIcon.text == "P") {
                this.view.lblDepositTypeDropdownIcon.text = "O";
                this.view.flxDepositTypeList.setVisibility(false);
                this.view.flxTenureMain.top = "35dp";
                this.view.flxDepositTypeDropdown.skin = "bbSknFlxBordere3e3e3radius6px";
            } else {
                this.view.lblDepositTypeDropdownIcon.text = "P";
                this.view.flxDepositTypeList.setVisibility(true);
                this.view.flxTenureMain.top = "180dp";
                this.view.flxDepositTypeDropdown.skin = "skntbxBGffffBrB67677";
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
                        scope.view.lblBranchName.text = scope_configManager.userAccounts[i].bankName;
                    }
                }
                // var param = {
                //     "accountNumber": "",
                //     "Status": "",
                //     "type": "fetch",
                //     "userName": kony.sdk.getCurrentInstance().tokens[configManager.constants.IDENTITYSERVICENAME].provider_token.params.user_attributes.UserName
                // }
                // var ManageActivitiesPresenter = applicationManager.getModulesPresentationController({
                //     "appName": "TransfersMA",
                //     "moduleName": "ManageActivitiesUIModule"
                // });
                // ManageActivitiesPresenter.getConsentdetails(param);
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
                                },
                                //  "flxAccountsDropdownHeader":{
                                //     "skin":"sknsegacconttypenormalhbl",
                                //     "hoverSkin":"sknSegAccountTypeFocus"
                                // }
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
                                    "skin":"sknlblA51C3013px"
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
        setAccountsSegmentTemplateAndWidgetMap: function(segWidget) {
            var scope = this;
            try {
                if (kony.application.getCurrentBreakpoint() === 640) {
                    segWidget.sectionHeaderTemplate = "flxAccountsDropdownHeaderMobile";
                    segWidget.rowTemplate = "flxAccountsDropdownListMobile";
                } else {
                    segWidget.sectionHeaderTemplate = "flxAccountsDropdownHeader";
                    //this.view.flxAccountsDropdownHeader.skin="sknsegacconttypenormalhbl";
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
        SetDefaultAccount: function() {
            var scope = this;
            this.view.flxFromAccountList.setVisibility(true);
            scope.view.lblFromRecordField2.skin="sknlblA51C3013px";
            var navManager = applicationManager.getNavigationManager();
            var defaultPrimaryAccount = applicationManager.getUserPreferencesManager().getDefaultAccountforDeposit();
            if (defaultPrimaryAccount == "" || defaultPrimaryAccount == undefined || defaultPrimaryAccount == null) {
                defaultPrimaryAccount = navManager.getCustomInfo("defaultAcc").Accounts[0].accountID;
                scope.view.lblBranchName.text = navManager.getCustomInfo("defaultAcc").Accounts[0].bankName;
            }
            for (i = 0; i < scope_configManager.userAccounts['length']; i++) {
                if (defaultPrimaryAccount == scope_configManager.userAccounts[i].account_id && scope_configManager.userAccounts[i].currencyCode == "NPR") {
                    if (scope_configManager.userAccounts[i].accountType === "Savings" || scope_configManager.userAccounts[i].accountType === "Checking") {
                        var account_name = CommonUtilities.mergeAccountNameNumber(this.collectionObj[i].nickName || this.collectionObj[i].accountName, this.collectionObj[i].Account_id);
                        scope.view.lblBranchName.text = scope_configManager.userAccounts[i].bankName;
                    }
                    var navManager = applicationManager.getNavigationManager();
                    navManager.setCustomInfo("accountname_id", account_name);
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
                    else if(scope.view.segFromAccounts.data.length != 0) {
                        var acc =this.view.segFromAccounts.data[0];
                        var accData =acc[1];   
                        scope.view["lblFromRecordField1"].setVisibility(true);
                        scope.view["lblFromRecordField2"].setVisibility(true);
                        scope.view["lblFromRecordField1"].text = accData[0].lblRecordField1 || "";
                        scope.view["lblFromRecordField2"].text = accData[0].lblRecordField2 || "";
                        navManager.setCustomInfo("AccountIdconsent", accData[0].lblRecordField4);
                    }
            }
            if (scope.view.segFromAccounts.data.length == 0) { 
                // this.view.GenericMessageNew.setContext("This user is not eligible to Request Fixed Deposit");
                // scope.view.flxError.setVisibility(true);
                this.RequestFDpopup();
                kony.application.dismissLoadingScreen();
            }
        },
        RequestFDpopup:function(){
            this.view.flxDialogs.setVisibility(true);
            this.view.lblRFDPopupHeader.setVisibility(false);
            this.view.lblRFDPopupContent.text = "This user is not eligible to Request Fixed Deposit";
            this.view.btnDeletePopupNo.setVisibility(false);
            this.view.btnDeletePopupYes.text ="OK";
            this.view.btnDeletePopupYes.onClick = function(){
                var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                    "appName": "AuthenticationMA",
                    "moduleName": "AuthUIModule"
                });
                kony.application.showLoadingScreen();
                var navManager = applicationManager.getNavigationManager();
                var x = navManager.getCustomInfo('AuthParam');
                authModule.presentationController.postLoginCall(x);
            }
            this.view.flxRFDPopupClose.onClick = function(){
                var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                    "appName": "AuthenticationMA",
                    "moduleName": "AuthUIModule"
                });
                kony.application.showLoadingScreen();
                var navManager = applicationManager.getNavigationManager();
                var x = navManager.getCustomInfo('AuthParam');
                authModule.presentationController.postLoginCall(x);
            }
        }
  };
});