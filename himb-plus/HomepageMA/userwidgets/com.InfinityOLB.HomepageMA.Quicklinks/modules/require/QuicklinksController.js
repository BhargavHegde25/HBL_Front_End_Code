define(['./marketIndexCardDAO','./FormatUtils','CommonUtilities'],function(marketIndexCardDAO, FormatUtils, CommonUtilities) {
  //var checkUserPermission = function(permission) {
   // return applicationManager.getConfigurationManager().checkUserPermission(permission);
   //}
  return {
   preShow: function() {
    this.view.flxImg.skin="skncursor";
            try {
                ///alert("component ");
                this.view.flxImg.skin ="bbSKnFlxffffff";
                this.view.flxImgTransfers.height ="110px";
                this.view.flxImgPayments.height ="110px";
                this.view.flxImgChequeManagement.height ="110px";
                this.view.flxImgSettings.height ="110px";
                this.view.flxImgTransfers.width ="16%";
                this.view.flxImgPayments.width ="16%";
                this.view.flxImgChequeManagement.width ="16%";
                this.view.flxImgSettings.width ="16%";
                this.view.flxImgTransfers.left ="3%";
                this.view.flxImgPayments.left ="3%";
                this.view.flxImgChequeManagement.left ="3%";
                this.view.flxImgSettings.left ="3%";
                if (this.view.flxImgPMRelief) {
                    this.view.flxImgPMRelief.height ="110px";
                    this.view.flxImgPMRelief.width ="16%";
                    this.view.flxImgPMRelief.left ="3%";
                }
                this.view.flxImg.height ="150px";
                if (kony.os.deviceInfo().screenWidth <= 640) {
                    this.view.flxImg.width = "80%";
                }
                this.view.imgChequeManagement.src ="wallet.png";
                this.view.lblCheque1.text = "Load eSewa";
                this.view.lblCheuqe2.setVisibility(false);
                this.view.flxSeparatorMyInvest.setVisibility(false);
                this.checkHoverFlx(this.view.flxImgTransfers);
                this.checkHoverFlx(this.view.flxImgPayments);
                this.checkHoverFlx(this.view.flxImgChequeManagement);
                this.checkHoverFlx(this.view.flxImgSettings);
                if (this.view.flxImgPMRelief) { this.checkHoverFlx(this.view.flxImgPMRelief); }
                this.flowNavigate();
                //this.getFlowDetails = this.flowNavigate;
            } catch (err) {
                kony.print("Quicklinks_preShow" + err);
            }
        },
        checkHoverFlx : function(flex){
            let currentlyHoveredFlex = null;
            let leaveTimer = null;
            flex.onHover = function(widgetRef, eventObj) {
            if (eventObj.eventType === "enter") {
                if (leaveTimer) {
                    clearTimeout(leaveTimer);
                    leaveTimer = null;
                }

                if (currentlyHoveredFlex && currentlyHoveredFlex !== widgetRef) {
                    currentlyHoveredFlex.skin = "sknBGnewflx"; // Reset previous
                }

                widgetRef.skin = "sknBGflxnew";
                currentlyHoveredFlex = widgetRef;

            } else if (eventObj.eventType === "leave") {
                leaveTimer = setTimeout(function() {
                    widgetRef.skin = "sknBGnewflx";
                    if (currentlyHoveredFlex === widgetRef) {
                        currentlyHoveredFlex = null;
                    }
                }, 150); // slight delay to avoid false leave
                }
            };
        },
        postShow: function() {
           // alert("component postshow");
        },
        checkUserFeature : function(feature) {
        return applicationManager.getConfigurationManager().checkUserFeature(feature);
    },
    checkAtLeastOneFeaturePresent :function(features) {
        return features.some(this.checkUserFeature);
    },
    checkUserPermission : function(permission) {
        return applicationManager.getConfigurationManager().checkUserPermission(permission);
    },
    checkAtLeastOnePermission : function(permissions) {
        return permissions.some(this.checkUserPermission);
    },
        checkTransfersEntitlements:function(){
            var configurationManager = applicationManager.getConfigurationManager();
            if (configurationManager.isMicroAppPresent(configurationManager.microappConstants.REGIONALTRANSFER) === true) {
                return this.checkAtLeastOnePermission(["TRANSFER_BETWEEN_OWN_ACCOUNT_VIEW", "INTRA_BANK_FUND_TRANSFER_VIEW", "INTER_BANK_ACCOUNT_FUND_TRANSFER_VIEW", "INTERNATIONAL_ACCOUNT_FUND_TRANSFER_VIEW", "P2P_VIEW","INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE","INTRA_BANK_FUND_TRANSFER_CREATE"])
            } else return false;
        },
        checkBillPayEntitlements:function(){
            var configurationManager = applicationManager.getConfigurationManager();
            if (configurationManager.isMicroAppPresent(configurationManager.microappConstants.REGIONALTRANSFER) === true) {
                return this.checkUserFeature("BILL_PAY");
            } else return false;
        },
        checkChequeManagementEntitlements:function(){
            var configurationManager = applicationManager.getConfigurationManager();
                            // if (configurationManager.isMicroAppPresent(configurationManager.microappConstants.ARRANGEMENTS) === true) {
                            //     return this.checkAtLeastOneFeaturePresent(["CHEQUE_BOOK_REQUEST", "CHECK_BOOK_REQUEST_VIEW", "CHECK_BOOK_REQUEST_CREATE"]);
                            // } else {
                            //     return false;
                            // }
                            if (configurationManager.isMicroAppPresent(configurationManager.microappConstants.ARRANGEMENTS) === true) {
                                    return this.checkAtLeastOneFeaturePresent(["ESEWA_TOPUP", "ESEWA_TOPUP_ACTIVATE"]);
                                } else {
                                    return false;
                                }
        },
        checkSettingsEntitlements:function(){
             var configurationManager = applicationManager.getConfigurationManager();
                            if (configurationManager.isMicroAppPresent(configurationManager.microappConstants.ARRANGEMENTS) === true) {
                                return this.checkAtLeastOneFeaturePresent(["PROFILE_SETTINGS", "ALERT_MANAGEMENT", "ACCOUNT_SETTINGS_VIEW"]);
                            } else {
                                return false;
                            }
        },
        flowNavigate: function(){
       // getFlowDetails: function() {
            try {
                this.view.flxImgTransfers.isVisible = this.checkTransfersEntitlements();
                this.view.flxImgPayments.isVisible = this.checkBillPayEntitlements();
                this.view.flxImgChequeManagement.isVisible = this.checkChequeManagementEntitlements();
                this.view.flxImgSettings.isVisible = this.checkSettingsEntitlements();
                if (this.view.flxImgPMRelief) {
                    // Apply from cached client properties first (fast path)…
                    this.applyPMReliefTileConfig();
                    // …then fetch fresh: on OLB the cached CLIENT_PROPERTIES is usually empty at dashboard
                    // render time (it is populated later by other flows), so the tile would otherwise ignore
                    // PM_RELIEF_FUND_MENU_VISIBILITY / _MENU_NAME on the first render. Fetching here makes it reflect.
                    this.fetchAndApplyPMReliefConfig();
                }
               var pmVisible = (this.view.flxImgPMRelief && this.view.flxImgPMRelief.isVisible === true);
               if(this.view.flxImgTransfers.isVisible==true||this.view.flxImgPayments.isVisible==true||this.view.flxImgChequeManagement.isVisible==true||this.view.flxImgSettings.isVisible==true||pmVisible===true){
                 applicationManager.getNavigationManager().setCustomInfo("quicklinksvisibility","true");
               }
                 else{
                    applicationManager.getNavigationManager().setCustomInfo("quicklinksvisibility","false");
                 }
               this.adjustQuickLinksWidth();
                this.view.flxImgTransfers.onClick = function() {
                    var navMan = applicationManager.getNavigationManager();
                    var configManager = applicationManager.getConfigurationManager();
                    var data = applicationManager.getUserPreferencesManager().getUserObj();
                    navMan.navigateTo({
                        "appName": "TransfersMA",
                        "friendlyName": "frmUTFLanding"
                    }, false, data);
                }.bind(this);
				 this.view.flxImgPayments.onClick=function(){
                    kony.application.showLoadingScreen();
                    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({appName: "BillPayMA",moduleName: "BillPaymentUIModule"}).presentationController.showBillPaymentScreen({context: "PayABill",payload:{"code":"ALL"}});   
                var navMan = applicationManager.getNavigationManager();
				navMan.navigateTo({
                "appName": "BillPayMA",
                "friendlyName": "frmBillPayNew"
            });
              }.bind(this);
                this.view.flxImgChequeManagement.onClick = function() {
                //   var configManager = applicationManager.getConfigurationManager();
				// 		var accountsInp = configManager.userAccounts;
                //   var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                //             "moduleName": "StopPaymentsUIModule",
                //             "appName": "ArrangementsMA"
                //         });
                //   if(accountsInp.length > 0)
                //         accountsModule.presentationController.showStopPayments();
                    var navMan = applicationManager.getNavigationManager();
                    var data = applicationManager.getUserPreferencesManager().getUserObj();
                    navMan.navigateTo({
                        "appName": "TransfersMA",
                        "friendlyName": "frmLoadEsewa"
                    }, false, data);
                }.bind(this);
                this.view.flxImgSettings.onClick = function() {
                    var profileModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                        "moduleName": "SettingsNewUIModule",
                        "appName": "ManageProfileMA"
                    });
                    profileModule.presentationController.enterProfileSettings("profileSettings");
                }.bind(this);
                if (this.view.flxImgPMRelief) {
                    this.view.flxImgPMRelief.onClick = function() {
                        var navMan = applicationManager.getNavigationManager();
                        var userObj = applicationManager.getUserPreferencesManager().getUserObj() || {};
                        var data = Object.assign({}, userObj, { "pmReliefFund": true });
                        navMan.navigateTo({
                            "appName": "TransfersMA",
                            "friendlyName": "frmUTFLanding"
                        }, false, data);
                    }.bind(this);
                }
                // this.view.flxImgTransfers.onClick = function() {
                //     applicationManager.getModulesPresentationController({
                //         "appName": "TransfersMA",
                //         "moduleName": "frmUTFLanding"
                //     }).getPastPayments();
                // }.bind(this);
                this.view.flxImgTransfers.onClick = function() {
                    var navMan = applicationManager.getNavigationManager();
                    var configManager = applicationManager.getConfigurationManager();
                    var data = applicationManager.getUserPreferencesManager().getUserObj();
                    navMan.navigateTo({
                        "appName": "TransfersMA",
                        "friendlyName": "frmUTFLanding"
                    }, false, data);
                }.bind(this);
              //      this.flowDetails();
            } catch (err) {
                kony.print("Quicklinks_flowNavigate" + err);
            }
        },
        applyPMReliefTileConfig: function() {
            if (!this.view.flxImgPMRelief) { return; }
            var pmMenuName = this.getClientProperty("PM_RELIEF_FUND_MENU_NAME");
            if (pmMenuName && this.view.lblPMReliefQL) {
                // Accept a line-break token written as either "\n" (backslash-n) or "/n" (slash-n) in the
                // client property, and convert it to a real newline so the label renders on two lines.
                this.view.lblPMReliefQL.text = ("" + pmMenuName).replace(/\\n|\/n/g, "\n");
            }
            var pmVisibility = ("" + this.getClientProperty("PM_RELIEF_FUND_MENU_VISIBILITY")).trim().toLowerCase();
            // Default to shown; hide only on an explicit "false" (unset/empty => visible).
            this.view.flxImgPMRelief.isVisible = (pmVisibility !== "false");
        },
        fetchAndApplyPMReliefConfig: function() {
            var scope = this;
            try {
                var cfg = kony.sdk.getCurrentInstance().getConfigurationService();
                cfg.getAllClientAppProperties(function(res) {
                    if (res && Object.keys(res).length > 0) {
                        // Cache for every consumer (getClientProperty reads CommonUtilities.CLIENT_PROPERTIES),
                        // then re-apply the tile config with the fresh values.
                        CommonUtilities.CLIENT_PROPERTIES = res;
                        scope.applyPMReliefTileConfig();
                        if (scope.view && scope.view.forceLayout) { scope.view.forceLayout(); }
                    }
                }, function(err) {
                    kony.print("Quicklinks_fetchPMReliefConfig error: " + JSON.stringify(err));
                });
            } catch (e) {
                kony.print("Quicklinks_fetchPMReliefConfig exception: " + e);
            }
        },
        getClientProperty: function(key) {
            try {
                var cp = (CommonUtilities.CLIENT_PROPERTIES && Object.keys(CommonUtilities.CLIENT_PROPERTIES).length > 0)
                    ? CommonUtilities.CLIENT_PROPERTIES
                    : ((typeof OLBConstants !== "undefined" && OLBConstants.CLIENT_PROPERTIES) ? OLBConstants.CLIENT_PROPERTIES : {});
                return (cp && cp[key] !== undefined && cp[key] !== null) ? cp[key] : "";
            } catch (e) {
                kony.print("Quicklinks_getClientProperty" + e);
                return "";
            }
        },
        adjustQuickLinksWidth: function() {
            try {
                var tiles = [this.view.flxImgTransfers, this.view.flxImgPayments, this.view.flxImgChequeManagement, this.view.flxImgSettings];
                if (this.view.flxImgPMRelief) { tiles.push(this.view.flxImgPMRelief); }
                var visibleTiles = [];
                for (var i = 0; i < tiles.length; i++) {
                    if (tiles[i] && tiles[i].isVisible === true) { visibleTiles.push(tiles[i]); }
                }
                var n = visibleTiles.length;
                if (n === 0) { return; }
                // Keep the 3% left gap per tile and scale the width so N tiles ~fill the row.
                // width = 95/N - 3  => 16% at N=5, matching the original tuned 5-tile layout.
                var widthPct = (95 / n) - 3;
                if (widthPct > 92) { widthPct = 92; }
                if (widthPct < 10) { widthPct = 10; }
                var widthStr = widthPct.toFixed(2) + "%";
                for (var j = 0; j < visibleTiles.length; j++) {
                    visibleTiles[j].width = widthStr;
                    visibleTiles[j].left = "3%";
                }
            } catch (e) {
                kony.print("Quicklinks_adjustQuickLinksWidth" + e);
            }
        },

//     constructor: function(baseConfig, layoutConfig, pspConfig) {
//       this._objService="";
//       this._objName="";
//       this._operation="";
//       this.marketIndexCardDAO = new marketIndexCardDAO();
//       this._criteria = {};
//       this._viewAllBtnStatus = "";
//       this._marketIndexPerm = false;
//       this._newsDetailsPerm = false;
//       this.FormatUtils = new FormatUtils();


//       defineSetter(this, 'objService', function (val) {
//         if (typeof val === 'string' && val !== '') {
//           this._objService = val;
//         }
//       });
//       defineGetter(this, 'objService', function () {
//         return this._objService;
//       });

//       defineSetter(this, 'objName', function (val) {
//         if (typeof val === 'string' && val !== '') {
//           this._objName = val;
//         }
//       });
//       defineGetter(this, 'objName', function () {
//         return this._objName;
//       });
//       defineSetter(this, 'operation', function (val) {
//         if (typeof val === 'string' && val !== '') {
//           this._operation = val;
//         }
//       });
//       defineGetter(this, 'operation', function () {
//         return this._operation;
//       });
//       defineSetter(this, 'viewAllBtnStatus', function (val) {
//         if (typeof val === 'string' && val !== '') {
//           this._viewAllBtnStatus = val;
//         }
//       });
//       defineGetter(this, 'viewAllBtnStatus', function () {
//         return this._viewAllBtnStatus;
//       });
//     },
//     getCriteria: function(criteria, marketIndexPermission, marketNewsViewDetails){
//       this._criteria = criteria;
//       this._marketIndexPerm = marketIndexPermission;
//       this._newsDetailsPerm = marketNewsViewDetails;
//     },
//     makeDaoCallMarketIndexCard: function(){
//       try{
//         let serviceResponseIdentifier = "S1";
//         let objectName = this._objName;
//         let objectServiceName = this._objService;
//         let operationName = this._operation;
//         let params = this._criteria;
//         this.marketIndexCardDAO.fetchDetails(objectServiceName,operationName,objectName,params,serviceResponseIdentifier,this.onServiceSuccess,this.onError);
//       }
//       catch(err)
//       {
//         var errorObj =
//             {
//               "errorInfo" : "Error in making service call.",
//               "errorLevel" : "Business",
//               "error": err
//             };
//         self.onError(errorObj);
//       }
//     },
//     onServiceSuccess: function(response){
//       this.displayResults(response);
//     },
//     onError: function(errorObj){      
//       // error fetch
//       this.view.setVisibility(false);
//       this.marketIndexPostShow();
//     },	
//     preShow:function(){  
//       var scope = this;
//       if(this._marketIndexPerm === true){
//         scope.initActions();
//       }
//       this.view.flxView.accessibilityConfig = {
//         a11yARIA: {
//           "role": "link",
//           "aria-labelledby": "lblView"
//         }
//       }
//       this.view.lblView.accessibilityConfig = {
//         a11yARIA: {
//           tabindex: -1
//         }
//       }
//       this.view.lblMarket.accessibilityConfig = {
//         a11yARIA: {
//           tabindex: -1
//         }
//       }
//       this.view.lblTitle.accessibilityConfig = {
//         a11yARIA: {
//           tabindex: -1
//         }
//       }
//       this.view.lblValue.accessibilityConfig = {
//         a11yARIA: {
//           tabindex: -1
//         }
//       }
//       this.view.lblChange.accessibilityConfig = {
//         a11yARIA: {
//           tabindex: -1
//         }
//       }
//       this.view.CopylblTitle0ef672967b4ee42.accessibilityConfig = {
//         a11yARIA: {
//           tabindex: -1
//         }
//       }
//       this.view.CopylblValue0c1edac75bf5448.accessibilityConfig = {
//         a11yARIA: {
//           tabindex: -1
//         }
//       }
//       this.view.CopylblChange0aaa00601b36246.accessibilityConfig = {
//         a11yARIA: {
//           tabindex: -1
//         }
//       }
//       this.view.CopylblTitle0b7443f112ccb43.accessibilityConfig = {
//         a11yARIA: {
//           tabindex: -1
//         }
//       }
//       this.view.CopylblValue0idfe1df65b1042.accessibilityConfig = {
//         a11yARIA: {
//           tabindex: -1
//         }
//       }
//       this.view.CopylblChange0fb3be785321d42.accessibilityConfig = {
//         a11yARIA: {
//           tabindex: -1
//         }
//       }
//     },
//     initActions: function(){
//       this.setViewAllBtn();
//       this.view.flxView.onClick=this.ViewAllMarketNews;
//       var self = this;
//       try
//       {
//         this.makeDaoCallMarketIndexCard();
//       }
//       catch(err)
//       {
//         var errorObj =
//             {
//               "errorInfo" : "Error in setting the actions to columns.",
//               "errorLevel" : "Business",
//               "error": err
//             };
//         self.onError(errorObj);
//       }
//     },
//     displayResults: function(response){
//       var data = response.GetSimpleData_Response_2 && response.GetSimpleData_Response_2.SimpleDataResult ? response.GetSimpleData_Response_2.SimpleDataResult.ItemResponse[0].Item : null;
//       this.setDataMarket(data);
//     },
//     setDataMarket: function  (newsDetails) {
//       var segData = [];

//       var inresult = [];
//       var innerdata = {};
//       if(newsDetails && newsDetails.length > 0) {
//         for (var i in newsDetails) {
//           var subArray = [];
//           subArray = newsDetails[i].Fields.Field;
//           innerdata = {};
//           for (var j in subArray) {
//             var dt = subArray[j].DataType;
//             var value = subArray[j][dt];
//             var keyA = subArray[j].Name;

//             innerdata[keyA] = value;
//           }
//           inresult.push(innerdata);
//         }
//         var storeData;
//         for (var list in inresult) {
//           var change = inresult[list].CF_NETCHNG;
//           var percent = parseFloat(inresult[list].PCTCHNG).toFixed(2);
//           var forUtility = applicationManager.getFormatUtilManager();
//           var balance = forUtility.formatAmount(inresult[list].CF_LAST);
//           if (parseFloat(inresult[list].CF_NETCHNG) < 0) {
//             storeData = {
//               //marketName: this.FormatUtils.truncateStringWithGivenLength(inresult[list].DSPLY_NAME, 9),
//               marketName: {
//                 "text" : this.FormatUtils.truncateStringWithGivenLength(inresult[list].DSPLY_NAME, 13),
//               },
//               amount: balance,
//               profitLoss: {
//                 "skin": "sknEE0005SSP13px",
//                 "text": parseFloat(change).toFixed(2) + " (" + parseFloat(percent).toFixed(2) + "%" + ")"
//               },
//             }
//           } else {
//             storeData = {
//               //marketName: this.FormatUtils.truncateStringWithGivenLength(inresult[list].DSPLY_NAME, 9),
//               marketName: {
//                 "text" : this.FormatUtils.truncateStringWithGivenLength(inresult[list].DSPLY_NAME, 13),
//               },
//               amount: balance,
//               profitLoss: {
//                 "skin": "skn2F8523ssp13px",
//                 "text": "+" + parseFloat(change).toFixed(2) + " (" + "+" + parseFloat(percent).toFixed(2) + "%" + ")"
//               },

//             }
//           }
//           segData.push(storeData);
//         }
//         this.view.lblTitle.text= segData[0].marketName.text;
//         this.view.lblChange.text= segData[0].profitLoss.text;
//         this.view.lblChange.skin= segData[0].profitLoss.skin;
//         this.view.lblValue.text= segData[0].amount;
//         this.view.CopylblTitle0ef672967b4ee42.text= segData[1].marketName.text;
//         this.view.CopylblChange0aaa00601b36246.text= segData[1].profitLoss.text;
//         this.view.CopylblChange0aaa00601b36246.skin= segData[1].profitLoss.skin;
//         this.view.CopylblValue0c1edac75bf5448.text= segData[1].amount;
//         this.view.CopylblTitle0b7443f112ccb43.text= segData[2].marketName.text;
//         this.view.CopylblChange0fb3be785321d42.text= segData[2].profitLoss.text;
//         this.view.CopylblChange0fb3be785321d42.skin= segData[2].profitLoss.skin;
//         this.view.CopylblValue0idfe1df65b1042.text= segData[2].amount;
//       } else {
//         this.view.setVisibility(false);
//         this.marketIndexPostShow();
//       }
//     },
//     ViewAllMarketNews:function(){  
//       let wealthModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WealthPortfolioUIModule", "appName" : "PortfolioManagementMA"}).presentationController;	  
//       //let wealthModule = applicationManager.getModulesPresentationController("WealthModule");
//       wealthModule.fetchNewsDetails();

//     },
//     setViewAllBtn: function(){
//       if (this._viewAllBtnStatus === "visible" && this._newsDetailsPerm === true) {
//         this.view.flxView.setVisibility(true);
//       } else {
//         this.view.flxView.setVisibility(false);
//       }

//     }
  };
});