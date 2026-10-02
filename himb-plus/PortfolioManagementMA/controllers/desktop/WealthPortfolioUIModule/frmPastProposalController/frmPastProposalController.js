/* eslint-disable */
define("PortfolioManagementMA/WealthPortfolioUIModule/userfrmPastProposalController", ['FormControllerUtility', 'ViewConstants', 'CommonUtilities', 'OLBConstants', 'CampaignUtility'], function(FormControllerUtility, ViewConstants, CommonUtilities, OLBConstants, CampaignUtility) {
  var responsiveUtils = new ResponsiveUtils();
  var orientationHandler = new OrientationHandler();
  return {
    proposaldata: [],
    prevClick: 0,
    currentyear:true,
	isRTL:'',

    init: function() {
      this.view.preShow = this.preShow;
      this.view.onBreakpointChange = this.onBreakpointChange;
      this.view.postShow = this.postShow;
      this.view.onTouchEnd = this.onFormTouchEnd;
      this.initActions();
    },
    
    initActions:function(){
      this.view.flxCurrentYear.onTouchEnd = this.CurrentYear;
      this.view.flxPreviousYear.onTouchEnd = this.PreviousYear;
      this.view.flxBack.onTouchEnd = this.goBack;
      this.view.flxFilterYear.onClick = this.showContextualMenu;
      this.view.btnContactAdvisor.onClick = this.ContactAdvisor;
      this.view.btnViewReport.onClick = this.PastProposalReport;
    },

    preShow: function() {
	  this.isRTL = scope_WealthPresentationController.rtlLocale.includes(kony.i18n.getCurrentLocale());
	  this.view.imgBack.src = this.isRTL ? "right_arrow.png" : "back_icon_blue.png";
      this.proposaldata = [];
      this.prevClick = 0;
	  this.currentyear = true;
      this.view.flxContextualMenu.setVisibility(false);
      this.view.lblFilterYear.text = kony.i18n.getLocalizedString("i18n.wealth.currentYear");
      this.setActiveHeaderHamburger();
    },

    postShow: function() {
      this.ServiceCall();
    },

    setActiveHeaderHamburger: function() {
      this.view.customheadernew.activateMenu("Accounts", "My Accounts");
      this.view.customheadernew.flxContextualMenu.setVisibility(false);
      this.view.customheadernew.flxAccounts.skin = ViewConstants.SKINS.BLANK_SKIN_TOPMENU;
    },
    
    goBack: function() {
      this.proposaldata.splice(0, this.proposaldata.length);
      this.prevClick = 0;
      this.currentyear = true;
      this.view.flxCurrentYear.skin = "bbSknFlxf9fafb";
      this.view.flxPreviousYear.skin = "bbSKnFlxffffff";
      new kony.mvc.Navigation({
        "appName": "PortfolioManagementMA",
        "friendlyName": "frmPortfolioOverview"
      }).navigate();
    },
    
    onFormTouchEnd: function() {
            var currFormObj = kony.application.getCurrentForm();
            if (currFormObj.customheadernew.flxUserActions.isVisible === true) {
                setTimeout(function() {
                    currFormObj.customheadernew.flxUserActions.setVisibility(false);
                }, "17ms")
            }
            if (currFormObj.customheadernew.flxContextualMenu.isVisible === true) {
                setTimeout(function() {
                    currFormObj.customheadernew.flxContextualMenu.setVisibility(false);
                    currFormObj.customheadernew.flxTransfersAndPay.skin = ViewConstants.SKINS.BLANK_SKIN_TOPMENU;
                    currFormObj.customheadernew.imgLblTransfers.text = "O";
                }, "17ms")
            }
        },
    
    showContextualMenu:function(){
      var configurationManager = applicationManager.getConfigurationManager();
      if (this.view.flxContextualMenu.isVisible === true) {
        this.view.flxContextualMenu.isVisible = false;
        this.menuClick = false;
        this.view.forceLayout();
      } else {
        this.view.flxContextualMenu.isVisible = true;
        this.menuClick = true;
        this.view.forceLayout();
      }
      this.view.lblCurrentYear.text = kony.i18n.getLocalizedString("i18n.wealth.currentYear");
      this.view.lblPrevYear.text = kony.i18n.getLocalizedString("i18n.wealth.previousYear");
    },
    
   ServiceCall:function(){
      var wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
      var portfolioid = wealthModule.getPortfolioId();
      this.view.flxContextualMenu.setVisibility(false);
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
      },
    
    CallonFilter:function(){
      this.view.segProposal.removeAll();
      this.proposaldata.splice(0,this.proposaldata.length);
      this.prevClick = 0;
      this.ServiceCall();
      var navMan = applicationManager.getNavigationManager();
      this.view.flxContextualMenu.setVisibility(false);
    },
    
    CurrentYear:function(){
      this.currentyear = true;
      this.view.lblFilterYear.text = kony.i18n.getLocalizedString("i18n.wealth.currentYear");
      this.CallonFilter();
      this.view.flxCurrentYear.skin = "bbSknFlxf9fafb";
      this.view.flxPreviousYear.skin = "bbSKnFlxffffff";
    },

    PreviousYear:function(){
      this.currentyear = false;
      this.view.lblFilterYear.text = kony.i18n.getLocalizedString("i18n.wealth.previousYear");
      this.CallonFilter();
      this.view.flxCurrentYear.skin = "bbSKnFlxffffff";
      this.view.flxPreviousYear.skin = "bbSknFlxf9fafb";
    },

    PopulateSegment: function(response) {
      if(response.pastProposal.length !== 0)
      {
        var scope = this;
        var navMan = applicationManager.getNavigationManager();
        this.view.lblName.text = response.pastProposal[0].header;
        this.view.lblDescription.text = response.pastProposal[0].description;
        this.view.lblDateTime.text = response.pastProposal[0].dateTime;
        var results = [];
        var maxlength = 100;
        if(response.pastProposal){
          for (var i in response.pastProposal) {
            var shortDesc = response.pastProposal[i].description;
            if (response.pastProposal[i].description.length > maxlength) {
              shortDesc=response.pastProposal[i].description.substr(0, maxlength) + '...';
            }
            var storeData = {
              header: response.pastProposal[i].header,
              dateTime: response.pastProposal[i].dateTime,
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

            this.proposaldata.push(storeData);
            if (i !== "0") results.push(storeData);
            else {
              results.push(Object.assign(storeData, {
                flxNews: {
                  "skin": "bbSknFlxf9fafb"
                }
              }));
              navMan.setCustomInfo("frmReviewNewProposal", results[0].dateTime);
            }
          }
          this.view.segProposal.widgetDataMap = {
            lblContent1: "header",
            lblContent2: "dateTime",
            lblName: "shortDesc",
            flxPastProposal: "showMore",
            flxSeparator: "flxSeparator",
            flxNews: "flxNews"
          };
          this.view.segProposal.setData(results);
        }
      }
      else
      {
        this.view.lblName.text = "";
        this.view.lblDescription.text = "";
        this.view.lblDateTime.text = "";    
      }
    },

    onSegmentRowClick: function(event, context) {
      var navMan = applicationManager.getNavigationManager();
      var rowindex = context.rowIndex;
      this.proposaldata[this.prevClick].flxNews = {};
      this.prevClick = rowindex;
      this.proposaldata[rowindex] = Object.assign( this.proposaldata[rowindex],{
        flxNews: {
          "skin": "bbSknFlxf9fafb"
        }
      });
      this.view.segProposal.removeAll();
      this.view.segProposal.setData(this.proposaldata);
      this.proposaldata[rowindex].isRowClicked = true;
      this.view.lblName.text = this.proposaldata[rowindex].header;
      this.view.lblDescription.text = this.proposaldata[rowindex].description;
      this.view.lblDateTime.text = this.proposaldata[rowindex].dateTime;
      navMan.setCustomInfo("frmReviewNewProposal", this.proposaldata[rowindex].dateTime);
    },

    onBreakpointChange: function(form, width) {
      responsiveUtils.onOrientationChange(this.onBreakpointChange);
      this.view.customheadernew.onBreakpointChangeComponent(width);
      this.view.customfooternew.onBreakpointChangeComponent(width);
    },
    
    ContactAdvisor:function(){
      var navManager = applicationManager.getNavigationManager();
      navManager.navigateTo("frmContactAdvisor");
    },
    
    PastProposalReport:function(){
      //var navManager = applicationManager.getNavigationManager();
	  //var pastProposal =  navManager.setCustomInfo('InvestmentProposal','PastProposal');
      //navManager.navigateTo("frmInvestmentProposal");
      
      
      var wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");             
      var portfolioid = wealthModule.portofId;
      try
      {
        var criteria = {
          "portfolioId": portfolioid,
          "portfolioServiceType": "Advisory",
          "navPage": "pastProposal"
        };
        wealthModule.getDownloadProposalList(criteria);
      }
      catch(err)
      {
        kony.print(err);
      }
    },
    
    onSuccessDownloadPastProposals: function(response) {
      const linkSource = `data:application/pdf;base64,${response.base}`;
      const downloadLink = document.createElement("a");
      //const fileName = "PastProposals.pdf";
      var d = new Date();
      let Timestanp= d.getTime();
      const fileName = "PastProposals"+Timestanp+".pdf";
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
    }
  };
});