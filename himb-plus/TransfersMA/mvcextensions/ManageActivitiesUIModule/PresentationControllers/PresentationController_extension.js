define(['CommonUtilities', 'OLBConstants', 'ViewConstants'], function(CommonUtilities, OLBConstants, ViewConstants){
   frmScheduledPaymentsEur = "frmScheduledPaymentsEurNew";
   frmPastPaymentsEur = "frmPastPaymentsEurNew";
   return {
   getPastPayments : function(sortingData) {
    applicationManager.getNavigationManager().navigateTo({
            "appName": "TransfersMA",
            "friendlyName": frmPastPaymentsEur
        }
      );
    //this.fetchPastPayments(sortingData);
  },
updateCancelPaymentErrorCallBack : function(response) {
  this.hideProgressBar();
  this.showView({"appName": "TransfersMA","friendlyName": frmScheduledPaymentsEur}, {
      "serverError": response.errorMessage
  });
},

        getConsentdetails:function(param){
               var termsAndConditions = applicationManager.getTermsAndConditionsManager();
               termsAndConditions.fetchConsents(param,this.getConsentsdetailsSuccessCallBack,this.getConsentsdetailsErrorCallback);
             },
             getConsentsdetailsSuccessCallBack : function(response){
                //var navManager = applicationManager.getNavigationManager();
                //navManager.setCustomInfo("defaultAccountId", response.defaultAccount);
                //applicationManager.getNavigationManager().navigateTo("frmCBCLanding");
                applicationManager.getNavigationManager().updateForm({
                    "Consent": response
                },"frmCBCLanding");
                
               //var navManager = applicationManager.getNavigationManager();
                //navManager.setCustomInfo("frmTermsAndCondition",{"content":response.termsAndConditionsContent,"flowType":"Enroll"});
               //navManager.setCustomInfo("frmTermsAndCondition",{"content":response.termsAndConditionsContent,"flowType":"Enroll","contentTypeID":response.contentTypeId});
               
              },
              getConsentsdetailsErrorCallback : function(err){
                 applicationManager.getPresentationUtility().dismissLoadingScreen();
                    if (err["isServerUnreachable"]) {
                    applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
                   }else{
                         var controller = applicationManager.getPresentationUtility().getController('frmEnrollSSn', true);
                       var errorMsg = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.enroll.SomethingWrong");
                       controller.bindViewError(errorMsg);
                   }
              },
              getConsentdetail:function(param){
                var termsAndConditions = applicationManager.getTermsAndConditionsManager();
                termsAndConditions.fetchConsent(param,this.getConsentdetailSuccessCallBack,this.getConsentdetailErrorCallback);
              },
              getConsentdetailSuccessCallBack : function(response){
                if (response && response.MFAAttributes) {
                    applicationManager.getNavigationManager().setCustomInfo("MFAFlowName","CrossBorder");
                    if (response.MFAAttributes.isMFARequired == "true") {
                        var mfaJSON = {
                            "flowType": "CROSSBORDERUPDATE",
                            "response": response
                        };
                        applicationManager.getMFAManager().initMFAFlow(mfaJSON);
                    }
                }
                else{
                    if(response.httpStatusCode=="200" && response.responseCode =="000"){
                        applicationManager.getNavigationManager().navigateTo({
                            "appName": "TransfersMA",
                            "friendlyName": "UnifiedTransferFlowUIModule/frmCBCSuccess"
                        });
                        var navManager = applicationManager.getNavigationManager();
                        navManager.setCustomInfo("context",response.responseData)
                        applicationManager.getNavigationManager().updateForm({
                          "successresponse": response.responseData
                      },"frmCBCSuccess");
                    }
                    else{
                        applicationManager.getNavigationManager().navigateTo({
                            "appName": "TransfersMA",
                            "friendlyName": "UnifiedTransferFlowUIModule/frmCBCLanding"
                        });
                        applicationManager.getNavigationManager().updateForm({
                            "Failureresponse": response
                        },"frmCBCLanding");
                    }
                }
                 
                //var navManager = applicationManager.getNavigationManager();
                 //navManager.setCustomInfo("frmTermsAndCondition",{"content":response.termsAndConditionsContent,"flowType":"Enroll"});
                //navManager.setCustomInfo("frmTermsAndCondition",{"content":response.termsAndConditionsContent,"flowType":"Enroll","contentTypeID":response.contentTypeId});
                
               },
               getConsentdetailErrorCallback : function(err){
                applicationManager.getNavigationManager().navigateTo({
                    "appName": "TransfersMA",
                    "friendlyName": "UnifiedTransferFlowUIModule/frmCBCLanding"
                });
                applicationManager.getNavigationManager().updateForm({
                    "Failureresponse": err
                }, "frmCBCLanding");
               },

               createConsentDetails:function(param){
                var termsAndConditions = applicationManager.getTermsAndConditionsManager();
                termsAndConditions.createConsent(param,this.createConsentsdetailsSuccessCallBack,this.createConsentsdetailsErrorCallback);
              },
              createConsentsdetailsSuccessCallBack: function(response) {
              if (response && response.MFAAttributes) {
                if (response.MFAAttributes.isMFARequired == "true") {
                    applicationManager.getNavigationManager().setCustomInfo("MFAFlowName","CrossBorder");
                    var mfaJSON = {
                        "flowType": "CROSSBORDERCREATE",
                        "response": response
                    };
                    applicationManager.getMFAManager().initMFAFlow(mfaJSON);
                }
            } else {
                if (response.httpStatusCode == "200" && response.responseCode == "000") {
                    applicationManager.getNavigationManager().navigateTo({
                        "appName": "TransfersMA",
                        "friendlyName": "UnifiedTransferFlowUIModule/frmCBCSuccess"
                    });
                    var navManager = applicationManager.getNavigationManager();
                    navManager.setCustomInfo("context", response.responseData)
                    applicationManager.getNavigationManager().updateForm({
                        "successresponse": response.responseData
                    }, "frmCBCSuccess");
                } else {
                    applicationManager.getNavigationManager().navigateTo({
                        "appName": "TransfersMA",
                        "friendlyName": "UnifiedTransferFlowUIModule/frmCBCLanding"
                    });
                    applicationManager.getNavigationManager().updateForm({
                        "CreateFailureresponse": response
                    }, "frmCBCLanding");
                }
            }
        },
        createConsentsdetailsErrorCallback: function(err) {
            applicationManager.getNavigationManager().navigateTo({
                "appName": "TransfersMA",
                "friendlyName": "UnifiedTransferFlowUIModule/frmCBCLanding"
            });
            applicationManager.getNavigationManager().updateForm({
                "CreateFailureresponse": err
            }, "frmCBCLanding");
        },
               getAccListDetails:function(param){
                kony.application.showLoadingScreen();
                var termsAndConditions = applicationManager.getTermsAndConditionsManager();
                termsAndConditions.getAccList(param,this.accListdetailsSuccessCallBack,this.accListdetailsErrorCallback);
              },
              accListdetailsSuccessCallBack : function(response){
                    kony.application.dismissLoadingScreen();
                    applicationManager.getNavigationManager().updateForm({
                        "AccListSuccess": response
                    },"frmCBCLanding");
               },
               accListdetailsErrorCallback : function(err){
                    kony.application.dismissLoadingScreen();
                     if (err["isServerUnreachable"]) {
                     applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
                    }else{
                          var controller = applicationManager.getPresentationUtility().getController('frmEnrollSSn', true);
                        var errorMsg = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.enroll.SomethingWrong");
                        controller.bindViewError(errorMsg);
                    }
               },
               getconsentResponse:function(response){
                /*
                applicationManager.getNavigationManager().navigateTo({
                    "appName": "TransfersMA",
                    "friendlyName": "UnifiedTransferFlowUIModule/frmCBCLanding"
                });
                applicationManager.getNavigationManager().navigateTo("frmCBCLanding");
                applicationManager.getNavigationManager().updateForm({
                    "Consentstatus": response
                },"frmCBCLanding");*/
                kony.application.dismissLoadingScreen();
                if (response.httpStatusCode == "200" && response.responseCode == "000") {
                    applicationManager.getNavigationManager().navigateTo({
                        "appName": "TransfersMA",
                        "friendlyName": "UnifiedTransferFlowUIModule/frmCBCSuccess"
                    });
                    var navManager = applicationManager.getNavigationManager();
                    navManager.setCustomInfo("context", response.responseData)
                    applicationManager.getNavigationManager().updateForm({
                        "successresponse": response.responseData
                    }, "frmCBCSuccess");
                }
                else{
                    applicationManager.getNavigationManager().navigateTo({
                        "appName": "TransfersMA",
                        "friendlyName": "UnifiedTransferFlowUIModule/frmCBCLanding"
                    });
                    applicationManager.getNavigationManager().updateForm({
                        "Failureresponse": response
                    },"frmCBCLanding");
                }
               },
               createDetails: function( data) {
                kony.application.dismissLoadingScreen();
                if (data && data.MFAAttributes) {
                    if (data.MFAAttributes.isMFARequired == "true") {
                        var mfaJSON = {
                            "flowType": "INTERNATIONALTRANSFER",
                            "response": data
                        };
                        applicationManager.getMFAManager().initMFAFlow(mfaJSON);
                    }
                } else {
                    if (data.httpStatusCode == "200" && data.responseCode == "000") {
                        applicationManager.getNavigationManager().navigateTo({
                            "appName": "TransfersMA",
                            "friendlyName": "UnifiedTransferFlowUIModule/frmUTFInternationalTransferAcknowledgement"
                        });
                        var navManager = applicationManager.getNavigationManager();
                        navManager.setCustomInfo("int_response", data.responseData)
                        applicationManager.getNavigationManager().updateForm({
                            "internationSuccessResponse": data.responseData
                        }, "frmUTFInternationalTransferAcknowledgement");
        
                    } else {
                        applicationManager.getNavigationManager().navigateTo({
                            "appName": "TransfersMA",
                            "friendlyName": "UnifiedTransferFlowUIModule/frmUTFInternationalTransfer"
                        });
                        applicationManager.getNavigationManager().updateForm({
                            "FailureCreateresponse": data
                        }, "frmUTFInternationalTransfer");
                    }
                }
            },
            interBankDomesticDetailsSuccess:function(data){
                kony.application.dismissLoadingScreen();
                if (data && data.MFAAttributes) {
                    if (data.MFAAttributes.isMFARequired == "true") {
                        var mfaJSON = {
                            "flowType": "INTERBANKDOMESTICTRANSFER",
                            "response": data
                        };
                        applicationManager.getMFAManager().initMFAFlow(mfaJSON);
                    }
                } else {
                    if (data.referenceId !=null && data.referenceId !=undefined && data.status=="success") {

                        applicationManager.getNavigationManager().navigateTo({
                            "appName": "TransfersMA",
                            "friendlyName": "UnifiedTransferFlowUIModule/frmUTFDomesticTransferConfirmation"
                        });
                        var navManager = applicationManager.getNavigationManager();
                        navManager.setCustomInfo("withInSameBank_response", data)
                        applicationManager.getNavigationManager().updateForm({
                            "interBankDomesticTransferSuccess": data
                        }, "frmUTFDomesticTransferConfirmation");
                    } else {
                        applicationManager.getNavigationManager().navigateTo({
                            "appName": "TransfersMA",
                            "friendlyName": "UnifiedTransferFlowUIModule/frmUTFDomesticTransfer"
                        });
                        applicationManager.getNavigationManager().updateForm({
                            "FailureTransferResponse": data
                        }, "frmUTFDomesticTransfer");
                    }
                }
            },
            interBankDomesticDetailsError: function(data) {
                kony.application.dismissLoadingScreen();
                if (data && data.MFAAttributes) {
                    if (data.MFAAttributes.isMFARequired == "true") {
                        var mfaJSON = {
                            "flowType": "INTERBANKDOMESTICTRANSFER",
                            "response": data
                        };
                        applicationManager.getMFAManager().initMFAFlow(mfaJSON);
                    }
                } else {
                        applicationManager.getNavigationManager().navigateTo({
                            "appName": "TransfersMA",
                            "friendlyName": "UnifiedTransferFlowUIModule/frmUTFDomesticTransfer"
                        });
                        applicationManager.getNavigationManager().updateForm({
                            "FailureTransferResponse": data
                        }, "frmUTFDomesticTransfer");
                    
                }
            },
            withInSameBankDetails: function(data) {
                kony.application.dismissLoadingScreen();
                if (data && data.MFAAttributes) {
                    if (data.MFAAttributes.isMFARequired == "true") {
                        var mfaJSON = {
                            "flowType": "WITHINSAMEBANK",
                            "response": data
                        };
                        applicationManager.getMFAManager().initMFAFlow(mfaJSON);
                    }
                } else {
                    if (data.referenceId !=null && data.referenceId !=undefined && data.status=="Sent") {

                        applicationManager.getNavigationManager().navigateTo({
                            "appName": "TransfersMA",
                            "friendlyName": "UnifiedTransferFlowUIModule/frmUTFSameBankTransferConfirmation"
                        });
                        var navManager = applicationManager.getNavigationManager();
                        navManager.setCustomInfo("withInSameBank_response", data)
                        applicationManager.getNavigationManager().updateForm({
                            "sameBankTransferSuccess": data
                        }, "frmUTFSameBankTransferConfirmation");
                    } else {
                        applicationManager.getNavigationManager().navigateTo({
                            "appName": "TransfersMA",
                            "friendlyName": "UnifiedTransferFlowUIModule/frmUTFSameBankTransfer"
                        });
                        applicationManager.getNavigationManager().updateForm({
                            "FailureCreateresponse": data
                        }, "frmUTFSameBankTransfer");
                    }
                }
            },
            sameBankTransferError: function(data) {
                kony.application.dismissLoadingScreen();
                if (data && data.MFAAttributes) {
                    if (data.MFAAttributes.isMFARequired == "true") {
                        var mfaJSON = {
                            "flowType": "WITHINSAMEBANK",
                            "response": data
                        };
                        applicationManager.getMFAManager().initMFAFlow(mfaJSON);
                    }
                } else {
                        applicationManager.getNavigationManager().navigateTo({
                            "appName": "TransfersMA",
                            "friendlyName": "UnifiedTransferFlowUIModule/frmUTFSameBankTransfer"
                        });
                        applicationManager.getNavigationManager().updateForm({
                            "FailureTransferResponse": data
                        }, "frmUTFSameBankTransfer");
                    
                }
            },
            internationalTransferError: function(data) {
                kony.application.dismissLoadingScreen();
                if (data && data.MFAAttributes) {
                    if (data.MFAAttributes.isMFARequired == "true") {
                        var mfaJSON = {
                            "flowType": "INTERNATIONALTRANSFER",
                            "response": data
                        };
                        applicationManager.getMFAManager().initMFAFlow(mfaJSON);
                    }
                } else {
                    applicationManager.getNavigationManager().navigateTo({
                        "appName": "TransfersMA",
                        "friendlyName": "UnifiedTransferFlowUIModule/frmUTFInternationalTransfer"
                    });
                    applicationManager.getNavigationManager().updateForm({
                        "FailureCreateresponse": data
                    }, "frmUTFInternationalTransfer");
                }
            },
            intraBankDomesticSuccessDetails: function(data) {
                kony.application.dismissLoadingScreen();
                if (data && data.MFAAttributes) {
                    if (data.MFAAttributes.isMFARequired == "true") {
                        var mfaJSON = {
                            "flowType": "INTRABANKDOMESTICTRANSFER",
                            "response": data
                        };
                        applicationManager.getMFAManager().initMFAFlow(mfaJSON);
                    }
                } else {
                    if (data.referenceId !=null && data.referenceId !=undefined && data.status=="Sent") {

                        applicationManager.getNavigationManager().navigateTo({
                            "appName": "TransfersMA",
                            "friendlyName": "UnifiedTransferFlowUIModule/frmUTFDomesticTransferConfirmation"
                        });
                        var navManager = applicationManager.getNavigationManager();
                        navManager.setCustomInfo("DomesticTransfers_response", data)
                        applicationManager.getNavigationManager().updateForm({
                            "IntraBankDomesticTransferSuccess": data
                        }, "frmUTFDomesticTransferConfirmation");
                    } else {
                        applicationManager.getNavigationManager().navigateTo({
                            "appName": "TransfersMA",
                            "friendlyName": "UnifiedTransferFlowUIModule/frmUTFDomesticTransfer"
                        });
                        applicationManager.getNavigationManager().updateForm({
                            "FailureCreateresponse": data
                        }, "frmUTFDomesticTransfer");
                    }
                }
            },
            intraBankDomesticTransferError: function(data) {
                kony.application.dismissLoadingScreen();
                if (data && data.MFAAttributes) {
                    if (data.MFAAttributes.isMFARequired == "true") {
                        var mfaJSON = {
                            "flowType": "INTRABANKDOMESTICTRANSFER",
                            "response": data
                        };
                        applicationManager.getMFAManager().initMFAFlow(mfaJSON);
                    }
                } else {
                        applicationManager.getNavigationManager().navigateTo({
                            "appName": "TransfersMA",
                            "friendlyName": "UnifiedTransferFlowUIModule/frmUTFDomesticTransfer"
                        });
                        applicationManager.getNavigationManager().updateForm({
                            "FailureTransferResponse": data
                        }, "frmUTFDomesticTransfer");
                    
                }
            },
               showPrintPage : function(crossborder) {
                applicationManager.getNavigationManager().navigateTo({
                    "appName": "CommonsMA",
                    "friendlyName": "frmPrintTransfer"
                });
                applicationManager.getNavigationManager().updateForm({
                    "CrossBorderSuccess": crossborder
                },"frmPrintTransfer");
            },
            
            getFixedDepositTandC: function() {
                var config = applicationManager.getConfigurationManager();
                var locale = config.getLocale();
                var termsAndConditions = config.getTermsAndConditions();
                var param = {
                    "languageCode": termsAndConditions[locale],
                    "termsAndConditionsCode": "Fixed_deposit"
                };
                var termsAndConditions = applicationManager.getTermsAndConditionManager();
                termsAndConditions.fetchTermsAndConditionsPostLogin(param, this.getTandCPostFDSuccessCallBack, this.getTandCPostFDErrorCallback);
            },

            getTandCPostFDSuccessCallBack: function(response) {
                // applicationManager.getNavigationManager().navigateTo("frmActivateThirdParty");
                applicationManager.getNavigationManager().navigateTo({
                    "appName": "TransfersMA",
                    "friendlyName": "UnifiedTransferFlowUIModule/frmRequestFixedDeposit"
                });
                applicationManager.getNavigationManager().updateForm({
                    "TnCFD": response
                }, "frmRequestFixedDeposit");
                var navManager = applicationManager.getNavigationManager();
                navManager.setCustomInfo("frmTermsAndCondition", {
                    "content": response.termsAndConditionsContent,
                    "flowType": "FixedDeposit",
                    "contentTypeID": response.contentTypeId
                });
            },
            getTandCPostFDErrorCallback: function(err) {
                applicationManager.getPresentationUtility().dismissLoadingScreen();
                if (err["isServerUnreachable"]) {
                    applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
                } else {
                    // var controller = applicationManager.getPresentationUtility().getController('frmEnrollSSn', true);
                    // var errorMsg = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.enroll.SomethingWrong");
                    // controller.bindViewError(errorMsg);
                }
            },
            showPrintPages : function(FDPrint) {
                applicationManager.getNavigationManager().navigateTo({
                    "appName": "CommonsMA",
                    "friendlyName": "frmPrintTransfer"
                });
                applicationManager.getNavigationManager().updateForm({
                    "FDSuccess": FDPrint
                },"frmPrintTransfer");
            },
            createFixedDepositWithNonSTP:function(param){
                kony.application.showLoadingScreen();
                var termsAndConditions = applicationManager.getTermsAndConditionsManager();
                termsAndConditions.createFixedDepositeWithNonSTP(param,this.createFixedDepositWithNonSTPSuccessCallBack,this.createFixedDepositWithNonSTPErrorCallback);
              },
              createFixedDepositWithNonSTPSuccessCallBack: function(response) {
                kony.application.dismissLoadingScreen();
                if (response && response.MFAAttributes) {
                    if (response.MFAAttributes.isMFARequired == "true") {
                        var mfaJSON = {
                            "flowType": "FIXEDDEPOSITWITHNONSTP",
                            "response": response
                        };
                        applicationManager.getMFAManager().initMFAFlow(mfaJSON);
                    }
                } else {
                if (response.status =="success" && response.transactionStatus == "Unapproved") {
                    applicationManager.getNavigationManager().navigateTo({
                        "appName": "TransfersMA",
                        "friendlyName": "UnifiedTransferFlowUIModule/frmRequestFDAcknowledgement"
                    });
                    var navManager = applicationManager.getNavigationManager();
                    navManager.setCustomInfo("FDResponse", response)
                    applicationManager.getNavigationManager().updateForm({
                        "successresponse": response
                    }, "frmRequestFDAcknowledgement");
                } else {
                    applicationManager.getNavigationManager().updateForm({
                        "Failureresponse": response
                    }, "frmRequestFixedDeposit");
                }
            }
        },
        createFixedDepositWithNonSTPErrorCallback: function(err) {
            kony.application.dismissLoadingScreen();
            applicationManager.getNavigationManager().navigateTo({
                "appName": "TransfersMA",
                "friendlyName": "UnifiedTransferFlowUIModule/frmRequestFixedDeposit"
            });
            applicationManager.getNavigationManager().updateForm({
                "Failureresponse": err
            }, "frmRequestFixedDeposit");
        },


        createFixedDepositWithSTP:function(param){
            kony.application.showLoadingScreen();
            var termsAndConditions = applicationManager.getTermsAndConditionsManager();
            termsAndConditions.createFixedDepositeWithSTP(param,this.createFixedDepositWithSTPSuccessCallBack,this.createFixedDepositWithSTPErrorCallback);
          },
          createFixedDepositWithSTPSuccessCallBack: function(response) {
            kony.application.dismissLoadingScreen();
          if (response && response.MFAAttributes) {
            if (response.MFAAttributes.isMFARequired == "true") {
                var mfaJSON = {
                    "flowType": "FIXEDDEPOSITWITHSTP",
                    "response": response
                };
                applicationManager.getMFAManager().initMFAFlow(mfaJSON);
            }
        } else {
            if (response.transactionStatus == "Live" && response.httpStatusCode =="200") {
                applicationManager.getNavigationManager().navigateTo({
                    "appName": "TransfersMA",
                    "friendlyName": "UnifiedTransferFlowUIModule/frmRequestFDAcknowledgement"
                });
                var navManager = applicationManager.getNavigationManager();
                navManager.setCustomInfo("FDResponse", response)
                applicationManager.getNavigationManager().updateForm({
                    "successresponse": response
                }, "frmRequestFDAcknowledgement");
            } else {
                applicationManager.getNavigationManager().navigateTo({
                    "appName": "TransfersMA",
                    "friendlyName": "UnifiedTransferFlowUIModule/frmRequestFixedDeposit"
                });
                applicationManager.getNavigationManager().updateForm({
                    "Failureresponse": response
                }, "frmRequestFixedDeposit");
            }
          }
    },
    createFixedDepositWithSTPErrorCallback: function(err) {
        kony.application.dismissLoadingScreen();
        applicationManager.getNavigationManager().navigateTo({
            "appName": "TransfersMA",
            "friendlyName": "UnifiedTransferFlowUIModule/frmRequestFixedDeposit"
        });
        applicationManager.getNavigationManager().updateForm({
            "Failureresponse": err
        }, "frmRequestFixedDeposit");
    },
    
    getInterestRate:function(param){
        kony.application.showLoadingScreen();
        var termsAndConditions = applicationManager.getTermsAndConditionsManager();
        termsAndConditions.getInterestRateDetail(param,this.getInterestRateSuccessCallBack,this.getInterestRateErrorCallback);
      },
      getInterestRateSuccessCallBack: function(response) {
        kony.application.dismissLoadingScreen();
        if (response.opstatus == "0" && response.httpStatusCode =="200") {
            applicationManager.getNavigationManager().updateForm({
                "interestSuccessResponse": response
            }, "frmRequestFixedDeposit");
        } else {
            applicationManager.getNavigationManager().updateForm({
                "interestFailureresponse": response
            }, "frmRequestFixedDeposit");
        }
    },
    getInterestRateErrorCallback: function(err) {
        kony.application.dismissLoadingScreen();
        applicationManager.getNavigationManager().navigateTo({
            "appName": "TransfersMA",
            "friendlyName": "UnifiedTransferFlowUIModule/frmRequestFixedDeposit"
        });
        applicationManager.getNavigationManager().updateForm({
            "interestFailureresponse": err
        }, "frmRequestFixedDeposit");
    },
    getAccVPADetails:function(param){
        kony.application.showLoadingScreen();
        var termsAndConditions = applicationManager.getTermsAndConditionsManager();
        termsAndConditions.getAccountVPADetails(param,this.getAccountVPADetailsSuccessCallBack,this.getAccountVPADetailsErrorCallback);
      },
      getAccountVPADetailsSuccessCallBack : function(response){
        kony.application.dismissLoadingScreen();
        applicationManager.getNavigationManager().updateForm({
            "AccListSuccess": response
        },"frmCBCLanding");
   },
   getAccountVPADetailsErrorCallback : function(err){
        kony.application.dismissLoadingScreen();
        applicationManager.getNavigationManager().updateForm({
            "Failureresponse": err
        },"frmCBCLanding");
   },

   getFixedDepositTenureIntrest:function(param){
        kony.application.showLoadingScreen();
        var termsAndConditions = applicationManager.getTermsAndConditionsManager();
        termsAndConditions.getFixedDepositTenureIntrestdetails(param,this.getFixedDepositTenureIntrestdetailsSuccessCallBack,this.getFixedDepositTenureIntrestdetailsErrorCallback);
  },
  getFixedDepositTenureIntrestdetailsSuccessCallBack : function(response){
    kony.application.dismissLoadingScreen();
    if (response.opstatus == "0" && response.httpStatusCode =="200") {
        applicationManager.getNavigationManager().updateForm({
            "FixedDepositTenureSuccessResponse": response
        }, "frmRequestFixedDeposit");
    } else {
        applicationManager.getNavigationManager().updateForm({
            "interestFailureresponse": response
        }, "frmRequestFixedDeposit");
    }
},
getFixedDepositTenureIntrestdetailsErrorCallback : function(err){
    kony.application.dismissLoadingScreen();
        applicationManager.getNavigationManager().navigateTo({
            "appName": "TransfersMA",
            "friendlyName": "UnifiedTransferFlowUIModule/frmRequestFixedDeposit"
        });
        applicationManager.getNavigationManager().updateForm({
            "interestFailureresponse": err
        }, "frmRequestFixedDeposit");
},
     getAccountList:function(param){
        kony.application.showLoadingScreen();
        var termsAndConditions = applicationManager.getTermsAndConditionsManager();
        termsAndConditions.getAccList(param,this.getAccountListSuccessCallBack,this.getAccountListErrorCallback);
      },
      getAccountListSuccessCallBack : function(response){
        kony.application.dismissLoadingScreen();
        applicationManager.getNavigationManager().updateForm({
            "AccListSuccess": response
        },"frmLoadEsewa");
   },
   getAccountListErrorCallback : function(err){
        kony.application.dismissLoadingScreen();
        applicationManager.getNavigationManager().updateForm({
            "Failureresponse": err
        },"frmLoadEsewa");
   },
   getValidationEsewaId : function(param){
         kony.application.showLoadingScreen();
        var termsAndConditions = applicationManager.getTermsAndConditionsManager();
        termsAndConditions.getValidationEsewaIds(param,this.getValidationEsewaIdSuccessCallBack,this.getValidationEsewaIdErrorCallback);
   },
   getValidationEsewaIdSuccessCallBack : function(response){
    if(response.code =="0"&& response.success =="true"){
        applicationManager.getNavigationManager().updateForm({
                "validationEsewaIdSuccess": response
            },"frmLoadEsewa");
        }else{
            applicationManager.getNavigationManager().updateForm({
                "validateFailureresponse": response
            },"frmLoadEsewa");
        }
   },
   getValidationEsewaIdErrorCallback : function(err){
        kony.application.dismissLoadingScreen();
        applicationManager.getNavigationManager().updateForm({
            "Failureresponse": err
        },"frmLoadEsewa");
   },   
   getEsewaFees : function(){
         kony.application.showLoadingScreen();
        var termsAndConditions = applicationManager.getTermsAndConditionsManager();
        termsAndConditions.getEsewaFeesValues(true,this.getEsewaFeesValueSuccessCallBack,this.getEsewaFeesValueIdErrorCallback);
   },
   getEsewaFeesValueSuccessCallBack : function(response){
        applicationManager.getNavigationManager().updateForm({
            "getEsewaFees": response
        },"frmLoadEsewa");
        
   },
   getEsewaFeesValueIdErrorCallback : function(err){
        applicationManager.getNavigationManager().updateForm({
            "Failureresponse": err
        },"frmLoadEsewa");
   },  
   loadeSewaAmount: function(param,data) {
            kony.application.showLoadingScreen();
            var termsAndConditions = applicationManager.getTermsAndConditionsManager();
            termsAndConditions.eSewaAmountLoad(param, this.geteSewaAmountLoadSuccessCallBack.bind(this,data), this.geteSewaAmountLoadErrorCallback);
        },
        geteSewaAmountLoadSuccessCallBack: function(data,response) {
            kony.application.dismissLoadingScreen();
             var res = {
                "response": response,
                "data": data
            }
            applicationManager.getNavigationManager().navigateTo({
                "appName": "TransfersMA",
                "friendlyName": "UnifiedTransferFlowUIModule/frmLoadEsewaAck"
            });
            var navManager = applicationManager.getNavigationManager();
            navManager.setCustomInfo("eSewaAmountLoadSuccess", res);
            applicationManager.getNavigationManager().updateForm({
                "eSewaAmountLoadSuccess": res
            }, "frmLoadEsewaAck");
        },
   geteSewaAmountLoadErrorCallback : function(err){
        kony.application.dismissLoadingScreen();
        applicationManager.getNavigationManager().navigateTo({
                "appName": "TransfersMA",
                "friendlyName": "UnifiedTransferFlowUIModule/frmLoadEsewa"
            });
        applicationManager.getNavigationManager().updateForm({
            "loadeSewaFailureresponse": err
        },"frmLoadEsewa");
   },
   eSewaIntraBankTransfer : function(param, data){
        kony.application.showLoadingScreen();
        var termsAndConditions = applicationManager.getTermsAndConditionsManager();
        termsAndConditions.eSewaIntraBankTransfers(param,this.eSewaIntraBankTransferSuccess.bind(this,data),this.eSewaIntraBankTransferError.bind(this));
    },
    eSewaIntraBankTransferSuccess: function(response,data) {
		var res ={
					"response":response,
					"data":data
				}
        applicationManager.getNavigationManager().navigateTo({
             "appName": "TransfersMA",
             "friendlyName": "UnifiedTransferFlowUIModule/frmLoadEsewaConfirm"
        });
        var navManager = applicationManager.getNavigationManager();
        navManager.setCustomInfo("eSewaValidSuccess", res);
        applicationManager.getNavigationManager().updateForm({
                "validationEsewaIdSuccess": res
            },"frmLoadEsewaConfirm");
		},
		eSewaIntraBankTransferError: function(errorMessage) {
		    applicationManager.getNavigationManager().updateForm({
                "Failureresponse": errorMessage
            },"frmLoadEsewa");
		},
    eSewaIntraBankTransferService : function(param){
        kony.application.showLoadingScreen();
        var termsAndConditions = applicationManager.getTermsAndConditionsManager();
        termsAndConditions.eSewaIntraBankTransfers(param,this.eSewaIntraBankTransferFinalSuccess.bind(this),this.eSewaIntraBankTransferFinalError.bind(this));
    },
    eSewaIntraBankTransferFinalSuccess: function(response) {
        var mfaManager = applicationManager.getMFAManager();
        applicationManager.getNavigationManager().setCustomInfo("MFAFlowName", "LOAD_ESEWA");
            if (response.MFAAttributes && response.MFAAttributes.isMFARequired) {
                        var mfaJSON = {
                            "serviceName": mfaManager.getServiceId(),
                            "flowType": "LOAD_ESEWA",
                            "response": response
                        };
                        applicationManager.getMFAManager().initMFAFlow(mfaJSON);
                    }
            else{
                applicationManager.getNavigationManager().navigateTo({
                    "appName": "TransfersMA",
                    "friendlyName": "UnifiedTransferFlowUIModule/frmLoadEsewaConfirm"
                });
                applicationManager.getNavigationManager().updateForm({
                    "intraBankEsewaSuccess": response
                },"frmLoadEsewaConfirm");
            }
				
		},
		eSewaIntraBankTransferFinalError: function(errorMessage) {
			kony.application.dismissLoadingScreen();
            applicationManager.getNavigationManager().navigateTo({
                    "appName": "TransfersMA",
                    "friendlyName": "UnifiedTransferFlowUIModule/frmLoadEsewa"
                });
        applicationManager.getNavigationManager().updateForm({
            "intraBankFailureResponse": errorMessage
        },"frmLoadEsewa");
		},
        geteSewaTransferActivities : function(){
            kony.application.showLoadingScreen();
            var termsAndConditions = applicationManager.getTermsAndConditionsManager();
            termsAndConditions.geteSewaActivities(true,this.geteSewaActivitiesSuccess,this.geteSewaActivitiesError);
        },
        geteSewaActivitiesSuccess : function(response){
            applicationManager.getNavigationManager().updateForm({
            "transactionActivity": response
            },"frmLoadeSewaTranfersActivity");
        },
        geteSewaActivitiesError : function(err){
            kony.application.dismissLoadingScreen();
            applicationManager.getNavigationManager().updateForm({
            "Failureresponse": err
        },"frmLoadeSewaTranfersActivity");
        },

        generatePdf : function(param){
            kony.application.showLoadingScreen();
            var termsAndConditions = applicationManager.getTermsAndConditionsManager();
            termsAndConditions.generateeSewaPdf(param,this.generateeSewaPdfSuccess,this.generateeSewaPdfError);
        },
        generateeSewaPdfSuccess : function(response){
            kony.application.dismissLoadingScreen();
            if(response.fileId != "" ){
                var mfURL = KNYMobileFabric.mainRef.config.services_meta.DocumentManagement.url;
                var pdfurl = mfURL + "/objects/DownloadTransactionReport?fileId=" + response.fileId;
                var data = {
                    "url": pdfurl
                };
                CommonUtilities.downloadFile(data);
            }
        },
        generateeSewaPdfError : function(err){
            kony.application.dismissLoadingScreen();
            applicationManager.getNavigationManager().updateForm({
            "Failureresponse": err
			},"frmLoadeSewaTranfersActivity");
        },
			
		downloadReport : function(transactionObj,frm) {
			this.showProgressBar();
			let params = {
				"transactionType": transactionObj.frequencyType || transactionObj.frequency,
				"transactionId": transactionObj.transactionId ||  transactionObj.referenceId,
				"contentType": "pdf",
				"paymentType": transactionObj.paymentType
			};
			applicationManager.getTransactionManager().DownloadTransactionPDF(params, this.downloadReportSuccess.bind(this),this.downloadReportFailure.bind(this,frm));
			this.hideProgressBar();
		}
	};
    
});