import alt from '../alt';
import HomeActions from '../actions/HomeActions';

class HomeStore {
    constructor() {
        this.bindActions(HomeActions);
        this.properties = [];
    }

    onGetAllPropertiesSuccess(data) {
        this.properties = data;
    }

    onGetAllPropertiesFail(errorMessage) {
        toastr.error(errorMessage);
    }
}

export default alt.createStore(HomeStore);
