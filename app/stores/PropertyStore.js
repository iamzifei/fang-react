import { assign } from 'underscore'
import alt from '../alt'
import PropertyActions from '../actions/PropertyActions'
import { browserHistory } from 'react-router'
import moment from 'moment'
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
    this.availableStart = moment()
    this.minTerm
    this.propertyFeature = []
    this.geolocation = {}

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
    this.suburbSearch = ''
    this.suburbSearchValidateState
    this.suburbSearchHelpBlock
    this.suburbs = []
  }

  onGetSuburbsSuccess(data) {
    this.suburbs = data
  }

  onUpdateSuburbSearchSuccess(keyword) {
    this.suburbSearch = keyword
  }

  onGetPropertySuccess(data) {
    var property = data
    property.price = data.price.toString()
    property.bond = data.bond.toString()
    property.minTerm = data.minTerm.toString()
    assign(this, property)
  }

  onDisplayFailMessage(error) {
    toastr.error(error)
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

}

export default alt.createStore(PropertyStore)
