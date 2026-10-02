define(['FormControllerUtility','OLBConstants', 'CommonUtilities'], function (FormControllerUtility, OLBConstants , CommonUtilities){ 
return {
        itemsPerPage: 10,
        totalPage: "",
         currentPage: 1,
         dataArray: [],
        preShow: function() {
            var scope = this;
            var ManageActivitiesPresenter = applicationManager.getModulesPresentationController({
                "appName": "TransfersMA",
                "moduleName": "ManageActivitiesUIModule"
            });
            ManageActivitiesPresenter.geteSewaTransferActivities();
            this.view.flxPaginationNext.onClick = this.nextPage.bind(this);
            this.view.flxPaginationPrevious.onClick = this.previousPage.bind(this);
            this.view.txtSearch.onTextChange = this.initateSearch.bind(this);
            this.view.flxSearch.left ="10dp";
            this.view.lblManagePayments.text ="eSewa Transaction History";
            this.view.lblManagePayments.skin ="sknLbl851a1cPx20";
        },
        updateFormUI: function(context) {
            if (context.transactionActivity) {
                kony.application.dismissLoadingScreen();
                this.dataArray = context.transactionActivity.Transactions;
                if(context.transactionActivity.Transactions != undefined && context.transactionActivity.Transactions != null){
                    this.displayData(context.transactionActivity.Transactions);
                    this.view.flxNoTransactions.setVisibility(false);
                    this.view.flxsegment.setVisibility(true);
                    this.view.flxPagination.setVisibility(true);
                }
                else{
                    this.view.flxNoTransactions.setVisibility(true);
                    this.view.flxsegment.setVisibility(false);
                    this.view.flxPagination.setVisibility(false);
                }
                // this.setTransactionListDesktop(context.transactionActivity);
            }
        },
        initateSearch : function(){
            var searchText =this.view.txtSearch.text.toLowerCase();
                if(searchText != ""){
                    var result = [];
					var data = this.dataArray;
					for (var i = 0; i < data.length; i++) {
						if ((data[i].OriginatingUniqueId && data[i].OriginatingUniqueId.toLowerCase().indexOf(searchText) != -1) ) {
							result.push(data[i]);
						}
					}
					if ((result.length > 0)) {
						this.displayData(result);
					} else {
						this.view.segmentTransfers.removeAll();
						this.displayData(result);
						this.view.segmentTransfers.setVisibility(true);
					}
                }else{
                    this.view.segmentTransfers.removeAll();
					this.displayData(this.dataArray);
					this.view.segmentTransfers.setVisibility(true);
                }
		},
        setTransactionListDesktop: function(response) {
            var scope = this;
            this.view.segmentTransfers.widgetDataMap = this.getWidgetDataMap();
            var segmentData = response.map(function(dataItem) {
                return {
                    "lblColumn1": {
                        "text":  scope.setDateFormat(dataItem.TransactionDate.split(" ")[0])
                    },
                    "flxTransferActivitiesIC": {
                        "height": "50px"
                    },
                    // "flxColumn1":{
                    //     "left" :"5%"
                    // },
                    "Row1": {
                        "skin": "sknSegAccountTypeFocus"
                    },
                    "lblColumn2": {
                        "text": dataItem.EsewaId
                    },
                    "lblColumn3": {
                        "text": "NPR " + dataItem.Amount
                    },
                    "flxColumn3":{
                        "left":"4%"
                    },
                    "lblColumn4": {
                        "text": dataItem.Status
                    },
                    "lblColumn5": {
                        "isVisible": false
                    },
                    "flxRow1": {
                        "isVisible": false
                    },
                    "flxRow2": {
                        "isVisible": false
                    },
                    "flxRow3": {
                        "isVisible": false
                    },
                    "btnAction": {
                        "isVisible": true,
                        "text": "Repeat",
                        "onClick": function(eventobj, rowIndex) {
                            scope.repeatOnClick(eventobj, rowIndex);
                        }.bind(this),
                    },
                    "btn1": {
                        "isVisible": true,
                        "text": "Download",
                         "onClick": function(eventobj, rowIndex) {
                            scope.downLoadOnClick(eventobj, rowIndex);
                        }.bind(this),
                        "left":"35%"
                    },
                    "btn2": {
                        "isVisible": false
                    },
                    "btn3": {
                        "isVisible": false
                    },
                    "imgIcon4": {
                        "skin": (dataItem.Status === "COMPLETE") ? "ICSknbbSknLblFontIcon9pxActive" : (dataItem.Status === "failed") ? "ICSknbbSknLblFontIconRejected" : "ICSknbbSknLblFontIconPending"
                    },
                    "valueField2": {
                        "text": scope.setFromAccount(dataItem.SourceAccountNo, dataItem.SenderName)
                    },
                    "lblField8": {
                        "text": dataItem.SourceAccountNo
                    },
                    "lblField2": {
                        "text": "From Account:"
                    },
                    "lblField1": {
                        "text": "TransactionId:"
                    },
                    "valueField1": {
                        "text": dataItem.TransactionId
                    },
                    "lblField4": {
                        "text": "Channel"
                    },
                    "valueField4": {
                        "text": dataItem.Channel
                    },
                    "lblField3": {
                        "text": "Charges"
                    },
                    "valueField3": {
                        "text": ""
                    },
                    "lblField5": {
                        "text": "Purpose"
                    },
                    "valueField5": {
                        "text": dataItem.Purpose
                    },
                    "lblField6": {
                        "text": "Reference ID:"
                    },
                    "flxField8": {
                        "isVisible": false
                    },
                    "flxField4": {
                        "left": "62%"
                    },
                    "valueField6": {
                        "text": dataItem.OriginatingUniqueId
                    },
                    "flxField7": {
                        "isVisible": true,
                        "left": "56%"
                    },
                    "lblField7":{
                        "text" : "Fee:"
                    },
                    "valueField7":{
                        "text": "NPR " + dataItem.Fee
                    },
                    "flxField3": {
                        "isVisible": false
                    },
                    "flxIdentifier": {
                        "height": "50px",
                        "skin": "sknFlexTransaprent"
                    },
                    "flxSelectedRowWrapper": {
                        "height": "50px",
                        "top": "10px",
                        "skin": "sknFlxBgHeader",
                        "onHover": function(eventobj, widgetRef) {
                            scope.hoverSkinadding(eventobj, widgetRef);
                        }.bind(this),
                    },
                    "btnDropdown": {
                        "onClick": function(eventobj, rowIndex, sectionIndex) {
                            scope.btnToggleClick(eventobj, rowIndex, sectionIndex)
                        }.bind(this)
                    },
                    "flxbtn1": {
                        "isVisible": false
                    },
                    "flxAction":{
                        "left" : "0%"
                    }
                    // "btn1": {
                    //      "isVisible": false
                    // }
                    // "flxDropdown":{
                    //     "isVisible" : false
                    // }
                }
            });
            this.view.segmentTransfers.setData(segmentData);
        },
        displayData: function(historyData) {
            var dataToSplit;
            if (historyData) {
                this.totalPage = historyData.length;
                dataToSplit = historyData;
            } else {
                this.totalPage = this.dataArray.length;
                dataToSplit = this.dataArray;
            }
            if (this.currentPage == 1) {
                this.view.lblPagination.text = this.currentPage + " - " + 10 + " Transactions";
            } else {
                this.view.lblPagination.text = (this.currentPage * 10) - 10 + " - " + (this.currentPage * 10 > this.totalPage ? this.totalPage : this.currentPage * 10) + " Transactions";
            }
            var startIndex = (this.currentPage - 1) * this.itemsPerPage;
            var endIndex = startIndex + this.itemsPerPage;
            var dataToShow = dataToSplit.slice(startIndex, endIndex);
            this.view.imgPaginationPrevious.src = "pagination_back_blue.png";
            this.view.imgPaginationNext.src = "pagination_blue.png";
            if (Math.ceil(dataToSplit.length / 10) == this.currentPage) {
                this.view.flxPaginationNext.setEnabled(false);
                this.view.flxPaginationPrevious.setEnabled(true);
                this.view.imgPaginationNext.src = "pagination_next_inactive.png";
                this.view.imgPaginationPrevious.src = "pagination_back_blue.png";
            } else {
                this.view.flxPaginationNext.setEnabled(true);
                this.view.flxPaginationPrevious.setEnabled(true);
                this.view.imgPaginationPrevious.src = "pagination_back_blue.png";
                if (this.currentPage == 1) {
                    this.view.flxPaginationPrevious.setEnabled(false);
                    this.view.imgPaginationNext.src = "pagination_blue.png";
                    this.view.imgPaginationPrevious.src = "pagination_back_inactive.png";
                }
            }
            this.setTransactionListDesktop(dataToShow);
            // this.view.flxTransactionHistory.forceLayout();
        },
        nextPage: function() {
            this.currentPage++;
            this.displayData();
        },
        previousPage: function() {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.displayData();
            }
        },
        downLoadOnClick : function(eventobj, rowData){
            var scope = this;
            var data = scope.view.segmentTransfers.data;
            var index = rowData.rowIndex;
            param = {
                "transactionId": data[index].valueField6.text
            }
            var ManageActivitiesPresenter = applicationManager.getModulesPresentationController({
                "appName": "TransfersMA",
                "moduleName": "ManageActivitiesUIModule"
            });
            ManageActivitiesPresenter.generatePdf(param);
        },
        setDateFormat : function(date){
            var dateformat = new Date(date);
            var day = String(dateformat.getDate()).padStart(2, '0');
            var month = String(dateformat.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
            var year = dateformat.getFullYear();

            var formattedDate = `${day}/${month}/${year}`;
            return formattedDate;
        },
        repeatOnClick: function(eventobj, rowData) {
            var scope = this;
            var data = scope.view.segmentTransfers.data;
            var index = rowData.rowIndex;
            param = {
                "accNum": data[index].lblField8.text,
                "amount": data[index].lblColumn3.text.replace("NPR",""),
                "eSewaId": data[index].lblColumn2.text,
                "purpose": data[index].valueField5.text
            }
            applicationManager.getNavigationManager().navigateTo({
                "appName": "TransfersMA",
                "friendlyName": "UnifiedTransferFlowUIModule/frmLoadEsewa"
            });
            applicationManager.getNavigationManager().updateForm({
                "repeat": param
            }, "frmLoadEsewa");
        },
        btnToggleClick: function(eventobj, segInfo) {
            var currentBreakPoint = kony.application.getCurrentBreakpoint();
            var scope = this;
            var data = scope.view.segmentTransfers.data;
            var index = segInfo.rowIndex;
            sectionIdx = segInfo.sectionIndex;
            sectionIdx = segInfo.sectionIndex;
            rowIdx = segInfo.rowIndex;
            if (data[index].btnDropdown.text === "O") {
                data[index].flxRow1.isVisible = true;
                data[index].flxRow2.isVisible = true;
                data[index].flxSelectedRowWrapper.height = "200px";
                data[index].flxIdentifier.height = "200px";
                data[index].btnDropdown.text = "P";
                data[index].flxbtn1.isVisible = true;
            } else {
                data[index].flxRow1.isVisible = false;
                data[index].flxRow2.isVisible = false;
                data[index].flxSelectedRowWrapper.height = "50px";
                data[index].flxIdentifier.height = "50px";
                data[index].btnDropdown.text = "O";
            }
            this.view.segmentTransfers.setDataAt(data[index], index, index[0]);
            this.view.forceLayout();
        },
        hoverSkinadding: function(eventobj, context) {
            if (context.eventType === constants.ONHOVER_MOUSE_ENTER) {
                eventobj.skin = "sknSegAccountHover";
            } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
                eventobj.skin = "sknFlxBgHeader";
            }
        },
        setFromAccount: function(accNum, Name) {
            var maskAccNum = CommonUtilities.getAccountDisplayName({
                name: Name,
                accountID: accNum,
                Account_id: accNum
            })
            return maskAccNum;
        },
        getWidgetDataMap: function() {
            return {
                "flxTransferActivitiesIC": "flxTransferActivitiesIC",
                "flxTransferActivitiesMobileIC": "flxTransferActivitiesMobileIC",
                "flxIdentifier": "flxIdentifier",
                "lblIdentifier": "lblIdentifier",
                "flxSelectedRowWrapper": "flxSelectedRowWrapper",
                "flxTransfers": "flxTransfers",
                "flxColumn1": "flxColumn1",
                "flxColumn2": "flxColumn2",
                "flxColumn3": "flxColumn3",
                "flxColumn4": "flxColumn4",
                "flxIcon": "flxIcon",
                "flxIcon1": "flxIcon1",
                "flxIcon3": "flxIcon3",
                "flxIcon4": "flxIcon4",
                "btnAction": "btnAction",
                "lblSeparator": "lblSeparator",
                "flxDetail": "flxDetail",
                "flxRow": "flxRow",
                "flxRow1": "flxRow1",
                "flxField1": "flxField1",
                "flxField2": "flxField2",
                "flxField3": "flxField3",
                "flxRow2": "flxRow2",
                "flxField4": "flxField4",
                "flxField5": "flxField5",
                "flxField6": "flxField6",
                "flxRow3": "flxRow3",
                "flxField7": "flxField7",
                "flxField8": "flxField8",
                "flxField9": "flxField9",
                "lblColumn1": "lblColumn1",
                "lblColumn2": "lblColumn2",
                "lblColumn3": "lblColumn3",
                "imgIcon": "imgIcon",
                "imgIcon1": "imgIcon1",
                "imgIcon3": "imgIcon3",
                "imgIcon4": "imgIcon4",
                //"imgDropdown": "imgDropdown",
                "btnDropdown": "btnDropdown",
                "flxDropdown": "flxDropdown",
                "lblField1": "lblField1",
                "lblField2": "lblField2",
                "lblField3": "lblField3",
                "lblField4": "lblField4",
                "lblField5": "lblField5",
                "lblField6": "lblField6",
                "lblField7": "lblField7",
                "lblField8": "lblField8",
                "lblField9": "lblField9",
                "valueField1": "valueField1",
                "valueField2": "valueField2",
                "valueField3": "valueField3",
                "valueField4": "valueField4",
                "valueField5": "valueField5",
                "valueField6": "valueField6",
                "valueField7": "valueField7",
                "valueField8": "valueField8",
                "valueField9": "valueField9",
                "flxActions": "flxActions",
                "btn1": "btn1",
                "btn2": "btn2",
                "btn3": "btn3",
                "btn4": "btn4",
                "flxbtn1": "flxbtn1",
                "flxbtn2": "flxbtn2",
                "flxbtn3": "flxbtn3",
                "flxbtn4": "flxbtn4",
                "Column1": "Column1",
                "flxImage1": "flxImage1",
                "Column2": "Column2",
                "Column3": "Column3",
                "flxAction": "flxAction",
                "Column4": "Column4",
                "lblColumn4": "lblColumn4",
                "flxField10": "flxField10",
                "lblField10": "lblField10",
                "valueField10": "valueField10",
                "flxField11": "flxField11",
                "lblField11": "lblField11",
                "valueField11": "valueField11",
                "flxField12": "flxField12",
                "lblField12": "lblField12",
                "valueField12": "valueField12",
                "flxColumn1Wrapper": "flxColumn1Wrapper",
                "lblColumn1Row1": "lblColumn1Row1",
                "lblColumn1Row2": "lblColumn1Row2",
                "valuelblRowField1": "valuelblRowField1",
                "valuelblRowField2": "valuelblRowField2",
                "valuelblRowField3": "valuelblRowField3",
                "valuelblRowField4": "valuelblRowField4",
                "valuelblRowField5": "valuelblRowField5",
                "valuelblRowField6": "valuelblRowField6",
                "valuelblRowField7": "valuelblRowField7",
                "valuelblRowField8": "valuelblRowField8",
                "valuelblRowField9": "valuelblRowField9",
                "flxRowField1": "flxRowField1",
                "flxRowField2": "flxRowField2",
                "flxRowField3": "flxRowField3",
                "flxRowField4": "flxRowField4",
                "flxRowField5": "flxRowField5",
                "flxRowField6": "flxRowField6",
                "flxRowField7": "flxRowField7",
                "flxRowField8": "flxRowField8",
                "flxRowField9": "flxRowField9",
                "lblSeparator1": "lblSeparator1",
                "lblRowField1": "lblRowField1",
                "lblRowField2": "lblRowField2",
                "lblRowField3": "lblRowField3",
                "lblRowField4": "lblRowField4",
                "lblRowField5": "lblRowField5",
                "lblRowField6": "lblRowField6",
                "lblRowField7": "lblRowField7",
                "lblRowField8": "lblRowField8",
                "lblRowField9": "lblRowField9",
                "flxRowColumn4": "flxRowColumn4",
                "lblRowColumn4": "lblRowColumn4",
                "valuelblRowColumn4": "valuelblRowColumn4",
                "lblSeparatorLineAction1": "lblSeparatorLineAction1",
                "btnEdit": "btnEdit",
                "lblSeparatorLineAction2": "lblSeparatorLineAction2",
                "btnRemoveRecipient": "btnRemoveRecipient",
                "lblSeparatorLineAction3": "lblSeparatorLineAction3",
                "lblColumn1Dupilicate": "lblColumn1Dupilicate",
                "lblColumn2Dupilicate": "lblColumn2Dupilicate",
                "lblColumn3Dupilicate": "lblColumn3Dupilicate",
                "lblColumn4Dupilicate": "lblColumn4Dupilicate"
            };
        },
    }
 });