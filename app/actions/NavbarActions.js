import alt from '../alt';
import {assign} from 'underscore';

class NavbarActions {
  constructor() {
    this.generateActions(
      'updateAjaxAnimation',
      'updateSearchQuery',
      'findPropertySuccess',
      'findPropertyFail'
    );
  }

  findProperty(payload) {
    $.ajax({
      url: '/api/properties/search',
      data: { suburb: payload.searchQuery }
    })
      .done((data) => {
        assign(payload, data);
        this.actions.findPropertySuccess(payload);
      })
      .fail(() => {
        this.actions.findPropertyFail(payload);
      });
  }
}

export default alt.createActions(NavbarActions);
