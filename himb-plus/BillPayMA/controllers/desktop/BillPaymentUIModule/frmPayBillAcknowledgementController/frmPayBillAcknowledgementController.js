define(['FormControllerUtility', 'CommonUtilities', 'ViewConstants', 'OLBConstants'], function(FormControllerUtility, CommonUtilities, ViewConstants, OLBConstants) {
    
return {
        deleteFavPayload: {},
        profileAccess: '',
        init: function() {
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function() {};
            this.view.onBreakpointChange = this.onBreakpointChange;
            this.presenter = applicationManager.getModulesPresentationController({
                'appName': 'BillPayMA',
                'moduleName': 'BillPaymentUIModule'
            });
            if (kony.application.getCurrentBreakpoint() == 640 || kony.application.getCurrentBreakpoint() == 1024) {
                this.view.flxPrint.setVisibility(false);
            }
            if (CommonUtilities.isPrintEnabled()) {
                this.view.flxPrint.setVisibility(true);
                //this.view.lblPrintfontIcon.onTouchStart = this.onClickPrint;
                this.view.flxPrint.onClick = this.onClickPrint;
            } else {
                this.view.flxPrint.setVisibility(false);
            }
        },
        onBreakpointChange: function(form, width) {
            var scopeObj = this;
            FormControllerUtility.setupFormOnTouchEnd(width);
            this.view.customheadernew.onBreakpointChangeComponent(width);
            this.view.customfooternew.onBreakpointChangeComponent(width);
            this.view.CustomPopup.onBreakpointChangeComponent(scopeObj.view.CustomPopup, width);
            this.view.deletePopup.onBreakpointChangeComponent(scopeObj.view.deletePopup, width);
        },
        preShow: function() {
            var scopeObj = this;
            scopeObj.view.flxAvailableBalance.setVisibility(false);
            this.view.flxExchangeRate.setVisibility(false);
            //this.setbilldata();
            var code = applicationManager.getNavigationManager().getCustomInfo("Biller_Code");
            var billerCode = code.code;
            var favMerchantList = kony.store.getItem("favMerchantsList");
            this.view.btnaddFavourite.setVisibility(true);
            this.view.btnaddFavourite.hoverSkin="SknbtnroundcornerA51C306pxradius";
             this.view.btnMakeAnotherPayment.hoverSkin="SknbtnroundcornerA51C306pxradius";
            this.view.btnMakeAnotherPayment.setVisibility(false);
            for (i = 0; i < favMerchantList.favoriteMerchants.length; i++) {
                if (billerCode == favMerchantList.favoriteMerchants[i].merchantCode) {
                    this.view.btnaddFavourite.setVisibility(false);
                    this.view.btnMakeAnotherPayment.setVisibility(true);
                    break;
                } else {
                    this.view.btnaddFavourite.setVisibility(true);
                    this.view.btnMakeAnotherPayment.setVisibility(false);
                }
            }
            this.view.btnaddFavourite.onClick = this.setFavorite;
            if(kony.application.getCurrentBreakpoint() == 640){
            this.view.btnaddFavourite.setVisibility(false);
            this.view.btnMakeAnotherPayment.setVisibility(true);
            }
            this.profileAccess = applicationManager.getUserPreferencesManager().profileAccess;
            this.view.customheadernew.activateMenu("Bill Pay", "Pay A Bill");
            FormControllerUtility.updateWidgetsHeightInInfo(this, ['flxHeader', 'flxFooter']);
            this.view.lblPrintfontIcon.toolTip = kony.i18n.getLocalizedString("i18n.accounts.print");
            this.view.customheadernew.btnSkipNav.onClick = function() {
                scopeObj.view.lblBillPayAcknowledgement.setActive(true);
            }
            this.view.btnDelete.skin = "sknBtnBlockedSSPFFFFFF15Px";
            this.view.btnDelete.setEnabled(false);
            this.view.btnOK.onClick = this.closeSuccesspopUp;
            this.view.imgClose.onTouchStart = this.closeSuccesspopUp;
            this.view.btnCancel.onClick = this.closeDeletePopup;
            this.view.imgClose2.onTouchStart = this.closeDeletePopup;
            this.view.flxLogout.onKeyPress = this.onKeyPressCallBack;
            // this.view.imgDelete1.onTouchStart = this.ChangeBackGroundforFlex1;
            // this.view.imgDelete2.onTouchStart = this.ChangeBackGroundforFlex2;
            // this.view.imgDelete3.onTouchStart = this.ChangeBackGroundforFlex3;
            // this.view.imgDelete4.onTouchStart = this.ChangeBackGroundforFlex4;
            // this.view.imgDelete5.onTouchStart = this.ChangeBackGroundforFlex5;
            this.view.flxBorderForImage1.skin = "SknFlxBgFFFFFFBorderE3E3E3Radius10PX";
            this.view.flxBorderForImage2.skin = "SknFlxBgFFFFFFBorderE3E3E3Radius10PX";
            this.view.flxBorderForImage3.skin = "SknFlxBgFFFFFFBorderE3E3E3Radius10PX";
            this.view.flxBorderForImage4.skin = "SknFlxBgFFFFFFBorderE3E3E3Radius10PX";
            this.view.flxBorderForImage5.skin = "SknFlxBgFFFFFFBorderE3E3E3Radius10PX";
            this.view.flxFavMerchants1.onClick = this.ChangeBackGroundforFlex1;
            this.view.flxFavMerchants2.onClick = this.ChangeBackGroundforFlex2;
            this.view.flxFavMerchants3.onClick = this.ChangeBackGroundforFlex3;
            this.view.flxFavMerchants4.onClick = this.ChangeBackGroundforFlex4;
            this.view.flxFavMerchants5.onClick = this.ChangeBackGroundforFlex5;
            this.view.btnDelete.onClick = this.FavMerDeleteCall;
            this.view.btnMakeAnotherPayment.onClick = this.navigateToHomeScreen.bind(this);
            scopeObj.view.btnViewPaymentActivity.onClick = this.navigateToPaymentActivityScreen.bind(this);
        },
        navigateToHomeScreen: function() {
            /*var navMan = applicationManager.getNavigationManager();
                                    navMan.navigateTo({
                                        "appName": "BillPayMA",
                                        "friendlyName": "frmBillPayNew"
                                    });*/
            kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                appName: "BillPayMA",
                moduleName: "BillPaymentUIModule"
            }).presentationController.showBillPaymentScreen({
                context: "PayABill",
                payload: {
                    "code": "ALL"
                }
            });
            kony.application.showLoadingScreen();
        },
        navigateToPaymentActivityScreen: function() {
            kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                appName: "BillPayMA",
                moduleName: "BillPaymentUIModule"
            }).presentationController.showBillPaymentScreen({
                context: "History",
                loadBills: !0
            });
        },
        FavMerDeleteCall: function() {
            kony.application.showLoadingScreen();
            var deletePayload = this.deleteFavPayload;
            var presenter = applicationManager.getModulesPresentationController({
                'appName': 'BillPayMA',
                'moduleName': 'BillPaymentUIModule'
            });
            presenter.deleteFavoriteMerchant(deletePayload);
        },
        ChangeBackGroundforFlex1: function() {
            this.view.flxBorderForImage1.skin = "sknflxf6f6f6Radius10px";
            this.view.imgDelete1.setVisibility(false);
            this.deleteFavPayload = {};
            this.deleteFavPayload.payeeId = this.view.lblFavMerchantName1.info.payeeId;
            this.view.btnDelete.skin = "sknBtnNormalSSPFFFFFF15Px";
            this.view.btnDelete.setEnabled(true);
            this.view.flxBorderForImage2.skin = "SknFlxBgFFFFFFBorderE3E3E3Radius10PX";
            this.view.flxBorderForImage3.skin = "SknFlxBgFFFFFFBorderE3E3E3Radius10PX";
            this.view.flxBorderForImage4.skin = "SknFlxBgFFFFFFBorderE3E3E3Radius10PX";
            this.view.flxBorderForImage5.skin = "SknFlxBgFFFFFFBorderE3E3E3Radius10PX";
            this.view.imgDelete2.setVisibility(true);
            this.view.imgDelete3.setVisibility(true);
            this.view.imgDelete4.setVisibility(true);
            this.view.imgDelete5.setVisibility(true);
        },
        ChangeBackGroundforFlex2: function() {
            this.view.flxBorderForImage2.skin = "sknflxf6f6f6Radius10px";
            this.view.imgDelete2.setVisibility(false);
            this.deleteFavPayload = {};
            this.deleteFavPayload.payeeId = this.view.lblFavMerchantName2.info.payeeId;
            this.view.btnDelete.skin = "sknBtnNormalSSPFFFFFF15Px";
            this.view.btnDelete.setEnabled(true);
            this.view.flxBorderForImage1.skin = "SknFlxBgFFFFFFBorderE3E3E3Radius10PX";
            this.view.flxBorderForImage3.skin = "SknFlxBgFFFFFFBorderE3E3E3Radius10PX";
            this.view.flxBorderForImage4.skin = "SknFlxBgFFFFFFBorderE3E3E3Radius10PX";
            this.view.flxBorderForImage5.skin = "SknFlxBgFFFFFFBorderE3E3E3Radius10PX";
             this.view.imgDelete1.setVisibility(true);
            this.view.imgDelete3.setVisibility(true);
            this.view.imgDelete4.setVisibility(true);
            this.view.imgDelete5.setVisibility(true);
        },
        ChangeBackGroundforFlex3: function() {
            this.view.flxBorderForImage3.skin = "sknflxf6f6f6Radius10px";
            this.view.imgDelete3.setVisibility(false);
            this.deleteFavPayload = {};
            this.deleteFavPayload.payeeId = this.view.lblFavMerchantName3.info.payeeId;
            this.view.btnDelete.skin = "sknBtnNormalSSPFFFFFF15Px";
            this.view.btnDelete.setEnabled(true);
            this.view.flxBorderForImage1.skin = "SknFlxBgFFFFFFBorderE3E3E3Radius10PX";
            this.view.flxBorderForImage2.skin = "SknFlxBgFFFFFFBorderE3E3E3Radius10PX";
            this.view.flxBorderForImage4.skin = "SknFlxBgFFFFFFBorderE3E3E3Radius10PX";
            this.view.flxBorderForImage5.skin = "SknFlxBgFFFFFFBorderE3E3E3Radius10PX";
            this.view.imgDelete1.setVisibility(true);
            this.view.imgDelete2.setVisibility(true);
            this.view.imgDelete4.setVisibility(true);
            this.view.imgDelete5.setVisibility(true);
        },
        ChangeBackGroundforFlex4: function() {
            this.view.flxBorderForImage4.skin = "sknflxf6f6f6Radius10px";
            this.view.imgDelete4.setVisibility(false);
            this.deleteFavPayload = {};
            this.deleteFavPayload.payeeId = this.view.lblFavMerchantName4.info.payeeId;
            this.view.btnDelete.skin = "sknBtnNormalSSPFFFFFF15Px";
            this.view.btnDelete.setEnabled(true);
            this.view.flxBorderForImage1.skin = "SknFlxBgFFFFFFBorderE3E3E3Radius10PX";
            this.view.flxBorderForImage2.skin = "SknFlxBgFFFFFFBorderE3E3E3Radius10PX";
            this.view.flxBorderForImage3.skin = "SknFlxBgFFFFFFBorderE3E3E3Radius10PX";
            this.view.flxBorderForImage5.skin = "SknFlxBgFFFFFFBorderE3E3E3Radius10PX";
             this.view.imgDelete1.setVisibility(true);
            this.view.imgDelete2.setVisibility(true);
            this.view.imgDelete3.setVisibility(true);
            this.view.imgDelete5.setVisibility(true);
        },
        ChangeBackGroundforFlex5: function() {
            this.view.flxBorderForImage5.skin = "sknflxf6f6f6Radius10px";
            this.view.imgDelete5.setVisibility(false);
            this.deleteFavPayload = {};
            this.deleteFavPayload.payeeId = this.view.lblFavMerchantName5.info.payeeId;
            this.view.btnDelete.skin = "sknBtnNormalSSPFFFFFF15Px";
            this.view.btnDelete.setEnabled(true);
            this.view.flxBorderForImage1.skin = "SknFlxBgFFFFFFBorderE3E3E3Radius10PX";
            this.view.flxBorderForImage2.skin = "SknFlxBgFFFFFFBorderE3E3E3Radius10PX";
            this.view.flxBorderForImage3.skin = "SknFlxBgFFFFFFBorderE3E3E3Radius10PX";
            this.view.flxBorderForImage4.skin = "SknFlxBgFFFFFFBorderE3E3E3Radius10PX";
            this.view.imgDelete1.setVisibility(true);
            this.view.imgDelete2.setVisibility(true);
            this.view.imgDelete3.setVisibility(true);
            this.view.imgDelete4.setVisibility(true);
        },
        closeSuccesspopUp: function() {
            this.view.flxAddFavSuccessMain.setVisibility(false);
            this.view.flxDialogs.setVisibility(false);
        },
        closeDeletePopup: function() {
            this.view.flxDialogs.setVisibility(false);
            this.view.flxAddFavLimitExceedMain.setVisibility(false);
            this.view.flxBorderForImage1.skin = "SknFlxBgFFFFFFBorderE3E3E3Radius10PX";
            this.view.flxBorderForImage2.skin = "SknFlxBgFFFFFFBorderE3E3E3Radius10PX";
            this.view.flxBorderForImage3.skin = "SknFlxBgFFFFFFBorderE3E3E3Radius10PX";
            this.view.flxBorderForImage4.skin = "SknFlxBgFFFFFFBorderE3E3E3Radius10PX";
            this.view.flxBorderForImage5.skin = "SknFlxBgFFFFFFBorderE3E3E3Radius10PX";
            this.view.imgDelete1.setVisibility(true);
            this.view.imgDelete2.setVisibility(true);
            this.view.imgDelete3.setVisibility(true);
            this.view.imgDelete4.setVisibility(true);
            this.view.imgDelete5.setVisibility(true);
            this.deleteFavPayload = {};
            this.view.btnDelete.skin = "sknBtnBlockedSSPFFFFFF15Px";
            this.view.btnDelete.setEnabled(false);
        },
        setFavorite: function() {
            applicationManager.getPresentationUtility().showLoadingScreen();
            var favMerchantList = kony.store.getItem('favMerchantsList');
            if (favMerchantList.favoriteMerchants.length < 5) {
                var Merchantdata = applicationManager.getNavigationManager().getCustomInfo("Biller_Code");
                var billerCode = Merchantdata.code;
                var paymentAggregator = Merchantdata.paymentAggregator;
                Payload = {
                    "favoriteMerchant": [{
                        "accountNumber": "",
                        "payeeNickName": "",
                        "companyName": Merchantdata.labelText,
                        "isFavoriteMerchant": "true",
                        "billerId": billerCode,
                        "paymentAggregator": paymentAggregator,
                        "logoUrl": Merchantdata.logoUrl
                    }]
                }
                var presenter = applicationManager.getModulesPresentationController({
                    'appName': 'BillPayMA',
                    'moduleName': 'BillPaymentUIModule'
                });
                presenter.createFavoriteMerchant(Payload);
            } else {
                applicationManager.getPresentationUtility().dismissLoadingScreen();
                this.view.flxDialogs.setVisibility(true);
                this.view.flxAddFavLimitExceedMain.setVisibility(true);
                this.view.imgDelete1.setVisibility(true);
                this.view.imgDelete2.setVisibility(true);
                this.view.imgDelete3.setVisibility(true);
                this.view.imgDelete4.setVisibility(true);
                this.view.imgDelete5.setVisibility(true);
                for (i = 0; i < favMerchantList.favoriteMerchants.length; i++) {
                    var payeeId = favMerchantList.favoriteMerchants[i].payeeId;
                    var logoUrl = favMerchantList.favoriteMerchants[i].logoUrl;
                    var merchantName = favMerchantList.favoriteMerchants[i].merchantName;
                    if (i == 0) {
                        this.view.imgFavMerchant1.src = logoUrl;
                        this.view.lblFavMerchantName1.text = merchantName;
                        this.view.lblFavMerchantName1.info = {
                            "payeeId": payeeId
                        };;
                    }
                    if (i == 1) {
                        this.view.imgFavMerchant2.src = logoUrl;
                        this.view.lblFavMerchantName2.text = merchantName;
                        this.view.lblFavMerchantName2.info = {
                            "payeeId": payeeId
                        };;
                    }
                    if (i == 2) {
                        this.view.imgFavMerchant3.src = logoUrl;
                        this.view.lblFavMerchantName3.text = merchantName;
                        this.view.lblFavMerchantName3.info = {
                            "payeeId": payeeId
                        };;
                    }
                    if (i == 3) {
                        this.view.imgFavMerchant4.src = logoUrl;
                        this.view.lblFavMerchantName4.text = merchantName;
                        this.view.lblFavMerchantName4.info = {
                            "payeeId": payeeId
                        };;
                    }
                    if (i == 4) {
                        this.view.imgFavMerchant5.src = logoUrl;
                        this.view.lblFavMerchantName5.text = merchantName;
                        this.view.lblFavMerchantName5.info = {
                            "payeeId": payeeId
                        };;
                    }
                }
            }
        },
        convertAmountValue: function(amount) {
            return parseFloat(amount).toLocaleString(kony.i18n.getCurrentDeviceLocale().name, {
                useGrouping: true,
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
        },
        CustomerBillpaidSuccess: function(res) {
            this.view.ImgAcknowledged.src = "success_green.png";
            this.view.lblSuccessMessage.text = kony.i18n.getLocalizedString("i18n.billPay.AcknowledgementMessage");
            this.view.flxDetailsContainer.setVisibility(true);
            this.view.flxConfirmBillWebViewData.setVisibility(false);
            this.view.flxDetailsContainer.height = kony.flex.USE_PREFERED_SIZE;
            this.view.lblRefrenceNumberValue.text = res.paymentId;
            var navMan = applicationManager.getNavigationManager();
            this.view.flxDetailsContainer.removeAll();
            var accountInfo = navMan.getCustomInfo("SelectedAccountData");
            //this.view.lblFrequencyValue.text="NPR "+applicationManager.getNavigationManager().getCustomInfo("totalDebitAmount");
            this.view.lblFrequencyValue.text = "NPR " + this.convertAmountValue(applicationManager.getNavigationManager().getCustomInfo("totalDebitAmount"));
            //this.view.lblFrequencyValue.text = CommonUtilities.formatCurrencyWithCommas(applicationManager.getNavigationManager().getCustomInfo("totalDebitAmount"), false,accountInfo.currencyCode);
            if (applicationManager.getNavigationManager().getCustomInfo("totalFee") != "NA") {
                this.view.lblDeliverByValue.text = "NPR " + applicationManager.getNavigationManager().getCustomInfo("totalFee");
                this.view.lblDeliverByValue.text = "NPR " + this.convertAmountValue(applicationManager.getNavigationManager().getCustomInfo("totalFee"));
                //this.view.lblDeliverByValue.text=CommonUtilities.formatCurrencyWithCommas(applicationManager.getNavigationManager().getCustomInfo("totalFee"), false, "NPR");
            } else {
                this.view.lblDeliverByValue.text = "NA";
            }
            this.view.lblFromValue.text = navMan.getCustomInfo("SelectedAccountData");
            var merchantInfo = applicationManager.getNavigationManager().getCustomInfo("Biller_Code");
            this.view.lblToValue.text = merchantInfo.labelText;
            this.view.lblNotesValue.text = applicationManager.getNavigationManager().getCustomInfo("NotesValue");
            this.view.lblBalanceValue.text = res.currencyCode + " " + this.convertAmountValue(res.availableBalance);
            this.view.lblSavingsAccount.text=this.view.lblFromValue.text;
            //this.view.lblBalanceValue.text =CommonUtilities.formatCurrencyWithCommas(res.availableBalance, false, res.currencyCode);
            var MerchantFieldData = res;
            this.createPrintdataBasedOnMerchant(MerchantFieldData);
            var aggregatorType = applicationManager.getNavigationManager().getCustomInfo("PaymentAggregatorType");
            if (aggregatorType == "TOP-UP-NEPAL") {
                this.setUpAckFieldsForTopUpNepal();
            }
            else{
                this.setUpAckFieldsUsingResponseFieldMapping(MerchantFieldData);
            }
            kony.application.dismissLoadingScreen();
        },
        setUpAckFieldsUsingResponseFieldMapping:function(MerchantFieldData){
            var nofRows = Object.keys(JSON.parse(MerchantFieldData.responseFieldMapping)).length;
            for (var i = 0; i < nofRows; i++) {
                for (var j = 0; j < Object.keys(MerchantFieldData.transactionDetails[0]).length; j++) {
                    if (Object.keys(JSON.parse(MerchantFieldData.responseFieldMapping))[i] == Object.keys(MerchantFieldData.transactionDetails[0])[j]) {
                        // Create a new FlexContainer for each row
                        var flexRow = new kony.ui.FlexContainer({
                            "id": "flxRowAck" + Object.keys(JSON.parse(MerchantFieldData.responseFieldMapping))[i],
                            "left": "0dp",
                            "top": "10dp",
                            "width": "100%",
                            //         "height": kony.flex.USE_PREFERRED_SIZE,
                            //"height": (i==nofRows-1)?"60dp":"20dp",
                            "height": "20dp",
                            "zIndex": 10,
                            "isVisible": true,
                            "skin": "sknflx",
                            "clipBounds": false,
                            "layoutType": kony.flex.FLOW_HORIZONTAL
                        });
                        var labelWidget = new kony.ui.Label({
                            "id": "lblCategoryKeylabeAck" + i,
                            "text": Object.values(JSON.parse(MerchantFieldData.responseFieldMapping))[i] + " :",
                            "height": kony.flex.USE_PREFERED_SIZE,
                            "isVisible": true,
                            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                            "width": "30%",
                            "left": "10dp",
                            "right": "",
                            "top": "5dp",
                            "skin": "sknlblFontCol000000Sanproreg",
                            "zIndex": 1
                        });
                        if (Object.values(JSON.parse(MerchantFieldData.responseFieldMapping))[i] == "amount" || Object.values(JSON.parse(MerchantFieldData.responseFieldMapping))[i]=="Amount") {
                            var amountValue=Object.values(MerchantFieldData.transactionDetails[0])[j];
                            if (amountValue.startsWith("NPR")) {
                            amountValue = amountValue.replace("NPR", "").trim();
                            }
                            var value = "NPR " + this.convertAmountValue(amountValue);
                        } else {
                            var value = Object.values(MerchantFieldData.transactionDetails[0])[j];
                        }
                        var labelWidget2 = new kony.ui.Label({
                            "id": "lblvalueAck" + i,
                            "text": value.toString(),
                            "height": kony.flex.USE_PREFERED_SIZE,
                            "isVisible": true,
                            "width": "35%",
                            "left": "0dp",
                            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                            "right": "",
                            "top": "5dp",
                            "skin": "sknlblFontCol000000Sanproreg",
                            "zIndex": 1
                        });
                        // Add the FlexContainer to the form
                        this.view.flxDetailsContainer.add(flexRow);
                        flexRow.add(labelWidget);
                        flexRow.add(labelWidget2);
                    }
                }
            }
        },
        createPrintdataBasedOnMerchant: function(MerchantFieldData) {
            var aggregatorType = applicationManager.getNavigationManager().getCustomInfo("PaymentAggregatorType");
            if (aggregatorType == "NEA") {
                this.printNEAData(MerchantFieldData);
            } else if (aggregatorType == "KUKL") {
                this.printKUKLData(MerchantFieldData);
            }
        },
        printNEAData: function(MerchantFieldData) {
            if (MerchantFieldData) {
                var Info = {};
                Info.paymentAggregator = MerchantFieldData.paymentAggregator;
                if (MerchantFieldData.transactionDetails[0].scno != undefined && MerchantFieldData.transactionDetails[0].scno != "") {
                    Info.scNo = MerchantFieldData.transactionDetails[0].scno;
                }
                if (MerchantFieldData.transactionDetails[0].offCode != undefined && MerchantFieldData.transactionDetails[0].offCode != "") {
                    Info.counterCode = MerchantFieldData.transactionDetails[0].offCode;
                }
                if (MerchantFieldData.transactionDetails[0].consumerId != undefined && MerchantFieldData.transactionDetails[0].consumerId != "") {
                    Info.consumerId = MerchantFieldData.transactionDetails[0].consumerId;
                }
                if (MerchantFieldData.transactionDetails[0].CustomerName != undefined && MerchantFieldData.transactionDetails[0].CustomerName != "") {
                    Info.CustomerName = MerchantFieldData.transactionDetails[0].customerName;
                }
                if (MerchantFieldData.transactionDetails[0].paidDate != undefined && MerchantFieldData.transactionDetails[0].paidDate != "") {
                    Info.paidDate = MerchantFieldData.transactionDetails[0].paidDate;
                }
                applicationManager.getNavigationManager().setCustomInfo("NEAPrintCode", Info);
            }
        },
        printKUKLData: function(MerchantFieldData) {
            if (MerchantFieldData) {
                var KUKLinfo = {};
                KUKLinfo.paymentAggregator = MerchantFieldData.paymentAggregator;
                if (MerchantFieldData.transactionDetails[0].customerNo != undefined && MerchantFieldData.transactionDetails[0].customerNo != "") {
                    KUKLinfo.customerNo = MerchantFieldData.transactionDetails[0].customerNo;
                }
                if (MerchantFieldData.transactionDetails[0].connectionNo != undefined && MerchantFieldData.transactionDetails[0].connectionNo != "") {
                    KUKLinfo.connectionNo = MerchantFieldData.transactionDetails[0].connectionNo;
                }
                applicationManager.getNavigationManager().setCustomInfo("KUKLPrintCode", KUKLinfo);
            }
        },
        setUpAckFieldsForTopUpNepal:function(){

             var MerchantFieldData=applicationManager.getNavigationManager().getCustomInfo("fieldValues");
            if (MerchantFieldData) {
                        for(var j=0;j<Object.keys(MerchantFieldData).length;j++){
                        // Create a new FlexContainer for each row
                        //if(Object.keys((MerchantFieldData))[j]=="Amount(NPR)" || Object.keys((MerchantFieldData))[j]=="amount(NPR)"){
                          //  Object.keys((MerchantFieldData))[j]="Amount"
                        //}
                        var flexRow = new kony.ui.FlexContainer({
                            "id": "flxRow" + Object.keys((MerchantFieldData))[j].replaceAll(' ', ''),
                            "left": "0dp",
                            "top": "10dp",
                            "width": "100%",
                            //         "height": kony.flex.USE_PREFERRED_SIZE,
                            //"height": (i==nofRows-1)?"60dp":"20dp",
                            "height": "20dp",
                            "zIndex": 10,
                            "isVisible": true,
                            "skin": "sknflx",
                            "clipBounds": false,
                            "layoutType": kony.flex.FLOW_HORIZONTAL
                        });
                        var labelWidget = new kony.ui.Label({
                            "id": "lblCategoryKeylabel"+Object.keys((MerchantFieldData))[j].replaceAll(' ', ''),
                            "text":Object.keys((MerchantFieldData))[j] + " :",
                            "height": kony.flex.USE_PREFERED_SIZE,
                            "isVisible": true,
                            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                            "width": "30%",
                            "left": "10dp",
                            "right": "",
                            "top": "5dp",
                            "skin": "sknlblFontCol000000Sanproreg",
                            "zIndex": 1
                        });
                        if(Object.keys((MerchantFieldData))[j].toLowerCase()=="amount"){
                        var value="NPR " +this.convertAmountValue(Object.values((MerchantFieldData))[j]);
                    }else{
                    var value=Object.values((MerchantFieldData))[j];
                    }
                        var labelWidget2 = new kony.ui.Label({
                            "id": "lblvaluelabel"+Object.values((MerchantFieldData))[j].replace(/-/g, "").replaceAll(" ", ""),
                            "text":value.toString() ? value.toString() : "NA",
                            "height": kony.flex.USE_PREFERED_SIZE,
                            "isVisible": true,
                            "width": "35%",
                            "left": "0dp",
                            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                            "right": "",
                            "top": "5dp",
                            "skin": "sknlblFontCol000000Sanproreg",
                            "zIndex": 1
                        });
                        // Add the FlexContainer to the form
                        this.view.flxDetailsContainer.add(flexRow);
                        flexRow.add(labelWidget);
                        flexRow.add(labelWidget2);
                }
        }
        },
        transactionReversalTOPUPNEPAL:function(res){
            if (res.serverErrorRes) {
                if (res.serverErrorRes.dbpErrCode == "20001") {
                    this.view.ImgAcknowledged.src = "failed_icon.png";
                    this.view.lblSuccessMessage.text = res.serverErrorRes.dbpErrMsg;
                }
            }
            this.view.flxDetailsContainer.setVisibility(true);
            this.view.flxConfirmBillWebViewData.setVisibility(false);
            this.view.flxDetailsContainer.height = kony.flex.USE_PREFERED_SIZE;
            this.view.lblRefrenceNumberValue.text = res.serverErrorRes.paymentId;
            var navMan = applicationManager.getNavigationManager();
            this.view.flxDetailsContainer.removeAll();
            var accountInfo = navMan.getCustomInfo("SelectedAccountData");
            this.view.lblFrequencyValue.text = "NPR " + this.convertAmountValue(applicationManager.getNavigationManager().getCustomInfo("totalDebitAmount"));
            //this.view.lblFrequencyValue.text = CommonUtilities.formatCurrencyWithCommas(applicationManager.getNavigationManager().getCustomInfo("totalDebitAmount"), false,accountInfo.currencyCode);
            if (applicationManager.getNavigationManager().getCustomInfo("totalFee") != "NA") {
                this.view.lblDeliverByValue.text = "NPR " + this.convertAmountValue(applicationManager.getNavigationManager().getCustomInfo("totalFee"));
                //this.view.lblDeliverByValue.text=CommonUtilities.formatCurrencyWithCommas(applicationManager.getNavigationManager().getCustomInfo("totalFee"), false, "NPR");
            } else {
                this.view.lblDeliverByValue.text = "NA";
            }
            this.view.lblFromValue.text = navMan.getCustomInfo("SelectedAccountData");
            var merchantInfo = applicationManager.getNavigationManager().getCustomInfo("Biller_Code");
            this.view.lblToValue.text = merchantInfo.labelText;
            this.view.lblNotesValue.text = applicationManager.getNavigationManager().getCustomInfo("NotesValue");
            this.view.lblBalanceValue.text = res.serverErrorRes.currencyCode + " " + this.convertAmountValue(res.serverErrorRes.availableBalance);
            //this.view.lblBalanceValue.text =CommonUtilities.formatCurrencyWithCommas(res.availableBalance, false, res.currencyCode);
            this.view.lblSavingsAccount.text=this.view.lblFromValue.text;
            var MerchantFieldData=navMan.getCustomInfo("fieldValues");
            if (MerchantFieldData) {
                        for(var j=0;j<Object.keys(MerchantFieldData).length;j++){
                        // Create a new FlexContainer for each row
                        //if(Object.keys((MerchantFieldData))[j]=="Amount(NPR)" || Object.keys((MerchantFieldData))[j]=="amount(NPR)"){
                          //  Object.keys((MerchantFieldData))[j]="Amount"
                        //}
                        var flexRow = new kony.ui.FlexContainer({
                            "id": "flxRow" + Object.keys((MerchantFieldData))[j].replaceAll(' ', ''),
                            "left": "0dp",
                            "top": "10dp",
                            "width": "100%",
                            //         "height": kony.flex.USE_PREFERRED_SIZE,
                            //"height": (i==nofRows-1)?"60dp":"20dp",
                            "height": "20dp",
                            "zIndex": 10,
                            "isVisible": true,
                            "skin": "sknflx",
                            "clipBounds": false,
                            "layoutType": kony.flex.FLOW_HORIZONTAL
                        });
                        var labelWidget = new kony.ui.Label({
                            "id": "lblCategoryKeylabel"+Object.keys((MerchantFieldData))[j].replaceAll(' ', ''),
                            "text":Object.keys((MerchantFieldData))[j] + " :",
                            "height": kony.flex.USE_PREFERED_SIZE,
                            "isVisible": true,
                            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                            "width": "30%",
                            "left": "10dp",
                            "right": "",
                            "top": "5dp",
                            "skin": "sknlblFontCol000000Sanproreg",
                            "zIndex": 1
                        });
                        if(Object.keys((MerchantFieldData))[j].toLowerCase()=="amount"){
                        var value="NPR " +this.convertAmountValue(Object.values((MerchantFieldData))[j]);
                    }else{
                    var value=Object.values((MerchantFieldData))[j];
                    }
                        var labelWidget2 = new kony.ui.Label({
                            "id": "lblvaluelabel"+Object.values((MerchantFieldData))[j].replace(/-/g, "").replaceAll(" ", ""),
                            "text":value.toString() ? value.toString() : "NA",
                            "height": kony.flex.USE_PREFERED_SIZE,
                            "isVisible": true,
                            "width": "35%",
                            "left": "0dp",
                            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                            "right": "",
                            "top": "5dp",
                            "skin": "sknlblFontCol000000Sanproreg",
                            "zIndex": 1
                        });
                        // Add the FlexContainer to the form
                        this.view.flxDetailsContainer.add(flexRow);
                        flexRow.add(labelWidget);
                        flexRow.add(labelWidget2);
                }
        }
        },
        transactionReversalNEA: function(res) {
            if (res.serverErrorRes) {
                if (res.serverErrorRes.dbpErrCode == "20001") {
                    this.view.ImgAcknowledged.src = "failed_icon.png";
                    this.view.lblSuccessMessage.text = res.serverErrorRes.dbpErrMsg;
                }
            }
            this.view.flxDetailsContainer.setVisibility(true);
            this.view.flxConfirmBillWebViewData.setVisibility(false);
            this.view.flxDetailsContainer.height = kony.flex.USE_PREFERED_SIZE;
            this.view.lblRefrenceNumberValue.text = res.serverErrorRes.paymentId;
            var navMan = applicationManager.getNavigationManager();
            this.view.flxDetailsContainer.removeAll();
            var accountInfo = navMan.getCustomInfo("SelectedAccountData");
            this.view.lblFrequencyValue.text = "NPR " + applicationManager.getNavigationManager().getCustomInfo("totalDebitAmount");
            //this.view.lblFrequencyValue.text = CommonUtilities.formatCurrencyWithCommas(applicationManager.getNavigationManager().getCustomInfo("totalDebitAmount"), false,accountInfo.currencyCode);
            if (applicationManager.getNavigationManager().getCustomInfo("totalFee") != "NA") {
                this.view.lblDeliverByValue.text = "NPR " + this.convertAmountValue(applicationManager.getNavigationManager().getCustomInfo("totalFee"));
                //this.view.lblDeliverByValue.text=CommonUtilities.formatCurrencyWithCommas(applicationManager.getNavigationManager().getCustomInfo("totalFee"), false, "NPR");
            } else {
                this.view.lblDeliverByValue.text = "NA";
            }
            this.view.lblFromValue.text = navMan.getCustomInfo("SelectedAccountData");
            var merchantInfo = applicationManager.getNavigationManager().getCustomInfo("Biller_Code");
            this.view.lblToValue.text = merchantInfo.labelText;
            this.view.lblNotesValue.text = applicationManager.getNavigationManager().getCustomInfo("NotesValue");
            this.view.lblBalanceValue.text = res.serverErrorRes.currencyCode + " " + this.convertAmountValue(res.serverErrorRes.availableBalance);
            this.view.lblSavingsAccount.text=this.view.lblFromValue.text;
            //this.view.lblBalanceValue.text =CommonUtilities.formatCurrencyWithCommas(res.availableBalance, false, res.currencyCode);
            var nofRows;
            var MerchantFieldData = res.serverErrorRes;
            if (MerchantFieldData) {
                var Info = {};
                Info.paymentAggregator = MerchantFieldData.paymentAggregator;
                if (MerchantFieldData.requestPayload[0].scno != undefined && MerchantFieldData.requestPayload[0].scno != "") {
                    Info.scNo = MerchantFieldData.requestPayload[0].scno;
                }
                if (MerchantFieldData.requestPayload[0].offCode != undefined && MerchantFieldData.requestPayload[0].offCode != "") {
                    Info.counterCode = MerchantFieldData.requestPayload[0].offCode;
                }
                if (MerchantFieldData.requestPayload[0].consumerId != undefined && MerchantFieldData.requestPayload[0].consumerId != "") {
                    Info.consumerId = MerchantFieldData.requestPayload[0].consumerId;
                }
                if (MerchantFieldData.requestPayload[0].CustomerName != undefined && MerchantFieldData.requestPayload[0].CustomerName != "") {
                    Info.CustomerName = MerchantFieldData.requestPayload[0].customerName;
                }
                if (MerchantFieldData.requestPayload[0].paidDate != undefined && MerchantFieldData.requestPayload[0].paidDate != "") {
                    Info.paidDate = MerchantFieldData.requestPayload[0].paidDate;
                }
                applicationManager.getNavigationManager().setCustomInfo("NEAPrintCode", Info);
                nofRows = Object.keys(JSON.parse(MerchantFieldData.responseFieldMapping)).length;
                for (var i = 0; i < nofRows; i++) {
                    for (var j = 0; j < Object.keys(MerchantFieldData.requestPayload[0]).length; j++) {
                        if (Object.keys(JSON.parse(MerchantFieldData.responseFieldMapping))[i] == Object.keys(MerchantFieldData.requestPayload[0])[j]) {
                            // Create a new FlexContainer for each row
                            var flexRow = new kony.ui.FlexContainer({
                                "id": "flxRowAck" + Object.keys(JSON.parse(MerchantFieldData.responseFieldMapping))[i],
                                "left": "0dp",
                                "top": "10dp",
                                "width": "100%",
                                //         "height": kony.flex.USE_PREFERRED_SIZE,
                                //"height": (i==nofRows-1)?"60dp":"20dp",
                                "height": "20dp",
                                "zIndex": 10,
                                "isVisible": true,
                                "skin": "sknflx",
                                "clipBounds": false,
                                "layoutType": kony.flex.FLOW_HORIZONTAL
                            });
                            var labelWidget = new kony.ui.Label({
                                "id": "lblCategoryKeylabeAck" + i,
                                "text": Object.values(JSON.parse(MerchantFieldData.responseFieldMapping))[i] + " :",
                                "height": kony.flex.USE_PREFERED_SIZE,
                                "isVisible": true,
                                "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                                "width": "30%",
                                "left": "10dp",
                                "right": "",
                                "top": "5dp",
                                "skin": "sknlblFontCol000000Sanproreg",
                                "zIndex": 1
                            });
                            if (Object.values(JSON.parse(MerchantFieldData.responseFieldMapping))[i] == "amount" || Object.values(JSON.parse(MerchantFieldData.responseFieldMapping))[i]=="Amount") {
                            var value = "NPR " + this.convertAmountValue(Object.values(MerchantFieldData.requestPayload[0])[j]);
                        } else {
                            var value = Object.values(MerchantFieldData.requestPayload[0])[j];
                        }
                            var labelWidget2 = new kony.ui.Label({
                                "id": "lblvalueAck" + i,
                                "text": value.toString(),
                                "height": kony.flex.USE_PREFERED_SIZE,
                                "isVisible": true,
                                "width": "35%",
                                "left": "0dp",
                                "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                                "right": "",
                                "top": "5dp",
                                "skin": "sknlblFontCol000000Sanproreg",
                                "zIndex": 1
                            });
                            // Add the FlexContainer to the form
                            this.view.flxDetailsContainer.add(flexRow);
                            flexRow.add(labelWidget);
                            flexRow.add(labelWidget2);
                        }
                    }
                }
            }
            kony.application.dismissLoadingScreen();
        },
        postShow: function() {
            this.view.flxAvailableBalance.setVisibility(false);
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            applicationManager.getNavigationManager().applyUpdates(this);
            this.view.CustomPopup.doLayout = CommonUtilities.centerPopupFlex;
        },
        /**
         * updateFormUI - the entry point method for the form controller.
         * @param {Object} viewModel - it contains the set of view properties and keys.
         */
        updateFormUI: function(viewModel) {
            if (viewModel.isLoading === true) {
                FormControllerUtility.showProgressBar(this.view);
            } else if (viewModel.isLoading === false) {
                FormControllerUtility.hideProgressBar(this.view);
            }
            if (viewModel.ackPayABill) {
                this.showSingleBillPayAcknowledgement(viewModel.ackPayABill);
            }
            if (viewModel.PaybillAck) {
                this.CustomerBillpaidSuccess(viewModel.PaybillAck);
            }
            if (viewModel.TransactionReversalNEA) {
                this.transactionReversalNEA(viewModel.TransactionReversalNEA);
            }if (viewModel.transactionReversalTOPUPNEPAL) {
                this.transactionReversalTOPUPNEPAL(viewModel.transactionReversalTOPUPNEPAL);
            }

            if (viewModel.AutomaticMerchantConfirmBillPayRes) {
                this.ConfirmBillPayAutoMerchantSuccess(viewModel.AutomaticMerchantConfirmBillPayRes);
            }
            if (viewModel.CreateFavMerchantSuccess) {
                this.CreateFavMerchantSuccess(viewModel.CreateFavMerchantSuccess);
            }
            if (viewModel.deleteFavMerchantSuccess) {
                this.deleteFavMerchantSuccess();
            }
        },
        CreateFavMerchantSuccess: function() {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            this.view.flxDialogs.setVisibility(true);
            this.view.flxAddFavSuccessMain.setVisibility(true);
            var Merchantdata = applicationManager.getNavigationManager().getCustomInfo("Biller_Code");
            this.view.lblFavSuccessMsg.text = kony.i18n.getLocalizedString("i18n.firstAddFavSuccess") + " " + Merchantdata.labelText + " " + kony.i18n.getLocalizedString("i18n.secondAddFavSuccess");
            this.view.lblFavSuccessMsg.width = "70%";
            this.view.btnaddFavourite.setVisibility(false);
            this.view.btnMakeAnotherPayment.setVisibility(true);
        },
        deleteFavMerchantSuccess: function() {
            this.view.flxAddFavLimitExceedMain.setVisibility(false);
            this.setFavorite();
            //this.view.flxDialogs.setVisibility(true);
            //this.view.flxAddFavSuccessMain.setVisibility(true);
            //this.view.flxAddFavLimitExceedMain.setVisibility(false);
        },
        ConfirmBillPayAutoMerchantSuccess: function(response) {
			 this.view.lblRefrenceNumberValue.text = response.paymentId ? response.paymentId : "NA";
			 this.view.lblBalanceValue.text = response.currencyCode + " " + this.convertAmountValue(response.availableBalance);
             var navManager = applicationManager.getNavigationManager();
             var AccountInfo = navManager.getCustomInfo("debitInformation");
             this.view.lblSavingsAccount.text=AccountInfo.debtorName;
            if (response.serverErrorRes) {
                if (response.serverErrorRes.dbpErrCode == "20001") {
                    this.view.ImgAcknowledged.src = "failed_icon.png";
                    this.view.lblSuccessMessage.text = response.serverErrorRes.dbpErrMsg;
					this.view.lblRefrenceNumberValue.text = response.serverErrorRes.paymentId ? response.serverErrorRes.paymentId : "NA";
					this.view.lblBalanceValue.text = response.serverErrorRes.currencyCode + " " + this.convertAmountValue(response.serverErrorRes.availableBalance);
                    this.view.lblSavingsAccount.text=AccountInfo.debtorName;
                }
            } else {
                this.view.ImgAcknowledged.src = "success_green.png";
                this.view.lblSuccessMessage.text = kony.i18n.getLocalizedString("i18n.billPay.AcknowledgementMessage");
            }
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            var navManager = applicationManager.getNavigationManager();
            this.view.flxDetailsContainer.setVisibility(false);
            this.view.flxConfirmBillWebViewData.setVisibility(true);
			  //this.view.flxAmount.setVisibility(true);
			  var status= response.serverErrorRes!=undefined&&response.serverErrorRes.success!=undefined?response.serverErrorRes.success:response.success!=undefined?response.success:"Failed";
			 if (kony.application.getCurrentBreakpoint() >= 1366 ){
			this.view.flxAmountKey.width="30%";
			this.view.flxAmountKey.left="2%";
			this.view.flxAmountValue.left="32%";
			this.view.lblAmountKey.text="Transaction Status :";
			 this.view.lblAmountValue.skin="sknlblFontCol000000Sanproreg";
			 this.view.lblAmountValue.skin="sknlblFontCol000000Sanproreg";
			 this.view.lblAmountKey.skin="sknlblFontCol000000Sanproreg";
			 this.view.lblAmountValue.text=status=="true"?"Success":"Failed";
			 }
           
            var res = navManager.getCustomInfo("WebViewRes", res);
            this.view.flxConfirmBillWebViewData.removeAll();
            var nofRows = JSON.parse(res.npiObjectData).fieldLabelMapping.length;
            for (var i = 0; i < nofRows; i++) {
                for (var j = 0; j < Object.keys(JSON.parse(res.npiObjectData).cipsTransactionDetail).length; j++) {
                    if (JSON.parse(res.npiObjectData).fieldLabelMapping[i].mapField == Object.keys(JSON.parse(res.npiObjectData).cipsTransactionDetail)[j]) {
                        var flexRow = new kony.ui.FlexContainer({
                            "id": "flxRowWebView" + JSON.parse(res.npiObjectData).fieldLabelMapping[i].mapField,
                            "left": "0dp",
                            "top": "10dp",
                            "width": "100%",
                            "height": "20dp",
                            "zIndex": 10,
                            "isVisible": true,
                            "skin": "sknflx",
                            "clipBounds": false,
                            "layoutType": kony.flex.FLOW_HORIZONTAL
                        });
                        var labelWidget = new kony.ui.Label({
                            "id": "lblCategoryKey" + JSON.parse(res.npiObjectData).fieldLabelMapping[i].mapField,
                            "text": JSON.parse(res.npiObjectData).fieldLabelMapping[i].fieldLabel + " :",
                            "height": kony.flex.USE_PREFERED_SIZE,
                            "isVisible": true,
                            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                            "width": "30%",
                            "left": "10dp",
                            "right": "",
                            "top": "0dp",
                            "skin": "sknlblFontCol000000Sanproreg",
                            "zIndex": 1
                        });
                        if (JSON.parse(res.npiObjectData).fieldLabelMapping[i].mapField == "amount") {
                            var value = "NPR " + this.convertAmountValue(Object.values(JSON.parse(res.npiObjectData).cipsTransactionDetail)[j]);
                        } else {
                            var value = Object.values(JSON.parse(res.npiObjectData).cipsTransactionDetail)[j];
                        }
                        var labelWidget2 = new kony.ui.Label({
                            "id": "lblvalue" + JSON.parse(res.npiObjectData).fieldLabelMapping[i].mapField,
                            "text": value.toString(),
                            "height": kony.flex.USE_PREFERED_SIZE,
                            "isVisible": true,
                            "width": "35%",
                            "left": "0dp",
                            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                            "right": "",
                            "top": "0dp",
                            "skin": "sknlblFontCol000000Sanproreg",
                            "zIndex": 1
                        });
                        flexRow.add(labelWidget);
                        flexRow.add(labelWidget2);
                        this.view.flxConfirmBillWebViewData.add(flexRow);
                    }
                }
            }
            var navManager = applicationManager.getNavigationManager();
            var Info = navManager.getCustomInfo("debitInformation");
            var AccDetails = applicationManager.getNavigationManager().getCustomInfo("SelectedAccountInfoWebView");
            var Currencycode = AccDetails.currencyCode;
            this.view.lblPaymentDateValue.text = "NA";
            if (Info.fee != "NA") {
                this.view.lblDeliverByValue.text = "NPR " + this.convertAmountValue(Info.fee.toString());
                //this.view.lblDeliverByValue.text=CommonUtilities.formatCurrencyWithCommas(Info.fee, false, "NPR");
            } else {
                this.view.lblDeliverByValue.text = "NA";
            }
            this.view.lblFrequencyValue.text = "NPR " + this.convertAmountValue(Info.totalDebitAmount.toString());
            //this.view.lblFrequencyValue.text = CommonUtilities.formatCurrencyWithCommas(Info.totalDebitAmount, false,Currencycode);
            this.view.lblNotesValue.text = applicationManager.getNavigationManager().getCustomInfo("NotesValuewebView");
            this.view.lblFromValue.text = Info.debtorName;
            var merchantInfo = applicationManager.getNavigationManager().getCustomInfo("Biller_Code");
            this.view.lblToValue.text = merchantInfo.labelText;
            //this.view.lblFromValue.text=applicationManager.getNavigationManager().getCustomInfo("SelectedAccountDataWebView");
            /*for (var i = 0; i < applicationManager.getConfigurationManager().userAccounts.length; i++) {
                if (applicationManager.getConfigurationManager().userAccounts[i].accountID == Info.debtorAccount) {
                    this.view.lblBalanceValue.text = applicationManager.getConfigurationManager().userAccounts[i].currencyCode + " " + (applicationManager.getConfigurationManager().userAccounts[i].availableBalance);
                }
            }*/
            
            //this.view.lblBalanceValue.text =CommonUtilities.formatCurrencyWithCommas(response.availableBalance, false, response.currencyCode);
        },
        /**
         * used to set single Bill Pay scrren
         * @param {object} data
         */
        showSingleBillPayAcknowledgement: function(data) {
            var scopeObj = this;
            var transactionCurrency = applicationManager.getFormatUtilManager().getCurrencySymbol(data.savedData.transactionCurrency);
            if (data.savedData.frequencyType !== "Once" && data.savedData.hasHowLong === "ON_SPECIFIC_DATE" || data.savedData.frequencyType !== "Once" && data.savedData.hasHowLong === "NO_OF_RECURRENCES") {
                scopeObj.view.flxEndDate.setVisibility(true);
                CommonUtilities.setText(scopeObj.view.lblDeliverByKey, kony.i18n.getLocalizedString("i18n.billPay.DeliveryIn"), CommonUtilities.getaccessibilityConfig());
            } else {
                scopeObj.view.flxEndDate.setVisibility(false);
                CommonUtilities.setText(scopeObj.view.lblDeliverByKey, kony.i18n.getLocalizedString("i18n.billPay.DeliveryBy"), CommonUtilities.getaccessibilityConfig());
            }
            CommonUtilities.setText(scopeObj.view.lblRefrenceNumberValue, data.response.referenceId || "None", CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.lblSuccessMessage, kony.i18n.getLocalizedString("i18n.transfers.AcknowledgementMessage"), CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.lblSavingsAccount, data.accountData.accountName || "None", CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.lblBalanceValue, CommonUtilities.formatCurrencyWithCommas(data.accountData.availableBalance, false, data.accountData.currencyCode), CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.lblFromValue, data.savedData.payFrom || "None", CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.lblToValue, data.savedData.payeeName || "None", CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.lblAmountKey, kony.i18n.getLocalizedString("i18n.transfers.lblAmount") + "(" + transactionCurrency + ")", CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.lblAmountValue, data.savedData.languageAmount, CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.lblPaymentDateKey, kony.i18n.getLocalizedString("i18n.billPay.PaymentDate"), CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.lblPaymentDateValue, data.savedData.sendOn, CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.lblNotesValue, data.savedData.notes || "None", CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.lblDeliverByValue, data.savedData.deliveryDate || "None", CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.lblFrequencyValue, data.savedData.frequencyType || "None", CommonUtilities.getaccessibilityConfig());
            if (this.isFutureDate(data.savedData.sendOn)) {
                if (data.response.status != "Pending") {
                    CommonUtilities.setText(scopeObj.view.lblSuccessMessage, kony.i18n.getLocalizedString("i18n.FastTransfers.YourTransactionHasBeenScheduledfor"), CommonUtilities.getaccessibilityConfig());
                } else {
                    CommonUtilities.setText(scopeObj.view.lblSuccessMessage, kony.i18n.getLocalizedString("i18n.transfers.approvalAck"), CommonUtilities.getaccessibilityConfig());
                }
            }
            if (data.savedData.frequencyType !== "Once" && data.savedData.hasHowLong === "ON_SPECIFIC_DATE") {
                CommonUtilities.setText(scopeObj.view.lblSuccessMessage, kony.i18n.getLocalizedString("i18n.mybills.statusmessage.ScheduledRecurrence"), CommonUtilities.getaccessibilityConfig());
                CommonUtilities.setText(scopeObj.view.lblPaymentDateKey, kony.i18n.getLocalizedString("i18n.transfers.start_date"), CommonUtilities.getaccessibilityConfig());
                // CommonUtilities.setText(scopeObj.view.lblPaymentDateValue, data.savedData.frequencyStartDate, CommonUtilities.getaccessibilityConfig());
                CommonUtilities.setText(scopeObj.view.lblEndDateKey, kony.i18n.getLocalizedString("i18n.transfers.end_date"), CommonUtilities.getaccessibilityConfig());
                CommonUtilities.setText(scopeObj.view.lblEndDateValue, data.savedData.frequencyEndDate, CommonUtilities.getaccessibilityConfig());
            } else if (data.savedData.frequencyType !== "Once" && data.savedData.hasHowLong === "NO_OF_RECURRENCES") {
                CommonUtilities.setText(scopeObj.view.lblSuccessMessage, kony.i18n.getLocalizedString("i18n.mybills.statusmessage.ScheduledRecurrence"), CommonUtilities.getaccessibilityConfig());
                CommonUtilities.setText(scopeObj.view.lblPaymentDateKey, kony.i18n.getLocalizedString("i18n.transfers.send_on"), CommonUtilities.getaccessibilityConfig());
                CommonUtilities.setText(scopeObj.view.lblEndDateKey, kony.i18n.getLocalizedString("i18n.transfers.lblNumberOfRecurrences"), CommonUtilities.getaccessibilityConfig());
                CommonUtilities.setText(scopeObj.view.lblEndDateValue, data.savedData.numberOfRecurrences, CommonUtilities.getaccessibilityConfig());
            }
            if (this.profileAccess === "true") {
                scopeObj.view.flxSavingsIcon.setVisibility(true);
                scopeObj.view.flxFromIcon.setVisibility(true);
                scopeObj.view.flxToIcon.setVisibility(false);
                scopeObj.view.lblFromIcon.setVisibility(true);
                scopeObj.view.lblToIcon.setVisibility(true);
                scopeObj.view.lblSavingsIcon.setVisibility(true);
                scopeObj.view.lblFromIcon.text = scopeObj.presenter.isBusinessAccount(data.savedData.fromAccountNumber) === "true" ? "r" : "s";
                scopeObj.view.lblToIcon.text = data.savedData.isBusinessPayee === "1" ? "r" : "s";
                scopeObj.view.lblSavingsIcon.text = scopeObj.presenter.isBusinessAccount(data.savedData.fromAccountNumber) === "true" ? "r" : "s";
            } else {
                scopeObj.view.flxSavingsIcon.setVisibility(false);
                scopeObj.view.flxFromIcon.setVisibility(false);
                scopeObj.view.flxToIcon.setVisibility(false);
                scopeObj.view.lblToIcon.setVisibility(false);
                scopeObj.view.lblFromIcon.setVisibility(false);
                scopeObj.view.lblSavingsIcon.setVisibility(false);
            }
            scopeObj.view.flxMain.forceLayout();
            scopeObj.view.btnMakeAnotherPayment.onClick = function() {
                var dataMap = data.savedData;
                dataMap.categories = '';
                dataMap.amount = '';
                dataMap.sendOn = '';
                dataMap.notes = '';
                dataMap.deliveryDate = '';
                dataMap.frequencyType = '';
                dataMap.numberOfRecurrences = '';
                dataMap.frequencyStartDate = '';
                dataMap.frequencyEndDate = '';
                dataMap.billCategory = '';
                scopeObj.presenter.showBillPaymentScreen({
                    "sender": 'acknowledgement',
                    "context": 'PayABill',
                    "loadBills": true,
                    "data": dataMap
                });
            };
            scopeObj.view.btnViewPaymentActivity.onClick = function() {
                if (data.savedData.frequencyType === "Once" && !scopeObj.isFutureDate(data.savedData.sendOn)) {
                    scopeObj.presenter.showBillPaymentScreen({
                        "sender": 'acknowledgement',
                        "context": 'History',
                        "loadBills": true,
                    });
                } else {
                    scopeObj.presenter.showBillPaymentScreen({
                        "sender": 'acknowledgement',
                        "context": 'ScheduleBills',
                        "loadBills": true,
                    });
                }
            }
            scopeObj.view.forceLayout();
        },
        onClickPrint: function() {
            var scopeObj = this;
            var printData = [];
            var aggregatorType = applicationManager.getNavigationManager().getCustomInfo("PaymentAggregatorType");
            if (aggregatorType == "NEA") {
                var Info = applicationManager.getNavigationManager().getCustomInfo("NEAPrintCode");
                this.printNEA(scopeObj, printData, Info);
            } else if (aggregatorType == "NCHL") {
                this.printNCHL(scopeObj, printData, Info);
            } else if (aggregatorType == "KUKL") {
                var KUKLInfo = applicationManager.getNavigationManager().getCustomInfo("KUKLPrintCode");
                this.printKUKL(scopeObj, printData, KUKLInfo);
            } else if(aggregatorType == "TOP-UP-NEPAL"){
                this.printTopUpNepal(scopeObj, printData, KUKLInfo);
            }
        },
        printNEA: function(scopeObj, printData, Info) {
            printData.push({
                key: kony.i18n.getLocalizedString("i18n.common.status"),
                value: scopeObj.view.lblSuccessMessage.text
            });
            printData.push({
                key: scopeObj.view.lblRefrenceNumber.text,
                value: scopeObj.view.lblRefrenceNumberValue.text
            });
            printData.push({
                key: scopeObj.view.lblFromKey.text,
                value: scopeObj.view.lblFromValue.text
            });
            printData.push({
                key: scopeObj.view.lblToKey.text,
                value: scopeObj.view.lblToValue.text
            });
            printData.push({
                key: kony.i18n.getLocalizedString("i18n.accountDetail.customerName"),
                value: Info.customerName ? Info.customerName : "NA"
            });
            printData.push({
                key: "Consumer Id",
                value: Info.consumerId ? Info.consumerId : "NA"
            });
            printData.push({
                key: "SC No",
                value: Info.scNo ? Info.scNo : "NA"
            });
            printData.push({
                key: "Counter Code",
                value: Info.counterCode ? Info.counterCode : "NA"
            });
            printData.push({
                key: kony.i18n.getLocalizedString("i18n.Transfers.PaidDate"),
                value: Info.paidDate ? Info.paidDate : "NA"
            });
            printData.push({
                key: kony.i18n.getLocalizedString("i18n.feecolon"),
                value: scopeObj.view.lblDeliverByValue.text
            });
            printData.push({
                key: kony.i18n.getLocalizedString("i18n.pfm.totalDebitAmt"),
                value: scopeObj.view.lblFrequencyValue.text
            });
            if (scopeObj.view.lblNotesValue.text !== "") {
                printData.push({
                    key: kony.i18n.getLocalizedString("i18n.transfers.Description"),
                    value: scopeObj.view.lblNotesValue.text
                });
            }
            this.printFunction(scopeObj, printData);
        },
        printNCHL: function(scopeObj, printData, Info) {
            printData.push({
                key: kony.i18n.getLocalizedString("i18n.common.status"),
                value: scopeObj.view.lblAmountValue.text
            });
            printData.push({
                key: scopeObj.view.lblRefrenceNumber.text,
                value: scopeObj.view.lblRefrenceNumberValue.text
            });
            printData.push({
                key: scopeObj.view.lblFromKey.text,
                value: scopeObj.view.lblFromValue.text
            });
            printData.push({
                key: scopeObj.view.lblToKey.text,
                value: scopeObj.view.lblToValue.text
            });
            printData.push({
                key: kony.i18n.getLocalizedString("i18n.accounts.availableBalance"),
                value: scopeObj.view.lblBalanceValue.text
            });
			 printData.push({
                key: kony.i18n.getLocalizedString("i18n.HBl.Cards.TransactionAmount"),
                value: scopeObj.view.lblvalueamount.text
            });
            printData.push({
                key: kony.i18n.getLocalizedString("i18n.feecolon"),
                value: scopeObj.view.lblDeliverByValue.text
            });
            printData.push({
                key: kony.i18n.getLocalizedString("i18n.pfm.totalDebitAmt"),
                value: scopeObj.view.lblFrequencyValue.text
            });
            if (scopeObj.view.lblNotesValue.text !== "") {
                printData.push({
                    key: kony.i18n.getLocalizedString("i18n.transfers.Description"),
                    value: scopeObj.view.lblNotesValue.text
                });
            }
            this.printFunction(scopeObj, printData);
        },
        printKUKL: function(scopeObj, printData, Info) {
            if(scopeObj.view.lblSuccessMessage.text!=kony.i18n.getLocalizedString("i18n.billPay.AcknowledgementMessage")){
                var statusValue="Payment Failed";
            }
            else{
                statusValue=kony.i18n.getLocalizedString("i18n.billPay.AcknowledgementMessage");
            }
            printData.push({
                key: kony.i18n.getLocalizedString("i18n.common.status"),
                value: statusValue
            });
            // printData.push({
            //     key: kony.i18n.getLocalizedString("i18n.common.status"),
            //     value: scopeObj.view.lblSuccessMessage.text
            // });
            printData.push({
                key: scopeObj.view.lblRefrenceNumber.text,
                value: scopeObj.view.lblRefrenceNumberValue.text
            });
            printData.push({
                key: scopeObj.view.lblFromKey.text,
                value: scopeObj.view.lblFromValue.text
            });
            printData.push({
                key: scopeObj.view.lblToKey.text,
                value: scopeObj.view.lblToValue.text
            });
            if(Info!="" && Info!=undefined){
            printData.push({
                key: "Customer Number",
                value: Info.customerNo ? Info.customerNo : "NA"
            });
            printData.push({
                key: "Conection Number",
                value: Info.connectionNo ? Info.connectionNo : "NA"
            });
        }
            printData.push({
                key: kony.i18n.getLocalizedString("i18n.feecolon"),
                value: scopeObj.view.lblDeliverByValue.text
            });
            printData.push({
                key: kony.i18n.getLocalizedString("i18n.pfm.totalDebitAmt"),
                value: scopeObj.view.lblFrequencyValue.text
            });
            if (scopeObj.view.lblNotesValue.text !== "") {
                printData.push({
                    key: kony.i18n.getLocalizedString("i18n.transfers.Description"),
                    value: scopeObj.view.lblNotesValue.text
                });
            }
            this.printFunction(scopeObj, printData);
        },
        printTopUpNepal:function(scopeObj, printData) {
            if(scopeObj.view.lblSuccessMessage.text!=kony.i18n.getLocalizedString("i18n.billPay.AcknowledgementMessage")){
                var statusValue="Payment Failed";
            }
            else{
                statusValue=kony.i18n.getLocalizedString("i18n.billPay.AcknowledgementMessage");
            }
            printData.push({
                key: kony.i18n.getLocalizedString("i18n.common.status"),
                value: statusValue
            });
            printData.push({
                key: scopeObj.view.lblRefrenceNumber.text,
                value: scopeObj.view.lblRefrenceNumberValue.text
            });
            printData.push({
                key: scopeObj.view.lblFromKey.text,
                value: scopeObj.view.lblFromValue.text
            });
            printData.push({
                key: scopeObj.view.lblToKey.text,
                value: scopeObj.view.lblToValue.text
            });
            var navMan = applicationManager.getNavigationManager();
            var MerchantFieldData=navMan.getCustomInfo("fieldValues");
            if (MerchantFieldData) {
            for(var j=0;j<Object.keys(MerchantFieldData).length;j++){
                if(Object.keys((MerchantFieldData))[j].toLowerCase()=="amount"){
                        var value="NPR " +this.convertAmountValue(Object.values((MerchantFieldData))[j]);
                    }else{
                    var value=Object.values((MerchantFieldData))[j];
                    }
            printData.push({
                key: Object.keys((MerchantFieldData))[j] + " :",
                value: value.toString() ? value.toString() : "NA",
            });
                }
            }
            printData.push({
                key: kony.i18n.getLocalizedString("i18n.feecolon"),
                value: scopeObj.view.lblDeliverByValue.text
            });
            printData.push({
                key: kony.i18n.getLocalizedString("i18n.pfm.totalDebitAmt"),
                value: scopeObj.view.lblFrequencyValue.text
            });
            if (scopeObj.view.lblNotesValue.text !== "") {
                printData.push({
                    key: kony.i18n.getLocalizedString("i18n.transfers.Description"),
                    value: scopeObj.view.lblNotesValue.text
                });
            }
            this.printFunction(scopeObj, printData);
        },
        printFunction: function(scopeObj, printData) {
            var viewModel = {
                moduleHeader: scopeObj.view.lblBillPayAcknowledgement.text,
                tableList: [{
                    tableHeader: kony.i18n.getLocalizedString("i18n.transfers.YourTransactionDetails"),
                    tableRows: printData
                }],
                printCallback: function() {
                    // kony.mvc.getNavigationManager().navigate({
                    //     context: this,
                    //     callbackModelConfig: {
                    //         payABillAcknowledgement: true
                    //     }
                    // });
                    applicationManager.getNavigationManager().navigateTo({
                        appName: 'BillPayMA',
                        friendlyName: 'frmPayBillAcknowledgement'
                    });
                }
            }
            scopeObj.presenter.showPrintPage({
                printKeyValueGroupModel: viewModel
            });
        },
        /*
         * Method to know whether given date value is future date or not
         * @param  {String} date to be compared in mm/dd/yyyy
         * @returns {boolean} true if future date else false
         */
        isFutureDate: function(date) {
            var scheduledDate = new Date(date);
            var endTimeToday = CommonUtilities.getServerDateObject();
            var minutes = ViewConstants.MAGIC_NUMBERS.MAX_MINUTES;
            endTimeToday.setHours(ViewConstants.MAGIC_NUMBERS.MAX_HOUR, minutes, minutes, minutes);
            if (scheduledDate.getTime() > endTimeToday.getTime()) {
                return true;
            }
            return false;
        },
        /**
         * logout dialog
         */
        onKeyPressCallBack: function(eventObject, eventPayload) {
            var self = this;
            if (eventPayload.keyCode === 27) {
                if (self.view.flxLogout.isVisible === true) {
                    self.view.flxDialogs.setVisibility(false);
                    self.view.flxLogout.isVisible = false;
                    self.view.customheader.headermenu.btnLogout.setActive(true);
                }
            }
        },
        setbilldata: function() {
            //this.view.flxContent.setVisibility(true);
            this.view.flxDetailsContainer.removeAll();
            var navMan = applicationManager.getNavigationManager();
            var MrchanstFieldData = navMan.getCustomInfo("responseFieldMapping");
            var resposeFields = navMan.getCustomInfo("LodgebillpayRes");
            var nofRows;
            if (MrchanstFieldData && resposeFields) {
                nofRows = MrchanstFieldData.length;
                for (var i = 0; i < nofRows; i++) {
                    // Create a new FlexContainer for each row
                    var flexRow = new kony.ui.FlexContainer({
                        "id": "flxRow" + MrchanstFieldData[i].fieldName + (i + 1),
                        "left": "0dp",
                        "top": "10dp",
                        "width": "100%",
                        //         "height": kony.flex.USE_PREFERRED_SIZE,
                        "height": "35dp",
                        "zIndex": 10,
                        "isVisible": true,
                        "skin": "sknflx",
                        "clipBounds": false,
                        "layoutType": kony.flex.FLOW_HORIZONTAL
                    });
                    var labelWidget = new kony.ui.Label({
                        "id": "lblCategory" + MrchanstFieldData[i].fieldName,
                        "text": MrchanstFieldData[i].fieldLabel + " :",
                        "height": kony.flex.USE_PREFERED_SIZE,
                        "isVisible": true,
                        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                        "width": "25%",
                        "left": "10dp",
                        "right": "",
                        "top": "5dp",
                        "skin": "sknlblFontCol000000Sanproreg",
                        "zIndex": 1
                    });
                    var labelWidget2 = new kony.ui.Label({
                        "id": "lbl" + MrchanstFieldData[i].fieldName + "Value",
                        "text": resposeFields[MrchanstFieldData[i].fieldName] ? resposeFields[MrchanstFieldData[i].fieldName] : "NA",
                        "height": kony.flex.USE_PREFERED_SIZE,
                        "isVisible": true,
                        "width": "35%",
                        "left": "10dp",
                        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                        "right": "",
                        "top": "5dp",
                        "skin": "sknlblFontCol000000Sanproreg",
                        "zIndex": 1
                    });
                    // Add the FlexContainer to the form
                    this.view.flxDetailsContainer.add(flexRow);
                    flexRow.add(labelWidget);
                    flexRow.add(labelWidget2);
                }
            }
        }
    };
});