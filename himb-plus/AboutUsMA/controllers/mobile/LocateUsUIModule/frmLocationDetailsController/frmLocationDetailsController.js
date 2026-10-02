define({
  timerCounter : 0,
  init : function(){
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },
  frmLocationPreshow: function () {
    if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
      this.view.flxHeader.setVisibility(true);
    }
    else{
      this.view.flxHeader.setVisibility(false);
    }
    this.setFlowActions();
    this.setDetailsData();
	this.view.onDeviceBack = function () { };
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    this.view.flxServices.isVisible = false;
    this.view.segServices.isVisible = false;
    this.view.flxDetailsDirections.isVisible = false;
  },
  frmPostShow : function(){
    var Detailsheight = this.view.flxDetailsMain.frame.height;
    this.view.flxDetailsDirections.centerY = (Detailsheight/2) + "dp";
    this.view.flxSeparator.height = (Detailsheight-40) + "dp";
    this.view.forceLayout();
  },
  setFlowActions : function(){
    var scope = this;
    this.view.customHeader.flxBack.onClick = function(){
      scope.navigateBack();
    };
  },
  navigateBack : function(){
    var navManager = applicationManager.getNavigationManager();
    navManager.goBack();
  },
  
  setDetailsData: function () {
    var navigationManager = applicationManager.getNavigationManager();
    var data = navigationManager.getCustomInfo("frmLocationDetails");
    navigationManager.setCustomInfo("getDirection",data.selectedLocation);
    var selectedLocation = data.selectedLocation;
    var details = data.locationDetails;
    this.selectedLocation = selectedLocation;
    this.view.lblBranchName.text = selectedLocation.name;
    this.view.lblStatus.text = selectedLocation.calloutStatus.text;
    this.view.lblStatus.skin = selectedLocation.calloutStatus.skin;
    this.view.lblAddress1.text = selectedLocation.desc;
    this.view.lblAddress2.text = "";
    this.view.lblDistance.text = "";
    if (details && details.services) {
      selectedLocation.services = details.services;
    }
    else {
      selectedLocation.services = "No Data Available";
    }
    var serviceListValue = selectedLocation.services.split("||");
    var segListServiceData = [];
    for (var i = 0; i < serviceListValue.length; i++) {
      if (serviceListValue[i] !== 'point_of_interest') {
        segListServiceData.push({
          "lblBullet": ".",
          "lblService": serviceListValue[i]
        });
      }
    }
    this.view.segServices.setData(segListServiceData);

    if (details && details.workingHours) {
      selectedLocation.workingHours = details.workingHours;
      var days = selectedLocation.workingHours.split("||");

      for (var i = 0; i < days.length; i++) {
        days[i] = days[i].trim();
      }

      let schedule = [days[0], days[1], days[2], days[3], days[4], days[5], days[6]];
      var segListOperationData = [];
      let dayOrder = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

      const sortedDaysOrder = schedule.sort(function (a, b) {
        const dayA = a.split(':')[0].trim();
        const dayB = b.split(':')[0].trim();
        return dayOrder.indexOf(dayA) - dayOrder.indexOf(dayB);
      });

      var data = sortedDaysOrder.map(function (dataItem) {
        return {
          "lblSortedTimings": dataItem.replace(/\?/g, " to ")
        };
      });

      var fridayTime = "";
      if (details.type === "ATM" && data.length > 4) {
        fridayTime = data[4].lblSortedTimings;
      }

      for (var i = 0; i < data.length; i++) {
        var splitRes = data[i].lblSortedTimings.split(":");
        var dayName = splitRes[0];
        var timeValue = splitRes.slice(1).join(":");

        if (details.type === "ATM" && dayName === "Friday") {
          var formattedFridayTime = fridayTime.split(":");
          timeValue = formattedFridayTime.slice(1).join(":");
        }

        segListOperationData.push({
          "lblDay": dayName,
          "lblTimings": timeValue
        });
      }
    } else {
      selectedLocation.workingHours = "No Data Available";
      var days = selectedLocation.workingHours.split("||");
      var segListOperationData = [];
      for (var i = 0; i < days.length; i++) {
        if (days[i] !== 'point_of_interest') {
          segListOperationData.push({
            "lblDay": " ",
            "lblTimings": days[i]
          });
        }
      }
    }

    this.view.segOperationalHours.setData(segListOperationData);
    this.setDataToCallBranch(details);
  },

  /**
  * it enable or disable the CALL Branch button based phone value
  */
  setDataToCallBranch : function(data){
    var scopeObject = this;
    if(data && data.phone){
      this.view.btnCallBranch.isVisible = true;
      this.view.btnCallBranch.onClick = scopeObject.onBtnCallBranchClick.bind(scopeObject,data);
    }
    else{
      this.view.btnCallBranch.isVisible = false;
    }
  },
  /**
  *on CALL BRANCH click it make call to the Branch number
  */
  onBtnCallBranchClick : function(data){
    if(data.phone){
      kony.phone.dial(data.phone);
    }
  },
  getDirections : function(){
    var scopeObj = this;
    applicationManager.getPresentationUtility().showLoadingScreen();
    var selectedLocationData = this.selectedLocation;
    if(selectedLocationData !== undefined){
      var source = {};
      var destination = {};
      destination.latitude = selectedLocationData.lat;
      destination.longitude = selectedLocationData.lon;
      var positionoptions = {timeout:64000,fastestInterval:0,minimumTime : 0};
      kony.location.getCurrentPosition(success,failure,positionoptions);
      function success(response){
        if(response && response.coords && response.coords.latitude && response.coords.longitude){
          source.latitude = response.coords.latitude;
          source.longitude = response.coords.longitude;
          var navManager = applicationManager.getNavigationManager();
          navManager.setCustomInfo('LocationsCurrentForm','frmLocationDetails');
          scopeObj.view.getdirection.originPlace = response.coords.latitude+","+response.coords.longitude;
          scopeObj.view.getdirection.destinationPlace = selectedLocationData.lat+","+selectedLocationData.lon;
          applicationManager.getPresentationUtility().dismissLoadingScreen();
        }
      }
      function failure(error){
        scopeObj.geoLocationErrorCallBack(error);
        applicationManager.getPresentationUtility().dismissLoadingScreen();
      }
    }
  },
  geoLocationErrorCallBack: function(err) {
    var scopeObj = this;
    var deviceUtilManager = applicationManager.getDeviceUtilManager();
    var isIphone = deviceUtilManager.isIPhone();
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (err.code === 1) {
      var i18nKey = applicationManager.getPresentationUtility().getStringFromi18n("i18n.maps.locationPermissionDenied");
      scopeObj.bindGenericError(i18nKey);
    }
    if (err.code === 3 && !isIphone) {
      var i18n_timeOut = applicationManager.getPresentationUtility().getStringFromi18n("i18n.maps.locationTimeOut");
      scopeObj.bindGenericError(i18n_timeOut);
    }
    if (err.code === 2 && !isIphone) {
      var i18n_turnOnLocationAlert = applicationManager.getPresentationUtility().getStringFromi18n("i18n.maps.turnOnLocationAlert");
	    applicationManager.getPresentationUtility().Alert(i18n_turnOnLocationAlert, scopeObj.onClickSettingsOrCancelHandler.bind(scopeObj), constants.ALERT_TYPE_CONFIRMATION, "Cancel", "Settings", "");
    }
  },
  bindError : function(msg){
    applicationManager.getDataProcessorUtility().showToastMessageError(this, msg);
  },
  bindGenericError : function(msg)
  {
    applicationManager.getDataProcessorUtility().showToastMessageError(this,msg);
  },
});