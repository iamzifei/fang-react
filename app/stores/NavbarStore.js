import alt from '../alt';
import NavbarActions from '../actions/NavbarActions';

class NavbarStore {
    constructor() {
        this.bindActions(NavbarActions);
        this.searchQuery = '';
        this.ajaxAnimationClass = '';
    }

    onFindPropertySuccess(payload) {
        payload.history.pushState(null, '/properties/' + payload.suburb);
    }

    onFindPropertyFail(payload) {
        payload.searchForm.classList.add('shake');
        setTimeout(() => {
            payload.searchForm.classList.remove('shake');
        }, 1000);
    }

    onUpdateAjaxAnimation(className) {
        this.ajaxAnimationClass = className; //fadein or fadeout
    }

    onUpdateSearchQuery(event) {
        this.searchQuery = event.target.value;
    }
}

export default alt.createStore(NavbarStore);
