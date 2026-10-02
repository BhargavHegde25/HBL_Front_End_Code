define(function() {

	return {
        accountType: "ALL",
        accountEntitlements: [],
        entitlementClosure: false, //false - to check if any one of the permission from the list is present, true- to check all the permissions
        defaultIconSkin: "sknLblFontIconffffff13px",
        defaultIconText: "",
        defaultIconSegmentSkin: "sknLblFontIconffffff16px",
        totalLinks: 6,
		constructor: function(baseConfig, layoutConfig, pspConfig) {

		},
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {

		},
        setContext:function(context){
            this.context = context;
            this.viewMore = this.showMore;
            this.accountEntitlements = context["entitlements"];
            this.parentScope = context["parentScope"];
            this.accountType = context["accountType"] ? context["accountType"] : this.accountType;
        },
        preShow: function(){
           this.setLinks();
           this.view.flxMain.skin ="sknFlxWhiteRoundedBorder";
           this.view.flxHeaderSeparator.setVisibility(false);
           this.view.flxTopContainer.bottom ="20dp";
           this.view.links1.cursorType = "pointer";
            this.view.links1.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                },
            }
            this.view.links2.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                },
            }
            this.view.links3.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                },
            }
           this.view.links2.cursorType = "pointer";
           this.view.links3.cursorType = "pointer";
           this.view.imgIcon.src = "quick_link.png";
           this.viewMore = this.showMore;

        },
        setLinks: function(){
            this.resetUI();
            var quickLinksList = JSON.parse(JSON.stringify(this.context.links));
            var accountSpecificEntitledLinks = this.getFilteredLinks(quickLinksList);
            this.bindLinkDataToWidgets(accountSpecificEntitledLinks);
        },
        getFilteredLinks: function(quickLinkList){
            var entitledLinks = [];
            // this.checkEntitlement(this.context["entitlement"]);
            for(i=0;i<quickLinkList.length;i++){
                var tempLink =  {
                    "fontIconText" : quickLinkList[i].fontIconText ?  quickLinkList[i].fontIconText : this.defaultIconText,
                    "fontIconSkin" : !kony.sdk.isNullOrUndefined(quickLinkList[i].fontIconSkin) && quickLinkList[i].fontIconSkin != ""  ?  quickLinkList[i].fontIconSkin : this.defaultIconSkin,
                    "linkText" : quickLinkList[i].linkText ?  quickLinkList[i].linkText : "",
                    "linkAction" : quickLinkList[i].linkAction ?  quickLinkList[i].linkAction :  function(){},
                    "src" : quickLinkList[i].src ?  quickLinkList[i].src : "",
                    "visible" : quickLinkList[i].visible ? quickLinkList[i].visible :  false
                }
                if(!kony.sdk.isNullOrUndefined(quickLinkList[i]["accountTypes"])){
                    if(quickLinkList[i]["accountTypes"].includes(this.accountType)){
                        if(this.checkEntitlement(quickLinkList[i]["entitlement"])  && quickLinkList[i].visible){
                            entitledLinks.push(tempLink);
                        }
                    }
                }                
            }
            return entitledLinks;
        },
        checkEntitlement: function(entitlement){
            var count = 0;
            if(!kony.sdk.isNullOrUndefined(entitlement)){
                if(entitlement.includes("default")){
                    return true;
                }
                if(this.entitlementClosure){
                    for(var i=0;i<entitlement.length;i++){
                        if(this.accountEntitlements.includes(entitlement[i])){
                            count++;
                        }
                    }
                    if(count!=0 && count == entitlement.length){
                        return true;
                    }
                }else{
                    for(var i=0;i<entitlement.length;i++){
                        if(this.accountEntitlements.includes(entitlement[i])){
                            return true;
                        }
                    }
                }
                return false;
            }
            return false;
        },
        bindLinkDataToWidgets: function(quickLinkList){
            if(quickLinkList.length ==0){
                this.showNoLinks();
            }
            else{           
                if(this.viewMore){
                    var visibleLinks = this.numberOfLinks;
                    if(quickLinkList.length > this.numberOfLinks){
                        visibleLinks = this.numberOfLinks-1;
                    }else {
                        this.viewMore = false;
                    }
                    for(var i =1;i<= visibleLinks && i<= quickLinkList.length;i++){
                        this.view["links"+i].setVisibility(true);
                        this.view["links"+i].onClick =  this.parentScope[quickLinkList[i-1].linkAction];
                        this.view["links"+i]["lblIcon"].skin = quickLinkList[i-1].fontIconSkin;
                        this.view["links"+i]["lblIcon"].text = quickLinkList[i-1].fontIconText;
                        this.view["links"+i]["lblLink"].text = quickLinkList[i-1].linkText;
                        this.view["links"+i]["imglink"].src = quickLinkList[i-1].src;
                        this.view["links"+i]["imglink"].top ="20px";
                        this.view["links"+i]["lblLink"].top ="20px";
                    }
                    if(this.viewMore){
                        this.view["links"+i].setVisibility(true);
                        this.view["links"+i].onClick =  this.showMoreActions;
                        this.view["links"+i]["lblIcon"].skin = this.defaultIconSkin;
                        this.view["links"+i]["lblIcon"].text = "\ue94e";
                        this.view["links"+i]["imglink"].src = "acc_more.png";
                        this.view["links"+i]["lblLink"].text = kony.i18n.getLocalizedString("kony.mb.common.more");
                        this.view["links"+i]["imglink"].top ="20px";
                        this.view["links"+i]["lblLink"].top ="20px";
                        this.setUpMoreLinksData(quickLinkList, i-1);
                    }
                }else{
                    for(var i =1;i<= this.numberOfLinks && i<= quickLinkList.length;i++){
                        this.view["links"+i].setVisibility(true);
                        this.view["links"+i].onClick =  this.parentScope[quickLinkList[i-1].linkAction];
                        this.view["links"+i]["lblIcon"].skin = quickLinkList[i-1].fontIconSkin;
                        this.view["links"+i]["lblIcon"].text = quickLinkList[i-1].fontIconText;
                        this.view["links"+i]["lblLink"].text = quickLinkList[i-1].linkText;
                        this.view["links"+i]["imglink"].src = quickLinkList[i - 1].src;
                        this.view["links"+i]["imglink"].top ="20px";
                        this.view["links"+i]["lblLink"].top ="20px";
                    }
                }
            }
        },
        setUpMoreLinksData : function(list, offset){
            var scope = this;
            var widgetdatamap = {
                "flxLinksItem": "flxLinksItem",
                "lblItemIcon": "lblItemIcon",
                "lblItemLink": "lblItemLink",
                "imgItem": "imgItem"
            }
            var data = [];
            for(var i = offset;i<list.length;i++){
                var temp = {
                    "flxLinksItem" : {
                        "onClick" : scope.parentScope[list[i].linkAction],
                        "onHover": function(eventobj) {
                                    this.checkHoverFlx(eventobj);
                                }.bind(this)
                    },
                    "lblItemIcon" : {
                        "skin" : this.defaultIconSegmentSkin,
                        "text" : list[i].fontIconText
                    },
                    "lblItemLink" : {
                        "text" : list[i].linkText
                    },
                    "imgItem" : {
                        "src" : list[i].src
                    }
                }
                data.push(temp);
            }
            this.view.segMoreLinks.widgetDataMap = widgetdatamap;
            this.view.segMoreLinks.setData(data);
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
                    currentlyHoveredFlex.skin = "sknSegAccountHoverSquareborder"; // Reset previous
                }

                widgetRef.skin = "sknSegAccountHoverSquareborder";
                currentlyHoveredFlex = widgetRef;

            } else if (eventObj.eventType === "leave") {
                leaveTimer = setTimeout(function() {
                    widgetRef.skin = "ICsknFlxffffff";
                    if (currentlyHoveredFlex === widgetRef) {
                        currentlyHoveredFlex = null;
                    }
                }, 150); // slight delay to avoid false leave
                }
            };
        },
        resetUI:function(){
            this.view.flxSegContainer.setVisibility(false);
            for(var i =1;i<= this.totalLinks;i++){
                this.view["links"+i].setVisibility(false);
            }
        },
        showMoreActions: function(){
            if(this.numberOfLinks === 6){
                this.view.flxSegContainer.top = "240dp"
            }else{
                this.view.flxSegContainer.top = "115dp"
            }
            if(this.view.flxSegContainer.isVisible){
                this.view.flxSegContainer.setVisibility(false);
            }else{
                this.view.flxSegContainer.setVisibility(true);
            }
        },
        showNoLinks:function(){
            if(this.parentScope.hideQuickLniks){
                this.parentScope.hideQuickLniks();
            }
        }
	};
});