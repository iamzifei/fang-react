import alt from '../alt';
import SearchActions from '../actions/SearchActions';

class SearchStore {
    constructor() {
        this.bindActions(SearchActions);
        this.properties = [];
    }

    onGetResultSuccess(data) {
        this.properties = data;
    }

    onGetResultFail(errorMessage) {
        toastr.error(errorMessage);
    }
}

export default alt.createStore(SearchStore);
