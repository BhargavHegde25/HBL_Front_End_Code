/*eslint-disable*/
define(['./portfolioListDAO','./ParserUtilsManager','./FormatUtils','./CacheUtils','ViewConstants','./EntitlementUtils'],function(PortfolioListDAO,ParserUtilsManager,FormatUtils,CacheUtils,ViewConstants,EntitlementUtils) {

  return {
      sortByValue: "",
    selectedPeriod: {},
    isSelected: "",
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      //var navManager = applicationManager.getNavigationManager();
      //var data1 = navManager.getCustomInfo('DownloadType');
      this.isRTL = scope_WealthPresentationController.rtlLocale.includes(kony.i18n.getCurrentLocale());
      this.flag="";
	  this.flagDropDown = 0;
      this.newDate="";
      this.reportParams={};
      this.fieldOrder="";
      this.dateText ="";
      this.dateKey = "";
      this.dateLabelArr = [];
      this.dateKeyArr = [];
      this.width="";
      this.orientationHandler = new OrientationHandler();
      this.tempData={};
      this.tempSelectedColumn=[];
      this.tempDisplayNames={};
      this.tempColumnSelect={};
      this.typesOfColumn= {};
      this.currenciesOfColumn = {};
      this.selectedTab="";
      this.sortData="description";
      this.sortType="ASC";
      this.sortNone=ViewConstants.IMAGES.SORTING;
      this.sortAsc=ViewConstants.IMAGES.SORTING_PREVIOUS;
      this.sortDesc=ViewConstants.IMAGES.SORTING_NEXT;
      this.canceledOrderId = "";
      this.rowIndex = "";
      this.isEntitledForOpenOrder = "";
      this.isEntitledForHistoryOrder = "";
      //request params
      this.params = {};
      this.offset = "0";
      this.sorting= "desc";
      this.searchText = "";
      this.noOfRecords = "10";
      this.currPage = "";
      this.sortBy = "";
      this.startDate = "";
      this.endDate = "";
      this.orderId = "";
      this.orderType = "";
      this.benchMarkIndex = "";
      this.duration = "";
      this.accountId = "";
       this.isIncludeOrder = "";
      this.completeResponse = {};
      this.completeIncludeOrderResponse = {};
      this.colDisplayNames = {};
   this.features={};
      this.permissionForGenerateReport="";
      this.permissionForDownloadReport="";
      //custom properties
 
      this._GAobjectServiceName="";
      this._GAobjectName="";
      this._GAoperationName="";
      this._GAcriteria="";
      this._sknFilterActiveTab="";
      this._sknFilterActiveTabHover="";
      this._sknFilterInactiveTab="";
      this._sknFilterInactiveTabHover="";
      this._sknRowSeperator="";
      this._sknTableLabelHeader="";
      this._sknTableLabelField="";
      this._sknActionButtons="";
      this._sknSearchLabel="";
      this._sknSearchTextbox="";
      this._sknSearchActiveTextbox="";
      this._sknSearchDropdown="";
      this._sknSearchActiveDropdown="";
      this._sknSearchCalendar="";
      this._sknSearchActiveCalendar="";
      this._iconSearch="";
      this._iconDownload="";
      this._iconPrint="";
      this._iconRowExpand="";
      this._iconRowCollapse="";
      this._iconColumnSort="";
      this._iconColumnSortAsc="";
      this._iconColumnSortDesc="";
      this._iconRadioActive="";
      this._iconRadioInactive="";
      this._amountFormat = "";
      this._dateFormat  = "";
      this._backendDateFormat = "";
      this._percentageFormat = "";
   
      this._sknPositiveAmount = "";
      this._sknNegativeAmount = "";
      this._sknDate = "";
      this._sknPercentage = "";
      this._tabOneDateFilterLabels = "";
      this._tabOneDateFilterKeys = "";
      this._tabOneDateFilterDefaultKey = "";
      this._tabTwoDateFilterLabels = "";
      this._tabTwoDateFilterKeys = "";
      this._tabTwoDateFilterDefaultKey = "";
      this._tabThreeDateFilterLabels = "";
      this._tabThreeDateFilterKeys = "";
      this._tabThreeDateFilterDefaultKey = "";
      this._tabFourDateFilterLabels = "";
      this._tabFourDateFilterKeys = "";
      this._tabFourDateFilterDefaultKey = "";
      this._tabFiveDateFilterLabels = "";
      this._tabFiveDateFilterKeys = "";
      this._tabFiveDateFilterDefaultKey = "";
      this._tabSixDateFilterLabels = "";
      this._tabSixDateFilterKeys = "";
      this._tabSixDateFilterDefaultKey = "";
      
      //Search fields
      this._searchLabel1 = "";
      this._searchLabel2 = "";
      this._searchLabel3 = "";
      this._searchLabel4 = "";
      this._searchLabel5 = "";
      this._searchLabel6 = "";
      this._val1PlaceHolder = "";
      this._val4FromPlaceHolder = "";
      this._val4ToPlaceHolder = "";
	  
      
      //Tabs
      //Tab One
       this._tabOneName = "";
       this._tabOneOptions = "";
       this._tabOneFilterOptions = "";
       this._tabOneRadioOptions = false;
       this._tabOneObjService = "";
       this._tabOneObjName = "";
       this._tabOneOperation = "";
       this._tabOneCriteria = "";
       this._tabOneIdentifier = "";
       this._tabOneResponseArray = "";
       this._tabOneResponseId ="";
       this._tabOneFields = "";
       this._tabOneContextualMenuRequired = false;
	   this._tabOneDockFirstColumn =  true;
	   this._tabOneContextMenuLabel = [];
       this._tabOneContextMenuAction = [];
       this._tabOnePerformanceConfig = "";
	   this._tabOneFeatures="";
     this._tabOneContextMenuPermission="";
      //Tab Two
       this._tabTwoName = "";
       this._tabTwoOptions = "";
       this._tabTwoFilterOptions = "";
       this._tabTwoRadioOptions = false;
       this._tabTwoObjService = "";
       this._tabTwoObjName = "";
       this._tabTwoOperation = "";
       this._tabTwoCriteria = "";
       this._tabTwoIdentifier = "";
       this._tabTwoResponseArray = "";
       this._tabTwoResponseId = "";
       this._tabTwoFields = "";
       this._tabTwoContextualMenuRequired = false;
	   this._tabTwoDockFirstColumn =  true;
       this._tabTwoPerformanceConfig = "";
       this._tabTwoFeatures = "";
      //Tab Three 
       this._tabThreeName = "";
       this._tabThreeOptions = "";
       this._tabThreeFilterOptions = "";
       this._tabThreeRadioOptions = false;
       this._tabThreePerformanceConfig = "";
      //Tab ThreeA
      
       this._tabThreeAObjService = "";
       this._tabThreeAObjName = "";
       this._tabThreeAOperation = "";
       this._tabThreeACriteria = "";
       this._tabThreeAIdentifier = "";
       this._tabThreeAResponseArray = "";
       this._tabThreeAResponseId = "";
       this._tabThreeAFields = "";
       this._tabThreeAContextualMenuRequired = false;
	   this._tabThreeADockFirstColumn =  true;
	   this._tabThreeAContextMenuLabel = [];
       this._tabThreeAContextMenuAction = [];
       this._tabThreeAContextMenuPermission = [];
       this._tabThreeAFeatures = "";
            //Tab Three B
      
       this._tabThreeBObjService = "";
       this._tabThreeBObjName = "";
       this._tabThreeBOperation = "";
       this._tabThreeBCriteria = "";
       this._tabThreeBIdentifier = "";
       this._tabThreeBResponseArray = "";
       this._tabThreeBResponseId = "";
       this._tabThreeBFields = "";
	this._tabThreeBContextualMenuRequired = false;
	   this._tabThreeBDockFirstColumn =  true;
       this._tabThreeBContextMenuLabel = [];
       this._tabThreeBContextMenuAction = [];
       this._tabThreeBContextMenuPermission = [];
       this._tabThreeBFeatures = "";
      
      //Tab Four
       this._tabFourName = "";
       this._tabFourOptions = "";
       this._tabFourFilterOptions = "";
       this._tabFourRadioOptions = false;
       this._tabFourObjService = "";
       this._tabFourObjName = "";
       this._tabFourOperation = "";
       this._tabFourCriteria = "";
       this._tabFourIdentifier = "";
       this._tabFourResponseArray = "";
       this._tabFourResponseId = "";
       this._tabFourFields = "";
       this._tabFourContextualMenuRequired = false;
	   this._tabFourDockFirstColumn =  true;
       this._tabFourPerformanceConfig = "";
       this._tabFourFeatures = "";
      //Tab Five
       this._tabFiveName = "";
       this._tabFiveOptions = "";
       this._tabFiveFilterOptions = "";
       this._tabFiveRadioOptions = false;
       this._tabFiveObjService = "";
       this._tabFiveObjName = "";
       this._tabFiveOperation = "";
       this._tabFiveCriteria = "";
       this._tabFiveIdentifier = "";
       this._tabFiveResponseArray = "";
       this._tabFiveResponseId = "";
       this._tabFiveFields = "";
       this._tabFiveContextualMenuRequired = false;
	   this._tabFiveDockFirstColumn =  true;
       this._tabFivePerformanceConfig = "";
      this._tabFiveFeatures = "";
            //Tab Six
       this._tabSixName = "";
       this._tabSixOptions = "";
       this._tabSixFilterOptions = "";
       this._tabSixRadioOptions = false;
       this._tabSixObjService = "";
       this._tabSixObjName = "";
       this._tabSixOperation = "";
       this._tabSixCriteria = "";
       this._tabSixIdentifier = "";
       this._tabSixResponseArray = "";
       this._tabSixResponseId = "";
       this._tabSixFields = "";
       this._tabSixContextualMenuRequired = false;
	   this._tabSixDockFirstColumn =  true;
       this._tabSixPerformanceConfig = "";
      this._tabSixFeaturesdownloadReport="";
      this._tabSixFeaturesgenerateReport="";
      //ERROR
      this._tabOneErrorText = "";
      this._tabTwoErrorText = "";
      this._tabThreeErrorText = "";
      this._tabFourErrorText = "";
      this._tabFiveErrorText = "";
      this._tabSixErrorText = "";
      this._tabThreeAErrorText = "";
      this._tabThreeBErrorText = "";      
      
      this.portfolioArray = [];
      this.prefix = "";
      //List box
      this._lstbxObjService = "";
      this._lstbxObjName = "";
      this._lstbxOperation = "";
      this._lstbxCriteria = "";
      this._lstbxResponseArray = "";
      this._lstbxResponseId = "";
      this._lstbxIdentifier = "";
      //Cancel Request
      this._cancelReqObjService= "";
      this._cancelReqObjName = "";
      this._cancelReqOperation = "";
      this._cancelReqCriteria = "";
      this._getReportObjService="";
      this._getReportOperation="";
      this._getReportObjName="";
      this._getReportCriteria="";
      this._downloadReportObjService="";
      this._downloadReportObjName="";
      this._downloadReportOperation="";
      this._downloadReportCriteria="";
      //DAO object
      this.portfolioListDAO = new PortfolioListDAO();
      //Parser Util Object
      this.parserUtilsManager = new ParserUtilsManager();
      //Format util object
      this.FormatUtils = new FormatUtils();
      //Entitlement util object
      this.EntitlementUtils = new EntitlementUtils();
      //global variables
      this.map={};
      this.skins = {};
      this.formatSkins = {};
      this.context = {};
      this.formattingJSON = {};
      this.selectedTab = 1;
      this.rowTemplate = "";
      this.expandedTemplate = "";
      this.criteria = {};
      this.portfolioId="";
      this.currencyId="";
      this.selectedRadioOptionText = "";
      this.selectedRadioOption = "";
      this.selectedDownloadFormat = "";

      this.firstColumnName="";
      this._settingsUpdateCriteria="";
      this._settingsGetCriteria="";
      this._settingsGetOperation="";
      this._settingsUpdateOperation="";
      this._settingsObjName="";
      this._settingsObjService="";
      //globals used for search functionality  
      this.searchConstants = {
        BOTH: 'Both',
        CHOOSE_TIME_RANGE: 'CHOOSE_TIME_RANGE',
        CUSTOM_DATE_RANGE: 'CUSTOM_DATE_RANGE',
      };
        this.timePeriods = {
        CHOOSE_TIME_RANGE: 'i18n.accounts.chooseTimeRange',
        LAST_SEVEN_DAYS: 'i18n.accounts.lastSevenDays',
        LAST_FOURTEEN_DAYS: 'i18n.accounts.lastFourteenDays',
        LAST_ONE_MONTH: 'i18n.accounts.lastOneMonth',
        LAST_TWO_MONTHS: 'i18n.accounts.lastTwoMonths',
        LAST_THREE_MONTHS: 'i18n.accounts.lastThreeMonths',
        LAST_SIX_MONTHS: 'i18n.accounts.lastSixMonths',
        LAST_TWELVE_MONTHS: 'i18n.accounts.lastTwelveMonths',
        CUSTOM_DATE_RANGE: 'i18n.accounts.customDateRange'
      };
      var today = new Date();
      this.searchViewModel = {
        searchPerformed: false,
        visible: false,
        searchResults: [],
        keyword: '',
        //transactionTypes: this.objectToListBoxArray(this.transactionTypes),
        transactionTypeSelected: this.searchConstants.BOTH,
        timePeriods: this.objectToListBoxArray(this.timePeriods),
        timePeriodSelected: "CHOOSE_TIME_RANGE",
        fromCheckNumber: '',
        toCheckNumber: '',
        fromAmount: '',
        toAmount: '',
        fromDate: [today.getDate(), today.getMonth() + 1, today.getFullYear()],
        toDate: [today.getDate(), today.getMonth() + 1, today.getFullYear()],
        bfKeyword: '',
        bfReferenceNumber: '',
        bfFromDate: [today.getDate(), today.getMonth() + 1, today.getFullYear()],
        bfToDate: [today.getDate(), today.getMonth() + 1, today.getFullYear()]
      };
      this.transactionListTypes = {};
	  this.response = {};
	  this.prevFromDateOfCustom="";
      this.prevToDateOfCustom="";
      this.combinedDate="";
      this.clearbtnClicked=0; //added for btnApply
      this.sDate="";
      this.eDate="";
	this._tabOneSearchPlaceholder="";
      this._tabTwoSearchPlaceholder="";
      this._tabThreeSearchPlaceholder="";
      this._tabFourSearchPlaceholder="";
      this._tabFiveSearchPlaceholder="";
      this._tabSixSearchPlaceholder="";
      this.imageDisable = "excludetoggle.png";
      this.imageEnable = "includetoggle.png";
      this.isContextualMenuOpen = 1;
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
            
            // get attachments service setters and getters
      defineSetter(this, 'tabSixFeaturesdownloadReport', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabSixFeaturesdownloadReport = val;
                }
            });
            defineGetter(this, 'tabSixFeaturesdownloadReport', function () {
                return this._tabSixFeaturesdownloadReport;
            });
      defineSetter(this, 'tabSixFeaturesgenerateReport', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabSixFeaturesgenerateReport = val;
                }
            });
            defineGetter(this, 'tabSixFeaturesgenerateReport', function () {
                return this._tabSixFeaturesgenerateReport;
            });
      defineSetter(this, 'downloadReportObjService', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._downloadReportObjService = val;
                }
            });
            defineGetter(this, 'downloadReportObjService', function () {
                return this._downloadReportObjService;
            });
      defineSetter(this, 'downloadReportObjName', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._downloadReportObjName = val;
                }
            });
            defineGetter(this, 'downloadReportObjName', function () {
                return this._downloadReportObjName;
            });
       defineSetter(this, 'downloadReportOperation', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._downloadReportOperation = val;
                }
            });
            defineGetter(this, 'downloadReportOperation', function () {
                return this._downloadReportOperation;
            });
      defineSetter(this, 'downloadReportCriteria', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._downloadReportCriteria= val;
                }
            });
            defineGetter(this, 'downloadReportCriteria', function () {
                return this._downloadReportCriteria;
            });
      
         defineSetter(this, 'getReportObjService', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._getReportObjService = val;
                }
            });
            defineGetter(this, 'getReportObjService', function () {
                return this._getReportObjService;
            });
        defineSetter(this, 'getReportOperation', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._getReportOperation = val;
                }
            });
            defineGetter(this, 'getReportOperation', function () {
                return this._getReportOperation;
            });
      defineSetter(this, 'getReportObjName', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._getReportObjName = val;
                }
            });
            defineGetter(this, 'getReportObjName', function () {
                return this._getReportObjName;
            });
      defineSetter(this, 'getReportCriteria', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._getReportCriteria = val;
                }
            });
            defineGetter(this, 'getReportCriteria', function () {
                return this._getReportCriteria;
            });
           defineSetter(this, 'startDate', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._startDate = val;
                }
            });
            defineGetter(this, 'startDate', function () {
                return this._startDate;
            });
          defineSetter(this, 'endDate', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._endDate = val;
                }
            });
            defineGetter(this, 'endDate', function () {
                return this._endDate;
            });
            defineSetter(this, 'GAobjectServiceName', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._GAobjectServiceName = val;
                }
            });
            defineGetter(this, 'GAobjectServiceName', function () {
                return this._GAobjectServiceName;
            });
            defineSetter(this, 'GAobjectName', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._GAobjectName = val;
                }
            });
            defineGetter(this, 'GAobjectName', function () {
                return this._GAobjectName;
            });
            defineSetter(this, 'GAoperationName', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._GAoperationName = val;
                }
            });
            defineGetter(this, 'tabFiveOptions', function () {
                return this._tabFiveOptions;
            });
                  defineSetter(this, 'tabFiveOptions', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabFiveOptions = val;
                }
            });
            defineGetter(this, 'tabSixOptions', function () {
                return this._tabSixOptions;
            });
                  defineSetter(this, 'tabSixOptions', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabSixOptions = val;
                }
            });
            defineGetter(this, 'GAoperationName', function () {
                return this._GAoperationName;
            });
                  defineSetter(this, 'tabFourOptions', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabFourOptions = val;
                }
            });
            defineGetter(this, 'tabFourOptions', function () {
                return this._tabFourOptions;
            });
                  defineSetter(this, 'tabTwoOptions', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabTwoOptions = val;
                }
            });
            defineGetter(this, 'tabTwoOptions', function () {
                return this._tabTwoOptions;
            });
                  defineSetter(this, 'tabOneOptions', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabOneOptions = val;
                }
            });
            defineGetter(this, 'tabOneOptions', function () {
                return this._tabOneOptions;
            });
           //skins
            defineSetter(this, 'sknFilterActiveTab', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._sknFilterActiveTab = val;
                }
            });
            defineGetter(this, 'sknFilterActiveTab', function () {
                return this._sknFilterActiveTab;
            });
            defineSetter(this, 'sknFilterActiveTabHover', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._sknFilterActiveTabHover = val;
                }
            });
            defineGetter(this, 'sknFilterActiveTabHover', function () {
                return this._sknFilterActiveTabHover;
            });
            defineSetter(this, 'sknFilterInactiveTab', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._sknFilterInactiveTab = val;
                }
            });
            defineGetter(this, 'sknFilterInactiveTab', function () {
                return this._sknFilterInactiveTab;
            });
            defineSetter(this, 'sknFilterInactiveTabHover', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._sknFilterInactiveTabHover = val;
                }
            });
            defineGetter(this, 'sknFilterInactiveTabHover', function () {
                return this._sknFilterInactiveTabHover;
            });
            defineSetter(this, 'sknRowSeperator', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._sknRowSeperator = val;
                }
            });
            defineGetter(this, 'sknRowSeperator', function () {
                return this._sknRowSeperator;
            });
      	defineSetter(this, 'sknTableLabelHeader', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._sknTableLabelHeader = val;
                }
            });
            defineGetter(this, 'sknTableLabelHeader', function () {
                return this._sknTableLabelHeader;
            });
            defineSetter(this, 'sknTableLabelField', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._sknTableLabelField = val;
                }
            });
            defineGetter(this, 'sknTableLabelField', function () {
                return this._sknTableLabelField;
            });
            defineSetter(this, 'sknActionButtons', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._sknActionButtons = val;
                }
            });
            defineGetter(this, 'sknActionButtons', function () {
                return this._sknActionButtons;
            });
            defineSetter(this, 'sknSearchLabel', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._sknSearchLabel = val;
                }
            });
            defineGetter(this, 'sknSearchLabel', function () {
                return this._sknSearchLabel;
            });
            defineSetter(this, 'sknSearchTextbox', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._sknSearchTextbox = val;
                }
            });
            defineGetter(this, 'sknSearchTextbox', function () {
                return this._sknSearchTextbox;
            });
            defineSetter(this, 'sknSearchActiveTextbox', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._sknSearchActiveTextbox = val;
                }
            });
            defineGetter(this, 'sknSearchActiveTextbox', function () {
                return this._sknSearchActiveTextbox;
            });
            defineSetter(this, 'sknSearchDropdown', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._sknSearchDropdown = val;
                }
            });
            defineGetter(this, 'sknSearchDropdown', function () {
                return this._sknSearchDropdown;
            });
            defineSetter(this, 'sknSearchActiveDropdown', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._sknSearchActiveDropdown = val;
                }
            });
            defineGetter(this, 'sknSearchActiveDropdown', function () {
                return this._sknSearchActiveDropdown;
            });
            defineSetter(this, 'sknSearchCalendar', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._sknSearchCalendar = val;
                }
            });
            defineGetter(this, 'sknSearchCalendar', function () {
                return this._sknSearchCalendar;
            });
            defineSetter(this, 'sknSearchActiveCalendar', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._sknSearchActiveCalendar = val;
                }
            });
            defineGetter(this, 'sknSearchActiveCalendar', function () {
                return this._sknSearchActiveCalendar;
            });
            defineGetter(this, 'sknPositiveAmount', function () {
                return this._sknPositiveAmount;
            });
            defineSetter(this, 'sknPositiveAmount', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._sknPositiveAmount = val;
                }
            });
      defineGetter(this, 'sknNegativeAmount', function () {
        return this._sknNegativeAmount;
      });
      defineSetter(this, 'sknNegativeAmount', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._sknNegativeAmount = val;
        }
      });
            defineSetter(this, 'sknDate', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._sknDate = val;
                }
            });
            defineGetter(this, 'sknDate', function () {
                return this._sknDate;
            });
            defineSetter(this, 'sknPercentage', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._sknPercentage = val;
                }
            });
            defineGetter(this, 'sknPercentage', function () {
                return this._sknPercentage;
            });
         
            //icons
            defineSetter(this, 'iconSearch', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._iconSearch = val;
                }
            });
            defineGetter(this, 'iconSearch', function () {
                return this._iconSearch;
            });
            defineSetter(this, 'iconDownload', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._iconDownload = val;
                }
            });
            defineGetter(this, 'iconDownload', function () {
                return this._iconDownload;
            });
            defineSetter(this, 'iconPrint', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._iconPrint = val;
                }
            });
            defineGetter(this, 'iconPrint', function () {
                return this._iconPrint;
            });
            defineSetter(this, 'iconSearchClose', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._iconSearchClose = val;
                }
            });
            defineGetter(this, 'iconSearchClose', function () {
                return this._iconSearchClose;
            });
            defineSetter(this, 'iconSettings', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._iconSettings = val;
                }
            });
            defineGetter(this, 'iconSettings', function () {
                return this._iconSettings;
            });
            defineSetter(this, 'iconColumnSort', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._iconColumnSort = val;
                }
            });
            defineGetter(this, 'iconColumnSort', function () {
                return this._iconColumnSort;
            });
            defineSetter(this, 'iconColumnSortAsc', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._iconColumnSortAsc = val;
                }
            });
            defineGetter(this, 'iconColumnSortAsc', function () {
                return this._iconColumnSortAsc;
            });
            defineSetter(this, 'iconColumnSortDesc', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._iconColumnSortDesc = val;
                }
            });
            defineGetter(this, 'iconColumnSortDesc', function () {
                return this._iconColumnSortDesc;
            });
     		defineSetter(this, 'iconRadioActive', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._iconRadioActive = val;
                }
            });
            defineGetter(this, 'iconRadioActive', function () {
                return this._iconRadioActive;
            });
     		defineSetter(this, 'iconRadioInactive', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._iconRadioInactive = val;
                }
            });
            defineGetter(this, 'iconRadioInactive', function () {
                return this._iconRadioInactive;
            });
      
      
            //data formats
            defineSetter(this, 'amountFormat', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._amountFormat = val;
                }
            });
            defineGetter(this, 'amountFormat', function () {
                return this._amountFormat;
            });
            defineSetter(this, 'dateFormat', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._dateFormat = val;
                }
            });
            defineGetter(this, 'dateFormat', function () {
                return this._dateFormat;
            });
            defineSetter(this, 'backendDateFormat', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._backendDateFormat = val;
                }
            });
            defineGetter(this, 'backendDateFormat', function () {
                return this._backendDateFormat;
            });
            defineSetter(this, 'percentageFormat', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._percentageFormat = val;
                }
            });
            defineGetter(this, 'percentageFormat', function () {
                return this._percentageFormat;
            });

            //Search fields
            defineSetter(this, 'searchLabel1', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._searchLabel1 = val;
                }
            });
            defineGetter(this, 'searchLabel1', function () {
                return this._searchLabel1;
            });
            defineSetter(this, 'searchLabel3', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._searchLabel3 = val;
                }
            });
            defineGetter(this, 'searchLabel3', function () {
                return this._searchLabel3;
            });
      defineSetter(this, 'searchLabel4', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._searchLabel4 = val;
                }
            });
            defineGetter(this, 'searchLabel4', function () {
                return this._searchLabel4;
            });
            defineSetter(this, 'searchLabel2', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._searchLabel5 = val;
                }
            });
            defineGetter(this, 'searchLabel2', function () {
                return this._searchLabel2;
            });
            defineSetter(this, 'searchLabel5', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._searchLabel6 = val;
                }
            });
            defineGetter(this, 'searchLabel5', function () {
                return this._searchLabel5;
            });
            defineSetter(this, 'val1PlaceHolder', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._val1PlaceHolder = val;
                }
            });
            defineGetter(this, 'val1PlaceHolder', function () {
                return this._val1PlaceHolder;
            });

      //TabOne
            defineGetter(this, 'tabOneName', () => {
                return this._tabOneName;
            });
			defineSetter(this, 'tabOneName', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabOneName = val;
                }
              });
      defineGetter(this, 'tabOneOptions', () => {
                return this._tabOneFilterOptions;
            });
			defineSetter(this, 'tabOneOptions', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabOneFilterOptions = val;
                }
              });
             defineGetter(this, 'tabOneFilterOptions', () => {
                return this._tabOneFilterOptions;
            });
			defineSetter(this, 'tabOneFilterOptions', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabOneFilterOptions = val;
                }
              });
             defineGetter(this, 'tabOneRadioOptions', () => {
                return this._tabOneRadioOptions;
            });
			defineSetter(this, 'tabOneRadioOptions', function (val) {
                if (typeof val === 'boolean' && val !== '') {
                    this._tabOneRadioOptions = val;
                }
              });
            defineGetter(this, 'tabOneObjService', () => {
                return this._tabOneObjService;
            });
			defineSetter(this, 'tabOneObjService', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabOneObjService = val;
                }
              });
            defineGetter(this, 'tabOneObjName', value => {
                this._tabOneObjName = value;
            });
      	defineSetter(this, 'tabOneObjName', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabOneObjName = val;
                }
              });
      //tabOneOperation
                  defineGetter(this, 'tabOneOperation', value => {
                this._tabOneOperation = value;
            });
      	defineSetter(this, 'tabOneOperation', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabOneOperation = val;
                }
              });
           defineGetter(this, 'tabOneCriteria', () => {
                return this._tabOneCriteria;
            });
      	defineSetter(this, 'tabOneCriteria', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabOneCriteria = val;
                }
              });
            defineGetter(this, 'tabOneIdentifier', () => {
                return this._tabOneIdentifier;
            });
      	defineSetter(this, 'tabOneIdentifier', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabOneIdentifier = val;
                }
              });
            defineGetter(this, 'tabOneResponseArray', () => {
                return this._tabOneResponseArray;
            });
      	defineSetter(this, 'tabOneResponseArray', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabOneResponseArray = val;
                }
              });
            defineGetter(this, 'tabOneResponseId', () => {
                return this._tabOneResponseId;
            });
      	defineSetter(this, 'tabOneResponseId', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabOneResponseId = val;
                }
              });
        defineGetter(this, 'tabOneContextualMenuRequired', () => {
                return this._tabOneContextualMenuRequired;
            });
      	defineSetter(this, 'tabOneContextualMenuRequired', function (val) {
                if (typeof val === 'boolean' && val !== '') {
                    this._tabOneContextualMenuRequired = val;
                }
              });
        defineGetter(this, 'tabOneDockFirstColumn', () => {
                return this._tabOneDockFirstColumn;
            });
      	defineSetter(this, 'tabOneDockFirstColumn', function (val) {
                if (typeof val === 'boolean' && val !== '') {
                    this._tabOneDockFirstColumn = val;
                }
              });
       defineGetter(this, 'tabOneFields', () => {
                return this._tabOneFields;
            });
      	defineSetter(this, 'tabOneFields', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabOneFields = val;
                }
              });
	    defineGetter(this, 'tabOneContextMenuLabel', () => {
                return this._tabOneContextMenuLabel;
            });
      	defineSetter(this, 'tabOneContextMenuLabel', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabOneContextMenuLabel = val;
                }
              });
        defineGetter(this, 'tabOneContextMenuAction', () => {
                return this._tabOneContextMenuAction;
            });
      	defineSetter(this, 'tabOneContextMenuAction', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabOneContextMenuAction = val;
                }
              });
      defineGetter(this, 'tabOnePerformanceConfig', () => {
                return this._tabOnePerformanceConfig;
            });
			defineSetter(this, 'tabOnePerformanceConfig', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabOnePerformanceConfig = val;
                }
              });
        defineGetter(this, 'tabOneFeatures', () => {
                return this._tabOneFeatures;
            });
			defineSetter(this, 'tabOneFeatures', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabOneFeatures = val;
                }
              });
      defineGetter(this, 'tabOneContextMenuPermission', () => {
                return this._tabOneContextMenuPermission;
            });
			defineSetter(this, 'tabOneContextMenuPermission', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabOneContextMenuPermission = val;
                }
              });
      
       //TabTwo
            defineGetter(this, 'tabTwoName', () => {
                return this._tabTwoName;
            });
			defineSetter(this, 'tabTwoName', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabTwoName = val;
                }
              });
             defineGetter(this, 'tabTwoFilterOptions', () => {
                return this._tabTwoFilterOptions;
            });
			defineSetter(this, 'tabTwoFilterOptions', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabTwoFilterOptions = val;
                }
              });
             defineGetter(this, 'tabTwoRadioOptions', () => {
                return this._tabTwoRadioOptions;
            });
			defineSetter(this, 'tabTwoRadioOptions', function (val) {
                if (typeof val === 'boolean' && val !== '') {
                    this._tabTwoRadioOptions = val;
                }
              });
            defineGetter(this, 'tabTwoObjService', () => {
                return this._tabTwoObjService;
            });
			defineSetter(this, 'tabTwoObjService', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabTwoObjService = val;
                }
              });
            defineGetter(this, 'tabTwoObjName', value => {
                this._tabTwoObjName = value;
            });
      	defineSetter(this, 'tabTwoObjName', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabTwoObjName = val;
                }
              });
            //tabTwoOperation
                  defineGetter(this, 'tabTwoOperation', value => {
                this._tabTwoOperation = value;
            });
      	defineSetter(this, 'tabTwoOperation', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabTwoOperation = val;
                }
              });
           defineGetter(this, 'tabTwoCriteria', () => {
                return this._tabTwoCriteria;
            });
      	defineSetter(this, 'tabTwoCriteria', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabTwoCriteria = val;
                }
              });
            defineGetter(this, 'tabTwoIdentifier', () => {
                return this._tabTwoIdentifier;
            });
      	defineSetter(this, 'tabTwoIdentifier', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabTwoIdentifier = val;
                }
              });
            defineGetter(this, 'tabTwoResponseArray', () => {
                return this._tabTwoResponseArray;
            });
      	defineSetter(this, 'tabTwoResponseArray', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabTwoResponseArray = val;
                }
              });
            defineGetter(this, 'tabTwoResponseId', () => {
                return this._tabTwoResponseId;
            });
      	defineSetter(this, 'tabTwoResponseId', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabTwoResponseId = val;
                }
              });
         defineGetter(this, 'tabTwoContextualMenuRequired', () => {
                return this._tabTwoContextualMenuRequired;
            });
      	defineSetter(this, 'tabTwoContextualMenuRequired', function (val) {
                if (typeof val === 'boolean' && val !== '') {
                    this._tabTwoContextualMenuRequired = val;
                }
              });
        defineGetter(this, 'tabTwoDockFirstColumn', () => {
                return this._tabTwoDockFirstColumn;
            });
      	defineSetter(this, 'tabTwoDockFirstColumn', function (val) {
                if (typeof val === 'boolean' && val !== '') {
                    this._tabTwoDockFirstColumn = val;
                }
              });
       defineGetter(this, 'tabTwoFields', () => {
                return this._tabTwoFields;
            });
      	defineSetter(this, 'tabTwoFields', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabTwoFields = val;
                }
              });
      defineGetter(this, 'tabTwoPerformanceConfig', () => {
                return this._tabTwoPerformanceConfig;
            });
			defineSetter(this, 'tabTwoPerformanceConfig', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabTwoPerformanceConfig = val;
                }
              });
            defineGetter(this, 'tabTwoFeatures', () => {
                return this._tabTwoFeatures;
            });
            defineSetter(this, 'tabTwoFeatures', function(val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabTwoFeatures = val;
                }
            });
      
           //TabThree A
            defineGetter(this, 'tabThreeAName', () => {
                return this._tabThreeAName;

            });
      	defineSetter(this, 'tabTwoFields', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabTwoFields = val;
                }
              });
      
           //TabThree 
            defineGetter(this, 'tabThreeName', () => {
                return this._tabThreeName;
            });
			defineSetter(this, 'tabThreeName', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabThreeName = val;
                }
              });
       defineGetter(this, 'tabThreeOptions', () => {
                return this._tabThreeOptions;
            });
			defineSetter(this, 'tabThreeOptions', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabThreeOptions = val;
                }
              });
             defineGetter(this, 'tabThreeFilterOptions', () => {
                return this._tabThreeFilterOptions;
            });
			defineSetter(this, 'tabThreeFilterOptions', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabThreeFilterOptions = val;
                }
              });
             defineGetter(this, 'tabThreeRadioOptions', () => {
                return this._tabThreeRadioOptions;
            });
			defineSetter(this, 'tabThreeRadioOptions', function (val) {
                if (typeof val === 'boolean' && val !== '') {
                    this._tabThreeRadioOptions = val;
                }
              });
      //tab Three A
            defineGetter(this, 'tabThreeAObjService', () => {
                return this._tabThreeAObjService;
            });
			defineSetter(this, 'tabThreeAObjService', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabThreeAObjService = val;
                }
              });
            defineGetter(this, 'tabThreeAObjName', value => {
                this._tabThreeAObjName = value;
            });
      	defineSetter(this, 'tabThreeAObjName', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabThreeAObjName = val;
                }
              });
       defineGetter(this, 'tabThreeAFields', () => {
                return this._tabThreeAFields;
            });
      	defineSetter(this, 'tabThreeAFields', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabThreeAFields = val;
                }
              });
      
                  //tabThreeAOperation
                  defineGetter(this, 'tabThreeAOperation', value => {
                this._tabThreeAOperation = value;
            });
      	defineSetter(this, 'tabThreeAOperation', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabThreeAOperation = val;
                }
              });
           defineGetter(this, 'tabThreeACriteria', () => {
                return this._tabThreeACriteria;
            });
      	defineSetter(this, 'tabThreeACriteria', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabThreeACriteria = val;
                }
              });
            defineGetter(this, 'tabThreeAIdentifier', () => {
                return this._tabThreeAIdentifier;
            });
      	defineSetter(this, 'tabThreeAIdentifier', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabThreeAIdentifier = val;
                }
              });
            defineGetter(this, 'tabThreeAResponseArray', () => {
                return this._tabThreeAResponseArray;
            });
      	defineSetter(this, 'tabThreeAResponseArray', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabThreeAResponseArray = val;
                }
              });
            defineGetter(this, 'tabThreeAResponseId', () => {
                return this._tabThreeAResponseId;
            });
      	defineSetter(this, 'tabThreeAResponseId', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabThreeAResponseId = val;
                }
              });
        defineGetter(this, 'tabThreeAContextualMenuRequired', () => {
                return this._tabThreeAContextualMenuRequired;
            });
      	defineSetter(this, 'tabThreeAContextualMenuRequired', function (val) {
                if (typeof val === 'boolean' && val !== '') {
                    this._tabThreeAContextualMenuRequired = val;
                }
              });
        defineGetter(this, 'tabThreeADockFirstColumn', () => {
                return this._tabThreeADockFirstColumn;
            });
      	defineSetter(this, 'tabThreeADockFirstColumn', function (val) {
                if (typeof val === 'boolean' && val !== '') {
                    this._tabThreeADockFirstColumn = val;
                }
              });
		defineGetter(this, 'tabThreeAContextMenuLabel', () => {
                return this._tabThreeAContextMenuLabel;
            });
      	defineSetter(this, 'tabThreeAContextMenuLabel', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabThreeAContextMenuLabel = val;
                }
              });
        defineGetter(this, 'tabThreeAContextMenuAction', () => {
                return this._tabThreeAContextMenuAction;
            });
      	defineSetter(this, 'tabThreeAContextMenuAction', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabThreeAContextMenuAction = val;
                }
              });
      defineGetter(this, 'tabThreePerformanceConfig', () => {
                return this._tabThreePerformanceConfig;
            });
			defineSetter(this, 'tabThreePerformanceConfig', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabThreePerformanceConfig = val;
                }
              });
            defineGetter(this, 'tabThreeAContextMenuPermission', () => {
                return this._tabThreeAContextMenuPermission;
            });
			defineSetter(this, 'tabThreeAContextMenuPermission', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabThreeAContextMenuPermission = val;
                }
              });
            defineGetter(this, 'tabThreeAFeatures', function () {
                return this._tabThreeAFeatures;
            });
            
            defineSetter(this, 'tabThreeAFeatures', function (val) {
                if (typeof val === 'string' && val !== '') {
                this._tabThreeAFeatures = val;
                }
            });
                 //TabThreeB
           
            defineGetter(this, 'tabThreeBObjService', () => {
                return this._tabThreeBObjService;
            });
			defineSetter(this, 'tabThreeBObjService', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabThreeBObjService = val;
                }
              });
            defineGetter(this, 'tabThreeBObjName', value => {
                this._tabThreeBObjName = value;
            });
      			defineSetter(this, 'tabThreeBObjName', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabThreeBObjName = val;
                }
              });
                        //tabThreeBOperation
                  defineGetter(this, 'tabThreeBOperation', value => {
                this._tabThreeBOperation = value;
            });

      	defineSetter(this, 'tabThreeBOperation', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabThreeBOperation = val;
                }
              });
           defineGetter(this, 'tabThreeBCriteria', () => {
                return this._tabThreeBCriteria;
            });
      	defineSetter(this, 'tabThreeBCriteria', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabThreeBCriteria = val;
                }
              });
            defineGetter(this, 'tabThreeBIdentifier', () => {
                return this._tabThreeAIdentifier;
            });
      	defineSetter(this, 'tabThreeBIdentifier', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabThreeBIdentifier = val;
                }
              });
            defineGetter(this, 'tabThreeBResponseArray', () => {
                return this._tabThreeBResponseArray;
            });
      	defineSetter(this, 'tabThreeBResponseArray', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabThreeBResponseArray = val;
                }
              });
            defineGetter(this, 'tabThreeBResponseId', () => {
                return this._tabThreeBResponseId;
            });
            	defineSetter(this, 'tabThreeBResponseId', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabThreeBResponseId = val;
                }
              });
       defineGetter(this, 'tabThreeBContextualMenuRequired', () => {
                return this._tabThreeBContextualMenuRequired;
            });
      	defineSetter(this, 'tabThreeBContextualMenuRequired', function (val) {
                if (typeof val === 'boolean' && val !== '') {
                    this._tabThreeBContextualMenuRequired = val;
                }
              });

       defineGetter(this, 'tabThreeBFields', () => {
                return this._tabThreeBFields;
            });
      	defineSetter(this, 'tabThreeBFields', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabThreeBFields = val;
                }
              });
       defineGetter(this, 'tabThreeBDockFirstColumn', () => {
                return this._tabThreeBDockFirstColumn;
            });
      defineSetter(this, 'tabThreeBDockFirstColumn', function (val) {
                if (typeof val === 'boolean' && val !== '') {
                    this._tabThreeBDockFirstColumn = val;
                }
              });
            defineGetter(this, 'tabThreeBContextMenuLabel', () => {
                return this._tabThreeBContextMenuLabel;
            });
      	    defineSetter(this, 'tabThreeBContextMenuLabel', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabThreeBContextMenuLabel = val;
                }
              });
            defineGetter(this, 'tabThreeBContextMenuAction', () => {
                return this._tabThreeBContextMenuAction;
            });
      	    defineSetter(this, 'tabThreeBContextMenuAction', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabThreeBContextMenuAction = val;
                }
              });
            defineGetter(this, 'tabThreeBContextMenuPermission', () => {
                return this._tabThreeBContextMenuPermission;
            });
			defineSetter(this, 'tabThreeBContextMenuPermission', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabThreeBContextMenuPermission = val;
                }
              });
            defineGetter(this, 'tabThreeBFeatures', function () {
                return this._tabThreeBFeatures;
            });
            
            defineSetter(this, 'tabThreeBFeatures', function (val) {
                if (typeof val === 'string' && val !== '') {
                this._tabThreeBFeatures = val;
                }
            });

           //TabFour
            defineGetter(this, 'tabFourName', () => {
                return this._tabFourName;
            });
			defineSetter(this, 'tabFourName', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabFourName = val;
                }
              });
             defineGetter(this, 'tabFourFilterOptions', () => {
                return this._tabFourFilterOptions;
            });
			defineSetter(this, 'tabFourFilterOptions', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabFourFilterOptions = val;
                }
              });
             defineGetter(this, 'tabFourRadioOptions', () => {
                return this._tabFourRadioOptions;
            });
			defineSetter(this, 'tabFourRadioOptions', function (val) {
                if (typeof val === 'boolean' && val !== '') {
                    this._tabFourRadioOptions = val;
                }
              });
            defineGetter(this, 'tabFourObjService', () => {
                return this._tabFourObjService;
            });
			defineSetter(this, 'tabFourObjService', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabFourObjService = val;
                }
              });
            defineGetter(this, 'tabFourObjName', value => {
                this._tabFourObjName = value;
            });
      defineSetter(this, 'tabFourObjName', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabFourObjName = val;
                }
              });
                        //tabFourOperation
                  defineGetter(this, 'tabFourOperation', value => {
                this._tabFourOperation = value;
            });
      defineSetter(this, 'tabFourOperation', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabFourOperation = val;
                }
              });
           defineGetter(this, 'tabFourCriteria', () => {
                return this._tabFourCriteria;
            });
      defineSetter(this, 'tabFourCriteria', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabFourCriteria = val;
                }
              });
            defineGetter(this, 'tabFourIdentifier', () => {
                return this._tabFourIdentifier;
            });
      defineSetter(this, 'tabFourIdentifier', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabFourIdentifier = val;
                }
              });
            defineGetter(this, 'tabFourResponseArray', () => {
                return this._tabFourResponseArray;
            });
      defineSetter(this, 'tabFourResponseArray', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabFourResponseArray = val;
                }
              });
            defineGetter(this, 'tabFourResponseId', () => {
                return this._tabFourResponseId;
            });
      defineSetter(this, 'tabFourResponseId', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabFourResponseId = val;
                }
              });
              defineGetter(this, 'tabFourContextualMenuRequired', () => {
                return this._tabFourContextualMenuRequired;
            });
      defineSetter(this, 'tabFourContextualMenuRequired', function (val) {
                if (typeof val === 'boolean' && val !== '') {
                    this._tabFourContextualMenuRequired = val;
                }
              });
        defineGetter(this, 'tabFourDockFirstColumn', () => {
                return this._tabFourDockFirstColumn;
            });
      defineSetter(this, 'tabFourDockFirstColumn', function (val) {
                if (typeof val === 'boolean' && val !== '') {
                    this._tabFourDockFirstColumn = val;
                }
              });
       defineGetter(this, 'tabFourFields', () => {
                return this._tabFourFields;
            });
      defineSetter(this, 'tabFourFields', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabFourFields = val;
                }
              });
      defineGetter(this, 'tabFourPerformanceConfig', () => {
                return this._tabFourPerformanceConfig;
            });
			defineSetter(this, 'tabFourPerformanceConfig', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabFourPerformanceConfig = val;
                }
              });
            defineGetter(this, 'tabFourFeatures', () => {
                return this._tabFourFeatures;
            });
            defineSetter(this, 'tabFourFeatures', function(val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabFourFeatures = val;
                }
            });
                  defineGetter(this, 'tabFiveFeatures', () => {
                return this._tabFiveFeatures;
            });
            defineSetter(this, 'tabFiveFeatures', function(val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabFiveFeatures = val;
                }
            });
            defineGetter(this, 'statusOptionsCode', () => {
                return this._statusOptionsCode;
            });
			defineSetter(this, 'statusOptionsCode', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._statusOptionsCode = val;
                }
              });
            defineGetter(this, 'statusOptionsImage', () => {
                return this._statusOptionsImage;
            });
			defineSetter(this, 'statusOptionsImage', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._statusOptionsImage = val;
                }
              });
               //TabFive
            defineGetter(this, 'tabFiveName', () => {
                return this._tabFiveName;
            });
			defineSetter(this, 'tabFiveName', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabFiveName = val;
                }
              });
             defineGetter(this, 'tabFiveFilterOptions', () => {
                return this._tabFiveFilterOptions;
            });
			defineSetter(this, 'tabFiveFilterOptions', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabFiveFilterOptions = val;
                }
              });
             defineGetter(this, 'tabFiveRadioOptions', () => {
                return this._tabFiveRadioOptions;
            });
			defineSetter(this, 'tabFiveRadioOptions', function (val) {
                if (typeof val === 'boolean' && val !== '') {
                    this._tabFiveRadioOptions = val;
                }
              });
            defineGetter(this, 'tabFiveObjService', () => {
                return this._tabFiveObjService;
            });
			defineSetter(this, 'tabFiveObjService', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabFiveObjService = val;
                }
              });
            defineGetter(this, 'tabFiveObjName', value => {
                this._tabFiveObjName = value;
            });
      	defineSetter(this, 'tabFiveObjName', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabFiveObjName = val;
                }
              });
      defineGetter(this, 'tabFivePerformanceConfig', () => {
                return this._tabFivePerformanceConfig;
            });
			defineSetter(this, 'tabFivePerformanceConfig', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabFivePerformanceConfig = val;
                }
              });
       //tabFourOperation
                  defineGetter(this, 'tabFiveOperation', value => {
                this._tabFourOperation = value;
            });
      	defineSetter(this, 'tabFiveOperation', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabFiveOperation = val;
                }
              });
           defineGetter(this, 'tabFiveCriteria', () => {
                return this._tabFiveCriteria;
            });
      	defineSetter(this, 'tabFiveCriteria', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabFiveCriteria = val;
                }
              });
            defineGetter(this, 'tabFiveIdentifier', () => {
                return this._tabFiveIdentifier;
            });
      	defineSetter(this, 'tabFiveIdentifier', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabFiveIdentifier = val;
                }
              });
            defineGetter(this, 'tabFiveResponseArray', () => {
                return this._tabFiveResponseArray;
            });
      	defineSetter(this, 'tabFiveResponseArray', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabFiveResponseArray = val;
                }
              });
            defineGetter(this, 'tabFiveResponseId', () => {
                return this._tabFiveResponseId;
            });
      	defineSetter(this, 'tabFiveResponseId', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabFiveResponseId = val;
                }
              });
                    defineGetter(this, 'tabFiveContextualMenuRequired', () => {
                return this._tabFiveContextualMenuRequired;
            });
      	defineSetter(this, 'tabFiveContextualMenuRequired', function (val) {
                if (typeof val === 'boolean' && val !== '') {
                    this._tabFiveContextualMenuRequired = val;
                }
              });
        defineGetter(this, 'tabFiveDockFirstColumn', () => {
                return this._tabFiveDockFirstColumn;
            });
      	defineSetter(this, 'tabFiveDockFirstColumn', function (val) {
                if (typeof val === 'boolean' && val !== '') {
                    this._tabFiveDockFirstColumn = val;
                }
              });
       defineGetter(this, 'tabFiveFields', () => {
                return this._tabFiveFields;
            });
      	defineSetter(this, 'tabFiveFields', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabFiveFields = val;
                }
              });
      
                    //TabSix
            defineGetter(this, 'tabSixName', () => {
                return this._tabSixName;
            });
			defineSetter(this, 'tabSixName', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabSixName = val;
                }
              });
             defineGetter(this, 'tabFiveFilterOptions', () => {
                return this._tabSixFilterOptions;
            });
			defineSetter(this, 'tabSixFilterOptions', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabSixFilterOptions = val;
                }
              });
             defineGetter(this, 'tabSixRadioOptions', () => {
                return this._tabSixRadioOptions;
            });
			defineSetter(this, 'tabSixRadioOptions', function (val) {
                if (typeof val === 'boolean' && val !== '') {
                    this._tabSixRadioOptions = val;
                }
              });
            defineGetter(this, 'tabSixObjService', () => {
                return this._tabSixObjService;
            });
			defineSetter(this, 'tabSixObjService', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabSixObjService = val;
                }
              });
            defineGetter(this, 'tabSixObjName', value => {
                this._tabSixObjName = value;
            });
      	defineSetter(this, 'tabSixObjName', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabSixObjName = val;
                }
              });
       //tabSixOperation
                  defineGetter(this, 'tabSixOperation', value => {
                this._tabSixOperation = value;
            });
      	defineSetter(this, 'tabSixOperation', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabSixOperation = val;
                }
              });
           defineGetter(this, 'tabSixCriteria', () => {
                return this._tabSixCriteria;
            });
      	defineSetter(this, 'tabSixCriteria', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabSixCriteria = val;
                }
              });
            defineGetter(this, 'tabSixIdentifier', () => {
                return this._tabSixIdentifier;
            });
      	defineSetter(this, 'tabSixIdentifier', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabSixIdentifier = val;
                }
              });
            defineGetter(this, 'tabSixResponseArray', () => {
                return this._tabSixResponseArray;
            });
      	defineSetter(this, 'tabSixResponseArray', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabSixResponseArray = val;
                }
              });
            defineGetter(this, 'tabSixResponseId', () => {
                return this._tabSixResponseId;
            });
      	defineSetter(this, 'tabSixResponseId', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabSixResponseId = val;
                }
              });
                          defineGetter(this, 'tabSixContextualMenuRequired', () => {
                return this._tabSixContextualMenuRequired;
            });
      	defineSetter(this, 'tabSixContextualMenuRequired', function (val) {
                if (typeof val === 'boolean' && val !== '') {
                    this._tabSixContextualMenuRequired = val;
                }
              });
        defineGetter(this, 'tabSixDockFirstColumn', () => {
                return this._tabSixDockFirstColumn;
            });
      	defineSetter(this, 'tabSixDockFirstColumn', function (val) {
                if (typeof val === 'boolean' && val !== '') {
                    this._tabSixDockFirstColumn = val;
                }
              });
       defineGetter(this, 'tabSixFields', () => {
                return this._tabSixFields;
            });
      	defineSetter(this, 'tabSixFields', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabSixFields = val;
                }
              });
      defineGetter(this, 'tabSixPerformanceConfig', () => {
                return this._tabSixPerformanceConfig;
            });
			defineSetter(this, 'tabSixPerformanceConfig', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabSixPerformanceConfig = val;
                }
              });
                          defineGetter(this, 'settingsObjService', () => {
                return this._settingsObjService;
            });
            defineSetter(this, 'settingsObjService', value => {
                this._settingsObjService = value;
            });
            defineGetter(this, 'settingsObjName', () => {
                return this._settingsObjName;
            });
            defineSetter(this, 'settingsObjName', value => {
                this._settingsObjName = value;
            });
            defineGetter(this, 'settingsGetOperation', () => {
                return this._settingsGetOperation;
            });
            defineSetter(this, 'settingsGetOperation', value => {
                this._settingsGetOperation = value;
            });
            defineGetter(this, 'settingsUpdateOperation', () => {
                return this._settingsUpdateOperation;
            });
            defineSetter(this, 'settingsUpdateOperation', value => {
                this._settingsUpdateOperation = value;
            });
            defineGetter(this, 'settingsGetCriteria', () => {
                return this._settingsGetCriteria;
            });
            defineSetter(this, 'settingsGetCriteria', value => {
                this._settingsGetCriteria = value;
            });
            defineGetter(this, 'settingsUpdateCriteria', () => {
                return this._settingsUpdateCriteria;
            });
            defineSetter(this, 'settingsUpdateCriteria', value => {
                this._settingsUpdateCriteria = value;
            });
      //ListboxOperation
         defineGetter(this, 'lstbxObjService', () => {
                return this._lstbxObjService;
            });
      	defineSetter(this, 'lstbxObjService', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._lstbxObjService = val;
                }
              });
      defineGetter(this, 'lstbxObjName', () => {
                return this._lstbxObjName;
            });
      	defineSetter(this, 'lstbxObjName', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._lstbxObjName = val;
                }
              });
      defineGetter(this, 'lstbxOperation', () => {
                return this._lstbxOperation;
            });
      	defineSetter(this, 'lstbxOperation', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._lstbxOperation = val;
                }
              });
      defineGetter(this, 'lstbxCriteria', () => {
                return this._lstbxCriteria;
            });
      	defineSetter(this, 'lstbxCriteria', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._lstbxCriteria = val;
                }
              });
      defineGetter(this, 'lstbxResponseArray', () => {
                return this._lstbxResponseArray;
            });
      	defineSetter(this, 'lstbxResponseArray', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._lstbxResponseArray = val;
                }
              });
      defineGetter(this, 'lstbxResponseId', () => {
                return this._lstbxResponseId;
            });
      	defineSetter(this, 'lstbxResponseId', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._lstbxResponseId = val;
                }
              });
         defineGetter(this, 'lstbxIdentifier', () => {
                return this._lstbxIdentifier;
            });
      	defineSetter(this, 'lstbxIdentifier', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._lstbxIdentifier = val;
                }
              });
                           defineGetter(this, 'tabOneErrorText', () => {
                return this._tabOneErrorText;
            });
      	defineSetter(this, 'tabOneErrorText', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabOneErrorText = val;
                }
              });
        defineGetter(this, 'tabTwoErrorText', () => {
                return this._tabTwoErrorText;
            });
      	defineSetter(this, 'tabTwoErrorText', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabTwoErrorText = val;
                }
              });
              defineGetter(this, 'tabThreeErrorText', () => {
                return this._tabThreeErrorText;
            });
            	defineSetter(this, 'tabThreeErrorText', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabThreeErrorText = val;
                }
              });
                defineGetter(this, 'tabThreeAErrorText', () => {
                return this._tabThreeAErrorText;
            });
            	defineSetter(this, 'tabThreeAErrorText', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabThreeAErrorText = val;
                }
              });
                defineGetter(this, 'tabThreeBErrorText', () => {
                return this._tabThreeBErrorText;
            });
            	defineSetter(this, 'tabThreeBErrorText', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabThreeBErrorText = val;
                }
              });
                    defineGetter(this, 'tabFourErrorText', () => {
                return this._tabFourErrorText;
            });
            	defineSetter(this, 'tabFourErrorText', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabFourErrorText = val;
                }
              });
                          defineGetter(this, 'tabFiveErrorText', () => {
                return this._tabFiveErrorText;
            });
            	defineSetter(this, 'tabFiveErrorText', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabFiveErrorText = val;
                }
              });
                                defineGetter(this, 'tabSixErrorText', () => {
                return this._tabSixErrorText;
            });
            	defineSetter(this, 'tabSixErrorText', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tabSixErrorText = val;
                }
              });
      defineGetter(this, 'tabOneDateFilterLabels', function () {
                return this._tabOneDateFilterLabels;
            });
            
 defineSetter(this, 'tabOneDateFilterLabels', function (val) {
                if (typeof val === 'string' && val !== '') {
                this._tabOneDateFilterLabels = val;
                }
            });
             defineGetter(this, 'tabOneDateFilterKeys', function () {
                return this._tabOneDateFilterKeys;
            });
            
 defineSetter(this, 'tabOneDateFilterKeys', function (val) {
                if (typeof val === 'string' && val !== '') {
                this._tabOneDateFilterKeys = val;
                }
            });
//tab Two
 defineGetter(this, 'tabTwoDateFilterLabels', function () {
                return this._tabTwoDateFilterLabels;
            });
            
 defineSetter(this, 'tabTwoDateFilterLabels', function (val) {
                if (typeof val === 'string' && val !== '') {
                this._tabTwoDateFilterLabels = val;
                }
            });
             defineGetter(this, 'tabTwoDateFilterKeys', function () {
                return this._tabTwoDateFilterKeys;
            });
            
 defineSetter(this, 'tabTwoDateFilterKeys', function (val) {
                if (typeof val === 'string' && val !== '') {
                this._tabTwoDateFilterKeys = val;
                }
            });
//tab Three
 defineGetter(this, 'tabThreeDateFilterLabels', function () {
                return this._tabThreeDateFilterLabels;
            });
            
 defineSetter(this, 'tabThreeDateFilterLabels', function (val) {
                if (typeof val === 'string' && val !== '') {
                this._tabThreeDateFilterLabels = val;
                }
            });
             defineGetter(this, 'tabThreeDateFilterKeys', function () {
                return this._tabThreeDateFilterKeys;
            });
            
 defineSetter(this, 'tabThreeDateFilterKeys', function (val) {
                if (typeof val === 'string' && val !== '') {
                this._tabThreeDateFilterKeys = val;
                }
            });
            
//tab Four
 defineGetter(this, 'tabFourDateFilterLabels', function () {
                return this._tabFourDateFilterLabels;
            });
            
 defineSetter(this, 'tabFourDateFilterLabels', function (val) {
                if (typeof val === 'string' && val !== '') {
                this._tabFourDateFilterLabels = val;
                }
            });
             defineGetter(this, 'tabFourDateFilterKeys', function () {
                return this._tabFourDateFilterKeys;
            });
            
 defineSetter(this, 'tabFourDateFilterKeys', function (val) {
                if (typeof val === 'string' && val !== '') {
                this._tabFourDateFilterKeys = val;
                }
            });
//tab Five
 defineGetter(this, 'tabFiveDateFilterLabels', function () {
                return this._tabFiveDateFilterLabels;
            });
            
 defineSetter(this, 'tabFiveDateFilterLabels', function (val) {
                if (typeof val === 'string' && val !== '') {
                this._tabFiveDateFilterLabels = val;
                }
            });
             defineGetter(this, 'tabFiveDateFilterKeys', function () {
                return this._tabFiveDateFilterKeys;
            });
            
 defineSetter(this, 'tabFiveDateFilterKeys', function (val) {
                if (typeof val === 'string' && val !== '') {
                this._tabFiveDateFilterKeys = val;
                }
            });
//tab Six
 defineGetter(this, 'tabSixDateFilterLabels', function () {
                return this._tabSixDateFilterLabels;
            });
            
 defineSetter(this, 'tabSixDateFilterLabels', function (val) {
                if (typeof val === 'string' && val !== '') {
                this._tabSixDateFilterLabels = val;
                }
            });
             defineGetter(this, 'tabSixDateFilterKeys', function () {
                return this._tabSixDateFilterKeys;
            });
            
 defineSetter(this, 'tabSixDateFilterKeys', function (val) {
                if (typeof val === 'string' && val !== '') {
                this._tabSixDateFilterKeys = val;
                }
            });
      //default Keys for each Tab
        defineGetter(this, 'tabOneDateFilterDefaultKey', function () {
                return this._tabOneDateFilterDefaultKey;
            });
            
 		defineSetter(this, 'tabOneDateFilterDefaultKey', function (val) {
                if (typeof val === 'string' && val !== '') {
                this._tabOneDateFilterDefaultKey = val;
                }
            });
              defineGetter(this, 'tabTwoDateFilterDefaultKey', function () {
                return this._tabTwoDateFilterDefaultKey;
            });
            
 		defineSetter(this, 'tabTwoDateFilterDefaultKey', function (val) {
                if (typeof val === 'string' && val !== '') {
                this._tabTwoDateFilterDefaultKey = val;
                }
            });
          defineGetter(this, 'tabThreeDateFilterDefaultKey', function () {
                return this._tabThreeDateFilterDefaultKey;
            });
            
 		defineSetter(this, 'tabThreeDateFilterDefaultKey', function (val) {
                if (typeof val === 'string' && val !== '') {
                this._tabThreeDateFilterDefaultKey = val;
                }
            });
            defineGetter(this, 'tabFourDateFilterDefaultKey', function () {
                return this._tabFourDateFilterDefaultKey;
            });
            
 		defineSetter(this, 'tabFourDateFilterDefaultKey', function (val) {
                if (typeof val === 'string' && val !== '') {
                this._tabFourDateFilterDefaultKey = val;
                }
            });
          defineGetter(this, 'tabFiveDateFilterDefaultKey', function () {
                return this._tabFiveDateFilterDefaultKey;
            });
            
 		defineSetter(this, 'tabFiveDateFilterDefaultKey', function (val) {
                if (typeof val === 'string' && val !== '') {
                this._tabFiveDateFilterDefaultKey = val;
                }
            });
                defineGetter(this, 'tabSixDateFilterDefaultKey', function () {
                return this._tabSixDateFilterDefaultKey;
            });
            
 		defineSetter(this, 'tabSixDateFilterDefaultKey', function (val) {
                if (typeof val === 'string' && val !== '') {
                this._tabSixDateFilterDefaultKey = val;
                }

            });
            defineGetter(this, 'tabOneSearchPlaceholder', () => {
                return this._tabOneSearchPlaceholder;
            });
            defineSetter(this, 'tabOneSearchPlaceholder', value => {
                this._tabOneSearchPlaceholder = value;
            });
            defineGetter(this, 'tabTwoSearchPlaceholder', () => {
                return this._tabTwoSearchPlaceholder;
            });
            defineSetter(this, 'tabTwoSearchPlaceholder', value => {
                this._tabTwoSearchPlaceholder = value;
            });
            defineGetter(this, 'tabThreeSearchPlaceholder', () => {
                return this._tabThreeSearchPlaceholder;
            });
            defineSetter(this, 'tabThreeSearchPlaceholder', value => {
                this._tabThreeSearchPlaceholder = value;
            });
            defineGetter(this, 'tabFourSearchPlaceholder', () => {
                return this._tabFourSearchPlaceholder;
            });
            defineSetter(this, 'tabFourSearchPlaceholder', value => {
                this._tabFourSearchPlaceholder = value;
            });
            defineGetter(this, 'tabFiveSearchPlaceholder', () => {
                return this._tabFiveSearchPlaceholder;
            });
            defineSetter(this, 'tabFiveSearchPlaceholder', value => {
                this._tabFiveSearchPlaceholder = value;
            });
            defineGetter(this, 'tabSixSearchPlaceholder', () => {
                return this._tabSixSearchPlaceholder;
            });
            defineSetter(this, 'tabSixSearchPlaceholder', value => {
                this._tabSixSearchPlaceholder = value;
            });
           //CancelOperation
            defineGetter(this, 'cancelReqObjName', () => {
                return this._cancelReqObjName;
            });
            defineSetter(this, 'cancelReqObjName', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._cancelReqObjName = val;
                }
            });
            defineGetter(this, 'cancelReqCriteria', () => {
                return this._cancelReqCriteria;
            });
            defineSetter(this, 'cancelReqCriteria', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._cancelReqCriteria = val;
                }
            });
            defineGetter(this, 'cancelReqObjService', () => {
                return this._cancelReqObjService;
            });
            defineSetter(this, 'cancelReqObjService', value => {
                this._cancelReqObjService = value;
            });
            defineGetter(this, 'cancelReqOperation', () => {
                return this._cancelReqOperation;
            });
            defineSetter(this, 'cancelReqOperation', value => {
                this._cancelReqOperation = value;
            });
        },
    
    
    postShow: function(){
            this.noOfRecords = "10";
           },
    /**
     * Component setContext
     * To collect the context object required for the component 
     * context{JSONobject} - account object 
     */
    setContext:function(context){
      var self = this;
      try
      {
        this.context=context;
        this.parserUtilsManager.setContext(this.context);
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in the preshow of the component.",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component setFormContext
     * To collect the form object 
     * formObject{JSONobject} - form object 
     */
    setFormContext: function(formObject) {
      this.formObject = formObject;
    },
    /**
     * Component preShow
     * Reponsible to retain the data for custom properties for multiple entries into the component
                      Invoke the DAO layer to collect information from the service
     */
    preShow:function(){
      var scope = this;
	  this.view.flxStatus.width = "100dp";
      this.view.onTouchEnd = this.hideContextualMenu;
	  this.isRTL?this.view.imgSort1.left = "60px":this.view.imgSort1.right = "100px";
      this.view.imgStatusSort.left = this.isRTL ? "55px" : "67px";
      if(this.selectedTab === 1){
      if(scope_WealthPresentationController.isTAPIntegration || scope_WealthPresentationController.isMockIntegration){
      this.view.flxToggle.isVisible = true;
      this.view.flxKeyword.width = "69%";
      }else {
      this.view.flxToggle.isVisible = false;
      this.view.flxKeyword.width="96%";
      }
      }
      this.view.segDot.setVisibility(true);
      this.view.imgToggle.onTouchEnd = this.onToggleIncludeOrders;
       this.isIncludeOrder = "false";
       this.view.imgToggle.src = this.imageDisable;
      scope_WealthPresentationController.isOpenOrdersIncluded = false;// used for status column alone- please do not touch this scope variable
      scope_WealthPresentationController.isOpenOrdersIncludedflag = false; // used in other forms for a check of includeOrders
      this.tabMapping = {
        "1" : this.getFieldValue(scope._tabOneName), 
        "2" : this.getFieldValue(scope._tabTwoName),
        "3" : this.getFieldValue(scope._tabThreeName),
        "4" : this.getFieldValue(scope._tabFourName),
        "5" : this.getFieldValue(scope._tabFiveName),
        "6" : this.getFieldValue(scope._tabSixName)
      };
      
      this.view.lblByKeyword.setVisibility(false);
      
       
      this.view.PerformanceTab.setVisibility(true);
      var tab = this.tabMapping[this.selectedTab];
      if (tab === this.getFieldValue("{i.i18n.wealth.performance}")) {
        this.view.PerformanceTab.height="0Dp";
      }
            this.numberMapping = {
              "1" : "One",
              "2" : "Two",
              "3" : "Three",
              "4" : "Four",
              "5" : "Five",
              "6" : "Six",
              "7" : "Seven",
              "8" : "Eight",
              "9" : "Nine",
              "10" : "Ten",
              "11" : "Eleven",
              "12" : "Twelve",
              "13" : "Thirteen",
              "14" : "Fourteen",
              "15" : "Fifteen",
              "16" : "Sixteen",
              "17" : "Seventeen",
              "18":"Eighteen",
              "19":"Nineteen"
             
           
              
      };

      try
      {
        this.view.flxCalWhole.setVisibility(false);
        var currentBreakPoint=kony.application.getCurrentBreakpoint();
        this.formattingJSON = {
          "amountFormat" : JSON.parse(this._amountFormat),
          "dateFormat" : this._dateFormat,
          "backenddateformat" : this._backendDateFormat,
        }
        this.skins = {
          FILTER_SELECTED: scope._sknFilterActiveTab,
          FILTER_SELECTED_HOVER: scope._sknFilterActiveTabHover,
          FILTER_UNSELECTED_HOVER: scope._sknFilterInactiveTabHover,
          FILTER_INACTIVE: scope._sknFilterInactiveTab,
        };
        this.formatSkins = {
          TEXT_SKIN : scope._sknTableLabelField,
          POSITIVE_AMOUNT_SKIN : scope._sknPositiveAmount,
          NEGATIVE_AMOUNT_SKIN : scope._sknNegativeAmount,
          DATE_SKIN : scope._sknDate,
          PERCENTAGE_SKIN : scope._sknPercentage
        }
//         if(currentBreakPoint == "640"){
//           this.rowTemplate = "ICFlxSegTransactionsRowSavingsMobile";
//           this.expandedTemplate = "ICFlxSegTransactionRowSelectedMobile";
//         }
//         else{
//           this.rowTemplate = "ICFlxSegTransactionRowSavings";
//           this.expandedTemplate = "ICFlxSegTransactionRowSelected";
//         }
		//this.EntitlementUtils.setEntitlements(this.context);
        if(kony.application.getCurrentBreakpoint() !== 640){
           this.view.paginationFooter.setVisibility(true);
          this.view.paginationHeader.setVisibility(true);   
        }
       // this.transactionListTypes = JSON.parse(this._segregationTypes);
        this.criteria = {};
        this.tabNavigation = true;
        //this.setAccountTypeFromContext();
        this.setTabData();
          this.EntitlementUtils.setEntitlements(this.features);
        this.checkPermission();
      
     //   this.selectedTab = 1;
        this.setSelectedTabUI();
        //replacing aboce three lines with refreshSegment call 
        this.setUpTabPrefix();
        this.setUpUIOptions();
        this.setIcons();
        this.setSearchUI();
        this.setDefaultParams();
        this.setRequestParams();
       this.setContext(this.params);
       this.makeDaoCallBasedOnSelectedTab();      
         this.makeDaocallForFetchingListBoxDetails();
         this.initActions();
        if(eval("this._tab"+this.prefix+"DockFirstColumn")) //context
{ 		
  this.view.imgSort1.src=this.sortAsc;

}else{
  this.view.imgS1.src=this.sortAsc;
  
}
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in the preshow of the component.",
              "errorLevel" : "Business",
              "error": err
            };
        scope.onError(errorObj);
      }
        this.view.flxSegmentContainer1.setVisibility(true);
        this.view.flxNoTransactions.setVisibility(false);
      	if (scope_WealthPresentationController.viewOrdersTab) {
          this.onTabClick(this.view.btnFilter3);
        }	
    },

    getDefaultFilterKey: function(){
      this.dateKey = this.getFieldValue(eval("this._tab" + this.prefix + "DateFilterDefaultKey")); 
      if((this.dateKey == undefined) || (this.dateKey == "")){
        this.dateKey = this.dateKeyArr[0];
      }
    },
    
     resetPagination: function(){
            this.view.paginationFooter.resetStartIndex();
      		this.offset="0";
     },
    
    onToggleIncludeOrders : function(){  
      if(this.view.imgToggle.src === this.imageDisable){ // for include orders
        this.view.imgToggle.src = this.imageEnable; 
         scope_WealthPresentationController.isOpenOrdersIncluded = true;
         scope_WealthPresentationController.isOpenOrdersIncludedflag = true;
         this.isIncludeOrder = "true";
        this.makeDaoCallForIncludeOrdersCompleteResponse();
                 this.view.flxRemaining2.width = (kony.application.getCurrentBreakpoint() === 1024 || this.orientationHandler.isTablet)? "62%":"66%";

        this.resetSortValues();
        this.refreshSegment();
      }else {	
        this.view.flxStatus.isVisible = false;
          this.view.flxRemaining2.width = "75%";
        this.view.imgToggle.src = this.imageDisable;    
        scope_WealthPresentationController.isOpenOrdersIncluded = false;
        scope_WealthPresentationController.isOpenOrdersIncludedflag = false;
        this.isIncludeOrder = "false";
        this.resetSortValues();
        this.refreshSegment();
      }
      
    },
    makeDaoCallForIncludeOrdersCompleteResponse: function(){
      try{
      let objectName = this.getTabObjectName();
      let objectServiceName = this.getTabObjServiceName();
      let operationName = this.getTabOperationName();
      let serviceResponseIdentifier = this.getTabServiceIdentifier();
      this.setCriteriaBasedOnTab();
      let criteria = this.getCriteria();
        criteria.isIncludeOrders = "true";
        criteria.pageSize = 1000;
        this.requestStart();
      this.portfolioListDAO.fetchDetails(objectServiceName,operationName,objectName,criteria,serviceResponseIdentifier,this.onServiceSuccessIncludeOrders,this.onError);
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in making service call.",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    onServiceSuccessIncludeOrders : function(data,unicode){
      this.completeIncludeOrderResponse = data.portfolioHoldings;
    },
    resetSortValues: function(){
            let tabName =  this.tabMapping[this.selectedTab];
            switch(tabName){
        case this.getFieldValue("{i.i18n.wealth.holdings}"):
          this.sortBy = "description";    
                    this.sorting="ASC";
          this.setImage(0,this.view.imgSort1,true,this.sorting);
                       
          break;
        case this.getFieldValue("{i.i18n.common.transactions}"):
           this.sortBy = "tradeDate";
                     this.sorting="DESC";
           this.setImage(1,this.view.imgS1,true,this.sorting);
              
          break; 
        case this.getFieldValue("{i.i18n.wealth.accountsActivity}"):
          this.sortBy = "bookingDate";
                      this.sorting="DESC";
           this.setImage(1,this.view.imgS1,true,this.sorting);
             
          break; 
        case this.getFieldValue("{i.i18n.wealth.orders}"):
  			this.sortBy = "tradeDate";
                           this.sorting="DESC";
           this.setImage(2,this.view.imgS2,true,this.sorting);          
          break;
        case this.getFieldValue("{i.i18n.wealth.performance}"):
                           this.sorting="DESC";
          this.sortBy = "dateTime";
          break; 
        case this.getFieldValue("{i.i18n.wealth.reports}"):
          break; 
      }
    },
    setDefaultParams: function () {
      this.getDefaultFilterKey();
      let tabName = this.tabMapping[this.selectedTab];
      this.currPage = tabName;
      this.view.txtKeyword.text = "";
      this.searchText = this.view.txtKeyword.text;
      this.view.paginationFooter.resetStartIndex();
      this.offset = "0";
      if (this.width === 1024 || this.width === 768 || this.orientationHandler.isTablet) {
        this.view.flxActionsContainer.width = "150px";
      } else {
        this.view.flxActionsContainer.width = "200px";
      }
      this.view.flxKeyword.height = "80dp";
      this.view.flxToggle.setVisibility(false);
      this.view.flxKeyword.top = "0dp";
      switch (tabName) {
        case this.getFieldValue("{i.i18n.wealth.holdings}"):
          this.sortBy = "description";
          this.sorting = "ASC";
          this.setImage(0, this.view.imgSort1, true, this.sorting);
          this.currPage = "Holdings";
          this.view.flxKeyword.height = "60dp";
          this.view.flxKeyword.width = "69%";
          this.view.flxToggle.setVisibility(true);
          this.isIncludeOrder = "false";
          scope_WealthPresentationController.isOpenOrdersIncluded = false;
          scope_WealthPresentationController.isOpenOrdersIncludedflag = false;
          this.view.imgToggle.src = this.imageDisable;
          if (scope_WealthPresentationController.isTAPIntegration || scope_WealthPresentationController.isMockIntegration) {
            this.view.flxToggle.isVisible = true;
            this.view.flxKeyword.width = "69%";
          } else {
            this.view.flxToggle.isVisible = false;
            this.view.flxKeyword.width = "96%";
          }
          break;
        case this.getFieldValue("{i.i18n.common.transactions}"):
          this.view.flxCalWhole.top = "150dp";
          this.view.flxCalWhole.left = "26.5%";
          this.view.flxCalendar.top = "5px";
          this.sortBy = "tradeDate";
          this.sorting = "DESC";
          this.currPage = "Transactions";
          this.setImage(1, this.view.imgS1, true, this.sorting);
          var today = scope_WealthPresentationController.wealthBankDate ? new Date(scope_WealthPresentationController.wealthBankDate) : new Date();   
          this.endDate = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
          var previousDate = new Date(today.getTime() - (30 * 24 * 60 * 60 * 1000));
          this.startDate = previousDate.getFullYear() + '-' + ('0' + (previousDate.getMonth() + 1)).slice(-2) + '-' + ('0' + previousDate.getDate()).slice(-2);
          break;
        case this.getFieldValue("{i.i18n.wealth.accountsActivity}"):
          this.listType = "SEARCH";
          this.view.flxCalWhole.top = "150dp";
          this.view.flxCalWhole.left = "28%";
          this.sortBy = "bookingDate";
          this.sorting = "DESC";
          this.currPage = "Accounts Activity";
          this.setImage(1, this.view.imgS1, true, this.sorting);
          var today = scope_WealthPresentationController.wealthBankDate ? new Date(scope_WealthPresentationController.wealthBankDate) : new Date();          
          this.endDate = today.getFullYear() + ('0' + (today.getMonth() + 1)).slice(-2) + ('0' + today.getDate()).slice(-2);
          var previousDate = new Date(today.getTime() - (30 * 24 * 60 * 60 * 1000));
          this.startDate = previousDate.getFullYear() + ('0' + (previousDate.getMonth() + 1)).slice(-2) + ('0' + previousDate.getDate()).slice(-2);
          if (this.width === 1024 || this.width === 768 || this.orientationHandler.isTablet) {
            this.view.flxCalWhole.width = "95%";
            this.view.flxCalWhole.left = "3%";
            this.view.flxCalWhole.top = "250px";
          }
          break; 
        case this.getFieldValue("{i.i18n.wealth.orders}"):
          if (this.selectedRadioOptionText == this.getFieldValue(this._searchLabel3)) {
            this.orderType = "Open";
            this.currPage = "Open Order";
            this.view.txtKeyword.placeholder = this.getFieldValue(eval("this._tab" + this.prefix + "SearchPlaceholder"));
          }
          else {
            this.view.flxCalendar.top = "0px";
            this.orderType = "History";
            this.currPage = "History Order";
            this.view.txtKeyword.placeholder = this.getFieldValue(eval("this._tab" + this.prefix + "SearchPlaceholder"));
          }
          this.sortBy = "tradeDate";
          this.sorting = "DESC";
          this.view.flxCalWhole.top = "200dp";
          this.view.flxCalWhole.left = "26.5%";
          this.orderId = this.canceledOrderId;
          var today = scope_WealthPresentationController.wealthBankDate ? new Date(scope_WealthPresentationController.wealthBankDate) : new Date();          
          this.endDate = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
          var previousDate = new Date(today.getTime() - (30 * 24 * 60 * 60 * 1000));
          this.startDate = previousDate.getFullYear() + '-' + ('0' + (previousDate.getMonth() + 1)).slice(-2) + '-' + ('0' + previousDate.getDate()).slice(-2);
          this.setImage(2,this.view.imgS2,true,this.sorting);          
          break;
        case this.getFieldValue("{i.i18n.wealth.performance}"):
          this.duration = "OneY";
          this.sortBy = "dateTime";
          this.view.flxCalWhole.top = "150dp";
	        this.view.flxCalWhole.left = "3%";
          this.benchMarkIndex = " ";
          this.sorting="DESC";
          var today = scope_WealthPresentationController.wealthBankDate ? new Date(scope_WealthPresentationController.wealthBankDate) : new Date();          
          this.startDate = (today.getFullYear() -1) + ('0' + (today.getMonth() + 1)).slice(-2) + ('0' + today.getDate()).slice(-2); 
          this.endDate = today.getFullYear() + ('0' + (today.getMonth() + 1)).slice(-2) + ('0' + today.getDate()).slice(-2);
          this.setImage(1,this.view.imgS1,true,this.sorting);
          break; 
        case this.getFieldValue("{i.i18n.wealth.reports}"):
          var reportConfig = this.getFieldValue(eval("this._tab" + this.prefix + "PerformanceConfig"));
          this.view.lbl01.text =reportConfig.lbl01;
          this.view.lbl02.text =reportConfig.lbl02;
          this.view.lbl03.text =reportConfig.lbl03;
          this.view.lbl04.text =reportConfig.lbl04;
          this.view.imgCal1.src = reportConfig.img1;
          this.view.flxCalWhole.top = "235dp";
	        this.view.flxCalWhole.left = "2%";
          var today = scope_WealthPresentationController.wealthBankDate ? new Date(scope_WealthPresentationController.wealthBankDate) : new Date();          
          this.endDate = today.getFullYear() + ('0' + (today.getMonth() + 1)).slice(-2) + ('0' + today.getDate()).slice(-2);
          var previousDate = new Date(today.getTime() - (30 * 24 * 60 * 60 * 1000));
          this.startDate = previousDate.getFullYear() + ('0' + (previousDate.getMonth() + 1)).slice(-2) + ('0' + previousDate.getDate()).slice(-2);
          if (this.width === 1024 || this.width === 768 || this.orientationHandler.isTablet) {
            this.view.flxCalWhole.width="95%";
            this.view.flxCalWhole.left="3%";
            this.view.flxCalWhole.top="250px";
          }
          break; 
      }
      this.view.datePicker.setDefaultDateFilter(this.dateKey);
      let ind = this.dateKeyArr.indexOf(this.dateKey);
      this.dateText = this.dateLabelArr[ind];
      if(tabName === this.getFieldValue("{i.i18n.wealth.reports}")){
        this.view.lblText.text = this.dateText;
      }
      else{
        this.view.lblAutoDays.text = this.dateText;
      }
    },
    refreshSegment: function(){
      this.setUpTabPrefix();
      this.setSelectedTabUI();
      this.setUpUIOptions();
      this.setRequestParams();
      this.setContext(this.params);
      this.makeDaoCallBasedOnSelectedTab();
    },
    makeDaoCallBasedOnSelectedTab: function(){
      try{
      let objectName = this.getTabObjectName();
      let objectServiceName = this.getTabObjServiceName();
      let operationName = this.getTabOperationName();
      let serviceResponseIdentifier = this.getTabServiceIdentifier();
      this.setCriteriaBasedOnTab();
        this.requestStart();
      this.portfolioListDAO.fetchDetails(objectServiceName,operationName,objectName,this.getCriteria(),serviceResponseIdentifier,this.onServiceSuccess,this.onError);
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in making service call.",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    setRequestParams: function(){

       this.params = {
         "portfolioId":this.portfolioId,
         "navPage":this.currPage,
         "sortBy":this.sortBy,
         "searchByInstrumentName":this.searchText,
         "limit": this.noOfRecords,
         "offset": this.offset,
         "sortType":this.sorting,
         "startDate":this.startDate,
         "endDate":this.endDate,
         "orderId":this.orderId,
         "accountId":this.accountId,
         "dateFrom":this.startDate,
         "dateTo":this.endDate,
         "listType":"SEARCH",
         "sortBy":this.sortBy,
         "type": this.orderType,
         "benchMarkIndex": this.benchMarkIndex,
         "duration": this.duration,
         "pageSize": this.noOfRecords,
         "pageOffset":this.offset,
         "sortOrder": this.sorting,
         "type": this.orderType,
         "userId":this.userId,
         "fieldOrder":this.fieldOrder,
         "isEuro":this.isEuro,
         "assetType":this.assetType,
         "currencyId":this.currencyId,
         "downloadFormat": this.selectedDownloadFormat,
         "isIncludeOrders":this.isIncludeOrder
         //"formatList":this.selectedDownloadFormat
       };

     },
    setFeaturesAndPermissions:function(features){
      this.features={"entitlement":features};
    },
    checkPermission:function(){
        this.view.btnAll.isVisible=this.EntitlementUtils.isEntitled(this.getFieldValue(this._tabOneFeatures, "entitlement_keys"));
        this.view.btnFilter2.isVisible = this.EntitlementUtils.isEntitled(this.getFieldValue(this._tabTwoFeatures, "entitlement_keys"));
        this.isEntitledForOpenOrder =this.EntitlementUtils.isEntitled(this.getFieldValue(this._tabThreeAFeatures, "entitlement_keys"));
	    this.isEntitledForHistoryOrder =this.EntitlementUtils.isEntitled(this.getFieldValue(this._tabThreeBFeatures, "entitlement_keys"));
        this.view.btnFilter3.isVisible = this.isEntitledForOpenOrder || this.isEntitledForHistoryOrder;
        this.view.btnFilter4.isVisible = this.EntitlementUtils.isEntitled(this.getFieldValue(this._tabFourFeatures, "entitlement_keys"));
        this.view.btnFilter5.isVisible = this.EntitlementUtils.isEntitled(this.getFieldValue(this._tabFiveFeatures, "entitlement_keys"));
      this.permissionForGenerateReport = this.EntitlementUtils.isEntitled(this.getFieldValue(this._tabSixFeaturesgenerateReport, "entitlement_keys"));
        this.permissionForDownloadReport = this.EntitlementUtils.isEntitled(this.getFieldValue(this._tabSixFeaturesdownloadReport, "entitlement_keys"));
        this.view.btnFilter6.isVisible = this.permissionForGenerateReport || this.permissionForDownloadReport;
      this.setSelectedTab();
    },
    setSelectedTab:function(){
      if(this.view.btnAll.isVisible){
         this.selectedTab=1;
       
      }else if(this.view.btnFilter2.isVisible){
         this.selectedTab=2;
      }else if(this.view.btnFilter3.isVisible){
         this.selectedTab=3;
      }else if(this.view.btnFilter4.isVisible){
         this.selectedTab=4;
      }else if(this.view.btnFilter5.isVisible){
         this.selectedTab=5;
      }else{
         this.selectedTab=6;
      }
    },
    setCriteriaBasedOnTab: function(){

      var criterion; var pref ;
       if(this.prefix == "Three"){
        if(this.selectedRadioOption !== ""){
      criterion = this.getFieldValue(eval("this._tab"+this.prefix+this.selectedRadioOption+"Criteria"));
          pref = this.prefix+this.selectedRadioOption;
        }
       }
      else{
        criterion = this.getFieldValue(eval("this._tab"+this.prefix+"Criteria"));
         pref = this.prefix;
      }
      this.setCriteria(criterion,pref);
    },
    getTabObjectName: function(){
      var objName = "";
      if(this.prefix == "Three"){
        if(this.selectedRadioOption !== ""){
          objName = this.getFieldValue(eval("this._tab"+this.prefix+this.selectedRadioOption+"ObjName"));
        }
      }
      else{
        objName = this.getFieldValue(eval("this._tab"+this.prefix+"ObjName"));
      }
        return objName;
    },
    getResponseArrayBasedOnTab: function(){
      if(this.prefix == "Three"){
        if(this.selectedRadioOption !== ""){
          return this.getFieldValue(eval("this._tab"+this.prefix+this.selectedRadioOption+"ResponseArray"));
        }
      }
      return this.getFieldValue(eval("this._tab"+this.prefix+"ResponseArray"));
    },
    getTabObjServiceName: function(){
      var objSerName = "";
      if(this.prefix == "Three"){
        if(this.selectedRadioOption !== ""){
          return this.getFieldValue(eval("this._tab"+this.prefix+this.selectedRadioOption+"ObjService"));
        }
      }
      else{
        objSerName = this.getFieldValue(eval("this._tab"+this.prefix+"ObjService"));
      }
    return objSerName;
  },
    getTabOperationName: function(){
      var operationName = "";
      if(this.prefix == "Three"){
        if(this.selectedRadioOption !== ""){
          return this.getFieldValue(eval("this._tab"+this.prefix+this.selectedRadioOption+"Operation"));
        }
      }
      else{
        operationName = this.getFieldValue(eval("this._tab"+this.prefix+"Operation"));
      }
  return operationName;
},
       getTabServiceIdentifier: function(){
  var serIdentifier;
  if(this.prefix == "Three"){
    if(this.selectedRadioOption !== ""){
      serIdentifier = this.getFieldValue(eval("this._tab"+this.prefix+this.selectedRadioOption+"Identifier"));
    }
  }
  else{
    serIdentifier = this.getFieldValue(eval("this._tab"+this.prefix+"Identifier"));
  }
  return serIdentifier;
},
    onServiceSuccess: function(data,unicode){
        this.requestEnd();
      	this.view.flxSegmentContainer1.setVisibility(true);
      this.view.flxNoTransactions.setVisibility(false);
      this.completeResponse = data;
      var tabName = this.getFieldValue(eval("this._tab"+this.prefix+"Name"));
      if(this.tabMapping[this.selectedTab] === this.getFieldValue("{i.i18n.wealth.holdings}")){
								this.view.flxKeyword.width="69%";
        if(this.isIncludeOrder === "true"){
          this.view.imgToggle.src = this.imageEnable; 
        }else{
          this.view.imgToggle.src = this.imageDisable;
        }
					}
      this.view.PerformanceTab.height="0Dp";
      var currForm = kony.application.getCurrentForm();
      if(tabName == this.getFieldValue("{i.i18n.wealth.performance}")){
        if(this.completeResponse.hasOwnProperty('totalCount') && this.completeResponse.totalCount > 0){
        var performanceConfig = this.getFieldValue(eval("this._tab"+this.prefix+"PerformanceConfig"));
        var configurableValue = {
          dateFilter : this.dateKey,
          performanceConfig : performanceConfig,
          benchMarkIndex : this.benchMarkIndex
        } 

        this.view.PerformanceTab.height=kony.flex.USE_PREFFERED_SIZE;
		this.view.PerformanceTab.setVisibility(true);
        this.view.PerformanceTab.drawDataChart(this.completeResponse, configurableValue);  
        }else{
          this.onError();
        }
      }
      currForm.forceLayout();
      var bp = kony.application.getCurrentBreakpoint();
      this.processResponse(data,unicode);
        if(tabName == this.getFieldValue("{i.i18n.wealth.accountsActivity}")){
          this.view.flxKeyword.width = "46%";
        var tempArr = [];
        tempArr = this.getResponseArrayBasedOnTab();
        this.portfolioArray = tempArr.body;
      }else if(tabName == this.getFieldValue("{i.i18n.wealth.reports}")){
        if(bp === 1024){
         this.view.flxLeft.width = "330dp";
		 this.view.flxRight.width = "300dp";
        }
        if(!this.permissionForGenerateReport){
         this.view.flxLeft.setVisibility(false);
        }else{
          this.view.flxLeft.setVisibility(true);
        }
        this.view.lbxlanguage.skin = "sknlbxaltoffffffB1R2";
		this.view.lbxlanguage.focusSkin = "sknlbxaltoffffffB1R2";
        this.view.lbxReport.skin = "sknlbxaltoffffffB1R2";
		this.view.lbxReport.focusSkin = "sknlbxaltoffffffB1R2";
        this.view.PerformanceTab.height="0Dp";
        this.view.lblValueRep.skin="sknLblSSP42424215px";
        this.view.flxSegmentContainer.setVisibility(false);
        this.view.flxReport.setVisibility(true);
        this.setStatementData();
        this.setMasterDataForReportsTxtBox();
      }
      else{
        this.portfolioArray = this.getResponseArrayBasedOnTab();
		if(tabName == this.getFieldValue("{i.i18n.wealth.performance}")){
          for(var i = 0;i<this.portfolioArray.length;i++){
            if(this.portfolioArray[i].benchMarkIndex == ""){
              this.portfolioArray[i].benchMarkIndex = "0";
            }
          }
        }
         if (scope_WealthPresentationController.isOpenOrdersIncluded) {
        this.setStatus();
      } 
      }   
      if(this.portfolioArray.length > 0 && Array.isArray(this.portfolioArray)){
        if(tabName == this.getFieldValue("{i.i18n.wealth.reports}")){
          this.view.flxPag.setVisibility(false);
        }else{
          this.view.flxPag.setVisibility(true);
        }
         this.responseMappingFn();
      this.view.paginationFooter.updatePaginationBar(Number(this.offset),Number(data.totalCount));    
      }
        else{
        this.handleNoRowData();
          this.view.flxPag.setVisibility(false);
        }
     //this.portfolioArray = this.getResponseArrayBasedOnTab();
     // this.responseMappingFn();
      
     // this.view.paginationFooter.updatePaginationBar(Number(this.offset),Number(data.totalCount));
      
      setTimeout(this.clearCSS, 500);
      
    },

    clearCSS: function() {

      var tempDom = document.querySelectorAll("[kwp='frmPortfolioOverview_portfolioDetails_flxSeparator2']")
      if (tempDom && tempDom[0]) {
        tempDom[0].style.removeProperty("align-self");
      }
      tempDom = document.querySelectorAll("[kwp='frmPortfolioOverview_portfolioDetails_flxHeader']")
      if (tempDom && tempDom[0]) {
        tempDom[0].style.removeProperty("align-self");
      }
      tempDom = document.querySelectorAll("[kwp='frmPortfolioOverview_portfolioDetails_flxSeparator3']")
      if (tempDom && tempDom[0]) {
        tempDom[0].style.removeProperty("align-self");
      }
      tempDom = document.querySelectorAll("[kwp='frmPortfolioOverview_portfolioDetails_segRemaining']")
      if (tempDom && tempDom[0]) {
        tempDom[0].style.removeProperty("align-self");
      }
      if(this.isRTL){
         tempDom = document.querySelectorAll("[kwp='frmPortfolioOverview_portfolioDetails_flxRemaining2']")
      if (tempDom && tempDom[0]) {
        tempDom[0].scrollLeft = tempDom[0].scrollWidth;
      }
      }
     

    },
    setStatementData:function(){
      var data = this.completeResponse.downloadTypeList;
      var reportConfig = this.getFieldValue(eval("this._tab" + this.prefix + "PerformanceConfig"));
     var enable = this.permissionForDownloadReport;
      if(!enable){
			this.view.flxRight.setVisibility(false);
			return;
		}
     this.downloadData=[];
     this.view.segStatements.widgetDataMap = {"lbl1":"lbl1","img1":"img1","flxDownload":"flxDownload","lblSeparator":"lblSeparator","toolTip":"toolTip"};
    for(var i in data){
      data[i].downloadParams.portfolioId = this.portfolioId;
      if(data[i].downloadParams.hasOwnProperty('orderId')){
        data[i].downloadParams.orderId = this.orderId;
      }
     var storeData ={ 
      "lbl1" : data[i].downloadParams.downloadType,
      "downloadParams" : data[i].downloadParams,
       "flxDownload":{
         "onClick":this.downloadStatementinSeg.bind(this)
       },
       //IW-3766 - Bhuvaneshwaran - Starts
       "img1": 
       {
         "src":reportConfig.img2,
         "toolTip":data[i].downloadParams.downloadType,
       },
       //IW-3766 - Ends
       "lblSeparator": {
		  "isVisible":i == data.length-1?false:true	
		}
     };
     this.downloadData.push(storeData);
    }

    this.view.segStatements.removeAll();
    this.view.segStatements.setData(this.downloadData);
    
    },
    hideDateCalSelectOther:function(){
      this.view.flxCalWhole.isVisible = false;
    },
    setMasterDataForReportsTxtBox:function(){
      var data =  this.completeResponse;
      var uiData =[];
      var responseArray = data.languagesList;
      for(var num in responseArray){
         var langData = responseArray[num];
         uiData.push([langData['languageDescription'],langData['languageDescription']]);
       }
       this.view.lbxlanguage.masterData = uiData;
       this.view.lbxlanguage.selectedKey = this.view.lbxlanguage.masterData[0][0];
       this.view.flxLanguagetbx.onTouchEnd=this.hideDateCalSelectOther;
      //for reports textbox
        uiData =[];
       responseArray = data.reportTypeList;
      for(var num in responseArray){
         var reportData = responseArray[num];
        reportData['downloadParams'].portfolioId = this.portfolioId;
         if(reportData['downloadParams'].hasOwnProperty('accountId')){
           reportData['downloadParams'].accountId = this.accountId;
         }
         uiData.push([reportData['reportType'],reportData['reportType']]);
        this.reportParams[reportData['reportType'].replace(/ /g,'')] = reportData['downloadParams'];
       }
      this.view.lbxReport.masterData = uiData;
      this.view.lbxReport.selectedKey = this.view.lbxReport.masterData[0][0];
      this.view.flxReportTbx.onTouchEnd=this.hideDateCalSelectOther;
    },
    downloadStatementinSeg : function(){
      var self=this;
      var rowIndex = this.view.segStatements.selectedRowIndex[1];
      let downloadTypeParams = this.completeResponse.downloadTypeList[rowIndex].downloadParams;
	  this.selectedDownloadFormat = "pdf";
      downloadTypeParams.isEuro = this.isEuro;
	  this.setRequestParams();
      try{
      let objectName = this.getFieldValue(eval("this._downloadReportObjName"));
      let objectServiceName = this.getFieldValue(eval("this._downloadReportObjService"));
      let operationName = this.getFieldValue(eval("this._downloadReportOperation"));
      this.portfolioListDAO.fetchDetails(objectServiceName,operationName,objectName,downloadTypeParams,"",this.onSuccessDownload,this.onError);
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in making service call.",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    downloadStatement:function(){
       var self=this;
      var ReportFormat=this.view.lblValueRep.text;
      if(ReportFormat=="PDF")
        {
          this.selectedDownloadFormat="pdf";
        }
      else if(ReportFormat=="EXCEL")
        {
          this.selectedDownloadFormat="xlsx";
        }
      else{
          this.selectedDownloadFormat="csv";
      }
      let downloadTypeParams = this.reportParams[this.view.lbxReport.selectedKey.replace(/ /g, '')];
      downloadTypeParams.isEuro = this.isEuro;
      this.setRequestParams();
      downloadTypeParams.downloadFormat=this.selectedDownloadFormat;
      downloadTypeParams.dateFrom = this.params.startDate;
      downloadTypeParams.dateTo = this.params.endDate;
      try{
      let objectName = this.getFieldValue(eval("this._getReportObjName"));
      let objectServiceName = this.getFieldValue(eval("this._getReportObjService"));
      let operationName = this.getFieldValue(eval("this._getReportOperation"));
      this.portfolioListDAO.fetchDetails(objectServiceName,operationName,objectName,downloadTypeParams,"",this.onSuccessDownload,this.onError);
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in making service call.",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    makeDaocallForFetchingListBoxDetails : function(){
      var scope = this;
    let objectName = scope.getFieldValue(scope._lstbxObjName);
    let objectServiceName = scope.getFieldValue(scope._lstbxObjService);
    let operationName =scope.getFieldValue(scope._lstbxOperation);
    let criterion = scope.getFieldValue(scope._lstbxCriteria);
      scope.setCriteria(criterion);
    this.portfolioListDAO.fetchDetails(objectServiceName,operationName,objectName,this.getCriteria(),"",this.responseProcessForDropdown,this.onError);
  },
    responseProcessForDropdown: function(data,unicode){ 
      var uiData =[];
      var responseArray = data.cashAccounts;
      for(var num in responseArray){
         var transData = responseArray[num];
         var dataManipulated =transData['currency']+"-"+transData['accountNumber'];
         uiData.push([transData['accountNumber'],dataManipulated]);
       }
       this.view.lstbxTransactionType.masterData = uiData;
       this.view.lstbxTransactionType.selectedKey = this.view.lstbxTransactionType.masterData[0][0];
   	   this.accountId = uiData[0][0];
    },
    
    makeDaocallForFetchingSettingsOrder: function(){
      var scope = this;
    let objectName = scope.getFieldValue(scope._settingsObjName);
    let objectServiceName = scope.getFieldValue(scope._settingsObjService);
    let operationName =scope.getFieldValue(scope._settingsGetOperation);
    let criterion = scope.getFieldValue(scope._settingsGetCriteria);
      scope.setCriteria(criterion);
    this.portfolioListDAO.fetchDetails(objectServiceName,operationName,objectName,this.getCriteria(),"",this.responseProcessForSettings,this.onError);
  },
    
        makeDaocallForUpdatingSettingsOrder: function(){
      var scope = this;
    let objectName = scope.getFieldValue(scope._settingsObjName);
    let objectServiceName = scope.getFieldValue(scope._settingsObjService);
    let operationName = scope.getFieldValue(scope._settingsUpdateOperation);
    let criterion = scope.getFieldValue(scope._settingsUpdateCriteria);
    this.setRequestParams();	
	this.setContext(this.params);
   this.setCriteria(criterion,"fieldOrder");
    this.portfolioListDAO.fetchDetails(objectServiceName,operationName,objectName,this.getCriteria(),"",this.updateResponseForSettings,this.onError);
  },
     makeDaoCallForPrintDownload: function(params){
      try{
      let objectName = this.getFieldValue(eval("this._GAobjectName"));
      let objectServiceName = this.getFieldValue(eval("this._GAobjectServiceName"));
      let operationName = this.getFieldValue(eval("this._GAoperationName"));
      this.setRequestParams();
      let serviceResponseIdentifier = this.getTabServiceIdentifier();
      this.setCriteriaBasedOnTab();
       
        if(params=="Print")
          {
            
			   this.criteria.downloadFormat="pdf"; //IW-3752 fix
      this.portfolioListDAO.fetchDetails(objectServiceName,operationName,objectName,this.getCriteria(),serviceResponseIdentifier,this.onSuccessPrint,this.onError);
          }
        else{
          
			 this.criteria.downloadFormat=this.selectedDownloadFormat; //IW-3752 fix
           this.portfolioListDAO.fetchDetails(objectServiceName,operationName,objectName,this.getCriteria(),serviceResponseIdentifier,this.onSuccessDownload,this.onError);
        }
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in making service call.",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },   
    
        handleNoRowData: function(){
          this.view.flxSegmentContainer1.setVisibility(false);
          this.setErrorTextBasedOnTab();
          this.view.flxNoTransactions.setVisibility(true);
          
        },
    setErrorTextBasedOnTab: function(){
      var pref = "";
      if(this.prefix == "Three"){
        if(this.selectedRadioOption !== ""){
          pref = this.prefix +this.selectedRadioOption;
        }
      }
      else{
        pref = this.prefix;
      }
      var errText = this.getFieldValue(eval("this._tab"+pref+"ErrorText"));
      this.view.rtxNoPaymentMessage.text = errText;
      if(this.view.flxCalendar.isVisible){
        if(this.dateText.includes("-")){
        this.view.rtxNoPaymentMessage.text= errText+ " "+kony.i18n.getLocalizedString("i18n.between")+" " +this.dateText.toLowerCase();
        }
        else{
          this.view.rtxNoPaymentMessage.text= errText+ " "+kony.i18n.getLocalizedString("i18n.wealth.forThe")+" " +this.dateText.toLowerCase();
        }
      }
    },
    //onSuccessDownload
    onSuccessDownload: function(response,unicode){
            //let mimeType;
            switch (this.selectedDownloadFormat) {
                case "pdf":
                    mimeType = "application/pdf";
                    break;
                case "xlsx":
                    mimeType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                    break;
                case "csv":
                    mimeType = "text/csv";
                    break;
            }
            if (this.selectedRadioOptionText == this.getFieldValue(this._searchLabel3)) {
                var fileName = this.getFieldValue(this._searchLabel3)+ "." + this.selectedDownloadFormat;
            } else if (this.selectedRadioOptionText == this.getFieldValue(this._searchLabel4)) {
                fileName = this.getFieldValue(this._searchLabel4)+ "." + this.selectedDownloadFormat;
            } else {
                fileName = this.tabMapping[this.selectedTab] + "." + this.selectedDownloadFormat;
            }
			
			const downloadLink = document.createElement("a");
				
			if (this.selectedDownloadFormat==="pdf") {
				
				// Create a Blob from the Base64 data
				const byteCharacters = atob(response.base64);
				const byteNumbers = new Array(byteCharacters.length);
				for (let i = 0; i < byteCharacters.length; i++) {
					byteNumbers[i] = byteCharacters.charCodeAt(i);
				}
				const byteArray = new Uint8Array(byteNumbers);
				const blob = new Blob([byteArray], {
					type: 'application/octet-stream'
				});
				
				// Create a data URL from the Blob
				const dataUrl = URL.createObjectURL(blob);
				// Set the data URL as the href attribute and trigger download
				downloadLink.href = dataUrl;
				downloadLink.download = fileName;
				downloadLink.target = "_blank"
				downloadLink.click();
				// Revoke the data URL to free up resources - but not working
				//URL.revokeObjectURL(dataUrl);
			} else {
              const linkSource = `data:${mimeType};base64,${response.base64}`;
			  downloadLink.href = linkSource;
			  downloadLink.download = fileName;
			  downloadLink.click();
			}
            
    },
    
     updateResponseForSettings: function(response,unicode){
       applicationManager.getPresentationUtility().dismissLoadingScreen();
       var successObj =
            {
              "success": response
            };
     },

        //onSuccessDownload
    responseProcessForSettings: function(response,unicode){
      this.selectedColumnforsettings="";
      if(response.wealthuserpreferences.length){
       this.selectedColumnforsettings=response.wealthuserpreferences[0].fieldOrder.split(",");
      }
      else{
      this.selectedColumnforsettings = ["0", "1", "2", "3", "4", "5"];
      }
      this.RealignSegment(this.selectedColumnforsettings);
    },
    // method which converts base64 to Blob
    b64toBlob:function(content,contentType){
      contentType = contentType || '';
      const sliceSize = 512;
      // method which converts base64 to binary
      const byteCharacters = window.atob(content); 

      const byteArrays = [];
      for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }
      const blob = new Blob(byteArrays, {
        type: contentType
      }); // statement which creates the blob
      return blob;
    },

    //PrintPreview
    printPreview:function(data,type){
      var scope = this;
      let blob = null;
      applicationManager.getPresentationUtility().showLoadingScreen();
      blob = this.b64toBlob(data, type);
      const blobURL = URL.createObjectURL(blob);
      // Create a hidden iframe
      var iframe = document.getElementById("printIframe");
      if (!iframe) {
        iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.id = 'printIframe';
      }
      // Set the iframe source to the Blob URL
      iframe.src = blobURL;
      document.body.appendChild(iframe);
      // Wait for the iframe to load, then print the content
      iframe.onload = function() {
        setTimeout(scope.printPDFPreview(iframe), 1000);
      };
    },

    printPDFPreview: function(iframe) {
      iframe.contentWindow.print();
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    },

    //OnSuccessprint
    onSuccessPrint: function(response,unicode) {	
      this.printPreview(response.base64,'application/pdf');
    }, 
    /**
     * Component initActions
     * Reponsible to initialize actions
     */
    initActions: function(){
      var self = this;
      try
      {
		  this.view.PerformanceTab.setBenchmark = function(selectedIndex){
          self.benchMarkIndex = selectedIndex;
          self.refreshSegment();
        };
           this.view.flxClose.setVisibility(false);
        this.view.btnAll.onClick = this.onTabClick.bind(this, this.view.btnAll);
        this.view.btnFilter2.onClick = this.onTabClick.bind(this, this.view.btnFilter2);
        this.view.btnFilter3.onClick = this.onTabClick.bind(this, this.view.btnFilter3); 
        this.view.btnFilter4.onClick = this.onTabClick.bind(this, this.view.btnFilter4); 
        this.view.btnFilter5.onClick = this.onTabClick.bind(this, this.view.btnFilter5); 
        this.view.btnFilter6.onClick = this.onTabClick.bind(this, this.view.btnFilter6);
        this.view.imgColumn1Right.onTouchEnd = this.flxColumn1onClick.bind(this);
        this.view.imgColumn1Left.onTouchEnd = this.flxColumn1onClick.bind(this);
        this.view.imgColumn2Right.onTouchEnd = this.flxColumn2onClick;
        this.view.imgColumn2Left.onTouchEnd = this.flxColumn2onClick;
        this.view.imgColumn3Right.onTouchEnd = this.flxColumn3onClick;
        this.view.imgColumn3Left.onTouchEnd = this.flxColumn3onClick;
        this.view.imgColumn4Right.onTouchEnd = this.flxColumn4onClick;
        this.view.imgColumn4Left.onTouchEnd = this.flxColumn4onClick;
        this.view.imgColumn5Right.onTouchEnd = this.flxColumn5onClick;
        this.view.imgColumn5Left.onTouchEnd = this.flxColumn5onClick;
        this.view.imgColumn6Right.onTouchEnd = this.flxColumn6onClick;
        this.view.imgColumn6Left.onTouchEnd = this.flxColumn6onClick;
        this.view.btnDummyLeftScroll.onClick = this.scrollFiltersLeft;
        this.view.btnDummyRightScroll.onClick = this.scrollFiltersRight;
        this.view.flxFiltersScroll.enableScrolling = false;
		this.view.flxAccountTypeRadio1.onClick =  this.toggleOpenOrders;
        this.view.flxAccountTypeRadio2.onClick = this.toggleHistory;
        this.view.paginationFooter.fetchPaginatedRecords=this.footerPage;
        this.view.imgSort1.onTouchEnd = this.onClickSort.bind(this, 0, this.view.imgSort1);
        this.view.imgS1.onTouchEnd = this.onClickSort.bind(this, 1, this.view.imgS1);
        this.view.imgS2.onTouchEnd = this.onClickSort.bind(this, 2, this.view.imgS2);
        this.view.imgS3.onTouchEnd = this.onClickSort.bind(this, 3, this.view.imgS3);
        this.view.imgS4.onTouchEnd = this.onClickSort.bind(this, 4, this.view.imgS4);
        this.view.imgS5.onTouchEnd = this.onClickSort.bind(this, 5, this.view.imgS5);
        this.view.imgS6.onTouchEnd = this.onClickSort.bind(this, 6, this.view.imgS6);
        this.view.imgS7.onTouchEnd = this.onClickSort.bind(this, 7, this.view.imgS7);
        this.view.imgS8.onTouchEnd = this.onClickSort.bind(this, 8, this.view.imgS8);
        this.view.imgS9.onTouchEnd = this.onClickSort.bind(this, 9, this.view.imgS9);
        this.view.imgS10.onTouchEnd = this.onClickSort.bind(this, 10, this.view.imgS10);
        this.view.imgS11.onTouchEnd = this.onClickSort.bind(this, 11, this.view.imgS11);
        this.view.imgS12.onTouchEnd = this.onClickSort.bind(this, 12, this.view.imgS12);
        this.view.imgS13.onTouchEnd = this.onClickSort.bind(this, 13, this.view.imgS13);
        this.view.imgS14.onTouchEnd = this.onClickSort.bind(this, 14, this.view.imgS14);
        this.view.imgS15.onTouchEnd = this.onClickSort.bind(this, 15, this.view.imgS15);
        this.view.imgS16.onTouchEnd = this.onClickSort.bind(this, 16, this.view.imgS16);
        this.view.imgS17.onTouchEnd = this.onClickSort.bind(this, 17, this.view.imgS17);
        this.view.imgS18.onTouchEnd = this.onClickSort.bind(this, 18, this.view.imgS18);
        this.view.imgStatusSort.onTouchEnd = this.onClickSort.bind(this, 19, this.view.imgStatusSort);
        this.view.postShow=this.postShow;   
		this.view.txtKeyword.onKeyUp=this.closeIndicator;
		this.view.txtKeyword.onDone=this.searchByKey;
        this.view.flxSearchimg.onTouchEnd=this.searchByKey;
        this.view.flxClose.onTouchEnd=this.manualClear;
        this.view.ImgDownRep.onTouchEnd=this.enableDropDownRep;
        this.setSegmentWidgetDataMap();
        this.setValues();
        this.view.flxSearch.onTouchEnd=this.portfolioSettings;
        this.view.flxDownload.onTouchEnd=this.portfolioDownload;
        //this.view.btnGetReport.onClick=this.setReport;
        this.view.flxDownload.onTouchEnd=this.setDateValue;
		this.view.flxPrint.onTouchEnd=this.portfolioPrint;
       this.view.flxCalImg.onClick = this.showCalenders;
        //this.view.flxImg.onClick = this.showCalenders;
        this.view.flxInside.onClick= this.showCalenders;
      this.view.btnSevenDays.onClick= this.setSevenDays;
      this.view.btnPeriodicDays.onClick = this.setOneMonth;
      this.view.btnThreeMonths.onClick = this.setThreeMonths;
      this.view.btnSixMonths.onClick = this.setSixMonths;
      this.view.btnLastYear.onClick = this.setLastYear;
      this.view.flxFromDateValue.onClick = this.onSelectFromDateValue;
      this.view.flxDateValue.onClick = this.onSelectToDateValue;
      this.view.lstbxTransactionType.onSelection = this.setAccountId;
	  this.view.segDot.onRowClick = this.onActionSelect;
      this.view.btnGetReport.onClick = this.downloadStatement.bind(this);
        this.view.datePicker.updateDates = function (dateObj){
          self.view.flxInside.skin="skne3e3e3br3pxradius";
          self.view.flxInsideCalendar.skin="skne3e3e3br3pxradius";
          self.sDate = dateObj.startDate;
          self.eDate = dateObj.endDate;
           self.startDate =dateObj.startDate;
           self.endDate = dateObj.endDate;
           var tab = self.tabMapping[self.selectedTab];
          if(tab == this.getFieldValue("{i.i18n.wealth.performance}")){
            if(dateObj.filterSelected)
              {
                switch(dateObj.dateKey){
                  case "1Y":
                    self.duration = "OneY";
                    break;
                  case "YTD":
                    self.duration = "YTD";
                    break;
                  case "sinceInception":
                    self.duration = "Inception";
                    break;
                  default:
                     self.duration = "Free";                   
                }
              }
            else{
            self.duration = "Free";
            }
          }
           self.serviceCallWithDateChangeParams();
          if(self.tabMapping[self.selectedTab] === this.getFieldValue("{i.i18n.wealth.reports}")){
            self.view.lblText.text = dateObj.dateText;
          }
          else{
            self.view.lblAutoDays.text = dateObj.dateText;
          }
          self.view.flxCalWhole.setVisibility(false);
          self.manualClear();
          self.dateText = dateObj.dateText;
          self.dateKey = dateObj.dateKey;
        };
      this.view.flxMenu0.onTouchEnd = this.onTriggerAction.bind(this);
      this.view.flxMenu1.onTouchEnd = this.onTriggerAction.bind(this);
      this.view.flxMenu2.onTouchEnd = this.onTriggerAction.bind(this);
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting the actions to columns.",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
     onTriggerAction:function(widgetInfo){
      var key = widgetInfo.id; var actionList =[]; var menuId = []; var action = ""; var pref =""; var operation ="";
      menuId = key.split("Menu");
        if(this.prefix == "Three"){
        if(this.selectedRadioOption !== ""){
          pref = this.prefix +this.selectedRadioOption;
        }
      }
      else{
        pref = this.prefix;
      }
      var menuAction =this.getFieldValue(eval("this._tab"+pref+"ContextMenuAction"));
      var menuLabel =this.getFieldValue(eval("this._tab"+pref+"ContextMenuLabel"));
      if(menuAction!==""){
        actionList = menuAction.split(",");
        labelList = menuLabel.split(",");
        for (var num in actionList) {
         if(num==menuId[1]){
         action = actionList[num];
         operation = labelList[num];
         }
       }
    }
	if(action == "Cancel"){
		this.view.flxContextualMenu.setVisibility(false);
		this.onCancelRequest(); 
  	}else{
        /*
        // this.completeIncludeOrderResponse is used to make use of complete response of include orders 
        irrespective of the pagesize 
        */
     	var response = this.tempData; 
     	var rowData = response[rowIndex];
        if(scope_WealthPresentationController.isOpenOrdersIncluded){
          response = {};
          response = this.completeIncludeOrderResponse;
        var newResp = response.filter(function (el) {
          return el.holdingsId === rowData.holdingsId && el.status === "";
        }
        );
          //rowData.quantity = newResp.length > 0 ?((newResp[0].holdingsId === rowData.holdingsId) ? newResp[0].quantity : "0"):"0";   
          rowData = {};
          rowData = newResp.length > 0 ? newResp[0]:this.tempData[rowIndex];
        }
        rowData.operation = operation ;
    	this.contextMenuNavigation(rowData,action);
  	}
},
    makeDaoCallOnOrderCancelRequest: function(){
       try{
         	scope = this;
		    var response = scope.tempData;
            var rowData = response[rowIndex];
            if (scope.canceledOrderId !== "") {
                scope.canceledOrderId = scope.canceledOrderId + "," + rowData.orderReference;
            } else {
                scope.canceledOrderId = rowData.orderReference;
            }
         scope.orderId = rowData.orderReference;
				this.context.orderId=scope.orderId;
                
              scope.assetType = rowData.assetType;
				this.context.assetType=scope.assetType;
         
        let objectName = scope.getFieldValue(scope._cancelReqObjName);
      let objectServiceName = scope.getFieldValue(scope._cancelReqObjService);
      let operationName = scope.getFieldValue(scope._cancelReqOperation);
      let criterion = scope.getFieldValue(scope._cancelReqCriteria);
      scope.setRequestParams();
      scope.setContext(scope.params);
      scope.setCriteria(criterion,'orderId');
      scope.setCriteria(criterion,'assetType');
      this.requestStart();
      this.portfolioListDAO.fetchDetails(objectServiceName,operationName,objectName,this.getCriteria(),"",this.onSuccessProcessingCancel,this.onSuccessProcessingCancel);
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in making service call.",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
} ,  
    onSuccessProcessingCancel:function(response,unicode){
      this.requestEnd();
       this.makeDaoCallBasedOnSelectedTab();  
       this.onCancelSuccess(response);
    },    
       //Settings
    portfolioSettings: function(){
      let result = [];
      for(var i in this.colDisplayNames)
    	result.push(this.colDisplayNames[i]);
      var data = {
        selectedColumnForSettings: this.selectedColumnforsettings,
        selectedDisplayNames: result
      };
		this.onSettingsVisibility(data);
    },
    //Search
    searchByKey: function(){
	  this.resetSortValues();
      this.resetPagination();
      this.searchText=this.view.txtKeyword.text;
      this.view.txtKeyword.setFocus(false);
      this.refreshSegment();
    },
    
    //ClearSearch
    closeIndicator: function(){
      this.view.flxInsideCalendar.skin = "skne3e3e3br3pxradius";
      if(this.view.txtKeyword.text){
        this.view.txtKeyword.skin="ICSknTbxSSP42424215px";
        this.view.flxBoxSearch.skin = this._sknSearchActiveTextbox;
        this.view.flxClose.setVisibility(true);
      }
      else{
        this.view.flxBoxSearch.skin = this._sknSearchTextbox;
          this.view.txtKeyword.skin="ICSknTbxPlaceholderSSP72727215px";
          this.view.flxClose.setVisibility(false);
      }
    },
	/**
     * Method to set selected & unselected row in portfolio segment when the view button is clicked
     */
    onsegPortfolioRowClick: function (rowIndex, instrumentAction) {
        this.view.flxContextualMenu.setVisibility(false);
      
        var params = holdingsData.portfolioHoldings[rowIndex];
        var data = {
            "searchByInstrumentName": params.description,
            "portfolioId": this.portfolioId,
            "sortBy": "",
            "navPage": "Holdings"  
        };
       
       var dataCustom = applicationManager.getNavigationManager().getCustomInfo('frmProductDetails');

       if(dataCustom === undefined){
         dataCustom={};
       }
       dataCustom.currentInstrumentName = params.description;
       applicationManager.getNavigationManager().setCustomInfo('frmProductDetails', dataCustom);
	   scope_WealthPresentationController.instrumentAction = instrumentAction;            
       applicationManager.getModulesPresentationController("WealthPortfolioUIModule").getHoldingsCurrentPosition(data);      
      
    },
    
    //ClearSearch
    manualClear: function(){
      this.view.txtKeyword.text="";
      this.searchText=this.view.txtKeyword.text;
      this.view.flxClose.setVisibility(false);
      this.view.txtKeyword.setFocus(false);
      this.view.lstbxTransactionType.setFocus(false);
      this.view.flxBoxSearch.skin = this._sknSearchTextbox;
      this.resetSortValues();
      this.resetPagination();
      this.refreshSegment();
    },

    //Pagination
    footerPage:function(offset,limit){
      this.offset = offset;
      this.noOfRecords=limit;
      this.refreshSegment();
    },

    //
    setOrderFilter: function(orderFilterOption){
      let dateLabel,dateKeys;
       let tabName = this.tabMapping[this.selectedTab];
      dateLabel=this.getFieldValue(eval("this._tab"+this.prefix+"DateFilterLabels"));
      dateKeys =this.getFieldValue(eval("this._tab"+this.prefix+"DateFilterKeys"));
      this.view.datePicker.setUpDateFilter(dateLabel,dateKeys,tabName);
      switch(orderFilterOption){
       case "SearchOnly":
          this.view.flxSearchContainerWrapper.setVisibility(true);
          this.view.flxKeyword.setVisibility(true);
          this.view.flxCalWhole.setVisibility(false);
          this.view.flxCalendar.setVisibility(false);
          this.view.flxList.setVisibility(false);
          this.view.flxKeyword.width="96%";

           if (this.width === 640 || this.orientationHandler.isMobile) {
             this.view.txtKeyword.width="84%";
           } else if (this.width === 1024 || this.width === 768 || this.orientationHandler.isTablet) {
             this.view.txtKeyword.width="90%";

           }else{
             this.view.txtKeyword.width="93%";
           }

          break;
        case "SearchAndCalendar":
          this.view.flxSearchContainerWrapper.setVisibility(true);
          this.view.flxKeyword.setVisibility(true);
          this.view.flxCalendar.setVisibility(true);
          this.view.flxList.setVisibility(false);
          this.view.flxKeyword.width="49%"
          this.view.flxCalendar.width="47%";
           if (this.width === 640 || this.orientationHandler.isMobile) {
            this.view.txtKeyword.width="70%";

           } else if (this.width === 1024 || this.width === 768 || this.orientationHandler.isTablet) {
             this.view.txtKeyword.width="80%";

           }else{
             this.view.txtKeyword.width="85%";
           }
          this.serviceCallWithDateChangeParams();
          break;
        default:
           this.view.flxSearchContainerWrapper.setVisibility(false);
          }
    },
    toggleOpenOrders: function(){
       
        this.view.txtKeyword.placeholder = this.getFieldValue(eval("this._tab" + this.prefix + "SearchPlaceholder"));
        this.view.imgAccountTypeRadio1.src = JSON.parse(this._iconRadioActive)["img"];
		this.view.imgAccountTypeRadio2.src = JSON.parse(this._iconRadioInactive)["img"];
        this.view.lblAccountTypeRadio1.skin="slLabel0d8a72616b3cc47";
	    this.view.lblAccountTypeRadio2.skin = "sknlbla0a0a015px";
		var previouslySelectedOption =  this.selectedRadioOption;
       this.view.lblByKeyword.setVisibility(true);
		if(previouslySelectedOption!=="A"){
           this.selectedRadioOption = "A";
           this.selectedRadioOptionText = this.view.lblAccountTypeRadio1.text;
           this.orderType = "Open";
           this.setOrderFilter("SearchOnly");
           this.setDefaultParams();
       	   this.setRequestParams();
		   this.setContext(this.params);
           this.makeDaoCallBasedOnSelectedTab();
		}
    },
    toggleHistory: function(){
        this.view.txtKeyword.placeholder = this.getFieldValue(eval("this._tab" + this.prefix + "SearchPlaceholder"));
        this.view.imgAccountTypeRadio1.src = JSON.parse(this._iconRadioInactive)["img"];
	    this.view.imgAccountTypeRadio2.src = JSON.parse(this._iconRadioActive)["img"];
        this.view.lblAccountTypeRadio2.skin="slLabel0d8a72616b3cc47";
	    this.view.lblAccountTypeRadio1.skin = "sknlbla0a0a015px";
		var previouslySelectedOption =  this.selectedRadioOption;
       this.view.lblByKeyword.setVisibility(true);
		if(previouslySelectedOption!=="B"){
           this.selectedRadioOption = "B";
           this.selectedRadioOptionText = this.view.lblAccountTypeRadio2.text;
           this.orderType = "History";
           this.setOrderFilter("SearchAndCalendar");
           this.setDefaultParams();
       	   this.setRequestParams();
		   this.setContext(this.params);
           this.makeDaoCallBasedOnSelectedTab();
		}
    },
    //portfolioDownload
    portfolioDownload: function(){
      //this.makeDaoCallForPrintDownload("Download");
      //this.view.Downloads.setVisibility(tsrue);
      
      this.onDownloadsVisibility(flag);
      
      
    },
    setSegmentWidgetDataMap : function (){
    var scope = this;
    try {
      this.view.SegListRep.widgetDataMap = {
        "lblUsers": "lblUsers",
        "flxAccountTypes":"flxAccountTypes"

      };
      
      
    }
    catch (err) {
      var errorObj = {
        "level": "frmTwo",
        "method": "setSegmentWidgetDataMap",
        "error": err
      };
      scope.onError(errorObj);
    }
  },
      /*setText: function(text){
    this.view.lblValue =text;

  },*/
       setValues : function(){
    var scope = this;
    var segFilter1Data = [{
      lblUsers: {
        "text":"PDF", 
        "onTouchEnd": function(){
          scope.view.ImgDownRep.src = "dropdown_expand.png";
          scope.view.flxReportSeg.setVisibility(false);
          scope.view.lblValueRep.text="PDF";
          
	  }
     /* "flxLabel": {
        "onClick": function(){
          scope.view.SegOne.setVisibility(false);
          scope.view.lblSelect.text="car";
        }
      }*/
      }},{
        lblUsers: {  
          "text":"EXCEL (xlsx)",
          "onTouchEnd": function(){
            scope.view.ImgDownRep.src = "dropdown_expand.png";
           scope.view.flxReportSeg.setVisibility(false);
            scope.view.lblValueRep.text="EXCEL";
                          }
  /*"flxLabel": {
        "onClick": function(){
          scope.view.SegOne.setVisibility(false);
          scope.view.lblSelect.text="bike";
        }
      }*/
}},{
  lblUsers: {
    text : "CSV",
   /* "flxLabel": {
        "onClick": function(){
          scope.view.SegOne.setVisibility(false);
          scope.view.lblSelect.text="auto";
        }
      }*/
  "onTouchEnd": function(){
          scope.view.ImgDownRep.src = "dropdown_expand.png";
          scope.view.flxReportSeg.setVisibility(false);
          scope.view.lblValueRep.text="CSV";
	  }

  }},
      ]

 
scope.view.SegListRep.setData(segFilter1Data);

},
   // IW-3759 --- Atharva Vadnere
    enableDropDownRep: function() {

      if(this.flagDropDown === 0 && this.view.flxReportSeg.isVisible === false)
      {
        this.view.ImgDownRep.src = "dropdown_collapse.png";
        this.view.flxReportSeg.setVisibility(true);
        this.flagDropDown = 1; 
        this.sendDropDownFlag(this.flagDropDown);
      }
      else{
        this.view.ImgDownRep.src = "dropdown_expand.png";
        this.view.flxReportSeg.setVisibility(false);
        this.flagDropDown = 0;
      }
    },

    closeDownloadDropDown: function(closeDropDown){
      this.flagDropDown = closeDropDown;
      if(this.flagDropDown === 2)
      {
        this.view.flxReportSeg.isVisible = true;
        this.view.ImgDownRep.src = "dropdown_collapse.png";
        this.flagDropDown = 1;
      }
      else if(this.flagDropDown === 0)
      {
        this.view.flxReportSeg.isVisible = false;
        this.view.ImgDownRep.src = "dropdown_expand.png";
        this.flagDropDown = 0;
      }
    },
    
    closePagination: function(){
      this.view.paginationFooter.closePaginationDropDown();
    },
	// IW-3759 ---
    
    serviceCallParams: function(SelectedFormat)
    {
    
      switch(SelectedFormat) {
        case "PDF":
          SelectedFormat = "pdf";
          break;
        case "EXCEL":
          SelectedFormat = "xlsx";
          break;
        case "CSV":
          SelectedFormat = "csv";
          break;
      }
      this.selectedDownloadFormat=SelectedFormat;
      this.makeDaoCallForPrintDownload("Download");
    },


    //portfolioPrint
    portfolioPrint: function(){
      this.makeDaoCallForPrintDownload("Print");
    },
    
    //Tab


    onTabClick: function(clickedButton){
      this.isIncludeOrder = "false";
      scope_WealthPresentationController.isOpenOrdersIncluded = false;
      scope_WealthPresentationController.isOpenOrdersIncludedflag = false;
       this.view.flxStatus.isVisible = false;
      this.view.imgToggle.src = this.imageDisable;
	  this.isRTL?this.view.imgSort1.left = "60px":this.view.imgSort1.right = "100px";
      this.view.imgStatusSort.left = this.isRTL ? "55px" : "67px";
      this.view.txtKeyword.text="";
      this.benchMarkIndex = "";
      this.searchText=this.view.txtKeyword.text;
      this.view.flxClose.setVisibility(false);
      this.view.flxCalWhole.setVisibility(false);
	  this.selectedRadioOption="A";
      try{
        let btnName = clickedButton.id;
        switch(btnName){
          case "btnAll":
            flag="holdings";
            this.view.lblByKeyword.setVisibility(false);
            this.view.flxSearchimg.setVisibility(true);
            this.view.flxKeyword.height = "60dp";
            this.view.flxBoxSearch.top = "10dp";
	    this.view.txtKeyword.left = "45dp";
            this.selectedTab = 1;
            if(kony.application.getCurrentBreakpoint() === 1024){
              this.view.flxKeyword.height = "60dp";
              this.view.flxLeftSearch.height = this.view.flxKeyword.height;
              this.view.flxBoxSearch.top = "10dp";
            }
            this.view.btnAll.setFocus(false);
            if(scope_WealthPresentationController.isAdvisory ||scope_WealthPresentationController.isJointAccount) {
                            this.view.segDot.setVisibility(true);
                        }
            break;
          case "btnFilter2":
            flag="transactions";
            this.view.lblByKeyword.setVisibility(true);
            this.view.flxSearchimg.setVisibility(true);
            this.view.flxKeyword.height = "90dp";
            this.view.txtKeyword.left = "45dp";
            this.view.flxBoxSearch.top = "10dp";
            this.selectedTab = 2;
            this.view.btnFilter2.setFocus(false);
            if(kony.application.getCurrentBreakpoint() === 1024){
              this.view.flxLeftSearch.height = this.view.flxKeyword.height;
            }
            if (scope_WealthPresentationController.isAdvisory || scope_WealthPresentationController.isJointAccount) {
                            this.view.segDot.setVisibility(true);
                        }
            break;
          case "btnFilter3":
            flag="orders";
            this.view.lblByKeyword.setVisibility(true);
            this.view.flxSearchimg.setVisibility(true);
            this.view.flxKeyword.height = "90dp";
            this.view.txtKeyword.left = "45dp";
            this.view.flxBoxSearch.top = "5dp";
            this.selectedTab = 3;
            this.view.btnFilter3.setFocus(false);
            if(kony.application.getCurrentBreakpoint() === 1024){
              this.view.flxLeftSearch.height = this.view.flxKeyword.height;
            }
            if(scope_WealthPresentationController.isAdvisory || scope_WealthPresentationController.isJointAccount)
                        {
                            this.view.segDot.setVisibility(false);
                        }
            break;
          case "btnFilter4":
            flag="accounts_activity";
            this.view.lblByKeyword.setVisibility(true);
            this.view.flxSearchimg.setVisibility(true);
            this.view.txtKeyword.left = "55dp";
            this.view.flxBoxSearch.top = "10dp";
            this.selectedTab = 4;
            if(kony.application.getCurrentBreakpoint() === 1024){
              this.view.flxLeftSearch.height = "170dp";
            }
            this.view.lstbxTransactionType.selectedKey = this.view.lstbxTransactionType.masterData[0][0];
            this.accountId = this.view.lstbxTransactionType.masterData[0][0];
            this.view.btnFilter4.setFocus(false);
            if (scope_WealthPresentationController.isAdvisory || scope_WealthPresentationController.isJointAccount) {
                            this.view.segDot.setVisibility(true);
                        }
            break;
          case "btnFilter5":
            flag="performance";
            this.view.lblByKeyword.setVisibility(true);
            this.view.flxSearchimg.setVisibility(true);
            this.view.flxCalendar.height = "90dp";
            this.view.lblByKeyword.top = "5dp";
            this.view.flxBoxSearch.top = "45dp";
            this.selectedTab = 5;
            this.view.btnFilter5.setFocus(false);
            if (scope_WealthPresentationController.isAdvisory || scope_WealthPresentationController.isJointAccount) {
                            this.view.segDot.setVisibility(true);
                        }
            break;
          case "btnFilter6":
            this.view.lblByKeyword.setVisibility(true);
            this.view.flxSearchimg.setVisibility(true);
            this.view.txtKeyword.left = "45dp";
            this.view.flxBoxSearch.top = "5dp";
            this.selectedTab = 6;
            this.view.btnFilter6.setFocus(false);
            if (scope_WealthPresentationController.isAdvisory || scope_WealthPresentationController.isJointAccount) {
                            this.view.segDot.setVisibility(true);
                        }
            break;
          default:
            this.view.lblByKeyword.setVisibility(false);
            this.view.flxSearchimg.setVisibility(true);
            this.view.flxBoxSearch.top = "45dp";
	    this.view.txtKeyword.left = "45dp";
            this.selectedTab = 1;
            this.view.btnAll.setFocus(false);
            break;
        }
        this.setUpTabPrefix();
        this.setSelectedTabUI();
        this.setUpUIOptions();
        this.setDefaultParams();
        this.setRequestParams();
       this.setContext(this.params);
       this.makeDaoCallBasedOnSelectedTab();  

      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting selected Tab.",
              "errorLevel" : "Business",
              "error": err
            };
        this.onError(errorObj);
      }
      	this.view.flxSegmentContainer1.setVisibility(true);
      this.view.flxNoTransactions.setVisibility(false);
    },
	//Assigning Context menu value
    setContextualMenuData :function(tabSelected, fromAction){

      var menuI18nKeys = {
        "View": "i18n.wealth.view",
        "Buy": "i18n.wealth.buy",
        "Sell": "i18n.wealth.sell",
        "Cancel": "i18n.wealth.cancel",
        "Modify": "i18n.wealth.modify",
      }

            this.view.flxContextualMenu.setVisibility(false);
            this.view.flxMenu0.setVisibility(false);
            this.view.flxMenu1.setVisibility(false);
            this.view.flxMenu2.setVisibility(false);
            if (eval("this._tab" + tabSelected + "ContextualMenuRequired")) {
                var lblList = [];
                var permissionValues = this.getFieldValue(eval("this._tab" + tabSelected + "ContextMenuPermission"), "entitlement_keys");
                var permission;
                var contextLabel = eval("this._tab" + tabSelected + "ContextMenuLabel");
                if (contextLabel != "" && permissionValues != undefined) {
                    lblList = contextLabel.split(",");
                    for (var num in lblList) {
                        var entitlement = [];
                        if (num == 0) {
                            entitlement.push(permissionValues[0]);
                            permission = this.EntitlementUtils.isEntitled(entitlement);
                            this.view.lblOne.text = kony.i18n.getLocalizedString(menuI18nKeys[lblList[num]]);;
                            this.view.lblOne.toolTip = lblList[num];
                            this.view.flxMenu0.setVisibility(permission);
                            if (fromAction && (this.view.lblOne.text == kony.i18n.getLocalizedString("i18n.wealth.buy") || this.view.lblOne.text == kony.i18n.getLocalizedString("i18n.wealth.sell"))) {
                                if (this.portfolioArray[rowIndex].isSecurityAsset == undefined || this.portfolioArray[rowIndex].isSecurityAsset == "" || this.portfolioArray[rowIndex].isSecurityAsset == null || this.portfolioArray[rowIndex].isSecurityAsset == false || this.portfolioArray[rowIndex].application!=="SC") {
                                    this.view.flxMenu0.setVisibility(false);
                                }
                            }
                            if (fromAction && (this.view.lblOne.text == kony.i18n.getLocalizedString("i18n.wealth.modify") || this.view.lblOne.text == kony.i18n.getLocalizedString("i18n.wealth.cancel"))) {
                                if (this.portfolioArray[rowIndex].swipeActionEnable != undefined && this.portfolioArray[rowIndex].swipeActionEnable == "false") {
                                    this.view.flxMenu0.setVisibility(false);
                                }
                            }
                        }
                        if (num == 1) {
                            entitlement.push(permissionValues[1]);
                            permission = this.EntitlementUtils.isEntitled(entitlement);
                            this.view.lblTwo.text = kony.i18n.getLocalizedString(menuI18nKeys[lblList[num]]);;
                            this.view.lblTwo.toolTip = lblList[num];
                            if (scope_WealthPresentationController.isAdvisory || scope_WealthPresentationController.isJointAccount) {
                                this.view.flxMenu1.setVisibility(false);
                            } else {
                                this.view.flxMenu1.setVisibility(permission);
                            }
                            if (fromAction && (this.view.lblTwo.text == kony.i18n.getLocalizedString("i18n.wealth.buy") || this.view.lblTwo.text == kony.i18n.getLocalizedString("i18n.wealth.sell"))) {
                                if (this.portfolioArray[rowIndex].isSecurityAsset == undefined || this.portfolioArray[rowIndex].isSecurityAsset == "" || this.portfolioArray[rowIndex].isSecurityAsset == null || this.portfolioArray[rowIndex].isSecurityAsset == false || this.portfolioArray[rowIndex].application!=="SC") {
                                    this.view.flxMenu1.setVisibility(false);
                                }
                            }
                            if (fromAction && (this.view.lblTwo.text == kony.i18n.getLocalizedString("i18n.wealth.modify") || this.view.lblTwo.text == kony.i18n.getLocalizedString("i18n.wealth.cancel"))) {
                                if (this.portfolioArray[rowIndex].swipeActionEnable != undefined && this.portfolioArray[rowIndex].swipeActionEnable == "false") {
                                    this.view.flxMenu1.setVisibility(false);
                                }
                            }
                        }
                        if (num == 2) {
                            entitlement.push(permissionValues[2]);
                            permission = this.EntitlementUtils.isEntitled(entitlement);
                            this.view.lblThree.text = kony.i18n.getLocalizedString(menuI18nKeys[lblList[num]]);
                            this.view.lblThree.toolTip = lblList[num];
                            if (scope_WealthPresentationController.isAdvisory || scope_WealthPresentationController.isJointAccount) {
                                this.view.flxMenu2.setVisibility(false);
                            } else {
                                this.view.flxMenu2.setVisibility(permission);
                            }
                            if (fromAction && (this.view.lblThree.text == kony.i18n.getLocalizedString("i18n.wealth.buy") || this.view.lblThree.text == kony.i18n.getLocalizedString("i18n.wealth.sell"))) {
                                if (this.portfolioArray[rowIndex].isSecurityAsset == undefined || this.portfolioArray[rowIndex].isSecurityAsset == "" || this.portfolioArray[rowIndex].isSecurityAsset == null || this.portfolioArray[rowIndex].isSecurityAsset == false || this.portfolioArray[rowIndex].application!=="SC") {
                                    this.view.flxMenu2.setVisibility(false);
                                }
                            }
                            if (fromAction && (this.view.lblThree.text == kony.i18n.getLocalizedString("i18n.wealth.modify") || this.view.lblThree.text == kony.i18n.getLocalizedString("i18n.wealth.cancel"))) {
                                if (this.portfolioArray[rowIndex].swipeActionEnable != undefined && this.portfolioArray[rowIndex].swipeActionEnable == "false") {
                                    this.view.flxMenu2.setVisibility(false);
                                }
                            }
                        }
                    }
                }
            }
        },
    // List box Selected AccountId
     setAccountId :function(context){
       this.accountId  = context.selectedKey;
       //this.refreshSegment();
	   this.manualClear();
    },
    setUpTabPrefix: function(){
     	let tabId = this.selectedTab;
     	 this.prefix = this.numberMapping[tabId];
 	 },

    setPortfolioId:function(portfolioId,userId,isEuro,currencyId){
      this.portfolioId=portfolioId;
      this.userId=userId;
      this.isEuro=isEuro;
      this.currencyId=currencyId;
      scope_WealthPresentationController.isOpenOrdersIncluded = false;
      scope_WealthPresentationController.isOpenOrdersIncludedflag = false;
      if(this.isEuro){
        this.FormatUtils.setEuropeFormat();
      }
      this.preShow();
    },

    readPropertiesDetails: function(){
      if(this.prefix =="Three"){
        if(this.selectedRadioOption !== ""){
          this.fieldObjects = JSON.parse(eval("this._tab"+this.prefix+this.selectedRadioOption+"Fields"));
        }
      }
      else{
        this.fieldObjects = JSON.parse(eval("this._tab"+this.prefix+"Fields"));
      }
    },
    setUpRadioOptionDetails: function(){
        this.view.lblAccountTypeRadio1.text = this.getFieldValue(this._searchLabel3);
        this.view.lblAccountTypeRadio2.text = this.getFieldValue(this._searchLabel4);
        this.view.txtKeyword.placeholder = this.getFieldValue(eval("this._tab" + this.prefix + "SearchPlaceholder"));
        if(this.selectedRadioOption !== "B"){
        this.view.imgAccountTypeRadio1.src = JSON.parse(this._iconRadioActive)["img"];
	    this.view.imgAccountTypeRadio2.src = JSON.parse(this._iconRadioInactive)["img"];
        this.view.lblAccountTypeRadio1.skin = "slLabel0d8a72616b3cc47";
		this.view.lblAccountTypeRadio2.skin = "sknlbla0a0a015px";
        this.selectedRadioOption = "A";
        this.selectedRadioOptionText = this.view.lblAccountTypeRadio1.text;
        this.setOrderFilter("SearchOnly");
       }
      else{      
        this.view.imgAccountTypeRadio2.src = JSON.parse(this._iconRadioActive)["img"];
        this.view.imgAccountTypeRadio1.src = JSON.parse(this._iconRadioInactive)["img"];
        this.view.lblAccountTypeRadio2.skin = "slLabel0d8a72616b3cc47";
		this.view.lblAccountTypeRadio1.skin = "sknlbla0a0a015px";
        this.selectedRadioOption = "B";
        this.selectedRadioOptionText = this.view.lblAccountTypeRadio2.text;
        this.setOrderFilter("SearchAndCalendar");
      }
    },
    setUpUIOptions: function(){
    try{
      let option = this.getFieldValue(eval("this._tab"+this.prefix+"Options"));
      let filterOption = this.getFieldValue(eval("this._tab"+this.prefix+"FilterOptions"));
      let radioOption = this.getFieldValue(eval("this._tab"+this.prefix+"RadioOptions"));
       let dateLabel,dateKeys;
      let tabName = this.tabMapping[this.selectedTab];
      dateLabel=this.getFieldValue(eval("this._tab"+this.prefix+"DateFilterLabels"));
      dateKeys =this.getFieldValue(eval("this._tab"+this.prefix+"DateFilterKeys")); 
      this.view.txtKeyword.placeholder= this.getFieldValue(eval("this._tab"+this.prefix+"SearchPlaceholder"));
      if((dateLabel != "") && (dateKeys != "")){
      this.dateLabelArr = dateLabel.split(",");
      this.dateKeyArr = dateKeys.split(",");
      }
      switch(option){
        case "AllTheOptions":
          this.view.flxSearch.setVisibility(true);
          this.view.flxActionsContainer.setVisibility(true);
          this.view.flxPrint.setVisibility(true); 
          this.view.flxDownload.setVisibility(true);
          break;
        case "PrintAndDownload":
          this.view.flxSearch.setVisibility(false);
          this.view.flxActionsContainer.setVisibility(true);
          this.view.flxPrint.setVisibility(true); 
          this.view.flxDownload.setVisibility(true);
          break;  
        case "None":
          this.view.flxActionsContainer.setVisibility(false);
          break;  
        default:
          this.view.flxSearch.setVisibility(true);
          this.view.flxActionsContainer.setVisibility(true);
          this.view.flxPrint.setVisibility(true); 
          this.view.flxDownload.setVisibility(true);
          break;
      }
      this.view.flxAccountType.setVisibility(radioOption);
      if (radioOption == true) {
        this.view.flxReport.setVisibility(false);
        this.view.flxSegmentContainer.setVisibility(true);
        this.setUpRadioOptionDetails();  
        if(this.isEntitledForOpenOrder && !this.isEntitledForHistoryOrder){
		  this.view.flxAccountTypeRadio2.setVisibility(false);
		  this.view.imgAccountTypeRadio1.setVisibility(false);
		}
		else if(!this.isEntitledForOpenOrder && this.isEntitledForHistoryOrder){
		  this.toggleHistory();
		  this.view.flxAccountTypeRadio1.setVisibility(false);
		  this.view.imgAccountTypeRadio2.setVisibility(false);
		}
        return;
      } else {
        this.selectedRadioOption = "";
        this.selectedRadioOptionText = "";
      }
      switch(filterOption){
        case "SearchOnly":
          this.view.flxSearchContainerWrapper.setVisibility(true);
          this.view.flxKeyword.setVisibility(true);
          this.view.flxCalendar.setVisibility(false);
          this.view.flxList.setVisibility(false);
          this.view.flxReport.setVisibility(false);
		  this.view.flxSegmentContainer.setVisibility(true);
          break;
        case "CalendarOnly":
          this.view.flxSearchContainerWrapper.setVisibility(true);
          this.view.flxKeyword.setVisibility(false);
          this.view.flxCalendar.setVisibility(true);
          this.view.flxList.setVisibility(false);
          this.view.datePicker.setUpDateFilter(dateLabel,dateKeys,tabName);
          this.view.flxReport.setVisibility(false);
		 this.view.flxSegmentContainer.setVisibility(true);
          break;
        case "SearchAndCalendar":
          this.view.flxSearchContainerWrapper.setVisibility(true);
          this.view.flxKeyword.setVisibility(true);
          this.view.flxCalendar.setVisibility(true);
          this.view.flxList.setVisibility(false);
          this.view.datePicker.setUpDateFilter(dateLabel,dateKeys,tabName);
          this.view.flxReport.setVisibility(false);
		 this.view.flxSegmentContainer.setVisibility(true);
          break;
        case "SearchAndListSelectionAndCalendar":
          this.view.flxSearchContainerWrapper.setVisibility(true);
          this.view.flxKeyword.setVisibility(true);
          this.view.flxCalendar.setVisibility(true);
          this.view.flxList.setVisibility(true);
          this.view.datePicker.setUpDateFilter(dateLabel,dateKeys,tabName);
          this.view.flxReport.setVisibility(false);
		 this.view.flxSegmentContainer.setVisibility(true);
          break;
        case "None":
           this.view.flxSearchContainerWrapper.setVisibility(false);
          this.view.datePicker.setUpDateFilter(dateLabel,dateKeys,tabName);
          break;
        default:
          this.view.flxSearchContainerWrapper.setVisibility(true);
          this.view.flxKeyword.setVisibility(true);
          this.view.flxCalendar.setVisibility(false);
          this.view.flxList.setVisibility(false);
          this.view.flxReport.setVisibility(false);
          break;
      }
      this.setFilterUI();
     }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting UI options.",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    checkMissingColumnDataForHoldings: function(){    
      let strFields = this.completeResponse.fieldstoDisplay;
      var toBeShown = strFields.split(", ");
      toBeShown = toBeShown.filter(e => e !== 'holdingsType'); 
      toBeShown = toBeShown.filter(e => e !== 'RICCode'); 
      toBeShown = toBeShown.filter(e => e !== 'holdingsId'); 
      toBeShown = toBeShown.filter(e => e !== 'ISIN');  
      var result = {};
      for (var i = 1; i <= Object.keys(this.fieldObjects).length; i++) {
        if ((toBeShown.indexOf(this.fieldObjects[this.numberMapping[i]].value))!== -1) {   
          let temp;
          if(Object.keys(result).length===0)
          {
            temp = this.fieldObjects[this.numberMapping[i]];
            result[this.numberMapping[i]] = temp; 
          }
          else if(Object.keys(result).length>0)
          {
             temp = this.fieldObjects[this.numberMapping[i]];
            result[this.numberMapping[Object.keys(result).length+1]] = temp; 
          }      
        }  
      }
      this.fieldObjects = result;
    },
    responseMappingFn: function(){
      
      var tabName = this.getFieldValue(eval("this._tab"+this.prefix+"Name"));
      if((this.selectedColumnforsettings)&&(tabName == this.getFieldValue("{i.i18n.wealth.holdings}")))
        {
          this.RealignSegment(this.selectedColumnforsettings);
          this.setContextualMenuData(this.prefix, false);
        }
      else{
      if(tabName == this.getFieldValue("{i.i18n.wealth.holdings}")){
      this.makeDaocallForFetchingSettingsOrder();
      }
        this.readPropertiesDetails();
        if(tabName == this.getFieldValue("{i.i18n.wealth.holdings}")){
			this.checkMissingColumnDataForHoldings();
        }
         var a= this.fieldObjects;
	  var objectLength = Object.keys(a).length; 
 
		var data=this.portfolioArray; //incoming
		var selectedColumn=[];
		var displayNames={}; 
		var columnValues={};
						var types={};
			var currencies={};
      var pref;
      if(this.prefix == "Three"){
        if(this.selectedRadioOption !== ""){
          pref = this.prefix +this.selectedRadioOption;
        }
      }
      else{
        pref = this.prefix;
      }
if(eval("this._tab"+pref+"DockFirstColumn")) //context
{ 
  					this.view.flxDots.setVisibility(true);
					this.view.flxRemaining2.width="75%";
   this.view.flxInstrument.setVisibility(true);
  this.firstColumnName=a["One"].value;
  var firstDisplayName=this.getFieldValue(a["One"].displayName);
  this.setInstrument(data,firstDisplayName,this.firstColumnName);
  for(var i=1;i<objectLength;i++){
var temp=this.numberMapping[String(i+1)];
displayNames[String(i)]=this.getFieldValue(a[temp].displayName);
columnValues[String(i)]=a[temp].value;
                types[String(i)] = a[temp].type;
                    if ((a[temp].currency !== undefined) || (a[temp].currency !== "")) {
                        currencies[String(i)] = a[temp].currency;
                    } else {
                        currencies[String(i)] = "";
                    }
selectedColumn.push(String(i));
  }
}
else {
                this.view.flxDots.setVisibility(false);
                this.view.flxRemaining2.width = "100%";
                this.view.flxInstrument.setVisibility(false);
                for (var i = 0; i < objectLength; i++) {
                    var temp = this.numberMapping[String(i + 1)];
                    displayNames[String(i)] = this.getFieldValue(a[temp].displayName);
                    columnValues[String(i)] = a[temp].value;
                    types[String(i)] = a[temp].type;
                    if ((a[temp].currency !== undefined) || (a[temp].currency !== "")) {
                        currencies[String(i)] = a[temp].currency;
                    } else {
                        currencies[String(i)] = "";
                    }
                    selectedColumn.push(String(i));
                }
				this.setInstrument(data, displayNames[0], columnValues[0]);
            }
        var lblList = [];
           var permissionValues=this.getFieldValue(eval("this._tab" + pref + "ContextMenuPermission"), "entitlement_keys");
           var permission;
                var contextLabel = eval("this._tab" + pref + "ContextMenuLabel");
          var flag;
                
                if(contextLabel!=""&&permissionValues!=undefined){
                  lblList = contextLabel.split(",");
                  var entitlement=[];
                  for (var num in lblList) {
                    entitlement.push(permissionValues[Number(num)]);
                    flag=this.EntitlementUtils.isEntitled(entitlement);
                    if(flag){
                      break;
                    }
                             }}
                       
   if((eval("this._tab"+pref+"ContextualMenuRequired"))&&(flag)){
         if (!eval("this._tab" + pref + "DockFirstColumn")) {
                    this.view.flxRemaining2.width = "95%";
					this.view.flxHeader.left="5dp";
                }
          this.view.flxDots.setVisibility(true);
        }else{
           if (eval("this._tab" + pref + "DockFirstColumn")) {
                    this.view.flxRemaining2.width = "80%";
                }
          this.view.flxDots.setVisibility(false);
        }  
      this.setContextualMenuData(pref, false);
      if(tabName == this.getFieldValue("{i.i18n.wealth.holdings}")){
      this.colDisplayNames = displayNames;
      }
      this.setSegmentData(data,selectedColumn,displayNames,columnValues,types,currencies);
      } 
    },
       RealignSegment: function(selectedColumn){
               var data=this.portfolioArray; //incoming
      this.selectedColumnforsettings=selectedColumn;
      var displayNames={}; 
      var columnValues={};
			var types={};
			var currencies={};
               this.readPropertiesDetails();
         this.checkMissingColumnDataForHoldings();
      var a= this.fieldObjects; //context
      var objectLength = Object.keys(a).length; 
           this.firstColumnName=a["One"].value;
  var firstDisplayName=this.getFieldValue(a["One"].displayName);
    var pref=this.prefix;
         if(eval("this._tab"+pref+"DockFirstColumn")) //context
{
                      this.view.flxDots.setVisibility(true);
  if(!scope_WealthPresentationController.isOpenOrdersIncluded){
    this.view.flxStatus.isVisible = false;
  }
                    this.view.flxRemaining2.width="75%";
   this.view.flxInstrument.setVisibility(true);
  this.setInstrument(data,firstDisplayName,this.firstColumnName);
}
            var lblList = [];
           var permissionValues=this.getFieldValue(eval("this._tab" + pref + "ContextMenuPermission"), "entitlement_keys");
           var permission;
                var contextLabel = eval("this._tab" + pref + "ContextMenuLabel");
          var flag;
                
                if(contextLabel!=""&&permissionValues!=undefined){
                  lblList = contextLabel.split(",");
                  var entitlement=[];
                  for (var num in lblList) {
                    entitlement.push(permissionValues[Number(num)]);
                    flag=this.EntitlementUtils.isEntitled(entitlement);
                    if(flag){
                      break;
                    }
                             }}
     
            if((eval("this._tab"+pref+"ContextualMenuRequired"))&&(flag)){
         if (!eval("this._tab" + pref + "DockFirstColumn")) {
                    this.view.flxRemaining2.width = "95%";
                    this.view.flxHeader.left="5dp";
                }
          this.view.flxDots.setVisibility(true);
        }else{
            if (eval("this._tab" + pref + "DockFirstColumn")) {
                    this.view.flxRemaining2.width = "80%";
                }
          this.view.flxDots.setVisibility(false);
        
        }
         for(var i=0;i<objectLength;i++){
        var temp=this.numberMapping[String(i+1)];
        displayNames[String(i)]=this.getFieldValue(a[temp].displayName);
        columnValues[String(i)]=a[temp].value;
        if(selectedColumn[i]){
        selectedColumn[i]=String(Number(selectedColumn[i])+1);
        }
				  types[String(i)] = a[temp].type;
                    if ((a[temp].currency !== undefined) || (a[temp].currency !== "")) {
                        currencies[String(i)] = a[temp].currency;
                    } else {
                        currencies[String(i)] = "";
                    }
      }

       this.setVisibility(selectedColumn,displayNames, types);
      this.setSegmentData(data,selectedColumn,displayNames,columnValues, types, currencies);
       for(var i=0;i<objectLength;i++){
        if(selectedColumn[i]){
        selectedColumn[i]=String(Number(selectedColumn[i])-1);
        }
      }
      this.view.forceLayout();
	  var currForm = kony.application.getCurrentForm();
      currForm.forceLayout();
      this.params.fieldOrder=selectedColumn.toString();  
         this.fieldOrder=selectedColumn.toString();
      this.makeDaocallForUpdatingSettingsOrder();
         var configManager = applicationManager.getConfigurationManager();
         if(scope_WealthPresentationController.isOpenOrdersIncluded){
          this.view.flxRemaining2.width = (kony.application.getCurrentBreakpoint() === 1024 || this.orientationHandler.isTablet)? "62%":"66%";
        }
       	/*if (configManager.isMicroAppPresent("WealthOrderMA") && scope_WealthPresentationController.isAdvisory) {
                    this.view.segDot.setVisibility(false);
                } else {
                    this.view.segDot.setVisibility(true);
                } */
    }, 
         onClickSort: function(option, widget) {
            var data;
            if (option === 0) {
                data = this.firstColumnName;
            } else {
              //  var key = this.tempSelectedColumn[option];
               // data = this.tempColumnSelect[key - 1];
			    var pref;
      if(this.prefix == "Three"){
        if(this.selectedRadioOption !== ""){
          pref = this.prefix +this.selectedRadioOption;
        }
      }
      else{
        pref = this.prefix;
      }
			  if(eval("this._tab"+pref+"DockFirstColumn"))
			  {

				   data = this.tempColumnSelect[option];
			  }
			  else{
				  
				  data = this.tempColumnSelect[option-1];
			  }
			  				  if(this.getFieldValue(eval("this._tab"+this.prefix+"Name"))==this.getFieldValue("{i.i18n.wealth.holdings}")){		  
				var key = this.tempSelectedColumn[option-1];
               data = this.tempColumnSelect[Number(key) + 1];
							  }
            }
            this.sortData = option === 19 ? "status" :  data;
            this.setImage(option, widget,false, "ASC");
            this.sortBy = this.sortData;
            this.sorting = this.sortType;
            this.refreshSegment();
        },
        setImage: function(option, widget,flag,type) {

            if (option === 0 || option === 19) {
              if(option === 19){
					this.view.imgSort1.src = this.sortNone;
				}else if (option === 0){
					this.view.imgStatusSort.src = this.sortNone;
				}
                if (widget.src === this.sortNone||(flag===true)) {
                  if(type=="DESC")
                    {
                    widget.src = this.sortDesc;
                    this.sortType = "DESC";
                    }
                  else{
                    widget.src = this.sortAsc;
                    this.sortType = "ASC";
                  }
                } else if (widget.src === this.sortAsc) {
                    widget.src = this.sortDesc;
                    this.sortType = "DESC";
                } else {
                    widget.src = this.sortAsc;
                    this.sortType = "ASC";
                }
                var remaining = this.view.flxHeader.widgets();
                for (i = 0; i < remaining.length; i++) {
                    var imgwidget = remaining[i].widgets();
                    var img = imgwidget[1];
                    img.src = this.sortNone;
                }
            }
          else {
					
              option=option-1;
                this.view.imgSort1.src = this.sortNone;
               this.view.imgStatusSort.src = this.sortNone;
                var remaining = this.view.flxHeader.widgets();
                for (i = 0; i < remaining.length; i++) {
                    var imgwidget = remaining[i].widgets();
                    var img = imgwidget[1];
                    if (i === option) {
                        if (img.src === this.sortNone || (flag===true)) {
                          if(type=="DESC"){
                                 img.src = this.sortDesc;
                            this.sortType = "DESC";
                          }
                          else{
                            img.src = this.sortAsc;
                            this.sortType = "ASC";
                          }
                        } else if (img.src === this.sortAsc) {
                            img.src = this.sortDesc;
                            this.sortType = "DESC";
                        } else {
                            img.src = this.sortAsc;
                            this.sortType = "ASC";
                        }
                    } else {
                        img.src = this.sortNone;
                    }
                }
            }
        }, //
        onBreakPointChangeComponent: function(form, formWidth,portfolioId,userId,isEuro,currencyId) {
      var scope = this;
      this.width=formWidth;
      this.setSegmentData(this.tempData,this.tempSelectedColumn,this.tempDisplayNames,this.tempColumnSelect,this.typesofColumn, this.currenciesOfColumn);
       this.setFilterUI(); 
           this.portfolioId=portfolioId;
      this.userId=userId;
      this.isEuro=isEuro;
           this.currencyId=currencyId;
      if(this.isEuro){
        this.FormatUtils.setEuropeFormat();
      }
     
          this.preShow();
      //  this.view.segRemaining.
    },
	onActionSelect: function(){
     if(this.isContextualMenuOpen === 1){
      var tabName = this.getFieldValue(eval("this._tab"+this.prefix+"Name"));
      rowIndex = this.view.segDot.selectedRowIndex[1];
       var storeData1={
          image:"activewealth.png"
        };
	  this.view.flxContextualMenu.top ="80dp";
      var menuTop =this.view.flxContextualMenu.top;
      var topValue = menuTop.substring(0,menuTop.length-2);
      this.view.flxContextualMenu.top = parseInt(topValue) + rowIndex*50+"dp";
	  var visibility = this.view.flxContextualMenu.isVisible? false : true;
       this.view.segDot.setData(JSON.parse(JSON.stringify(this.oldAction)));
      if(visibility)
        this.view.segDot.setDataAt(storeData1, rowIndex);  
            var pref;
      if(this.prefix == "Three"){
        if(this.selectedRadioOption !== ""){
          pref = this.prefix +this.selectedRadioOption;
        }
      }
      else{
        pref = this.prefix;
      }
      this.setContextualMenuData(pref, true);
      if((tabName === this.getFieldValue("{i.i18n.wealth.orders}") || tabName === this.getFieldValue("{i.i18n.wealth.holdings}")) && (scope_WealthPresentationController.rtlLocale.includes(kony.i18n.getCurrentLocale()))){
                this.view.flxContextualMenu.left = "-19%";
              }else if(scope_WealthPresentationController.rtlLocale.includes(kony.i18n.getCurrentLocale())){
                this.view.flxContextualMenu.left = "";
              }
      this.view.flxContextualMenu.setVisibility(visibility);
       this.isContextualMenuOpen = 0; 
     }else{
        this.isContextualMenuOpen = 1;
        this.view.flxContextualMenu.setVisibility(false);
     }
      //this.view.flxMenu0.onTouchEnd = this.onsegPortfolioRowClick.bind(this, rowIndex,'View');
     // this.view.flxMenu1.onTouchEnd = this.onsegPortfolioRowClick.bind(this, rowIndex,'Buy');
     // this.view.flxMenu2.onTouchEnd = this.onsegPortfolioRowClick.bind(this, rowIndex,'Sell');
    },
    hideContextualMenu:function(){
     //  this.view.segDot.setData(JSON.parse(JSON.stringify(this.oldAction)));
       this.view.flxContextualMenu.setVisibility(false);
	},
    contextualMenuVisibility:function(){
     return this.view.flxContextualMenu.isVisible;
    },
    setFilterUI:function(){
      let filterOption = this.getFieldValue(eval("this._tab"+this.prefix+"FilterOptions"));
	  
	  if (this.width === 1024 || this.width === 768 || this.orientationHandler.isTablet) {
		this.view.flxLeftSearch.layoutType = kony.flex.FLOW_HORIZONTAL;
		this.view.flxKeyword.width="96%";
		this.view.flxList.width="25%";
		this.view.flxList.left="20dp";
		this.view.txtKeyword.width="90%";
		this.view.flxCalendar.top="0dp";
		this.view.flxCalWhole.width="70%";
		this.view.flxCalendar.width="25%";
		this.view.flxCalWhole.top="150dp";
    this.view.flxCalendar.left="1%";
	  }
     
       switch(filterOption){
         case "SearchOnly":
           this.view.flxKeyword.width="96%";

           if (this.width === 640 || this.orientationHandler.isMobile) {
             this.view.txtKeyword.width="84%";
           } else if (this.width === 1024 || this.width === 768 || this.orientationHandler.isTablet) {
             this.view.txtKeyword.width="90%";

           }else{
             this.view.txtKeyword.width="93%";
           }

          break;
        case "CalendarOnly":
         
          this.view.flxCalendar.width="50%";
         break;
        case "SearchAndCalendar":
          this.view.flxKeyword.width="49%"
          this.view.flxCalendar.width="47%";
           if (this.width === 640 || this.orientationHandler.isMobile) {
            this.view.txtKeyword.width="70%";

           } else if (this.width === 1024 || this.width === 768 || this.orientationHandler.isTablet) {
             this.view.txtKeyword.width="85%";

           }else{
             this.view.txtKeyword.width="85%";
           }
          break;
        case "SearchAndListSelectionAndCalendar":
          this.view.flxKeyword.width="45%";
          this.view.flxCalendar.width="24%";
          this.view.flxList.width="24%";
            if (this.width === 640 || this.orientationHandler.isMobile) {
            this.view.txtKeyword.width="70%";

           } else if (this.width === 1024 || this.width === 768 || this.orientationHandler.isTablet) {
             this.view.flxLeftSearch.layoutType = kony.flex.FREE_FORM;
			 this.view.flxKeyword.width="47%";
			 this.view.flxList.width="44%";
			 this.view.flxList.left="54%";
			 this.view.txtKeyword.width="80%";
			 this.view.flxCalendar.top="90dp";
			 this.view.flxCalendar.width="47%";
			 this.view.flxCalWhole.width="95%";
			 this.view.flxCalWhole.left="3%";
			 this.view.flxCalWhole.top="250px";
			 
			 //this.view.lstbxTransactionType.width="44%"
			 
           }else{
             this.view.txtKeyword.width="85%";
           }
          
          break;
        
        default:
          this.view.flxKeyword.width="96%";

           if (this.width === 640 || this.orientationHandler.isMobile) {
             this.view.txtKeyword.width="84%";
           } else if (this.width === 1024 || this.width === 768 || this.orientationHandler.isTablet) {
             this.view.txtKeyword.width="90%";

           }else{
             this.view.txtKeyword.width="93%";
           }

      }
     
    
    },
        setSegmentData:function(data,selectedColumn,displayNames,columnSelect, colTypes, curr){


      this.tempData=data;
      this.tempSelectedColumn=selectedColumn;
      this.tempDisplayNames=displayNames;
      this.tempColumnSelect=columnSelect;
	  this.typesofColumn = colTypes;
       this.currenciesOfColumn = curr;   
     // this.setInstrument(data);
      this.setRemainingSeg(data,selectedColumn,displayNames,columnSelect, colTypes, curr);
      var currForm = kony.application.getCurrentForm();
      currForm.forceLayout();
    },
        setInstrument:function(data,displayName,ColumnValue){

      var results1=[];
      var results=[];
      for(var num in data){
        var temp=data[num];
        var storeData;
        if (ColumnValue === "description") {
          if (this.width === 1024 || this.width === 768 || this.orientationHandler.isTablet) {
            var ISIN=(data[num].ISIN !== undefined && data[num].ISIN !== "")? (data[num].ISIN):"";
            var holdingsType=(data[num].holdingsType !== undefined && data[num].holdingsType !== "")?(data[num].holdingsType):"";
            var ISINText=(ISIN !== "")?ISIN:"";
            if(holdingsType !== ""){
              if (ISINText !== ""){
                ISINText=ISINText + "|" + holdingsType;
              }
              else{
                ISINText = holdingsType;
              }
            }
            var isISINTextVisible=(ISINText!=="")?true:false;				 
            storeData = {							
              instrument: {
                'text': this.FormatUtils.truncateStringWithGivenLength(temp[ColumnValue], 12),
                'toolTip': temp[ColumnValue]
              },
              ISIN: {
                'text': this.FormatUtils.truncateStringWithGivenLength(ISINText, 18),
                'toolTip':ISINText,
                "isVisible": isISINTextVisible
              }
            };
          } else {
            var ISIN=(data[num].ISIN !== undefined && data[num].ISIN !== "")? (data[num].ISIN):"";
            var holdingsType=(data[num].holdingsType !== undefined && data[num].holdingsType !== "")?(data[num].holdingsType):"";
            var ISINText=(ISIN !== "")?ISIN:"";
            if(holdingsType !== ""){
              if (ISINText !== ""){
                ISINText=ISINText + "|" + holdingsType;
              }
              else{
                ISINText = holdingsType;
              }
            }
            var isISINTextVisible=(ISINText!=="")?true:false;
            storeData = {
              instrument: {
                'text': this.FormatUtils.truncateStringWithGivenLength(temp[ColumnValue], 22),
                'toolTip': temp[ColumnValue]
              },
              ISIN: {
                'text': this.FormatUtils.truncateStringWithGivenLength(ISINText, 27),
                'toolTip':ISINText,
                "isVisible": isISINTextVisible
              }
            };
          }
        } else{
          storeData={
            instrument:temp[ColumnValue],
            ISIN:{'isVisible':false}
          };
        }
       
        var storeData1={
          image:"inactivewealth.png"
        }
        results.push(storeData);
        results1.push(storeData1);
      }
      this.view.segRow.widgetDataMap={
        lblInstruName:"instrument",
        lblISIN:"ISIN"
      };
      this.view.lblName.text=displayName;
      this.view.segRow.setData(results);
      this.view.segDot.widgetDataMap={
        img3Dot:"image"
      }
      this.view.segDot.setData(results1);
          this.oldAction=JSON.parse(JSON.stringify(results1));
    },
    
      setStatus: function(){
      var result = [];
      var data = this.portfolioArray;
      if(data){
      for(var item in data){
        var temp = data[item];
       if(temp.hasOwnProperty("status")){
          var storeData;
        storeData = {
          status : temp.status ?  temp.status : "",
          img :{ 
           src:   temp.status ? "orange.png" : ""
          }
        }
      }      
        result.push(storeData);
       }
      this.view.segStatus.setData(result);
      this.view.segStatus.widgetDataMap = {
        imgStatus : "img",
        lblStatus : "status"
      }       
      this.view.flxStatus.isVisible = true;
      }
    },
    
    
    
    
    setRemainingSeg:function(data,selectedColumn,displayNames,columnSelect, colType , cur){      
      this.setVisibility(selectedColumn,displayNames,colType);
      this.setDataSegRem(data,selectedColumn,displayNames,columnSelect,colType, cur);
      if(this.isRTL){
				setTimeout(this.clearCSS, 500);
			}
    },
    
        setVisibility:function(selectedColumn,displayNames,colType){
      this.setHeaderData(selectedColumn,displayNames,colType);
      this.setUi(selectedColumn);
      var widgets=this.view.flxHeader.widgets();
      for(i=0;i<selectedColumn.length;i++){
        this.view[widgets[i].id].isVisible=true;
      }
      for(j=selectedColumn.length;j<widgets.length;j++){
        this.view[widgets[j].id].isVisible=false;
      }
    },
    
           setUi: function(selectedColumn) {
             var tabName = this.getFieldValue(eval("this._tab"+this.prefix+"Name"));
            if (selectedColumn.length === 17) {
                if (this.width === 1024 || this.width === 768 || this.orientationHandler.isTablet) {
                    this.view.flxSeparator2.width = "2480dp";
                    this.view.flxSeparator3.width = "2480dp";
                    this.view.flxHeader.width = "2480dp";
                    this.view.segRemaining.width = "2490dp";
                } else {
                    this.view.flxSeparator2.width = "2665dp";
                    this.view.flxSeparator3.width = "2665dp";
                    this.view.flxHeader.width = "2665dp";
                    this.view.segRemaining.width = "2675dp";
                }
            }
             else if (selectedColumn.length === 18) {
                if (this.width === 1024 || this.width === 768 || this.orientationHandler.isTablet) {
                    this.view.flxSeparator2.width = "2630dp";
                    this.view.flxSeparator3.width = "2630dp";
                    this.view.flxHeader.width = "2630dp";
                    this.view.segRemaining.width = "2640dp";
                } else {
                    this.view.flxSeparator2.width = "2815dp";
                    this.view.flxSeparator3.width = "2815dp";
                    this.view.flxHeader.width = "2815dp";
                    this.view.segRemaining.width = "2825dp";
                }
            }
             else if (selectedColumn.length === 16) {
                if (this.width === 1024 || this.width === 768 || this.orientationHandler.isTablet) {
                    this.view.flxHeader.width = "2330dp";
                    this.view.segRemaining.width = "2330dp";
                    this.view.flxSeparator2.width = "2330dp";
                    this.view.flxSeparator3.width = "2330dp";
                } else {
                    this.view.flxSeparator2.width = "2510dp";
                    this.view.flxSeparator3.width = "2510dp";
                    this.view.flxHeader.width = "2510dp";
                    this.view.segRemaining.width = "2520dp";
                }
            } else if (selectedColumn.length === 15) {
                if (this.width === 1024 || this.width === 768 || this.orientationHandler.isTablet) {
                    this.view.flxSeparator2.width = "2190dp";
                    this.view.flxSeparator3.width = "2190dp";
                    this.view.flxHeader.width = "2190dp";
                    this.view.segRemaining.width = "2200dp";
                } else {
                    this.view.flxSeparator2.width = "2350dp";
                    this.view.flxSeparator3.width = "2350dp";
                    this.view.flxHeader.width = "2350dp";
                    this.view.segRemaining.width = "2360dp";
                }
            } else if (selectedColumn.length === 14) {
                if (this.width === 1024 || this.width === 768 || this.orientationHandler.isTablet) {
                    this.view.flxSeparator2.width = "2050dp";
                    this.view.flxSeparator3.width = "2050dp";
                    this.view.flxHeader.width = "2050dp";
                    this.view.segRemaining.width = "2060dp";
                } else {
                    this.view.flxSeparator2.width = "2200dp";
                    this.view.flxSeparator3.width = "2200dp";
                    this.view.flxHeader.width = "2200dp";
                    this.view.segRemaining.width = "2210dp";
                }
            } else if (selectedColumn.length === 13) {
                if (this.width === 1024 || this.width === 768 || this.orientationHandler.isTablet) {
                    this.view.flxSeparator2.width = "1905dp";
                    this.view.flxSeparator3.width = "1905dp";
                    this.view.flxHeader.width = "1905dp";
                    this.view.segRemaining.width = "1915dp";
                } else {
                    this.view.flxSeparator2.width = "2040dp";
                    this.view.flxSeparator3.width = "2040dp";
                    this.view.flxHeader.width = "2040dp";
                    this.view.segRemaining.width = "2050dp";
                }
            } else if (selectedColumn.length === 12) {
                if (this.width === 1024 || this.width === 768 || this.orientationHandler.isTablet) {
                   this.view.flxSeparator2.width = "1730dp";
                    this.view.flxSeparator3.width = "1730dp";
                    this.view.flxHeader.width = "1730dp";
                    this.view.segRemaining.width = "1740dp";
                } else {
                   this.view.flxSeparator2.width = "1880dp";
                   this.view.flxSeparator3.width = "1880dp";
                   this.view.flxHeader.width = "1880dp";
                   this.view.segRemaining.width = "1890dp";
                }
            } else if (selectedColumn.length === 11) {
                if (this.width === 1024 || this.width === 768 || this.orientationHandler.isTablet) {
                   this.view.flxSeparator2.width = "1590dp";
                    this.view.flxSeparator3.width = "1590dp";
                    this.view.flxHeader.width = "1590dp";
                    this.view.segRemaining.width = "1600dp";
                } else {
                    this.view.flxSeparator2.width = "1730dp";
                    this.view.flxSeparator3.width = "1730dp";
                    this.view.flxHeader.width = "1730dp";
                    this.view.segRemaining.width = "1740dp";
                }
            } else if (selectedColumn.length === 10) {
                if (this.width === 1024 || this.width === 768 || this.orientationHandler.isTablet) {
                    this.view.flxSeparator2.width = "1440dp";
                    this.view.flxSeparator3.width = "1440dp";
                    this.view.flxHeader.width = "1440dp";
                    this.view.segRemaining.width = "1450dp";
                } else {
                    this.view.flxSeparator2.width = "1570dp";
                    this.view.flxSeparator3.width = "1570dp";
                    this.view.flxHeader.width = "1570dp";
                    this.view.segRemaining.width = "1580dp";
                }
            } else if (selectedColumn.length === 9) {
                if (this.width === 1024 || this.width === 768 || this.orientationHandler.isTablet) {
                    this.view.flxSeparator2.width = "1300dp";
                    this.view.flxSeparator3.width = "1300dp";
                    this.view.flxHeader.width = "1300dp";
                    this.view.segRemaining.width = "1310dp";
                } else {
                    this.view.flxSeparator2.width = "1420dp";
                    this.view.flxSeparator3.width = "1420dp";
                    this.view.flxHeader.width = "1420dp";
                    this.view.segRemaining.width = "1430dp";
                }
            } else if (selectedColumn.length === 8) {
                if (this.width === 1024 || this.width === 768 || this.orientationHandler.isTablet) {
                    this.view.flxSeparator2.width = "1173dp";
                    this.view.flxSeparator3.width = "1173dp";
                    this.view.flxHeader.width = "1173dp";
                    this.view.segRemaining.width = "1183dp";
                } else {
                    this.view.flxSeparator2.width = "1260dp";
                    this.view.flxSeparator3.width = "1260dp";
                    this.view.flxHeader.width = "1260dp";
                    this.view.segRemaining.width = "1270dp";
                }
            } else if (selectedColumn.length === 7) {
            if (tabName === this.getFieldValue("{i.i18n.wealth.orders}") && scope_WealthPresentationController.rtlLocale.includes(kony.i18n.getCurrentLocale())) {
                    this.view.flxHe7.left = "12dp";
                   this.view.flxHe1.left = "";
                  this.view.lblHe5.right = "";
                  this.view.imgS5.right = "10dp";
                  this.view.lblHe1.left = "10dp";
                }
              else if (tabName === this.getFieldValue("{i.i18n.wealth.accountsActivity}") && scope_WealthPresentationController.rtlLocale.includes(kony.i18n.getCurrentLocale())) {
                    this.view.flxHe1.left = "10dp";
                    this.view.flxHe7.left = "-30dp";
                    this.view.lblHe5.right = "87dp";
                    this.view.imgS5.right = "73dp";
                this.view.lblHe1.left = "";
                }else if(scope_WealthPresentationController.rtlLocale.includes(kony.i18n.getCurrentLocale())){
                  this.view.flxHe1.left = "";
                  this.view.flxHe7.left = "";
                  this.view.lblHe5.right = "";
                  this.view.imgS5.right = "10dp";
                  this.view.lblHe1.left = "";
                }
                if (this.width === 1024 || this.width === 768 || this.orientationHandler.isTablet) {
                    this.view.flxSeparator2.width = "1080dp";
                    this.view.flxSeparator3.width = "1080dp";
                    this.view.flxHeader.width = "1080dp";
                    this.view.segRemaining.width = "1090dp";
                } else if (this.width === 1366){
                    this.view.flxSeparator2.width = "1172dp";
                    this.view.flxSeparator3.width = "1172dp";
                    this.view.flxHeader.width = "1172dp";
                    this.view.segRemaining.width = "1172dp";
                } else {
                    this.view.flxSeparator2.width = "1190dp";
                    this.view.flxSeparator3.width = "1190dp";
                    this.view.flxHeader.width = "1190dp";
                    this.view.segRemaining.width = "1198dp";
                }
            } else if (selectedColumn.length === 6) {
            if (tabName === this.getFieldValue("{i.i18n.wealth.orders}") && scope_WealthPresentationController.rtlLocale.includes(kony.i18n.getCurrentLocale())) {
                    this.view.flxHe7.left = "10dp";
                }else if(scope_WealthPresentationController.rtlLocale.includes(kony.i18n.getCurrentLocale())){
                  this.view.flxHe7.left = "";
                }
                if (this.width === 640 || this.orientationHandler.isMobile) {} else if (this.width === 1024 || this.width === 768 || this.orientationHandler.isTablet) {
                    this.view.flxSeparator2.width = "905dp";
                    this.view.flxSeparator3.width = "905dp";
                    this.view.flxHeader.width = "905dp";
                    this.view.segRemaining.width = "915dp";
                } else if (this.width === 1366) {
                    this.view.flxSeparator2.width = "940dp";
                    this.view.flxSeparator3.width = "940dp";
                    this.view.flxHeader.width = "940dp";
                    this.view.segRemaining.width = "950dp";
                } else {
                    this.view.flxHeader.width = "950dp";
                    this.view.segRemaining.width = "957dp";
                    this.view.flxSeparator2.width = "950dp";
                    this.view.flxSeparator3.width = "950dp";
                }
            } else if (selectedColumn.length === 5) {
                this.view.flxHeader.width = "880dp";
                this.view.segRemaining.width = "890dp";
            } else if (selectedColumn.length === 4) {
                if (this.width === 1024 || this.width === 768 || this.orientationHandler.isTablet) {
                    this.view.flxSeparator2.width = "1080dp";
                    this.view.flxSeparator3.width = "1080dp";
                    this.view.flxHeader.width = "1080dp";
                    this.view.segRemaining.width = "1090dp";
                } else if (this.width === 1366){
                    this.view.flxSeparator2.width = "1175dp";
                    this.view.flxSeparator3.width = "1175dp";
                    this.view.flxHeader.width = "1175dp";
                    this.view.segRemaining.width = "1175dp";
                } else {
                    this.view.flxSeparator2.width = "1190dp";
                    this.view.flxSeparator3.width = "1190dp";
                    this.view.flxHeader.width = "1190dp";
                    this.view.segRemaining.width = "1198dp";
                }
             } else if (selectedColumn.length === 3) {
                this.view.flxHeader.width = "880dp";
                this.view.segRemaining.width = "890dp";
            } else if (selectedColumn.length === 2) {
                this.view.flxHeader.width = "880dp";
                this.view.segRemaining.width = "890dp";
            } else {
                this.view.flxHeader.width = "880dp";
                this.view.segRemaining.width = "890dp";
            }
        },
        setHeaderData: function(selectedColumn, displayNames, colType) {
            var displayName = [];
            var types = [];
            for (var num in selectedColumn) {
                displayName.push(displayNames[selectedColumn[num]]);
                types.push(colType[selectedColumn[num]]);
            }
            var flxWidgets = this.view.flxHeader.widgets();
            for (i = 0; i < selectedColumn.length; i++) {
              var flexname=flxWidgets[i];
                var Widgets = flxWidgets[i].widgets();
                var lblWidget = Widgets[0];
                this.view[lblWidget.id].text = displayName[i];
                if (types[i] == "text" || types[i] == "date"|| types[i] == "orderId") {
                  this.view[flexname.id].layoutType= kony.flex.FLOW_HORIZONTAL;
                  this.view[lblWidget.id].width= kony.flex.USE_PREFERED_SIZE;
                  this.view[lblWidget.id].right="10dp";
                  if (this.width === 1024 || this.width === 768 || this.orientationHandler.isTablet) {
                        this.view[lblWidget.id].left = "0dp";
                  }else{
						this.view[lblWidget.id].left = "10dp";
				  }
                  this.view[lblWidget.id].contentAlignment = this.isRTL ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
                }
				else{
                  this.view[flexname.id].layoutType= kony.flex.FREE_FORM;
                  this.view[lblWidget.id].width= "75%";
                  this.view[lblWidget.id].right="29dp";
                  this.view[lblWidget.id].left="";
				  this.view[lblWidget.id].contentAlignment = this.isRTL ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT;
				}
                if (this.width === 640 || this.orientationHandler.isMobile) {} else if (this.width === 1024 || this.width === 768 || this.orientationHandler.isTablet) {
                    this.view[flxWidgets[i].id].left = "0px";
                    this.view[flxWidgets[i].id].width = "143dp";
                } else if (this.width === 1366) {
                    this.view[flxWidgets[i].id].width = "156dp";
                  this.view[flxWidgets[i].id].left = "0dp";
                } 
				else {
                    if (selectedColumn.length > 6) {
                      this.view[flxWidgets[i].id].left = "0dp";
                        this.view[flxWidgets[i].id].width = "156dp";
                    } else {
                      this.view[flxWidgets[i].id].left = "0dp";
                        this.view[flxWidgets[i].id].width = "158dp";
                    }
                }
				 if(selectedColumn.length ===7){
                if (this.width === 640 || this.orientationHandler.isMobile) {} else if (this.width === 1024 || this.width === 768 || this.orientationHandler.isTablet) {
                    this.view[flxWidgets[i].id].width = "153dp";
                } else if (this.width === 1366) {
                    this.view[flxWidgets[i].id].width = "156dp";
                  this.view[flxWidgets[i].id].left = "0dp";
                } else {
                  this.view[flxWidgets[i].id].left = "0dp";
                        this.view[flxWidgets[i].id].width = "170dp";
                    }
                }
               if(selectedColumn.length ===4){
                if (this.width === 640 || this.orientationHandler.isMobile) {
                  
                } else if (this.width === 1024 || this.width === 768 || this.orientationHandler.isTablet) {
                  if (i == 3) {
                    this.view[flxWidgets[i].id].left = "100px";
                    this.view[flxWidgets[i].id].width = "160dp";
                  } else if(i == 0){
                    this.view[flxWidgets[i].id].left = "13px";
                    this.view[flxWidgets[i].id].width = "140dp";
                  }else{
                    this.view[flxWidgets[i].id].left = "0px";
                    this.view[flxWidgets[i].id].width = "140dp";
                  }
                } else if (this.width === 1366) {
                    if(i==3){
                    this.view[lblWidget.id].width= "94%";
                    this.view[flxWidgets[i].id].width = "675px";
                    }
                  else if(i==0){
                  this.view[flxWidgets[i].id].left = "15dp";
                  this.view[flxWidgets[i].id].width = "156dp";
               }
                  else{
                  this.view[flxWidgets[i].id].width = "156dp";
               }
                } else {
                         if(i==3){
                    this.view[flxWidgets[i].id].width = "620dp";
                         this.view[lblWidget.id].width = "94%";
                         }
                  else if (i == 0) {
                            this.view[flxWidgets[i].id].left = "15dp";
                            this.view[flxWidgets[i].id].width = "170dp";
                        }
                  else
                  this.view[flxWidgets[i].id].width = "170dp";
                    }
                }
              var imgWidgets = Widgets[1];
              if(this.view[lblWidget.id].text!=="")
                  imgWidgets.isVisible=true;
              else
                   imgWidgets.isVisible=false;
               }
        },
        setDataSegRem: function(data, selectedColumn, displayNames, columnSelect, columnTypes, currCol) {
            var results = [];
            var key = [];
            var typesArr = [];
            var currArr = [];
            for (var num in selectedColumn) {
                key.push(columnSelect[selectedColumn[num]]);
                typesArr.push(columnTypes[selectedColumn[num]]);
                currArr.push(currCol[selectedColumn[num]]);
            }
            for (var num1 in data) {
                var storeData = this.getData(key, selectedColumn, data[num1], typesArr, currArr);
                results.push(storeData);
            }
            this.view.segRemaining.widgetDataMap = {
                lbl1: "lblHe1",
                lbl2: "lblHe2",
                lbl3: "lblHe3",
                lbl4: "lblHe4",
                lbl5: "lblHe5",
                lbl6: "lblHe6",
                lbl7: "lblHe7",
                lbl8: "lblHe8",
                lbl9: "lblHe9",
                lbl10: "lblHe10",
                lbl11: "lblHe11",
                lbl12: "lblHe12",
                lbl13: "lblHe13",
                lbl14: "lblHe14",
                lbl15: "lblHe15",
                lbl16: "lblHe16",
                lbl17: "lblHe17",
              lbl18: "lblHe18",
              img5:"img5",
              img6:"img6",
              img7:"img7",
              img8:"img8",
              img9:"img9"
            };
            this.view.segRemaining.setData(results);
        },
        getData: function(key, selectedColumn, data, types, currencyArr) {
            var storeData = {};
            for (i = 1; i < 19; i++) {
                var value = {};
              var imgset={};
                 var codes=this.getFieldValue(eval("this._statusOptionsCode"));
      			var imgs =this.getFieldValue(eval("this._statusOptionsImage")); 
         		var codesArr = codes.split(",");
              var imgsArr=imgs.split(",");
                if (i <= selectedColumn.length) {
                    //           if(data[key[i-1]].substr(0,1)==='-'){
                    //             value['skin']='sknlblee0005SSPReg15px';
                    //           }else if(data[key[i-1]].substr(0,1)==='+'){
                    //             value['skin']='sknIW2F8523';
                    //           }else{
                    //             value['skin']='slLabel0d8a72616b3cc47';
                    //           } 
                    var currencyCodeMap = "";
                    var currCode = "";
                    if (types[i - 1] == "amount" || types[i - 1] == "normalAmount") {
                        currencyCodeMap = currencyArr[i - 1];
                        currCode = data[currencyCodeMap];
                        if (currCode == undefined || currCode == "") {
                            currCode = this.completeResponse[currencyCodeMap];
                        }
                    }
                    value = this.FormatUtils.formatText(data[key[i - 1]], types[i - 1], this.formatSkins, this.formattingJSON, currCode);
                    value["isVisible"] = true;
                    //           value["text"]=data[key[i-1]];
                    if (this.width === 1024 || this.width === 768 || this.orientationHandler.isTablet) {
                        
                            value["left"] = "10dp";
                        
                    } else {
                        if (i === 1) {
                            value["left"] = "10dp";
                        } else {
                             if(this.getFieldValue(eval("this._tab" + this.prefix + "Name")) === this.getFieldValue("{i.i18n.wealth.performance}") && scope_WealthPresentationController.rtlLocale.includes(kony.i18n.getCurrentLocale())){
                            value["left"] = "28dp";
                           }else{
                             value["left"] = "26dp";
                           }
                        }
                    }
                    if (this.width === 640 || this.orientationHandler.isMobile) {} else if (this.width === 1024 || this.width === 768 || this.orientationHandler.isTablet) {
                        value["width"] = "133dp";
                    } else if (this.width === 1366) {
                        value["width"] = "130dp";
                    } else {
                        if (selectedColumn.length > 6) {
                            value["width"] = "130dp";
                        } else {
                            value["width"] = "132dp";
                        }
                    }
                  for(var j=0;j<codesArr.length;j++){
                  if (value["text"] == codesArr[j].trim() && this.selectedTab == 3)
                    {
                      value["left"] = "10dp";
                      //value["width"] = "110dp";
                      if (this.width === 1024 || this.width === 768 || this.orientationHandler.isTablet)
                        {storeData["img"+i]= {"isVisible": true,"src":imgsArr[j].trim(), "left": "10dp"};}
                      else{
                      storeData["img"+i]= {"isVisible": true,"src":imgsArr[j].trim(), "left": "25dp"};}
                      break;
                    }
                    else{
                             storeData["img"+i]= {"isVisible": false,"src":imgsArr[j].trim()};
                    }
                  }
                storeData["lblHe" + i] = value;
				if(selectedColumn.length===7){
                        if (this.width === 640 || this.orientationHandler.isMobile) {} else if (this.width === 1024 || this.width === 768 || this.orientationHandler.isTablet) {
                        value["width"] = "143dp";
                    } else if (this.width === 1366) {
                        value["width"] = "130dp";
                    } else {
                            value["width"] = "145dp";
                        }
                    }
                  if(selectedColumn.length===4){
                        if (this.width === 640 || this.orientationHandler.isMobile) {}
                    else if (this.width === 1024 || this.width === 768 || this.orientationHandler.isTablet) {
                       if(i==4){
                        value["width"] = "250px";
                        value["left"]= "35dp";
                       }
                      else if(i==1){
                          value["width"] = "133dp";
                          value["left"]= "18dp";
                      }
                       else{
                          value["width"] = "133dp";
                          value["left"]= "0dp";
                       }
                    } else if (this.width === 1366) {
                       if(i==4)
                        value["width"] = "650px";
                      else if(i==1){
                          value["width"] = "130dp";
                          value["left"]= "25dp";
                       }
                       else{
                          value["width"] = "130dp";
                       }
                    } else {
                       if(i==4)
                            value["width"] = "605px";
                       else{
                          value["width"] = "143dp";
                         value["left"]= "25dp";
                       }
                        }
                    }
				}
				else {
                    value["isVisible"] = false;
                    storeData["lblHe" + i] = value;
                }

            }
            return storeData;
        },
    
    /**
     * Component cacheCallBack
     * Reponsible to get cache data.
     * @param: data{JSON} - data from cache
     * @param: params{JSON} - params related to pagination
     */
    cacheCallBack: function(data,params){
      var self = this;
      try
      {
        this.totalRecords = params.pagination.totalSize;
        this.processResponse(data,this._TLserviceResponseIdentifier);
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in the cache call back.",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component getCacheData
     * Reponsible to get cache data.
     */
    getCacheData: function()
    {
      var self = this;
      try
      {
      //  var filterValues = this.getFilterValue();
        if(this.state === "pagination")
        {
          this.cacheUtils.applyPagination(this.criteria["offset"],this.noOfRecords);
          this.tab6CacheUtils.pageSize = this.noOfRecords;
        }
        else if(this.state === "filterData")
        {
          this.cacheUtils.applyFilter("transactionType",filterValues);
        }
        else if(this.state === "sortedData")
        {
          this.cacheUtils.applySorting(this.criteria["sortBy"],this.criteria["order"]);
        }
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in the get cache data method.",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component setCacheData
     * Reponsible to set cache data.
     * @param: response{JSON} - data from service
     */
    setCacheData: function(response)
    {
      var self = this;
      try
      {
        this.cacheUtils.setData(response.Transactions);
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in the set cache data method.",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    
    setAccountsActivityUI: function(){
      this.view.lblByKeyword.setVisibility(true);
      this.view.flxSearchimg.setVisibility(true);
      this.view.txtKeyword.left = "55dp";
      this.view.flxBoxSearch.top = "10dp";
      this.view.flxKeyword.width = "45%";
      this.selectedTab = 4;
      this.listType = "SEARCH";
      this.view.flxCalWhole.top = "150dp";
      this.view.flxCalWhole.left = "28%";
      this.sortBy = "bookingDate";
      this.sorting="DESC";
      this.currPage = "Accounts Activity";
      this.setImage(1,this.view.imgS1,true,this.sorting);
      this.view.lstbxTransactionType.selectedKey = this.view.lstbxTransactionType.masterData[0][0];
      this.accountId = this.view.lstbxTransactionType.masterData[0][0];
      this.view.btnFilter4.setFocus(false);
      if (this.width === 1024 || this.width === 768 || this.orientationHandler.isTablet) {
        this.view.flxCalWhole.width="95%";
        this.view.flxCalWhole.left="3%";
        this.view.flxCalWhole.top="250px";
        this.view.flxLeftSearch.height = "170dp";
      }
    },
    onError: function(errorObj){
      let tabName = this.getFieldValue(eval("this._tab" + this.prefix + "Name"));
      this.view.flxKeyword.width="96%";
      if (tabName === undefined || tabName === "") {
        return;
      }
      else{
        this.requestEnd();
        if(tabName === this.getFieldValue("{i.i18n.wealth.performance}")){
          this.view.PerformanceTab.setVisibility(false);
          this.handleNoRowData();
        }
        if(tabName === this.getFieldValue("{i.i18n.common.transactions}")){
          this.handleNoRowData();
        }
        if(tabName === this.getFieldValue("{i.i18n.wealth.orders}")){
          this.handleNoRowData();
        }
        if (tabName === this.getFieldValue("{i.i18n.wealth.accountsActivity}")) {
          this.handleNoRowData();
          this.setAccountsActivityUI();
        }
      }

      if(this.tabMapping[this.selectedTab] === this.getFieldValue("{i.i18n.wealth.holdings}")){
        this.view.flxKeyword.width="69%";
        if(this.isIncludeOrder === "true"){
          this.view.imgToggle.src = this.imageEnable; 
        }else{
          this.view.imgToggle.src = this.imageDisable;
        }
          }
          //  this.handleNoRowData();
    },
    /** 
    * Component getFilterValue
    * Responsible to get Filter values
    */
    getFilterValue: function()
    {
      var self = this;
      try
      {
        var selectedTab = this.selectedTab;
        var filtervalues= this.getFieldValue(eval("this._filterValueTab"+selectedTab), "transactionsTypes");
        return filtervalues;
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in the set geting filter value.",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component getTransactionList
     * Reponsible to call the DAO method for invoking service api.
     */
    getTransactionList: function(){
      var self =this;
      try
      {
        this.requestStart();
        if(this.cacheUtils.data.length===0)
          {
            this.criteria.limit = parseInt(this._cacheTotalRecords);
            if(this._TLobjectServiceName && this._TLobjectName && this._TLoperationName && this._dataAvailability == "Service calls by component"){
              this.transactionListDAO.fetchTransactionList(this._TLobjectServiceName,this._TLoperationName,this._TLobjectName,this.getCriteria(),this._TLserviceResponseIdentifier,this.setCacheData,this.onError);
            }
            else{
              this.updateTransactions();
            }
          } 
        else
          {
           // this.getCacheData();
          }
       
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in doing service call to fetch transactions",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component cacheCallBack
     * Reponsible to implement cache call back.
     */
    tab6CacheCallBack: function(data,params){
      var self = this;
      try
      {
        this.totalRecords = params.pagination.totalSize;
        this.processTab6Response(data,this._tab6ServiceResponseIdentifier);
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting tab6 cache data",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }

    },
    /**
     * Component getCacheData
     * Reponsible to get cache data.
     */
    getTab6CacheData: function()
    {
      var self = this;
      try
      {
         if(this.state === "sortedData")
        {
          this.tab6CacheUtils.applySorting(this.criteria["sortBy"],this.criteria["order"]);
        }
        else
        {
          this.tab6CacheUtils.applyPagination(this.criteria["offset"],this.noOfRecords);
          this.cacheUtils.pageSize = this.noOfRecords;
        }
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in getting tab6 cache data",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component setCacheData
     * Reponsible to set cache data.
     * @param: response{JSON} - data from service
     */
    setTab6CacheData: function(response)
    {
      var self = this;
      try
      {
        this.tab6CacheUtils.setData(response.Transactions);		
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting tab6 cache data",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component getTab6Transactions
     * Reponsible to call the DAO method for invoking service api.
     */
    getTab6Transactions: function(){
      var self =this;
      try
      {
        if(this.tab6CacheUtils.data.length===0)
        {
          this.criteria.limit = parseInt(this._cacheTotalRecords);
          this.requestStart();
          var operationName = self.getFieldValue(self._tab6OperationName,"operationName");
          if(this._tab6ObjectServiceName && this._tab6ObjectName && operationName){
            this.transactionListDAO.fetchTransactionList(this._tab6ObjectServiceName,operationName,this._tab6ObjectName,this.getCriteria(),this._tab6ServiceResponseIdentifier,this.setTab6CacheData,this.onError);
          }
          else{
            this.updateTab6Transactions();
          }
        }
        else
        {
          this.getTab6CacheData();
        }
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in doing service call to fetch transactions",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component setTabData
     * Reponsible to set all the properties to the filters.
     */
    setTabData : function(){
      var scope = this;
      scope.setTabText();
      scope.setTabsVisibility();
     // scope.setTabActions();
      //scope.setSelectedTabUI();
     // scope.setSelectedTabUIMobile();
    },
    /**
     * Component setTabText
     * Reponsible to set text to all the filters.
     */
    setTabText: function(){
      var self =this;
      try{
        this.view.btnAll.text = this.getFieldValue(this._tabOneName);
        this.view.btnFilter2.text = this.getFieldValue(this._tabTwoName);
        this.view.btnFilter3.text = this.getFieldValue(this._tabThreeName);
        this.view.btnFilter4.text = this.getFieldValue(this._tabFourName);
        this.view.btnFilter5.text = this.getFieldValue(this._tabFiveName);
        this.view.btnFilter6.text = this.getFieldValue(this._tabSixName);

      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting the Filter titles",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component setTabsVisibility
     * Reponsible to show and hide filters based on configuration.
     */
    setTabsVisibility:function(){
      var self = this;
      try{
        this.view.btnAll.setVisibility(!this.isEmptyNullUndefined(this.view.btnAll.text));
        this.view.btnFilter2.setVisibility(!this.isEmptyNullUndefined(this.view.btnFilter2.text));
        this.view.btnFilter3.setVisibility(!this.isEmptyNullUndefined(this.view.btnFilter3.text));
        this.view.btnFilter4.setVisibility(!this.isEmptyNullUndefined(this.view.btnFilter4.text));
        this.view.btnFilter5.setVisibility(!this.isEmptyNullUndefined(this.view.btnFilter5.text));
        this.view.btnFilter6.setVisibility(!this.isEmptyNullUndefined(this.view.btnFilter6.text));
        
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting the Filters visibility",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component scrollFiltersLeft
     * Reponsible to perfrom actions on left scroll of filters in mobile breakpoint.
     */
    scrollFiltersRight: function() {
      this.view.flxFiltersScroll.left = "8.5%";
      this.view.flxFiltersScroll.right = "0dp";
      this.view.flxFiltersScroll.scrollToEnd();
      this.view.btnDummyLeftScroll.isVisible = true;
      this.view.btnDummyRightScroll.isVisible = false;
    },
    /**
     * Component scrollFiltersRight
     * Reponsible to perfrom actions on right scroll of filters in mobile breakpoint.
     */
    scrollFiltersLeft: function() {
      this.view.flxFiltersScroll.left = "0dp";
      this.view.flxFiltersScroll.right = "8.5%";
      this.view.flxFiltersScroll.scrollToBeginning();
      this.view.btnDummyLeftScroll.isVisible = false;
      this.view.btnDummyRightScroll.isVisible = true;
    },
    /**
     * Component setTabActions
     * Reponsible to set the on click actions to the filters.
     */
    setTabActions:function(){
      var self =this;
      try
      {
        var scope = this;
        scope.view.btnAll.onClick = function(){
          scope.setSelectedTabData(scope._tabOneName, 1);
        };
        scope.view.btnFilter2.onClick = function(){
          scope.setSelectedTabData(scope._tabTwoName, 2);
        };
        scope.view.btnFilter3.onClick = function(){
          scope.setSelectedTabData(scope._tabThreeName, 3);
        };
        scope.view.btnFilter4.onClick = function(){
          scope.setSelectedTabData(scope._tabFourName, 4);
        };
        scope.view.btnFilter5.onClick = function(){
          scope.setSelectedTabData(scope._tabFiveName, 5);
        };
        scope.view.btnFilter6.onClick = function(){
          scope.setSelectedTabData(scope._tabSixName, 6);
        };
        
    
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting the Filter onCLicks",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component setSelectedTabData
     * Set the filter data and UI according to the tab selected
     * @param: filterData{string} - filter data of the selected account type
     * @param: selectedTab{integer} - selected tab number
     */
    setSelectedTabData: function(filterData,selectedTab){
      var self =this;
      try
      {
        var scope = this;
        scope.criteria = "";
        scope.offset = 0;
		this.state = "filterData";
        scope.view.paginationFooter.resetStartIndex();
        this.view.paginationFooter.collapseDropDown();
        this.view.paginationHeader.collapseDropDown();   
        scope.setCriteria(scope.getFieldValue(filterData,"requestPayoad"));
        scope.criteria["offset"] = scope.offset;
        scope.criteria["limit"] = parseInt(scope.noOfRecords);
        scope.selectedTab = selectedTab;
        scope.setSelectedTabUI();
        scope.setSelectedTabUIMobile();
        scope.resetSortingImages();
        scope.tabNavigation = true;
        if(scope._dataAvailability == "Service calls by component")
          scope.getTransactionList();
        else
          scope.dataRequestCallback();
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting the citeria for service call for selected tab",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component setTab6Data
     * Set the filter data and UI for Tab 6
     * @param: filterData{string} - filter data of the selected account type
     * @param: selectedTab{integer} - selected tab number
     */
    setTab6Data: function(filterData,selectedTab){
      var self =this;
      try
      {
        var scope = this;
        scope.criteria = "";
        scope.offset = 0;
		scope.view.paginationFooter.resetStartIndex();
        this.view.paginationFooter.collapseDropDown();
        this.view.paginationHeader.collapseDropDown();
        scope.setCriteria(scope.getFieldValue(filterData,"requestPayoad"));
        scope.criteria["offset"] = scope.offset;
        scope.criteria["limit"] = parseInt(scope.noOfRecords);
        scope.selectedTab = selectedTab;
        scope.setSelectedTabUI();
        scope.setSelectedTabUIMobile();
        scope.resetSortingImages();
        scope.tabNavigation = true;
        scope.getTab6Transactions();
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting the citeria for service call for selected tab",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    getFilterName: function(){
      var self =this;
      try
      {
        let scope = this;
        let selectedTab = scope.selectedTab;
        let tabData = eval("scope._filterTab"+selectedTab);
        return scope.getFieldValue(tabData,"title");
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in getting the fileter name.",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    dataRequestCallback: function(searchCrteria){
      var self =this;
      try{
        var scopeObj = this;
        var dataObj = {
          "accountId" : scopeObj.getFieldValue(scopeObj._TLaccountId),
          "accountType" : scopeObj.getFieldValue(scopeObj._TLaccountType),
          "filterBy" : scopeObj.getFilterName(),
          "sortBy" : scopeObj.sorting,
          "offset" : scopeObj.offset,
          "limit" : scopeObj.noOfRecords,
          "searchCriteria" : searchCrteria
        };
        scopeObj.getTransactionsData(dataObj,scopeObj.updateTransactions);
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting the citeria to get Data from form",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component setSelectedTabUI
     * Reponsible to set the selected skin to the selected tab and reset the skins of other tabs.
     */
    setSelectedTabUI : function(){
      var self =this;
      try
      {
        this.view.btnAll.skin = this.skins.FILTER_INACTIVE;
        this.view.btnFilter2.skin = this.skins.FILTER_INACTIVE;
        this.view.btnFilter3.skin = this.skins.FILTER_INACTIVE;
        this.view.btnFilter4.skin = this.skins.FILTER_INACTIVE;
        this.view.btnFilter5.skin = this.skins.FILTER_INACTIVE;
        this.view.btnFilter6.skin = this.skins.FILTER_INACTIVE;
        switch(this.selectedTab){
          case 1 : this.view.btnAll.skin = this.skins.FILTER_SELECTED;
            break;
          case 2 : this.view.btnFilter2.skin = this.skins.FILTER_SELECTED;
            break;
          case 3 : this.view.btnFilter3.skin = this.skins.FILTER_SELECTED;
            break;
          case 4 : this.view.btnFilter4.skin = this.skins.FILTER_SELECTED;
            break;
          case 5 : this.view.btnFilter5.skin = this.skins.FILTER_SELECTED;
            break;
          case 6 : this.view.btnFilter6.skin = this.skins.FILTER_SELECTED;
            break;
          default : this.view.btnAll.skin = this.skins.FILTER_SELECTED;
        }
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting the skins for Filter",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
    },

    /**
     * Component setSelectedTabUIMobile
     * Reponsible to set the selected skin to the selected tab and reset the skins of other tabs in mobile breakpoint.
     */
    setSelectedTabUIMobile : function(){
      var self =this;
      try
      {
        this.view.btnAllMobile.skin = this.skins.FILTER_INACTIVE;
        this.view.btnFilter2Mobile.skin = this.skins.FILTER_INACTIVE;
        this.view.btnFilter3Mobile.skin = this.skins.FILTER_INACTIVE;
        this.view.btnFilter4Mobile.skin = this.skins.FILTER_INACTIVE;
        this.view.btnFilter5Mobile.skin = this.skins.FILTER_INACTIVE;
        this.view.btnFilter6Mobile.skin = this.skins.FILTER_INACTIVE;
        switch(this.selectedTab){
          case 1 : {
            this.view.btnAllMobile.skin = this.skins.FILTER_SELECTED;
            this.view.btnAllMobile.focusSkin = this.skins.FILTER_SELECTED;
            break;
          }
          case 2 : {
            this.view.btnFilter2Mobile.skin = this.skins.FILTER_SELECTED;
            this.view.btnFilter2Mobile.focusSkin = this.skins.FILTER_SELECTED;
            break;
          }
          case 3 : {
            this.view.btnFilter3Mobile.skin = this.skins.FILTER_SELECTED;
            this.view.btnFilter3Mobile.focusSkin = this.skins.FILTER_SELECTED;
            break;
          }
          case 4 : {
            this.view.btnFilter4Mobile.skin = this.skins.FILTER_SELECTED;
            this.view.btnFilter4Mobile.focusSkin = this.skins.FILTER_SELECTED;
            break;
          }
          case 5 : {
            this.view.btnFilter5Mobile.skin = this.skins.FILTER_SELECTED;
            this.view.btnFilter5Mobile.focusSkin = this.skins.FILTER_SELECTED;
            break;
          }
          case 6 : {
            this.view.btnFilter6Mobile.skin = this.skins.FILTER_SELECTED;
            this.view.btnFilter6Mobile.focusSkin = this.skins.FILTER_SELECTED;
            break;
          }
          default : {
            this.view.btnAllMobile.skin = this.skins.FILTER_SELECTED;
            this.view.btnAllMobile.focusSkin = this.skins.FILTER_SELECTED;
          }
        }
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting the skins for Filter in mobile breakpoint.",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component getFieldValue
     * Parse the exposed contract value based on accountType selected and breakpoint consideration
     * @param: Value{string} - value collected from exposed contract
     * @param: key{string} - lookup key in the JSON string
     * @return : {string} - Processed value
     */
    getFieldValue: function(Value,key) {
      try 
      {
        var value = Value;
        if(typeof(Value) == "string"){
          value = JSON.parse(Value);
        }
        if(value[this.accountType]){
          value = value[this.accountType];
        }
        if(!this.isEmptyNullUndefined(value) && !this.isEmptyNullUndefined(key)){
          value = value[key];
        }
        if (value !== null && value !== "" && value !== undefined) {
          if(typeof(value)=="string")
            return this.getProcessedText(value);
          else{
            var text=this.breakPointParser(value,kony.application.getCurrentBreakpoint());
            return this.getProcessedText(text);
          }
        } else return "";
      }  
      catch(err)
      {
        kony.print(err);
      }
      return this.getProcessedText(Value);
    },
    /**
     * Component breakPointParser
     * Helper method to parse the exposed contract based on the current breakpoint
     * inputJSON {JSONObject} - object containing information about various breakpoints and associated texts
     * lookUpKey {string}     - current breakpoint value to be looked upon the above object
     * @return : value of the lookup key in the input object
     */
    breakPointParser:function(inputJSON,lookUpKey){
      var self = this;
      try
      {
        if(inputJSON.hasOwnProperty(lookUpKey)){
          return inputJSON[lookUpKey];
        }
        else if(inputJSON.hasOwnProperty("default")){
          return inputJSON["default"];
        }
        return inputJSON;
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in parsing th break point",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component setAccountTypeFromContext
     * Set account type from the context object
     */
    setAccountTypeFromContext : function(){
      this.accountType= this.getFieldValue(this._TLaccountType);
    },
    /**
     * Component processResponse
     * To generate the JSONpath for service response
     * backendResponse{JSONObject} - response received from the backend
     * unicode{string}             - unique code to identify the service response in case of multiple service calls.
     */
    processResponse:function(backendResponse,unicode){
      var self = this;
      try
      {
        this.response = backendResponse;
        this.map = {};
        this.readObject(backendResponse);
        this.parserUtilsManager.setResponseData(unicode,this.map);
        //this.updateTransactions();
        //this.requestEnd();
        this.view.forceLayout();
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in processing the service responce",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component processTab6Response
     * To generate the JSONpath for service response
     * backendResponse{JSONObject} - response received from the backend
     * unicode{string}             - unique code to identify the service response in case of multiple service calls.
     */
    processTab6Response:function(backendResponse,unicode){
      var self = this;
      try
      {
        this.tab6Response = backendResponse;
        this.map = {};
        this.readObject(backendResponse);
        this.parserUtilsManager.setResponseData(unicode,this.map);
        this.updateTab6Transactions();
        this.requestEnd();
        this.view.forceLayout();
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in processing the service responce",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component readObject
     * Helper method to parse the backend response
     * obj{JSONArray} - object containing any value
     * jsonPath{String} - jsonPath traversed till the search field is reachable
     */
    readObject: function(obj, jsonPath) {
      var self = this;
      try
      {
        var keysItr = Object.keys(obj);
        var parentPath = jsonPath;
        for (var i = 0; i < keysItr.length; i++) {
          var key = keysItr[i];
          var value = obj[key]
          if(parentPath)
            jsonPath = parentPath + "." + key;
          else
            jsonPath = key;
          if (value instanceof Array) {
            this.map[key] = value;
            this.readArray(value, jsonPath);
          } else if (value instanceof Object) {
            this.map[key] = value;
            this.readObject(value, jsonPath);
          } else { // is a value
            if(isNaN(value) && (value.indexOf("{")>-1 ||value.indexOf("[")>-1))
              value=eval('('+value+')');
            if (value instanceof Array) {
              this.readArray(value, jsonPath);
            } else if (value instanceof Object) {
              this.readObject(value, jsonPath);
            }else{
              this.map[jsonPath] = value;
            }
          }
        }
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in reading the Object.",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component readArray
     * Helper method to parse the backend response
     * array{JSONArray} - array of records
     * jsonPath{String} - jsonPath traversed till the search field is reachable
     */
    readArray: function(array, jsonPath) {
      var self = this;
      try
      {
        var parentPath = jsonPath;
        for (var i = 0; i < array.length; i++) {
          var value = array[i];
          jsonPath = parentPath + "[" + i + "]";
          if (value instanceof Array) {
            this.readArray(value, jsonPath);
          } else if (value instanceof Object) {
            this.readObject(value, jsonPath);
          } else { // is a value
            if(isNaN(value) && (value.indexOf("{")>-1 ||value.indexOf("[")>-1))
              value=eval('('+value+')');
            if (value instanceof Array) {
              this.readArray(value, jsonPath);
            } else if (value instanceof Object) {
              this.readObject(value, jsonPath);
            }else{
              this.map[jsonPath] = value;
            }
          }
        }
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in reading the array.",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component setSegmentHeader
     * Responsible to set the data and UI to the header.
     */
    setSegmentHeader: function(){
      var self = this;
      try
      {
        var selectTab;
        if(this.selectedTab === 6)
        {
          selectTab = "this._tab6Criteria"+this.selectedTab.toString();
        }
        else
        {
          selectTab = "this._filterTab"+this.selectedTab.toString();
        }
        var columnVisibility = this.getFieldValue(eval(selectTab),"ColumnVisiblity");
        for(var i = 1; i <= 6; i++){
          var column = "this._dataGridColumn";
          if(columnVisibility["column" + i])
            this.view["flxColumn" + i].setVisibility(columnVisibility["column" + i]);
          else
            this.view["flxColumn" + i].setVisibility(false);
          if(this.view["flxColumn"+i].isVisible){
            this.view["lblColumn"+i].text = this.getFieldValue(eval(column+i),"title");
            var sortBy = this.getFieldValue(eval(column+i),"sortBy");
            var align = this.getFieldValue(eval(column+i),"alignment");
            if(align === "right")
              {
                this.view["imgColumn"+i+"Right"].setVisibility(false);
                this.view["imgColumn"+i+"Left"].setVisibility(!this.isEmptyNullUndefined(sortBy));
                this.view["flxColumn" + i].reverseLayoutDirection = true;                
              }
            else
              {
                this.view["imgColumn"+i+"Right"].setVisibility(!this.isEmptyNullUndefined(sortBy));
                this.view["imgColumn"+i+"Left"].setVisibility(false);
                this.view["flxColumn" + i].reverseLayoutDirection = false;
              }
            var defaultSorting = this.getFieldValue(eval(column+i),"defaultSorting");
            if(defaultSorting && this.tabNavigation){
              let order = this.getFieldValue(eval(column+i),"order")
              if(order && order == "desc"){
                self.view["imgColumn"+i+"Right"].src = JSON.parse(self._iconColumnSortDesc)["img"];
                self.view["imgColumn"+i+"Left"].src = JSON.parse(self._iconColumnSortDesc)["img"];
                this.sorting = order;
              }
              else if(order && order == "asc"){
                self.view["imgColumn"+i+"Right"].src = JSON.parse(self._iconColumnSortAsc)["img"];
                self.view["imgColumn"+i+"Left"].src = JSON.parse(self._iconColumnSortAsc)["img"];
                this.sorting = order;
              }
              else{
                self.view["imgColumn"+i+"Right"].src = JSON.parse(self._iconColumnSort)["img"];
                 self.view["imgColumn"+i+"Left"].src = JSON.parse(self._iconColumnSort)["img"];
                this.sorting = "desc";
              }
              this.tabNavigation = false;
            }
            this.view["lblColumn"+i].skin = this._sknTableHeaderText;
            this.view["flxColumn"+i].width = this.getFieldValue(eval("this._dataGridColumn"+i),"width");
          }
        }
        this.view.flxSort.skin = this._sknTableHeader;
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting the heading of the segment",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component setTab6SegmentHeader
     * Responsible to set the data and UI to the header.
     */
    setTab6SegmentHeader: function(){
      var self = this;
      try
      {
        var columnVisibility = this.getFieldValue(self._tab6Title,"ColumnVisiblity");
        for(var i = 1; i <= 6; i++){
          var column = "this._tab6DataGridColumn";
          if(columnVisibility["column" + i])
            this.view["flxColumn" + i].setVisibility(columnVisibility["column" + i]);
          else
            this.view["flxColumn" + i].setVisibility(false);
          if(this.view["flxColumn"+i].isVisible){
            this.view["lblColumn"+i].text = this.getFieldValue(eval(column+i),"title");
            var sortBy = this.getFieldValue(eval(column+i),"sortBy");
            var align = this.getFieldValue(eval(column+i),"alignment");
            if(align === "right")
              {
                this.view["imgColumn"+i+"Right"].setVisibility(false);
                this.view["imgColumn"+i+"Left"].setVisibility(!this.isEmptyNullUndefined(sortBy));
                this.view["flxColumn" + i].reverseLayoutDirection = true;
              }
            else
              {
                this.view["imgColumn"+i+"Right"].setVisibility(!this.isEmptyNullUndefined(sortBy));
                this.view["imgColumn"+i+"Left"].setVisibility(false);
                this.view["flxColumn" + i].reverseLayoutDirection = false;
              }
            var defaultSorting = this.getFieldValue(eval(column+i),"defaultSorting");
            if(defaultSorting && this.tabNavigation){
              let order = this.getFieldValue(eval(column+i),"order")
              if(order && order == "desc"){
                self.view["imgColumn"+i+"Right"].src = JSON.parse(self._iconColumnSortDesc)["img"];
                self.view["imgColumn"+i+"Left"].src = JSON.parse(self._iconColumnSortDesc)["img"];
                this.sorting = order;
              }
              else if(order && order == "asc"){
                self.view["imgColumn"+i+"Right"].src = JSON.parse(self._iconColumnSortAsc)["img"];
                self.view["imgColumn"+i+"Left"].src = JSON.parse(self._iconColumnSortAsc)["img"];
                this.sorting = order;
              }
              else{
                self.view["imgColumn"+i+"Right"].src = JSON.parse(self._iconColumnSort)["img"];
                 self.view["imgColumn"+i+"Left"].src = JSON.parse(self._iconColumnSort)["img"];
                this.sorting = "desc";
              }
              this.tabNavigation = false;
            }
            this.view["lblColumn"+i].skin = this._sknTableHeaderText;
            this.view["flxColumn"+i].width = this.getFieldValue(eval("this._tab6DataGridColumn"+i),"width");
          }
        }
        this.view.flxSort.skin = this._sknTableHeader;
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting the heading of the segment",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component updateTransactions
     * Responsible to set the data and UI to the segment.
     */
    updateTransactions: function(transactionData) {
      var self = this;
      try{
        this.setSegmentHeader();
        var selectedTab = "this._filterTab"+this.selectedTab.toString();
        var columnVisibility = this.getFieldValue(eval(selectedTab),"ColumnVisiblity");
        var scopeObj = this;
        var transactions = transactionData;
        if(this.isEmptyNullUndefined(transactionData)){
          transactions = this.response;
        }
		var recordsLength = 0;
        if(transactionData && transactionData.length>0){
          transactionData.length = transactionData.length;
        }
        self.view.paginationFooter.updatePaginationBar(recordsLength,this.totalRecords);      
        if(typeof(transactions) == "string" || transactions.length <= 0) {
          this.view.segTransactions.setVisibility(false);
          this.view.flxNoTransactions.setVisibility(true);
        } else {
          this.view.segTransactions.setVisibility(true);
          this.view.flxNoTransactions.setVisibility(false);
          var section1Array = [];
          var section2Array = [];
          var unicode = this._transactionListIdentifier;
          var collection = this.getFieldValue(this._transactionListArray);
          var currentBreakPoint=kony.application.getCurrentBreakpoint();
          var typeKey1 = Object.keys(this.transactionListTypes)[0];
          var typeKey2 = Object.keys(this.transactionListTypes)[1];
          this.parserUtilsManager.setResponseData(unicode,collection);
          for(var i = 0; i < transactions.length; i++){
            var record = {};
            record["data"] = transactions[i];
            record["flxDropdown"] = {
              onClick : scopeObj.onToggle.bind(scopeObj),
            };
            record["imgDropdown"] = {
              skin : JSON.parse(scopeObj._iconRowExpand)["skin"],
              text : JSON.parse(scopeObj._iconRowExpand)["vizIcon"]
            };
            if(currentBreakPoint == "640")
            {
              record["lblTransactionDescription"] = {
                text : scopeObj.getFormattedData(transactions[i][scopeObj.getFieldValue(scopeObj._mobileDataGridField1,"mapping")],scopeObj.getFieldValue(scopeObj._mobileDataGridField1, "fieldType"),transactions[i][scopeObj.getFieldValue(scopeObj._mobileDataGridField1, "currencyCode")]).text,
                skin : scopeObj._sknMBFieldValueBig,
              };
              if(record["lblTransactionDescription"].text!==undefined && record["lblTransactionDescription"].text!==null && record["lblTransactionDescription"].text.length>25)
                record["lblTransactionDescription"].text = record["lblTransactionDescription"].text.substring(0,25)+"...";    
              record["lblDescription"] = {
                text : scopeObj.getFormattedData(transactions[i][scopeObj.getFieldValue(scopeObj._mobileDataGridField1,"mapping")],scopeObj.getFieldValue(scopeObj._mobileDataGridField1, "fieldType"),transactions[i][scopeObj.getFieldValue(scopeObj._mobileDataGridField1, "currencyCode")]).text,
                skin : scopeObj._sknMBFieldValueBig,
              };
             record["flxDescription"] = {
                isVisible : true,
                width : scopeObj.getFieldValue(scopeObj._mobileDataGridField1,"width")
              };
              record["lblAmount"] = {
                text : scopeObj.getFormattedData(transactions[i][scopeObj.getFieldValue(scopeObj._mobileDataGridField2,"mapping")],scopeObj.getFieldValue(scopeObj._mobileDataGridField2, "fieldType"),transactions[i][scopeObj.getFieldValue(scopeObj._mobileDataGridField2, "currencyCode")]).text,
                skin : scopeObj._sknValueField
              };
              record["flxAmount"] = {
                isVisible : true,
                width : scopeObj.getFieldValue(scopeObj._mobileDataGridField2,"width")
              };
              record["lblDate"] ={
                text : scopeObj.getFormattedData(transactions[i][scopeObj.getFieldValue(scopeObj._mobileDataGridField3,"mapping")],scopeObj.getFieldValue(scopeObj._mobileDataGridField3, "fieldType"),transactions[i][scopeObj.getFieldValue(scopeObj._mobileDataGridField3, "currencyCode")]).text,
                skin : scopeObj._sknMBFieldValueSmall,
              };
              record["flxDate"] = {
                isVisible : true,
                width : scopeObj.getFieldValue(scopeObj._mobileDataGridField3,"width")
              };
            }
            else
            {
              if(columnVisibility["column1"]){
                record["lblDate"] ={
                  text : scopeObj.getFormattedData(transactions[i][scopeObj.getFieldValue(scopeObj._dataGridColumn1,"mapping")],scopeObj.getFieldValue(scopeObj._dataGridColumn1, "fieldType"),transactions[i][scopeObj.getFieldValue(scopeObj._dataGridColumn1, "currencyCode")]).text,
                  skin : scopeObj._sknValueField,
                };
                record["flxDate"] = {
                  isVisible : columnVisibility["column1"],
                  width : scopeObj.getFieldValue(scopeObj._dataGridColumn1,"width")
                };
                var align = scopeObj.getFieldValue(scopeObj._dataGridColumn1,"alignment")
                if(align=="right")
                  {
                     record["flxDate"].reverseLayoutDirection = true;
                  }
                else
                  {
                     record["flxDate"].reverseLayoutDirection = false;
                  }
              }
              else{
                record["flxDate"] = {isVisible : false};
              }
              if(columnVisibility["column2"]){
                record["lblTransactionDescription"] = {
                  text : scopeObj.getFormattedData(transactions[i][scopeObj.getFieldValue(scopeObj._dataGridColumn2,"mapping")],scopeObj.getFieldValue(scopeObj._dataGridColumn2, "fieldType"),transactions[i][scopeObj.getFieldValue(scopeObj._dataGridColumn2, "currencyCode")]).text,
                  skin : scopeObj._sknValueField,
                };
                if(record["lblTransactionDescription"].text!==undefined && record["lblTransactionDescription"].text!==null && record["lblTransactionDescription"].text.length>30)
                  record["lblTransactionDescription"].text = record["lblTransactionDescription"].text.substring(0,30)+"...";
                record["lblDescription"] = {
                  text : scopeObj.getFormattedData(transactions[i][scopeObj.getFieldValue(scopeObj._dataGridColumn2,"mapping")],scopeObj.getFieldValue(scopeObj._dataGridColumn2, "fieldType"),transactions[i][scopeObj.getFieldValue(scopeObj._dataGridColumn2, "currencyCode")]).text,
                  skin : scopeObj._sknValueField,
                };
                record["flxDescription"] = {
                  isVisible : columnVisibility["column2"],
                  width : scopeObj.getFieldValue(scopeObj._dataGridColumn2,"width")
                };
                var align = scopeObj.getFieldValue(scopeObj._dataGridColumn2,"alignment")
                if(align=="right")
                  {
                     record["flxDescription"].reverseLayoutDirection = true;
                  }
                else
                  {
                     record["flxDescription"].reverseLayoutDirection = false;
                  }
              }
              else{
                record["flxDescription"] = {isVisible : false};
              }
              if(columnVisibility["column3"]){
                record["lblType"] = {
                  text : scopeObj.getFormattedData(transactions[i][scopeObj.getFieldValue(scopeObj._dataGridColumn3,"mapping")],scopeObj.getFieldValue(scopeObj._dataGridColumn3, "fieldType"),transactions[i][scopeObj.getFieldValue(scopeObj._dataGridColumn3, "currencyCode")]).text,
                  skin : scopeObj._sknValueField,
                };
                record["flxType"] = {
                  isVisible : columnVisibility["column3"],
                  width : scopeObj.getFieldValue(scopeObj._dataGridColumn3,"width")
                };
                var align = scopeObj.getFieldValue(scopeObj._dataGridColumn3,"alignment")
                if(align=="right")
                  {
                     record["flxType"].reverseLayoutDirection = true;
                  }
                else
                  {
                     record["flxType"].reverseLayoutDirection = false;
                  }
              }
              else{
                record["flxType"] = {isVisible : false};
              }
              if(columnVisibility["column4"]){
                record["lblAmount"] = {
                  text : scopeObj.getFormattedData(transactions[i][scopeObj.getFieldValue(scopeObj._dataGridColumn4,"mapping")],scopeObj.getFieldValue(scopeObj._dataGridColumn4, "fieldType"),transactions[i][scopeObj.getFieldValue(scopeObj._dataGridColumn4, "currencyCode")]).text,
                  skin : scopeObj._sknValueField
                };
                record["flxAmount"] = {
                  isVisible : columnVisibility["column4"],
                  width : scopeObj.getFieldValue(scopeObj._dataGridColumn4,"width")
                };
                var align = scopeObj.getFieldValue(scopeObj._dataGridColumn4,"alignment")
                if(align=="right")
                  {
                     record["flxAmount"].reverseLayoutDirection = true;
                  }
                else
                  {
                     record["flxAmount"].reverseLayoutDirection = false;
                  }
              }
              else{
                record["flxAmount"] = { isVisible : false};
              }
              if(columnVisibility["column5"]){
                record["lblBalance"] = {
                  text : scopeObj.getFormattedData(transactions[i][scopeObj.getFieldValue(scopeObj._dataGridColumn5,"mapping")],scopeObj.getFieldValue(scopeObj._dataGridColumn5, "fieldType"),transactions[i][scopeObj.getFieldValue(scopeObj._dataGridColumn5, "currencyCode")]).text,
                  skin : scopeObj._sknValueField
                };
                record["flxBalance"] = {
                  isVisible : columnVisibility["column5"],
                  width : scopeObj.getFieldValue(scopeObj._dataGridColumn5,"width")
                };
                var align = scopeObj.getFieldValue(scopeObj._dataGridColumn5,"alignment")
                if(align=="right")
                  {
                     record["flxBalance"].reverseLayoutDirection = true;
                  }
                else
                  {
                     record["flxBalance"].reverseLayoutDirection = false;
                  }
              }
              else{
                record["lblBalance"] = { isVisible : false};
              }
              if(columnVisibility["column6"]){
                record["lblCategory"] = {
                  text : scopeObj.getFormattedData(transactions[i][scopeObj.getFieldValue(scopeObj._dataGridColumn6,"mapping")],scopeObj.getFieldValue(scopeObj._dataGridColumn6, "fieldType"),transactions[i][scopeObj.getFieldValue(scopeObj._dataGridColumn6, "currencyCode")]).text,
                  skin : scopeObj._sknValueField
                };
                record["flxCategory"] = {
                  isVisible : columnVisibility["column6"],
                  width : scopeObj.getFieldValue(scopeObj._dataGridColumn6,"width")
                };
                var align = scopeObj.getFieldValue(scopeObj._dataGridColumn6,"alignment")
                if(align=="right")
                  {
                     record["flxCategory"].reverseLayoutDirection = true;
                  }
                else
                  {
                     record["flxCategory"].reverseLayoutDirection = false;
                  }
              }
              else{
                record["lblCategory"] = { isVisible : false};
              }
            } 
            if(transactions[i][this._segregationDecider] === this.transactionListTypes[typeKey1]["value"]){
              var selectedType = typeKey1;
            }
            else{
              var selectedType = typeKey2;
            }
            for(var j = 1; j <= 10; j++){
              var title = scopeObj.getFieldValue(eval("this._field"+j+"Label"), "text");
              if(typeof(title) != "string"){
                title = scopeObj.getFieldValue(title[selectedType]);
              }
              if(!scopeObj.isEmptyNullUndefined(title)){
                record["lblDetails"+j+"Title"] = {
                  "text": title,
                  "skin": (currentBreakPoint == "640")?scopeObj._sknMBTransactionDetailsLabel:scopeObj._sknTransDetailsLabel
                }
              }
              else{
                record["lblDetails"+j+"Title"] = "";
              }
              var value = scopeObj.getFieldValue(eval("this._field"+j+"Value"), "text");
              value = scopeObj.getFormattedData(transactions[i][scopeObj.getFieldValue(value[selectedType])],scopeObj.getFieldValue(scopeObj.getFieldValue(eval("this._field"+j+"Type"))[selectedType]),transactions[i][scopeObj.getFieldValue(scopeObj.getFieldValue(eval("this._field"+j+"Value"), "currencyCode")[selectedType])]);
              if(!scopeObj.isEmptyNullUndefined(value.text)){
                record["lblDetails"+j+"Value"] = {
                  "text": value.text,
                  "skin": (currentBreakPoint == "640")?scopeObj._sknMBTransactionDetailsValue:value.skin
                }
              }
              else{
                record["lblDetails"+j+"Value"] = "";
              }
              record["flxDetails"+j] = {
                isVisible : (!scopeObj.isEmptyNullUndefined(record["lblDetails"+j+"Title"]) || !scopeObj.isEmptyNullUndefined(record["lblDetails"+j+"Value"].text))
              }
            }
			if(transactions[i].transactionType=="Cheque" || transactions[i].transactionType=="Draft")
            {
              var x = this._checkNumberField.split(" ")[1];
              record["flxDetails"+x].isVisible = true;
              if(record["lblDetails"+x+"Value"] === "")
                {
                  record["lblDetails"+x+"Value"] = {};
                  record["lblDetails"+x+"Value"].text ="NA";
                }
              record["lblDetails"+x+"Value"].skin = this._sknHyperlink;
              record["lblDetails"+x+"Value"].onTouchEnd = function(){
                var data = scopeObj.rowData.data;
                data.id = "Cheque";
                scopeObj.contextualActionButtonOnClick(data);
              };
            }
            else
            {
                var x = this._checkNumberField.split(" ")[1];
                record["flxDetails"+x].isVisible = false;
            }
            if(transactions[i].transactionType=="SwiftPayment")
            {
			  var x = this._swiftTransactionField.split(" ")[1];
              record["lblDetails"+x+"Value"].skin = this._sknHyperlink;
              record["lblDetails"+x+"Value"].onTouchEnd = function(){
                var data = scopeObj.rowData.data;
                data.id = "SwiftPayment";
                scopeObj.contextualActionButtonOnClick(data);
              };
            }
            try{
              let text = scopeObj.getFieldValue(scopeObj._btnContextualAction1,"text");
              text = scopeObj.getFieldValue(text[selectedType]);
              if(!this.isEmptyNullUndefined(text)){
                record["btnDetails1"] = {
                  "text": text,
                  "width": scopeObj.getFieldValue(scopeObj.getFieldValue(scopeObj._btnContextualAction1, "width")[selectedType]),
                  "onClick": function(){
                    var data = scopeObj.rowData.data;
                    data.id = scopeObj.getFieldValue(scopeObj._btnContextualAction1,"id")[selectedType];
                    scopeObj.contextualActionButtonOnClick(data);
                  },
                  "skin": scopeObj.getFieldValue(scopeObj.getFieldValue(scopeObj._btnContextualAction1, "skin")[selectedType])
                }
                record["btnDetails1"]["isVisible"] = !this.isEmptyNullUndefined(record["btnDetails1"].text);
                if(record["btnDetails1"]["isVisible"] && scopeObj.getFieldValue(scopeObj.getFieldValue(scopeObj._btnContextualAction1, "entitlement_action")[selectedType])) {
                  scopeObj.getBtnEntitlement(transactions[i],scopeObj.getFieldValue(scopeObj.getFieldValue(scopeObj._btnContextualAction1, "id")[selectedType]),function(visibility){
                    if(visibility === true) {
                      record["btnDetails1"]["isVisible"] = true;
                    } else{
                      record["btnDetails1"]["isVisible"] = false;
                    }
                  });
                }
//                 else if(this.EntitlementUtils.isEntitled(this.getFieldValue(scopeObj._btnContextualAction1, "entitlement_key"))){
//                    record["btnDetails1"] = {"isVisible":false};
//                 }
              }
              else{
                record["btnDetails1"] = {"isVisible":false};
              }
            }
            catch(e){
              record["btnDetails1"] = {"isVisible":false};
            }
            try{
              let text = scopeObj.getFieldValue(scopeObj._btnContextualAction2,"text");
              text = scopeObj.getFieldValue(text[selectedType]);
                 if(!this.isEmptyNullUndefined(text)){
                record["btnDetails2"] = {
                  "text": text,
                  "width": scopeObj.getFieldValue(scopeObj.getFieldValue(scopeObj._btnContextualAction2, "width")[selectedType]),
                  "onClick": function(){
                    var data = scopeObj.rowData.data;
                    data.id = scopeObj.getFieldValue(scopeObj._btnContextualAction2,"id")[selectedType];
                    scopeObj.contextualActionButtonOnClick(data);
                  },
                  "skin": scopeObj.getFieldValue(scopeObj.getFieldValue(scopeObj._btnContextualAction2, "skin")[selectedType])
                }
                record["btnDetails2"]["isVisible"] = !this.isEmptyNullUndefined(record["btnDetails2"].text);
                if(record["btnDetails2"]["isVisible"] && scopeObj.getFieldValue(scopeObj.getFieldValue(scopeObj._btnContextualAction2, "entitlement_action")[selectedType])) {
                  scopeObj.getBtnEntitlement(transactions[i],scopeObj.getFieldValue(scopeObj.getFieldValue(scopeObj._btnContextualAction2, "id")[selectedType]),function(visibility){
                    if(visibility === true) {
                      record["btnDetails2"]["isVisible"] = true;
                    } else{
                      record["btnDetails2"]["isVisible"] = false;
                    }
                  });
                }
//                 else if(this.EntitlementUtils.isEntitled(this.getFieldValue(scopeObj._btnContextualAction2, "entitlement_key"))){
//                    record["btnDetails2"] = {"isVisible":false};
//                 }
              }
              else{
                record["btnDetails2"] = {"isVisible":false};
              }
            }
            catch(e){
              record["btnDetails2"] = {"isVisible":false};
            }
            try{
              let text = scopeObj.getFieldValue(scopeObj._btnContextualAction3,"text");
              text = scopeObj.getFieldValue(text[selectedType]);
                if(!this.isEmptyNullUndefined(text)){
                record["btnDetails3"] = {
                  "text": text,
                  "width": scopeObj.getFieldValue(scopeObj.getFieldValue(scopeObj._btnContextualAction3, "width")[selectedType]),
                  "onClick": function(){
                    var data = scopeObj.rowData.data;
                    data.id = scopeObj.getFieldValue(scopeObj._btnContextualAction3,"id")[selectedType];
                    scopeObj.contextualActionButtonOnClick(data);
                  },
                  "skin": scopeObj.getFieldValue(scopeObj.getFieldValue(scopeObj._btnContextualAction3, "skin")[selectedType])
                }
                record["btnDetails3"]["isVisible"] = !this.isEmptyNullUndefined(record["btnDetails3"].text);
                if(record["btnDetails3"]["isVisible"] && scopeObj.getFieldValue(scopeObj.getFieldValue(scopeObj._btnContextualAction3, "entitlement_action")[selectedType])) {
                  scopeObj.getBtnEntitlement(transactions[i],scopeObj.getFieldValue(scopeObj.getFieldValue(scopeObj._btnContextualAction3, "id")[selectedType]),function(visibility){
                    if(visibility === true) {
                      record["btnDetails3"]["isVisible"] = true;
                    } else{
                      record["btnDetails3"]["isVisible"] = false;
                    }
                  });
                }
//                 else if(this.EntitlementUtils.isEntitled(this.getFieldValue(scopeObj._btnContextualAction3, "entitlement_key"))){
//                    record["btnDetails3"] = {"isVisible":false};
//                 }
              }
              else{
                record["btnDetails3"] = {"isVisible":false};
              }
            }
            catch(e){
              record["btnDetails3"] = {"isVisible":false};
            }
             try{
              let text = scopeObj.getFieldValue(scopeObj._btnContextualAction4,"text");
               text = scopeObj.getFieldValue(text[selectedType]);
                if(!this.isEmptyNullUndefined(text)){
                record["btnDetails4"] = {
                  "text": text,
                  "width": scopeObj.getFieldValue(scopeObj.getFieldValue(scopeObj._btnContextualAction4, "width")[selectedType]),
                  "onClick": function(){
                    var data = scopeObj.rowData.data;
                    data.id = scopeObj.getFieldValue(scopeObj._btnContextualAction4,"id")[selectedType];
                    scopeObj.contextualActionButtonOnClick(data);
                  },
                  "skin": scopeObj.getFieldValue(scopeObj.getFieldValue(scopeObj._btnContextualAction4, "skin")[selectedType])
                }
                record["btnDetails4"]["isVisible"] = !this.isEmptyNullUndefined(record["btnDetails4"].text);
                if(record["btnDetails4"]["isVisible"] && scopeObj.getFieldValue(scopeObj.getFieldValue(scopeObj._btnContextualAction4, "entitlement_action")[selectedType])) {
                  scopeObj.getBtnEntitlement(transactions[i],scopeObj.getFieldValue(scopeObj.getFieldValue(scopeObj._btnContextualAction4, "id")[selectedType]),function(visibility){
                    if(visibility === true) {
                      record["btnDetails4"]["isVisible"] = true;
                    } else{
                      record["btnDetails4"]["isVisible"] = false;
                    }
                  });
                }
//                 else if(this.EntitlementUtils.isEntitled(this.getFieldValue(scopeObj._btnContextualAction4, "entitlement_key"))){
//                    record["btnDetails4"] = {"isVisible":false};
//                 }
              }
              else{
                record["btnDetails4"] = {"isVisible":false};
              }
            }
            catch(e){
              record["btnDetails4"] = {"isVisible":false};
            }
            record["lblSeparator"] = {
              "text":".",
              "skin":scopeObj._sknRowSeperator
            };
            if(transactions[i][this._segregationDecider].toUpperCase() == this.transactionListTypes[typeKey2].value.toUpperCase())
              section2Array.push(record);
            else
              section1Array.push(record);
          }
          if(section1Array.length == 0){
            var sectionData = [
              [
                {"lblTransactionHeader":{
                  "text" : this.transactionListTypes[typeKey2]["displayText"],
                  "skin" : this._sknPostedLabel
                }},section2Array
              ]
            ]
            }
          else if(section2Array.length == 0){
            var sectionData = [
              [
                {"lblTransactionHeader":{
                  "text" : this.transactionListTypes[typeKey1]["displayText"],
                  "skin" : this._sknPendingLabel
                }},section1Array
              ]
            ]
            }
          else{
            var sectionData = [
              [
                {"lblTransactionHeader":{
                  "text" : this.transactionListTypes[typeKey1]["displayText"],
                  "skin" : this._sknPendingLabel
                }},section1Array
              ]
              ,
              [
                {"lblTransactionHeader":{
                  "text" : this.transactionListTypes[typeKey2]["displayText"],
                  "skin" : this._sknPostedLabel
                }},section2Array
              ]
            ];
          }
          this.view.segTransactions.widgetDataMap = {
            "btnRepeat": "btnRepeat",
            "lblNoteTitle": "lblNoteTitle",
            "lblNoteValue": "lblNoteValue",
            "lblFrequencyTitle": "lblFrequencyTitle",
            "lblFrequencyValue": "lblFrequencyValue",
            "lblRecurrenceTitle": "lblRecurrenceTitle",
            "lblRecurrenceValue": "lblRecurrenceValue",
            "btnDisputeTransaction": "btnDisputeTransaction",
            "data": "data",
            "btnDownload": "btnDownload",
            "btnViewRequests": "btnViewRequests",
            "imgError": "imgError",
            "imgWarning": "imgWarning",
            "lblDisputedWarning": "lblDisputedWarning",
            "btnEditRule": "btnEditRule",
            "btnPrint": "btnPrint",
            "cbxRememberCategory": "cbxRememberCategory",
            "flxActions": "flxActions",
            "flxActionsWrapper": "flxActionsWrapper",
            "flxAmount": "flxAmount",
            "flxBalance": "flxBalance",
            "flxCategory": "flxCategory",
            "flxDate": "flxDate",
            "flxDescription": "flxDescription",
            "flxDetail": "flxDetail",
            "flxDetailData": "flxDetailData",
            "flxDetailHeader": "flxDetailHeader",
            "flxDropdown": "flxDropdown",
            "flxIdentifier": "flxIdentifier",
            "flxInformation": "flxInformation",
            "flxLeft": "flxLeft",
            "flxMemo": "flxMemo",
            "flxRight": "flxRight",
            "flxSegTransactionHeader": "flxSegTransactionHeader",
            "flxSegTransactionRowSavings": "flxSegTransactionRowSavings",
            "flxSegTransactionRowSelected": "flxSegTransactionRowSelected",
            "flxSegTransactionRowWrapper": "flxSegTransactionRowWrapper",
            "flxSelectedRowWrapper": "flxSelectedRowWrapper",
            "flxToData": "flxToData",
            "flxDetails2": "flxDetails2",
            "flxType": "flxType",
            "flxDetails1": "flxDetails1",
            "flxTypeHeader": "flxTypeHeader",
            "flxWithdrawalAmountData": "flxWithdrawalAmountData",
            "flxDetails4": "flxDetails4",
            "flxDetails5": "flxDetails5",
            "flxDetails6": "flxDetails6",
            "flxDetails7": "flxDetails7",
            "flxDetails8": "flxDetails8",
            "flxDetails9": "flxDetails9",
            "flxDetails10": "flxDetails10",
            "flxWrapper": "flxWrapper",
            "imgCategoryDropdown": "imgCategoryDropdown",
            "imgDropdown": "imgDropdown",
            "imgType": "imgType",
            "lblType": "lblType",
            "lblAmount": "lblAmount",
            "lblBalance": "lblBalance",
            "lblCategory": "lblCategory",
            "lblDate": "lblDate",
            "lblDescription": "lblDescription",
            "lblTransactionDescription": "lblTransactionDescription",
            "lblIdentifier": "lblIdentifier",
            "lblSeparator": "lblSeparator",
            "lblSeparatorActions": "lblSeparatorActions",
            "lblSeparatorDetailData": "lblSeparatorDetailData",
            "lblSeparatorDetailHeader": "lblSeparatorDetailHeader",
            "lblDetails2Title": "lblDetails2Title",
            "lblDetails2Value": "lblDetails2Value",
            "lblTransactionHeader": "lblTransactionHeader",
            "lblDetails1Title": "lblDetails1Title",
            "lblDetails1Value": "lblDetails1Value",
            "lblDetails4Title": "lblDetails4Title",
            "lblDetails4Value": "lblDetails4Value",
            "lblDetails3Title": "lblDetails3Title",
            "lblDetails3Value": "lblDetails3Value",
            "lblDetails5Title": "lblDetails5Title",
            "lblDetails5Value": "lblDetails5Value",
            "lblDetails6Title": "lblDetails6Title",
            "lblDetails6Value": "lblDetails6Value",
            "lblDetails7Title": "lblDetails7Title",
            "lblDetails7Value": "lblDetails7Value",
            "lblDetails8Title": "lblDetails8Title",
            "lblDetails8Value": "lblDetails8Value",
            "lblDetails9Title": "lblDetails9Title",
            "lblDetails9Value": "lblDetails9Value",
            "lblDetails10Title": "lblDetails10Title",
            "lblDetails10Value": "lblDetails10Value",
            "txtMemo": "txtMemo",
            "CopyflxToHeader0g61ceef5594d41": "CopyflxToHeader0g61ceef5594d41",
            "CopylblToTitle0a2c47b22996e4f": "CopylblToTitle0a2c47b22996e4f",
            "flxBankName1": "flxBankName1",
            "flxBankName2": "flxBankName2",
            "flxCash": "flxCash",
            "flxCheck1": "flxCheck1",
            "flxCheck1Ttitle": "flxCheck1Ttitle",
            "flxCheck2": "flxCheck2",
            "flxCheck2Ttitle": "flxCheck2Ttitle",
            "flxCheckImage": "flxCheckImage",
            "flxCheckImage2Icon": "flxCheckImage2Icon",
            "flxCheckImageIcon": "flxCheckImageIcon",
            "flxRememberCategory": "flxRememberCategory",
            "flxSegCheckImages": "flxSegCheckImages", 
            "flxTotal": "flxTotal",
            "flxTotalValue": "flxTotalValue",
            "flxTransactionFee": "flxTransactionFee",
            "flxFrequencyTitle": "flxFrequencyTitle",
            "flxRecurrenceTitle": "flxRecurrenceTitle",
            "flxDetails3": "flxDetails3",
            "flxWithdrawalAmount": "flxWithdrawalAmount",
            "flxWithdrawalAmountCash": "flxWithdrawalAmountCash",
            "flxWithdrawalAmountCheck1": "flxWithdrawalAmountCheck1",
            "flxWithdrawalAmountCheck2": "flxWithdrawalAmountCheck2",
            "imgCheckimage": "imgCheckimage",
            "imgCheckImage1Icon": "imgCheckImage1Icon",
            "imgCheckImage2Icon": "imgCheckImage2Icon",
            "imgRememberCategory": "imgRememberCategory",
            "lblTransactionFeeKey": "lblTransactionFeeKey",
            "lblTransactionFeeValue": "lblTransactionFeeValue",
            "lblBankName1": "lblBankName1",
            "lblBankName2": "lblBankName2",
            "lblCheck1Ttitle": "lblCheck1Ttitle",
            "lblCheck2Ttitle": "lblCheck2Ttitle",
            "lblRememberCategory": "lblRememberCategory",
            "lblSeparator2": "lblSeparator2",
            "lblSeperatorhor1": "lblSeperatorhor1",
            "lblSeperatorhor2": "lblSeperatorhor2",
            "lblSeperatorhor3": "lblSeperatorhor3",
            "lblSeperatorhor4": "lblSeperatorhor4",
            "lblSeperatorhor5": "lblSeperatorhor5",
            "lblTotalValue": "lblTotalValue",
            "lblWithdrawalAmount": "lblWithdrawalAmount",
            "lblWithdrawalAmountCash": "lblWithdrawalAmountCash",
            "lblWithdrawalAmountCheck1": "lblWithdrawalAmountCheck1",
            "lblWithdrawalAmountCheck2": "lblWithdrawalAmountCheck2",
            "segCheckImages": "segCheckImages",
            "txtFieldMemo": "txtFieldMemo",
            "lblToTitle2": "lblToTitle2",
            "lblTypeTitle2": "lblTypeTitle2",
            "lblWithdrawalAmountTitle2": "lblWithdrawalAmountTitle2",
            "btnDetails1": "btnDetails1",
            "btnDetails2": "btnDetails2",
            "btnDetails3": "btnDetails3",
            "btnDetails4": "btnDetails4",
            "accountId" : scopeObj.getFieldValue(scopeObj._TLaccountId),
            "accountType" : scopeObj.getFieldValue(scopeObj._TLaccountType)
          };
          this.view.segTransactions.rowTemplate = this.rowTemplate;
          this.view.segTransactions.sectionHeaderTemplate = "ICFlxSegTransactionHeader";
          this.view.segTransactions.removeAll(); 
          this.view.segTransactions.setData(sectionData);
          try{
            this.adjustScreen();
          }
          catch(e)
          {
            kony.print(e);
          }
        }
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in updating the transactions in segment",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },

    /**
     * Component updateTab6Transactions
     * Responsible to set the data and UI to the segment.
     */
    updateTab6Transactions: function(transactionData) {
      var self = this;
      try{
        this.setTab6SegmentHeader();
        var columnVisibility = this.getFieldValue(self._tab6Title,"ColumnVisiblity");
        var scopeObj = this;
        var transactions = transactionData;
        if(this.isEmptyNullUndefined(transactionData)){
          transactions = this.tab6Response;
        }
		var recordsLength = 0;
        if(transactionData && transactionData.length>0){
          recordsLength = transactionData.length;
        }
        self.view.paginationFooter.updatePaginationBar(recordsLength,this.totalRecords);                
        if(typeof(transactions) == "string" || transactions.length == 0){
          this.view.segTransactions.setVisibility(false);
          this.view.flxNoTransactions.setVisibility(true);
        } else {
          this.view.segTransactions.setVisibility(true);
          this.view.flxNoTransactions.setVisibility(false);
          var section1Array = [];
          var section2Array = [];
          var section3Array = [];
          var collection = this.getFieldValue(this._tab6TransactionListArray);
          var currentBreakPoint=kony.application.getCurrentBreakpoint();
          var typeKey1 = Object.keys(this.transactionListTypes)[2];
          var typeKey2 = Object.keys(this.transactionListTypes)[3];
          for(var i = 0; i < transactions.length; i++){
            var record = {};
            record["data"] = transactions[i];
            if(this.accountType=="Loan")
            {
              record["flxDropdown"] = {
                isVisble : true,
                onClick : scopeObj.onToggle.bind(scopeObj)
              };
              record["imgDropdown"] = {
                skin : JSON.parse(scopeObj._iconRowExpand)["skin"],
                text : JSON.parse(scopeObj._iconRowExpand)["vizIcon"]
              };
            }
            else
            {
              record["flxDropdown"] = {
                isVisible : false
              };
              record["imgDropdown"] = {
              };
            }
            if(currentBreakPoint == "640")
            {          
               record["lblTransactionDescription"] = {
                  text : scopeObj.getFormattedData(transactions[i][scopeObj.getFieldValue(scopeObj._tab6MobileDataGridField1,"mapping")],scopeObj.getFieldValue(scopeObj._tab6MobileDataGridField1, "fieldType"),transactions[i][scopeObj.getFieldValue(scopeObj._tab6MobileDataGridField1, "currencyCode")]).text,
                  skin : scopeObj._sknMBFieldValueBig,
                };
              if(record["lblTransactionDescription"].text!==undefined && record["lblTransactionDescription"].text!==null && record["lblTransactionDescription"].text.length>25)
                  record["lblTransactionDescription"].text = record["lblTransactionDescription"].text.substring(0,25)+"...";                 
               record["lblDescription"] = {
                text : scopeObj.getFormattedData(transactions[i][scopeObj.getFieldValue(scopeObj._tab6MobileDataGridField1,"mapping")],scopeObj.getFieldValue(scopeObj._tab6MobileDataGridField1, "fieldType"),transactions[i][scopeObj.getFieldValue(scopeObj._tab6MobileDataGridField1, "currencyCode")]).text,
                skin : scopeObj._sknMBFieldValueBig,
              };
              record["flxDescription"] = {
                isVisible : true,
                width : scopeObj.getFieldValue(scopeObj._tab6MobileDataGridField1,"width")
              };
              record["lblAmount"] = {
                text : scopeObj.getFormattedData(transactions[i][scopeObj.getFieldValue(scopeObj._tab6MobileDataGridField2,"mapping")],scopeObj.getFieldValue(scopeObj._tab6MobileDataGridField2, "fieldType"),transactions[i][scopeObj.getFieldValue(scopeObj._tab6MobileDataGridField2, "currencyCode")]).text,
                skin : scopeObj._sknValueField
              };
              record["flxAmount"] = {
                isVisible : true,
                width : scopeObj.getFieldValue(scopeObj._tab6MobileDataGridField2,"width")
              };
              record["lblDate"] ={
                text : scopeObj.getFormattedData(transactions[i][scopeObj.getFieldValue(scopeObj._tab6MobileDataGridField3,"mapping")],scopeObj.getFieldValue(scopeObj._tab6MobileDataGridField3, "fieldType"),transactions[i][scopeObj.getFieldValue(scopeObj._tab6MobileDataGridField3, "currencyCode")]).text,
                skin : scopeObj._sknMBFieldValueSmall,
              };
              record["flxDate"] = {
                isVisible : true,
                width : scopeObj.getFieldValue(scopeObj._tab6MobileDataGridField3,"width")
              };
            }
            else
            {
              if(columnVisibility["column1"]){
                record["lblDate"] ={
                  text : scopeObj.getFormattedData(transactions[i][scopeObj.getFieldValue(scopeObj._tab6DataGridColumn1,"mapping")],scopeObj.getFieldValue(scopeObj._tab6DataGridColumn1, "fieldType"),transactions[i][scopeObj.getFieldValue(scopeObj._tab6DataGridColumn1, "currencyCode")]).text,
                  skin : scopeObj._sknValueField,
                };
                record["flxDate"] = {
                  isVisible : columnVisibility["column1"],
                  width : scopeObj.getFieldValue(scopeObj._tab6DataGridColumn1,"width")
                };
                var align = scopeObj.getFieldValue(scopeObj._tab6DataGridColumn1,"alignment")
                if(align=="right")
                  {
                     record["flxDate"].reverseLayoutDirection = true;
                  }
                else
                  {
                     record["flxDate"].reverseLayoutDirection = false;
                  }
              }
              else{
                record["flxDate"] = {isVisible : false};
              }
              if(columnVisibility["column2"]){
                record["lblTransactionDescription"] = {
                  text : scopeObj.getFormattedData(transactions[i][scopeObj.getFieldValue(scopeObj._tab6DataGridColumn2,"mapping")],scopeObj.getFieldValue(scopeObj._tab6DataGridColumn2, "fieldType"),transactions[i][scopeObj.getFieldValue(scopeObj._tab6DataGridColumn2, "currencyCode")]).text,
                  skin : scopeObj._sknValueField,
                };
                if(record["lblTransactionDescription"].text!==undefined && record["lblTransactionDescription"].text!==null && record["lblTransactionDescription"].text.length>30)
                  record["lblTransactionDescription"].text = record["lblTransactionDescription"].text.substring(0,30)+"...";
                record["lblDescription"] = {
                  text : scopeObj.getFormattedData(transactions[i][scopeObj.getFieldValue(scopeObj._tab6DataGridColumn2,"mapping")],scopeObj.getFieldValue(scopeObj._tab6DataGridColumn2, "fieldType"),transactions[i][scopeObj.getFieldValue(scopeObj._tab6DataGridColumn2, "currencyCode")]).text,
                  skin : scopeObj._sknValueField,
                };
                record["flxDescription"] = {
                  isVisible : columnVisibility["column2"],
                  width : scopeObj.getFieldValue(scopeObj._tab6DataGridColumn2,"width")
                };
                var align = scopeObj.getFieldValue(scopeObj._tab6DataGridColumn2,"alignment")
                if(align=="right")
                  {
                     record["flxDescription"].reverseLayoutDirection = true;
                  }
                else
                  {
                     record["flxDescription"].reverseLayoutDirection = false;
                  }
              }
              else{
                record["flxDescription"] = {isVisible : false};
              }
              if(columnVisibility["column3"]){
                record["lblType"] = {
                  text : scopeObj.getFormattedData(transactions[i][scopeObj.getFieldValue(scopeObj._tab6DataGridColumn3,"mapping")],scopeObj.getFieldValue(scopeObj._tab6DataGridColumn3, "fieldType"),transactions[i][scopeObj.getFieldValue(scopeObj._tab6DataGridColumn3, "currencyCode")]).text,
                  skin : scopeObj._sknValueField,
                };
                record["flxType"] = {
                  isVisible : columnVisibility["column3"],
                  width : scopeObj.getFieldValue(scopeObj._tab6DataGridColumn3,"width")
                };
                var align = scopeObj.getFieldValue(scopeObj._tab6DataGridColumn3,"alignment")
                if(align=="right")
                  {
                     record["flxType"].reverseLayoutDirection = true;
                  }
                else
                  {
                     record["flxType"].reverseLayoutDirection = false;
                  }
              }
              else{
                record["flxType"] = {isVisible : false};
              }
              if(columnVisibility["column4"]){
                record["lblAmount"] = {
                  text : scopeObj.getFormattedData(transactions[i][scopeObj.getFieldValue(scopeObj._tab6DataGridColumn4,"mapping")],scopeObj.getFieldValue(scopeObj._tab6DataGridColumn4, "fieldType"),transactions[i][scopeObj.getFieldValue(scopeObj._tab6DataGridColumn4, "currencyCode")]).text,
                  skin : scopeObj._sknValueField
                };
                record["flxAmount"] = {
                  isVisible : columnVisibility["column4"],
                  width : scopeObj.getFieldValue(scopeObj._tab6DataGridColumn4,"width")
                };
                var align = scopeObj.getFieldValue(scopeObj._tab6DataGridColumn4,"alignment")
                if(align=="right")
                  {
                     record["flxAmount"].reverseLayoutDirection = true;
                  }
                else
                  {
                     record["flxAmount"].reverseLayoutDirection = false;
                  }
              }
              else{
                record["flxAmount"] = { isVisible : false};
              }
              if(columnVisibility["column5"]){
                record["lblBalance"] = {
                  text : scopeObj.getFormattedData(transactions[i][scopeObj.getFieldValue(scopeObj._tab6DataGridColumn5,"mapping")],scopeObj.getFieldValue(scopeObj._tab6DataGridColumn5, "fieldType"),transactions[i][scopeObj.getFieldValue(scopeObj._tab6DataGridColumn5, "currencyCode")]).text,
                  skin : scopeObj._sknValueField
                };
                record["flxBalance"] = {
                  isVisible : columnVisibility["column5"],
                  width : scopeObj.getFieldValue(scopeObj._tab6DataGridColumn5,"width")
                };
                var align = scopeObj.getFieldValue(scopeObj._tab6DataGridColumn5,"alignment")
                if(align=="right")
                  {
                     record["flxBalance"].reverseLayoutDirection = true;
                  }
                else
                  {
                     record["flxBalance"].reverseLayoutDirection = false;
                  }
              }
              else{
                record["lblBalance"] = { isVisible : false};
              }
              if(columnVisibility["column6"]){
                record["lblCategory"] = {
                  text : scopeObj.getFormattedData(transactions[i][scopeObj.getFieldValue(scopeObj._tab6DataGridColumn6,"mapping")],scopeObj.getFieldValue(scopeObj._tab6DataGridColumn6, "fieldType"),transactions[i][scopeObj.getFieldValue(scopeObj._tab6DataGridColumn6, "currencyCode")]).text,
                  skin : scopeObj._sknValueField
                };
                record["flxCategory"] = {
                  isVisible : columnVisibility["column6"],
                  width : scopeObj.getFieldValue(scopeObj._tab6DataGridColumn6,"width")
                };
                var align = scopeObj.getFieldValue(scopeObj._tab6DataGridColumn6,"alignment")
                if(align=="right")
                  {
                     record["flxCategory"].reverseLayoutDirection = true;
                  }
                else
                  {
                     record["flxCategory"].reverseLayoutDirection = false;
                  }
              }
              else{
                record["lblCategory"] = { isVisible : false};
              }
            } 
            if(transactions[i]["installmentType"]!==null && transactions[i]["installmentType"]!== undefined && transactions[i]["installmentType"].toUpperCase() === this.transactionListTypes[typeKey1]["value"].toUpperCase()){
              var selectedType = typeKey1;
            }
            else{
              var selectedType = typeKey2;
            }
            for(var j = 1; j <= 10; j++){
              var title = scopeObj.getFieldValue(eval("this._tab6Field"+j+"Label"), "text");
              if(typeof(title) != "string"){
                title = scopeObj.getFieldValue(title[selectedType]);
              }
              if(!scopeObj.isEmptyNullUndefined(title)){
                record["lblDetails"+j+"Title"] = {
                  "text": title,
                  "skin": (currentBreakPoint == "640")?scopeObj._sknMBTransactionDetailsLabel:scopeObj._sknTransDetailsLabel
                }
              }
              else{
                record["lblDetails"+j+"Title"] = "";
              }
              var value = scopeObj.getFieldValue(eval("this._tab6Field"+j+"Value"), "text");
              value = scopeObj.getFormattedData(transactions[i][scopeObj.getFieldValue(value[selectedType])],scopeObj.getFieldValue(scopeObj.getFieldValue(eval("this._tab6Field"+j+"Type"))[selectedType]),transactions[i][scopeObj.getFieldValue(scopeObj.getFieldValue(eval("this._tab6Field"+j+"Value"), "currencyCode")[selectedType])]);
              if(!scopeObj.isEmptyNullUndefined(value.text)){
                record["lblDetails"+j+"Value"] = {
                  "text": value.text,
                  "skin": (currentBreakPoint == "640")?scopeObj._sknMBTransactionDetailsValue:value.skin
                }
              }
              else{
                record["lblDetails"+j+"Value"] = "";
              }
              record["flxDetails"+j] = {
                isVisible : (!scopeObj.isEmptyNullUndefined(record["lblDetails"+j+"Title"]) || !scopeObj.isEmptyNullUndefined(record["lblDetails"+j+"Value"].text))
              }
            }
            try{
              let text = scopeObj.getFieldValue(scopeObj._tab6BtnContextualAction1,"text");
              text = scopeObj.getFieldValue(text[selectedType])
              if(!this.isEmptyNullUndefined(text)){
                record["btnDetails1"] = {
                  "text": text,
                  "width": scopeObj.getFieldValue(scopeObj.getFieldValue(scopeObj._tab6BtnContextualAction1, "width")[selectedType]),
                  "onClick": function() {
                    var data = scopeObj.rowData.data;
                    if (data["installmentType"] !== null && data["installmentType"] !== undefined && data["installmentType"].toUpperCase() === scopeObj.transactionListTypes[typeKey1]["value"].toUpperCase()) {
                      var selectedType = typeKey1;
                    } else {
                      var selectedType = typeKey2;
                    }
                    data.id = scopeObj.getFieldValue(scopeObj._tab6BtnContextualAction1, "id")[selectedType];
                    scopeObj.contextualActionButtonOnClick(data);
                  },
                  "skin": scopeObj.getFieldValue(scopeObj.getFieldValue(scopeObj._tab6BtnContextualAction1, "skin")[selectedType])
                }
                record["btnDetails1"]["isVisible"] = !this.isEmptyNullUndefined(record["btnDetails1"].text);
                if(record["btnDetails1"]["isVisible"] && scopeObj.getFieldValue(scopeObj.getFieldValue(scopeObj._tab6BtnContextualAction1, "entitlement_action")[selectedType])) {
                  scopeObj.getBtnEntitlement(transactions[i],scopeObj.getFieldValue(scopeObj.getFieldValue(scopeObj._tab6BtnContextualAction1, "id")[selectedType]),function(visibility){
                    if(visibility === true) {
                      record["btnDetails1"]["isVisible"] = true;
                    } else{
                      record["btnDetails1"]["isVisible"] = false;
                    }
                  });
                }
//                 else if(this.EntitlementUtils.isEntitled(this.getFieldValue(scopeObj._tab6BtnContextualAction1, "entitlement_key"))){
//                    record["btnDetails1"] = {"isVisible":false};
//                 }
              }
              else{
                record["btnDetails1"] = {"isVisible":false};
              }
            }
            catch(e){
              record["btnDetails1"] = {"isVisible":false};
            }
            try{
              let text = scopeObj.getFieldValue(scopeObj._tab6BtnContextualAction2,"text");
              text = scopeObj.getFieldValue(text[selectedType]);
              if(!this.isEmptyNullUndefined(text)){
                record["btnDetails2"] = {
                  "text": text,
                  "width": scopeObj.getFieldValue(scopeObj.getFieldValue(scopeObj._tab6BtnContextualAction2, "width")[selectedType]),
                   "onClick": function() {
                    var data = scopeObj.rowData.data;
                    if (data["installmentType"] !== null && data["installmentType"] !== undefined && data["installmentType"].toUpperCase() === scopeObj.transactionListTypes[typeKey1]["value"].toUpperCase()) {
                      var selectedType = typeKey1;
                    } else {
                      var selectedType = typeKey2;
                    }
                    data.id = scopeObj.getFieldValue(scopeObj._tab6BtnContextualAction1, "id")[selectedType];
                    scopeObj.contextualActionButtonOnClick(data);
                  },
                  "skin": scopeObj.getFieldValue(scopeObj.getFieldValue(scopeObj._tab6BtnContextualAction2, "skin")[selectedType])
                }
                record["btnDetails2"]["isVisible"] = !this.isEmptyNullUndefined(record["btnDetails2"].text);
                if(record["btnDetails2"]["isVisible"] && scopeObj.getFieldValue(scopeObj.getFieldValue(scopeObj._tab6BtnContextualAction2, "entitlement_action")[selectedType])) {
                  scopeObj.getBtnEntitlement(transactions[i],scopeObj.getFieldValue(scopeObj.getFieldValue(scopeObj._tab6BtnContextualAction2, "id")[selectedType]),function(visibility){
                    if(visibility === true) {
                      record["btnDetails2"]["isVisible"] = true;
                    } else{
                      record["btnDetails2"]["isVisible"] = false;
                    }
                  });
                }
               // else if(this.EntitlementUtils.isEntitled(this.getFieldValue(scopeObj._tab6BtnContextualAction1, "entitlement_key"))){
//                    record["btnDetails2"] = {"isVisible":false};
//                 }
              }
              else{
                record["btnDetails2"] = {"isVisible":false};
              }
            }
            catch(e){
              record["btnDetails2"] = {"isVisible":false};
            }
            try{
              let text = scopeObj.getFieldValue(scopeObj._tab6BtnContextualAction3,"text");
              text = scopeObj.getFieldValue(text[selectedType]);
               if(!this.isEmptyNullUndefined(text)){
                record["btnDetails3"] = {
                  "text": text,
                  "width": scopeObj.getFieldValue(scopeObj.getFieldValue(scopeObj._tab6BtnContextualAction3, "width")[selectedType]),
                   "onClick": function() {
                    var data = scopeObj.rowData.data;
                    if (data["installmentType"] !== null && data["installmentType"] !== undefined && data["installmentType"].toUpperCase() === scopeObj.transactionListTypes[typeKey1]["value"].toUpperCase()) {
                      var selectedType = typeKey1;
                    } else {
                      var selectedType = typeKey2;
                    }
                    data.id = scopeObj.getFieldValue(scopeObj._tab6BtnContextualAction1, "id")[selectedType];
                    scopeObj.contextualActionButtonOnClick(data);
                  },
                  "skin": scopeObj.getFieldValue(scopeObj.getFieldValue(scopeObj._tab6BtnContextualAction3, "skin")[selectedType])
                }
                record["btnDetails3"]["isVisible"] = !this.isEmptyNullUndefined(record["btnDetails3"].text);
                if(record["btnDetails3"]["isVisible"] && scopeObj.getFieldValue(scopeObj.getFieldValue(scopeObj._tab6BtnContextualAction3, "entitlement_action")[selectedType])) {
                  scopeObj.getBtnEntitlement(transactions[i],scopeObj.getFieldValue(scopeObj.getFieldValue(scopeObj._tab6BtnContextualAction3, "id")[selectedType]),function(visibility){
                    if(visibility === true) {
                      record["btnDetails3"]["isVisible"] = true;
                    } else{
                      record["btnDetails3"]["isVisible"] = false;
                    }
                  });
                }
//                 else if(this.EntitlementUtils.isEntitled(this.getFieldValue(scopeObj._tab6BtnContextualAction3, "entitlement_key"))){
//                    record["btnDetails3"] = {"isVisible":false};
//                 }
              }
              else{
                record["btnDetails3"] = {"isVisible":false};
              }
            }
            catch(e){
              record["btnDetails3"] = {"isVisible":false};
            }
            try{
              let text = scopeObj.getFieldValue(scopeObj._tab6BtnContextualAction4,"text");
              text = scopeObj.getFieldValue(text[selectedType]);
               if(!this.isEmptyNullUndefined(text)){
                record["btnDetails4"] = {
                  "text": text,
                  "width": scopeObj.getFieldValue(scopeObj.getFieldValue(scopeObj._tab6BtnContextualAction4, "width")[selectedType]),
                  "onClick": function(){
                    var data = scopeObj.rowData.data;
                    data.id = scopeObj.getFieldValue(scopeObj._tab6BtnContextualAction4,"id")[selectedType];
                    scopeObj.contextualActionButtonOnClick(data);
                  },
                  "skin": scopeObj.getFieldValue(scopeObj.getFieldValue(scopeObj._tab6BtnContextualAction4, "skin")[selectedType])
                }
                record["btnDetails4"]["isVisible"] = !this.isEmptyNullUndefined(record["btnDetails4"].text);
                if(record["btnDetails4"]["isVisible"] && scopeObj.getFieldValue(scopeObj.getFieldValue(scopeObj._tab6BtnContextualAction4, "entitlement_action")[selectedType])) {
                  scopeObj.getBtnEntitlement(transactions[i],scopeObj.getFieldValue(scopeObj.getFieldValue(scopeObj._tab6BtnContextualAction4, "id")[selectedType]),function(visibility){
                    if(visibility === true) {
                      record["btnDetails4"]["isVisible"] = true;
                    } else{
                      record["btnDetails4"]["isVisible"] = false;
                    }
                  });
                }
//                 else if(this.EntitlementUtils.isEntitled(this.getFieldValue(scopeObj._tab6BtnContextualAction4, "entitlement_key"))){
//                    record["btnDetails4"] = {"isVisible":false};
//                 }
              }
              else{
                record["btnDetails4"] = {"isVisible":false};
              }
            }
            catch(e){
              record["btnDetails4"] = {"isVisible":false};
            }
            record["lblSeparator"] = {
              "text":".",
              "skin":scopeObj._sknRowSeperator
            };
            if(transactions[i]["installmentType"]!== undefined && transactions[i]["installmentType"]!== null)
            {
              if(transactions[i]["installmentType"].toUpperCase() == this.transactionListTypes[typeKey2].value.toUpperCase())
                section2Array.push(record);
              else if(transactions[i]["installmentType"].toUpperCase() == this.transactionListTypes[typeKey1].value.toUpperCase())
                section1Array.push(record);
            }
            else
            {
              section3Array.push(record);
            }
          }
          if(section1Array.length == 0){
            var sectionData = [
              [
                {"lblTransactionHeader":{
                  "text" : this.transactionListTypes[typeKey2]["displayText"] + " ("+section2Array.length+")",
                  "skin" : this._sknPostedLabel
                }},section2Array
              ]
            ]
            }
          else if(section2Array.length == 0){
            var sectionData = [
              [
                {"lblTransactionHeader":{
                  "text" : this.transactionListTypes[typeKey1]["displayText"] + " ("+section1Array.length+")",
                  "skin" : this._sknPendingLabel
                }},section1Array
              ]
            ]
            }
          else{
            var sectionData = [
              [
                {"lblTransactionHeader":{
                  "text" : this.transactionListTypes[typeKey1]["displayText"] + " ("+section1Array.length+")",
                  "skin" : this._sknPendingLabel
                }},section1Array
              ]
              ,
              [
                {"lblTransactionHeader":{
                  "text" : this.transactionListTypes[typeKey2]["displayText"] + " ("+section2Array.length+")",
                  "skin" : this._sknPostedLabel
                }},section2Array
              ]
            ];
          }
         if(section3Array.length!==0)
          {
            sectionData = section3Array;
          }
          this.view.segTransactions.widgetDataMap = {
            "btnRepeat": "btnRepeat",
            "lblNoteTitle": "lblNoteTitle",
            "lblNoteValue": "lblNoteValue",
            "lblFrequencyTitle": "lblFrequencyTitle",
            "lblFrequencyValue": "lblFrequencyValue",
            "lblRecurrenceTitle": "lblRecurrenceTitle",
            "lblRecurrenceValue": "lblRecurrenceValue",
            "btnDisputeTransaction": "btnDisputeTransaction",
            "btnDownload": "btnDownload",
            "data": "data",
            "btnViewRequests": "btnViewRequests",
            "imgError": "imgError",
            "imgWarning": "imgWarning",
            "lblDisputedWarning": "lblDisputedWarning",
            "btnEditRule": "btnEditRule",
            "btnPrint": "btnPrint",
            "cbxRememberCategory": "cbxRememberCategory",
            "flxActions": "flxActions",
            "flxActionsWrapper": "flxActionsWrapper",
            "flxAmount": "flxAmount",
            "flxBalance": "flxBalance",
            "flxCategory": "flxCategory",
            "flxDate": "flxDate",
            "flxDescription": "flxDescription",
            "flxDetail": "flxDetail",
            "flxDetailData": "flxDetailData",
            "flxDetailHeader": "flxDetailHeader",
            "flxDropdown": "flxDropdown",
            "flxIdentifier": "flxIdentifier",
            "flxInformation": "flxInformation",
            "flxLeft": "flxLeft",
            "flxMemo": "flxMemo",
            "flxRight": "flxRight",
            "flxSegTransactionHeader": "flxSegTransactionHeader",
            "flxSegTransactionRowSavings": "flxSegTransactionRowSavings",
            "flxSegTransactionRowSelected": "flxSegTransactionRowSelected",
            "flxSegTransactionRowWrapper": "flxSegTransactionRowWrapper",
            "flxSelectedRowWrapper": "flxSelectedRowWrapper",
            "flxToData": "flxToData",
            "flxDetails2": "flxDetails2",
            "flxType": "flxType",
            "flxDetails1": "flxDetails1",
            "flxTypeHeader": "flxTypeHeader",
            "flxWithdrawalAmountData": "flxWithdrawalAmountData",
            "flxDetails4": "flxDetails4",
            "flxDetails5": "flxDetails5",
            "flxDetails6": "flxDetails6",
            "flxDetails7": "flxDetails7",
            "flxDetails8": "flxDetails8",
            "flxDetails9": "flxDetails9",
            "flxDetails10": "flxDetails10",
            "flxWrapper": "flxWrapper",
            "imgCategoryDropdown": "imgCategoryDropdown",
            "imgDropdown": "imgDropdown",
            "imgType": "imgType",
            "lblType": "lblType",
            "lblAmount": "lblAmount",
            "lblBalance": "lblBalance",
            "lblCategory": "lblCategory",
            "lblDate": "lblDate",
            "lblDescription": "lblDescription",
            "lblTransactionDescription": "lblTransactionDescription",
            "lblIdentifier": "lblIdentifier",
            "lblSeparator": "lblSeparator",
            "lblSeparatorActions": "lblSeparatorActions",
            "lblSeparatorDetailData": "lblSeparatorDetailData",
            "lblSeparatorDetailHeader": "lblSeparatorDetailHeader",
            "lblDetails2Title": "lblDetails2Title",
            "lblDetails2Value": "lblDetails2Value",
            "lblTransactionHeader": "lblTransactionHeader",
            "lblDetails1Title": "lblDetails1Title",
            "lblDetails1Value": "lblDetails1Value",
            "lblDetails4Title": "lblDetails4Title",
            "lblDetails4Value": "lblDetails4Value",
            "lblDetails3Title": "lblDetails3Title",
            "lblDetails3Value": "lblDetails3Value",
            "lblDetails5Title": "lblDetails5Title",
            "lblDetails5Value": "lblDetails5Value",
            "lblDetails6Title": "lblDetails6Title",
            "lblDetails6Value": "lblDetails6Value",
            "lblDetails7Title": "lblDetails7Title",
            "lblDetails7Value": "lblDetails7Value",
            "lblDetails8Title": "lblDetails8Title",
            "lblDetails8Value": "lblDetails8Value",
            "lblDetails9Title": "lblDetails9Title",
            "lblDetails9Value": "lblDetails9Value",
            "lblDetails10Title": "lblDetails10Title",
            "lblDetails10Value": "lblDetails10Value",
            "txtMemo": "txtMemo",
            "CopyflxToHeader0g61ceef5594d41": "CopyflxToHeader0g61ceef5594d41",
            "CopylblToTitle0a2c47b22996e4f": "CopylblToTitle0a2c47b22996e4f",
            "flxBankName1": "flxBankName1",
            "flxBankName2": "flxBankName2",
            "flxCash": "flxCash",
            "flxCheck1": "flxCheck1",
            "flxCheck1Ttitle": "flxCheck1Ttitle",
            "flxCheck2": "flxCheck2",
            "flxCheck2Ttitle": "flxCheck2Ttitle",
            "flxCheckImage": "flxCheckImage",
            "flxCheckImage2Icon": "flxCheckImage2Icon",
            "flxCheckImageIcon": "flxCheckImageIcon",
            "flxRememberCategory": "flxRememberCategory",
            "flxSegCheckImages": "flxSegCheckImages", 
            "flxTotal": "flxTotal",
            "flxTotalValue": "flxTotalValue",
            "flxTransactionFee": "flxTransactionFee",
            "flxFrequencyTitle": "flxFrequencyTitle",
            "flxRecurrenceTitle": "flxRecurrenceTitle",
            "flxDetails3": "flxDetails3",
            "flxWithdrawalAmount": "flxWithdrawalAmount",
            "flxWithdrawalAmountCash": "flxWithdrawalAmountCash",
            "flxWithdrawalAmountCheck1": "flxWithdrawalAmountCheck1",
            "flxWithdrawalAmountCheck2": "flxWithdrawalAmountCheck2",
            "imgCheckimage": "imgCheckimage",
            "imgCheckImage1Icon": "imgCheckImage1Icon",
            "imgCheckImage2Icon": "imgCheckImage2Icon",
            "imgRememberCategory": "imgRememberCategory",
            "lblTransactionFeeKey": "lblTransactionFeeKey",
            "lblTransactionFeeValue": "lblTransactionFeeValue",
            "lblBankName1": "lblBankName1",
            "lblBankName2": "lblBankName2",
            "lblCheck1Ttitle": "lblCheck1Ttitle",
            "lblCheck2Ttitle": "lblCheck2Ttitle",
            "lblRememberCategory": "lblRememberCategory",
            "lblSeparator2": "lblSeparator2",
            "lblSeperatorhor1": "lblSeperatorhor1",
            "lblSeperatorhor2": "lblSeperatorhor2",
            "lblSeperatorhor3": "lblSeperatorhor3",
            "lblSeperatorhor4": "lblSeperatorhor4",
            "lblSeperatorhor5": "lblSeperatorhor5",
            "lblTotalValue": "lblTotalValue",
            "lblWithdrawalAmount": "lblWithdrawalAmount",
            "lblWithdrawalAmountCash": "lblWithdrawalAmountCash",
            "lblWithdrawalAmountCheck1": "lblWithdrawalAmountCheck1",
            "lblWithdrawalAmountCheck2": "lblWithdrawalAmountCheck2",
            "segCheckImages": "segCheckImages",
            "txtFieldMemo": "txtFieldMemo",
            "lblToTitle2": "lblToTitle2",
            "lblTypeTitle2": "lblTypeTitle2",
            "lblWithdrawalAmountTitle2": "lblWithdrawalAmountTitle2",
            "btnDetails1": "btnDetails1",
            "btnDetails2": "btnDetails2",
            "btnDetails3": "btnDetails3",
            "btnDetails4": "btnDetails4",
            "accountId" : scopeObj.getFieldValue(scopeObj._TLaccountId),
            "accountType" : scopeObj.getFieldValue(scopeObj._TLaccountType)
          };
          this.view.segTransactions.rowTemplate = this.rowTemplate;
          this.view.segTransactions.sectionHeaderTemplate = "ICFlxSegTransactionHeader";
          this.view.segTransactions.removeAll(); 
          this.view.segTransactions.setData(sectionData);
          try{
            this.adjustScreen();
          }
          catch(e)
          {
            kony.print(e);
          }
        }
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in updating the transactions in segment",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component getFormattedData
     * Responsible to get the formatted data to be assigned.
     * @param value{string} - value to be be formatted
     * @param type{string} - type of the value passed
     * @param currencyCode{string} - currency code to be appended for amount
     * @return : {JSONObject} - jsonvalue of formatted value and skin
     */
    getFormattedData : function(value,type,currencyCode){
      var self = this;
      try
      {
        if(this.isEmptyNullUndefined(currencyCode))
          currencyCode = this.getFieldValue(this._currencyCode);
        return this.FormatUtils.formatText(value,type,this.formatSkins,this.formattingJSON,currencyCode);
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in Formating the data.",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component resetSortingImages
     * Set the sorting images in the header
     */
    resetSortingImages: function(){
      var self =this;
      try
      {
        this.view.imgColumn1Right.src = JSON.parse(this._iconColumnSort).img;
        this.view.imgColumn1Left.src = JSON.parse(this._iconColumnSort).img;
        this.view.imgColumn2Right.src = JSON.parse(this._iconColumnSort).img;
        this.view.imgColumn2Left.src = JSON.parse(this._iconColumnSort).img;
        this.view.imgColumn3Right.src = JSON.parse(this._iconColumnSort).img;
        this.view.imgColumn3Left.src = JSON.parse(this._iconColumnSort).img;
        this.view.imgColumn4Right.src = JSON.parse(this._iconColumnSort).img;
        this.view.imgColumn4Left.src = JSON.parse(this._iconColumnSort).img;
        this.view.imgColumn5Right.src = JSON.parse(this._iconColumnSort).img;
        this.view.imgColumn5Left.src = JSON.parse(this._iconColumnSort).img;
        this.view.imgColumn6Right.src = JSON.parse(this._iconColumnSort).img;
        this.view.imgColumn6Left.src = JSON.parse(this._iconColumnSort).img;
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting the sorting images",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component flxColumn1onClick
     * on click for sort on the first column
     */
    flxColumn1onClick: function(){
      var self = this;
      try
      {
        var image= JSON.parse(this._iconColumnSort).img;
        this.criteria["sortBy"] = this.getFieldValue(this._dataGridColumn1,"sortBy");
		if(this.selectedTab==6)
          {
             this.criteria["sortBy"] = this.getFieldValue(this._tab6DataGridColumn1,"sortBy");
          }
        this.criteria["order"] = "desc";
		this.state = "sortedData";
        if(this.view.imgColumn1Right.src === JSON.parse(this._iconColumnSort).img || this.view.imgColumn1Right.src === JSON.parse(this._iconColumnSortDesc).img)
        {
          image = JSON.parse(this.iconColumnSortAsc).img
          this.criteria["order"] = "asc";
        }
        else if(this.view.imgColumn1Right.src === JSON.parse(this.iconColumnSortAsc).img)
        {
          image = JSON.parse(this.iconColumnSortDesc).img
        }
        else
        {
          image = JSON.parse(this.iconColumnSortAsc).img
        }
        this.resetSortingImages();
        this.view.imgColumn1Right.src = image;
        this.view.imgColumn1Left.src = image;
        if(this.selectedTab==6)
        {
          this.getTab6Transactions();
        }
        else
        {
          if(this._dataAvailability == "Service calls by component")
            this.getTransactionList();
          else
            this.dataRequestCallback();
        }
      
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting the criteria and invoking column 1 related service call",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component flxColumn2onClick
     * on click for sort on the second column
     */
    flxColumn2onClick: function(){
      var self = this;
      try
      {
        var image= JSON.parse(this._iconColumnSort).img;
        this.criteria["sortBy"] = this.getFieldValue(this._dataGridColumn2,"sortBy");
		if(this.selectedTab==6)
          {
             this.criteria["sortBy"] = this.getFieldValue(this._tab6DataGridColumn2,"sortBy");
          }
        this.criteria["order"] = "desc";
		this.state = "sortedData";
        if(this.view.imgColumn2Right.src === JSON.parse(this._iconColumnSort).img || this.view.imgColumn2Right.src === JSON.parse(this._iconColumnSortDesc).img)
        {
          image = JSON.parse(this.iconColumnSortAsc).img
          this.criteria["order"] = "asc";
        }
        else if(this.view.imgColumn2Right.src === JSON.parse(this.iconColumnSortAsc).img)
        {
          image = JSON.parse(this.iconColumnSortDesc).img
        }
        else
        {
          image = JSON.parse(this.iconColumnSortAsc).img
        }
        this.resetSortingImages();
        this.view.imgColumn2Right.src = image;
        this.view.imgColumn2Left.src = image;
        if(this.selectedTab==6)
        {
          this.getTab6Transactions();
        }
        else
        {
          if(this._dataAvailability == "Service calls by component")
            this.getTransactionList();
          else
            this.dataRequestCallback();
        }
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting the criteria and invoking column 2 related service call",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component flxColumn3onClick
     * on click for sort on the third column
     */
    flxColumn3onClick: function(){
      var self =this;
      try
      {
        var image= JSON.parse(this._iconColumnSort).img;
        this.criteria["sortBy"] = this.getFieldValue(this._dataGridColumn3,"sortBy");
		if(this.selectedTab==6)
          {
             this.criteria["sortBy"] = this.getFieldValue(this._tab6DataGridColumn3,"sortBy");
          }
        this.criteria["order"] = "desc";
		this.state = "sortedData";
        if(this.view.imgColumn3Right.src === JSON.parse(this._iconColumnSort).img || this.view.imgColumn3Right.src === JSON.parse(this._iconColumnSortDesc).img)
        {
          image = JSON.parse(this.iconColumnSortAsc).img
          this.criteria["order"] = "asc";
        }
        else if(this.view.imgColumn3Right.src === JSON.parse(this.iconColumnSortAsc).img)
        {
          image = JSON.parse(this.iconColumnSortDesc).img
        }
        else
        {
          image = JSON.parse(this.iconColumnSortAsc).img
        }
        this.resetSortingImages();
        this.view.imgColumn3Right.src = image;
        this.view.imgColumn3Left.src = image;
        if(this.selectedTab==6)
        {
          this.getTab6Transactions();
        }
        else
        {
          if(this._dataAvailability == "Service calls by component")
            this.getTransactionList();
          else
            this.dataRequestCallback();
        }
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting the criteria and invoking column 3 related service call",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component flxColumn4onClick
     * on click for sort on the fourth column
     */
    flxColumn4onClick: function(){
      var self = this;
      try
      {
        var image= JSON.parse(this._iconColumnSort).img;
        this.criteria["sortBy"] = this.getFieldValue(this._dataGridColumn4,"sortBy");
		if(this.selectedTab==6)
          {
             this.criteria["sortBy"] = this.getFieldValue(this._tab6DataGridColumn4,"sortBy");
          }
        this.criteria["order"] = "desc";
		this.state = "sortedData";
        if(this.view.imgColumn4Right.src === JSON.parse(this._iconColumnSort).img  || this.view.imgColumn4Right.src === JSON.parse(this._iconColumnSortDesc).img)
        {
          image = JSON.parse(this.iconColumnSortAsc).img
          this.criteria["order"] = "asc";
        }
        else if(this.view.imgColumn4Right.src === JSON.parse(this.iconColumnSortAsc).img)
        {
          image = JSON.parse(this.iconColumnSortDesc).img
        }
        else
        {
          image = JSON.parse(this.iconColumnSortAsc).img
        }
        this.resetSortingImages();
        this.view.imgColumn4Right.src = image;
        this.view.imgColumn4Left.src = image;
        if(this.selectedTab==6)
        {
          this.getTab6Transactions();
        }
        else
        {
          if(this._dataAvailability == "Service calls by component")
            this.getTransactionList();
          else
            this.dataRequestCallback();
        }
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting the criteria and invoking column 4 related service call",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },   
    /**
     * Component flxColumnon5Click
     * on click for sort on the fifth column
     */
    flxColumn5onClick: function(){
      var self = this;
      try
      {
        var image= JSON.parse(this._iconColumnSort).img;
        this.criteria["sortBy"] = this.getFieldValue(this._dataGridColumn5,"sortBy");
		if(this.selectedTab==6)
          {
             this.criteria["sortBy"] = this.getFieldValue(this._tab6DataGridColumn5,"sortBy");
          }
        this.criteria["order"] = "desc";
		this.state = "sortedData";
        if(this.view.imgColumn5Right.src === JSON.parse(this._iconColumnSort).img  || this.view.imgColumn5Right.src === JSON.parse(this._iconColumnSortDesc).img)
        {
          image = JSON.parse(this.iconColumnSortAsc).img
          this.criteria["order"] = "asc";
        }
        else if(this.view.imgColumn5Right.src === JSON.parse(this.iconColumnSortAsc).img)
        {
          image = JSON.parse(this.iconColumnSortDesc).img
        }
        else
        {
          image = JSON.parse(this.iconColumnSortAsc).img
        }
        this.resetSortingImages();
        this.view.imgColumn5Right.src = image;
        this.view.imgColumn5Left.src = image;
        if(this.selectedTab==6)
        {
          this.getTab6Transactions();
        }
        else
        {
          if(this._dataAvailability == "Service calls by component")
            this.getTransactionList();
          else
            this.dataRequestCallback();
        }
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting the criteria and invoking column 5 related service call",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },   
    /**
     * Component flxColumn6onClick
     * on click for sort on the sixth column
     */
    flxColumn6onClick: function(){
      var self = this;
      try
      {
        var image= JSON.parse(this._iconColumnSort).img;
        this.criteria["sortBy"] = this.getFieldValue(this._dataGridColumn6,"sortBy");
		if(this.selectedTab==6)
          {
             this.criteria["sortBy"] = this.getFieldValue(this._tab6DataGridColumn6,"sortBy");
          }
        this.criteria["order"] = "desc";
		this.state = "sortedData";
        if(this.view.imgColumn6Right.src === JSON.parse(this._iconColumnSort).img || this.view.imgColumn6Right.src === JSON.parse(this._iconColumnSortDesc).img)
        {
          image = JSON.parse(this.iconColumnSortAsc).img
          this.criteria["order"] = "asc";
        }
        else if(this.view.imgColumn6Right.src === JSON.parse(this.iconColumnSortAsc).img)
        {
          image = JSON.parse(this.iconColumnSortDesc).img
        }
        else
        {
          image = JSON.parse(this.iconColumnSortAsc).img
        }
        this.resetSortingImages();
        this.view.imgColumn6Right.src = image;
        this.view.imgColumn6Left.src = image;
         if(this.selectedTab==6)
        {
          this.getTab6Transactions();
        }
        else
        {
          if(this._dataAvailability == "Service calls by component")
            this.getTransactionList();
          else
            this.dataRequestCallback();
        }
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting the criteria and invoking column 6 related service call",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },   
    /**
     * Component getCriteria
     * Parse the criteria from configuration
     * @return : {JSONObject} - jsonvalue for criteria
     */
    getCriteria:function(){
      var self = this;
      try{
        if(this.criteria.hasOwnProperty("isIncludeOrders")){
         this.criteria.isIncludeOrders=this.criteria.isIncludeOrders?"true":"false";
        }
        return this.criteria;
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in returning criteria",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
      return "";
    },
    /**
     * Component onToggle
     * Responsible for expanding and collapsing rows in the segment based on selection
     */
    onToggle: function(){
      var self = this;
      try
      {
        var scopeObj = this;
        var index = scopeObj.view.segTransactions.selectedRowIndex;
        var sectionIndex = index[0];
        var rowIndex = index[1];
        var data = scopeObj.view.segTransactions.data;
        var rowData = data[sectionIndex][1][rowIndex];
        self.rowData = rowData;
        var section = data.length;
        var collapseAll = function(segments, section) {
          segments.forEach(function(segment, i) {
            segment.template = scopeObj.rowTemplate;
            segment.imgDropdown = {
              skin : JSON.parse(scopeObj._iconRowExpand)["skin"],
              text : JSON.parse(scopeObj._iconRowExpand)["vizIcon"]
            };
            scopeObj.view.segTransactions.setDataAt(segment, i, section);
          });
        };
        if(scopeObj._transDetailsVisibility){
          if(rowData.template != this.expandedTemplate){
            while (section--) {
              collapseAll(data[section][1], section);
            }
            data[sectionIndex][1][rowIndex].imgDropdown = {
              skin : JSON.parse(scopeObj.iconRowCollapse)["skin"],
              text : JSON.parse(scopeObj.iconRowCollapse)["vizIcon"]
            };
            data[sectionIndex][1][rowIndex].template = this.expandedTemplate;
			 if(this._GAserviceEnable && this.selectedTab!==6)
              {
                this.index = index;
                this.context.transactionId = rowData.data.transactionId;
                this.getAttachments();
              }
            else
              {
                 scopeObj.view.segTransactions.setDataAt(data[sectionIndex][1][rowIndex], rowIndex, sectionIndex); 
              }
          }
          else{
            data[sectionIndex][1][rowIndex].imgDropdown = {
              skin : JSON.parse(scopeObj._iconRowExpand)["skin"],
              text : JSON.parse(scopeObj._iconRowExpand)["vizIcon"]
            };
            data[sectionIndex][1][rowIndex].template = this.rowTemplate;
            scopeObj.view.segTransactions.setDataAt(data[sectionIndex][1][rowIndex], rowIndex, sectionIndex);
          }
        }
        scopeObj.adjustScreen();
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting the data in details view",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
	/**
     * Component getAttachments
     * Responsible for getting attachments from service response
     */
	getAttachments: function()
    {
      var self =this;
      try
      {
        this.requestStart();
        var criteriaObject = JSON.parse(this._GAcriteria);
        for(var key in  criteriaObject){
          criteriaObject[key] = this.getFieldValue(criteriaObject[key]);
        }
        if(this._GAobjectServiceName && this._GAobjectName && this._GAoperationName){
          this.transactionListDAO.fetchAttachments(this._GAobjectServiceName,this._GAoperationName,this._GAobjectName,criteriaObject,this.setRowData,this.setRowData);
        }
        else{
          this.setRowData();
        }    
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in doing service call to  Get attachments",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
	/**
     * Component getAttachments
     * Responsible for setting row data with attachments.
	 * @param response {JSON} service response with attachments for particular transaction.
     */
    setRowData: function(response){
      var scopeObj = this;
      try
      {
        var index = scopeObj.index;
        var sectionIndex = index[0];
        var rowIndex = index[1];
        var data = scopeObj.view.segTransactions.data;
        var rowData = data[sectionIndex][1][rowIndex];
        var key;
        var attachments;       
        key = scopeObj.getFieldValue(scopeObj._btnContextualAction1,"attachments");
        attachments = response[key];
        if(attachments!== null && attachments!== undefined)
        {
          rowData["btnDetails1"].text = rowData["btnDetails1"].text.split(" ")[0] + " ("+attachments.length+")";
          rowData["data"][key] =  attachments;
        }
        key = scopeObj.getFieldValue(scopeObj._btnContextualAction2,"attachments");
        attachments = response[key];
        if(attachments!== null && attachments!== undefined)
        {
          rowData["btnDetails2"].text = rowData["btnDetails2"].text.split(" ")[0] + " ("+attachments.length+")";
          rowData["data"][key] =  attachments;
        }
        key = scopeObj.getFieldValue(scopeObj._btnContextualAction3,"attachments");
        attachments = response[key];
        if(attachments!== null && attachments!== undefined)
        {
          rowData["btnDetails3"].text = rowData["btnDetails3"].text.split(" ")[0] + " ("+attachments.length+")";
          rowData["data"][key] =  attachments;
        }
        key = scopeObj.getFieldValue(scopeObj._btnContextualAction4,"attachments");
        attachments = response[key];
        if(attachments!== null && attachments!== undefined)
        {
          rowData["btnDetails4"].text = rowData["btnDetails4"].text.split(" ")[0] + " ("+attachments.length+")";
          rowData["data"][key] =  attachments;
        }
        scopeObj.view.segTransactions.setDataAt(rowData, rowIndex, sectionIndex); 
        this.requestEnd();
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in doing setting row data",
              "errorLevel" : "Business",
              "error": err
            };
        scopeObj.onError(errorObj);
      }
    },
    /**
     * Component setIcons
     * responsible for setting the given icons
     */
    setIcons: function(){
      var self = this;
      try
      {
        this.view.imgSearch.src = JSON.parse(this._iconSettings)["img"];
        this.view.imgDownload.src = JSON.parse(this._iconDownload)["img"];
        this.view.imgPrint.src = JSON.parse(this._iconPrint)["img"];
        this.view.imgAccountTypeRadio1.src = JSON.parse(this._iconRadioActive)["img"];
        this.view.imgAccountTypeRadio2.src = JSON.parse(this.this._iconRadioInactive)["img"];
        this.view.imgKeySearch.src = JSON.parse(this._iconSearch)["img"];
        this.view.imgClose.src = JSON.parse(this._iconSearchClose)["img"];
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting the icons.",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component setCriteria
     * Update the criteria based on accountType ans filter
     * criteria {string} - value collected from exposed contract
     */
    setCriteria:function(criteria, pref){
      if(criteria==undefined || pref==undefined){
        return;
      }
      var self = this;
      try
      {
		var criteriaObject;
		if(pref=="fieldOrder"){
					criteriaObject = JSON.parse(eval("this._settingsUpdateCriteria"));
				}else if(pref == "orderId"){
					criteriaObject = JSON.parse(eval("this._cancelReqCriteria"));
                
				}else{
                criteriaObject = JSON.parse(eval("this._tab" + pref + "Criteria"));
				}
        for(var key in  criteriaObject){
          criteriaObject[key] = this.getFieldValue(criteriaObject[key]);
        }
        var criteriaJSON = criteria;
        if(typeof(criteria) == "string"){
          criteriaJSON = JSON.parse(criteria);
        }
        for(var key in  criteriaJSON){
          criteriaObject[key] = this.getFieldValue(criteriaJSON[key]);
        }
        this.criteria = criteriaObject;

        if(this.criteria["searchByInstrumentName"] ==  "searchByInstrumentName"){
					delete this.criteria["searchByInstrumentName"];
				}
                if(this.criteria["pageOffset"] ==  "pageOffset"){
					this.criteria["pageOffset"] = "0";
				}
				if(this.criteria["orderId"] ==  "orderId"){
					this.criteria["orderId"] = "";
				}
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting the criteria",
              "errorLevel" : "Configuration",
              "error": err
            };
        this.onError(errorObj);
      }
    },
    /**
     * Component getProcessedText
     * Pass the text to format util to obtained the processed value.
     * text {string} - value to be processed
     * @return : {string} - processed value
     */
    getProcessedText:function(text){
      return this.parserUtilsManager.getParsedValue(text);
    },
    /**
     * Component isEmptyNullUndefined
     * Verifies if the value is empty, null or undefined
     * data {string} - value to be verified
     * @return : {boolean} - validity of the value passed
     */
    isEmptyNullUndefined:function(data){
      if(data === null || data === undefined || data === "")
        return true;
      return false;
    },
    onBreakpointChange: function(){
      var self = this;
      try
      {
		this.setTabData();
//         if(kony.application.getCurrentBreakpoint() == "640"){
//           this.rowTemplate = "ICFlxSegTransactionsRowSavingsMobile";
//           this.expandedTemplate = "ICFlxSegTransactionRowSelectedMobile";
//         }
//         else{
//           this.rowTemplate = "ICFlxSegTransactionRowSavings";
//           this.expandedTemplate = "ICFlxSegTransactionRowSelected";
//         }
        if(self.selectedTab === 6)
          this.updateTab6Transactions();
        else
          this.updateTransactions();
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in change of breakpoint",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component enableSearchButton
     * This method is used enable the search button and change the skins
     */
    enableSearchButton: function () {
      var self = this;
      try
      {
        this.view.btnSearch.skin = "sknbtnSSPffffff0278ee15pxbr3px";
        this.view.btnSearch.setEnabled(true);
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in enabling search button",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component disableSearchButton
     * This method is used disable the search button and change the skins
     */
    disableSearchButton: function () {
      var self = this;
      try
      {
        this.view.btnSearch.setEnabled(false);
        this.view.btnSearch.skin="sknBtnBlockedSSPFFFFFF15Px";
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in disabling search button.",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
    },
     /**
     * Component enableSearchButton
     * This method is used enable the search button for blocked funds and change the skins
     */
    enableSearchButtonBF: function () {
      var self = this;
      try
      {
        this.view.btnBFSearch.skin = "sknbtnSSPffffff0278ee15pxbr3px";
        this.view.btnBFSearch.setEnabled(true);
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in enabling blocked funds search button",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component disableSearchButtonBF
     * This method is used to disable the search button for blocked funds and change the skins
     */
    disableSearchButtonBF: function () {
      var self = this;
      try
      {
        this.view.btnBFSearch.setEnabled(false);
        this.view.btnBFSearch.skin="sknBtnBlockedSSPFFFFFF15Px";
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in disabling blocked funds search button.",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component showByDateWidgets
     * This method is used to turn on the visibility of Date Widgets.
     */ 
    showByDateWidgets: function () {
      var self = this;
      try
      {
        this.view.lblByDate.setVisibility(true);
        this.view.flxByDate.setVisibility(true);
        this.view.flxBlankSpace.setVisibility(false);
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in showing the date widgets",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component showByDateWidgets
     * This method is used to turn off the visibility of Date Widgets.
     */
    hideByDateWidgets: function () {
      var self = this;
      try
      {
        this.view.lblByDate.setVisibility(false);
        this.view.flxByDate.setVisibility(false);
        var currentBreakpoint = kony.application.getCurrentBreakpoint();
		if(currentBreakpoint == 640){
          this.view.flxBlankSpace.setVisibility(false);
        } else {
        this.view.flxBlankSpace.setVisibility(true);
        }
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in hiding date widgets",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component setSearchVisible
     * This method is used to turn on and turn off the visiblibity of search flex.
     * @param : isVisible {Boolean}  - used to decide the visibilty of search flex.
     */ 
    setSearchVisible: function (isVisible) {
      var self = this;
      try
      {
        this.setSearchUI();
        this.view.flxSearchContainer.setVisibility(isVisible);
        if(this.accountType=="Savings"|| this.accountType=="Checking")
        {
          this.view.flxAccountType.setVisibility(true)
        }
        else
        {
          this.view.flxAccountType.setVisibility(false)
        }
        this.view.imgSearch.src = (isVisible || this.view.flxSearchResults.isVisible) ? "selecetd_search.png": "search_blue.png";		
        this.adjustScreen();
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting the search visiblity on or off.",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component setSearchResultsVisible
     * This method is used to turn on and turn off the visiblibity of search results flex.
     * @param : isVisible {Boolean}  - used to decide the visibilty of search results flex.
     */ 
    setSearchResultsVisible : function(isVisible) {
      var self = this;
      try
      {
        this.view.imgSearch.src = (isVisible || this.view.flxSearchContainer.isVisible) ? "selecetd_search.png": "search_blue.png";
        //this.view.flxSeparatorSearch.setVisibility(isVisible);
        this.view.flxSearchResults.setVisibility(isVisible);
        if(isVisible === true){
          this.view.lblYouHaveSearchedFor.setFocus(true);
        }
        this.adjustScreen();
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting the search results visibility on or off.",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * component hideSearchFlex
     * This method is used to hide both search flex and search results flex.
     */ 
    hideSearchFlex: function() {
      var self = this;
      try
      {
        this.setSearchVisible(false);
        this.setSearchResultsVisible(false);
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in hiding the search flexes",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component objectToListBoxArray
     * This method converts given object to list box array
     * @param : obj {JSONObject}  - object used to convert to list box array
     * @return : list {Array} - list box array
     */ 
    objectToListBoxArray: function(obj) {
      var self = this;
      try
      {
        var list = [];
        for (var key in obj) {
          if (obj.hasOwnProperty(key)) {
            list.push([key, kony.i18n.getLocalizedString(obj[key])]);
          }
        }
        return list;
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in converting object to list box",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component updateSearchViewModel
     * This method updates the locally maintained JSON searchViewModel with 
     * latest values of search parameters.
     */ 
    updateSearchViewModel: function() {
      var self = this;
      try
      {
        this.searchViewModel.keyword = this.view.txtKeyword.text.trim();
        this.searchViewModel.transactionTypeSelected = this.view.lstbxTransactionType.selectedKey;
        this.searchViewModel.timePeriodSelected = this.view.lstbxTimePeriod.selectedKey;
        this.searchViewModel.fromCheckNumber = this.view.txtCheckNumberFrom.text.trim();
        this.searchViewModel.toCheckNumber = this.view.txtCheckNumberTo.text.trim();
        this.searchViewModel.fromDate = this.view.calDateFrom.dateComponents;
        this.searchViewModel.fromAmount = this.view.txtAmountRangeFrom.text.trim();
        this.searchViewModel.toAmount = this.view.txtAmountRangeTo.text.trim();
        this.searchViewModel.toDate = this.view.calDateTo.dateComponents;
        this.searchViewModel.bfKeyword = this.view.txtBFKeyword.text;
        this.searchViewModel.bfReferenceNumber = this.view.txtBFReferenceNumber.text;
        this.searchViewModel.bfFromDate = this.view.calBFDateFrom.dateComponents;
        this.searchViewModel.bfToDate = this.view.calBFDateTo.dateComponents;
        return this.searchViewModel;
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting the valuses of fields in search Json",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component renderSearchForm
     * This method is used to populate values in respective search parameters from 
     * locally maintained JSON searchViewModel.
     * @param : searchViewModel {JSONObject} - locally maintained search parameters.	
     */ 
    renderSearchForm: function(searchViewModel) {
      var self = this
      try
      {
        this.setSearchVisible(true);
        this.setSearchResultsVisible(false);
        this.view.txtKeyword.text = searchViewModel.keyword;
        this.view.lstbxTransactionType.masterData = searchViewModel.transactionTypes;
        this.view.lstbxTransactionType.selectedKey = searchViewModel.transactionTypeSelected;
        this.view.lstbxTimePeriod.masterData = searchViewModel.timePeriods;
        this.view.lstbxTimePeriod.selectedKey = searchViewModel.timePeriodSelected;
        this.view.txtCheckNumberFrom.text = searchViewModel.fromCheckNumber;
        this.view.txtCheckNumberTo.text = searchViewModel.toCheckNumber;
        this.view.txtAmountRangeFrom.text = searchViewModel.fromAmount;
        this.view.txtAmountRangeTo.text = searchViewModel.toAmount;
        this.view.calDateFrom.dateComponents = searchViewModel.fromDate;
        this.view.calDateTo.dateComponents = searchViewModel.toDate;
        this.view.txtBFKeyword.text = searchViewModel.bfKeyword;
        this.view.txtBFReferenceNumber.text = searchViewModel.bfReferenceNumber;
        this.view.calBFDateFrom.dateComponents = searchViewModel.bfFromDate;
        this.view.calBFDateTo.dateComponents = searchViewModel.bfToDate;
        this.view.lblCurrencySymbolFrom.text= this.FormatUtils.getCurrencySymbol(this.getFieldValue(this._currencyCode));
        this.view.lblCurrencySymbolTo.text = this.FormatUtils.getCurrencySymbol(this.getFieldValue(this._currencyCode));
        this.onTimePeriodChange();
        this.checkSearchButtonState();
        this.checkBlockedFundsSearchButtonState();
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting the values of search parameters",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * component clearSearch
     * This method is used to clear all the values of search params in UI.
     */ 
    clearSearch: function() {
      var self = this;
      try
      {
        var today = new Date();
        this.view.txtKeyword.text = ""
        this.view.lstbxTransactionType.selectedKey = this.searchConstants.BOTH;
        this.view.lstbxTimePeriod.selectedKey = this.searchConstants.CHOOSE_TIME_RANGE;
        this.onTimePeriodChange();
        this.view.txtCheckNumberTo.text = ""
        this.view.txtCheckNumberFrom.text = ""
        this.view.txtAmountRangeTo.text = ""
        this.view.txtAmountRangeFrom.text = ""
        this.view.calDateFrom.dateComponents = [today.getDate(), today.getMonth() + 1, today.getFullYear()];
        this.view.calDateFrom.validEndDate = [today.getDate(), today.getMonth() + 1, today.getFullYear()];
        this.view.calDateTo.dateComponents = [today.getDate(), today.getMonth() + 1, today.getFullYear()];
        this.view.calDateTo.validEndDate = [today.getDate(), today.getMonth() + 1, today.getFullYear()];
        this.view.txtBFKeyword.text = "";
        this.view.txtBFReferenceNumber.text = "";
        this.view.calBFDateFrom.dateComponents = [today.getDate(), today.getMonth() + 1, today.getFullYear()];
        this.view.calBFDateTo.dateComponents = [today.getDate(), today.getMonth() + 1, today.getFullYear()];  
        this.view.flxPaginationWrapper.setVisibility(true);
        if(kony.application.getCurrentBreakpoint() !== 640){
        this.view.paginationFooter.setVisibility(true);
		this.view.paginationHeader.setVisibility(true);
        this.cacheUtils.data = [];
        this.tab6CacheUtils.data = [];
		}
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in clearing search fields",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }

    }, 
    /**
     * Component setSearchUI
     * This method is used to set the static labels in the search UI
     */ 
    setSearchUI: function(){
      var self = this;
      try
      {
        this.view.lblByKeyword.text = this.getFieldValue(this._searchLabel1);
        this.view.txtKeyword.placeholder = this.getFieldValue(this._val1PlaceHolder);
         /*this.view.lblByTransactionType.text = this.getFieldValue(this._searchLabel2);
         this.view.lblByTimePeriod.text = this.getFieldValue(this._searchLabel3);
         this.view.lblByCheckNumber.text = this.getFieldValue(this._searchLabel4);
         this.view.lblByAmountRange.text = this.getFieldValue(this._searchLabel5);
         this.view.lblByDate.text = this.getFieldValue(this._searchLabel6);
        this.view.txtCheckNumberFrom.placeholder = this.getFieldValue(this._val4FromPlaceHolder);
        this.view.txtCheckNumberTo.placeholder = this.getFieldValue(this._val4ToPlaceHolder);*/
        if(!this.isEmptyNullUndefined(this._sknSearchLabel)){
          this.view.lblByKeyword.skin = this._sknSearchLabel;
          /*this.view.lblByTransactionType.skin = this._sknSearchLabel;
          this.view.lblByTimePeriod.skin = this._sknSearchLabel;
          this.view.lblByCheckNumber.skin = this._sknSearchLabel;
          this.view.lblByAmountRange.skin = this._sknSearchLabel;
          this.view.lblByDate.skin = this._sknSearchLabel;*/
        }
       /* if(!this.isEmptyNullUndefined(this._sknSearchTextbox)){
          this.view.txtKeyword.skin = this._sknSearchTextbox;
          /*this.view.txtAmountRangeFrom.skin = this._sknSearchTextbox;
          this.view.txtAmountRangeTo.skin = this._sknSearchTextbox;
          this.view.txtCheckNumberFrom.skin = this._sknSearchTextbox;
          this.view.txtCheckNumberTo.skin = this._sknSearchTextbox;
        }
        if(!this.isEmptyNullUndefined(this._sknSearchActiveTextbox)){
          this.view.txtKeyword.focusSkin = this._sknSearchActiveTextbox;
          /*this.view.txtAmountRangeFrom.focusSkin = this._sknSearchActiveTextbox;
          this.view.txtAmountRangeTo.focusSkin = this._sknSearchActiveTextbox;
          this.view.txtCheckNumberFrom.focusSkin = this._sknSearchActiveTextbox;
          this.view.txtCheckNumberTo.focusSkin = this._sknSearchActiveTextbox;
        }
        /*if(!this.isEmptyNullUndefined(this._sknSearchDropdown)){
          this.view.lstbxTimePeriod.skin = this._sknSearchDropdown;
          this.view.lstbxTransactionType.skin = this._sknSearchDropdown;
        }
        if(!this.isEmptyNullUndefined(this._sknSearchActiveDropdown)){
          this.view.lstbxTimePeriod.focusSkin = this._sknSearchActiveDropdown;
          this.view.lstbxTransactionType.focusSkin = this._sknSearchActiveDropdown;
        }
        if(!this.isEmptyNullUndefined(this._sknSearchCalendar)){
          this.view.calDateFrom.skin = this._sknSearchCalendar;
          this.view.calDateTo.skin = this._sknSearchCalendar;
        }
        if(!this.isEmptyNullUndefined(this._sknSearchActiveCalendar)){
          this.view.calDateFrom.focusSkin = this._sknSearchActiveCalendar;
          this.view.calDateTo.skin = this._sknSearchActiveCalendar;
        }
        if(!this.isEmptyNullUndefined(this._sknSearchButton)){
          this.view.btnSearch.skin = this._sknSearchButton;
        }
        if(!this.isEmptyNullUndefined(this._sknSearchButtonHover)){
          this.view.btnSearch.hoverSkin = this._sknSearchButtonHover;
        }
        if(!this.isEmptyNullUndefined(this._sknSearchCancelButton)){
          this.view.btnCancel.skin = this._sknSearchCancelButton;
        }
        if(!this.isEmptyNullUndefined(this._sknSearchCancelButtonHover)){
          this.view.btnCancel.hoverSkin = this._sknSearchCancelButtonHover;
        }*/
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting the search UI with default properties",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component updateSearchTransactionView
     * This method is used to update the UI of search flexes based upon search performed 
     * or not and assign actions to flxSearch.
     */ 
    updateSearchTransactionView: function(data) {
      var self = this;
      try
      {
        this.view.flxSearch.toolTip = kony.i18n.getLocalizedString("i18n.billPay.Search");
        this.view.flxSearchMobile.onClick = function() {
          if (self.searchViewModel.visible === true) {
            self.searchViewModel.visible = false;
            self.setSearchVisible(false);
          } else {
            self.searchViewModel.visible = true;
            self.setSearchVisible(true);
          }
          self.view.flxBlankSpace.setVisibility(false);
        };
        this.view.flxSearch.onClick = function() {
          if (self.searchViewModel.visible === true) {
            self.searchViewModel.visible = false;
            self.setSearchVisible(false);
          } else {
            self.searchViewModel.visible = true;
            self.setSearchVisible(true);
          }
          self.view.flxBlankSpace.setVisibility(true);
        };
        this.view.flxPrint.onTouchEnd = function(){
          self.printTransactionList(self.view.segTransactions.data);
        };
        this.view.flxDownload.onTouchEnd = function(){
          var transactionType="";
          if(self.searchViewModel.searchPerformed === false)
          {
            if(self.selectedTab === 6)
            {
              var data = self.getFieldValue(self._tab6Criteria,"requestPayoad");
              transactionType = data.transactionType;
            }
            else
            {
              var data = self.getFieldValue(self["_filterTab"+self.selectedTab],"requestPayoad");
              transactionType = data.transactionType;
            }
            self.downloadTransactionList(transactionType);
          }
          else
          {
            self.downloadTransactionList(self.searchViewModel);
          }

        };
        if (this.searchViewModel.visible && !this.searchViewModel.searchPerformed) {
          this.renderSearchForm(this.searchViewModel);
        } else if (this.searchViewModel.visible && this.searchViewModel.searchPerformed) {
          this.showSearchResults(this.searchViewModel);
        } else {
          this.hideSearchFlex();
        }
        this.bindSearchFormActions();
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in updating the search transction view and setting actions",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component showSearchResults
     * This method is used to assign actions to btnModifySearch and btnClearSearch and
     * and invoke other methods to update the UI in searchResults flex.
     * @param : searchViewModel {JSONObject} - locally maintained search parameters.	
     */ 
    showSearchResults: function(searchViewModel) {
      var self = this;
      try
      {
        var self = this;
        this.view.btnModifySearch.onClick = function() {
          self.view.flxPaginationWrapper.setVisibility(true);
          if(kony.application.getCurrentBreakpoint() !== 640){
            self.view.paginationFooter.setVisibility(true);
            self.view.paginationHeader.setVisibility(true);  
          }
          self.modifySearch();
        };
        this.view.btnClearSearch.onClick = function() {
          self.searchViewModel.searchPerformed = false;
          self.clearSearch();     
          self.hideSearchFlex();
          if(self.selectedTab === 6)
          {
            self.setTab6Data(self._tab6Criteria, 6);
          }
          else
          {
            self.setSelectedTabData(self._filterTab1, 1)
          }

        };
        if(!self._TLenableForSearch)
          {
            self.view.paginationFooter.setVisibility(false);
            self.view.paginationHeader.setVisibility(false);
          }
        this.setSearchVisible(false);
        this.setSearchResultsVisible(true);
        this.configureActionsForTags(searchViewModel);
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in showing search results",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component modifySearch
     * This method is used to change the UI so that User can modify the search.
     */ 
    modifySearch: function() {
      var self = this;
      try
      {
        this.searchViewModel.visible = true;
        this.searchViewModel.searchPerformed = false;
        this.renderSearchForm(this.searchViewModel);
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in modifying the search",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component onTimePeriodChange
     * This method is used to check for custom date range and enable or disable Datewidgets.
     */ 
    onTimePeriodChange: function() {
      var self = this;
      try
      {
        if (this.view.lstbxTimePeriod.selectedKey === this.searchConstants.CUSTOM_DATE_RANGE) {
          this.showByDateWidgets();
        } else {
          this.hideByDateWidgets();
        }
        this.checkSearchButtonState();
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in showing or hiding date widgets",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component checkSearchButtonState
     * This method is used to enable or disable the search button based on user input.
     */ 
    checkSearchButtonState: function() {
      var self = this;
      try
      {
        var formData = this.updateSearchViewModel({});
        if (this.userCanSearch(formData)) {
          this.enableSearchButton();
        } else {
          this.disableSearchButton();
        }
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in checking the search button state.",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
     /**
     * Component checkBlockedFundsSearchButtonState
     * This method is used to enable or disable the search button based on user input in Blocked funds.
     */ 
    checkBlockedFundsSearchButtonState: function() {
      var self = this;
      try
      {
        var formData = this.updateSearchViewModel({});
        if (this.userCanSearchBlockedFunds(formData)) {
          this.enableSearchButtonBF();
        } else {
          this.disableSearchButtonBF();
        }
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in checking the search button state.",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component onSearchToggle
     * This method is used to toggle between transactions and blocked funds search
     */ 
    onSearchToggle: function()
    {
      var self = this;
      try
      {
        if(this.view.imgRadioBtnAccountType1.text === "M")
        {
          this.view.imgRadioBtnAccountType1.skin = "ICSknC2";
          this.view.imgRadioBtnAccountType2.skin = "sknlblOLBFonts0273E420pxOlbFontIcons";
          this.view.imgRadioBtnAccountType1.text = "L";
          this.view.imgRadioBtnAccountType2.text = "M";
          this.view.flxSearchContainerWrapper.setVisibility(false);
          this.view.flxBFSearchContainer.setVisibility(true);
          this.clearSearch();
          this.updateSearchViewModel();
        }
        else
        {
          this.view.imgRadioBtnAccountType1.skin = "sknlblOLBFonts0273E420pxOlbFontIcons";
          this.view.imgRadioBtnAccountType2.skin = "ICSknC2";
          this.view.imgRadioBtnAccountType1.text = "M";
          this.view.imgRadioBtnAccountType2.text = "L";
          this.view.flxSearchContainerWrapper.setVisibility(true);
          this.view.flxBFSearchContainer.setVisibility(false);
          this.clearSearch();
          this.updateSearchViewModel();
        }
        this.adjustScreen();
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in toggle of search type",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component bindSearchFormActions
     * This method is used to bind all the actions for ever filed in search Flex.
     */ 
    bindSearchFormActions: function() {
      var scope = this;
      try
      {
        this.view.btnSearch.onClick = function() {
          scope.updateSearchViewModel();
          scope.startSearch();
        };
        this.view.btnBFSearch.onClick = function(){
          scope.updateSearchViewModel();
          scope.startBFSearch();
        };
        this.view.btnCancel.onClick = function() {
          scope.clearSearch();
          scope.searchViewModel.visible = false;
          scope.hideSearchFlex();
          scope.searchViewModel.searchPerformed = false;
        };
        this.view.btnBFCancel.onClick = function() {
          scope.clearSearch();
          scope.searchViewModel.visible = false;
          scope.hideSearchFlex();
          scope.searchViewModel.searchPerformed = false;
        };
        this.view.imgRadioBtnAccountType1.onTouchStart = this.onSearchToggle;
        this.view.imgRadioBtnAccountType2.onTouchStart = this.onSearchToggle;
        this.view.txtKeyword.onKeyUp = this.checkSearchButtonState;
        this.view.txtBFKeyword.onKeyUp = this.checkBlockedFundsSearchButtonState;
        this.view.txtBFReferenceNumber.onKeyUp = this.checkBlockedFundsSearchButtonState;
        this.view.calBFDateFrom.onSelection = this.checkBlockedFundsSearchButtonState;
        this.view.calBFDateTo.onSelection = this.checkBlockedFundsSearchButtonState;
		this.view.calBFDateFrom.onTouchEnd = this.checkBlockedFundsSearchButtonState;
        this.view.calBFDateTo.onTouchEnd = this.checkBlockedFundsSearchButtonState;
        this.view.lstbxTransactionType.onSelection = this.checkSearchButtonState;
        this.view.txtCheckNumberFrom.onKeyUp = this.checkSearchButtonState;
        this.view.lstbxTimePeriod.onSelection = this.onTimePeriodChange;
        this.view.txtCheckNumberTo.onKeyUp = this.checkSearchButtonState;
        this.view.txtAmountRangeFrom.onKeyUp = this.checkSearchButtonState;
        this.view.txtAmountRangeTo.onKeyUp = this.checkSearchButtonState;
        var scopeObj = this;
        this.view.calDateFrom.onSelection = function() {
          var fromdate = scopeObj.view.calDateFrom.dateComponents;
          var today = new Date();
          scopeObj.view.calDateTo.enableRangeOfDates([fromdate[0], fromdate[1], fromdate[2]], [today.getDate(), today.getMonth() + 1, today.getFullYear()], "skn", true);
        };
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in binding actions to search fileds.",
              "errorLevel" : "Business",
              "error": err
            };
        scope.onError(errorObj);
      }
    },
    /**
     * Component startSearch
     * This method is used to create the criteria and do search service call and 
     * fetch search results.
     */
    startSearch: function() {
      var scopeObj = this;
      try
      {
        this.requestStart();
        this.searchViewModel.searchPerformed = true;
        this.searchViewModel.dateRange = this.getDateRangeForTimePeriod(this.searchViewModel);
        var startDate = this.searchViewModel.dateRange.startDate;
        var endDate = this.searchViewModel.dateRange.endDate;
        var commandObj = {
          searchTransactionType: this.searchViewModel.transactionTypeSelected,
          searchDescription: this.searchViewModel.keyword,
          searchMinAmount: this.searchViewModel.fromAmount,
          searchMaxAmount: this.searchViewModel.toAmount,
          searchStartDate: startDate,
          searchEndDate: endDate,
          isScheduled: 0,
          fromCheckNumber: this.searchViewModel.fromCheckNumber,
          toCheckNumber: this.searchViewModel.toCheckNumber,
          accountNumber: this.getFieldValue(scopeObj._TLaccountId),
          offset: scopeObj.offset,
          limit : parseInt(scopeObj.noOfRecords)
        };
        var criteria = kony.mvc.Expression.and(kony.mvc.Expression.eq("searchTransactionType", commandObj.searchTransactionType), kony.mvc.Expression.eq("searchDescription", commandObj.searchDescription), kony.mvc.Expression.eq("searchMinAmount", commandObj.searchMinAmount), kony.mvc.Expression.eq("searchMaxAmount", commandObj.searchMaxAmount), kony.mvc.Expression.eq("searchStartDate", commandObj.searchStartDate), kony.mvc.Expression.eq("searchEndDate", commandObj.searchEndDate), kony.mvc.Expression.eq("fromCheckNumber", commandObj.fromCheckNumber), kony.mvc.Expression.eq("toCheckNumber", commandObj.toCheckNumber), kony.mvc.Expression.eq("accountNumber", commandObj.accountNumber), kony.mvc.Expression.eq("isScheduled", commandObj.isScheduled), kony.mvc.Expression.eq("searchType", "Search"));
        if(this._dataAvailability == "Service calls by component")
          this.transactionListDAO.fetchTransactionsByCriteria(criteria, this.fetchTransactionsBySearchSuccess, this.fetchTransactionsBySearchFailure);
        else
          this.dataRequestCallback(commandObj);
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in the creating search criteria and invoking search service call",
              "errorLevel" : "Business",
              "error": err
            };
        scopeObj.onError(errorObj);
      }
    },
    /**
     * Component startBFSearch
     * This method is used to create the criteria and do search service call and 
     * fetch search results for blocked funds.
     */
    startBFSearch: function()
    {
      var scopeObj = this;
      try
      {
        this.requestStart();
        this.searchViewModel.searchPerformed = true;
        this.searchViewModel.bfDateRange = this.getDateRangeForTimePeriod(this.searchViewModel);
        var startDate = this.searchViewModel.bfDateRange.bfStartDate;
        var endDate = this.searchViewModel.bfDateRange.bfEndDate;      
        var commandObj = {
          accountID : this.getFieldValue(scopeObj._TLaccountId),
          lockedEventId : this.searchViewModel.bfReferenceNumber,
          lockReason: this.searchViewModel.bfKeyword,
          searchStartDate : startDate,
          searchEndDate : endDate
        }
        var criteria = commandObj;
        var operationName = "getBlockedFunds";
        if(this._tab6ObjectServiceName && this._tab6ObjectName && operationName){
          this.transactionListDAO.fetchTransactionList(this._tab6ObjectServiceName,operationName,this._tab6ObjectName,criteria,this._tab6ServiceResponseIdentifier,this.processSearchResponce,this.onError);
        }
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in the creating search criteria and invoking search service call",
              "errorLevel" : "Business",
              "error": err
            };
        scopeObj.onError(errorObj);
      }
    },
    /**
     * Component processSearchResponce
     * This method is invoked on success of Block funds Search transactions service call.
     * @param : data {Array} -  consists of the arrays transactions JSON. 
     */
    processSearchResponce: function(data){
      var scope = this;
      this.updateSearchTransactionView(data["Transactions"]);
      this.selectedTab = 6;
	  this.setSelectedTabUI();
	  this.tab6CacheUtils.setData(data["Transactions"]);
      this.requestEnd();
    },
    /**
     * Component fetchTransactionsBySearchSuccess
     * This method is invoked on success of Search transactions service call.
     * @param : data {Array} -  consists of the arrays transactions JSON. 
     */
    fetchTransactionsBySearchSuccess: function(data){
      var scope = this;
      this.updateSearchTransactionView(data);
      this.selectedTab = 1;
	  this.setSelectedTabUI();
	  this.cacheUtils.setData(data);
      this.requestEnd();
    },
    /**
     * Component fetchTransactionsBySearchFailure
     * This method is invoked on failure of Search transactions service call.
     * @param : err - {JSONObject} - consists of the error message.
     */
    fetchTransactionsBySearchFailure: function(err){
      var self = this;
      this.requesEnd();
      var errorObj =
          {
            "errorInfo" : "Error in the search service call",
            "errorLevel" : "Fabric",
            "error": err
          };
      self.onError(errorObj);
    },
    /**
     * Component tagState
     * This is used to keep track on tags in searchResult flex.
     */
    tagState: {
      visible: 0,
      NUMBER_OF_TAGS: 5,
      decrement: function() {
        if (this.visible > 0) {
          this.visible--;
        }
      },
      increment: function() {
        if (this.visible < this.NUMBER_OF_TAGS) {
          this.visible++;
        }
      }
    },
    /**
     * Component getTagConfig
     * Builds config for all the tags that are shown in flex searchResults.
     * @param : searchViewModel {JSONObject} - locally maintained search parameters.
     * @return : config{JSON} -  the config of Tags
     */
    getTagConfig: function(searchViewModel) {
      var scopeObj = this;
      try
      {
        var config;
        if (kony.application.getCurrentBreakpoint() == 640) {
          config = [{
            actionOn: 'flxCancelKeywordM',
            hide: ['flxKeywordWrapper'],
            clearPropertiesFromViewModel: [{
              propertyName: 'keyword',
              resetValue: ''
            }],
            value: {
              label: 'lblKeywordValueM',
              computedValue: function() {
                if (searchViewModel.keyword === "") {
                  return null;
                }
                return searchViewModel.keyword;
              }.bind(scopeObj)
            }
          }, {
            actionOn: 'flxBFCancelKeywordM',
            hide: ['flxBFKeywordWrapper'],
            clearPropertiesFromViewModel: [{
              propertyName: 'bfKeyword',
              resetValue: ''
            }],
            value: {
              label: 'lblBFKeywordValueM',
              computedValue: function() {
                if (searchViewModel.bfKeyword === "") {
                  return null;
                }
                return searchViewModel.bfKeyword;
              }.bind(scopeObj)
            }
          }, {
            actionOn: 'flxCancelTypeM',
            hide: ['flxTypeWrapper'],
            clearPropertiesFromViewModel: [{
              propertyName: 'transactionTypeSelected',
              resetValue: this.searchConstants.BOTH
            }],
            value: {
              label: 'lblTypeValueM',
              computedValue: function() {
                if (searchViewModel.transactionTypeSelected === this.searchConstants.BOTH) {
                  return null;
                }
                return kony.i18n.getLocalizedString(this.transactionTypes[searchViewModel.transactionTypeSelected]);
              }.bind(scopeObj)
            }
          }, {
            actionOn: 'flxCancelAmountRangeM',
            hide: ['flxAmountRangeWrapper'],
            clearPropertiesFromViewModel: [{
              propertyName: 'fromAmount',
              resetValue: ''
            }, {
              propertyName: 'toAmount',
              resetValue: ''
            }],
            value: {
              label: 'lblAmountRangeValueM',
              computedValue: function() {
                if (searchViewModel.fromAmount === "" || searchViewModel.toAmount === "") {
                  return null;
                }
                return this.FormatUtils.formatAmountAndAddCurrencySymbol(searchViewModel.fromAmount,"USD") + " to " + this.FormatUtils.formatAmountAndAddCurrencySymbol(searchViewModel.toAmount,"USD");
              }.bind(scopeObj)
            }
          }, {
            actionOn: 'flxCancelDateRangeM',
            hide: ['flxDateRangeWrapper'],
            clearPropertiesFromViewModel: [{
              propertyName: 'timePeriodSelected',
              resetValue: this.searchConstants.CHOOSE_TIME_RANGE
            }],
            value: {
              label: 'lblDateRangeValueM',
              computedValue: function() {
                if (searchViewModel.timePeriodSelected === this.searchConstants.CHOOSE_TIME_RANGE) {
                  return null;
                } else if (searchViewModel.timePeriodSelected === this.searchConstants.CUSTOM_DATE_RANGE) {
                  var fromDate = this.searchViewModel.dateRange.startDate;
                  var toDate = this.searchViewModel.dateRange.endDate;
                  return fromDate + " " + kony.i18n.getLocalizedString("i18n.transfers.lblTo") + " " + toDate;
                }
                return kony.i18n.getLocalizedString(this.timePeriods[searchViewModel.timePeriodSelected]);
              }.bind(scopeObj)
            }
          }, {
            actionOn: 'flxBFCancelDateRangeM',
            hide: ['flxBFDateRangeWrapper'],
            clearPropertiesFromViewModel: [{
              propertyName: 'bfFromDate',
              resetValue: ''
            },{
              propertyName: 'bfToDate',
              resetValue: ''
            }],
            value: {
              label: 'lblBFDateRangeValueM',
              computedValue: function() { 
                if(this.view.imgRadioBtnAccountType1.text !== "M")
                {
                  var fromDate = this.searchViewModel.bfDateRange.bfStartDate;
                  var toDate = this.searchViewModel.bfDateRange.bfEndDate;
                  return fromDate + " " + kony.i18n.getLocalizedString("i18n.transfers.lblTo") + " " + toDate;
                }
                else
                {
                  return null;
                }
              }.bind(scopeObj)
            }
          },{
            actionOn: 'flxBFCancelReferenceNumberM',
            hide: ['flxBFReferenceNumberWrapper'],
            clearPropertiesFromViewModel: [{
              propertyName: 'bfReferenceNumber',
              resetValue: ''
            }],
            value: {
              label: 'lblBFReferenceNumberValueM',
              computedValue: function() {
                if (searchViewModel.bfReferenceNumber === "") {
                  return null;
                }
                return searchViewModel.bfReferenceNumber;
              }.bind(scopeObj)
            }
          }, {
            actionOn: 'flxCancelCheckNumberM',
            hide: ['flxCheckNumberWrapper'],
            clearPropertiesFromViewModel: [{
              propertyName: 'fromCheckNumber',
              resetValue: ''
            }, {
              propertyName: 'toCheckNumber',
              resetValue: ''
            }],
            value: {
              label: 'lblCheckNumberValueM',
              computedValue: function() {
                if (searchViewModel.fromCheckNumber === "" || searchViewModel.toCheckNumber === "") {
                  return null;
                }
                return searchViewModel.fromCheckNumber + " " + kony.i18n.getLocalizedString("i18n.transfers.lblTo") + " " + searchViewModel.toCheckNumber;
              }.bind(scopeObj)
            }
          }];
        } else {

          config = [{
            actionOn: 'flxCancelKeyword',
            hide: ['lblKeywordTitle', 'lblKeywordValue'],
            clearPropertiesFromViewModel: [{
              propertyName: 'keyword',
              resetValue: ''
            }],
            value: {
              label: 'lblKeywordValue',
              computedValue: function() {
                if (searchViewModel.keyword === "") {
                  return null;
                }
                return searchViewModel.keyword;
              }.bind(scopeObj)
            }
          },{
            actionOn: 'flxBFCancelKeyword',
            hide: ['lblBFKeywordTitle', 'lblBFKeywordValue'],
            clearPropertiesFromViewModel: [{
              propertyName: 'bfKeyword',
              resetValue: ''
            }],
            value: {
              label: 'lblBFKeywordValue',
              computedValue: function() {
                if (searchViewModel.bfKeyword === "") {
                  return null;
                }
                return searchViewModel.bfKeyword;
              }.bind(scopeObj)
            }
          },  {
            actionOn: 'flxCancelType',
            hide: ['lblTypeValue', 'lblTypeTitle'],
            clearPropertiesFromViewModel: [{
              propertyName: 'transactionTypeSelected',
              resetValue: this.searchConstants.BOTH
            }],
            value: {
              label: 'lblTypeValue',
              computedValue: function() {
                if (searchViewModel.transactionTypeSelected === this.searchConstants.BOTH) {
                  return null;
                }
                return kony.i18n.getLocalizedString(this.transactionTypes[searchViewModel.transactionTypeSelected]);
              }.bind(scopeObj)
            }
          }, {
            actionOn: 'flxCancelAmountRange',
            hide: ['lblAmountRangeTitle', 'lblAmountRangeValue'],
            clearPropertiesFromViewModel: [{
              propertyName: 'fromAmount',
              resetValue: ''
            }, {
              propertyName: 'toAmount',
              resetValue: ''
            }],
            value: {
              label: 'lblAmountRangeValue',
              computedValue: function() {
                if (searchViewModel.fromAmount === "" || searchViewModel.toAmount === "") {
                  return null;
                }
                return this.FormatUtils.formatAmountAndAddCurrencySymbol(searchViewModel.fromAmount,"USD") + " to " + this.FormatUtils.formatAmountAndAddCurrencySymbol(searchViewModel.toAmount,"USD");
              }.bind(scopeObj)
            }
          }, {
            actionOn: 'flxCancelDateRange',
            hide: ['lblDateRangeTitle', 'lblDateRangeValue'],
            clearPropertiesFromViewModel: [{
              propertyName: 'timePeriodSelected',
              resetValue: this.searchConstants.CHOOSE_TIME_RANGE
            }],
            value: {
              label: 'lblDateRangeValue',
              computedValue: function() {
                if (searchViewModel.timePeriodSelected === this.searchConstants.CHOOSE_TIME_RANGE) {
                  return null;
                } else if (searchViewModel.timePeriodSelected === this.searchConstants.CUSTOM_DATE_RANGE) {
                  var fromDate = this.searchViewModel.dateRange.startDate;
                  var toDate = this.searchViewModel.dateRange.endDate;
                  return fromDate + " " + kony.i18n.getLocalizedString("i18n.transfers.lblTo") + " " + toDate;
                }
                return kony.i18n.getLocalizedString(this.timePeriods[searchViewModel.timePeriodSelected]);
              }.bind(scopeObj)
            }
          },{
            actionOn: 'flxBFCancelDateRange',
            hide: ['lblBFDateRangeTitle', 'lblBFDateRangeValue'],
            clearPropertiesFromViewModel: [{
              propertyName: 'bfFromDate',
              resetValue: ''
            },{
              propertyName: 'bfToDate',
              resetValue: ''
            }],
            value: {
              label: 'lblBFDateRangeValue',
              computedValue: function() { 
                if(this.view.imgRadioBtnAccountType1.text !== "M" &&  this.searchViewModel.bfDateRange.bfStartDate !== null && this.searchViewModel.bfDateRange.bfEndDate)
                {
                  var fromDate = this.searchViewModel.bfDateRange.bfStartDate;
                  var toDate = this.searchViewModel.bfDateRange.bfEndDate;
                  return fromDate + " " + kony.i18n.getLocalizedString("i18n.transfers.lblTo") + " " + toDate;
                }
                else
                {
                  return null;
                }
              }.bind(scopeObj)
            }
          },{
            actionOn: 'flxBFCancelReferenceNumber',
            hide: ['lblBFReferenceNumberTitle', 'lblBFReferenceNumberValue'],
            clearPropertiesFromViewModel: [{
              propertyName: 'bfReferenceNumber',
              resetValue: ''
            }],
            value: {
              label: 'lblBFReferenceNumberValue',
              computedValue: function() {
                if (searchViewModel.bfReferenceNumber === "") {
                  return null;
                }
                return searchViewModel.bfReferenceNumber;
              }.bind(scopeObj)
            }
          }, {
            actionOn: 'flxCancelCheckNumber',
            hide: ['lblCheckNumberTitle', 'lblCheckNumberValue'],
            clearPropertiesFromViewModel: [{
              propertyName: 'fromCheckNumber',
              resetValue: ''
            }, {
              propertyName: 'toCheckNumber',
              resetValue: ''
            }],
            value: {
              label: 'lblCheckNumberValue',
              computedValue: function() {
                if (searchViewModel.fromCheckNumber === "" || searchViewModel.toCheckNumber === "") {
                  return null;
                }
                return searchViewModel.fromCheckNumber + " " + kony.i18n.getLocalizedString("i18n.transfers.lblTo") + " " + searchViewModel.toCheckNumber;
              }.bind(scopeObj)
            }
          }];
        }
        return config;
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in checking the search button state.",
              "errorLevel" : "Business",
              "error": err
            };
        scopeObj.onError(errorObj);
      }
    },

    /**
     * Component configureActionsForTags
     * This method is used to assign Actions to all the tags in SearchResults flex.
     * @param : searchViewModel {JSONObject} - locally maintained search parameters.
    */
    configureActionsForTags: function(searchViewModel) {
      var scopeObj = this;
      try
      {
        var tagConfig = scopeObj.getTagConfig(searchViewModel);
        function generateClickListenerForTag(config) {
          return function() {
            hideTag(config);
            scopeObj.tagState.decrement();
            config.clearPropertiesFromViewModel.forEach(function(property) {
              scopeObj.searchViewModel[property.propertyName] = property.resetValue;
            });
            if (scopeObj.tagState.visible === 0) {
              scopeObj.clearSearch();
              scopeObj.searchViewModel.visible = false;
              scopeObj.hideSearchFlex();
              if(scopeObj.selectedTab === 6)
              {
                scopeObj.setTab6Data(scopeObj._tab6Criteria, 6);
              }
              else
              {
                scopeObj.setSelectedTabData(scopeObj._filterTab1, 1)
              }
              if(kony.application.getCurrentBreakpoint() !== 640){
                scopeObj.view.flxPaginationWrapper.setVisibility(true);
                scopeObj.view.flxPickListHeader.setVisibility(scopeObj._TLrecordsPerPagePickList);
                scopeObj.view.flxPickListFooter.setVisibility(scopeObj._TLrecordsPerPagePickList);
              }
            } else {
              if(scopeObj.view.imgRadioBtnAccountType1.text !== "M")
               scopeObj.startBFSearch();
              else
               scopeObj.startSearch();
            }
            scopeObj.view.forceLayout();
          };
        }
        function hideTag(config) {
          scopeObj.view[config.actionOn].setVisibility(false);
          config.hide.forEach(function(widgetToHide) {
            scopeObj.view[widgetToHide].setVisibility(false);
          });
          scopeObj.view.forceLayout();
        }
        function showTag(config) {
          scopeObj.view[config.actionOn].setVisibility(true);
          config.hide.forEach(function(widgetToHide) {
            scopeObj.view[widgetToHide].setVisibility(true);
          });
          scopeObj.view.forceLayout();
          scopeObj.tagState.increment();
        }
        this.tagState.visible = 0;
        tagConfig.forEach(function(config) {
          if (config.value.computedValue() === null) {
            hideTag(config);
          } else {
            showTag(config);
            scopeObj.view[config.actionOn].onClick = generateClickListenerForTag(config);
            scopeObj.view[config.value.label].text = config.value.computedValue();
          }
        });
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in the configuration of action tags",
              "errorLevel" : "Business",
              "error": err
            };
        scopeObj.onError(errorObj);
      }
    },
    /**
     * Component userCanSearch
     * This method is used to decide whether to enable or disable search button
     * @param : formData{JSON} consists of all the parameters for search
     * @return : {Boolean}  to enable or disable search
    */
    userCanSearch: function(formData) {
      var self = this
      try
      {
        var searchConstants = this.searchConstants;
        function checkIfEmpty(value) {
          if (value === null || value === "") {
            return true;
          }
          return false;
        }
        if (!checkIfEmpty(formData.keyword)) {
          return true;
        } else if (formData.transactionTypeSelected !== searchConstants.BOTH) {
          return true;
        } else if (formData.timePeriodSelected !== searchConstants.CHOOSE_TIME_RANGE) {
          return true;
        } else if (!checkIfEmpty(formData.fromCheckNumber) && !checkIfEmpty(formData.toCheckNumber)) {
          return true;
        } else if (!checkIfEmpty(formData.fromAmount) && !checkIfEmpty(formData.toAmount)) {
          return true;
        } else {
          return false;
        }
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in checking the whether user can search or not",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
     /**
     * Component userCanSearchBlockedFunds
     * This method is used to decide whether to enable or disable search button in blocked funds
     * @param : formData{JSON} consists of all the parameters for search
     * @return : {Boolean}  to enable or disable search
    */
    userCanSearchBlockedFunds: function(formData) {
      var self = this
      try
      {
        
        function checkIfEmpty(value) {
          if (value === null || value === "") {
            return true;
          }
          return false;
        }
        if (!checkIfEmpty(formData.bfKeyword)) {
          return true;
        }
        else if (!checkIfEmpty(formData.bfReferenceNumber)) {
          return true;
        }
        else if(formData.bfFromDate!== null && formData.bfToDate!== null)
          {
            return true;
          }
        else {
          return false;
        }
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in checking the whether user can search or not",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component getDateRangeForTimePeriod
     * This method is used to get the start date and end date for search in backend Date format.
     * @param : searchviewmodel{JSON} - consists of all the parameters for search
     * @return : {JSON} - of start date and end date
    */
    getDateRangeForTimePeriod: function(searchviewmodel) {
      var self = this;
      try
      {
        var startDate = null;
        var endDate = null;
        var bfStartDate = null;
        var bfEndDate = null;
        if (searchviewmodel.timePeriodSelected === this.searchConstants.CHOOSE_TIME_RANGE) {
          startDate = "";
          endDate = "";
        } else if (searchviewmodel.timePeriodSelected === 'CUSTOM_DATE_RANGE') {
          function padDigits(n) {
            n = n + '';
            return n.length >= 2 ? n : new Array(2 - n.length + 1).join('0') + n;
          }
          var dd_mm_yyyy_startDate = padDigits(searchviewmodel.fromDate[0]) + "/" + padDigits(searchviewmodel.fromDate[1]) + "/" + searchviewmodel.fromDate[2];
          var dd_mm_yyyy_endDate = padDigits(searchviewmodel.toDate[0]) + "/" + padDigits(searchviewmodel.toDate[1]) + "/" + searchviewmodel.toDate[2];
          startDate = this.FormatUtils.getFormatedDateString(this.FormatUtils.getDateObjectFromCalendarString(dd_mm_yyyy_startDate, "DD/MM/YYYY"), "Y-m-d");
          endDate = this.FormatUtils.getFormatedDateString(this.FormatUtils.getDateObjectFromCalendarString(dd_mm_yyyy_endDate, "DD/MM/YYYY"), "Y-m-d");
        } else {
          var dateConfig = {
            LAST_SEVEN_DAYS: 7,
            LAST_FOURTEEN_DAYS: 14,
            LAST_ONE_MONTH: 30,
            LAST_TWO_MONTHS: 60,
            LAST_THREE_MONTHS: 90,
            LAST_SIX_MONTHS: 180,
            LAST_TWELVE_MONTHS: 365
          };
          var today = new Date();
          endDate = this.FormatUtils.getFormatedDateString(today, this.formattingJSON.backenddateformat);
          today.setDate(today.getDate() - dateConfig[searchviewmodel.timePeriodSelected]);
          startDate = this.FormatUtils.getFormatedDateString(today, this.formattingJSON.backenddateformat);
        }
        if(this.view.imgRadioBtnAccountType1.text !== "M" && searchviewmodel.bfFromDate !== null && searchviewmodel.bfToDate!== null)
        {
          function padDigits(n) {
            n = n + '';
            return n.length >= 2 ? n : new Array(2 - n.length + 1).join('0') + n;
          }
          var dd_mm_yyyy_startDate = padDigits(searchviewmodel.bfFromDate[0]) + "/" + padDigits(searchviewmodel.bfFromDate[1]) + "/" + searchviewmodel.bfFromDate[2];
          var dd_mm_yyyy_endDate = padDigits(searchviewmodel.bfToDate[0]) + "/" + padDigits(searchviewmodel.bfToDate[1]) + "/" + searchviewmodel.bfToDate[2];
          bfStartDate = this.FormatUtils.getFormatedDateString(this.FormatUtils.getDateObjectFromCalendarString(dd_mm_yyyy_startDate, "DD/MM/YYYY"), "Y-m-d");
          bfEndDate = this.FormatUtils.getFormatedDateString(this.FormatUtils.getDateObjectFromCalendarString(dd_mm_yyyy_endDate, "DD/MM/YYYY"), "Y-m-d");          
        }
        else
        {
          bfStartDate = "";
          bfEndDate = "";
        }
        return {
          startDate: startDate,
          endDate: endDate,
          bfStartDate: bfStartDate,
          bfEndDate: bfEndDate
        };
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in getting date range for selected time period",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
	/**
     * Component performTransactionOperations
     * Reponsible to perform the search or retrieve transactions operations after pager component events
     */
    performTransactionOperations : function(){
	try{
      var self = this;
      this.state = "pagination";
      if(self.searchViewModel.searchPerformed === true)
      {
        self.getCacheData();
      }
      else
      {
        if(self.selectedTab === 6)
        {
          self.getTab6Transactions();
        }
        else
        {
          if(self._dataAvailability === "Service calls by component")
            self.getTransactionList();
          else
            self.dataRequestCallback();
        }
      }
	}
	 catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in performing search or transactions retrieval operation",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }

    },
   /**
     * Component fetchPaginationHeader
     * Reponsible to update the offset and limit on the pagination header component events
	 * @param : offset {Integer} - offset calculated based on the pagination buttons click 
	 * @param : limit {Integer} - limit calculated based on the pagination buttons click
     */
    fetchPaginationHeader: function(offset,noOfRecords){
	try{
      var self = this;
      self.criteria["offset"] = offset;
      self.criteria["limit"] = noOfRecords;
      this.noOfRecords = noOfRecords;
      this.offset = offset;
      this.view.paginationFooter.setDropDownSelectedKey();
      this.view.paginationFooter.collapseDropDown();
      this.performTransactionOperations();
	}
	 catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting the offset,limit and update dropdown selected value for pagination header",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
	
    },
   /**
     * Component fetchPaginationFooter
     * Reponsible to update the offset and limit on the pagination footer component events
	 * @param : offset {Integer} - offset calculated based on the pagination buttons click 
	 * @param : limit {Integer} - limit calculated based on the pagination buttons click
     */
    fetchPaginationFooter: function(offset,noOfRecords){
	try{
      var self = this;
      self.criteria["offset"] = offset;
      self.criteria["limit"] = noOfRecords;
      this.noOfRecords = noOfRecords;
      this.offset = offset;
      this.view.paginationHeader.setDropDownSelectedKey();
      this.view.paginationHeader.collapseDropDown();
      this.performTransactionOperations();
	}
	catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting the offset,limit and update dropdown selected value for pagination footer",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    showCalenders:function(){
      this.view.flxBoxSearch.skin = this._sknSearchTextbox;
      this.view.txtKeyword.setFocus(false);
      this.view.datePicker.resetCalendar();
      if(this.view.flxCalWhole.isVisible) {
        if((this.dateText !== "") && (this.dateKey !== "")){
          if(this.tabMapping[this.selectedTab] === this.getFieldValue("{i.i18n.wealth.reports}")){
            this.view.flxInside.skin = "ICSknFlxffffffBorder003e751pxRadius3px";
            this.view.lblText.text = this.dateText;
          }
          else{
            this.view.flxInsideCalendar.skin = "skne3e3e3br3pxradius";
            this.view.lblAutoDays.text =  this.dateText;
          }
          this.view.datePicker.setDefaultDateFilter(this.dateKey);
          
           this.view.flxCalWhole.isVisible = false;
        }
        else{
          if(this.tabMapping[this.selectedTab] === this.getFieldValue("{i.i18n.wealth.reports}")){
            this.view.flxInside.skin = "ICSknFlxffffffBorder003e751pxRadius3px";
            this.showCalendarWithPrevDates(this.view.lblText.text );
          }
          else{
             this.view.flxInsideCalendar.skin = "skne3e3e3br3pxradius";
            this.showCalendarWithPrevDates(this.view.lblAutoDays.text);
          }
         
        }
      }
      else{
         if(this.tabMapping[this.selectedTab] === this.getFieldValue("{i.i18n.wealth.reports}")){
            this.view.flxInside.skin = "ICSknFlxffffffBorder003e751pxRadius3px";
            this.view.flxCalWhole.top = "235dp";
            this.view.flxCalWhole.left = "2%";
            this.showCalendarWithPrevDates(this.view.lblText.text );
          }
          else{
            this.view.flxInsideCalendar.skin = "ICSknFlxffffffBorder003e751pxRadius3px";
            this.showCalendarWithPrevDates(this.view.lblAutoDays.text);
          }
       // this.showCalendarWithPrevDates(this.view.lblAutoDays.text);
        this.view.flxCalWhole.setVisibility(true);
        }
      kony.application.getCurrentForm().forceLayout();
      
      if(scope_WealthPresentationController.rtlLocale.includes(kony.i18n.getCurrentLocale())){

        let tempDom = document.querySelectorAll("[kwp='frmPortfolioOverview_portfolioDetails_datePicker_flxFromCalender']")
        if (tempDom && tempDom[0]) {
          tempDom[0].style.left="52.5%";
        }

        tempDom = document.querySelectorAll("[kwp='frmPortfolioOverview_portfolioDetails_datePicker_flxToCalender']")
        if (tempDom && tempDom[0]) {
          tempDom[0].style.left="2.5%";
        }

        tempDom = document.querySelectorAll("[kwp='frmPortfolioOverview_portfolioDetails_datePicker_flxTo']")
        if (tempDom && tempDom[0]) {
          tempDom[0].style.setProperty('left', 'calc(19%)');
        }


        tempDom = document.querySelectorAll("[kwp='frmPortfolioOverview_portfolioDetails_datePicker_flxFrom']")
        if (tempDom && tempDom[0]) {
          tempDom[0].style.setProperty('left', 'calc(74% - 15px)');
        }
      }
      
    },
   
//     call this function to set the date when user comes back to calender without previously setting any date, i.e. w/o clicking on apply.
    showCalendarWithPrevDates:function(combinedDate){
    var fromDateVal="";
	var toDate="";
	if(this.tabMapping[this.selectedTab] === this.getFieldValue("{i.i18n.wealth.accountsActivity}") || this.tabMapping[this.selectedTab] === this.getFieldValue("{i.i18n.wealth.performance}") ||this.tabMapping[this.selectedTab] == this.getFieldValue("{i.i18n.wealth.reports}")){
		fromDateVal = this.startDate.substring(4,6)+"/"+this.startDate.substring(6,8)+"/"+this.startDate.substring(0,4);
		toDate = this.endDate.substring(4,6)+"/"+this.endDate.substring(6,8)+"/"+this.endDate.substring(0,4);
	}else{
		 fromDateVal= this.dateToStringWithHipehens(this.startDate);
		 toDate= this.dateToStringWithHipehens(this.endDate);
	}
      var month = fromDateVal.split("/")[0];
      var fromDate = fromDateVal.split("/")[1];
      var year = fromDateVal.split("/")[2];
     // this.fromDateCalcOnBtnSelection(this.dateToString(fromDateVal)); //not necessary though
      this.view.datePicker.setSelectedDate(fromDateVal);
      this.view.datePicker.setMonthLabelText();
      // for toDate
      this.view.datePicker.setSelectedDateTo(toDate);
      this.view.datePicker.setMonthLabelTextTo();
     // this.enableButton(this.view.btnApply);
      
      if(combinedDate.includes("-")){ //if textbox previously contained Previous labels
        if(this.tabMapping[this.selectedTab] === this.getFieldValue("{i.i18n.wealth.reports}")){
          this.view.lblText.text = fromDateVal+"-"+toDate;
        }
        else{
          this.view.lblAutoDays.text = fromDateVal+"-"+toDate;
        }
        
      }else{
        if(this.tabMapping[this.selectedTab] === this.getFieldValue("{i.i18n.wealth.reports}")){
          this.view.lblText.text= combinedDate;
        }
        else {
          this.view.lblAutoDays.text = combinedDate;
        }
      }
      this.view.flxCalWhole.isVisible = false;
    },
    returnCurrComponent: function(){
      return this.view;
    },
   
    dateToStringYearFirst: function (dateObj) {
          return ((dateObj.split("/")[2]) + "-" + (dateObj.split("/")[0]) + "-" + (dateObj.split("/")[1]));
    },
    dateToString: function (dateObj) {
      if (dateObj instanceof Date) {
        if (!isNaN(dateObj.getTime())) {
          return ((dateObj.getMonth() + 1) + "/" + dateObj.getDate() + "/" + dateObj.getFullYear());
        }
      }
      return "";
    },

     dateToStringWithHipehens: function (dateObj) {
          return ((dateObj.split("-")[1]) + "/" + (dateObj.split("-")[2]) + "/" + (dateObj.split("-")[0]));
    },
    getStartAndEndDatefromDateRangeComponent:function(combinedDate,prevDate){
      this.combinedDate = combinedDate; 
      this.prevFromDateOfCustom = prevDate;
    },
    serviceCallWithDateChangeParams : function(){
      var tab = this.tabMapping[this.selectedTab];
	  var st  = new Date(this.startDate);
	  var e  = new Date(this.endDate);
      if(tab == this.getFieldValue("{i.i18n.wealth.accountsActivity}") || tab == this.getFieldValue("{i.i18n.wealth.performance}") || tab == this.getFieldValue("{i.i18n.wealth.reports}")){
        this.startDate = st.getFullYear()  + ('0' + (st.getMonth() + 1)).slice(-2)  + ('0' + st.getDate()).slice(-2);
	    this.endDate = e.getFullYear()  + ('0' + (e.getMonth() + 1)).slice(-2)  + ('0' + e.getDate()).slice(-2);
      }else{
	    this.startDate = st.getFullYear() + '-' + ('0' + (st.getMonth() + 1)).slice(-2) + '-' + ('0' + st.getDate()).slice(-2);
	    this.endDate = e.getFullYear() + '-' + ('0' + (e.getMonth() + 1)).slice(-2) + '-' + ('0' + e.getDate()).slice(-2);
      }
    },
    setDateValue : function()
    {
      
      newDate=this.view.lblAutoDays.text;
      this.setDateParam(newDate,this.selectedTab);
    }
  };
});
