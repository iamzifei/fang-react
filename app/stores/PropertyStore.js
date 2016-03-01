import {assign, contains} from 'underscore';
import alt from '../alt';
import PropertyActions from '../actions/PropertyActions';

class PropertyStore {
  constructor() {
    this.bindActions(PropertyActions);
    this.suburb = 'TBD';
    this.postcode = 'TBD';
    this.price = 'TBD';
    this.address = 'TBD';
    this.imageCount = 0;
    this.title = 'TBD';
    this.details = 'TBD';
    this.propertyType = 'TBD';
    this.roomType = 'TBD';
    this.contactName = 'TBD';
    this.contactNumber = 'TBD';
    this.contactEmail = 'TBD';
    this.contactSocial = 'TBD';
    this.preferredContact = 'TBD';
    this.bond = 'TBD';
    this.availableStart = 'TBD';
    this.minTerm = 0;
    this.propertyFeature = [];
    this.geolocation = {lat: 59.724465, lng: 30.080121};
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
}

export default alt.createStore(PropertyStore);
