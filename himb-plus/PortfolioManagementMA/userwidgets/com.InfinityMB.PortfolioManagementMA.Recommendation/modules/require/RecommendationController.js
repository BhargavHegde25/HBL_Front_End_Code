define(['./RecommendationDAO'],function(RecommendationDAO) {
    
	return {
		constructor: function(baseConfig, layoutConfig, pspConfig) {
          this.response = {};
          this.RecommendationDAO=new RecommendationDAO();
		},
       preShow:function(){
         try{
          this.view.segRecommendations.setVisibility(false);
          this.view.imgDropDown.onTouchEnd=this.clickExecution;
          this.view.imgDropDown.src="chevron_down.png";
          this.flag=0;
           }catch(err) {
        this.setError(err, "preShow");
      }
       },
        setRecomSerParm:function(parm){
	try{
         /* this.response = {
                   "portfolioID": "100777-5",
                   "recommendedInstrumentComment": "Some issues with your portfolio health",
                   "recommendedInstrumentStatus": "1",
                   "status": "success",
                   "recommendedInstrumentDetails": [
                    {
                     "instrumentName": "Nestle",
                     "instrumentDetails": "position held; has sell recomended"
                     },
                    {
                     "instrumentName": "ABB",
                     "instrumentDetails": "position held; not included with bank recomendation"
                    }
                    ],
                      "opstatus": 0,
                     "httpStatusCode": "200"
                    };*/
          this.makeDaoCall(parm);      
	  } catch(err) {
        this.setError(err, "setRecomSerParm");
      }      
        },
       makeDaoCall: function(serviceParm){
            try{
              let objectServiceName = serviceParm.objectServiceName;
              let operationName = serviceParm.operationName;
              let objectName = serviceParm.objectName;
              let criteria = serviceParm.Criteria;
              this.RecommendationDAO.fetchDetails(objectServiceName,operationName,objectName,criteria,this.onServiceSuccess,this.onError); 
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
        this.response = data.recommendedDetails[0];
        if (Number(this.response.recommendedInstrumentStatus))
        { 
          this.view.imgStatus.src="aa_password_error.png";
          this.view.lblStatus.text=this.response.recommendedInstrumentComment;
          this.view.imgStatus.setVisibility(true);
          this.view.lblStatus.setVisibility(true);
          this.view.imgDropDown.setVisibility(true);
        }
        else{            
          // this.view.lblStatus.text="No issues";
          this.view.imgStatus.src="approval.png";
          this.view.lblStatus.text=this.response.recommendedInstrumentComment;
          this.view.imgStatus.setVisibility(true);
          this.view.lblStatus.setVisibility(true);
          this.view.imgDropDown.setVisibility(false);
          this.view.segRecommendations.setVisibility(false); 
        }
      }
      else{
            this.response = data;
           if (Number(this.response.recommendedInstrumentStatus))
            {
              this.view.imgStatus.src="aa_password_error.png";
              this.view.lblStatus.text=this.response.recommendedInstrumentComment;
              this.view.imgStatus.setVisibility(true);
              this.view.lblStatus.setVisibility(true);              
              this.view.imgDropDown.setVisibility(true);

            }
          else{
              this.view.imgStatus.src="approval.png";
              this.view.lblStatus.text=this.response.recommendedInstrumentComment;
              this.view.imgStatus.setVisibility(true);
              this.view.lblStatus.setVisibility(true);
            //  this.view.lblStatus.text="No issues";              
              this.view.imgDropDown.setVisibility(false);
              this.view.segRecommendations.setVisibility(false);

        } 
      }
       } catch(err) {
        this.setError(err, "onServiceSuccess");
      }         
    },
    onError: function(err){
      kony.print(err);
    },
    clickExecution:function(){
    try{
      if(this.flag===0){
        this.view.segRecommendations.setVisibility(true);
        this.showSegment();
        this.view.imgDropDown.setVisibility(true);
        this.view.imgDropDown.src="chevron_up.png";
        this.flag=1;
      }
      else{
        this.view.segRecommendations.setVisibility(false);
        this.view.imgDropDown.setVisibility(true);
        this.view.imgDropDown.src="chevron_down.png";
        this.flag=0;
      }
      } catch(err) {
        this.setError(err, "clickExecution");
      }      
    },
    showSegment:function(){
    try{
      // this.view.lblStatus.text=this.response.recommendedInstrumentComment;
      var data=this.response;
      var segData = [];
      var storeData;
      for(var i=0;i<data.recommendedInstrumentDetails.length;i++)
      {
        storeData={
          Detail: data.recommendedInstrumentDetails[i].instrumentDetails, //IW-3837-Bhuvanesh
          img :{src:"aa_password_error.png"}
        };
        segData.push(storeData);
      }
      this.view.segRecommendations.widgetDataMap={
        rtxtInvstDetail: "Detail",
        imgStatus:"img"              
      }; 
      this.view.segRecommendations.setData(segData);
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