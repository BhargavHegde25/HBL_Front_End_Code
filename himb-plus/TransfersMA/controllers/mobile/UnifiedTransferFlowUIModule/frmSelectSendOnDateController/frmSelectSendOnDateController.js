define({
  freq: '',
  formatToDisplay: "",
  sendOnDate: "",
  dateFormat: "m/d/Y",
  highlightedDate: "",
  init: function () {
    var scope = this;
    var currentFormObject = kony.application.getCurrentForm();
    var currentForm = currentFormObject.id;
    applicationManager.getPresentationFormUtility().initCommonActions(this, "CALLBACK", currentForm, scope.navigateCustomBack);
  },
  navigateCustomBack: function () {
    // var transMod = applicationManager.getModulesPresentationController({ "moduleName": "TransferEuropeUIModule", "appName": "TransfersMA" });
    // transMod.commonFunctionForgoBack();
    applicationManager.getNavigationManager().navigateTo({
      "appName": "TransfersMA",
      "friendlyName": "UnifiedTransferFlowUIModule/frmCreditCardBillPaymentReview"
    });
  },
  preShow: function () {
    try {
      var scope = this;
      var navMan = applicationManager.getNavigationManager();
      var reviewData = navMan.getCustomInfo("reviewDataFrmCreditCardBillPaymentReview");
      this.view.btnContinue.skin = "sknBtnOnBoardingInactive";
      this.view.customCalendar.selectedDate = "";
      if (kony.os.deviceInfo().name === "iPhone") {
        this.view.flxHeader.isVisible = false;
      }
      this.view.customCalendar.updateDateBullets = this.updateDateBullets.bind(this);
      this.formatToDisplay = "m/d/Y";
      this.view.customCalendar.preShow();
      if (this.view.customCalendar.selectedDate === '') {
        this.view.btnContinue.setEnabled(false);
        this.view.btnContinue.skin = "sknBtnOnBoardingInactive";
      } else {
        this.view.btnContinue.setEnabled(true);
        this.view.btnContinue.skin = "ICSknBtn003E7535PXmb";
      }
      this.initActions();
      var transMod = applicationManager.getModulesPresentationController({ "moduleName": "TransferEuropeUIModule", "appName": "TransfersMA" });
      // this.view.customCalendar.selectedDate = this.validateNdFormatToMDY(reviewData.formattedSendOnDate);
      this.view.customCalendar.selectedDate = "";
      // this.view.customCalendar.firstEnabledDate = '';
      // this.view.customCalendar.lastEnabledDate = '';

      this.sendOnDate = this.validateNdFormatToMDY(reviewData.formattedSendOnDate);
      // this.view.customCalendar.triggerContinueAction = true;
      // this.view.customCalendar.updateDateBullets();

      // this.view.customCalendar.setFirstEnabledDate();
      // this.view.customCalendar.setLastEnabledDate();
      var startdate = transMod.getTransObject();


      var navMan = applicationManager.getNavigationManager();
      // var data = navMan.getCustomInfo("frmSelectDate");
      this.freq = "Once";//(!kony.sdk.isNullOrUndefined(data)) ? data.freq : null;
      var currentBankDate = applicationManager.getNavigationManager().getCustomInfo("bankDates");
      currentBankDate = new Date(currentBankDate.currentWorkingDate).format("m/d/Y");
      var startDateFeed1 = currentBankDate;//(startDate.getMonth() + 1) + "/" + startDate.getDate() + "/" + startDate.getFullYear();//mm/dd/yyy
      scope.view.customCalendar.currentDate = startDateFeed1;
      this.view.customCalendar.setFirstEnabledDate(startDateFeed1);
      if (startdate.scheduledCalendarDate !== null && startdate.scheduledCalendarDate !== undefined && startdate.scheduledCalendarDate !== "") {
        this.setDateToCalendar(startdate.scheduledCalendarDate);
      } else if (startdate.scheduledDate !== null && startdate.scheduledDate !== undefined && startdate.scheduledDate !== "") {
        this.setDateToCalendar(startdate.scheduledDate);
      } else {
        this.setDateToCalendar(startDateFeed1);
      }
      if (this.freq === "Once" || startdate.frequencyType === "Once") {
        this.view.customHeader.lblLocateUs.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Transfers.sendDate");
        this.view.btnContinue.isVisible = true;
        this.view.customCalendar.triggerContinueAction = false;
      } else {
        this.view.customHeader.lblLocateUs.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Transfers.StartDate");
        this.view.btnContinue.isVisible = false;
        this.view.customCalendar.triggerContinueAction = true;
      }
      var selectedCreditCardDetails = applicationManager.getNavigationManager().getCustomInfo("selectedCreditCardDetails");
      var expDate = new Date(selectedCreditCardDetails.cardExpDate);
      expDate.setDate(expDate.getDate() + 1);
      var selectedCardExpDate = applicationManager.getFormatUtilManager().getFormatedDateString(expDate, "m/d/Y");
      this.view.customCalendar.setLastEnabledDate(selectedCardExpDate);//mm/dd/yyy
      // this.view.customCalendar.resetCal();
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      var navManager = applicationManager.getNavigationManager();
      var currentForm = navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().logFormName(currentForm);
    } catch (err) {
      var errObj = {
        "errorInfo": "Error in preShow.",
        "errorLevel": "",
        "error": err
      };
      this.onError(errObj);
    }
  },

  validateNdFormatToMDY: function (dateValue) {
    var dateObj = new Date(dateValue);
    if (!kony.sdk.util.isNullOrUndefinedOrEmptyObject(dateObj)) {
      if (isNaN(dateObj.getTime())) {
        var [day, month, year] = dateValue.split('/');
        return new Date(+year, +month - 1, +day).format("m/d/Y");
      } else return dateValue;
    } else return new Date();
  },
  initActions: function () {
    var scope = this;
    this.view.customHeader.flxBack.onClick = this.navigateCustomBack;
    this.view.btnContinue.onClick = this.continueAction;
    this.view.customHeader.btnRight.onClick = function () {
      scope.cancelOnClick();
    }
  },
  setDateToCalendar: function (dateString) {
    var forUtility = applicationManager.getFormatUtilManager();
    var configManager = applicationManager.getConfigurationManager();
    var scheduledDate = forUtility.getDateObjectFromCalendarString(dateString, configManager.getCalendarDateFormat());
    scheduledDate = forUtility.getFormattedSelectedDate(scheduledDate);
    this.view.customCalendar.selectedDate = "";
    this.view.customCalendar.setSelectedDate(scheduledDate);
  },
  cancelOnClick: function () {
    // var transMod = applicationManager.getModulesPresentationController({ "moduleName": "TransferEuropeUIModule", "appName": "TransfersMA" });
    // transMod.cancelCommon();
    applicationManager.getNavigationManager().navigateTo({
      "appName": "TransfersMA",
      "friendlyName": "UnifiedTransferFlowUIModule/frmCreditCardBillPaymentReview"
    });
  },
  continueAction: function () {
    var transMod = applicationManager.getModulesPresentationController({ "moduleName": "TransferEuropeUIModule", "appName": "TransfersMA" });
    var transObj = transMod.getTransObject();
    var navManager = applicationManager.getNavigationManager();

    //dummy cde start
    //      this.highlightedDate = this.businessController.getDateObjectFromCalendarString(selectedDate, this.dateFormat);
    //  for (var i = 0; i < dateLabels.length; i++) {
    //                     dateLabels[i].text = dummy[i];
    //                     dateLabels[i].skin = skin;//"ICSknLbl42424218PXmb"
    //                 }

    //                                 scope.currentBankDate = this.collectionObj["Collection"]["BankDate"][0]["currentWorkingDate"];
    //       var todaysDate = this.businessController.getFormattedDate(this.businessController.getDateObjectFromCalendarString(scope.currentBankDate, this.dateFormat));


    //dummy cde end

    if (this.freq === "Once" || transObj.frequencyType === "Once") {
      // if (transMod.isLoansAccountType && this.isSelectedDateGreaterThanDueDate()) {
      //  this.showCustomAlertMessage(); 
      // }
      // else {
      // transMod.processStartDate(this.view.customCalendar.getSelectedDate());
      // }  
      var convDateObj = new Date(this.highlightedDate);
      var formattedDate = "";
      if (isNaN(convDateObj.getTime())) {
        var [day, month, year] = this.highlightedDate.split('/');
        formattedDate = new Date(+year, +month - 1, +day);
      } else formattedDate = this.highlightedDate;


      var transactionManager = applicationManager.getTransactionManager();
      var previousForm = kony.application.getPreviousForm().id;
      var date1 = new Date();
      date1.setHours(0, 0, 0, 0);
      var date2 = new Date(formattedDate);
      date2.setHours(0, 0, 0, 0); // Setting the hours, minutes, seconds and milliseconds of selected send date and today's date so that they can be compared for equality.
      if (date1.getTime() !== date2.getTime()) // If transfer frequency is Once and the send date is equal to today's date, then the type of transaction is posted otherwise scheduled.
        transactionManager.setTransactionAttribute("isScheduled", "1");
      else transactionManager.setTransactionAttribute("isScheduled", "0");
      // formattedDate = applicationManager.getFormatUtilManager().getFormatedDateString(formattedDate, "m/d/Y");
      transactionManager.setTransactionAttribute("scheduledDate", formattedDate);
      transactionManager.setTransactionAttribute("formattedSendOnDate", formattedDate);
      transactionManager.setTransactionAttribute("scheduledCalendarDate", scope_TransfersPresentationController.convertCalendarDateToLocaleDate(formattedDate));
      navManager.setCustomInfo("isSendOnDateModified", true);
      navManager.navigateTo({
        "appName": "TransfersMA",
        "friendlyName": "UnifiedTransferFlowUIModule/frmCreditCardBillPaymentReview"
      });
    }
    else if (this.freq === "NofRR") {
      transMod.navigateToRecurrence(this.view.customCalendar.getSelectedDate());
    }
    else {
      // transMod.navigateToEndDate(this.view.customCalendar.getSelectedDate());
      navManager.setCustomInfo("selectedSendOnDate", tthis.view.customCalendar.getSelectedDate());
      navManager.navigateTo({
        "appName": "TransfersMA",
        "friendlyName": "UnifiedTransferFlowUIModule/frmCreditCardBillPaymentReview"
      });
    }
  },

  showCustomAlertMessage: function () {
    var scope = this;
    var transMod = applicationManager.getModulesPresentationController({ "moduleName": "TransferEuropeUIModule", "appName": "TransfersMA" });
    var basicProperties =
    {
      "message": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Loans.WishToContinue"),
      "alertType": constants.ALERT_TYPE_CONFIRMATION,
      "alertTitle": "",
      "yesLabel": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.continue"),
      "noLabel": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.Cancel"),
      "alertIcon": "",
      "alertHandler": function (response) {
        if (response) {
          transMod.processStartDate(scope.view.customCalendar.getSelectedDate());
        }
      }
    };
    applicationManager.getPresentationUtility().showAlertMessage(basicProperties, {});
  },

  isSelectedDateGreaterThanDueDate: function () {
    var transMod = applicationManager.getModulesPresentationController({ "moduleName": "TransferEuropeUIModule", "appName": "TransfersMA" });
    var transObj = transMod.getTransObject();
    var forUtility = applicationManager.getFormatUtilManager();
    var dueDateObject = forUtility.getDateObjectfromString(transObj.nextPaymentDate);
    var selectedDateObject = forUtility.getDateObjectFromCalendarString(this.view.customCalendar.getSelectedDate(), "MM/DD/YYYY");
    return selectedDateObject > dueDateObject;
  },

  updateDateBullets: function (selectedDate) {
    var scope = this;
    try {
      if (!kony.sdk.util.isNullOrUndefinedOrEmptyObject(selectedDate)) {
        if (typeof (selectedDate) == "object")
          scope.highlightedDate = selectedDate.format(scope.formatToDisplay);
        else
          scope.highlightedDate = applicationManager.getFormatUtilManager().getDateObjectFromCalendarString(selectedDate, this.dateFormat);
      } else {
        selectedDate = scope.sendOnDate;
      }
      var dateLabels = scope.view.flxDateValue.widgets();
      var dummy = '';
      var skin = '';
      var locale = kony.i18n.getCurrentLocale();
      locale = locale.toLowerCase();
      locale = locale.replace("_", "-");
      //var locale = "sv"
      if (kony.sdk.util.isNullOrUndefinedOrEmptyObject(selectedDate)) {
        scope.view.btnContinue.setEnabled(false);
        scope.view.btnContinue.skin = "sknBtnOnBoardingInactive";
        //         dummy = 'MM/DD/YYYY';
        if (locale == "en-us" || locale == "en") {
          dummy = 'DD/MM/YYYY';
        } else if (locale == "en-gb" || locale === "fr-fr" || locale == "es-es") {
          dummy = 'DD/MM/YYYY';
        } else if (locale == "de-de") {
          dummy = 'DD.MM.YYYY';
        } else if (locale == "sv-se") {
          dummy = 'YYYY-DD-MM';
        }

        skin = 'ICSknLbl42424218PXmb';
      } else {
        //sknBtn0095e4RoundedffffffSSP26px
        scope.view.btnContinue.setEnabled(true);
        scope.view.btnContinue.skin = "ICSknBtn003E7535PXmb";
        skin = 'ICSknLbl42424218PXmb';
        var options = {
          year: "numeric",
          month: "2-digit",
          day: "2-digit"
        };
        var dateObj = "";
        var flg = new Date(selectedDate);
        if (isNaN(flg.getTime())) {
          var [day, month, year] = selectedDate.split('/');
          dateObj = new Date(+year, +month - 1, +day);
        } else dateObj = selectedDate;
        dateObj = new Date(dateObj);
        dummy = dateObj.toLocaleDateString("nl", options);
        dummy = dummy.replace(/-/g, '/');
        //         dummy = this.getSelectedDate();
        kony.print("In update bullets getselectedDate mein ka dummy" + dummy)
      }
      for (var i = 0; i < dateLabels.length; i++) {
        dateLabels[i].text = dummy[i];
        dateLabels[i].skin = skin;
      }
      scope.view.forceLayout();
      kony.print("update bullets function ended");
    }
    catch (err) {
      var errObj = {
        "errorInfo": "Error in update date bullets method of the component.",
        "errorLevel": "Configuration",
        "error": err
      };
      this.onError(errObj);
    }
  },
});