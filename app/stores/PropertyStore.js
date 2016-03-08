import { assign } from 'underscore'
import alt from '../alt'
import PropertyActions from '../actions/PropertyActions'
import Logger from '../../utils/Logger'

class PropertyStore {
  constructor() {
    this.bindActions(PropertyActions)
    this.geolocation = { lat: 59.724465, lng: 30.080121 }
  }

  onInitState() {
    Logger.log('PropertyStore.onInitState()')

    delete this._id
    delete this.files
    delete this.suburb
    delete this.postcode
    delete this.price
    delete this.address
    delete this.imageCount
    delete this.title
    delete this.details
    delete this.propertyType
    delete this.roomType
    delete this.contactName
    delete this.contactNumber
    delete this.contactEmail
    delete this.contactSocial
    delete this.preferredContact
    delete this.bond
    delete this.availableStart
    delete this.minTerm
    delete this.propertyFeature
    delete this.geolocation
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
