define(['./ConstraintsDAO'],function(ConstraintsDAO) {
    
	return {
		constructor: function(baseConfig, layoutConfig, pspConfig) {
          this.response = {};
          this.ConstraintsDAO=new ConstraintsDAO();
		},
       preShow:function(){
         try{
          this.view.segConstraints.setVisibility(false);
          this.view.imgDropDown.onTouchEnd=this.clickExecution;
          this.view.imgDropDown.src="chevron_down.png";
          this.flag=0;
           } catch(err) {
        this.setError(err, "preShow");
      }
       },
        setConstSerParm:function(parm){
         /* this.response = {
    "portfolioID": "100777-5",
    "investmentConstraintComment": "Some issues with your portfolio health",
    "investmentConstraintStatus": "1",
    "status": "success",
    "opstatus": 0,
    "httpStatusCode": "200",
    "investmentConstraintDetails": [
        {
            "investmentConstraintDetails": "Issuer concentration of 16% for UBS funds exceeds maximum recommedned 10% of the portfolio."
        },
        {
            "investmentConstraintDetails": "Instrument concentration of 6% for Toche AG exceeds maximum recommended 5% of the portfolio."
        },
        {
            "investmentConstraintDetails": "Instrument restriction of zero position for Philip Morris breached."
        }
    ]
};*/
           this.makeDaoCall(parm);
                       
        },
           makeDaoCall: function(serviceParm){
            try{
              let objectServiceName = serviceParm.objectServiceName;
              let operationName = serviceParm.operationName;
              let objectName = serviceParm.objectName;
              let criteria = serviceParm.Criteria;
              this.ConstraintsDAO.fetchDetails(objectServiceName,operationName,objectName,criteria,this.onServiceSuccess,this.onError); 
            }
            catch(err)
            {
              var errorObj =
                  {
                    "errorInfo" : "Error in making service call.",
                    "errorLevel" : "Business",
                    "error": err
                  };
              this.onError(errorObj);
            }
          },
         onServiceSuccess: function(data,unicode){
           try{
           if(kony.application.getCurrentForm().id === "frmReviewNewProposal"){
             this.response = data;
            if (Number(this.response.investmentConstraintStatus))
            { 
              this.view.imgStatus.src="aa_password_error.png";
              this.view.lblStatus.text=this.response.investmentConstraintComment;
              this.view.imgStatus.setVisibility(true);
              this.view.lblStatus.setVisibility(true);
              this.view.imgDropDown.setVisibility(true);
            }
          else{            
             // this.view.lblStatus.text="No issues";
              this.view.imgStatus.src="approval.png";
              this.view.lblStatus.text=this.response.investmentConstraintComment;
              this.view.imgStatus.setVisibility(true);
              this.view.lblStatus.setVisibility(true);
              this.view.imgDropDown.setVisibility(false);
              this.view.segConstraints.setVisibility(false); 
         }
           }
           else{
            this.response = data;
            if (Number(this.response.investmentConstraintStatus))
            { 
              this.view.imgStatus.src="aa_password_error.png";
              this.view.lblStatus.text=this.response.investmentConstraintComment;
              this.view.imgStatus.setVisibility(true);
              this.view.lblStatus.setVisibility(true);
              this.view.imgDropDown.setVisibility(true);
            }
          else{            
             // this.view.lblStatus.text="No issues";
              this.view.imgStatus.src="approval.png";
              this.view.lblStatus.text=this.response.investmentConstraintComment;
              this.view.imgStatus.setVisibility(true);
              this.view.lblStatus.setVisibility(true);
              this.view.imgDropDown.setVisibility(false);
              this.view.segConstraints.setVisibility(false); 
         }
         }
              } catch(err) {
        this.setError(err, "onServiceSuccess");
      }
          },
        onError:function(err){
          kony.print(err);
        },
        clickExecution:function(){
          try{
            if(this.flag===0){
               this.view.segConstraints.setVisibility(true);
               this.showSegment();
               this.view.imgDropDown.setVisibility(true);
               this.view.imgDropDown.src="chevron_up.png";
               this.flag=1;
            }
        
          else{
               this.view.segConstraints.setVisibility(false);
               this.view.imgDropDown.setVisibility(true);
               this.view.imgDropDown.src="chevron_down.png";
               this.flag=0;  
          }
            } catch(err) {
        this.setError(err, "clickExecution");
      }
          },
        showSegment:function(){
           //this.view.lblStatus.text=this.response.investmentConstraintComment;
          try{     
          var data=this.response;
               var segData = [];
               var storeData;
          if(kony.application.getCurrentForm().id === "frmReviewNewProposal"){
            for(var i=0;i<data.investmentConstraintDetails.length;i++)
            {
              storeData={
                 Details: data.investmentConstraintDetails[i].investmentConstraintDetails,
                img :{src:"aa_password_error.png"}
              };
              segData.push(storeData);
            }
          }else{
            for(var i=0;i<data.investmentConstraintDetails.length;i++)
            {
              storeData={
                 Details: data.investmentConstraintDetails[i].investmentConstraintDetails,
                img :{src:"aa_password_error.png"}
              };
              segData.push(storeData);
            }
          }
              this.view.segConstraints.widgetDataMap={
              lblInstDetails: "Details",
              imgStatus:"img"              
            }; 
            this.view.segConstraints.setData(segData);
            } catch(err) {
        this.setError(err, "showSegment");
      }
        },
      /**
	* @api : setError
	* triggered as a error call back for any service
    * @arg1: errorMsg {String} - error message
    * @arg2: method {String} - method from which error message is received
	* @return : NA
	*/
    setError: function(errorMsg, method) {
      var scope = this;
      var errorObj = {
        "level" : "ComponentController",
        "method" : method,
        "error": errorMsg
      };
	
	scope.onErrorMain(errorObj);
    },
    onErrorMain:function(err){
      kony.print(JSON.stringify(err));
    },
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {

		}
	};
});