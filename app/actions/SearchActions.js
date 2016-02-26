import alt from '../alt';
import {assign} from 'underscore';

class SearchActions {
  constructor() {
    this.generateActions(
      'updateAjaxAnimation',
      'updateSearchQuery',
      'searchPropertiesSuccess',
      'searchPropertiesFail'
    );
  }

  searchProperties(payload) {
    $.ajax({
        url: '/api/properties/search',
        data: { suburb: payload.searchQuery }
      })
      .done((data) => {
        assign(payload, data);
        this.actions.searchPropertiesSuccess(payload);
      })
      .fail(() => {
        this.actions.searchPropertiesFail(payload);
      });
  }
}

export default alt.createActions(SearchActions);
