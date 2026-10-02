define(['FormControllerUtility', 'CommonUtilities'], function (FormControllerUtility, CommonUtilities) {
  return {
    init: function () {
      this.view.preShow = this.preShow;
      this.view.postShow = this.postShow;
      // this.view.onDeviceBack = function () { };
      // this.view.onBreakpointChange = this.onBreakpointChange;
      // this.view.onHide = this.onHide;
    },
    onBreakpointChange: function (form, width) {
      FormControllerUtility.setupFormOnTouchEnd(width);
      this.view.customheadernew.onBreakpointChangeComponent(width);
      this.view.customfooternew.onBreakpointChangeComponent(width);
    },
    onHide: function() {
      this.view.UnifiedTransfersAcknowledgement.unsubscribeStore();
    },
      /**
       * preShow
       * @api : preShow    
       * @return : NA
       */
     preShow : function(){
      // this.view.flxFormContent.doLayout = function () {
      //   if(this.view.flxFooter.info.height!== undefined){
      //     this.view.flxMain.minHeight = this.view.flxFormContent.frame.height - this.view.flxFooter.info.height + "dp";
      //   }
      // }.bind(this);
      //  FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter','flxMain','flxLogout']);
      //  this.view.customheadernew.activateMenu("UNIFIEDTRANSFER", "");
      //  this.view.UnifiedTransfersAcknowledgement.button1Click = this.button1Click;
      //  this.view.UnifiedTransfersAcknowledgement.button2Click = this.button2Click;
      //  this.view.UnifiedTransfersAcknowledgement.button3Click = this.button3Click;
       this.view.button1.onClick = function() {
                 var navMan = kony.mvc.getNavigationManager();
                navMan.navigate({
                    context: this,
                    callbackModelConfig: {
                        "frm": "frmUTFLanding",
                        "appName": "TransfersMA"
                    }
                });
            }
            this.view.button2.onClick - function(){
                 applicationManager.getModulesPresentationController("ManageActivitiesUIModule").showTransferScreen({
                    context: "PastPayments"
                 });
            }
     },
     postShow: function(){},
      onNavigate:function(params) {
        var scope = this;
        // if(params.Collection) params = params.Collection;
        // this.view.UnifiedTransfersAcknowledgement.setContext(params,scope);  
        // this.view.UnifiedTransfersAcknowledgement.onError = this.onError;
        // this.view.customheadernew.btnSkipNav.onClick = function(){
        //   scope.view.lblAcknowledgement.setActive(true);
        // } ;
        // this.view.CustomPopup.onKeyPress = this.onKeyPressCallBack;
        scope.setAckValue(params);
      },
      setAckValue : function(response){
        this.view.flxMainContainer.height ="1000px";
        var navManager = applicationManager.getNavigationManager();
        var response = navManager.getCustomInfo("int_response");
        this.view.lblReferenceNumberValue.text = response.orgRequestUniqueId;
        this.view.lblField1Value.text = navManager.getCustomInfo("int_AccSelection");
        this.view.lblField2Value.text = navManager.getCustomInfo("int_VpaId");
        this.view.lblField3Value.text = navManager.getCustomInfo("int_RName");
        this.view.lblField4Value.text = navManager.getCustomInfo("int_Rcountry");
        this.view.lblField5Value.text = navManager.getCustomInfo("int_RVpaId");
        this.view.lblField6Value.text = navManager.getCustomInfo("int_Currency");
        this.view.lblField7Value.text = navManager.getCustomInfo("int_Amount");
        this.view.lblField8Value.text = navManager.getCustomInfo("int_ExchangeRate");
        this.view.lblField9Value.text = navManager.getCustomInfo("int_InrAmt");
        this.view.lblField10Value.text = navManager.getCustomInfo("int_Charge");
         var amount = parseInt(navManager.getCustomInfo("int_Charge").split(" ")[1])+ parseInt(navManager.getCustomInfo("int_InrAmt"));
        this.view.lblField11Value.text ="NPR" + amount;
        this.view.lblField12Value.text = navManager.getCustomInfo("int_AuthorizedValue");
        this.view.lblField13Value.text = navManager.getCustomInfo("int_ConsumerVal");
        this.view.lblField14Value.text = navManager.getCustomInfo("int_Purpose");
        this.view.lblField15Value.text = navManager.getCustomInfo("int_Relation");
        var currentDate = new Date();
        this.view.lblField16Value.text = currentDate.toLocaleDateString();
        this.view.lblField17Value.text =navManager.getCustomInfo("int_Note");
      },
    onKeyPressCallBack: function(eventObject, eventPayload) {
      var self = this;
      if (eventPayload.keyCode === 27) {
        if (self.view.flxDialogs.isVisible === true) {
          self.view.flxDialogs.setVisibility(false);
          self.view.flxLogout.setVisibility(false);
          self.view.customheadernew.btnLogout.setFocus(true);
        }
      }
    },
  
      button3Click: function() {
        applicationManager.getModulesPresentationController("ManageActivitiesUIModule").showTransferScreen({ context: "PastPayments" });
      },
  
      button1Click: function(){
        var navMan = kony.mvc.getNavigationManager();
        navMan.navigate(
          {
            context: this,
            callbackModelConfig:{
              "frm": "frmUTFLanding",
              "appName":"TransfersMA"
            }
          });
      },
  
      button2Click: function(params) {
        params = Object.assign(params.Recipients, params.Transaction,params.BankDetails);
        var navMan = kony.mvc.getNavigationManager();
        navMan.navigate(
          {
            context: this,
            params: params,
            callbackModelConfig:{
              "frm": "frmSavePayeeforOTT",              
              "appName":"TransfersMA"
            }});
      },
      /**
     * updateFormUI - the entry point method for the form controller.
     * @param {Object} viewModel - it contains the set of view properties and keys.
     */
      updateFormUI: function(viewModel) {
        if (viewModel.isLoading === true) {
          FormControllerUtility.showProgressBar(this.view);
        } else if (viewModel.isLoading === false) {
          FormControllerUtility.hideProgressBar(this.view);
        }
      },
       /**
     * @api : onError
     * Error thrown from catch block in component and shown on the form
     * @return : NA
     */
        onError: function (err) {
          kony.print(JSON.stringify(err));
         },
    };
  });