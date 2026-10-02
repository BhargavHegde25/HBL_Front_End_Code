function AS_AppEvents_h75216c7ed0846a290c700a6c09aa524(eventobject) {
    var self = this;
    var appSecurityKey = "{APP_SECURITY_KEY}";
    if (0) {
        var client = kony.sdk.getCurrentInstance();
        var response = client.setAppSecurityKey(appSecurityKey);
        if (response !== null && response === true) {
            kony.print("Custom security key is set successfully");
        } else {
            kony.print(response.errmsg + " and " + response.errcode);
        }
    }
    kony.print("Testing JS Load");
    document.body.removeAttribute("aria-live");
    document.body.removeAttribute("aria-relevant");
    document.body.removeAttribute("aria-atomic");
    _kony.mvc.initCompositeApp(true);
    var isIOS13 = (/(iPad|iPhone);.*CPU.*OS 13_\d/i).test(navigator.userAgent);
    if (isIOS13) {
        kony.application.setApplicationBehaviors({
            disableForceRepaint: true
        });
    }
    kony.application.setApplicationBehaviors({
        'rtlMirroringInWidgetPropertySetter': true,
        'fullWidgetHierarchy': true
    });
    require(["ArrangementsMA/StopPaymentsUIModule/frmStopPayments", "ArrangementsMA/StopPaymentsUIModule/frmStopPaymentsController"], function() {});
    var moduleName = 'ApplicationManager';
    require([moduleName, ], function(ApplicationManager) { applicationManager = ApplicationManager.getApplicationManager();
        applicationManager.defineSCAConfig(); 
        var config = applicationManager.getConfigurationManager(); 
        if (performance.navigation.type === 1) {   config.setBrowserRefreshProperty("true"); 
        } 
        var sm = applicationManager.getStorageManager(); 
        var langObjFromStorage = sm.getStoredItem("langObj"); 
        if (!kony.sdk.isNullOrUndefined(langObjFromStorage)) {   config.configurations.setItem("LOCALE", config.locale[langObjFromStorage.language]);   config.configurations.setItem('DATEFORMAT', config.frontendDateFormat[config.getLocale()]); 
        } else {   config.configurations.setItem("LOCALE", "en_US");   config.configurations.setItem('DATEFORMAT', config.frontendDateFormat["en_US"]);
        }
        kony.i18n.setCurrentLocaleAsync(config.configurations.getItem("LOCALE"), function() {}, function() {});
        applicationManager.getConfigurationManager().fetchApplicationProperties(function(res) {
            if (config.isAppPropertiesLoaded === "false") {
                config.setAppProperties("true");
                kony.application.dismissLoadingScreen();
            }
            // config.fetchClientSideConfigurations();
        }, function() {
            kony.application.dismissLoadingScreen();
        });
        document.body.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            alert(kony.i18n.getLocalizedString("i18n.general.rightclickdisabled"));
        });
    });
}