define([], function () { 
    
    /**
     * User defined business controller
     * @constructor
     * @extends kony.mvc.Business.Delegator
     */
    function WealthOrderManager() { 

        kony.mvc.Business.Delegator.call(this); 

    } 

    inheritsFrom(WealthOrderManager, kony.mvc.Business.Delegator); 
    WealthOrderManager.prototype.getAssets = function (params,presentationSuccessCallback, presentationErrorCallback) {
    var instrumentList = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("PortfolioDetails");
   instrumentList.customVerb("getPortfolioDetails", params, getAllCompletionCallback);
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
  
  };
  
    WealthOrderManager.prototype.getOrdersDetails = function (params,presentationSuccessCallback, presentationErrorCallback) {
     var order = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("PortfolioDetails");
    order.customVerb("getOrdersDetails", params, getAllCompletionCallback);
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
  };
  
    WealthOrderManager.prototype.getUserFavouriteInstruments = function (params,presentationSuccessCallback, presentationErrorCallback) {
    var favouriteList = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("Watchlist");
    favouriteList.customVerb("getWatchlistDB", params, getAllCompletionCallback);
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
  };
  
  WealthOrderManager.prototype.updateUserFavouriteInstruments = function (params,presentationSuccessCallback, presentationErrorCallback) {
    var favouriteList = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("Watchlist");
    favouriteList.customVerb("updateWatchlistDB", params, getAllCompletionCallback);
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
  };
  
  WealthOrderManager.prototype.getCurrencyList = function (presentationSuccessCallback, presentationErrorCallback) {
     var holdingsList = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("CurrencyDetails");
    holdingsList.customVerb("getCurrencyList",{}, getAllCompletionCallback);
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
  };
  
     WealthOrderManager.prototype.getPlaceOrderDetails = function (params,presentationSuccessCallback, presentationErrorCallback) {
     var holdingsList = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("ProductDetails");
    //holdingsList.customVerb("getInstrumentDetails", params, getAllCompletionCallback);
    holdingsList.customVerb("getProductDetailsFromId", params, getAllCompletionCallback);
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
  };
  
  WealthOrderManager.prototype.getCurrencyRate = function (param, presentationSuccessCallback, presentationErrorCallback) {
    var savingsPotRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("CurrencyDetails"); 
    savingsPotRepo.customVerb("getMarketRates", param, getAllCompletionCallback);
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
  };
  
  WealthOrderManager.prototype.getHistoricalCurrencyRate = function (param, presentationSuccessCallback, presentationErrorCallback) {
    var savingsPotRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("CurrencyDetails"); 
    savingsPotRepo.customVerb("getCurrencyGraph", param, getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
        var srh = applicationManager.getServiceResponseHandler();
        var obj = srh.manageResponse(status, data, error);
        if (obj["status"] === true) {
			obj["data"].historicalData = JSON.parse(obj["data"].historicalData);
           presentationSuccessCallback(obj["data"]);
        }
        else {
          presentationErrorCallback(obj["errmsg"]);
       }
    }
  };
  
  WealthOrderManager.prototype.createOrder = function (param, presentationSuccessCallback, presentationErrorCallback) {
    var savingsPotRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("CurrencyDetails"); 
    savingsPotRepo.customVerb("createCurrencyOrder", param, getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
        var srh = applicationManager.getServiceResponseHandler();
      
        if(data.feeDetails){
          data.feeDetails = JSON.parse(data.feeDetails);
        }
      
        var obj = srh.manageResponse(status, data, error);
        if (obj["status"] === true) {
           presentationSuccessCallback(obj["data"]);
        }
        else {
          presentationErrorCallback(obj["errmsg"]);
       }
    }
  };
  
  WealthOrderManager.prototype.getPortfolioDetails = function (params,presentationSuccessCallback, presentationErrorCallback) {
     var instrumentList = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("PortfolioDetails");
    instrumentList.customVerb("getPortfolioDetails", params, getAllCompletionCallback);
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
 };
  
    WealthOrderManager.prototype.clearWealthObject = function () {
    var modelDefinition = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("Order");
    this.wealthData = new modelDefinition();
  };
    
  WealthOrderManager.prototype.getAssets = function (params,presentationSuccessCallback, presentationErrorCallback) {
    var instrumentList = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("PortfolioDetails");
   instrumentList.customVerb("getPortfolioDetails", params, getAllCompletionCallback);
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
  
  };
  
   WealthOrderManager.prototype.downloadList = function (params,presentationSuccessCallback, presentationErrorCallback) {
     var DownloadList = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("DownloadPDF");
    DownloadList.customVerb("generatePDF", params, getAllCompletionCallback);
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
  };
  WealthOrderManager.prototype.watchdownloadList = function (params,presentationSuccessCallback, presentationErrorCallback) {
var DownloadList = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("DownloadOrderPDF");
DownloadList.customVerb("generatePDF", params, getAllCompletionCallback);
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
};
   WealthOrderManager.prototype.setWealthAttribute = function (key, value) {
    this.wealthData[key] = value;
  };
  
  WealthOrderManager.prototype.getHoldingList = function (params,presentationSuccessCallback, presentationErrorCallback) {
     var holdingsList = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("PortfolioDetails");
    holdingsList.customVerb("getPortfolioHoldings", params, getAllCompletionCallback);
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
  };
  
   
   WealthOrderManager.prototype.getWealthObject = function () {
    return this.wealthData;
  };
  
    WealthOrderManager.prototype.getInstrumentDetailsById = function (params,presentationSuccessCallback, presentationErrorCallback) {
     var holdingsList = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("ProductDetails");
    holdingsList.customVerb("getProductDetailsFromId", params, getAllCompletionCallback);
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
  };
  
  WealthOrderManager.prototype.createMarketOrder = function (param, presentationSuccessCallback, presentationErrorCallback) {
    var marketOrder = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("Order"); 
    // #RemovedCustomerID - Removed customer ID as its taken care at the server level
    delete param["customerId"];
    marketOrder.customVerb("createSecurityOrder", param, getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
        var srh = applicationManager.getServiceResponseHandler();
        var obj = srh.manageResponse(status, data, error);
        if (obj["status"] === true) {
          if(obj["data"].feeDetails){
            obj["data"].feeDetails = JSON.parse(obj["data"].feeDetails);
          }
           presentationSuccessCallback(obj["data"]);
        }
        else {
          presentationErrorCallback(obj["errmsg"]);
       }
    }
  };

  WealthOrderManager.prototype.modifyMarketOrder = function (param, presentationSuccessCallback, presentationErrorCallback) {
    var marketOrder = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("Order");
    // #RemovedCustomerID - Removed customer ID as its taken care at the server level
    delete param["customerId"];
    marketOrder.customVerb("modifySecurityOrder", param, getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
        var srh = applicationManager.getServiceResponseHandler();
        var obj = srh.manageResponse(status, data, error);
        if (obj["status"] === true) {
          if(obj["data"].feeDetails){
            obj["data"].feeDetails = JSON.parse(obj["data"].feeDetails);
          }
           presentationSuccessCallback(obj["data"]);
        }
        else {
          presentationErrorCallback(obj["errmsg"]);
       }
    }
  };
  
  WealthOrderManager.prototype.cancelOrder = function (params,presentationSuccessCallback, presentationErrorCallback) {
     var order = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("Order");
    order.customVerb("cancelSecurityOrder", params, getAllCompletionCallback);
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
  };
  
  WealthOrderManager.prototype.getFavoriteInstruments = function (params,presentationSuccessCallback, presentationErrorCallback) {
    var favouriteList = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("FavouriteInstruments");
    favouriteList.customVerb("getFavoriteInstruments", params, getAllCompletionCallback);
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
  };
  WealthOrderManager.prototype.getInstrumentTransactions = function (params,presentationSuccessCallback, presentationErrorCallback) {
    var favouriteList = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("InstrumentDetails");
    favouriteList.customVerb("getInstrumentTransactions", params, getAllCompletionCallback);
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
  };
  
  return WealthOrderManager;

});