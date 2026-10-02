/*eslint-disable*/
define(function() {
	var flagDropDown = 0;
	return {
		constructor: function(baseConfig, layoutConfig, pspConfig) {
          //this.FormatVar="";

		},
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {

		},
   postshow : function(flag,lbldata1,lbldata2,newDate)
  {
    /*const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let startStr="Date range (";
    let endStr=")";
    let day2 = day;
    let month2;
    let year2;
    if(month===12)
      {
        month2=1;
      }
    else{
       month2 = date.getMonth() +2;
    }
    if(month===12)
      {
        year2=date.getFullYear() +1;
      }
    else{
       year2 = year;
    }
    let currentDate=`${day}/${month}/${year}`;
    let endDate = ` - ${day2}/${month2}/${year2}`;
    let dateRange=currentDate.concat(endDate);
    let lef=startStr.concat(dateRange);
    let rgt=lef.concat(")");
    //let rangeDate="Date range".concat(currentDate);
    //this.view.lblRange1.text=rgt;*/
    this.view.flxDownloadClose.onTouchEnd = this.closeDownloadPopUp;
    this.view.btnCancel1.onClick=this.closeDownloadPopUp;
    this.view.flxOptions.onTouchEnd=this.enableDropDown;
    this.view.onTouchEnd = this.checkDropDown;
    this.view.SegList1.onRowClick = this.revertImage;
    this.view.btnDownload1.onClick=this.callToDownload;
    this.setSegmentWidgetDataMap();
    this.setValues();
    if(scope_WealthPresentationController.rtlLocale.includes(kony.i18n.getCurrentLocale())){
     this.view.lblRange1.left = "90dp";
    }
    //this.view.lblSelect.onTouchEnd =this.visible.bind();
    if(flag==="holdings"||flag===0 || flag===false)
      {
        this.view.lblDownload1.text=lbldata1;
        this.view.lblInfo1.text=lbldata2;
        this.view.lblRange1.setVisibility(false);
        this.view.lblTimePeriod1.setVisibility(false);
        this.view.lblFormat1.left = "20dp";
        this.view.lblFormat1.top = "100dp";
       // scope_WealthPresentationController.rtlLocale.includes(kony.i18n.getCurrentLocale())?this.view.flxOptions.left = "90dp":this.view.flxOptions.left = "110dp";
        this.view.flxOptions.top = "90dp";
        this.view.flxSegOne.top="130dp";
          
      }
    else if(flag==="orders")
      {
        this.view.lblFormat1.left = "20dp";
        this.view.lblFormat1.top = "120dp";
       //  scope_WealthPresentationController.rtlLocale.includes(kony.i18n.getCurrentLocale())?this.view.flxOptions.left = "90dp":this.view.flxOptions.left = "110dp";
        this.view.flxOptions.top = "110dp";
        this.view.flxSegOne.top="151dp";
        this.view.lblRange1.setVisibility(true);
        this.view.lblTimePeriod1.setVisibility(true);
        this.view.lblDownload1.text=lbldata1;
        this.view.lblInfo1.text=lbldata2;
        var navManager = applicationManager.getNavigationManager();
        var fromToDate = navManager.getCustomInfo('CalendarDataRequired');
        var navManager = applicationManager.getNavigationManager();
        var newStatus = navManager.getCustomInfo('CalendarAction');
        var fromDate = fromToDate[0].split("/")[1] + "/" + fromToDate[0].split("/")[0] + "/" + fromToDate[0].split("/")[2];
        var ToDate = fromToDate[1].split("/")[1] + "/" + fromToDate[1].split("/")[0] + "/" + fromToDate[1].split("/")[2];
        if (fromToDate !== undefined && newStatus==undefined) {
          this.view.lblRange1.text = newDate + " (" + fromDate + "-" + ToDate + ")";
        } 
        else if(fromToDate !== undefined && newStatus=="Applied")
        {
          if(newDate=="Previous 7 Days"|| newDate=="Previous 30 Days" || newDate=="3 Months" || newDate=="6 Months")
          {
            this.view.lblRange1.text = newDate + " (" + fromDate + "-" + ToDate + ")";
            //this.view.lblRange1.text = newDate;
          }
          else{
            this.view.lblRange1.text = newDate;
          }
        }
        else{
          this.view.lblRange1.text=rgt;
        }

      }
    else if(flag==="performance")
      {
        this.view.lblFormat1.left = "20dp";
        this.view.lblFormat1.top = "120dp";
      //   scope_WealthPresentationController.rtlLocale.includes(kony.i18n.getCurrentLocale())?this.view.flxOptions.left = "90dp":this.view.flxOptions.left = "110dp";
        this.view.flxOptions.top = "110dp";
        this.view.flxSegOne.top="151dp";
        this.view.lblRange1.setVisibility(true);
        this.view.lblTimePeriod1.setVisibility(true);
        this.view.lblDownload1.text=lbldata1;
        this.view.lblInfo1.text=lbldata2;
        var navManager = applicationManager.getNavigationManager();
        var fromToDate = navManager.getCustomInfo('CalendarDataRequired');
        var navManager = applicationManager.getNavigationManager();
        var newStatus = navManager.getCustomInfo('CalendarAction');
        var fromDate = fromToDate[0].split("/")[1] + "/" + fromToDate[0].split("/")[0] + "/" + fromToDate[0].split("/")[2];
        var ToDate = fromToDate[1].split("/")[1] + "/" + fromToDate[1].split("/")[0] + "/" + fromToDate[1].split("/")[2];
        if (fromToDate !== undefined && newStatus==undefined) {
          this.view.lblRange1.text = newDate + " (" + fromDate + "-" + ToDate + ")";
        } 
        else if(fromToDate !== undefined && newStatus=="Applied")
        {
          if(newDate=="1 Year"|| newDate=="YTD" || newDate=="Since Inception")
          {
            this.view.lblRange1.text = newDate + " (" + fromDate + "-" + ToDate + ")";
            //this.view.lblRange1.text = newDate;
          }
          else{
            this.view.lblRange1.text = newDate;
          }
        }
        else {
          this.view.lblRange1.text = rgt;
        }
        //this.view.lblRange1.text=newDate;


      }
    else if(flag==="transactions")
    {
      this.view.lblFormat1.left = "20dp";
      this.view.lblFormat1.top = "120dp";
     // scope_WealthPresentationController.rtlLocale.includes(kony.i18n.getCurrentLocale())?this.view.flxOptions.left = "90dp":this.view.flxOptions.left = "110dp";
      this.view.flxOptions.top = "110dp";
      this.view.flxSegOne.top="151dp";
      this.view.lblRange1.setVisibility(true);
      this.view.lblTimePeriod1.setVisibility(true);
      this.view.lblDownload1.text=lbldata1;
      this.view.lblInfo1.text=lbldata2;
      var navManager = applicationManager.getNavigationManager();
      var fromToDate = navManager.getCustomInfo('CalendarDataRequired');
      var navManager = applicationManager.getNavigationManager();
      var newStatus = navManager.getCustomInfo('CalendarAction');
      var fromDate = fromToDate[0].split("/")[1] + "/" + fromToDate[0].split("/")[0] + "/" + fromToDate[0].split("/")[2];
      var ToDate = fromToDate[1].split("/")[1] + "/" + fromToDate[1].split("/")[0] + "/" + fromToDate[1].split("/")[2];
      if (fromToDate !== undefined && newStatus==undefined) {
        this.view.lblRange1.text = newDate + " (" + fromDate + "-" + ToDate + ")";
      } 
      else if(fromToDate !== undefined && newStatus=="Applied")
      {
        if(newDate=="Previous 7 Days"|| newDate=="Previous 30 Days" || newDate=="3 Months" || newDate=="6 Months")
        {
          this.view.lblRange1.text = newDate + " (" + fromDate + "-" + ToDate + ")";
          //this.view.lblRange1.text = newDate;
        }
        else{
          this.view.lblRange1.text = newDate;
        }
      }
      else {
        this.view.lblRange1.text = rgt;
      }
      //this.view.lblRange1.text=newDate;

      
      
      
    }
    else{
      this.view.lblFormat1.left = "20dp";
      this.view.lblFormat1.top = "120dp";
     // scope_WealthPresentationController.rtlLocale.includes(kony.i18n.getCurrentLocale())?this.view.flxOptions.left = "90dp":this.view.flxOptions.left = "110dp";
      this.view.flxOptions.top = "110dp";
      this.view.flxSegOne.top="151dp";
      this.view.lblRange1.setVisibility(true);
      this.view.lblTimePeriod1.setVisibility(true);
      this.view.lblDownload1.text=lbldata1;
      this.view.lblInfo1.text=lbldata2;
      var navManager = applicationManager.getNavigationManager();
      var fromToDate = navManager.getCustomInfo('CalendarDataRequired');
      var navManager = applicationManager.getNavigationManager();
      var newStatus = navManager.getCustomInfo('CalendarAction');
      var fromDate = fromToDate[0].split("/")[1] + "/" + fromToDate[0].split("/")[0] + "/" + fromToDate[0].split("/")[2];
      var ToDate = fromToDate[1].split("/")[1] + "/" + fromToDate[1].split("/")[0] + "/" + fromToDate[1].split("/")[2];
      if (fromToDate !== undefined && newStatus==undefined) {
        this.view.lblRange1.text = newDate + " (" + fromDate + "-" + ToDate + ")";
      } 
      else if(fromToDate !== undefined && newStatus=="Applied")
      {
        if(newDate=="Previous 7 Days"|| newDate=="Previous 30 Days" || newDate=="3 Months" || newDate=="6 Months")
        {
          this.view.lblRange1.text = newDate + " (" + fromDate + "-" + ToDate + ")";
          //this.view.lblRange1.text = newDate;
        }
        else{
          this.view.lblRange1.text = newDate;
        }
      }
      else {
        this.view.lblRange1.text = rgt;
      }
      //this.view.lblRange1.text=newDate;



    }
    
    
  },      
      revertImage: function(){
        this.view.ImgDown1.src = "dropdown_expand.png";
      },
      
      checkDropDown: function(){
        if(flagDropDown === 1)
        {
          this.view.flxSegOne.isVisible=true;
          this.view.ImgDown1.src = "dropdown_collapse.png";
          flagDropDown = 2;
          
        }
        else if(flagDropDown === 2)
          {
            this.view.flxSegOne.isVisible=false;
          	this.view.ImgDown1.src = "dropdown_expand.png";
            flagDropDown = 0;
          }
        
      },
      
     enableDropDown : function()
      {
        
        if(flagDropDown === 0 && this.view.ImgDown1.src === "dropdown_expand.png")
        {
          this.view.flxSegOne.isVisible=true;
          this.view.ImgDown1.src = "dropdown_collapse.png";
          flagDropDown = 1;
        }
        else
          {
            this.view.flxSegOne.isVisible=false;
            this.view.ImgDown1.src = "dropdown_expand.png";
            flagDropDown = 0;
          }
      },
  visible:function()
  {
    
        this.view.flxSegOne.setVisibility(true);
      
    
},
      setSegmentWidgetDataMap : function (){
    var scope = this;
    try {
      this.view.SegList1.widgetDataMap = {
        "lblUsers": "lblUsers",
        "flxAccountTypes":"flxAccountTypes"

      };
      
      
    }
    catch (err) {
      var errorObj = {
        "level": "frmTwo",
        "method": "setSegmentWidgetDataMap",
        "error": err
      };
      scope.onError(errorObj);
    }
  },
      /*setText: function(text){
    this.view.lblValue =text;

  },*/
       setValues : function(){
    var scope = this;
    var segFilter1Data = [{
      lblUsers: {
        "text":"PDF", 
        "onTouchEnd": function(){
          scope.view.ImgDown1.src = "dropdown_expand.png";
          scope.view.flxSegOne.setVisibility(false);
          scope.view.lblValue.text="PDF";
          
	  }
     /* "flxLabel": {
        "onClick": function(){
          scope.view.SegOne.setVisibility(false);
          scope.view.lblSelect.text="car";
        }
      }*/
      }},{
        lblUsers: {  
          "text":"EXCEL (xlsx)",
          "onTouchEnd": function(){
            scope.view.ImgDown1.src = "dropdown_expand.png";
           scope.view.flxSegOne.setVisibility(false);
            scope.view.lblValue.text="EXCEL";
                          }
  /*"flxLabel": {
        "onClick": function(){
          scope.view.SegOne.setVisibility(false);
          scope.view.lblSelect.text="bike";
        }
      }*/
}},{
  lblUsers: {
    text : "CSV",
   /* "flxLabel": {
        "onClick": function(){
          scope.view.SegOne.setVisibility(false);
          scope.view.lblSelect.text="auto";
        }
      }*/
  "onTouchEnd": function(){
    	  scope.view.ImgDown1.src ="dropdown_expand.png";
          scope.view.flxSegOne.setVisibility(false);
          scope.view.lblValue.text="CSV";
	  }

  }},
      ]

 
scope.view.SegList1.setData(segFilter1Data);

},
      closeDownloadPopUp: function(){
        this.view.isVisible = false;
        this.view.lblValue.text="PDF";
      //this.view.flxDownloads.isVisible = false;
        //this.view.flxDownloads.skin = "slFbox";
      //this.offDownloadVisibility();
        
    },
      callToDownload: function(){
        let FormatVar;
        FormatVar=this.view.lblValue.text;
        //var navManager = applicationManager.getNavigationManager();
        //navManager.setCustomInfo("DownloadType",FormatVar);
        
        this.downloadFormatParams(FormatVar);
        this.closeDownloadPopUp();
      }
      
     

	};
});