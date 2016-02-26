import alt from '../alt';
import {assign} from 'underscore';

class PropertiesListingActions {
  constructor() {
    this.generateActions(
      'updateAjaxAnimation',
      'getPropertiesListSuccess',
      'getPropertiesListFail',
      'getPropertyCountSuccess',
      'getPropertyCountFail',
      'updateSearchQuery',
      'searchPropertiesSuccess',
      'searchPropertiesFail'
    );
  }

  getAllProperties(offset) {
    $.ajax({
        url: '/api/properties',
        data: { offset: offset }
      })
      .done(data => {
        this.actions.getPropertiesListSuccess(data);
      })
      .fail(jqXhr => {
        this.actions.getPropertiesListFail(jqXhr.responseJSON.message);
      });
  }

  getPropertyCount(suburb = -1) {
    $.ajax({
      url: '/api/properties/count',
      data: { suburb: suburb }
    })
      .done((data) => {
        this.actions.getPropertyCountSuccess(data)
      })
      .fail((jqXhr) => {
        this.actions.getPropertyCountFail(jqXhr)
      });
  }

  getPropertiesInSuburb(suburb, offset) {
    $.ajax({
      url: '/api/properties/' + suburb,
      data: { offset: offset }
    })
      .done(data => {
        this.actions.getPropertiesListSuccess(data);
      })
      .fail(jqXhr => {
        this.actions.getPropertiesListFail(jqXhr.responseJSON.message);
      });
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

export default alt.createActions(PropertiesListingActions);
