define(['FormControllerUtility'], function(FormControllerUtility) {
    var orientationHandler = new OrientationHandler();
    var preLoginFlag = false;
    return {
        init: function() {
            this.view.onBreakpointChange = this.onBreakpointChange;
            this.presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ForeignExchangeUIModule").presentationController;
        },
        updateFormUI: function(viewModel) {
            if (viewModel.isLoading === true) {
                FormControllerUtility.showProgressBar(this.view);
            } else if (viewModel.isLoading === false) {
                FormControllerUtility.hideProgressBar(this.view);
            }
            if (viewModel.dashBoradCurrencySuccess) {
                kony.application.dismissLoadingScreen();
                this.view.flxDowntimeWarning.setVisibility(false);
                if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                    this.setDashboardSegmentResValue(viewModel.dashBoradCurrencySuccess);
                } else {
                    this.setDashboardSegmentValue(viewModel.dashBoradCurrencySuccess);
                }
            }
            if (viewModel.dashBoardError) {
                this.view.flxDowntimeWarning.setVisibility(true);
                this.view.rtxDowntimeWarning.text = "Please Try Again Later";
            }
            if (viewModel.getCurrentTimeSuccess) {
                var result=this.convertToFormattedDate(viewModel.getCurrentTimeSuccess.date[0].currentWorkingDate);
                this.view.lblContentDate.text =  result;
            }
        },
        convertToFormattedDate: function(dateStr){
            var date = new Date(dateStr + "T00:00:00"); // Original date
            var now = new Date(); // Get current device time
        
            var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        
            var day = date.getDate();
            var month = months[date.getMonth()];
            var year = date.getFullYear();
        
            // Pad day with 0 if it's a single digit
            var formattedDay = day < 10 ? "0" + day : day;
        
            // Get device time in hh:mm AM/PM format
            var hours = now.getHours();
            var minutes = now.getMinutes();
            var ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12; // hour '0' should be '12'
            minutes = minutes < 10 ? '0' + minutes : minutes;
            var formattedTime = hours + ":" + minutes + ampm;
            var formattedDate = "Date: " + month + " " + formattedDay + ", " + year + " " + formattedTime;
            return formattedDate;
        },
        preShow: function() {
            var scope = this;
            scope.view.CustomFooterMain.top = "50dp";
            if (typeof window !== "undefined") {
                window.addEventListener("resize", function() {
                    
                         if(kony.application.getCurrentBreakpoint() > 1366){
                            scope.view.CustomFooterMain.top = "20dp";
                         }
                         else scope.view.CustomFooterMain.top = "50dp";
                   
                }.bind(this));
            }
            if(kony.application.getCurrentBreakpoint() <= 640 ) {
                        scope.view.CustomFooterMain.lblCopyright.top = "0px";
                        scope.view.CustomFooterMain.height = "230px";
            }
             if (kony.os.deviceInfo().screenWidth > 640) {
                this.view.flxFormContent.layoutType = kony.flex.FLOW_VERTICAL;
                scope.view.CustomFooterMain.height = "120px";
                scope.view.CustomFooterMain.lblCopyright.top = "50px";
                this.view.CustomFooterMain.btnContactUs.left = "20px";
                
            }
            scope.getDashboardCurrency();
            scope.getCurrentTime();
        },
        getCurrentTime: function() {
            preLoginFlag = false;
            if (applicationManager.getUserPreferencesManager().isLoggedIn != true) {
                preLoginFlag = true;
            }
            var ExchangeActivitiesPresenter = applicationManager.getModulesPresentationController({
                "appName": "ForeignExchangeMA",
                "moduleName": "ForeignExchangeUIModule"
            });
            ExchangeActivitiesPresenter.getCurrentTimeDetail(preLoginFlag);
        },
        getDashboardCurrency: function() {
            // var param = {
            //     "baseCurrencyCode": "NPR",
            //     "market": "10 1",
            //     "companyCode": "NP0010001"
            // }
            this.view.flxTcMidReveal.setVisibility(false);
            this.view.flxCashMidReveal.setVisibility(false);
            this.view.flxCashSelling.width= "50%";
            this.view.flxCashBuying.width= "50%";
            this.view.flxTcBuying.width ="50%";
            this.view.flxTcSelling.width ="50%";
            preLoginFlag = false;
            if (applicationManager.getUserPreferencesManager().isLoggedIn != true) {
                preLoginFlag = true;
            }
            var ExchangeActivitiesPresenter = applicationManager.getModulesPresentationController({
                "appName": "ForeignExchangeMA",
                "moduleName": "ForeignExchangeUIModule"
            });
            ExchangeActivitiesPresenter.fetchCurrencyCode(preLoginFlag);
        },
        setDashboardSegmentValue: function(data) {
            var dataMap = {
                "flxExchangeRateList": "flxExchangeRateList",
                "flxCurrency": "flxCurrency",
                "flxUnit": "flxUnit",
                "flxCash": "flxCash",
                "flxTC": "flxTC",
                "flxCash": "flxCash",
                "flxTC": "flxTC",
                "flxCash": "flxCash",
                "flxTC": "flxTC",
                "flxTcBuying": "flxTcBuying",
                "flxTcSelling": "flxTcSelling",
                "flxTcMixReveal": "flxTcMixReveal",
                "flxCashMixReveal":"flxCashMixReveal",
                "flxCashBuying":"flxCashBuying",
                "flxCashSelling":"flxCashSelling",
                "lblCurrency": "lblCurrency",
                "lblUnit": "lblUnit",
                "lblCashBuying": "lblCashBuying",
                "lblCashSelling": "lblCashSelling",
                "lblCashMixReveal": "lblCashMixReveal",
                "lblTcBuying": "lblTcBuying",
                "lblTcSelling": "lblTcSelling",
                "lblTcMixReveal": "lblTcMixReveal"
            }
            this.view.segExchangeRate.widgetDataMap = dataMap;
            this.view.segExchangeRate.rowTemplate = "flxExchangeRateList";
            if (preLoginFlag == true) {
                this.view.CustomFooterMain.btnLocateUs.setVisibility(true);
                this.view.CustomFooterMain.flxVBar1.setVisibility(true);
                this.view.customheadernew.flxMenuContainer.setVisibility(false);
                this.view.customheadernew.flxMessages.setVisibility(false);
                this.view.customheadernew.flxVerticalSeperator3.setVisibility(false);
                this.view.customheadernew.flxNotifications.setVisibility(false);
                this.view.customheadernew.flxUser.setVisibility(false);
                this.view.customheadernew.flxSeperator2.setVisibility(false);
                this.view.customheadernew.imgWarning.left = "15%";
                this.view.customheadernew.rtxWarning.text = "You haven't Signed in";
                this.view.customheadernew.flxWarning.right = "40px";
                this.view.customheadernew.flxWarning.setVisibility(true);
                this.view.customheadernew.imgLogout.setVisibility(true);
                this.view.flxFormContent.top = "70px";
                this.view.customheadernew.flxShadowContainer.top = "70px";
                this.view.customheadernew.imgLogout.src = "logout_new.png";
                this.view.customheadernew.imgLogout.width = "25px";
                this.view.customheadernew.imgLogout.height = "25px";
                this.view.customheadernew.btnLogout.onClick = function() {
                var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                    "appName": "AuthenticationMA",
                    "moduleName": "AuthUIModule"
                });
                authModule.presentationController.showLoginScreen();
                };
                this.view.customheadernew.btnLogout.setVisibility(true);
            } else {
                this.view.CustomFooterMain.btnLocateUs.setVisibility(true);
                this.view.CustomFooterMain.flxVBar1.setVisibility(true);
                this.view.customheadernew.flxMenuContainer.setVisibility(true);
                this.view.customheadernew.flxMessages.setVisibility(true);
                this.view.customheadernew.flxVerticalSeperator3.setVisibility(true);
                this.view.customheadernew.flxNotifications.setVisibility(true);
                this.view.customheadernew.flxUser.setVisibility(true);
                this.view.customheadernew.flxSeperator2.setVisibility(true);
                this.view.customheadernew.flxWarning.setVisibility(false);
                this.view.customheadernew.btnLogout.setVisibility(true);
                this.view.flxLogout.left = "0%";
                this.view.customheadernew.imgLogout.src = "logout_new.png";
                this.view.customheadernew.imgLogout.width = "36px";
                this.view.customheadernew.imgLogout.height = "36px";
                this.view.customheadernew.imgLogout.setVisibility(true);
                this.view.customheadernew.btnLogout.onClick = function() {
                    self.view.flxDialogs.setVisibility(true);
                    srcButtonWidget = self.view.customheadernew.btnLogout;
                    self.view.CustomPopup.lblHeading.text = kony.i18n.getLocalizedString("i18n.common.logout");
                    self.view.CustomPopup.lblPopupMessage.text = kony.i18n.getLocalizedString("i18n.common.LogoutMsg");
                    self.view.CustomPopup.accessibilityConfig = {
                        "a11yARIA": {
                            "role": "dialog",
                            tabindex: -1,
                    }
                }
                self.view.CustomPopup.lblHeading.setActive(true);
            };
            this.view.CustomPopup.flxCross.accessibilityConfig = {
                a11yLabel: "Close the sign out dialog",
                a11yARIA: {
                    tabindex: 0,
                    role: "button"
                }
            };
            this.view.CustomPopup.btnNo.accessibilityConfig = {
                a11yLabel: "No, stay signed in",
                a11yARIA: {
                    tabindex: 0,
                    role: "button"
                }
            };
            this.view.CustomPopup.btnYes.accessibilityConfig = {
                a11yLabel: "Yes, sign me out",
                a11yARIA: {
                    tabindex: 0,
                    role: "button"
                }
            };
            this.view.CustomPopup.btnYes.onClick = function() {
                var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                    "appName": "AuthenticationMA",
                    "moduleName": "AuthUIModule"
                });
                var context = {
                    "action": "Logout"
                };
                authModule.presentationController.doLogout(context);
                self.view.flxDialogs.setVisibility(false);
            };
            this.view.CustomPopup.btnNo.onClick = function() {
                self.view.flxDialogs.setVisibility(false);
                if (srcButtonWidget !== "") srcButtonWidget.setActive(true);
                srcButtonWidget = "";
            };
            this.view.CustomPopup.flxCross.onClick = function() {
                self.view.flxDialogs.setVisibility(false);
                if (srcButtonWidget !== "") srcButtonWidget.setActive(true);
                srcButtonWidget = "";
            }; 
            }
            var response = [];
            for (var i = 0; i < data.Currencies.length; i++) {
                if (preLoginFlag == true) {
                    data.Currencies[i].markets = JSON.parse(data.Currencies[i].markets);
                }
                var param = {
                    "flxExchangeRateList": {
                        "skin": "sknSegBgFCF9F9"
                    },
                    "lblUnit": "1",
                    "lblCurrency": data.Currencies[i].code,
                    "lblCashBuying": (data.Currencies[i].markets[0] == "TT" || data.Currencies[i].markets[0].currencyMarket == 10) ? parseFloat(data.Currencies[i].markets[0].buyRate).toFixed(2) : parseFloat(data.Currencies[i].markets[1].buyRate).toFixed(2),
                    "lblCashSelling": (data.Currencies[i].markets[0] == "TT" || data.Currencies[i].markets[0].currencyMarket == 10) ? parseFloat(data.Currencies[i].markets[0].sellRate).toFixed(2) : parseFloat(data.Currencies[i].markets[0].sellRate).toFixed(2),
                    "lblCashMixReveal": (data.Currencies[i].markets[0] == "TT" || data.Currencies[i].markets[0].currencyMarket == 10) ? parseFloat(data.Currencies[i].markets[0].midRevalRate).toFixed(2) : parseFloat(data.Currencies[i].markets[1].midRevalRate).toFixed(2) ,
                    "lblTcSelling": (data.Currencies[i].markets[0] == "Currency" ||  data.Currencies[i].markets[0].currencyMarket == 1) ? parseFloat(data.Currencies[i].markets[1].sellRate).toFixed(2)  : parseFloat(data.Currencies[i].markets[0].sellRate).toFixed(2) ,
                    "lblTcBuying": (data.Currencies[i].markets[0] == "Currency" || data.Currencies[i].markets[0].currencyMarket == 1) ? parseFloat(data.Currencies[i].markets[1].buyRate).toFixed(2)  : parseFloat(data.Currencies[i].markets[0].buyRate).toFixed(2) ,
                    "lblTcMixReveal": (data.Currencies[i].markets[0] == "Currency" || data.Currencies[i].markets[0].currencyMarket == 1) ? parseFloat(data.Currencies[i].markets[1].midRevalRate).toFixed(2)  : parseFloat(data.Currencies[i].markets[0].midRevalRate).toFixed(2) ,
                    // "lblTcSelling": (data.Currencies[i].markets[0] == "TT" || data.Currencies[i].markets[0].currencyMarket == 10) ? parseFloat(data.Currencies[i].markets[0].sellRate).toFixed(2) : parseFloat(data.Currencies[i].markets[0].sellRate).toFixed(2),
                    // "lblTcBuying": (data.Currencies[i].markets[0] == "TT" || data.Currencies[i].markets[0].currencyMarket == 10) ? parseFloat(data.Currencies[i].markets[0].buyRate).toFixed(2) : parseFloat(data.Currencies[i].markets[1].buyRate).toFixed(2),
                    // "lblTcMixReveal": (data.Currencies[i].markets[0] == "TT" || data.Currencies[i].markets[0].currencyMarket == 10) ? parseFloat(data.Currencies[i].markets[0].midRevalRate).toFixed(2) : parseFloat(data.Currencies[i].markets[1].midRevalRate).toFixed(2) ,
                    // "lblCashBuying": (data.Currencies[i].markets[0] == "Currency" || data.Currencies[i].markets[0].currencyMarket == 1) ? parseFloat(data.Currencies[i].markets[1].buyRate).toFixed(2)  : parseFloat(data.Currencies[i].markets[0].buyRate).toFixed(2) ,
                    // "lblCashSelling": (data.Currencies[i].markets[0] == "Currency" || data.Currencies[i].markets[0].currencyMarket == 1) ? parseFloat(data.Currencies[i].markets[1].sellRate).toFixed(2)  : parseFloat(data.Currencies[i].markets[0].sellRate).toFixed(2) ,
                    // "lblCashMixReveal": (data.Currencies[i].markets[0] == "Currency" || data.Currencies[i].markets[0].currencyMarket == 1) ? parseFloat(data.Currencies[i].markets[1].midRevalRate).toFixed(2)  : parseFloat(data.Currencies[i].markets[0].midRevalRate).toFixed(2) ,
                    "flxTcMixReveal":{
                        "isVisible": false
                    },
                    "flxTcSelling":{
                        "width":"50%"
                    },
                    "flxTcBuying":{
                        "width":"50%"
                    },
                    "flxCashSelling":{
                        "width":"50%"
                    },
                    "flxCashBuying":{
                        "width":"50%"
                    },
                    "flxCashMixReveal":{
                        "isVisible": false
                    }
                }
                response.push(param);
            }
            this.view.segExchangeRate.setData(response);
        },
        setDashboardSegmentResValue: function(data) {
            var dataMap = {
                "flxExchangegeRateRes": "flxExchangegeRateRes",
                "flxCurrency": "flxCurrency",
                "flxRow1": "flxRow1",
                "flxRow11": "flxRow11",
                "flx1Row": "flx1Row",
                "flxBuying": "flxBuying",
                "flxSelling": "flxSelling",
                "flxMidReveal": "flxMidReveal",
                "flxCashCol": "flxCashCol",
                "flxCash1": "flxCash1",
                "flxCashBuying1": "flxCashBuying1",
                "flxCashBuying2": "flxCashBuying2",
                "flxCashBuying3": "flxCashBuying3",
                "flxTcBuying": "flxTcBuying",
                "flxTC": "flxTC",
                "flxTcBuying1": "flxTcBuying1",
                "flxTcBuying2": "flxTcBuying2",
                "flxTcBuying3": "flxTcBuying3",
                "lblCurrency": "lblCurrency",
                "lblBuying": "lblBuying",
                "lblSelling": "lblSelling",
                "lblMidReveal": "lblMidReveal",
                "lblCashBuying1": "lblCashBuying1",
                "lblCashBuying2": "lblCashBuying2",
                "lblCashBuying3": "lblCashBuying3",
                "lblCashMixReveal": "lblCashMixReveal",
                "lblTcBuying": "lblTcBuying",
                "lblTcSelling": "lblTcSelling",
                "lblTcMixReveal": "lblTcMixReveal",
                "lblTcBuying1": "lblTcBuying1",
                "lblTcBuying2": "lblTcBuying2",
                "lblTcBuying3": "lblTcBuying3"
            }
            this.view.segExchangeRes.widgetDataMap = dataMap;
            this.view.segExchangeRes.rowTemplate = "flxExchangegeRateRes";
            var response = [];
            for (var i = 0; i < data.Currencies.length; i++) {
                var param = {
                    "flxExchangegeRateRes": {
                        "skin": "sknSegBgFCF9F9",
                        "top": "20px"
                    },
                    "lblCurrency": data.Currencies[i].code,
                    "lblTcBuying1": data.Currencies[i].markets[0].sellRate,
                    "lblTcBuying2": data.Currencies[i].markets[0].buyRate,
                    "lblTcBuying3": data.Currencies[i].markets[0].midRevalRate,
                    "lblCashBuying1": data.Currencies[i].markets[1].buyRate,
                    "lblCashBuying2": data.Currencies[i].markets[1].sellRate,
                    "lblCashBuying3": data.Currencies[i].markets[1].midRevalRate
                }
                response.push(param);
            }
            this.view.segExchangeRes.setData(response);
        }
    }
 });