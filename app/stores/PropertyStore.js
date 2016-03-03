import {assign, contains} from 'underscore';
import alt from '../alt';

import PropertyActions from '../actions/PropertyActions';
import Logger from '../utils/Logger';

class PropertyStore {
  constructor() {
    this.bindActions(PropertyActions);
  }

  onGetPropertySuccess(data) {
    assign(this, data);
  }

  onGetPropertyFail(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }

  onUpdateGeoLocation(location) {
    this.geolocation = location;
  }

  onFieldValueChanges(change) {
    this[change.fieldName] = change.fieldValue;
  }

  onUploadPhotos(files) {
    this['photos'] = files;
  }
}

export default alt.createStore(PropertyStore);
