import alt from '../alt';
import AddPropertyActions from '../actions/AddPropertyActions';
import Logger from '../utils/Logger';

class AddPropertyStore {
  constructor() {
    this.bindActions(AddPropertyActions);
  }

  onFieldValueChanges(change) {
    this[change.fieldName] = change.fieldValue;
  }
}

export default alt.createStore(AddPropertyStore);
