define({
getCategories:function (data, presentationSuccessCallback, presentationErrorCallback) {
var getPayeeBills = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Merchants");
getPayeeBills.customVerb("getMerchantCategories", data, getAllCompletionCallback);
function getAllCompletionCallback(status, data, error) {
    
    var srh = applicationManager.getServiceResponseHandler();
    var obj = srh.manageResponse(status, data, error);
    if (obj["status"] === true) {
    presentationSuccessCallback(obj["data"]);
    }
    else {
    presentationErrorCallback(obj["errmsg"]);
    }
}
},
getMerchants: function(data, presentationSuccessCallback, presentationErrorCallback) {
    var getPayeeBills = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Merchants");
    getPayeeBills.customVerb("getMerchantFormFields", data, getAllCompletionCallback);

    function getAllCompletionCallback(status, data, error) {
        var srh = applicationManager.getServiceResponseHandler();
        var obj = srh.manageResponse(status, data, error);
        if (obj["status"] === true) {
            presentationSuccessCallback(obj["data"]);
        } else {
            presentationErrorCallback(obj["errmsg"]);
        }
    }
},
getTransactionHistory:function(param,presentationSuccessCallback, presentationErrorCallback){
    var getPayeeBills = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Merchants");
    getPayeeBills.customVerb("getBillPaymentHistory", param, getAllCompletionCallback);

    function getAllCompletionCallback(status, data, error) {
        var srh = applicationManager.getServiceResponseHandler();
        var obj = srh.manageResponse(status, data, error);
        if (obj["status"] === true) {
            presentationSuccessCallback(obj["data"]);
        } else {
            presentationErrorCallback(obj["errmsg"]);
        }
    }
},

makeInquiryServiceCall:function(param,presentationSuccessCallback, presentationErrorCallback){
    var getPayeeBills = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Merchants");
    getPayeeBills.customVerb("lodgeBillPay", param, getAllCompletionCallback);

    function getAllCompletionCallback(status, data, error) {
        var srh = applicationManager.getServiceResponseHandler();
        var obj = srh.manageResponse(status, data, error);
        if (obj["status"] === true) {
            presentationSuccessCallback(obj["data"]);
        } else {
            presentationErrorCallback(obj["errmsg"]);
        }
    }
},
makeNewInquiryServiceCall:function(param,presentationSuccessCallback, presentationErrorCallback){
    var getPayeeBills = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("NEA_Payments");
     if(param.paymentAggregator=="KUKL"){
		getPayeeBills = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("KUKL_Payments");
		getPayeeBills.customVerb("getCustomerBillInfo", param, getAllCompletionCallback);
		}
        else{
		getPayeeBills = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("NEA_Payments");
        getPayeeBills.customVerb("getCustomerBillInfo", param, getAllCompletionCallback);
		}

    function getAllCompletionCallback(status, data, error) {
        var srh = applicationManager.getServiceResponseHandler();
        var obj = srh.manageResponse(status, data, error);
        if (obj["status"] === true) {
            presentationSuccessCallback(obj["data"]);
        } else {
            presentationErrorCallback(obj["errmsg"]);
        }
    }
},
getFavMerchantyServiceCall:function(param,presentationSuccessCallback, presentationErrorCallback){
    var getPayeeBills = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Merchants");
    getPayeeBills.customVerb("getFavoriteMerchants", param, getAllCompletionCallback);

    function getAllCompletionCallback(status, data, error) {
        var srh = applicationManager.getServiceResponseHandler();
        var obj = srh.manageResponse(status, data, error);
        if (obj["status"] === true) {
            presentationSuccessCallback(obj["data"]);
        } else {
            presentationErrorCallback(obj["errmsg"]);
        }
    }
},

getconfirmBillpay:function(param,presentationSuccessCallback, presentationErrorCallback){
    var getPayeeBills = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("BillPay");
    getPayeeBills.customVerb("confirmBillPay", param, getAllCompletionCallback);

    function getAllCompletionCallback(status, data, error) {
        var srh = applicationManager.getServiceResponseHandler();
        var obj = srh.manageResponse(status, data, error);
        if (obj["status"] === true) {
            presentationSuccessCallback(obj["data"]);
        } else {
            presentationErrorCallback(obj["errmsg"]);
        }
    }
},
getconfirmBillpayNEA:function(param,presentationSuccessCallback, presentationErrorCallback){
    var getPayeeBills = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("NEA_Payments");
    getPayeeBills.customVerb("confirmBillPay", param, getAllCompletionCallback);

    function getAllCompletionCallback(status, data, error) {
        var srh = applicationManager.getServiceResponseHandler();
        var obj = srh.manageResponse(status, data, error);
        if (obj["status"] === true) {
            presentationSuccessCallback(obj["data"]);
        } else {
            presentationErrorCallback(obj["errmsg"]);
        }
    }
},
getconfirmBillpayKUKL:function(param,presentationSuccessCallback, presentationErrorCallback){
    var getPayeeBills = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("KUKL_Payments");
    getPayeeBills.customVerb("confirmBillPay", param, getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
        var srh = applicationManager.getServiceResponseHandler();
        var obj = srh.manageResponse(status, data, error);
        if (obj["status"] === true) {
            presentationSuccessCallback(obj["data"]);
        } else {
            presentationErrorCallback(obj["errmsg"]);
        }
    }
},
getconfirmBillPayCallTopupNepal:function(param,presentationSuccessCallback, presentationErrorCallback){
    var getPayeeBills = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("TopUpNepal");
    getPayeeBills.customVerb("confirmBillPay", param, getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
        var srh = applicationManager.getServiceResponseHandler();
        var obj = srh.manageResponse(status, data, error);
        if (obj["status"] === true) {
            presentationSuccessCallback(obj["data"]);
        } else {
            presentationErrorCallback(obj["errmsg"]);
        }
    }
},
getURLAutoMerchant:function(param,presentationSuccessCallback, presentationErrorCallback){
    var getPayeeBills = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("BillPay");
    getPayeeBills.customVerb("getNPSBillersIntegrationURL", param, getAllCompletionCallback);

    function getAllCompletionCallback(status, data, error) {
        var srh = applicationManager.getServiceResponseHandler();
        var obj = srh.manageResponse(status, data, error);
        if (obj["status"] === true) {
            presentationSuccessCallback(obj["data"]);
        } else {
            presentationErrorCallback(obj["errmsg"]);
        }
    }
},
transfergetCall:function(param,presentationSuccessCallback, presentationErrorCallback){
    var getPayeeBills = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Transaction");
    getPayeeBills.customVerb("IntraBankAccFundTransfer", param, getAllCompletionCallback);

    function getAllCompletionCallback(status, data, error) {
        var srh = applicationManager.getServiceResponseHandler();
        var obj = srh.manageResponse(status, data, error);
        if (obj["status"] === true) {
            presentationSuccessCallback(obj["data"]);
        } else {
            presentationErrorCallback(obj["errmsg"]);
        }
    }
},
getWebViewdata:function(param,presentationSuccessCallback, presentationErrorCallback){
    var getPayeeBills = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("BillPay");
    getPayeeBills.customVerb("getNPIBillerData", param, getAllCompletionCallback);

    function getAllCompletionCallback(status, data, error) {
        var srh = applicationManager.getServiceResponseHandler();
        var obj = srh.manageResponse(status, data, error);
        if (obj["status"] === true) {
            presentationSuccessCallback(obj["data"]);
        } else {
            presentationErrorCallback(obj["errmsg"]);
        }
    }
},
createFavoriteMerchant:function(param,presentationSuccessCallback, presentationErrorCallback){
    var getPayeeBills = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Merchants");
    getPayeeBills.customVerb("createFavoriteMerchant", param, getAllCompletionCallback);

    function getAllCompletionCallback(status, data, error) {
        var srh = applicationManager.getServiceResponseHandler();
        var obj = srh.manageResponse(status, data, error);
        if (obj["status"] === true) {
            presentationSuccessCallback(obj["data"]);
        } else {
            presentationErrorCallback(obj["errmsg"]);
        }
    }
},
getMerchantCharges: function(params,presentationSuccessCallback, presentationErrorCallback){
 var getPayeeBills = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Merchants");
    getPayeeBills.customVerb("getMerchantPaymentCharges", params, getAllCompletionCallback);

    function getAllCompletionCallback(status, data, error) {
        var srh = applicationManager.getServiceResponseHandler();
        var obj = srh.manageResponse(status, data, error);
        if (obj["status"] === true) {
            presentationSuccessCallback(obj["data"]);
        } else {
            presentationErrorCallback(obj["errmsg"]);
        }
    }
},
deleteFavoriteMerchant:function(param,presentationSuccessCallback, presentationErrorCallback){
    var getPayeeBills = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Merchants");
    getPayeeBills.customVerb("deleteFavoriteMerchant", param, getAllCompletionCallback);

    function getAllCompletionCallback(status, data, error) {
        var srh = applicationManager.getServiceResponseHandler();
        var obj = srh.manageResponse(status, data, error);
        if (obj["status"] === true) {
            presentationSuccessCallback(obj["data"]);
        } else {
            presentationErrorCallback(obj["errmsg"]);
        }
    }
},
getCategoriesByMerchant: function(data, presentationSuccessCallback, presentationErrorCallback) {
        var getPayeeBills = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Merchants");
        getPayeeBills.customVerb("getMerchantCategoriesByCode", data, getAllCompletionCallback);

        function getAllCompletionCallback(status, data, error) {
            var srh = applicationManager.getServiceResponseHandler();
            var obj = srh.manageResponse(status, data, error);
            if (obj["status"] === true) {
                presentationSuccessCallback(obj["data"]);
            } else {
                presentationErrorCallback(obj["errmsg"]);
            }
        }
    },
     generateTransactionReport: function(params, presentationSuccessCallback, presentationErrorCallback) {
        var self = this;
        var downloadTransactionModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Merchants");
        downloadTransactionModel.customVerb('generateBill', params, getAllCompletionCallback);

        function getAllCompletionCallback(status, data, error) {
            var srh = applicationManager.getServiceResponseHandler();
            var obj = srh.manageResponse(status, data, error);
            if (obj["status"] === true) {
                presentationSuccessCallback(obj["data"]);
            } else {
                presentationErrorCallback(obj["errmsg"]);
            }
        }
    },
    fetchExchangeRates: function(params, presentationSuccessCallback, presentationErrorCallback) {
        var self = this;
        var downloadTransactionModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Forex");
        downloadTransactionModel.customVerb('getConvertedAmount', params, getAllCompletionCallback);

        function getAllCompletionCallback(status, data, error) {
            var srh = applicationManager.getServiceResponseHandler();
            var obj = srh.manageResponse(status, data, error);
            if (obj["status"] === true) {
                presentationSuccessCallback(obj["data"]);
            } else {
                presentationErrorCallback(obj["errmsg"]);
            }
        }
    },
    fetchBankDate: function(params, presentationSuccessCallback, presentationErrorCallback) {
        var transactionObj = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("BankDate");
        transactionObj.customVerb('getBankDate', params, getCompletionCallback);

        function getCompletionCallback(status, data, error) {
            var srh = applicationManager.getServiceResponseHandler();
            var obj = srh.manageResponse(status, data, error);
            if (obj.status === true) {
                presentationSuccessCallback(obj.data);
            } else {
                presentationErrorCallback(obj.errmsg);
            }
        }
    },
});