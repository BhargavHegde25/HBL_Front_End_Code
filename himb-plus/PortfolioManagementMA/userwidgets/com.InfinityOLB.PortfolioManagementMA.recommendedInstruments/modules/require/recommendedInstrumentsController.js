define(['./recommendedInstrumentsDAO'], function(recommendedInstrumentsDAO) {

	return {
		constructor: function(baseConfig, layoutConfig, pspConfig) {
          this.completeResponse = {};
          this.assetParm={};
          this.recommendedInstrumentsDAO = new recommendedInstrumentsDAO();
	
		},
      
      setServiceParm :function(serviceParm, flexSize){
      this.assetParm=serviceParm;
        this.setFlexSize = flexSize;
      this.makeDaoCall(this.assetParm);
      },
      
      makeDaoCall: function(serviceParm){
      try{
        let objectServiceName = serviceParm.objectServiceName;
        let operationName = serviceParm.operationName;
        let objectName = serviceParm.objectName;
        let criteria = serviceParm.Criteria;
        this.recommendedInstrumentsDAO.fetchDetails(objectServiceName,operationName,objectName,criteria,this.onServiceSuccess,this.onError);
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in making service call.",
              "errorLevel" : "Business",
              "error": err
            };
        //self.onError(errorObj);
      }
    },
    onServiceSuccess: function(data,unicode){
       if(data.errmsg){
         this.view.flxError.isVisible = true;
      this.view.flxNoIssue.isVisible = false;
      this.view.flxDetails.isVisible = false;
       }else{
         this.view.flxError.isVisible = false;
      this.view.flxNoIssue.isVisible = true;
      this.view.flxDetails.isVisible = true;
      if(kony.application.getCurrentForm().id === "frmInvestmentProposal"){
        this.completeResponse = data.recommendedDetails[0];
	  if(Number(this.completeResponse.recommendedInstrumentStatus)){
        this.setFlexSize(this.completeResponse);
      	this.segDetails(this.completeResponse);
		this.view.imgShow.isVisible = true;
		this.view.lblText.isVisible = true;
        this.view.imgShow.src = "info.png";
        this.view.lblText.text = this.completeResponse.recommendedInstrumentComment;
        this.view.segDetails.isVisible = true;
        this.view.flxRecommendedInstruments.height = "283dp";
        this.view.flxDetails.isVisible = true;
	  }else{
        this.setFlexSize(this.completeResponse);
		this.view.imgShow.isVisible = true;
		this.view.lblText.isVisible = true;
        this.view.lblText.text = this.completeResponse.recommendedInstrumentComment;
        this.view.segDetails.isVisible = false;
        this.view.imgShow.src = "selectedtick.png";
        this.view.flxDetails.isVisible = false;
        this.view.flxRecommendedInstruments.height = "99dp";
        
	  }
      }
      else{
      this.completeResponse = data;
	  if(Number(this.completeResponse.recommendedInstrumentStatus)){
      	this.segDetails(this.completeResponse);
		this.view.imgShow.isVisible = true;
		this.view.lblText.isVisible = true;
        this.view.imgShow.src = "info.png";
        this.view.lblText.text = this.completeResponse.recommendedInstrumentComment;
        this.view.segDetails.isVisible = true;
        this.view.flxRecommendedInstruments.height = "283dp";
        this.view.flxDetails.isVisible = true;
	  }else{
		this.view.imgShow.isVisible = true;
		this.view.lblText.isVisible = true;
        this.view.lblText.text = this.completeResponse.recommendedInstrumentComment;
        this.view.segDetails.isVisible = false;
        this.view.imgShow.src = "selectedtick.png";
        this.view.flxDetails.isVisible = false;
        this.view.flxRecommendedInstruments.height = "99dp";
	  }
      }
       }
      
    },
      
	onError: function(err) {
      this.view.flxError.isVisible = true;
      this.view.flxNoIssue.isVisible = false;
      this.view.flxDetails.isVisible = false;
      kony.print(JSON.stringify(err));
    },
      
      
      segDetails: function(data){
        var segData = [];
        var storeData;
        for(var i=0; i<data.recommendedInstrumentDetails.length; i++){
          storeData={
            Details: data.recommendedInstrumentDetails[i].instrumentDetails, //IW-3837-Bhuvanesh
            img: {src:"passworddots_1x.png"}
          };
          segData.push(storeData);
        }
        this.view.segDetails.widgetDataMap={
          imgBullet: "img",
          rtxDetail: "Details",
        };
         this.view.segDetails.setData(segData);
      },
      
     
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {}
	};
});