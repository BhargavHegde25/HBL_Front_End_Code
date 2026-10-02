define(function(){ 
      return {
        urlWeb: "",
        responseView:"",
        init: function() {
            var navManager = applicationManager.getNavigationManager();
            var currentForm = navManager.getCurrentForm();
            applicationManager.getPresentationFormUtility().initCommonActions(this, "YES", currentForm);
            this.view.preShow = this.preShow;
            //this.MyKonyExtension = java.import("com.example.newweb.MainView");
        },
        onNavigate: function(uidata) {
            try {
                var navManager = applicationManager.getNavigationManager();
                if(uidata.appCode){
                    return;
                    }
                if (uidata.formFieldsURL) {
                    var getResponse = applicationManager.getNavigationManager().getCustomInfo("Biller_Code");
                    if (!kony.sdk.isNullOrUndefined(getResponse)) {
                        var appendCode = getResponse.code;
                    }
                    var url = uidata.formFieldsURL;
                    url = url + appendCode;
                    var urlConf = {
                        URL: url,
                        requestMethod: constants.BROWSER_REQUEST_METHOD_GET
                    };
                    this.resetUI();
                    if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
                    this.broswerSetUrl(urlConf);
                    }else{
                        this.browserAndroidUrl(urlConf)
                    }
                }
            } catch (err) {
                kony.print("onNavigate" + err);
            }
        },
        preShow: function() {
            try {
                var scope = this;
                applicationManager.getPresentationUtility().dismissLoadingScreen();
                if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
                    this.view.flxHeader.isVisible = false;
                } else {
                    this.view.flxHeader.isVisible = true;
                }
                this.view.customHeader.flxBack.onClick = function() {
                    scope.onBackClick();
                };
                this.toggleCheckBox();
                this.view.btnContinue.onClick = function() {
                    scope.btnClick();
                }.bind(this);
                this.view.btnTandC.onClick = function() {
                    scope.getTermsandConditions();
                }.bind(this);
                this.view.customHeader.btnRight.onClick = function() {
                    scope.onCancelClick();
                }.bind(this);
                this.view.btnVerify.onClick = function(){
                    scope.onBackClick();
                }.bind(this);
                // this.view.browserBillPay.onPageStarted =scope.onPageStartedCallback;
                // this.view.browserBillPay.onPageFinished =scope.pageFinishedCallback;
                // this.view.browserBillPay.onProgressChanged = scope.onProgressChangedCallback;
                // this.view.browserBillPay.onReceive = scope.onReceiveCallback;
                // this.view.browserBillPay.onSuccess = scope.onSuccessCallback;
                // window.addEventListener('load', scope.handleIframeMessage);
                // window.addEventListener('message', scope.handleIframeMessage);
                //this.view.browserBillPay.onPageFinished =scope.addEventListeners;
                //setTimeout(this.addeventListeners, 100);
            } catch (err) {
                kony.print("preShow" + err);
            }
        },
        onCancelClick: function() {
            applicationManager.setBillPayFlow = "onCancel";
            this.view.flxBrowser.isVisible = false;
            this.view.flxDynamic.isVisible = true;
            var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
            billPayMod.presentationController.onCancelClick();
        },
  resetUI: function(){
     var scope = this;
     scope.view.imgChkBx.src = "hbluncheck.png";
     scope.view.btnContinue.skin = "sknBtnOnBoardingInactive";
     scope.view.btnVerify.skin ="sknBtnOnBoardingInactive";
        },
        toggleCheckBox: function() {
            try {
                var scope = this;
                this.view.flxCheck.onClick = function() {
                    if (scope.view.imgChkBx.src === "hbluncheck.png") {
                        scope.view.imgChkBx.src = "checkbox_ticked.png";
                        scope.view.btnContinue.setEnabled(true);
                        scope.view.btnContinue.skin = "sknBtn004B9526pxFocus";
                        scope.view.btnVerify.skin ="sknBtnBgTransparentFtBr";
                    } else {
                        scope.view.imgChkBx.src = "hbluncheck.png";
                        scope.view.btnContinue.setEnabled(false);
                        scope.view.btnContinue.skin = "sknBtnOnBoardingInactive";
                       scope.view.btnVerify.skin ="sknBtnOnBoardingInactive";
                    }
                };
            } catch (err) {
                kony.print("toggleCheckBox" + err);
            }
        },
        onBackClick: function() {
            var navManager = applicationManager.getNavigationManager();
            /*navManager.setCustomInfo("previousForm", "frmBillPaySubCategory");
            applicationManager.setBillPayFlow = "onCancel";
            var data = navManager.setCustomInfo("backSubCategory");
            this.view.flxBrowser.isVisible = false;
            this.view.flxDynamic.isVisible = true;
            var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
            billPayMod.presentationController.getCategories(data);*/
            navManager.goBack();
        },
        btnClick: function() {
            try {
                if (this.view.imgChkBx.src === "checkbox_ticked.png") {
                   this.broswerSet();
                }
            } catch (err) {
                kony.print("btnClick" + err);
            }
        },
        browserAndroidUrl: function(urlConf){
       var scope =this;
        this.urlWeb = urlConf.URL;
                var urlConfs = {
    URL: this.urlWeb,
    requestMethod: constants.BROWSER_REQUEST_METHOD_GET,
                };
                scope.NCTest();
                 scope.addNativeWebView();
        },

        NCTest: function() {
           // this.MyKonyExtension = java.import("com.example.newweb.MainView");
            this.MyKonyExtension = java.import("com.example.browserview.MainView");
            this.KonyMain = java.import("com.konylabs.android.KonyMain");
            this.konyContext = this.KonyMain.getActivityContext();
            this.layoutView = java.import("android.widget.LinearLayout");
            this.viewGroup = java.import("android.view.ViewGroup");
            this.eventObject = null;
        },
        addNativeWebView: function(){
            try{
            var scope =this;
            this.linearLayout = new this.layoutView(this.konyContext);
            this.linearLayout.setLayoutParams(new this.viewGroup.LayoutParams(this.viewGroup.LayoutParams.MATCH_PARENT, this.viewGroup.LayoutParams.MATCH_PARENT));
            this.linearLayout.setId(1234);
            var parentView = this.linearLayout.getLayoutParams();
            scope.addNativeWebViewAndroid(parentView);
            }catch(err){
                kony.print("addNativeWebView"+ err);
            }
        },
        addNativeWebViewAndroid: function(parentView) {
            this.MyKonyExtension.invokeBrowser(this.navConfirmPage, this.urlWeb);
        },
        broswerSet: function() {
            try {
                var name;
                if (kony.os.deviceInfo().name === "android") {
                    name = "Android";
                } else {
                    name = "IOS";
                }
                var params = {
                    "channelName": "mobile",
                    "platform": name
                };
                var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
                billPayMod.presentationController.getNPSBillerDetails(params);
                 
            } catch (err) {
                kony.print("broswerSet" + err);
            }
        },
        broswerSetUrl: function(urlConf) {
            try {
                var scope= this;
                scope.view.imgChkBx.src ="hbluncheck.png";
                scope.view.btnContinue.skin = "sknBtnOnBoardingInactive";
                scope.view.btnVerify.skin ="sknBtnOnBoardingInactive";
                scope.urlWeb = urlConf.URL;
         var myURLManagerMain = objc.import("MyPaymentUrlFramework");
       var  networkInstance  = myURLManagerMain.alloc().jsinit();  
        kony.print("--2-networkInstance--"+networkInstance);
        kony.print("--3-networkInstance--"+Object.keys(networkInstance));
      var  urlString=scope.urlWeb;
         networkInstance.loadURLCallback(urlString,scope.navConfirmPage);
         } catch (err) {
                kony.print("broswerSetUrl" + err);
            }
        },
        urlCallBack: function(response){
            var scope =this;
        scope.view.lblResponseBack.text =response;
        scope.responseView =response;
       if(!kony.sdk.isNullOrUndefined(scope.view.lblResponseBack.text)){
        scope.navConfirmPage(scope.responseView);
        }
        },
        navConfirmPage: function(payload){
            try{
      var merchantPayload = JSON.parse(payload);
                if (merchantPayload.type === "submit_form_payload") {
                    payload = merchantPayload.data;
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
            }catch(err){
                kony.print("navConfirmPage"+err);
            }
        },
        getTermsandConditions: function() {
            try {
                var config = applicationManager.getConfigurationManager();
                var locale = kony.i18n.getCurrentLocale();
                var termsAndConditions = config.getTermsAndConditions();
                var param = {
                    "languageCode": locale,
                    "termsAndConditionsCode": "BillPay_Activation_TnC"
                };
                var termsAndConditions = applicationManager.getTermsAndConditionsManager();
                termsAndConditions.fetchTermsAndConditionsPostLogin(param, this.getTermsandConditionsSuccessCallBack, this.getTermsandConditionsErrorCallback);
            } catch (err) {
                kony.print("getTermsAndConditions" + err);
            }
        },
        getTermsandConditionsSuccessCallBack: function(data) {
            try {
                var config = applicationManager.getConfigurationManager();
                var navManager = applicationManager.getNavigationManager();
                navManager.setCustomInfo("getTandC", {
                    "richTextData": "<font face='SourceSansPro-Regular' >" + data.termsAndConditionsContent,
                    "flowType": "AccountAggregation",
                    "contentTypeID": data.contentTypeId,
                    "header": config.constants.TERMS
                });
                //navManager.setCustomInfo("getTandC", data);
                var enrollMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                    "moduleName": "EnrollUIModule",
                    "appName": "SelfServiceEnrolmentMA"
                });
                var enrollMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager()
            .getModule({"moduleName" : "EnrollUIModule", "appName": "SelfServiceEnrolmentMA"});
            navManager.navigateTo({"appName": "SelfServiceEnrolmentMA",
              "friendlyName": "frmEnrollSupport"});
            } catch (err) {
                kony.print("getTermsandConditionsSuccessCallBack" + err);
            }
        },
        getTermsandConditionsErrorCallback: function() {},
    };
});