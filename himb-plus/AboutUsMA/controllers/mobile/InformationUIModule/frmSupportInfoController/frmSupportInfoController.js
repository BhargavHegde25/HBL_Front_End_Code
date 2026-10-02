define({
    searchStatus: {
        isTitleBarVisible: true,
        isSearchBoxVisible: true,
        isSearchBoxWithCancelVisible: false,
        isSegmentVisible: false
    },

    preShow: function () {
        var navManager = applicationManager.getNavigationManager();
        var userObj = applicationManager.getUserPreferencesManager();

        if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
            if (userObj.isUserLoggedin() === true) {
                this.view.enabledForIdleTimeout = true;
            } else {
                this.view.enabledForIdleTimeout = false;
            }
        }

        var navData = navManager.getCustomInfo("frmSupportInfo");
        var populateData = navData.richTextData;
        var headerValue = navData.header;

        this.view.flxTermsConditions.scrollsToTop = true;
        this.view.customHeader.lblLocateUs.text = headerValue;
        this.view.onDeviceBack = this.backIcon;

        if (applicationManager.getStorageManager().getStoredItem("langObj") &&
            applicationManager.getStorageManager().getStoredItem("langObj").language === 'Arabic') {
            this.view.customHeader.imgBack.src = "backbutton_reverse.png";
        }

        this.view.customHeader.flxBack.onClick = this.backIcon;

        var configManager = applicationManager.getConfigurationManager();
        var isDarkTheme = kony.theme.getCurrentTheme() === "darkTheme" ? true : false;
        if (headerValue === configManager.constants.FAQ) {
            this.view.title = configManager.constants.HEADERFAQ;
            this.view.customHeader.lblLocateUs.text = configManager.constants.HEADERFAQ;
            this.searchStatus.isSearchBoxVisible = false;
            this.view.flxBrowserContent.isVisible = false;

            // Bind FAQ data with all sections collapsed on load
            this.bindFAQData(populateData);

            this.searchStatus.isSegmentVisible = true;

        } else if (headerValue === configManager.constants.TERMS) {
            populateData = this.injectFontStyles(populateData, isDarkTheme);
             this.view.flxBrowserContent.isVisible = true;
             this.view.segFaq.setVisibility(false);

            this.searchStatus.isSearchBoxVisible = false;
            this.searchStatus.isSegmentVisible = false;
            this.view.title = configManager.constants.HEADERTERMSANDCONDITIONS;
            this.view.customHeader.lblLocateUs.text = configManager.constants.HEADERTERMSANDCONDITIONS;
            this.view.browserContent.htmlString = populateData;

        } else if (headerValue === configManager.constants.PRIVACY) {
            populateData = this.injectFontStyles(populateData, isDarkTheme);
             this.view.flxBrowserContent.isVisible = true;
             this.view.segFaq.setVisibility(false);
            
            this.searchStatus.isSearchBoxVisible = false;
            this.searchStatus.isSegmentVisible = false;
            this.view.title = configManager.constants.HEADERPRIVACYPOLICY;
            this.view.customHeader.lblLocateUs.text = configManager.constants.HEADERPRIVACYPOLICY;
            this.view.browserContent.htmlString = populateData;
        }

        this.view.postShow = this.postshow;
        this.renderScreen();
        applicationManager.getPresentationUtility().dismissLoadingScreen();

        var currentForm = navManager.getCurrentForm();
        applicationManager.getPresentationFormUtility().logFormName(currentForm);
    },

    /**
     * Helper function to inject consistent font styles with dark mode support
     * @param {string} content HTML content to wrap
     * @param {boolean} isDarkTheme Whether to apply dark theme styles
     * @returns {string} HTML with injected styles
     */
    injectFontStyles: function (content, isDarkTheme) {
        var backgroundColor = isDarkTheme ? "#1e1e1e" : "#ffffff";
        var textColor = isDarkTheme ? "#ffffff" : "#1e1e1e";

        var isIphone = applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone";
        var bodyFontSize = isIphone ? "20px" : "14px";
        var headerFontSize = isIphone ? "23px" : "18px";
        var paraFontSize = isIphone ? "23px" : "18px";

        var style = `<style>
            body {
                background-color: ${backgroundColor};
                color: ${textColor};
                font-family: 'Source Sans Pro', sans-serif;
                font-weight: 400;
                font-style: normal;
                font-size: ${bodyFontSize};
                line-height: 100%;
                letter-spacing: 0%;
                margin: 0;
                padding: 16px;
            }
            h1, h2, h3, h4, h5, h6 {
                font-weight: 600;
                font-style: normal;
                font-size: ${headerFontSize};
                line-height: 100%;
                letter-spacing: 0%;
                margin-top: 20px;
                margin-bottom: 8px;
            }
            p {
                font-weight: 400;
                font-style: normal;
                font-size: ${paraFontSize};
                line-height: 100%;
                letter-spacing: 0%;
                margin: 10px 0;
            }
            a {
                color: ${isDarkTheme ? '#1e1e1e' : '#ffffff'};
                text-decoration: none;
            }
            a:hover {
                text-decoration: underline;
            }
        </style>`;

        return `<!DOCTYPE html><html lang="en"><head>${style}</head><body>${content}</body></html>`;
    },

    postshow: function () {
        this.view.browserContent.enableParentScrollingWhenReachToBoundaries = false;
    },

    init: function () {
        var navManager = applicationManager.getNavigationManager();
        var currentForm = navManager.getCurrentForm();
        applicationManager.getPresentationFormUtility().initCommonActions(this, "YES", currentForm);
    },

    backIcon: function () {
        var informationPC = kony.mvc.MDAApplication.getSharedInstance()
            .getModuleManager()
            .getModule({ "appName": "AboutUsMA", "moduleName": "InformationUIModule" });
        informationPC.presentationController.commonFunctionForNavigation(
            { "appName": "AboutUsMA", "friendlyName": "InformationUIModule/frmSupport" });
    },

    bindFAQData: function (data) {
        this.view.segFaq.widgetDataMap = {
            "lblQuestion": "question",//row
            "lblAnswer": "answer",//row
            "flxInnerContainer": "flxInnerContainer",//row
            "flxInnerContainerRow": "flxInnerContainerRow",//row
            "flxLeftCurvRow": "flxLeftCurvRow",//row
            "flxSupportMain":"flxSupportMain",
            "lblHeader": "lblHeader",//header
            "imgUpArrow": "imgUpArrow",//header
            "flxLeftCurv":"flxLeftCurv",//header
            "flxTransactionMainContainer":"flxTransactionMainContainer",//header
            "flxTransactionHBlContainer":"flxTransactionHBlContainer",//header
            "flxRowLeftLine":"flxRowLeftLine"
        };
        /**
         sknFlxBG851a1cOnlyBottomLRadius8BB - only bottom left right radius for left red line - for row after selecting last row
        thi one changed, if any issue revert  --   sknFlxBG851a1cONLYTopLeftRadius16BB - only top left radius - for header - after selecting
         sknFlxBG851a1cTopLeftRadius8BB - 
         sknFlxBG851a1cNoRadiusBB -- no radius for row seg - for row template - between row seg
         // hold this skin - sknFlxBG851a1cLeftTopBottomRadius8BB 
         
         sknFlxBorderBG851a1c4x4xradius8BB - top left bottom left - for header before selecting


         header content bg
         sknflxffffff4x4Radius8BB - header bg - white bg all radius before selecting
         sknflxf3e9e94x4Radius8BB - header bg - pink bg all radius for header after selecting

         header left line
         sknFlxBorderBG851a1c4x4xradius8BB - left line - before slecting
         sknFlxBG851a1cONLYTopLeftRadius16BB - left line - after slecting


         row content - no change
         row left line
         sknFlxBG851a1cNoRadiusBB - after selecting no radius for all row seg except last seg
         sknFlxBG851a1cOnlyBottomLRadius8BB - after selecting last seg for bottom curv
         */

        // Deep copy of original data to keep answers for toggling
        this.segmentData = JSON.parse(JSON.stringify(data));

        // Collapse all sections on load (empty answers, arrow down)
        data.forEach(function (section) {
            section[0].imgUpArrow = { "src": "arrow_down.png" };
            section[1] = [];  // Hide answers initially
        });

        this.view.segFaq.setData(data);

        // Make FAQ headings clickable - toggle expand/collapse on row click
        this.view.segFaq.onRowClick = this.rowExpandCollapse.bind(this);
    },

    rowExpandCollapse: function (context) {
        try {
            var sectionIndex = context.section;
            var data = this.view.segFaq.data;

            var isExpanded = data[sectionIndex][1].length > 0;

            // Collapse all sections first
            data.forEach(function (section) {
                section[1] = [];  // Hide answers
                section[0].imgUpArrow = { "src": "arrow_down.png" };
                section[0].flxLeftCurv = { "skin": "sknFlxBorderBG851a1c4x4xradius8BB" };
                section[0].flxTransactionMainContainer = { "skin": "sknflxffffff4x4Radius8BB" };
                section[0].flxTransactionHBlContainer = { "skin": "sknflxHBL4x4Radius8f6f6f6BB" };
            });

            if (!isExpanded) {
                //dynamic skin changes
                // data.forEach(function (section) {
                //     for (var i in section) {
                //         section[1][i].flxLeftCurvRow = {
                //             "skin": "sknFlxBG851a1cNoRadiusBB"
                //         };
                //         section[1][i].flxInnerContainerRow = {
                //             "skin": "f9f9"
                //         };
                //         var lastEle = section[1].length - 1;

                //         section[1][lastEle].flxLeftCurvRow = {
                //             "skin": "sknFlxBG851a1cOnlyBottomLRadius8BB"
                //         };
                //         section[1][lastEle].flxInnerContainerRow = {
                //             "skin": "sknFlxBGffffffOnlyBottomLRadius8"
                //         };
                //     }
                // });
                //header skin changes
                data[sectionIndex][0].flxLeftCurv = { "skin": "sknFlxBGBorder851a1cSegHeadTopRadius8BB" };//before on click skin -> sknFlxBorderBG851a1c4x4xradius8BB
                data[sectionIndex][0].flxTransactionMainContainer = { "skin": "sknflxf3e9e9SegHeadTopRadius8BB" };//before on click skin -> sknflxffffff4x4Radius8BB // pink - sknFlxff3e9e9BB
                data[sectionIndex][0].flxTransactionHBlContainer = { "skin": "sknflxHBL4x4Radius8f6f6f6BB"};//"sknflxHBLSegHeasdMainTopRadius8f6f6f6BB" };//before on click skin -> sknflxHBL4x4Radius8f6f6f6BB

                var rowTempData = this.segmentData[sectionIndex][1];
                for (var i in rowTempData) {
                    rowTempData[i].flxLeftCurvRow = {
                        "skin": "sknFlxBG851a1cNoBorderNoRadius",//"sknFlxBG851a1cNoRadiusBB"
                    };
                    rowTempData[i].flxInnerContainerRow = {
                        "skin": "f9f9"//after clicking - sknFlxBGffffffOnlyBottomLRadius8
                    };
                    rowTempData[i].flxSupportMain = {
                        "skin": "sknFlxBGffffffNoBorderNoRadiusBB"
                    };
                }
                var rowTempLastEle = rowTempData.length - 1;
                rowTempData[rowTempLastEle].flxLeftCurvRow = {
                    "skin": "sknFlxBG851a1cOnlyBottomLRadius8BB"
                }
                rowTempData[rowTempLastEle].flxInnerContainerRow = {
                    "skin": "sknFlxBGffffffOnlyBottomLRadius8"
                };
                rowTempData[rowTempLastEle].flxSupportMain = {
                    "skin": "sknFlxBGffffffOnlyBottomLRadius8"
                }
                // rowTempData[rowTempLastEle].flxRowLeftLine = {
                //     "bottom": "0%"
                // }
                // rowTempData[0].flxRowLeftLine = {
                //     "top": "1%"
                // }
                // Expand clicked section only if it was collapsed
                data[sectionIndex][1] = rowTempData;
                data[sectionIndex][0].imgUpArrow = { "src": "arrowupblue.png" };
            }

            this.view.segFaq.setData(data);

        } catch (err) {
            if (typeof this.onError === "function") {
                var errorObj = {
                    errorInfo: "Error in rowExpandCollapse",
                    errorLevel: "Configuration",
                    error: err
                };
                this.onError(errorObj);
            } else {
                kony.print("Error in rowExpandCollapse: " + err.message);
                console.error(err);
            }
        }
    },

    renderScreen: function () {
        var flxHeight = 0;
        this.view.flxHeader.setVisibility(false);
        this.view.flxHeaderTermsConditions.setVisibility(false);
        this.view.flxHeaderSearchbox.setVisibility(false);
        this.view.customSearch.flxSearchMain.setVisibility(false);
        this.view.customSearch.flxHeader.setVisibility(false);

        if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
            if (this.searchStatus.isSearchBoxVisible) {
                this.view.flxHeaderTermsConditions.setVisibility(true);
                this.view.customSearch.flxSearchMain.setVisibility(true);
                flxHeight += 50;
            }
            if (this.searchStatus.isSearchBoxWithCancelVisible) {
                this.view.flxHeaderSearchbox.setVisibility(true);
                flxHeight += 40;
            }
            this.view.flxMainContainer.top = "0dp";
        } else {
            if (this.searchStatus.isTitleBarVisible) {
                this.view.flxHeader.setVisibility(true);
                flxHeight += 56;
            }
            if (this.searchStatus.isSearchBoxVisible) {
                this.view.flxHeaderTermsConditions.setVisibility(true);
                this.view.customSearch.flxSearchMain.setVisibility(true);
                flxHeight += 50;
            }
            if (this.searchStatus.isSearchBoxWithCancelVisible) {
                this.view.flxHeaderSearchbox.setVisibility(true);
                flxHeight += 40;
            }
        }

        // this.view.flxTermsConditions.top = "10dp";
        // this.view.browserContent.width = "97.7%";
        // this.view.browserContent.height = "99%";
        // this.view.browserContent.centerY = "default";
        // this.view.browserContent.top = "-20dp";

        if (this.searchStatus.isSegmentVisible) {
            this.view.browserContent.setVisibility(false);
            this.view.segFaq.setVisibility(true);
        } else {
            this.view.browserContent.setVisibility(true);
            this.view.segFaq.setVisibility(false);
        }
    }
});