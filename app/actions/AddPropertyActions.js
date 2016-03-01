import alt from '../alt';

import Logger from '../utils/Logger';

class AddPropertyActions {
    constructor() {
        this.generateActions(
          'fieldValueChanges',
          'addPropertySuccess',
          'addPropertyFail'
        );
    }

    addProperty(property) {
        $.ajax({
                type: 'POST',
                url: '/api/properties',
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

export default alt.createActions(AddPropertyActions);
