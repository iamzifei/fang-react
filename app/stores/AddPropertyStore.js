import alt from '../alt';
import AddPropertyActions from '../actions/AddPropertyActions';

class AddPropertyStore {
    constructor() {
        this.bindActions(AddPropertyActions);
        this.name = '';
        this.gender = '';
        this.helpBlock = '';
        this.nameValidationState = '';
        this.genderValidationState = '';
    }

    onAddPropertySuccess(successMessage) {
        this.nameValidationState = 'has-success';
        this.helpBlock = successMessage;
    }

    onAddPropertyFail(errorMessage) {
        this.nameValidationState = 'has-error';
        this.helpBlock = errorMessage;
    }

    onUpdateName(event) {
        this.name = event.target.value;
        this.nameValidationState = '';
        this.helpBlock = '';
    }

    onUpdateGender(event) {
        this.gender = event.target.value;
        this.genderValidationState = '';
    }

    onInvalidName() {
        this.nameValidationState = 'has-error';
        this.helpBlock = 'Please enter a character name.';
    }

    onInvalidGender() {
        this.genderValidationState = 'has-error';
    }
}

export default alt.createStore(AddPropertyStore);
