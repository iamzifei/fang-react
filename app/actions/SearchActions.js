import alt from '../alt';

class SearchActions {
    constructor() {
        this.generateActions(
            'getResultSuccess',
            'getResultFail'
        );
    }

    getPropertiesInSuburb(suburb) {
        $.ajax({ url: '/api/properties/' + suburb })
            .done(data => {
                this.actions.getResultSuccess(data);
            })
            .fail(jqXhr => {
                this.actions.getResultFail(jqXhr.responseJSON.message);
            });
    }
}

export default alt.createActions(SearchActions);
