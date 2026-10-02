define(['FormControllerUtility', 'CommonUtilities'], function (FormControllerUtility, CommonUtilities) {
  return {
    init: function() {
        var scope = this;
        scope.view.flxConsentTypeList.setVisibility(false);
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
        //var CollectionObj = scope_configManager.userAccounts;
        scope.view.segFromAccounts.onRowClick = scope.onFromAccountSelection.bind(this);
        //scope.callfetchService();
        scope.view.flxFromAccountList.onClick = function() {
            if (scope.view.lblConsenttypedropdown.text == "P") {
                scope.view.lblConsenttypedropdown.text = "O";
                scope.view.flxFromAccountSegment.setVisibility(false);
                scope.view.flxFromAccountTextBoxAndIcon.skin = "ICSknFlxffffffBordere3e3e31pxRadius3px";
            } else {
                scope.view.lblConsenttypedropdown.text = "P";
                scope.view.flxFromAccountSegment.setVisibility(true);
                scope.view.flxFromAccountTextBoxAndIcon.skin = "skntbxBGffffBrB67677";
            }
        };
        scope.view.flxConsentTypeDropdown.setVisibility(true);
        if (this.view.lblConsentType.text == "") {
            this.view.lblConsentType.text = kony.i18n.getLocalizedString("i18n.HBL.PleaseSelect");
        };
        scope.view.flxChangeConsentValues.onClick = function() {
            //scope.view.flxConsentTypeDropdown.setVisibility(false);
            scope.view.flxConsentTypeDropdown.setVisibility(true);
            if (scope.view.lblConsentTypeDropdownIcon.text == "P") {
                scope.view.lblConsentTypeDropdownIcon.text = "O";
                scope.view.flxConsentTypeList.setVisibility(false);
            } else {
                scope.view.lblConsentTypeDropdownIcon.text = "P";
                scope.view.flxConsentTypeList.setVisibility(true);
            }
            //scope.view.flxConsentTypeList.setVisibility(true);
            //this.changeConsent.bind(this)
        };
        scope.view.flxConsentApplicationValues.onClick = function() {
            if (scope.view.lblConsentApplicationDropdownIcon.text == "P") {
                scope.view.lblConsentApplicationDropdownIcon.text = "O";
                scope.view.flxConsentApplicationList.setVisibility(false);
            } else {
                scope.view.lblConsentApplicationDropdownIcon.text = "P";
                scope.view.flxConsentApplicationList.setVisibility(true);
                // scope.view.flxConsentStatus.top =
            }
        }
        scope.view.btn2.setEnabled(true);
        scope.view.segConsentTypeList.onRowClick = scope.OnchangeConsentSelection.bind(this);
        scope.view.segConsentApplicationList.onRowClick = scope.OnchangeConsentApplicationSelection.bind(this);
        scope.view.preShow = scope.preShow;
        scope.view.postShow = scope.postShow;
    },
    callfetchService: function() {
        var configManager = applicationManager.getConfigurationManager();
        var param = {
            "accountNumber": "",
            "Status": "",
            "type": "fetch",
            "userName": kony.sdk.getCurrentInstance().tokens[configManager.constants.IDENTITYSERVICENAME].provider_token.params.user_attributes.UserName
        }
        var ManageActivitiesPresenter = applicationManager.getModulesPresentationController({
            "appName": "TransfersMA",
            "moduleName": "ManageActivitiesUIModule"
        });
        ManageActivitiesPresenter.getConsentdetails(param);
    },
    formatNumberWithCommas: function(amount) {
        let parts = amount.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        if (parts[1] == null || parts[1] == undefined) {
            parts[1] = "00";
        }
        return parts.join(".");
    },
    SetDefaultAccount: function() {
        var scope = this;
        this.view.flxFromAccountList.setVisibility(true);
        var navManager = applicationManager.getNavigationManager();
        var defaultPrimaryAccount = navManager.getCustomInfo("defaultAcc").Accounts[0].accountID;
        var param = [];
        for (i = 0; i < scope_configManager.userAccounts['length']; i++) {
            //isTransferssupport
            if (defaultPrimaryAccount == scope_configManager.userAccounts[i].account_id) {
                if ((scope_configManager.userAccounts[i].accountType === "Savings" || scope_configManager.userAccounts[i].accountType === "Checking") && (scope_configManager.userAccounts[i].supportTransferTo == "1" || (scope_configManager.userAccounts[i].supportTransferFrom == "1" && applicationManager.getUserPreferencesManager().getUserObj().country == "IN"))) {
                    var account_name = CommonUtilities.mergeAccountNameNumber(this.collectionObj[i].nickName || this.collectionObj[i].accountName, this.collectionObj[i].Account_id);
                }
                var navManager = applicationManager.getNavigationManager();
                navManager.setCustomInfo("accountname_id", account_name);
                let amount = scope_configManager.userAccounts[i].availableBalance;
                let formattedAmount = scope.formatNumberWithCommas(amount); // To display amount in proper format
                // var Available_balance = /*scope.getCurrencySymbol*/ (scope_configManager.userAccounts[i].currencyCode) + " " + formattedAmount //scope.getFormattedAmount(this.collectionObj[i].availableBalance);
                var Available_balance = applicationManager.getFormatUtilManager().convertAmountValue(amount, scope_configManager.userAccounts[i].currencyCode);
                var navManager = applicationManager.getNavigationManager();
                navManager.setCustomInfo("Account_balance", Available_balance);
                scope.view["lblFromRecordField1"].setVisibility(true);
                scope.view["lblFromRecordField2"].setVisibility(true);
                //scope.view["tbxFromAccount"].text = selectedRecord.lblRecordField1 || "";
                scope.view["lblFromRecordField1"].text = account_name || "";
                scope.view["lblFromRecordField2"].text = Available_balance || "";
                navManager.setCustomInfo("AccountIdconsent", scope_configManager.userAccounts[i].account_id);
                param = {
                    "customerId": scope_configManager.userAccounts[i].coreCustomerId,
                    "customerAccount": scope_configManager.userAccounts[i].account_id
                }
                var ManageActivitiesPresenter = applicationManager.getModulesPresentationController({
                    "appName": "TransfersMA",
                    "moduleName": "ManageActivitiesUIModule"
                });
                ManageActivitiesPresenter.getAccVPADetails(param);
                this.setConsentApplicableDropdown(scope_configManager.userAccounts[i].supportTransferTo, scope_configManager.userAccounts[i].supportTransferFrom, applicationManager.getUserPreferencesManager().getUserObj().country,scope_configManager.userAccounts[i].currencyCode);
                navManager.setCustomInfo("country", applicationManager.getUserPreferencesManager().getUserObj().country);
                break;
            }
        }
        // var configManager = applicationManager.getConfigurationManager();
        // var userName = kony.sdk.getCurrentInstance().tokens[configManager.constants.IDENTITYSERVICENAME].provider_token.params.user_attributes.UserName;
        // var ManageActivitiesPresenter = applicationManager.getModulesPresentationController({
        //     "appName": "TransfersMA",
        //     "moduleName": "ManageActivitiesUIModule"
        // });
        // ManageActivitiesPresenter.getAccListDetails(userName);
        // var ManageActivitiesPresenter = applicationManager.getModulesPresentationController({
        //     "appName": "TransfersMA",
        //     "moduleName": "ManageActivitiesUIModule"
        // });
        // ManageActivitiesPresenter.getAccVPADetails(param);
    },
    getconsentchangeresult: function() {
        var configManager = applicationManager.getConfigurationManager();
        var userName = kony.sdk.getCurrentInstance().tokens[configManager.constants.IDENTITYSERVICENAME].provider_token.params.user_attributes.UserName;
        var navManager = applicationManager.getNavigationManager();
        var result = navManager.getCustomInfo("getconsentchangeresult");
        var status;
        if (result == "approve" || result == "Grant Access") {
            status = "APPROVED";
        }
        if (result == "Reject" || result == "Revoke Access") {
            status = "DECLINED";
        }
        navManager.setCustomInfo("cbcAccSelection", this.view.lblFromRecordField1.text)
        navManager.setCustomInfo("ackScreenmappingstatus", status);
        navManager.setCustomInfo("cbcAccBalance", this.view.lblFromRecordField2.text);
        var DomenticInWard = navManager.getCustomInfo("DomesticInwardConsent");
        var DomenticOutWard = navManager.getCustomInfo("DomesticOutwardConsent");
        var InternationalOutWard = navManager.getCustomInfo("InternationalOutwardConsent");
        var id = navManager.getCustomInfo("AccountIdconsent");
        var vpaID = this.view.lblVPAName.text;
        var configManager = applicationManager.getConfigurationManager();
        var fullName = kony.sdk.getCurrentInstance().tokens[configManager.constants.IDENTITYSERVICENAME].provider_token.params.user_attributes.FullName;
        var IdType = kony.sdk.getCurrentInstance().tokens[configManager.constants.IDENTITYSERVICENAME].provider_token.params.user_attributes.IDType_id;
        var IDValue = kony.sdk.getCurrentInstance().tokens[configManager.constants.IDENTITYSERVICENAME].provider_token.params.user_attributes.IDValue;
        // var nationalityId = 
        var InternationalInward = navManager.getCustomInfo("InternationalInwardConsent");
        var cun = navManager.getCustomInfo("country");
        var Direction;
        var type =this.view.lblConsentApplicationType.isVisible ? this.view.lblConsentApplicationType.text: this.view.lblConsentApplicableName.text;
        if (type == "International Outward Consent") {
            Direction = "OUTWARD";
            InternationalOutWard = status;
            navManager.setCustomInfo("cbc_status", InternationalOutWard)
            navManager.setCustomInfo("cbc_consent","International Outward Consent")
            //navManager.setCustomInfo("cbc_consent", this.view.lblConsentApplicationType.isVisible ? this.view.lblConsentApplicationType.text : this.view.lblConsentApplicableName.text);
            if(InternationalInward=="YES"){
                InternationalInward="APPROVED"
            }
            else if(InternationalInward=="NO"){
                InternationalInward="DECLINED"
            }
        } else {
            Direction = "INWARD";
            InternationalInward = status;
            navManager.setCustomInfo("cbc_status", InternationalInward)
            navManager.setCustomInfo("cbc_consent","International Inward Consent")
            //navManager.setCustomInfo("cbc_consent", this.view.lblConsentApplicationType.isVisible ? this.view.lblConsentApplicationType.text : this.view.lblConsentApplicableName.text);
            if(InternationalOutWard=="YES"){
                InternationalOutWard="APPROVED"
            }
            else if(InternationalOutWard=="NO"){
                InternationalOutWard="DECLINED"
            }
        }
        var param = {
            "accountID": id,
            "internationalInwardConsent": InternationalInward,
            "internationalOutwardConsent": InternationalOutWard, // if no value available, then send empty
            "domesticOutwardConsent": DomenticOutWard, // if no value available, then send empty
            "domesticInwardConsent": DomenticInWard, // if no value available, then send empty
            "vpaId": vpaID,
            "consent": status,
            "userName": userName,
            "fullname": fullName,
            "IDType": IdType,
            "IDValue": IDValue,
            "nationalityId": cun,
            "direction": Direction
        }
        var ManageActivitiesPresenter = applicationManager.getModulesPresentationController({
            "appName": "TransfersMA",
            "moduleName": "ManageActivitiesUIModule"
        });
        if (this.view.lblConsentStatusName.text == "PENDING") {
            ManageActivitiesPresenter.createConsentDetails(param);
        } else {
            ManageActivitiesPresenter.getConsentdetail(param);
        }
        // var acc = applicationManager.getAccountManager().getInternalAccounts();
        // for (i = 0; i < acc.length; i++) {
        //     if (acc[i].account_id == id) {
        //         var ManageActivitiesPresenter = applicationManager.getModulesPresentationController({
        //             "appName": "TransfersMA",
        //             "moduleName": "ManageActivitiesUIModule"
        //         });
        //         navManager.setCustomInfo("cbc_status", acc[i].isPortFolioAccount)
        //         if (acc[i].isPortFolioAccount == "PENDING") {   
        //             ManageActivitiesPresenter.createConsentDetails(param);
        //         } else {
        //             ManageActivitiesPresenter.getConsentdetail(param);
        //         }
        //     }
    },
    OnchangeConsentApplicationSelection: function() {
        var scope = this;
        var navManager = applicationManager.getNavigationManager();
        var selectedRecord = scope.view["segConsentApplicationList"].selectedRowItems[0].value;
        scope.view.flxConsentApplicationDropdown.setVisibility(true);
        scope.view.flxConsentApplicationList.setVisibility(false);
        scope.view.lblConsentApplicationDropdownIcon.text = "O";
        scope.view.lblConsentApplicationType.setVisibility(true);
        scope.view.lblConsentApplicationType.text = selectedRecord || kony.i18n.getLocalizedString("i18n.pleaseSelectConsentType");
        scope.view.lblConsentType.text = kony.i18n.getLocalizedString("i18n.HBL.PleaseSelect");
        if (this.view.lblConsentApplicationType.text == "International Outward Consent") {
            // if (response.customerAccount == id) {
            // this.view.lblConsentStatusName.text = response.internationalInwardConsent;
            // this.view.lblVPAName.text = response.vpaId;
            this.view.lblConsentStatusName.text = navManager.getCustomInfo("InternationalOutwardConsent");
            var arr = [];
            if (this.view.lblConsentStatusName.text == "PENDING") {
                this.view.flxConsentTypeList.height = "80px";
                for (j = 0; j < 2; j++) {
                    if (j == 0) {
                        var segConsentData = {
                            lblListValue: kony.i18n.getLocalizedString("i18n.HBL.grantaccess")
                        }
                        arr.push(segConsentData);
                    } else {
                        var segConsentData = {
                            lblListValue: kony.i18n.getLocalizedString("i18n.ProfileManagement.RevokeAccess")
                        }
                        arr.push(segConsentData);
                    }
                }
            }
            if (this.view.lblConsentStatusName.text == "YES") {
                this.view.flxConsentTypeList.height = "40px";
                var segConsentData = {
                    lblListValue: kony.i18n.getLocalizedString("i18n.ProfileManagement.RevokeAccess")
                }
                arr.push(segConsentData);
            }
            if (this.view.lblConsentStatusName.text == "NO") {
                this.view.flxConsentTypeList.height = "40px";
                var segConsentData = {
                    lblListValue: kony.i18n.getLocalizedString("i18n.HBL.grantaccess")
                }
                arr.push(segConsentData);
            }
            this.view.segConsentTypeList.setData(arr);
            kony.application.dismissLoadingScreen();
            // }
        } else {
            this.view.lblConsentStatusName.text = navManager.getCustomInfo("InternationalInwardConsent");
            var arr = [];
            if (this.view.lblConsentStatusName.text == "PENDING") {
                this.view.flxConsentTypeList.height = "80px";
                for (j = 0; j < 2; j++) {
                    if (j == 0) {
                        var segConsentData = {
                            lblListValue: kony.i18n.getLocalizedString("i18n.HBL.grantaccess")
                        }
                        arr.push(segConsentData);
                    } else {
                        var segConsentData = {
                            lblListValue: kony.i18n.getLocalizedString("i18n.ProfileManagement.RevokeAccess")
                        }
                        arr.push(segConsentData);
                    }
                }
            }
            if (this.view.lblConsentStatusName.text == "YES") {
                this.view.flxConsentTypeList.height = "40px";
                var segConsentData = {
                    lblListValue: kony.i18n.getLocalizedString("i18n.ProfileManagement.RevokeAccess")
                }
                arr.push(segConsentData);
            }
            if (this.view.lblConsentStatusName.text == "NO") {
                this.view.flxConsentTypeList.height = "40px";
                var segConsentData = {
                    lblListValue: kony.i18n.getLocalizedString("i18n.HBL.grantaccess")
                }
                arr.push(segConsentData);
            }
            this.view.segConsentTypeList.setData(arr);
            kony.application.dismissLoadingScreen();
            // }
        }
        navManager.setCustomInfo("getconsentApplicationresult", scope.view.lblConsentApplicationType.text);
        if(this.view.lblConsentType.text!=kony.i18n.getLocalizedString("i18n.HBL.PleaseSelect")){
            scope.view.btn2.setEnabled(true);
            scope.view.btn2.skin = "sknBtnNormalSSPFFFFFF15Px";
        }
        else{
        scope.view.btn2.setEnabled(false);
        scope.view.btn2.skin = "sknBtnBlockedSSPFFFFFF15Px";
        }
        //scope.view["lblListValue"].text = selectedRecord.lblListValue || "";
    },
    OnchangeConsentSelection: function() {
        var scope = this;
        var selectedRecord = scope.view["segConsentTypeList"].selectedRowItems[0];
        scope.view.flxConsentTypeDropdown.setVisibility(true);
        scope.view.flxConsentTypeList.setVisibility(false);
        scope.view.lblConsentTypeDropdownIcon.text = "O";
        scope.view.lblConsentType.setVisibility(true);
        scope.view.lblConsentType.text = selectedRecord.lblListValue || kony.i18n.getLocalizedString("i18n.HBL.PleaseSelect");
        var navManager = applicationManager.getNavigationManager();
        navManager.setCustomInfo("getconsentchangeresult", scope.view.lblConsentType.text);
        this.view.btn2.setEnabled(true);
        this.view.btn2.skin = "sknBtnNormalSSPFFFFFF15Px";
        //scope.view["lblListValue"].text = selectedRecord.lblListValue || "";
    },
    updateFormUI: function(context) {
        if (context.AccListSuccess) {
            this.view.flxError.setVisibility(false);
            this.view.btn2.setEnabled(false);
            this.view.btn2.skin = "sknBtnBlockedSSPFFFFFF15Px";
            this.view.flxConsentTypeDropdown.setVisibility(true);
            //this.view.lblConsentType.setVisibility(false);
            this.view.lblConsentType.text = kony.i18n.getLocalizedString("i18n.HBL.PleaseSelect");
            this.view.lblConsentApplicationType.text = kony.i18n.getLocalizedString("i18n.pleaseSelectConsentType");
            this.view.flxConsentTypeList.setVisibility(false);
            var response = context.AccListSuccess;
            var navManager = applicationManager.getNavigationManager();
            var id = navManager.getCustomInfo("AccountIdconsent");
            this.setConsentSegmentTemplateAndWidgetMap(this.view.segConsentTypeList);
            navManager.setCustomInfo("DomesticInwardConsent", response.domesticInwardConsent);
            navManager.setCustomInfo("InternationalOutwardConsent", response.internationalOutwardConsent);
            navManager.setCustomInfo("DomesticOutwardConsent", response.domesticOutwardConsent);
            navManager.setCustomInfo("InternationalInwardConsent", response.internationalInwardConsent);
            // for (i = 0; i < response.Accounts.length; i++) {
            if (this.view.lblConsentApplicableName.text == "International Outward Consent") {
                this.view.lblConsentStatusName.text = response.internationalOutwardConsent;
            } else if (this.view.lblConsentApplicableName.text == "International Inward Consent") {
                this.view.lblConsentStatusName.text = response.internationalInwardConsent;
            } else {
                this.view.lblConsentStatusName.text = "-";
            }
            this.view.lblVPAName.text = response.vpaId;
            // this.view.lblConsentApplicableName.text ="International Outward Consent";
            // var outWard = navManager.getCustomInfo('InternationalOutwardConsent');
            // this.view.lblConsentStatusName.text = outWard;
            if (response.customerAccount == id && this.view.lblConsentStatusName.text != "-") {
                // this.view.lblConsentStatusName.text = response.internationalInwardConsent;
                this.view.lblVPAName.text = response.vpaId;
                var arr = [];
                if (this.view.lblConsentStatusName.text == "PENDING") {
                    this.view.flxConsentTypeList.height = "80px";
                    for (j = 0; j < 2; j++) {
                        if (j == 0) {
                            var segConsentData = {
                                lblListValue: kony.i18n.getLocalizedString("i18n.HBL.grantaccess")
                            }
                            arr.push(segConsentData);
                        } else {
                            var segConsentData = {
                                lblListValue: kony.i18n.getLocalizedString("i18n.ProfileManagement.RevokeAccess")
                            }
                            arr.push(segConsentData);
                        }
                    }
                }
                if (this.view.lblConsentStatusName.text == "YES") {
                    this.view.flxConsentTypeList.height = "40px";
                    var segConsentData = {
                        lblListValue: kony.i18n.getLocalizedString("i18n.ProfileManagement.RevokeAccess")
                    }
                    arr.push(segConsentData);
                }
                if (this.view.lblConsentStatusName.text == "NO") {
                    this.view.flxConsentTypeList.height = "40px";
                    var segConsentData = {
                        lblListValue: kony.i18n.getLocalizedString("i18n.HBL.grantaccess")
                    }
                    arr.push(segConsentData);
                }
                this.view.segConsentTypeList.setData(arr);
                kony.application.dismissLoadingScreen();
            }
            // }
        }
        if (context.ConsentError) {
            this.view.flxError.setVisibility(true);
            this.view.lblErrorMessage.left = "6%";
            this.view.lblErrorMessage.skin = "sknlblff000015px";
            this.view.lblErrorMessage.text = context.ConsentError.responseMessage;
            kony.application.dismissLoadingScreen();
        }
        if (context.Consent) {
            this.view.btn2.setEnabled(false);
            this.view.btn2.skin = "sknBtnBlockedSSPFFFFFF15Px";
            this.view.flxConsentTypeDropdown.setVisibility(true);
            //this.view.lblConsentType.setVisibility(false);
            this.view.lblConsentType.text = kony.i18n.getLocalizedString("i18n.HBL.PleaseSelect");
            this.view.flxConsentTypeList.setVisibility(false);
            var response = context.Consent;
            var navManager = applicationManager.getNavigationManager();
            var id = navManager.getCustomInfo("AccountIdconsent");
            this.setConsentSegmentTemplateAndWidgetMap(this.view.segConsentTypeList);
            var arr = [];
            for (i = 0; i < context.Consent.CONSENTS['length']; i++) {
                if (response.CONSENTS[i].AccountId == id) {
                    this.view.lblConsentStatusName.text = response.CONSENTS[i].ConsentStatus;
                    var arr = [];
                    if (response.CONSENTS[i].ConsentStatus == "PENDING") {
                        this.view.flxConsentTypeList.height = "80px";
                        for (j = 0; j < 2; j++) {
                            if (j == 0) {
                                var segConsentData = {
                                    lblListValue: kony.i18n.getLocalizedString("i18n.HBL.grantaccess")
                                }
                                arr.push(segConsentData);
                            } else {
                                var segConsentData = {
                                    lblListValue: kony.i18n.getLocalizedString("i18n.ProfileManagement.RevokeAccess")
                                }
                                arr.push(segConsentData);
                            }
                        }
                    }
                    if (response.CONSENTS[i].ConsentStatus == "APPROVED") {
                        this.view.flxConsentTypeList.height = "40px";
                        var segConsentData = {
                            lblListValue: kony.i18n.getLocalizedString("i18n.ProfileManagement.RevokeAccess")
                        }
                        arr.push(segConsentData);
                    }
                    if (response.CONSENTS[i].ConsentStatus == "DECLINED") {
                        this.view.flxConsentTypeList.height = "40px";
                        var segConsentData = {
                            lblListValue: kony.i18n.getLocalizedString("i18n.HBL.grantaccess")
                        }
                        arr.push(segConsentData);
                    }
                    this.view.segConsentTypeList.setData(arr);
                    kony.application.dismissLoadingScreen();
                    break;
                }
            }
        };
        if (context.ConsentSuccess) {
            this.view.btn2.setEnabled(false);
            this.view.btn2.skin = "sknBtnBlockedSSPFFFFFF15Px";
            this.view.flxConsentTypeDropdown.setVisibility(true);
            //this.view.lblConsentType.setVisibility(false);
            this.view.lblConsentType.text = kony.i18n.getLocalizedString("i18n.HBL.PleaseSelect");
            this.view.flxConsentTypeList.setVisibility(false);
            var response = context.Consent;
            var navManager = applicationManager.getNavigationManager();
            var id = navManager.getCustomInfo("AccountIdconsent");
            this.setConsentSegmentTemplateAndWidgetMap(this.view.segConsentTypeList);
            if (responseData.consent == "PENDING") {
                this.view.flxConsentTypeList.height = "80px";
                for (j = 0; j < 2; j++) {
                    if (j == 0) {
                        var segConsentData = {
                            lblListValue: kony.i18n.getLocalizedString("i18n.HBL.grantaccess")
                        }
                        arr.push(segConsentData);
                    } else {
                        var segConsentData = {
                            lblListValue: kony.i18n.getLocalizedString("i18n.ProfileManagement.RevokeAccess")
                        }
                        arr.push(segConsentData);
                    }
                }
            }
            if (responseData == "APPROVED") {
                this.view.flxConsentTypeList.height = "40px";
                var segConsentData = {
                    lblListValue: kony.i18n.getLocalizedString("i18n.ProfileManagement.RevokeAccess")
                }
                arr.push(segConsentData);
            }
            if (responseData == "DECLINED") {
                this.view.flxConsentTypeList.height = "40px";
                var segConsentData = {
                    lblListValue: kony.i18n.getLocalizedString("i18n.HBL.grantaccess")
                }
                arr.push(segConsentData);
            }
            this.view.segConsentTypeList.setData(arr);
            kony.application.dismissLoadingScreen();
        }
        if (context.Consentstatus) {
            var x = context.Consentstatus.consentupdated;
            if (x == "true") {
                applicationManager.getNavigationManager().navigateTo({
                    "appName": "TransfersMA",
                    "friendlyName": "UnifiedTransferFlowUIModule/frmCBCSuccess"
                });
                applicationManager.getNavigationManager().updateForm({
                    "successresponse": context.Consentstatus
                }, "frmCBCSuccess");
            } else {
                this.view.flxError.setVisibility(true);
                this.view.lblErrorMessage.width = "90%";
                this.view.lblErrorMessage.left = "6%";
                this.view.lblErrorMessage.skin = "sknlblff000015px";
                this.view.lblErrorMessage.text = kony.i18n.getLocalizedString("i18n.HBL.statusnotupdated");
                kony.application.dismissLoadingScreen();
            }
        };
        if (context.Failureresponse) {
            this.view.lblConsentStatusName.text="-";
            this.view.lblVPAName.text="-";
            this.view.lblConsentApplicableName.text="-";
            var arr = [];
            this.view.lblConsentType.text =kony.i18n.getLocalizedString("i18n.HBL.PleaseSelect");
            this.view.segConsentTypeList.setData(arr);
            this.view.flxConsentTypeList.height = "0dp";
            this.view.flxError.setVisibility(true);
            this.view.lblErrorMessage.width = "90%";
            this.view.lblErrorMessage.left = "6%";
            this.view.lblErrorMessage.skin = "sknlblff000015px";
            if (context.Failureresponse.responseMessage != null && context.Failureresponse.responseMessage != undefined) {
                this.view.lblErrorMessage.text = context.Failureresponse.responseMessage;
            } else {
                this.view.lblErrorMessage.text = kony.i18n.getLocalizedString("i18n.HBL.statusnotupdated");
            }
            kony.application.dismissLoadingScreen();
        }
        if(context.CreateFailureresponse){
            this.view.flxError.setVisibility(true);
            this.view.lblErrorMessage.width = "90%";
            this.view.lblErrorMessage.left = "6%";
            this.view.lblErrorMessage.skin = "sknlblff000015px";
            if (context.CreateFailureresponse.responseMessage != null && context.CreateFailureresponse.responseMessage != undefined) {
                this.view.lblErrorMessage.text = context.CreateFailureresponse.responseMessage;
            } else {
                this.view.lblErrorMessage.text = kony.i18n.getLocalizedString("i18n.HBL.statusnotupdated");
            }
            kony.application.dismissLoadingScreen();
        }
        if (context.PinNotSet) {
            this.ShowPinNotSetError();
        }
    },
    ShowPinNotSetError: function(response) {
        this.view.flxError.setVisibility(true);
        this.view.lblErrorMessage.text = kony.i18n.getLocalizedString("i18n.TPSetup");
        this.view.lblErrorMessage.width = "90%";
        this.view.lblErrorMessage.left = "6%";
        this.view.lblErrorMessage.skin = "sknlblff000015px";
        kony.application.dismissLoadingScreen();
    },
    setConsentApplicableDropdown: function(flagInward, flagOutward, country, currency) {
        this.view.flxConsentApplicationList.setEnabled(true);
        this.view.flxConsentApplicationList.skin = "ICSknFlxffffffBordere3e3e31pxRadius3px";
        this.view.segConsentApplicationList.height = "80px";
        var arr = [];
        if (country == "IN" && flagOutward == 1 && currency=="NPR") {
            this.view.lblConsentStatusName.text = "-";
            // var applicableConsent = '[{"key":"1","value":"International Outward Consent"}]';
            // var consent = JSON.parse(applicableConsent);
            // this.view.segConsentApplicationList.widgetDataMap = {
            //     "lblListValue": "value"
            // };
            // this.view.segConsentApplicationList.setData(consent);
            if (country == "IN" && flagOutward == 1 && flagInward == 1) {
                this.view.flxConsentApplicationValues.setVisibility(true);
                this.view.lblConsentApplicableName.setVisibility(false);
                this.view.lblConsentApplicationType.setVisibility(true);
                // this.view.lblConsentApplicableName.text = "International Outward Consent";
                this.view.lblConsentApplicableName.text = "";
                var applicableConsent = '[{"key":"1","value":"International Inward Consent"},{"key":"2","value":"International Outward Consent"}]';
                var consent = JSON.parse(applicableConsent);
                this.view.segConsentTypeList.setData(arr);
                this.view.flxConsentTypeList.height="0dp";
                this.view.segConsentApplicationList.widgetDataMap = {
                    "lblListValue": "value"
                };
                this.view.segConsentApplicationList.setData(consent);
            } else {
                this.view.flxConsentApplicationValues.setVisibility(false);
                this.view.lblConsentApplicableName.setVisibility(true);
                this.view.lblConsentApplicationType.setVisibility(false);
                this.view.lblConsentApplicableName.text = "International Outward Consent";
            }
        } else if (flagInward == 1 ) {
            // var applicableConsent = '[{"key":"1","value":"International Inward Consent"}]';
            // var consent = JSON.parse(applicableConsent);
            // this.view.segConsentApplicationList.widgetDataMap = {
            //     "lblListValue": "value"
            // };
            // this.view.segConsentApplicationList.setData(consent);
            var navManager = applicationManager.getNavigationManager();
            this.view.flxConsentApplicationValues.setVisibility(false);
            this.view.lblConsentApplicableName.setVisibility(true);
            this.view.lblConsentApplicationType.setVisibility(false);
            this.view.lblConsentApplicableName.text = "International Inward Consent";
        }
    },
    setConsentSegmentTemplateAndWidgetMap: function(segWidget) {
        segWidget.widgetdatamap = {
            "flxListDropdown": "flxListDropdown",
            "lblListValue": "lblListValue"
        };
    },
    preShow: function() {
        var scope = this;
        this.view.flxError.setVisibility(false);
        if (scope.view.lblConsenttypedropdown.text == "P") {
            scope.view.lblConsenttypedropdown.text = "O";
            scope.view.flxFromAccountSegment.setVisibility(false);
            scope.view.flxFromAccountTextBoxAndIcon.skin = "ICSknFlxffffffBordere3e3e31pxRadius3px";
        }
        scope.view.btn2.onClick = function() {
                kony.application.showLoadingScreen();
                scope.getconsentchangeresult();
            },
            // scope.callfetchService();
            this.view.flxLoadingIndicatorFrom.setVisibility(false);
    },
    showCancelPopup: function(flag) {
        var scope = this;
        // var flag =true;
        try {
            if (kony.application.getCurrentForm()) {
                var flxPopupFlex = new kony.ui.FlexScrollContainer({
                    id: "flxCancelPopup",
                    isVisible: true,
                    layoutType: kony.flex.FREE_FORM,
                    skin: "ICSknScrlFlx000000OP40",
                    left: "0dp",
                    top: "0dp",
                    centerY: "50%",
                    centerX: "50%",
                    width: "100%",
                    height: "100%",
                    zIndex: 1000,
                    enableScrolling: true,
                    scrollDirection: kony.flex.SCROLL_VERTICAL,
                    verticalScrollIndicator: true,
                    bounces: true,
                    allowVerticalBounce: true,
                    bouncesZoom: true,
                }, {}, {});
                flxPopupFlex.setDefaultUnit(kony.flex.DP);
                kony.application.getCurrentForm().add(flxPopupFlex);
                var customPopup = new com.InfinityOLB.Resources.CustomPopup({
                    autogrowMode: kony.flex.AUTOGROW_NONE,
                    id: "transfercancelPopup",
                    layoutType: kony.flex.FREE_FORM,
                    masterType: constants.MASTER_TYPE_DEFAULT,
                    isModalContainer: true,
                    isVisible: true,
                    appName: "ResourcesMA",
                });
                flxPopupFlex.add(customPopup);
                customPopup.doLayout = CommonUtilities.centerPopupFlex;
            }
            if (flag === true) {
                customPopup.btnNo.setVisibility(false);
                customPopup.btnYes.text = "Okay";
                customPopup.lblHeading.text = kony.i18n.getLocalizedString("i18n.TransfersEur.RemoveAttachmentPopupMsg");
                customPopup.lblHeading.text = kony.i18n.getLocalizedString("i18n.TransfersEur.RemoveAttachmentPopupMsg"); // kony.i18n.getLocalizedString("i18n.transfers.Cancel");
                customPopup.lblPopupMessage.text = "Sorry! You do not have any eligible accounts to access this feature. If you have any questions or need assistance, please contact our support team at 01-5970089 — we're here to help"; //kony.i18n.getLocalizedString("i18n.PayAPerson.CancelAlert");
                customPopup.flxCross.accessibilityConfig = {
                    a11yLabel: "Close this cancel dialog",
                    a11yARIA: {
                        tabindex: 0,
                        role: "button"
                    }
                };
                customPopup.btnYes.accessibilityConfig = {
                    a11yLabel: "Yes, cancel this process",
                    a11yARIA: {
                        tabindex: 0,
                        role: "button"
                    }
                };
                customPopup.btnNo.accessibilityConfig = {
                    a11yLabel: "No, don't cancel this process",
                    a11yARIA: {
                        tabindex: 0,
                        role: "button",
                        isVisible: false,
                    }
                };
            } else {
                customPopup.lblHeading.text = kony.i18n.getLocalizedString("i18n.TransfersEur.RemoveAttachmentPopupMsg"); //kony.i18n.getLocalizedString("i18n.TransfersEur.RemoveAttachmentPopupHeading");
                customPopup.lblPopupMessage.text = "Sorry! You do not have any eligible accounts to access this feature. If you have any questions or need assistance, please contact our support team at 01-5970089 — we're here to help";
                //kony.i18n.getLocalizedString("i18n.TransfersEur.RemoveAttachmentPopupMsg");
                customPopup.flxCross.accessibilityConfig = {
                    a11yLabel: "Close this cancel dialog",
                    a11yARIA: {
                        tabindex: 0,
                        role: "button"
                    }
                };
                customPopup.btnYes.accessibilityConfig = {
                    a11yLabel: "Yes, remove the attachment",
                    a11yARIA: {
                        tabindex: 0,
                        role: "button"
                    }
                };
                // customPopup.btnNo.accessibilityConfig = {
                //     a11yLabel: "No, don't remove the attachment",
                //     a11yARIA: {
                //         tabindex: 0,
                //         role: "button"
                //     }
                // };
                customPopup.accessibilityConfig = {
                    "a11yARIA": {
                        "role": "dialog",
                        "tabindex": -1
                    }
                }
            }
            customPopup.flxCross.onClick = () => {
                    flxPopupFlex.setVisibility(false);
                    kony.application.getCurrentForm().remove(flxPopupFlex);
                    if (this.rowId === null && this.sectionId === null) {
                        scope.view.btn1.setActive(true);
                    } else {
                        scope.view.segDocumentList.setActive(this.rowId, this.sectionId, "flxDocumentsList.btnRemoveAttachment");
                        scope.rowId = null;
                        scope.sectionId = null;
                    }
                }
                // customPopup.btnNo.onClick = () => {
                //     flxPopupFlex.setVisibility(false);
                //     kony.application.getCurrentForm().remove(flxPopupFlex);
                //     if (this.rowId === null && this.sectionId === null) {
                //         scope.view.btn1.setActive(true);
                //     } else {
                //         scope.view.segDocumentList.setActive(this.rowId, this.sectionId, "flxDocumentsList.btnRemoveAttachment");
                //         scope.rowId = null;
                //         scope.sectionId = null;
                //     }
                // }
            customPopup.btnYes.onClick = () => {
                flxPopupFlex.setVisibility(false);
                kony.application.getCurrentForm().remove(flxPopupFlex);
                if (flag === true) scope.onCancelTransfer(scope.context.transferFlow);
                else scope.deleteAttachment(null, indexInfo);
            }
            scope.view.forceLayout();
            document.addEventListener('keydown', function(event) {
                if (event.which === 27) {
                    kony.application.getCurrentForm().remove(flxPopupFlex);
                }
            });
            customPopup.flxCross.setFocus(true);
            // customPopup.onKeyPress = this.onKeyPressCallback.bind(this, flxPopupFlex);
            customPopup.lblHeading.setActive(true);
        } catch (err) {
            var errorObj = {
                "level": "ComponentController",
                "method": "showCancelPopup",
                "error": err
            };
            scope.onError(errorObj);
        }
    },
    postShow: function() {
        var scope = this;
        this.view.flxConsentApplicable.zIndex=10;
        var width = kony.application.getCurrentBreakpoint();
        if (width === 640) {
            scope.view.customheadernew.flxHamburger.width = "90%";
            scope.view.lblFromRecordField2.right = "15px";
            scope.view.lblConsenttypedropdown.right = "0px";
        } else if (width === 1024 || width === 768) {
            scope.view.customheadernew.flxHamburger.width = "60%";
        } else {
            if (width === 1366) {
                scope.view.customheadernew.flxHamburger.width = "500dp";
            } else {
                scope.view.customheadernew.flxHamburger.width = "28%";
            }
        }
        if (kony.application.getCurrentBreakpoint() == 640) {
            this.view.customheadernew.height = "51dp";
        }
        scope.setFromAccountsList();
        var navManager = applicationManager.getNavigationManager();
        var Hamburger =navManager.getCustomInfo('CrossBorderHam');
        if( Hamburger ==true){
            scope.SetDefaultAccount();
            navManager.setCustomInfo("CrossBorderHam", false);
        }
        if(scope.view.transfercancelPopup !=undefined){
            scope.view.transfercancelPopup.lblHeading.text = "Cross Border consent";
            scope.view.lblConsentStatusName.setVisibility(false);
                scope.view.flxConsentTypeDropdown.setVisibility(false);
                scope.view.flxConsentApplicationValues.setVisibility(false);
                scope.view.lblVPAName.setVisibility(false);
                scope.view.flxFromAccountList.setVisibility(false);
                scope.view.flxChangeConsentValues.setVisibility(false);
        }
    },
    onNavigate: function(param) {
        //this.view.UnifiedCrossBorder.setContext(param);
        //this.view.UnifiedCrossBorder.onError = this.onError;
        //this.view.UnifiedCrossBorder.onCancelTransfer = this.onCancelTransfer;
        //this.view.UnifiedCrossBorder.showErrorMessage = this.showErrorMessage;
        //this.view.UnifiedCrossBorder.createTransfer = this.createTransfer;
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
            //scope.view["lblFromRecordField4"].text=selectedRecord.lblRecordField4 || "";
            var navManager = applicationManager.getNavigationManager();
            navManager.setCustomInfo("AccountIdconsent", selectedRecord.lblRecordField4);
            scope.view.flxFromAccountSegment.setVisibility(false);
            this.view.flxLoadingIndicatorFrom.setVisibility(false);
            var configManager = applicationManager.getConfigurationManager();
            for (l = 0; l < scope_configManager.userAccounts['length']; l++) {
                if(this.view["segFromAccounts"].selectedRowItems[0].lblRecordField4 == scope_configManager.userAccounts[l].account_id) {
            this.setConsentApplicableDropdown(scope_configManager.userAccounts[l].supportTransferTo, scope_configManager.userAccounts[l].supportTransferFrom, applicationManager.getUserPreferencesManager().getUserObj().country, scope_configManager.userAccounts[l].currencyCode);
            break;
                }
            }
            // var param = {
            //    "vpaId":"56021275509",
            //     "consent":"APPROVED"
            // }
            // var ManageActivitiesPresenter = applicationManager.getModulesPresentationController({
            //     "appName": "TransfersMA",
            //     "moduleName": "ManageActivitiesUIModule"
            // });
            // ManageActivitiesPresenter.createConsentDetails(param);
            // var configManager = applicationManager.getConfigurationManager();
            // var userName = kony.sdk.getCurrentInstance().tokens[configManager.constants.IDENTITYSERVICENAME].provider_token.params.user_attributes.UserName;
            // var ManageActivitiesPresenter = applicationManager.getModulesPresentationController({
            //     "appName": "TransfersMA",
            //     "moduleName": "ManageActivitiesUIModule"
            // });
            // ManageActivitiesPresenter.getAccListDetails(userName);  
            var param = [];
            for (i = 0; i < scope_configManager.userAccounts['length']; i++) {
                if (selectedRecord.lblRecordField4 == scope_configManager.userAccounts[i].account_id) {
                    param = {
                        "customerId": scope_configManager.userAccounts[i].coreCustomerId,
                        "customerAccount": scope_configManager.userAccounts[i].account_id
                    }
                }
            }
            var ManageActivitiesPresenter = applicationManager.getModulesPresentationController({
                "appName": "TransfersMA",
                "moduleName": "ManageActivitiesUIModule"
            });
            ManageActivitiesPresenter.getAccVPADetails(param);
            /*if (scope.FromSearchApplied) {
                scope.view["segFromAccounts"].removeAll();
                scope.view["segFromAccounts"].setData(scope["groupedFromRecords"]);
            }*/
            //scope.businessController.storeSelectedAccountDataInCollection(selectedRecord, "From");
        } catch (err) {
            var errorObj = {
                "level": "ComponentController",
                "method": "onFromAccountSelection",
                "error": err
            };
            //scope.onError(errorObj);
        }
    },
    setFromAccountsList: function() {
        this.collectionObj = scope_configManager.userAccounts;
        var scope = this;
        try {
            scope.setAccountsSegmentTemplateAndWidgetMap(scope.view.segFromAccounts);
            var allAccounts = applicationManager.getAccountManager().getInternalAccounts();
			var segmentData = [];
            for (var i = 0; i < this.collectionObj.length; i++) {
                //isTransferSupportedTo
                var inWardAcc = false;
                var outWardAcc = false;
                if ((this.collectionObj[i].accountType === "Savings" || this.collectionObj[i].accountType === "Checking") && scope_configManager.userAccounts[i].supportTransferTo == "1") {
                    var account_name = CommonUtilities.mergeAccountNameNumber(this.collectionObj[i].nickName || this.collectionObj[i].accountName, this.collectionObj[i].Account_id);
                    var navManager = applicationManager.getNavigationManager();
                    navManager.setCustomInfo("accountname_id", account_name);
                    let amount = this.collectionObj[i].availableBalance;
                    let formattedAmount = scope.formatNumberWithCommas(amount); // To display amount in proper format
                    // var Available_balance = /*scope.getCurrencySymbol*/ (this.collectionObj[i].currencyCode) + " " + formattedAmount //scope.getFormattedAmount(this.collectionObj[i].availableBalance);
                    var Available_balance = applicationManager.getFormatUtilManager().convertAmountValue(amount, this.collectionObj[i].currencyCode)
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
                    inWardAcc = true;
                }
                if ((this.collectionObj[i].accountType === "Savings" || this.collectionObj[i].accountType === "Checking") && (scope_configManager.userAccounts[i].supportTransferFrom == "1" && applicationManager.getUserPreferencesManager().getUserObj().country =="IN")) {
                    var account_name = CommonUtilities.mergeAccountNameNumber(this.collectionObj[i].nickName || this.collectionObj[i].accountName, this.collectionObj[i].Account_id);
                    var navManager = applicationManager.getNavigationManager();
                    navManager.setCustomInfo("accountname_id", account_name);
                    let amount = this.collectionObj[i].availableBalance;
                    let formattedAmount = scope.formatNumberWithCommas(amount); // To display amount in proper format
                    // var Available_balance = /*scope.getCurrencySymbol*/ (this.collectionObj[i].currencyCode) + " " + formattedAmount //scope.getFormattedAmount(this.collectionObj[i].availableBalance);
                    var Available_balance = applicationManager.getFormatUtilManager().convertAmountValue(amount, this.collectionObj[i].currencyCode)
                    var navManager = applicationManager.getNavigationManager();
                    outWardAcc = true;
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
                    var count=0;
                    for(k=0;k<segmentData.length;k++){
                    if(segData.lblRecordField4==segmentData[k].lblRecordField4){
                        count=1;
                    }
                    }
                    if(count==0){
                    segmentData.push(segData);
                    }
                }
            }
            this.view.segFromAccounts.setData(segmentData);
            //var segData = scope.performSegmentDataMapping("segFromAccounts");
            var segData = segmentData;
            //var icon1Visibility = scope.hasMixAccounts(segData);
            for (var i = 0; i < segData.length; i++) {
                segData[i]["flxRecordFieldTypeIcon2"] = {
                    "isVisible": false
                };
                /*segData[i]["flxRecordFieldTypeIcon1"] = {
                  "isVisible": icon1Visibility
                };
                segData[i]["flxRecordFieldTypeIcon2"] = {
                  "isVisible": false
                };
                segData[i]["lblRecordFieldTypeIcon1"] = {
                  "text": (segData[i].isBusinessAccount === "true") || (segData[i].isBusinessPayee === "1") ? "r" : "s"
                };
                segData[i]["imgRecordFieldTypeIcon2"] = {
                  "src": ""
                };*/
                segData[i]["flxAccountsDropdownList"] = {
                    "height": "53dp"
                };
                segData[i]["flxAccountsDropdownListMobile"] = {
                    "height": "60dp"
                };
            }
            //scope.FromRecords = segData;
            if (scope.groupIdentifier != undefined) {
                scope.groupedFromRecords = scope.prepareAccountsSegmentData(segmentData, "From");
            } else {
                scope.groupedFromRecords = segData;
            }
            scope.view.segFromAccounts.setData(scope.groupedFromRecords);
            if (scope.view.segFromAccounts.data.length == 0) {
                scope.showCancelPopup(true);
            }
            // scope.showLoadingIndicator(false, "From");
            //scope.setAccountsDropdownHeight("From");
            //scope.setFromAccount();
        } catch (err) {
            var errorObj = {
                "level": "ComponentController",
                "method": "setFromAccountsList",
                "error": err
            };
            //scope.onError(errorObj);
        }
    },
    getCurrencySymbol: function(currencyCode) {
        var scope = this;
        scope.data = {
            USD: '$', // US Dollar
            EUR: '€', // Euro
            CRC: '₡', // Costa Rican Colón
            GBP: '£', // British Pound Sterling
            ILS: '₪', // Israeli New Sheqel
            INR: '₹', // Indian Rupee
            JPY: '¥', // Japanese Yen
            KRW: '₩', // South Korean Won
            NGN: '₦', // Nigerian Naira
            PHP: '₱', // Philippine Peso
            PLN: 'zł', // Polish Zloty
            PYG: '₲', // Paraguayan Guarani
            THB: '฿', // Thai Baht
            UAH: '₴', // Ukrainian Hryvnia
            VND: '₫', // Vietnamese Dong
            AUD: '$', // Australian Dollar
            CAD: '$', // Canadian Dollar
            CHF: 'Fr.', //Swiss Franc
        };
        var result = "";
        if (currencyCode) {
            if (this.data[currencyCode]) {
                result = this.data[currencyCode];
            }
        }
        return result;
    },
    getFormattedAmount: function(amountValue) {
        var scope = this;
        if (amountValue) {
            amountValue = amountValue.replace(/[^0-9\.-]+/g, "");
            return this.formatUtils.formatData("AMOUNT_WITHOUT_CURRENCY", amountValue);
        }
        return "";
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
        }
    },
    performSegmentDataMapping: function(segWidget) {
        var scope = this;
        try {
            var dataMapping = this.dataMapping;
            var conditionalDataMapping = this.conditionalMapping;
            var conditionalDataMappingKey = this.conditionalMappingKey;
            for (key in dataMapping) {
                if (key === "segments") {
                    var widgets = dataMapping[key];
                    for (key in widgets) {
                        if (segWidget === key) {
                            var widgetId = key;
                            var segData = scope.getSegmentDataFromMapping(widgets[widgetId], conditionalDataMapping[widgetId], conditionalDataMappingKey[widgetId], widgetId);
                            return segData;
                        }
                    }
                }
            }
        } catch (err) {
            var errorObj = {
                "level": "ComponentController",
                "method": "performSegmentDataMapping",
                "error": err
            };
            scope.onError(errorObj);
        }
    },
    getTransfersPreferredAccount: function() {
        var userObj = applicationManager.getUserPreferencesManager();
        var transferPreferedAccountId = userObj.getDefaultAccountforTransfers();
        return transferPreferedAccountId;
    },
};
});