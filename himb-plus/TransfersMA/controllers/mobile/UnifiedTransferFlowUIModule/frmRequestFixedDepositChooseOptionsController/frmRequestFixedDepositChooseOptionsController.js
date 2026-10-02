define(['CampaignUtility', 'CommonUtilities'], function (CampaignUtility, CommonUtilities) {
  return {
    init: function () {
      var scope = this;
      var currentFormObject = kony.application.getCurrentForm();
      var currentForm = currentFormObject.id;
      applicationManager.getPresentationFormUtility().initCommonActions(this, "CALLBACK", currentForm, scope.flxBackOnClick);
    },

    preShow: function () {
      this.setTitleBarVisibility();
      this.setDepositTypeAndTenureData();
      this.view.postShow = this.postShow;
    },

    postShow: function () {
      this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
      this.view.segDepositTypeOptions.onRowClick = this.segDepositTypeOptionsOnClick;
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    },

    setTitleBarVisibility: function () {
      if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
        this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("i18n.HBL.RequestFixedDeposit");
        this.view.flxHeader.isVisible = true;
        this.view.flxRequestFDContainer.top = "7%";
        this.view.customHeader.imgBack.src = "backbutton.png";
      } else {
        this.view.title = kony.i18n.getLocalizedString("i18n.HBL.RequestFixedDeposit");
        this.view.flxHeader.isVisible = false;
        this.view.flxRequestFDContainer.top = "2%";
      }
    },

    flxBackOnClick: function () {
      var navManager = applicationManager.getNavigationManager();
      navManager.navigateTo({ "appName": "TransfersMA", "friendlyName": "UnifiedTransferFlowUIModule/frmFixedDeposit" });
      kony.application.destroyForm({
        "appName": "TransfersMA",
        "friendlyName": "UnifiedTransferFlowUIModule/frmRequestFixedDepositChooseOptions"
      });
    },

    setDepositTypeAndTenureData: function () {
      var navManager = applicationManager.getNavigationManager();
      var depositType = navManager.getCustomInfo("depositTypeFlow");
      var status = navManager.getCustomInfo("selectionDepositType");

      if ((depositType === true)) {
        if ((status !== null) && (status !== "") && (status !== undefined)) {
          if (status == "DEPOSITTYPE") {
            var data = [
              {
                "lblFrequency": "Normal FD"
              }, {
                "lblFrequency": "Himal Remit FD"
              }, {
                "lblFrequency": "Structured FD"
              },

            ];
          }
        }
        navManager.setCustomInfo("setDataforDepositType", true);
         this.view.segDepositTypeOptions.setData(data);
      }
      var navManager = applicationManager.getNavigationManager();
      var tenureType = navManager.getCustomInfo("tenureTypeFlow");
      var type = navManager.getCustomInfo("selectTenureType");

      if ((tenureType === true)) {
        if ((type !== null) && (type !== "") && (type !== undefined)) {
          if (type == "TENURE") {
            // var data = [
            //   {
            //     "lblFrequency": "6 Months"
            //   },
            //   {
            //     "lblFrequency": "9 Months"
            //   },
            //   {
            //     "lblFrequency": "18 Months"
            //   },
            //   {
            //     "lblFrequency": "24 Months"
            //   },
            //   {
            //     "lblFrequency": "40 Months"
            //   },
            //   {
            //     "lblFrequency": "60 Months"
            //   },
            // ];
              var navManager = applicationManager.getNavigationManager();
             var response=   navManager.getCustomInfo("responsedata");
            this.setTenureValue(response);
          }

        }
        navManager.setCustomInfo("setDataforTenureType", true);
      }
     // this.view.segDepositTypeOptions.setData(data);
    },

    segDepositTypeOptionsOnClick: function () {
      var navManager = applicationManager.getNavigationManager();
      var depositFlow = navManager.getCustomInfo("setDataforDepositType");
      var tenureFlow = navManager.getCustomInfo("setDataforTenureType");
      if (depositFlow === true) {
        var data = this.view.segDepositTypeOptions.selectedRowItems[0];
        var selectedvalue = data.lblFrequency;
        var valueSelected;
        if(selectedvalue=="Normal FD"){
            valueSelected="1"
        }else if(selectedvalue=="Himal Remit FD"){
            valueSelected="2"
        }else {
            valueSelected="3"
        }
             navManager.setCustomInfo("setDataforDepositType", null);
        navManager.setCustomInfo("selectedDataDepositType", selectedvalue);
        var param = {
                    "depositType": valueSelected
                }
        var ManageActivitiesPresenter = applicationManager.getModulesPresentationController({
                "appName": "TransfersMA",
                "moduleName": "ManageActivitiesUIModule"
            });
            ManageActivitiesPresenter.getFixedDepositTenureIntrestMBL(param);
   
        //navManager.navigateTo({ "appName": "TransfersMA", "friendlyName": "UnifiedTransferFlowUIModule/frmFixedDeposit" });
      }

      else if (tenureFlow === true) {
        var data = this.view.segDepositTypeOptions.selectedRowItems[0];
        var selectedvalue = data.lblFrequency;
        var selectedRate = data.lblRate;
        var productId = data.productId;
        navManager.setCustomInfo("setDataforTenureType", null);
        navManager.setCustomInfo("selectedDataTenure", selectedvalue);
        navManager.setCustomInfo("selectedDataRate", selectedRate);
        navManager.setCustomInfo("productId", productId);
        navManager.navigateTo({ "appName": "TransfersMA", "friendlyName": "UnifiedTransferFlowUIModule/frmFixedDeposit" });
      }
    },

setTenureValue: function(response) {
      if (!kony.sdk.isNullOrUndefined(response)) {
            this.TenureInterest = response.result;
      }
            this.view.segDepositTypeOptions.widgetDataMap = {
                "lblFrequency": "lblFrequency",
                "lblRate":"lblRate",
                "productId" :"productId"
            };
            this.view.segDepositTypeOptions.removeAll();
       if (!kony.sdk.isNullOrUndefined(response)) {
       //if (response.result != undefined) {
                var segData = [];
                for (var i = 0; i < response.result.length; i++) {
                    var data = {
                        "lblFrequency": response.result[i].term + " Months",
                        "lblRate": response.result[i].rate,
                        "productId":response.result[i].aaProductId
                    }
                    segData.push(data);
                }
                this.view.segDepositTypeOptions.setData(segData);
            }
        },
        updateFormUI: function(context) {
    if (context.FixedDepositTenureSuccessResponse) {
                CommonUtilities.hideProgressBar(this.view);
                var navManager = applicationManager.getNavigationManager();
                var responsedata = context.FixedDepositTenureSuccessResponse;
                navManager.setCustomInfo("responsedata",responsedata);
                //this.setTenureValue(context.FixedDepositTenureSuccessResponse);
                kony.application.dismissLoadingScreen();
                navManager.navigateTo({
              "appName": "TransfersMA",
              "friendlyName": "UnifiedTransferFlowUIModule/frmFixedDeposit"
          });        }
},
  };
});

