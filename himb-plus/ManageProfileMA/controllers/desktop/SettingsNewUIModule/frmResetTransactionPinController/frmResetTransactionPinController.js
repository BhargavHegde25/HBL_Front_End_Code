define( ['FormControllerUtility', 'CommonUtilities'], function (FormControllerUtility, CommonUtilities) {
    return{
        count: false,
        isdeepLink:false,
        updateFormUI: function(viewModel) {
            if (viewModel !== undefined) {
                if (viewModel.resetPin) {
                    this.showResetScreen(viewModel);
                     var scope = this;
                    // Once service returns, update confirmation UI
                    //var response = navManager.getCustomInfo("contextResetPin");
                    if (viewModel && viewModel.resetPin) {
                        scope.view.flxResetTransactionPinContainer0.isVisible = false;
                        scope.view.flxResetTransactionPinContainerConfirm.isVisible = true;
                        scope.view.flxResetTransactionPinContainer2.isVisible = false;
                        scope.view.rtxText1.text =
                        kony.i18n.getLocalizedString("i18n.HBL.ResetTransactionPInSuccess1") + " " +
                        response.resetPin.referenceId + "<br><br>" +
                        kony.i18n.getLocalizedString("i18n.HBL.ResetTransactionPInSuccess2") +
                        scope_configManager.getResetPinEstimatedTime() + " " +
                        kony.i18n.getLocalizedString("i18n.HBL.ResetTransactionPInSuccess3");
                        kony.application.dismissLoadingScreen();
                }
                }
                if (viewModel.Deeplink) {
                    this.isdeepLink=true;
                    this.view.flxDialogs.setVisibility(false);
                    this.view.flxResetTransactionPinContainer0.setVisibility(false);
                    this.view.flxResetTransactionPinContainerConfirm.setVisibility(false);
                    this.view.flxResetTransactionPinContainer2.setVisibility(true);
                }
                if (viewModel.TransactionResetPinError) {
                    this.showError(viewModel.TransactionResetPinError);
                }
                if (viewModel.TransactionResetPinSuccess) {
                    this.showSuccess(viewModel.TransactionResetPinSuccess);
                }
            }
        },
        showSuccess: function(response) {
            this.view.tbxTemporaryPin.text = "";
            this.view.tbxNewPin.text = "";
            this.view.tbxConfirmPin.text = "";
            this.view.flxErrorResetTransaction.setVisibility(true);
            this.view.lblError1.text = response.message;
            this.view.lblError1.skin ="sknlbl2a9e05SSP15px";
            applicationManager.getNavigationManager().setCustomInfo("DeepLinkResetPin","");
        },
        showError: function(error) {
            // this.view.flxDisclaimer.setVisibility(true);
            this.view.tbxTemporaryPin.text = "";
            this.view.tbxNewPin.text = "";
            this.view.tbxConfirmPin.text = "";
            this.view.flxErrorResetTransaction.setVisibility(true);
            this.view.lblError1.text = error.message;
            this.view.lblError1.skin ="sknlblff000015px";
        },
        init: function() {
            this.view.preShow = this.preShow;
            this.setFlowActions();
        },
        onNavigate: function(res) {
            if (res != null && res != undefined) {
                if (res.Deeplink == "true") {
                    this.view.flxResetTransactionPinContainer0.setVisibility(false);
                    this.view.flxResetTransactionPinContainerConfirm.setVisibility(false);
                    this.view.flxResetTransactionPinContainer2.setVisibility(true);
                    this.disableButton(this.view.btnTemporaryPinProceed);
                }
                // if (res.resetPin) {
                //     this.showResetScreen(res);
                // }
            }
        },
        setFlowActions: function() {
            var self = this;
            self.view.imgTempPinView.src = "view.png";
            self.view.imgNewPinView.src = "view.png";
            self.view.imgConfirmPin.src = "view.png";
            this.view.tbxTemporaryPin.secureTextEntry = true;
            self.view.imgTempPinView.onTouchStart = function() {
                let isSecuredText = self.view.tbxTemporaryPin.secureTextEntry;
                self.view.tbxTemporaryPin.secureTextEntry = !isSecuredText;
                self.view.imgTempPinView.src = !isSecuredText ? "view.png" : "eye_slash.png";
            }.bind(this);
            self.view.tbxNewPin.secureTextEntry = true;
            self.view.imgNewPinView.onTouchStart = function() {
                let isSecuredText = self.view.tbxNewPin.secureTextEntry;
                self.view.tbxNewPin.secureTextEntry = !isSecuredText;
                self.view.imgNewPinView.src = !isSecuredText ? "view.png" : "eye_slash.png";
            }.bind(this);
            self.view.tbxConfirmPin.secureTextEntry = true;
            self.view.imgConfirmPin.onTouchStart = function() {
                let isSecuredText = self.view.tbxConfirmPin.secureTextEntry;
                self.view.tbxConfirmPin.secureTextEntry = !isSecuredText;
                self.view.imgConfirmPin.src = !isSecuredText ? "view.png" : "eye_slash.png";
            }.bind(this);
            this.view.tbxTemporaryPin.onTextChange = function() {
                var numberRegex = /^\d+$/;
                if ((!numberRegex.test(this.view.tbxTemporaryPin.text) || this.view.tbxTemporaryPin.text.length > 6)) {
                    str = this.view.tbxTemporaryPin.text;
                    this.view.tbxTemporaryPin.text = str.slice(0, -1);
                }
                this.validateTransactionPin();
            }.bind(this);
            this.view.tbxNewPin.onTextChange = function() {
                var numberRegex = /^\d+$/;
                if ((!numberRegex.test(this.view.tbxNewPin.text) || this.view.tbxNewPin.text.length > 6)) {
                    str = this.view.tbxNewPin.text;
                    this.view.tbxNewPin.text = str.slice(0, -1);
                }
                this.validateTransactionPin();
            }.bind(this);
            this.view.tbxConfirmPin.onTextChange = function() {
                var numberRegex = /^\d+$/;
                if ((!numberRegex.test(this.view.tbxConfirmPin.text) || this.view.tbxConfirmPin.text.length > 6)) {
                    str = this.view.tbxConfirmPin.text;
                    this.view.tbxConfirmPin.text = str.slice(0, -1);
                }
                this.validateTransactionPin();
            }.bind(this);
            // var navManager = applicationManager.getNavigationManager();
            // response = navManager.getCustomInfo("contextResetPin")
            // this.showResetScreen(response);
        },
        validateTransactionPin: function() {
            if (this.isPasswordValidAndMatchedWithReEnteredValue() && this.view.tbxNewPin.text.length == 6 && this.view.tbxConfirmPin.text.length == 6 && this.view.tbxTemporaryPin.text.length == 6) {
                this.enableButton(this.view.btnTemporaryPinProceed);
            } else {
                this.disableButton(this.view.btnTemporaryPinProceed);
            }
        },
        isPasswordValidAndMatchedWithReEnteredValue: function() {
            if (this.view.tbxNewPin.text && this.view.tbxConfirmPin.text) {
                if (this.view.tbxNewPin.text === this.view.tbxConfirmPin.text) {
                    this.view.flxErrorResetTransaction.setVisibility(false);
                    return true;
                } else {
                    this.view.flxErrorResetTransaction.setVisibility(true);
                    this.view.lblError1.text = kony.i18n.getLocalizedString("i18n.HBL.OldNewPinMismatch");
                    this.view.lblError1.skin ="sknlblff000015px";
                }
            }
            return false;
        },
        preShow: function() {
            var scope = this;
            this.view.flxMain.skin = "flxWhite";
            this.view.flxLeft.skin="slFbox";
            this.view.flxRight.skin="slFbox";
            this.view.lblTransactionPin.skin="sknSSPSemiBold42424215px";
            this.view.lblHeading.skin="sknLbl851a1cPx20";
            this.view.flxMainContainer.skin = "sknFlxffffffBorderRounded";
            this.view.flxProfileDelete.skin="sknFlxffffffBorderRounded";
            this.view.btnDeletePopupYes.skin="sknBtnNormalSSPFFFFFF15pxradius6";
            this.view.btnDeletePopupYes.hoverSkin="sknBtnNormalSSPFFFFFF15pxradius6";
            this.view.btnDeletePopupYes.focusSkin="sknBtnNormalSSPFFFFFF15pxradius6";
            this.view.btnEditPasswordProceed.skin="sknBtnNormalSSPFFFFFF15pxradius6";
            this.view.btnEditPasswordProceed.hoverSkin="sknBtnNormalSSPFFFFFF15pxradius6";
            this.view.btnEditPasswordProceed.focusSkin="sknBtnNormalSSPFFFFFF15pxradius6";
            this.view.flxResetTransactionPinContent.skin="sknFlxffffffBorderRounded";
            scope.view.btnTemporaryPinCancel.skin="sknBtnBorderPx2eaebf1";
            scope.view.btnTemporaryPinCancel.hoverSkin="SknbtnroundcornerA51C306pxradius";
            scope.view.btnTemporaryPinCancel.focusSkin="sknBtnBorderPx2eaebf1";
            this.view.tbxTemporaryPin.skin="skntbxroundborderhbl";
            this.view.tbxNewPin.skin="skntbxroundborderhbl";
            this.view.tbxConfirmPin.skin="skntbxroundborderhbl";
            scope.view.btnEditPasswordCancel.onClick = function() {
                applicationManager.getNavigationManager().navigateTo("frmProfile");
            }
            scope.view.btnResetTransactionPinProceed.onClick = function() {
                applicationManager.getNavigationManager().navigateTo({
                    "appName": "ManageProfileMA",
                    "friendlyName": "SettingsNewUIModule/frmTransactionPin"
                });
            }
            scope.view.btnEditPasswordProceed.onClick = function() {
                var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                    "appName": "AuthenticationMA",
                    "moduleName": "AuthUIModule"
                });
                kony.application.showLoadingScreen();
                var navManager = applicationManager.getNavigationManager();
                var x = navManager.getCustomInfo('AuthParam');
                authModule.presentationController.postLoginCall(x);
            }
            scope.view.btnTemporaryPinCancel.onClick = function() {
                var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                    "appName": "AuthenticationMA",
                    "moduleName": "AuthUIModule"
                });
                kony.application.showLoadingScreen();
                var navManager = applicationManager.getNavigationManager();
                var x = navManager.getCustomInfo('AuthParam');
                authModule.presentationController.postLoginCall(x);
            }
            scope.view.btnTemporaryPinProceed.onClick = function() {
                param = {
                    "temporaryPIN": scope.view.tbxTemporaryPin.text,
                    "newPIN": scope.view.tbxNewPin.text
                }
                var profileSettingsPresenter = applicationManager.getModulesPresentationController({
                    "moduleName": "SettingsNewUIModule",
                    "appName": "ManageProfileMA"
                });
                profileSettingsPresenter.transactionPinResetValidation(param);
            }
            this.view.customheadernew.activateMenu("Settings", "Profile Settings");
            this.view.profileMenu.checkLanguage();
            this.view.profileMenu.activateMenu("PROFILESETTINGS", "Reset Transaction PIN");
            // this.setSelectedValue("i18n.HBL.ResetTransactionPIN");
             var navManager = applicationManager.getNavigationManager();
            response = navManager.getCustomInfo("contextResetPin")
            if(applicationManager.getNavigationManager().getCustomInfo("flowTypeResetPinonClick")=="true"){
                this.showApprovalPinPopup2()
                applicationManager.getNavigationManager().setCustomInfo("flowTypeResetPinonClick","false");
            }
            // if(this.isdeepLink==false){
            // this.showResetScreen(response);
            //}
             var result = navManager.getCustomInfo("DeepLinkResetPin");
             if(result != null && result != undefined && result!=""){
                 this.showDeeplinkingScreen(result);
             }
        },
        showDeeplinkingScreen: function(result) {
            if (result) {
                this.view.flxDialogs.setVisibility(false);
                this.view.flxResetTransactionPinContainer0.setVisibility(false);
                this.view.flxResetTransactionPinContainerConfirm.setVisibility(false);
                this.view.flxResetTransactionPinContainer2.setVisibility(true);
            }
        },
        showResetScreen: function(viewModel) {
            var navManager = applicationManager.getNavigationManager();
            var response = navManager.getCustomInfo("contextResetPin");
            if (response != null && response != undefined && response.resetPin && response.resetPin.pinStatus == "true"&&response.resetPin.referenceId) {
                //this.showApprovalPinPopup1(); // Existing request
                this.view.flxResetTransactionPinContainerConfirm.setVisibility(true);
                navManager.setCustomInfo("contextResetPin","done");
                kony.application.dismissLoadingScreen();
                return; // Don't show Popup2 again
            }
            if (response != null && response != undefined && response.resetPin && response.resetPin.pinStatus == "true"&&response.resetPin.referenceId==undefined) {
            this.showApprovalPinPopup1(); 
            kony.application.dismissLoadingScreen();
            return;
            // Existing request
            }
             if(response=="done"){
                this.showApprovalPinPopup2();
                kony.application.dismissLoadingScreen();
            }
            // if (!this.count) {
            //     this.showApprovalPinPopup2(); // Fresh request
            //     this.count = true; // Mark that Popup2 was already shown
            // }
            kony.application.dismissLoadingScreen();
        },
        showApprovalPinPopup2: function() {
            var scope = this;
            var navManager = applicationManager.getNavigationManager();

            this.view.flxDialogs.setVisibility(true);
            this.view.flxProfileDeletePopUp.setVisibility(true);
            this.view.lblProfileDeleteHeader.setVisibility(true);
            this.view.lblProfileDeleteHeader.text = kony.i18n.getLocalizedString("i18n.HBL.ResetTransactionPIN");

            this.view.lblProfileDeleteContent.text = kony.i18n.getLocalizedString("i18n.HBL.ResetPopUpConfirmationMessage");

            this.view.btnDeletePopupNo.setVisibility(true);
            this.view.btnDeletePopupNo.text = kony.i18n.getLocalizedString("i18n.common.no");
            this.view.btnDeletePopupNo.onClick = function() {
                applicationManager.getNavigationManager().navigateTo("frmProfile");
            };

            this.view.btnDeletePopupYes.text = kony.i18n.getLocalizedString("i18n.common.yes");
            this.view.btnDeletePopupYes.onClick = function() {
                kony.application.showLoadingScreen();
                //Fetch stored param for API call
                var param = navManager.getCustomInfo("resetPinParam");

                // Call Settings module to initiate reset
                var settingsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ moduleName: "SettingsNewUIModule", appName: "ManageProfileMA" });
                settingsModule.presentationController.transactionPINResetStatus(param);
                scope.view.flxDialogs.setVisibility(false);
                };

                this.view.flxprofiledeleteClose.onClick = function() {
                    applicationManager.getNavigationManager().navigateTo("frmProfile");
                };
        },

        showApprovalPinPopup1: function() {
            this.view.flxDialogs.setVisibility(true);
            this.view.flxProfileDeletePopUp.setVisibility(true);
             this.view.lblProfileDeleteHeader.setVisibility(true);
            this.view.lblProfileDeleteHeader.text =kony.i18n.getLocalizedString("i18n.HBL.ResetTransactionPIN");
            this.view.flxprofiledeleteClose.onClick = function() {
                // var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                //     "appName": "AuthenticationMA",
                //     "moduleName": "AuthUIModule"
                // });
                // kony.application.showLoadingScreen();
                // var navManager = applicationManager.getNavigationManager();
                // var x = navManager.getCustomInfo('AuthParam');
                // authModule.presentationController.postLoginCall(x);
                applicationManager.getNavigationManager().navigateTo("frmProfile");
            }
            this.view.btnDeletePopupYes.onClick = function() {
                // var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                //     "appName": "AuthenticationMA",
                //     "moduleName": "AuthUIModule"
                // });
                // kony.application.showLoadingScreen();
                // var navManager = applicationManager.getNavigationManager();
                // var x = navManager.getCustomInfo('AuthParam');
                // authModule.presentationController.postLoginCall(x);
                applicationManager.getNavigationManager().navigateTo("frmProfile");
                //this.view.flxResetTransactionPinContainerConfirm.setVisibility(true);
            }
            this.view.btnDeletePopupNo.setVisibility(false);
            this.view.btnDeletePopupYes.text = kony.i18n.getLocalizedString("i18n.savingsPot.ok");
            this.view.lblProfileDeleteContent.text = kony.i18n.getLocalizedString("i18n.HBL.ResetPopUpMessage");
        },
        // showResetScreen: function(response) {
        //     if (response != null && response != undefined) {
        //         if (response.resetPin.pinStatus == "true") {
        //             if (response.resetPin.isReqExists != undefined && response.resetPin.isReqExists == "true") {
        //                 // var flag = this.count;
        //                 this.showApprovalPinPopup1(flag);
        //                 // this.count = true;
        //                 this.view.rtxText1.text = kony.i18n.getLocalizedString("i18n.HBL.ResetTransactionPInSuccess1") + " " + response.resetPin.referenceId + "<br><br>" + kony.i18n.getLocalizedString("i18n.HBL.ResetTransactionPInSuccess2") + " " + scope_configManager.getResetPinEstimatedTime() + " " + kony.i18n.getLocalizedString("i18n.HBL.ResetTransactionPInSuccess3");
        //             } else {
        //                 this.view.flxResetTransactionPinContainer0.isVisible = false;
        //                 this.view.flxResetTransactionPinContainerConfirm.isVisible = true;
        //                 this.view.flxResetTransactionPinContainer2.isVisible = false;
        //                 // this.view.flxResetTransactionPinContainer0.setVisibility(false);
        //                 // this.view.flxResetTransactionPinContainerConfirm.setVisibility(true);
        //                 // this.view.flxResetTransactionPinContainer2.setVisibility(false);
        //                 this.view.rtxText1.text = kony.i18n.getLocalizedString("i18n.HBL.ResetTransactionPInSuccess1") + " " + response.resetPin.referenceId + "<br><br>" + kony.i18n.getLocalizedString("i18n.HBL.ResetTransactionPInSuccess2") + scope_configManager.getResetPinEstimatedTime() + " " + kony.i18n.getLocalizedString("i18n.HBL.ResetTransactionPInSuccess3");
        //             }
        //             // this.showApprovalPinPopup();
        //             // this.view.lblResetTransactionPin3.text = "Your Request ID is: " + response.referenceId;
        //         } else if (response.resetPin.pinStatus == "false") {
        //             this.view.flxResetTransactionPinContainer0.setVisibility(true);
        //             this.view.flxResetTransactionPinContainerConfirm.setVisibility(false);
        //             this.view.flxResetTransactionPinContainer2.setVisibility(false);
        //             this.view.rtxText.text = kony.i18n.getLocalizedString("i18n.HBL.TransactionPinNotSet");
        //         }
        //         // this.view.flxResetTransactionPinContent.forceLayout();
        //         // this.view.forceLayout();
        //     }
        // },
        deFormatNewPin: function() {
            var numberRegex = /^\d+$/;
            if ((!numberRegex.test(this.view.tbxNewPassword.text) || this.view.tbxNewPassword.text.length > 6)) {
                str = this.view.tbxNewPassword.text;
                this.view.tbxNewPassword.text = str.slice(0, -1);
            }
        },
        disableButton: function(button) {
            button.setEnabled(false);
            button.skin = "ICSknbtnDisablede2e9f036px";
            button.hoverSkin = "ICSknbtnDisablede2e9f036px";
            button.focusSkin = "ICSknbtnDisablede2e9f036px";
        },
        enableButton: function(button) {
            button.setEnabled(true);
            button.skin = "sknBtnNormalSSPFFFFFF15pxradius6";
            button.focusSkin = "sknBtnNormalSSPFFFFFF15pxradius6";
            button.hoverSkin = "sknBtnNormalSSPFFFFFF15pxradius6";
        },
        showApprovalPinPopup: function(flag) {
            var self = this;
            // this.view.flxAlert.height = this.view.flxHeader.info.frame.height + this.view.flxMain.info.frame.height + this.view.flxFooter.info.frame.height + "dp";
            // this.view.flxAlert.setVisibility(true);
            //this.view.CustomAlertPopup.lblHeading.setFocus(true);
            if (kony.application.getCurrentForm()) {
                if (flag == false) {
                    var flxPopupFlex = new kony.ui.FlexScrollContainer({
                        id: "flxResetPopup",
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
            }
            if (flag === true) {
                this.view.CustomPopup.isVisible = true;
                this.view.CustomPopup.lblHeading.setActive(true);
                var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
                this.view.CustomPopup.lblPopupMessage.text = kony.i18n.getLocalizedString("i18n.HBL.ResetPopUpMessage");
                this.view.CustomPopup.isModalContainer = true;
                this.view.CustomPopup.lblHeading.text = kony.i18n.getLocalizedString("18n.HBL.Cards.TransctionPinAlert");
                this.view.CustomPopup.lblHeading.setVisibility(false);
                this.view.CustomPopup.btnNo.text = kony.i18n.getLocalizedString("18n.HBL.Cards.Exit");
                this.view.CustomPopup.btnNo.setVisibility(false);
                this.view.CustomPopup.btnYes.text = kony.i18n.getLocalizedString("i18n.savingsPot.ok");
                this.view.CustomPopup.flxSeperator.setVisibility(false);
                this.view.CustomPopup.flxCross.accessibilityConfig = {
                    a11yLabel: "Close this cancel dialog",
                    a11yARIA: {
                        tabindex: 0,
                        role: "button"
                    }
                };
                this.view.CustomPopup.btnYes.accessibilityConfig = {
                    a11yLabel: "Yes, cancel this process",
                    a11yARIA: {
                        tabindex: 0,
                        role: "button"
                    }
                };
                this.view.CustomPopup.btnNo.accessibilityConfig = {
                    a11yLabel: "No, don't cancel this process",
                    a11yARIA: {
                        tabindex: 0,
                        role: "button",
                        isVisible: false,
                    }
                };
                this.view.CustomPopup.btnYes.onClick = function() {
                    var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                        "appName": "AuthenticationMA",
                        "moduleName": "AuthUIModule"
                    });
                    kony.application.showLoadingScreen();
                    var navManager = applicationManager.getNavigationManager();
                    var x = navManager.getCustomInfo('AuthParam');
                    authModule.presentationController.postLoginCall(x);
                }
                this.view.CustomPopup.flxCross.onClick = function() {
                    var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                        "appName": "AuthenticationMA",
                        "moduleName": "AuthUIModule"
                    });
                    kony.application.showLoadingScreen();
                    var navManager = applicationManager.getNavigationManager();
                    var x = navManager.getCustomInfo('AuthParam');
                    authModule.presentationController.postLoginCall(x);
                }
            } else {
                customPopup.lblHeading.setActive(true);
                var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
                customPopup.lblPopupMessage.text = kony.i18n.getLocalizedString("i18n.HBL.ResetPopUpMessage");
                customPopup.isModalContainer = true;
                customPopup.lblHeading.text = kony.i18n.getLocalizedString("18n.HBL.Cards.TransctionPinAlert");
                customPopup.lblHeading.setVisibility(false);
                customPopup.btnNo.text = kony.i18n.getLocalizedString("18n.HBL.Cards.Exit");
                customPopup.btnNo.setVisibility(false);
                customPopup.btnYes.text = kony.i18n.getLocalizedString("i18n.savingsPot.ok");
                customPopup.flxSeperator.setVisibility(false);
                customPopup.btnYes.accessibilityConfig = {
                        "a11yLabel": "Yes, Cancel this Travel Plan",
                        "a11yARIA": {
                            "tabindex": 0,
                            "role": "button"
                        }
                    },
                    customPopup.btnNo.accessibilityConfig = {
                        "a11yLabel": "No, Don't Cancel this Travel Plan",
                        "a11yARIA": {
                            "tabindex": 0,
                            "role": "button"
                        }
                    },
                    customPopup.btnYes.onClick = function() {
                        var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                            "appName": "AuthenticationMA",
                            "moduleName": "AuthUIModule"
                        });
                        kony.application.showLoadingScreen();
                        var navManager = applicationManager.getNavigationManager();
                        var x = navManager.getCustomInfo('AuthParam');
                        authModule.presentationController.postLoginCall(x);
                    }
                customPopup.btnNo.onClick = function() {
                    flxAlert.setVisibility(false);
                    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.navigateToManageCards();
                }
                customPopup.flxCross.onClick = function() {
                    var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                        "appName": "AuthenticationMA",
                        "moduleName": "AuthUIModule"
                    });
                    kony.application.showLoadingScreen();
                    var navManager = applicationManager.getNavigationManager();
                    var x = navManager.getCustomInfo('AuthParam');
                    authModule.presentationController.postLoginCall(x);
                }
                customPopup.onKeyPress = function(eventobject, eventPayload) {
                    if (eventPayload.keyCode === 27) {
                        self.view.flxAlert.setVisibility(false);
                    }
                }
            }
        }
    }
 });