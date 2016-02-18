import alt from '../alt';

class AddPropertyActions {
    constructor() {
        this.generateActions(
            'AddPropertySuccess',
            'AddPropertyFail',
            'updateName',
            'updateGender',
            'invalidName',
            'invalidGender'
        );
    }

    AddProperty(name, gender) {
        $.ajax({
                type: 'POST',
                url: '/api/properties',
                data: { name: name, gender: gender }
            })
            .done((data) => {
                this.actions.AddPropertySuccess(data.message);
            })
            .fail((jqXhr) => {
                this.actions.AddPropertyFail(jqXhr.responseJSON.message);
            });
    }
}

export default alt.createActions(AddPropertyActions);
