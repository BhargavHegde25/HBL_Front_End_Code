define(function(){
    return{
         urlWeb: "",
        init: function() {
            var navManager = applicationManager.getNavigationManager();
            var currentForm = navManager.getCurrentForm();
            applicationManager.getPresentationFormUtility().initCommonActions(this, "YES", currentForm);
            this.view.preShow = this.preShow;
           
        },
onNavigate: function(uidata) {
            try {
                var navManager = applicationManager.getNavigationManager();
                if (uidata.formFieldsURL) {
                    var getResponse = applicationManager.getNavigationManager().getCustomInfo("Biller_Code");
                    if (!kony.sdk.isNullOrUndefined(getResponse)) {
                        var appendCode = getResponse.code;
                    }
                    var url = uidata.formFieldsURL;
                    url = url + appendCode;
                    var urlConf = {
                        URL: url,
                        requestMethod: constants.BROWSER_REQUEST_METHOD_GET
                    };
                    this.broswerSetUrl(urlConf);
                }
            } catch (err) {
                kony.print("onNavigate" + err);
            }
        }, 
         broswerSetUrl: function(urlConf) {
            var scope =this;
            try {
                //this.view.browserBillPay.requestURLConfig=urlConf;
                //this.view.browserBillPay.htmlString = "<iframe id='myiFrame'src=" +urlConf.URL+ "></iframe>";
                // this.view.browserBillPay.contentLoadsKonyWeb(true);
                /*var event = {"session_id":"himalayan_20250131113254","data":"eyJraWQiOiJMd3R0TWo2aVBaSWlYNEJ2R3g1UUtkNnJmQnExWkR5Q0hTa0NjcFVQY1kwXFxcXFxcPSIsImN0eSI6IkpXVCIsImVuYyI6IkEyNTZHQ00iLCJhbGciOiJSU0EtT0FFUC0yNTYifQ.kzYdILT3gpEw2SuthuKmNKMgH8RXc0K1fzixzvfPxxe5gj8saH2V8bWdLLWDhoETA7-xcsJopaP0hSeGHy77pvABhbMwU2j-3bDP0K9mKd8WpUZsL4-sgM8XKjzM5_IMebr_XjdC3rzvsFrMyo9ZfT3u-BOvP6dGmk1_CbFkPEw7m1skRT7eXF7-mbbp4lKpiOu8RLu18ttytbiR0SaKDynP0RiUy5ngv1I05EnqKBdoHHCBpHQ6CK1oxfnLUMt73XqV9eTdG6XjgoJfazph7TryGfrlMOB5nGi4gbxP9YpCxAOJz87VvcAWni7G-hsx1r0CMSSV1fJ5Ao9npxiUaQ.1fOlYVfEnh7HOaAr.lzeDGIjUyYWBiSN2a5Mm4uU7UtOLP95ilgqiVnLKPZQiVme-7mYxz_j1_5YN4HmrOld9NdgG-68AwPT16LXTM1jYIGZZ765gdjuSxF0lqKSHRY6Yucu5SEOQo-SCwU1ontyxeYv8sJxNgRmnCt4dv8H6dWjS2b1qqUU495DjUuqXegW3RbCxEGB_Wm1sx6rY-b9LPM0Tf-I--2cYP8FYdRcjHsxEeOhYbYKkbuEYEdEIZVTxC6AMtGSFp-TDwL7d0PKmjNwJK3_tFF33DoFkEl1P6UYIODqsYFw29yI0xZcoe5iv9ihny--ztmVIw7th1exT4wnKDhXt5GKHzV1XWLhh_LANekXD6UJbjltlE_vGKRO7r7P03FGzuz57KcwZM0YNw7bSUZkpc6eNRzHfNbnOKalAcGIg4xS95szmh3iVd5x8Yw7jg5stXaT39l4lbDCCIbNZGNyv0oy-QnL2_5UdzY6G9yTZifmc7tcpfsiUXVYFnQloCEeavdM8-I9xgMKiUBRO0L-nbHMJ9HXwBJfMoPrwAUe-bY0KxOPBWuVwGYf-7AkDY0gJYy9gRrQXY57pj-iElmGrWU9OJFEt0sIjEbh_JUkgNBnx4JsAzuydbSWVz1Nig2j2gT6jUsEsCD0gmWEkLhVPnADOUyTWuqHAbR40SL1XUxvucfcuWgBv-aoXkIUV2ywWdCtA20w3iSmwnUrvIfHB1dKbtaSsCrCU_HffceENUQ2t94usZ8i_dMWu5XKm8B52MSRxez0P68-Q7N4XLeAr-5HYYJ-_SX2dWN5UWxRYMqGunBX3ppIqkf-Oz_Kk_zKBZRxhV941qmnE1HkcdBKEgHoqbk7pBo6VLY9oWFFXTlRmaaPcf3zBBszTYZWE8w_QWJb7EccQO1jIREmqrFf42UFYVqQqvTfiH5yawBIn6b-omo1HDvqZi8F8r38uzCdxangGbr_14vysKHP_Jy-Acklq4UG_EU-RgCJgN3GzYWTK9erub5c90iWGl7zYCfFwa9bpTya1OcrT7GMO3pZTRdGG1BtXuReO9m6GzSAesVVreluv_n6UfS3MPtUFVyxaVU2d670um7f8OfeP-4zT6bRBdzlGWM9zgZDkZtdNnKVSMUW_ELgBifZ0-_8r57B2W3U4gOwj4MMMdH_IdpttRUroHlNGLjubdgvb-Lwv6rXy6Km5omZqcGEdjWrLXxF1Ng7-bPe3B0GFBmSOq6sWJs8K0m2O0Th57WEGY_OiR2u2oAqyWVg7lfXwqssPDDqXLZKYARUxG1seS7lu0rFlOZ13tPKHhW6A0HcsjggYKcHEL5QeUN2k4rU-OAjQPKuOX2Qf81j6G-l435NI1NYtPfkgDljewBGTWzOJWAkDcupeJbhlrD2AtjPMlhFgVWiAGQfYYFpglL2XcZ3SUmEZuttDSj7vgyFTrjOkaN4CsDasovC7XqpgS9XhLMIrxDmtmXeB6eG9EMxAtbgFJXXTAnSR0bochuSGzjX75ZcDNjiKC70yOLHti0uWfhTBIs8mLAPm2Si8HHnYINQzTZYLnjL78-t3ZpTCXithSHHS5UiYG9V4FzR071jh_VIWjmYSEd04WfKjaXoGboINZSBH4Num-4kzsK5n7T_V4c2Em9FckZqqFR6y1ByyQjtiU4vm9nPEzKtqj-7NIVI1dv7pSLHsPTeQGkTeXVVuoWbOem2hIULKG1Dwxaz4YyZ7m9Aa-4XG8e2t0SSfYs-w8_OFR7LtD2I1NVVyG87mwt_tqR6yHV4GT9ona5thA9AqhLhzeqC1yd7mh6jxmTdzkvrFnht53c0LgfEDb6eQBN2uvxS2lpVT4WP2UYzNajcdHAM0_oPBh5hD1RwgVFxjXbiblIa4xLdxNArofKF0E22JpSNMdcHuWgpBXqN5ZsWU8rMjEfDISiPH_tC178op4xgiRtO3lByLZJz1bMVB9kb_MKU-UufiPNZEvXYTXk1Sx-gGd_glILqnvtvh58c0v8R2qUQQv0fTwDSa0A8LlN2ne3zdaJI6r3VKxBl0cNp4c6ONJjl2AiHno6BqD08rP1m_Vl47J5fvVdenV4goeRLKun5NRVgzEi4zJakLy6fqutNL3H7iusd_VBAeHNEXXiZRZe61f8Tk5QOcwXxFMuGnma159ZufPAyRcD4akzVhnDPw0RAQg6y1a3c7V9stu1MQA8dU5wvRvXqjDBhmLVMxSPBY46g32WOgv6BOcBvNPPYt37WZp954Ojqzo9vmZuU46vyKmf3r70XFhkkO51XrvoCoW7qCjibDcVktQfBmXrmuZvDBJqKS_74f2zgqc2dMSfyAJyWYR_tZetyzXMpzFycYUkdE3A8jiUT0qAIZxyZDh_2AZz5O-VcTW3Q01KqR38nmcflJ-CFh5YlKqyVQNeBZH0G-gYiE8X9e2idcT97MFbsNnpkDpShiGduKbG9W5uixQeXkFsMHSA84aTpJburCxAyHx2ojLFwOmWfxJXVTek0LMOs7TZaEX1LBYkZ6qa2NskZnNxLVMyOqw7tAj-r-npnAFpoUMPLnv9s68osK_0KhZtbwM-K0f09mSWHtonk7npTRkbjJSfninSdLpVGAy42Cf1zU8WNV1kgbUrtGA2PQAGeAuW0__q5RxhojJYpIc-nuQzVWS0dw213kF5syGiuays14Yr_0Plrxy5RYMHZd2Rj021Lb5335DvhUbb5Ash4WaTBX2LA3reF6Z8nxg_BaTM_QZLYJpWTk4DmgNIBAskRtj4IpPU9HwrPc9nnTjgfMPAS3yXi4CPr2PG-EMOWqdg7lMxQDlBawzjuck32vhSYpeCTTIOZYSdIph9DOuM6bK1uomK5ZEDSjsvEvek2TCDEx8OkOp8kkluP3eG_Ib7qXBK1dK1RXUsDR9D9i4PVduEL6vBSZfOyuGlssCrnZFeRjnulsxsKqMYGsJWMdOomTXOvWc5Qf82guwGcnjqccgdqVkBeY2jGIU1RFTC4cYfdyCUoBuLicKzt2VkRHBWfl7O548yjVaD4GOsRS-Pr81-cKtgy05rsuh8jzs4dd2eb50WwpwgAC2hTNrAe_sAPb6_wKqFpAtHzrtjF7vuez8z9k5Z0orebw6XD77EGzm8v-FQ2Bn6cRM0zUyU5aVnAsjSzyH3TpRJcxZ5y69eqf0WT9CkP832YhZ2uUfpINUbpjaFU-VSs6k3l0eV1VxNMf63ZNU0xuQN-4rxUNe_ZIlz3WPvWRLy1X2qOQMwuSpPFIBOwxTUGvH4BiH0KIzhI3cid7x9gaExrj4cNpVbt0Zm6sYEklxOkFC8Ws6y_jTpk5i6ceZmk-SRHWoJbhvQ1CGNzKV7QrkQkot3KsSzUOMKSj-I0ucgp67JHfGiq8IXNYflz7kGNoQBp21kqp2-M5JkqQZ2zzyRWY7Pd67Wcepjvhm6kMsw4bHWClqKVI2RA8McH-uWSS9qz_x6s-AVvtEYCmavk0HK-gzi4RM6vj_Cl7bpUCM9n8yk-2a6gejCsepFwH71Dv3r2qwe_mqklmZbcK08jxpbbUx_ay9c6tGnpO9g7XBBxY2Tvfb4q0LJ0_r8jIkFl-mNW5NXX-CazTKuhYWCFhiR4zM4p0EqjfXwmDZ6f0ngCd7uXvCcNon7CUbuvjAF3sheeV-3hNOqJCt2kC3vo38lC_AI1OZZylCDkqJi-dNmtkhmfZ4pYhIfMdeWknEzKl2aw1ATK0NxN6kn9Ro52Z0L-ER-XwD-fZSXfAzin2QPhLos43q00T0hMeJD-t5bH0jd9gMYAyh56DUKtTEF_yp2HQwDs78qAm3POBl4N3hHhvJooHpcz4DeRI-6Ki4Tf_I_LKwPpTlAEAfAlh--wEGru-0TdLlc2-bQXeyynLlZSPG1dVX4MFlzUaeMhT-5nVyajvCOWuNAlQPBSH.ZiiMaGJOwv0JalVX4hL5Vw","type":"submit_form_payload"};
                event = JSON.stringify(event);
                this.onReceiveCallbackfunction(event);*/
                //    var browser = java.import("com.example.newweb.MainView");
                //     browser.invokeBrowser(this.onReceiveCallbackfunction,urlConf.URL);
                this.urlWeb = urlConf.URL;
                var urlConfs = {
    URL: this.urlWeb,
    requestMethod: constants.BROWSER_REQUEST_METHOD_GET,
};
               // this.view.brWeb.requestURLConfig = urlConfs;
                //this.view.brWeb.onSuccess =this.onReceiveCallbackfunction;
                //this.view.brWeb.onPageFinished = this.onReceiveCallbackfunction; 
                scope.NCTest();
                 //scope.view.ntvContainer.onCreated = scope.addNativeWebView();
                 scope.addNativeWebView();
                
            } catch (err) {
                kony.print("broswerSetUrl" + err);
            }
        },
        NCTest: function() {
             this.MyKonyExtension = java.import("com.example.newweb.MainView");
            this.KonyMain = java.import("com.konylabs.android.KonyMain");
            this.konyContext = this.KonyMain.getActivityContext();
            this.layoutView = java.import("android.widget.LinearLayout");
            this.viewGroup = java.import("android.view.ViewGroup");
            this.eventObject = null;
            
        },
     callBackEvent:function(eventObject){
    var callback =eventObject;
     },
         addNativeWebView: function(){
            try{
            var scope =this;
            this.linearLayout = new this.layoutView(this.konyContext);
            this.linearLayout.setLayoutParams(new this.viewGroup.LayoutParams(this.viewGroup.LayoutParams.MATCH_PARENT, this.viewGroup.LayoutParams.MATCH_PARENT));
            this.linearLayout.setId(1234);
            var parentView = this.linearLayout.getLayoutParams();
            scope.addNativeWebViewAndroid(parentView);
            }catch(err){
                kony.print("addNativeWebView"+ err);
            }
        },
         addNativeWebViewAndroid: function(parentView) {
            this.MyKonyExtension.invokeBrowser(this.onReceiveCallbackfunction, this.urlWeb);
        },
        onReceiveCallbackfunction: function(payload) {
            try {
                var merchantPayload = JSON.parse(payload);
                if (merchantPayload.type === "submit_form_payload") {
                    payload = merchantPayload.data;
                    PayLoad = {
                            "npiObject": payload
                        }
                        //alert("payload received:"+payload);
                    var presenter = applicationManager.getModulesPresentationController({
                        'appName': 'BillPayMA',
                        'moduleName': 'BillPaymentUIModule'
                    });
                    presenter.getWebViewdata(PayLoad);
                }
                //http://demo.connectips.com:6065/api/billpayment/confirmbillpay.do
                // event.data contains the NPI Biller Message
            } catch (err) {
                kony.print("onReceiveCallbackfunction" + err);
            }
        },
    };
 });