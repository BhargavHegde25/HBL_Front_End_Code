define([], function(){
   return{
  fetchSignInDetails : function(param,presentationSuccessCallback,presentationErrorCallback)
 {
   var self =this;
   var infoTerms  =  kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Security");
   infoTerms.customVerb('ThirdpartyAuthUserValidation', param, getCompletionCallback);
   function  getCompletionCallback(status,  data,  error) {
     var srh = applicationManager.getServiceResponseHandler();
     var obj =  srh.manageResponse(status,  data,  error,presentationSuccessCallback,presentationErrorCallback);
     if(obj["status"] === true){
     presentationSuccessCallback(obj["data"]);
     }
     else {
       presentationErrorCallback(obj["errmsg"]);
     }
   }
 },
 getQRCode: function(param, presentationSuccessCallback, presentationErrorCallback) {
  var self = this;
  var infoTerms  =  kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Security");
  infoTerms.customVerb('GoogleAuthPair', param, getCompletionCallback);
  function  getCompletionCallback(status,  data,  error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status,  data,  error, presentationSuccessCallback, presentationErrorCallback);
      if (obj["status"] === true) {
          presentationSuccessCallback(obj["data"]);
      } else {
          presentationErrorCallback(obj["errmsg"]);
      }
  }
},
gettotp: function(param, presentationSuccessCallback, presentationErrorCallback) {
  var self = this;
  var infoTerms  =  kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Security");
  infoTerms.customVerb('GoogleTOTPValidation', param, getCompletionCallback);

  function  getCompletionCallback(status,  data,  error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status,  data,  error, presentationSuccessCallback, presentationErrorCallback);
      if (obj["status"] === true) {
          presentationSuccessCallback(obj["data"]);
      } else {
          presentationErrorCallback(obj["errmsg"]);
      }
  }
},
getTransactionpin: function(param, presentationSuccessCallback, presentationErrorCallback) {
  var self = this;
  var infoTerms  =  kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Security");
  infoTerms.customVerb('getTransactionPINStatus', param, getCompletionCallback);

  function  getCompletionCallback(status,  data,  error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status,  data,  error, presentationSuccessCallback, presentationErrorCallback);
      if (obj["status"] === true) {
          presentationSuccessCallback(obj["data"]);
      } else {
          presentationErrorCallback(obj["errmsg"]);
      }
  }
},
getResetTransactionpin: function(param, presentationSuccessCallback, presentationErrorCallback) {
  var self = this;
  var infoTerms  =  kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Security");
  infoTerms.customVerb('transactionPINResetRequest', param, getCompletionCallback);

  function  getCompletionCallback(status,  data,  error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status,  data,  error, presentationSuccessCallback, presentationErrorCallback);
      if (obj["status"] === true) {
          presentationSuccessCallback(obj["data"]);
      } else {
          presentationErrorCallback(obj["errmsg"]);
      }
  }
},
getTransactionpinValidation : function(param, presentationSuccessCallback, presentationErrorCallback) {
  var self = this;
  var infoTerms  =  kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Security");
  infoTerms.customVerb('TransactionPINResetValidation', param, getCompletionCallback);

  function  getCompletionCallback(status,  data,  error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status,  data,  error, presentationSuccessCallback, presentationErrorCallback);
      if (obj["status"] === true) {
          presentationSuccessCallback(obj["data"]);
      } else {
          presentationErrorCallback(obj["errmsg"]);
      }
  }
},
verifyPin: function(param, presentationSuccessCallback, presentationErrorCallback) {
  var self = this;
  var infoTerms  =  kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Security");
  infoTerms.customVerb('validateTransactionPin', param, getCompletionCallback);

  function  getCompletionCallback(status,  data,  error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status,  data,  error, presentationSuccessCallback, presentationErrorCallback);
      if (obj["status"] === true) {
          presentationSuccessCallback(obj["data"]);
      } else {
          presentationErrorCallback(obj["errmsg"]);
      }
  }
},
fetchConsents: function(param, presentationSuccessCallback, presentationErrorCallback) {
  var self = this;
  var infoTerms  =  kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("ExternalUsers_2");
  infoTerms.customVerb('crossBorderConsentFetch', param, getCompletionCallback);
  function  getCompletionCallback(status,  data,  error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status,  data,  error, presentationSuccessCallback, presentationErrorCallback);
      if (obj["status"] === true) {
          presentationSuccessCallback(obj["data"]);
      } else {
          presentationErrorCallback(obj["errmsg"]);
      }
  }
},
fetchConsent: function(param, presentationSuccessCallback, presentationErrorCallback) {
  var self = this;
  var infoTerms  =  kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("CrossBorderPayments");
  infoTerms.customVerb('updateConsent', param, getCompletionCallback);
  function  getCompletionCallback(status,  data,  error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status,  data,  error, presentationSuccessCallback, presentationErrorCallback);
      if (obj["status"] === true) {
          presentationSuccessCallback(obj["data"]);
      } else {
          presentationErrorCallback(obj["errmsg"]);
      }
  }
},

createConsent: function(param, presentationSuccessCallback, presentationErrorCallback) {
    var self = this;
    var infoTerms  =  kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("CrossBorderPayments");
    infoTerms.customVerb('createConsent', param, getCompletionCallback);
    function  getCompletionCallback(status,  data,  error) {
        var srh = applicationManager.getServiceResponseHandler();
        var obj = srh.manageResponse(status,  data,  error, presentationSuccessCallback, presentationErrorCallback);
        if (obj["status"] === true) {
            presentationSuccessCallback(obj["data"]);
        } else {
            presentationErrorCallback(obj["errmsg"]);
        }
    }
  },

  getAccList:function(param,presentationSuccessCallback, presentationErrorCallback) {
    var self = this;
    var infoTerms  =  kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("DigitalArrangements");
    infoTerms.customVerb('getList', param, getCompletionCallback);
    function  getCompletionCallback(status,  data,  error) {
        var srh = applicationManager.getServiceResponseHandler();
        var obj = srh.manageResponse(status,  data,  error, presentationSuccessCallback, presentationErrorCallback);
        if (obj["status"] === true) {
            presentationSuccessCallback(obj["data"]);
        } else {
            presentationErrorCallback(obj["errmsg"]);
        }
    }
  },
  getExchangeCheckLimit : function (param,presentationSuccessCallback, presentationErrorCallback) {
    var self = this;
    var infoTerms  =  kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("CrossBorderPayments");
    infoTerms.customVerb('getCheckLimit',param,  getCompletionCallback);
    function  getCompletionCallback(status,  data,  error) {
        var srh = applicationManager.getServiceResponseHandler();
        var obj = srh.manageResponse(status,  data,  error);
        if (obj["status"] === true) {
          presentationSuccessCallback(obj["data"]);
        } else {
          presentationErrorCallback(obj["errmsg"]);
        }
    }
  },
  getValidateCustomer : function (param,presentationSuccessCallback, presentationErrorCallback) {
    var self = this;
    var infoTerms  =  kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("CrossBorderPayments");
    infoTerms.customVerb('validateCustomer',param,  getCompletionCallback);
    function  getCompletionCallback(status,  data,  error) {
        var srh = applicationManager.getServiceResponseHandler();
        var obj = srh.manageResponse(status,  data,  error);
        if (obj["status"] === true) {
          presentationSuccessCallback(obj["data"]);
        } else {
          presentationErrorCallback(obj["errmsg"]);
        }
    }
  },
  getPurposeDetails : function (param,presentationSuccessCallback, presentationErrorCallback) {
    var self = this;
    var infoTerms  =  kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("CrossBorderPayments");
    infoTerms.customVerb('getPurpose',param,  getCompletionCallback);
    function  getCompletionCallback(status,  data,  error) {
        var srh = applicationManager.getServiceResponseHandler();
        var obj = srh.manageResponse(status,  data,  error);
        if (obj["status"] === true) {
          presentationSuccessCallback(obj["data"]);
        } else {
          presentationErrorCallback(obj["errmsg"]);
        }
    }
  },
  getPaymentDetails : function (param,presentationSuccessCallback, presentationErrorCallback) {
    var self = this;
    var infoTerms  =  kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("CrossBorderPayments");
    infoTerms.customVerb('createPayment',param,  getCompletionCallback);
    function  getCompletionCallback(status,  data,  error) {
        var srh = applicationManager.getServiceResponseHandler();
        var obj = srh.manageResponse(status,  data,  error);
        if (obj["status"] === true) {
          presentationSuccessCallback(obj["data"]);
        } else {
          presentationErrorCallback(obj["errmsg"]);
        }
    }
  },
  
createFixedDepositeWithSTP: function(param, presentationSuccessCallback, presentationErrorCallback) {
  var self = this;
  var infoTerms  =  kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("FixedDeposit");
  infoTerms.customVerb('createFixedDepositSTP', param, getCompletionCallback);
  function  getCompletionCallback(status,  data,  error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status,  data,  error, presentationSuccessCallback, presentationErrorCallback);
      if (obj["status"] === true) {
          presentationSuccessCallback(obj["data"]);
      } else {
          presentationErrorCallback(obj["errmsg"]);
      }
  }
},

createFixedDepositeWithNonSTP: function(param, presentationSuccessCallback, presentationErrorCallback) {
  var self = this;
  var infoTerms  =  kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("FixedDeposit");
  infoTerms.customVerb('createFixedDepositNonSTP', param, getCompletionCallback);
  function  getCompletionCallback(status,  data,  error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status,  data,  error, presentationSuccessCallback, presentationErrorCallback);
      if (obj["status"] === true) {
          presentationSuccessCallback(obj["data"]);
      } else {
          presentationErrorCallback(obj["errmsg"]);
      }
  }
},

getInterestRateDetail: function(param, presentationSuccessCallback, presentationErrorCallback) {
  var self = this;
  var infoTerms  =  kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("FixedDeposit");
  infoTerms.customVerb('getFixedDepositRates', param, getCompletionCallback);
  function  getCompletionCallback(status,  data,  error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status,  data,  error, presentationSuccessCallback, presentationErrorCallback);
      if (obj["status"] === true) {
          presentationSuccessCallback(obj["data"]);
      } else {
          presentationErrorCallback(obj["errmsg"]);
      }
  }
},
getDashboardCurrencyDetails: function(param, presentationSuccessCallback, presentationErrorCallback) {
  var self = this;
  var infoTerms  =  kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Forex");
  infoTerms.customVerb('fetchDashboardCurrencyRates', param, getCompletionCallback);
  function  getCompletionCallback(status,  data,  error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status,  data,  error, presentationSuccessCallback, presentationErrorCallback);
      if (obj["status"] === true) {
          presentationSuccessCallback(obj["data"]);
      } else {
          presentationErrorCallback(obj["errmsg"]);
      }
  }
},
getCurrentTimeDetails: function(param, presentationSuccessCallback, presentationErrorCallback) {
  var self = this;
  var infoTerms  =  kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("BankDate");
  infoTerms.customVerb('getBankDate', param, getCompletionCallback);
  function  getCompletionCallback(status,  data,  error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status,  data,  error, presentationSuccessCallback, presentationErrorCallback);
      if (obj["status"] === true) {
          presentationSuccessCallback(obj["data"]);
      } else {
          presentationErrorCallback(obj["errmsg"]);
      }
  }
},
fetchCurrencyCodeDetails:function(param, presentationSuccessCallback, presentationErrorCallback) {
  var self = this;
  var infoTerms  =  kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Forex");
  infoTerms.customVerb('fetchBaseCurrency', param, getCompletionCallback);
  function  getCompletionCallback(status,  data,  error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status,  data,  error, presentationSuccessCallback, presentationErrorCallback);
      if (obj["status"] === true) {
          presentationSuccessCallback(obj["data"]);
      } else {
          presentationErrorCallback(obj["errmsg"]);
      }
  }
},
fetchPreLoginCurrencyCodeDetails:function(param, presentationSuccessCallback, presentationErrorCallback) {
  var self = this;
  var infoTerms  =  kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Forex");
  infoTerms.customVerb('getBaseCurrencyPrelogin', param, getCompletionCallback);
  function  getCompletionCallback(status,  data,  error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status,  data,  error, presentationSuccessCallback, presentationErrorCallback);
      if (obj["status"] === true) {
          presentationSuccessCallback(obj["data"]);
      } else {
          presentationErrorCallback(obj["errmsg"]);
      }
  }
},
getPreloginDashboardCurrencyDetails:function(param, presentationSuccessCallback, presentationErrorCallback) {
  var self = this;
  var infoTerms  =  kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Forex");
  infoTerms.customVerb('getDashboardCurrenciesPrelogin', param, getCompletionCallback);
  function  getCompletionCallback(status,  data,  error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status,  data,  error, presentationSuccessCallback, presentationErrorCallback);
      if (obj["status"] === true) {
          presentationSuccessCallback(obj["data"]);
      } else {
          presentationErrorCallback(obj["errmsg"]);
      }
  }
},
getPreloginCurrentTimeDetails:function(param, presentationSuccessCallback, presentationErrorCallback) {
  var self = this;
  var infoTerms  =  kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Forex");
  infoTerms.customVerb('getServerDate', param, getCompletionCallback);
  function  getCompletionCallback(status,  data,  error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status,  data,  error, presentationSuccessCallback, presentationErrorCallback);
      if (obj["status"] === true) {
          presentationSuccessCallback(obj["data"]);
      } else {
          presentationErrorCallback(obj["errmsg"]);
      }
  }
},
getAccountVPADetails:function(param, presentationSuccessCallback, presentationErrorCallback) {
  var self = this;
  var infoTerms  =  kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("DigitalArrangements");
  infoTerms.customVerb('getAccountVPADetails', param, getCompletionCallback);
  function  getCompletionCallback(status,  data,  error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status,  data,  error, presentationSuccessCallback, presentationErrorCallback);
      if (obj["status"] === true) {
          presentationSuccessCallback(obj["data"]);
      } else {
          presentationErrorCallback(obj["errmsg"]);
      }
  }
},
getFixedDepositTenureIntrestdetails: function(param, presentationSuccessCallback, presentationErrorCallback) {
  var self = this;
  var infoTerms  =  kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("FixedDeposit");
  infoTerms.customVerb('getFDTenureAndIntrests', param, getCompletionCallback);
  function  getCompletionCallback(status,  data,  error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status,  data,  error, presentationSuccessCallback, presentationErrorCallback);
      if (obj["status"] === true) {
          presentationSuccessCallback(obj["data"]);
      } else {
          presentationErrorCallback(obj["errmsg"]);
      }
  }
},
getValidationEsewaIds : function (param, presentationSuccessCallback, presentationErrorCallback) {
  var self = this;
  var infoTerms  =  kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Transaction");
  infoTerms.customVerb('validateEsewaId', param, getCompletionCallback);
  function  getCompletionCallback(status,  data,  error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status,  data,  error, presentationSuccessCallback, presentationErrorCallback);
      if (obj["status"] === true) {
          presentationSuccessCallback(obj["data"]);
      } else {
          presentationErrorCallback(obj["errmsg"]);
      }
  }
},
getEsewaFeesValues : function (param, presentationSuccessCallback, presentationErrorCallback) {
  var self = this;
  var infoTerms  =  kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Transaction");
  infoTerms.customVerb('GeteSewaFeeConfiguration', param, getCompletionCallback);
  function  getCompletionCallback(status,  data,  error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status,  data,  error, presentationSuccessCallback, presentationErrorCallback);
      if (obj["status"] === true) {
          presentationSuccessCallback(obj["data"]);
      } else {
          presentationErrorCallback(obj["errmsg"]);
      }
  }
},
eSewaIntraBankTransfers : function(params, presentationSuccessCallback, presentationErrorCallback) {
			var transacObj = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Transaction");
			//var transObj = this.convertDateFormat(tranObj);
			transacObj.customVerb("IntraBankAccFundTxreSewaTopup", params, saveCompletionCallback);

			function saveCompletionCallback(status, data, error) {
				var srh = applicationManager.getServiceResponseHandler();
				var obj = srh.manageResponse(status, data, error);
				if (obj["status"] === true) {
					presentationSuccessCallback(obj["data"]);
				} else {
					presentationErrorCallback(obj["errmsg"]);
				}
			}
		},
    eSewaAmountLoad : function(params, presentationSuccessCallback, presentationErrorCallback) {
			var transacObj = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Transaction");
			//var transObj = this.convertDateFormat(tranObj);
			transacObj.customVerb("eSewaAmountLoad", params, saveCompletionCallback);

			function saveCompletionCallback(status, data, error) {
				var srh = applicationManager.getServiceResponseHandler();
				var obj = srh.manageResponse(status, data, error);
				if (obj["status"] === true) {
					presentationSuccessCallback(obj["data"]);
				} else {
					presentationErrorCallback(obj["errmsg"]);
				}
			}
		},
    geteSewaActivities: function(params, presentationSuccessCallback, presentationErrorCallback) {
			var transacObj = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Transaction");
			//var transObj = this.convertDateFormat(tranObj);
			transacObj.customVerb("GeteSewaActivities", params, saveCompletionCallback);

			function saveCompletionCallback(status, data, error) {
				var srh = applicationManager.getServiceResponseHandler();
				var obj = srh.manageResponse(status, data, error);
				if (obj["status"] === true) {
					presentationSuccessCallback(obj["data"]);
				} else {
					presentationErrorCallback(obj["errmsg"]);
				}
			}
		},
    generateeSewaPdf: function(params, presentationSuccessCallback, presentationErrorCallback) {
			var transacObj = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Transaction");
			//var transObj = this.convertDateFormat(tranObj);
			transacObj.customVerb("generateeSewaPdf", params, saveCompletionCallback);

			function saveCompletionCallback(status, data, error) {
				var srh = applicationManager.getServiceResponseHandler();
				var obj = srh.manageResponse(status, data, error);
				if (obj["status"] === true) {
					presentationSuccessCallback(obj["data"]);
				} else {
					presentationErrorCallback(obj["errmsg"]);
				}
			}
		},
};
});