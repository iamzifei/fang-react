import { assign } from 'underscore'
import alt from '../alt'
import PropertyActions from '../actions/PropertyActions'
import Logger from '../../utils/Logger'

class PropertyStore {
  constructor() {
    this.bindActions(PropertyActions)
  }

  onInitState() {
    Logger.log('PropertyStore.onInitState()');

    delete this._id;
    delete this.files;
    this.suburb = null;
    this.postcode = null;
    this.price = null;
    this.address = null;
    this.imageCount = 0;
    this.title = null;
    this.details = null;
    this.propertyType = null;
    this.roomType = null;
    this.contactName = null;
    this.contactNumber = null;
    this.contactEmail = null;
    this.contactSocial = null;
    this.preferredContact = null;
    this.bond = null;
    this.availableStart = null;
    this.minTerm = 0;
    this.propertyFeature = null;
    this.geolocation = null;
  }

  onGetPropertySuccess(data) {
    assign(this, data)
  }

  onGetPropertyFail(jqXhr) {
    toastr.error(jqXhr.responseJSON.message)
  }

  onUpdateGeoLocation(location) {
    this.geolocation = location
  }

  onFieldValueChanges(change) {
    this[change.fieldName] = change.fieldValue
  }

  onSelectFilesToUpload(files) {
    this.files = files
  }
}

export default alt.createStore(PropertyStore)
