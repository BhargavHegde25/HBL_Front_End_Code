define(['CommonUtilities', 'FormControllerUtility', 'OLBConstants', 'ViewConstants'], function(CommonUtilities, FormControllerUtility, OLBConstants, ViewConstants) {
    var orientationHandler = new OrientationHandler();
    return {
        updateFormUI: function(context) {
            if (context.TnCcontent) {
                this.setTnCDATASection(context.TnCcontent);
            }
            if (context.error) {
                this.showError(context.error);
            }
        },
		loadAuthModule: function() {
            return kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
        },
        preShow: function() {
            CommonUtilities.disableButton(this.view.btnProceed);
             this.view.flxTermsAndConditions.setVisibility(false);
            this.view.flxBody.top = "50dp";
            this.view.lblFavoriteEmailCheckBox.setVisibility(false);
            this.view.imgFavoriteEmailCheckBox.setVisibility(true);
            this.view.imgFavoriteEmailCheckBox.src = "inactivecheckbox_2.png";
            this.view.lblFavoriteEmailCheckBox.text = OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED;
           // this.view.imgFavoriteEmailCheckBox.toolTip = "Please read the complete Terms & Conditions to enable the checkbox for acceptance.";
            this.view.lblFavoriteEmailCheckBox.isEnabled = false;
            this.view.btnProceed.setEnabled(false);
            this.view.lblFavoriteEmailCheckBox.text = OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED;
            //this.view.flxCloseFontIconParent.onClick = this.showLoginOnCancel;
            this.view.flxCloseFontIcon.onClick = this.showLogin;
            this.view.flxMain.skin = ViewConstants.SKINS.LOGIN_MAIN_BAKGROUND;
            //this.view.flxFooterMenu.setVisibility(false);
            this.view.btnViewMore.setVisibility(false);
            this.view.flxLoading.isModalContainer = true;
            this.view.flxLoadingWrapper.isModalContainer = true;
            this.view.flxImageContainer.isModalContainer = true;
            this.view.flxMain.doLayout = this.onBreakpoint;
            this.view.flxTC.doLayout = this.centerPopupFlex;
          var navManager = applicationManager.getNavigationManager();
             var isEnrollflow= navManager.getCustomInfo("isEnrollflow");
           	this.view.btnProceed.onClick = this.agreeTnc;
             if(isEnrollflow===true){
            this.view.btnProceed.onClick=function()
            {
                applicationManager.getNavigationManager().navigateTo({
                    appName: 'SelfServiceEnrolmentMA',
                    friendlyName: 'frmEnrollNow'
                });
            };
			}
    
        },
        postShow: function() {
            var scope = this;
            applicationManager.getNavigationManager().applyUpdates(this);
            //this.view.lblCopyright.setVisibility(false);
            this.setAccessibility();
            // this.view.flxTermsAndConditions.setVisibility(false);
            document.addEventListener('keydown', function(event) {
                if (event.which === 27) {
                    scope.view.flxTermsAndConditions.setVisibility(false);
                    scope.view.flxTC.isModalContainer = false;
                    scope.view.btnTandC.setFocus(true);
                }
            });
            this.view.btnTermsAndConditions.setVisibility(true);
            this.view.btnPrivacy.setVisibility(true);
			this.view.btnExchange.onClick = function() {
				scope.ExchangeScreen();
			};
			this.view.btnDepositInterest.onClick = function() {
				scope.DepositIntrestScreen();
			};
			this.view.btnLoanIntrest.onClick = function() {
				scope.LoanIntrestScreen();
			};
			this.view.btnFaqs.onClick = scope.loadAuthModule().presentationController.navigateToFAQ.bind(scope);
            this.view.btnContactUs.onClick = scope.loadAuthModule().presentationController.navigateToContactUs.bind(scope);
            this.view.btnPrivacy.onClick = scope.loadAuthModule().presentationController.navigateToPrivacyPrivacy.bind(scope);
            this.view.btnTermsAndConditions.onClick = scope.loadAuthModule().presentationController.navigateToTermsAndConditions.bind(scope);
            this.view.btnLocateUs.onClick = function() {
                scope.loadAuthModule().presentationController.navigateToLocateUs();
            };
            scope.view.lblCopyright.text =  scope_configManager.getHblCopyRight();
        },
		ExchangeScreen: function() {
            var config = applicationManager.getConfigurationManager();
            let URL = config.getExchangerateURL();
            //let Url = "https://www.himalayanbank.com/int/rate/";
            kony.application.openURL(URL);
        },
        DepositIntrestScreen: function() {
            var config = applicationManager.getConfigurationManager();
            let URL = config.getDepositrateURL();
            //let Url = "https://www.himalayanbank.com/en/rates/deposit-products-rate";
            kony.application.openURL(URL);
        },
        LoanIntrestScreen: function() {
            var config = applicationManager.getConfigurationManager();
            let URL = config.getLoanrateURL();
            //let Url = "https://www.himalayanbank.com/en/rates/loan-products-rates";
            kony.application.openURL(URL);
        },
    // onBreakpoint: function(){
	// 		if (kony.application.getCurrentBreakpoint() === 640) {
	// 				this.view.flxTCContents.height = "250dp";
	// 				this.view.flxCloseFontIconParent.left = "525dp";
	// 				this.view.flxCloseFontIconParent.top = "80dp";
    //             } else if (kony.application.getCurrentBreakpoint() === 768) {
	// 				this.view.flxScrollDetails.setVisibility(false);
	// 				this.view.flxTCContents.height = "345dp";
	// 				this.view.flxCloseFontIconParent.left = "575dp";
	// 				this.view.flxCloseFontIconParent.top = "95dp";
    //             } else if (kony.application.getCurrentBreakpoint() === 1024) {
    //                 this.view.flxCloseFontIconParent.left = "700dp";
	// 				this.view.flxCloseFontIconParent.top = "95dp";
	// 				this.view.flxTCContents.height = "400dp";
    //             } else {
                   
	// 				this.view.flxTCContents.height = "400dp";
    //             }
	// 	},
        onBreakpoint: function() {
            if (kony.application.getCurrentBreakpoint() === 640) {
                this.view.flxTCContents.height = "250dp";
                this.view.flxCloseFontIconParent.left = ((100 - parseInt(this.view.flxTandC.width)) / 18) + parseInt(this.view.flxTandC.width) + "%";
                this.view.flxCloseFontIconParent.top = "80dp";
                this.view.btnLocateUs.centerX = "50%";
                this.view.btnContactUs.centerX = "50%";
                this.view.btnPrivacy.setVisibility(true);
                this.view.btnPrivacy.centerX = "50%";
                this.view.btnTermsAndConditions.setVisibility(true);
                this.view.btnTermsAndConditions.centerX = "50%";
                this.view.btnFaqs.centerX = "50%";
                this.view.btnExchange.centerX = "50%";
                this.view.btnDepositInterest.centerX = "50%";
                this.view.btnLoanIntrest.centerX = "50%";
                
            } else if (kony.application.getCurrentBreakpoint() === 768) {
                this.view.flxScrollDetails.setVisibility(false);
                this.view.flxTCContents.height = "345dp";
                this.view.flxCloseFontIconParent.left = ((100 - parseInt(this.view.flxTandC.width)) / 4) + parseInt(this.view.flxTandC.width) + "%";
                this.view.flxCloseFontIconParent.top = "95dp";
               this.view.btnLocateUs.centerX = "50%";
                this.view.btnContactUs.centerX = "50%";
                this.view.btnPrivacy.setVisibility(true);
                this.view.btnPrivacy.centerX = "50%";
                this.view.btnTermsAndConditions.setVisibility(true);
                this.view.btnTermsAndConditions.centerX = "50%";
                this.view.btnFaqs.centerX = "50%";
                this.view.btnExchange.centerX = "50%";
                this.view.btnDepositInterest.centerX = "50%";
                this.view.btnLoanIntrest.centerX = "50%";
            } else if (kony.application.getCurrentBreakpoint() === 1024) {
                var closeLeft = ((100 - parseInt(this.view.flxTandC.width)) / 3) + parseInt(this.view.flxTandC.width) + "%";
                this.view.flxCloseFontIconParent.left = closeLeft;
                this.view.flxCloseFontIconParent.top = "95dp";
                this.view.flxTCContents.height = "400dp";
                this.view.flxFooterContainer.height = "50px";
                this.view.flxFooterContainer.layoutType = kony.flex.FLOW_HORIZONTAL;          
                this.view.flxVBar1.setVisibility(true);
                this.view.flxVBar2.setVisibility(true);
                this.view.flxVBar3.setVisibility(true);
                this.view.flxVBar4.setVisibility(true);
                this.view.flxVBar5.setVisibility(true);
                this.view.flxVBar6.setVisibility(true);
                this.view.flxVBar7.setVisibility(true);
                this.view.flxVBar1.left = "3px";
                this.view.flxVBar1.right = "3px";
                this.view.flxVBar2.left = "3px";
                this.view.flxVBar2.right = "3px";
                this.view.flxVBar3.left = "3px";
                this.view.flxVBar3.right = "3px";
                this.view.flxVBar4.left = "3px";
                this.view.flxVBar4.right = "3px";
                this.view.flxVBar5.left = "3px";
                this.view.flxVBar5.right = "3px";
                this.view.flxVBar6.left = "3px";
                this.view.flxVBar6.right = "3px";
                this.view.flxVBar7.left = "3px";
                this.view.flxVBar7.right = "3px";
                this.view.flxVBar1.width = "1px";
                this.view.flxVBar2.width = "1px";
                this.view.flxVBar3.width = "1px";
                this.view.flxVBar4.width = "1px";
                this.view.flxVBar5.width = "1px";
                this.view.flxVBar6.width = "1px";
                this.view.flxVBar7.width = "1px";
                this.view.btnLocateUs.left = "";
                this.view.btnLocateUs.right = "";
                this.view.btnContactUs.left = "";
                this.view.btnContactUs.right = "";
                this.view.btnPrivacy.left = "";
                this.view.btnPrivacy.right = "";
                this.view.btnTermsAndConditions.left = "";
                this.view.btnTermsAndConditions.right = "";
                this.view.btnFaqs.left = "";
                this.view.btnFaqs.right = "";
                this.view.btnExchange.left = "";
                this.view.btnExchange.right = "";
                this.view.btnDepositInterest.left = "";
                this.view.btnDepositInterest.right = "";
                this.view.btnLoanIntrest.left = "";
                this.view.btnLoanIntrest.right = "";

            } else {
                this.view.flxTCContents.height = "400dp";
                this.view.flxFooterContainer.height = "50px";
                this.view.flxFooterContainer.layoutType = kony.flex.FLOW_HORIZONTAL;          
                this.view.flxVBar1.setVisibility(true);
                this.view.flxVBar2.setVisibility(true);
                this.view.flxVBar3.setVisibility(true);
                this.view.flxVBar4.setVisibility(true);
                this.view.flxVBar5.setVisibility(true);
                this.view.flxVBar6.setVisibility(true);
                this.view.flxVBar7.setVisibility(true);
                this.view.flxVBar1.left = "3px";
                this.view.flxVBar1.right = "3px";
                this.view.flxVBar2.left = "3px";
                this.view.flxVBar2.right = "3px";
                this.view.flxVBar3.left = "3px";
                this.view.flxVBar3.right = "3px";
                this.view.flxVBar4.left = "3px";
                this.view.flxVBar4.right = "3px";
                this.view.flxVBar5.left = "3px";
                this.view.flxVBar5.right = "3px";
                this.view.flxVBar6.left = "3px";
                this.view.flxVBar6.right = "3px";
                this.view.flxVBar7.left = "3px";
                this.view.flxVBar7.right = "3px";
                this.view.flxVBar1.width = "1px";
                this.view.flxVBar2.width = "1px";
                this.view.flxVBar3.width = "1px";
                this.view.flxVBar4.width = "1px";
                this.view.flxVBar5.width = "1px";
                this.view.flxVBar6.width = "1px";
                this.view.flxVBar7.width = "1px";
                this.view.btnLocateUs.left = "";
                this.view.btnLocateUs.right = "";
                this.view.btnContactUs.left = "";
                this.view.btnContactUs.right = "";
                this.view.btnPrivacy.left = "";
                this.view.btnPrivacy.right = "";
                this.view.btnTermsAndConditions.left = "";
                this.view.btnTermsAndConditions.right = "";
                this.view.btnFaqs.left = "";
                this.view.btnFaqs.right = "";
                this.view.btnExchange.left = "";
                this.view.btnExchange.right = "";
                this.view.btnDepositInterest.left = "";
                this.view.btnDepositInterest.right = "";
                this.view.btnLoanIntrest.left = "";
                this.view.btnLoanIntrest.right = "";
            }
        },
        centerPopupFlex: function(popupWidget) {
            popupWidget = this.view.flxTC;
            popupWidget.info = popupWidget.frame;
            if (kony.os.deviceInfo().screenHeight - 40 <= popupWidget.info.height) {
                popupWidget.top = "20dp";
                popupWidget.height = kony.os.deviceInfo().screenHeight - 40 + "dp";
                this.view.brwScroll.height = kony.os.deviceInfo().screenHeight - 124 + "dp";
                popupWidget.centerY = "";
            } else {
                if (kony.application.getCurrentBreakpoint() === 640) {
                    popupWidget.height = "325dp";
                    this.view.flxScrollDetails.setVisibility(false);
                    this.view.flxTermsAndConditionsContent.height = "270dp";
                    this.view.flxTCContents.height = "200dp";
                } else if (kony.application.getCurrentBreakpoint() === 768) {
                    popupWidget.height = "400dp";
                    this.view.flxScrollDetails.setVisibility(false);
                     this.view.flxTermsAndConditionsContent.height = "350dp";
                    this.view.flxTCContents.height = "275dp";
                    this.view.flxCloseFontIconParent.left = "575dp";
                    this.view.flxCloseFontIconParent.top = "85dp";
                } else if (kony.application.getCurrentBreakpoint() === 1024) {
                    popupWidget.height = "500dp";
                    this.view.flxScrollDetails.setVisibility(false);
                    this.view.flxTermsAndConditionsContent.height = "400dp";
                    this.view.flxTCContents.height = "350dp";
                } else {
                    popupWidget.height = "650dp";
                    this.view.flxScrollDetails.setVisibility(false);
                    this.view.flxTCContents.height = "415dp";
                }
                popupWidget.top = "";
                popupWidget.centerY = "50%";
            }
            this.view.forceLayout();
        },
        setAccessibility: function() {
            this.view.flxLoading.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.flxLoadingWrapper.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.flxImageContainer.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.flxTCContents.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.flxSeperator1.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.imgClose.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.flxTermsAndConditions.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.lblWrongInformation.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.flxMain.accessibilityConfig = {
                a11yARIA: {
                    "role": "main",
                    tabindex: -1,
                }
            }
            this.view.flxCloseFontIconParent.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.flxCloseFontIcon.accessibilityConfig = {
                a11yLabel: "Close and log out",
                a11yARIA: {
                    "role": "button"
                }
            }
            this.view.lblCloseFontIconCommon.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.imgKony.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                    "aria-hidden": true
                }
            }
            this.view.lblWelcome.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.imgDowntimeWarning.accessibilityConfig= {
                a11yHidden: true,
                a11yARIA: {
                    role: "presentation",
                    tabindex: -1,
                }
            }
            this.view.lblDowntimeWarning.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.lblBeyondBanking.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.lblBeyondBankingDesc.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.flxLblFontIcon.accessibilityConfig = {
                a11yLabel: "terms and conditions",
                a11yARIA: {
                    "role": "checkbox",
                    "aria-checked": false,
                }
            }
            this.view.lblFavoriteEmailCheckBox.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.lblIAccept.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.btnTandC.accessibilityConfig = {
                a11yARIA: {
                    // "role": "button"
                }
            }
            this.view.btnProceed.accessibilityConfig = {
                a11yLabel : "proceed, Accepting terms and conditions",
                a11yARIA : {
                    tabindex : 0,
                    role : "button"
                  }
            }
            this.view.btnViewMore.accessibilityConfig = {
                a11yLabel:"Learn more about our Bank's offerings. Opens in a new tab",
                a11yARIA: {
                    "role": "button"
                }
            }
            this.view.flxFooterContainer.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.flxVBar1.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.flxVBar2.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.flxVBar3.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.flxVBar4.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.btnLocateUs.accessibilityConfig = {
                a11yARIA: {
                    "role": "link"
                }
            }
            this.view.btnContactUs.accessibilityConfig = {
                a11yARIA: {
                    "role": "link"
                }
            }
            this.view.btnPrivacy.accessibilityConfig = {
                a11yARIA: {
                    "role": "link"
                }
            }
            this.view.btnTermsAndConditions.accessibilityConfig = {
                a11yARIA: {
                    "role": "link"
                }
            }
            this.view.btnFaqs.accessibilityConfig = {
                a11yARIA: {
                    "role": "link"
                }
            }
            this.view.lblTermsAndConditions.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.btnClose.accessibilityConfig = {
                a11yLabel : "close, pre-terms and conditions dialog",
                  a11yARIA : {
                      tabindex : 0,
                      role : "button"
                    }
            }
            this.view.imgClose.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.rtxTC.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.brwBodyTnC.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.lblCopyrightTab1.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.lblCopyrightTab2.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.flxTC.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                    "role": "dialog",
                    "aria-live":"off"
                },
              }
            this.view.imgLoading.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                    tabindex: -1,
                }
            }
        },
        initActions: function() {
            FormControllerUtility.setRequestUrlConfig(this.view.brwBodyTnC);
            this.view.btnClose.onClick = this.hideTermsAndConditionPopUp;
            this.view.btnViewMore.onClick = function() {
                var config = applicationManager.getConfigurationManager();
                kony.application.openURL(config.getConfigurationValue("LINK_TO_DBX"));
            };
            //this.view.flxLblFontIcon.onClick = this.toggleTnC.bind(this, this.view.lblFavoriteEmailCheckBox);
            this.view.flxLblFontIcon.onClick = () => {
                if (!this.view.lblFavoriteEmailCheckBox.isEnabled) return;
                this.toggleTnC(this.view.lblFavoriteEmailCheckBox);
                };
        },
        /*showLoginOnCancel: function() {
            var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
            authModule.presentationController.showLoginScreen();
        },*/
        showLogoutOnCancel: function() {
            var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
            authModule.presentationController.onTnCNotSelect();
        },
        // showTermsAndConditionPopUp: function() {
        //     var scope = this;
        //     this.centerPopupFlex();
        //     this.view.flxTermsAndConditions.setVisibility(true);
        //     this.view.flxTC.isModalContainer = true;
        //     this.view.lblTermsAndConditions.setActive(true);
        //     this.view.imgFavoriteEmailCheckBox.src = "inactivecheckbox_2.png";
        //     this.view.lblFavoriteEmailCheckBox.text = OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED;
        //     this.view.lblFavoriteEmailCheckBox.skin = OLBConstants.SKINS.CHECKBOX_UNSELECTED_SKIN;
        //     this.view.imgFavoriteEmailCheckBox.toolTip = "Please read the complete Terms & Conditions to enable the checkbox for acceptance.";
        //     this.view.lblFavoriteEmailCheckBox.isEnabled = false;
        //     this.view.flxTCContents.setContentOffset({ x: 0, y: 1 }, false); 
        //     kony.timer.schedule("scrollTopFix", function () {
        //     try {
        //     scope.view.flxTCContents.setContentOffset({ x: 0, y: 0 }, false); // Scroll to top
        //     } catch (e) {
        //     kony.print("Error in scroll reset: " + e.message);
        //     }
        //     }, 0.1, false);
		// 	var totalHeight = this.view.flxTCContents.contentSizeMeasured.height;
		// 	var visibleHeight = parseInt(this.view.flxTCContents.height.replace("dp", ""), 10);
		// 	if(totalHeight<=visibleHeight)
		// 	{
		// 		this.view.lblFavoriteEmailCheckBox.isEnabled = true;
        //         this.view.imgFavoriteEmailCheckBox.toolTip = "";
		// 	}
		// 	else{
        //          this.view.flxTCContents.onScrollEnd = this.onTnCScrolledToBottom.bind(this);
        //         }
        //     var collection = document.getElementsByTagName("iframe");
        //     for (let i = 0; i < collection.length; i++) {
        //         collection[i].tabIndex = 0;
        //         collection[i].ariaLabel = "Terms and conditions";
        //     }
        //     this.view.flxTCContents.onScrollEnd = this.onTnCScrolledToBottom.bind(this);

        // },
         showTermsAndConditionPopUp: function() {
            var scope = this;
            this.centerPopupFlex();
            this.view.flxTermsAndConditions.setVisibility(true);
            this.view.flxTC.isModalContainer = true;
            this.view.lblTermsAndConditions.setActive(true);
            this.view.imgFavoriteEmailCheckBox.src = "inactivecheckbox_2.png";
            CommonUtilities.disableButton(this.view.btnProceed);
            this.view.lblFavoriteEmailCheckBox.text = OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED;
            this.view.lblFavoriteEmailCheckBox.skin = OLBConstants.SKINS.CHECKBOX_UNSELECTED_SKIN;
           // this.view.imgFavoriteEmailCheckBox.toolTip = "Please read the complete Terms & Conditions to enable the checkbox for acceptance.";
            this.view.lblFavoriteEmailCheckBox.isEnabled = false;
            this.view.btnAgree.onClick = () => {
                this.toggleTnC(this.view.lblFavoriteEmailCheckBox);
            };
            this.view.btnCancel.onClick = this.hideTermsAndConditionPopUp;
        },
        hideTermsAndConditionPopUp: function() {
            this.view.flxTermsAndConditions.setVisibility(false);
            this.view.flxTC.isModalContainer = false;
            this.view.btnTandC.setFocus(true);
        },
        setTnCDATASection: function(content) {
            this.view.lblWrongInformation.setVisibility(false);
            if (content.contentTypeId === OLBConstants.TERMS_AND_CONDITIONS_URL) {
                this.view.btnTandC.onClick = function() {
                    window.open(content.termsAndConditionsContent);
                }
            } else {
                this.view.flxLblFontIcon.onClick =this.showTermsAndConditionPopUp;
                this.view.btnTandC.onClick = this.showTermsAndConditionPopUp;
                this.view.rtxTC.text = content.termsAndConditionsContent;
                FormControllerUtility.setHtmlToBrowserWidget(this, this.view.brwBodyTnC, content.termsAndConditionsContent);
            }
            this.view.forceLayout();
            FormControllerUtility.hideProgressBar(this.view)
            var collection = document.getElementsByTagName("iframe");
            for (let i = 0; i < collection.length; i++) {
                collection[i].tabIndex = 0;
                collection[i].ariaLabel = "Terms and conditions";
            }
                this.view.flxTCContents.onScrollEnd = this.onTnCScrolledToBottom.bind(this);
        },
        onTnCScrolledToBottom: function() {
            try {
			var scrollTop = this.view.flxTCContents.contentOffsetMeasured.y;
			var visibleHeight = parseInt(this.view.flxTCContents.height.replace("dp", ""), 10);
			var totalHeight = this.view.flxTCContents.contentSizeMeasured.height;
			var scrollBuffer = 2; 
			if (scrollTop + visibleHeight + scrollBuffer >= totalHeight) {
				this.view.lblFavoriteEmailCheckBox.isEnabled = true;
				this.view.imgFavoriteEmailCheckBox.toolTip = "";
			}
			} catch (e) {
				kony.print("Error in checking scroll bottom: " + e.message);
			}
		},
        toggleTnC: function(widget) {
            CommonUtilities.toggleFontCheckbox(widget);
            if (widget.text === OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED) {
                this.view.flxLblFontIcon.accessibilityConfig = {
                    a11yLabel: "terms and conditions",
                    a11yARIA: {
                        "role": "checkbox",
                        "aria-checked": false,
                    }
                }
                CommonUtilities.disableButton(this.view.btnProceed);
                this.view.imgFavoriteEmailCheckBox.src = "inactivecheckbox_2.png";
                widget.skin = OLBConstants.SKINS.CHECKBOX_UNSELECTED_SKIN
            } else {
                this.view.flxLblFontIcon.accessibilityConfig = {
                    a11yLabel: "terms and conditions",
                    a11yARIA: {
                        "role": "checkbox",
                        "aria-checked": true,
                    }
                }
                CommonUtilities.enableButton(this.view.btnProceed);
                this.view.imgFavoriteEmailCheckBox.src = "activecheckbox.png";
                this.hideTermsAndConditionPopUp();
                widget.skin = OLBConstants.SKINS.CHECKBOX_SELECTED_SKIN
            }
        },
        agreeTnc: function() {
            FormControllerUtility.showProgressBar(this.view);
            var termsAndConditionModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("TermsAndConditionsUIModule");
            termsAndConditionModule.presentationController.createTnC(OLBConstants.TNC_FLOW_TYPES.Login_TnC);
        },
        showError: function(error) {
            this.view.lblWrongInformation.setVisibility(true);
            this.view.lblWrongInformation.text = error.errorMessage;
            FormControllerUtility.hideProgressBar(this.view);
            this.view.forceLayout();
        },
      showLogin:function(){
        applicationManager.getNavigationManager().navigateTo({
                    appName: 'AuthenticationMA',
                    friendlyName: 'frmLogin'
                });
      }
    };
});
