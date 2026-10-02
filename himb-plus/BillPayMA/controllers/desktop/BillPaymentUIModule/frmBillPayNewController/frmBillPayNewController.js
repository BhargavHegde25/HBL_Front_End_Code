define("BillPayMA/BillPaymentUIModule/userfrmBillPayNewController", ['CommonUtilities','ApplicationManager', 'OLBConstants', 'ViewConstants', 'FormControllerUtility', 'CampaignUtility'], function(CommonUtilities,ApplicationManager, OLBConstants, ViewConstants, FormControllerUtility, CampaignUtility) {
var orientationHandler = new OrientationHandler();
return {
        selectedindex: 0,
        titleData: "",
        flowType: "",
        deleteMerchantPayload: {},
        fieldName: "",
        dataToPush: {},
        dataToShowInConfirmationScreen:{},
        isRequiredData: {},
        confirmBillpaydata: {},
        MerchantlogoUrl: "",
        appId: "",
        dataArray: [],
        currentPage: 1,
        CHECBOX_SELECTED: "C",
        CHECBOX_UNSELECTED: "D",
        CHECKBOX_UNSELECTED_SKIN: "sknlblOLBFonts0273E420pxOlbFontIcons",
        CHECKBOX_SELECTED_SKIN: "sknlblDelete20px",
        itemsPerPage: 10,
        totalPage: "",
        merchantFieldData: [],
		NEACustomerResponseMapFields : new Map([
		["customername","Customer Name:"],
		["consumerid","Consumer Id:"],
		["scno","SC No:"],
		["office","Counter:"],
		["paybleamount","Payable Amount"]]),
		KUKLCustomerResponseMapFields : new Map([
		["name","Customer Name:"],
		["customerNo","Customer No:"],
		["connectionNo","Connection No:"],
		["address","Address:"],
		["netamount","Payable Amount"]]),
        preshow: function() {
            this.view.flxFavMechant.skin="skne3e3e3br3pxradius";
            this.view.flxRightContent.skin="sknFlxffffffBorderRounded";
            this.view.flxContainer.skin="sknFlxffffffBorderRounded";
            this.view.flxSenderDetails.skin="sknFlxffffffBorderRounded";
            this.view.flxBeneficiaryDetails.skin="sknFlxffffffBorderRounded";
            this.view.btnCancel.skin="sknBtnBorderPx2eaebf1";
      this.view.btnCancel.hoverSkin="SknbtnroundcornerA51C306pxradius";
      this.view.btnCancel.focusSkin="sknBtnBorderPx2eaebf1";
      this.view.flxErrorMsg.skin="sknflxbg851a1croundCornerhbl";
      //this.view.flxMyFav.skin="sknflxbg851a1croundCornerhbl";
      this.view.flxMyFav.skin="sknflxBGop100";
      this.view.lblBlockTitle.skin="sknLbl851a1cPx20";
      //this.view.flxFormData.skin="flxWhite";
      this.view.btnpayNow.skin="sknBtnNormalSSPFFFFFF15pxradius6";
      this.view.btnpayNow.hoverSkin="sknBtnNormalSSPFFFFFF15pxradius6";
      this.view.btnpayNow.focusSkin="sknBtnNormalSSPFFFFFF15pxradius6";
      this.view.btnModifybtn.skin="sknBtnBorderPx2eaebf1";
      this.view.btnModifybtn.hoverSkin="SknbtnroundcornerA51C306pxradius";
      this.view.btnModifybtn.focusSkin="sknBtnBorderPx2eaebf1";
      this.view.btnCancelbtn.skin="SknbtnroundcornerA51C306pxradius";
      this.view.btnCancelbtn.hoverSkin="sknBtnNormalSSPFFFFFF15pxradius6";
      this.view.btnCancelbtn.focusSkin="SknbtnroundcornerA51C306pxradius";
    //   if(kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile){
    //      this.view.flxFavMin.setVisibility(false);
    //   }
    //   else{
    //     this.view.flxFavMin.setVisibility(true);
    //   }
        var presenter = applicationManager.getModulesPresentationController({
                'appName': 'BillPayMA',
                'moduleName': 'BillPaymentUIModule'
            });
            var Payload = {
                "favoriteMerchant": [{
                    "accountNumber": "",
                    "payeeNickName": "JanakiRam1",
                    "companyName": "Test Company2",
                    "isFavoriteMerchant": "true",
                    "billerId": "1996",
                    "contractId": "8557641432",
                    "coreCustomerId": "9100108"
                }]
            };
            //presenter.createFavoriteMerchant(Payload);
            kony.application.showLoadingScreen();
            presenter.getFavMerchants();
            this.view.flxDowntimeWarning.isVisible = false;
            this.view.rtxDowntimeWarning.text = "";
            //this.view.flxErrorMsg.setVisibility(false);
            var context = "Terms of conditions for consent";
            this.setTnCDATASection(context);
            var flowTypePrev = applicationManager.getNavigationManager().getCustomInfo("flowTypePrev");
            if (flowTypePrev == "Back") {
                this.navigateToPreviosScreen();
                applicationManager.getNavigationManager().setCustomInfo("flowTypePrev", "front");
            }
            this.view.retError.text = "Merchants/Merchant Categories not found";
            FormControllerUtility.setRequestUrlConfig(this.view.brwBodyTnC);
            this.view.btnClose.onClick = this.hideTermsAndConditionPopUp;
            this.view.btnAccept.skin = "sknBtnBlockedSSPFFFFFF15Px";
            this.view.btnAccept.setEnabled(false);
            //this.view.btnTandC.onClick = this.setTnCDATASection();
            this.view.flxConsentContainer.setVisibility(false);
            this.view.btnAccept.width = "20%";
            this.view.btnAccept.width = "20%";
            this.view.flxAgree.onClick = this.CheckboxText;
            //this.getCategory("ALL");
            this.view.lblBacktoDashboard.onTouchEnd = function() {
                this.getCategory("ALL");
            }.bind(this);
            this.view.segCatogories.onRowClick = this.SegmentOnclick.bind(this);
            //       this.view.flxRightContent.height="500dp";
            //       this.view.segCatogories.height="600dp";
            this.view.btnpayNow.onClick = this.confirmBillPay.bind(this);
            this.view.txtSearch.onTextChange = this.initateSearch.bind(this);
            this.view.btnEnquiry.onClick = this.inquiryOnclick.bind(this);
            this.view.onBreakpointChange = this.onBreakpointChange.bind(this);
            this.view.btnCancel.onClick = this.navigateToHomeScreen.bind(this);
            this.view.btnDecline.onClick = this.navigateToHomeScreen.bind(this);
            this.view.btnModifybtn.onClick = this.navigateToPreviosScreen.bind(this);
            this.view.btnCancelbtn.onClick = this.navigateToHomeScreen.bind(this);
            this.view.segDropdown.onRowClick = function() {
                this.view.segDropdown.setVisibility(false);
                this.view.imgdropdown.src = "dropdownhbl.png";
                this.view.lblSelectAccount.text = this.view.segDropdown.selectedRowItems[0].lblAccountName.text;
                applicationManager.getNavigationManager().setCustomInfo("SelectedAccountData", this.view.segDropdown.selectedRowItems[0].lblAccountName.text);
                //applicationManager.getNavigationManager().setCustomInfo("SelectedAccountInfo", this.view.segDropdown.selectedRowItems[0]);
                var accountsList = this.loadStopPaymentsModule().presentationController.getAccounts();
                for (i = 0; i < accountsList.length; i++) {
                    if (accountsList[i].accountID == this.view.segDropdown.selectedRowItems[0].accountID) {
                        applicationManager.getNavigationManager().setCustomInfo("SelectedAccountInfo", accountsList[i]);
                        break;
                    }
                }
                var data = applicationManager.getConfigurationManager().UserAttributes;
                var name;
                if (!data.FullName) {
                    name = (data.userlastname === null) ? data.userfirstname : (data.userfirstname === null) ? data.userlastname : data.userfirstname + " " + data.userlastname;
                } else {
                    name = data.FullName;
                }
            }.bind(this);
            this.view.flxFrmAccountDropdown.onClick = function() {
                if (this.view.segDropdown.isVisible) {
                    this.view.segDropdown.setVisibility(false);
                    this.view.imgdropdown.src = "dropdownhbl.png";
                } else {
                    this.view.segDropdown.setVisibility(true);
                    this.view.imgdropdown.src = "dropuphbl.png";
                }
            }.bind(this);
            this.view.flxPaginationNext.onClick = this.nextPage.bind(this);
            this.view.flxPaginationPrevious.onClick = this.previousPage.bind(this);
            this.view.btnAccept.onClick = this.ShowWebView.bind(this);
            this.view.imgSortDate.onTouchEnd = this.sortTransactionHistory.bind(this);
            this.view.imgSortDescription.onTouchEnd = this.sortTransactionHistory.bind(this);
            this.view.imgSortAmount.onTouchEnd = this.sortTransactionHistory.bind(this);
            this.view.imgSortCategory.onTouchEnd = this.sortTransactionHistory.bind(this);
            this.view.btnManageFav.onClick = this.manageFavorites.bind(this);
            this.view.flxFavMerchants1.onClick = this.storeMerchantSelected1toDelete;
            this.view.flxFavMerchants2.onClick = this.storeMerchantSelected2toDelete;
            this.view.flxFavMerchants3.onClick = this.storeMerchantSelected3toDelete;
            this.view.flxFavMerchants4.onClick = this.storeMerchantSelected4toDelete;
            this.view.flxFavMerchants5.onClick = this.storeMerchantSelected5toDelete;
            this.view.btnYes.onClick = this.deleteFavMerchantCall.bind(this);
            this.view.imgCloseTab.onTouchEnd = this.CloseDeleteMerchantPopup.bind(this);
            this.view.btnNO.onClick = this.CloseDeleteMerchantPopup.bind(this);
            this.view.btnCancel1.onClick = this.showFavHomeScreen;
            this.view.imgCloseIcon.onTouchEnd = this.closeSuccessPopup;
            this.view.btnOK.onClick = this.closeSuccessPopup;
            applicationManager.getNavigationManager().applyUpdates(this);
            this.view.flxMain.forceLayout();
            this.view.flxTooltipMain.setVisibility(false);
            this.view.lblBacktoDashboard.setVisibility(false);
        },
        navigateToPreviosScreen: function() {
            this.view.flxResponseField.setVisibility(false);
            this.view.flxMerchatFields.setVisibility(true);
            var navManager = applicationManager.getNavigationManager();
            this.dataToPush = navManager.getCustomInfo("dataInquiry");
        },
        closeSuccessPopup: function() {
            this.view.flxDialogs.setVisibility(false);
            this.view.flxDeleteSuccessMain.setVisibility(false);
        },
        showFavHomeScreen: function() {
            kony.application.showLoadingScreen();
            var presenter = applicationManager.getModulesPresentationController({
                'appName': 'BillPayMA',
                'moduleName': 'BillPaymentUIModule'
            });
            presenter.getFavMerchants();
        },
        deleteFavMerchantCall: function() {
            kony.application.showLoadingScreen();
            var deletePayload = this.deleteMerchantPayload;
            var presenter = applicationManager.getModulesPresentationController({
                'appName': 'BillPayMA',
                'moduleName': 'BillPaymentUIModule'
            });
            presenter.deleteFavMerchant(deletePayload);
        },
        navigateToHomeScreen: function() {
            /*var navMan = applicationManager.getNavigationManager();
                        navMan.navigateTo({
                            "appName": "BillPayMA",
                            "friendlyName": "frmBillPayNew"
                        });
                        */
            kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                appName: "BillPayMA",
                moduleName: "BillPaymentUIModule"
            }).presentationController.showBillPaymentScreen({
                context: "PayABill",
                payload: {
                    "code": "ALL"
                }
            });
            kony.application.showLoadingScreen();
        },
        setTnCDATASection: function(content) {
            this.view.btnTandC.onClick = this.showTermsAndConditionPopUp;
            // this.view.rtxTC.text = content.termsAndConditionsContent;
            this.view.rtxTC.text = content;
            FormControllerUtility.setHtmlToBrowserWidget(this, this.view.brwBodyTnC, content);
            this.view.forceLayout();
            FormControllerUtility.hideProgressBar(this.view)
            var collection = document.getElementsByTagName("iframe");
            for (let i = 0; i < collection.length; i++) {
                collection[i].tabIndex = 0;
                collection[i].ariaLabel = "Terms and conditions";
            }
        },
        showTermsAndConditionPopUp: function() {
            this.view.flxTermsAndConditions.setVisibility(true);
            this.view.flxTC.isModalContainer = true;
            this.view.lblTermsAndConditions.setActive(true);
            var collection = document.getElementsByTagName("iframe");
            for (let i = 0; i < collection.length; i++) {
                collection[i].tabIndex = 0;
                collection[i].ariaLabel = "Terms and conditions";
            }
        },
        hideTermsAndConditionPopUp: function() {
            this.view.flxTermsAndConditions.setVisibility(false);
            this.view.flxTC.isModalContainer = false;
            this.view.btnTandC.setFocus(true);
        },
        CheckboxText: function() {
            if (this.view.lblFavoriteEmailCheckBox.text == "D") {
                this.view.btnAccept.skin = "sknBtnNormalSSPFFFFFF15Px";
                this.view.lblFavoriteEmailCheckBox.text = "C";
                this.view.lblFavoriteEmailCheckBox.skin = this.CHECKBOX_SELECTED_SKIN;
                this.view.btnAccept.setEnabled(true);
            } else if (this.view.lblFavoriteEmailCheckBox.text == "C") {
                this.view.lblFavoriteEmailCheckBox.text = "D";
                this.view.lblFavoriteEmailCheckBox.skin = this.CHECKBOX_UNSELECTED_SKIN;
                this.view.btnAccept.skin = "sknBtnBlockedSSPFFFFFF15Px";
                this.view.btnAccept.setEnabled(false);
            }
        },
        updateFormUI: function(viewModel) {
            if (viewModel.isLoading) {
                FormControllerUtility.showProgressBar(this.view);
            }
            if (viewModel.isLoading == false) {
                FormControllerUtility.hideProgressBar(this.view);
            }
            if (viewModel.serverError) {
                if(viewModel.serverError!=undefined && viewModel.serverError!=""  && viewModel.serverError!=null){
                    this.view.rtxDowntimeWarning.text =viewModel.serverError;
                }
                else{
                    this.view.rtxDowntimeWarning.text =kony.i18n.getLocalizedString("i18n.common.OoopsServerError");
                }
                this.view.flxDowntimeWarning.setVisibility(true);
                FormControllerUtility.hideProgressBar(this.view);
                //this.view.flxFormContent.forceLayout();
            }
            if (!viewModel.subcategory && viewModel.categories && !viewModel.subcategoryofAll) {
                this.setCategoryData(viewModel.categories);
                FormControllerUtility.hideProgressBar(this.view);
            }
            if (viewModel.subcategory) {
                this.setSubcategoryData(viewModel.categories);
                FormControllerUtility.hideProgressBar(this.view);
            }
            if (viewModel.subcategoryofAll) {
                this.setCategoryData(viewModel.categories);
                FormControllerUtility.hideProgressBar(this.view);
            }
            if (viewModel.externalMerchants || viewModel.internalMerchants) {
                this.setMerchantFieldData(viewModel);
                FormControllerUtility.hideProgressBar(this.view);
            }
            if (viewModel.paymentHistory) {
                this.dataArray = viewModel.paymentHistory;
                this.view.imgSortDescription.src = "sortunchecked.png";
                this.view.imgSortAmount.src = "sortunchecked.png";
                this.view.imgSortCategory.src = "sortunchecked.png";
                this.view.imgSortDate.src = "sortunchecked.png";
                this.displayData();
                FormControllerUtility.hideProgressBar(this.view);
            }
            if (viewModel.NoCategory) {
                this.showError("NoCategory");
                FormControllerUtility.hideProgressBar(this.view);
            }
            if (viewModel.NoCategoryALL) {
                this.showError("NoCategoryALL");
                FormControllerUtility.hideProgressBar(this.view);
            }
            if (viewModel.NoMerchantsField) {
                this.showError("NoMerchantFields");
                FormControllerUtility.hideProgressBar(this.view);
            }
            if (viewModel.NoTransactionHistory) {
                this.showError("NoTransactionHistory");
                FormControllerUtility.hideProgressBar(this.view);
            }
            if (viewModel.confirmBillPayErr) {
                this.ErrorScreen(viewModel.confirmBillPayErr);
                FormControllerUtility.hideProgressBar(this.view);
            }
            if (viewModel.ConfirmbillpayNEAError) {
                this.ErrorScreenNEA(viewModel.ConfirmbillpayNEAError);
                FormControllerUtility.hideProgressBar(this.view);
            }
            //if (viewModel.returningfromconfirmationscreen) {
              //  this.retrievedataToPushValue();
            //}
            if (viewModel.InsufficientBalance) {
                this.InsufficientBalanceErrorScreen(viewModel.InsufficientBalance);
            }
            if (viewModel.maxTransactionLimitExceedError) {
                this.maxTransactionLimitExceedError(viewModel.maxTransactionLimitExceedError);
            }
            if (viewModel.PinError) {
                this.showPinNotSetError(viewModel.PinError);
            }
            if (viewModel.billpayError) {
                this.CustomerBillInfoSuccess(viewModel.billpayError);
                FormControllerUtility.hideProgressBar(this.view);
            }
            if (viewModel.AutomaticMerchantURL) {
                this.URLPopulateSuccess(viewModel.AutomaticMerchantURL);
                //FormControllerUtility.hideProgressBar(this.view);
            }
            if (viewModel.loadCategoriesSuccess) {
                this.processRepeatPayment(viewModel.merchantBasicInfo);
                //FormControllerUtility.hideProgressBar(this.view);
            }
            if (viewModel.repeatPayment) {
                this.loadRepeatPaymentMerchantScreen(viewModel.repeatPayment);
                FormControllerUtility.hideProgressBar(this.view);
            }
            if (viewModel.FavMerchantData) {
                this.setFavoritesData(viewModel.FavMerchantData);
            }
            if (viewModel.deleteFavoriteMerchantSuccess) {
                this.deleteFavoriteMerchantSuccess(viewModel.deleteFavoriteMerchantSuccess);
            }
            if (viewModel.getBankDateFailure) {
                this.ErrorScreen(viewModel.getBankDateFailure);
                FormControllerUtility.hideProgressBar(this.view);
            }
        },
        //retrievedataToPushValue:function(){
         //   this.dataToPush = applicationManager.getNavigationManager().getCustomInfo("dataInquiry");
        //},
        storeMerchantSelected1toDelete: function() {
            if (this.view.btnCancel1.isVisible) {
                var payeeId = this.view.lblFavMerchantName1.info.payeeId;
                this.deleteMerchantPayload = {
                    "payeeId": payeeId
                }
                this.view.flxDialogs.setVisibility(true);
                this.view.flxAddFavSuccessMain.setVisibility(true);
            } else if (this.view.imgFavMerchant1.src == "greyedoutplus.png") {} else {
                var presenter = applicationManager.getModulesPresentationController({
                    'appName': 'BillPayMA',
                    'moduleName': 'BillPaymentUIModule'
                });
                params = {
                    "code": this.view.lblFavMerchantName1.info.billercode
                }
                presenter.getCategoriesByMerchant(params);
            }
        },
        storeMerchantSelected2toDelete: function() {
            if (this.view.btnCancel1.isVisible) {
                var payeeId = this.view.lblFavMerchantName2.info.payeeId;
                this.deleteMerchantPayload = {
                    "payeeId": payeeId
                }
                this.view.flxDialogs.setVisibility(true);
                this.view.flxAddFavSuccessMain.setVisibility(true);
            } else if (this.view.imgFavMerchant2.src == "greyedoutplus.png") {} else {
                var presenter = applicationManager.getModulesPresentationController({
                    'appName': 'BillPayMA',
                    'moduleName': 'BillPaymentUIModule'
                });
                params = {
                    "code": this.view.lblFavMerchantName2.info.billercode
                }
                presenter.getCategoriesByMerchant(params);
            }
        },
        storeMerchantSelected3toDelete: function() {
            if (this.view.btnCancel1.isVisible) {
                var payeeId = this.view.lblFavMerchantName3.info.payeeId;
                this.deleteMerchantPayload = {
                    "payeeId": payeeId
                }
                this.view.flxDialogs.setVisibility(true);
                this.view.flxAddFavSuccessMain.setVisibility(true);
            } else if (this.view.imgFavMerchant3.src == "greyedoutplus.png") {} else {
                var presenter = applicationManager.getModulesPresentationController({
                    'appName': 'BillPayMA',
                    'moduleName': 'BillPaymentUIModule'
                });
                params = {
                    "code": this.view.lblFavMerchantName3.info.billercode
                }
                presenter.getCategoriesByMerchant(params);
            }
        },
        storeMerchantSelected4toDelete: function() {
            if (this.view.btnCancel1.isVisible) {
                var payeeId = this.view.lblFavMerchantName4.info.payeeId;
                this.deleteMerchantPayload = {
                    "payeeId": payeeId
                }
                this.view.flxDialogs.setVisibility(true);
                this.view.flxAddFavSuccessMain.setVisibility(true);
            } else if (this.view.imgFavMerchant4.src == "greyedoutplus.png") {} else {
                var presenter = applicationManager.getModulesPresentationController({
                    'appName': 'BillPayMA',
                    'moduleName': 'BillPaymentUIModule'
                });
                params = {
                    "code": this.view.lblFavMerchantName4.info.billercode
                }
                presenter.getCategoriesByMerchant(params);
            }
        },
        storeMerchantSelected5toDelete: function() {
            if (this.view.btnCancel1.isVisible) {
                var payeeId = this.view.lblFavMerchantName5.info.payeeId;
                this.deleteMerchantPayload = {
                    "payeeId": payeeId
                }
                this.view.flxDialogs.setVisibility(true);
                this.view.flxAddFavSuccessMain.setVisibility(true);
            } else if (this.view.imgFavMerchant5.src == "greyedoutplus.png") {} else {
                var presenter = applicationManager.getModulesPresentationController({
                    'appName': 'BillPayMA',
                    'moduleName': 'BillPaymentUIModule'
                });
                params = {
                    "code": this.view.lblFavMerchantName5.info.billercode
                }
                presenter.getCategoriesByMerchant(params);
            }
        },
        manageFavorites: function() {
            var res = kony.store.getItem('favMerchantsList');
            this.view.flxFavMerchants1.setVisibility(false);
            this.view.flxFavMerchants2.setVisibility(false);
            this.view.flxFavMerchants3.setVisibility(false);
            this.view.flxFavMerchants4.setVisibility(false);
            this.view.flxFavMerchants5.setVisibility(false);
            for (i = 0; i < res.favoriteMerchants.length; i++) {
                var payeeId = res.favoriteMerchants[i].payeeId;
                var logoUrl = res.favoriteMerchants[i].logoUrl;
                var merchantName = res.favoriteMerchants[i].merchantName;
                if (i == 0) {
                    this.view.flxFavMerchants1.setVisibility(true);
                    this.view.imgFavMerchant1.src = logoUrl;
                    this.view.lblFavMerchantName1.text = merchantName;
                    this.view.lblFavMerchantName1.info = {
                        "payeeId": payeeId
                    };
                }
                if (i == 1) {
                    this.view.flxFavMerchants2.setVisibility(true);
                    this.view.imgFavMerchant2.src = logoUrl;
                    this.view.lblFavMerchantName2.text = merchantName;
                    this.view.lblFavMerchantName2.info = {
                        "payeeId": payeeId
                    };
                }
                if (i == 2) {
                    this.view.flxFavMerchants3.setVisibility(true);
                    this.view.imgFavMerchant3.src = logoUrl;
                    this.view.lblFavMerchantName3.text = merchantName;
                    this.view.lblFavMerchantName3.info = {
                        "payeeId": payeeId
                    };
                }
                if (i == 3) {
                    this.view.flxFavMerchants4.setVisibility(true);
                    this.view.imgFavMerchant4.src = logoUrl;
                    this.view.lblFavMerchantName4.text = merchantName;
                    this.view.lblFavMerchantName4.info = {
                        "payeeId": payeeId
                    };
                }
                if (i == 4) {
                    this.view.flxFavMerchants5.setVisibility(true);
                    this.view.imgFavMerchant5.src = logoUrl;
                    this.view.lblFavMerchantName5.text = merchantName;
                    this.view.lblFavMerchantName5.info = {
                        "payeeId": payeeId
                    };
                }
            }
            this.view.btnManageFav.setVisibility(false);
            this.view.btnCancel1.setVisibility(true);
            this.view.imgDelete1.setVisibility(true);
            this.view.imgDelete2.setVisibility(true);
            this.view.imgDelete3.setVisibility(true);
            this.view.imgDelete4.setVisibility(true);
            this.view.imgDelete5.setVisibility(true);
        },
        deleteFavoriteMerchantSuccess: function() {
            this.view.flxDialogs.setVisibility(true);
            this.view.flxAddFavSuccessMain.setVisibility(false);
            this.view.flxDeleteSuccessMain.setVisibility(true);
            var presenter = applicationManager.getModulesPresentationController({
                'appName': 'BillPayMA',
                'moduleName': 'BillPaymentUIModule'
            });
            presenter.getFavMerchants();
            //this.manageFavorites();
        },
        CloseDeleteMerchantPopup: function() {
            this.view.flxDialogs.setVisibility(false);
            this.view.flxAddFavSuccessMain.setVisibility(false);
        },
        setFavoritesData: function(res) {
            this.view.btnCancel1.setVisibility(false);
            this.view.imgDelete1.setVisibility(false);
            this.view.imgDelete2.setVisibility(false);
            this.view.imgDelete3.setVisibility(false);
            this.view.imgDelete4.setVisibility(false);
            this.view.imgDelete5.setVisibility(false);
            this.view.flxFavMerchants1.setVisibility(false);
            this.view.flxFavMerchants2.setVisibility(false);
            this.view.flxFavMerchants3.setVisibility(false);
            this.view.flxFavMerchants4.setVisibility(false);
            this.view.flxFavMerchants5.setVisibility(false);
            if (res.favoriteMerchants.length == 0) {
                this.view.flxNoFavMerchants.setVisibility(true);
                this.view.btnManageFav.setVisibility(false);
                this.view.flxFavoritesDataMain.setVisibility(false);
                kony.application.dismissLoadingScreen();
            } else {
                this.view.flxNoFavMerchants.setVisibility(false);
                this.view.btnManageFav.setVisibility(true);
                this.view.flxFavoritesDataMain.setVisibility(true);
                for (i = 0; i < res.favoriteMerchants.length; i++) {
                    var payeeId = res.favoriteMerchants[i].payeeId;
                    var logoUrl = res.favoriteMerchants[i].logoUrl;
                    var merchantName = res.favoriteMerchants[i].merchantName;
                    var merchantCode = res.favoriteMerchants[i].merchantCode;
                    if (i == 0) {
                        this.view.flxFavMerchants1.onHover = this.onHoverNoEventCallback;
                        this.view.flxFavMerchants1.setVisibility(true);
                        this.view.flxBorderForImage1.skin = "SknFlxBgFFFFFFBorderE3E3E3Radius10PX";
                        this.view.imgFavMerchant1.src = logoUrl;
                        this.view.lblFavMerchantName1.text = merchantName;
                        this.view.lblFavMerchantName1.info = {
                            "payeeId": payeeId,
                            "billercode": merchantCode
                        };
                    }
                    if (i == 1) {
                        this.view.flxFavMerchants2.onHover = this.onHoverNoEventCallback;
                        this.view.flxFavMerchants2.setVisibility(true);
                        this.view.flxBorderForImage2.skin = "SknFlxBgFFFFFFBorderE3E3E3Radius10PX";
                        this.view.imgFavMerchant2.src = logoUrl;
                        this.view.lblFavMerchantName2.text = merchantName;
                        this.view.lblFavMerchantName2.info = {
                            "payeeId": payeeId,
                            "billercode": merchantCode
                        };
                    }
                    if (i == 2) {
                        this.view.flxFavMerchants3.onHover = this.onHoverNoEventCallback;
                        this.view.flxFavMerchants3.setVisibility(true);
                        this.view.flxBorderForImage3.skin = "SknFlxBgFFFFFFBorderE3E3E3Radius10PX";
                        this.view.imgFavMerchant3.src = logoUrl;
                        this.view.lblFavMerchantName3.text = merchantName;
                        this.view.lblFavMerchantName3.info = {
                            "payeeId": payeeId,
                            "billercode": merchantCode
                        };
                    }
                    if (i == 3) {
                        this.view.flxFavMerchants4.onHover = this.onHoverNoEventCallback;
                        this.view.flxFavMerchants4.setVisibility(true);
                        this.view.flxBorderForImage4.skin = "SknFlxBgFFFFFFBorderE3E3E3Radius10PX";
                        this.view.imgFavMerchant4.src = logoUrl;
                        this.view.lblFavMerchantName4.text = merchantName;
                        this.view.lblFavMerchantName4.info = {
                            "payeeId": payeeId,
                            "billercode": merchantCode
                        };
                    }
                    if (i == 4) {
                        this.view.flxFavMerchants5.onHover = this.onHoverNoEventCallback;
                        this.view.flxFavMerchants5.setVisibility(true);
                        this.view.flxBorderForImage5.skin = "SknFlxBgFFFFFFBorderE3E3E3Radius10PX";
                        this.view.imgFavMerchant5.src = logoUrl;
                        this.view.lblFavMerchantName5.text = merchantName;
                        this.view.lblFavMerchantName5.info = {
                            "payeeId": payeeId,
                            "billercode": merchantCode
                        };
                    }
                }
                kony.application.dismissLoadingScreen();
            }
            // var favMerchantCount = res.favoriteMerchants.length;
            // for (i = favMerchantCount + 1; i < 6; i++) {
            //     if (i == 1) {
            //         this.view.flxFavMerchants1.setVisibility(true);
            //         this.view.flxBorderForImage1.skin = "sknflxf6f6f6Radius10px";
            //         this.view.imgFavMerchant1.src = "greyedoutplus.png";
            //         this.view.lblFavMerchantName1.text = "";
            //         break;
            //     }
            //     if (i == 2) {
            //         this.view.flxFavMerchants2.onHover = this.onHoverEventCallback2;
            //         this.view.flxBorderForImage2.skin = "sknflxf6f6f6Radius10px";
            //         this.view.flxFavMerchants2.setVisibility(true);
            //         this.view.imgFavMerchant2.src = "greyedoutplus.png";
            //         this.view.lblFavMerchantName2.text = "";
            //         break;
            //     }
            //     if (i == 3) {
            //         this.view.flxFavMerchants3.onHover = this.onHoverEventCallback3;
            //         this.view.flxBorderForImage3.skin = "sknflxf6f6f6Radius10px";
            //         this.view.flxFavMerchants3.setVisibility(true);
            //         this.view.imgFavMerchant3.src = "greyedoutplus.png";
            //         this.view.lblFavMerchantName3.text = "";
            //         break;
            //     }
            //     if (i == 4) {
            //         this.view.flxFavMerchants4.onHover = this.onHoverEventCallback4;
            //         this.view.flxBorderForImage4.skin = "sknflxf6f6f6Radius10px";
            //         this.view.flxFavMerchants4.setVisibility(true);
            //         this.view.imgFavMerchant4.src = "greyedoutplus.png";
            //         this.view.lblFavMerchantName4.text = "";
            //         break;
            //     }
            //     if (i == 5) {
            //         this.view.flxFavMerchants5.onHover = this.onHoverEventCallback5;
            //         this.view.flxBorderForImage5.skin = "sknflxf6f6f6Radius10px";
            //         this.view.flxFavMerchants5.setVisibility(true);
            //         this.view.imgFavMerchant5.src = "greyedoutplus.png";
            //         this.view.lblFavMerchantName5.text = "";
            //         break;
            //     }
            // }
        },
        onHoverNoEventCallback: function() {},
        onHoverEventCallback2: function(widget, context) {
            if (context.eventType == constants.ONHOVER_MOUSE_ENTER) {
                this.turnOnTooltip2();
            } else if (context.eventType == constants.ONHOVER_MOUSE_LEAVE) {
                this.turnOffTooltip2();
            }
        },
        onHoverEventCallback3: function(widget, context) {
            if (context.eventType == constants.ONHOVER_MOUSE_ENTER) {
                this.turnOnTooltip3();
            } else if (context.eventType == constants.ONHOVER_MOUSE_LEAVE) {
                this.turnOffTooltip3();
            }
        },
        onHoverEventCallback4: function(widget, context) {
            if (context.eventType == constants.ONHOVER_MOUSE_ENTER) {
                this.turnOnTooltip4();
            } else if (context.eventType == constants.ONHOVER_MOUSE_LEAVE) {
                this.turnOffTooltip4();
            }
        },
        onHoverEventCallback5: function(widget, context) {
            if (context.eventType == constants.ONHOVER_MOUSE_ENTER) {
                this.turnOnTooltip5();
            } else if (context.eventType == constants.ONHOVER_MOUSE_LEAVE) {
                this.turnOffTooltip5();
            }
        },
        turnOnTooltip2: function() {
            this.view.flxTooltipMain.setVisibility(true);
            this.view.flxTooltipMain.left = "102dp";
        },
        turnOnTooltip3: function() {
            this.view.flxTooltipMain.setVisibility(true);
            this.view.flxTooltipMain.left = "216dp";
        },
        turnOnTooltip4: function() {
            this.view.flxTooltipMain.setVisibility(true);
            this.view.flxTooltipMain.left = "330dp";
        },
        turnOnTooltip5: function() {
            this.view.flxTooltipMain.setVisibility(true);
            this.view.flxTooltipMain.left = "446dp";
        },
        turnOffTooltip2: function() {
            this.view.flxTooltipMain.setVisibility(false);
        },
        turnOffTooltip3: function() {
            this.view.flxTooltipMain.setVisibility(false);
        },
        turnOffTooltip4: function() {
            this.view.flxTooltipMain.setVisibility(false);
        },
        turnOffTooltip5: function() {
            this.view.flxTooltipMain.setVisibility(false);
        },
        setConfirmationFields:function(){
            var confirmationFields={};
            confirmationFields["Mobile Number"]=this.dataToShowInConfirmationScreen["Mobile Number"];
            confirmationFields["Connection"]=this.dataToShowInConfirmationScreen["Connection"];
            confirmationFields["Amount"]=this.dataToShowInConfirmationScreen["Amount"];
            return confirmationFields;
        },
        inquiryOnclick: function() {
            if(this.view.btnEnquiry.text==kony.i18n.getLocalizedString("i18n.common.proceed")){
                FormControllerUtility.showProgressBar(this.view);
            applicationManager.getNavigationManager().navigateTo("frmOneTimePaymentConfirm");
            var navManager = applicationManager.getNavigationManager();
            navManager.setCustomInfo("dataInquiry", this.dataToPush);
             navManager.setCustomInfo("merchantflowtype", "manual");
            if(applicationManager.getNavigationManager().getCustomInfo("MerchantCode") == "TOP-UP-NEPAL-MOBILE"){
                var confirmationFields=this.setConfirmationFields();
                 navManager.setCustomInfo("fieldValues",confirmationFields);
                 applicationManager.getNavigationManager().updateForm({
                "mapConfirmationFields": confirmationFields
            }, "frmOneTimePaymentConfirm");
            }
            else{
            navManager.setCustomInfo("fieldValues",this.dataToShowInConfirmationScreen);
            applicationManager.getNavigationManager().updateForm({
                "mapConfirmationFields": this.dataToShowInConfirmationScreen
            }, "frmOneTimePaymentConfirm");
            }
        }
            else{
            FormControllerUtility.showProgressBar(this.view);
            var navManager = applicationManager.getNavigationManager();
            navManager.setCustomInfo("dataInquiry", this.dataToPush);
            var presenter = applicationManager.getModulesPresentationController({
                'appName': 'BillPayMA',
                'moduleName': 'BillPaymentUIModule'
            });
            presenter.makeNewInquiryCall(this.dataToPush);
        }
        },
        handleSegmentRowView: function() {
            var scopeObj = this;
            const rowIndex = scopeObj.view.segmentBillpay.selectedRowIndex[1];
            const data = scopeObj.view.segmentBillpay.data;
            var pre_val;
            var requiredView = [];
            const collapsedView = ["O", false, "sknFlxIdentifier", "sknffffff15pxolbfonticons", {
                "Mobile": "69dp",
                "Default": "50dp"
            }, "sknflxffffffnoborder"];
            const expandedView = ["P", true, "sknflxBg4a90e2op100NoBorder", "sknSSP4176a415px", {
                "Mobile": "310dp",
                "Default": "145dp"
            }, "slFboxBGf8f7f8B0"];
            if (previous_index_history === rowIndex) {
                requiredView = data[rowIndex].lblDropdown === "P" ? collapsedView : expandedView;
                this.toggleSegmentRowView(rowIndex, requiredView);
            } else {
                if (previous_index_history >= 0) {
                    pre_val = previous_index_history;
                    this.toggleSegmentRowView(pre_val, collapsedView);
                }
                pre_val = rowIndex;
                this.toggleSegmentRowView(rowIndex, expandedView);
            }
            previous_index_history = rowIndex;
        },
        repeatOnclick: function(data) {
            var presenter = applicationManager.getModulesPresentationController({
                'appName': 'BillPayMA',
                'moduleName': 'BillPaymentUIModule'
            });
            params = {
                "code": data.merchantId
            };
            var servicepayload;
            var serviceResponse;
            applicationManager.getNavigationManager().setCustomInfo("isRepeatPaymentFlow", true);
            if (data.externalServicePayload) {
                servicepayload = JSON.parse(data.externalServicePayload);
                if (data.externalServiceResponse) {
                    serviceResponse = JSON.parse(data.externalServiceResponse);
                }
                var repeatPaymentServiceRecord = {
                    "servicepayload": servicepayload,
                    "serviceResponse": serviceResponse
                };
                applicationManager.getNavigationManager().setCustomInfo("repeatPaymentServiceRecord", repeatPaymentServiceRecord);
            } else {
                applicationManager.getNavigationManager().setCustomInfo("repeatPaymentServiceRecord", undefined);
            }
            presenter.getCategoriesByMerchant(params);
        },
        processRepeatPayment: function(data) {
            var record = data.categories[0];
            var subcategoryData = [];
            subcategoryData.push(record);
            applicationManager.getNavigationManager().setCustomInfo("subcategoryData", subcategoryData[0].code);
            applicationManager.getNavigationManager().updateForm({
                "repeatPayment": record
            }, "frmBillPayNew");
        },
        formatAmount: function(amount, currencySymbolNotRequired, currencySymbol) {
            if (currencySymbolNotRequired) {
                return applicationManager.getFormatUtilManager().formatAmount(amount);
            } else {
                return applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(amount, currencySymbol);
            }
        },
        getDateFromDateString: function(dateString, inputFormat) {
            var fu = applicationManager.getFormatUtilManager();
            var dateObj = fu.getDateObjectfromString(dateString, inputFormat);
            var outputDate = fu.getFormatedDateString(dateObj, fu.getApplicationDateFormat());
            return outputDate;
        },
        toggleSegmentRowView: function(index, viewData) {
            var scopeObj = this;
            var data = scopeObj.view.segmentBillpay.data;
            data[index].lblDropdown = viewData[0];
            data[index].flxIdentifier.isVisible = viewData[1];
            data[index].flxIdentifier.skin = viewData[2];
            data[index].lblIdentifier.skin = viewData[3];
            data[index].flxBillPaymentHistorySelected.height = viewData[4]['Default'];
            data[index].flxBillPaymentHistorySelected.skin = viewData[5];
            data[index].flxBillPaymentHistorySelectedMobile.height = viewData[4]['Mobile'];
            data[index].flxBillPaymentHistorySelectedMobile.skin = viewData[5];
            scopeObj.view.segmentBillpay.setDataAt(data[index], index);
        },
        displayData: function(historyData) {
            var dataToSplit;
            if (historyData) {
                this.totalPage = historyData.length;
                dataToSplit = historyData;
            } else {
                this.totalPage = this.dataArray.length;
                dataToSplit = this.dataArray;
            }
            if (this.currentPage == 1) {
                this.view.lblPagination.text = this.currentPage + " - " + 10 + " Transactions";
            } else {
                this.view.lblPagination.text = (this.currentPage * 10) - 10 + " - " + (this.currentPage * 10 > this.totalPage ? this.totalPage : this.currentPage * 10) + " Transactions";
            }
            var startIndex = (this.currentPage - 1) * this.itemsPerPage;
            var endIndex = startIndex + this.itemsPerPage;
            var dataToShow = dataToSplit.slice(startIndex, endIndex);
            this.view.imgPaginationPrevious.src = "pagination_back_blue.png";
            this.view.imgPaginationNext.src = "pagination_blue.png";
            if (Math.ceil(dataToSplit.length / 10) == this.currentPage) {
                this.view.flxPaginationNext.setEnabled(false);
                this.view.flxPaginationPrevious.setEnabled(true);
                this.view.imgPaginationNext.src = "pagination_next_inactive.png";
                this.view.imgPaginationPrevious.src = "pagination_back_blue.png";
            } else {
                this.view.flxPaginationNext.setEnabled(true);
                this.view.flxPaginationPrevious.setEnabled(true);
                this.view.imgPaginationPrevious.src = "pagination_back_blue.png";
                if (this.currentPage == 1) {
                    this.view.flxPaginationPrevious.setEnabled(false);
                    this.view.imgPaginationNext.src = "pagination_blue.png";
                    this.view.imgPaginationPrevious.src = "pagination_back_inactive.png";
                }
            }
            this.setTransactionHistory(dataToShow);
            this.view.flxTransactionHistory.forceLayout();
        },
        nextPage: function() {
            this.currentPage++;
            this.displayData();
        },
        previousPage: function() {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.displayData();
            }
        },
        onBreakpointChange: function(form, width) {
            FormControllerUtility.setupFormOnTouchEnd(width);
            this.view.customheadernew.onBreakpointChangeComponent(width);
            this.view.customfooternew.onBreakpointChangeComponent(width);
            this.view.forceLayout();
        },
        setTransactionHistory: function(paymenthistorydata) {
            var scopeObj = this;
            applicationManager.getNavigationManager().setCustomInfo("TransactionHistory", false);
            this.view.flxResponseField.setVisibility(false);
            if (paymenthistorydata.length != 0) {
                this.view.flxRightContent.setVisibility(false);
                this.view.flxMerchatFields.setVisibility(false);
                this.view.flxNoPayment.setVisibility(false);
                this.view.flxTitle.setVisibility(true);
                this.view.flxResponseField.setVisibility(false);
                this.view.flxTransactionHistory.setVisibility(true);
                this.view.flxSearch.setVisibility(false);
                var dataMap = {
                    "lblIdentifier": "lblIdentifier",
                    "lblDropdown": "lblDropdown",
                    "flxDropdown": "flxDropdown",
                    "lblDate": "lblDate",
                    "flxSendToUser": "flxSendToUser",
                    "lblSendToUser": "lblSendToUser",
                    "lblSendTo": "lblSendTo",
                    "lblSortAmount": "lblSortAmount",
                    "lblSortBalance": "lblSortBalance",
                    "btnRepeat": "btnRepeat",
                    "lblRefrenceNumber": "lblRefrenceNumber",
                    "lblRefrenceNumberValue": "lblRefrenceNumberValue",
                    "flxSentFromUser": "flxSentFromUser",
                    "lblSentFromUser": "lblSentFromUser",
                    "lblSentFrom": "lblSentFrom",
                    "lblSentFromValue": "lblSentFromValue",
                    "lblNotes": "lblNotes",
                    "lblNotesValue": "lblNotesValue",
                    "btnEdit": "btnEdit",
                    "lblSeparator": "lblSeparator",
                    "lblSeperatorone": "lblSeperatorone",
                    "flxIdentifier": "flxIdentifier",
                    "lblSeparator2": "lblSeparator2",
                    "flxBillPaymentHistorySelected": "flxBillPaymentHistorySelected",
                    "flxBillPaymentHistorySelectedMobile": "flxBillPaymentHistorySelectedMobile"
                }
                // var AccountsData = kony.mvc.MDAApplication.getSharedInstance().moduleManager.getModule({
                //     appName: "HomepageMA",
                //     moduleName: "AccountsUIModule"
                // }).presentationController.accounts;
                // for (i = 0; i < AccountsData.length; i++) {
                //     if (!paymenthistorydata[i]) {
                //         break;
                //     }
                //     if (paymenthistorydata[i].fromAccountNumber == AccountsData[i].accountID) {
                //         paymenthistorydata[i].fromAccountName = AccountsData[i].accountName;
                //         paymenthistorydata[i].fromNickName = AccountsData[i].accountName;
                //         paymenthistorydata[i].fromAccountNumber = AccountsData[i].accountID;
                //     } else {
                //         paymenthistorydata[i].fromAccountName = AccountsData[i].accountType;
                //         paymenthistorydata[i].fromNickName = AccountsData[i].accountType;
                //         paymenthistorydata[i].fromAccountNumber = AccountsData[i].accountID;
                //     }
                // }
                var userbillPayHistory = paymenthistorydata.map(function(dataItem) {
                    var AccountData = kony.mvc.MDAApplication.getSharedInstance().moduleManager.getModule({
                    appName: "HomepageMA",
                    moduleName: "AccountsUIModule"
                }).presentationController.accounts;
                for (i = 0; i < AccountData.length; i++) {
                if (dataItem.fromAccountNumber == AccountData[i].accountID) {
                        dataItem.fromAccountName = AccountData[i].accountName;
                        dataItem.fromNickName = AccountData[i].accountName;
                        dataItem.fromAccountNumber = AccountData[i].accountID;
                    } 
                }
                    dataItem.lastPaidDate = dataItem.transactionts;
                    dataItem.RefrenceNumber = dataItem.confirmationNumber;
                    dataItem.SentFrom = dataItem.fromAccountNumber;
                    dataItem.lastPaidAmount = scopeObj.formatAmount(dataItem.amount, true, applicationManager.getFormatUtilManager().getCurrencySymbol(dataItem.transactionCurrency));
                    dataItem.lastPaidAmount = dataItem.transactionCurrency + " " + dataItem.lastPaidAmount;
                    dataItem.Status = dataItem.status == "Executed" ? "Success" : dataItem.status;
                    dataItem.notes = dataItem.notes || '';
                    return {
                        "lblDropdown": ViewConstants.FONT_ICONS.CHEVRON_DOWN,
                        "flxDropdown": {
                            onClick: scopeObj.handleSegmentRowView.bind(scopeObj)
                        },
                        "lblIdentifier": {
                            "skin": "sknffffff15pxolbfonticons"
                        },
                        "flxIdentifier": {
                            "skin": "sknFlxIdentifier"
                        },
                        "lblSeparator": "A",
                        "lblSeperatorone": "A",
                        "lblSeparator2": "A",
                        "lblDate": {
                            "text": scopeObj.getDateFromDateString(dataItem.transactionts, "YYYY-MM-DDTHH:MM:SS"),
                            "accessibilityconfig": {
                                "a11yLabel": scopeObj.getDateFromDateString(dataItem.transactionts, "YYYY-MM-DDTHH:MM:SS")
                            }
                        },
                        "flxBillPaymentHistorySelected": {
                            "height": "50dp",
                            "skin": "sknflxffffffnoborder"
                        },
                        "flxBillPaymentHistorySelectedMobile": {
                            "height": "69dp",
                            "skin": "sknflxffffffnoborder"
                        },
                        "flxSendToUser": {
                            //"isVisible": (applicationManager.getConfigurationManager().isCombinedUser === "true") ? true : false
                            "isVisible": false, //this.profileAccess === "both" ? true : false,
                        },
                        "lblSendToUser": {
                            "isVisible": this.profileAccess === "both" ? true : false,
                            //"isVisible": (applicationManager.getConfigurationManager().isCombinedUser === "true") ? true : false,
                            "text": dataItem.isBusinessPayee === "1" ? "r" : "s",
                        },
                        "lblSendTo": {
                            "text": dataItem.toAccountNumber.length > 17 ? dataItem.toAccountNumber.substring(0, 17) + "..." : dataItem.toAccountNumber,
                            "accessibilityconfig": {
                                "a11yLabel": dataItem.toAccountNumber
                            }
                        },
                        "lblSortAmount": {
                            "text": dataItem.lastPaidAmount,
                            "accessibilityconfig": {
                                "a11yLabel": dataItem.lastPaidAmount
                            }
                        },
                        "lblSortBalance": {
                            "text": dataItem.Status,
                            "accessibilityconfig": {
                                "a11yLabel": dataItem.Status
                            }
                        },
                        "btnRepeat": {
                            "text": kony.i18n.getLocalizedString("i18n.accounts.repeat"),
                            "left": CommonUtilities.isMirrorLayoutEnabled() ? "15px" : "2px",
                            "onClick": scopeObj.repeatOnclick.bind(this, dataItem),
                            "isVisible": true
                        },
                        "lblRefrenceNumber": {
                            "text": kony.i18n.getLocalizedString("i18n.transfers.RefrenceNumber"),
                            "accessibilityconfig": {
                                "a11yLabel": kony.i18n.getLocalizedString("i18n.transfers.RefrenceNumber")
                            }
                        },
                        "lblRefrenceNumberValue": {
                            "text": dataItem.paymentId,
                            "accessibilityconfig": {
                                "a11yLabel": dataItem.paymentId
                            }
                        },
                        "flxSentFromUser": {
                            "isVisible": scopeObj.profileAccess === "both" ? true : false,
                            //"isVisible": (applicationManager.getConfigurationManager().isCombinedUser === "true") ? true : false
                        },
                        "lblSentFromUser": {
                            "isVisible": scopeObj.profileAccess === "both" ? true : false,
                            //"isVisible": (applicationManager.getConfigurationManager().isCombinedUser === "true") ? true : false,
                            "text": dataItem.fromAccountNumber
                        },
                        "lblSentFrom": {
                            "text": kony.i18n.getLocalizedString("i18n.billPay.sentFrom"),
                            "accessibilityconfig": {
                                "a11yLabel": kony.i18n.getLocalizedString("i18n.billPay.sentFrom")
                            }
                        },
                        "lblSentFromValue": {
                            "text": CommonUtilities.getAccountDisplayName({
                                name: dataItem.fromAccountName ? dataItem.fromAccountName : "Static",
                                accountID: dataItem.fromAccountNumber,
                                nickName: dataItem.fromNickName ? dataItem.fromNickName : "static",
                                Account_id: dataItem.fromAccountNumber
                            }),
                            "accessibilityconfig": {
                                "a11yLabel": CommonUtilities.getAccountDisplayName({
                                    name: dataItem.fromAccountName ? dataItem.fromAccountName : "Static",
                                    accountID: dataItem.fromAccountNumber,
                                    nickName: dataItem.fromNickName ? dataItem.fromNickName : "static",
                                    Account_id: dataItem.fromAccountNumber
                                }),
                            }
                        },
                        "lblNotes": {
                            "text": kony.i18n.getLocalizedString("i18n.transfers.Description"),
                            "accessibilityconfig": {
                                "a11yLabel": kony.i18n.getLocalizedString("i18n.transfers.Description")
                            }
                        },
                        "lblNotesValue": {
                            "text": dataItem.notes ? dataItem.notes : kony.i18n.getLocalizedString("i18n.common.none"),
                            "accessibilityconfig": {
                                "a11yLabel": dataItem.notes ? dataItem.notes : kony.i18n.getLocalizedString("i18n.common.none")
                            }
                        },
                        "btnEdit": {
                            "text": kony.i18n.getLocalizedString("i18n.transfers.downloadReport"),
                            "right": CommonUtilities.isMirrorLayoutEnabled() ? "15px" : "",
                            "onClick": function() {
                                scopeObj.presenter = applicationManager.getModulesPresentationController({
                                    'appName': 'BillPayMA',
                                    'moduleName': 'BillPaymentUIModule'
                                });
                                scopeObj.presenter.downloadTransactionReport(dataItem.transactionId);
                            },
                            "isVisible": applicationManager.getConfigurationManager().checkUserPermission("BILL_PAY_CREATE")
                        },
                        "template": (kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile) ? "flxBillPaymentHistorySelectedMobile" : "flxBillPaymentHistorySelected"
                    }
                });
                this.view.segmentBillpay.widgetDataMap = dataMap;
                this.view.segmentBillpay.setData(userbillPayHistory);
            } else {
                this.showError("NoTransactionHistory");
            }
        },
        initateSearch: function() {
            try {
                var searchData = this.view.txtSearch.text;
                var categoriesData = applicationManager.getNavigationManager().getCustomInfo("BillpaCategories");
                var subcategoryData = applicationManager.getNavigationManager().getCustomInfo("subcategoryData");
                var searchfrom;
                var seatchResult = [];
                if (subcategoryData.length != 0) {
                    searchfrom = subcategoryData;
                } else {
                    searchfrom = categoriesData;
                }
                if (searchData.length >= 3) {
                    for (i = 0; i < searchfrom.length; i++) {
                        if (searchfrom[i].labelText.toUpperCase().indexOf(searchData.toUpperCase()) != -1) {
                            seatchResult.push(searchfrom[i]);
                        }
                    }
                    this.setSearchData(seatchResult);
                } else if (searchData.length == 0 && subcategoryData.length != 0) {
                    this.setSubcategoryData(subcategoryData);
                } else if (searchData.length == 0 && categoriesData.length != 0) {
                    this.view.segCatogories.selectedRowIndex = [0, this.selectedindex];
                    this.SegmentOnclick();
                }
            } catch (err) {
                alert("Error in Initiae search" + err);
            }
        },
        getCategory: function(param) {
            try {
                applicationManager.getNavigationManager().setCustomInfo("isRepeatPaymentFlow", false);
                var presenter = applicationManager.getModulesPresentationController({
                    'appName': 'BillPayMA',
                    'moduleName': 'BillPaymentUIModule'
                });
                // presenter.getFavMerchants();
                var params = "";
                if (param == "TRANSACTION_HISTORY") {
                    this.currentPage = 1;
                    //params = {
                    //  "billerId": "test"
                    //};
                    presenter.getTransactionHistoryData(params);
                } else {
                    var type = applicationManager.getNavigationManager().getCustomInfo("flowTypePrev");
                    if (type == "Back") {
                        var newType = "front";
                        applicationManager.getNavigationManager().setCustomInfo("flowTypePrev", newType);
                    } else {
                        params = {
                            "code": param
                        };
                        presenter.getCategories(params);
                    }
                }
            } catch (err) {
                alert("error in getCategory FUnction" + err);
            }
        },
        setCategoryData: function(categories) {
            try {
                var currBreakpoint = kony.application.getCurrentBreakpoint();
                this.view.lblBacktoDashboard.setVisibility(false);
                this.view.flxError.setVisibility(false);
                if (currBreakpoint == 1366 || currBreakpoint >= 1024 || currBreakpoint == -1) {
                    this.view.flxFavMin.setVisibility(true);
                    this.view.flxRightPane.setVisibility(true);
                    applicationManager.getNavigationManager().setCustomInfo("BillpaCategories", categories);
                    var segData = [];
                    categories.sort(function(a, b) {
                        return a.sequence - b.sequence
                    });
                    for (i = 0; i < categories.length; i++) {
                        var logoUrl = categories[i].logoUrl;
                        if (logoUrl == undefined || logoUrl == null || logoUrl == "null") {
                            if (categories[i].code == "Utilities") logoUrl = "utilitypayment.png";
                            if (categories[i].code == "CorporatePayment") logoUrl = "corporatepayment.png";
                            if (categories[i].code == "Creditor") logoUrl = "creditorpayment.png";
                            if (categories[i].code == "FinancialInstitution") logoUrl = "financialinst.png";
                            if (categories[i].code == "Government") logoUrl = "government.png";
                            if (categories[i].code == "TRANSACTION_HISTORY") logoUrl = "transactionhistory.png";
                            if (categories[i].code == "FundTransfer") logoUrl = "fundtransferpayment.png";
                            if (categories[i].code == "Insurance") logoUrl = "insurancepayment.png";
                            if (categories[i].code == "Others") logoUrl = "otherspayment.png";
                            if (categories[i].code == "Wallet") logoUrl = "walletpayment.png";
                        }
                        segData.push({
                            "imgLogo": {
                                "src": logoUrl
                            },
                            "lblcontent": {
                                "skin": "sknlblFontSourcesanssemiboldFFFFF",
                                "text": categories[i].labelText
                            },
                            "flxRight": {
                                "skin": "sknflxBg851A1Cop100"
                            },
                            "lblHbar": {
                                "isVisible": true
                            }
                        })
                    }
                    //categories.sort(function(a, b){return a.sequence - b.sequence});
                    this.view.segCatogories.widgetDataMap = {
                        "imgLogo": "imgLogo",
                        "lblcontent": "lblcontent",
                        "flxRight": "flxRight",
                        "lblHbar": "lblHbar"
                    };
                    this.view.segCatogories.setData(segData);
                    if (categories.withHistory == true) {
                        this.view.segCatogories.selectedRowIndex = [0, segData.length - 1];
                    } else {
                        this.view.segCatogories.selectedRowIndex = [0, 0];
                    }
                    this.SegmentOnclick();
                    //this.getSubCategories(categories[0].code);
                } else if (currBreakpoint == 640 || currBreakpoint < 640) {
                    this.view.flxFavMin.setVisibility(false);
                    this.view.flxLeftPane.setVisibility(true);
                    this.view.flxRightPane.setVisibility(false);
                    this.view.flxLeftPane.width = "100%";
                    applicationManager.getNavigationManager().setCustomInfo("BillpaCategories", categories);
                    var segData = [];
                    categories.sort(function(a, b) {
                        return a.sequence - b.sequence
                    });
                    for (i = 0; i < categories.length; i++) {
                        var logoUrl = categories[i].logoUrl;
                        if (logoUrl == undefined || logoUrl == null || logoUrl == "null") {
                            if (categories[i].code == "Utilities") logoUrl = "utilitypayment.png";
                            if (categories[i].code == "CorporatePayment") logoUrl = "corporatepayment.png";
                            if (categories[i].code == "Creditor") logoUrl = "creditorpayment.png";
                            if (categories[i].code == "FinancialInstitution") logoUrl = "financialinst.png";
                            if (categories[i].code == "Government") logoUrl = "government.png";
                            if (categories[i].code == "TRANSACTION_HISTORY") logoUrl = "transactionhistory.png";
                            if (categories[i].code == "FundTransfer") logoUrl = "creditorpayment.png";
                            if (categories[i].code == "Insurance") logoUrl = "utilitypayment.png";
                            if (categories[i].code == "Others") logoUrl = "utilitypayment.png";
                            if (categories[i].code == "Wallet") logoUrl = "utilitypayment.png";
                        }
                        segData.push({
                            "imgLogo": {
                                "src": logoUrl
                            },
                            "lblcontent": {
                                "skin": "sknlblFontSourcesanssemibold0000",
                                "text": categories[i].labelText
                            },
                            "flxRight": {
                                "skin": "sknflxBgFCF9F9op100"
                            },
                            "lblHbar": {
                                "isVisible": true
                            }
                        })
                    }
                    //categories.sort(function(a, b){return a.sequence - b.sequence});
                    this.view.segCatogories.widgetDataMap = {
                        "imgLogo": "imgLogo",
                        "lblcontent": "lblcontent",
                        "flxRight": "flxRight",
                        "lblHbar": "lblHbar"
                    };
                    this.view.segCatogories.setData(segData);
                    if (categories.withHistory == true) {
                        this.view.segCatogories.selectedRowIndex = [0, segData.length - 1];
                    } else {
                        this.view.segCatogories.selectedRowIndex = [0, 0];
                    }
                    //this.SegmentOnclick();
                }
            } catch (err) {
                alert("error in  setCategory function" + err);
            }
        },
        getSubCategories: function(Data) {
            try {
                var presenter = applicationManager.getModulesPresentationController({
                    'appName': 'BillPayMA',
                    'moduleName': 'BillPaymentUIModule'
                });
                var params = {
                    "code": Data
                };
                presenter.getSubCategories(params);
            } catch (err) {
                alert("error in getSubCategories FUnction" + err);
            }
        },
        SegmentOnclick: function() {
            FormControllerUtility.showProgressBar(this.view);
            applicationManager.getNavigationManager().setCustomInfo("isRepeatPaymentFlow", false);
            this.view.flxDowntimeWarning.isVisible = false;
            this.view.rtxDowntimeWarning.text = "";
            try {
                //this.dataToPush = {};
                var currBreakpoint = kony.application.getCurrentBreakpoint();
                if (currBreakpoint == 640) {
                    this.view.lblBacktoDashboard.setVisibility(true);
                } else {
                    this.view.lblBacktoDashboard.setVisibility(false);
                }
                if (currBreakpoint == 1366 || currBreakpoint >= 1024 || currBreakpoint == -1) {
                    this.view.flxLeftPane.setVisibility(true);
                    this.view.flxRightPane.setVisibility(true);
                    this.view.flxRightPane.width = "70%";
                    this.view.flxContainer.width = "86%";
                    this.view.flxFooter.top = "0dp";
                    this.view.flxRightPane.centerX = "";
                    this.view.flxRightContent.removeAll();
                    applicationManager.getNavigationManager().setCustomInfo("subcategoryData", "");
                    //this.view.flxRightContent.layoutType = kony.flex.FREE_FORM;
                    var WidgetsData = [];
                    var index = this.view.segCatogories.selectedRowIndex[1];
                    var rowData = this.view.segCatogories.selectedRowItems[0].lblcontent.text;
                    this.selectedindex = index;
                    var data = this.view.segCatogories.data;
                    var payloadCode;
                    var categoriesData = applicationManager.getNavigationManager().getCustomInfo("BillpaCategories");
                    for (var i = 0; i < data.length; i++) {
                        if (i == index) {
                            payloadCode = categoriesData[index].code;
                            data[i].flxRight.skin = "sknflxBg851A1Cop100";
                            data[i].lblHbar.isVisible = false;
                            data[i].lblcontent.skin = "sknlblFontSourcesanssemiboldFFFFF";
                        } else {
                            data[i].flxRight.skin = "sknflxBgFCF9F9op100";
                            data[i].lblHbar.isVisible = true;
                            data[i].lblcontent.skin = "sknlblFontSourcesanssemibold0000";
                        }
                    }
                    this.view.lblTitle.text = rowData;
                    if (applicationManager.getNavigationManager().getCustomInfo("TransactionHistory")) {
                        this.getCategory("TRANSACTION_HISTORY");
                        for (var i = 0; i < data.length; i++) {
                            if (i == data.length - 1) {
                                payloadCode = categoriesData[index].code;
                                data[i].flxRight.skin = "sknflxBg851A1Cop100";
                                data[i].lblHbar.isVisible = false;
                                data[i].lblcontent.skin = "sknlblFontSourcesanssemiboldFFFFF";
                            } else {
                                data[i].flxRight.skin = "sknflxBgFCF9F9op100";
                                data[i].lblHbar.isVisible = true;
                                data[i].lblcontent.skin = "sknlblFontSourcesanssemibold0000";
                            }
                        }
                    } else {
                        this.getCategory(payloadCode);
                    }
                    this.view.segCatogories.setData(data);
                } else if (currBreakpoint == 640 || currBreakpoint < 640) {
                    this.view.flxLeftPane.setVisibility(false);
                    this.view.flxRightPane.setVisibility(true);
                    this.view.flxRightPane.width = "100%";
                    this.view.flxContainer.width = "90%";
                    this.view.flxFooter.top = "400dp";
                    this.view.flxRightPane.centerX = "50%";
                    this.view.flxRightContent.removeAll();
                    applicationManager.getNavigationManager().setCustomInfo("subcategoryData", "");
                    //this.view.flxRightContent.layoutType = kony.flex.FREE_FORM;
                    var dynamicWidgetsData = [];
                    var index = this.view.segCatogories.selectedRowIndex[1];
                    var rowData = this.view.segCatogories.selectedRowItems[0].lblcontent.text;
                    this.selectedindex = index;
                    var data = this.view.segCatogories.data;
                    var payloadCode;
                    var categoriesData = applicationManager.getNavigationManager().getCustomInfo("BillpaCategories");
                    for (var i = 0; i < data.length; i++) {
                        if (i == index) {
                            payloadCode = categoriesData[index].code;
                            data[i].flxRight.skin = "sknflxBg851A1Cop100";
                            data[i].lblHbar.isVisible = false;
                            data[i].lblcontent.skin = "sknlblFontSourcesanssemiboldFFFFF";
                        } else {
                            data[i].flxRight.skin = "sknflxBgFCF9F9op100";
                            data[i].lblHbar.isVisible = true;
                            data[i].lblcontent.skin = "sknlblFontSourcesanssemibold0000";
                        }
                    }
                    this.view.lblTitle.text = rowData;
                    if (applicationManager.getNavigationManager().getCustomInfo("TransactionHistory")) {
                        this.getCategory("TRANSACTION_HISTORY");
                        for (var i = 0; i < data.length; i++) {
                            if (i == data.length - 1) {
                                payloadCode = categoriesData[index].code;
                                data[i].flxRight.skin = "sknflxBg851A1Cop100";
                                data[i].lblHbar.isVisible = false;
                                data[i].lblcontent.skin = "sknlblFontSourcesanssemiboldFFFFF";
                            } else {
                                data[i].flxRight.skin = "sknflxBgFCF9F9op100";
                                data[i].lblHbar.isVisible = true;
                                data[i].lblcontent.skin = "sknlblFontSourcesanssemibold0000";
                            }
                        }
                    } else {
                        this.getCategory(payloadCode);
                    }
                    this.view.segCatogories.setData(data);
                }
            } catch (err) {
                alert("Error in categoriesOnclick" + err);
            }
        },
        categoryOnclick: function(dynamicData, eventobject) {
            /* for (i = 0; i < dynamicData.length; i++) {                                                                                                                                                                                        }*/
            applicationManager.getNavigationManager().setCustomInfo("isRepeatPaymentFlow", false);
            if (dynamicData.length > 0 && dynamicData.length != undefined) {
                for (i = 0; i < dynamicData.length; i++) {
                    if (eventobject.widgets()[1].text == dynamicData[i].labelText && dynamicData[i].category != "APP") {
                        this.getCategory(dynamicData[i].code);
                    } else if (eventobject.widgets()[1].text == dynamicData[i].labelText && dynamicData[i].category == "APP") {
                        this.getMerchantdata(dynamicData[i].code);
                    }
                }
            } else {
                if (dynamicData.category == "APP") {
                    this.dataToPush = {};
                    this.dataToShowInConfirmationScreen = {};
                    applicationManager.getNavigationManager().setCustomInfo("PaymentAggregatorType", dynamicData.paymentAggregator);
                    applicationManager.getNavigationManager().setCustomInfo("MerchantCode", dynamicData.code);
                    params = {
                        "merchantCode": dynamicData.code
                    };
                    applicationManager.getNavigationManager().setCustomInfo("subcategoryData", params.merchantCode);
                    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                        "appName": "HomepageMA",
                        "moduleName": "AccountsUIModule"
                    }).presentationController.getMerchantPaymentCharges(params);
                    this.enableDisableEnquieryButton();
                    applicationManager.getNavigationManager().setCustomInfo("Biller_Code", dynamicData);
                    if (dynamicData.merchantType != "Automatic") {
                        //this.view.flxMErchantFieldData.height = "360dp";
                        //this.view.flxMerchatFields.height = "360dp";
                        this.view.flxMerchatFields.setVisibility(false);
                        this.view.flxResponseField.setVisibility(true);
                        this.view.flxRightContent.setVisibility(true);
                        this.view.flxConsentContainer.setVisibility(false);
                        this.view.flxBottom.setVisibility(true);
                        this.view.flxBrowser.setVisibility(false);
                        this.view.imgMerchantLogo.setVisibility(true);
                        this.view.flxSenderDetails.setVisibility(true);
                        this.view.flxFromAccount.setVisibility(true);
                        this.view.flxSearch.setVisibility(true);
                        this.view.flxBeneficiaryDetails.setVisibility(true);
                        this.getMerchantdata(dynamicData);
                        this.titleData = eventobject.widgets()[1].text;
                        this.MerchantlogoUrl = dynamicData.logoUrl;
                    } else {
                        //this.view.flxMErchantFieldData.height = "400dp";
                        //this.view.flxMerchatFields.height = "400dp";
                         this.view.flxErrorMsg.isVisible = false;
                        // this.view.flxRightContent.setVisibility(true);
                        // this.view.flxConsentContainer.setVisibility(true);
                        // this.view.flxMErchantFieldData.height = "400dp";
                        // this.view.flxMerchatFields.height = "400dp";
                        // this.view.flxRightPane.height="500px";
                        // this.view.flxContainer.height="500px";
                        // this.view.flxLeftPane.height="500px";
                        // this.view.lblFavoriteEmailCheckBox.text = "D";
                        // this.view.lblFavoriteEmailCheckBox.skin = this.CHECKBOX_UNSELECTED_SKIN;
                        // this.view.btnAccept.skin = "sknBtnBlockedSSPFFFFFF15Px";
                        // this.view.btnAccept.setEnabled(false);
                        // this.view.flxTitle.setVisibility(false);
                        // this.MerchantlogoUrl = dynamicData.logoUrl;
                        // this.view.flxRightContent.setVisibility(false);
                        // this.titleData = eventobject.widgets()[1].text;
                        // this.view.imgMerchantLogo.src = this.MerchantlogoUrl;
                        // this.view.flxSearch.setVisibility(false);
                        this.ShowWebView(this);
                    }
                } else {
                    this.getCategory(dynamicData.code);
                }
            }
        },
        ShowWebView: function() {
            FormControllerUtility.showProgressBar(this.view);
            this.view.flxConsentContainer.setVisibility(false);
            this.view.flxConsentContainer.left = "0px";
            this.view.flxMerchatFields.setVisibility(true);
            this.view.flxResponseField.setVisibility(false);
            this.view.flxTitle.setVisibility(false);
            this.view.flxRightContent.setVisibility(false);
            this.view.flxBrowswewidget.top = "0px";
            this.view.flxBeneficiaryDetails.setVisibility(false);
            this.view.imgMerchantLogo.setVisibility(false);
            this.view.flxSearch.setVisibility(false);
            this.view.flxSenderDetails.setVisibility(false);
            this.view.flxFromAccount.setVisibility(false);
            this.view.flxBrowser.height = "400px";
            this.view.flxBrowser.setVisibility(true);
            this.view.flxBottom.setVisibility(false);
            //this.titleData = eventobject.widgets()[1].text;
            this.view.BrowserBillPay.left = "0px";
            this.view.BrowserBillPay.height = "400px";
            this.view.flxBrowser.width = "95%";
            //this.MerchantlogoUrl = dynamicData.logoUrl;
            //this.view.imgMerchantLogo.src = this.MerchantlogoUrl;
            var param = {
                "channelName": "web"
            }
            var presenter = applicationManager.getModulesPresentationController({
                'appName': 'BillPayMA',
                'moduleName': 'BillPaymentUIModule'
            });
            presenter.getURL(param);
            /* var urlConf = {
                 URL: "https://dev.connectips.com/billers/dev/demo",
                 requestMethod: constants.BROWSER_REQUEST_METHOD_GET,
                 headers: ""
             };*/
            // this.view.brwsr.loadBrowser = "https://dev.connectips.com/billers/dev/demo";
            //this.view.brwsr.requestURLConfig = urlConf;
            //this.view.BrowserBillPay.htmlString = "<iframe src = \"https://dev.connectips.com/billers/dev/demo\"></iframe>"
        },
        URLPopulateSuccess: function(res) {
            var URL = res.formFieldsURL;
            var billercode = applicationManager.getNavigationManager().getCustomInfo("subcategoryData");
            URL = URL + billercode;
            //URL = URL + "282";
            var navManager = applicationManager.getNavigationManager();
            navManager.setCustomInfo("merchantflowtype", "webview");
            /*this.view.flxMErchantFieldData.height = "400dp";
            this.view.flxMerchatFields.height = "400dp";
            this.view.flxRightPane.height="500px";
            this.view.flxContainer.height="500px";
            this.view.flxLeftPane.height="500px";*/
            if (res.formFieldsURL != undefined && res.formFieldsURL != null) {
                URL = "<iframe id='myiFrame' width='200' height ='200' src=" + URL + "></iframe>";
                this.view.BrowserBillPay.htmlString = URL;
                this.view.BrowserBillPay.contentLoadsKonyWeb = true;
                this.view.BrowserBillPay.onSuccess = this.pageFinishedCallback;
                //this.view.billPayBrwser.onPageStarted =this.onSuccessCallback.bind(this);
                this.view.BrowserBillPay.onPageFinished = this.pageFinishedCallback;
                setTimeout(this.addeventListeners, 100);
            } else {
                this.view.BrowserBillPay.htmlString = "<iframe src = \"https://dev.connectips.com/billers/dev/demo\"></iframe>";
            }
        },
        pageFinishedCallback: function(eventobject, params) {
            //alert("pageFinishedCallback:eventobject:-->"+eventobject);
            //alert("pageFinishedCallback:params:-->"+params);
            if (params != null && params != undefined && params.queryParams != undefined && params.queryParams != "") {
                var queryParams = params.queryParams;
                kony.print("queryParams:" + queryParams);
                var payload;
                if (typeof(queryParams) === "object" && queryParams.payload != undefined) {
                    payload = queryParams.payload;
                    alert("pageFinishedCallback:Object payload:-->" + payload);
                } else if (typeof(queryParams) === "string") {
                    var collectionObj = queryParams.payload.split(":");
                    payload = queryParams.collectionObj[1];
                    alert("pageFinishedCallback:payload:-->" + payload);
                }
            }
        },
        addeventListeners: function() {
            var scope = this;
            var iframe = document.getElementById("myiFrame");
            iframe.addEventListener('load', scope.handleIframeMessage);
            window.addEventListener('load', scope.handleIframeMessage);
            window.addEventListener('message', scope.handleIframeMessage);
        },
        handleIframeMessage: function(event, params) {
            if (event.origin != undefined && event.origin !== scope_configManager.getNPI_BILLERS_URL()) {
                return;
            }
            // event.data contains the NPI Biller Message
            if (event.type === "load") {
                //alert("data loaded::");
                FormControllerUtility.hideProgressBar(this.view);
            } else if (event.type === "message") {
                //alert("message received ");
                var payload = JSON.parse(event.data);
                if (payload.type === "submit_form_payload") {
                    payload = payload.data;
                    PayLoad = {
                            "npiObject": payload
                        }
                        //alert("payload received:"+payload);
                    var presenter = applicationManager.getModulesPresentationController({
                        'appName': 'BillPayMA',
                        'moduleName': 'BillPaymentUIModule'
                    });
                    presenter.getWebViewdata(PayLoad);
                }
            }
            //http://demo.connectips.com:6065/api/billpayment/confirmbillpay.do
            // event.data contains the NPI Biller Message
            console.log("data received:" + event.data);
        },
        onLoadSuccess: function(response) {
            this.view.forceLayout();
            var url = document.getElementById("extrenalSite");
        },
        onSuccessCallback: function(browser) {
            //kony.ui.Alert("onSuccess event triggered");
        },
        getMerchantdata: function(dynamicData) {
            //this.dataToPush={};
            var param = {
                "appCode": dynamicData.code,
                "merchantType": dynamicData.merchantType
            };
            var presenter = applicationManager.getModulesPresentationController({
                'appName': 'BillPayMA',
                'moduleName': 'BillPaymentUIModule'
            });
            presenter.getMerchantsdata(param);
        },
        setSearchData: function(subCategoryData) {
            //applicationManager.getNavigationManager().setCustomInfo("subcategoryData",subCategoryData);
            this.view.flxRightContent.removeAll();
            this.view.flxRightContent.layoutType = kony.flex.FLOW_VERTICAL;
            // Calculate number of rows needed
            var numRows = Math.ceil(subCategoryData.length / 4);
            for (var i = 0; i < numRows; i++) {
                // Create a new FlexContainer for each row
                var flexRow = new kony.ui.FlexContainer({
                    "id": "flxRow" + (i + 1),
                    "left": "0dp",
                    "top": "0dp",
                    "width": "100%",
                    //         "height": kony.flex.USE_PREFERRED_SIZE,
                    "height": "125dp",
                    "zIndex": 10,
                    "isVisible": true,
                    "skin": "sknflx",
                    "clipBounds": false,
                    "layoutType": kony.flex.FLOW_HORIZONTAL
                });
                // Add the FlexContainer to the form
                this.view.flxRightContent.add(flexRow);
                // Create 4 FlexContainers for each row (assuming exactly 4 flexes per row)
                for (var j = 0; j < 4; j++) {
                    var index = i * 4 + j;
                    if (index >= subCategoryData.length) {
                        break; // Break if no more categories to display
                    }
                    var category = subCategoryData[index];
                    // Create a new FlexContainer for each flex in the row
                    var flexContainer = new kony.ui.FlexContainer({
                        "id": "flxContainer" + (j + 1) + "Row" + (i + 1),
                        "left": "0%",
                        "width": "25%",
                        "height": "100%",
                        "onClick": this.categoryOnclick.bind(this, subCategoryData[index]),
                        "layoutType": kony.flex.FLOW_VERTICAL,
                        "isVisible": true
                    });
                    // Create Label widget
                    var labelWidget = new kony.ui.Label({
                        "id": "lblCategory" + category.id,
                        "text": subCategoryData[index].labelText,
                        "height": kony.flex.USE_PREFERED_SIZE,
                        "isVisible": true,
                        "width": "90%",
                        "left": "",
                        "right": "",
                        "top": "5dp",
                        "centerX": "50%",
                        "skin": "sknlblFontCol851A1CSiz12pxSanPro",
                        "zIndex": 1
                    });
                    // Create Image widget
                    var imageWidget = new kony.ui.Image2({
                        "id": "imgCategory" + category.id,
                        "src": subCategoryData[index].logoUrl,
                        "isVisible": true,
                        "top": "30dp",
                        "height": "40dp",
                        "width": "40dp",
                        "centerX": "50%",
                        "imageWhenFailed": "imagedrag.png",
                        "imageWhileDownloading": "acme.png"
                    });
                    // Add Label and Image widgets to the FlexContainer
                    flexContainer.add(imageWidget);
                    flexContainer.add(labelWidget);
                    // Add the FlexContainer to the row's FlexContainer
                    flexRow.add(flexContainer);
                }
            }
        },
        setSubcategoryData: function(subCategoryData) {
            // this.enableDisableEnquieryButton();
            var subCatData = [];
            for (i = 0; i < subCategoryData.length; i++) {
                if (subCategoryData[i].isActive == "true") {
                    subCatData.push(subCategoryData[i])
                }
            }
            var currBreakpoint = kony.application.getCurrentBreakpoint();
            if (currBreakpoint == 640 || currBreakpoint < 640) {
            this.view.flxLeftPane.setVisibility(false);
            this.view.flxRightPane.width = "100%";
            this.view.flxContainer.width = "90%";
            this.view.flxFooter.top = "400dp";
            this.view.flxRightPane.centerX = "50%";
            }
            else{
            this.view.flxLeftPane.setVisibility(true);
            //this.view.flxError.setVisibility(false);
            this.view.flxRightPane.left = "30%";
            this.view.flxRightPane.width = "70%";
            this.view.flxRightPane.centerX = "";
            }
            this.view.flxError.setVisibility(false);
            this.view.flxSearch.setVisibility(true);
            this.view.flxNoPayment.setVisibility(false);
            this.view.flxRightContent.setVisibility(true);
            this.view.flxMerchatFields.setVisibility(false);
            this.view.flxTransactionHistory.setVisibility(false);
            this.view.flxResponseField.setVisibility(false);
            this.view.flxTitle.setVisibility(true);
            //applicationManager.getNavigationManager().setCustomInfo("subcategoryData", subCatData);
            this.view.flxRightContent.removeAll();
            this.view.flxRightContent.layoutType = kony.flex.FLOW_VERTICAL;
            // Calculate number of rows needed
            var numRows;
            var noofWidgets;
            var flxWidth;
            var currBreakpoint = kony.application.getCurrentBreakpoint();
            if (currBreakpoint == 1366 || currBreakpoint > 640) {
                numRows = Math.ceil(subCatData.length / 4);
                noofWidgets = 4;
                flxWidth = "25%";
            } else if (currBreakpoint == 640 || currBreakpoint < 640) {
                numRows = Math.ceil(subCatData.length / 3);
                noofWidgets = 3;
                flxWidth = "33%";
            }
            for (var i = 0; i < numRows; i++) {
                // Create a new FlexContainer for each row
                var flexRow = new kony.ui.FlexContainer({
                    "id": "flxRow" + (i + 1),
                    "left": "0dp",
                    "top": "0dp",
                    "width": "100%",
                    //         "height": kony.flex.USE_PREFERRED_SIZE,
                    "height": "125dp",
                    "zIndex": 10,
                    "isVisible": true,
                    "skin": "sknflx",
                    "clipBounds": false,
                    "layoutType": kony.flex.FLOW_HORIZONTAL
                });
                // Add the FlexContainer to the form
                this.view.flxRightContent.add(flexRow);
                // Create 4 FlexContainers for each row (assuming exactly 4 flexes per row)
                for (var j = 0; j < noofWidgets; j++) {
                    var index = i * noofWidgets + j;
                    if (index >= subCatData.length) {
                        break; // Break if no more categories to display
                    }
                    var category = subCatData[index];
                    // Create a new FlexContainer for each flex in the row
                    var flexContainer = new kony.ui.FlexContainer({
                        "id": "flxContainer" + (j + 1) + "Row" + (i + 1),
                        "left": "0%",
                        "width": flxWidth,
                        "height": "100%",
                        "onClick": this.categoryOnclick.bind(this, subCatData[index]),
                        "layoutType": kony.flex.FLOW_VERTICAL,
                        "isVisible": true
                    });
                    // Create Label widget
                    var labelWidget = new kony.ui.Label({
                        "id": "lblCategory" + category.id,
                        "text": subCatData[index].labelText,
                        "height": kony.flex.USE_PREFERED_SIZE,
                        "isVisible": true,
                        "width": "90%",
                        "left": "",
                        "right": "",
                        "top": "5dp",
                        "centerX": "50%",
                        "skin": "sknlblFontCol851A1CSiz12pxSanPro",
                        "zIndex": 1
                    });
                    // Create Image widget
                    var imageWidget = new kony.ui.Image2({
                        "id": "imgCategory" + category.id,
                        "src": subCatData[index].logoUrl,
                        "isVisible": true,
                        "top": "30dp",
                        "height": "40dp",
                        "width": "40dp",
                        "centerX": "50%",
                        "imageWhenFailed": "imagedrag.png",
                        "imageWhileDownloading": "acme.png"
                    });
                    // Add Label and Image widgets to the FlexContainer
                    flexContainer.add(imageWidget);
                    flexContainer.add(labelWidget);
                    // Add the FlexContainer to the row's FlexContainer
                    flexRow.add(flexContainer);
                }
            }
        },
        loadStopPaymentsModule: function() {
            return kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "appName": "ArrangementsMA",
                "moduleName": "StopPaymentsUIModule"
            });
        },
        setSenderAccountData: function() {
            var billPaydefaultAcc = kony.store.getItem("BillPayDefaultAccountid");
            var accountsList = this.loadStopPaymentsModule().presentationController.getAccounts();
            for (i = 0; i < accountsList.length; i++) {
                if (accountsList[i].accountID == billPaydefaultAcc) {
                    this.view.lblSelectAccount.text = CommonUtilities.mergeAccountNameNumber(accountsList[i].nickName || accountsList[i].accountName, accountsList[i].account_id);
                    applicationManager.getNavigationManager().setCustomInfo("SelectedAccountData", this.view.lblSelectAccount.text);
                    applicationManager.getNavigationManager().setCustomInfo("SelectedAccountInfo", accountsList[i]);
                    break;
                }
            }
            //this.view.lblSelectAccount.text = kony.i18n.getLocalizedString("kony.mb.CM.selectAccount");
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
            this.view.segDropdown.setVisibility(false);
            if (billPayAcccounts) {
                this.view.segDropdown.setData(billPayAcccounts);
            }
            this.view.forceLayout();
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
                "lblAmount": ((account.accountType !== "CreditCard") && (account.accountType !== "Loan")) ? (account.availableBalance ? applicationManager.getFormatUtilManager().convertAmountValue(account.availableBalance,account.currencyCode) : (account.bankName || account.phone || account.email)) : (applicationManager.getFormatUtilManager().convertAmountValue(account.outstandingBalance,account.currencyCode)),
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
                    "skin":"ICsknFlxffffff",
                    "isVisible": true
                }
            };
            return dataObject;
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
                    if (accountType != "Deposit" || accountType != "Loan" || accountType != "Mortgage") {
                        if (currencyCode == "NPR") {
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
        setMerchantFieldData: function(merchantData, totalSeq) {
			this.isRequiredData={};
            this.setSenderAccountData();
            this.view.flxBeneficiaryDetails.removeAll();
            this.view.flxErrorMsg.isVisible = false;
            if (merchantData.internalMerchants != undefined && merchantData.internalMerchants.length > 0 && merchantData.internalMerchants[0].merchantFields != undefined) {
                merchantData.externalMerchants = merchantData.internalMerchants;
                this.dataToPush.paymentAggregator = merchantData.internalMerchants[0].paymentAggregator;
            }
			this.splitMerchantFields(merchantData);
			this.showDisclimerOutageMessage(merchantData)
            this.view.lblTitle.text = this.titleData ? this.titleData : this.view.lblTitle.text;
            if (merchantData.externalMerchants[0].merchantFields.length != 0) {
                this.appId = merchantData.externalMerchants[0].appId;
                this.createRequestFormFields(merchantData);
            } else {
                this.showError("NoMerchantFields");
            }
        },
		showDisclimerOutageMessage(merchantData){
			 if ((merchantData.internalMerchants[0].disclimerMessage) || (merchantData.internalMerchants[0].disclimerMessage)) {
                this.view.flxErrorMsg.setVisibility(true);
                this.view.rtxError.text = merchantData.internalMerchants[0].disclimerMessage;
            }
            if ((merchantData.externalMerchants[0].outageMessage) || (merchantData.internalMerchants[0].outageMessage)) {
                this.view.flxErrorMsg.setVisibility(true);
                this.view.rtxError.text = merchantData.externalMerchants[0].outageMessage;
            }
		},
		splitMerchantFields: function(merchantData){
		this.merchantFieldData = merchantData.externalMerchants[0].merchantFields;
		if (merchantData.externalMerchants[0].merchantFields.length>0) {
		var responseFieldMapping=merchantData.externalMerchants[0].merchantFields[0].responseFieldMapping? merchantData.externalMerchants[0].merchantFields[0].responseFieldMapping:[];
			applicationManager.getNavigationManager().setCustomInfo("responseFieldMapping", responseFieldMapping);
		}
		var fieldName = [];
        for (i = 0; i < responseFieldMapping.length; i++) {
        fieldName.push(responseFieldMapping[i].fieldName);
        }
        applicationManager.getNavigationManager().setCustomInfo("ResponsefieldNames", fieldName);
		},
		createRequestFormFields: function(merchantData){
		var requestFields= merchantData.externalMerchants[0].merchantFields[0].requiredFields?merchantData.externalMerchants[0].merchantFields[0].requiredFields:[];
		var noofRows = requestFields.length;
		if(noofRows>0){
		 this.createBeneficiaryLabel();
		 this.setMerchantFields(noofRows, requestFields, 1);
		}
        if(merchantData.internalMerchants[0].merchantFields[0].responseFieldMapping.length<=0){
            this.view.btnEnquiry.text = kony.i18n.getLocalizedString("i18n.common.proceed");
        }
            else{
                this.view.btnEnquiry.text = kony.i18n.getLocalizedString("i18n.billpay.Inquiry");
            }
		if (merchantData.externalMerchants[0].totalProcessSeq == 2) {
        this.view.btnEnquiry.text = kony.i18n.getLocalizedString("i18n.common.next");
		} 
		 this.enableDisableEnquieryButton();
		 this.view.flxRightContent.setVisibility(false);
		 this.view.flxMerchatFields.setVisibility(true);
		 this.view.flxTransactionHistory.setVisibility(false);
		 this.view.flxResponseField.setVisibility(false);
		 this.view.flxSearch.setVisibility(false);
         this.view.flxNoPayment.setVisibility(false);
         this.view.flxTitle.setVisibility(true);
         this.view.imgMerchantLogo.src = this.MerchantlogoUrl;
		},
		createResponseFormFields: function(){

		},
		createBeneficiaryLabel:function(){
			var labelWidget = new kony.ui.Label({
                "id": "lblBeneficiaryDetails",
                "text": "Beneficiary Details",
                "height": "20dp",
                "isVisible": true,
                "width": "30%",
                "left": "10dp",
                "right": "",
                "top": "10dp",
                "contentAlignment": constants.CONTENT_ALIGN_TOP_LEFT,
                //"centerX": "50%",
                "skin": "sknlblFontCol000014PxSanBold",
                "zIndex": 1
            });
			this.view.flxBeneficiaryDetails.add(labelWidget);
		},
        setMerchantFields: function(noOfRows, merchantData, sequence) {
            var MrchanstFieldData;
            if (sequence == 1) {
                MrchanstFieldData = merchantData;
            } else {
                this.view.flxBeneficiaryDetails.removeAll();
                MrchanstFieldData = merchantData;
            }
            if (MrchanstFieldData.length != 0) {
                //var MrchanstFieldData = merchantData.externalMerchants[0].merchantFields[0].requiredFields;
                for (var i = 0; i < noOfRows; i++) {
                    // Create a new FlexContainer for each row
                    var flexRow = new kony.ui.FlexContainer({
                        "id": "flxRow" + MrchanstFieldData[i].fieldName + (i + 1),
                        "left": "0dp",
                        "top": "10dp",
                        "width": "100%",
                        //         "height": kony.flex.USE_PREFERRED_SIZE,
                        "height": MrchanstFieldData[i].fieldLabel == "Remarks" ? "100dp" : MrchanstFieldData[i].fieldLabel == "Address" ? "70dp" : "35dp",
                        "zIndex": 10,
                        "isVisible": true,
                        "skin": "sknflx",
                        "clipBounds": false,
                        "layoutType": kony.flex.FLOW_HORIZONTAL
                    });
                    // Add the FlexContainer to the form
                    this.view.flxBeneficiaryDetails.add(flexRow);
                    if (applicationManager.getNavigationManager().getCustomInfo("MerchantCode") == "TOP-UP-NEPAL-MOBILE"){
                        this.view.flxBeneficiaryDetails.height = (60 -50 + noOfRows * 50) + "dp";
                    }
                    else{
                    this.view.flxBeneficiaryDetails.height = (60 + noOfRows * 50) + "dp";
                    }
                    var Mheight=(60+noOfRows*50);
                    if(this.view.flxErrorMsg.isVisible){
                        this.view.flxMErchantFieldData.height=300+Mheight+"dp";
                        var NHeight=250+Mheight;
                    }
                    else{
                        this.view.flxMErchantFieldData.height=250+Mheight+"dp";
                        var NHeight=250+Mheight;
                    }
                    
                    this.view.flxMerchatFields.height=NHeight+150+"px";
                    var OHeight=NHeight+150;
                    this.view.flxRightPane.height=35+OHeight+"dp";
                    var Pheight=this.view.segCatogories.height;
                    var pheight=this.view.segCatogories.height.slice(0, -2);
                    var Qheight=this.view.flxRightPane.height;
                    var qHeight=this.view.flxRightPane.height.slice(0, -2);
                    if(parseInt(pheight)>parseInt(qHeight)){
                        this.view.flxContainer.height=50+parseInt(pheight)+"px";
                        this.view.flxLeftPane.height=50+parseInt(pheight)+"px";
                    }
                    else{
                        this.view.flxContainer.height=10+parseInt(qHeight)+"px";
                        this.view.flxLeftPane.height=10+parseInt(qHeight)+"px";
                    }
                    // Create 4 FlexContainers for each row (assuming exactly 4 flexes per row)
                    //for (var j = 0; j < 1; j++) {
                    //var index = i * 2 + j;
                    //if (index >= MrchanstFieldData.length) {
                    //    break; // Break if no more categories to display
                    //}
                    var category = MrchanstFieldData[i];
                    if (MrchanstFieldData[i].fieldType == "TEXTFIELD" || MrchanstFieldData[i].fieldType == "DATEFIELD") {
                        this.setTextFieldData(category, flexRow);
                    } else if (MrchanstFieldData[i].fieldType == "OPTIONFIELD") {
                        flexRow.zIndex = this.view.flxBeneficiaryDetails.widgets()[this.view.flxBeneficiaryDetails.widgets().length - 2].zIndex == 100 ? 98 : 100;
                        this.setOptionField(category, flexRow);
                    }
                     else if (MrchanstFieldData[i].fieldType == "Button") {
                        this.setButtonField(category, flexRow);
                    } else if (MrchanstFieldData[i].fieldType == "READONLYFIELD") {
                        category.appid = this.appId;
                        this.setReadOnlyField(category, flexRow);
                        flexRow.isVisible = false;
                    }else if (MrchanstFieldData[i].fieldType == "Label" || MrchanstFieldData[i].fieldType == "Heading"){
						this.setLabelField(category, flexRow);
					}else if(MrchanstFieldData[i].fieldType == "RadioButton"){
						this.setRadioButtonField(category, flexRow);
					}
                    //}
                }
            }
        },
		setRadioButtonField: function(fieldData, parentFlx) {
    // Field Label
		var scope = this;
            var required = "";
            if (fieldData.isRequired == "true") {
                var Name = fieldData.fieldName;
                this.isRequiredData[Name] = "";
                required = "*";
            } else {
                required = "";
            }
            var flexContainer2 = new kony.ui.FlexContainer({
                "id": "flxRowForTextboxAstreik" + fieldData.fieldName + fieldData.fieldcategory,
                "left": "10dp",
                "top": "10dp",
                "width": "30%",
                "height": fieldData.fieldLabel == "Remarks" ? "110dp" : "25dp",
                "zIndex": 100,
                "centerY": "50%",
                "isVisible": true,
                "skin": "sknflx",
                "clipBounds": false,
                "layoutType": kony.flex.FLOW_HORIZONTAL
            });
            var labelWidget2 = new kony.ui.Label({
                "id": "lblField" + fieldData.fieldName + fieldData.fieldcategory,
                "info": {
                    "fieldName": fieldData.fieldName,
                    "fieldCategory": fieldData.fieldcategory
                },
                "text": fieldData.fieldLabel + " :",
                "height": "20dp",
                "isVisible": true,
                "width": kony.flex.USE_PREFERED_SIZE,
                "left": "0dp",
                "right": "",
                "top": "5dp",
                "contentAlignment": constants.CONTENT_ALIGN_TOP_LEFT,
                //"centerX": "50%",
                "skin": "sknlblFontCol000000Sanproreg",
                "zIndex": 1
            });
            var labelWidget3 = new kony.ui.Label({
                "id": "lblTextFieldAstreik" + fieldData.fieldName + fieldData.fieldcategory,
                "text": required,
                "height": "20dp",
                "isVisible": true,
                "width": "5%",
                "left": "0dp",
                "right": "",
                "centerY": "50%",
                "contentAlignment": constants.CONTENT_ALIGN_TOP_LEFT,
                //"centerX": "50%",
                "skin": "sknSSP4176a415px",
                "zIndex": 1
            });
            flexContainer2.add(labelWidget2);
            flexContainer2.add(labelWidget3);

    // Yes option circle
    var lblYesCircle = new kony.ui.Label({
        "id": "lblYesCircle" + fieldData.fieldName + fieldData.fieldcategory,
        "text": "L", // unchecked by default
        "isVisible": true,
        "skin": "ICSknLblRadioBtnSelectedFontIcon003e7520px", // circle skin
        "width": "20dp",
        "height": "20dp",
        "centerY": "50%",
        "zIndex": 1
    });

    // Yes text
    var lblYesText = new kony.ui.Label({
        "id": "lblYesText" + fieldData.fieldName + fieldData.fieldcategory,
        "text": "Yes",
        "skin": "sknlblFontCol000000Sanproreg",
        "isVisible": true,
        "centerY": "50%",
        "left": "25dp"
    });

    // No option circle
    var lblNoCircle = new kony.ui.Label({
        "id": "lblNoCircle" + fieldData.fieldName + fieldData.fieldcategory,
        "text": "L", // unchecked
        "isVisible": true,
        "skin": "ICSknLblRadioBtnSelectedFontIcon003e7520px",
        "width": "20dp",
        "height": "20dp",
        "centerY": "50%",
        "zIndex": 1
    });

    // No text
    var lblNoText = new kony.ui.Label({
        "id": "lblNoText" + fieldData.fieldName + fieldData.fieldcategory,
        "text": "No",
        "skin": "sknlblFontCol000000Sanproreg",
        "isVisible": true,
        "centerY": "50%",
        "left": "25dp"
    });

    // Flex for Yes option
    var flxYes = new kony.ui.FlexContainer({
        "id": "flxYes" + fieldData.fieldName + fieldData.fieldcategory,
        "isVisible": true,
        "layoutType": kony.flex.FREE_FORM,
        "width": "70dp",
        "height": "30dp",
        "centerY": "50%",
		"onClick": function() {
            lblNoCircle.text = "L"; // unchecked
            lblYesCircle.text = "M"; // checked
			scope.isRequiredData[fieldData.fieldName] = "Yes";
			scope.enableDisableEnquieryButton();
		}
    }, {}, {});
    flxYes.add(lblYesCircle, lblYesText);

    // Flex for No option
    var flxNo = new kony.ui.FlexContainer({
        "id": "flxNo" + fieldData.fieldName + fieldData.fieldcategory,
        "isVisible": true,
        "layoutType": kony.flex.FREE_FORM,
        "width": "70dp",
        "height": "30dp",
        "centerY": "50%",
        "left": "80dp",
		"onClick": function() {
            lblNoCircle.text = "M"; // checked
            lblYesCircle.text = "L"; // unchecked
			scope.isRequiredData[fieldData.fieldName] = "No";
			scope.enableDisableEnquieryButton();
		}
    }, {}, {});
    flxNo.add(lblNoCircle, lblNoText);

    // Add everything to parent
    parentFlx.add(flexContainer2);
    parentFlx.add(flxYes);
    parentFlx.add(flxNo);
},
	setLabelField: function(fieldData, parentFlx) {
			var scope = this;
            var required = "";
            if (fieldData.isRequired == "true") {
                var Name = fieldData.fieldName;
                this.isRequiredData[Name] = fieldData.inputFormat;
                required = "*";
            } else {
                required = "";
            }
			if(fieldData.fieldType == "Label"){
            var labelWidget = new kony.ui.Label({
                "id": "lblField" + fieldData.fieldName + fieldData.fieldcategory,
                "text": fieldData.inputFormat,
                "height": "20dp",
                "isVisible": true,
                "width": "95%",
                "left": "10dp",
                "right": "",
                "centerY": "50%",
                "contentAlignment": constants.CONTENT_ALIGN_TOP_LEFT,
                //"centerX": "50%",
                "skin": "sknlblFontCol000000Sanproreg",
                "zIndex": 1
            });
			}
			else{
				var labelWidget = new kony.ui.Label({
                "id": "lblField" + fieldData.fieldName + fieldData.fieldcategory,
                "text": fieldData.inputFormat,
                "height": "20dp",
                "isVisible": true,
                "width": "95%",
                "left": "10dp",
                "right": "",
                "centerY": "50%",
                "contentAlignment": constants.CONTENT_ALIGN_TOP_LEFT,
                //"centerX": "50%",
                "skin": "sknlblFontCol000014PxSanBold",
                "zIndex": 1
            });
			}
            
            parentFlx.add(labelWidget);
        },
        setReadOnlyField: function(fieldData, parentFlx) {
            var labelWidget = new kony.ui.Label({
                "id": "lblField" + fieldData.fieldName + fieldData.fieldcategory,
                "text": fieldData.fieldLabel + " :",
                "height": "20dp",
                "isVisible": true,
                "width": "30%",
                "left": "10dp",
                "right": "",
                "centerY": "50%",
                "contentAlignment": constants.CONTENT_ALIGN_TOP_LEFT,
                //"centerX": "50%",
                "skin": "sknlblFontCol000000Sanproreg",
                "zIndex": 1
            });
            var labelWidget2 = new kony.ui.Label({
                "id": "lbl" + fieldData.fieldName + fieldData.fieldcategory,
                "text": fieldData.appid,
                "height": "20dp",
                "isVisible": true,
                "width": "50%",
                "left": "10dp",
                "right": "",
                "centerY": "50%",
                "contentAlignment": constants.CONTENT_ALIGN_TOP_LEFT,
                //"centerX": "50%",
                "skin": "sknlblFontCol000000Sanproreg",
                "zIndex": 1
            });
            parentFlx.add(labelWidget);
            parentFlx.add(labelWidget2);
        },
        setOptionField: function(fieldData, parentFlx) {
            var scope = this;
            var required = "";
            if (fieldData.isRequired == "true") {
                var Name = fieldData.fieldName;
                this.isRequiredData[Name] = "";
                required = "*";
            } else {
                required = "";
            }
            var flexContainer2 = new kony.ui.FlexContainer({
                "id": "flxRowForAstreik" + fieldData.fieldName + fieldData.fieldcategory,
                "left": "10dp",
                "top": "10dp",
                "width": "30%",
                "height": fieldData.fieldLabel == "Remarks" ? "110dp" : "25dp",
                "zIndex": 100,
                "centerY": "50%",
                "isVisible": true,
                "skin": "sknflx",
                "clipBounds": false,
                "layoutType": kony.flex.FLOW_HORIZONTAL
            });
            var labelWidget2 = new kony.ui.Label({
                "id": "lblField" + fieldData.fieldName + fieldData.fieldcategory,
                "info": {
                    "fieldName": fieldData.fieldName,
                    "fieldCategory": fieldData.fieldcategory,
                    "fieldLabel": fieldData.fieldLabel
                },
                "text": fieldData.fieldLabel + " :",
                "height": "20dp",
                "isVisible": true,
                "width": kony.flex.USE_PREFERED_SIZE,
                "left": "0dp",
                "right": "",
                "centerY": "50%",
                "contentAlignment": constants.CONTENT_ALIGN_TOP_LEFT,
                //"centerX": "50%",
                "skin": "sknlblFontCol000000Sanproreg",
                "zIndex": 1
            });
            var labelWidget3 = new kony.ui.Label({
                "id": "lblFieldAstreik" + fieldData.fieldName + fieldData.fieldcategory,
                "text": required,
                "height": "20dp",
                "isVisible": true,
                "width": "5%",
                "left": "0dp",
                "right": "",
                "centerY": "50%",
                "contentAlignment": constants.CONTENT_ALIGN_TOP_LEFT,
                //"centerX": "50%",
                "skin": "sknSSP4176a415px",
                "zIndex": 1
            });
            flexContainer2.add(labelWidget2);
            flexContainer2.add(labelWidget3);
            var flexContainer = new kony.ui.FlexContainer({
                "id": "flxRow" + fieldData.fieldName + fieldData.fieldcategory,
                "info": {
                    "fieldName": fieldData.fieldName,
                    "fieldCategory": fieldData.fieldcategory
                },
                "left": "0dp",
                "top": "10dp",
                "width": "50%",
                //         "height": kony.flex.USE_PREFERRED_SIZE,
                "height": fieldData.fieldLabel == "Remarks" ? "110dp" : "25dp",
                "zIndex": 100,
                "centerY": "50%",
                "isVisible": true,
                "skin": "sknFlxb67677Bor1Rad7",
                "clipBounds": false,
                "onTouchEnd": this.dropdownOnclick.bind(this, fieldData)
            });
            var OptionFieldLabel = new kony.ui.Label({
                "id": "lblOptionFieldLabel" + fieldData.fieldName + fieldData.fieldcategory,
                "info": {
                    "fieldName": fieldData.fieldName,
                    "fieldCategory": fieldData.fieldcategory
                },
                "text": this.searchDropdownValue(fieldData, fieldData.fieldName, fieldData.fieldLabel),
                "height": kony.flex.USE_PREFERRED_SIZE,
                "isVisible": true,
                "width": "80%",
                "left": "10dp",
                "right": "",
                "centerY": "50%",
                "contentAlignment": constants.CONTENT_ALIGN_TOP_LEFT,
                //"centerX": "50%",
                "skin": "sknlblfontCola1a1a1Siz12px",
                "zIndex": 1
            });
            var imageIdTest = new kony.ui.Image2({
                "id": "img" + fieldData.fieldName + fieldData.fieldcategory,
                "info": {
                    "fieldName": fieldData.fieldName,
                    "fieldCategory": fieldData.fieldcategory
                },
                "src": "dropdownhbl.png",
                "isVisible": true,
                "top": "30dp",
                "height": "15dp",
                "width": "15dp",
                "right": "10dp",
                "centerY": "50%"
            });
            var segment = new kony.ui.SegmentedUI2({
                "id": "seg" + fieldData.fieldName + fieldData.fieldcategory,
                "info": {
                    "fieldName": fieldData.fieldName,
                    "fieldCategory": fieldData.fieldcategory
                },
                "skin":"segBorderE3E3E3",
                "isVisible": false,
                "top": "105%",
                "left": "0dp",
                "height": "200dp",
                "width": "100%",
                "zIndex": 100,
                "widgetDataMap": {
                    "lblValue": "lblValue",
                    "lblKey": "lblKey"
                },
                "rowTemplate": "flxDynamicFields"
            });
            var fieldValues = [];
            if (fieldData.fieldvalue != undefined && fieldData.fieldvalue != null && fieldData.fieldvalue != "") {
                fieldValues = JSON.parse(fieldData.fieldvalue);
            }
            var segData = [];
            for (i = 0; i < fieldValues.length; i++) {
                segData.push({
                    "lblValue": {
                        text: fieldValues[i].value,
                        "info": {
                            "key": fieldValues[i].key,
                            "value": fieldValues[i].value
                        },
                        "onTouchEnd": function(eventobj) {
                            scope.dropdownOnSelection(eventobj, labelWidget2.info);
                        }
                    }
                })
            }
            segment.setData(segData);
            parentFlx.add(flexContainer2);
            parentFlx.add(flexContainer);
            flexContainer.add(OptionFieldLabel);
            flexContainer.add(imageIdTest);
            flexContainer.add(segment);
        },
        dropdownOnSelection: function(eventObj, labelWidget) {
            var scope = this;
            this.view.flxBeneficiaryDetails.height = kony.flex.USE_PREFERED_SIZE;
            var lbl = "lblOptionFieldLabel" + labelWidget.fieldName + labelWidget.fieldCategory;
            this.view["lblOptionFieldLabel" + labelWidget.fieldName + labelWidget.fieldCategory].text = eventObj.info.value;
            this.view["lblOptionFieldLabel" + labelWidget.fieldName + labelWidget.fieldCategory].info = eventObj.info;
            scope.dataToPush[labelWidget.fieldName] = eventObj.info.key;
            scope.dataToShowInConfirmationScreen[labelWidget.fieldLabel] = eventObj.info.value;
            if (labelWidget.fieldName == "counterCode") {
                applicationManager.getNavigationManager().setCustomInfo("counterValue", eventObj.info.value);
            }
            this.isRequiredData[labelWidget.fieldName] = eventObj.info.key;
            this.enableDisableEnquieryButton();
        },
        setButtonField:function(fieldData,parentFlx){
            var required = "";
            if (fieldData.isRequired == "true") {
                var Name = fieldData.fieldName;
                this.isRequiredData[Name] = fieldData.fieldName;
                required = "*";
            } else {
                required = "";
            }
            var buttonWidget2 = new kony.ui.Button({
                "id": "lblField" + fieldData.fieldName + fieldData.fieldcategory,
                "info": {
                    "fieldName": fieldData.fieldName,
                    "fieldCategory": fieldData.fieldcategory
                },
                "text": fieldData.fieldName,
                "height": "28dp",
                "isVisible": true,
                "width": kony.flex.USE_PREFERED_SIZE,
                "left": "31%",
                "right": "",
                "top": "5dp",
                "contentAlignment": constants.CONTENT_ALIGN_TOP_CENTER,
                //"centerX": "50%",
                "skin": "sknBtn851a1cnoBorder",
                "zIndex": 1
            });
            parentFlx.add(buttonWidget2);
            if(buttonWidget2.id=="lblFieldnetworkTypeRequest"){
                this.view.flxRownetworkType2.setVisibility(false);
            }
        },
        setTextFieldData: function(fieldData, parentFlx) {
            var scope=this;
            var required = "";
            if (fieldData.isRequired == "true") {
                var Name = fieldData.fieldName;
                this.isRequiredData[Name] = "";
                required = "*";
            } else {
                required = "";
            }
            var flexContainer2 = new kony.ui.FlexContainer({
                "id": "flxRowForTextboxAstreik" + fieldData.fieldName + fieldData.fieldcategory,
                "left": "10dp",
                "top": "10dp",
                "width": "30%",
                "height": fieldData.fieldLabel == "Remarks" ? "110dp" : "25dp",
                "zIndex": 100,
                "centerY": "50%",
                "isVisible": true,
                "skin": "sknflx",
                "clipBounds": false,
                "layoutType": kony.flex.FLOW_HORIZONTAL
            });
            var labelWidget2 = new kony.ui.Label({
                "id": "lblField" + fieldData.fieldName + fieldData.fieldcategory,
                "info": {
                    "fieldName": fieldData.fieldName,
                    "fieldCategory": fieldData.fieldcategory
                },
                "text": fieldData.fieldLabel + " :",
                "height": "20dp",
                "isVisible": true,
                "width": kony.flex.USE_PREFERED_SIZE,
                "left": "0dp",
                "right": "",
                "top": "5dp",
                "contentAlignment": constants.CONTENT_ALIGN_TOP_LEFT,
                //"centerX": "50%",
                "skin": "sknlblFontCol000000Sanproreg",
                "zIndex": 1
            });
            var labelWidget3 = new kony.ui.Label({
                "id": "lblTextFieldAstreik" + fieldData.fieldName + fieldData.fieldcategory,
                "text": required,
                "height": "20dp",
                "isVisible": true,
                "width": "5%",
                "left": "0dp",
                "right": "",
                "centerY": "50%",
                "contentAlignment": constants.CONTENT_ALIGN_TOP_LEFT,
                //"centerX": "50%",
                "skin": "sknSSP4176a415px",
                "zIndex": 1
            });
            flexContainer2.add(labelWidget2);
            flexContainer2.add(labelWidget3);
            var myTextBox;
            if (fieldData.fieldLabel == "Remarks" || fieldData.fieldLabel == "Address") {
                myTextBox = new kony.ui.TextArea2({
                    "id": "txtField" + fieldData.fieldName + fieldData.fieldcategory,
                    "info": {
                        "fieldName": fieldData.fieldName,
                        "fieldCategory": fieldData.fieldcategory,
                        "fieldLabel": fieldData.fieldLabel
                    },
                    "placeholder": fieldData.fieldLabel,
                    "maxTextLength": parseInt(fieldData.dataType[0].length ? fieldData.dataType[0].length : 20),
                    "isVisible": true,
                    "left": "",
                    "width": "50%",
                    "placeholderSkin": "sknPlaceHolTxtArea1a1a1Font12px",
                    "onTextChange": this.getFieldData.bind(this),
                    //"onDone":this.getFieldData.bind(this),
                    "onEndEditing": this.getFieldData.bind(this),
                    "skin": "skntxtareBorB67677font12Px00000",
                    "autoCapitalize": constants.TEXTBOX_AUTO_CAPITALIZE_SENTENCES,
                    "height": fieldData.fieldLabel == "Remarks" ? "75dp" : "50dp",
                    "widgetAlignment": constants.WIDGET_ALIGN_TOP_LEFT,
                    "contentAlignment": constants.CONTENT_ALIGN_TOP_LEFT,
                    "padding": [1, 0, 0, 0]
                });
            } else {
                myTextBox = new kony.ui.TextBox2({
                    "id": "txtField" + fieldData.fieldName + fieldData.fieldcategory,
                    "info": {
                        "fieldName": fieldData.fieldName,
                        "fieldCategory": fieldData.fieldcategory,
                        "fieldLabel": fieldData.fieldLabel
                    },
                    "placeholder": fieldData.inputFormat ? fieldData.inputFormat : fieldData.fieldLabel,
                    "maxTextLength": parseInt(fieldData.dataType[0].length ? fieldData.dataType[0].length : 20),
                    "isVisible": true,
                    "left": "",
                    "width": "50%",
                    "placeholderSkin": "sknTxtBor0FontSize12PxColA1A1A1",
                    "onTextChange": scope.getFieldData.bind(scope),
                    //"onDone":this.getFieldData.bind(this),
                    "onEndEditing": scope.getFieldData.bind(scope),
                    "skin": "skntbxFontColA1A1A1Bor1B67677",
                    "autoCapitalize": constants.TEXTBOX_AUTO_CAPITALIZE_SENTENCES,
                    "height": fieldData.fieldLabel == "Address" ? "50dp" : "25dp",
                    "widgetAlignment": constants.WIDGET_ALIGN_TOP_LEFT,
                    "contentAlignment": constants.CONTENT_ALIGN_TOP_LEFT,
                    "padding": [1, 0, 0, 0],
                    "text": this.populateResponseFieldsData(fieldData, fieldData.fieldName, fieldData.fieldLabel)
                });
            }
            parentFlx.add(flexContainer2);
            parentFlx.add(myTextBox);
        },
        showError: function(res) {
            if (res == "NoCategory") {
                this.view.flxNoPayment.setVisibility(true);
                this.view.flxRightContent.setVisibility(false);
                this.view.flxMerchatFields.setVisibility(false);
                this.view.flxSearch.setVisibility(false);
                this.view.flxTitle.setVisibility(false);
                this.view.flxTransactionHistory.setVisibility(false);
                this.view.flxResponseField.setVisibility(false);
                this.view.flxLeftPane.setVisibility(true);
                this.view.flxRightPane.setVisibility(true);
                this.view.flxError.setVisibility(false);
                this.view.rtxNoPaymentMessage.text = kony.i18n.getLocalizedString("i18n.olb.billpay.NoMerchatFound");
            } else if (res == "NoTransactionHistory") {
                this.view.flxNoPayment.setVisibility(true);
                this.view.flxRightContent.setVisibility(false);
                this.view.flxMerchatFields.setVisibility(false);
                this.view.flxSearch.setVisibility(false);
                this.view.flxTitle.setVisibility(false);
                this.view.flxTransactionHistory.setVisibility(false);
                this.view.flxResponseField.setVisibility(false);
                this.view.flxLeftPane.setVisibility(true);
                this.view.flxRightPane.setVisibility(true);
                this.view.flxError.setVisibility(false);
                this.view.rtxNoPaymentMessage.text = kony.i18n.getLocalizedString("i18n.billpay.noTransactionHistory");
            } else if (res == "NoMerchantFields") {
                this.view.flxNoPayment.setVisibility(true);
                this.view.flxRightContent.setVisibility(false);
                this.view.flxMerchatFields.setVisibility(false);
                this.view.flxSearch.setVisibility(false);
                this.view.flxTitle.setVisibility(false);
                this.view.flxTransactionHistory.setVisibility(false);
                this.view.flxResponseField.setVisibility(false);
                this.view.flxLeftPane.setVisibility(true);
                this.view.flxRightPane.setVisibility(true);
                this.view.flxError.setVisibility(false);
                this.view.rtxNoPaymentMessage.text = kony.i18n.getLocalizedString("i18n.olb.billpay.noMerchatField");
            } else if (res == "NoCategoryALL") {
                this.view.flxLeftPane.setVisibility(false);
                this.view.flxRightPane.setVisibility(false);
                this.view.flxError.setVisibility(true);
            }
        },
        checkForConnectionType: function(data) {
            var ConnectionType="";
            var Action="";
            applicationManager.getNavigationManager().setCustomInfo("NumberLength",data.length);
            if(data.length>=3){
            if (data.startsWith("974") || data.startsWith("975") || data.startsWith("976") || data.startsWith("984") || data.startsWith("986")) {
                ConnectionType = "NTC Prepaid";
                Action="BT";
            } else if (data.startsWith("985")) {
                ConnectionType = "NTC Postpaid";
                Action="NTCPOS";
            } else if (data.startsWith("970") ||data.startsWith("971")|| data.startsWith("980") || data.startsWith("981") || data.startsWith("982")) {
                ConnectionType = "NCell";
                Action="BNCELL";
            } else {
                ConnectionType = "Please Enter Valid Mobile Number";
            }
            applicationManager.getNavigationManager().setCustomInfo("ActionTypeValue",Action);
            applicationManager.getNavigationManager().setCustomInfo("connectionType",ConnectionType);
        }
        else{
            ConnectionType="";
        }
        return ConnectionType;
        },
         mobileNumberValidations: function(data) {
            var numberRegex = /^\d+$/;
            if ((!numberRegex.test(data) || data.length > 10)) {
                str = data;
                this.view.txtFieldmobilenoRequest.text = str.slice(0, -1);
                applicationManager.getNavigationManager().setCustomInfo("NumberLength", this.view.txtFieldmobilenoRequest.text.length);
            }
        },
        setTopUpNepalData:function(fieldLabel,data){
        var connectionType=this.checkForConnectionType(data);
        this.mobileNumberValidations(data);
            if(connectionType==""){
                this.view.flxRownetworkType2.setVisibility(false);
                this.view.flxBeneficiaryDetails.height = "160dp";
                     //this.view.lblFieldnetworkTypeRequest.setVisibility(false);
            }
            else{
                this.view.flxRownetworkType2.setVisibility(true);
                this.view.flxBeneficiaryDetails.height = "210dp";
                //this.view.lblFieldnetworkTypeRequest.setVisibility(true);
                this.view.lblFieldnetworkTypeRequest.text=connectionType;
                applicationManager.getNavigationManager().setCustomInfo("connectionType",connectionType);
                this.dataToShowInConfirmationScreen["Connection"] = connectionType;
                this.view.lblFieldnetworkTypeRequest.cursorType="default";
            }
            //if (applicationManager.getNavigationManager().getCustomInfo("PaymentAggregatorType") == "TOP-UP-NEPAL") {
              //  this.dataToShowInConfirmationScreen[fieldLabel] = data;
            //}
        },
        validateAmountField:function(data){
            var numberRegex = /^\d+$/;
            if ((!numberRegex.test(data))) {
                str = data;
                this.view.txtFieldamountRequest.text = str.slice(0, -1);
                applicationManager.getNavigationManager().setCustomInfo("amountLength", this.view.txtFieldamountRequest.text.length);
            }
            else{
                applicationManager.getNavigationManager().setCustomInfo("amountLength", this.view.txtFieldamountRequest.text.length);
            }
        },
        checkforTopUpNepalMerchant:function(scope,fieldName,fieldLabel,data){
            if (applicationManager.getNavigationManager().getCustomInfo("MerchantCode") == "TOP-UP-NEPAL-MOBILE" && fieldName == "mobileno" || fieldName == "mobileNo" || fieldName == "mobileNumber") {
                scope.setTopUpNepalData(fieldLabel, data);
            }
            if (applicationManager.getNavigationManager().getCustomInfo("PaymentAggregatorType") == "TOP-UP-NEPAL") {
                if(fieldLabel=="Amount (NPR)"){
                    fieldLabel="Amount";
                    this.validateAmountField(data);
                }
                scope.dataToShowInConfirmationScreen[fieldLabel] = data;
            }
        },
         getFieldData: function(eventObject) {
            //var fieldName = eventObject.id.slice(8);
            //var dataToPush=[];
            var scope=this;
            var fieldName = eventObject.info.fieldName;
            var fieldLabel = eventObject.info.fieldLabel;
            var data = eventObject.text;
            scope.checkforTopUpNepalMerchant(scope,fieldName,fieldLabel,data);
            //if (data) {
            scope.dataToPush[fieldName] = data;
            scope.dataToPush[fieldName] = data;
            scope.isRequiredData[fieldName] = data;
            //}
            //if (!this.dataToPush.appId) {
            //  this.dataToPush.appId = this.appId;
            //}
            //if (!eventObject.parent.parent.widgets()[2].isVisible) {
            //  this.dataToPush.appId = eventObject.parent.parent.widgets()[2].widgets()[1].text;
            //}
            var count = 0;
            for (i = 0; i < Object.values(scope.isRequiredData).length; i++) {
                if (Object.values(scope.isRequiredData)[i] == "") {
                    var count = count + 1;
                }
            }
            if (count == 0) {
                if (scope.view.flxRownetworkType2) {
                  if (scope.view.flxRownetworkType2.isVisible &&this.view.lblFieldnetworkTypeRequest.text!="Please Enter Valid Mobile Number"&& applicationManager.getNavigationManager().getCustomInfo("NumberLength")==10 &&applicationManager.getNavigationManager().getCustomInfo("amountLength")>0) {
                        scope.view.btnEnquiry.setEnabled(true);
                        scope.view.btnEnquiry.skin = "sknBtnNormalSSPFFFFFF15pxradius6";
                    } else {
                        scope.view.btnEnquiry.setEnabled(false);
                        scope.view.btnEnquiry.skin = "ICSknbtnDisablede2e9f036px";
                    }
                } else {
                    scope.view.btnEnquiry.setEnabled(true);
                    scope.view.btnEnquiry.skin = "sknBtnNormalSSPFFFFFF15pxradius6";
                }
            }
            if (count != 0) {
                scope.view.btnEnquiry.setEnabled(false);
                scope.view.btnEnquiry.skin = "ICSknbtnDisablede2e9f036px";
            }
        },
        MandatoryFieldsExist:function(count){
            for (i = 0; i < Object.values(this.isRequiredData).length; i++) {
                    if (Object.values(this.isRequiredData)[i] == "") {
                        var count = count + 1;
                    }
                }
                if (count == 0) {
                    this.view.btnEnquiry.setEnabled(true);
                    this.view.btnEnquiry.skin = "sknBtnNormalSSPFFFFFF15pxradius6";
                }
                if (count != 0) {
                    this.view.btnEnquiry.setEnabled(false);
                    this.view.btnEnquiry.skin = "ICSknbtnDisablede2e9f036px";
                }
        },
        checkForTopUpNepalFlex:function(){
            if(this.view.flxRownetworkType2){
                if(this.view.flxRownetworkType2.isVisible &&this.view.lblFieldnetworkTypeRequest.text!="Please Enter Valid Mobile Number"&& applicationManager.getNavigationManager().getCustomInfo("NumberLength")){
                var count = 0;
            if (Object.values(this.isRequiredData).length > 0) {
                this.MandatoryFieldsExist(count);
            } else {
                this.view.btnEnquiry.setEnabled(false);
                this.view.btnEnquiry.skin = "ICSknbtnDisablede2e9f036px";
            }
            return true;
                }
                else{
                    this.view.btnEnquiry.setEnabled(false);
                this.view.btnEnquiry.skin = "ICSknbtnDisablede2e9f036px";
                 return false;
                }
            }
            return false;
        },
        enableDisableEnquieryButton: function() {
            var isChecked=this.checkForTopUpNepalFlex();
            if(isChecked==false){
            var count = 0;
            if (Object.values(this.isRequiredData).length > 0) {
                for (i = 0; i < Object.values(this.isRequiredData).length; i++) {
                    if (Object.values(this.isRequiredData)[i] == "") {
                        var count = count + 1;
                    }
                }
                if (count == 0) {
                    this.view.btnEnquiry.setEnabled(true);
                    this.view.btnEnquiry.skin = "sknBtnNormalSSPFFFFFF15pxradius6";
                }
                if (count != 0) {
                    this.view.btnEnquiry.setEnabled(false);
                    this.view.btnEnquiry.skin = "ICSknbtnDisablede2e9f036px";
                }
            } else {
                this.view.btnEnquiry.setEnabled(false);
                this.view.btnEnquiry.skin = "ICSknbtnDisablede2e9f036px";
            }
        }
        },
        dropdownOnclick: function(fieldData) {
            //this.view.flxBeneficiaryDetails.height=Number(this.view.flxBeneficiaryDetails.height.substring(0, this.view.flxBeneficiaryDetails.height.length - 2))+200+"px"
            var Currsegment = this.view["seg" + fieldData.fieldName + fieldData.fieldcategory];
            var currImg = this.view["img" + fieldData.fieldName + fieldData.fieldcategory];
            if (Currsegment.isVisible) {
                Currsegment.isVisible = false;
                currImg.src = "dropdownhbl.png";
            } else {
                Currsegment.isVisible = true;
                currImg.src = "dropuphbl.png";
            }
            this.view.forceLayout();
        },
        sortTransactionHistory: function(widgetData) {
            var sortBy = widgetData.id;
            var toSort = this.dataArray;;
            var segmentData;
            switch (sortBy) {
                case "imgSortDate":
                    if (widgetData.src == "sortunchecked.png") {
                        widgetData.src = "sortchecked.png";
                        this.view.imgSortDescription.src = "sortunchecked.png";
                        this.view.imgSortAmount.src = "sortunchecked.png";
                        this.view.imgSortCategory.src = "sortunchecked.png";
                        segmentData = toSort.sort((a, b) => (new Date(a.transactionts) - new Date(b.transactionts)));
                        this.displayData(segmentData);
                    } else {
                        widgetData.src = "sortunchecked.png";
                        segmentData = toSort.sort((a, b) => (a.transactionId > b.transactionId ? 1 : -1));
                        this.displayData(segmentData);
                    }
                    break;
                case "imgSortDescription":
                    if (widgetData.src == "sortunchecked.png") {
                        widgetData.src = "sortchecked.png";
                        this.view.imgSortAmount.src = "sortunchecked.png";
                        this.view.imgSortCategory.src = "sortunchecked.png";
                        this.view.imgSortDate.src = "sortunchecked.png";
                        segmentData = toSort.sort((a, b) => (a.toAccountNumber > b.toAccountNumber ? 1 : -1));
                        this.displayData(segmentData);
                    } else {
                        widgetData.src = "sortunchecked.png";
                        segmentData = toSort.sort((a, b) => (a.transactionId > b.transactionId ? 1 : -1));
                        this.displayData(segmentData);
                    }
                    break;
                case "imgSortAmount":
                    if (widgetData.src == "sortunchecked.png") {
                        widgetData.src = "sortchecked.png";
                        this.view.imgSortCategory.src = "sortunchecked.png";
                        this.view.imgSortDate.src = "sortunchecked.png";
                        this.view.imgSortDescription.src = "sortunchecked.png";
                        segmentData = toSort.sort((a, b) => (Number(a.amount) > Number(b.amount) ? 1 : -1));
                        this.displayData(segmentData);
                    } else {
                        widgetData.src = "sortunchecked.png";
                        //segmentData = toSort.sort((a, b) => (a.transactionId > b.transactionId ? 1 : -1));
                        segmentData = toSort.sort((a, b) => (Number(a.amount) < Number(b.amount) ? 1 : -1));
                        this.displayData(segmentData);
                    }
                    break;
                case "imgSortCategory":
                    if (widgetData.src == "sortunchecked.png") {
                        widgetData.src = "sortchecked.png";
                        this.view.imgSortDate.src = "sortunchecked.png";
                        this.view.imgSortDescription.src = "sortunchecked.png";
                        this.view.imgSortAmount.src = "sortunchecked.png";
                        segmentData = toSort.sort((a, b) => (a.status > b.status ? 1 : -1));
                        this.displayData(segmentData);
                    } else {
                        widgetData.src = "sortunchecked.png";
                        segmentData = toSort.sort((a, b) => (a.transactionId > b.transactionId ? 1 : -1));
                        this.displayData(segmentData);
                    }
                    break;
            }
        },
        InsufficientBalanceErrorScreen: function() {
            var errorMsg = "Insufficient Balance to complete the Transaction";
            this.view.flxDowntimeWarning.isVisible = true;
            this.view.rtxDowntimeWarning.text = errorMsg;
        },
        maxTransactionLimitExceedError: function() {
            var errorMsg = "The amount you've entered exceeds the transaction limit allowed for this merchant. Please enter a lower amount and try again.";
            this.view.flxDowntimeWarning.isVisible = true;
            this.view.rtxDowntimeWarning.text = errorMsg;
        },
        showPinNotSetError: function() {
            var errorMsg = kony.i18n.getLocalizedString("i18n.TPSetup");
            this.view.flxDowntimeWarning.isVisible = true;
            this.view.rtxDowntimeWarning.text = errorMsg;
            FormControllerUtility.hideProgressBar(this.view);
        },
        ErrorScreen: function(response) {
            var errorMsg = '';
            if (response.errorObj) {
                for (i = 0; i < response.errorObj.length; i++) {
                    errorMsg = errorMsg + response.errorObj[i].dbpErrMsg + "\n";
                }
                //this.view.rtxError.isVisible = true;
                this.view.flxDowntimeWarning.isVisible = true;
                this.view.rtxDowntimeWarning.text = errorMsg;
                //this.view.flxMErchantFieldData.scrollToWidget(this.view.rtxDowntimeWarning);
            }
            if (response.errorMessage) {
                errorMsg = response.errorMessage;
                this.view.flxDowntimeWarning.isVisible = true;
                this.view.rtxDowntimeWarning.text = errorMsg;
            }
        },
        ErrorScreenNEA: function(response) {
            if (response.success = "false") {
                var errorMsg = response.dbpErrMsg;
                this.view.flxDowntimeWarning.isVisible = true;
                this.view.rtxDowntimeWarning.text = errorMsg;
            }
            if (response.errorObj) {
                for (i = 0; i < response.errorObj.length; i++) {
                    var errorMsg = errorMsg + response.errorObj[i].dbpErrMsg + "\n";
                }
                //this.view.rtxError.isVisible = true;
                this.view.flxDowntimeWarning.isVisible = true;
                this.view.rtxDowntimeWarning.text = errorMsg;
                this.view.flxMErchantFieldData.scrollToWidget(this.view.rtxDowntimeWarning);
            }
        },
        CustomerBillInfoSuccess: function(response) {
            var errorMsg = '';
            var navManager = applicationManager.getNavigationManager();
            navManager.setCustomInfo("merchantflowtype", "manual");
            var navMan = applicationManager.getNavigationManager();
            this.view.flxResponsePreConfirmation.removeAll();
            if (response.errorObj) {
                for (i = 0; i < response.errorObj.length; i++) {
                    errorMsg = errorMsg + response.errorObj[i].dbpErrMsg + "\n";
                }
               this.showErrorMsg(errorMsg);
            }
            if (response.paymentAggregator == "NEA" && response.billInfo != undefined && response.billInfo != "") {
                if (response.billInfo[0].transactionDetails[0] != undefined && response.billInfo[0].transactionDetails[0] != "") {
                    if ((response.billInfo[0].transactionDetails[0].code != undefined && response.billInfo[0].transactionDetails[0].code != "0")) {
                        var errorMsg = response.billInfo[0].transactionDetails[0].message
                           this.showErrorMsg(errorMsg);
                    }
                }
            }
            if (response.paymentAggregator == "NEA" && response.billInfo[0] != undefined && response.billInfo[0] != "") {
                if (response.billInfo[0].transactionDetails[0] != undefined && response.billInfo[0].transactionDetails[0] != "") {
                    if ((response.billInfo[0].transactionDetails[0].code != undefined && response.billInfo[0].transactionDetails[0].code == "0")) {
                        this.showPreConfirmationScreen(response);
                    }
                }
            }
            if (response.paymentAggregator == "KUKL") {
                this.showPreConfirmationScreen(response);
            }
        },
		showErrorMsg: function(errorMsg, maxColumnCount){
			this.view.flxDowntimeWarning.isVisible = true;
			this.view.rtxDowntimeWarning.text = errorMsg;
			this.view.flxMErchantFieldData.scrollToWidget(this.view.rtxDowntimeWarning);
		},
		
		createResponseBillInfoDetails:function(response){
			this.view.flxDowntimeWarning.isVisible = false;
            this.view.rtxDowntimeWarning.text = "";
            this.view.flxRightContent.setVisibility(false);
            this.view.flxResponseField.setVisibility(true);
            this.view.flxCustomerDetails.setVisibility(false);
            this.view.flxTransactionHistory.setVisibility(false);
            this.view.flxNoPayment.setVisibility(false);
            this.view.flxMerchatFields.setVisibility(false);
            this.view.flxBillDetails.setVisibility(false);
			this.createDynamicBillInfo(response);
		},
	
		mapResponseFiledsData: function(response, maxColumnCount){
			var segData = [];
			  var fieldArray = [];
			  var navMan = applicationManager.getNavigationManager();
            navMan.setCustomInfo("LodgebillpayRes", response);
            navMan.setCustomInfo("getCustomerBillInfoResponse", response);
			 var Responsefields=applicationManager.getNavigationManager().getCustomInfo("ResponsefieldNames");
			 var ResponseFieldMappingData = applicationManager.getNavigationManager().getCustomInfo("responseFieldMapping");
			 response=response.billInfo[0].transactionDetails;
			 responseSize=response.length;
			  for (i = 0; i < 1; i++) {
				  for (j = 0; j < Responsefields.length; j++) {
					for (k = 0; k < Object.keys(response[i]).length; k++) {
                        if (Responsefields[j] == Object.keys(response[i])[k]) {
								 var field={
									 key:Object.keys(response[i])[k],
									 name:ResponseFieldMappingData[j].fieldLabel,
									 value:Object.values(response[i])[k] ? Object.values(response[i])[k] : "NA"
								 };
								 fieldArray.push(field);
								 if(j==Responsefields.length-1){
									 break;
								 }
						 }
					}
				  }
			  }
			navMan.setCustomInfo("responseWidgetDataMapping", fieldArray);	  
			  for(var i=0;i<responseSize;i++){
				 var rowFields={};
				for(var j=0;j<fieldArray.length && j<maxColumnCount; j++){
				var lableKey="lblField"+j;
				var key=fieldArray[j].key;
				if(key){
				 var value={
                        text: response[i][key],
						isVisible:true,
						left: "2%",
						width: "100dp",
						"top": "0dp"
                    };
                rowFields[lableKey]=value;
				rowFields['lblSeparator']={"skin":"sknLbldee0e2op100"};
				}
				}
				segData.push(rowFields);
			  }
			  return segData;
			
		},
		createDynamicSegmentHeader:function(responseWidgetDataMapping,maxColumnCount,previousWidget){
			var responseSize=responseWidgetDataMapping.length;
			 var previousFlexHeight = parseInt(previousWidget.height.replace(/\D/g, ''))+ parseInt(previousWidget.top.replace(/\D/g, ''));
			 var flexContainer = new kony.ui.FlexContainer({
                    "id": "flxDymicSegmentResponseHeader",
                    "left": "2%",
                    "width": "96%",
                    "height": "40dp",
                    "skin": "sknFlxBgE7D1D2Bor0",
                    "layoutType": kony.flex.FLOW_HORIZONTAL,
                    "isVisible": true,
					"top":"10dp"
                });
				for(var i=0; i<responseSize && i<maxColumnCount; i++){
					var id="lblDynamicHeaderLabel"+i;
					var text=responseWidgetDataMapping[i].name;
                    var currBreakpoint = kony.application.getCurrentBreakpoint();
            if (currBreakpoint == 640 || currBreakpoint < 640) {
                var dynamicHeaderlabel=this.createHederLabelsMB(id,text);
            }
           else{
				var dynamicHeaderlabel=this.createHederLabels(id,text);
           }
				flexContainer.add(dynamicHeaderlabel);
				}
				return flexContainer;
		},
		createDynamicBillInfo: function(response){
			var maxColumnCount=6
			var previousWidgetHeight=parseInt(this.view.flxCustomerInfoContainer.height.replace(/\D/g, ''))
			var responseLength=response.billInfo[0].transactionDetails.length;
			var rowHeight;
			if(responseLength<=2){
				rowHeight=responseLength*61;
			}
			else{
				rowHeight="122";
			}
			var flexContainer= new kony.ui.FlexContainer({
                    "id": "flxDymicBillDetails",
                    "left": "2%",
                    "width": "96%",
                    "height": "0dp",
                    "skin": "sknFlxffffffBorderRounded",
                    "layoutType": kony.flex.FLOW_VERTICAL,
                    "isVisible": true,
					"top":previousWidgetHeight+30+"dp"
                });
			var dynamicHeaderlabel=this.createHederLabels("lblHeaderBillDetails","Bill Details");
			dynamicHeaderlabel.top=10+"dp";
			dynamicHeaderlabel.height=20+"dp";
			var segData = this.mapResponseFiledsData(response, maxColumnCount);
			var responseWidgetDataMapping= applicationManager.getNavigationManager().getCustomInfo("responseWidgetDataMapping");
			var segmentHeader = this.createDynamicSegmentHeader(responseWidgetDataMapping, maxColumnCount,dynamicHeaderlabel);
			 var previousFlexTop=segmentHeader.top;
			 var previousFlexHeight=segmentHeader.height;
			 previousFlexHeight = parseInt(previousFlexHeight.replace(/\D/g, ''))+ parseInt(previousFlexTop.replace(/\D/g, ''))+rowHeight;
			var flexContainer2 = new kony.ui.FlexContainer({
                    "id": "flxResponseFields",
                    "left": "2%",
                    "width": "96%",
                    "height":rowHeight+"dp",//previousFlexHeight+"dp",
					"top": "0dp",
                    "skin": "slFbox",//"slfBoxffffffB1R5",
                    "layoutType": kony.flex.FLOW_VERTICAL,
                    "isVisible": true
                });
			var dataMap = {
					"lblField0": "lblField0",
                    "lblField1": "lblField1",
                    "lblField2": "lblField2",
                    "lblField3": "lblField3",
                    "lblField4": "lblField4",
                    "lblField5": "lblField5",
                    "lblSeparator": "lblSeparator"
                }
			var segment = new kony.ui.SegmentedUI2({
                "id": "segResponseFieldSegment",
                "isVisible": true,
                "top": "0%",
                "left": "0dp",
                "height": "100%",
				"skin": "sknsegWatchlist",
                "width": "100%",
                "zIndex": 100,
				"widgetDataMap": dataMap,
				"template": (kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile) ? "flxBillPaymentHistorySelectedMobile" : "flxBillPaymentHistorySelected",
                "rowTemplate": (kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile) ? "flxBillPaymentHistorySelectedMobile" :"flxDynamicBillDetails"
            });
			
			segment.setData(segData);
			flexContainer.add(dynamicHeaderlabel);
			flexContainer.add(segmentHeader);
			flexContainer2.add(segment);
			flexContainer.add(flexContainer2);
			var height=parseInt(flexContainer2.height.replace(/\D/g, ''))+parseInt(segmentHeader.top.replace(/\D/g, ''))+ parseInt(segmentHeader.height.replace(/\D/g, ''))+parseInt(dynamicHeaderlabel.height.replace(/\D/g, ''))+parseInt(dynamicHeaderlabel.top.replace(/\D/g, ''));
			flexContainer.height=height;
			this.view.flxResponsePreConfirmation.add(flexContainer);
		},
		createHederLabels:function(id,text){
			return new kony.ui.Label({
                                "id": id,
                                "text": text,
                                "height": kony.flex.USE_PREFERED_SIZE,
                                "isVisible": true,
                                "width": "100dp",
                                "left": "2%",
                                "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                                "right": "",
                                "top": "5dp",
                                "skin": "sknlblFontCol000000Sanproreg",
                            });
							
		},
        createHederLabelsMB:function(id,text){
			return new kony.ui.Label({
                                "id": id,
                                "text": text,
                                "height": kony.flex.USE_PREFERED_SIZE,
                                "isVisible": true,
                                "width":"70dp",
                                "left": "1%",
                                "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                                "right": "",
                                "top": "5dp",
                                "skin": "sknlblSSP42424212px",
                            });
							
		},
		showPreConfirmationScreen: function(response) {
            this.view.flxDowntimeWarning.isVisible = false;
            this.view.rtxDowntimeWarning.text = "";
            this.view.flxRightContent.setVisibility(false);
            this.view.flxResponseField.setVisibility(true);
            this.view.flxCustomerDetails.setVisibility(false);
            this.view.flxTransactionHistory.setVisibility(false);
            this.view.flxNoPayment.setVisibility(false);
            this.view.flxMerchatFields.setVisibility(false);
            this.view.flxBillDetails.setVisibility(false);
            var navMan = applicationManager.getNavigationManager();
            navMan.setCustomInfo("LodgebillpayRes", response);
            navMan.setCustomInfo("getCustomerBillInfoResponse", response);
			this.createCustomerInfoContainer(response);
			this.createResponseBillInfoDetails(response);
            this.view.forceLayout();
        },
		createCustomerInfoContainer: function(response){
			 var fieldMapping = applicationManager.getNavigationManager().getCustomInfo("responseFieldMapping");
			var responseFiledNames = applicationManager.getNavigationManager().getCustomInfo("ResponsefieldNames");
			var flexRow;
			var count=0;
			var payableAmountTextbox;
			var textboxlabelWidget;
			var lblTotalDueAmount;
			var lblTotalDueAmountValue;
			var flexContainer = new kony.ui.FlexContainer({
                    "id": "flxCustomerInfoContainer",
                    "left": "2%",
                    "width": "96%",
                    "height": 0,
                    "skin": "sknFlxffffffBorderRounded",
                    "layoutType": kony.flex.FLOW_VERTICAL,
                    "isVisible": true
                });
			if(response.paymentAggregator){
				var customerResponseFeilds=response.paymentAggregator=="NEA"?this.NEACustomerResponseMapFields:response.paymentAggregator=="KUKL"?this.KUKLCustomerResponseMapFields: new Map();
				var responseKeys=Object.keys(response.billInfo[0].transactionDetails[0]);
				var responseSize=responseKeys.length;
				for (var i = 0; i < responseKeys.length; i++) {
					if(customerResponseFeilds.get(responseKeys[i])){
						var labelWidget;
						var labelWidget2;
						var key=responseKeys[i];
						var mappingKey=customerResponseFeilds.get(key);
						var value=response.billInfo[0].transactionDetails[0][key];
						if(key=="paybleamount" || key=="netamount"){
							var labelId1="lbl"+key+i;
							var lableText =mappingKey;
							if(response.paymentAggregator=="NEA")
							value=response.billInfo[0].totaldueamount?response.billInfo[0].totaldueamount:"";
						
							lblTotalDueAmount=this.createHederLabels("lblTotalDueAmountKey","Total Due Amount:");
							lblTotalDueAmount.width="20%";
							lblTotalDueAmount.left="2%";
							lblTotalDueAmountValue=this.createHederLabels("lblTotalDueAmountValue",value);
							lblTotalDueAmountValue.width="25%";
							lblTotalDueAmountValue.left="2%";
							textboxlabelWidget=this.createHederLabels(labelId1,lableText);
							textboxlabelWidget.width="20%"
							textboxlabelWidget.left="5%";
							payableAmountTextbox=this.createPayableAmountTextBox("txt"+key);
							payableAmountTextbox.text=value;
                            applicationManager.getNavigationManager().setCustomInfo("TextboxenteredValues",value);
							payableAmountTextbox.width="20%";
							payableAmountTextbox.left="2%";
							continue;
						}else{
						var labelId1="lbl"+key+i;
						var lableText =mappingKey;
						var lableId2="lbl"+key+"value"+i;
						var lableText2 =value;
						labelWidget=this.createHederLabels(labelId1,lableText);
						labelWidget2 = this.createHederLabels(lableId2,lableText2);
						labelWidget.width="20%";
						labelWidget2.width="25%";
						}
						if(count%2==0){
                            flexRow = this.createFlexContainer(response, count);
							labelWidget.left="2%";
							labelWidget2.left="2%";
							flexContainer.height = flexContainer.height + 25;
						}
						if(count%2!==0){
                            labelWidget.left="5%";
							labelWidget2.left="2%";
						}
                        flexRow.add(labelWidget);
						flexRow.add(labelWidget2);
						if(count%2==0){
						flexContainer.add(flexRow);
						flexContainer.height = flexContainer.height + 25;
						}
						count++;
					}
					if(i== responseSize-1 && payableAmountTextbox){
						flexRow = this.createFlexContainer(response, count+1);	
						flexRow.add(lblTotalDueAmount);
						flexRow.add(lblTotalDueAmountValue);
						flexRow.add(textboxlabelWidget);
						flexRow.add(payableAmountTextbox);
						flexContainer.add(flexRow);
						flexContainer.height = flexContainer.height + 25;
						}
				}

			}
            flexContainer.height = flexContainer.height + "dp";
            this.view.flxResponsePreConfirmation.add(flexContainer);
			this.view.flxResponsePreConfirmation.top="0dp";
		},
		createPayableAmountTextBox: function(id){
			return new kony.ui.TextBox2({
                    "id": id,
                    "placeholder": "Please enter amount",
                    "maxTextLength": 20,
                    "isVisible": true,
                    "left": "",
                    "width": "100dp",
                    "placeholderSkin": "ICSknsknSSP42424215PxBorder4A90E2",//"sknTxtBor0FontSize12PxColA1A1A1",
                    "onTextChange": this.payableAmountValidation.bind(this),
                    "onEndEditing": this.payableAmountFormat.bind(this),
                    "skin": "ICSknsknSSP42424215PxBorder4A90E2",//"skntbxFontColA1A1A1Bor1B67677",
                    "height": "25dp",
                    "widgetAlignment": constants.WIDGET_ALIGN_TOP_LEFT,
                    "contentAlignment": constants.CONTENT_ALIGN_TOP_LEFT,
					"textInputMode": constants.TEXTBOX_INPUT_MODE_NUMERIC,
                    "padding": [1, 0, 0, 0]
                });
		},
		payableAmountValidation: function(eventObject){
			var data = eventObject.text;
            applicationManager.getNavigationManager().setCustomInfo("TextboxenteredValues",data);
		},
		payableAmountFormat: function(){
			
		},
		createFlexContainer: function(response, count){
			return new kony.ui.FlexContainer({
                                "id": "flxRowData"+count,
                                "left": "0dp",
                                "top": "10dp",
                                "width": "100%",
                                "height": "25dp",
                                "zIndex": 10,
                                "isVisible": true,
                                "skin": "sknflx",
                                "clipBounds": false,
                                "layoutType": kony.flex.FLOW_HORIZONTAL
                            });
		},
        showPreConfirmationScreen_old: function(response) {
            this.view.flxDowntimeWarning.isVisible = false;
            this.view.rtxDowntimeWarning.text = "";
            this.view.flxRightContent.setVisibility(false);
            this.view.flxResponseField.setVisibility(true);
            this.view.flxCustomerDetails.setVisibility(false);
            this.view.flxTransactionHistory.setVisibility(false);
            this.view.flxNoPayment.setVisibility(false);
            this.view.flxMerchatFields.setVisibility(false);
            this.view.flxBillDetails.setVisibility(false);
            var ResponseFieldMappingData = applicationManager.getNavigationManager().getCustomInfo("responseFieldMapping");
            //this.view.flxResponseField.removeAll();
            for (i = 0; i < response.billInfo[0].transactionDetails.length; i++) {
                var flexContainer = new kony.ui.FlexContainer({
                    "id": "flxContainerdata" + i,
                    "left": "6%",
                    "width": "80%",
                    "height": 0,
                    "skin": "slfBoxffffffB1R5",
                    "layoutType": kony.flex.FLOW_VERTICAL,
                    "isVisible": true
                });
                //this.view.flxRightContent.add(flexContainer);
                for (j = 0; j < applicationManager.getNavigationManager().getCustomInfo("ResponsefieldNames").length; j++) {
                    for (k = 0; k < Object.keys(response.billInfo[0].transactionDetails[i]).length; k++) {
                        if (applicationManager.getNavigationManager().getCustomInfo("ResponsefieldNames")[j] == Object.keys(response.billInfo[0].transactionDetails[i])[k]) {
                            var flexRow = new kony.ui.FlexContainer({
                                "id": "flxRowData" + Object.keys(response.billInfo[0].transactionDetails[i])[k],
                                "left": "0dp",
                                "top": "10dp",
                                "width": "100%",
                                //         "height": kony.flex.USE_PREFERRED_SIZE,
                                "height": "30dp",
                                "zIndex": 10,
                                "isVisible": true,
                                "skin": "sknflx",
                                "clipBounds": false,
                                "layoutType": kony.flex.FLOW_HORIZONTAL
                            });
                            flexContainer.height = flexContainer.height + 40;
                            var labelWidget = new kony.ui.Label({
                                "id": "lblCategoryKeydata" + Object.keys(response.billInfo[0].transactionDetails[i])[k],
                                "text": ResponseFieldMappingData[j].fieldLabel + ":",
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
                                "id": "lblvaluedata" + Object.keys(response.billInfo[0].transactionDetails[i])[k],
                                "text": Object.values(response.billInfo[0].transactionDetails[i])[k] ? Object.values(response.billInfo[0].transactionDetails[i])[k] : "NA",
                                "height": kony.flex.USE_PREFERED_SIZE,
                                "isVisible": true,
                                "width": "35%",
                                "left": "10dp",
                                "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                                "right": "",
                                "top": "5dp",
                                "skin": "sknlblFontCol000000Sanproreg",
                                "zIndex": 1
                            });
                            flexContainer.add(flexRow);
                            flexRow.add(labelWidget);
                            flexRow.add(labelWidget2);
                        }
                    }
                }
            }
            flexContainer.height = flexContainer.height + "dp";
            this.view.flxResponsePreConfirmation.add(flexContainer);
            var navMan = applicationManager.getNavigationManager();
            navMan.setCustomInfo("LodgebillpayRes", response);
            navMan.setCustomInfo("getCustomerBillInfoResponse", response);
            this.view.forceLayout();
        },
        lodgeBillpaySuccess: function(response) {
            var errorMsg = '';
            var navMan = applicationManager.getNavigationManager();
            if (response.errorObj) {
                for (i = 0; i < response.errorObj.length; i++) {
                    errorMsg = errorMsg + response.errorObj[i].dbpErrMsg + "\n";
                }
                //this.view.rtxError.isVisible = true;
                this.view.flxDowntimeWarning.isVisible = true;
                this.view.rtxDowntimeWarning.text = errorMsg;
                this.view.flxMErchantFieldData.scrollToWidget(this.view.rtxDowntimeWarning);
            } else {
                var name;
                var accountNamewithNum = navMan.getCustomInfo("SelectedAccountData");
                //   if (!data.FullName) {
                //      name = (data.userlastname === null) ? data.userfirstname : (data.userfirstname === null) ? data.userlastname : //data.userfirstname + " " + data.userlastname;
                //  } else {
                //     name = data.FullName;
                //  }
                //navMan.setCustomInfo("LodgebillpayRes", response.cipsTransactionDetail[0]);
                this.view.flxDowntimeWarning.isVisible = false;
                this.view.flxResponseField.setVisibility(true);
                this.view.flxTransactionHistory.setVisibility(false);
                this.view.flxNoPayment.setVisibility(false);
                this.view.flxMerchatFields.setVisibility(false);
                this.view.flxRightContent.setVisibility(false);
            }
            this.view.forceLayout();
        },
        confirmBillPay: function() {
            FormControllerUtility.showProgressBar(this.view);
            applicationManager.getNavigationManager().navigateTo("frmOneTimePaymentConfirm");
            applicationManager.getNavigationManager().updateForm({
                "mapConfirmationscreenFields": "res"
            }, "frmOneTimePaymentConfirm");
        },
        getEnquieryCallPayload: function() {
            var merchantFileds = this.merchantFieldData;
            var payload = {};
            if (merchantFieldData.lenght > 0) {
                for (var i = 0; i < merchantFileds.length; i++) {
                    if (merchantFileds[i].fieldType == "TEXTFIELD" || MrchanstFieldData[i].fieldType == "DATEFIELD") {
                        var widgetId = "txtField" + merchantFileds[i].fieldName + merchantFileds[i].fieldcategory;
                    } else if (merchantFileds[i].fieldType == "OPTIONFIELD") {
                        var widgetId = "lblOptionFieldLabel" + merchantFileds[i].fieldName + merchantFileds[i].fieldcategory;
                    }
                }
            }
        },
        loadRepeatPaymentMerchantScreen: function(dynamicData, eventobject) {
            this.flowType = "Repeat flow";
            applicationManager.getNavigationManager().setCustomInfo("PaymentAggregatorType", dynamicData.paymentAggregator);
            params = {
                "merchantCode": dynamicData.code
            };
            kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "appName": "HomepageMA",
                "moduleName": "AccountsUIModule"
            }).presentationController.getMerchantPaymentCharges(params);
            applicationManager.getNavigationManager().setCustomInfo("Biller_Code", dynamicData);
            this.view.flxTransactionHistory.setVisibility(false);
            this.view.flxResponseField.setVisibility(false);
            if (dynamicData.merchantType != "Automatic") {
                this.view.flxMerchatFields.setVisibility(false);
                this.view.flxResponseField.setVisibility(true);
                this.view.flxRightContent.setVisibility(true);
                this.view.flxConsentContainer.setVisibility(false);
                this.view.flxBottom.setVisibility(true);
                this.view.flxBrowser.setVisibility(false);
                this.view.imgMerchantLogo.setVisibility(true);
                this.view.flxSenderDetails.setVisibility(true);
                this.view.flxFromAccount.setVisibility(true);
                this.view.flxSearch.setVisibility(true);
                this.view.flxBeneficiaryDetails.setVisibility(true);
                this.getMerchantdata(dynamicData);
                if (eventobject != undefined) {
                    this.titleData = eventobject.widgets()[1].text;
                }
                this.MerchantlogoUrl = dynamicData.logoUrl;
            } else {
                this.view.flxMerchatFields.setVisibility(false);
                this.view.flxErrorMsg.isVisible = false;
                this.view.flxRightContent.setVisibility(true);
                //this.view.flxConsentContainer.setVisibility(true);
                //this.view.lblFavoriteEmailCheckBox.text = "D";
                //this.view.lblFavoriteEmailCheckBox.skin = this.CHECKBOX_UNSELECTED_SKIN;
                //this.view.btnAccept.skin = "sknBtnBlockedSSPFFFFFF15Px";
                ////this.view.btnAccept.setEnabled(false);
                //this.view.flxTitle.setVisibility(false);
                this.MerchantlogoUrl = dynamicData.logoUrl;
                this.view.flxRightContent.setVisibility(false);
                if (eventobject != undefined) {
                    this.titleData = eventobject.widgets()[1].text;
                }
                this.view.imgMerchantLogo.src = this.MerchantlogoUrl;
                this.view.flxSearch.setVisibility(false);
                this.ShowWebView(this);
            }
        },
        searchDropdownValue: function(response, fieldId, fieldLabel) {
            var value = "";
            var key = "";
            var defaultOption = "Select " + response.fieldLabel;
            var isRepeatPaymentFlow = applicationManager.getNavigationManager().getCustomInfo("isRepeatPaymentFlow")
            if (isRepeatPaymentFlow) {
                var servicedata = applicationManager.getNavigationManager().getCustomInfo("repeatPaymentServiceRecord");
                var servicePayload = servicedata.servicepayload;
                var dropdownfieldValues = JSON.parse(response.fieldvalue);
                if (servicePayload) {
                    if (fieldId in servicePayload) {
                        key = servicePayload[fieldId];
                    }
                    if (key !== "") {
                        var dropdownrecord = dropdownfieldValues.find(record => record.key === key);
                        value = dropdownrecord != undefined ? dropdownrecord.value : defaultOption;
                        this.dataToPush[fieldId] = key;
                        this.dataToShowInConfirmationScreen[fieldLabel]=key;
                        if (Object.keys(this.isRequiredData).length > 0) {
                            for (i = 0; i < Object.keys(this.isRequiredData).length; i++) {
                                if (Object.keys(this.isRequiredData)[i] == fieldId) {
                                    this.isRequiredData[fieldId] = key;
                                    //Object.values(this.isRequiredData)[i]=key;
                                }
                            }
                        }
                    } else {
                        value = defaultOption;
                    }
                }
            } else {
                value = defaultOption;
            }
            return value;
        },
        populateResponseFieldsData: function(response, fieldId, fieldLabel) {
            var value = "";
            var isRepeatPaymentFlow = applicationManager.getNavigationManager().getCustomInfo("isRepeatPaymentFlow")
            if (isRepeatPaymentFlow) {
                var servicedata = applicationManager.getNavigationManager().getCustomInfo("repeatPaymentServiceRecord");
                var servicePayload = servicedata.servicepayload;
                if (servicePayload) {
                    if (fieldId in servicePayload) {
                        value = servicePayload[fieldId];
                        this.dataToPush[fieldId] = value;
                        this.dataToShowInConfirmationScreen[fieldLabel]=value;
                        if (Object.keys(this.isRequiredData).length > 0) {
                            for (i = 0; i < Object.keys(this.isRequiredData).length; i++) {
                                if (Object.keys(this.isRequiredData)[i] == fieldId) {
                                    this.isRequiredData[fieldId] = value;
                                    //Object.values(this.isRequiredData)[i]=value;
                                }
                            }
                        }
                    }
                }
            }
            return value;
        },
    };
});