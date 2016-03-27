import { assign } from 'underscore'
import alt from '../alt'
import PropertyActions from '../actions/PropertyActions'
import { browserHistory } from 'react-router'
import toastr from 'toastr'

class PropertyStore {
  constructor() {
    this.bindActions(PropertyActions)
    this._id
    this.files
    this.suburb
    this.postcode
    this.price
    this.address
    this.imageCount
    this.title
    this.details
    this.propertyType
    this.roomType
    this.contactName
    this.contactNumber
    this.contactEmail
    this.contactSocial
    this.preferredContact
    this.bond
    this.availableStart
    this.minTerm
    this.propertyFeature = []
    this.geolocation = {}

    this.suburbValidateState
    this.suburbHelpBlock
    this.postcodeValidateState
    this.postcodeHelpBlock
    this.priceValidateState
    this.priceHelpBlock
    this.addressValidateState
    this.addressHelpBlock
    this.titleValidateState
    this.titleHelpBlock
    this.detailsValidateState
    this.detailsHelpBlock
    this.propertyTypeValidateState
    this.roomTypeValidateState
    this.contactNameValidateState
    this.contactNameHelpBlock
    this.contactNumberValidateState
    this.contactNumberHelpBlock
    this.contactEmailValidateState
    this.contactEmailHelpBlock
    this.contactSocialValidateState
    this.contactSocialHelpBlock
    this.preferredContactValidateState
    this.bondValidateState
    this.bondHelpBlock
    this.availableStartValidateState
    this.availableStartHelpBlock
    this.minTermValidateState
    this.minTermHelpBlock
    this.propertyFeatureValidateState
    this.bondValidateState
    this.photos
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

  onCheckboxValueChanges(change) {
    this[change.fieldName].push(change.fieldValue)
  }

  onSelectFilesToUpload(files) {
    this.files = files
  }

  onAddPropertySuccess(id) {
    browserHistory.push({
      pathname: `/property/${id}`
    })
  }

  onAddPropertyFail(error) {
    toastr.error(error)
  }

}

export default alt.createStore(PropertyStore)
