define(['CommonUtilities'], function(CommonUtilities){
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
	return{
	uploadMedia : function(fileObject,requestId,successCallback,failureCallBack,index) {
    var scopeObj = this;
    applicationManager.getPresentationUtility().showLoadingScreen();
    var messagesManager = applicationManager.getMessagesManager();
	  var status="SID_DRAFT";
    var subject="Draft Subject"
    if(requestId != null && requestId !=undefined && requestId.trim() !=""){
      status="SID_OPEN";
      subject="";
    }
    function individualCallback(response) {
      if(scopeObj.mediaIdArray==null || scopeObj.mediaIdArray== undefined){
        scopeObj.mediaIdArray=[];
      }
      scopeObj.mediaIdArray.push(response.data.id);
      successCallback(response.data.id);
    };
    var requestMessageInputs = {
      "requestid":requestId,
      "requestsubject":subject,
      "messagedescription": "Draft Description",
      "requestcategory_id": "RCID_CREDITCARD",
      "requeststatus": status,
      "messagestatus":"DRAFT",
      "isNativeApplication":true
    }

    function onCreateNewRequestSuccess(fileObject,response) {
      var userName = applicationManager.getUserPreferencesManager().getUserObj().userName;
      userName = userName.slice(0,2) + "****" + userName.slice(-2);
      var messageId = "";
      var requestId="";
      if(response.hasOwnProperty("rawResponse")){
        messageId = response.rawResponse[userName].requestMessage.messageId;
        requestId = response.rawResponse[userName].customerRequest.requestId;
      }else{
        messageId = response[userName].requestMessage.messageId;
        requestId = response[userName].customerRequest.requestId;
      }
      scopeObj.messageId = messageId;
      scopeObj.requestId = requestId;
      var messagesManager = applicationManager.getMessagesManager();
      messagesManager.createMedia(fileObject, scopeObj.messageId, individualCallback.bind(this), scope_MessagesPresentationController.createNewMessagePresentationError.bind(scopeObj),failureCallBack,index);
    }

    function onCreateNewRequestFailure(response) {
      kony.print("Error while creating Drafted message");
    }
    if (scopeObj.messageId != null && scopeObj.messageId != undefined && scopeObj.messageId.trim() != "") {
      messagesManager.createMedia(fileObject, scopeObj.messageId, individualCallback.bind(this),  scope_MessagesPresentationController.createNewMessagePresentationError.bind(scopeObj),failureCallBack,index);
    } else {
      messagesManager.createNewRequestWithAttachments(requestMessageInputs, onCreateNewRequestSuccess.bind(scopeObj, fileObject), onCreateNewRequestFailure.bind(scopeObj));
    }
  },
  processMessageRequests : function(requestsData){
    var formatUtilManager = applicationManager.getFormatUtilManager();
	if(requestsData){
		for (var i = 0; i < requestsData.length; i++) {
      var unreadRequestsCount = parseInt(requestsData[i].unreadmsgs);
      var dateString = null;
      requestsData[i].requestsubject = {"text": requestsData[i].requestsubject,"skin": scope_MessagesPresentationController.getSkinForInboxRequest(unreadRequestsCount)};
      var dateobj = formatUtilManager.getDateObjectfromString(requestsData[i].recentMsgDate, "YYYY-MM-DD HH-MM-SS");
      var isToday = formatUtilManager.isTodayDate(dateobj);
      dateString = CommonUtilities.getDateAndTime(requestsData[i].recentMsgDate);
      dateString=dateString.slice(11);
      /*if (isToday) {
        dateString = formatUtilManager.getFormatedDateString(dateobj, formatUtilManager.APPLICATION_TIME_FORMAT);
      }
      else {
        dateString = formatUtilManager.getFormatedDateString(dateobj, formatUtilManager.getApplicationDateFormat());
      }*/
      requestsData[i].firstMessage = decodeURI(Base64.decode(requestsData[i].firstMessage));
      requestsData[i].recentMsgDate = dateString;
      requestsData[i].unreadMsgsCount = unreadRequestsCount;
      requestsData[i].isPriorityMessage = requestsData[i].hasOwnProperty("priorityCount") && parseInt(requestsData[i].priorityCount) > 0;
      if(unreadRequestsCount === 0)
        requestsData[i].unreadMsgsPerThread = "";
      else
        requestsData[i].unreadMsgsPerThread = "(" + unreadRequestsCount + ")";
    }
	}
	else{
		return requestsData;
	}
    
    return requestsData;
  },
  }
});