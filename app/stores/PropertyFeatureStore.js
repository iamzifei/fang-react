import alt from '../alt';
import PropertyFeatureActions from '../actions/PropertyFeatureActions';

class PropertyFeatureStore {
  constructor() {
    this.bindActions(PropertyFeatureActions);
  }
}

export default alt.createStore(PropertyFeatureStore);
