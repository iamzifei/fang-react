import alt from '../alt';
import SearchActions from '../actions/SearchActions';

class SearchStore {
  constructor() {
    this.bindActions(SearchActions);
    this.ajaxAnimationClass = '';
    this.searchQuery = '';
  }

  onUpdateAjaxAnimation(className) {
    this.ajaxAnimationClass = className; //fadein or fadeout
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

export default alt.createStore(SearchStore);
