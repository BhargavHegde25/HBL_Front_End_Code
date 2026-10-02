define(['CommonUtilities', 'OLBConstants'], function(CommonUtilities, OLBConstants) {
return{
getCategories:function(params)
{

var scopeObj=this;
var billPayEligibility = this.userPreferencesManager.checkBillPayEligibilityForUser();

    if (billPayEligibility === "Activated") {
        if(params.history){
		    params.code = "ALL";
		}
        if(params.code=="ALL"){
    this.updateView({
    isLoading: true
});
this.getBankDate();
applicationManager.getBillManager().getCategories(params,this.getCategoriesSuccessCallback.bind(this, params),this.getCategoriesFailureCallback.bind(this));
}else{
    this.updateView({
    isLoading: true
});
applicationManager.getBillManager().getCategories(params,this.getSubCategorySuccessCallback.bind(this),this.getSubCategoryErrorCallback.bind(this));
        
    } 
    }
    else if (billPayEligibility === "NotActivated") {
        scopeObj.showView({
            form: "frmBillPayActivation",
            data: {
                isLoading: true
            },
            callbackModelConfig: {
                activate: true
            }
        });
        scopeObj.getTnCBillPayActivate();
    } else {
        scopeObj.showView({
            form: "frmBillPayActivationNotEligible",
            callbackModelConfig: {
                notEligible: true
            }
        });
        scopeObj.showBillPayNotEligibleView();
    }



},
getSubCategoryErrorCallback:function(err){
    this.updateView({
            isLoading: false
        });
        applicationManager.getNavigationManager().updateForm({"NoCategory":true}, "frmBillPayNew"); 
},
getSubCategorySuccessCallback:function(res){
    if (res.categories.length != 0) {
        if ((res.categories[0].category == "CATEGORY" || res.categories[0].category == "APP")&& res.categories[0].subcategoryof!="ALL") {
            res.subcategory = true;
            res.subcategoryofAll = false;
            applicationManager.getNavigationManager().updateForm(res, "frmBillPayNew");
        }
        else if(res.categories[0].subcategoryof=="ALL"){
            res.subcategoryofAll = true;
            applicationManager.getNavigationManager().updateForm(res, "frmBillPayNew");
        }
        else {
            res.subcategory = false;
            res.subcategoryofAll = false;
            applicationManager.getNavigationManager().updateForm(res, "frmBillPayNew");
        }
    } else {
        this.updateView({
            isLoading: false
        });
        applicationManager.getNavigationManager().updateForm({"NoCategory":true}, "frmBillPayNew");
    }
},
getCategoriesSuccessCallback: function(payload, res) {
    applicationManager.getNavigationManager().navigateTo({
                        "appName": "BillPayMA",
                        "friendlyName": "frmBillPayNew"
                    });
    if (res.categories.length != 0) {
            this.attachPaymentHistoryStaticOption(payload, res);
            res.subcategoryofAll = true;
            applicationManager.getNavigationManager().updateForm(res, "frmBillPayNew");
        
    } else {
        this.updateView({
            isLoading: false
        });
        applicationManager.getNavigationManager().updateForm({"NoCategoryALL":true}, "frmBillPayNew");
    }
},
getBankDate: function() {
    applicationManager.getBillManager().fetchBankDate({}, this.getBankDateSuccess.bind(this), this.getBankDateFailure.bind(this));
},
getBankDateSuccess: function(response) {
    var bankDates = response.date[0];
	applicationManager.getNavigationManager().setCustomInfo("bankDates", bankDates);
},
getBankDateFailure: function(response) {
	applicationManager.getNavigationManager().setCustomInfo("bankDates", undefined);
    applicationManager.getNavigationManager().updateForm({"getBankDateFailure": {"errorMessage":"Failed to fetch bank dates"}}, "frmBillPayNew");
},
attachPaymentHistoryStaticOption: function(payload, res){
		res.categories.push({
            "code": "TRANSACTION_HISTORY",
            "labelText": "Transaction History",
            "category": "CATEGORY"
        });
		if(payload && payload.history){
			res.categories.withHistory=true;
		}
	},
getCategoriesFailureCallback:function(res){

this.updateView({
            isLoading: false
        });
        applicationManager.getNavigationManager().updateForm({"NoCategoryALL":true}, "frmBillPayNew");


},
getMerchantsdata: function(params) {
    {
        this.updateView({
            isLoading: true
        });
        applicationManager.getBillManager().getMerchants(params,this.getMerchantsSuccessCallback.bind(this),this.getMerchantsFailureCallback.bind(this));
    }
},
getMerchantsSuccessCallback: function(res) {
    // alert(res);
    applicationManager.getNavigationManager().updateForm(res, "frmBillPayNew");
    
},
getMerchantsFailureCallback:function(res){
    //this.updateView({ "serverError": res.errmsg });
    applicationManager.getNavigationManager().updateForm({"NoMerchantsField":true}, "frmBillPayNew");
},
getTransactionHistoryData:function(params){
    applicationManager.getBillManager().getTransactionHistory(params,this.getTransactionHistorySuccessCallback.bind(this),this.getTransactionHistoryFailureCallback.bind(this));
},
getTransactionHistorySuccessCallback:function(res){
    //alert(res);
    applicationManager.getNavigationManager().navigateTo({
                        "appName": "BillPayMA",
                        "friendlyName": "frmBillPayNew"
                    });
    applicationManager.getNavigationManager().updateForm(res, "frmBillPayNew");
},
    getTransactionHistoryFailureCallback:function(err){
// 		this.updateView({ "serverError": res });
        applicationManager.getNavigationManager().navigateTo({
                        "appName": "BillPayMA",
                        "friendlyName": "frmBillPayNew"
                    });
        applicationManager.getNavigationManager().updateForm({"NoTransactionHistory":true}, "frmBillPayNew");
},
makeInquiryCall:function(params){
    applicationManager.getBillManager().makeInquiryServiceCall(params,this.makeInquiryCallSuccessCallback.bind(this),this.makeInquiryCallFailureCallback.bind(this));
},
makeInquiryCallSuccessCallback:function(res){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var controller = applicationManager.getPresentationUtility().getController('frmBillPayNew', true);
    if (res.errorObj) {
        controller.lodgeBillpaySuccess(res);
    }
    else{
        
        controller.dataToPush = {};
        controller.lodgeBillpaySuccess(res);
        
    }
},

makeInquiryCallFailureCallback:function(err){
    this.updateView({ "serverError": err.errmsg?err.errmsg:err.errorMessage?err.errorMessage:"" });
},
makeNewInquiryCall:function(params){
    applicationManager.getBillManager().makeNewInquiryServiceCall(params,this.makeNewInquiryCallSuccessCallback.bind(this),this.makeNewInquiryCallFailureCallback.bind(this));
},
makeNewInquiryCallSuccessCallback:function(res){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var controller = applicationManager.getPresentationUtility().getController('frmBillPayNew', true);
    if (res.errorObj) {
        controller.CustomerBillInfoSuccess(res);
    }
    else{
        controller.CustomerBillInfoSuccess(res);
    }
},

makeNewInquiryCallFailureCallback:function(err){
    this.updateView({ "serverError": err.errmsg?err.errmsg:err.errorMessage?err.errorMessage:"" });
},
getFavMerchants:function(){
var params={};
applicationManager.getBillManager().getFavMerchantyServiceCall(params,this.getFavMerchantsSuccessCallback.bind(this),this.getFavMerchantsFailureCallback.bind(this));
},
getFavMerchantsSuccessCallback:function(res){
    kony.store.setItem('favMerchantsList', res);
    applicationManager.getNavigationManager().updateForm({
        "FavMerchantData": res
        }, "frmBillPayNew"); 
// alert("res" +res);
},
getFavMerchantsFailureCallback:function(err){
this.updateView({ "serverError": err.errmsg?err.errmsg:err.errorMessage?err.errorMessage:"" });
},
confirmBillPayCall:function(params){
    applicationManager.getBillManager().getconfirmBillpay(params,this.getconfirmBillpaySuccessCallback.bind(this),this.getconfirmBillpayFailureCallback.bind(this)); 
},
getconfirmBillpaySuccessCallback:function(res){
    kony.application.dismissLoadingScreen();
    if (res && res.MFAAttributes) {
        if (res.MFAAttributes.isMFARequired == "true") {
            var mfaJSON = {
                "flowType": "BILL_PAY_NCHL",
                "response": res
            };
            applicationManager.getMFAManager().initMFAFlow(mfaJSON);
        }
        applicationManager.getNavigationManager().setCustomInfo("MFAFlowTypeName", "BillPayFlow");
    }
    else{
        if(res.success=="false"){
			navManager.navigateTo("frmOneTimePaymentConfirm");
			applicationManager.getNavigationManager().updateForm({
            "confirmBillPayError": res
			}, "frmOneTimePaymentConfirm");
            kony.application.dismissLoadingScreen();
        }
        if(res.success=="true"){
            var navMan = applicationManager.getNavigationManager();
        navMan.navigateTo({
            "appName": "BillPayMA",
            "friendlyName": "frmPayBillAcknowledgement"
        });
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            applicationManager.getNavigationManager().updateForm({
                "AutomaticMerchantConfirmBillPayRes": res
                }, "frmPayBillAcknowledgement");
		}
    }
    },
getconfirmBillpayFailureCallback:function(err){
    if (err.serverErrorRes.success == "false" && err.serverErrorRes.dbpErrCode == "20001") {
        var navMan = applicationManager.getNavigationManager();
        navMan.navigateTo({
            "appName": "BillPayMA",
            "friendlyName": "frmPayBillAcknowledgement"
        });
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        applicationManager.getNavigationManager().updateForm({
            "AutomaticMerchantConfirmBillPayRes": err
        }, "frmPayBillAcknowledgement");
    }
    else{
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var navMan = applicationManager.getNavigationManager();
        navMan.navigateTo({
            "appName": "BillPayMA",
            "friendlyName": "frmOneTimePaymentConfirm"
        });
    applicationManager.getNavigationManager().updateForm({
        "confirmBillPayError": err
        }, "frmOneTimePaymentConfirm");
    }
//this.updateView({ "serverError": err.errmsg?err.errmsg:err.errorMessage?err.errorMessage:"" });
},
confirmBillPayCallNEA:function(params){
    applicationManager.getBillManager().getconfirmBillpayNEA(params,this.confirmBillPayCallNEASuccessCallback.bind(this),this.confirmBillPayCallNEAFailureCallback.bind(this)); 
},
confirmBillPayCallNEASuccessCallback:function(res){
    if (res && res.MFAAttributes) {
        if (res.MFAAttributes.isMFARequired == "true") {
            var mfaJSON = {
                "flowType": "BILL_PAY",
                "response": res
            };
            applicationManager.getMFAManager().initMFAFlow(mfaJSON);
        }
        applicationManager.getNavigationManager().setCustomInfo("MFAFlowTypeName", "BillPayFlow");
    }
    else{
        if(res.success=="false"){
            var navMan = applicationManager.getNavigationManager();
        navMan.navigateTo({
            "appName": "BillPayMA",
            "friendlyName": "frmBillPayNew"
        });
			applicationManager.getNavigationManager().updateForm({
            "ConfirmbillpayNEAError": res
			}, "frmBillPayNew");
            kony.application.dismissLoadingScreen();
        }
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if(res.transactionDetails[0].code!="0"){
			res.dbpErrMsg= res.transactionDetails[0].message;
			var navMan = applicationManager.getNavigationManager();
        navMan.navigateTo({
            "appName": "BillPayMA",
            "friendlyName": "frmBillPayNew"
        });
			res.billInfo=[];
			res.billInfo.push(res);
			applicationManager.getNavigationManager().updateForm({
            "ConfirmbillpayNEAError": res
			}, "frmBillPayNew");
            kony.application.dismissLoadingScreen();
	}else{
        var navMan = applicationManager.getNavigationManager();
        navMan.navigateTo({
            "appName": "BillPayMA",
            "friendlyName": "frmPayBillAcknowledgement"
        });
        //navManager.navigateTo("frmPayBillAcknowledgement");
        applicationManager.getNavigationManager().updateForm({
            "PaybillAck": res
        }, "frmPayBillAcknowledgement");
		}
    }
    },
    confirmBillPayCallNEAFailureCallback:function(err){
        kony.application.dismissLoadingScreen();
        if (err.serverErrorRes.success == "false" && err.serverErrorRes.dbpErrCode == "20001") {
            var navMan = applicationManager.getNavigationManager();
            navMan.navigateTo({
                "appName": "BillPayMA",
                "friendlyName": "frmPayBillAcknowledgement"
            });
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            applicationManager.getNavigationManager().updateForm({
                "TransactionReversalNEA": err
            }, "frmPayBillAcknowledgement");
        }
        else{
            err.dbpErrMsg=err.serverErrorRes.dbpErrMsg||err.serverErrorRes.errmsg;
            err.success="false";
            var navMan = applicationManager.getNavigationManager();
        navMan.navigateTo({
            "appName": "BillPayMA",
            "friendlyName": "frmBillPayNew"
        });
			applicationManager.getNavigationManager().updateForm({
            "ConfirmbillpayNEAError": err
			}, "frmBillPayNew");
            kony.application.dismissLoadingScreen();
        }
//this.updateView({ "serverError": err.errmsg?err.errmsg:err.errorMessage?err.errorMessage:"" });
},
confirmBillPayCallTopupNepal:function(params){
    applicationManager.getBillManager().getconfirmBillPayCallTopupNepal(params,this.confirmBillPayCallTopupNepalSuccess.bind(this),this.getconfirmBillPayCallTopupNepalFailure.bind(this)); 
},
confirmBillPayCallTopupNepalSuccess:function(res){
    if (res && res.MFAAttributes) {
        if (res.MFAAttributes.isMFARequired == "true") {
            var mfaJSON = {
                "flowType": "BILL_PAY_TOP_UP_NEPAL",
                "response": res
            };
            applicationManager.getMFAManager().initMFAFlow(mfaJSON);
        }
        applicationManager.getNavigationManager().setCustomInfo("MFAFlowTypeName", "BillPayFlow");
    }
    else{
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        if(res.success=="false"){
            var navMan = applicationManager.getNavigationManager();
        navMan.navigateTo({
            "appName": "BillPayMA",
            "friendlyName": "frmBillPayNew"
        });
			applicationManager.getNavigationManager().updateForm({
            "ConfirmbillpayNEAError": res
			}, "frmBillPayNew");
            kony.application.dismissLoadingScreen();
        }
    else{
        var navMan = applicationManager.getNavigationManager();
        navMan.navigateTo({
            "appName": "BillPayMA",
            "friendlyName": "frmPayBillAcknowledgement"
        });
        //navManager.navigateTo("frmPayBillAcknowledgement");
        applicationManager.getNavigationManager().updateForm({
            "PaybillAck": res
        }, "frmPayBillAcknowledgement");
		}
    }
    },
    getconfirmBillPayCallTopupNepalFailure:function(err){
        kony.application.dismissLoadingScreen();
        if (err.serverErrorRes.success == "false" && err.serverErrorRes.dbpErrCode == "20001") {
            var navMan = applicationManager.getNavigationManager();
            navMan.navigateTo({
                "appName": "BillPayMA",
                "friendlyName": "frmPayBillAcknowledgement"
            });
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            applicationManager.getNavigationManager().updateForm({
                "transactionReversalTOPUPNEPAL": err
            }, "frmPayBillAcknowledgement");
        }
        else{
            err.dbpErrMsg=err.serverErrorRes.dbpErrMsg||err.serverErrorRes.errmsg;
            err.success="false";
            var navMan = applicationManager.getNavigationManager();
        navMan.navigateTo({
            "appName": "BillPayMA",
            "friendlyName": "frmBillPayNew"
        });
			applicationManager.getNavigationManager().updateForm({
            "ConfirmbillpayNEAError": err
			}, "frmBillPayNew");
            kony.application.dismissLoadingScreen();
        }
//this.updateView({ "serverError": err.errmsg?err.errmsg:err.errorMessage?err.errorMessage:"" });
},
confirmBillPayCallKUKL:function(params){
    applicationManager.getBillManager().getconfirmBillpayKUKL(params,this.confirmBillPayCallKUKLSuccessCallback.bind(this),this.confirmBillPayCallKUKLFailureCallback.bind(this)); 
},
confirmBillPayCallKUKLSuccessCallback:function(res){
    if (res && res.MFAAttributes) {
        if (res.MFAAttributes.isMFARequired == "true") {
            var mfaJSON = {
                "flowType": "BILL_PAY_KUKL",
                "response": res
            };
            applicationManager.getMFAManager().initMFAFlow(mfaJSON);
        }
        applicationManager.getNavigationManager().setCustomInfo("MFAFlowTypeName", "BillPayFlow");
    }
    else{
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        if(res.success=="false"){
            var navMan = applicationManager.getNavigationManager();
        navMan.navigateTo({
            "appName": "BillPayMA",
            "friendlyName": "frmBillPayNew"
        });
			applicationManager.getNavigationManager().updateForm({
            "ConfirmbillpayNEAError": res
			}, "frmBillPayNew");
            kony.application.dismissLoadingScreen();
        }
    else{
        var navMan = applicationManager.getNavigationManager();
        navMan.navigateTo({
            "appName": "BillPayMA",
            "friendlyName": "frmPayBillAcknowledgement"
        });
        //navManager.navigateTo("frmPayBillAcknowledgement");
        applicationManager.getNavigationManager().updateForm({
            "PaybillAck": res
        }, "frmPayBillAcknowledgement");
		}
    }
    },
    confirmBillPayCallKUKLFailureCallback:function(err){
        kony.application.dismissLoadingScreen();
        if (err.serverErrorRes.success == "false" && err.serverErrorRes.dbpErrCode == "20001") {
            var navMan = applicationManager.getNavigationManager();
            navMan.navigateTo({
                "appName": "BillPayMA",
                "friendlyName": "frmPayBillAcknowledgement"
            });
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            applicationManager.getNavigationManager().updateForm({
                "TransactionReversalNEA": err
            }, "frmPayBillAcknowledgement");
        }
        else{
            err.dbpErrMsg=err.serverErrorRes.dbpErrMsg||err.serverErrorRes.errmsg;
            err.success="false";
            var navMan = applicationManager.getNavigationManager();
        navMan.navigateTo({
            "appName": "BillPayMA",
            "friendlyName": "frmBillPayNew"
        });
			applicationManager.getNavigationManager().updateForm({
            "ConfirmbillpayNEAError": err
			}, "frmBillPayNew");
            kony.application.dismissLoadingScreen();
        }
//this.updateView({ "serverError": err.errmsg?err.errmsg:err.errorMessage?err.errorMessage:"" });
},
getURL:function(params){
    applicationManager.getBillManager().getURLAutoMerchant(params,this.getURLSuccessCallback.bind(this),this.getURLFailureCallback.bind(this)); 
},
getURLSuccessCallback:function(res){
    //applicationManager.getPresentationUtility().dismissLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
    
			applicationManager.getNavigationManager().updateForm({
            "AutomaticMerchantURL": res
			}, "frmBillPayNew");
    },
getURLFailureCallback:function(err){
this.updateView({ "serverError": err.errmsg?err.errmsg:err.errorMessage?err.errorMessage:"" });
},
transferCall:function(params){
    applicationManager.getBillManager().transfergetCall(params,this.transferCallSuccessCallback.bind(this),this.transferCallFailureCallback.bind(this)); 
},
transferCallSuccessCallback:function(res){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
    
			applicationManager.getNavigationManager().updateForm({
            "transferCall": res
			}, "frmOneTimePaymentConfirm");
    },
    transferCallFailureCallback:function(err){
this.updateView({ "serverError": err.errmsg?err.errmsg:err.errorMessage?err.errorMessage:"" });
},
transferSecondCall:function(params){
    applicationManager.getBillManager().transfergetCall(params,this.transferSecondCallSuccessCallback.bind(this),this.transferSecondCallFailureCallback.bind(this)); 
},
transferSecondCallSuccessCallback:function(res){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
    
			applicationManager.getNavigationManager().updateForm({
            "transferSecondCall": res
			}, "frmOneTimePaymentConfirm");
    },
    transferSecondCallFailureCallback:function(err){
this.updateView({ "serverError": err.errmsg?err.errmsg:err.errorMessage?err.errorMessage:"" });
},
getWebViewdata:function(params){
    applicationManager.getBillManager().getWebViewdata(params,this.getWebViewdataSuccessCallback.bind(this),this.getWebViewdataFailureCallback.bind(this)); 
},
getWebViewdataSuccessCallback:function(res){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
    applicationManager.getNavigationManager().navigateTo("frmOneTimePaymentConfirm");
    applicationManager.getNavigationManager().updateForm({
        "WebView": res
        }, "frmOneTimePaymentConfirm");
    },
    getWebViewdataFailureCallback:function(err){
this.updateView({ "serverError": err.errmsg?err.errmsg:err.errorMessage?err.errorMessage:"" });
},
createFavoriteMerchant:function(params){
    applicationManager.getBillManager().createFavoriteMerchant(params,this.createFavoriteMerchantSuccessCallback.bind(this),this.createFavoriteMerchantFailureCallback.bind(this)); 
},
createFavoriteMerchantSuccessCallback:function(res){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if(res.success=="true"){
        applicationManager.getNavigationManager().updateForm({
            "CreateFavMerchantSuccess": res
            }, "frmPayBillAcknowledgement");
    }
    /*applicationManager.getNavigationManager().navigateTo("frmOneTimePaymentConfirm");
    applicationManager.getNavigationManager().updateForm({
        "WebView": res
        }, "frmOneTimePaymentConfirm");*/
    },
    createFavoriteMerchantFailureCallback:function(err){
this.updateView({ "serverError": err.errmsg?err.errmsg:err.errorMessage?err.errorMessage:"" });
},
getSingelBillPaySupportedAccounts : function() {
    var accounts = this.accountManager.getInternalAccounts();
    if (kony.sdk.isNullOrUndefined(accounts) || accounts === "") {
        return [];
    }
    let allowedaccounts = accounts.filter(function(account) {
        return (this.configurationManager.checkAccountAction(account.accountID, "BILL_PAY_CREATE") && (account.currencyCode=="NPR") && (account.supportBillPay=="1") && (account.supportTransferFrom=="1"));
    }.bind(this));
    return allowedaccounts.filter(function(account) {
        return account.accountStatus === "ACTIVE" || account.accountStatus === "CLOSURE_PENDING"
    })
},
getFavMerchantsdataforUpdation:function(){
var params={};
applicationManager.getBillManager().getFavMerchantyServiceCall(params,this.getFavMerchantsUpdationSuccessCallback.bind(this),this.getFavMerchantsUpdationFailureCallback.bind(this));
},
getFavMerchantsUpdationSuccessCallback:function(res){
    kony.store.setItem('favMerchantsList', res);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
        applicationManager.getNavigationManager().updateForm({
            "deleteFavMerchantSuccess": res
            }, "frmPayBillAcknowledgement");
},
getFavMerchantsUpdationFailureCallback:function(err){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
this.updateView({ "serverError": err.errmsg?err.errmsg:err.errorMessage?err.errorMessage:"" });
},
deleteFavoriteMerchant:function(params){
    applicationManager.getBillManager().deleteFavoriteMerchant(params,this.deleteFavoriteMerchantSuccessCallback.bind(this),this.deleteFavoriteMerchantFailureCallback.bind(this)); 
},
deleteFavoriteMerchantSuccessCallback:function(res){
    if(res.success=="true"){
    this.getFavMerchantsdataforUpdation();
    }
    },
    deleteFavoriteMerchantFailureCallback:function(err){
        applicationManager.getPresentationUtility().dismissLoadingScreen();
this.updateView({ "serverError": err.errmsg?err.errmsg:err.errorMessage?err.errorMessage:"" });
},
getCategoriesByMerchant: function(params) {
        var scopeObj = this;
        var billPayEligibility = this.userPreferencesManager.checkBillPayEligibilityForUser();
        if (billPayEligibility === "Activated") {
                this.updateView({
                    isLoading: true
                });
                applicationManager.getBillManager().getCategoriesByMerchant(params, this.getCategoriesByCodeSuccessCallback.bind(this), this.getCategoriesByCodeErrorCallback.bind(this));
        } else if (billPayEligibility === "NotActivated") {
            scopeObj.showView({
                form: "frmBillPayActivation",
                data: {
                    isLoading: true
                },
                callbackModelConfig: {
                    activate: true
                }
            });
            scopeObj.getTnCBillPayActivate();
        } else {
            scopeObj.showView({
                form: "frmBillPayActivationNotEligible",
                callbackModelConfig: {
                    notEligible: true
                }
            });
            scopeObj.showBillPayNotEligibleView();
        }
    },
	getCategoriesByCodeSuccessCallback: function(res) {
        if (res.categories.length != 0) {
				var context = {"loadCategoriesSuccess": true,"merchantBasicInfo": res};
                applicationManager.getNavigationManager().updateForm(context, "frmBillPayNew");
        } else {
            this.updateView({
                isLoading: false
            });
            applicationManager.getNavigationManager().updateForm({
                "NoCategory": true
            }, "frmBillPayNew");
        }
    },
	getCategoriesByCodeErrorCallback: function(err) {
        this.updateView({
            isLoading: false
        });
        applicationManager.getNavigationManager().updateForm({
            "NoCategory": true
        }, "frmBillPayNew");
    },
    deleteFavMerchant:function(params){
        applicationManager.getBillManager().deleteFavoriteMerchant(params,this.deleteFavMerchantSuccessCallback.bind(this),this.deleteFavMerchantFailureCallback.bind(this)); 
    },
    deleteFavMerchantSuccessCallback:function(res){
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        if(res.success=="true"){
            applicationManager.getNavigationManager().updateForm({
                "deleteFavoriteMerchantSuccess": res
                }, "frmBillPayNew");
        }
        },
        deleteFavMerchantFailureCallback:function(err){
    this.updateView({ "serverError": err.errmsg?err.errmsg:err.errorMessage?err.errorMessage:"" });
    },
    downloadTransactionReport: function(transactionId) {
            this.showProgressBar();
            const params = {
                transactionId
            };
            applicationManager.getBillManager().generateTransactionReport(params, this.generateTransactionReportSuccess.bind(this), this.generateTransactionReportFailure.bind(this));
        },
        generateTransactionReportSuccess: function(successResponse) {
            var downloadReportURL = this.transactionManager.fetchTransactionReport(successResponse);
            var data = {
                "url": downloadReportURL
            };
            CommonUtilities.downloadFile(data);
            this.hideProgressBar();
        },
        generateTransactionReportFailure: function(error) {
            this.hideProgressBar();
            this.updateView({
                "serverError": error
            });
        },
        fetchExchangeRate:function(payload){
            applicationManager.getBillManager().fetchExchangeRates(payload,this.fetchExchangeRateSuccess.bind(this),this.fetchExchangeRateFailure.bind(this)); 
        },
        fetchExchangeRateSuccess:function(success){
            navManager.navigateTo("frmOneTimePaymentConfirm");
			applicationManager.getNavigationManager().updateForm({
            "ConvertedAmountData": success
			}, "frmOneTimePaymentConfirm");

        },
        fetchExchangeRateFailure:function(err){

        },
        getBillPayPreferedAccountNumber : function () {
            var preferredAccNumValue=this.userPreferencesManager.getDefaultAccountforBillPay();
            var navManager = applicationManager.getNavigationManager();
            if(preferredAccNumValue!=""&& preferredAccNumValue!=undefined&& preferredAccNumValue!=null){
            return this.userPreferencesManager.getDefaultAccountforBillPay();
            }
            else{
                return navManager.getCustomInfo("defaultAcc").Accounts[0].accountID;
            }
        }
};    

});