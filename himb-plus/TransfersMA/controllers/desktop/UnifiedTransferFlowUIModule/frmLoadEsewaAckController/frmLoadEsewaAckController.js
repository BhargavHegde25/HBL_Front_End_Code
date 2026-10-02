define({ 
     init: function() {
        var scope = this;
        navManager = applicationManager.getNavigationManager();
        var response = navManager.getCustomInfo("eSewaAmountLoadSuccess");
        scope.ackScreen(response);
        // scope.view.imgPrint.onTouchStart = scope.onClickPrint.bind(this);
        scope.view.preShow = scope.preShow;
    },
    updateFormUI: function(context) {
        if (context.eSewaAmountLoadSuccess) {
            this.ackScreen(context.eSewaAmountLoadSuccess);
        }
    },
    preShow: function() {
            this.view.button2.onClick = function() {
                var navMan = applicationManager.getNavigationManager();
                var data = applicationManager.getUserPreferencesManager().getUserObj();
                navMan.navigateTo({
                    "appName": "TransfersMA",
                    "friendlyName": "frmLoadeSewaTranfersActivity"
                }, false, data);
            }
            this.view.button1.onClick = function() {
                var navMan = applicationManager.getNavigationManager();
                var data = applicationManager.getUserPreferencesManager().getUserObj();
                navMan.navigateTo({
                    "appName": "TransfersMA",
                    "friendlyName": "frmLoadEsewa"
                }, false, data);
            }
            this.view.imgPrint.onTouchStart = this.onClickPrint.bind(this);
        },
    ackScreen: function(result) {
        if(result.response.transaction_status == "COMPLETE"){
            this.view.lblSection1Message.text = kony.i18n.getLocalizedString("i18n.eSewa.ackSuccess");
            this.view.imgSuccess.src = "confirmation_tick.png"
        }else if(result.response.transaction_status == "PENDING" || result.response.transaction_status == "AMBIGUOUS" || result.response.transaction_status == "PARTIAL_COMPLETE"){
            this.view.lblSection1Message.text = kony.i18n.getLocalizedString("i18n.konybb.transactionSubmittedSuccess");
            this.view.imgSuccess.src = "pending_yellow_tick.png"
        }else {
            this.view.lblSection1Message.text = "Your transaction is failed";
        }
        this.view.lblReferenceNumberValue.text = result.response.transaction_status;
        this.view.lblOriginatingIdValue.text = result.response.originating_unique_id;
        this.view.lbltransactionValue.text = result.response.transaction_id;
        this.view.lblField1Value.text = result.data.fromAccMasked;
        this.view.lblField2Value.text = result.data.receiverName;
        this.view.lblField3Value.text = result.data.receiverID;
        this.view.lblField4Value.text = "NPR " + result.data.amount;
        this.view.lblField5Value.text = "NPR " + result.data.charges;
        this.view.lblField6Value.text = result.data.dateFormat;
        this.view.lblField7Value.text = result.data.purpose;
        this.view.lblField8Value.text = result.data.totalAmount;
    },
    onClickPrint : function(){
        var scope = this;
            param = {
                "transactionId": this.view.lblReferenceNumberValue.text
            }
            var ManageActivitiesPresenter = applicationManager.getModulesPresentationController({
                "appName": "TransfersMA",
                "moduleName": "ManageActivitiesUIModule"
            });
            ManageActivitiesPresenter.generatePdf(param);
    }

 });