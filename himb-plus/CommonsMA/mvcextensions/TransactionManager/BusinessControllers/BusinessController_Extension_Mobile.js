define([], function(){
  return{
    createQRPayment: function (params, presentationSuccess, presentationError) {
      var qrRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("qrPayment");
      qrRepo.customVerb("qrPaymentService", params, getAllCompletionCallback);
      function getAllCompletionCallback(status, data, error) {
        var srh = applicationManager.getServiceResponseHandler();
        var obj = srh.manageResponse(status, data, error);
        if (obj.status === true) {
          presentationSuccess(obj.data);
        } else {
          presentationError(obj.errmsg);
        }
      }
    },
	getQRTransactionHistory:function(params, presentationSuccess, presentationError){
		 var qrRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("QRPay");
      qrRepo.customVerb("getQRPaymentsTransactionHistory", params, getAllCompletionCallback);
      function getAllCompletionCallback(status, data, error) {
        var srh = applicationManager.getServiceResponseHandler();
        var obj = srh.manageResponse(status, data, error);
        if (obj.status === true) {
          presentationSuccess(obj.data);
        } else {
          presentationError(obj.errmsg);
        }
      }
    },
	invokeValidateQR:function(params, presentationSuccess, presentationError){
		 var qrRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("qrValidation");
      qrRepo.customVerb("validateQR", params, getAllCompletionCallback);
      function getAllCompletionCallback(status, data, error) {
        var srh = applicationManager.getServiceResponseHandler();
        var obj = srh.manageResponse(status, data, error);
        if (obj.status === true) {
          presentationSuccess(obj.data);
        } else {
          presentationError(obj.errmsg);
        }
      }
    },

      /**
    * create a new credit card Transfer using service call.
    * @param {function} presentationSuccessCallback , invoke the call back with success response.
    * @param {function} presentationErrorCallback , invoke the call back with error response.
    */
  createIntraBankAccFundTransferCards : function (transferData, presentationSuccessCallback, presentationErrorCallback) {
    var createTransactionRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Transaction");
    createTransactionRepo.customVerb("IntraBankAccFundTransferCards", transferData, getAllCompletionCallback);
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
   getactiveDebitCardDetails : function (presentationSuccessCallback, presentationErrorCallback) {
    var createTransactionRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("ListOfCards");
    createTransactionRepo.customVerb("getCustomerDebitCards", {}, getAllCompletionCallback);
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
	
  };
});