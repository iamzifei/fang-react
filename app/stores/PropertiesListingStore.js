import alt from '../alt';
import PropertiesListingActions from '../actions/PropertiesListingActions';

class PropertiesListingStore {
  constructor() {
    this.bindActions(PropertiesListingActions);
    this.limit = 5;
    this.ajaxAnimationClass = '';
    this.properties = [];
    this.propertiesCount = 0;
    this.searchQuery = '';
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

  onSearchPropertiesSuccess(payload) {
    payload.history.pushState(null, '/properties/' + payload.suburb);
  }

  onSearchPropertiesFail(payload) {
    payload.searchForm.classList.add('shake');
    setTimeout(() => {
      payload.searchForm.classList.remove('shake');
    }, 1000);
  }

  onUpdateSearchQuery(event) {
    this.searchQuery = event.target.value;
  }
}

export default alt.createStore(PropertiesListingStore);
