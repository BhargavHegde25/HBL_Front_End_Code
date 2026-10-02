define({ 

 //Type your controller code here 
init: function(){
     try{
	var currentForm = kony.application.getCurrentForm().id;
     applicationManager.getPresentationFormUtility().initCommonActions(this, "YES", currentForm);
     var configManager = applicationManager.getConfigurationManager();
     }catch(e){
//    kony.print("***************Error in HBL Dashboard init function**********"+e);
     }
    },
preShow: function () {
        var userObj = applicationManager.getUserPreferencesManager();
        if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
        if (userObj.isUserLoggedin() === true) {
            this.view.enabledForIdleTimeout = true;
        } else {
            this.view.enabledForIdleTimeout = false;
        }
        }
            this.view.customHeader.flxBack.onClick = this.backButtonOnClick;
            this.view.customHeader.btnRight.onClick = this.cancelButtonClick;
            this.setTitleBarVisibility();
            this.defaultScreen();
            //this.ExchangerateTable();
            this.commonWidgetDataMap();
            this.updateFormUI();
            },

backButtonOnClick: function() {
    var navManager = applicationManager.getNavigationManager();
        navManager.navigateTo("frmSupport");
},
cancelButtonClick: function() {
    var navManager = applicationManager.getNavigationManager();
    navManager.navigateTo({
      "appName":"AuthenticationMA",
      "friendlyName":"frmLogin"
    });
},
defaultScreen: function(){
    var navManager = applicationManager.getNavigationManager();
    var respone = navManager.getCustomInfo("frmExchangeRateTableScreen");
    var result=this.convertToFormattedDate(respone[0].currentWorkingDate);
    this.view.lbldateNTime.text=result; 
},
ExchangerateTable: function(){
    var param={
    "companyCode": "NP0010001",
    "market": "10 1"
}
var presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
    moduleName: "InformationUIModule",
    appName: "AboutUsMA"
}).presentationController;
presenter.exchangerateFunction(param);
},
 convertToFormattedDate:function(dateStr) {
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
    var formattedDate = month + " " + formattedDay + ", " + year + " " + formattedTime;
    return formattedDate;
},

updateFormUI:function(){
    var navManager = applicationManager.getNavigationManager();
    var updatefrm =navManager.getCustomInfo("frmExchangeRate");
    if(updatefrm!=undefined){
        this.segExchange(updatefrm);
    }
},
commonWidgetDataMap: function(){
      this.view.samplesegment.widgetDataMap = {
            // header 
            "lblHeader": "lblHeader",
            // Row 
            "lblbuyingcash": "lblbuyingcash",
            "lblbuyingTc": "lblbuyingTc",
            "lblsellingCash": "lblsellingCash",
			"lblsellingTc": "lblsellingTc"
			}
			},

segExchange: function(response) {
                try {
                    if (!response || !response.Currencies || !Array.isArray(response.Currencies)) {
                        throw new Error("Invalid response format");
                    }
            
                    var section = [];
            
                    for (var i = 0; i < response.Currencies.length; i++) {
                        var currency = response.Currencies[i];
            
                        var markets;
                        try {
                            markets = JSON.parse(currency.markets);
                        } catch (e) {
                            kony.print("Error parsing 'markets' for currency: " + currency.code + " - " + e);
                            continue;
                        }
            
                        // Get market with currencyMarket = "10" for Cash
                        var cashMarket = markets.find(function(m) {
                            return String(m.currencyMarket) === "10";
                        });
                        // Get market with currencyMarket = "1" for TC
                        var tcMarket = markets.find(function(m) {
                            return String(m.currencyMarket) === "1";
                        });
            
                            var record = {
                            lblHeader: { text: "1 " + (currency.code || "Unknown") + " in NPR" },
                            lblbuyingcash: { text: (cashMarket && cashMarket.buyRate) ? cashMarket.buyRate : "N/A" },
                            lblsellingCash: { text: (cashMarket && cashMarket.sellRate) ? cashMarket.sellRate : "N/A" },
                            lblbuyingTc: { text: (tcMarket && tcMarket.buyRate) ? tcMarket.buyRate : "N/A" },
                            lblsellingTc: { text: (tcMarket && tcMarket.sellRate) ? tcMarket.sellRate : "N/A" }
                            };
                            section.push(record);
                    }
            
                    if (section.length === 0) {
                        this.view.samplesegment.setData([]);
                        this.view.lblNoData.isVisible = true;
                        kony.print("No market data available.");
                    } else {
                        this.view.samplesegment.setData(section);
                        this.view.lblNoData.isVisible = false;
                    }
            
                } catch (e) {
                    kony.print("******** Error in segExchange() ******** " + e.message);
                } finally {
                    applicationManager.getPresentationUtility().dismissLoadingScreen();
                }
            },
            
setTitleBarVisibility: function () {
                if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
                    this.view.flxHeader.isVisible = true;
                    this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("i18n.Exchangerate.HeaderName");
                    this.view.customHeader.imgBack.src = "backbutton.png";
                } else {
                    this.view.flxHeader.isVisible = false;
                    this.view.title = kony.i18n.getLocalizedString("i18n.Exchangerate.HeaderName");
                    this.view.flxScrollMainContainer.top = "0dp";
                   
                }
            },
            
 });