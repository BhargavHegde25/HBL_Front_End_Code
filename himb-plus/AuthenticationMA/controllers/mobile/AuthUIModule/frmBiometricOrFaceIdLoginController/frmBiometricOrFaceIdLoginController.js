define(['CampaignUtility', 'CommonUtilities'], function (CampaignUtility, CommonUtilities) {
    return {
        init: function () {
            var scope = this;
            var currentFormObject = kony.application.getCurrentForm();
            var currentForm = currentFormObject.id;
            applicationManager.getPresentationFormUtility().initCommonActions(this, "CALLBACK", currentForm, scope.flxBackOnClick);
        },

        flxBackOnClick: function () {

        },

        preShow: function () {
            this.view.postShow = this.postShow;
        },

        postShow: function () {
            this.view.flxBiometricOrFaceId.onClick = this.flxBiometricOrFaceIdOnClick;
            this.view.flxPassword.onClick = this.flxPasswordOnClick;
            applicationManager.getPresentationUtility().dismissLoadingScreen();
        },

        flxBiometricOrFaceIdOnClick: function () {

        },


        flxPasswordOnClick: function () {

        },

    };
});