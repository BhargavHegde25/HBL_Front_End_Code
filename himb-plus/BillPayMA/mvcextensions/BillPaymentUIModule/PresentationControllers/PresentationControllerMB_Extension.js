define(['CommonUtilities','OLBConstants'],function(CommonUtilities,OLBConstants){ 
 return{
    getCategorie: function(data){
         var navManager = applicationManager.getNavigationManager();
        var scopeObj=this;
         var userPreferencesManager = applicationManager.getUserPreferencesManager();
     var billPayEligibility = userPreferencesManager.checkBillPayEligibilityForUser();
      if (billPayEligibility === "Activated"){
        this.getBankDateMB();
         var billManager = applicationManager.getBillManager();
         billManager.getCategories(data,this.successCategorie,this.errorCategorie);
      }else if(billPayEligibility ==="NotActivated"){
       navManager.navigateTo({"appName": "BillPayMA","friendlyName": "frmBillPayActivated"},false,{"Activate":true});
      }
    },
    getCategories: function(data){
        var navManager = applicationManager.getNavigationManager();
        var scopeObj=this;
      var billManager = applicationManager.getBillManager();
      // var data = {"category":"ALL"};
      var flowType = applicationManager.getBillPayFlow();
        if(flowType== "onCancel"){
       billManager.getCategories(data,this.billPayDashboardSucess,this.billPayDashboarderror); 
     } else{
         billManager.getCategories(data,this.successCategories,this.errorCategories);
      }
    },
    billPayDashboardSucess: function(res){
    var navManager = applicationManager.getNavigationManager();
    applicationManager.setBillPayFlow="BillPayFlow";
     var allCategories = res;
     if (res.categories.length != 0) {
            res.categories.push({
            "code": "TRANSACTION_HISTORY",
            "labelText": "Transaction History",
            "category": "CATEGORY"
        });
     }
          navManager.setCustomInfo("BillPayAllCategories",allCategories);
           this.getFavMerchantsMB();
          //navManager.navigateTo({"appName": "BillPayMA","friendlyName": "frmBillPayDashboardNew"},false,allCategories);
    },
    billPayDashboarderror: function(err){

    },

    activateBillPay: function(param){
         applicationManager.getPresentationUtility().showLoadingScreen();
         applicationManager.getUserPreferencesManager().activateBillPay(param, this.activateBillPaySuccess.bind(this), this.activateBillPayFailure.bind(this));
    },
    activateBillPaySuccess: function(){
    this.userPreferencesManager = applicationManager.getUserPreferencesManager(); 
    var accountNumber;
      var presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('BillPaymentUIModule');
        accountNumber= presenter.presentationController.selectedAccountID;
    const param = {
                "userName": this.userPreferencesManager.getUserObj().userName,
                "default_account_billPay": accountNumber
            };
            this.userPreferencesManager.updateBillPayPreferedAccountNumber(param, this.updateBillPayPreferedAccountNumberSuccessCallBack.bind(this), this.updateBillPayPreferedAccountNumberFailureCallBack.bind(this));
        },
        activateBillPayFailure: function(response){
            if (response.errorMessage){
            applicationManager.getNavigationManager().navigateTo({"appName": "BillPayMA","friendlyName": "frmBillPayActivated"},false,{"error": response });    
            }
        },
     updateBillPayPreferedAccountNumberSuccessCallBack : function(param) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
   applicationManager.getNavigationManager().navigateTo({"appName": "BillPayMA","friendlyName": "frmBillPayAcknowledgement"},false,{"activation": true });
    },
    updateBillPayPreferedAccountNumberFailureCallBack: function(response){
            if (response.errorMessage){
            applicationManager.getNavigationManager().navigateTo({"appName": "BillPayMA","friendlyName": "frmBillPayActivated"},false,{"error": response });    
            }
        },
    successCategorie: function(res){
    var navManager = applicationManager.getNavigationManager();
        var currentForm = kony.application.getCurrentForm().id;
        var allCategories = res;
        if (res.categories.length != 0) {
            res.categories.push({
            "code": "TRANSACTION_HISTORY",
            "labelText": "Transaction History",
            "category": "CATEGORY"
        });
          navManager.setCustomInfo("BillPayAllCategories",allCategories);
          this.getFavMerchantsMB();
         // navManager.navigateTo({"appName": "BillPayMA","friendlyName": "frmBillPayDashboardNew"},false,allCategories);
        }else{
         navManager.navigateTo({
        "appName": "HomepageMA",
        "friendlyName": "frmHBLUnifiedDashboard"
        },false,{"noCategory": true}); 
        }
    },
    errorCategorie: function(err){

    },
    successCategories: function(res){
      try{
        var navManager = applicationManager.getNavigationManager();
        var currentForm = kony.application.getCurrentForm().id;
        var previousForm = navManager.getCustomInfo("previousForm");
       if((currentForm === "frmBillPayDashboardNew")||(previousForm === "frmBillPayDynamic")){
          var Categories = res;
          navManager.setCustomInfo("BillPayCategories",Categories);
         //this.getFavMerchantsMB();
          navManager.navigateTo({"appName": "BillPayMA","friendlyName": "frmBillPayDynamic"},false,Categories);
        }else if((currentForm==="frmBillPayDynamic")||(previousForm ==="frmBillPaySubCategory")){
          var data = res;
          navManager.setCustomInfo("BillPaySubCategories",data);
          navManager.navigateTo({"appName": "BillPayMA","friendlyName": "frmBillPaySubCategory"},false,data);
        }else if(currentForm === "frmBillPaySubCategory"){
          var data =res;
          navManager.setCustomInfo("BillPaySubCategories",data);
          navManager.navigateTo({"appName": "BillPayMA","friendlyName": "frmBillPaySubCategory"},false,data);
        }else  {}
      }catch(err){
        //alert("error"+err);
		applicationManager.getPresentationUtility().Alert("error"+err);
      }
    },
    errorCategories: function(err){
      var test;
      kony.print("error"+ err);
    },

    getmerchantfield: function(data){
      var billManager = applicationManager.getBillManager();
      // var data = {"category":"ALL"};
      billManager.getMerchants(data,this.successMerchant,this.errorMerchant);
    },
    successMerchant: function(res){
      var navManager = applicationManager.getNavigationManager();
      var data = res;
      navManager.setCustomInfo("BillPayMerchantCategories",data);
      var previousForm =navManager.getCustomInfo("previousForm");
      if(previousForm!= "frmBillPayMerchant"){
      navManager.navigateTo({"appName": "BillPayMA","friendlyName": "frmBillPayMerchant"},false,data);
      }else{
        
      }
    },
    errorMerchant: function(err){
      //alert(" error");
	  applicationManager.getPresentationUtility().Alert(" error");
    },
    getBillHistory: function(data){
      var billManager = applicationManager.getBillManager();
      // var data = {"category":"ALL"};
      billManager.getTransactionHistory(data,this.successHistoryPayments,this.errorHistoryPayments); 
    },
    successHistoryPayments: function(res){
         var navManager = applicationManager.getNavigationManager();
      var data = res;
      navManager.setCustomInfo("frmBillPay",res);
    navManager.navigateTo({"appName": "BillPayMA","friendlyName": "frmBillPayTransferHistory"},false,data);
    },
    errorHistoryPayments: function(err){
      var error =err; 
    },
   /*showFromAccountsPresentationSuccessCallBack:function(res)
    {
     var accNav=applicationManager.getAccountManager();
      let filteredAccountsData =res.filter(filteredAccountData => filteredAccountData.accountStatus === "ACTIVE" || filteredAccountData.accountStatus === "CLOSURE_PENDING");
      //var navMan=applicationManager.getNavigationManager();
        scope_BillPayPresentationController.isAcknowledgmentFlow=false;
      //  applicationManager.getPresentationUtility().dismissLoadingScreen();
      navManager.setCustomInfo("frmBillPayActive",{"fromaccounts":filteredAccountsData});
     navManager.navigateTo({"appName": "BillPayMA","friendlyName": "frmBillPayActive"});
    },*/
    getSingelBillPaySupportedAccounts: function(){
         var navManager = applicationManager.getNavigationManager();
      var configurationManager = applicationManager.getConfigurationManager();
  var accountManager = applicationManager.getAccountManager();
         var accounts = accountManager.getInternalAccounts();
        if (kony.sdk.isNullOrUndefined(accounts) || accounts === "") {
            return [];
        }
        let allowedaccounts =  accounts.filter(function (account) {
            return configurationManager.checkAccountAction(account.accountID, "BILL_PAY_CREATE");
        }.bind(this));
        return allowedaccounts.filter(function (account) {
            return account.accountStatus === "ACTIVE" || account.accountStatus === "CLOSURE_PENDING"
        })  
    },
makeNewInquiryCall:function(params){
    applicationManager.getBillManager().makeNewInquiryServiceCall(params,this.makeNewInquiryCallSuccessCallback.bind(this),this.makeNewInquiryCallFailureCallback.bind(this));
},
makeNewInquiryCallSuccessCallback:function(response){
     var navManager = applicationManager.getNavigationManager();
    navManager.setCustomInfo("responseMapping",response);
    var errorMsg = '';
        if (!kony.sdk.isNullOrUndefined(response.errorObj)){
            navManager.navigateTo({"appName": "BillPayMA","friendlyName": "frmBillPayMerchant"},false,response);
          //add popup  this.view.flxPopUp.isVisible =true;
            //label.text = errorMsg
        } else if(kony.sdk.isNullOrUndefined(response.billInfo[0].transactionDetails[0].code)){
            if(!kony.sdk.isNullOrUndefined(response.billInfo[0].transactionDetails[0])){
                 navManager.navigateTo({"appName": "BillPayMA","friendlyName": "frmBillPayPayeeDetails"},false,response); 
            }
        }
         else if (response.billInfo[0].transactionDetails[0].code!="0") {
            navManager.navigateTo({"appName": "BillPayMA","friendlyName": "frmBillPayMerchant"},false,response);
            //add popup  this.view.flxPopUp.isVisible =true;
            //label.text = errorMsg
         } else{
           navManager.navigateTo({"appName": "BillPayMA","friendlyName": "frmBillPayPayeeDetails"},false,response); 
         }
},

makeNewInquiryCallFailureCallback:function(err){
     var navManager = applicationManager.getNavigationManager();
    navManager.navigateTo({"appName": "BillPayMA","friendlyName": "frmBillPayMerchant"},false,{"BillError":err});
},

getNPSBillerDetails: function(param){
     applicationManager.getBillManager().getURLAutoMerchant(param,this.getNPSBillerDetailsSuccessCB.bind(this),this.getNPSBillerDetailsErrorCB.bind(this));
},
getNPSBillerDetailsSuccessCB: function(response){
     var navManager = applicationManager.getNavigationManager();
    var screen = navManager.getCustomInfo("billPayscreen");
    navManager.navigateTo({"appName": "BillPayMA","friendlyName": screen},true,response);
},
getNPSBillerDetailsErrorCB:function(err){
    var error = err;
},
transferCall:function(params){
    applicationManager.getBillManager().transfergetCall(params,this.transferCallSuccessCallback.bind(this),this.transferCallFailureCallback.bind(this)); 
},
transferCallSuccessCallback: function(response){
     var navManager = applicationManager.getNavigationManager();
    navManager.navigateTo({"appName": "BillPayMA","friendlyName": "frmBillPayConfirm"},false,{"transfercall":response});
},
transferCallFailureCallback: function(err){
 var navManager = applicationManager.getNavigationManager();
var resValue=applicationManager.getConfigurationManager().MB_UI_MOCK_SUCCESS;
  navManager.navigateTo({"appName": "BillPayMA","friendlyName": "frmBillPayAcknowledgement"},false,{"mockflow":resValue});
    //navManager.navigateTo({"appName": "BillPayMA","friendlyName": "frmBillPayConfirm"},true,{"errorObj":err});
},   
transferSecondCall:function(params){
    applicationManager.getBillManager().transfergetCall(params,this.transferSecondCallSuccessCallback.bind(this),this.transferSecondCallFailureCallback.bind(this)); 
},
transferSecondCallSuccessCallback: function(res){
     var navManager = applicationManager.getNavigationManager();
    var screen = navManager.getCustomInfo("billPayscreen");
    navManager.navigateTo({"appName": "BillPayMA","friendlyName": screen},false,{"transferSecondCall":res});
    
},
transferSecondCallFailureCallback: function(err){
    var res=applicationManager.getConfigurationManager().getMbUiMockSuccess();
  navManager.navigateTo({"appName": "BillPayMA","friendlyName": "frmBillPayAcknowledgement"},false,{"mockflow":res});
},
confirmBillPayCallMB:function(params){
    applicationManager.getBillManager().getconfirmBillpay(params,this.getconfirmBillpaySuccessCallbackMB.bind(this),this.getconfirmBillpayFailureCallbackMB.bind(this)); 
},
getconfirmBillpaySuccessCallbackMB: function(res){
     var navManager = applicationManager.getNavigationManager();
    var test;
    if (res && res.MFAAttributes) {
      var mfaJSON = {
                    "flowType":"BILL_PAYNCHL",
                    "response": res,
                    "objectServiceDetails": {
                        "serviceName": "HBLMerchantObjects",
                        "dataModel": "BillPay",
                        "operationName": "confirmBillPay"
                    }
                };
                applicationManager.getMFAManager().initMFAFlow(mfaJSON);
       }else{
    if(res.errorObj){
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        navManager.navigateTo({"appName": "BillPayMA","friendlyName": "frmBillPayConfirm"},false,res);
    }else if(res.success=="true"){
        
            applicationManager.getPresentationUtility().dismissLoadingScreen();
     navManager.navigateTo({"appName": "BillPayMA","friendlyName": "frmLoansAcknowledgement"},false,{"AutomaticMerchantConfirmBillPayRes":res});
    }
       }
},
getconfirmBillpayFailureCallbackMB: function(err){
     if(!kony.sdk.isNullOrUndefined(err.errorMessage)){
      errorMsg = err.errorMessage;
       } else if(!kony.sdk.isNullOrUndefined(err.errorMessage.errorMessage)){
      errorMsg = err.errorMessage.errorMessage;
       }else if(!kony.sdk.isNullOrUndefined(err.errorMessage.serverErrorRes)){
        errorMsg = err.errorMessage.serverErrorRes.errmsg;
       }
       applicationManager.getNavigationManager().navigateTo({"appName": "BillPayMA","friendlyName": "frmBillPayConfirm"},false,{"serverError": errorMsg });
      //var navManager = applicationManager.getNavigationManager();
     //var res=applicationManager.getConfigurationManager().getMbUiMockSuccess();
 //applicationManager.getNavigationManager().navigateTo({"appName": "BillPayMA","friendlyName": "frmBillPayConfirm"},false,{"serverError": err });
   //  navManager.navigateTo({"appName": "BillPayMA","friendlyName": "frmBillPayAcknowledgement"},true,err);
},
addBillPayDefaulAcc: function(account){
    var segdata = account;
},
getWebViewdata:function(params){
    new kony.mvc.Navigation("frmBillPayConfirm").navigate();
    applicationManager.getBillManager().getWebViewdata(params,this.getWebViewdataSuccessCallback.bind(this),this.getWebViewdataFailureCallback.bind(this)); 
},
getWebViewdataSuccessCallback:function(res){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
    applicationManager.getNavigationManager().navigateTo({"appName": "BillPayMA","friendlyName": "frmBillPayConfirm"},false,{"WebView":res});
    },
    getWebViewdataFailureCallback:function(err){
        var navManager = applicationManager.getNavigationManager();
 var screen = navManager.getCustomInfo("billPayscreen");
    navManager.navigateTo({"appName": "BillPayMA","friendlyName": screen},false,{"serverError": err.errmsg?err.errmsg:err.errorMessage?err.errorMessage:"" });  
},
getMerchantPaymentChargesMB: function(params,flowType){
    if(flowType=="frmBillPayDynamic"){
    applicationManager.getBillManager().getMerchantCharges(params,this.getPaymentChargesSuccessCallbacksMB.bind(this),this.getPaymentChargesFailureCallbacksMB.bind(this));
  }else{
     applicationManager.getBillManager().getMerchantCharges(params,this.getPaymentChargesSuccessCallbackMB.bind(this),this.getPaymentChargesFailureCallbackMB.bind(this));
 }
},
getPaymentChargesSuccessCallbacksMB: function(res){
   var navManager = applicationManager.getNavigationManager();
      let clientProperties = CommonUtilities.CLIENT_PROPERTIES;
     //var configurationManager =applicationManager.getConfigurationManager();
                if (Object.keys(clientProperties).length > 0) {
				 scope_configManager.setDebtorAgentBranchId(clientProperties["BRANCH_ID"]);
				 scope_configManager.setDebtorAgentBankIdValue(clientProperties["BANK_ID"]);
				  }
     kony.mvc.MDAApplication.getSharedInstance().appContext.getMerchantPaymentCharges = res; 
},
getPaymentChargesFailureCallbacksMB: function(err){},
getPaymentChargesSuccessCallbackMB: function(res){
    var navManager = applicationManager.getNavigationManager();
      let clientProperties = CommonUtilities.CLIENT_PROPERTIES;
     //var configurationManager =applicationManager.getConfigurationManager();
                if (Object.keys(clientProperties).length > 0) {
				 scope_configManager.setDebtorAgentBranchId(clientProperties["BRANCH_ID"]);
				 scope_configManager.setDebtorAgentBankIdValue(clientProperties["BANK_ID"]);
				  }
     kony.mvc.MDAApplication.getSharedInstance().appContext.getMerchantPaymentCharges = res;
     var subCatergoryData= applicationManager.getNavigationManager().getCustomInfo("Biller_Code");
      var data = {"appCode":subCatergoryData.code,
         "merchantType": subCatergoryData.merchantType
        };
       var screen = navManager.getCustomInfo("billPayscreen");
    navManager.navigateTo({"appName": "BillPayMA","friendlyName": screen},false,data);
      
},
getPaymentChargesFailureCallbackMB: function(err){},
confirmBillPayCallNEAMB:function(params){
    //applicationManager.getBillManager().getconfirmBillpayNEA(params,this.confirmBillPayCallNEASuccessCallback.bind(this),this.confirmBillPayCallNEAFailureCallback.bind(this)); 
applicationManager.getBillManager().getconfirmBillpayNEA(params,this.confirmBillPayCallNEAMBSuccessCallback.bind(this),this.confirmBillPayCallNEAMBFailureCallback.bind(this));
},
confirmBillPayCallNEAMBSuccessCallback:function(res){
     var navManager = applicationManager.getNavigationManager();
   if (res && res.MFAAttributes) {
      var mfaJSON = {
                    "flowType":"BILL_PAY",
                    "response": res,
                    "objectServiceDetails": {
                        "serviceName": "HBLMerchantObjects",
                        "dataModel": "NEA_Payments",
                        "operationName": "confirmBillPay"
                    }
                };
                applicationManager.getMFAManager().initMFAFlow(mfaJSON);
       }else{
             if (res.success == "false") {
              navManager.navigateTo({"appName": "BillPayMA","friendlyName": "frmBillPayConfirm"},false,{"paymentfailed":res});
               applicationManager.getPresentationUtility().dismissLoadingScreen();
             } if (res.transactionDetails[0].code != "0") {
               var errorMsg= res.transactionDetails[0].message; 
               navManager.navigateTo({"appName": "BillPayMA","friendlyName": "frmBillPayConfirm"},false,{"paymentfailed":res});
              applicationManager.getPresentationUtility().dismissLoadingScreen();
             }else{
                applicationManager.getPresentationUtility().dismissLoadingScreen();
              
              navManager.navigateTo({"appName": "BillPayMA","friendlyName": "frmLoansAcknowledgement"},false,{"PaybillAck": res});
             }
         }  ////
      
    },
    confirmBillPayCallNEAMBFailureCallback:function(err){
        try{
        if(err.errorMessage){
      var errorMsg;
      if(!kony.sdk.isNullOrUndefined(err.errorMessage)){
        errorMsg = err.errorMessage;
      }else if(!kony.sdk.isNullOrUndefined(err.errorMessage.errorMessage)){
      errorMsg = err.errorMessage.errorMessage;
       }else if(!kony.sdk.isNullOrUndefined(err.errorMessage.serverErrorRes)){
        errorMsg = err.errorMessage.serverErrorRes.errmsg;
       }
       applicationManager.getNavigationManager().navigateTo({"appName": "BillPayMA","friendlyName": "frmBillPayConfirm"},false,{"serverError": errorMsg });
        }else if(!kony.sdk.isNullOrUndefined(err.serverErrorRes.dbpErrCode)){
            if(err.serverErrorRes.success == "false" && err.serverErrorRes.dbpErrCode == "20001"){
          applicationManager.getNavigationManager().navigateTo({"appName": "BillPayMA","friendlyName": "frmLoansAcknowledgement"},false,{"trasferreversed": err });  
            }
        }else{
         applicationManager.getNavigationManager().navigateTo({"appName": "BillPayMA","friendlyName": "frmBillPayConfirm"},false,{"serverError": err });
        }
        }catch(err){
            kony.print("confirmBillPayCallNEAMBFailureCallback"+err);
        }

},
getBillPayTransactionalLimits:function(){
     var navManager = applicationManager.getNavigationManager();
    /*
    applicationManager.getConfigurationManager().fetchLimitsForAnAction("BILL_PAY_CREATE",scope_BillPayPresentationController.getBillPayTransactionalLimitsSuccessCallback,scope_BillPayPresentationController.getBillPayTransactionalLimitsErrorCallback);
  */
    if(scope_BillPayPresentationController.isAcknowledgmentFlow==true) {
      scope_BillPayPresentationController.isAcknowledgmentFlow=false;
      //var navMan=applicationManager.getNavigationManager();
     // navMan.setCustomInfo("frmAcknowledgment",scope_BillPayPresentationController.navData);
    //  navMan.setEntryPoint("acknowledgment","frmBillPayVerifyDetails");
      scope_BillPayPresentationController.commonFunctionForNavigation("frmAcknowledgement");
    }
    else
      scope_BillPayPresentationController.fromAccNavigation(kony.application.getPreviousForm().id);
  },
   fromAccNavigation: function(formName){
    var navManager = applicationManager.getNavigationManager();
    navManager.navigateTo({"appName": "BillPayMA","friendlyName": formName},false,{"selectedAcc":"Account"});
  },
  onCancelClick: function(){
    var navManager = applicationManager.getNavigationManager();
    var data = {
                    "code": "ALL"
                };
                var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                    "appName": "BillPayMA",
                    "moduleName": "BillPaymentUIModule"
                });
                billPayMod.presentationController.getCategories(data);
  },
  getFavMerchantsMB:function(){
var params={};
applicationManager.getBillManager().getFavMerchantyServiceCall(params,this.getFavMerchantsSuccessCallbackMB.bind(this),this.getFavMerchantsFailureCallbackMB.bind(this));
},
getFavMerchantsSuccessCallbackMB:function(res){
   applicationManager.getNavigationManager().setCustomInfo("favMerchantsList",res);
 //this.getMerchantPaymentChargesMB();
    // kony.mvc.MDAApplication.getSharedInstance().appContext.getMerchantPaymentCharges = res;
     var navManager = applicationManager.getNavigationManager();
    navManager.navigateTo({
        "appName": "BillPayMA",
        "friendlyName": "frmBillPayDashboardNew"
        },false,{"FavMerchantData": res}); 
// alert("res" +res);
},
getFavMerchantsFailureCallbackMB:function(err){
//this.updateView({ "serverError": err.errmsg?err.errmsg:err.errorMessage?err.errorMessage:"" });
},
deleteFavMerchantMB:function(params){
        applicationManager.getBillManager().deleteFavoriteMerchant(params,this.deleteFavMerchantSuccessCallbackMB.bind(this),this.deleteFavMerchantFailureCallbackMB.bind(this)); 
    },
    deleteFavMerchantSuccessCallbackMB:function(res){
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        if(res.success=="true"){
            applicationManager.getNavigationManager().navigateTo({
                 "appName": "BillPayMA",
        "friendlyName": "frmBillPayDashboardNew"
        },false,{"deleteFavoriteMerchantSuccess": res});
        }
        },
deleteFavMerchantFailureCallbackMB:function(err){
    applicationManager.getNavigationManager().navigateTo({"appName": "BillPayMA","friendlyName": "frmBillPayConsent"},false,{"serverError": err});
 //   this.updateView({ "serverError": err.errmsg?err.errmsg:err.errorMessage?err.errorMessage:"" });
    },
    createFavoriteMerchantMB:function(params){
    applicationManager.getBillManager().createFavoriteMerchant(params,this.createFavoriteMerchantSuccessCallbackMB.bind(this),this.createFavoriteMerchantFailureCallbackMB.bind(this)); 
},
createFavoriteMerchantSuccessCallbackMB:function(res){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if(res.success=="true"){
        applicationManager.getNavigationManager().navigateTo({
                 "appName": "BillPayMA",
        "friendlyName": "frmLoansAcknowledgement"
        },false,{"CreateFavMerchantSuccess": res});
    }
    /*applicationManager.getNavigationManager().navigateTo("frmOneTimePaymentConfirm");
    applicationManager.getNavigationManager().updateForm({
        "WebView": res
        }, "frmOneTimePaymentConfirm");*/
    },
    createFavoriteMerchantFailureCallbackMB:function(err){
//this.updateView({ "serverError": err.errmsg?err.errmsg:err.errorMessage?err.errorMessage:"" });
},
getCategoriesByMerchantMB: function(params) {
var navManager = applicationManager.getNavigationManager();
        var scopeObj=this;
  applicationManager.getNavigationManager().setCustomInfo("isRepeatPaymentFlow",false);
         var userPreferencesManager = applicationManager.getUserPreferencesManager();
     var billPayEligibility = userPreferencesManager.checkBillPayEligibilityForUser();
      if (billPayEligibility === "Activated"){
            var billManager = applicationManager.getBillManager();
      billManager.getCategoriesByMerchant(params, this.getCategoriesByCodeSuccessCallbackMB.bind(this), this.getCategoriesByCodeErrorCallbackMB.bind(this));
      }else if(billPayEligibility ==="NotActivated"){
       navManager.navigateTo({"appName": "BillPayMA","friendlyName": "frmBillPayActivated"},false,{"Activate":true});
      }
      },
      getCategoriesByMerchantMBS: function(params) {
        var navManager = applicationManager.getNavigationManager();
        var scopeObj=this;
         var userPreferencesManager = applicationManager.getUserPreferencesManager();
     var billPayEligibility = userPreferencesManager.checkBillPayEligibilityForUser();
      if (billPayEligibility === "Activated"){
            var billManager = applicationManager.getBillManager();
      billManager.getCategoriesByMerchant(params, this.getCategoriesByCodeSuccessCallbackMB.bind(this), this.getCategoriesByCodeErrorCallbackMB.bind(this));
      }else if(billPayEligibility ==="NotActivated"){
       navManager.navigateTo({"appName": "BillPayMA","friendlyName": "frmBillPayActivated"},false,{"Activate":true});
      }
      },
      getCategoriesByCodeSuccessCallbackMB: function(res){
        var navManager = applicationManager.getNavigationManager();
        if (res.categories.length != 0) {
				var context = {"loadCategoriesSuccess": true,"merchantBasicInfo": res};
       if(res.categories[0].merchantType == "Automatic"){
       navManager.navigateTo({"appName": "BillPayMA","friendlyName": "frmBillPaySubCategory"},false,context);
       }else{
        navManager.navigateTo({"appName": "BillPayMA","friendlyName": "frmBillPayDynamic"},false,context);
       }
        }

      },
      getCategoriesByCodeErrorCallbackMB: function(err){
        navManager.navigateTo({"appName": "BillPayMA","friendlyName": "frmBillPayDynamic"},false,{"servererror":err});
      },
verifyDefaultAccounts : function(dataJSON) {
   var updateUserObj = applicationManager.getUserPreferencesManager();
  updateUserObj.updateUserDetails(dataJSON, this.verifyDefaultAccountSuccess, this.verifyDefaultAccountFailure);
   },
     verifyDefaultAccountSuccess : function (res) {
          applicationManager.getPresentationUtility().dismissLoadingScreen();
        var userObj = applicationManager.getUserPreferencesManager();
        applicationManager.getPresentationUtility().showLoadingScreen();
        userObj.fetchUser(this.billPaydefaultAccSuccess,this.billPaydefaultAccfailure);
            },
          verifyDefaultAccountFailure : function (err) {
             
         },
  billPaydefaultAccSuccess: function(res){
    this.getBillPayTransactionalLimits();
  },
  billPaydefaultAccfailure: function(err){},
  showFromAccountsPresentationSuccessCallBack: function(res){
   var accNav=applicationManager.getAccountManager();
    let filteredAccountsData =res.filter(filteredAccountData => filteredAccountData.accountStatus === "ACTIVE" || filteredAccountData.accountStatus === "CLOSURE_PENDING");
    var accfilter = filteredAccountsData.filter(filteracc =>filteracc.accountType ==="Savings" ||filteracc.accountType ==="Checking")
    accfilter = accfilter.filter(data=> data.currencyCode =="NPR" && data.supportTransferFrom == 1)
    var navMan=applicationManager.getNavigationManager();
      scope_BillPayPresentationController.isAcknowledgmentFlow=false;
    //  applicationManager.getPresentationUtility().dismissLoadingScreen();
    navMan.setCustomInfo("frmBillPayFromAccount",{"fromaccounts":accfilter});
    navMan.navigateTo("frmBillPayFromAccount");
  },
fetchExchangeRateMB:function(payload){
            applicationManager.getBillManager().fetchExchangeRates(payload,this.fetchExchangeRateSuccessMB.bind(this),this.fetchExchangeRateFailureMB.bind(this)); 
        },
        fetchExchangeRateSuccessMB:function(response){
           applicationManager.getNavigationManager().navigateTo({
            "ConvertedAmountData": response
			}, "frmBillPayConfirm");

        },
        fetchExchangeRateFailureMB:function(err){

        },
navigateConfirm: function(){
    var navMan=applicationManager.getNavigationManager();
navMan.navigateTo({"appName": "BillPayMA","friendlyName": "frmBillPayConfirm"},false,{"billPayee":true});
},
  getBankDateMB: function() {
            applicationManager.getBillManager().fetchBankDate({}, this.getBankDateSuccessMB.bind(this), this.getBankDateFailureMB.bind(this));
        },
        getBankDateSuccessMB: function(response) {
            var bankDates = response.date[0];
            applicationManager.getNavigationManager().setCustomInfo("bankDates", bankDates);
        },
        getBankDateFailureMB: function(){
            applicationManager.getNavigationManager().setCustomInfo("bankDates", undefined);
        },
        confirmBillPayCallKUKL:function(params){
          applicationManager.getBillManager().getconfirmBillpayKUKL(params,this.confirmBillPayCallKUKLSuccessCallback.bind(this),this.confirmBillPayCallKUKLFailureCallback.bind(this)); 
      },
      confirmBillPayCallKUKLSuccessCallback:function(res){
           var navManager = applicationManager.getNavigationManager();
         if (res && res.MFAAttributes) {
            var mfaJSON = {
                          "flowType":"BILL_PAY_KUKL",
                          "response": res,
                          "objectServiceDetails": {
                              "serviceName": "HBLMerchantObjects",
                              "dataModel": "KUKL_Payments",
                              "operationName": "confirmBillPay"
                          }
                      };
                      applicationManager.getMFAManager().initMFAFlow(mfaJSON);
             }else{
                   if (res.success == "false") {
                    navManager.navigateTo({"appName": "BillPayMA","friendlyName": "frmBillPayConfirm"},false,{"paymentfailed":res});
                     applicationManager.getPresentationUtility().dismissLoadingScreen();
                   } else if(!kony.sdk.isNullOrUndefined(res.transactionDetails[0].code )&&(res.transactionDetails[0].code !="0")){
                     var errorMsg= res.transactionDetails[0].message; 
                     navManager.navigateTo({"appName": "BillPayMA","friendlyName": "frmBillPayConfirm"},false,{"paymentfailed":res});
                    applicationManager.getPresentationUtility().dismissLoadingScreen();
                   }else{
                      applicationManager.getPresentationUtility().dismissLoadingScreen();
                    navManager.navigateTo({"appName": "BillPayMA","friendlyName": "frmLoansAcknowledgement"},false,{"PaybillAck": res});
                   }
               }  ////
          },
          confirmBillPayCallKUKLFailureCallback:function(err){
              try{
              if(err.errorMessage){
            var errorMsg;
            if(!kony.sdk.isNullOrUndefined(err.errorMessage)){
              errorMsg = err.errorMessage;
               }else if(!kony.sdk.isNullOrUndefined(err.errorMessage.errorMessage)){
            errorMsg = err.errorMessage.errorMessage;
             }else if(!kony.sdk.isNullOrUndefined(err.errorMessage.serverErrorRes)){
              errorMsg = err.errorMessage.serverErrorRes.errmsg;
             }
             applicationManager.getNavigationManager().navigateTo({"appName": "BillPayMA","friendlyName": "frmBillPayConfirm"},false,{"serverError": errorMsg });
              }else if(!kony.sdk.isNullOrUndefined(err.serverErrorRes.dbpErrCode)){
                  if(err.serverErrorRes.success == "false" && err.serverErrorRes.dbpErrCode == "20001"){
                applicationManager.getNavigationManager().navigateTo({"appName": "BillPayMA","friendlyName": "frmLoansAcknowledgement"},false,{"trasferreversed": err });  
                  }
              }else{
               applicationManager.getNavigationManager().navigateTo({"appName": "BillPayMA","friendlyName": "frmBillPayConfirm"},false,{"serverError": err });
              }
              }catch(err){
                  kony.print("confirmBillPayCallNEAMBFailureCallback"+err);
              }
      },
};
});