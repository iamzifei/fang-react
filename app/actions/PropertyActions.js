import alt from '../alt';

class PropertyActions {
  constructor() {
    this.generateActions(
      'getPropertySuccess',
      'getPropertyFail',
      'updateGeoLocation'
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

}

export default alt.createActions(PropertyActions);
