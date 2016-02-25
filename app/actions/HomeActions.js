import alt from '../alt';

class HomeActions {
    constructor() {
        this.generateActions(
            'getAllPropertiesSuccess',
            'getAllPropertiesFail',
            'getPropertyCountSuccess',
            'getPropertyCountFail',
            'updateAjaxAnimation'
        );
    }

    getAllProperties(offset) {
        $.ajax({
          url: '/api/properties',
          data: { offset: offset }
        })
            .done(data => {
                this.actions.getAllPropertiesSuccess(data);
            })
            .fail(jqXhr => {
                this.actions.getAllPropertiesFail(jqXhr.responseJSON.message);
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

export default alt.createActions(HomeActions);
