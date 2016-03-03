import alt from '../alt';

import Logger from '../utils/Logger';

class PropertyActions {
  constructor() {
    this.generateActions(
      'getPropertySuccess',
      'getPropertyFail',
      'updateGeoLocation',
      'fieldValueChanges',
      'addPropertySuccess',
      'addPropertyFail',
      'uploadPhotos'
    );
  }

  //TODO: put properties CRUD actions in this one
  getProperty(_id) {
    $.ajax({ url: '/api/property/' + _id })
      .done((data) => {
        this.actions.getPropertySuccess(data);
      })
      .fail((jqXhr) => {
        this.actions.getPropertyFail(jqXhr);
      });
  }

  addProperty(property) {
    Logger.log('PropertyActions.addProperty(property)');
    Logger.logObject(property);

    $.ajax({
        type: 'POST',
        url: '/api/properties',
        contentType: false,
        processData: false,
        data: property
      })
      .done((data) => {
        Logger.logObject(data);
        this.actions.addPropertySuccess(data.message);
      })
      .fail((jqXhr) => {
        Logger.logObject(jqXhr);
        this.actions.addPropertyFail(jqXhr.responseJSON.message);
      });
  }
}

export default alt.createActions(PropertyActions);
