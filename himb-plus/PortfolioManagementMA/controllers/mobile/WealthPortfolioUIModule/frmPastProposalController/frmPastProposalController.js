/* eslint-disable */
define(['CommonUtilities'], function(CommonUtilities) {
  return {
    proposaldata: [],
    prevClick: 0,
    currentyear:true,
    segmentVisibility: false,

    init: function() {
      this.view.preShow = this.preShow;
      this.view.postShow = this.postShow;
    },


    preShow: function() {   
      try{
      if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
        this.view.flxHeader.setVisibility(false);
      }
      this.ServiceCall();
        }catch(err) {
        this.setError(err, "preShow");
      }
    },

    initActions:function(){
      try{
      this.view.segList.onRowClick = this.onSegmentRowClick;
      this.view.customHeader.flxBack.onClick =this.backOnClick;
      
      this.view.btnViewReport.onClick = this.navToViewReport;
      this.view.btnContactAdvisor.onClick = this.navToContactAdvisor;
        }catch(err) {
        this.setError(err, "initActions");
      }
    },
    
    navToViewReport : function (){   
      try{
      //var navManager = applicationManager.getNavigationManager();
      //navManager.navigateTo("frmReviewNewProposal");

      var wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");             
      var portfolioid = wealthModule.portfolioId;        
        let params = {
          "portfolioId": portfolioid,
          "portfolioServiceType": "Advisory",
          "navPage": "pastProposal"
        };
        applicationManager.getModulesPresentationController("WealthPortfolioUIModule").downloadParams = params; 
        //applicationManager.getModulesPresentationController("WealthPortfolioUIModule").downloadParams.navPage = "";      
        wealthModule.getDownloadProposalList(applicationManager.getModulesPresentationController("WealthPortfolioUIModule").downloadParams);
        kony.print("test"+applicationManager.getModulesPresentationController("WealthPortfolioUIModule").downloadParams);
         }catch(err) {
        this.setError(err, "navToViewReport");
      }
    },    

    onClickDownloadMessage:function(base64String,filename)
    {
      try 
      {          
        this.view.socialshare.shareWithBase64(base64String,filename);
      }
      catch(error)
      {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        kony.print(error);
      }
    },

    navToContactAdvisor : function (){
      var navManager = applicationManager.getNavigationManager();
      navManager.navigateTo("frmContactAdvisor");
    },


    backOnClick:function(){
      try{
      if(this.segmentVisibility === false){
        this.currentyear = true;
        this.view.investmentFilter.goBack();
        new kony.mvc.Navigation({"appName" : "PortfolioManagementMA", "friendlyName" : "frmPortfolioDetails"}).navigate();

      } else{
        this.view.flxfilter.setVisibility(true);
        this.view.flxPastProposal.setVisibility(true);        
        this.view.flxDetails.setVisibility(false);
        this.view.flxButtons.setVisibility(false); 
        this.segmentVisibility = false;
        if(scope_WealthPresentationController.currentYearFilter){
            this.currentyear = true;
            this.ServiceCall();
        }
      }
        }catch(err) {
        this.setError(err, "backOnClick");
      }
    },

    postShow: function() {
      try{
      this.initActions();
      var navMan = applicationManager.getNavigationManager();
      this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("i18n.wealth.pastProposals");
      this.view.title = kony.i18n.getLocalizedString("i18n.wealth.pastProposals");
      var paramcomp = [kony.i18n.getLocalizedString("i18n.wealth.currentYear"),kony.i18n.getLocalizedString("i18n.wealth.previousYear")];
      this.view.investmentFilter.setFilterSegment(paramcomp, this.filterProposals);
        }catch(err) {
        this.setError(err, "postShow");
      }
    },


    ServiceCall:function(){
      try{
      this.view.segList.removeAll(); //iw-3839
      var wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
      var portfolioid = wealthModule.portfolioId;
      var pastparam = {
        "portfolioId":portfolioid,
        "portfolioServiceType": "Advisory",
        "type": "pastProposal",
		"contextId": scope_WealthPresentationController.contextId[portfolioid]
      };
      if(this.currentyear){
        Object.assign(pastparam,{"filter": "currentYear"});        
      }
      else
      {
        Object.assign(pastparam,{"filter": "previousYear"});
      }
      wealthModule.getPastProposal(pastparam);
        }catch(err) {
        this.setError(err, "ServiceCall");
      }
    },



    CallonFilter:function(){
      try{
      this.view.segList.removeAll();
      this.proposaldata.splice(0,this.proposaldata.length);
      this.prevClick = 0;
      this.ServiceCall();
      var navMan = applicationManager.getNavigationManager();
      var pastresponse = navMan.getCustomInfo("frmPastProposal");
        }catch(err) {
        this.setError(err, "CallonFilter");
      }
    },

    filterProposals :function(yearStr){
      try{
      if(yearStr.text === kony.i18n.getLocalizedString("i18n.wealth.currentYear"))
        {
           this.currentyear = true;      
      	   this.CallonFilter();
        }
      else
        {
           this.currentyear = false;      
      	   this.CallonFilter();
        }
      }catch(err) {
        this.setError(err, "filterProposals");
      }
    },

    PopulateSegment: function(response) {
      try{
      if(response.pastProposal.length !== 0)
      {
        var scope = this;
        var navMan = applicationManager.getNavigationManager();
        var results = [];

        var maxlength = 70;

        for (var i in response.pastProposal) {
          var shortDesc = response.pastProposal[i].description;
          if (response.pastProposal[i].description.length > maxlength) {
            shortDesc=response.pastProposal[i].description.substr(0, 60) + '...';
          }
          var dateSplit = (response.pastProposal[i].dateTime).split(",");
          var storeData = {
            header: response.pastProposal[i].header,
            dateTime: dateSplit[0],
            description: response.pastProposal[i].description,
            shortDesc:shortDesc,
            showMore: {
              "onClick": function(event, context) {
                scope.onSegmentRowClick(event, context);
              }.bind(this)
            },
            flxSeparator: {
              "isVisible": true
            },
            isRowClicked: false,
          };
          results.push(storeData);

          //this.proposaldata.push(storeData);
        }
        this.view.segList.widgetDataMap = {
          lblTitle: "header",
          lblTime: "dateTime",
          lblData: "shortDesc",
          flxPastProposal: "showMore",
          flxSeparator: "flxSeparator",
        };
        this.view.segList.setData(results);
        this.proposaldata = results;
      }  
        }catch(err) {
        this.setError(err, "PopulateSegment");
      }
    },

    onSegmentRowClick: function(event, context){
      try{
      
      //var rowindex=context.selectedRowIndex[1];
      scope_WealthPresentationController.currentYearFilter = false;
      var rowindex;
      if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){  
        rowindex=context.rowIndex;
      }
      else
      {
        rowindex=this.view.segList.selectedRowIndex[1];
      }
      var navMan = applicationManager.getNavigationManager();
      var response = navMan.getCustomInfo("frmPastProposal");
      navMan.setCustomInfo("frmPastProposalDate", response.pastProposal[rowindex].dateTime);
      this.view.flxfilter.setVisibility(false);
      this.view.flxPastProposal.setVisibility(false);
      this.view.flxDetails.setVisibility(true);
      this.view.flxButtons.setVisibility(true); 
      this.segmentVisibility = true;
//       this.view.lblTitle.text = this.proposaldata[rowindex].header;
//       this.view.lblDateAndTime.text = this.proposaldata[rowindex].dateTime;
//       this.view.lblContent.text = this.proposaldata[rowindex].description;
      this.view.lblTitle.text = response.pastProposal[rowindex].header;
      this.view.lblDateAndTime.text = response.pastProposal[rowindex].dateTime;
      this.view.lblContent.text = response.pastProposal[rowindex].description;
        }catch(err) {
        this.setError(err, "onSegmentRowClick");
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
        "method" : method,
        "error": errorMsg
      };
      var wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
        wealthModule.onError(errorObj);
    }
  };
});