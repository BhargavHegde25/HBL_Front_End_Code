function AS_AppEvents_d25752641bd245cd91b751852237571b(eventobject) {
    var self = this;
    kony.mvc.MDAApplication.getSharedInstance().appContext.deeplinkUrl = {
        deeplinkpath: eventobject.deeplinkpath,
        formID: eventobject.formID,
    }
}