define(['CommonUtilities'], function (CommonUtilities) {

	return {
		init: function () {
			var navManager = applicationManager.getNavigationManager();
			var currentForm = navManager.getCurrentForm();
			applicationManager.getPresentationFormUtility().initCommonActions(this, "YES", currentForm);
			this.view.postShow = this.postShow;
			
		},
		
		postShow: function () {
			this.populateContactUsData();
			this.setFlowActions();
            this.getDetails();
            applicationManager.getPresentationUtility().dismissLoadingScreen();
		},

        getDetails: function () {
            var navManager = applicationManager.getNavigationManager();
            var contactUsDetails = navManager.getCustomInfo("contactUsDetails");
            if(!kony.sdk.isNullOrUndefined(contactUsDetails)) {
            this.showContactUs(contactUsDetails);
            }
        },
		setFlowActions: function () {
			let scopeObj = this;
			scopeObj.view.btnCallBranch.onClick = function () {
				scopeObj.showDial();
			}.bind(this);

		},
			  
		populateContactUsData : function(){
			var config = applicationManager.getConfigurationManager();
            let Address= config.getCorporateOffice();
            if(!kony.sdk.isNullOrUndefined(Address)) {
            Address=Address.replaceAll(",", '<br>');
            }
			this.view.rtxCorporateOfficeAddress.text= Address;
            if(config.getCustomerSupport2Email()!=("" && null && undefined)){
                var a='<br>'+config.getCustomerSupport2Email();
            }
            else{
                var a="";
            }
            if(config.getCustomerSupport3Email()!=("" && null && undefined)){
                var b='<br>'+config.getCustomerSupport3Email();
            }
            else{
                var b="";
            }
            if(config.getCustomerSupport1Email()!=("" && null && undefined)){
            this.view.rtxEmailId.text = config.getCustomerSupport1Email()+a+b;
            }
            if(config.getCustomerSupport2phone()!=("" && null && undefined)){
                var x='<br>'+config.getCustomerSupport2phone();
            }
            else{
                var x="";
            }
            if(config.getCustomerSupport3phone()!=("" && null && undefined)){
                var y='<br>'+config.getCustomerSupport3phone();
            }
            else{
                var y="";
            }
            if(config.getCustomerSupport1phone()!=("" && null && undefined)){
            this.view.rtxPhone1.text=config.getCustomerSupport1phone()+x+y;
            }
		},
		showDial: function () {
			var config = applicationManager.getConfigurationManager();
			var phoneNumber = config.getCustomerSupportMbCallUs();
            if(!kony.sdk.isNullOrUndefined(phoneNumber)) {
			kony.phone.dial(phoneNumber);
            }
		},

        showContactUs: function (data) {
            var tempArray = data.records;
            var newTempArray = [];
            for (var i in tempArray) {
                var email = [];
                var phone = [];
                var heading = tempArray[i].serviceTitle;
                for (var j in tempArray[i].Email) {
                    email.push(tempArray[i].Email[j].value);
                }
                for (j in tempArray[i].Phone) {
                    phone.push(tempArray[i].Phone[j].value);
                }
                newTempArray.push({
                    Email: email,
                    Phone: phone,
                    heading: heading,
                });
            }
            this.setContactUsData(newTempArray);
        },
        setContactUsData: function (tempArray) {
            let widgetMap = {
                "imgDot": "imgDot",
                "lblEmailId": "lblEmailId",
                "lblHeading": "lblHeading",
                "rtxEmailId": "rtxEmailId",
                "rtxPhoneNumber": "rtxPhoneNumber",
	};
            var emailAddress = kony.i18n.getLocalizedString("Kony.mb.enroll.accountemail");
            var segData = [];
            for (var data in tempArray) {
                var i,
                    tempPhone = "",
                    tempEmail = "";
                if (tempArray[data].Email.length > 0) {
                    for (i in tempArray[data].Email) {
                        tempEmail = tempEmail + tempArray[data].Email[i] + "<br>";
                    }
                } else {
                    tempEmail = tempEmail;
                }
                if (tempArray[data].Phone.length > 0) {
                    for (i in tempArray[data].Phone) {
                      // tempPhone = tempPhone + "Phone: " + tempArray[data].Phone[i] + "<br>";
                      tempPhone = tempPhone + tempArray[data].Phone[i] + "<br>";
                    }
                } else {
                    tempPhone = tempPhone;
                }
                segData.push({
                    imgDot: "pageoffdot.png",
                    lblEmailId: emailAddress,
                    lblHeading: tempArray[data].heading,
                    rtxEmailId: tempEmail,
                    rtxPhoneNumber: tempPhone
                });
            }
            this.view.segCustomerService.widgetDataMap = widgetMap;
            this.view.segCustomerService.setData(segData);
        },
    };
});