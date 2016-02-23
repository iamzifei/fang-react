import alt from '../alt';

class PropertyActions {
  constructor() {
    this.generateActions(
      'getPropertySuccess',
      'getPropertyFail'
    );
  }

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
