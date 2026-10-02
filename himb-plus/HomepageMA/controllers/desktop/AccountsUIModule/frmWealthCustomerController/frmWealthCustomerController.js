define(['FormControllerUtility', 'ViewConstants', 'CommonUtilities', 'OLBConstants', 'CampaignUtility'], function(FormControllerUtility, ViewConstants, CommonUtilities, OLBConstants, CampaignUtility) {
    return {
         updateFormUI: function(){
              kony.application.dismissLoadingScreen();
          },
      /**
         * used perform the initialize activities.
         *
        */
      init: function() {
        this.view.preShow = this.preShow;
        this.view.flxCustomerDetails.onClick = this.navigateToDashboard; 
      },
      preShow: function() {
          try {
              const {
                  coreCustomerName,
                  coreCustomerID
              } = applicationManager.getUserPreferencesManager().getUserObj().CoreCustomers[0];
              const customerName = coreCustomerName.split(' ').map(word => word[0].toUpperCase() + word.slice(1).toLowerCase()).join(' ');
              this.view.lblCustName.text = customerName
              this.view.lblAccountsTotal.text = coreCustomerID
          } catch (e) {
              var errorObj = {
                  "method": "setCustomerData",
                  "error": e
              };
              console.log(errorObj);
          }
      },
      navigateToDashboard: function(){
        applicationManager.getNavigationManager().navigateTo("frmDashboard");
      }
  
    };
  });