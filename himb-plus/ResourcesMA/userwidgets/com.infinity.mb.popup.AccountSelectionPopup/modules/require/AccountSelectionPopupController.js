define(function() {

	return {
        SegmentData:"",
		constructor: function(baseConfig, layoutConfig, pspConfig) {

		},
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {

		},
		initActions:function(){
			var scope=this;
			scope.view.segFrmAccount.onRowClick=scope.SegRowclick;
			scope.view.segFrmDomesticAccount.onRowClick = scope.SegRowclick;
			scope.view.tbxSearch.onTextChange=scope.invokeSearch;
		},
		initComponent:function(obj){
			try{
				var scope=this;
				this.initActions();
				scope.view.tbxSearch.text="";
				var accounts;
				var segData;
				if(obj){
					accounts=obj.accounts;
					
    scope.view.segFrmAccount.widgetDataMap={
				"lblAccname":"lblAccname",
				"lblBalance":"lblBalance",
				"lblAccNumber":"lblAccNumber",
				"lblAccType":"lblAccType",
				"flxRow":"flxRow"
			};
			scope.view.segFrmDomesticAccount.widgetDataMap={
				"lblAccname":"lblAccname",
				"lblBalance":"lblBalance",
				"lblAccNumber":"lblAccNumber",
				"lblAccType":"lblAccType",
				"imgBankLogo":"imgBankLogo",
				"flxRow":"flxRow"
			};
			switch(obj.flowType){
				case "FT":
							segData=scope.formatSegData(accounts,"FT");
				var imgKey = applicationManager.getNavigationManager().setCustomInfo("frmImgKey");
				if(kony.sdk.isNullOrUndefined(imgKey)){
							this.SegmentData=segData;
							if(accounts.length>3){
								scope.view.flxSegment.top="105dp";
								scope.view.flxSearch.setVisibility(true);
							}
							else{
								scope.view.flxSegment.top="50dp";
								scope.view.flxSearch.setVisibility(false);
							}
						}else{
							this.SegmentData=segData;
						}
							break;
				case "QR": 
							segData=scope.formatSegData(accounts,"QR");
							this.SegmentData=segData;
							if(accounts.length>3){
								scope.view.flxSegment.top="105dp";
								scope.view.flxSearch.setVisibility(true);
							}
							else{
								scope.view.flxSegment.top="50dp";
								scope.view.flxSearch.setVisibility(false);
							}
				break;
				case "CARD_PAYMENT":
							segData=scope.formatSegData(accounts,"CARD_PAYMENT");
							this.SegmentData=segData;
							if(accounts.length>3){
								scope.view.flxSegment.top="105dp";
								scope.view.flxSearch.setVisibility(true);
							}
							else{
								scope.view.flxSegment.top="50dp";
								scope.view.flxSearch.setVisibility(false);
							}
							break;
						case "FD":
							//applicationManager.getDataProcessorUtility().showToastMessageError(scope, "under progress");

							segData = scope.formatSegData(accounts, "FD");
							this.SegmentData = segData;
							if (accounts.length > 3) {
								scope.view.flxSegment.top = "105dp";
								scope.view.flxSearch.setVisibility(true);
							}
							else {
								scope.view.flxSegment.top = "50dp";
								scope.view.flxSearch.setVisibility(false);
							}
							break;
				case "Cards":
					segData = scope.formatSegData(accounts, "Cards");
					this.SegmentData = segData;
					if (accounts.length > 3) {
						scope.view.flxSegment.top = "105dp";
						scope.view.flxSearch.setVisibility(true);
					}
					else {
						scope.view.flxSegment.top = "50dp";
						scope.view.flxSearch.setVisibility(false);
					}
					break;
                    case "FT_From":
							segData=scope.formatSegData(accounts,"FT_From");
							this.SegmentData=segData;
							if(accounts.length>3){
								scope.view.flxSegment.top="105dp";
								scope.view.flxSearch.setVisibility(true);
							}
							else{
								scope.view.flxSegment.setVisibility(true);
								scope.view.flxSegment.top="50dp";
								scope.view.flxSearch.setVisibility(false);
							}
					}
				}
				var bankLogo = applicationManager.getNavigationManager().getCustomInfo("bankLogo");
				if(kony.sdk.isNullOrUndefined(bankLogo)){
			if(segData){
			//scope.view.segFrmAccount.rowTemplate="flxSelectAcc";
			scope.view.segFrmAccount.setData(segData);
			scope.view.segFrmAccount.setVisibility(true);
			scope.view.segFrmDomesticAccount.setVisibility(false);
			scope.view.lblNoaccounts.setVisibility(false);
			scope.view.flxSegment.forceLayout();
			scope.animateFlex(true);
			
			}
		else{
			//applicationManager.getDataProcessorUtility().showToastMessageError(scope, "Something went wrong....with seg data");
			scope.view.segFrmAccount.setVisibility(false);
			scope.view.segFrmDomesticAccount.setVisibility(false);
			scope.view.lblNoaccounts.setVisibility(true);
			scope.animateFlex(true);
		}
	}else{
		if(segData){
		scope.view.segFrmDomesticAccount.setData(segData);
		scope.view.segFrmDomesticAccount.setVisibility(true);
		scope.view.segFrmAccount.setVisibility(false);
		scope.view.lblNoaccounts.setVisibility(false);
		scope.view.flxSegment.forceLayout();
			scope.animateFlex(true);
		}else{
			scope.view.segFrmAccount.setVisibility(false);
			scope.view.segFrmDomesticAccount.setVisibility(false);
			scope.view.lblNoaccounts.setVisibility(true);
			scope.animateFlex(true);
		}

	}
			scope.view.forceLayout();
			kony.application.dismissLoadingScreen();

			}catch(e){
				kony.print("****************Erron in initComponent**************"+e);
				applicationManager.getDataProcessorUtility().showToastMessageError(scope, "Something went wrong....initComponent");
			}
			
			
		},
		formatSegData:function(accounts,flowtype){
			try{
				var scope=this;
				if(flowtype=="FT"){
					if(accounts.length){
				
				var segData=[];
			for(i=0;i<accounts.length;i++){
				var rowdata={};
				rowdata.lblAccType={"isVisible":true,"text":accounts[i].productId};
				rowdata.lblAccNumber=accounts[i].accountID
				rowdata.lblAccname={"isVisible":true,"text":JSON.parse(accounts[i].accountHolder).fullname};
				rowdata.lblBalance={"isVisible":true,"text":applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(accounts[i].availableBalance,accounts[i].currencyCode)};
				rowdata.flxRow={"isVisible":true};
				segData.push(rowdata)
			}
			return segData;
				}
				else{
					applicationManager.getDataProcessorUtility().showToastMessageError(scope, "Something went wrong.... accounts length");
				}
				}else if(flowtype=="QR"){
			if(accounts.length){
				
				var segData=[];
			for(i=0;i<accounts.length;i++){
				var rowdata={};
				rowdata.lblAccType={"isVisible":true,"text":accounts[i].productId};
				rowdata.lblAccNumber=accounts[i].accountID
				rowdata.lblAccname= {"isVisible":true,"text":accounts[i].accountName};
				rowdata.lblBalance={"isVisible":true,"text":applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(accounts[i].fromAccountBalance,accounts[i].fromAccountCurrency)};
				rowdata.flxRow={"isVisible":true};
				segData.push(rowdata)
			}
			return segData;
				}
				else{
					applicationManager.getDataProcessorUtility().showToastMessageError(scope, "Something went wrong.... accounts length");
				}
				} else if (flowtype == "CARD_PAYMENT") {
					if (accounts.length) {

						var segData = [];
						for (i = 0; i < accounts.length; i++) {
							var rowdata = {};
							rowdata.lblAccType = {"isVisible":true,"text":accounts[i].productId};
							rowdata.lblAccNumber=accounts[i].accountID
							rowdata.lblAccname = {"isVisible":true,"text":accounts[i].accountName};//JSON.parse(accounts[i].accountHolder).fullname; 
							rowdata.lblBalance = {"isVisible":true,"text":applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(accounts[i].fromAccountBalance, accounts[i].fromAccountCurrency)};
							rowdata.flxRow = { "isVisible": true };
							segData.push(rowdata)
						}
						return segData;
					}
					else {
						applicationManager.getDataProcessorUtility().showToastMessageError(scope, "Something went wrong.... accounts length");
					}
				} else if (flowtype == "FD") {
					if (accounts.length) {

						var segData = [];
						for (i = 0; i < accounts.length; i++) {
							var rowdata = {};
							rowdata.lblAccType = {"isVisible":true,"text":accounts[i].productId};
							rowdata.lblAccNumber=accounts[i].accountID
							rowdata.lblAccname = {"isVisible":true,"text":accounts[i].accountName};
							rowdata.lblBalance = {"isVisible":true,"text":applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(accounts[i].availableBalance, accounts[i].currencyCode)};
							rowdata.flxRow = { "isVisible": true };
							segData.push(rowdata)
						}
						return segData;
					}
					else {
						applicationManager.getDataProcessorUtility().showToastMessageError(scope, "Something went wrong.... accounts length");
					}
				} else if (flowtype == "Cards") {
					if (accounts.length) {

						var segData = [];
						for (i = 0; i < accounts.length; i++) {
							var rowdata = {};
							rowdata.lblAccType = {"isVisible":true,"text":accounts[i].accountType};
							rowdata.lblAccNumber=accounts[i].accountID
							rowdata.lblAccname = {"isVisible":true,"text":accounts[i].accountName};
							//	rowdata.lblBalance=applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(accounts[i].availableBalance,accounts[i].currencyCode);
							rowdata.lblBalance = {"isVisible":true,"text":accounts[i].availableBalance};
							rowdata.flxRow = { "isVisible": true };
							segData.push(rowdata)
						}
						return segData;
					}
					else {
						applicationManager.getDataProcessorUtility().showToastMessageError(scope, "Something went wrong.... accounts length");
					}
				}else if(flowtype=="FT_From"){
					if(accounts.length){
					var segData=[];
					var bankLogo =applicationManager.getNavigationManager().getCustomInfo("bankLogo");
				for(i=0;i<accounts.length;i++){
					if(kony.sdk.isNullOrUndefined(bankLogo)){
					if(accounts[i].accountName){
					var rowdata={};
					rowdata.lblAccType={"text":accounts[i].productId,"isVisible":true};
					rowdata.lblAccNumber=accounts[i].accountID,
					rowdata.lblAccname={"text":JSON.parse(accounts[i].accountHolder).fullname,"isVisible":true,"info":accounts[i].transferFlow};
					rowdata.lblBalance={"text":applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(accounts[i].availableBalance, accounts[i].currencyCode),"isVisible":true};
					rowdata.flxRow={"isVisible":true};
					segData.push(rowdata)
				}
				else{
				var rowdata={};
				rowdata.lblAccType={"isVisible":false,"info":accounts[i].swiftCode};
				rowdata.lblAccNumber=accounts[i].accountNumber,
				rowdata.lblAccname={"text":accounts[i].beneficiaryName,"isVisible":true,"info":accounts[i].IBAN};
				rowdata.lblBalance={"isVisible":false,"info":accounts[i].bankName};
				rowdata.flxRow={"isVisible":true};
				segData.push(rowdata);
				}
				 }else{
					if(accounts[i].accountName){
						var rowdata={};
						rowdata.lblAccType={"text":accounts[i].productId,"isVisible":true};
						rowdata.lblAccNumber=accounts[i].accountID,
						rowdata.lblAccname={"text":JSON.parse(accounts[i].accountHolder).fullname,"isVisible":true,"info":accounts[i].transferFlow};
						rowdata.lblBalance={"text":applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(accounts[i].availableBalance, accounts[i].currencyCode),"isVisible":true};
						rowdata.flxRow={"isVisible":true};
						segData.push(rowdata)
					}
					else{
					var rowdata={};
					rowdata.lblAccType={"isVisible":false,"info":accounts[i].swiftCode};
					rowdata.lblAccNumber=accounts[i].accountNumber,
					rowdata.lblAccname={"text":accounts[i].beneficiaryName,"isVisible":true,"info":accounts[i].IBAN};
					rowdata.lblBalance={"isVisible":true,"text":accounts[i].bankName,"info":accounts[i].bankName};
					rowdata.imgBankLogo={"isVisible":true,"src":accounts[i].logoUrl};
					rowdata.flxRow={"isVisible":true};
					segData.push(rowdata);
					}
				}
				}
				return segData;
					}
					else{
						applicationManager.getDataProcessorUtility().showToastMessageError(scope, "Something went wrong.... accounts length");
					}
					}

			}catch(e){
				kony.print("****************Erron in formatSegData**************"+e);
				applicationManager.getDataProcessorUtility().showToastMessageError(scope, "Something went wrong....formatSegData");
			}
			
		},
		SegRowclick:function(){
			try{
				var scope=this;
				//alert("row items"+scope.view.segFrmAccount.selectedRowItems);
				scope.animateFlex(false);
				var bankLogo = applicationManager.getNavigationManager().getCustomInfo("bankLogo");
				if(kony.sdk.isNullOrUndefined(bankLogo)){
					scope.onRowSelections(scope.view.segFrmAccount.selectedRowItems);
				}else{
					scope.onRowSelections(scope.view.segFrmDomesticAccount.selectedRowItems);
					applicationManager.getNavigationManager().setCustomInfo("bankLogo");
				}
				
				
			}catch(e){
				kony.print("****************Erron in SegRowclick**************"+e);
				applicationManager.getDataProcessorUtility().showToastMessageError(scope, "Something went wrong....SegRowclick");
			}
		},
		invokeSearch:function(){
			try{
				var scope=this;
				var searchTxt=scope.view.tbxSearch.text.toLowerCase();
				var result = []
			if(scope.SegmentData.length){
				if(searchTxt.length>=3){
					for(var i=0;i<scope.SegmentData.length;i++){
						if(scope.SegmentData[i].lblAccname.text.toLowerCase().indexOf(searchTxt) !== -1||scope.SegmentData[i].lblAccNumber.toLowerCase().indexOf(searchTxt) !== -1){
							result.push(scope.SegmentData[i])
						}
					}
					if(result.length){
					
			scope.view.segFrmAccount.setData(result);
			scope.view.segFrmAccount.setVisibility(true);
			scope.view.lblNoaccounts.setVisibility(false);
			}
		else{
			
			//applicationManager.getDataProcessorUtility().showToastMessageError(scope, "Something went wrong....with seg data");
			scope.view.segFrmAccount.setVisibility(false);
			scope.view.lblNoaccounts.setVisibility(true);
		}
				}
				else{
					scope.view.segFrmAccount.setData(scope.SegmentData);
				}
				
			}
			}catch(e){
				kony.print("****************Erron in invokeSearch**************"+e);
				applicationManager.getDataProcessorUtility().showToastMessageError(scope, "Something went wrong....invokeSearch");
			}
			
		},
		animateFlex:function(show){
		try{
			
    var self = this;
	function callback() {}
if(show){
	  
    self.view.flxContainier.animate(
    kony.ui.createAnimation({
        "100": {
            "bottom": "-5%",
            "stepConfig": {
                "timingFunction": kony.anim.EASE
            }
        }
    }), {
        "delay": 0,
        "iterationCount": 1,
        "fillMode": kony.anim.FILL_MODE_FORWARDS,
        "duration": 0.25
    }, {
        "animationEnd": callback
    });
}
else{
	  
    self.view.flxContainier.animate(
    kony.ui.createAnimation({
        "100": {
            "bottom": "-100%",
            "stepConfig": {
                "timingFunction": kony.anim.EASE
            }
        }
    }), {
        "delay": 0,
        "iterationCount": 1,
        "fillMode": kony.anim.FILL_MODE_FORWARDS,
        "duration": 0.25
    }, {
        "animationEnd": callback
    });
}
  

		}catch(e){
			
		}
	}
		
	};
});