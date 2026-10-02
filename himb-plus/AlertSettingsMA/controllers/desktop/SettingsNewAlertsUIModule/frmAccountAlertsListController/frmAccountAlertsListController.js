define(['CommonUtilities', 'CSRAssistUI','FormControllerUtility', 'OLBConstants', 'ViewConstants', 'CampaignUtility'], function(CommonUtilities, CSRAssistUI, FormControllerUtility, OLBConstants, ViewConstants, CampaignUtility) {
  var orientationHandler = new OrientationHandler();
  var responsiveUtils = new ResponsiveUtils();
  let recordsPerPage;
  let records = [];
  let multiCustomerSearchAccountSearchTerm = null;
  let keyCharCode = 0;
  let pageNumber;
  let isCustomerSegRowClick = false;
  let isCustomerSearch = false;

  return {
	alertaccounts:null,
    updateFormUI: function(viewModel) {
      if (viewModel !== undefined) {
        if (viewModel.serverError) {
          this.showServerError(viewModel.serverError);
        } else {
          if (viewModel.isLoading !== undefined) {
            this.changeProgressBarState(viewModel.isLoading);
          }
           if (viewModel.accountAlertsData) {
              this.setAccountAlerts(viewModel.accountAlertsData);
              FormControllerUtility.hideProgressBar(this.view);
           }
        }
      }
      this.view.lblAlertsHeading.setActive(true);
    },
    preShow:function()
    {
      var self=this;
      this.view.flxRight.setVisibility(true);
      applicationManager.getLoggerManager().setCustomMetrics(this, false, "Profile");
      this.view.postShow=this.postShowProfile;
      this.view.flxAccountSettingsCollapseMobile.onClick = this.toggleMenuMobile;
      FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter', 'flxMain','flxMenuItemMobile']);
      this.view.lblCollapseMobile.text  = "O";
      this.view.profileMenu.checkLanguage();
      //this.view.profileMenu.forceInitializeProfileMenu();
      //this.view.customheadernew.activateMenu("Settings","Alert Settings");
      this.setFlowActions();
      this.setAccessibility();
      this.view.onBreakpointChange = function() {
        self.onBreakpointChange(kony.application.getCurrentBreakpoint());
      }
      this.view.pagination.fetchPaginatedRecords = this.fetchPaginatedRecords;
      this.view.pagination.resetStartIndex();
      this.view.pagination.collapseDropDown();
      this.view.pagination.onError = this.onErrorHandler;
      let accountsCountConfig = applicationManager.getConfigurationManager().getConfigurationValue('accountsPerPage');
      recordsPerPage = accountsCountConfig.toString();
      this.view.pagination.recordsPerPage = recordsPerPage;
      // this.setRecordsPerPageList(recordsPerPage);
      this.selectedMultiCustomerSearchAccount = null;
      self.view.txtSearchAccount.setVisibility(true);
      this.view.flxSearchOrSelectAccount.onClick = this.showMultiCustomerAccountsSearch;
      this.view.txtSearchAccount.onBeginEditing = this.showMultiCustomerAccountsSearch;
      this.view.txtSearchAccount.onKeyUp = CommonUtilities.debounce(self.onKeyUpTxtSearchAccount.bind(self), OLBConstants.FUNCTION_WAIT, false);
      this.view.segSelectAccounts.onRowClick = this.segSelectAccountsRowClick.bind(this);
      this.view.flxClearSearchAccountText.onClick = this.clearSearchAccountText;
      this.view.segSelectAccounts.onKeyPress = this.onKeyPressSegSelectAccounts;
      this.multiCustomerSearchAccountSearchTerm = null;
      this.view.forceLayout();
    },
    /**
	* *@param {String} text- text that needs to be appended to the upper text in mobile breakpoint
	*  Method to set the text in mobile breakpoint
	*/
    setSelectedValue: function (text) {
      var self = this;
      self.view.lblAccountSettingsMobile.text = kony.i18n.getLocalizedString(text);
    },
    /**
	*  Method to set ui for the component in mobile breakpoint
	*/
    toggleMenuMobile: function () {
      if (this.view.lblCollapseMobile.text == "O") {
        this.view.lblCollapseMobile.text = "P";
        this.view.flxAccountSettingsCollapseMobile.accessibilityConfig = {
          "a11yARIA": {
            "tabindex": 0,
            "aria-expanded": true,
            "aria-labelledby":"lblAccountSettingsMobile",
            "role":"button"
          }
        }
        this.view.flxLeft.setVisibility(true);
        this.view.flxRight.setVisibility(false);
      } else {
        this.view.lblCollapseMobile.text  = "O";
        this.view.flxAccountSettingsCollapseMobile.accessibilityConfig = {
          "a11yARIA": {
            "tabindex": 0,
            "aria-expanded": false,
            "aria-labelledby":"lblAccountSettingsMobile",
            "role":"button"
          }
        }
        this.view.flxLeft.setVisibility(false);
        this.view.flxRight.setVisibility(true);
      }
    }, 
     
     
    
    /**
	* *@param {Boolean} isLoading- True or false to show/hide the progess bar
	*  Method to set show/hide the progess bar
	*/
    changeProgressBarState: function(isLoading) {
      if (isLoading) {
        FormControllerUtility.showProgressBar(this.view);
      }
    },
    postShowProfile: function() { 
      this.view.flxLeft.skin="slFbox";
      this.view.flxRight.skin="slFbox";
      this.view.flxSearch.skin="slFbox";
      this.view.flxMain.skin = "flxWhite";
      this.view.lblHeading.skin = "sknLbl851a1cPx20";
      this.view.lblAlertsHeading.skin = "sknSSPSemiBold42424215px";
      this.view.flxMainContainer.skin = "sknFlxffffffBorderRounded";
      this.view.flxAlertsWarningWrapper.skin="sknFlxffffffBorderRoundedLeftRed";
      this.view.flxFilter.skin="sknFlxffffffBorderRounded";
      this.view.flxSegFilterDropdown.skin="sknFlxffffffBorderRounded";
      this.view.tbxSearch.skin="skntbxroundborderhbl";
      // this.view.lblUsers.skin="sknSSPSemiBold42424215px";
      applicationManager.getNavigationManager().applyUpdates(this);
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
      //this.view.lblHeading.toolTip=kony.i18n.getLocalizedString("i18n.bulkWire.acknowledgmentHeader");
      this.view.lblHeading.text= kony.i18n.getLocalizedString("i18n.ProfileManagement.Settingscapson");
      this.view.forceLayout();
      this.view.CustomPopup.doLayout = CommonUtilities.centerPopupFlex;
      this.view.onKeyPress = this.onKeyPressCallBack;
      this.view.CustomPopup.onKeyPress = this.onKeyPressCallBack;
      this.view.customheadernew.collapseAll();
      this.view.lblAlertsHeading.setActive(true);
      this.view.flxDropdown.onClick = this.toggleFilterDropdown.bind(this, this.view.flxSegFilterDropdown, this.view.lblDropdown);
      this.view.segFilterDropdown.onRowClick = this.onSegFilterRowClick.bind(this, this.view.segFilterDropdown, this.view.flxSegFilterDropdown, this.view.lblDropdown, this.view.lblAccountTypeValue);
      this.view.tbxSearch.onKeyUp = this.onSearch;
      this.view.tbxCustomerSearch.onKeyUp = this.onCustomerSearch;
      this.view.flxClear.onClick = this.onClearBtnClick;
      this.view.flxCustomerDropdown.onClick = this.toggleFilterDropdown.bind(this, this.view.flxCustomerSeg, this.view.lblCustomerDropdown);
      this.view.flxCustomerClear.onClick = this.toggleFilterDropdown.bind(this, this.view.flxCustomerSeg, this.view.lblCustomerDropdown);
      this.view.segCustomer.onRowClick = this.onSegCustomerRowClick;
      this.view.segAccountType.onRowClick = this.onSegFilterRowClick.bind(this, this.view.segAccountType, this.view.flxAccountTypeSeg, this.view.lblAccountTypeDropdown, this.view.lblAccTypeValue);
      this.view.flxAccountTypeDropdown.onClick = this.toggleFilterDropdown.bind(this, this.view.flxAccountTypeSeg, this.view.lblAccountTypeDropdown);
      this.view.flxCusOrAccDropdown.onClick = this.toggleFilterDropdown.bind(this, this.view.flxCusOrAccSeg, this.view.lblCusOrAccDropdown);
      this.view.segCusOrAcc.onRowClick = this.onSegAccountRowClick;
      document.addEventListener('keydown', function (event) {
        keyCharCode = event.which;
      });
      if (kony.application.getCurrentBreakpoint() >= 1024) {
                this.view.segAlerts.width = "98%";
                this.view.flxAlertsHeader.width = "97%";
            }
     
      this.view.txtSearchAccount.text = "";
      this.view.flxCustomerFilter.onClick = this.toggleFilterDropdown.bind(this, this.view.flxCustomerSeg, this.view.lblCustomerDropdown);
},
    onKeyPressCallBack : function(eventobject,eventPayload){
        if(eventPayload.keyCode===27){
        if(this.view.flxDialogs.isVisible){
            this.view.flxDialogs.isVisible = false; 
        }
        if(kony.application.getCurrentBreakpoint()===640){
          if(this.view.flxLeft.isVisible){
              this.toggleMenuMobile();
              this.view.flxAccountSettingsCollapseMobile.setActive(true);
          }
      }
        this.view.customheadernew.onKeyPressCallBack(eventobject,eventPayload);
        }
      },
    onBreakpointChange: function (width) {
      var scope = this;
      FormControllerUtility.setupFormOnTouchEnd(width);
      responsiveUtils.onOrientationChange(this.onBreakpointChange);
      this.view.customheadernew.onBreakpointChangeComponent(width);
      this.view.customfooternew.onBreakpointChangeComponent(width);
      this.view.profileMenu.onBreakpointChangeComponent(width);
      orientationHandler.onOrientationChange(this.onBreakpointChange);
	  if(this.alertaccounts!==null)
            this.setAccountAlerts(this.alertaccounts);
    if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
      this.view.customheadernew.lblHeaderMobile.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.Alerts");
      this.view.customfooternew.lblCopyright.top ="220px";
      this.view.flxLeft.accessibilityConfig={
          a11yARIA:{
              "aria-live": "off",
              "tabindex":-1
          }
      };
      this.view.flxRight.accessibilityConfig={
          a11yARIA:{
              "aria-live": "off",
              "tabindex":-1
          }
      }
  } if (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet){
    this.view.customfooternew.flxFooterMenu.left ="0dp";
}
  else{
      this.view.flxLeft.accessibilityConfig={
          a11yARIA:{
              "tabindex":-1
          }
      }
      this.view.flxRight.accessibilityConfig={
          a11yARIA:{
              "tabindex":-1
          }
      }
  }
      this.view.forceLayout();      
    },
    setAccessibility: function(){
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
      this.view.customheadernew.lblHeaderMobile.text= kony.i18n.getLocalizedString("i18n.ProfileManagement.Alerts");
      this.view.flxAccountSettingsCollapseMobile.accessibilityConfig = {
        "a11yARIA": {
          "role":"button",
          "tabindex": 0,
          "aria-expanded": false,
          "aria-labelledby": "lblAccountSettingsMobile"
        }
      }
      this.view.lblHeading.accessibilityConfig = {
        "a11yARIA": {
          "tabindex": -1
        },
        "a11yLabel": kony.i18n.getLocalizedString("i18n.Alerts.AccountAlertSettingsRight")
      };

     
    },  
    /**
	*  Method to set the Form Flow Actions such as button onclick events
	*/
    setFlowActions:function(){
      var scopeObj=this;
     
    },
    
      /**
      * Method to handle UI of account alerts
      */
   setAccountAlerts: function(alertsData) {        
      var accounts = [];
	  this.alertaccounts = alertsData;
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
      var accountdetails = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('SettingsNewAlertsUIModule');
      var AlertName = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsNewAlertsUIModule").presentationController.getAlertsMenuValues();
      var AlertsCategories = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsNewAlertsUIModule").presentationController.getAlertsCategoryResponse();
               for(var i=0; i<AlertsCategories.records.length; i++){
                    if(AlertsCategories.records[i].alertcategory_id === AlertName){
                    this.view.profileMenu.activateMenu("ALERTSETTINGS", AlertsCategories.records[i].alertcategory_Name);
                    this.view.lblAlertsHeading.text=AlertsCategories.records[i].alertcategory_Name;
                    this.view.lblAccountSettingsMobile.text= AlertsCategories.records[i].alertcategory_Name;
					this.view.title = AlertsCategories.records[i].alertcategory_Name;
                    }
                }
      this.view.lblAlertsWarning.text= kony.i18n.getLocalizedString("i18n.Profilemanagement.lblAlertsWarningNew");
      accounts = accountdetails.presentationController.accounts; 

      for(var i=0; i < accounts.length; i++){
				for(var j=0; j < alertsData.accountAlerts.length; j++){
				  if(accounts[i].Account_id === alertsData.accountAlerts[j].accountID){
					accounts[i]["isEnabled"] = alertsData.accountAlerts[j].isEnabled;
				  }
				} 
       }
      let prioritizeAccountTypes = applicationManager.getTypeManager().getAccountTypesByPriority();
      accounts.sort(function (a, b) {
        return prioritizeAccountTypes.indexOf(a.accountType) - prioritizeAccountTypes.indexOf(b.accountType);
      });
      var isSingleCustomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
      if (!isSingleCustomerProfile) {
        this.setDataToView();
        this.setCustomersList(accounts);
      }
      this.setAccountAlertsByGrouping(accounts);
      isSingleCustomerProfile ? this.setSegFilterDropdown(this.view.lblAccountTypeValue, this.view.segFilterDropdown) : this.setSegFilterDropdown(this.view.lblAccTypeValue, this.view.segAccountType);
      this.checkAccountsCount(isSingleCustomerProfile);
     // FormControllerUtility.hideProgressBar(this.view);
    },
    
   
    
            
    setAccountAlertsByGrouping: function(alertsInput) {
        var filterList = function (input) {
          try {
            let accountData = JSON.parse(JSON.stringify(input));
            let filteredAccountData = accountData.filter(item => (!(["CLOSED"].includes(item["accountStatus"].toUpperCase())) && (item["externalIndicator"] == null ||item["externalIndicator"] == 'false')));
            return filteredAccountData;
          } catch(err){
            return input;
          }
        };
        var alerts = filterList(alertsInput);
        var scopeObj = this;
		var isCombinedUser = applicationManager.getConfigurationManager().getConfigurationValue('isCombinedUser') === "true";
        var isSingleCustomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;   
        var isBusinessUser = applicationManager.getConfigurationManager().getConfigurationValue('isSMEUser') === "true";
        
        this.view.segAlerts.widgetDataMap = {
            flxAccountTypeAlerts: "flxAccountTypeAlerts",
            flxRow2: "flxRow2",
            lblAccountType: "lblAccountType",
            btnModifyAlerts: "btnModifyAlerts",
            flxAlertsRow1: "flxAlertsRow1",
            flxAlertsStatusCheckbox: "flxAlertsStatusCheckbox",
            lblAlertStatusIndicator: "lblAlertStatusIndicator",
            lblAlertsStatus: "lblAlertsStatus",
            flxSeperator: "flxSeperator",
            lblSeperator: "lblSeperator",
            lblSeparator: "lblSeparator",
            lblAccountName: "lblAccountName",
            lblUsers:"lblUsers",
            flxAccountTypes:"flxAccountTypes",
            lblAccountNumber: "lblAccountNumber"
        };    
        //this.view.segAlerts.flxAccountIdAlerts.top="2%";
       this.view.segAlerts.setVisibility(true);
       let widgetData = this.getDataWithAccountTypeSections(alerts);
       this.view.segAlerts.setData(widgetData);
       let accountsCountConfig = applicationManager.getConfigurationManager().getConfigurationValue('accsCountCompactDashboard');
       if (isSingleCustomerProfile) {
        if (alertsInput.length <= parseInt(accountsCountConfig)) {
         // widgetData = this.getDataWithAccountTypeSections(alerts);
          this.showPagination(false);
          //this.view.segAlerts.setData(widgetData);
        } else {
          this.setPaginatedAccountAlerts(alerts);
          this.showPagination(true);
        }
       } else {
        let customerFilteredData = isCustomerSegRowClick ? alerts : this.onCustomerSelect(this.customerDetails[0].coreCustomerId);
        this.setDefaultCustomerView(customerFilteredData);
        this.setSearchOrSelectAccountsData();
       }
       
    },

    /**
     * @function : showPagination
     * @description : This function shows or hides pagination based on input
     * @param: {boolean} visibility
     * @public
     */
    showPagination: function (visibility) {
      this.view.flxPagination.setVisibility(visibility);
      if (visibility) {
          this.view.flxScrollAlertsBody.height = '590dp';
      } else {
          this.view.flxScrollAlertsBody.height = '645dp';
      }
    },
    
    /**
    *  creates the segment row data with section header , account number and other details
    */
    getDataWithAccountTypeSections: function (accounts) {
      var prioritizeAccountTypes = applicationManager.getTypeManager().getAccountTypesByPriority();
      let groupedAccounts = this.groupAccountsByAccountType(accounts);
      this.sectionData = [];
      var data = [];
      for (var key in prioritizeAccountTypes) {
        var accountType = prioritizeAccountTypes[key];
        if (groupedAccounts.hasOwnProperty(accountType)) {
          data.push(groupedAccounts[accountType]);
          this.sectionData.push(accountType);
        }
      }

      for (var section = 0; section < data.length; section++) {
        var sectionAccounts = data[section][1];
        for (j = 0; j < sectionAccounts.length; j++) {
          data[section][1][j] = this.createSegmentData(sectionAccounts[j], null, flag);
        }
      }

      return data;
    },
    
     getDataWithSections: function(accounts) {
                   var scopeObj = this;
                   var finalData = {};
                   var mobile = false ;
                   if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) 
                   {
                     mobile = true;
                   }
					var prioritizeAccountTypes = applicationManager.getTypeManager().getAccountTypesByPriority();
                    var headerTemplate = "";
                    var primaryCustomerId = applicationManager.getUserPreferencesManager().primaryCustomerId;
                    headerTemplate = "flxAccountTypes";
                    accounts.forEach(function(account) {
                        var accountRoleType = kony.i18n.getLocalizedString("i18n.accounts.personalAccounts");
                        if (account.isBusinessAccount === "false") {
                            if (primaryCustomerId.id === account.Membership_id && primaryCustomerId.type === 'personal') {
                                accountRoleType = "Personal Accounts";
                            } else {
                                accountRoleType = account.Membership_id;
                            }
                        } else {
                            accountRoleType = account.Membership_id;
                        }
                        account.accountRoleType = accountRoleType;
                        if (finalData.hasOwnProperty(accountRoleType) && account.Membership_id === finalData[accountRoleType][0]["membershipId"]) {
                            finalData[accountRoleType][1].push(account);
                        } else {
                            finalData[accountRoleType] = [{
                                    lblUsers: {
                                        "left" :mobile === true? "6dp":"20dp",
                                        "text": accountRoleType === "Personal Accounts" ? accountRoleType : account.MembershipName,
                                    },
                                    lblSeparator: {
                                        "text": ".",
                                        "isVisible": true,
                                    }, 
                                  flxAccountTypes :{
                                    "skin" :mobile === true ? "sknFlxf8f7f8Border0": "sknflxBgffffffPointer"
                                  },
                                    membershipId: account.Membership_id,
                                    membershipName: account.MembershipName,
                                    template: headerTemplate
                                },
                                [account]
                            ];
                        }
                    });
                     var sectionData = [];
					 var data = [];
					var prioritizeAccountRoleTypes = [];
                    var viewType = applicationManager.getConfigurationManager().getConfigurationValue('combinedDashboardView');
                    var sections = Object.keys(finalData);
                    var index = sections.indexOf(kony.i18n.getLocalizedString("i18n.accounts.personalAccounts"));
                    if (index > -1) {
                        sections.splice(index, 1);
                    }
                    index = sections.indexOf(kony.i18n.getLocalizedString("i18n.accounts.businessAccounts"));
                    if (index > -1) {
                        sections.splice(index, 1);
                    }
                    prioritizeAccountRoleTypes.push(kony.i18n.getLocalizedString("i18n.accounts.personalAccounts"));
                    prioritizeAccountRoleTypes.push(kony.i18n.getLocalizedString("i18n.accounts.businessAccounts"));
                    prioritizeAccountRoleTypes = prioritizeAccountRoleTypes.concat(sections);
					 for (var key in prioritizeAccountRoleTypes) {
                        var accountRoleType = prioritizeAccountRoleTypes[key];
                        if (finalData.hasOwnProperty(accountRoleType)) {
                            data.push(finalData[accountRoleType]);
                            sectionData.push(accountRoleType);
                        }
                    }
                    for (var section = 0; section < data.length; section++) {
                        var sectionAccounts = data[section][1];
                        for (j = 0; j < sectionAccounts.length; j++) {
                            data[section][1][j] = this.createSegmentData(sectionAccounts[j]);
                        }
                    }
                    return data;
                },

    
  createSegmentData: function(account) {
		var dataObject;
	    dataObject = this.settingRowDataForAccount(account);
		return dataObject;
	},
    
    settingRowDataForAccount: function(account) {
        var scopeObj = this;
      var mobile = false ;
           if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) 
             {
               mobile = true;
             }
		var dataObject = {
			 lblAccountName: {
                text: account.nickName,
              },
              btnModifyAlerts: {
                text: "View",//kony.i18n.getLocalizedString("kony.alerts.viewModify"),
                "accessibilityConfig": {
                  "a11yLabel": kony.i18n.getLocalizedString("kony.alerts.viewModify") + " Account alerts for account " + account.accountID,
                  "a11yARIA":{
                    "role":"button",
                    "tabindex":0
                  }
                },
               onClick: scopeObj.onViewModifyAlertByID.bind(this,account, account.alertID)
              },
              lblAlertStatusIndicator: {
                skin: account.isEnabled === "false" ? "sknstatusDeactivateUMNew": ViewConstants.SKINS.ACTIVE_STATUS_SKIN,
              },
              lblAlertsStatus: {
                text: account.isEnabled === "false" ? kony.i18n.getLocalizedString("i18n.Alerts.DisabledAlerts") : kony.i18n.getLocalizedString("i18n.alerts.alertsEnabled"),
              },
              lblSeperator: {
                "text": ".",
              },
              lblAccountNumber: {
                "skin" :mobile === true?"bbSknLbl424242SSP17Px" : "sknlbl727272SSP13px",
                "text": kony.i18n.getLocalizedString("i18n.common.accountNumber") + " " + account.accountID,
              },
              template: "flxAccountIdAlerts"
		};
		return dataObject;
	},
    
    onViewModifyAlertByID: function(accountDetails,alertID) {
      var accountID = accountDetails.Account_id;
        var AlertName = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsNewAlertsUIModule").presentationController.getAlertsMenuValues();
            var params = {
                "AlertCategoryId": AlertName,
                "AccountId": accountID
            };
        kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsNewAlertsUIModule").presentationController.fetchAlertsDataById(params, accountDetails);
    },
    
    onViewModifyAlerts: function(accountTypeId,alertID) {
        var params = {
            "AlertCategoryId": alertID,
            "AccountId": accountTypeId
        };
        kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ProfileModule").presentationController.fetchAlertsDataById(params);
    },

    /**
     * @function : onErrorHandler
     * @description : This function handles errors thrown from pagination component
     * @param: {JSONObject} errorObj
     * @public
     */
    onErrorHandler: function (errorObj) {
      kony.print("frmAccountAlertsList Error: " + errorObj);
    },

    /**
     * @function : fetchPaginatedRecords
     * @description : Updates the segment based on the number of records per page selected or next/previous buttons are clicked
     * @param offset : offset of the record to be rendered in UI
     * @param noOfRecords : total number of account alert records
     * @return NA
     */
    fetchPaginatedRecords: function (offset, noOfRecords) {
      this.view.flxFormContent.setContentOffset({
        x: "0%",
        y: "0%"
      }, true);
      recordsPerPage = noOfRecords;
      let segmentData = this.getDataWithAccountTypeSections(records.slice(offset, offset + noOfRecords));
      this.view.segAlerts.setData(segmentData);
      this.view.pagination.updatePaginationBar(noOfRecords, records.length);
      this.view.forceLayout();
    },

    /**
     * @function : groupAccountsByAccountType
     * @description : Method to group accounts by account type
     * @param : accounts
     * @return {JSONObject} groupedAccounts
     */
    groupAccountsByAccountType: function (accounts) {
      let groupedAccounts = {};
      let headerTemplate = "flxAccountTypes";
      let mobile = false;
      if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
        mobile = true;
      }
      accounts.forEach(function (account) {
        var accountType = applicationManager.getTypeManager().getAccountType(account.accountType);
        if (groupedAccounts.hasOwnProperty(accountType)) {
          groupedAccounts[accountType][1].push(account);
        } else {
          groupedAccounts[accountType] = [{
              lblUsers: {
                "left": mobile === true ? "6dp" : "20dp",
                "text": applicationManager.getTypeManager().getAccountTypeDisplayValue(accountType) != undefined ? applicationManager.getTypeManager().getAccountTypeDisplayValue(accountType) : accountType + " " + kony.i18n.getLocalizedString("i18n.topmenu.accounts"),
              },
              lblSeparator: {
                "text": ".",
                "isVisible": true,
              },
              flxAccountTypes: {
                "skin": mobile === true ? "sknFlxf8f7f8Border0" : "sknflxBgffffffPointer"
              },
              template: headerTemplate
            },
            [account]
          ];
        }
      });
      return groupedAccounts;
    },

    /**
     * @function : setPaginatedAccountAlerts
     * @description : Method to paginated data to alerts segment
     * @param {JSONArray} : allAlerts
     */
    setPaginatedAccountAlerts : function (allAlerts) {
      pageNumber = 1;
      records = allAlerts;
      let currentPageData = this.getDataOfPage();
      let segmentData = this.getDataWithAccountTypeSections(currentPageData);
      this.view.segAlerts.setData(segmentData);
      this.view.pagination.resetStartIndex();
      this.view.pagination.updatePaginationBar(0, records.length);
      this.view.forceLayout();
    },

    /**
     * @function : getDataOfPage
     * @description : Method to get records of a particular page
     * @return {Array} Alerts of a particular page
     */
    getDataOfPage: function () {
        return records.slice((pageNumber - 1) * recordsPerPage, pageNumber * recordsPerPage);
    },

    /**
     * @function : setRecordsPerPageList
     * @description : Method to set recordsPerPageList property of pagination component
     * @param {String} : recordsPerPage
     */
    setRecordsPerPageList: function (recordsPerPage) {
      let recordsPerPageListArr = [];
      let recordsPerPageObj = {};
      recordsPerPageObj[recordsPerPage] = recordsPerPage + " Per Page";
      recordsPerPageListArr.push(recordsPerPageObj);
      this.view.pagination.recordsPerPageList = JSON.stringify(recordsPerPageListArr);
    },

   /**
    *  Method to toggle the filter dropdown icon
    */
   toggleFilterDropdown: function(flx, label) {
    if (label.text === "O") {
        label.text = "P";
        flx.isVisible = true;
        if (flx.id === "flxCustomerSeg") {
            this.view.tbxCustomerSearch.isVisible = true;
            this.view.tbxCustomerSearch.setFocus(true);
            this.view.flxCustomerClear.isVisible = true;
            this.view.lblCustomerValue.isVisible = false;
            this.view.flxCustomerDropdown.isVisible = false;
            if(isCustomerSearch) {
              this.setCustomerDataToSeg(this.customerDetails, false);
              isCustomerSearch = false;
            }
        }
    } else if (label.text === "P") {
        label.text = "O";
        flx.isVisible = false;
        if (flx.id === "flxCustomerSeg") {
            this.view.tbxCustomerSearch.isVisible = false;
            this.view.tbxCustomerSearch.text = "";
            this.view.flxCustomerClear.isVisible = false;
            this.view.lblCustomerValue.isVisible = true;
            this.view.flxCustomerDropdown.isVisible = true;
            if(isCustomerSearch) {
              this.setCustomerDataToSeg(this.customerDetails, false);
              isCustomerSearch = false;
            }
        }
    }
   },

    /**
     * Method to set the filter dropdown values
     */
    setSegFilterDropdown: function(label, segName) {
      this._prevIdx = 0;
      let dropdownData = ["All"], segData =[];
      label.text = "All";
      var prioritizeAccountTypes = applicationManager.getTypeManager().getAccountTypesByPriority();
      segName.widgetDataMap = {
          "lblCheckFeature": "lblCheckFeature",
          "lblFeatureName": "lblFeatureName"
      };
      let record = this.alertaccounts.accountAlerts;
      for (let key in prioritizeAccountTypes) {
          let accountType = prioritizeAccountTypes[key];
          for (let rec in record) {
              if (record[rec].accountType === accountType) {
                  dropdownData.push(accountType);
              }
          }
      }
      let filteredDropdownData = dropdownData.filter((item, index) => dropdownData.indexOf(item) === index);
      this.filteredDropdownData = filteredDropdownData;
      for (var i = 0; i < filteredDropdownData.length; i++) {
        let accountType = filteredDropdownData[i];
          var accountData = {
              "lblCheckFeature": {
                  "text": i === 0 ? ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO : ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO,
                  "skin": i === 0 ? "sknRadioselectedFonticon" : "sknRadioGreyUnselectedFonticon929292"
              },
              "lblFeatureName": {
                  "text": applicationManager.getTypeManager().getAccountTypeDisplayValue(accountType) != undefined ? applicationManager.getTypeManager().getAccountTypeDisplayValue(accountType) : accountType === "All" ? accountType : accountType + " " + kony.i18n.getLocalizedString("i18n.topmenu.accounts"),
                  "skin": "bbSknLbl424242SSP15Px"
              },
              "id" : i
          };
          segData.push(accountData)
      }
      segName.setData(segData);
    },

    /**
     * Method to set selected & unselected row in filter segment when a row is clicked
     */
    onSegFilterRowClick: function(seg, dropdownFlx, dropdownLabel, label) {
      let data = seg.data;
      let rowIndex = seg.selectedRowIndex[1];
      if (this._prevIdx === rowIndex) {
          this.toggleFilterDropdown(dropdownFlx, dropdownLabel);
          return;
      }
      if (this._prevIdx !== null && this._prevIdx !== undefined) {
          data[this._prevIdx].lblCheckFeature.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
          data[this._prevIdx].lblCheckFeature.skin = "sknRadioGreyUnselectedFonticon929292";
          seg.setDataAt(data[this._prevIdx], this._prevIdx);
      }
      data[rowIndex].lblCheckFeature.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;
      data[rowIndex].lblCheckFeature.skin = "sknRadioselectedFonticon";
      seg.setDataAt(data[rowIndex], rowIndex);
      label.text = data[rowIndex].lblFeatureName.text;
      this._prevIdx = rowIndex;
      let filteredData = this.onFilterSelect(this.filteredDropdownData[rowIndex], this.view.segCustomer.data[this.cusSelectedRowIndex ? this.cusSelectedRowIndex : 0]);
      this.setFilteredDataToSeg(filteredData);
      this.toggleFilterDropdown(dropdownFlx, dropdownLabel);
  },
    
  /**
    * Method to set the selected account to the segment
    */ 
  onFilterSelect: function(accountType, segData) {
    var isSingleCustomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
    let filteredData = [], accounts = [];
    let accountdetails = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('SettingsNewAlertsUIModule');
    if (isSingleCustomerProfile) {
        accounts = accountdetails.presentationController.accounts;
    } else {
        let customerId = segData ? segData.customerId ? segData.customerId : "" : "";
        accounts = customerId !== "" ? this.onCustomerSelect(customerId) : accountdetails.presentationController.accounts;
    }
    if (accountType !== undefined && accountType !== "All") {
        filteredData = accounts.filter(
            (elem) => (elem && elem.accountType === accountType));
    } else {
        filteredData = accounts;
    }
    this.filteredSegAccData = filteredData;
    return filteredData;
  },
  
   /**
    * Method to used to search the accounts based on account name or number
    */ 
  setFilteredDataToSeg: function (filteredData) {
    for (var i = 0; i < filteredData.length; i++) {
        for (var j = 0; j < this.alertaccounts.accountAlerts.length; j++) {
            if (filteredData[i].Account_id === this.alertaccounts.accountAlerts[j].accountID) {
                filteredData[i]["isEnabled"] = this.alertaccounts.accountAlerts[j].isEnabled;
            }
        }
    }
    this.setAccountAlertsByGrouping(filteredData);
  },

  /**
    * Method to used to search the accounts based on account name or number
    */ 
  onSearch: function (accountType) {
    this.view.flxClear.isVisible = true;
    let searchKeyword =  this.view.tbxSearch.text;
    if (searchKeyword.length > 0) {
      this.view.flxClear.isVisible = true;
    } else {
      this.view.flxClear.isVisible = false;
    }
    let accountdetails = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('SettingsNewAlertsUIModule');
    let accounts = accountdetails.presentationController.accounts;
    let prioritizeAccountTypes = applicationManager.getTypeManager().getAccountTypesByPriority();
    accounts.sort(function (a, b) {
      return prioritizeAccountTypes.indexOf(a.accountType) - prioritizeAccountTypes.indexOf(b.accountType);
    });
    let filteredData = this.filteredSegAccData !== undefined ? this.filteredSegAccData : accounts;
    let searchCriteria = [{field:"account_id"},{field:"accountName"}];
    if (searchKeyword.length >= 1) {  
      let searchData = this.filterData(filteredData, searchKeyword, searchCriteria);
      if(Array.isArray(searchData) && searchData.length > 0) {
        this.setFilteredDataToSeg(searchData);
        this.view.flxNoAccountsFound.isVisible = false;
        this.view.flxAlertsSeperator2.isVisible = true;
      } else {
        this.setFilteredDataToSeg(searchData);
        this.view.flxNoAccountsFound.isVisible = true;
        this.view.flxAlertsSeperator2.isVisible = false;
      }
      
    } else {
      this.setFilteredDataToSeg(filteredData);
    }
  },
  
   /**
    * Method to used to filter the search data
    */ 
   filterData: function (accounts, filterBy, searchCriteria) {
    let filteredData = [];
    filteredData = accounts.filter(function (record) {
        for (var i = 0; i < searchCriteria.length; i++) {
            try {
                if (record[searchCriteria[i].field] &&
                    record[searchCriteria[i].field].toUpperCase().includes(filterBy.toUpperCase()))
                    return true;
            } catch (err) {
                //implicit non-match, skip to next field or record
            }
        }
        return false;
    });
    return filteredData;
  },

  /**
   * @function : setSearchOrSelectAccountsData
   * @description : Method to set initial segment data to Search or select accounts in Multi Customer scenario
   */
  setSearchOrSelectAccountsData: function () {
    this.view.segSelectAccounts.rowTemplate = "flxAlertsAccountsSearchList";
    this.view.segSelectAccounts.sectionHeaderTemplate = "flxAlertsAccountsSearchHeader";
    this.view.segSelectAccounts.widgetDataMap = {
      "flxAlertsAccountsSearchList": "flxAlertsAccountsSearchList",
      "flxAlertsAccountsSearchListItem": "flxAlertsAccountsSearchListItem",
      "lblAccountName": "lblAccountName",
      "lblAccountCustomer": "lblAccountCustomer",
      "flxAlertsAccountsSearchHeader": "flxAlertsAccountsSearchHeader",
      "lblAccountsSearchHeader": "lblAccountsSearchHeader",
      "imgDropDown": "imgDropDown",
      "flxDropDown": "flxDropDown",
      "lblSeparator": "lblSeparator",
      "lblTopSeparator": "lblTopSeparator",
      "flxAccountTypeContainer": "flxAccountTypeContainer",
      "lblAccType": "lblAccType",
      "lblAccountName": "lblAccountName",
    };
    let accountdetails = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('SettingsNewAlertsUIModule');
    let accounts = accountdetails.presentationController.accounts;
    let filteredAccounts = [];
    if (this.multiCustomerSearchAccountSearchTerm) {
      filteredAccounts = accounts.filter((account) => {
        return CommonUtilities.substituteforIncludeMethod(account.nickName.toLowerCase(), this.multiCustomerSearchAccountSearchTerm) 
          || CommonUtilities.substituteforIncludeMethod(account.accountID, this.multiCustomerSearchAccountSearchTerm);
      });
    } else {
      filteredAccounts = accounts;
    }
    if (filteredAccounts.length == 0) {
      this.view.segSelectAccounts.setVisibility(false);
      this.view.lblNoSearchAccountsResults.setVisibility(true);
      this.selectedMultiCustomerSearchAccount = null;
    } else {
      this.view.segSelectAccounts.setVisibility(true);
      this.view.lblNoSearchAccountsResults.setVisibility(false);
      let segmentData = this.getMultiCustomerSelectAccountsData(filteredAccounts);
      this.view.segSelectAccounts.setData(segmentData);
      this.setSearchOrSelectAccountsSegmentHeight(segmentData);
    }
    this.view.forceLayout();
  },

  /**
   * @function : getMultiCustomerSelectAccountsData
   * @description : Method to prepare and return segment data for Search or select accounts in Multi Customer scenario
   * @param {JSONArray} accounts
   */
  getMultiCustomerSelectAccountsData: function (accounts) {
    let scopeObj = this;
    let finalData = {};
    let data = [];
    let prioritizeAccountTypes = ["Personal Accounts"];
    let isSectionExpanded = false;
    let isSectionHeaderHidden = (scopeObj.multiCustomerSearchAccountSearchTerm);
    if (isSectionHeaderHidden) {
      accounts.forEach((account) => {
        data.push(scopeObj.createMultiCustomerAccountSearchSegmentData(account, true));
      });
    } else {
      accounts.forEach(function (account) {
        let accountType = "Personal Accounts";
        let primaryCustomerId = applicationManager.getUserPreferencesManager().primaryCustomerId;
  
        if (primaryCustomerId.id === account.Membership_id && primaryCustomerId.type === 'personal') {
          accountType = "Personal Accounts";
        } else {
          accountType = account.Membership_id;
        }
  
        isSectionExpanded = (scopeObj.multiCustomerSearchAccountSearchTerm) || accountType === "Personal Accounts";
  
        if (finalData.hasOwnProperty(accountType) && account.Membership_id === finalData[accountType][0]["membershipId"]) {
          finalData[accountType][1].push(scopeObj.createMultiCustomerAccountSearchSegmentData(account, isSectionExpanded));
          let totalAccount = finalData[accountType][1].length;
          finalData[accountType][0].lblAccountsSearchHeader = {
            "text": account.MembershipName + " - " + account.coreCustomerId + " (" + totalAccount + ")"
          }
        } else {
          if (accountType != "Personal Accounts") {
            prioritizeAccountTypes.push(accountType);
          }
          finalData[accountType] = [{
              lblAccountsSearchHeader: account.MembershipName + " - " + account.coreCustomerId + " (1)",
              lblSeparator: {
                "isVisible": true
              },
              lblTopSeparator: {
                "isVisible": false
              },
              imgDropDown: {
                "text": isSectionExpanded ? "P" : "O",
              },
              flxDropDown: {
                "accessibilityConfig": {
                  "a11yARIA": {
                    "aria-expanded": isSectionExpanded,
                    "aria-label": isSectionExpanded ? "dropdown expanded" : "dropdown collapsed",
                    "role": "button"
                  }
                },
                "onKeyPress": scopeObj.dropdownKeyPress,
                "onClick": function (context) {
                  scopeObj.showOrHideAccountRows(context);
                }.bind(this)
              },
              template: "flxAlertsAccountsSearchHeader",
              membershipId: account.Membership_id
            },
            [scopeObj.createMultiCustomerAccountSearchSegmentData(account, isSectionExpanded)]
          ];
        }
      });
      for (let key in prioritizeAccountTypes) {
        let accountType = prioritizeAccountTypes[key];
        if (finalData.hasOwnProperty(accountType)) {
          data.push(finalData[accountType]);
        }
      }
    }
    return data;
  },

  /**
   * @function : createMultiCustomerAccountSearchSegmentData
   * @description : Method to prepare account list data for Search or select accounts in Multi Customer scenario
   * @param {JSONObject} account
   * @param {Boolean} isSectionExpanded
   */
  createMultiCustomerAccountSearchSegmentData: function (account, isSectionExpanded) {
    let accountName = "";
    if ((account.accountID || account.Account_id) && (account.accountName)) {
      accountName = CommonUtilities.getAccountDisplayName(account);
    }
    let profileAccess = applicationManager.getUserPreferencesManager().profileAccess;
    let dataObject = {
      "lblAccountName": accountName,
      "accountID": account.Account_id || account.accountID,
      "currencyCode": account.currencyCode,
      "Membership_id": account.Membership_id,
      "lblSeparator": {
        "isVisible": true
      },
      "lblAccType": {
        "text": account.accountType,
        "left": profileAccess === "both" ? "7px" : "20px",
      },
      "flxAccountTypeContainer": {
        "left": profileAccess === "both" ? "15px" : "0px"
      },
      "flxAlertsAccountsSearchListItem": {
        "isVisible": true
      },
      "flxAlertsAccountsSearchList": {
        "height": isSectionExpanded ? "76dp" : "0dp",
        "isVisible": isSectionExpanded,
        "accessibilityConfig": {
          "a11yLabel": ("Account Name" + " " + accountName + " " + "Account Type" + " " + account.accountType),
          "a11yARIA": {
            "tabindex": 0,
            "role": "button"
          },
        },
      },
      "lblAccountCustomer": {
        "text": account.MembershipName + " - " + account.coreCustomerId
      },
    };
    return dataObject;
  },

  /**
   * @function : dropdownKeyPress
   * @description : Method invoked on dropdown key press in Search or select account for Multi Customer scenario
   */
  dropdownKeyPress: function (eventobject, eventPayload, context) {
    if (eventPayload.keyCode === 27) {
      this.view.flxSearchAccountsSegmentContainer.setVisibility(false);
      this.view.txtSearchAccount.setVisibility(false);
      this.view.flxSearchOrSelectAccount.accessibilityConfig = {
        "a11yLabel": "Select or search account",
        a11yARIA: {
          "tabindex": 0,
          "role": "button"
        }
      }
      eventPayload.preventDefault();
      this.view.flxSearchOrSelectAccount.setActive(true);
    }
    if (eventPayload.keyCode === 9) {
      if (eventPayload.shiftKey === true) {
        if (context.sectionIndex === 0) {
          this.view.flxSearchAccountsSegmentContainer.setVisibility(false);
          this.view.txtSearchAccount.setVisibility(false);
          this.view.flxSearchOrSelectAccount.accessibilityConfig = {
            "a11yLabel": "Select or search account",
            a11yARIA: {
              "tabindex": 0,
              "role": "button"
            }
          }
          eventPayload.preventDefault();
          this.view.flxSearchOrSelectAccount.setActive(true);
        }
      }
    }
  },

  /**
   * @function : showOrHideAccountRows
   * @description : Method invoked on dropdown click in Search or select account for Multi Customer scenario
   */
  showOrHideAccountRows: function(context) {
    let section = this.view.segSelectAccounts.selectedRowIndex[0];
    let segData = this.view.segSelectAccounts.data;
    let isRowVisible = true;
    if (segData[section][0].imgDropDown.text === "O") {
        segData[section][0]["imgDropDown"] = {
            text: "P"
        };
        isRowVisible = true;
        segData[section][0].flxDropDown.accessibilityConfig = {
            "a11yARIA": {
                "aria-expanded": true,
                "aria-label": "dropdown expanded",
                "role": "button"
            }
        }
    } else {
        segData[section][0]["imgDropDown"] = {
            text: "O"
        };
        isRowVisible = false;
        segData[section][0].flxDropDown.accessibilityConfig = {
            "a11yARIA": {
                "aria-expanded": false,
                "aria-label": "dropdown collapsed",
                "role": "button"
            }
        }
    }
    for (let i = 0; i < segData[section][1].length; i++) {
        let flxAlertsAccountsSearchList = JSON.parse(JSON.stringify(segData[section][1][i].flxAlertsAccountsSearchList));
        flxAlertsAccountsSearchList["isVisible"] = isRowVisible;
        flxAlertsAccountsSearchList["height"] = isRowVisible ? "76dp" : "0dp";
        this.updateKeyAt("flxAlertsAccountsSearchList", flxAlertsAccountsSearchList, i, section);
    }
    segData = this.view.segSelectAccounts.data;
    this.view.segSelectAccounts.setSectionAt(segData[section], section);
    this.setSearchOrSelectAccountsSegmentHeight(segData);
    this.view.segSelectAccounts.setActive(-1, section, "flxAlertsAccountsSearchHeader.flxDropDown");
  },

  /**
   * @function : setSearchOrSelectAccountsSegmentHeight
   * @description : Sets height of flxSearchAccountsSegmentContainer based on current state
   */
  setSearchOrSelectAccountsSegmentHeight: function (data) {
    var totalHeight = 0;
    for (var i = 0; i < data.length; i++) {
      if (this.multiCustomerSearchAccountSearchTerm) {
        if (data[i] && data[i]["flxAlertsAccountsSearchList"] && data[i]["flxAlertsAccountsSearchList"].height !== "0dp") {
          totalHeight += 76;
        }
      } else {
        if (data[i] && data[i][1] && data[i][1][0] && data[i][1][0]["flxAlertsAccountsSearchList"] &&
          data[i][1][0]["flxAlertsAccountsSearchList"].height !== "0dp") {
          totalHeight += data[i][1].length * 76;
        }
      }
    }
    if (this.multiCustomerSearchAccountSearchTerm) {
      totalHeight += 5;
    } else {
      totalHeight += (data.length * 40) + 5;
    }
    this.view.flxSearchAccountsSegmentContainer.height = totalHeight >= 300 ? "300dp" : totalHeight + "dp";
  },

  /**
   * @function : updateKeyAt
   * @description : Updates row level widget in segSelectAccounts
   */
  updateKeyAt: function(widgetName, value, row, section) {
      var data = this.view.segSelectAccounts.data;
      var rowDataTobeUpdated = data[section][1][row];
      rowDataTobeUpdated[widgetName] = value;
      this.view.segSelectAccounts.setDataAt(rowDataTobeUpdated, row, section);
  },

  /**
   * @function : showOrHideClearAccBtn
   * @description : Shows or hides clear text button in search or select account
   * @param {Boolean} : isDropdownHidden
   */
  showOrHideClearAccBtn: function (isDropdownHidden) {
    if (!isDropdownHidden) {
      this.view.flxClearSearchAccountText.isVisible = false;
      this.view.flxSearchAccountDropdownIcon.isVisible = true;
      return;
    } else {
      this.view.flxSearchAccountDropdownIcon.isVisible = false;
      this.view.flxClearSearchAccountText.isVisible = true;
    }
  },

  /**
   * @function : clearSearchAccountText
   * @description : Clear text in search or select account textbox
   */
  clearSearchAccountText: function () {
    this.view.txtSearchAccount.text = "";
    this.selectedMultiCustomerSearchAccount = null;
    this.onKeyUpTxtSearchAccount();
    this.view.txtSearchAccount.setFocus(true);
  },

  /**
   * @function : onKeyUpTxtSearchAccount
   * @description : Invoked onKeyUp event of txtSearchAccount
   */
  onKeyUpTxtSearchAccount: function() {
    this.multiCustomerSearchAccountSearchTerm = this.view.txtSearchAccount.text.toLowerCase();
    if (keyCharCode === 27) {
        this.view.flxSearchAccountsSegmentContainer.setVisibility(false);
        this.showOrHideClearAccBtn(false);
        return;
    }
    this.view.flxSearchAccountsSegmentContainer.setVisibility(true);
    this.showOrHideClearAccBtn(true);
    this.setSearchOrSelectAccountsData();
    this.view.forceLayout();
  },

  /**
   * @function : onKeyPressSegSelectAccounts
   * @description : Invoked onKeyPress event of segSelectAccounts
   */
  onKeyPressSegSelectAccounts: function (eventobject, eventPayload) {
    if (eventPayload.keyCode === 27) {
      this.view.flxSearchAccountsSegmentContainer.setVisibility(false);
      this.showOrHideClearAccBtn(false);
      return;
    }
    this.view.flxSearchAccountsSegmentContainer.setVisibility(true);
    this.showOrHideClearAccBtn(true);
    this.view.forceLayout();
  },

  /**
   * @function : showMultiCustomerAccountsSearch
   * @description : Invoked onBeginEditing and onClick events to show accounts segment in multi customer scenario
   */    
  showMultiCustomerAccountsSearch: function () {
    this.view.txtSearchAccount.setVisibility(true);
    this.view.lblSelectAccount.setVisibility(false);
    this.view.flxSearchOrSelectAccount.accessibilityConfig = {
      "a11yLabel": "Search or select account",
      "a11yARIA": {
        "tabindex": -1,
      }
    };
    this.view.flxSearchAccountsSegmentContainer.setVisibility(true);
    this.showOrHideClearAccBtn(true);
    this.view.txtSearchAccount.text = "";
    this.view.txtSearchAccount.setFocus(true);
  },

  /**
   * @function : segSelectAccountsRowClick
   * @description : Invoked onRowClick event of segSelectAccounts
   */  
  segSelectAccountsRowClick: function() {
    let selectedAccount = this.view.segSelectAccounts.selectedRowItems[0];
    this.selectedMultiCustomerSearchAccount = selectedAccount;
    let selectedAccountId = selectedAccount.accountID;
    this.view.txtSearchAccount.text = selectedAccount.lblAccountName;
    this.view.txtSearchAccount.setVisibility(false);
    // this.view.lblSelectAccount.text = selectedAccount.lblAccountName;
    // this.view.lblSelectAccount.setVisibility(true);
    this.view.flxSearchAccountsSegmentContainer.setVisibility(false);
    this.showOrHideClearAccBtn(false);
    this.view.flxSearchOrSelectAccount.accessibilityConfig = {
        "a11yLabel": "Search Account currently selected " + this.view.lblSelectAccount.text + ". Click to select another account",
        a11yARIA: {
            "tabindex": 0,
            "role": "button"
        }
    };
    this.view.flxSearchOrSelectAccount.setActive(true);
    let accountdetails = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('SettingsNewAlertsUIModule');
    let accounts = accountdetails.presentationController.accounts;
    if (selectedAccountId) {
      let filteredAccounts = accounts.filter((account) => account.accountID === selectedAccountId);
      let selectedAccount = filteredAccounts[0];
      for (let index = 0; index < this.alertaccounts.accountAlerts.length; index++) {
        if (selectedAccountId === this.alertaccounts.accountAlerts[index].accountID) {
          selectedAccount["isEnabled"] = this.alertaccounts.accountAlerts[index].isEnabled;
        }
      }
      this.onViewModifyAlertByID(selectedAccount, selectedAccount.alertID);
      // let alertsSegmentData = this.getDataWithAccountTypeSections(selectedAccount);
      // this.view.flxMultiCustomerSearchAccountsInfo.setVisibility(false);
      // this.view.segAlerts.setData(alertsSegmentData);
    }
  },

  /**
    * Method to clear the serach text when clear icon is clicked
    */ 
  onClearBtnClick: function() {
    this.view.tbxSearch.text = "";
    this.view.flxClear.isVisible = false;
    this.view.flxNoAccountsFound.isVisible = false;
    this.view.flxAlertsSeperator2.isVisible = true;
    let accountdetails = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('SettingsNewAlertsUIModule');
    let accounts = accountdetails.presentationController.accounts;
    let filteredData = this.filteredSegAccData !== undefined ? this.filteredSegAccData : accounts;
    this.setFilteredDataToSeg(filteredData);
  },

  /**
    * Method to set the visiblity of flxFilterAndSearch based on accounts count
    */
  checkAccountsCount: function(isSingleCustomerProfile) {
    let accountsCountConfig = applicationManager.getConfigurationManager().getConfigurationValue('accsCountCompactDashboard');
    if (isSingleCustomerProfile) {
        if (this.alertaccounts.accountAlerts !== undefined && this.alertaccounts.accountAlerts.length > parseInt(accountsCountConfig)) {
            this.view.flxFilterAndSearch.isVisible = true;
            this.view.flxMultiCustomerFilter.isVisible = false;
        } else {
            this.view.flxFilterAndSearch.isVisible = false;
            this.view.flxMultiCustomerFilter.isVisible = false;
        }
    } else {
        this.view.flxMultiCustomerFilter.isVisible = true;
        this.view.flxFilterAndSearch.isVisible = false
    }
  }, 
  
  /**
    * Method to set selected & unselected row in filter segment when a row is clicked
    */ 
  onSegCustomerRowClick: function() {
    isCustomerSegRowClick = true;
    let data = this.view.segCustomer.data;
    let rowIndex = this.view.segCustomer.selectedRowIndex[1];
    this.cusSelectedRowIndex = rowIndex;
    this.view.lblCustomerValue.text = data[rowIndex].lblUsers.text;
    //if (this._cusSegPrevIdx === rowIndex && data.length > 1) {
    //   this.toggleFilterDropdown(this.view.flxCustomerSeg, this.view.lblCustomerDropdown);
    //   return;
    // }
    if (this._cusSegPrevIdx !== null && this._cusSegPrevIdx !== undefined && data.length > 1) {
        data[this._cusSegPrevIdx].flxAccountTypes.skin = "sknflxBgffffffPointer";
        this.view.segCustomer.setDataAt(data[this._cusSegPrevIdx], this._cusSegPrevIdx);
    }
    data[rowIndex].flxAccountTypes.skin = "sknsegf7f7f7hover";
    this.view.segCustomer.setDataAt(data[rowIndex], rowIndex);
    this._cusSegPrevIdx = rowIndex;
    let customerFilteredData = this.onCustomerSelect(data[rowIndex].customerId);
    this.setFilteredDataToSeg(customerFilteredData);
    this.toggleFilterDropdown(this.view.flxCustomerSeg, this.view.lblCustomerDropdown);
  },
  
 /**
  * Method to set the selected cusomter to the segment
  */  
  onCustomerSelect: function(customerId) {
    let filteredData = [];
    let accountdetails = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('SettingsNewAlertsUIModule');
    let accounts = this.getAccountsBasedonType(accountdetails.presentationController.accounts);
    if (customerId !== undefined) {
        filteredData = accounts.filter(
            (elem) => (elem && elem.coreCustomerId === customerId));
    } else {
        filteredData = accounts;
    }
    this.customerFilteredData = filteredData;
    return filteredData;
  },
 
  /**
    * Method to get the accounts data based on the account type
    */ 
  getAccountsBasedonType: function(accounts) {
    let accountList = [];
    let accTypeValue = this.view.lblAccTypeValue.text;
    let accountType = this.filteredDropdownData ? this.filteredDropdownData.find(item => accTypeValue.includes(item)) : accTypeValue;
    if (accountType !== undefined && accountType !== "All") {
        accountList = accounts.filter(
            (elem) => (elem && elem.accountType === accountType));
    } else {
        accountList = accounts;
    }
    return accountList;
  },

  /**
    * Method to get the set the customer's list 
    */  
  setCustomersList: function(accounts) {
    this._cusSegPrevIdx = 0;
    const customerData = accounts.reduce((accumulator, currentValue) => {
        const existingItem = accumulator.find(item => item.coreCustomerId === currentValue.coreCustomerId);
        if (!existingItem) {
            accumulator.push({
                coreCustomerId: currentValue.coreCustomerId,
                accountID: currentValue.accountID,
                nickName: currentValue.nickName
            });
        }
        return accumulator;
    }, []);
    this.customerDetails = customerData;
    this.setCustomerDataToSeg(customerData, false);
    let segCustomerData = this.view.segCustomer.data;
    this.view.lblCustomerValue.text = segCustomerData[0].nickName + " - " + segCustomerData[0].customerId;
   },

  /**
    * Method to set the customer data to the segment
    */  
   setCustomerDataToSeg: function(customerData, isSearch) {
    this.view.segCustomer.widgetDataMap = {
        "lblUsers": "lblUsers",
        "flxAccountTypes": "flxAccountTypes"
    };
    var segData = [];
    if (Array.isArray(customerData) && customerData.length > 0) {
      for (var i = 0; i < customerData.length; i++) {
        // let accountType = filteredDropdownData[i];
        var cusData = {
            "lblUsers": {
                "text": customerData[i].nickName + " - " + customerData[i].coreCustomerId,
                "skin": "bbSknLbl424242SSP15Px",
                "left": "10dp"
            },
            "flxAccountTypes": {
                "skin": i === 0 && !isSearch ? "sknsegf7f7f7hover" : "sknflxBgffffffPointer"
            },
            "customerId": customerData[i].coreCustomerId,
            "nickName": customerData[i].nickName,
        };
        segData.push(cusData)
      }
      this.view.flxNoSearchCustomerResults.setVisibility(false);
      this.view.segCustomer.setVisibility(true);
      this.view.segCustomer.setData(segData);
    } else {
      this.view.segCustomer.setVisibility(false);
      this.view.flxNoSearchCustomerResults.setVisibility(true);
    }
  },

  /**
    * Method - Used to search the customers based on customer's Id and name
    */
  onCustomerSearch: function() {
    isCustomerSearch = true;
    let searchKeyword = this.view.tbxCustomerSearch.text;
    let searchCriteria = [{
        field: "coreCustomerId"
    }, {
        field: "nickName"
    }];
    if (searchKeyword.length >= 1) {
        let customerSearchData = this.filterData(this.customerDetails, searchKeyword, searchCriteria);
        this.setCustomerDataToSeg(customerSearchData, true)
    } else {
        this.setCustomerDataToSeg(this.customerDetails, true);
    }
  },
  
 /**
  * Method to set the customer or account filter dropdown
  */
  setDataToView: function() {
    this.view.segCusOrAcc.widgetDataMap = {
        "lblUsers": "lblUsers",
        "flxAccountTypes": "flxAccountTypes"
    };
    var segData = [];
    var cusData = {
        "lblUsers": {
            "text": "Customer",
            "skin": "bbSknLbl424242SSP15Px",
            "left": "10dp"
        },
        "flxAccountTypes": {
            "skin": "sknsegf7f7f7hover"
        }
    };
    segData.push(cusData);
    var accData = {
        "lblUsers": {
            "text": "Account",
            "skin": "bbSknLbl424242SSP15Px",
            "left": "10dp"
        },
        "flxAccountTypes": {
            "skin": "sknflxBgffffffPointer"
        }
    };
    segData.push(accData);
    this.view.segCusOrAcc.setData(segData);
  },

/**
  * Method to set selected & unselected row in filter segment when a row is clicked
  */
  onSegAccountRowClick: function() {
    let data = this.view.segCusOrAcc.data;
    let rowIndex = this.view.segCusOrAcc.selectedRowIndex[1];
    let selectedView = data[rowIndex].lblUsers.text;
    if (selectedView === 'Customer') {
      // Setting first customer's data and setting widget's visibility
      let customerFilteredData = this.onCustomerSelect(this.customerDetails[0].coreCustomerId);
      this.setDefaultCustomerView(customerFilteredData);
      let segCustomerData = this.view.segCustomer.data;
      this.view.lblCustomerValue.text = segCustomerData[0].nickName + " - " + segCustomerData[0].customerId;
      this.clearSearchAccountText();
      this.view.flxMultiCustomerSearchAccountsInfo.setVisibility(false);
      this.view.flxSearchAccountsSegmentContainer.setVisibility(false);
    } else if (selectedView === 'Account') {
      // Clear segAlerts data and set widget's visibility
      this.view.segAlerts.setData([]);
      this.view.flxCustomerFilterConatiner.setVisibility(false);
      this.view.flxAccountTypeContainer.setVisibility(false);
      this.view.flxAccountFilterContainer.setVisibility(true);
      this.view.flxMultiCustomerSearchAccountsInfo.setVisibility(true);
      this.showOrHideClearAccBtn(false);
      this.showPagination(false);
    }
    this.view.lblCusOrAccValue.text = data[rowIndex].lblUsers.text;
    this.toggleFilterDropdown(this.view.flxCusOrAccSeg, this.view.lblCusOrAccDropdown);
    this.view.forceLayout();
  },

  /**
   * @function : setDefaultCustomerView
   * @description : Sets default customer view in multicustomer scenario
   */ 
  setDefaultCustomerView: function (customerFilteredData) {
    if (this.customerDetails) {
      let accountsCountConfig = applicationManager.getConfigurationManager().getConfigurationValue('accsCountCompactDashboard');
      if (customerFilteredData.length <= parseInt(accountsCountConfig)) {
        widgetData = this.getDataWithAccountTypeSections(customerFilteredData);
        this.showPagination(false);
        this.view.segAlerts.setData(widgetData);
      } else {
        this.setPaginatedAccountAlerts(customerFilteredData);
        this.showPagination(true);
      }
      this.view.flxCustomerFilterConatiner.setVisibility(true);
      this.view.flxAccountTypeContainer.setVisibility(true);
      this.view.flxAccountFilterContainer.setVisibility(false);
      this.view.lblCusOrAccValue.text = 'Customer';
    }
  },

 };
});