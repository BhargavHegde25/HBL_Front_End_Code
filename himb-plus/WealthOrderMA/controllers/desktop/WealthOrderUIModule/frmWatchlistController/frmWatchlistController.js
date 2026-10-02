define(['FormControllerUtility', 'ViewConstants', 'CommonUtilities', 'OLBConstants', 'CampaignUtility'], function(FormControllerUtility, ViewConstants, CommonUtilities, OLBConstants, CampaignUtility) {
  var orientationHandler = new OrientationHandler();
  var responsiveUtils = new ResponsiveUtils();
  return {
   isRTL:'',
    //     updateFormUI: function(uiData) {
    //       if (uiData) {
    //         if (uiData.watchListDetails) {
    //          this.bindWatchlistInstruments(uiData.watchListDetails);
    //           }     
    //       }
    //     },

    init: function(){
      var scope = this;
      this.view.preShow = this.preShow;
      this.view.postShow = this.postShow;
      this.view.onBreakpointChange = this.onBreakpointChange;
      this.view.ackPopUp.flxCross.onTouchEnd = this.closeAckPopUp;
      this.view.WatchlistExtended.requestStart = function() {
        FormControllerUtility.showProgressBar(this.view);
      };
      this.view.WatchlistExtended.requestEnd = function() {
        FormControllerUtility.hideProgressBar(this.view);
      };
      this.view.WatchlistExtended.cancelPopUp = function(){
        scope.view.flxCancelPopUp.setVisibility(true);
      };
      this.view.WatchlistExtended.ackPopUp = function(text){
        scope.view.ackPopUp.lblPopupMessage.text = text ;
        scope.view.flxAckPopUp.setVisibility(true);
      };
      this.view.CustomPopupCancel.btnYes.onClick = function(){
        scope.view.WatchlistExtended.onRemoveAlert(true);
        scope.view.flxCancelPopUp.setVisibility(false);
      };
      this.view.CustomPopupCancel.btnNo.onClick = function(){
        scope.view.WatchlistExtended.onRemoveAlert(false);
        scope.view.flxCancelPopUp.setVisibility(false);
      };
      this.view.ackPopUp.flxCross.onClick = function(){
        scope.view.flxAckPopUp.setVisibility(false);
      };
      this.view.CustomPopupCancel.flxCross.onClick = function(){
        scope.view.WatchlistExtended.onRemoveAlert(false);
        scope.view.flxCancelPopUp.setVisibility(false);
      };
      
    },

    preShow: function(){
	  this.isRTL = scope_WealthPresentationController.rtlLocale.includes(kony.i18n.getCurrentLocale());
      scope_WealthPresentationController.depositoryId = "";
	  this.view.imgBack.src = this.isRTL ? "right_arrow.png" : "back_icon_blue.png";
      this.view.WatchlistExtended.closePopup();
      this.view.onTouchEnd = this.onFormTouchEnd;
      this.view.flxHeader.onTouchEnd = this.view.WatchlistExtended.closePopup;
      this.view.flxFooter.onTouchEnd = this.view.WatchlistExtended.closePopup;
      var navFrom = kony.application.getPreviousForm().id;
      let watchlistnav = scope_WealthPresentationController.watchlistFromPortfolio;
	  if( navFrom === "frmPortfolioOverview" || watchlistnav === "Yes"){
	  this.view.flxBack.isVisible = true;
	  this.view.lblBack.text = kony.i18n.getLocalizedString("i18n.wealth.BackToPortfolio");
	  this.view.flxGoback.onTouchEnd = this.goBackportfolio;
	  }
	  else{
	  this.view.flxBack.isVisible = true;
	  this.view.lblBack.text = kony.i18n.getLocalizedString("i18n.wealth.backtoDashboard");
	  this.view.flxGoback.onTouchEnd = this.goBackdashboard;
	  }
 
      
      this.view.customheadernew.activateMenu("Accounts", "My Accounts");
      this.view.customheadernew.flxAccounts.skin = ViewConstants.SKINS.BLANK_SKIN_TOPMENU;
    },

    onFormTouchEnd:function(){
	  this.onRefresh();
      var currFormObj = kony.application.getCurrentForm();
      if (currFormObj.customheadernew.flxContextualMenu.isVisible === true) {
        setTimeout(function() {
          currFormObj.customheadernew.flxContextualMenu.setVisibility(false);
          currFormObj.customheadernew.flxTransfersAndPay.skin = ViewConstants.SKINS.BLANK_SKIN_TOPMENU;
          currFormObj.customheadernew.imgLblTransfers.text = "O";
        }, "17ms")
      }
    },

    postShow: function() {
      this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.frame.height - this.view.flxFooter.frame.height + "dp";
      this.view.flxBack.isVisible = true; 
    },
     onRefresh: function(){
      this.view.WatchlistExtended.onRefresh();
        this.view.WatchlistExtended.onRefreshTablet();
    },

    //     onSearchBtnClick: function(dataList) {
    //       var scopeObj = this;
    //       var data1 = scopeObj.getSearchData(dataList);
    //       this.bindWatchlistInstruments(data1);
    //       scopeObj.view.forceLayout();
    //     },
    //     getSearchData: function(dataList1) {
    //       var scopeObj = this;
    //       var searchQuery = scopeObj.view.WatchlistExtended.txtSear.text.trim();
    //       if (searchQuery !== "") {
    //         var data2 = dataList1;
    //         var searchresults = [];
    //         if (!kony.sdk.isNullOrUndefined(searchQuery) && searchQuery !== "") {
    //           var j = 0;
    //           for (var i = 0; i < data2.length; i++) {
    //             var rowdata = null;
    //             if ((data2[i].lblInstruName && data2[i].lblInstruName.toUpperCase().indexOf(searchQuery.toUpperCase()) !== -1) ||
    //                 (data2[i].lblISIN && data2[i].lblISIN.toUpperCase().indexOf(searchQuery.toUpperCase()) !== -1))
    //             {
    //               rowdata = data2[i];
    //             }
    //             if (kony.sdk.isNullOrUndefined(rowdata)) {
    //               data2[i].isNoRecords = true;
    //               data2[i].lblNoResultsFound = {
    //                 "text": kony.i18n.getLocalizedString("i18n.FastTransfers.NoResultsFound")
    //               };
    //               var noRecordsData = data2[i];
    //               if (data2[i].isNoRecords === false) {
    //                 searchresults[j].push(noRecordsData);
    //                 j++;
    //               }
    //             } else {
    //               searchresults[j] = rowdata;
    //               j++;
    //             }
    //           }
    //         }
    //         return searchresults;
    //       } else {
    //         return dataList1;
    //       }
    //     },
    onBreakpointChange: function(form, width){
       responsiveUtils.onOrientationChange(this.onBreakpointChange, function() {
                 if (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) {
            this.view.WatchlistExtended.onBreakPointChangeComponent(kony.application.getCurrentForm(), kony.application.getCurrentBreakpoint());
            }
      }.bind(this));
     // responsiveUtils.onOrientationChange(this.onBreakpointChange);
      this.view.WatchlistExtended.onBreakPointChangeComponent(kony.application.getCurrentForm(), kony.application.getCurrentBreakpoint());
      this.view.customheadernew.onBreakpointChangeComponent(width);
      this.view.customfooter.onBreakpointChangeComponent(width);
    },   
    

    goBackportfolio: function() {
      new kony.mvc.Navigation({"appName" : "PortfolioManagementMA", "friendlyName" : "frmPortfolioOverview"}).navigate();
          
    },
	goBackdashboard: function() {
      new kony.mvc.Navigation({"appName" : "HomepageMA", "friendlyName" : "frmDashboard"}).navigate();
          
    }
  };

});