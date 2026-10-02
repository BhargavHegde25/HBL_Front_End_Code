define(['FormControllerUtility', 'OLBConstants'], function (FormControllerUtility, OLBConstants) {

    return {

        /**
         * Method Invoked at FormPostShow to show pre login view
         */
        showPreLoginView: function() {
            var self = this;
            this.view.customheader.forceCloseHamburger();
            this.view.customheader.showPreLoginView();
            this.view.customheader.headermenu.btnLogout.onClick = function() {
                self.showConfirmationPopUp();
                self.destinationForm = "Login";
            };
            
        },
        
        /**
         * Method Invoked at FormPreShow
         */
        preShowOfEmbeddedForm: function() {
            var configurationManager = applicationManager.getConfigurationManager();
            var reDirectionURL = configurationManager.getOnBoardingAppDirectionURL();
            this.view.customIframe.webURL = reDirectionURL;
            this.hideConfirmationPopUp();
            this.destinationForm = "";
            // Breakpoint Changes
			var scopeObj = this;
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ["flxHeader", "flxScrollContent", "flxFooterContainer", "customheader"]);
            this.view.onBreakpointChange = function() {
                scopeObj.onBreakpointChange(kony.application.getCurrentBreakpoint());
            }
            this.view.customheader.topmenu.btnHamburger.skin = "btnHamburgerskn";
            this.view.customheader.topmenu.flxTransfersAndPay.skin = "slFbox";
            this.view.customheader.topmenu.flxContextualMenu.setVisibility(false);
            this.view.customheader.topmenu.flxaccounts.skin = "slFbox";
            this.view.customheader.forceCloseHamburger();
            this.view.flxConfirmationpopup.isModalContainer = true;
        },
		
		onBreakpointChange: function(width) {
            kony.print('on breakpoint change');
            this.view.customheader.onBreakpointChangeComponent(width);
			if (kony.application.getCurrentBreakpoint() === 640) {
				 this.view.customheader.lblHeaderMobile.text = "Origination";
			 }
        },

        /**
         * Method Invoked to show confirmation popup
         */
        showConfirmationPopUp: function() {
            this.view.flxConfirmationpopup.setVisibility(true);
			this.view.flxConfirmationpopup.confirmationPopUp.lblHeading.text = kony.i18n.getLocalizedString("i18n.common.close");
        },

        /**
         * Method Invoked to hide confirmation popup
         */
        hideConfirmationPopUp: function() {
            this.view.flxConfirmationpopup.setVisibility(false);
        },

        /**
         * Method Invoked to navigate to destination location when user confirmed.
         */
        onYesOfConfirmationPopup: function() {
            var destinationForm = this.destinationForm;
            switch(destinationForm) {
                case "Login": 
                    var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName": "AuthenticationMA","moduleName":"AuthUIModule"});
                    authModule.presentationController.showLoginScreen();
                    break;
                case "LocateUs" :
                    var locateUsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "appName": "AboutUsMA", "moduleName": "LocateUsUIModule" });
                    locateUsModule.presentationController.showLocateUsPage();
                    break;
                case "showFAQs":
                    var InformationContentModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "appName": "AboutUsMA", "moduleName": "InformationContentUIModule" });
                    InformationContentModule.presentationController.showFAQs();
                    break;
                case "TandC":
                    var termsAndConditionModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "appName": "AboutUsMA", "moduleName": "InformationContentUIModule" });
                    termsAndConditionModule.presentationController.showTermsAndConditions(OLBConstants.TNC_FLOW_TYPES.Footer_TnC);
                    break;
                case "ContactUs":
                    var InformationContentModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "appName": "AboutUsMA", "moduleName": "InformationContentUIModule" });
                    InformationContentModule.presentationController.showContactUsPage();
                    break;
                case "PrivacyPolicy":
                    var InformationContentModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "appName": "AboutUsMA", "moduleName": "InformationContentUIModule" });
                    InformationContentModule.presentationController.showPrivacyPolicyPage();
                    break;
                default:
                    kony.print("## Embedded Page:: Confirmation Popup: UnKnown Navigation Location");
            }
        }
    } 
});
