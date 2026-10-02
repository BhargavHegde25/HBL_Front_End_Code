define(['./ParserUtilsManager','./FormatUtils'],function (ParserUtilsManager,FormatUtils) {
  return {
    clickedOnCustomDate:0,
    updateBottomLabel: false,
    currMonth: 0,
    currYear: 0,
    selectedDate: '',
    deliverDate: '',
    prevSelectedDate: '',
    transitDays: 0,
    holidays: [],
    firstEnabledDate: '',
    lastEnabledDate: '',
    singleSelect: true,
    fromDate: '',
    toDate: '',
    currentDate: '',
    tabName: '',
//     currentDateSkin: 'sknLbl003e75SSP15px',
//     selectedDateSkin: 'sknLblSSPFFFFFF15PxBg003E75',
//     unSelectedDateSkin: 'bbSknLblSSP4176A415Px',
//     selectedRangeSkin: 'bbSknLblSSP4176A415Px',
//     diabledDateSkin: 'bbSknLbl727272Lato15Px',
//     weekEndSkin: 'bbSknLbl727272Lato15Px',
//     startDateRangeSkin: 'sknLbl4176A4SSP15Px',
//     unSelectedRangeSkin: 'sknLbl4176A4SSP15Px',
//     disabledRangeSkin: 'bbSknLbl727272Lato15Px',
    triggerContinueAction: true,
    isRangeSelectable: false,
    isSwiped : false,
    updateBottomLabelTo: false,
    currMonthTo: 0,
    currYearTo: 0,
    selectedDateTo: '',
    deliverDateTo: '',
    prevSelectedDateTo: '',
    transitDaysTo: 0,
    holidaysTo: [],
    firstEnabledDateTo: '',
    lastEnabledDateTo: '',
    singleSelectTo: true,
    fromDateTo: '',
    toDateTo: '',
    currentDateTo: '',
//     currentDateSkinTo: 'sknLbl003e75SSP15px',
//     selectedDateSkinTo: 'sknLblSSPFFFFFF15PxBg003E75',
//     unSelectedDateSkinTo: 'bbSknLblSSP4176A415Px',
//     selectedRangeSkinTo: 'bbSknLblSSP4176A415Px',
//     diabledDateSkinTo: 'bbSknLbl727272Lato15Px',
//     weekEndSkinTo: 'bbSknLbl727272Lato15Px',
//     startDateRangeSkinTo: 'sknLbl4176A4SSP15Px',
//     unSelectedRangeSkinTo: 'sknLbl4176A4SSP15Px',
//     disabledRangeSkinTo: 'bbSknLbl727272Lato15Px',
    triggerContinueActionTo: true,
    isRangeSelectableTo: false,
    isSwipedTo : false,
    startDate:"",
    endDate:"",
    sortByValue: "",
    selectedPeriod: {},
    isSelected: "",
    defaultDateSelectionLabelsArray : [],
   defaultDateSelectionLabelsKeysArray : [],
    constructor: function(baseConfig, layoutConfig, pspConfig) {
          this._defaultDateSelectionLabels = "";
          this._defaultDateSelectionKeys="";
          this._selectedDateSkin="";
          this._unselectedDateSkin="";
          this._disabledDateSkin="";
          this._primaryButtonSkin="";
          this._secondaryButtonSkin="";
          this._monthSkin="";
          this._weekEndSkin="";
          this._currentDateSkin="";
          this._startDateRangeSkin="";
          this._unSelectedRangeSkin="";
          this._disabledRangeSkin="";
          this._fromToSkin="";
          this._dateFlexSkin="";
          this._previousMonthImage="";
          this._nextMonthImage="";
          this._nextYearImage="";
          this._previousYearImage="";
          this._primaryButtonLabel="";
          this._secondaryButtonLabel="";
          this._fromLabel="";
          this._toLabel ="";
          this._customDateFormat="";
          this._defaultDateFormat="";
         this._parentComponentName = "";
          this.parserUtilsManager = new ParserUtilsManager();
      //Format util object
          this.FormatUtils = new FormatUtils();
          this.prevFromDateOfCustom="";
          this.prevToDateOfCustom="";
          this.combinedDate="";
          this.clearbtnClicked=0; //added for btnApply
          this.sDate="";
          this.eDate="";
		},
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {
       defineSetter(this, 'defaultDateSelectionLabels', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._defaultDateSelectionLabels = val;
          }
        });
       defineGetter(this, 'defaultDateSelectionLabels', function () {
          return this._defaultDateSelectionLabels;
        });
       defineSetter(this, 'defaultDateSelectionKeys', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._defaultDateSelectionKeys = val;
          }
        });
       defineGetter(this, 'defaultDateSelectionKeys', function () {
          return this._defaultDateSelectionKeys;
        });
        defineSetter(this, 'selectedDateSkin', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._selectedDateSkin = val;
          }
        });
       defineGetter(this, 'selectedDateSkin', function () {
          return this._selectedDateSkin;
        });
       defineSetter(this, 'unselectedDateSkin', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._unselectedDateSkin = val;
          }
        });
       defineGetter(this, 'unselectedDateSkin', function () {
          return this._unselectedDateSkin;
        });
       defineSetter(this, 'disabledDateSkin', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._disabledDateSkin = val;
          }
        });
       defineGetter(this, 'disabledDateSkin', function () {
          return this._disabledDateSkin;
        });
       defineSetter(this, 'primaryButtonSkin', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._primaryButtonSkin = val;
          }
        });
       defineGetter(this, 'primaryButtonSkin', function () {
          return this._primaryButtonSkin;
        });
       defineSetter(this, 'secondaryButtonSkin', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._secondaryButtonSkin = val;
          }
        });
       defineGetter(this, 'secondaryButtonSkin', function () {
          return this._secondaryButtonSkin;
        });
         defineSetter(this, 'monthSkin', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._monthSkin = val;
          }
        });
       defineGetter(this, 'monthSkin', function () {
          return this._monthSkin;
        }); 
           defineSetter(this, 'weekEndSkin', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._weekEndSkin= val;
          }
        });
       defineGetter(this, 'weekEndSkin', function () {
          return this._weekEndSkin;
        }); 
       defineSetter(this, 'currentDateSkin', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._currentDateSkin= val;
          }
        });
       defineGetter(this, 'currentDateSkin', function () {
          return this._currentDateSkin;
        });
         defineSetter(this, 'startDateRangeSkin', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._startDateRangeSkin= val;
          }
        });
       defineGetter(this, 'startDateRangeSkin', function () {
          return this._startDateRangeSkin;
        });
          defineSetter(this, 'unSelectedRangeSkin', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._unSelectedRangeSkin= val;
          }
        });
       defineGetter(this, 'unSelectedRangeSkin', function () {
          return this._unSelectedRangeSkin;
        });
          defineSetter(this, 'disabledRangeSkin', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._disabledRangeSkin= val;
          }
        });
       defineGetter(this, 'disabledRangeSkin', function () {
          return this._disabledRangeSkin;
        });
       defineSetter(this, 'fromToSkin', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._fromToSkin= val;
          }
        });
       defineGetter(this, 'fromToSkin', function () {
          return this._fromToSkin;
        });
        defineSetter(this, 'dateFlexSkin', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._dateFlexSkin= val;
          }
        });
       defineGetter(this, 'dateFlexSkin', function () {
          return this._dateFlexSkin;
        }); 
        defineSetter(this, 'previousMonthImage', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._previousMonthImage= val;
          }
        });
       defineGetter(this, 'previousMonthImage', function () {
          return this._previousMonthImage;
        }); 
         defineSetter(this, 'nextMonthImage', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._nextMonthImage= val;
          }
        });
       defineGetter(this, 'nextMonthImage', function () {
          return this._nextMonthImage;
        });
         defineSetter(this, 'nextYearImage', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._nextYearImage= val;
          }
        });
       defineGetter(this, 'nextYearImage', function () {
          return this._nextYearImage;
        });  
          defineSetter(this, 'previousYearImage', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._previousYearImage= val;
          }
        });
       defineGetter(this, 'previousYearImage', function () {
          return this._previousYearImage;
        });
         defineSetter(this, 'primaryButtonLabel', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._primaryButtonLabel= val;
          }
        });
       defineGetter(this, 'primaryButtonLabel', function () {
          return this._primaryButtonLabel;
        });
          defineSetter(this, 'secondaryButtonLabel', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._secondaryButtonLabel= val;
          }
        });
       defineGetter(this, 'secondaryButtonLabel', function () {
          return this._secondaryButtonLabel;
        });
           defineSetter(this, 'fromLabel', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._fromLabel= val;
          }
        });
       defineGetter(this, 'fromLabel', function () {
          return this._fromLabel;
        });
           defineSetter(this, 'toLabel', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._toLabel= val;
          }
        });
       defineGetter(this, 'toLabel', function () {
          return this._toLabel;
        });
            defineSetter(this, 'customDateFormat', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._customDateFormat= val;
          }
        });
       defineGetter(this, 'customDateFormat', function () {
          return this._customDateFormat;
        });  
       defineSetter(this, 'defaultDateFormat', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._defaultDateFormat= val;
          }
        });
       defineGetter(this, 'defaultDateFormat', function () {
          return this._defaultDateFormat;
        }); 
          //parentComponentName
       defineSetter(this, 'parentComponentName', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._parentComponentName= val;
          }
        });
       defineGetter(this, 'parentComponentName', function () {
          return this._parentComponentName;
        });  
    },
     getFieldValue: function(Value,key) {
      try 
      {
        var value = Value;
        if(typeof(Value) == "string"){
          value = JSON.parse(Value);
        }
        if(value[this.accountType]){
          value = value[this.accountType];
        }
        if(!this.isEmptyNullUndefined(value) && !this.isEmptyNullUndefined(key)){
          value = value[key];
        }
        if (value !== null && value !== "" && value !== undefined) {
          if(typeof(value)=="string")
            return this.getProcessedText(value);
          else{
            var text=this.breakPointParser(value,kony.application.getCurrentBreakpoint());
            return this.getProcessedText(text);
          }
        } else return "";
      }  
      catch(err)
      {
        kony.print(err);
      }
      return this.getProcessedText(Value);
    },
     getProcessedText:function(text){
      return this.parserUtilsManager.getParsedValue(text);
    },
    isEmptyNullUndefined:function(data){
      if(data === null || data === undefined || data === "")
       {
         return true;
       } 
      return false;
    },
    resetCal: function () {
      this.view.flxMonth.removeAll();
      var month1 = this.view.flxMonthOneDummy.clone("m1");
      var month2 = this.view.flxMonthOneDummy.clone("m2");
      var month3 = this.view.flxMonthOneDummy.clone("m3");
      month1.left = "-100%";
      month3.left = "100%";
      kony.print("in reset cal function :" + this.currentDate);
      kony.print("in reset cal current month :" + this.currMonth);
      this.view.flxMonth.add(month1, month2, month3);
      this.setMonthData(0, this.currMonth, this.currYear);
      this.setMonthData(1, this.currMonth, this.currYear);
      this.setMonthData(2, this.currMonth, this.currYear);
      this.setMonthLabelText();
    },
    setMonthData: function (monthOffset, month, year) {
      if (month == -1) {
        month = 11;
        year -= 1;
      } else if (month == 12) {
        month = 0;
        year += 1;
      }
      if (monthOffset == 0 && month == 0) {
        year--;
        month = 11;
      } else if (monthOffset == 2 && month == 11) {
        year++;
        month = 0;
      } else {
        month = month - 1 + monthOffset;
      }
      var maxDays = this.setMaxDays(month, year);
      var d2 = new Date();
      d2.setDate(1);
      d2.setMonth(month);
      d2.setFullYear(year);
      var j = d2.getDay();
      var dateValue = 1;
      var week = this.view.flxMonth.widgets()[monthOffset].widgets()[0].widgets();
      for (var temp = 0; temp < j; temp++) {
        week[temp].isVisible = false;
      }
      for (var i = 0; i < 6; i++) {
        var week = this.view.flxMonth.widgets()[monthOffset].widgets()[i].widgets();
        for (; j < 7; j++) {
          if (dateValue > maxDays) {
            for (var k = j; k < 7; k++) {
              week[k].isVisible = false;
            }
            if (i == 4) {
              var weekSix = this.view.flxMonth.widgets()[monthOffset].widgets()[5].widgets();
              for (var k = 0; k < 7; k++) {
                weekSix[k].isVisible = false;
              }
            }
            if (i == 5) {
              var weekSix = this.view.flxMonth.widgets()[monthOffset].widgets()[5].widgets();
              for (var k = j; k < 7; k++) {
                weekSix[k].isVisible = false;
              }
            }
            break;
          }
          week[j].isVisible = true;
          week[j].text = "" + parseInt(dateValue);
          week[j].skin = this.setDateSkin(dateValue, month, year);
          dateValue++;
        }
        j = 0;
      }
    },

    reRenderCurrentMonthSkins: function (fromclear) {
      if (this.view.flxMonth.widgets().length == 1) {
        return;
      }
      for (var monthOffset = 0; monthOffset < this.view.flxMonth.widgets().length; monthOffset++) {
        for (var i = 0; i < 6; i++) {
          var week = this.view.flxMonth.widgets()[monthOffset].widgets()[i].widgets();
          for (var j = 0; j < 7; j++) {
            if (week[j].isVisible) {
              week[j].skin = this.setDateSkin(week[j].text, this.currMonth - 1 + monthOffset, this.currYear,fromclear);
            }
          }
        }
      }
    },
    setDateSkin: function (date, month, year,fromclear) {
      var d = new Date(year, month, date);
      if(fromclear!==undefined && fromclear!==""){ //clear button has been clicked.
        if (this.selectedDate !== '' && this.selectedDate != undefined) {
          if (d.getTime() === this.selectedDate.getTime()) {
            this.selectedDate="";
            return this._unselectedDateSkin;
          }
        }
      }
      if (this.lastEnabledDate == '' || this.lastEnabledDate == undefined || this.firstEnabledDate == '' || this.firstEnabledDate == undefined) {
        this.setFirstEnabledDate();
        this.setLastEnabledDate();
      }
      if (d.getTime() < this.lastEnabledDate.getTime() && d.getTime() >= this.firstEnabledDate.getTime()) {
        if (this.isRangeSelectable) {
          if (this.fromDate == '' || this.fromDate == undefined) {
            if (d.getTime() == this.currentDate.getTime()) {
              return this._currentDateSkin;
            } else {
              return this._unselectedDateSkin;
            }
          } else if (this.toDate == '' || this.toDate == undefined) {
            if (d.getTime() == this.fromDate.getTime()) {
              return this._selectedDateSkin;
            } else if (d.getTime() == this.currentDate.getTime()) {
              return this._currentDateSkin;
            } else {
              return this._unselectedDateSkin;
            }
          } else {
            if (d.getTime() >= this.fromDate.getTime() || d.getTime() <= this.toDate.getTime()) {
              return this._selectedDateSkin;
            } else if (d.getTime() == this.currentDate.getTime()) {
              return this._currentDateSkin;
            } else {
              return this._unselectedDateSkin;
            }
          }
        } else {
          if (this.selectedDate != '' && this.selectedDate != undefined) {
            if (d.getTime() == this.selectedDate.getTime()) {
              return this._selectedDateSkin;
            }
          }
          if (d.getTime() == this.currentDate.getTime()) {
            return this._currentDateSkin;
          } else {
            return this._unselectedDateSkin;
          }
        }
      } else {
        return this._disabledDateSkin;
      }
    },
    setFirstEnabledDate: function (dateParam) { //dateParam : mm/dd/yyyy
      kony.print("dateParam : "+dateParam);
      if (dateParam == undefined || dateParam == "") {
        kony.print("in setFirstEnabledDate function - firstEnabledDate : "+this.firstEnabledDate +", currMonth : "+this.currMonth);
        if (this.firstEnabledDate == "" || this.firstEnabledDate == undefined) {
          this.firstEnabledDate = this.currentDate;
          this.currMonth = this.firstEnabledDate.getMonth();
          this.currYear = this.firstEnabledDate.getFullYear();
          kony.print("dateParam is undefined setting current date as firstEnabledDate-"+this.firstEnabledDate +"- currMonth-"+this.currMonth);
        } else if (isNaN(this.firstEnabledDate.getTime())) {
          this.firstEnabledDate = this.firstEnabledDate;
          this.currMonth = this.firstEnabledDate.getMonth();
          this.currYear = this.firstEnabledDate.getFullYear();
          kony.print("dateParam is undefined setting firstEnabledDate is already defined -"+this.firstEnabledDate +"- currMonth-"+this.currMonth);
        }
      } else {
        var dateSplit ;
        kony.print("174 datesplit "+ dateSplit);
        if (dateParam.indexOf('/')!= -1) {
          kony.print("date param has slashes");
          dateSplit = dateParam.split("/");  
        } else if(dateParam.indexOf('-')!= -1){
          kony.print("date param has hiphens!!!");
          dateSplit = dateParam.split("-"); //mm,dd,yyyy  
        }
        kony.print("dateSplit" + dateSplit);
        this.firstEnabledDate = new Date(dateSplit[2], parseInt(dateSplit[0]) - 1, dateSplit[1]); //yyyy,mm,dd
        this.currMonth = this.firstEnabledDate.getMonth();
        //  this.currYear = this.firstEnabledDate.getFullYear();
        kony.print("dateParam is -"+dateParam+"- setting current date as firstEnabledDate -"+this.firstEnabledDate +"- currMonth-"+this.currMonth);
      }
    },
    setLastEnabledDate: function (dateParam) { //dateParam : mm/dd/yyyy
      kony.print("in start of set last enabled date function");
      if (dateParam == undefined) {
        if (this.lastEnabledDate == "" || this.lastEnabledDate == undefined) {
          kony.print("lastenabled date is undefined or empty");
          this.lastEnabledDate = new Date(this.firstEnabledDate);
          this.lastEnabledDate.setFullYear(this.lastEnabledDate.getFullYear() + 1);
        } else if (isNaN(this.lastEnabledDate.getTime())) {
          kony.print("lastEnabled Date is NAN");
          this.lastEnabledDate = new Date(this.firstEnabledDate);
          this.lastEnabledDate.setFullYear(this.lastEnabledDate.getFullYear() + 1);
        }
      } else {
        kony.print("date param is present"+ dateParam);
        var dateSplit = dateParam.split("/"); //mm,dd,yyyy
        kony.print("dateSplit" + dateSplit);
        this.lastEnabledDate = new Date(dateSplit[2], parseInt(dateSplit[0]) - 1, dateSplit[1]); //yyyy,mm,dd
        kony.print("last enabled date is set - "+ this.lastEnabledDate);
      }
      kony.print("in end of set last enabled date function");
    },
    getCurrentFormName: function(){
       let currForm = "";
      if((this._parentComponentName != "")||(this._parentComponentName != undefined)){
        currForm = eval("kony.application.getCurrentForm()" + "." + this._parentComponentName + "." + "returnCurrComponent()");
      }
      else{
      currForm =kony.application.getCurrentForm().returnCurrComponent();
        }
      return currForm;
    },

    setSelectedDate: function (dateParam) {
      this.view.lblError.setVisibility(false);
      if(dateParam == "" || dateParam == undefined || dateParam == null){
        kony.print("returning as dateParam is empty");
        return;
      }
      this.sDate = dateParam;
      var today = new Date().toLocaleDateString();
      var dateParam1 = today.split("/")[0]+"/"+today.split("/")[1]+"/"+today.split("/")[2];
      if(dateParam != dateParam1){
        // currForm.btnPeriodicDays.skin = "sknBtnSSP0273e315px";
        // currForm.btnThreeMonths.skin = "sknBtnSSP0273e315px";
        // currForm.btnSixMonths.skin = "sknBtnSSP0273e315px";
        // currForm.btnLastYear.skin = "sknBtnSSP0273e315px";
      }
      kony.print("inside setSelectedDate function");
      var dateSplit;
      if (dateParam.indexOf('/')!= -1) {
        kony.print("date param has slashes");
        dateSplit = dateParam.split("/");  
      } else if(dateParam.indexOf('-')!= -1){
        kony.print("date param has hiphens!!!");
        dateSplit = dateParam.split("-"); //mm,dd,yyyy  
      } else if(dateParam.indexOf('.')!= -1){
        kony.print("date param has dots!!!");
        dateSplit = dateParam.split("."); //mm,dd,yyyy  
      }
      var d = new Date(dateSplit[2], parseInt(dateSplit[0]) - 1, dateSplit[1]); //yyyy,mm,dd
      kony.print("date param date obj : " + d);
      if (this.isRangeSelectable) {
        kony.print("range selectable is true so setting from date");
        this.setFromDate(dateParam);
      } else if (this.selectedDate == '' || this.selectedDate == undefined) {
        kony.print("selected date is empty. setting " + d + " as selected date");
        this.selectedDate = d;
        this.currMonth = this.selectedDate.getMonth();
        this.currYear = this.selectedDate.getFullYear();
      } else {
        kony.print("range is not selectable and selected date is changed. setting -" + d + "- as selected date");
        this.selectedDate = d;
        this.currMonth = this.selectedDate.getMonth();
        this.currYear = this.selectedDate.getFullYear();
      }
      this.reRenderCurrentMonthSkins();
      this.addHolidays();
      this.updateDateBullets();
      kony.print("setSelectedDate function ended");
    },
    setFromDate: function (dateParam) {
      var dateSplit = dateParam.split("/"); //mm,dd,yyyy
      var d = new Date(dateSplit[2], parseInt(dateSplit[0]) - 1, dateSplit[1]); //yyyy,mm,dd
      if (this.fromDate == '' || this.fromDate == undefined) {
        this.fromDate = d;
      } else if (this.fromDate.getTime() == d.getTime()) {
        this.fromDate = '';
      } else {
        this.setToDate(dateParam);
      }
    },
    setToDate: function (dateParam) {
      var dateSplit = dateParam.split("/"); //mm,dd,yyyy
      this.toDate = new Date(dateSplit[2], parseInt(dateSplit[0]) - 1, dateSplit[1]); //yyyy,mm,dd
    },
    hideAllFilters: function(){
      this.view.lblError.setVisibility(false);
      this.view.btn1.setVisibility(false);
      this.view.btn2.setVisibility(false);
      this.view.btn3.setVisibility(false);
      this.view.btn4.setVisibility(false);
      this.view.btn5.setVisibility(false);
      this.view.btn6.setVisibility(false);
      this.view.btn7.setVisibility(false);
      this.view.flxVBar0.setVisibility(false);
      this.view.flxVBar1.setVisibility(false);
      this.view.flxVBar2.setVisibility(false);
      this.view.flxVBar3.setVisibility(false);
      this.view.flxVBar4.setVisibility(false);
      this.view.flxVBar5.setVisibility(false);
  },
    preShow: function () {
       this.selectedDate = '';
      this.hideAllFilters();
      var d2 = new Date();
      if (this.currentDate == "" || this.currentDate == undefined) {
        this.currentDate = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate());
        this.currMonth = this.currentDate.getMonth();
        this.currYear = this.currentDate.getFullYear();
      }
      this.view.lblTo.text = this.getFieldValue(this._toLabel);
      this.view.lblYear.text = this.getFieldValue(this._fromLabel);
      this.view.btnApply.text = this.getFieldValue(this._primaryButtonLabel);
      this.view.btnClear.text = this.getFieldValue(this._secondaryButtonLabel);
      this.setPreshowInitialization();
//         if(this.sDate != "" && this.eDate != ""){
//          this.showCalendarWithPrevDates(this.view.lblAutoDays.text);
//         }else{
//            this.isSelected = "previous30DaysSelected";
//           this.highlightSelectedPeriod("firstTime");
//         }
      kony.print("in preshow before initActions currentMonth : " + this.currMonth);
      var scope = this;
      this.initActions();
      kony.print("in preshow after init Actions currentMonth : " + this.currMonth);
      this.setFirstEnabledDate();
      kony.print("in preshow after setFirstEnabledDate currentMonth : " + this.currMonth);
      this.setLastEnabledDate();
      kony.print("in preshow currentMonth : " + this.currMonth);
      this.resetCal();
      this.holidays = new Set();
      this.addHolidays();

    },
    getDate:function(day){
      day = Number(day);
      var currentMonth = this.currMonth + 1;
      if(currentMonth < 10)
        currentMonth = "0" + currentMonth;
      if(day < 10)
        day = "0" + day;
      return (this.currYear + "-" + currentMonth + "-" + day);
    },
    addHolidays:function(){
      var week;
      for (var i = 0; i < 6; i++) {
        if(this.view.flxMonth.widgets().length <= 1){
          break;
        }
        else
        {
          week = this.view.flxMonth.widgets()[1].widgets()[i].widgets();
        }
        for (var j = 0; j < 7; j++) {
          if (week[j].text != "S" && week[j].isVisible && this.holidays.has(this.getDate(week[j].text))) {
            week[j].skin = this._weekEndSkin;
            week[j].setEnabled(false);
          }
        }
      }
    },
    setRangeSkins: function(){
      var startDate = this.prevSelectedDate;
      var deliverDate = this.deliverDate;
      for (var i = 0; i < 6; i++) {
        var week = this.view.flxMonth.widgets()[1].widgets()[i].widgets();
        for (var j = 0; j < 7; j++) {
          if(week[j].text == 'S')
            continue;
          var current = new Date(this.currYear,this.currMonth,week[j].text);
          if(this.selectedDate!=='' && current.getTime() == startDate.getTime() && this.selectedDate.getTime()==startDate.getTime())
          {
            week[j].skin = this._selectedDateSkin;
            continue;
          }
          if(current.getTime() == startDate.getTime())
          {
            if(this.transitDays!=0)
              week[j].setEnabled(false);
            week[j].skin = this._startDateRangeSkin;
          }
          else if(current>startDate && current<deliverDate)
          {
            if(week[j].skin == this._unselectedDateSkin)
              week[j].skin = this._unSelectedRangeSkin;
            else if(week[j].skin == this._disabledDateSkin)
              week[j].skin = this._disabledRangeSkin;
            week[j].setEnabled(false);
          }
          else if((current.getTime() == deliverDate.getTime())||(this.selectedDate !== '' && current>deliverDate && current<this.selectedDate))
          {
            if(week[j].skin == this._unselectedDateSkin)
              week[j].skin = this._unSelectedRangeSkin;
            else if(week[j].skin == this._disabledDateSkin)
              week[j].skin = this._disabledRangeSkin;
          }
          else if(current<startDate)
            week[j].setEnabled(false);
          else
            continue;
        }
      }
    },
    setMonthLabelText: function () {
      var currMonth = {
        0: "Jan",
        1: "Feb",
        2: "Mar",
        3: "Apr",
        4: "May",
        5: "Jun",
        6: "Jul",
        7: "Aug",
        8: "Sep",
        9: "Oct",
        10: "Nov",
        11: "Dec"
      };
      this.view.lblMonth.text = currMonth[this.currMonth] + " "+ this.currYear;
      //       if(kony.application.getCurrentForm().id === "frmLRStartDateSelection"){
      //         this.view.lblMonth.text = currMonth[this.currMonth];
      //       }
    },
    setMaxDays: function (month, year) {
      if (month == 1 && year % 4 == 0) {
        return 29;
      } else if (month == 1) {
        return 28;
      }
      var monthMaxDays = {
        0: 31,
        2: 31,
        3: 30,
        4: 31,
        5: 30,
        6: 31,
        7: 31,
        8: 30,
        9: 31,
        10: 30,
        11: 31,
      };
      return monthMaxDays[month];
    },
    clickedOnDate: function (widgetRef) { //triggered on touch end of a date
      this.view.flxSubmitBtnWrapper.setVisibility(true);
      var tabName = this.tabName;
      if (widgetRef.skin == this._disabledDateSkin || widgetRef.skin == this._disabledRangeSkin) {
        return;
      }
      this.clickedOnCustomDate=1;
      var selectionDateonFrom="";
      var currForm = this.getCurrentFormName();
      var prevDate="" ;
      if(tabName === this.getFieldValue("{i.i18n.wealth.reports}")){
        prevDate=currForm.flxInside.lblText.text;
      }else{
         prevDate=currForm.flxInsideCalendar.lblAutoDays.text
      }
      var fromDate = new Date((this.currMonth + 1) + "/" + widgetRef.text + "/" + this.currYear);
      var toDate = ""; 
       var startDate="";
       var endDate="";
      if(this.selectedDateTo != ""){ //this is the case when toDate is selected from beginning
        toDate = new Date(this.selectedDateTo);
        if(fromDate.getTime() <= toDate.getTime()){
          this.setSelectedDate((this.currMonth + 1) + "/" + widgetRef.text + "/" + this.currYear); //mm/dd/yyyy
          this.setMonthLabelText();
          selectionDateonFrom = (this.currMonth + 1) + "/" + widgetRef.text + "/" + this.currYear+" - "+ (this.currMonthTo + 1) + "/" +this.selectedDateTo.getDate() + "/" + this.currYearTo;
           startDate= (this.currMonth + 1) + "/" + widgetRef.text + "/" + this.currYear;
           endDate = (this.currMonthTo + 1) + "/" +this.selectedDateTo.getDate() + "/" + this.currYearTo;

          // if endDate exists then enable the button and if user clicks on apply then make these dates as global dates
          //enable button
          this.enableButton(this.view.btnApply);
          if(tabName === this.getFieldValue("{i.i18n.wealth.reports}")){
            currForm.flxInside.lblText.text = selectionDateonFrom;
          }else{
             currForm.flxInsideCalendar.lblAutoDays.text = selectionDateonFrom;
          }
          
          //kony.application.getCurrentForm().portfolioDetails.getStartAndEndDatefromDateRangeComponent(startDate+"/"+endDate,prevDate);
        }else{
           if(tabName === this.getFieldValue("{i.i18n.wealth.reports}")){
            currForm.flxInside.lblText.text = prevDate;
          }else{
             currForm.flxInsideCalendar.lblAutoDays.text = prevDate;
          }
        }
      }
      else{ //user is clicking on start date first and todate is empty
         this.setSelectedDate((this.currMonth + 1) + "/" + widgetRef.text + "/" + this.currYear); //mm/dd/yyyy
          this.setMonthLabelText();
          selectionDateonFrom = (this.currMonth + 1) + "/" + widgetRef.text + "/" + this.currYear+" - "+"MM/DD/YYYY";
           startDate= (this.currMonth + 1) + "/" + widgetRef.text + "/" + this.currYear;
           endDate =this.dateToString(this.selectedDateTo);
          this.disableButton(this.view.btnApply);
          if(tabName === this.getFieldValue("{i.i18n.wealth.reports}")){
            currForm.flxInside.lblText.text = selectionDateonFrom;
          }else{
             currForm.flxInsideCalendar.lblAutoDays.text = selectionDateonFrom;
          }
         // kony.application.getCurrentForm().portfolioDetails.getStartAndEndDatefromDateRangeComponent(startDate+"/"+endDate,prevDate);
      }
      this.sDate=startDate;
      this.eDate = endDate;
       if(tabName === this.getFieldValue("{i.i18n.wealth.reports}")){
            currForm.flxInside.lblText.isVisible = true;
        }else{
             currForm.flxInsideCalendar.lblAutoDays.isVisible = true;
        }
      if (this.triggerContinueAction) {
        kony.print("about to call triggerContinue Function");
        this.triggerContinue();
      }
    this.unHighlighEveryButton();
      //this.setDeliverDateToLabel();
    },
    initActions: function () {
      var scope = this;
        this.view.btnApply.onClick = this.onClickApply;
        this.view.btnClear.onClick = this.onClickClear;
      this.view.flxMonth.setGestureRecognizer(constants.GESTURE_TYPE_SWIPE, {
        fingers: 1
      },
                                              function (widgetRef, gestureInfo) {
        kony.print("swiped isSwiped:"+scope.isSwiped);
        if (scope.isSwiped == true) {
          return;
        }
        scope.isSwiped=true;
        if (gestureInfo.swipeDirection === 1) {
          kony.print("swiped right");
          scope.view.flxNextMonth.onClick();
        } else if (gestureInfo.swipeDirection === 2) {
          kony.print("swiped left");
          scope.view.flxPreviousMonth.onClick();
        }
      }
                                             );
      this.view.flxNextMonth.onClick = function () {
        scope.view.flxNextMonth.setEnabled(false);
        scope.view.flxPreviousMonth.setEnabled(false);
        scope.unHighlightRange();
        scope.view.flxMonth.widgets()[1].animate(
          kony.ui.createAnimation({
            "100": {
              "left": "-100%",
              "stepConfig": {
                "timingFunction": kony.anim.EASE
              }
            }
          }), {
            "delay": 0,
            "iterationCount": 1,
            "fillMode": kony.anim.FILL_MODE_FORWARDS,
            "duration": 0.25
          }, {
            "animationEnd": function () {}
          });
        scope.view.flxMonth.widgets()[2].animate(
          kony.ui.createAnimation({
            "100": {
              "left": "0%",
              "stepConfig": {
                "timingFunction": kony.anim.EASE
              }
            }
          }), {
            "delay": 0,
            "iterationCount": 1,
            "fillMode": kony.anim.FILL_MODE_FORWARDS,
            "duration": 0.25
          }, {
            "animationEnd": function () {
              var month = scope.view.flxMonthOneDummy.clone(scope.view.flxMonth.widgets()[0].id.slice(0, 2));
              scope.view.flxMonth.removeAt(0);
              month.left = "100%";
              scope.view.flxMonth.addAt(month, 2);
              scope.currMonth += 1;
              if (scope.currMonth == 12) {
                var tempYear = parseInt(scope.currYear) + 1;
                scope.currYear = tempYear;
                scope.currMonth = 0;
              }
              scope.setMonthData(2, scope.currMonth, scope.currYear);
              scope.setMonthLabelText();
              scope.addHolidays();
              //               if(kony.application.getCurrentForm().id == "frmBillPayEndDate")
              //                 scope.setRangeSkins();
              scope.view.flxNextMonth.setEnabled(true);
              scope.view.flxPreviousMonth.setEnabled(true);
              scope.isSwiped = false;
            }
          });
      }

      this.view.flxPreviousMonth.onClick = function () {
        scope.view.flxNextMonth.setEnabled(false);
        scope.view.flxPreviousMonth.setEnabled(false);
        scope.unHighlightRange();
        scope.view.flxMonth.widgets()[1].animate(
          kony.ui.createAnimation({
            "100": {
              "left": "100%",
              "stepConfig": {
                "timingFunction": kony.anim.EASE
              }
            }
          }), {
            "delay": 0,
            "iterationCount": 1,
            "fillMode": kony.anim.FILL_MODE_FORWARDS,
            "duration": 0.25
          }, {
            "animationEnd": function () {}
          });
        scope.view.flxMonth.widgets()[0].animate(
          kony.ui.createAnimation({
            "100": {
              "left": "0%",
              "stepConfig": {
                "timingFunction": kony.anim.EASE
              }
            }
          }), {
            "delay": 0,
            "iterationCount": 1,
            "fillMode": kony.anim.FILL_MODE_FORWARDS,
            "duration": 0.25
          }, {
            "animationEnd": function () {
              var month = scope.view.flxMonthOneDummy.clone(scope.view.flxMonth.widgets()[2].id.slice(0, 2));
              scope.view.flxMonth.removeAt(2);
              month.left = "-100%";
              scope.view.flxMonth.addAt(month, 0);
              scope.currMonth -= 1;
              if (scope.currMonth == -1) {
                scope.currMonth = 11;
                scope.currYear -= 1;
              }
              scope.setMonthData(0, scope.currMonth, scope.currYear);
              scope.setMonthLabelText();
              scope.addHolidays();
              //               if(kony.application.getCurrentForm().id == "frmBillPayEndDate")
              //                 scope.setRangeSkins();
              scope.view.flxNextMonth.setEnabled(true);
              scope.view.flxPreviousMonth.setEnabled(true);
              scope.isSwiped = false;
            }
          });
      }
      this.view.flxPreviousYear.onClick = function () {
        scope.view.flxPreviousYear.setEnabled(false);
        scope.view.flxNextYear.setEnabled(false);
        // var currForm = kony.application.getCurrentForm().OverviewTabHeader.returnCurrComponent();
        var olddate = new Date(this.selectedDate);
        scope.unHighlightRange();
        scope.view.flxMonth.widgets()[1].animate(
          kony.ui.createAnimation({
            "100": {
              "left": "100%",
              "stepConfig": {
                "timingFunction": kony.anim.EASE
              }
            }
          }), {
            "delay": 0,
            "iterationCount": 1,
            "fillMode": kony.anim.FILL_MODE_FORWARDS,
            "duration": 0.25
          }, {
            "animationEnd": function () {}
          });
        scope.view.flxMonth.widgets()[0].animate(
          kony.ui.createAnimation({
            "100": {
              "left": "0%",
              "stepConfig": {
                "timingFunction": kony.anim.EASE
              }
            }
          }), {
            "delay": 0,
            "iterationCount": 1,
            "fillMode": kony.anim.FILL_MODE_FORWARDS,
            "duration": 0.25
          }, {
            "animationEnd": function () {
              // var month = scope.view.flxMonthOneDummy.clone(scope.view.flxMonth.widgets()[2].id.slice(0, 2));
              // scope.view.flxMonth.removeAt(2);
              // month.left = "-100%";
              // scope.view.flxMonth.addAt(month, 0);
              // scope.currMonth -= 1;
              //if (scope.currMonth == -1) {
              //  scope.currMonth = 11;
              scope.currYear -= 1;
              // }
              var newDate = new Date((scope.currMonth + 1) + "/" + scope.selectedDate.getDate()+ "/" + scope.currYear);
              scope.resetCal();
             // scope.setMonthData(0, scope.currMonth, scope.currYear);
              scope.setMonthLabelText();
              scope.addHolidays();
              //               if(kony.application.getCurrentForm().id == "frmBillPayEndDate")
              //                 scope.setRangeSkins();
              scope.view.flxPreviousYear.setEnabled(true);
              scope.view.flxNextYear.setEnabled(true);

              if(olddate == newDate){
                scope.reRenderCurrentMonthSkins();
              }
              scope.isSwiped = false;
            }
          });
      }
      this.view.flxNextYear.onClick = function () {
        scope.view.flxPreviousYear.setEnabled(false);
        scope.view.flxNextYear.setEnabled(false);
        var olddate = new Date(this.selectedDate);
        scope.unHighlightRange();
        scope.view.flxMonth.widgets()[1].animate(
          kony.ui.createAnimation({
            "100": {
              "left": "100%",
              "stepConfig": {
                "timingFunction": kony.anim.EASE
              }
            }
          }), {
            "delay": 0,
            "iterationCount": 1,
            "fillMode": kony.anim.FILL_MODE_FORWARDS,
            "duration": 0.25
          }, {
            "animationEnd": function () {}
          });
        scope.view.flxMonth.widgets()[0].animate(
          kony.ui.createAnimation({
            "100": {
              "left": "0%",
              "stepConfig": {
                "timingFunction": kony.anim.EASE
              }
            }
          }), {
            "delay": 0,
            "iterationCount": 1,
            "fillMode": kony.anim.FILL_MODE_FORWARDS,
            "duration": 0.25
          }, {
            "animationEnd": function () {

              scope.currYear += 1;
              // }
              var newDate = new Date((scope.currMonth + 1) + "/" + scope.selectedDate.getDate()+ "/" + scope.currYear)
              scope.resetCal();
              //scope.setMonthData(0, scope.currMonth, scope.currYear);
              scope.setMonthLabelText();
              scope.addHolidays();
              //               if(kony.application.getCurrentForm().id == "frmBillPayEndDate")
              //                 scope.setRangeSkins();
              scope.view.flxPreviousYear.setEnabled(true);
              scope.view.flxNextYear.setEnabled(true);

              if(olddate == newDate){
                scope.reRenderCurrentMonthSkins();
              }
              scope.isSwiped = false;
            }
          });
      }
      for (var i = 0; i < 6; i++) {
        var week = this.view.flxMonthDummy.widgets()[0].widgets()[i].widgets();
        for (var j = 0; j < 7; j++) {
          week[j].onTouchEnd = function (widgetRef) {
            scope.clickedOnDate(widgetRef);
            //             if(kony.application.getCurrentForm().id == "frmBillPayEndDate"){
            //               scope.setRangeSkins();
            //}
          }
        }
      }
    },
    unHighlightRange: function () {
      this.view.lblError.setVisibility(false);
      for (i = 0; i < this.view.flxHighlight.widgets().length; i++) {
        this.view.flxHighlight.widgets()[i].width = '0%';
        this.view.flxHighlight.widgets()[i].left = '0%';
      }
    },
    hightlightRange: function () { //need to refactor
      this.view.lblError.setVisibility(false);
      if (this.selectedDate === '') {
        return;
      }
      var breakFlag = false;
      var selectedDate = this.dateToString(this.toDate).split("/");
      selectedDate = selectedDate.map(function (e) {
        return parseInt(e);
      });
      var fromDate = this.fromDate.split("/");
      fromDate = fromDate.map(function (e) {
        return parseInt(e);
      });
      var i;
      if (this.currMonth < fromDate[0] || this.currMonth > selectedDate[0]) {
        return;
      }
      if (fromDate[0] < (this.currMonth)) {
        fromDate[1] = 1;
      }
      if (this.currMonth < selectedDate[0]) {
        selectedDate[1] = this.setMaxDays(this.currMonth, this.currYear);
      }
      for (i = 0; i < 6; i++) {
        var week = this.view.flxMonth.widgets()[1].widgets()[i].widgets();
        for (var j = 0; j < 7; j++) {
          if (week[j].text == fromDate[1] && week[j].isVisible) {
            this.view.flxHighlight.widgets()[i].left = j * 35 + "dp";
            this.view.flxHighlight.widgets()[i].width = (7 - j) * 35 + "dp";
            for (let k = j; k < 7; k++) { //setting selected skin
              week[k].skin = this._selectedDateSkin;
            }
            if (selectedDate[1] - fromDate[1] < 7 - j) { //same week
              this.view.flxHighlight.widgets()[i].width = (selectedDate[1] - fromDate[1] + 1) * 35 + "dp";
              for (k = j + selectedDate[1] - fromDate[1] + 1; k < 7; k++) { //setting unselected skin
                week[k].skin = this._unselectedDateSkin;
              }
              i = 10;
            }
            breakFlag = true;
            break;
          }
        }
        if (breakFlag == true) {
          break;
        }
      }
      breakFlag = false;
      for (i = i + 1; i < 6; i++) {
        var week = this.view.flxMonth.widgets()[1].widgets()[i].widgets();
        for (var j = 0; j < 7; j++) {
          if (week[j].text == selectedDate[1]) {
            this.view.flxHighlight.widgets()[i].left = "0%";
            this.view.flxHighlight.widgets()[i].width = (j + 1) * 35 + "dp";
            for (k = 0; k < j + 1; k++) { //setting selected skin
              week[k].skin = this._selectedDateSkin;
            }
            breakFlag = true;
            break;
          }
        }
        if (breakFlag == true) {
          break;
        }
        this.view.flxHighlight.widgets()[i].left = "0%";
        this.view.flxHighlight.widgets()[i].width = "100%";
        for (k = 0; k < 7; k++) { //setting selected skin
          week[k].skin = this._selectedDateSkin;
        }
      }
    },
    dateToString: function (dateObj) {
      if (dateObj instanceof Date) {
        if (!isNaN(dateObj.getTime())) {
          return ((dateObj.getMonth() + 1) + "/" + dateObj.getDate() + "/" + dateObj.getFullYear());
        }
      }
      return "";
    },
    dateToStringYearFirst: function (dateObj) {
      var is_iPad = navigator.userAgent.match(/iPad/i) != null;
      if(is_iPad){
          let month = dateObj.split("/")[0];
       let formattedMonth = month;    
          if(parseInt(month) < 10 && month.length == 1){
             formattedMonth = "0" + month;
          }
          let dat = dateObj.split("/")[1];
          let formattedDate = dat;
          if(parseInt(dat) < 10 && dat.length == 1){
            formattedDate = "0" + dat;
          }
          return ((dateObj.split("/")[2]) + "-" +formattedMonth + "-" + formattedDate);
        }
      else
         return ((dateObj.split("/")[2]) + "-" + (dateObj.split("/")[0]) + "-" + (dateObj.split("/")[1]));
    },
    stringToDate: function(date){
      var temp = date.split('/');
      var dateObj = new Date(temp[2],temp[0]-1,temp[1]);
      return dateObj;
    },
    getSelectedDate: function () {
      var dateVal;
      kony.print("inside getSelectedDate function selectedDate: " + this.selectedDate);
      if (this.selectedDate == '' || this.selectedDate == undefined) {
        kony.print("inside getSelectedDate selectedDate: " + this.selectedDate);
        return '';
      } else {
        dateVal = this.dateToString(this.selectedDate);
      }
      kony.print("dateVal: " + dateVal);
      var temp = dateVal.split('/');
      kony.print("temp[0]: " + temp[0] + "  -- temp[1]: " + temp[1] + "  --temp[2]" + temp[2]);
      if (temp[0].length == 1) {
        temp[0] = '0' + temp[0];
      }
      if (temp[1].length == 1) {
        temp[1] = '0' + temp[1];
      }
      dummy = temp[0] + '/' + temp[1] + '/' + temp[2];
      return dummy;
    },
    updateDateBullets: function () {
      kony.print("inside update bullets function");
      var currForm = this.getCurrentFormName();
      var dateLabels = currForm.flxFromDateValue.widgets();
      var dummy = '';
      var skin = '';
      var locale = kony.i18n.getCurrentLocale();
      locale=locale.toLowerCase();
      locale=locale.replace("_","-");
      //var locale = "sv"
      if (this.selectedDate === '') {
        //         currForm.btnContinue.skin = 'bbSknLbl424242Lato20Px';
        //         currForm.btnContinue.setEnabled(false);
        //         dummy = 'MM/DD/YYYY';
        if(locale=="en-us" || locale=="en"){
          dummy = 'MM/DD/YYYY';
        }
        else if(locale=="en-gb" || locale === "fr-fr" || locale=="es-es"){
          dummy = 'DD/MM/YYYY';
        }
        else if(locale=="de-de"){
          dummy = 'DD.MM.YYYY';
        }
        else if(locale=="sv-se"){
          dummy = 'YYYY-DD-MM';
        }
        skin = 'sknLbl424242SSPReg26px';
      } else {
        //         currForm.btnContinue.skin = 'sknBtn0095e426pxEnabled';
        //         currForm.btnContinue.setEnabled(true);
        skin = 'sknLbl424242SSPReg26px';
        var options={
          year: "numeric",
          month: "2-digit",
          day: "2-digit"
        };
        dummy=this.selectedDate.toLocaleDateString(locale,options);
        kony.print("In update bullets getselectedDate mein ka dummy" + dummy)
      }
      for (var i = 0; i < dateLabels.length; i++) {
        dateLabels[i].text = dummy[i];
        dateLabels[i].skin = skin;
      }
      this.view.forceLayout();
      kony.print("update bullets function ended");
    },
    triggerContinue: function () {
      if(this.updateBottomLabel){
        var currForm = kony.application.getCurrentForm();
        currForm.customCalendar.onTouchEnd();
      }
      else{
        if (this.selectedDate === '') {
          kony.print("selected date is null");
          return;
        }
        //    kony.print("about to call onClick of btnContinue in Form controller");
        //  var currForm = kony.application.getCurrentForm();
        // currForm.btnContinue.onClick();
        // kony.print("called onClick of btnContinue in Form controller");
      }},
    diffDays :   function (fromDate, toDate) {
      fromDate  =  fromDate.split('/');
      toDate  =  toDate.split('/');
      fromDate  =  new  Date(fromDate[2],  fromDate[0],  fromDate[1]);
      toDate  =  new  Date(toDate[2],  toDate[0],  toDate[1]);
      fromDate_unixtime  =  parseInt(fromDate.getTime()  /  1000);
      toDate_unixtime  =  parseInt(toDate.getTime()  /  1000);
      var  timeDifference  =  toDate_unixtime  -  fromDate_unixtime;
      var  timeDifferenceInDays  =  timeDifference  /  60  /  60  /  24;
      return  timeDifferenceInDays - 1;
    },
    resetCalTo: function () {
      //
      this.view.flxMonthTo.removeAll();
      month1 = this.view.flxMonthOneDummyTo.clone("m1");
      month2 = this.view.flxMonthOneDummyTo.clone("m2");
      month3 = this.view.flxMonthOneDummyTo.clone("m3");
      month1.left = "-100%";
      month3.left = "100%";
      this.view.flxMonthTo.add(month1, month2, month3);
      this.setMonthDataTo(0, this.currMonthTo, this.currYearTo);
      this.setMonthDataTo(1, this.currMonthTo, this.currYearTo);
      this.setMonthDataTo(2, this.currMonthTo, this.currYearTo);
      this.setMonthLabelTextTo();
    },

    setMonthDataTo: function (monthOffset, month, year) {
      if (month == -1) {
        month = 11;
        year -= 1;
      } else if (month == 12) {
        month = 0;
        year += 1;
      }
      if (monthOffset == 0 && month == 0) {
        year--;
        month = 11;
      } else if (monthOffset == 2 && month == 11) {
        year++;
        month = 0;
      } else {
        month = month - 1 + monthOffset;
      }
      var maxDays = this.setMaxDaysTo(month, year);
      var d2 = new Date();
      d2.setDate(1);
      d2.setMonth(month);
      d2.setFullYear(year);
      var j = d2.getDay();
      var dateValue = 1;
      var week = this.view.flxMonthTo.widgets()[monthOffset].widgets()[0].widgets();
      for (var temp = 0; temp < j; temp++) {
        week[temp].isVisible = false;
      }
      for (var i = 0; i < 6; i++) {
        var week = this.view.flxMonthTo.widgets()[monthOffset].widgets()[i].widgets();
        for (; j < 7; j++) {
          if (dateValue > maxDays) {
            for (var k = j; k < 7; k++) {
              week[k].isVisible = false;
            }
            if (i == 4) {
              var weekSix = this.view.flxMonthTo.widgets()[monthOffset].widgets()[5].widgets();
              for (var k = 0; k < 7; k++) {
                weekSix[k].isVisible = false;
              }
            }
            if (i == 5) {
              var weekSix = this.view.flxMonthTo.widgets()[monthOffset].widgets()[5].widgets();
              for (var k = j; k < 7; k++) {
                weekSix[k].isVisible = false;
              }
            }
            break;
          }
          week[j].isVisible = true;
          week[j].text = "" + parseInt(dateValue);
          week[j].skin = this.setDateSkinTo(dateValue, month, year);
          dateValue++;
        }
        j = 0;
      }
    },
    reRenderCurrentMonthSkinsTo: function (fromclear) {
      if (this.view.flxMonthTo.widgets().length == 1) {
        return;
      }
      for (var monthOffset = 0; monthOffset < this.view.flxMonthTo.widgets().length; monthOffset++) {
        for (var i = 0; i < 6; i++) {
          var week = this.view.flxMonthTo.widgets()[monthOffset].widgets()[i].widgets();
          for (var j = 0; j < 7; j++) {
            if (week[j].isVisible) {
              week[j].skin = this.setDateSkinTo(week[j].text, this.currMonthTo - 1 + monthOffset, this.currYearTo,fromclear);
            }
          }
        }
      }
    },
    setDateSkinTo: function (date, month, year,fromclear) {
      var d = new Date(year, month, date);
      if(fromclear!==undefined && fromclear!==""){ //clear button has been clicked.
        if (this.selectedDateTo !== '' && this.selectedDateTo != undefined) {
          if (d.getTime() === this.selectedDateTo.getTime()) {
            this.selectedDateTo="";
            return this._unselectedDateSkin;
          }
        }
      }
      if (this.lastEnabledDateTo == '' || this.lastEnabledDateTo == undefined || this.firstEnabledDateTo == '' || this.firstEnabledDateTo == undefined) {
        this.setFirstEnabledDateTo();
        this.setLastEnabledDateTo();
      }
      if (d.getTime() < this.lastEnabledDateTo.getTime() && d.getTime() >= this.firstEnabledDateTo.getTime()) {
        if (this.isRangeSelectableTo) {
          if (this.fromDateTo == '' || this.fromDateTo == undefined) {
            if (d.getTime() == this.currentDateTo.getTime()) {
              return this._currentDateSkin;
            } else {
              return this._unselectedDateSkin;
            }
          } else if (this.toDateTo == '' || this.toDateTo == undefined) {
            if (d.getTime() == this.fromDateTo.getTime()) {
              return this._selectedDateSkin;
            } else if (d.getTime() == this.currentDateTo.getTime()) {
              return this._currentDateSkin;
            } else {
              return this._unselectedDateSkin;
            }
          } else {
            if (d.getTime() >= this.fromDateTo.getTime() || d.getTime() <= this.toDateTo.getTime()) {
              return _this.selectedDateSkin;
            } else if (d.getTime() == this.currentDateTo.getTime()) {
              return this._currentDateSkin;
            } else {
              return this._unselectedDateSkin;
            }
          }
        } else {
          if (this.selectedDateTo != '' && this.selectedDateTo != undefined) {
            if (d.getTime() == this.selectedDateTo.getTime()) {
              return this._selectedDateSkin;
            }
          }
          if (d.getTime() == this.currentDateTo.getTime()) {
            return this._currentDateSkin;
          } else {
            return this._unselectedDateSkin;
          }
        }
      } else {
        return this._disabledDateSkin;
      }
    },

    setFirstEnabledDateTo: function (dateParam) { //dateParam : mm/dd/yyyy
      kony.print("dateParam : "+dateParam);
      if (dateParam == undefined || dateParam == "") {
        kony.print("in setFirstEnabledDate function - firstEnabledDate : "+this.firstEnabledDateTo +", currMonth : "+this.currMonthTo);
        if (this.firstEnabledDateTo == "" || this.firstEnabledDateTo == undefined) {
          this.firstEnabledDateTo = this.currentDateTo;
          this.currMonthTo = this.firstEnabledDateTo.getMonth();
          this.currYearTo = this.firstEnabledDateTo.getFullYear();
          kony.print("dateParam is undefined setting current date as firstEnabledDate-"+this.firstEnabledDateTo+"- currMonth-"+this.currMonthTo);
        } else if (isNaN(this.firstEnabledDateTo.getTime())) {
          this.firstEnabledDateTo = this.firstEnabledDateTo;
          this.currMonthTo = this.firstEnabledDateTo.getMonth();
          this.currYearTo = this.firstEnabledDateTo.getFullYear();
          kony.print("dateParam is undefined setting firstEnabledDate is already defined -"+this.firstEnabledDateTo +"- currMonth-"+this.currMonthTo);
        }
      } else {
        var dateSplit ;
        kony.print("174 datesplit "+ dateSplit);
        if (dateParam.indexOf('/')!= -1) {
          kony.print("date param has slashes");
          dateSplit = dateParam.split("/");  
        } else if(dateParam.indexOf('-')!= -1){
          kony.print("date param has hiphens!!!");
          dateSplit = dateParam.split("-"); //mm,dd,yyyy  
        }
        kony.print("dateSplit" + dateSplit);
        this.firstEnabledDateTo = new Date(dateSplit[2], parseInt(dateSplit[0]) - 1, dateSplit[1]); //yyyy,mm,dd
        this.currMonthTo = this.firstEnabledDateTo.getMonth();
        //  this.currYear = this.firstEnabledDate.getFullYear();
        kony.print("dateParam is -"+dateParam+"- setting current date as firstEnabledDate -"+this.firstEnabledDateTo +"- currMonth-"+this.currMonthTo);
      }
    },

    setLastEnabledDateTo: function (dateParam) { //dateParam : mm/dd/yyyy
      kony.print("in start of set last enabled date function");
      if (dateParam == undefined) {
        if (this.lastEnabledDateTo == "" || this.lastEnabledDateTo == undefined) {
          kony.print("lastenabled date is undefined or empty");
          this.lastEnabledDateTo = new Date(this.firstEnabledDateTo);
          this.lastEnabledDateTo.setFullYear(this.lastEnabledDateTo.getFullYear() + 1);
        } else if (isNaN(this.lastEnabledDateTo.getTime())) {
          kony.print("lastEnabled Date is NAN");
          this.lastEnabledDateTo = new Date(this.firstEnabledDateTo);
          this.lastEnabledDateTo.setFullYear(this.lastEnabledDateTo.getFullYear() + 1);
        }
      } else {
        kony.print("date param is present"+ dateParam);
        var dateSplit = dateParam.split("/"); //mm,dd,yyyy
        kony.print("dateSplit" + dateSplit);
        this.lastEnabledDateTo = new Date(dateSplit[2], parseInt(dateSplit[0]) - 1, dateSplit[1]); //yyyy,mm,dd
        kony.print("last enabled date is set - "+ this.lastEnabledDateTo);
      }
      kony.print("in end of set last enabled date function");
    },
    setSelectedDateTo: function (dateParam) {
      this.view.lblError.setVisibility(false);
      var currForm = this.getCurrentFormName();
      if(dateParam == "" || dateParam == undefined || dateParam == null){
        kony.print("returning as dateParam is empty");
        return;
      }
     this.eDate = dateParam;
      var today = new Date().toLocaleDateString();
      var dateParam1 = today.split("/")[0]+"/"+today.split("/")[1]+"/"+today.split("/")[2];
      if(dateParam != dateParam1){
        // currForm.btnPeriodicDays.skin = "sknBtnSSP0273e315px";
        // currForm.btnThreeMonths.skin = "sknBtnSSP0273e315px";
        // currForm.btnSixMonths.skin = "sknBtnSSP0273e315px";
        // currForm.btnLastYear.skin = "sknBtnSSP0273e315px";
      }
      var dateSplit;
      if (dateParam.indexOf('/')!= -1) {
        kony.print("date param has slashes");
        dateSplit = dateParam.split("/");  
      } else if(dateParam.indexOf('-')!= -1){
        kony.print("date param has hiphens!!!");
        dateSplit = dateParam.split("-"); //mm,dd,yyyy  
      } else if(dateParam.indexOf('.')!= -1){
        kony.print("date param has dots!!!");
        dateSplit = dateParam.split("."); //mm,dd,yyyy  
      }
      var d = new Date(dateSplit[2], parseInt(dateSplit[0]) - 1, dateSplit[1]); //yyyy,mm,dd
      kony.print("date param date obj : " + d);
      if (this.isRangeSelectableTo) {
        kony.print("range selectable is true so setting from date");
        this.setFromDateTo(dateParam);
      } else if (this.selectedDateTo == '' || this.selectedDateTo == undefined) {
        kony.print("selected date is empty. setting " + d + " as selected date");
        this.selectedDateTo = d;
        this.currMonthTo = this.selectedDateTo.getMonth();
        this.currYearTo = this.selectedDateTo.getFullYear();
      } else {
        kony.print("range is not selectable and selected date is changed. setting -" + d + "- as selected date");
        this.selectedDateTo = d;
        this.currMonthTo = this.selectedDateTo.getMonth();
        this.currYearTo = this.selectedDateTo.getFullYear();
      }
      this.reRenderCurrentMonthSkinsTo();
      this.addHolidaysTo();
      this.updateDateBulletsTo();
      kony.print("setSelectedDate function ended");
    },
    setFromDateTo: function (dateParam) {
      var dateSplit = dateParam.split("/"); //mm,dd,yyyy
      var d = new Date(dateSplit[2], parseInt(dateSplit[0]) - 1, dateSplit[1]); //yyyy,mm,dd
      if (this.fromDateTo == '' || this.fromDateTo == undefined) {
        this.fromDateTo = d;
      } else if (this.fromDateTo.getTime() == d.getTime()) {
        this.fromDateTo = '';
      } else {
        this.setToDateTo(dateParam);
      }
    },
    setToDateTo: function (dateParam) {
      var dateSplit = dateParam.split("/"); //mm,dd,yyyy
      this.toDateTo = new Date(dateSplit[2], parseInt(dateSplit[0]) - 1, dateSplit[1]); //yyyy,mm,dd
    },
    preShowTo: function () {
      this.selectedDateTo = '';
      var d2 = new Date();
      if (this.currentDateTo == "" || this.currentDateTo == undefined) {
        this.currentDateTo = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate());
        this.currMonthTo = this.currentDateTo.getMonth();
        this.currYearTo = this.currentDateTo.getFullYear();
      }
      kony.print("in preshow before initActions currentMonth : " + this.currMonthTo);
      var scope = this;
      this.initActionsTo();
      kony.print("in preshow after init Actions currentMonth : " + this.currMonthTo);
      // this.setFirstEnabledDate();
      kony.print("in preshow after setFirstEnabledDate currentMonth : " + this.currMonthTo);
      // this.setLastEnabledDateTo();
      kony.print("in preshow currentMonth : " + this.currMonthTo);
      this.resetCalTo();
      this.holidaysTo = new Set();
      this.addHolidaysTo();
      //  if(kony.application.getCurrentForm().id == "frmBillPayEndDate")
      // this.setRangeSkinsTo();
    },
    getDateTo:function(day){
      day = Number(day);
      var currentMonth = this.currMonthTo + 1;
      if(currentMonth < 10)
        currentMonth = "0" + currentMonth;
      if(day < 10)
        day = "0" + day;
      return (this.currYearTo + "-" + currentMonth	  + "-" + day);
    },
    addHolidaysTo:function(){
      var week;
      for (var i = 0; i < 6; i++) {
        if(this.view.flxMonthTo.widgets().length <= 1){
          break;
        }
        else{
          week = this.view.flxMonthTo.widgets()[1].widgets()[i].widgets(); 
        }
        for (var j = 0; j < 7; j++) {
          if (week[j].text != "S" && week[j].isVisible && this.holidaysTo.has(this.getDateTo(week[j].text))) {
            week[j].skin = this._weekEndSkin;
            week[j].setEnabled(false);
          }
        }
      }
    },
    setRangeSkinsTo: function(){
      var startDate = this.prevSelectedDateTo;
      var deliverDate = this.deliverDateTo;
      for (var i = 0; i < 6; i++) {
        var week = this.view.flxMonthTo.widgets()[1].widgets()[i].widgets();
        for (var j = 0; j < 7; j++) {
          if(week[j].text == 'S')
            continue;
          var current = new Date(this.currYearTo,this.currMonthTo,week[j].text);
          if(this.selectedDateTo!=='' && current.getTime() == startDate.getTime() && this.selectedDateTo.getTime()==startDate.getTime())
          {
            week[j].skin = this.selectedDateSkinTo;
            continue;
          }
          if(current.getTime() == startDate.getTime())
          {
            if(this.transitDaysTo!=0)
              week[j].setEnabled(false);
            week[j].skin = this._startDateRangeSkin;
          }
          else if(current>startDate && current<deliverDate)
          {
            if(week[j].skin == this._unselectedDateSkin)
              week[j].skin = this._unSelectedRangeSkin;
            else if(week[j].skin == this._disabledDateSkin)
              week[j].skin = this._disabledRangeSkin;
            week[j].setEnabled(false);
          }
          else if((current.getTime() == deliverDate.getTime())||(this.selectedDateTo !== '' && current>deliverDate && current<this.selectedDateTo))
          {
            if(week[j].skin == this._unselectedDateSkin)
              week[j].skin = this._unSelectedRangeSkin;
            else if(week[j].skin == this._disabledDateSkin)
              week[j].skin = this._disabledRangeSkin;
          }
          else if(current<startDate)
            week[j].setEnabled(false);
          else
            continue;
        }
      }
    },
    setMonthLabelTextTo: function () {
      var currMonth = {
        0: "Jan",
        1: "Feb",
        2: "Mar",
        3: "Apr",
        4: "May",
        5: "Jun",
        6: "Jul",
        7: "Aug",
        8: "Sep",
        9: "Oct",
        10: "Nov",
        11: "Dec"
      };
      this.view.lblMonthTo.text = currMonth[this.currMonthTo] + " "+ this.currYearTo;
      //       if(kony.application.getCurrentForm().id === "frmLRStartDateSelection"){
      //         this.view.lblMonth.text = currMonth[this.currMonth];
      //       }
    },
    setMaxDaysTo: function (month, year) {
      if (month == 1 && year % 4 == 0) {
        return 29;
      } else if (month == 1) {
        return 28;
      }
      var monthMaxDays = {
        0: 31,
        2: 31,
        3: 30,
        4: 31,
        5: 30,
        6: 31,
        7: 31,
        8: 30,
        9: 31,
        10: 30,
        11: 31,
      };
      return monthMaxDays[month];
    },
    clickedOnDateTo: function (widgetRef) { //triggered on touch end of a date
      this.view.flxSubmitBtnWrapper.setVisibility(true);
     var tabName = this.tabName;
      if (widgetRef.skin == this._disabledDateSkin || widgetRef.skin == this._disabledRangeSkin) {
        return;
      }
      var currForm = this.getCurrentFormName();
      var selectionDateOnTo="";
      var prevDate = "";
      if(tabName === this.getFieldValue("{i.i18n.wealth.reports}")){
        prevDate=currForm.flxInside.lblText.text;
      }else{
         prevDate=currForm.flxInsideCalendar.lblAutoDays.text
      }
      var fromDate = "";
      var startDate = "";
      var endDate = "";
      var toDate = new Date((this.currMonthTo + 1) + "/" + widgetRef.text + "/" + this.currYearTo);
      if(this.selectedDate != ""){  //this is the case when fromDate is selected from beginning and we click on toDate calendar
        fromDate = new Date(this.selectedDate);
        if(fromDate.getTime() <= toDate.getTime()){
          this.setSelectedDateTo((this.currMonthTo + 1) + "/" + widgetRef.text + "/" + this.currYearTo); //mm/dd/yyyy
          this.setMonthLabelTextTo();
          selectionDateOnTo = (this.currMonth + 1) + "/" + this.selectedDate.getDate() + "/" + this.currYear + " - " + (this.currMonthTo + 1) + "/" + widgetRef.text + "/" + this.currYearTo;
         startDate= this.dateToString(this.selectedDate);
         endDate= (this.currMonthTo + 1) + "/" + widgetRef.text+"/"+ this.currYearTo;
          // if startDate exists then enable the button and if user clicks on apply then make these dates as global dates
          //enable button
         this.enableButton(this.view.btnApply);
          if(tabName === this.getFieldValue("{i.i18n.wealth.reports}")){
            currForm.flxInside.lblText.text = selectionDateOnTo;
          }else{
             currForm.flxInsideCalendar.lblAutoDays.text = selectionDateOnTo;
          }
         // kony.application.getCurrentForm().portfolioDetails.getStartAndEndDatefromDateRangeComponent(startDate+"/"+endDate,prevDate);
        }else{
           if(tabName === this.getFieldValue("{i.i18n.wealth.reports}")){
            currForm.flxInside.lblText.text = prevDate;
          }else{
             currForm.flxInsideCalendar.lblAutoDays.text = prevDate;
          }
        }
      }else{
        this.setSelectedDateTo((this.currMonthTo + 1) + "/" + widgetRef.text + "/" + this.currYearTo); //mm/dd/yyyy
          this.setMonthLabelTextTo();
          selectionDateOnTo = "MM/DD/YYYY" + " - " + (this.currMonthTo + 1) + "/" + widgetRef.text + "/" + this.currYearTo;
          startDate= this.dateToString(this.selectedDate);
          endDate= this.currYearTo+"-"+(this.currMonthTo + 1) + "-" + widgetRef.text;
          this.disableButton(this.view.btnApply);
          if(tabName === this.getFieldValue("{i.i18n.wealth.reports}")){
            currForm.flxInside.lblText.text = selectionDateOnTo;
          }else{
             currForm.flxInsideCalendar.lblAutoDays.text = selectionDateOnTo;
          }
          //kony.application.getCurrentForm().portfolioDetails.getStartAndEndDatefromDateRangeComponent(startDate+"/"+endDate);
      }
      
      this.sDate = startDate;
      this.eDate = endDate;
       if(tabName === this.getFieldValue("{i.i18n.wealth.reports}")){
            currForm.flxInside.lblText.isVisible = true;
        }else{
             currForm.flxInsideCalendar.lblAutoDays.isVisible = true;
        }
      if (this.triggerContinueActionTo) {
        kony.print("about to call triggerContinue Function");
        this.triggerContinueTo();
      }
     this.unHighlighEveryButton();
    },
    initActionsTo: function () {
      var scope = this;

      this.view.flxMonthTo.setGestureRecognizer(constants.GESTURE_TYPE_SWIPE, {
        fingers: 1
      },
                                                function (widgetRef, gestureInfo) {
        kony.print("swiped isSwiped:"+scope.isSwipedTo);
        if (scope.isSwipedTo == true) {
          return;
        }
        scope.isSwipedTo=true;
        if (gestureInfo.swipeDirection === 1) {
          kony.print("swiped right");
          scope.view.flxNextMonthTo.onClick();
        } else if (gestureInfo.swipeDirection === 2) {
          kony.print("swiped left");
          scope.view.flxPreviousMonthTo.onClick();
        }
      }
                                               );
      this.view.flxNextMonthTo.onClick = function () {
        scope.view.flxNextMonthTo.setEnabled(false);
        scope.view.flxPreviousMonthTo.setEnabled(false);
        scope.unHighlightRangeTo();
        scope.view.flxMonthTo.widgets()[1].animate(
          kony.ui.createAnimation({
            "100": {
              "left": "-100%",
              "stepConfig": {
                "timingFunction": kony.anim.EASE
              }
            }
          }), {
            "delay": 0,
            "iterationCount": 1,
            "fillMode": kony.anim.FILL_MODE_FORWARDS,
            "duration": 0.25
          }, {
            "animationEnd": function () {}
          });
        scope.view.flxMonthTo.widgets()[2].animate(
          kony.ui.createAnimation({
            "100": {
              "left": "0%",
              "stepConfig": {
                "timingFunction": kony.anim.EASE
              }
            }
          }), {
            "delay": 0,
            "iterationCount": 1,
            "fillMode": kony.anim.FILL_MODE_FORWARDS,
            "duration": 0.25
          }, {
            "animationEnd": function () {
              var month = scope.view.flxMonthOneDummyTo.clone(scope.view.flxMonthTo.widgets()[0].id.slice(0, 2));
              scope.view.flxMonthTo.removeAt(0);
              month.left = "100%";
              scope.view.flxMonthTo.addAt(month, 2);
              scope.currMonthTo += 1;
              if (scope.currMonthTo == 12) {
                var tempYear = parseInt(scope.currYearTo) + 1;
                scope.currYearTo = tempYear;
                scope.currMonthTo = 0;
              }
              scope.setMonthDataTo(2, scope.currMonthTo, scope.currYearTo);
              scope.setMonthLabelTextTo();
              scope.addHolidaysTo();
              // if(kony.application.getCurrentForm().id == "frmBillPayEndDate")
              // scope.setRangeSkinsTo();
              scope.view.flxNextMonthTo.setEnabled(true);
              scope.view.flxPreviousMonthTo.setEnabled(true);
              scope.isSwipedTo = false;
            }
          });
      }
      this.view.flxPreviousMonthTo.onClick = function () {
        scope.view.flxNextMonthTo.setEnabled(false);
        scope.view.flxPreviousMonthTo.setEnabled(false);
        scope.unHighlightRangeTo();
        scope.view.flxMonthTo.widgets()[1].animate(
          kony.ui.createAnimation({
            "100": {
              "left": "100%",
              "stepConfig": {
                "timingFunction": kony.anim.EASE
              }
            }
          }), {
            "delay": 0,
            "iterationCount": 1,
            "fillMode": kony.anim.FILL_MODE_FORWARDS,
            "duration": 0.25
          }, {
            "animationEnd": function () {}
          });
        scope.view.flxMonthTo.widgets()[0].animate(
          kony.ui.createAnimation({
            "100": {
              "left": "0%",
              "stepConfig": {
                "timingFunction": kony.anim.EASE
              }
            }
          }), {
            "delay": 0,
            "iterationCount": 1,
            "fillMode": kony.anim.FILL_MODE_FORWARDS,
            "duration": 0.25
          }, {
            "animationEnd": function () {
              var month = scope.view.flxMonthOneDummyTo.clone(scope.view.flxMonthTo.widgets()[2].id.slice(0, 2));
              scope.view.flxMonthTo.removeAt(2);
              month.left = "-100%";
              scope.view.flxMonthTo.addAt(month, 0);
              scope.currMonthTo -= 1;
              if (scope.currMonthTo == -1) {
                scope.currMonthTo = 11;
                scope.currYearTo -= 1;
              }
              scope.setMonthDataTo(0, scope.currMonthTo, scope.currYearTo);
              scope.setMonthLabelTextTo();
              scope.addHolidaysTo();
              //if(kony.application.getCurrentForm().id == "frmBillPayEndDate")
              //scope.setRangeSkins();
              scope.view.flxNextMonthTo.setEnabled(true);
              scope.view.flxPreviousMonthTo.setEnabled(true);
              scope.isSwipedTo = false;
            }
          });
      }
      this.view.flxPrevYearTo.onClick = function () {
        scope.view.flxPrevYearTo.setEnabled(false);
        scope.view.flxNextYearTo.setEnabled(false);
        // var currForm = kony.application.getCurrentForm().OverviewTabHeader.returnCurrComponent();
        var olddate = new Date(scope.selectedDateTo);
        scope.unHighlightRangeTo();
        scope.view.flxMonthTo.widgets()[1].animate(
          kony.ui.createAnimation({
            "100": {
              "left": "100%",
              "stepConfig": {
                "timingFunction": kony.anim.EASE
              }
            }
          }), {
            "delay": 0,
            "iterationCount": 1,
            "fillMode": kony.anim.FILL_MODE_FORWARDS,
            "duration": 0.25
          }, {
            "animationEnd": function () {}
          });
        scope.view.flxMonthTo.widgets()[0].animate(
          kony.ui.createAnimation({
            "100": {
              "left": "0%",
              "stepConfig": {
                "timingFunction": kony.anim.EASE
              }
            }
          }), {
            "delay": 0,
            "iterationCount": 1,
            "fillMode": kony.anim.FILL_MODE_FORWARDS,
            "duration": 0.25
          }, {
            "animationEnd": function () {
              // var month = scope.view.flxMonthOneDummy.clone(scope.view.flxMonth.widgets()[2].id.slice(0, 2));
              // scope.view.flxMonth.removeAt(2);
              // month.left = "-100%";
              // scope.view.flxMonth.addAt(month, 0);
              // scope.currMonth -= 1;
              //if (scope.currMonth == -1) {
              //  scope.currMonth = 11;
              scope.currYearTo -= 1;
              // }
              var newDate = new Date((scope.currMonthTo + 1) + "/" + scope.selectedDateTo.getDate()+ "/" + scope.currYearTo)
              //scope.setMonthDataTo(0, scope.currMonthTo, scope.currYearTo);
			  scope.resetCalTo();
              scope.setMonthLabelTextTo();
              scope.addHolidaysTo();
              //               if(kony.application.getCurrentForm().id == "frmBillPayEndDate")
              //                 scope.setRangeSkins();
              scope.view.flxPrevYearTo.setEnabled(true);
              scope.view.flxNextYearTo.setEnabled(true);

              if(olddate == newDate){
                scope.reRenderCurrentMonthSkinsTo();
              }
              scope.isSwipedTo = false;
            }
          });
      }
      this.view.flxNextYearTo.onClick = function () {
        scope.view.flxPrevYearTo.setEnabled(false);
        scope.view.flxNextYearTo.setEnabled(false);
        var olddate = new Date(this.selectedDateTo);
        scope.unHighlightRangeTo();
        scope.view.flxMonthTo.widgets()[1].animate(
          kony.ui.createAnimation({
            "100": {
              "left": "100%",
              "stepConfig": {
                "timingFunction": kony.anim.EASE
              }
            }
          }), {
            "delay": 0,
            "iterationCount": 1,
            "fillMode": kony.anim.FILL_MODE_FORWARDS,
            "duration": 0.25
          }, {
            "animationEnd": function () {}
          });
        scope.view.flxMonthTo.widgets()[0].animate(
          kony.ui.createAnimation({
            "100": {
              "left": "0%",
              "stepConfig": {
                "timingFunction": kony.anim.EASE
              }
            }
          }), {
            "delay": 0,
            "iterationCount": 1,
            "fillMode": kony.anim.FILL_MODE_FORWARDS,
            "duration": 0.25
          }, {
            "animationEnd": function () {

              scope.currYearTo += 1;
              // }
              var newDate = new Date((scope.currMonthTo + 1) + "/" + scope.selectedDateTo.getDate()+ "/" + scope.currYearTo)
              //scope.setMonthDataTo(0, scope.currMonthTo, scope.currYearTo);
			  scope.resetCalTo();
              scope.setMonthLabelTextTo();
              scope.addHolidaysTo();
              //               if(kony.application.getCurrentForm().id == "frmBillPayEndDate")
              //                 scope.setRangeSkins();
              scope.view.flxPrevYearTo.setEnabled(true);
              scope.view.flxNextYearTo.setEnabled(true);

              if(olddate == newDate){
                scope.reRenderCurrentMonthSkinsTo();
              }
              scope.isSwipedTo = false;
            }
          });
      }
      for (var i = 0; i < 6; i++) {
        var week = this.view.flxMonthDummyTo.widgets()[0].widgets()[i].widgets();
        for (var j = 0; j < 7; j++) {
          week[j].onTouchEnd = function (widgetRef) {
            scope.clickedOnDateTo(widgetRef);
            // if(kony.application.getCurrentForm().id == "frmBillPayEndDate"){
            // scope.setRangeSkins();
            // }
          }
        }
      }
    },
    unHighlightRangeTo: function () {
      this.view.lblError.setVisibility(false);
      for (i = 0; i < this.view.flxHighlightTo.widgets().length; i++) {
        this.view.flxHighlightTo.widgets()[i].width = '0%';
        this.view.flxHighlightTo.widgets()[i].left = '0%';
      }
    },
    hightlightRangeTo: function () { //need to refactor
      this.view.lblError.setVisibility(false);
      if (this.selectedDateTo === '') {
        return;
      }
      var breakFlag = false;
      var selectedDate = this.dateToString(this.toDate).split("/");
      selectedDate = selectedDate.map(function (e) {
        return parseInt(e);
      });
      var fromDate = this.fromDateTo.split("/");
      fromDate = fromDate.map(function (e) {
        return parseInt(e);
      });
      var i;
      if (this.currMonthTo < fromDate[0] || this.currMonthTo > selectedDate[0]) {
        return;
      }
      if (fromDate[0] < (this.currMonthTo)) {
        fromDate[1] = 1;
      }
      if (this.currMonthTo < selectedDate[0]) {
        selectedDate[1] = this.setMaxDaysTo(this.currMonthTo, this.currYearTo);
      }
      for (i = 0; i < 6; i++) {
        var week = this.view.flxMonthTo.widgets()[1].widgets()[i].widgets();
        for (var j = 0; j < 7; j++) {
          if (week[j].text == fromDate[1] && week[j].isVisible) {
            this.view.flxHighlightTo.widgets()[i].left = j * 35 + "dp";
            this.view.flxHighlightTo.widgets()[i].width = (7 - j) * 35 + "dp";
            for (let k = j; k < 7; k++) { //setting selected skin
              week[k].skin = this._selectedDateSkin;
            }
            if (selectedDate[1] - fromDate[1] < 7 - j) { //same week
              this.view.flxHighlightTo.widgets()[i].width = (selectedDate[1] - fromDate[1] + 1) * 35 + "dp";
              for (k = j + selectedDate[1] - fromDate[1] + 1; k < 7; k++) { //setting unselected skin
                week[k].skin = this._unselectedDateSkin;
              }
              i = 10;
            }
            breakFlag = true;
            break;
          }
        }
        if (breakFlag == true) {
          break;
        }
      }
      breakFlag = false;
      for (i = i + 1; i < 6; i++) {
        var week = this.view.flxMonthTo.widgets()[1].widgets()[i].widgets();
        for (var j = 0; j < 7; j++) {
          if (week[j].text == selectedDate[1]) {
            this.view.flxHighlightTo.widgets()[i].left = "0%";
            this.view.flxHighlightTo.widgets()[i].width = (j + 1) * 35 + "dp";
            for (k = 0; k < j + 1; k++) { //setting selected skin
              week[k].skin = this._selectedDateSkin;
            }
            breakFlag = true;
            break;
          }
        }
        if (breakFlag == true) {
          break;
        }
        this.view.flxHighlightTo.widgets()[i].left = "0%";
        this.view.flxHighlightTo.widgets()[i].width = "100%";
        for (k = 0; k < 7; k++) { //setting selected skin
          week[k].skin = this._selectedDateSkin;
        }
      }
    },
    getSelectedDateTo: function () {
      var dateVal;
      kony.print("inside getSelectedDate function selectedDate: " + this.selectedDateTo);
      if (this.selectedDateTo == '' || this.selectedDateTo == undefined) {
        kony.print("inside getSelectedDate selectedDate: " + this.selectedDate);
        return '';
      } else {
        dateVal = this.dateToString(this.selectedDateTo);
      }
      kony.print("dateVal: " + dateVal);
      var temp = dateVal.split('/');
      kony.print("temp[0]: " + temp[0] + "  -- temp[1]: " + temp[1] + "  --temp[2]" + temp[2]);
      if (temp[0].length == 1) {
        temp[0] = '0' + temp[0];
      }
      if (temp[1].length == 1) {
        temp[1] = '0' + temp[1];
      }
      dummy = temp[0] + '/' + temp[1] + '/' + temp[2];
      return dummy;
    },
    updateDateBulletsTo: function () {
      kony.print("inside update bullets function");
      var currForm =this.getCurrentFormName();
      var dateLabels = currForm.flxFromDateValue.widgets();
      var dummy = '';
      var skin = '';
      var locale = kony.i18n.getCurrentLocale();
      locale=locale.toLowerCase();
      locale=locale.replace("_","-");
      //var locale = "sv"
      if (this.selectedDateTo === '') {
        //         currForm.btnContinue.skin = 'sknBtna0a0a0SSPReg26px';
        //         currForm.btnContinue.setEnabled(false);
        //         dummy = 'MM/DD/YYYY';
        if(locale=="en-us" || locale=="en"){
          dummy = 'MM/DD/YYYY';
        }
        else if(locale=="en-gb" || locale === "fr-fr" || locale=="es-es"){
          dummy = 'DD/MM/YYYY';
        }
        else if(locale=="de-de"){
          dummy = 'DD.MM.YYYY';
        }
        else if(locale=="sv-se"){
          dummy = 'YYYY-DD-MM';
        }
        skin = 'sknLbl424242SSPReg26px';
      } else {
        //         currForm.btnContinue.skin = 'sknBtn0095e426pxEnabled';
        //         currForm.btnContinue.setEnabled(true);
        skin = 'sknLbl424242SSPReg26px';
        var options={
          year: "numeric",
          month: "2-digit",
          day: "2-digit"
        };
        dummy=this.selectedDateTo.toLocaleDateString(locale,options);
        kony.print("In update bullets getselectedDate mein ka dummy" + dummy)
      }
      for (var i = 0; i < dateLabels.length; i++) {
        dateLabels[i].text = dummy[i];
        dateLabels[i].skin = skin;
      }
      this.view.forceLayout();
      kony.print("update bullets function ended");
    },
    triggerContinueTo: function () {
      if(this.updateBottomLabelTo){
        var currForm = kony.application.getCurrentForm();
        currForm.customCalendar.onTouchEnd();
      }
      else{
        if (this.selectedDateTo === '') {
          kony.print("selected date is null");
          return;
        }
        //    kony.print("about to call onClick of btnContinue in Form controller");
        //  var currForm = kony.application.getCurrentForm();
        // currForm.btnContinue.onClick();
        // kony.print("called onClick of btnContinue in Form controller");
      }},
    diffDaysTo :   function (fromDate, toDate) {
      fromDate  =  fromDate.split('/');
      toDate  =  toDate.split('/');
      fromDate  =  new  Date(fromDate[2],  fromDate[0],  fromDate[1]);
      toDate  =  new  Date(toDate[2],  toDate[0],  toDate[1]);
      fromDate_unixtime  =  parseInt(fromDate.getTime()  /  1000);
      toDate_unixtime  =  parseInt(toDate.getTime()  /  1000);
      var  timeDifference  =  toDate_unixtime  -  fromDate_unixtime;
      var  timeDifferenceInDays  =  timeDifference  /  60  /  60  /  24;
      return  timeDifferenceInDays - 1;
    },
    
    setPreshowInitialization : function(){
      this.preShowTo();
      this.triggerContinueAction = false;
      this.triggerContinueActionTo = false;
      this.updateDateBullets();
      this.updateDateBulletsTo();
      var startDate = new Date();
      var pastDate = (startDate.getMonth() + 1) + "/" + startDate.getDate() + "/" + (startDate.getFullYear() - 2);
      var currentDate = (startDate.getMonth() + 1) + "/" + (startDate.getDate() + 1) + "/" + startDate.getFullYear();
      this.setFirstEnabledDate(pastDate);
      this.setLastEnabledDate(currentDate);
      this.setFirstEnabledDateTo(pastDate);
      this.setLastEnabledDateTo(currentDate);
	  this.disableButton(this.view.btnApply);
    },
    fromDateCalculation: function(n) { 
      try{
      var date = Date.now() - 1000 * 60 * 60 * 24 * n;
      var pastDate = new Date(date);
      var month = pastDate.getMonth() + 1;
      var fromDate = pastDate.getDate();
      if (month < 10) {
        month = "0" + month;
      }
      if (fromDate < 10) {
        fromDate = "0" + fromDate;
      }
      var fromDateVal = month + "/" + fromDate + "/" + pastDate.getFullYear();
      //this.fromDateCalcOnBtnSelection(fromDateVal);
      this.setSelectedDate(fromDateVal, "fromCal");
      this.sDate = this.dateToStringYearFirst(fromDateVal);
      this.setMonthLabelText();
     // this.setMonthData(0,month,pastDate.getFullYear()); //
      var startDate = new Date();
       var newMonth = startDate.getMonth() + 1;
      var newToDate = startDate.getDate();
       if (newMonth < 10) {
        newMonth = "0" + newMonth;
      }
      if (newToDate < 10) {
        newToDate = "0" + newToDate;
      }
      var toDate = newMonth + "/" + newToDate + "/" + startDate.getFullYear();
      this.setSelectedDateTo(toDate);
      this.eDate=this.dateToStringYearFirst(toDate);
      this.setMonthLabelTextTo();
         } catch (err) {
        var errObj = {
          "errorInfo": "Error in renderSuccessOrFailureUI",
          "error": err
        };
        this.onError(errObj);
      }
    },
  
    disableButton : function(button) {
      button.setEnabled(false);
      button.skin = "sknBtnBlockedSSP0273e315px";
      button.hoverSkin = "sknBtnBlockedSSP0273e315px";
      button.focusSkin = "sknBtnBlockedSSP0273e315px";
    },
    enableButton : function(button) {
      button.setEnabled(true);
      button.skin = "sknBtnNormalSSPFFFFFF15Px";
      button.hoverSkin = "sknBtnNormalSSPFFFFFFHover15Px";
      button.focusSkin = "sknBtnNormalSSPFFFFFF15PxFocus";
    },
    onClickClear:function(){
      this.disableButton(this.view.btnApply);
      var prevDate = this.view.lblAutoDays.text ;
      this.view.lblAutoDays.text = "MM/DD/YYYY - MM/DD/YYYY";
      this.reRenderCurrentMonthSkins("fromClear");
      this.reRenderCurrentMonthSkinsTo("fromClear");
      this.view.btnSevenDays.skin = "sknBtnSSP0273e315px";
      this.view.btnPeriodicDays.skin = "sknBtnSSP0273e315px";
      this.view.btnThreeMonths.pressedSkin = "sknBtnSSP0273e315px";
      this.view.btnThreeMonths.skin = "sknBtnSSP0273e315px";
      this.view.btnSixMonths.skin = "sknBtnSSP0273e315px";
      this.view.btnLastYear.skin = "sknBtnSSP0273e315px";
     
    },
    dateToString: function (dateObj) {
      if (dateObj instanceof Date) {
        if (!isNaN(dateObj.getTime())) {
          return ((dateObj.getMonth() + 1) + "/" + dateObj.getDate() + "/" + dateObj.getFullYear());
        }
      }
      return "";
    },

     dateToStringWithHipehens: function (dateObj) {
          return ((dateObj.split("-")[1]) + "/" + (dateObj.split("-")[2]) + "/" + (dateObj.split("-")[0]));
    },
    getStartAndEndDatefromDateRangeComponent:function(combinedDate,prevDate){
      this.combinedDate = combinedDate; 
      this.prevFromDateOfCustom = prevDate;
    },
    resetCalendar: function(){
      this.view.lblError.setVisibility(false);
      this.resetCal();
      this.resetCalTo();
      
    },
    serviceCallWithDateChangeParams : function(){
      var tab = this.tabMapping[this.selectedTab];
	  var st  = new Date(this.dateToStringWithHipehens(this.sDate));
	  var e  = new Date(this.dateToStringWithHipehens(this.eDate));
      if(tab == "Accounts Activity"){
        this.startDate = st.getFullYear()  + ('0' + (st.getMonth() + 1)).slice(-2)  + ('0' + st.getDate()).slice(-2);
	    this.endDate = e.getFullYear()  + ('0' + (e.getMonth() + 1)).slice(-2)  + ('0' + e.getDate()).slice(-2);
      }else{
	    this.startDate = st.getFullYear() + '-' + ('0' + (st.getMonth() + 1)).slice(-2) + '-' + ('0' + st.getDate()).slice(-2);
	    this.endDate = e.getFullYear() + '-' + ('0' + (e.getMonth() + 1)).slice(-2) + '-' + ('0' + e.getDate()).slice(-2);
      }
    },
    setDefaultDateFilter : function(filterKey){
      try{
      if(filterKey == "" || filterKey == undefined) return;
      var index=this.defaultDateSelectionLabelsKeysArray.indexOf(filterKey);
      this.unHighlighEveryButton();
      this.view.flxSubmitBtnWrapper.setVisibility(false);
      this.view["btn"+(index+1)].skin =  "sknBtn003E75Border";
      let n = 0;
      switch (filterKey){
        case "30D":
           n = 30;
          break;
        case "7D":
          n = 7;
          break;
        case "3M":
		  let currDate = new Date();
		  let prev3Month = new Date();
          prev3Month.setMonth(prev3Month.getMonth() - 3);
          let startDate = new Date(prev3Month);            
          //calculate time difference  
          var time_difference = currDate.getTime() - startDate.getTime();  
          //calculate days difference by dividing total milliseconds in a day  
          var days_difference = time_difference / (1000 * 60 * 60 * 24); 
          n = parseInt(days_difference);
          break;
          //n = 90;
          break;
        case "6M":
          let currentDate = new Date();
		  let prev6Month = new Date();
          prev6Month.setMonth(prev6Month.getMonth() - 6);
          let fromDate = new Date(prev6Month);            
          //calculate time difference  
          var time_difference = currentDate.getTime() - fromDate.getTime();  
          //calculate days difference by dividing total milliseconds in a day  
          var days_difference = time_difference / (1000 * 60 * 60 * 24); 
          n = parseInt(days_difference);
		  //n = 180;
          break;
        case "1Y":
          let currYear = new Date();
		  let prevYear = new Date();
          prevYear.setFullYear(prevYear.getFullYear() - 1);
          let startYear = new Date(prevYear);            
          //calculate time difference  
          var time_difference = currYear.getTime() - startYear.getTime();  
          //calculate days difference by dividing total milliseconds in a day  
          var days_difference = time_difference / (1000 * 60 * 60 * 24); 
          n = parseInt(days_difference);
		  //n = 365;
          break;
        case "YTD":
		  let today = new Date();
          let janFirst = "01" + "/" + "01" + "/"+ today.getFullYear();
          let firstDateOfYear = new Date(janFirst);            
         //calculate time difference  
         var time_difference = today.getTime() - firstDateOfYear.getTime();  
         //calculate days difference by dividing total milliseconds in a day  
         var days_difference = time_difference / (1000 * 60 * 60 * 24); 
          n = parseInt(days_difference);
          break;
        case "sinceInception":
          n = 365+185;
          break;
        default:
          n = 30;
          break;
         
      }
      this.fromDateCalculation(n);
         } catch (err) {
        var errObj = {
          "errorInfo": "Error in renderSuccessOrFailureUI",
          "error": err
        };
        this.onError(errObj);
      }
    },
    unHighlighEveryButton : function(){
       for(var i=0;i<this.defaultDateSelectionLabelsArray.length;i++){
         var btnId =  "btn" + (i+1);
         this.view[btnId].skin =  "sknBtnSSP0273e315px";
       }
    },
     onClickDateFilter : function(widgetInfo){
      var btnName = widgetInfo.id;
      var index = parseInt(btnName.split('n')[1])-1;
      this.setDefaultDateFilter(this.defaultDateSelectionLabelsKeysArray[index]);
      var dateObj = {
        startDate : this.dateToString(new Date(this.sDate)),
        endDate:this.dateToString(new Date(this.eDate)),
        filterSelected:true,
        dateText:widgetInfo.text,
        dateKey: this.defaultDateSelectionLabelsKeysArray[index]
      };
      this.updateDates(dateObj);
    },
    onClickApply : function(){
      try{
      if(this.tabName == "Performance"){
        let date1 = new Date(this.sDate); 
        let date2 = new Date(this.eDate); 
        // To calculate the time difference of two dates 
        let Difference_In_Time = date2.getTime() - date1.getTime(); 
        // To calculate the no. of days between two dates 
        let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24); 
        if(Difference_In_Days < 30){
          this.view.lblError.setVisibility(true);
          return;
        }
        else{
          this.view.lblError.setVisibility(false);
        }
      }
      var dateObj = {
        startDate : this.dateToString(new Date(this.sDate)),
        endDate:this.dateToString(new Date(this.eDate)),
        filterSelected:false,
        
      };
      dateObj.dateText = dateObj.startDate +"-"+dateObj.endDate;
      this.updateDates(dateObj);
         } catch (err) {
        var errObj = {
          "errorInfo": "Error in renderSuccessOrFailureUI",
          "error": err
        };
        this.onError(errObj);
      }
    },
    onClickClear:function(){
      try{
      this.disableButton(this.view.btnApply);
      var currForm = this.getCurrentFormName();
      var prevDate = "";
      if(this.tabName === this.getFieldValue("{i.i18n.wealth.reports}")){
        prevDate=currForm.flxInside.lblText.text;
        currForm.flxInside.lblText.text = "MM/DD/YYYY - MM/DD/YYYY";
      }else{
         prevDate=currForm.flxInsideCalendar.lblAutoDays.text;
        currForm.flxInsideCalendar.lblAutoDays.text = "MM/DD/YYYY-MM/DD/YYYY";
      }
      this.reRenderCurrentMonthSkins("fromClear");
      this.reRenderCurrentMonthSkinsTo("fromClear");
      this.unHighlighEveryButton();  
      this.view.lblError.setVisibility(false);
         } catch (err) {
        var errObj = {
          "errorInfo": "Error in renderSuccessOrFailureUI",
          "error": err
        };
        this.onError(errObj);
      }
    },
    setUpDateFilter : function(labels,keys,tab){
      try{
     this.hideAllFilters();
     let labelsStr; let labelsKey;
      this.tabName = tab;
      if((labels == "" || labels == undefined) && (keys == "" || keys == undefined)){
        labelsStr = this.getFieldValue(this._defaultDateSelectionLabels);
         labelsKey = this.getFieldValue(this._defaultDateSelectionKeys);
      }else{
        labelsStr = labels;
        labelsKey = keys;
      }
     //let labelsStr = this.getFieldValue(this._defaultDateSelectionLabels);
      this.defaultDateSelectionLabelsArray = labelsStr.split(",");
     // let labelsKey = this.getFieldValue(this._defaultDateSelectionKeys);
      this.defaultDateSelectionLabelsKeysArray = labelsKey.split(",");
        for(var i=0;i<this.defaultDateSelectionLabelsArray.length;i++){
         var btnId =  "btn" + (i+1);
          var vBar = "flxVBar"+ i;
         this.view[btnId].text =  this.getFieldValue(this.defaultDateSelectionLabelsArray[i]);
          this.view[btnId].onClick =  this.onClickDateFilter;
          this.view[btnId].setVisibility(true);
          if(i != this.defaultDateSelectionLabelsArray.length-1){
             this.view[vBar].setVisibility(true);
          }
        }
         } catch (err) {
        var errObj = {
          "errorInfo": "Error in renderSuccessOrFailureUI",
          "error": err
        };
        this.onError(errObj);
      }
    }
  };
});
