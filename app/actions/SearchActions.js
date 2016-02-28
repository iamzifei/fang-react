import alt from '../alt';
import {assign} from 'underscore';

class SearchActions {
  constructor() {
    this.generateActions(
      'updateAjaxAnimation',
      'updateSearchQueryEvent',
      'updateSearchQueryValue',
      'searchPropertiesSuccess',
      'searchPropertiesFail',
      'searchSuburbSuccess',
      'searchSuburbFail'
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

  getSuburbs(suburb) {
    if (suburb.length > 2) {
      $.ajax({
          url: '/api/suburb/',
          data: {suburb: suburb}
        })
        .done(data => {
          this.actions.searchSuburbSuccess(data);
        })
        .fail(jqXhr => {
          this.actions.searchSuburbFail(jqXhr.responseJSON.message);
        });
    }
  }
}

export default alt.createActions(SearchActions);
