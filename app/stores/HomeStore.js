import alt from '../alt';
import HomeActions from '../actions/HomeActions';

class HomeStore {
    constructor() {
        this.bindActions(HomeActions);
        this.properties = [];
        this.totalProperties = 0;
        this.limit = 5;
        this.ajaxAnimationClass = '';
    }

    onGetAllPropertiesSuccess(data) {
        this.properties = data.properties;
        this.limit = data.limit;
    }

    onGetAllPropertiesFail(errorMessage) {
        toastr.error(errorMessage);
    }

    onUpdateAjaxAnimation(className) {
      this.ajaxAnimationClass = className; //fadein or fadeout
    }

    onGetPropertyCountSuccess(data) {
      this.totalProperties = data.count;
    }

    onGetPropertyCountFail(jqXhr) {
      toastr.error(jqXhr.responseJSON.message);
    }
}

export default alt.createStore(HomeStore);
