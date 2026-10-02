define(["CommonUtilities", "SCAUtility"], function(CommonUtilities, SCAUtility) {
    return {
        defaultAccId:"",
		 getStopChequeRequestSuccess:function(response){
    var formatUtil = applicationManager.getFormatUtilManager();
    var formattedResponse=[];
    if(Array.isArray(response)){
      for(var i=0;i<response.length;i++){
        var data={};
        if(response[i].requestType=="series" || response[i].requestType=="Series"){
          data.booksCount=response[i].checkNumber1+"-"+response[i].checkNumber2;
        }
        else{
          data.booksCount=response[i].checkNumber1;
        }
        var trandateobj = formatUtil.getDateObjectfromString(response[i]["checkDateOfIssue"], "YYYY-MM-DD");
        var transactionDate = formatUtil.getFormatedDateString(trandateobj, formatUtil.getApplicationDateFormat());
        data.lblDate=
        {
          "text":transactionDate,
        "skin":"sknlbl42424240px"}
        data.lblAccountNo=response[i].transactionId;
        if (response[i].statusDescription === null || response[i].statusDescription === undefined) {
        data.lblStatus= kony.i18n.getLocalizedString("kony.mb.cardManage.Active");
        }else{
        data.lblStatus=response[i].statusDescription;
        }
        data.image={"isVisible":true};
        if(isNaN(response[i].amount))
          data.amount=response[i].amount
        else
        data.amount=formatUtil.formatAmountandAppendCurrencySymbol(response[i].amount,scope_ChequePresentationController.currencyCode);
        data.payeeName=response[i].payeeName;
        data.transactionType=response[i].transactionType;
        data.checkReason=response[i].checkReason;
        if(response[i]["checkDateOfIssue"]==null){
        var trandateofissue = formatUtil.getDateObjectfromString(response[i]["checkDateOfIssue"], "YYYY-MM-DD");
        var checkDateOfIssue = formatUtil.getFormatedDateString(trandateofissue, formatUtil.getApplicationDateFormat());
        data.checkDateOfIssue=checkDateOfIssue;
        }
        else {
          var date= response[i]["checkDateOfIssue"];
          var newDate=date.slice(0,4)+ "-" + date.slice(4,6)+ "-" +date.slice(6,8);
          var trandateofissue = formatUtil.getDateObjectfromString(newDate, "YYYY-MM-DD");
          var checkDateOfIssue = formatUtil.getFormatedDateString(trandateofissue, formatUtil.getApplicationDateFormat());
          data.checkDateOfIssue=checkDateOfIssue;
        }
        var trandateobj1 = formatUtil.getDateObjectfromString(response[i]["requestValidity"], "YYYY-MM-DD");
        var requestValidity = formatUtil.getFormatedDateString(trandateobj1, formatUtil.getApplicationDateFormat());
        data.requestValidity=requestValidity;
        data.requestType=response[i].requestType;
        data.fee=formatUtil.formatAmountandAppendCurrencySymbol(response[i].fees,scope_ChequePresentationController.currencyCode);
        data.notes=response[i].transactionsNotes;
        data.accountType=response[i].accountType;
        formattedResponse.push(data);
      }
    }
    var controller = applicationManager.getPresentationUtility().getController('frmChequeManagement', true);
    controller.bindTransactions(formattedResponse);
  },
  fetchTransactionForAccount:function(){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var transObj=this.getTransObject();
    var transMan = applicationManager.getTransactionsListManager();
	var params={
		"accountID":transObj.fromAccountNumber,
		"limit":"10","offset":0,
		"sortBy":"transactionDate",
		"order":"desc",
		"paginationRowLimit":10,
		"transactionType":"StopCheckPaymentRequest",
	};
    transMan.getAccountTransactions(params,scope_ChequePresentationController.getTransactionsSuccess,scope_ChequePresentationController.getTransactionsError);
  },
  getTransactionsSuccess:function(response){
    var formattedResponse = [];
        response = response.ChequeBookRequests;
        if (Array.isArray(response)) {
            for (var i = 0; i < response.length; i++) {
                var data = {};
             var chequeBooks = "";
                if (response[i].numberOfChequeBooks === null || response[i].numberOfChequeBooks === undefined ||isNaN(response[i].numberOfChequeBooks) ||response[i].numberOfChequeBooks == "-") {
                    chequeBooks = "1"+ " " + kony.i18n.getLocalizedString("kony.mb.CM.book(s)");
                } else {
                  chequeBooks = "1" + " " + kony.i18n.getLocalizedString("kony.mb.CM.book(s)")
                }
                    var leaves = response[i].numberOfLeaves !== undefined ? response[i].numberOfLeaves : "";
              if(isNaN(leaves)==false)
                chequeBooks = chequeBooks + " " + "(" + leaves + " " + kony.i18n.getLocalizedString("kony.mb.CM.Leaves") + ")";
              data.bookCount = chequeBooks;
              data.booksCount = {
                    "text" : chequeBooks,
                    "skin" : "sknLbl424242SSP32pxTab"
                };
                if (response[i].requestDate === null || response[i].requestDate === undefined) {
                    data.lblDate = " ";
                } else {
                    var date = response[i].requestDate;
                var str = date.toString();
                var year = str.substring(0,4);
                var month = str.substring(4,6);
                var day= str.substring(6,8);       
               data.lblDate =
                  {
                    "text": month + "/" + day + "/" + year,
                    "skin": "sknLbl424242SSP32pxTab"
                  }
                data.notes = response[i].note;
				}
            if(response[i].chequeStatus){
            data.lblStatus=response[i].chequeStatus;
            if(response[i].chequeStatus === "REQUEST RECIEVED"){
                data.lblStatus="Requested";
            }
            if(response[i].chequeStatus === "ISSUED"){
                data.lblStatus="Issued";
            }
        }
        data.image={"src":"","isVisible":false};
        data.description=response[i].description;
        data.chequeIssueId=response[i].chequeIssueId;
        data.chequeNumberStart=response[i].chequeNumberStart;
        data.accountID=response[i].accountID;
        data.fees=response[i].fees;
        data.deliveryType=response[i].deliveryType;
        data.address=response[i].address;
        if(response[i].notes){
        if(response[i].notes.length>0)
          data.notes=response[i].notes[0].note;}
        formattedResponse.push(data);
        }
    }
    var controller = applicationManager.getPresentationUtility().getController('frmChequeManagement', true);
    controller.bindTransactions(formattedResponse);
  },
  btnNewRequestOnClick : function(){
	  applicationManager.getPresentationUtility().showLoadingScreen();
    var transMan = applicationManager.getTransactionsListManager();
    var criteria={"category" : scope_ChequePresentationController.selectedAccountCategory};
    transMan.fetchChequeIDAndLeavesCount(criteria,scope_ChequePresentationController.fetchChequeIDAndLeavesCountSuccess,scope_ChequePresentationController.fetchChequeIDAndLeavesCountError);
  },
   fetchChequeIDAndLeavesCountSuccess:function(response){
    var chequeTypes=response.ChequeTypes;
    if(Array.isArray(chequeTypes)&&chequeTypes[0]){
		if(chequeTypes[0].chequeId&&chequeTypes[0].defaultIssueNumber){
      scope_ChequePresentationController.chequeId=chequeTypes[0].chequeId;
      scope_ChequePresentationController.leavesCount=chequeTypes[0].defaultIssueNumber;
      var transObj=scope_ChequePresentationController.getTransObject();
	  var chequeDeliveryType=applicationManager.getNavigationManager().getCustomInfo("DeliveryType");
	  if(!chequeDeliveryType){
		  applicationManager.getNavigationManager().setCustomInfo("DeliveryType","MailingAddress");
		  chequeDeliveryType=applicationManager.getNavigationManager().getCustomInfo("DeliveryType");
	  }
      var criteria={"chequeIssueId":scope_ChequePresentationController.chequeId+"."+transObj.fromAccountNumber,
	  "validate":"true",
	  "note":"",
	  "accountID":transObj.fromAccountNumber,
	  "deliveryType":chequeDeliveryType?chequeDeliveryType:"MailingAddress",
	  "numberOfLeaves":applicationManager.getConfigurationManager().NO_OF_CHEQUE_LEAVES
	  };
      var transMan = applicationManager.getTransactionsListManager();
      transMan.createChequeBookRequests(criteria,scope_ChequePresentationController.validateAndFetchFeeDetailsSuccess,scope_ChequePresentationController.validateAndFetchFeeDetailsError);
		}
		else{
			applicationManager.getPresentationUtility().dismissLoadingScreen();
		}
    }
    else{
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
	},
	 createChequeBookSuccess : function(response){
		  var transMan = applicationManager.getTransactionsListManager();
    if (1==CommonUtilities.getSCAType() && response.MFAAttributes && response.MFAAttributes.isMFARequired) {
            var controller = applicationManager.getPresentationUtility().getController('frmCMReview', true);
            console.log(controller);
            controller.showSCANotification(response);
        } else {
    scope_ChequePresentationController.uniqueChequeIssueIdResponse = response.chequeIssueId || response.orderId;
	var navMan=applicationManager.getNavigationManager();
    navMan.setCustomInfo("frmCMConfirmation",response);
    scope_ChequePresentationController.commonFunctionForNavigation("frmCMConfirmation");
  }
  },
    validateAndFetchFeeDetailsError:function(err){
    if (err["isServerUnreachable"]) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
    }
    else {
      if(kony.application.getCurrentForm().id=== "frmAccountDetails"){
      var controller = applicationManager.getPresentationUtility().getController('frmAccountDetails', true);
      controller.showErrorPopup(err.errorMessage);
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      } else if(err.serverErrorRes.errcode=="26020") {
      var controller = applicationManager.getPresentationUtility().getController('frmChequeManagement', true);
      controller.bindError(kony.i18n.getLocalizedString("i18n.mb.cheque.duplicateReq"));
      }
	  else {
      var controller = applicationManager.getPresentationUtility().getController('frmChequeManagement', true);
      controller.bindError(err.errorMessage);
      }
    }
  },
   createChequeBookRequest : function(desc) {
        if (1==CommonUtilities.getSCAType() && desc.serviceKey) {
            let criteria = {
                "MFAAttributes": {
                    "serviceName": desc.serviceName,
                    "serviceKey": desc.serviceKey,
                }
            };
            var transMan = applicationManager.getTransactionManager();
			var chequeleavesCount=applicationManager.getConfigurationManager().NO_OF_CHEQUE_LEAVES;
			var chequeDeliveryType=applicationManager.getNavigationManager().getCustomInfo("DeliveryType");
            transMan.createChequeBookRequests(criteria, scope_ChequePresentationController.createChequeBookSuccess, scope_ChequePresentationController.createChequeBookError);
        } else {
			var chequeDeliveryType=applicationManager.getNavigationManager().getCustomInfo("DeliveryType");
	  if(!chequeDeliveryType){
		  applicationManager.getNavigationManager().setCustomInfo("DeliveryType","MailingAddress");
		  chequeDeliveryType=applicationManager.getNavigationManager().getCustomInfo("DeliveryType");
	  }
        var transMan = applicationManager.getTransactionsListManager();
        var chequeBookTransMan = scope_ChequePresentationController.getTransObject();
        transMan.setTransactionAttribute("transactionsNotes", desc);
        var criteria = {
            "chequeIssueId": scope_ChequePresentationController.uniqueChequeIssueIdResponse,
            "note": desc,
            "validate": "",
            "accountID": chequeBookTransMan.fromAccountNumber,
            "fees": "NPR 0.00",
            "numberOfLeaves": chequeleavesCount,
            "numberOfChequeBooks":"1",
            "deliveryType": chequeDeliveryType
        };
        transMan.createChequeBookRequests(criteria, scope_ChequePresentationController.createChequeBookSuccess, scope_ChequePresentationController.createChequeBookError);
        }
    },
	 getTransactionsSuccess:function(response){
    var formattedResponse = [];
        response = response.ChequeBookRequests;
        if (Array.isArray(response)) {
            for (var i = 0; i < response.length; i++) {
                var data = {};
             var chequeBooks = "";
                if (response[i].numberOfChequeBooks === null || response[i].numberOfChequeBooks === undefined ||isNaN(response[i].numberOfChequeBooks)) {
                    chequeBooks ="1" + " " + kony.i18n.getLocalizedString("kony.mb.CM.book(s)");
                } else {
                  chequeBooks = "1" + " " + kony.i18n.getLocalizedString("kony.mb.CM.book(s)")
                }
                    var leaves = applicationManager.getConfigurationManager().NO_OF_CHEQUE_LEAVES;;
              if(isNaN(leaves)==false)
                chequeBooks = chequeBooks + " " + "(" + leaves + " " + kony.i18n.getLocalizedString("kony.mb.CM.Leaves") + ")";
              data.bookCount = chequeBooks;
              data.booksCount = {
                    "text" : chequeBooks,
                    "skin" : "sknLbl424242SSP32pxTab"
                };
                if (response[i].requestDate === null || response[i].requestDate === undefined) {
                    data.lblDate = " ";
                } else {
                    var date = response[i].requestDate;
                var str = date.toString();
                var year = str.substring(0,4);
                var month = str.substring(4,6);
                var day= str.substring(6,8);       
               data.lblDate =
                  {
                    "text": month + "/" + day + "/" + year,
                    "skin": "sknLbl424242SSP32pxTab"
                  }
                data.notes = response[i].note;
				}
            if(response[i].chequeStatus){
            data.lblStatus=response[i].chequeStatus;
            if(response[i].chequeStatus === "REQUEST RECIEVED"){
                data.lblStatus="Requested";
            }
            if(response[i].chequeStatus === "ISSUED"){
                data.lblStatus="Issued";
            }
        }
        data.image={"src":"","isVisible":false};
        data.description=response[i].description;
        data.chequeIssueId=response[i].chequeIssueId;
        data.chequeNumberStart=response[i].chequeNumberStart;
        data.accountID=response[i].accountID;
        data.fees=response[i].fees;
        data.deliveryType=response[i].deliveryType;
        data.address=response[i].address;
        if(response[i].notes){
        if(response[i].notes.length>0)
          data.notes=response[i].notes[0].note;}
        formattedResponse.push(data);
        }
		this.getUserAddress();
    }
    var controller = applicationManager.getPresentationUtility().getController('frmChequeManagement', true);
    controller.bindTransactions(formattedResponse);
  },
    navigateToChequeLandingScreen :function(selectedAccount) {
    applicationManager.getPresentationUtility().showLoadingScreen();
    let navManager = applicationManager.getNavigationManager();	
    var custominfoInt = navManager.getCustomInfo("frmDashboard");
    var custominfoCD = navManager.getCustomInfo("frmCustomerDashboard");
    var chequeAccounts = [];
	this.getChequeDefaultAccount();
    if(custominfoCD && (custominfoCD.reDesignFlow === "true")){
      if(custominfoInt && custominfoInt.isGetListCalled===true && custominfoCD.isAccActionsCalled === true){
        chequeAccounts = this.getAccounts();
      }else{
        var presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "AuthUIModule", "appName": "AuthenticationMA" });
        presenter.presentationController.showDataLoaderPopup();
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        return;
      }
    }else{
      chequeAccounts = this.getAccounts();
    }
    let accountIndex = 0;
    for(currentIndex in chequeAccounts){
      let currentIndexAccount = chequeAccounts[currentIndex];
      if(currentIndexAccount && currentIndexAccount.account_id && currentIndexAccount.account_id === scope_ChequePresentationController.defaultAccId) {
        accountIndex = currentIndex;
        break;
      }
    } 
    var accountId = selectedAccount ? selectedAccount.accountID : chequeAccounts[accountIndex].accountID;
    var accountName = selectedAccount ? selectedAccount.accountName : chequeAccounts[accountIndex].accountName;
    var nickName = selectedAccount ? selectedAccount.nickName : chequeAccounts[accountIndex].nickName;
    var categoryId = selectedAccount ? selectedAccount.categoryId : chequeAccounts[accountIndex].categoryId;
    var currencyCode = selectedAccount ? selectedAccount.currencyCode : chequeAccounts[accountIndex].currencyCode;
    var name = (nickName === null || nickName === undefined) ? accountName : nickName;
    var showView = selectedAccount ? selectedAccount.showView : "";
    scope_ChequePresentationController.processedName = applicationManager.getPresentationUtility().formatText(name, 15, accountId, 4);
    scope_ChequePresentationController.accountId = accountId;
    var trasMan = applicationManager.getTransactionsListManager();
    trasMan.setTransactionAttribute("fromAccountNumber", accountId);
    trasMan.setTransactionAttribute("fromAccountName", name);
    scope_ChequePresentationController.selectedAccountCategory = categoryId;
    scope_ChequePresentationController.currencyCode = currencyCode;
    navManager.navigateTo({"appName":"ArrangementsMA", "friendlyName":"frmChequeManagement"});
  },
  getChequeDefaultAccount:function(){
	  var scope=this;
	  var defaultAccountData=applicationManager.getUserPreferencesManager().getDefaultAccountforChequeManagement();
  if(defaultAccountData){
	  scope.defaultAccId=defaultAccountData;
  }
  },
  fetchChequeIDAndLeavesCountSuccess:function(response){
	  try{
    var chequeTypes=response.ChequeTypes;
    if(Array.isArray(chequeTypes)&&chequeTypes[0]){
      scope_ChequePresentationController.chequeId=chequeTypes[0].chequeId;
      scope_ChequePresentationController.leavesCount=chequeTypes[0].defaultIssueNumber;
      var transObj=scope_ChequePresentationController.getTransObject();
	  var chequeDeliveryType=applicationManager.getNavigationManager().getCustomInfo("DeliveryType");
      var criteria={"chequeIssueId":scope_ChequePresentationController.chequeId+"."+transObj.fromAccountNumber,
	  "validate":"true",
	  "note":"",
	  "accountID":transObj.fromAccountNumber,
	  "deliveryType":chequeDeliveryType?chequeDeliveryType:"MailingAddress",
	  "numberOfLeaves":applicationManager.getConfigurationManager().NO_OF_CHEQUE_LEAVES
	  };
      var transMan = applicationManager.getTransactionsListManager();
      transMan.createChequeBookRequests(criteria,scope_ChequePresentationController.validateAndFetchFeeDetailsSuccess,scope_ChequePresentationController.validateAndFetchFeeDetailsError);
    }
    else{
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
	  }
	  catch(e){
		  kony.print("Error infetchChequeIDAndLeavesCountSuccess :::"+e);
	  }
  },
}
});