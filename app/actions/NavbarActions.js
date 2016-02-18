import alt from '../alt';
import {assign} from 'underscore';

class NavbarActions {
  constructor() {
    this.generateActions(
      'updateAjaxAnimation',
      'updateSearchQuery',
      'getPropertyCountSuccess',
      'getPropertyCountFail',
      'findPropertySuccess',
      'findPropertyFail'
    );
  }

  findProperty(payload) {
    $.ajax({
      url: '/api/properties/search',
      data: { name: payload.searchQuery }
    })
      .done((data) => {
        assign(payload, data);
        this.actions.findPropertySuccess(payload);
      })
      .fail(() => {
        this.actions.findPropertyFail(payload);
      });
  }

  getPropertyCount() {
    $.ajax({ url: '/api/properties/count' })
      .done((data) => {
        this.actions.getPropertyCountSuccess(data)
      })
      .fail((jqXhr) => {
        this.actions.getPropertyCountFail(jqXhr)
      });
  }
}

export default alt.createActions(NavbarActions);
