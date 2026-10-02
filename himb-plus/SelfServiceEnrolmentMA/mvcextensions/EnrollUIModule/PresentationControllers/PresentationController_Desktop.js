define([], function() {
    /**
     * User defined presentation controller
     * @constructor
     * @extends kony.mvc.Presentation.BasePresenter
     */
    function PresentationController() {
        kony.mvc.Presentation.BasePresenter.call(this);
    }

    inheritsFrom(PresentationController, kony.mvc.Presentation.BasePresenter);
 PresentationController.prototype.initializePresentationController = function() {
    };
   PresentationController.prototype.showLocateUsPage = function() {
		const configManager = applicationManager.getConfigurationManager();
        const isAboutUsMAPresent = configManager.isMicroAppPresent('AboutUsMA');
        if (isAboutUsMAPresent) {
            let locateUsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                appName: "AboutUsMA",
                moduleName: "LocateUsUIModule"
            });
            locateUsModule.presentationController.showLocateUsPage();
        }
    };
	PresentationController.prototype.showOnlineHelp = function(params) {
		const configManager = applicationManager.getConfigurationManager();
        const isAboutUsMAPresent = configManager.isMicroAppPresent('AboutUsMA');
        if (isAboutUsMAPresent) {
            let locateUsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                appName: "AboutUsMA",
                moduleName: "InformationContentUIModule"
            });
            locateUsModule.presentationController.showFAQs();
        }
    };
	PresentationController.prototype.showContactUsPage = function(params) {
		const configManager = applicationManager.getConfigurationManager();
        const isAboutUsMAPresent = configManager.isMicroAppPresent('AboutUsMA');
        if (isAboutUsMAPresent) {
            let locateUsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                appName: "AboutUsMA",
                moduleName: "InformationContentUIModule"
            });
            locateUsModule.presentationController.showContactUsPage();
        }
    };
	PresentationController.prototype.showPrivacyPolicyPage = function(params) {
		const configManager = applicationManager.getConfigurationManager();
        const isAboutUsMAPresent = configManager.isMicroAppPresent('AboutUsMA');
        if (isAboutUsMAPresent) {
            let locateUsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                appName: "AboutUsMA",
                moduleName: "InformationContentUIModule"
            });
            locateUsModule.presentationController.showPrivacyPolicyPage();
        }
     };
	PresentationController.prototype.showTermsAndConditions = function(params) {
		const configManager = applicationManager.getConfigurationManager();
        const isAboutUsMAPresent = configManager.isMicroAppPresent('AboutUsMA');
        if (isAboutUsMAPresent) {
            let locateUsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                appName: "AboutUsMA",
                moduleName: "InformationContentUIModule"
            });
            locateUsModule.presentationController.showTermsAndConditions(OLBConstants.TNC_FLOW_TYPES.Footer_TnC);
        }
    };
    return PresentationController;
});