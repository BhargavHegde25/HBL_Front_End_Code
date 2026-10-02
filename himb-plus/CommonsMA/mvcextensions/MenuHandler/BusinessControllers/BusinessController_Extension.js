
define(['CommonUtilities'], function(CommonUtilities) {
return{
    setMenuData  :function (scope, selectedForm) {
    try{
        
    var self = this;
    var configManager = applicationManager.getConfigurationManager();
    var HAM_APPROVAL_REQUEST=configManager.HAM_APPROVAL_REQUEST;
    var HAM_SEND_MONEY=configManager.HAM_SEND_MONEY;
    var HAM_TRANSFERS=configManager.HAM_TRANSFERS;
    var HAM_ACCOUNT_SWEEP=configManager.HAM_ACCOUNT_SWEEP;
    var HAM_CHECK_DEPOSITS=configManager.HAM_CHECK_DEPOSITS;
    var cm = applicationManager.getConfigurationManager();
    var devManager = applicationManager.getDeviceUtilManager();
    scope.view.customFooter.skin = "sknFlxFooterffffffBg";
    scope.view.customFooter.flxTypeOneShadow.isVisible = false;
    if(devManager.isIpad() && applicationManager.applicationMode==="tablet"){
    var menuDataIPad = configManager.getIPadAppMenuItems();
    var footerData = this.setHamburgerMenuItemsForMicroApp(menuDataIPad);
    var moreMenuDataIPad= configManager.getMoreMenuItemsIpad();
    var data = this.setHamburgerMenuItemsForMicroApp(moreMenuDataIPad);
    scope.view.customFooter.imgAccounts.src=footerData[0].img;
    scope.view.customFooter.lblAccounts.text=footerData[0].text;
    scope.view.customFooter.flxAccounts.onClick=function(scope){
        this.switchOnClick(footerData[0].text, scope);
        this.showOrHideHamburgerUI(true, scope);
    }
    scope.view.customFooter.imgTransfer.src=footerData[1].img;
    scope.view.customFooter.lblTransfer.text=footerData[1].text;
    scope.view.customFooter.flxTransfer.onClick=function(scope){
        this.showOrHideHamburgerUI(true, scope);
        this.switchOnClick(footerData[1].text, scope);
    }
    scope.view.customFooter.imgBillPay.src=footerData[2].img;
    scope.view.customFooter.lblBillPay.text=footerData[2].text;
    scope.view.customFooter.flxBillPay.onClick=function(scope){
        this.switchOnClick(footerData[2].text, scope);
        this.showOrHideHamburgerUI(true, scope);
    }
    scope.view.customFooter.imgDeposits.src=footerData[3].img;
    scope.view.customFooter.lblDeposits.text=footerData[3].text;
    scope.view.customFooter.flxDeposits.onClick=function(scope){
        this.switchOnClick(footerData[3].text, scope);
        this.showOrHideHamburgerUI(true, scope);
    }
    scope.view.customFooter.imgMessage.src=footerData[4].img;
    scope.view.customFooter.lblMessage.text=footerData[4].text;
    scope.view.customFooter.flxMessage.onClick=function(scope){
        this.switchOnClick(footerData[4].text, scope);
        this.showOrHideHamburgerUI(true, scope);
    }
    //highlightWhichMenu
    scope.view.customFooter.flxAccSelect.setVisibility(false);
    scope.view.customFooter.flxTransferSelect.setVisibility(false);
    scope.view.customFooter.flxBillPaySelect.setVisibility(false);
    scope.view.customFooter.flxDepositsSelect.setVisibility(false);
    scope.view.customFooter.flxMessageSelect.setVisibility(false);
    scope.view.customFooter.flxMenuSelect.setVisibility(false);
    if(selectedForm==footerData[0].text){
        scope.view.customFooter.flxAccSelect.setVisibility(true);
        scope.view.customFooter.lblAccounts.skin = "sknLbl424242SSP20px";
        scope.view.customFooter.lblTransfer.skin = "sknLblA0A0A0SSP20px";
        scope.view.customFooter.lblBillPay.skin = "sknLblA0A0A0SSP20px";
        scope.view.customFooter.lblDeposits.skin = "sknLblA0A0A0SSP20px";
        scope.view.customFooter.lblMessage.skin = "sknLblA0A0A0SSP20px";
        scope.view.customFooter.lblMenu.skin = "sknLblA0A0A0SSP20px";
    }
    else if(selectedForm==footerData[1].text){
        scope.view.customFooter.flxTransferSelect.setVisibility(true);
        scope.view.customFooter.lblAccounts.skin = "sknLblA0A0A0SSP20px";
        scope.view.customFooter.lblTransfer.skin = "sknLbl424242SSP20px";
        scope.view.customFooter.lblBillPay.skin = "sknLblA0A0A0SSP20px";
        scope.view.customFooter.lblDeposits.skin = "sknLblA0A0A0SSP20px";
        scope.view.customFooter.lblMessage.skin = "sknLblA0A0A0SSP20px";
        scope.view.customFooter.lblMenu.skin = "sknLblA0A0A0SSP20px";
    }
    else if(selectedForm==footerData[2].text){
        scope.view.customFooter.flxBillPaySelect.setVisibility(true);
        scope.view.customFooter.lblAccounts.skin = "sknLblA0A0A0SSP20px";
        scope.view.customFooter.lblTransfer.skin = "sknLblA0A0A0SSP20px";
        scope.view.customFooter.lblBillPay.skin = "sknLbl424242SSP20px";
        scope.view.customFooter.lblDeposits.skin = "sknLblA0A0A0SSP20px";
        scope.view.customFooter.lblMessage.skin = "sknLblA0A0A0SSP20px";
        scope.view.customFooter.lblMenu.skin = "sknLblA0A0A0SSP20px";
    }
    else if(selectedForm==footerData[3].text){
        scope.view.customFooter.flxDepositsSelect.setVisibility(true);
        scope.view.customFooter.lblAccounts.skin = "sknLblA0A0A0SSP20px";
        scope.view.customFooter.lblTransfer.skin = "sknLblA0A0A0SSP20px";
        scope.view.customFooter.lblBillPay.skin = "sknLblA0A0A0SSP20px";
        scope.view.customFooter.lblDeposits.skin = "sknLbl424242SSP20px";
        scope.view.customFooter.lblMessage.skin = "sknLblA0A0A0SSP20px";
        scope.view.customFooter.lblMenu.skin = "sknLblA0A0A0SSP20px";
    }
    else if(selectedForm==footerData[4].text){
        scope.view.customFooter.flxMessageSelect.setVisibility(true);
        scope.view.customFooter.lblAccounts.skin = "sknLblA0A0A0SSP20px";
        scope.view.customFooter.lblTransfer.skin = "sknLblA0A0A0SSP20px";
        scope.view.customFooter.lblBillPay.skin = "sknLbl424242SSP20px";
        scope.view.customFooter.lblDeposits.skin = "sknLblA0A0A0SSP20px";
        scope.view.customFooter.lblMessage.skin = "sknLbl424242SSP20px";
        scope.view.customFooter.lblMenu.skin = "sknLblA0A0A0SSP20px";
    }
    else{
        scope.view.customFooter.flxMenuSelect.setVisibility(true);
        scope.view.customFooter.lblAccounts.skin = "sknLblA0A0A0SSP20px";
        scope.view.customFooter.lblTransfer.skin = "sknLblA0A0A0SSP20px";
        scope.view.customFooter.lblBillPay.skin = "sknLblA0A0A0SSP20px";
        scope.view.customFooter.lblDeposits.skin = "sknLblA0A0A0SSP20px";
        scope.view.customFooter.lblMessage.skin = "sknLblA0A0A0SSP20px";
        scope.view.customFooter.lblMenu.skin = "sknLbl424242SSP20px";
    }
    }
    else if(devManager.isIPhone()){
        if(applicationManager.getConfigurationManager().checkUserFeature("VIEW_ONLY_ROLE")){
            var cm = applicationManager.getConfigurationManager();
    var menuDataIOS = configManager.getIOSAppMenuItems();
    var footerData = menuDataIOS;
    var moreMenuDataIOS= configManager.getIOSAppMoreMenuItems();
    //var data = this.setHamburgerMenuItemsForMicroApp(moreMenuDataIOS);
        var menuDataHamburger = configManager.getHamburgerMenuItems();
    var data = this.setHamburgerMenuItemsForMicroApp(menuDataHamburger);
        scope.view.customFooter.imgBillPay.src = "hblqr.png";
		//scope.view.Hamburger.imgLogout.src="logout_new.png";
		scope.view.Hamburger.imgLogout.src="logout.png";
if(footerData.length < 3) {
        var count = 3 - footerData.length;
        footerData.forEach(function(footerMenuItem) {
        let index = data.findIndex(moreMenuItem => moreMenuItem.text === footerMenuItem.text);
        if(index !== -1) {
            data.splice(index, 1);
        }
        });
        for(let index = 0; index < count; index++) {
        footerData[footerData.length] = data[0];
        data.splice(0,1);
        }
    }
    //  const isRegionalTransferMAPresent = configManager.isMicroAppPresent(configManager.microappConstants.REGIONALTRANSFER);
    // const isTradeFinanceMAPresent = configManager.isMicroAppPresent(configManager.microappConstants.TRADEFINANCE);
    //var tradeFinanceEntitilement = applicationManager.getConfigurationManager().checkUserPermission("IMPORT_LC_VIEW");
    var QRPaymentsEntitilement =applicationManager.getConfigurationManager().checkUserPermission("QR_PAYMENTS_CREATE");
//  var exportTradeFinanceEntitilement = applicationManager.getConfigurationManager().checkUserPermission("EXPORT_LC_VIEW");
    // const isAccountSweepsMAPresent = configManager.isMicroAppPresent(configManager.microappConstants.ACCOUNTSWEEP);
    //var acountSweepsEntitilement = applicationManager.getConfigurationManager().checkUserPermission("ACCOUNT_SWEEP_VIEW");
    //const isBillPayMAPresent = configManager.isMicroAppPresent(configManager.microappConstants.BILLPAY);
    //var billPayEntitilement = (applicationManager.getConfigurationManager().checkUserFeature("BILL_PAY") && (applicationManager.getConfigurationManager().checkUserPermission("BILL_PAY_CREATE") || applicationManager.getConfigurationManager().checkUserPermission("BILL_PAY_VIEW_PAYMENTS") || applicationManager.getConfigurationManager().checkUserPermission("BILL_PAY_CREATE_PAYEES") || applicationManager.getConfigurationManager().checkUserPermission("BILL_PAY_VIEW_PAYEES") || applicationManager.getConfigurationManager().checkUserPermission("BILL_PAY_BULK")));
    //var openNewAccountEntitled = applicationManager.getConfigurationManager().checkUserPermission("OPEN_NEW_ACCOUNT");
    
    
    
    const isRegionalTransferMAPresent = configManager.isMicroAppPresent(configManager.microappConstants.REGIONALTRANSFER);
    const isTradeFinanceMAPresent = configManager.isMicroAppPresent(configManager.microappConstants.TRADEFINANCE);
    var tradeFinanceEntitilement = applicationManager.getConfigurationManager().checkUserPermission("IMPORT_LC_VIEW");
var exportTradeFinanceEntitilement = applicationManager.getConfigurationManager().checkUserPermission("EXPORT_LC_VIEW");
    const isAccountSweepsMAPresent = configManager.isMicroAppPresent(configManager.microappConstants.ACCOUNTSWEEP);
    var openNewAccountEntitled = applicationManager.getConfigurationManager().checkUserPermission("OPEN_NEW_ACCOUNT");
    var acountSweepsEntitilement = applicationManager.getConfigurationManager().checkUserPermission("ACCOUNT_SWEEP_VIEW");
    var isBillPayMAPresent = configManager.isMicroAppPresent(configManager.microappConstants.BILLPAY);
    var billPayEntitilement =(applicationManager.getConfigurationManager().checkUserFeature("BILL_PAY") && (applicationManager.getConfigurationManager().checkUserPermission("BILL_PAY_CREATE") || applicationManager.getConfigurationManager().checkUserPermission("BILL_PAY_VIEW_PAYMENTS") || applicationManager.getConfigurationManager().checkUserPermission("BILL_PAY_CREATE_PAYEES") || applicationManager.getConfigurationManager().checkUserPermission("BILL_PAY_VIEW_PAYEES") || applicationManager.getConfigurationManager().checkUserPermission("BILL_PAY_BULK")));
    if(isTradeFinanceMAPresent){
        if(!((tradeFinanceEntitilement === true) || (exportTradeFinanceEntitilement === true))){
        for(i=0;i<data.length;i++)
            if(data[i].text === cm.constants.MENUTRADEFINANCE)
            break;
        data.splice(i,1);
        }
    }
    if(isRegionalTransferMAPresent) {
        var moneyMovementModule = applicationManager.getModulesPresentationController({
        "appName": "TransfersMA",
        "moduleName": "MoneyMovementUIModule"
});
    var entitlements=moneyMovementModule.checkForTransfersModuleEntitlements();
    if(!(entitlements.isTransfersAvailable==1 || moneyMovementModule.getEntitlementValue("ispayAPersonEnabled")=="true" )|| !cm.checkUserFeature("UNIFIED_TRANSFER")){
        for(i=0;i<data.length;i++)
        if(data[i].text==cm.constants.MENUMONEYMOVEMENTTRANSFERS)
            break;
        data.splice(i,1);
        for(i=0;i<data.length;i++)
        if(data[i].text==cm.constants.MENUTRANSFERSACTIVITY || data[i].text==cm.constants.MENUMANAGETRANSACTIONS)
            break;
        data.splice(i,1);
        for(i=0;i<data.length;i++)
        if(data[i].text==cm.constants.MENUMANAGERECIPIENTS || data[i].text==cm.constants.MENUMANAGEBENEFICIARIES)
            break;
        data.splice(i,1);
    } 
    }
    if (isBillPayMAPresent) {
        if (billPayEntitilement === false) {
            for (i = 0; i < data.length; i++) if (data[i].text === cm.constants.MENUBILLPAY) break;
            data.splice(i, 1);
        }
    }
    if(isAccountSweepsMAPresent){
        if(!(acountSweepsEntitilement === true)){
        for(i=0;i<data.length;i++)
            if(data[i].text === cm.constants.MENUACCOUNTSWEEP)
            break;
        data.splice(i,1);
        }
    }
    if(openNewAccountEntitled == false){
        for (i = 0; i < data.length; i++) if (data[i].text === cm.constants.MENUOPENNEWACCOUNT) break;
            data.splice(i, 1);
    }
    if(HAM_APPROVAL_REQUEST==0){
        for (i = 0; i < data.length; i++) if (data[i].text === cm.constants.MENUAPPROVALREQUEST) break;
            data.splice(i, 1);
    }
    if(HAM_SEND_MONEY==0){
        for (i = 0; i < data.length; i++) if (data[i].text === cm.constants.MENUSENDMONEY) break;
            data.splice(i, 1);
    }
    if(HAM_TRANSFERS==0){
        for (i = 0; i < data.length; i++) if (data[i].text === cm.constants.MENUTRANSFERS) break;
            data.splice(i, 1);
    }
    if(HAM_ACCOUNT_SWEEP==0){
        for (i = 0; i < data.length; i++) if (data[i].text === cm.constants.MENUACCOUNTSWEEP) break;
            data.splice(i, 1);
    }
    if(HAM_CHECK_DEPOSITS==0){
        for (i = 0; i < data.length; i++) if (data[i].text === cm.constants.MENUCHECKDEPOSIT) break;
            data.splice(i, 1);
    }
    if(!cm.checkUserPermission("TRANSFER_BETWEEN_OWN_ACCOUNT_VIEW_RECEPIENT")&&!cm.checkUserFeature("TRANSFER_BETWEEN_OWN_ACCOUNT_VIEW_RECEPIENT")){
        for (i = 0; i < data.length; i++) if (data[i].text === cm.constants.MENUMANAGERECIPIENTS) break;
            data.splice(i, 1);
    }
    if(!cm.checkUserPermission("OPEN_NEW_ACCOUNT")){
        for (i = 0; i < data.length; i++) if (data[i].text === cm.constants.MENUOPENNEWACCOUNT) break;
            data.splice(i, 1);
    }
    if(!cm.checkUserPermission("FIXED_DEPOSIT")&&!cm.checkUserFeature("FIXED_DEPOSIT")){
        for (i = 0; i < data.length; i++) if (data[i].text === cm.constants.MENUFIXEDDEPOSIT) break;
            data.splice(i, 1);
    }
    if(!cm.checkUserPermission("CROSS_BORDER_CONSENT")&&!cm.checkUserFeature("CROSS_BORDER_CONSENT")){
        for (i = 0; i < data.length; i++) if (data[i].text === cm.constants.MENUCROSSBORDERCONSENT) break;
            data.splice(i, 1);
    }
    if(!cm.checkUserPermission("UNIFIED_TRANSFER")&&!cm.checkUserFeature("UNIFIED_TRANSFER")){
        for (i = 0; i < data.length; i++) if (data[i].text === cm.constants.MENUUNIFIEDTRANSFERSFLOW) break;
            data.splice(i, 1);
    }
    if(!cm.checkUserPermission("MANAGE_ACCOUNT_STATEMENTS")&&!cm.checkUserFeature("MANAGE_ACCOUNT_STATEMENTS")){
        for (i = 0; i < data.length; i++) if (data[i].text === cm.constants.MENUACCOUNTSTATEMENTS) break;
            data.splice(i, 1);
    }
    
    if(!cm.checkUserPermission("NOTIFICATION")&&!cm.checkUserFeature("NOTIFICATION")){
        for (i = 0; i < data.length; i++) if (data[i].text === cm.constants.MENUNOTIFICATIONS) break;
            data.splice(i, 1);
    }
    if(!cm.checkUserPermission("FEEDBACK")&&!cm.checkUserFeature("FEEDBACK")){
        for (i = 0; i < data.length; i++) if (data[i].text === cm.constants.MENUFEEDBACK) break;
            data.splice(i, 1);
    }
        if(!cm.checkUserPermission("DISPUTE_TRANSACTIONS")&&!cm.checkUserFeature("DISPUTE_TRANSACTIONS")){
        for (i = 0; i < data.length; i++) if (data[i].text === cm.constants.MENUDISPUTE) break;
            data.splice(i, 1);
    }
    
    if(!cm.checkUserPermission("PERSONAL_FINANCE_MANAGEMENT")){
        for (i = 0; i < data.length; i++) if (data[i].text === cm.constants.MENUPFMMYMONEY) break;
            data.splice(i, 1);
    }
    
    
    
    if(!kony.sdk.isNullOrUndefined(footerData[0].text)) {
    scope.view.customFooter.imgAccounts.src=footerData[0].img;
    scope.view.customFooter.lblAccounts.text=footerData[0].text;
    scope.view.customFooter.flxAccounts.onClick = function() {
        self.switchOnClick(footerData[0].text, scope);
        self.showOrHideHamburgerUI(true, scope);
    }
    }
    if(!kony.sdk.isNullOrUndefined(footerData[1].text)) {
        scope.view.customFooter.imgTransfer.src=footerData[1].img;
    scope.view.customFooter.lblTransfer.text=footerData[1].text;
    scope.view.customFooter.flxTransfer.onClick = function() {
        self.showOrHideHamburgerUI(true, scope);
        self.switchOnClick(footerData[1].text, scope);
    }
}
if(!kony.sdk.isNullOrUndefined(footerData[2].text)) {
            scope.view.customFooter.imgBillPay.src=footerData[2].img;
    scope.view.customFooter.lblBillPay.text=footerData[2].text;
    scope.view.customFooter.flxBillPay.onClick = function() {
        self.switchOnClick(footerData[2].text, scope);
        self.showOrHideHamburgerUI(true, scope);
    }
    }
    //highlightWhichMenu
    scope.view.customFooter.flxAccSelect.setVisibility(false);
    scope.view.customFooter.flxTransferSel.setVisibility(false);
    scope.view.customFooter.flxBillSelected.setVisibility(false);
    scope.view.customFooter.flxMoreSelect.setVisibility(false);

for(let i=0; i< footerData.length; i++){	
    if(selectedForm==footerData[0].text){
        scope.view.customFooter.flxAccSelect.setVisibility(true);
        scope.view.customFooter.lblAccounts.skin = "sknLbl424242SSP20px";
        scope.view.customFooter.lblTransfer.skin = "sknLbl004B95SSPRegular20px";
        scope.view.customFooter.lblBillPay.skin = "sknLbl004B95SSPRegular20px";
        scope.view.customFooter.lblMore.skin = "sknLbl004B95SSPRegular20px";
        scope.view.customFooter.imgAccounts.src = "hblhome.png";
        // Code to be used in future for assigning active and inactive images
//           scope.view.customFooter.imgTransfer.src = "transfer.png";
//           scope.view.customFooter.imgBillPay.src = "billpay.png";
        scope.view.customFooter.imgMore.src = "hblmore.png";
    }
    else if(selectedForm==footerData[1].text){
        scope.view.customFooter.flxTransferSel.setVisibility(true);
        scope.view.customFooter.lblAccounts.skin = "sknLbl004B95SSPRegular20px";
        scope.view.customFooter.lblTransfer.skin = "sknLbl424242SSP20px";
        scope.view.customFooter.lblBillPay.skin = "sknLbl004B95SSPRegular20px";
        scope.view.customFooter.lblMore.skin = "sknLbl004B95SSPRegular20px";
        if(footerData[0].text == configManager.constants.MENUWEALTHWATCHLIST){
        scope.view.customFooter.imgAccounts.src = footerData[0].img;
        }else{
        scope.view.customFooter.imgAccounts.src = "hblhome.png";
        }
        // Code to be used in future for assigning active and inactive images
//           scope.view.customFooter.imgTransfer.src = "transferactive.png";
//           scope.view.customFooter.imgBillPay.src = "billpay.png";
        scope.view.customFooter.imgMore.src = "hblmore.png";
    }
    else if(selectedForm==footerData[2].text){
        scope.view.customFooter.flxBillSelected.setVisibility(true);
        scope.view.customFooter.lblAccounts.skin = "sknLbl004B95SSPRegular20px";
        scope.view.customFooter.lblTransfer.skin = "sknLbl004B95SSPRegular20px";
        scope.view.customFooter.lblBillPay.skin = "sknLbl424242SSP20px";
        scope.view.customFooter.lblMore.skin = "sknLbl004B95SSPRegular20px";
        scope.view.customFooter.imgAccounts.src = "hblhome.png";
        scope.view.customFooter.imgBillPay.src = "hblqr.png";
        // Code to be used in future for assigning active and inactive images
//           scope.view.customFooter.imgTransfer.src = "transfer.png";
        if (QRPaymentsEntitilement === true) {
        scope.view.customFooter.imgBillPay.src = "hblqr.png";}
        scope.view.customFooter.imgMore.src = "hblmore.png";
    }
    else{

    let custominfoCD = applicationManager.getNavigationManager().getCustomInfo("frmCustomerDashboard");
    if(!kony.sdk.isNullOrUndefined(custominfoCD)  && custominfoCD.isWealthUser === "true"){
        if(!kony.sdk.isNullOrUndefined(custominfoCD.isMultiCustomer) && custominfoCD.isMultiCustomer === "true"){
            scope.view.customFooter.flxMoreSelect.setVisibility(false);
            scope.view.customFooter.flxAccSelect.setVisibility(false);
            scope.view.customFooter.flxTransferSel.setVisibility(false);
            scope.view.customFooter.flxBillSelected.setVisibility(false);
            scope.view.customFooter.lblAccounts.skin = "sknLbl004B95SSPRegular20px";
            scope.view.customFooter.lblTransfer.skin = "sknLbl004B95SSPRegular20px";
            scope.view.customFooter.lblBillPay.skin = "sknLbl004B95SSPRegular20px";
            scope.view.customFooter.lblMore.skin = "sknLbl004B95SSPRegular20px";
        }else{
                scope.view.customFooter.flxMoreSelect.setVisibility(false);
                scope.view.customFooter.flxAccSelect.setVisibility(true);
                scope.view.customFooter.flxTransferSel.setVisibility(false);
                scope.view.customFooter.flxBillSelected.setVisibility(false);
                scope.view.customFooter.lblAccounts.skin = "sknLbl424242SSP20px";
                scope.view.customFooter.lblTransfer.skin = "sknLbl004B95SSPRegular20px";
                scope.view.customFooter.lblBillPay.skin = "sknLbl004B95SSPRegular20px";
                scope.view.customFooter.lblMore.skin = "sknLbl004B95SSPRegular20px";
        }

    }else{
        scope.view.customFooter.flxMoreSelect.setVisibility(true);
        scope.view.customFooter.lblAccounts.skin = "sknLbl004B95SSPRegular20px";
        scope.view.customFooter.lblTransfer.skin = "sknLbl004B95SSPRegular20px";
        scope.view.customFooter.lblBillPay.skin = "sknLbl004B95SSPRegular20px";
        scope.view.customFooter.lblMore.skin = "sknLbl424242SSP20px";
    }
        scope.view.customFooter.imgAccounts.src = "hblhome.png";
        // Code to be used in future for assigning active and inactive images
//           scope.view.customFooter.imgTransfer.src = "transfer.png";
//           scope.view.customFooter.imgBillPay.src = "billpay.png";
        scope.view.customFooter.imgMore.src = "hblmore.png";
    }
}
    //tapimages
    // Code to be used in future for assigning active and inactive images
    /* scope.view.customFooter.flxAccounts.onTouchStart = function(){
        if(scope.view.customFooter.imgAccounts.src === "accountsactive.png"){}
        else{
        scope.view.customFooter.imgAccounts.src = "accountsontap.png";
        }
    };
    scope.view.customFooter.flxAccounts.onTouchEnd = function(){
        if(scope.view.customFooter.imgAccounts.src === "accountsactive.png"){}
        else{
        scope.view.customFooter.imgAccounts.src = "accounts.png";
        }
    };
    scope.view.customFooter.flxTransfer.onTouchStart = function(){
        if(scope.view.customFooter.imgTransfer.src === "transferactive.png"){}
        else{
        scope.view.customFooter.imgTransfer.src = "transferontap.png";
        }
    };
    scope.view.customFooter.flxTransfer.onTouchEnd = function(){
        if(scope.view.customFooter.imgTransfer.src === "transferactive.png"){}
        else{
        scope.view.customFooter.imgTransfer.src = "transfer.png";
        }
    };
    scope.view.customFooter.flxBillPay.onTouchStart = function(){
        if(scope.view.customFooter.imgBillPay.src === "billpayactive.png"){}
        else{
        scope.view.customFooter.imgBillPay.src = "billpayontap.png";
        }
    };
    scope.view.customFooter.flxBillPay.onTouchEnd = function(){
        if(scope.view.customFooter.imgBillPay.src === "billpayactive.png"){}
        else{
        scope.view.customFooter.imgBillPay.src = "billpay.png";
        }
    };
    scope.view.customFooter.imgMore.onTouchStart = function(){
        if(scope.view.customFooter.imgMore.src === "moreactive.png"){}
        else{
        scope.view.customFooter.imgMore.src = "moreontap.png";
        }
    };
    scope.view.customFooter.imgMore.onTouchEnd = function(){
        if(scope.view.customFooter.imgMore.src === "moreactive.png"){}
        else{
        scope.view.customFooter.imgMore.src = "more.png";
        }
    }; */
        }
        else{
            
    var cm = applicationManager.getConfigurationManager();
    var menuDataIOS = configManager.getIOSAppMenuItems();
    var footerData = this.setHamburgerMenuItemsForMicroApp(menuDataIOS);
    var moreMenuDataIOS= configManager.getIOSAppMoreMenuItems();
    var data = this.setHamburgerMenuItemsForMicroApp(moreMenuDataIOS);
        scope.view.customFooter.imgBillPay.src = "hblqr.png";
if(footerData.length < 3) {
        var count = 3 - footerData.length;
        footerData.forEach(function(footerMenuItem) {
        let index = data.findIndex(moreMenuItem => moreMenuItem.text === footerMenuItem.text);
        if(index !== -1) {
            data.splice(index, 1);
        }
        });
        for(let index = 0; index < count; index++) {
        footerData[footerData.length] = data[0];
        data.splice(0,1);
        }
    }
    const isRegionalTransferMAPresent = configManager.isMicroAppPresent(configManager.microappConstants.REGIONALTRANSFER);
    const isTradeFinanceMAPresent = configManager.isMicroAppPresent(configManager.microappConstants.TRADEFINANCE);
    var tradeFinanceEntitilement = applicationManager.getConfigurationManager().checkUserPermission("IMPORT_LC_VIEW");
    var QRPaymentsEntitilement =applicationManager.getConfigurationManager().checkUserPermission("QR_PAYMENTS_CREATE");
var exportTradeFinanceEntitilement = applicationManager.getConfigurationManager().checkUserPermission("EXPORT_LC_VIEW");
    const isAccountSweepsMAPresent = configManager.isMicroAppPresent(configManager.microappConstants.ACCOUNTSWEEP);
    var acountSweepsEntitilement = applicationManager.getConfigurationManager().checkUserPermission("ACCOUNT_SWEEP_VIEW");
    const isBillPayMAPresent = configManager.isMicroAppPresent(configManager.microappConstants.BILLPAY);
    var billPayEntitilement = (applicationManager.getConfigurationManager().checkUserFeature("BILL_PAY") && (applicationManager.getConfigurationManager().checkUserPermission("BILL_PAY_CREATE") || applicationManager.getConfigurationManager().checkUserPermission("BILL_PAY_VIEW_PAYMENTS") || applicationManager.getConfigurationManager().checkUserPermission("BILL_PAY_CREATE_PAYEES") || applicationManager.getConfigurationManager().checkUserPermission("BILL_PAY_VIEW_PAYEES") || applicationManager.getConfigurationManager().checkUserPermission("BILL_PAY_BULK")));
    var openNewAccountEntitled = applicationManager.getConfigurationManager().checkUserPermission("OPEN_NEW_ACCOUNT");
    if(isTradeFinanceMAPresent){
        if(!((tradeFinanceEntitilement === true) || (exportTradeFinanceEntitilement === true))){
        for(i=0;i<data.length;i++)
            if(data[i].text === cm.constants.MENUTRADEFINANCE)
            break;
        data.splice(i,1);
        }
    }
        if (!(QRPaymentsEntitilement === true)) {
        for (i = 0; i < footerData.length; i++)
            if (footerData[i].text === cm.constants.MENUQRPAYMENT)
            break;
            footerData.splice(i, 1);
        }
    if(isRegionalTransferMAPresent) {
    var moneyMovementModule = applicationManager.getModulesPresentationController({
        'appName': "TransfersMA",
        'moduleName': "MoneyMovementUIModule"
});
    var entitlements=moneyMovementModule.checkForTransfersModuleEntitlements();
        
    if(!(entitlements.isTransfersAvailable==1 || moneyMovementModule.getEntitlementValue("ispayAPersonEnabled")=="true" )|| !cm.checkUserFeature("UNIFIED_TRANSFER")){
        for(i=0;i<footerData.length;i++)
        if(footerData[i].text==cm.constants.MENUMONEYMOVEMENTTRANSFERS)
            break;
        footerData.splice(i,1);
    } 
    if(!(entitlements.isTransfersAvailable==1 ||  moneyMovementModule.getEntitlementValue("ispayAPersonEnabled")=="true" )|| !cm.checkUserFeature("UNIFIED_TRANSFER")){
        for(i=0;i<footerData.length;i++)
        if(footerData[i].text==cm.constants.MENUTRANSFERSACTIVITY || footerData[i].text==cm.constants.MENUMANAGETRANSACTIONS)
            break;
        footerData.splice(i,1);
        for(i=0;i<footerData.length;i++)
        if(footerData[i].text==cm.constants.MENUMANAGERECIPIENTS || footerData[i].text==cm.constants.MENUMANAGEBENEFICIARIES)
            break;
        footerData.splice(i,1);
    } 
    }
    if(isAccountSweepsMAPresent){
        if(!(acountSweepsEntitilement === true)){
        for(i=0;i<data.length;i++)
            if(data[i].text === cm.constants.MENUACCOUNTSWEEP)
            break;
        data.splice(i,1);
        }
    }
    if(openNewAccountEntitled == false){
        for (i = 0; i < data.length; i++) if (data[i].text === cm.constants.MENUOPENNEWACCOUNT) break;
            data.splice(i, 1);
    }
    if (isBillPayMAPresent) {
        if (billPayEntitilement === false&& !cm.checkUserFeature("BILL_PAY")) {
            for (i = 0; i < data.length; i++) if (data[i].text === cm.constants.MENUBILLPAY) break;
            data.splice(i, 1);
        }
    }
    if(HAM_APPROVAL_REQUEST==0){
        for (i = 0; i < data.length; i++) if (data[i].text === cm.constants.MENUAPPROVALREQUEST) break;
            data.splice(i, 1);
    }
    if(HAM_SEND_MONEY==0){
        for (i = 0; i < data.length; i++) if (data[i].text === cm.constants.MENUSENDMONEY) break;
            data.splice(i, 1);
    }
    if(HAM_TRANSFERS==0){
        for (i = 0; i < data.length; i++) if (data[i].text === cm.constants.MENUTRANSFERS) break;
            data.splice(i, 1);
    }
    if(HAM_ACCOUNT_SWEEP==0){
        for (i = 0; i < data.length; i++) if (data[i].text === cm.constants.MENUACCOUNTSWEEP) break;
            data.splice(i, 1);
    }
    if(HAM_CHECK_DEPOSITS==0){
        for (i = 0; i < data.length; i++) if (data[i].text === cm.constants.MENUCHECKDEPOSIT) break;
            data.splice(i, 1);
    }
    if(!cm.checkUserPermission("TRANSFER_BETWEEN_OWN_ACCOUNT_VIEW_RECEPIENT")){
        for (i = 0; i < data.length; i++) if (data[i].text === cm.constants.MENUMANAGERECIPIENTS) break;
            data.splice(i, 1);
    }
    if(!cm.checkUserPermission("OPEN_NEW_ACCOUNT")){
        for (i = 0; i < data.length; i++) if (data[i].text === cm.constants.MENUOPENNEWACCOUNT) break;
            data.splice(i, 1);
    }
    if(!cm.checkUserPermission("FIXED_DEPOSIT")&& !cm.checkUserFeature("FIXED_DEPOSIT")){
        for (i = 0; i < data.length; i++) if (data[i].text === cm.constants.MENUFIXEDDEPOSIT) break;
            data.splice(i, 1);
    }
    if(!cm.checkUserPermission("CROSS_BORDER_CONSENT")&&!cm.checkUserFeature("CROSS_BORDER_CONSENT")){
        for (i = 0; i < data.length; i++) if (data[i].text === cm.constants.MENUCROSSBORDERCONSENT) break;
            data.splice(i, 1);
    }
	if(!cm.checkUserPermission("WITHDRAW_CASH_CARDLESS_CASH")&&!cm.checkUserFeature("WITHDRAW_CASH_CARDLESS_CASH")){
		for (i = 0; i < data.length; i++) if (data[i].text === cm.constants.MENUCARDLESS) break;
            data.splice(i, 1);
	}
    if(!cm.checkUserPermission("CHECK_MANAGEMENT")&&!cm.checkUserFeature("CHECK_MANAGEMENT")){
		for (i = 0; i < data.length; i++) if (data[i].text === cm.constants.MENUCHEQUEMANAGEMENT) break;
            data.splice(i, 1);
	}
	
    if(!cm.checkUserPermission("UNIFIED_TRANSFER")&&!cm.checkUserFeature("UNIFIED_TRANSFER")){
        for (i = 0; i < data.length; i++) if (data[i].text === cm.constants.MENUUNIFIEDTRANSFERSFLOW) break;
            data.splice(i, 1);
    }
    if(!cm.checkUserPermission("MANAGE_ACCOUNT_STATEMENTS")&&!cm.checkUserFeature("MANAGE_ACCOUNT_STATEMENTS")){
        for (i = 0; i < data.length; i++) if (data[i].text === cm.constants.MENUACCOUNTSTATEMENTS) break;
            data.splice(i, 1);
    }
    if(!cm.checkUserPermission("FEEDBACK")&&!cm.checkUserFeature("FEEDBACK")){
        for (i = 0; i < data.length; i++) if (data[i].text === cm.constants.MENUFEEDBACK) break;
            data.splice(i, 1);
    }
        if(!cm.checkUserPermission("DISPUTE_TRANSACTIONS")&&!cm.checkUserFeature("DISPUTE_TRANSACTIONS")){
        for (i = 0; i < data.length; i++) if (data[i].text === cm.constants.MENUDISPUTE) break;
            data.splice(i, 1);
    }
    
    
    if(!cm.checkUserPermission("NOTIFICATION")&&!cm.checkUserFeature("NOTIFICATION")){
        for (i = 0; i < data.length; i++) if (data[i].text === cm.constants.MENUNOTIFICATIONS) break;
            data.splice(i, 1);
    }
    
    
    if(!cm.checkUserPermission("PERSONAL_FINANCE_MANAGEMENT")){
        for (i = 0; i < data.length; i++) if (data[i].text === cm.constants.MENUPFMMYMONEY) break;
            data.splice(i, 1);
    }
    for(i=0;i<footerData.length;i++){
       if(footerData[i].text == kony.i18n.getLocalizedString("kony.mb.PFM.Home") || footerData[i].text == kony.i18n.getLocalizedString("i18n.qrpayments.QRPayments") || footerData[i].text == kony.i18n.getLocalizedString("kony.mb.BillPay.BillPay")){}
       else{
        footerData.splice(i,1) 
        }
    }
    if(!kony.sdk.isNullOrUndefined(footerData[0].text)) {
    scope.view.customFooter.imgAccounts.src=footerData[0].img;
    scope.view.customFooter.lblAccounts.text=footerData[0].text;
    scope.view.customFooter.flxAccounts.onClick = function() {
        self.switchOnClick(footerData[0].text, scope);
        self.showOrHideHamburgerUI(true, scope);
    }
    }
    if(!kony.sdk.isNullOrUndefined(footerData[1].text)) {
        scope.view.customFooter.imgTransfer.src=footerData[1].img;
    scope.view.customFooter.lblTransfer.text=footerData[1].text;
    scope.view.customFooter.flxTransfer.onClick = function() {
        self.showOrHideHamburgerUI(true, scope);
        self.switchOnClick(footerData[1].text, scope);
    }
}
if(!kony.sdk.isNullOrUndefined(footerData[2].text)) {
            scope.view.customFooter.imgBillPay.src=footerData[2].img;
    scope.view.customFooter.lblBillPay.text=footerData[2].text;
    scope.view.customFooter.flxBillPay.onClick = function() {
        self.switchOnClick(footerData[2].text, scope);
        self.showOrHideHamburgerUI(true, scope);
    }
    }
    //highlightWhichMenu
    scope.view.customFooter.flxAccSelect.setVisibility(false);
    scope.view.customFooter.flxTransferSel.setVisibility(false);
    scope.view.customFooter.flxBillSelected.setVisibility(false);
    scope.view.customFooter.flxMoreSelect.setVisibility(false);

for(let i=0; i< footerData.length; i++){	
    if(selectedForm==footerData[0].text){
        scope.view.customFooter.flxAccSelect.setVisibility(true);
        scope.view.customFooter.lblAccounts.skin = "sknLbl424242SSP20px";
        scope.view.customFooter.lblTransfer.skin = "sknLbl004B95SSPRegular20px";
        scope.view.customFooter.lblBillPay.skin = "sknLbl004B95SSPRegular20px";
        scope.view.customFooter.lblMore.skin = "sknLbl004B95SSPRegular20px";
        scope.view.customFooter.imgAccounts.src = "hblhome.png";
        // Code to be used in future for assigning active and inactive images
//           scope.view.customFooter.imgTransfer.src = "transfer.png";
//           scope.view.customFooter.imgBillPay.src = "billpay.png";
        scope.view.customFooter.imgMore.src = "hblmore.png";
    }
    else if(selectedForm==footerData[1].text){
        scope.view.customFooter.flxTransferSel.setVisibility(true);
        scope.view.customFooter.lblAccounts.skin = "sknLbl004B95SSPRegular20px";
        scope.view.customFooter.lblTransfer.skin = "sknLbl424242SSP20px";
        scope.view.customFooter.lblBillPay.skin = "sknLbl004B95SSPRegular20px";
        scope.view.customFooter.lblMore.skin = "sknLbl004B95SSPRegular20px";
        if(footerData[0].text == configManager.constants.MENUWEALTHWATCHLIST){
        scope.view.customFooter.imgAccounts.src = footerData[0].img;
        }else{
        scope.view.customFooter.imgAccounts.src = "hblhome.png";
        }
        // Code to be used in future for assigning active and inactive images
//           scope.view.customFooter.imgTransfer.src = "transferactive.png";
//           scope.view.customFooter.imgBillPay.src = "billpay.png";
        scope.view.customFooter.imgMore.src = "hblmore.png";
    }
    else if(selectedForm==footerData[2].text){
        scope.view.customFooter.flxBillSelected.setVisibility(true);
        scope.view.customFooter.lblAccounts.skin = "sknLbl004B95SSPRegular20px";
        scope.view.customFooter.lblTransfer.skin = "sknLbl004B95SSPRegular20px";
        scope.view.customFooter.lblBillPay.skin = "sknLbl424242SSP20px";
        scope.view.customFooter.lblMore.skin = "sknLbl004B95SSPRegular20px";
        scope.view.customFooter.imgAccounts.src = "hblhome.png";
        scope.view.customFooter.imgBillPay.src = "hblqr.png";
        // Code to be used in future for assigning active and inactive images
//           scope.view.customFooter.imgTransfer.src = "transfer.png";
        if (QRPaymentsEntitilement === true) {
        scope.view.customFooter.imgBillPay.src = "hblqr.png";}
        scope.view.customFooter.imgMore.src = "hblmore.png";
    }
    else{

    let custominfoCD = applicationManager.getNavigationManager().getCustomInfo("frmCustomerDashboard");
    if(!kony.sdk.isNullOrUndefined(custominfoCD)  && custominfoCD.isWealthUser === "true"){
        if(!kony.sdk.isNullOrUndefined(custominfoCD.isMultiCustomer) && custominfoCD.isMultiCustomer === "true"){
            scope.view.customFooter.flxMoreSelect.setVisibility(false);
            scope.view.customFooter.flxAccSelect.setVisibility(false);
            scope.view.customFooter.flxTransferSel.setVisibility(false);
            scope.view.customFooter.flxBillSelected.setVisibility(false);
            scope.view.customFooter.lblAccounts.skin = "sknLbl004B95SSPRegular20px";
            scope.view.customFooter.lblTransfer.skin = "sknLbl004B95SSPRegular20px";
            scope.view.customFooter.lblBillPay.skin = "sknLbl004B95SSPRegular20px";
            scope.view.customFooter.lblMore.skin = "sknLbl004B95SSPRegular20px";
        }else{
                scope.view.customFooter.flxMoreSelect.setVisibility(false);
                scope.view.customFooter.flxAccSelect.setVisibility(true);
                scope.view.customFooter.flxTransferSel.setVisibility(false);
                scope.view.customFooter.flxBillSelected.setVisibility(false);
                scope.view.customFooter.lblAccounts.skin = "sknLbl424242SSP20px";
                scope.view.customFooter.lblTransfer.skin = "sknLbl004B95SSPRegular20px";
                scope.view.customFooter.lblBillPay.skin = "sknLbl004B95SSPRegular20px";
                scope.view.customFooter.lblMore.skin = "sknLbl004B95SSPRegular20px";
        }

    }else{
        scope.view.customFooter.flxMoreSelect.setVisibility(true);
        scope.view.customFooter.lblAccounts.skin = "sknLbl004B95SSPRegular20px";
        scope.view.customFooter.lblTransfer.skin = "sknLbl004B95SSPRegular20px";
        scope.view.customFooter.lblBillPay.skin = "sknLbl004B95SSPRegular20px";
        scope.view.customFooter.lblMore.skin = "sknLbl424242SSP20px";
    }
        scope.view.customFooter.imgAccounts.src = "hblhome.png";
        // Code to be used in future for assigning active and inactive images
//           scope.view.customFooter.imgTransfer.src = "transfer.png";
//           scope.view.customFooter.imgBillPay.src = "billpay.png";
        scope.view.customFooter.imgMore.src = "hblmore.png";
    }
}
    //tapimages
    // Code to be used in future for assigning active and inactive images
    /* scope.view.customFooter.flxAccounts.onTouchStart = function(){
        if(scope.view.customFooter.imgAccounts.src === "accountsactive.png"){}
        else{
        scope.view.customFooter.imgAccounts.src = "accountsontap.png";
        }
    };
    scope.view.customFooter.flxAccounts.onTouchEnd = function(){
        if(scope.view.customFooter.imgAccounts.src === "accountsactive.png"){}
        else{
        scope.view.customFooter.imgAccounts.src = "accounts.png";
        }
    };
    scope.view.customFooter.flxTransfer.onTouchStart = function(){
        if(scope.view.customFooter.imgTransfer.src === "transferactive.png"){}
        else{
        scope.view.customFooter.imgTransfer.src = "transferontap.png";
        }
    };
    scope.view.customFooter.flxTransfer.onTouchEnd = function(){
        if(scope.view.customFooter.imgTransfer.src === "transferactive.png"){}
        else{
        scope.view.customFooter.imgTransfer.src = "transfer.png";
        }
    };
    scope.view.customFooter.flxBillPay.onTouchStart = function(){
        if(scope.view.customFooter.imgBillPay.src === "billpayactive.png"){}
        else{
        scope.view.customFooter.imgBillPay.src = "billpayontap.png";
        }
    };
    scope.view.customFooter.flxBillPay.onTouchEnd = function(){
        if(scope.view.customFooter.imgBillPay.src === "billpayactive.png"){}
        else{
        scope.view.customFooter.imgBillPay.src = "billpay.png";
        }
    };
    scope.view.customFooter.imgMore.onTouchStart = function(){
        if(scope.view.customFooter.imgMore.src === "moreactive.png"){}
        else{
        scope.view.customFooter.imgMore.src = "moreontap.png";
        }
    };
    scope.view.customFooter.imgMore.onTouchEnd = function(){
        if(scope.view.customFooter.imgMore.src === "moreactive.png"){}
        else{
        scope.view.customFooter.imgMore.src = "more.png";
        }
    }; */
        }
    
    }
    else{
    var menuDataHamburger = configManager.getHamburgerMenuItems();
    var data = this.setHamburgerMenuItemsForMicroApp(menuDataHamburger);
    
    const isRegionalTransferMAPresent = configManager.isMicroAppPresent(configManager.microappConstants.REGIONALTRANSFER);
    const isTradeFinanceMAPresent = configManager.isMicroAppPresent(configManager.microappConstants.TRADEFINANCE);
    var tradeFinanceEntitilement = applicationManager.getConfigurationManager().checkUserPermission("IMPORT_LC_VIEW");
var exportTradeFinanceEntitilement = applicationManager.getConfigurationManager().checkUserPermission("EXPORT_LC_VIEW");
    const isAccountSweepsMAPresent = configManager.isMicroAppPresent(configManager.microappConstants.ACCOUNTSWEEP);
    var openNewAccountEntitled = applicationManager.getConfigurationManager().checkUserPermission("OPEN_NEW_ACCOUNT");
    var acountSweepsEntitilement = applicationManager.getConfigurationManager().checkUserPermission("ACCOUNT_SWEEP_VIEW");
    var isBillPayMAPresent = configManager.isMicroAppPresent(configManager.microappConstants.BILLPAY);
    var billPayEntitilement =(applicationManager.getConfigurationManager().checkUserFeature("BILL_PAY") && (applicationManager.getConfigurationManager().checkUserPermission("BILL_PAY_CREATE") || applicationManager.getConfigurationManager().checkUserPermission("BILL_PAY_VIEW_PAYMENTS") || applicationManager.getConfigurationManager().checkUserPermission("BILL_PAY_CREATE_PAYEES") || applicationManager.getConfigurationManager().checkUserPermission("BILL_PAY_VIEW_PAYEES") || applicationManager.getConfigurationManager().checkUserPermission("BILL_PAY_BULK")));
    if(isTradeFinanceMAPresent){
        if(!((tradeFinanceEntitilement === true) || (exportTradeFinanceEntitilement === true))){
        for(i=0;i<data.length;i++)
            if(data[i].text === cm.constants.MENUTRADEFINANCE)
            break;
        data.splice(i,1);
        }
    }
    if(isRegionalTransferMAPresent) {
        var moneyMovementModule = applicationManager.getModulesPresentationController({
        "appName": "TransfersMA",
        "moduleName": "MoneyMovementUIModule"
});
    var entitlements=moneyMovementModule.checkForTransfersModuleEntitlements();
    if(!(entitlements.isTransfersAvailable==1 || moneyMovementModule.getEntitlementValue("ispayAPersonEnabled")=="true" )|| !cm.checkUserFeature("UNIFIED_TRANSFER")){
        for(i=0;i<data.length;i++)
        if(data[i].text==cm.constants.MENUMONEYMOVEMENTTRANSFERS)
            break;
        data.splice(i,1);
        for(i=0;i<data.length;i++)
        if(data[i].text==cm.constants.MENUTRANSFERSACTIVITY || data[i].text==cm.constants.MENUMANAGETRANSACTIONS)
            break;
        data.splice(i,1);
        for(i=0;i<data.length;i++)
        if(data[i].text==cm.constants.MENUMANAGERECIPIENTS || data[i].text==cm.constants.MENUMANAGEBENEFICIARIES)
            break;
        data.splice(i,1);
    } 
    }
    if (isBillPayMAPresent) {
        if (billPayEntitilement === false) {
            for (i = 0; i < data.length; i++) if (data[i].text === cm.constants.MENUBILLPAY) break;
            data.splice(i, 1);
        }
    }
    if(isAccountSweepsMAPresent){
        if(!(acountSweepsEntitilement === true)){
        for(i=0;i<data.length;i++)
            if(data[i].text === cm.constants.MENUACCOUNTSWEEP)
            break;
        data.splice(i,1);
        }
    }
    if(openNewAccountEntitled == false){
        for (i = 0; i < data.length; i++) if (data[i].text === cm.constants.MENUOPENNEWACCOUNT) break;
            data.splice(i, 1);
    }
    if(HAM_APPROVAL_REQUEST==0){
        for (i = 0; i < data.length; i++) if (data[i].text === cm.constants.MENUAPPROVALREQUEST) break;
            data.splice(i, 1);
    }
    if(HAM_SEND_MONEY==0){
        for (i = 0; i < data.length; i++) if (data[i].text === cm.constants.MENUSENDMONEY) break;
            data.splice(i, 1);
    }
    if(HAM_TRANSFERS==0){
        for (i = 0; i < data.length; i++) if (data[i].text === cm.constants.MENUTRANSFERS) break;
            data.splice(i, 1);
    }
    if(HAM_ACCOUNT_SWEEP==0){
        for (i = 0; i < data.length; i++) if (data[i].text === cm.constants.MENUACCOUNTSWEEP) break;
            data.splice(i, 1);
    }
    if(HAM_CHECK_DEPOSITS==0){
        for (i = 0; i < data.length; i++) if (data[i].text === cm.constants.MENUCHECKDEPOSIT) break;
            data.splice(i, 1);
    }
    if(!cm.checkUserPermission("TRANSFER_BETWEEN_OWN_ACCOUNT_VIEW_RECEPIENT")&&!cm.checkUserFeature("TRANSFER_BETWEEN_OWN_ACCOUNT_VIEW_RECEPIENT")){
        for (i = 0; i < data.length; i++) if (data[i].text === cm.constants.MENUMANAGERECIPIENTS) break;
            data.splice(i, 1);
    }
    if(!cm.checkUserPermission("OPEN_NEW_ACCOUNT")){
        for (i = 0; i < data.length; i++) if (data[i].text === cm.constants.MENUOPENNEWACCOUNT) break;
            data.splice(i, 1);
    }
    if(!cm.checkUserPermission("FIXED_DEPOSIT")&&!cm.checkUserFeature("FIXED_DEPOSIT")){
        for (i = 0; i < data.length; i++) if (data[i].text === cm.constants.MENUFIXEDDEPOSIT) break;
            data.splice(i, 1);
    }
    if(!cm.checkUserPermission("CROSS_BORDER_CONSENT")&&!cm.checkUserFeature("CROSS_BORDER_CONSENT")){
        for (i = 0; i < data.length; i++) if (data[i].text === cm.constants.MENUCROSSBORDERCONSENT) break;
            data.splice(i, 1);
    }
    if(!cm.checkUserPermission("UNIFIED_TRANSFER")&&!cm.checkUserFeature("UNIFIED_TRANSFER")){
        for (i = 0; i < data.length; i++) if (data[i].text === cm.constants.MENUUNIFIEDTRANSFERSFLOW) break;
            data.splice(i, 1);
    }
    if(!cm.checkUserPermission("MANAGE_ACCOUNT_STATEMENTS")&&!cm.checkUserFeature("MANAGE_ACCOUNT_STATEMENTS")){
        for (i = 0; i < data.length; i++) if (data[i].text === cm.constants.MENUACCOUNTSTATEMENTS) break;
            data.splice(i, 1);
    }
	if(!cm.checkUserPermission("WITHDRAW_CASH_CARDLESS_CASH")&&!cm.checkUserFeature("WITHDRAW_CASH_CARDLESS_CASH")){
		for (i = 0; i < data.length; i++) if (data[i].text === cm.constants.MENUCARDLESS) break;
            data.splice(i, 1);
	}
    if(!cm.checkUserPermission("CHECK_MANAGEMENT")&&!cm.checkUserFeature("CHECK_MANAGEMENT")){
		for (i = 0; i < data.length; i++) if (data[i].text === cm.constants.MENUCHEQUEMANAGEMENT) break;
            data.splice(i, 1);
	}
    if(!cm.checkUserPermission("NOTIFICATION")&&!cm.checkUserFeature("NOTIFICATION")){
        for (i = 0; i < data.length; i++) if (data[i].text === cm.constants.MENUNOTIFICATIONS) break;
            data.splice(i, 1);
    }
    if(!cm.checkUserPermission("FEEDBACK")&&!cm.checkUserFeature("FEEDBACK")){
        for (i = 0; i < data.length; i++) if (data[i].text === cm.constants.MENUFEEDBACK) break;
            data.splice(i, 1);
    }
        if(!cm.checkUserPermission("DISPUTE_TRANSACTIONS")&&!cm.checkUserFeature("DISPUTE_TRANSACTIONS")){
        for (i = 0; i < data.length; i++) if (data[i].text === cm.constants.MENUDISPUTE) break;
            data.splice(i, 1);
    }
    
    if(!cm.checkUserPermission("PERSONAL_FINANCE_MANAGEMENT")){
        for (i = 0; i < data.length; i++) if (data[i].text === cm.constants.MENUPFMMYMONEY) break;
            data.splice(i, 1);
    }
    
    }
    // map and present data into hamburger (both hamburger on click or more on click)
    scope.view.Hamburger.segHamburger.widgetDataMap={imgHamburger:"img",lblHamburger:"text",lblMessagesNumber:"info",flxMessagesNumber:"backGround"};
    
    let alertsbadgeShown = false;
    let alertsNotifiModule ;
    let isSecureMessageMAPresent = configManager.isMicroAppPresent(configManager.microappConstants.SECUREMESSAGE);
    if(isSecureMessageMAPresent){
    var msgManager = applicationManager.getMessagesManager();
    var count = msgManager.getTotalNumberOfUnreadMessages();
    var alertManager = applicationManager.getAlertsManager();
    var notificationCount = alertManager.getUnreadNotifications();
    var previousUnreadCount = alertManager.getPreviousUnreadCount();
    let isSecureMessageMAPresent = configManager.isMicroAppPresent(configManager.microappConstants.SECUREMESSAGE);
    alertsNotifiModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName": "SecureMessageMA","moduleName": "AlertsUIModule"});
    alertsbadgeShown = alertsNotifiModule.presentationController.getAlertsBadgeStatus();
    }
    for(var i=0;i<data.length;i++){
    //if(!configManager.AggregatedExternalAccountEnabled)
    //continue;
    
    // show notifications count if secure message app is available 
    if (isSecureMessageMAPresent && data[i].text === configManager.constants.MENUNOTIFICATIONS && !kony.sdk.isNullOrUndefined(notificationCount) && notificationCount !== "0" ) {
        if(!alertsbadgeShown && (!kony.sdk.isNullOrUndefined(previousUnreadCount) && Number(previousUnreadCount) >= Number(notificationCount))){
        if(!applicationManager.getDeviceUtilManager().isIPhone()){
            if(scope.view.customHeader !== undefined && scope.view.customHeader !== null)
                scope.view.customHeader.imgBack.src = "hamburger.png";
        }
        data[i].img = {"src" : "notification.png"};
        }
        else{
        alertsNotifiModule.presentationController.setAlertsBadgeStatus(true);
        if(applicationManager.getDeviceUtilManager().isIPhone()){
            scope.view.customFooter.imgMore.src = "hblmore.png";
        }         
        data[i].img = {"src" : "notificationunread.png"};
        }
        data[i].info = {"text": notificationCount,"isVisible":true};
        data[i].backGround = {"isVisible":true};
    }
    else if (data[i].text === configManager.constants.MENUMESSAGES && !kony.sdk.isNullOrUndefined(count) && count !== "0" ) {
        data[i].info = {"text": count,"isVisible":true,"skin":"sknLbl424242SSP22px"};
        data[i].backGround = {"isVisible":false}; 
    }else if (data[i].text === configManager.constants.MENUACCOUNTS) {
        let custominfoCD = applicationManager.getNavigationManager().getCustomInfo("frmCustomerDashboard");
        if(!kony.sdk.isNullOrUndefined(custominfoCD) && (custominfoCD.reDesignFlow === "true")){
            data[i].text = kony.i18n.getLocalizedString('i18n.common.overview');
        }else{
        
            data[i].text = kony.i18n.getLocalizedString('kony.mb.Hamburger.Accounts');
            
        }
    }else{
        data[i].info = {"isVisible":false};
        data[i].backGround = {"isVisible":false}; 
    }
    }
    if (configManager.isEngageEnabled()) {
    var engageModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("EngageModule");
    engageModule.presentationController.menuSetup(scope.view, data);
    }
	if(devManager.isIPhone()){
	scope.view.Hamburger.segHamburger.bottom="60dp";	
	}
    scope.view.Hamburger.segHamburger.setData(data);
    scope.view.Hamburger.segHamburger.onRowClick= function(){
    this.hamburgerOnRowClick(scope)}.bind(this);


    }catch(e){
        kony.print("***************Error in SetmenuData**********"+e)
    }
},
    switchOnClick:function(selValue, scope){
    var configManager = applicationManager.getConfigurationManager();
    var userManager = applicationManager.getUserPreferencesManager();
    var navManager = applicationManager.getNavigationManager();
    var custominfoCD = applicationManager.getNavigationManager().getCustomInfo("frmCustomerDashboard");
    navManager.setCustomInfo("frmCardManageHome",{"isMainScreen": false});
    const isSecureMessageMAPresent = configManager.isMicroAppPresent(configManager.microappConstants.SECUREMESSAGE);
    var alertsbadgeShown = false;
    if(isSecureMessageMAPresent){
    var alertsUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"SecureMessageMA", "moduleName":"AlertsUIModule"});
    
    alertsbadgeShown = alertsUIModule.presentationController.getAlertsBadgeStatus();
    if(!alertsbadgeShown)
        alertsUIModule.presentationController.getUnreadNotificationsCount();
    }
    const isCardsMAPresent = configManager.isMicroAppPresent(configManager.microappConstants.CARDS);
    if(isCardsMAPresent) {
        var cardManageModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"CardsMA","moduleName":"ManageCardsUIModule"});
    cardManageModule.presentationController.setCardIndexStatus(true);
    }
    switch(selValue){
    case configManager.constants.MENUTRADEFINANCE:
        scope.view.flxHamburger.isVisible = false;
        navManager.navigateTo({"appName" : "TradeFinanceMA", "friendlyName" :"ImportLCUIModule/frmImportLC"});
        break; 
    case configManager.constants.MENUCONVERSATIONALBANKING:
        scope.view.flxHamburger.isVisible = false;
        var cbpMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"CBPMA","moduleName":"KonyDXChatbotModule"});
        cbpMod.presentationController.clearFlowValues();
        cbpMod.presentationController.navigateToChatbotLandingScreen();
        break;
    case configManager.constants.MENUCHEQUEMANAGEMENT:
        scope.view.flxHamburger.isVisible = false;
        var chequeMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"ArrangementsMA","moduleName":"ChequeManagementUIModule"});
        chequeMod.presentationController.clearFlowValues();
        chequeMod.presentationController.navigateToChequeLandingScreen();
        break;
    case configManager.constants.MENUACCOUNTS:
        scope.view.flxHamburger.isVisible = false;
        // var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "AccountsUIModule", "appName" : "HomepageMA"});
        // accountsModule.presentationController.showDashboard();
        var configurationManager = applicationManager.getConfigurationManager();
            const isAccUIModulePresent = configurationManager.isMicroAppPresent('HomepageMA');
            if (isAccUIModulePresent) {
                var accMode = kony.mvc.MDAApplication.getSharedInstance().moduleManager.getModule({
                    appName: "HomepageMA",
                    moduleName: "AccountsUIModule"
                });
                accMode.presentationController.dashboardService();
            }
        break;
         case configManager.constants.MENUACCOUNT:
        scope.view.flxHamburger.isVisible = false;
         var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "AccountsUIModule", "appName" : "HomepageMA"});
      //  accountsModule.presentationController.showDashboard();
      accountsModule.presentationController.oldDashboard();
         break;
    case configManager.constants.MENUDASHBOARDOVERVIEW:
        scope.view.flxHamburger.isVisible = false;
    //  let custominfoCD = applicationManager.getNavigationManager().getCustomInfo("frmCustomerDashboard");
        if(!kony.sdk.isNullOrUndefined(custominfoCD)  && custominfoCD.isWealthUser === "true"){
        custominfoCD.reDesignFlow = "false";
        custominfoCD.isBackClicked = "false";
        applicationManager.getNavigationManager().setCustomInfo("frmCustomerDashboard", custominfoCD);
        }
        var authMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" : "AuthenticationMA", "moduleName" : "AuthUIModule"});
        authMod.presentationController.navigationAfterLogin();
        break;
    case configManager.constants.MENUACCOUNTSWEEP:
        scope.view.flxHamburger.isVisible = false;
        navManager.setEntryPoint("AccountSweepsFlow", "Create");
        let sweepsModule = applicationManager.getModulesPresentationController({
        "moduleName": "AccountSweepsUIModule",
        "appName": "AccountSweepsMA"
        });
        sweepsModule.getBankDate();
        sweepsModule.getSweeps();
        break;
    case configManager.constants.MENUQRPAYMENT:
       applicationManager.getPresentationUtility().showLoadingScreen();
	   var navMan=applicationManager.getNavigationManager();
        var userContext = applicationManager.getUserPreferencesManager().getUserObj();
		 var qrPresentationController = applicationManager.getModulesPresentationController({
      "moduleName": "QRPaymentsUIModule",
      "appName": "TransfersMA"
    });
	var userAttributes=kony.sdk.getCurrentInstance().tokens[applicationManager.getConfigurationManager().constants.IDENTITYSERVICENAME].provider_token.params.user_attributes;
        this.userContext = userContext;
		if (userAttributes.hasOwnProperty("isQRPaymentActivated") && userAttributes.isQRPaymentActivated === "true") {
          //navMan.navigateTo({ "appName": "TransfersMA", "friendlyName": "frmQRPaymentsLanding" });
		  qrPresentationController.getTransactionHistory();
		  			navMan.navigateTo({ "appName": "TransfersMA", "friendlyName": "frmQRScan" });
        } else {
		   navMan.setCustomInfo("QRNavigationData","frmQRActivation");
		    qrPresentationController.fromAccountsPresentationSuccessCallBack();
			//navMan.navigateTo({ "appName": "TransfersMA", "friendlyName": "frmQRScan" });
          //navMan.navigateTo({ "appName": "TransfersMA", "friendlyName": "frmQRActivation" });
        }
        break;
    case configManager.constants.MENULOCATE :
        scope.view.flxHamburger.isVisible = false;
        var locateMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"AboutUsMA","moduleName":"LocateUsUIModule"});
        locateMod.presentationController.presentLocateUsView(true,scope);
        break;
    case configManager.constants.MENUWEALTHWATCHLIST :
        scope.view.flxHamburger.isVisible = false;
        var customerId = applicationManager.getUserPreferencesManager().primaryCustomerId.id;
        var params = {"customerId": customerId};
        var wealthModule = applicationManager.getModulesPresentationController({"moduleName" : "WealthPortfolioUIModule", "appName" : "PortfolioManagementMA"});
        // wealthModule.newAccount = {};
        // wealthModule.newAccountsArr = [];
        // wealthModule.balanceArr = [];
        // wealthModule.amount = "";
        // wealthModule.currency = "";
        wealthModule.getWatchlist();
        break;
    case configManager.constants.MENUCONTACT :
        scope.view.flxHamburger.isVisible = false;
        applicationManager.getPresentationUtility().showLoadingScreen();
         var informationPC = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                        "appName": "AboutUsMA",
                        "moduleName": "InformationUIModule"
                    });
        let clientProperties = CommonUtilities.CLIENT_PROPERTIES;
        informationPC.presentationController.onClickContactUs(clientProperties);
        break;
        case configManager.constants.MENUSUPPORT :
        scope.view.flxHamburger.isVisible = false;
        applicationManager.getPresentationUtility().showLoadingScreen();
         var informationPC = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                        "appName": "AboutUsMA",
                        "moduleName": "InformationUIModule"
                    });
         let clientProperties2 = CommonUtilities.CLIENT_PROPERTIES;
        informationPC.presentationController.onClickContactUs(clientProperties2);
        break;
    case configManager.constants.MENUUNIFIEDTRANSFERSFLOW:
        scope.view.flxHamburger.isVisible = false;
        var navMan = applicationManager.getNavigationManager();
        var configManager = applicationManager.getConfigurationManager();
            navMan.navigateTo({"appName" : "TransfersMA", "friendlyName" :"UnifiedTransferFlowUIModule/frmSelectTransferTypeNew"});
//             navMan.navigateTo("UnifiedTransferFlow/frmSelectTransferType");
//           }
//           else
//             {
//               navMan.navigateTo("UnifiedTransferFlow/frmP2PTransferType");
//             }
        break;
    case configManager.constants.MENUTRANSFERS:
        //#ifdef tabrcandroid
        //#define kony_tablet_transferflow
        //#endif
        //#ifdef ipad
        //#define kony_tablet_transferflow
        //#endif
        //#ifdef kony_tablet_transferflow
        var navMan = applicationManager.getNavigationManager();
        navMan.setCustomInfo("removeAttachments",true);
        scope.view.flxHamburger.isVisible = false;
        //var transMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("TransactionModule");
        //transMod.presentationController.getTransactions();
        //#else
        var configManager = applicationManager.getConfigurationManager();
        //var transMod = applicationManager.getModulesPresentationController("TransactionModule");
        if (configManager.getDeploymentGeography() === 'EUROPE') {
        applicationManager.getPresentationUtility().showLoadingScreen();
        var navMan = applicationManager.getNavigationManager();
        navMan.setEntryPoint("europeTransferFlow","frmDashboardAggregated");
        var transferModPresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
        transferModPresentationController.setEuropeFlowType("INTERNAL");
        transferModPresentationController.getFromAccounts();
        transferModPresentationController.clearEuropeFlowAtributes();
        }  
        //else {  
        //transMod.getTransactions();
        //}  
        //#endif
        break;
    case configManager.constants.MENUSENDMONEY:
        applicationManager.getPresentationUtility().showLoadingScreen();
        var navMan = applicationManager.getNavigationManager();
        navMan.setCustomInfo("removeAttachments",true);
        navMan.setEntryPoint("europeTransferFlow","frmDashboardAggregated");
        var transferModPresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
        transferModPresentationController.setEuropeFlowType("EXTERNAL");
        transferModPresentationController.getFromAndToAccounts();
        transferModPresentationController.clearEuropeFlowAtributes();
        break;
    case configManager.constants.MENUMONEYMOVEMENTTRANSFERS:
        applicationManager.getPresentationUtility().showLoadingScreen();
        var navMan = applicationManager.getNavigationManager();
        navMan.setCustomInfo("removeAttachments",true);
        //navMan.setEntryPoint("ManageMMFlow","frmMMTransferFromAccount");
        navMan.setEntryPoint("centralmoneymovement","frmDashboardAggregated");
        scope.view.flxHamburger.isVisible = false;
        var moneyMovementModule = applicationManager.getModulesPresentationController({"moduleName" : "MoneyMovementUIModule", "appName" : "TransfersMA"});
        moneyMovementModule.getFromAndToAccounts();
        moneyMovementModule.clearMMFlowAtributes();
        //moneyMovementModule.clearFromAccountObject();
        break;
    case configManager.constants.MENUTRANSFERSACTIVITY:
        scope.view.flxHamburger.isVisible = false;
        var navMan = applicationManager.getNavigationManager();
        navMan.setCustomInfo("removeAttachments",true);
        //var transMod = applicationManager.getModulesPresentationController("TransactionModule");
        var moneyMovementModule = applicationManager.getModulesPresentationController({"moduleName" : "MoneyMovementUIModule", "appName" : "TransfersMA"});
        moneyMovementModule.clearMMFlowAtributes();
        navMan.setEntryPoint("centralmoneymovement", "frmTransferActivitiesTransfers");
        navMan.navigateTo({"appName" : "TransfersMA", "friendlyName" : "MoneyMovementUIModule/frmTransferActivitiesTransfers"});
        break;
    case configManager.constants.MENUMANAGETRANSACTIONS:
        scope.view.flxHamburger.isVisible = false;
        var navMan = applicationManager.getNavigationManager();
        navMan.setCustomInfo("removeAttachments",true);
        applicationManager.getPresentationUtility().showLoadingScreen();
        var transferModPresentationController = applicationManager.getModulesPresentationController({"moduleName" : "ManageActivitiesUIModule", "appName" : "TransfersMA"});
        transferModPresentationController.clearEuropeFlowAtributes();
        navMan.setEntryPoint("europeTransferFlow", "frmTransferActivitiesTransfersEurope");
        navMan.navigateTo({"appName" : "TransfersMA", "friendlyName" : "ManageActivitiesUIModule/frmTransferActivitiesTransfersEurope"});
        break;
    case configManager.constants.MENUMANAGERECIPIENTS:
   applicationManager.getPresentationUtility().showLoadingScreen();
        var navMan = applicationManager.getNavigationManager();
        navMan.setCustomInfo("removeAttachments",true);
        var moneyMovementModule = applicationManager.getModulesPresentationController({"moduleName" : "MoneyMovementUIModule", "appName" : "TransfersMA"});
        navMan.setEntryPoint("centralmoneymovement","frmManageRecipientType");
        moneyMovementModule.clearMMFlowAtributes();
        moneyMovementModule.enterManageRecipientsFlow();
        break;
    case configManager.constants.MENUMANAGEBENEFICIARIES:
        var navMan = applicationManager.getNavigationManager();
        navMan.setCustomInfo("removeAttachments",true);
        var transferModPresentationController = applicationManager.getModulesPresentationController({"moduleName" : "ManageActivitiesUIModule", "appName" : "TransfersMA"});
        navMan.setEntryPoint("europeTransferFlow","frmEuropeManageBeneficiaries");
        transferModPresentationController.clearEuropeFlowAtributes();
        transferModPresentationController.enterManageRecipientsFlow();
        break;
    case configManager.constants.MENUDISPUTE:
        applicationManager.getPresentationUtility().showLoadingScreen();
        var navManager =applicationManager.getNavigationManager();
        navManager.setEntryPoint("ViewRequest","");
        var disputeModule = applicationManager.getModulesPresentationController({"moduleName" : "DisputeTransactionUIModule", "appName" : "ArrangementsMA"});
        disputeModule.getDisputeTransactionDetails(); 
        break;
    case configManager.constants.MENUMESSAGES:
        scope.view.flxHamburger.isVisible = false;
        var messagesModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "MessagesUIModule", "appName" : "SecureMessageMA"});
        messagesModule.presentationController.getInboxRequests();
        break;
    case configManager.constants.MENUACCOUNTSTATEMENTS :
        scope.view.flxHamburger.isVisible = false;
        var accountModule = applicationManager.getModulesPresentationController({
                        "moduleName": "AccountUIModule",
                        "appName": "ArrangementsMA"
                    });
        var custominfoInt = navManager.getCustomInfo("frmDashboard");
        var chequeAccounts = [];
        if((custominfoCD && custominfoCD.reDesignFlow === "true" && custominfoInt && custominfoInt.isGetListCalled===true && custominfoCD.isAccActionsCalled === true) || 
            (custominfoCD && (custominfoCD.reDesignFlow !== "true"))){
        var accountManager = applicationManager.getAccountManager();
        if(accountManager.internalAccounts.length > 0){
            var accountNumber =  accountManager.internalAccounts[0].Account_id;
            var accountdata    = accountManager.internalAccounts[0];
            accountModule.getAccountStataments(accountNumber, accountdata);
        }
        }else{
        var presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "AuthUIModule", "appName": "AuthenticationMA" });
        presenter.presentationController.showDataLoaderPopup();
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        return;
        }
        break;
    case configManager.constants.MENUNOTIFICATIONS:
        var alertsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "AlertsUIModule", "appName" : "SecureMessageMA"});
        alertsModule.presentationController.setAlertsBadgeStatus(false);
        if(alertsbadgeShown)
        alertsModule.presentationController.getUnreadNotificationsCount();
        alertsModule.presentationController.getNotifications();
        break;
    case configManager.constants.MENUBILLPAY:
        scope.view.flxHamburger.isVisible = false;
        applicationManager.getPresentationUtility().showLoadingScreen();
        applicationManager.setBillPayFlow="BillPayFlow";
        var data = {
                "code": "ALL"
            };
            var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "appName": "BillPayMA",
                "moduleName": "BillPaymentUIModule"
            });
            billPayMod.presentationController.getCategorie(data);
        // var BillPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "BillPaymentUIModule", "appName" : "BillPayMA"});
        //BillPayMod.presentationController.fetchBills();
        //BillPayMod.presentationController.getHolidays();
        break;
    case configManager.constants.MENUCARDLESS:
        scope.view.flxHamburger.isVisible = false;
        var cardLessModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName": "CardLessUIModule",
"appName": "ArrangementsMA"});        
        var navMan=applicationManager.getNavigationManager();
        navMan.setEntryPoint("cardlessEntry","frmCardLessHome");
        //navMan.setEntryPoint("cardlessEntry","frmCardLessHomeQR");
        cardLessModule.presentationController.getActiveDebitCard();
        //cardLessModule.presentationController.getCardlessPendingAndPostedTransactionsQRScanner();
        break;
    case configManager.constants.MENUCHECKDEPOSIT:
        scope.view.flxHamburger.isVisible = false;
        var checkDepositModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName": "CheckDepositUIModule" , "appName": "ArrangementsMA"});
        checkDepositModule.presentationController.fetchDeposits();
        break;
    case configManager.constants.Deposits:
        scope.view.flxHamburger.isVisible = false;
        var checkDepositModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CheckDepositModule");
        checkDepositModule.presentationController.fetchDeposits();
        break;
    case configManager.constants.MENUSERVICEREQUESTS:
        scope.view.flxHamburger.isVisible = false;
        new kony.mvc.Navigation({"appName" : "ArrangementsMA", "friendlyName" : "ServiceRequestsUIModule/frmViewRequests"}).navigate();
        break;
    case configManager.constants.MENUSETTINGS:
        scope.view.flxHamburger.isVisible = false;
        var settingsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsUIModule", "appName" : "ManageProfileMA"} );
        settingsModule.presentationController.showSettings();
        break;
    case configManager.constants.MENUFEEDBACK:
        var currentForm = kony.application.getCurrentForm().id;
        scope.view.flxHamburger.isVisible = false;
        var navManager = applicationManager.getNavigationManager();
        navManager.setEntryPoint("Feedback", currentForm);
        var feedbackModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"AboutUsMA","moduleName":"FeedbackUIModule"});
        feedbackModule.presentationController.showFeedBack();
        break;
    case configManager.constants.MENUCHATBOT:
        scope.view.flxHamburger.isVisible = false;
        var chatBotMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ChatBotModule");
        chatBotMode.presentationController.handleFirstTimeOpen();
        break;
    case configManager.constants.MENUMANAGEOTHERBANKACCOUNTS:
        scope.view.flxHamburger.isVisible = false;
        var navManager = applicationManager.getNavigationManager();
        navManager.navigateTo({"appName" : "AccAggregationMA", "friendlyName" : "ExternalAccountsUIModule/frmExternalAccountsList"});
        break;
    case configManager.constants.MENUCARDMANAGEMENT:
        scope.view.flxHamburger.isVisible = false;
        var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                        "moduleName": "ManageCardsUIModule",
                        "appName": "CardsMA"
                    });
        manageCardsModule.presentationController.isFirstTime = true;
        navManager.setCustomInfo("filterFlag",null);
        manageCardsModule.presentationController.showCardsHome();
        break;
    case configManager.constants.MENUOPENACOUNT:
        var NAOModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("NewAccountOpeningModule");
        NAOModule.presentationController.fetchAllProductsAndTnc();
        break;
    case configManager.constants.MENUOPENNEWACCOUNT:{
        navManager.navigateTo({"appName" : "AuthenticationMA", "friendlyName" :"EmbeddedOriginationUIModule/frmOriginationLanding"});
    //   kony.application.openURL(CommonUtilities.CLIENT_PROPERTIES.DBP_ONBOARDING_URL);
        // var config = applicationManager.getConfigurationManager();
        // var ssoConfig = config.getSSOConfig();
        // if(ssoConfig!== undefined && ssoConfig.toLowerCase() === "true"){
        //     var configurationManager = applicationManager.getConfigurationManager();
        //     var reDirectionURL = configurationManager.getOnBoardingAppDirectionURL();
        //     if (reDirectionURL) {
        //     //    location.assign(reDirectionURL);
        //         kony.application.openURL("https://infinityretaildev2.temenos-cloud.net:443/apps/Origination");
        //     } else {
        //         // Parsing the service url present in appConfig
        //         var protocol = appConfig.isturlbase.split("//")[0];
        //         var origin = appConfig.isturlbase.split("//")[1].split("/")[0];
        //         // Getting the current app name from appDetails
        //         var appName = appDetails.appID;
        //         // Redirecting to
        //         // location.assign(protocol + "//" + origin + "/apps/" + configurationManager.getOnboardingAppID() + "#_frmLanding");
        //         kony.application.openURL(protocol + "//" + origin + "/apps/" + configurationManager.getOnboardingAppID() + "#_frmLanding");
        //     }
        // }
    }
    break;
    case configManager.constants.MENUPFMMYMONEY:
        var pfmModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                            "moduleName": "PersonalFinanceManagementUIModule",
                            "appName": "FinanceManagementMA"
                        });
        pfmModule.presentationController.fetchPFMDetails(true);
                    
    
        break;
        //@TODO create constants
    case configManager.constants.MENUACH :
        //scope.view.flxHamburger.isVisible = false;
        var achModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "ACHUIModule", "appName" : "ACHMA"});
        achModule.presentationController.commonFunctionForNavigation("ACHUIModule/frmACHList");
        break;
    case configManager.constants.MENUAPPROVALREQUEST :
        //scope.view.flxHamburger.isVisible = false;
        var approvalRequestModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "ApprovalsReqUIModule", "appName" : "ApprovalRequestMA"});
        approvalRequestModule.presentationController.commonFunctionForNavigation("ApprovalsReqUIModule/frmApprovalsAndRequestsTitle");
        break;
    case configManager.constants.MENUUSERMANAGEMENT:
        scope.view.flxHamburger.isVisible = false;
        var userManagementModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "BusinessBankingUIModule", "appName" : "UserManagementMA"});
        userManagementModule.presentationController.navigatetoallusers();

        break;
    case configManager.constants.MENUFOREIGNEXCHANGE:
        scope.view.flxHamburger.isVisible = false;
        var foreignExhangeModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ForeignExchange");
        foreignExhangeModule.presentationController.navigateToforexDashboard();
        break;
    case configManager.constants.MENUSECURITYNOTIFICATIONS:
        scope.view.flxHamburger.isVisible = false;
        var navManager = applicationManager.getNavigationManager();
        let friendlyName;
        if(CommonUtilities.getSCAType() === 1) {
        friendlyName = "ApprovalsReqUIModule/frmSecurityNotification"
        } else if (CommonUtilities.getSCAType() === 2) {
        friendlyName = "frmSecurityNotificationUniken"
        } else {
        friendlyName = ""
        }
        navManager.navigateTo({"appName" :"ApprovalRequestMA" , "friendlyName" : friendlyName});
        break;
    case configManager.constants.MENUPASSCODE:
        scope.view.flxHamburger.isVisible = false;
        var navManager = applicationManager.getNavigationManager();
        navManager.navigateTo({"appName": "SelfServiceEnrolmentMA","friendlyName": "EnrollUnikenUIModule/frmPasscodeUniken"});
        break;
    case configManager.constants.MENUBIOMETRICAPPROVAL:
        scope.view.flxHamburger.isVisible = false;
        var navManager = applicationManager.getNavigationManager();
        navManager.navigateTo({"appName" :"SelfServiceEnrolmentMA" , "friendlyName" : "EnrollUnikenUIModule/frmBioToggleUniken"});
        break;
    case configManager.constants.MENUFIXEDDEPOST:
    var navManager = applicationManager.getNavigationManager();
    var work =1;
    navManager.setCustomInfo("work", work);
        navManager.navigateTo({"appName": "TransfersMA","friendlyName": "MoneyMovementUIModule/frmMMRFixedDeposit",work});
        break;
    case configManager.constants.MENUCROSSBORDERCONSENT:
    applicationManager.getPresentationUtility().showLoadingScreen();
    var configManager = applicationManager.getConfigurationManager();
    var userName = kony.sdk.getCurrentInstance().tokens[configManager.constants.IDENTITYSERVICENAME].provider_token.params.user_attributes.UserName;
    var ManageActivitiesPresenter = applicationManager.getModulesPresentationController({
        "appName": "TransfersMA",
        "moduleName": "ManageActivitiesUIModule"
    });
    //ManageActivitiesPresenter.getAccListDetails(userName);
    ManageActivitiesPresenter.natigateToCrossBorder();
    break;
    case configManager.constants.MENUFIXEDDEPOSIT:
        var ManageActivitiesPresenter = applicationManager.getModulesPresentationController({
        "appName": "TransfersMA",
        "moduleName": "ManageActivitiesUIModule"
        });
        ManageActivitiesPresenter.navigateToFixedDeposit();
        break;
    default:
        if (configManager.isEngageEnabled()) {
        var engageModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("EngageModule");
        var engageItemSelected = engageModule.presentationController.menuSelection(scope.view, selValue);
        if (engageItemSelected) {
            break;
        }
        }
        scope.view.flxHamburger.isVisible = false;
        var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountModule");
        accountMod.presentationController.showDashboard();
    }
},
setHamburgerMenuItemsForMicroApp :function(menuData) {
    var data = [];
      var configManager = applicationManager.getConfigurationManager();
    let custominfoCD = applicationManager.getNavigationManager().getCustomInfo("frmCustomerDashboard");
	if((!applicationManager.getConfigurationManager().checkUserFeature("VIEW_ONLY_ROLE"))&& !kony.sdk.isNullOrUndefined(applicationManager.getConfigurationManager().getUserFeatures()) && !kony.sdk.isNullOrUndefined(applicationManager.getConfigurationManager().getUserPermissions())){
    for (i = 0; i < menuData.length; i++) {
      switch (menuData[i].text) {
        case configManager.constants.MENUTRADEFINANCE:
          if (configManager.isMicroAppPresent(configManager.microappConstants.TRADEFINANCE))
            menuData[i].visibility = true;
          else
            menuData[i].visibility = false;
          break;
		  case configManager.constants.MENUFIXEDDEPOSIT:
            menuData[i].visibility = true;
          break;
		  case configManager.constants.MENUCROSSBORDERCONSENT:
            menuData[i].visibility = true;
          break;
        case configManager.constants.MENUCONVERSATIONALBANKING:
          if (configManager.isMicroAppPresent(configManager.microappConstants.CBP))
            menuData[i].visibility = true;
          else
            menuData[i].visibility = false;
          break;
        case configManager.constants.MENUCHEQUEMANAGEMENT:
          if (configManager.isMicroAppPresent(configManager.microappConstants.ARRANGEMENTS))
            menuData[i].visibility = true;
          else
            menuData[i].visibility = false;
          break;
		case configManager.constants.MENUDASHBOARDOVERVIEW:
           if(configManager.isMicroAppPresent(configManager.microappConstants.HOMEPAGE) && 
              (!kony.sdk.isNullOrUndefined(custominfoCD) && (custominfoCD.reDesignFlow === "true"))){
              menuData[i].visibility = true;
           }else{
                
              menuData[i].visibility = false;
                
           }
           break;
        case configManager.constants.MENUACCOUNTS:
           if(configManager.isMicroAppPresent(configManager.microappConstants.HOMEPAGE) && 
              (!kony.sdk.isNullOrUndefined(custominfoCD) && (custominfoCD.reDesignFlow !== "true"))){
                
                    menuData[i].visibility = true;
                
           }else{
              menuData[i].visibility = false;
           }
          break;
        case configManager.constants.MENUACCOUNTSWEEP:
                if (configManager.isMicroAppPresent(configManager.microappConstants.ACCOUNTSWEEP))
                    menuData[i].visibility = true;
                else
                    menuData[i].visibility = false;
                  break;    
            case configManager.constants.MENULOCATE:
                if (configManager.isMicroAppPresent(configManager.microappConstants.ABOUTUS))
                    menuData[i].visibility = true;
                else
                    menuData[i].visibility = false;
                break;
            case configManager.constants.MENUWEALTHWATCHLIST:
                if (configManager.isMicroAppPresent(configManager.microappConstants.HOMEPAGE))
                    menuData[i].visibility = true;
                else
                    menuData[i].visibility = false;
                break;

            case configManager.constants.MENUCONTACT:
                if (configManager.isMicroAppPresent(configManager.microappConstants.ABOUTUS))
                    menuData[i].visibility = true;
                else
                    menuData[i].visibility = false;
                break;
                case configManager.constants.MENUSUPPORT:
                if (configManager.isMicroAppPresent(configManager.microappConstants.ABOUTUS))
                    menuData[i].visibility = true;
                else
                    menuData[i].visibility = false;
                break;

            case configManager.constants.MENUUNIFIEDTRANSFERSFLOW:
                if (configManager.isMicroAppPresent(configManager.microappConstants.UNIFIEDTRANSFER))
                    menuData[i].visibility = true;
                else
                    menuData[i].visibility = false;
                break;

            case configManager.constants.MENUTRANSFERS:
                if (configManager.isMicroAppPresent(configManager.microappConstants.REGIONALTRANSFER))
                    menuData[i].visibility = true;
                else
                    menuData[i].visibility = false;
                break;
            case configManager.constants.MENUQRPAYMENT:
                 if (configManager.isMicroAppPresent(configManager.microappConstants.REGIONALTRANSFER))
                     menuData[i].visibility = true;
                else
                    menuData[i].visibility = false;
                break;
            case configManager.constants.MENUSENDMONEY:
                if (configManager.isMicroAppPresent(configManager.microappConstants.REGIONALTRANSFER))
                    menuData[i].visibility = true;
                else
                    menuData[i].visibility = false;
                break;

            case configManager.constants.MENUMONEYMOVEMENTTRANSFERS:
                if (configManager.isMicroAppPresent(configManager.microappConstants.REGIONALTRANSFER))
                    menuData[i].visibility = true;
                else
                    menuData[i].visibility = false;
                break;

            case configManager.constants.MENUTRANSFERSACTIVITY:
                if (configManager.isMicroAppPresent(configManager.microappConstants.REGIONALTRANSFER))
                    menuData[i].visibility = true;
                else
                    menuData[i].visibility = false;
                break;

            case configManager.constants.MENUMANAGETRANSACTIONS:
                if (configManager.isMicroAppPresent(configManager.microappConstants.UNIFIEDTRANSFER))
                    menuData[i].visibility = true;
                else
                    menuData[i].visibility = false;
                break;

            case configManager.constants.MENUMANAGERECIPIENTS:
                if (configManager.isMicroAppPresent(configManager.microappConstants.REGIONALTRANSFER))
                    menuData[i].visibility = true;
                else
                    menuData[i].visibility = false;
                break;

            case configManager.constants.MENUMANAGEBENEFICIARIES:
                if (configManager.isMicroAppPresent(configManager.microappConstants.UNIFIEDTRANSFER))
                    menuData[i].visibility = true;
                else
                    menuData[i].visibility = false;
                break;

            case configManager.constants.MENUDISPUTE:
                if (configManager.isMicroAppPresent(configManager.microappConstants.ARRANGEMENTS))
                    menuData[i].visibility = true;
                else
                    menuData[i].visibility = false;
                break;

            case configManager.constants.MENUMESSAGES:
                if (configManager.isMicroAppPresent(configManager.microappConstants.SECUREMESSAGE))
                    menuData[i].visibility = true;
                else
                    menuData[i].visibility = false;
                break;

            case configManager.constants.MENUACCOUNTSTATEMENTS:
                if (configManager.isMicroAppPresent(configManager.microappConstants.ARRANGEMENTS))
                    menuData[i].visibility = true;
                else
                    menuData[i].visibility = false;
                break;

            case configManager.constants.MENUNOTIFICATIONS:
                if (configManager.isMicroAppPresent(configManager.microappConstants.SECUREMESSAGE))
                    menuData[i].visibility = true;
                else
                    menuData[i].visibility = false;
                break;

            case configManager.constants.MENUBILLPAY:
                if (configManager.isMicroAppPresent(configManager.microappConstants.BILLPAY))
                    menuData[i].visibility = true;
                else
                    menuData[i].visibility = false;
                break;

            case configManager.constants.MENUCARDLESS:
				if (configManager.isMicroAppPresent(configManager.microappConstants.ARRANGEMENTS))
                    menuData[i].visibility = true;
                else
                    menuData[i].visibility = false;
                break;
            case configManager.constants.MENUCHECKDEPOSIT:
                if (configManager.isMicroAppPresent(configManager.microappConstants.ARRANGEMENTS))
                    menuData[i].visibility = true;
                else
                    menuData[i].visibility = false;
                break;
            case configManager.constants.Deposits:
                    menuData[i].visibility = false;
                break;

            case configManager.constants.MENUSERVICEREQUESTS:
                var is_CARDMANAGEMENT_BACKEND_SRMS = CommonUtilities.CLIENT_PROPERTIES.CARDS_BACKEND === "MOCK" ? false : true        
                if (configManager.isMicroAppPresent(configManager.microappConstants.ARRANGEMENTS)  && is_CARDMANAGEMENT_BACKEND_SRMS )
                    menuData[i].visibility = true;
                else
                    menuData[i].visibility = false;
                break;

            case configManager.constants.MENUSETTINGS:
                if (configManager.isMicroAppPresent(configManager.microappConstants.MANAGEPROFILE))
                    menuData[i].visibility = true;
                else
                    menuData[i].visibility = false;
                break;

            case configManager.constants.MENUFEEDBACK:
                if (configManager.isMicroAppPresent(configManager.microappConstants.ABOUTUS))
                    menuData[i].visibility = true;
                else
                    menuData[i].visibility = false;
                break;

            case configManager.constants.MENUCHATBOT:
                    menuData[i].visibility = false;
                break;

            case configManager.constants.MENUMANAGEOTHERBANKACCOUNTS:
                if (configManager.isMicroAppPresent(configManager.microappConstants.ACCAGGREGATION))
                    menuData[i].visibility = true;
                else
                    menuData[i].visibility = false;
                break;

            case configManager.constants.MENUCARDMANAGEMENT:
                if (configManager.isMicroAppPresent(configManager.microappConstants.CARDS))
                    menuData[i].visibility = true;
                else
                    menuData[i].visibility = false;
                break;

            case configManager.constants.MENUOPENACOUNT:
                    menuData[i].visibility = false;
                break;

            case configManager.constants.MENUPFMMYMONEY:          
                if (configManager.isMicroAppPresent(configManager.microappConstants.FINANCEMANAGEMENT))
                  menuData[i].visibility = true;
                else
                  menuData[i].visibility = false;
                break;

            case configManager.constants.MENUACH:
                if (configManager.isMicroAppPresent(configManager.microappConstants.ACH))
                  menuData[i].visibility = true;
                else
                  menuData[i].visibility = false;
                  break;

            case configManager.constants.MENUAPPROVALREQUEST:
                if (configManager.isMicroAppPresent(configManager.microappConstants.APPROVALREQUEST))
                    menuData[i].visibility = true;
                else
                    menuData[i].visibility = false;
                break;

            case configManager.constants.MENUUSERMANAGEMENT:
                if (configManager.isMicroAppPresent(configManager.microappConstants.USERMANAGEMENT))
                    menuData[i].visibility = true;
                else
                    menuData[i].visibility = false;
                break;


            case configManager.constants.MENUFOREIGNEXCHANGE:
                if (configManager.isMicroAppPresent(configManager.microappConstants.FOREIGNEXCHANGE))
                    menuData[i].visibility = true;
                else
                    menuData[i].visibility = false;
                break;
           case configManager.constants.MENUSECURITYNOTIFICATIONS:
                if (configManager.isMicroAppPresent(configManager.microappConstants.APPROVALREQUEST))
                    menuData[i].visibility = true;
                else
                    menuData[i].visibility = false;
                break;
           case configManager.constants.MENUPASSCODE:
                if (configManager.isMicroAppPresent(configManager.microappConstants.APPROVALREQUEST))
                    menuData[i].visibility = true;
                else
                    menuData[i].visibility = false;
                break;
            case configManager.constants.MENUBIOMETRICAPPROVAL:
                if (configManager.isMicroAppPresent(configManager.microappConstants.SELFSERVICEENROLMENT))
                    menuData[i].visibility = true;
                else
                    menuData[i].visibility = false;
                break;
          
            case configManager.constants.MENUOPENNEWACCOUNT:
                  menuData[i].visibility = true;



            default:
			kony.print("default");
			break;
        }

        if (menuData[i].visibility) {
            data.push(menuData[i]);
        }
    }
	}else{
		data=menuData;
	/*	var matchTexts = [
		kony.i18n.getLocalizedString("kony.tab.common.home"),
		kony.i18n.getLocalizedString("kony.mb.disputedTransactions.DisputedTransactions"),
		 kony.i18n.getLocalizedString("i18n.AlertsAndMessages.AlertsAndMessages"),
		 kony.i18n.getLocalizedString("kony.mb.Hamburger.Notifications"),
  kony.i18n.getLocalizedString("kony.mb.Hamburger.Settings"),
  kony.i18n.getLocalizedString("kony.mb.Location.Header"),
    kony.i18n.getLocalizedString("kony.mb.feedback.feedback"),
  kony.i18n.getLocalizedString("kony.mb.Support.Header")
];*/
var matchTexts = [
configManager.constants.MENUACCOUNT,
configManager.constants.MENUDISPUTE,
configManager.constants.MENUMESSAGES,
configManager.constants.MENUNOTIFICATIONS,
configManager.constants.MENUSETTINGS,
configManager.constants.MENULOCATE,
configManager.constants.MENUFEEDBACK,
configManager.constants.MENUCONTACT

];

 data = data.filter(datas => matchTexts.includes(datas.text));
	}
      return data;
    },
};
});