import alt from '../alt';

class HomeActions {
    constructor() {
        this.generateActions(
            'getAllPropertiesSuccess',
            'getAllPropertiesFail'
        );
    }

    getAllProperties() {
        $.ajax({ url: '/api/properties' })
            .done(data => {
                this.actions.getAllPropertiesSuccess(data);
            })
            .fail(jqXhr => {
                this.actions.getAllPropertiesFail(jqXhr.responseJSON.message);
            });
    }
}

export default alt.createActions(HomeActions);
