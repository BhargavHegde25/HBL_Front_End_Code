define(['./investmentConstraintsDAO'],function(investmentConstraintsDAO) {

	return {
		constructor: function(baseConfig, layoutConfig, pspConfig) {
          

      	this.completeResponse = {};
      	this.assetParm={};
      	this.investmentConstraintsDAO = new investmentConstraintsDAO();
          
		},
      
      
      setServiceParm :function(serviceParm, flexSize){
      	this.assetParm=serviceParm;
        this.setFlxSize = flexSize;
      	this.makeDaoCall(this.assetParm);
    	},
      
      makeDaoCall: function(serviceParm){
      try{
        let objectServiceName = serviceParm.objectServiceName;
        let operationName = serviceParm.operationName;
        let objectName = serviceParm.objectName;
        let criteria = serviceParm.Criteria;
        this.investmentConstraintsDAO.fetchDetails(objectServiceName,operationName,objectName,criteria,this.onServiceSuccess,this.onError);
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
      }
      else{
         this.view.flxError.isVisible = false;
      this.view.flxNoIssue.isVisible = true;
      this.view.flxDetails.isVisible = true; 
      if(kony.application.getCurrentForm().id === "frmInvestmentProposal"){
          this.completeResponse = data;
	  if(Number(this.completeResponse.investmentConstraintStatus)){
        this.setFlxSize(data);
      	this.segDetails(this.completeResponse);
		this.view.imgShow.isVisible = true;
		this.view.lblText.isVisible = true;
        this.view.imgShow.src = "info.png";
        this.view.lblText.text = this.completeResponse.investmentConstraintComment;
        this.view.segDetails.isVisible = true;
        this.view.flxInvestmentConstraints.height = "283dp";
        this.view.flxDetails.isVisible = true;
	  }else{
        this.setFlxSize(data);
		this.view.imgShow.isVisible = true;
		this.view.lblText.isVisible = true;
        this.view.lblText.text = this.completeResponse.investmentConstraintComment;
        this.view.segDetails.isVisible = false;
        this.view.imgShow.src = "selectedtick.png";
        this.view.flxDetails.isVisible = false;
        this.view.flxInvestmentConstraints.height = "99dp";
        
	  }
      }
      else{
      this.completeResponse = data;
	  if(Number(this.completeResponse.investmentConstraintStatus)){
      	this.segDetails(this.completeResponse);
		this.view.imgShow.isVisible = true;
		this.view.lblText.isVisible = true;
        this.view.imgShow.src = "info.png";
        this.view.lblText.text = this.completeResponse.investmentConstraintComment;
        this.view.segDetails.isVisible = true;
        this.view.flxInvestmentConstraints.height = "283dp";
        this.view.flxDetails.isVisible = true;
	  }else{
		this.view.imgShow.isVisible = true;
		this.view.lblText.isVisible = true;
        this.view.lblText.text = this.completeResponse.investmentConstraintComment;
        this.view.segDetails.isVisible = false;
        this.view.imgShow.src = "selectedtick.png";
        this.view.flxDetails.isVisible = false;
        this.view.flxInvestmentConstraints.height = "99dp";
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
        this.completeResponse = data;
        var segData = [];
        var storeData;
        if(kony.application.getCurrentForm().id === "frmInvestmentProposal"){
            for(var i=0; i<this.completeResponse.constraintDetails.length; i++){
          storeData={
            Details: this.completeResponse.constraintDetails[i].investmentConstraintDetails,
            img: {src:"passworddots_1x.png"}
          };
          segData.push(storeData);
        }
          
        }else{
          for(var i=0; i<this.completeResponse.investmentConstraintDetails.length; i++){
          storeData={
            Details: this.completeResponse.investmentConstraintDetails[i].investmentConstraintDetails,
            img: {src:"passworddots_1x.png"}
          };
          segData.push(storeData);
        }
        }
        this.view.segDetails.widgetDataMap={
          rtxDetail: "Details",
          imgBullet: "img"
        };
         this.view.segDetails.setData(segData);
      },
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {

		}
	};
});