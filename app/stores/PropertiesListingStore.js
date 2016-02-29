import alt from '../alt';
import PropertiesListingActions from '../actions/PropertiesListingActions';

class PropertiesListingStore {
  constructor() {
    this.bindActions(PropertiesListingActions);
    this.limit = 5;
    this.ajaxAnimationClass = '';
    this.properties = [];
    this.propertiesCount = 0;
  }

  onGetPropertiesListSuccess(data) {
    this.properties = data.properties;
    this.limit = data.limit;
  }

  onGetPropertiesListFail(errorMessage) {
    toastr.error(errorMessage);
  }

  onUpdateAjaxAnimation(className) {
    this.ajaxAnimationClass = className; //fadein or fadeout
  }

  onGetPropertyCountSuccess(data) {
    this.propertiesCount = data.count;
  }

  onGetPropertyCountFail(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }
}

export default alt.createStore(PropertiesListingStore);
