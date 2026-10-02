/*eslint-disable*/
define(['CommonUtilities'], function(CommonUtilities) {

  return{
    instrumentMinimal:{},
    ricCode:"",
    instrumentId:"",
    ISINCode:"",
    application: "",
    
    init : function(){
      try{
      var navManager = applicationManager.getNavigationManager();
      var currentForm=navManager.getCurrentForm();

      applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm); 
     }catch(err) {
        this.setError(err, "init");
      }
      },

    preShow : function(){
      try{
      this.setUiData();
      this.flag = true;
      var navManager = applicationManager.getNavigationManager();
      navManager.setCustomInfo("instrumentDetailsPage", this.flag);
		this.flag = false;
		
		this.view.investmentLineChart.currentFilter='1D';
      if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
        this.view.flxHeader.setVisibility(false);
        this.setChartData();
      }
            
      this.view.flxInstrumentInfo.setVisibility(true);
      this.view.btnViewTransactions.onClick = this.viewTransactions;
        this.checkPermissions();
     }catch(err) {
        this.setError(err, "preShow");
      }
    },


    setStarValue: function(serviceResponse){
     try{
      var favorite = false;     
      if (serviceResponse.favInstrumentCodes){ 
        if(serviceResponse.favInstrumentCodes.split('@').find(element=>element===this.ricCode)){     
          favorite = true;
        }
      }

      if (serviceResponse.favInstrumentIds){ 
        if(serviceResponse.favInstrumentIds.split('@').find(element=>element===this.instrumentId)){     
          favorite = true;
        }
      }   

      if(favorite)  
        this.view.imgFavourite.src = "active_star_1x.png";  
      else
        this.view.imgFavourite.src = "inactive_star_1x.png";
     }catch(err) {
        this.setError(err, "setStarValue");
      }
    },

    updateFavList: function(operation){
     try{
      var params = {};
      var wealthOrderModule = applicationManager.getModulesPresentationController("WealthOrderUIModule");
       

      if(operation === 'get'){

      
        wealthOrderModule.getUserFavoriteInstruments(params);

      }else{

        if(this.view.imgFavourite.src==="active_star_1x.png"){
          this.view.imgFavourite.src = "inactive_star_1x.png";
          operation = 'Remove';
        }else{
          this.view.imgFavourite.src="active_star_1x.png";
          operation = 'Add';
        }

        params = {
          "RICCode": this.ricCode,
          "operation": operation,
          "instrumentId": this.productDetails.instrumentId,
          "application" : this.productDetails.application
        };
        wealthOrderModule.updateFavouriteInstruments(params);
      }
      }catch(err) {
        this.setError(err, "updateFavList");
      }
    },
    
    postShow:function(){
      try{
      this.initActions();
       this.setUiData();       
         }catch(err) {
        this.setError(err, "postShow");
      }
    },
viewTransactions: function(){
  try{
  var navManager = applicationManager.getNavigationManager();
  var sortByValue = undefined;
  var data = {};
  data.response = sortByValue;
  navManager.setCustomInfo("frmSortBy", data);
  scope_WealthPresentationController.sortByValueInstrumentTrans = "";
  var today = new Date();
  var previousDate = new Date(today.getTime() - (30 * 24 * 60 * 60 * 1000));
  var startDate = previousDate.getFullYear() + '-' + ('0' + (previousDate.getMonth() + 1)).slice(-2) + '-' + ('0' + previousDate.getDate()).slice(-2);
  var endDate = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
  scope_WealthPresentationController.selectedDateRangeDetails = {
            startDate: startDate,
            endDate: endDate,
            selectedPeriod: "previous30DaysSelected",
            flag: false
          };
  var params = {
    "instrumentName" : this.view.lblInstrumentName.text,
    "ISINcode" : this.view.lblInstrumentSymbol.text,
    "instrumentId": this.instrumentId
  };
  applicationManager.getModulesPresentationController("WealthOrderUIModule").setInstrumentTransactions(params);
  navManager.navigateTo("frmInstrumentTransactions");
     }catch(err) {
        this.setError(err, "viewTransactions");
      }
},
    setDocuments:function(documentDetails){
   try{
      
      if(documentDetails.length<=0){
        this.view.flxDocuments.setVisibility(false);      
      }else{

        var results=[];

        for(var num in documentDetails){
          var storeData={
            pdfImage:"pdf.png",
            Name:documentDetails[num].type,
            downloadImage:"download.png",
            link:documentDetails[num].link
          };
          results.push(storeData);
        }
        this.view.segPdf.widgetDataMap = {
          imgPdf: "pdfImage",
          lblName: "Name",
          imgDownload: "downloadImage",
          dummylabel:"link"
        };
        this.view.segPdf.setData(results);
      }
      }catch(err) {
        this.setError(err, "setDocuments");
      }
    },

    setUiData:function(){
    try{
     
      var formatUtil=applicationManager.getFormatUtilManager();

      if(scope_WealthPresentationController.instrumentDetailsEntry===true){
        this.view.btnBuy.skin="sknBtnBgFFFFFFBorder1pxFont15px003E75";
        this.view.btnSell.skin="sknBtnBg003E75Border1pxFont15pxFFFFFF";
      }

      var data1=applicationManager.getNavigationManager().getCustomInfo('frmInstrumentDetails');
      this.productDetails = data1.instrumentDetails.productDetails;
		      if ((this.productDetails) && (Object.entries(this.productDetails).length > 0)) {
        this.ricCode = this.productDetails.RICCode;
        this.application = this.productDetails.application;
        this.instrumentId = this.productDetails.instrumentId;
        this.ISINCode = this.productDetails.ISINCode;
      }


      if(data1.instrumentDetails)
        this.view.investmentLineChart.currencySymbol = formatUtil.getCurrencySymbol(this.productDetails.instrumentCurrencyId);

      this.setDataOnRefresh();
       }catch(err) {
        this.setError(err, "setUiData");
      }
      if(kony.theme.getCurrentTheme() == "darkTheme"){
        this.view.flxShadowBox.height = '1px'
        this.view.flxPricingShadowBox.height = '1px'
        this.view.flxAssetShadow.height = '1px'
        this.view.flxDocumentShadowBox.height = '1px'
        this.view.flxRectangle.skin = 'sknflxffffffRadiusf6f6f64px'
        this.view.flxPricingRectangle.skin = 'sknflxffffffRadiusf6f6f64px'
        this.view.flxAssetRectangle.skin = 'sknflxffffffRadiusf6f6f64px'
        this.view.flxDocumentRectangle.skin = 'sknflxffffffRadiusf6f6f64px'
        this.view.flxStockRectangle.setVisibility(false);
      }
    },

    /*setCurrentPosition:function(currentposition){

      var formatUtil = applicationManager.getFormatUtilManager();
      var unrealPLMkt =currentposition.unrealizedProfitLossSecCcy?currentposition.unrealizedProfitLossSecCcy:0;

      if (unrealPLMkt < 0){
        this.view.lblPnlVal.skin = "sknlblee0005ssb121pr";}
      else{
        if (unrealPLMkt >= 0)
          this.view.lblPnlVal.skin = "sknlbl2f853ssp121pr";
        else
          this.view.lblPnlVal.skin = "sknLbl424242SSPReg30px";
      }
      if(currentposition.holdingsId || currentposition.instrumentId){
        this.view.flxCurrentposition.isVisible=true;
        this.view.lblmarketValue.text=formatUtil.formatAmountandAppendCurrencySymbol(currentposition.marketValPOS.replace(/,/g,''), currentposition.secCCy);
        this.view.lblPnlVal.text = (currentposition.unrealizedProfitLossSecCcy !== "-")?formatUtil.formatAmountandAppendCurrencySymbol(currentposition.unrealizedProfitLossSecCcy?currentposition.unrealizedProfitLossSecCcy:0, currentposition.secCCy):"        -";
        this.view.lblQuantityVal.text=currentposition.quantity?currentposition.quantity:'0';

        this.view.lblAverageCostVal.text=formatUtil.formatAmountandAppendCurrencySymbol(currentposition.costPrice,currentposition.secCCy);  
        if(currentposition.weightPercentage){
          //this.view.lblWeightVal.text=currentposition.weightPercentage+"%";
          this.view.lblWeightVal.text=applicationManager.getFormatUtilManager().formatAmount(currentposition.weightPercentage) + "%";
        
        }else{
          this.view.lblWeightVal.text = "0 %";
        }

      }else{

        this.view.flxCurrentposition.isVisible=true;
        this.view.lblmarketValue.text=formatUtil.formatAmountandAppendCurrencySymbol(0, this.instrumentMinimal.instrumentCurrencyId);
        this.view.lblPnlVal.text = formatUtil.formatAmountandAppendCurrencySymbol(0, this.instrumentMinimal.instrumentCurrencyId);
        this.view.lblQuantityVal.text='0';
        this.view.lblAverageCostVal.text=formatUtil.formatAmountandAppendCurrencySymbol(0,this.instrumentMinimal.instrumentCurrencyId);  
        this.view.lblWeightVal.text = "0 %";        
      }
	if(this.typeofAsset=="Bond" || this.typeofAsset=="Money Market" || this.typeofAsset == "Fixed Income"){
        this.view.lblAccruedVal.text=currentposition.accruedInterest?(formatUtil.formatAmountandAppendCurrencySymbol(currentposition.accruedInterest,currentposition.secCCy)):(formatUtil.formatAmountandAppendCurrencySymbol(0,currentposition.secCCy));
        this.view.flxAccruedInterest.setVisibility(true);
      }
      else{
          this.view.flxAccruedInterest.setVisibility(false);
      }
       if(currentposition.balance){
        this.view.lblmarketValue.text=formatUtil.formatAmountandAppendCurrencySymbol(currentposition.balance.replace(/,/g,''),currentposition.secCCy);
        this.view.lblMarketValLabel.text="Balance";
      }
      else{
          this.view.lblMarketValLabel.text="Market Value";
      }
      if(this.typeofAsset=="Forward"){
         if(currentposition.counterpartAmount || currentposition.costQuote){
           this.view.flxCurrentPositionFour.setVisibility(true);
         }
        if(currentposition.quote){
          this.view.flxAccruedInterest.setVisibility(true);
        }
        
          this.view.lbCounterPart.text=formatUtil.formatAmountandAppendCurrencySymbol(((currentposition.counterpartAmount)?(currentposition.counterpartAmount).replace(/,/g,''):0),currentposition.secCCy);
          this.view.lblCostQuote.text=formatUtil.formatAmountandAppendCurrencySymbol(((currentposition.costQuote)?(currentposition.costQuote).replace(/,/g,''):0),currentposition.secCCy);
          this.view.lblAccruedVal.text=formatUtil.formatAmountandAppendCurrencySymbol(((currentposition.quote)?(currentposition.quote).replace(/,/g,''):0),currentposition.secCCy);
          this.view.lblAccrued.text="Quote";
      if((this.view.flxCurrentPositionFour.isVisible === true) || (this.view.flxAccruedInterest.isVisible === true)){
        this.view.lblAverageCostVal.text=formatUtil.formatAmountandAppendCurrencySymbol(((currentposition.amountSold)?(currentposition.amountSold).replace(/,/g,''):0),currentposition.secCCy);
        this.view.lblAverageCostLabel.text="Amount Sold";
        this.view.lblWeightVal.text=formatUtil.formatAmountandAppendCurrencySymbol(((currentposition.amountBought)?(currentposition.amountBought).replace(/,/g,''):0),currentposition.secCCy);
        this.view.lblWeightLabel.text="Amount Bought%";
        this.view.lblQuantityVal.text=(currentposition.weightPercentage?(currentposition.weightPercentage):("0"))+"%";
        this.view.lblQuantityLabel.text="Weight%";
      }
      }
      else{
         this.view.flxCurrentPositionFour.setVisibility(false);
        this.view.lblAccrued.text="Accrued Interest";
         this.view.lblAverageCostLabel.text="Average Cost";
         this.view.lblWeightLabel.text="Weight%";
        if(this.typeofAsset){
          if(this.typeofAsset== "Fund" || this.typeofAsset== "Stock" || this.typeofAsset== "Fund Share"){
            this.view.lblQuantityLabel.text="Quantity";
          }else{
            this.view.lblQuantityLabel.text="Nominal";
          }
        }
        else{
          this.view.lblQuantityLabel.text="Quantity";
        }
      }
   //  if(this.typeofAsset=="Money Market"){
       //this.view.lblPnlLabel.text="Accrued Interest";
      //this.view.lblPnlVal.text=currentposition.accruedInterest?(formatUtil.formatAmountandAppendCurrencySymbol(currentposition.accruedInterest,currentposition.secCCy)):(formatUtil.formatAmountandAppendCurrencySymbol(0,currentposition.secCCy));
       //this.view.lblPnlVal.skin = "sknLbl424242SSPReg30px";
     //  this.view.flxAverageCost.isVisible=false;
      // this.view.flxAccruedInterest.setVisibility(false);
      //  this.view.flxCurrentPositionThree.setVisibility(false);
   //  }
     // else{
         this.view.flxCurrentPositionThree.setVisibility(true);
        this.view.lblPnlLabel.text="Unrealized P&L";
        this.view.flxAverageCost.isVisible=true;
     // }
    },

    setInstrumentDetailsTop: function(instrumentDetails, pricingDetails, currentPossition) {
		this.view.lblInstrumentName.text = ((this.instrumentMinimal.instrumentName) ? this.instrumentMinimal.instrumentName : "");
        this.view.lblInstrumentSymbol.text = (this.instrumentMinimal.ISINCode && this.instrumentMinimal.ISINCode != "") ? ((this.instrumentMinimal.stockExchange && this.instrumentMinimal.stockExchange != "") ?
            (this.instrumentMinimal.ISINCode + " | " + this.instrumentMinimal.stockExchange) : this.instrumentMinimal.ISINCode) : ((this.instrumentMinimal.stockExchange && this.instrumentMinimal.stockExchange != "") ? this.instrumentMinimal.stockExchange : "");

        if (this.typeofAsset == "Money Market" || this.typeofAsset == "Forward") {
            this.view.flximg.setVisibility(false);
        } else {
            this.view.flximg.setVisibility(true);
        }

        this.view.flxInstrumentIndicator.setVisibility(true);
        var formatUtil = applicationManager.getFormatUtilManager();
        var netchange = formatUtil.formatAmount(instrumentDetails.netchange);
        if (instrumentDetails.percentageChange === 0 || instrumentDetails.percentageChange === "0" || instrumentDetails.percentageChange === "0.00") {
            this.view.imgIndicator.isVisible = false;
            //this.view.lblCurrentValue.text = netchange + "(" + instrumentDetails.percentageChange + "%" + ")";
            this.view.lblCurrentValue.text = netchange + "(" + formatUtil.formatAmount(instrumentDetails.percentageChange) + "%" + ")";
        } else {
            this.view.imgIndicator.isVisible = true;
            if (instrumentDetails.percentageChange.substr(0, 1) === "-") {
                this.view.imgIndicator.src = "whitearrowdownfilled.png";
                this.view.lblCurrentValue.text = netchange.substr(1) + "(" + instrumentDetails.percentageChange + "%" + ")";

            } else {
                this.view.imgIndicator.src = "whitearrowupfilled.png";
                if (instrumentDetails.percentageChange.substr(0, 1) === "+" && netchange.substr(0, 1) === "+") {
                    this.view.lblCurrentValue.text = netchange.substr(1) + "(" + instrumentDetails.percentageChange + "%" + ")";

                } else if (netchange.substr(0, 1) === "+") {
                    this.view.lblCurrentValue.text = netchange.substr(1) + "(+" + instrumentDetails.percentageChange + "%" + ")";
                } else if (instrumentDetails.percentageChange.substr(0, 1) === "+") {
                    this.view.lblCurrentValue.text = netchange + "(" + instrumentDetails.percentageChange + "%" + ")";
                } else {
                    this.view.lblCurrentValue.text = netchange + "(+" + instrumentDetails.percentageChange + "%" + ")";
                }
            }
        }

        
        if (instrumentDetails.marketPrice && instrumentDetails.marketPrice !== undefined && instrumentDetails.marketPrice === "0.0") {
            this.view.lblInstrumentValue.text = formatUtil.formatAmountandAppendCurrencySymbol(instrumentDetails.closeRate, instrumentDetails.referenceCurrency.toUpperCase());
        } else if (instrumentDetails.marketPrice && instrumentDetails.marketPrice !== undefined && instrumentDetails.marketPrice !== "") {
            this.view.lblInstrumentValue.text = formatUtil.formatAmountandAppendCurrencySymbol(instrumentDetails.marketPrice, instrumentDetails.referenceCurrency.toUpperCase());
        } else if (this.instrumentMinimal.marketPrice && this.instrumentMinimal.marketPrice !== undefined && this.instrumentMinimal.marketPrice !== "") {
            this.view.lblInstrumentValue.text = formatUtil.formatAmountandAppendCurrencySymbol(this.instrumentMinimal.marketPrice, this.instrumentMinimal.referenceCurrency.toUpperCase());
        }
		
		if(currentPossition && currentPossition.isAdvisory && currentPossition.isAdvisory== true) { 
			this.view.btnSell.setVisibility(false);
            this.view.btnBuy.setVisibility(false);
		} else if((currentPossition && currentPossition.isAdvisory && currentPossition.isAdvisory== false)||(currentPossition.application!=undefined && currentPossition.application=='SC') || (currentPossition.isSecurityAsset!=undefined && currentPossition.isSecurityAsset =='true')
			||this.typeofAsset=='Stock' || this.typeofAsset=='Fund Share' || this.typeofAsset=='Fixed Income' || this.typeofAsset=='Bond' || this.typeofAsset=='Fund' ) { 
			this.view.btnSell.setVisibility(true);
            this.view.btnBuy.setVisibility(true);
		} else{
			this.view.btnSell.setVisibility(false);
            this.view.btnBuy.setVisibility(false);
		}		

        var instrumentDetailsDate = { 
            "timeReceived": ((instrumentDetails.timeReceived) ? instrumentDetails.timeReceived : "00:00:00"),
            "dateReceived": ((instrumentDetails.dateReceived) ? instrumentDetails.dateReceived : "")
        };
        if (instrumentDetails.dateReceived && instrumentDetails.dateReceived !== "") {
            this.view.imgRefresh.left = "-8Dp";
            this.view.lblInstrumentValueTime.text = "As of " + this.setDate(instrumentDetailsDate);
        } else {
            this.view.imgRefresh.left = "-20Dp";
            this.view.lblInstrumentValueTime.text = "";
        }  

    },

    instrumentDetailsNoRefinitiv: function(currentPossition) {
        var formatUtil=applicationManager.getFormatUtilManager();
        this.view.lblInstrumentName.text = ((this.instrumentMinimal.instrumentName) ? this.instrumentMinimal.instrumentName : "");
        this.view.lblInstrumentSymbol.text = (this.instrumentMinimal.ISINCode && this.instrumentMinimal.ISINCode != "") ? ((this.instrumentMinimal.stockExchange && this.instrumentMinimal.stockExchange != "") ?
            (this.instrumentMinimal.ISINCode + " | " + this.instrumentMinimal.stockExchange) : this.instrumentMinimal.ISINCode) : ((this.instrumentMinimal.stockExchange && this.instrumentMinimal.stockExchange != "") ? this.instrumentMinimal.stockExchange : "");

        if (this.typeofAsset == "Money Market" || this.typeofAsset == "Forward") {
            this.view.flximg.setVisibility(false);
        } else {
            this.view.flximg.setVisibility(true);
        }

        this.view.flxInstrumentIndicator.setVisibility(false);

        if (this.instrumentMinimal.marketPrice && this.instrumentMinimal.marketPrice !== undefined && this.instrumentMinimal.marketPrice !== "") {
            this.view.lblInstrumentValue.text = formatUtil.formatAmountandAppendCurrencySymbol(this.instrumentMinimal.marketPrice, this.instrumentMinimal.referenceCurrency);
        }
		
		if (currentPossition && currentPossition.isAdvisory && currentPossition.isAdvisory== true)  { 
			this.view.btnSell.setVisibility(false);
            this.view.btnBuy.setVisibility(false);
		} else if((currentPossition && currentPossition.isAdvisory && currentPossition.isAdvisory== false)||(currentPossition.application!=undefined && currentPossition.application=='SC') || (currentPossition.isSecurityAsset!=undefined && currentPossition.isSecurityAsset =='true')
			||this.typeofAsset=='Stock' || this.typeofAsset=='Fund Share' || this.typeofAsset=='Fixed Income' || this.typeofAsset=='Bond' || this.typeofAsset=='Fund' ) { 
			this.view.btnSell.setVisibility(true);
            this.view.btnBuy.setVisibility(true);
		} else {
			this.view.btnSell.setVisibility(false);
            this.view.btnBuy.setVisibility(false);
		}

        let instrumentDetailsDate = {
            "timeReceived": ((this.instrumentMinimal.timeReceived) ? this.instrumentMinimal.timeReceived : "00:00:00"),
            "dateReceived": ((this.instrumentMinimal.dateReceived) ? this.instrumentMinimal.dateReceived : "")
        };
        if (this.instrumentMinimal.dateReceived && this.instrumentMinimal.dateReceived !== "") {
            this.view.imgRefresh.left = "-8Dp";
            this.view.lblInstrumentValueTime.text = "As of " + this.setDate(instrumentDetailsDate);
        } else {
            this.view.imgRefresh.left = "-20Dp";
            this.view.lblInstrumentValueTime.text = "";
        }

        var unrealPLMkt = currentPossition.unrealizedProfitLossSecCcy ? currentPossition.unrealizedProfitLossSecCcy : 0.00;

        if (unrealPLMkt < 0) {
            this.view.lblPnlVal.skin = "sknlblee0005ssb121pr";
        } else {
            if (unrealPLMkt >= 0)
                this.view.lblPnlVal.skin = "sknlbl2f853ssp121pr";
            else
                this.view.lblPnlVal.skin = "sknLbl424242SSPReg30px";
        }

        if (currentPossition.holdingsId || currentPossition.instrumentId) {
            this.view.flxCurrentposition.isVisible = true;
            let marketValue = currentPossition.marketValPOS ? currentPossition.marketValPOS.replace(/,/g, '') : 0.00;
            //  let unrealPLMkt = currentPossition.unrealPLMkt ? currentPossition.unrealPLMkt : 0.00;
            let costPrice = currentPossition.costPrice ? currentPossition.costPrice : 0.00;
            let totalValue = currentPossition.totalValue ? currentPossition.totalValue : 0.00;
            let quantity = currentPossition.quantity ? currentPossition.quantity : '0';

            this.view.lblmarketValue.text = formatUtil.formatAmountandAppendCurrencySymbol(marketValue, this.instrumentMinimal.instrumentCurrencyId);
            this.view.lblPnlVal.text = (unrealPLMkt !== "-") ? formatUtil.formatAmountandAppendCurrencySymbol(unrealPLMkt, this.instrumentMinimal.instrumentCurrencyId) : "        -";
            this.view.lblQuantityVal.text = quantity;
            this.view.lblAverageCostVal.text = formatUtil.formatAmountandAppendCurrencySymbol(costPrice, this.instrumentMinimal.instrumentCurrencyId);
            if (currentPossition.weightPercentage) {
                //this.view.lblWeightVal.text=currentPossition.weightPercentage+"%";
                this.view.lblWeightVal.text = applicationManager.getFormatUtilManager().formatAmount(currentPossition.weightPercentage) + "%";
            } else {
                this.view.lblWeightVal.text = "0 %";
            }
        } else {


            this.view.flxCurrentposition.isVisible = true;

            this.view.lblmarketValue.text = formatUtil.formatAmountandAppendCurrencySymbol(0, this.instrumentMinimal.instrumentCurrencyId);
            this.view.lblPnlVal.text = formatUtil.formatAmountandAppendCurrencySymbol(0, this.instrumentMinimal.instrumentCurrencyId);
            this.view.lblQuantityVal.text = '0';
            this.view.lblAverageCostVal.text = formatUtil.formatAmountandAppendCurrencySymbol(0, this.instrumentMinimal.instrumentCurrencyId);

            this.view.lblWeightVal.text = "0" + "%";
        }

        if (this.typeofAsset == "Bond" || this.typeofAsset == "Money Market" || this.typeofAsset == "Fixed Income") {
            //this.view.lblAccruedVal.text = currentPossition.accruedInterest ? (formatUtil.formatAmountandAppendCurrencySymbol(currentPossition.accruedInterest, this.instrumentMinimal.instrumentCurrencyId)) : (formatUtil.formatAmountandAppendCurrencySymbol(0, this.instrumentMinimal.instrumentCurrencyId));
            this.view.flxAccruedInterest.setVisibility(true);
        } else {
            this.view.flxAccruedInterest.setVisibility(false);
        }
        if (currentPossition.balance) {
            this.view.lblmarketValue.text = formatUtil.formatAmountandAppendCurrencySymbol(currentPossition.balance.replace(/,/g, ''), this.instrumentMinimal.instrumentCurrencyId);
            this.view.lblMarketValLabel.text = "Balance";
        } else {
            this.view.lblMarketValLabel.text = "Market Value";
        }
        if (this.typeofAsset == "Forward") {
            if (currentPossition.counterpartAmount || currentPossition.costQuote) {
                this.view.flxCurrentPositionFour.setVisibility(true);
            }
            if (currentPossition.quote) {
                this.view.flxAccruedInterest.setVisibility(true);
            }
            this.view.lbCounterPart.text = formatUtil.formatAmountandAppendCurrencySymbol(((currentPossition.counterpartAmount) ? (currentPossition.counterpartAmount).replace(/,/g, '') : 0), this.instrumentMinimal.instrumentCurrencyId);
            this.view.lblCostQuote.text = formatUtil.formatAmountandAppendCurrencySymbol(((currentPossition.costQuote) ? (currentPossition.costQuote).replace(/,/g, '') : 0), this.instrumentMinimal.instrumentCurrencyId);
            this.view.lblAccruedVal.text = formatUtil.formatAmountandAppendCurrencySymbol(((currentPossition.quote) ? (currentPossition.quote).replace(/,/g, '') : 0), this.instrumentMinimal.instrumentCurrencyId);
          if (currentPossition) {
              this.view.lbCounterPart.text = formatUtil.formatAmountandAppendCurrencySymbol(((currentPossition.counterpartAmount) ? (currentPossition.counterpartAmount).replace(/,/g, '') : 0), this.instrumentMinimal.instrumentCurrencyId);
              this.view.lblCostQuote.text = formatUtil.formatAmountandAppendCurrencySymbol(((currentPossition.costQuote) ? (currentPossition.costQuote).replace(/,/g, '') : 0), this.instrumentMinimal.instrumentCurrencyId);
              this.view.flxCurrentPositionFour.setVisibility(true);
            }
          if (currentPossition) {
            this.view.lblAccruedVal.text = formatUtil.formatAmountandAppendCurrencySymbol(((currentPossition.quote) ? (currentPossition.quote).replace(/,/g, '') : 0), this.instrumentMinimal.instrumentCurrencyId);
            this.view.flxAccruedInterest.setVisibility(true);
            }
          
            this.view.lblAccrued.text = "Quote";
            if ((this.view.flxCurrentPositionFour.isVisible === true) || (this.view.flxAccruedInterest.isVisible === true)) {
                this.view.lblAverageCostVal.text = formatUtil.formatAmountandAppendCurrencySymbol(((currentPossition.amountSold) ? (currentPossition.amountSold).replace(/,/g, '') : 0), this.instrumentMinimal.instrumentCurrencyId);
                this.view.lblAverageCostLabel.text = "Amount Sold";
                this.view.lblWeightVal.text = formatUtil.formatAmountandAppendCurrencySymbol(((currentPossition.amountBought) ? (currentPossition.amountBought).replace(/,/g, '') : 0), this.instrumentMinimal.instrumentCurrencyId);
                this.view.lblWeightLabel.text = "Amount Bought";
                this.view.lblQuantityVal.text = (currentPossition.weightPercentage ? (currentPossition.weightPercentage) : ("0")) + "%";
                this.view.lblQuantityLabel.text = "Weight%";
            }
        } else {
            this.view.flxCurrentPositionFour.setVisibility(false);
            this.view.lblAccrued.text = "Accrued Interest";
            this.view.lblAverageCostLabel.text = "Average Cost";
            this.view.lblWeightLabel.text = "Weight%";
            if (this.typeofAsset) {
                if (this.typeofAsset == "Fund" || this.typeofAsset == "Stock" || this.typeofAsset == "Fund Share") {
                    this.view.lblQuantityLabel.text = "Quantity";
                } else {
                    this.view.lblQuantityLabel.text = "Nominal";
                }
            } else {
                this.view.lblQuantityLabel.text = "Quantity";
            }
        }
        //if(this.typeofAsset=="Money Market"){
        // this.view.lblPnlLabel.text="Accrued Interest";
        // this.view.lblPnlVal.text=currentPossition.accruedInterest?(formatUtil.formatAmountandAppendCurrencySymbol(currentPossition.accruedInterest,this.instrumentMinimal.instrumentCurrencyId)):(formatUtil.formatAmountandAppendCurrencySymbol(0,this.instrumentMinimal.instrumentCurrencyId));
        //  this.view.lblPnlVal.skin = "sknLbl424242SSPReg30px";
        //this.view.flxAverageCost.isVisible=false;
        //this.view.flxAccruedInterest.setVisibility(false);
        // this.view.flxCurrentPositionThree.setVisibility(false);
        // }
        // else{
        this.view.flxCurrentPositionThree.setVisibility(true);
        this.view.lblPnlLabel.text = "Unrealized P&L";
        this.view.flxAverageCost.isVisible = true;
        // }
    },*/
      
    setDate:function(instrumentDate){
    try{
      let month = instrumentDate.dateReceived.substring(3,6);
      let day = instrumentDate.dateReceived.substring(0,2);
      let year = instrumentDate.dateReceived.substring(7,12);
      var dateFormat = "";
      let hour = instrumentDate.timeReceived.substring(0,2);
      let min = instrumentDate.timeReceived.substring(3,5);
      
      let firstPart = applicationManager.getFormatUtilManager().getTwelveHourTimeString(hour+': '+min);          
      let trdPart = month + ' ' + day;

      return firstPart + ' ' + "UTC" + ' ' + trdPart;
      }catch(err) {
        this.setError(err, "setDate");
      }
    },
    
    setPricingData: function(pricingData) {
     try{
      var formatUtil = applicationManager.getFormatUtilManager();
      this.view.lblBidVal.text = formatUtil.formatAmountandAppendCurrencySymbol(pricingData.bidRate, pricingData.referenceCurrency.toUpperCase());
      if(pricingData.bidVolume!==undefined){
        this.view.lblBidVolVal.text = pricingData.bidVolume.toString();
      }else{
        this.view.lblBidVolVal.text = pricingData.bidVolume;
      }  
      if(pricingData.volume!==undefined){
        this.view.lblVolVal.text = pricingData.volume.toString();

      }else{
        this.view.lblVolVal.text = pricingData.volume;

      }
      if(pricingData.askVolume!==undefined){
        this.view.lblAskVolVal.text = pricingData.askVolume.toString();

      }else{
        this.view.lblAskVolVal.text = pricingData.askVolume;

      }
      this.view.lblAskVal.text = formatUtil.formatAmountandAppendCurrencySymbol(pricingData.askRate, pricingData.referenceCurrency.toUpperCase());
      this.view.lblHighVal.text=formatUtil.formatAmountandAppendCurrencySymbol(pricingData.high52W,pricingData.referenceCurrency.toUpperCase());
      this.view.lblOpenVal.text=formatUtil.formatAmountandAppendCurrencySymbol(pricingData.openRate,pricingData.referenceCurrency.toUpperCase());
      this.view.lblCloseVal.text=formatUtil.formatAmountandAppendCurrencySymbol(pricingData.closeRate,pricingData.referenceCurrency.toUpperCase());
      this.view.lblLowVal.text=formatUtil.formatAmountandAppendCurrencySymbol(pricingData.low52W,pricingData.referenceCurrency.toUpperCase());
      this.view.lblLatestVal.text=formatUtil.formatAmountandAppendCurrencySymbol(pricingData.latestRate,pricingData.referenceCurrency.toUpperCase());
    }catch(err) {
        this.setError(err, "setPricingData");
      }
     },

    setStockNews:function(news){
      try{
      if(news!==undefined && news.length>0){
        this.view.flxNews.isVisible=true;
        var results=[];
		var maxLen = news.length < 2 ? news.length : 2;
        // only the first 2 stock news are to be shown in the 
        for (var i = 0; i < maxLen; i++) {
          var dateToString = news[i]["RT"].replace(/\D/g,'');
              var temp= news[i]["HT"];
              if(65<temp.length){
                temp= temp.substring(0, 65);
                temp = temp+"...";
              }
          results.push({
            "Provider": news[i]["PR"],
            "Headline": temp,
            "Time": CommonUtilities.getTimeDiferenceOfDate(dateToString.substring(0,14))
          });

        }
        this.view.segNews.widgetDataMap={
          lblTitle:"Provider",
          lblTime:"Time",
          lblNews:"Headline"
        };
        this.view.segNews.setData(results);
      }else{
        this.view.flxNews.isVisible=false;
      }
         }catch(err) {
        this.setError(err, "setStockNews");
      }
    },
    onRefresh:function(){
      try{
      var wealthOrderMod = applicationManager.getModulesPresentationController("WealthOrderUIModule");
     
      var param = {
        "ISINCode": this.ISINCode,
        "RICCode":this.ricCode,
        "instrumentId" : this.productDetails.instrumentId,
        "application" : this.productDetails.application
      };
      
      
      wealthOrderMod.getInstrumentDetails(param);
      this.onFilterChanged(this.view.investmentLineChart.currentFilter);
         }catch(err) {
        this.setError(err, "onRefresh");
      }
    },

    setInstrumentDetails : function(productDetails, currentposition){
      try{
    var formatUtil=applicationManager.getFormatUtilManager();
      var netchange = formatUtil.formatAmount(productDetails.netchange);
	    this.view.lblInstrumentName.text = productDetails.instrumentName;
    this.view.lblInstrumentSymbol.text = productDetails.isinExchange;

       /* if (this.typeofAsset == "Money Market" || this.typeofAsset == "Forward") {
            this.view.flximg.setVisibility(false);
        } else {
            this.view.flximg.setVisibility(true);
        }*/
      
      this.view.flxInstrumentIndicator.setVisibility(true);
      this.view.lblCurrentValue.text = productDetails.formatted_netperChange;
        if (parseFloat(productDetails.percentageChange) > 0) {
          this.view.imgIndicator.isVisible = true;
		this.view.imgIndicator.src = "whitearrowupfilled.png";
	}else if (parseFloat(productDetails.percentageChange) < 0) {
      this.view.imgIndicator.isVisible = true;
        this.view.imgIndicator.src = "whitearrowdownfilled.png";
    }else if (parseFloat(productDetails.percentageChange) === 0) {
      this.view.imgIndicator.isVisible = false;
    } else {
        this.view.imgIndicator.isVisible = false;
      this.view.flxInstrumentIndicator.setVisibility(false);
    }	
      this.view.lblInstrumentValue.text="";
      		if (productDetails.marketPrice !== "") {
            this.view.lblInstrumentValue.text = formatUtil.formatAmountandAppendCurrencySymbol(productDetails.marketPrice, productDetails.instrumentCurrencyId);
        }
//       if(currentposition && currentposition.isAdvisory && currentposition.isAdvisory== true) { 
//         this.view.btnSell.setVisibility(false);
//         this.view.btnBuy.setVisibility(false);
//       } else if((currentposition && currentposition.isAdvisory && currentposition.isAdvisory=== false)||(currentposition.application!==undefined && currentposition.application==='SC') || (currentposition.isSecurityAsset!==undefined && currentposition.isSecurityAsset ==='true')) { 
//         this.view.btnSell.setVisibility(true);
//         this.view.btnBuy.setVisibility(true);
//       } else{
//         this.view.btnSell.setVisibility(false);
//         this.view.btnBuy.setVisibility(false);
//       }		
      if((!this.view.btnBuy.isVisible && !this.view.btnSell.isVisible) || (scope_WealthPresentationController.isAdvisory || scope_WealthPresentationController.isJointAccount || scope_WealthPresentationController.isInvestmentAccount === false || productDetails.application !== "SC")) {
        this.view.btnSell.setVisibility(false);
        this.view.btnBuy.setVisibility(false);
      }
        else{
        this.view.btnSell.setVisibility(true);
        this.view.btnBuy.setVisibility(true);
      }	

        var instrumentDetailsDate = { 
            "timeReceived": ((productDetails.timeReceived) ? productDetails.timeReceived : "00:00:00"),
            "dateReceived": ((productDetails.dateReceived) ? productDetails.dateReceived : "")
        };
        if (productDetails.dateReceived && productDetails.dateReceived !== "") {
            this.view.imgRefresh.left = "-8Dp";
            this.view.lblInstrumentValueTime.text = "As of " + this.setDate(instrumentDetailsDate);
        } else {
            this.view.imgRefresh.left = "-20Dp";
            this.view.lblInstrumentValueTime.text = "";
        }
	        var unrealPLMkt =currentposition.unrealizedProfitLossSecCcy?currentposition.unrealizedProfitLossSecCcy:0;

      if (unrealPLMkt < 0){
        this.view.lblPnlVal.skin = "sknlblee0005ssb121pr";}
      else{
        if (unrealPLMkt >= 0)
          this.view.lblPnlVal.skin = "sknlbl2f853ssp121pr";
        else
          this.view.lblPnlVal.skin = "sknLbl424242SSPReg30pxTab";
      }
	  
	 var currentposition_currencyId = (currentposition.secCCy && currentposition.secCCy!=="") ? currentposition.secCCy : productDetails.instrumentCurrencyId; 
	 
      if(currentposition.holdingsId || currentposition.instrumentId){
        this.view.flxCurrentposition.isVisible=true;
        this.view.lblmarketValue.text=formatUtil.formatAmountandAppendCurrencySymbol(currentposition.marketValPOS.replace(/,/g,''), currentposition_currencyId);
        this.view.lblPnlVal.text = (currentposition.unrealizedProfitLossSecCcy !== "-")?formatUtil.formatAmountandAppendCurrencySymbol(currentposition.unrealizedProfitLossSecCcy?currentposition.unrealizedProfitLossSecCcy:0, currentposition_currencyId):"        -";
        this.view.lblQuantityVal.text=currentposition.quantity?currentposition.quantity:'0';

        this.view.lblAverageCostVal.text=formatUtil.formatAmountandAppendCurrencySymbol(currentposition.costPrice,currentposition_currencyId);  
        if(currentposition.weightPercentage){
          //this.view.lblWeightVal.text=currentposition.weightPercentage+"%";
          this.view.lblWeightVal.text=applicationManager.getFormatUtilManager().formatAmount(currentposition.weightPercentage) + "%";
        
        }else{
          this.view.lblWeightVal.text = "0 %";
        }

      }else{

        this.view.flxCurrentposition.isVisible=true;
        this.view.lblmarketValue.text=formatUtil.formatAmountandAppendCurrencySymbol(0, productDetails.instrumentCurrencyId);
        
        if(scope_WealthPresentationController.isTapIntegration){
          this.view.lblPnlVal.skin = "sknLbl424242SSPReg30pxTab";
          this.view.lblPnlVal.text = "      -"
        }else{
          this.view.lblPnlVal.skin = "sknlbl2f853ssp121pr";
          this.view.lblPnlVal.text = formatUtil.formatAmountandAppendCurrencySymbol(0, productDetails.instrumentCurrencyId);
        }
       
        this.view.lblQuantityVal.text='0';
        this.view.lblAverageCostVal.text=formatUtil.formatAmountandAppendCurrencySymbol(0,productDetails.instrumentCurrencyId);  
        this.view.lblWeightVal.text = "0 %";        
      }
      	if(this.typeofAsset=="Bond" || this.typeofAsset=="Money Market" || this.typeofAsset == "Fixed Income"){
        this.view.lblAccruedVal.text=currentposition.accruedInterest?(formatUtil.formatAmountandAppendCurrencySymbol(currentposition.accruedInterest,currentposition_currencyId)):(formatUtil.formatAmountandAppendCurrencySymbol(0,currentposition_currencyId));
        this.view.flxAccruedInterest.setVisibility(true);
      }
      else{
          this.view.flxAccruedInterest.setVisibility(false);
      }
       if(currentposition.balance){
        this.view.lblmarketValue.text=formatUtil.formatAmountandAppendCurrencySymbol(currentposition.balance.replace(/,/g,''),currentposition_currencyId);
        this.view.lblMarketValLabel.text=kony.i18n.getLocalizedString("i18n.wealth.balance");
      }
      else{
         this.view.lblMarketValLabel.text=kony.i18n.getLocalizedString("i18n.wealth.MarketValue");
      }
      if(this.typeofAsset=="Forward"){
         /*if(currentposition.counterpartAmount || currentposition.costQuote){
           this.view.flxCurrentPositionFour.setVisibility(true);
         }
        if(currentposition.quote){
          this.view.flxAccruedInterest.setVisibility(true);
        }
        
          this.view.lbCounterPart.text=formatUtil.formatAmountandAppendCurrencySymbol(((currentposition.counterpartAmount)?(currentposition.counterpartAmount).replace(/,/g,''):0),currentposition.secCCy);
          this.view.lblCostQuote.text=formatUtil.formatAmountandAppendCurrencySymbol(((currentposition.costQuote)?(currentposition.costQuote).replace(/,/g,''):0),currentposition.secCCy);
          this.view.lblAccruedVal.text=formatUtil.formatAmountandAppendCurrencySymbol(((currentposition.quote)?(currentposition.quote).replace(/,/g,''):0),currentposition.secCCy);*/
          if (currentposition) {
              this.view.lbCounterPart.text = formatUtil.formatAmountandAppendCurrencySymbol(((currentposition.counterpartAmount) ? (currentposition.counterpartAmount).replace(/,/g, '') : 0), productDetails.instrumentCurrencyId);
              this.view.lblCostQuote.text = formatUtil.formatAmountandAppendCurrencySymbol(((currentposition.costQuote) ? (currentposition.costQuote).replace(/,/g, '') : 0), productDetails.instrumentCurrencyId);
              this.view.flxCurrentPositionFour.setVisibility(true);
            }
          if (currentposition) {
            this.view.lblAccruedVal.text = formatUtil.formatAmountandAppendCurrencySymbol(((currentposition.quote) ? (currentposition.quote).replace(/,/g, '') : 0), productDetails.instrumentCurrencyId);
            this.view.flxAccruedInterest.setVisibility(true);
            }
			//Iw-3818 Bharath start
			 if(currentposition){
          var navManager=applicationManager.getNavigationManager();
          var testResponse = navManager.getCustomInfo('frmDashboard');
          var isTap = scope_WealthPresentationController.isTapIntegration?scope_WealthPresentationController.isTapIntegration:testResponse.response.hasOwnProperty('isTapIntegration');
          if(this.typeofAsset ==="Forward" && isTap){
            this.view.flxWeight.setVisibility(false);
            this.view.flxCurrentPositionThree.setVisibility(false);
            this.view.flxCurrentPositionFour.setVisibility(false);
          }
        }//Iw-3818 Bharath end
	  this.view.lblAccrued.text=kony.i18n.getLocalizedString("i18n.wealth.quote");
      if((this.view.flxCurrentPositionFour.isVisible === true) || (this.view.flxAccruedInterest.isVisible === true)){
        this.view.lblAverageCostVal.text=formatUtil.formatAmountandAppendCurrencySymbol(((currentposition.amountSold)?(currentposition.amountSold).replace(/,/g,''):0),currentposition_currencyId);
        this.view.lblAverageCostLabel.text=kony.i18n.getLocalizedString("i18n.wealth.amountSold");
        this.view.lblWeightVal.text=formatUtil.formatAmountandAppendCurrencySymbol(((currentposition.amountBought)?(currentposition.amountBought).replace(/,/g,''):0),currentposition_currencyId);
        this.view.lblWeightLabel.text=kony.i18n.getLocalizedString("i18n.wealth.amountBought");
        this.view.lblQuantityVal.text=(currentposition.weightPercentage?(currentposition.weightPercentage):("0"))+"%";
        this.view.lblQuantityLabel.text=kony.i18n.getLocalizedString("i18n.wealth.Weightmb");
      }
      }
      else{
         this.view.flxCurrentPositionFour.setVisibility(false);
        this.view.lblAccrued.text=kony.i18n.getLocalizedString("i18n.wealth.accruedInterest");
         this.view.lblAverageCostLabel.text=kony.i18n.getLocalizedString("i18n.wealth.averageCostWithColon");
         this.view.lblWeightLabel.text=kony.i18n.getLocalizedString("i18n.wealth.Weightmb");
        if(this.typeofAsset){
          if(this.typeofAsset== "Fund" || this.typeofAsset== "Stock" || this.typeofAsset== "Fund Share"){
            this.view.lblQuantityLabel.text=kony.i18n.getLocalizedString("i18n.wealth.quantity");
          }else{
            this.view.lblQuantityLabel.text=kony.i18n.getLocalizedString("i18n.wealth.nominal");
          }
        }
        else{
          this.view.lblQuantityLabel.text=kony.i18n.getLocalizedString("i18n.wealth.quantity");
        }
      }
   //  if(this.typeofAsset=="Money Market"){
       //this.view.lblPnlLabel.text="Accrued Interest";
      //this.view.lblPnlVal.text=currentposition.accruedInterest?(formatUtil.formatAmountandAppendCurrencySymbol(currentposition.accruedInterest,currentposition.secCCy)):(formatUtil.formatAmountandAppendCurrencySymbol(0,currentposition.secCCy));
       //this.view.lblPnlVal.skin = "sknLbl424242SSPReg30px";
     //  this.view.flxAverageCost.isVisible=false;
      // this.view.flxAccruedInterest.setVisibility(false);
      //  this.view.flxCurrentPositionThree.setVisibility(false);
   //  }
     // else{
		  //Iw-3818 Bharath start
       var isTap = scope_WealthPresentationController.isTapIntegration
        if(this.typeofAsset ==="Forward" && isTap){
         this.view.flxCurrentPositionThree.setVisibility(false);
       }else{
         this.view.flxCurrentPositionThree.setVisibility(true);
         this.view.flxWeight.setVisibility(true);
       }//Iw-3818 Bharath end
        this.view.lblPnlLabel.text=kony.i18n.getLocalizedString("i18n.wealth.unrealizedPLColonmb");;
        this.view.flxAverageCost.isVisible=true;
     // }
      }catch(err) {
        this.setError(err, "setInstrumentDetails");
      }
},
    
    setDataOnRefresh:function(){
      try{
      var navManager=applicationManager.getNavigationManager();
      var data=navManager.getCustomInfo('frmInstrumentDetails').instrumentDetails;
      var currentposition=navManager.getCustomInfo('frmInstrumentDetails').response;
		this.typeofAsset="";
      if(data.instrumentAssets){
        if (data.instrumentAssets.isSecurityAsset === false || data.instrumentAssets.isSecurityAsset === "false") {
          this.view.btnSell.setVisibility(false);
          this.view.btnBuy.setVisibility(false);
        }
       if(data.instrumentAssets){
       if(data.instrumentAssets.assetTypes){
        this.typeofAsset=data.productDetails.assetType;
        }}
      }
      
      this.view.flxInterestMM.setVisibility(false);
       
      if (data.productDetails && (Object.entries(data.productDetails).length > 0) ){
        this.setInstrumentDetails(data.productDetails, currentposition);
        this.refCurrency=data.productDetails.instrumentCurrencyId;
      }
    
      /*if (data.instrumentDetails && (Object.entries(data.instrumentDetails).length > 0) ){
        this.setInstrumentDetailsTop(data.instrumentDetails, data.pricingDetails, currentposition);
        this.refCurrency=data.instrumentDetails.referenceCurrency;
        if(this.view.flxCurrentposition.isVisible)
          this.setCurrentPosition(currentposition);
      }else
        if ((this.instrumentMinimal) && (Object.entries(this.instrumentMinimal).length > 0)) 
        {
          this.instrumentDetailsNoRefinitiv(currentposition);
         this.refCurrency=this.instrumentMinimal.referenceCurrency;
        }*/
      else{
        this.view.flxInstrumentInfo.setVisibility(false);
      }
      this.setAssetType(data.instrumentAssets);
      if(data.pricingDetails && data.productDetails.RICCode != ''){
        if(this.view.flxPricingData.isVisible)
          this.setPricingData(data.pricingDetails);
      }else
        this.view.flxPricingData.setVisibility(false);


      if(data.stockNews){
        if(this.view.flxNews.isVisible)
          this.setStockNews(data.stockNews);
      }else
        this.view.flxNews.setVisibility(false);

      if(data.documentDetails){
        if(this.view.flxDocuments.isVisible)
          this.setDocuments(data.documentDetails);
      }else
        this.view.flxDocuments.setVisibility(false);
       }catch(err) {
        this.setError(err, "setDataOnRefresh");
      }
    },
	// Function to check if all values except 'assetType' are empty - WIW-2111 defect fix
	isAllEmptyExceptAssetType: function(obj) {
		for (let key in obj) {
			if (key !== "assetType" && obj[key] !== "") {
				return false;
			}
		}
		return true;
	},

    setAssetType: function(instrumentDetails){
      try{
       if(instrumentDetails && instrumentDetails.assetTypes!==undefined){
		var assetsDetails=instrumentDetails.assetTypes;
      if(assetsDetails && assetsDetails.assetType!==undefined){
		  if(!this.isAllEmptyExceptAssetType(assetsDetails)){
        this.view.lblAssetHeader.text=assetsDetails.assetType + " Details";
        this.view.flxAssetTypeDetails.setVisibility(true);
      if(assetsDetails.sector){
        this.view.flxSector.setVisibility(true);
        this.view.lblSectorValue.text=assetsDetails.sector;
      }
      else{
         this.view.flxSector.setVisibility(false);
      }
      
            if(assetsDetails.region){
       this.view.flxRegion.setVisibility(true);
        this.view.lblRegionValue.text=assetsDetails.region;
      }
      else{
         this.view.flxRegion.setVisibility(false);
      }
      
            if(assetsDetails.country){
        this.view.flxCountry.setVisibility(true);
        this.view.lbCountryValue.text=assetsDetails.country;
      }
      else{
         this.view.flxCountry.setVisibility(false);
      }
      
            if(assetsDetails.issuer){
        this.view.flxIssuer.setVisibility(true);
        this.view.lblIssuerValue.text=assetsDetails.issuer;
      }
      else{
         this.view.flxIssuer.setVisibility(false);
      }
      
            if(assetsDetails.type){
        this.view.flxType.setVisibility(true);
        this.view.lblTypeValue.text=assetsDetails.type;
      }
      else{
         this.view.flxType.setVisibility(false);
      }
      
            if(assetsDetails.interestRate){
              if(assetsDetails.assetType== "Money Market"){
              this.view.flxInterestMM.setVisibility(true);
                this.view.lblInterestMM.text=(assetsDetails.interestRate).replace(/%/g,'') + "% Interest Rate";
              }
        this.view.flxInterest.setVisibility(true);
        this.view.lblInterestValue.text=(assetsDetails.interestRate).replace(/%/g,'') + "%";
      }
      else{
         this.view.flxInterest.setVisibility(false);
		 this.view.flxInterestMM.setVisibility(false);
      }

            if(assetsDetails.nxtCoupnDate){
        this.view.flxCoupon.setVisibility(true);
        this.view.lblCouponValue.text=assetsDetails.nxtCoupnDate;
      }
      else{
         this.view.flxCoupon.setVisibility(false);
      }
      
                              if(assetsDetails.contractType){
      this.view.flxContractType.setVisibility(true);
       this.view.lblSectorContractTypeValue.text=assetsDetails.contractType;
      }
      else{
        this.view.flxContractType.setVisibility(false);
      }
      
            if(assetsDetails.maturityDate){
      this.view.flxMaturityDate.setVisibility(true);
        this.view.lblMaturityDateValue.text=assetsDetails.maturityDate;
      }
      else{
         this.view.flxMaturityDate.setVisibility(false);
      }
      
            
            if(assetsDetails.underlying){
      this.view.flxUnderlying.setVisibility(true);
        this.view.lblUnderlyingValue.text=assetsDetails.underlying;
      }
      else{
         this.view.flxUnderlying.setVisibility(false);
      }
            if(assetsDetails.duration){
        this.view.flxDuration.setVisibility(true);
        this.view.lblDurValue.text=assetsDetails.duration;
      }
      else{
         this.view.flxDuration.setVisibility(false);
      }
      
            if(assetsDetails.modifiedDuration){
       this.view.flxModiDur.setVisibility(true);
        this.view.lblModiDurValue.text=assetsDetails.modifiedDuration;
      }
      else{
         this.view.flxModiDur.setVisibility(false);
      }
                        if(assetsDetails.rating){
       this.view.flxRating.setVisibility(true);
       this.view.lblRatingVal.text=assetsDetails.rating;
      }
      else{
         this.view.flxRating.setVisibility(false);
      }

                              if(assetsDetails.contractSize){
      this.view.flxContractSize.setVisibility(true);
      this.view.lblSectorContractSizeValue.text=assetsDetails.contractSize;
      }
      else{
        this.view.flxContractSize.setVisibility(false);
      }
      
                                    if(assetsDetails.strikePrice){
      this.view.flxStrike.setVisibility(true);
      this.view.lblStrikeValue.text=applicationManager.getFormatUtilManager().formatAmount(assetsDetails.strikePrice);
      }
      else{
        this.view.flxStrike.setVisibility(false);
      }
      
                                    if(assetsDetails.expiryDate){
     this.view.flxExpiry.setVisibility(true);
     this.view.lblExpiryValue.text=assetsDetails.expiryDate;
      }
      else{
        this.view.flxExpiry.setVisibility(false);
      }
      
                                    if(assetsDetails.optionClass){
     this.view.flxClass.setVisibility(true);
     this.view.lblClassValue.text=assetsDetails.optionClass;
      }
      else{
        this.view.flxClass.setVisibility(false);
      }
      
                                    if(assetsDetails.optionStyle){
      this.view.flxStyle.setVisibility(true);
      this.view.lblStyleValue.text=assetsDetails.optionStyle;
      }
      else{
       this.view.flxStyle.setVisibility(false);
      }
            if(assetsDetails.yield && (assetsDetails.assetType === "Bond"|| assetsDetails.assetType == "Fixed Income")){
              this.view.flxYield.setVisibility(true);
              this.view.lblYieldValue.text=assetsDetails.yield+"%";
            }
            else{
              this.view.flxYield.setVisibility(false);
            }
		  }else{
			   this.view.flxAssetTypeDetails.setVisibility(false);
		  }
          }else{
            this.view.flxAssetTypeDetails.setVisibility(false);
          }
        }
        else{
          this.view.flxAssetTypeDetails.setVisibility(false);
        }
      }catch(err) {
        this.setError(err, "setAssetType");
      }
    },
    
    initActions: function(){
      try{
      this.setUiData();
      let filterValues = Object.keys(this.chartFilters).map(key => this.chartFilters[key]);
      this.view.investmentLineChart.setChartFilters(filterValues);
      //  this.setInstrumentDetails(this.mockData);
      this.view.imgRefresh.onTouchEnd=this.onRefresh;
      this.view.customHeader.flxBack.onClick =this.backOnClick;
      this.view.flxView.onClick = this.viewAllClick;


      this.view.btnBuy.onClick=this.onPlaceorder.bind(this,0);
      this.view.btnSell.onClick=this.onPlaceorder.bind(this,1);
      this.view.segPdf.onRowClick=this.downloadPDF;
        //favourite imgFavourite
      if(this.view.imgFavourite.isVisible){
        this.updateFavList('get');
        this.view.imgFavourite.onTouchEnd = this.updateFavList;
      }

      }catch(err) {
        this.setError(err, "initActions");
      }
    },
    downloadPDF:function(){
      try{
      var selectedRowIndex = this.view.segPdf.selectedRowIndex[1];
      var selectedRow = this.view.segPdf.data[selectedRowIndex];

      kony.application.openURLAsync({
        url: selectedRow.link
      });
         }catch(err) {
        this.setError(err, "downloadPDF");
      }
    },
    onPlaceorder:function(option){
      try{
      var navMan = applicationManager.getNavigationManager();
      let data = navMan.getCustomInfo("frmPlaceOrder");
      
      scope_WealthOrderPresentationController.navForm = "frmInstrumentDetails";
      if(kony.sdk.isNullOrUndefined(data)){
        data={};
        data.buy=!option;
      }else{
        data.buy=!option;
      }
      if(data.buy===true){
        this.view.btnBuy.skin="sknBtnBgFFFFFFBorder1pxFont15px003E75";
        this.view.btnBuy.focusSkin="sknBtnBgFFFFFFBorder1pxFont15px003E75";
        this.view.btnSell.skin="sknBtnBg003E75Border1pxFont15pxFFFFFF";
      }else{
        this.view.btnBuy.skin="sknBtnBg003E75Border1pxFont15pxFFFFFF";
        this.view.btnSell.focusSkin="sknBtnBgFFFFFFBorder1pxFont15px003E75";
        this.view.btnSell.skin="sknBtnBgFFFFFFBorder1pxFont15px003E75";

      }
      applicationManager.getPresentationUtility().showLoadingScreen();
      navMan.setCustomInfo("frmPlaceOrder", data);
      navMan.navigateTo('frmPlaceOrder'); 
         }catch(err) {
        this.setError(err, "onPlaceorder");
      }
    },
    backOnClick:function(){
    try{
     var navigationMan = applicationManager.getNavigationManager();
      var wealthOrderModule = applicationManager.getModulesPresentationController("WealthOrderUIModule");
      if(scope_WealthPresentationController.watchlistFlow === null || scope_WealthPresentationController.watchlistFlow === ""){
        scope_WealthPresentationController.isFrmWatchlist = false;
      }
      if(scope_WealthPresentationController.searchEntryPoint===true){
        let params = {"portfolioId":scope_WealthPresentationController.portfolioId,"navPage":"Portfolio","graphDuration":""};
        wealthOrderModule.getPortfolioAndGraphDetails(params);
      } else if (scope_WealthPresentationController.isFrmWatchlist === true) {
        
         navigationMan.navigateTo("frmWatchlist");
      }else{
        var params = {
          "portfolioId":scope_WealthPresentationController.portfolioId,
          "navPage":"Holdings",
          "sortBy":"description",
          "searchByInstrumentName":""
        };
        wealthOrderModule.getHoldings(params);
      }
       }catch(err) {
        this.setError(err, "backOnClick");
      }
    },
    viewAllClick:function(){
      try{
      var navigationMan = applicationManager.getNavigationManager();
      new kony.mvc.Navigation({
"appName": "PortfolioManagementMA",
"friendlyName": "frmTopNews"
}).navigate();
         }catch(err) {
        this.setError(err, "viewAllClick");
      }
    },
    // Called when chart filter changed - Mapped in onFilterChange event on CHart Component
    onFilterChanged : function (filter) {
      try{
      if(scope_WealthPresentationController.instrumentDetailsEntry===true){
        scope_WealthPresentationController.instrumentDetailsEntry=false;
        this.view.investmentLineChart.currentFilter='1D';

        this.setChartData();
     //   this.setUiData();
      }else{
        scope_WealthOrderPresentationController.instrumentChartFilter=filter;
        var wealthMod = applicationManager.getModulesPresentationController("WealthOrderUIModule");
        var ricCode = this.ricCode;
        var ISINCode= this.ISINCode;
        var instrumentId= this.productDetails.instrumentId;
		var navManager=applicationManager.getNavigationManager();
      var data = navManager.getCustomInfo("frmInstrumentDetails");
      if (Object.entries(data.chartData).length > 0){
      //if RicCode is empty flxCurrencyChart need to be hidden - WIW-893
            if((this.application === "DX" && this.typeofAsset === "Money Market") || (this.application === "DX" && this.typeofAsset === "Forward") || this.ricCode === "" || this.ricCode.toLowerCase() === "riccode"){
              this.view.flxCurrencyChart.setVisibility(false);
            }else{
			    this.view.flxCurrencyChart.setVisibility(true);
            }
			}
		else{
		this.view.flxCurrencyChart.setVisibility(false);
		}
        wealthMod.getHistoricalInstrumentData(ricCode,filter,ISINCode,instrumentId);}
    }catch(err) {
        this.setError(err, "onFilterChanged");
      }
      },

    setChartData : function() {
      try{
      var navManager=applicationManager.getNavigationManager();
      var data = navManager.getCustomInfo("frmInstrumentDetails");
        for(var i = 0; i<(data.chartData).length; i++){
         data.chartData[i].CLOSE= Number(data.chartData[i].CLOSE).toFixed(2);
        }
        //WIW-302 - Tooltip value rounding off to 2 decimal places
      if (Object.entries(data.chartData).length > 0){
      //if RicCode is empty flxCurrencyChart need to be hidden - WIW-893
        if((this.application === "DX" && this.typeofAsset === "Money Market") || (this.application === "DX" && this.typeofAsset === "Forward") || this.ricCode === "" || this.ricCode.toLowerCase() === "riccode"){
        this.view.flxCurrencyChart.setVisibility(false);
        }else{
        this.view.flxCurrencyChart.setVisibility(true);
        this.view.investmentLineChart.setChartData(data.chartData,null,null,null,"CURRENCY");
        } }
      else
        this.view.flxCurrencyChart.setVisibility(false);
         }catch(err) {
        this.setError(err, "preShow");
      }
    },

    setFilterData : function () {
      try{
      var XaxisArray = [];
      var YaxisArray = [];
      var data = [];
      var maxVal = 0;
      if (filter === this.chartFilters.ONE_DAY) {
        XaxisArray = ['9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM'];
        YaxisArray = [10, 30, 50, 50, 60, 100, 80];
        data = [10, 30, 50, 50, 60, 100, 80];
        maxVal = Math.max.apply(null,data)+20;
      }
      else if (filter === this.chartFilters.ONE_YEAR) {
        XaxisArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        YaxisArray = [0, 500, 1000, 1500, 2000, 2500, 5000];
        data = [0, 1000, 500, 2000, 1000, 5000, 2000, 2500, 1500, 2000, 1000, 500];
        maxVal = Math.max.apply(null,data)+200;
      }
      else if (filter === this.chartFilters.ONE_MONTH) {
        XaxisArray = ['5', '10', '15', '20', '25', '30'];
        YaxisArray = [0, 10, 20, 50, 60, 100, 120];
        data = [10, 40, 69, 90, 5, 120];
        maxVal = Math.max.apply(null,data)+20;
      }
      else if (filter === this.chartFilters.YTD) {
      } 
      else {
        return;
      }
      this.view.investmentLineChart.setChartData(data,XaxisArray,null,this.chartConfig);
    }catch(err) {
        this.setError(err, "setFilterData");
      }
      },

    chartFilters: {
      ONE_DAY:'1D',
      ONE_MONTH:'1M',
      ONE_YEAR:'1Y',
      YTD:'YTD',    
    },


    checkPermissions: function(){
      try{
      var configManager =  applicationManager.getConfigurationManager();
      var checkUserPermission = function (permission) {
        return configManager.checkUserPermission(permission);
      };

      this.view.flxInstrumentOrder.setVisibility(configManager.getInstrumentDetailsPermissions().some(checkUserPermission));
      this.view.flxCurrentposition.setVisibility(configManager.getInstrumentCurrentPositionPermissions().some(checkUserPermission));
      this.view.flxPricingData.setVisibility(configManager.getInstrumentPricingDataPermissions().some(checkUserPermission));
      this.view.flxNews.setVisibility(configManager.getInstrumentNewsPermissions().some(checkUserPermission));
      this.view.flxDocuments.setVisibility(configManager.getInstrumentDocumentsPermissions().some(checkUserPermission));
      this.view.btnBuy.setVisibility(configManager.buyOrderPermissions().some(checkUserPermission));
      this.view.btnSell.setVisibility(configManager.sellOrderPermissions().some(checkUserPermission));   
      this.view.imgFavourite.setVisibility(configManager.addToWatchlistPermissions().some(checkUserPermission));

     }catch(err) {
        this.setError(err, "checkPermissions");
      }
    },
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
