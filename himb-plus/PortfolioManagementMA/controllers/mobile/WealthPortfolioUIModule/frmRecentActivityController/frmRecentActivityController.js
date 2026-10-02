define({
    ActivityData: [],
    segData: [],

    init: function() {
        this.view.preShow = this.preShow;
        var scope = this;
        var navManager = applicationManager.getNavigationManager();
        var currentForm = navManager.getCurrentForm();
        applicationManager.getPresentationFormUtility().initCommonActions(this, "YES", currentForm);
    },
    initActions: function() {
        this.view.customHeader.flxBack.onClick = this.flxBackOnClick;

    },

    flxBackOnClick: function() {
       /* var navMan = applicationManager.getNavigationManager();
        navMan.goBack();*/
      new kony.mvc.Navigation({"appName" : "HomepageMA", "friendlyName" : "frmUnifiedDashboard"}).navigate();

    },
    preShow: function() {
        if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
            this.view.flxHeader.isVisible = true;
        } else {
            this.view.flxHeader.isVisible = false;
        }
        var navManager = applicationManager.getNavigationManager();
        var responseData = navManager.getCustomInfo("frmRecentActivity");
        this.initializeData(responseData.response);
        this.initActions();
    },
    initializeData: function(resData) {
        this.segData = resData.recentActivity;
       
        this.loadSegment();
    },

    loadSegment: function() {
        this.ActivityData = [];
        var data = [];
        data = this.segData;
      if(data.length == 0){
        this.view.flxError.setVisibility(true);
        this.view.flxRecentActivity.setVisibility(false);
      }
      else{
        for (var list in data) {
          this.view.flxError.setVisibility(false);
          this.view.flxRecentActivity.setVisibility(true);
            var storeData;
            var setTempleate = "flxWealthRecentActivity";
            if (this.ActivityData.length === data.length - 1)
                setTempleate = "flxWealthNBRecentActivity";
            if ((data[list].orderType).toUpperCase() === 'BUY') {
                storeData = {
                  lblActivityDetails: kony.i18n.getLocalizedString("i18n.wealth.youPurchased") + " " + data[list].quantity + " " + kony.i18n.getLocalizedString("i18n.wealth.youShared") + " " + data[list].description,
                  lblActivityTime: this.time_ago(data[list].tradeDate),
                template: setTempleate
                }
            } else {
              storeData = {
                    lblActivityDetails: kony.i18n.getLocalizedString("i18n.wealth.youSold") + " " + data[list].quantity  + " " + kony.i18n.getLocalizedString("i18n.wealth.youShared") + " " + data[list].description,
                    lblActivityTime: this.time_ago(data[list].tradeDate),
                    template: setTempleate
                }
            }
            this.ActivityData.push(storeData);
        }
        kony.print("Seg Data" + JSON.stringify(storeData));
        this.view.SegRecentActivity.widgetDataMap = {
            lblActivityDetails: "lblActivityDetails",
            lblActivityInstument: "lblActivityInstument",
            lblActivityTime: "lblActivityTime"
        }
        this.view.SegRecentActivity.removeAll();
        this.view.SegRecentActivity.setData(this.ActivityData);
    }
    },

    time_ago: function(time) {

        if (this.isBeforeToday(time) === true) {
            var forUtility = applicationManager.getFormatUtilManager();
            var tradeDateObj = forUtility.getDateObjectfromString(time);
            var formattedTradeDate = forUtility.getFormatedDateString(tradeDateObj, forUtility.getApplicationDateFormat());

            return formattedTradeDate;
        }

        switch (typeof time) {
            case 'number':
                break;
            case 'string':
                time = +new Date(time);
                break;
            case 'object':
                if (time.constructor === Date) time = time.getTime();
                break;
            default:
                time = +new Date();
        }
        var time_formats = [
            [60, kony.i18n.getLocalizedString("i18n.wealth.seconds"), 1], // 60
            [120, kony.i18n.getLocalizedString("i18n.wealth.oneMinuteAgo"), kony.i18n.getLocalizedString("i18n.wealth.oneMinuteFromNow")], // 60*2
            [3600, kony.i18n.getLocalizedString("i18n.wealth.minutes"), 60], // 60*60, 60
            [7200, kony.i18n.getLocalizedString("i18n.wealth.oneHourAgo"), kony.i18n.getLocalizedString("i18n.wealth.oneHourFromNow")], // 60*60*2
            [86400, kony.i18n.getLocalizedString("i18n.wealth.hours"), 3600]
        ];
        var seconds = (+new Date() - time) / 1000,
            token = kony.i18n.getLocalizedString("i18n.wealth.ago"),
            list_choice = 1;

        if (seconds == 0) {
            return kony.i18n.getLocalizedString("i18n.wealth.justNow")
        }
        if (seconds < 0) {
            seconds = Math.abs(seconds);
            token = kony.i18n.getLocalizedString("i18n.wealth.fromNow");
            list_choice = 2;
        }

        var i = 0,
            format;
        while (format = time_formats[i++])
            if (seconds < format[0]) {
                if (typeof format[2] == 'string')
                    return format[list_choice];
                else
                    return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
            }
        return time;
    },
    isBeforeToday: function(date) {
        var timestamp = new Date().getTime() - (1 * 24 * 60 * 60 * 1000);
        var otherDate = new Date(date).getTime()
        if (otherDate < timestamp)
            return true;
        else
            return false;
    },



});