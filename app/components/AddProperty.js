import React from 'react'
import Dropzone from 'react-dropzone'
import Navbar from './Navbar'
import connectToStores from 'alt-utils/lib/connectToStores'
import PropertyStore from '../stores/PropertyStore'
import PropertyActions from '../actions/PropertyActions'
import _ from 'underscore'
import counterpart from 'counterpart'
import AutoSuggest from 'react-autosuggest'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import InputText from './form/InputText'
import TextArea from './form/TextArea'
import SelectInput from './form/SelectInput'

const DropzoneStyles = {
  width: '100%',
  height: '100px',
  backgroundColor: '#E6E6E6',
  border: '1px grey dotted',
}

const TextCenterDivStyles = {
  textAlign: 'center',
  verticalAlign: 'middle',
  lineHeight: '90px',
  cursor: 'pointer',
}

const ImagePreviewStyles = {
  height: '80px',
  margin: '2px',
}

class AddProperty extends React.Component {
  static getStores() {
    return [PropertyStore]
  }

  static getPropsFromStores() {
    return PropertyStore.getState()
  }

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onDrop = this.onDrop.bind(this)
    this.onSuggestionsUpdateRequested = this.onSuggestionsUpdateRequested.bind(this)
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this)
    this.getSuggestionValue = this.getSuggestionValue.bind(this)
    this.renderSuggestion = this.renderSuggestion.bind(this)
  }

  onChange(event) {
    console.log(event.target.value)
    //PropertyActions.fieldValueChanges({
    //  fieldName: event.target.name,
    //  fieldValue: event.target.value
    //})
  }

  onSuburbSearchChange(event, object) {
    PropertyActions.updateSuburbSearch(object.newValue.trim())
  }

  onPropertyTypeChange(option) {
    console.log(option)
  }

  onRoomTypeChange(option) {
    console.log(option)
  }

  onPropertyFeatureChange(option) {
    console.log(option)
  }

  onCheckboxChange(event) {
    PropertyActions.checkboxValueChanges({
      fieldName: event.target.name,
      fieldValue: event.target.value
    })
  }

  onSuggestionsUpdateRequested(object) {
    PropertyActions.getSuburbs(object.value)
  }

  onSuggestionSelected(event, object) {
    // TODO: process the value, assign to suburb and postcode
  }

  getSuggestionValue(suggestion) {
    return suggestion.value
  }

  renderSuggestion(suggestion) {
    return (
      <span>{suggestion.label}</span>
    )
  }

  onDrop(files) {
    PropertyActions.selectFilesToUpload(files)
  }

  handleSubmit(e) {
    e.preventDefault()
    PropertyActions.addProperty(this.props)
  }

  render() {
    const theme = {
      input: 'form-control',
      suggestionsContainer: 'search-results',
      suggestion: 'search-list-item'
    }

    const inputProps = {
      value: this.props.suburbSearch,
      onChange: this.onSuburbSearchChange,
      type: 'search',
      placeholder: counterpart('nav.search.placeholder')
    }

    const propertyTypeOptions = [
      {value: 'apartment', label: 'Apartment/Unit'},
      {value: 'studio', label: 'Studio'},
      {value: 'house', label: 'House/Townhouse'},
      {value: 'whole', label: 'Entire flat'}
    ]

    const roomTypeOptions = [
      {value: 'private', label: 'Single Room'},
      {value: 'shared', label: 'Shared Room'},
      {value: 'living', label: 'Living Room'},
      {value: 'master', label: 'Master Room'}
    ]

    const propertyFeatureOptions = [
      {value: 'furnished', label: 'Furnished'},
      {value: 'femalePrefer', label: 'Female Prefer'},
      {value: 'nonSmoker', label: 'Non Smoker'},
      {value: 'petAllowed', label: 'Pet Allowed'},
      {value: 'billInclude', label: 'Bill Included'},
      {value: 'fastInternet', label: 'Fast Internet'}
    ]

    return (
      <div>
        <Navbar pageFlag="addProperty" />
        <div className="container">
          <h2>Add Property</h2>
            <form onSubmit={this.handleSubmit} className="form-horizontal" >
              <section className="basic">
                <InputText
                  validateSate={this.props.priceValidateState}
                  label="Rent per week $"
                  model={this.props.price}
                  fieldName="price"
                  onChange={this.onChange}
                  helpBlock={this.props.priceHelpBlock}
                />
                <InputText
                  validateSate={this.props.bondValidateState}
                  label="How many weeks bond"
                  model={this.props.price}
                  fieldName="bond"
                  onChange={this.onChange}
                  helpBlock={this.props.bondHelpBlock}
                />

                <div className={`form-group ${this.props.availableStartValidateState}`}>
                  <label className="col-sm-3 control-label">Available Date</label>
                  <div className="col-sm-9">
                    <DatePicker
                      className="form-control"
                      selected={moment(this.props.availableStart, 'YYYY-MM-DD')}
                      dateFormat="YYYY-MM-DD"
                      onChange={this.onChange}
                    />
                    <span className="help-block">{this.props.availableStartHelpBlock}</span>
                  </div>
                </div>

                <InputText
                  validateSate={this.props.minTermValidateState}
                  label="Minimum Terms"
                  model={this.props.minTerm}
                  fieldName="minTerm"
                  onChange={this.onChange}
                  helpBlock={this.props.minTermHelpBlock}
                />
              </section>

              <section className="address">
                <div className={`form-group ${this.props.suburbSearchValidateState}`}>
                  <label className="col-sm-3 control-label">Suburb or postcode</label>
                  <div className="col-sm-9">
                    <AutoSuggest
                      theme={theme}
                      suggestions={this.props.suburbs}
                      onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
                      onSuggestionSelected={this.onSuggestionSelected}
                      getSuggestionValue={this.getSuggestionValue}
                      renderSuggestion={this.renderSuggestion}
                      inputProps={inputProps}
                    />
                    <span className="help-block">{this.props.suburbSearchHelpBlock}</span>
                  </div>
                </div>

                <InputText
                  // TODO: make the address auto suggest and process [lat, lng] with google map
                  // and save geocode to DB
                  validateSate={this.props.addressValidateState}
                  label="Address"
                  model={this.props.address}
                  fieldName="address"
                  onChange={this.onChange}
                  helpBlock={this.props.addressHelpBlock}
                />
              </section>

              <section className="details">
                <InputText
                  validateSate={this.props.titleValidateState}
                  label="Title"
                  model={this.props.title}
                  fieldName="title"
                  onChange={this.onChange}
                  helpBlock={this.props.titleHelpBlock}
                />
                <TextArea
                  validateSate={this.props.detailsValidateState}
                  label="Details"
                  model={this.props.details}
                  fieldName="details"
                  onChange={this.onChange}
                  helpBlock={this.props.detailsHelpBlock}
                />
                <SelectInput
                  multi={false}
                  validateSate={this.props.propertyTypeValidateState}
                  label="Property Type"
                  model={this.props.propertyType}
                  fieldName="propertyType"
                  options={propertyTypeOptions}
                  onChange={this.onPropertyTypeChange}
                  helpBlock={this.props.propertyTypeHelpBlock}
                />
                <SelectInput
                  multi={false}
                  validateSate={this.props.roomTypeValidateState}
                  label="Room Type"
                  model={this.props.roomType}
                  fieldName="propertyType"
                  options={roomTypeOptions}
                  onChange={this.onRoomTypeChange}
                  helpBlock={this.props.roomTypeHelpBlock}
                />
                <SelectInput
                  multi={true}
                  validateSate={this.props.propertyFeatureValidateState}
                  label="Property Feature"
                  model={this.props.propertyFeature.toString()}
                  fieldName="propertyFeature"
                  options={propertyFeatureOptions}
                  onChange={this.onPropertyFeatureChange}
                  helpBlock={this.props.propertyFeatureHelpBlock}
                />
                <div className="form-group">
                  <label className="col-sm-3 control-label">Property Images</label>
                  <div className="col-sm-9">
                    <Dropzone onDrop={this.onDrop} style={DropzoneStyles}>
                      <div style={TextCenterDivStyles}>
                        Drop photos here or click to select photos to upload.
                      </div>
                    </Dropzone>
                    {
                      this.props.files ?
                        <div>
                          <div>
                            {
                              this.props.files.map((file, i) =>
                                <img key={`image-preview-${i}`}
                                     src={file.preview} style={ImagePreviewStyles}
                                />
                              )
                            }
                          </div>
                        </div> : null
                    }
                  </div>
                </div>
              </section>
              <section className="contact">
                <InputText
                  validateSate={this.props.contactNameValidateState}
                  label="Contact Name"
                  model={this.props.contactName}
                  fieldName="contactName"
                  onChange={this.onChange}
                  helpBlock={this.props.contactNameHelpBlock}
                />
                <InputText
                  validateSate={this.props.contactNumberValidateState}
                  label="Contact Number"
                  model={this.props.contactNumber}
                  fieldName="contactNumber"
                  onChange={this.onChange}
                  helpBlock={this.props.contactNumberHelpBlock}
                />
                <InputText
                  validateSate={this.props.contactEmailValidateState}
                  label="Contact Email"
                  model={this.props.contactEmail}
                  fieldName="contactEmail"
                  onChange={this.onChange}
                  helpBlock={this.props.contactEmailHelpBlock}
                />
                <InputText
                  validateSate={this.props.contactSocialValidateState}
                  label="Wechat"
                  model={this.props.contactSocial}
                  fieldName="contactSocial"
                  onChange={this.onChange}
                  helpBlock={this.props.contactSocialHelpBlock}
                />
              </section>


              <button type="submit" className="btn btn-primary pull-right">Submit</button>
            </form>
        </div>
      </div>
    )
  }
}

AddProperty.propTypes = {
  suburbSearch: React.PropTypes.string,
  suburbSearchValidateState: React.PropTypes.string,
  suburbSearchHelpBlock: React.PropTypes.string,
  suburb: React.PropTypes.string,
  postcode: React.PropTypes.string,
  price: React.PropTypes.string,
  address: React.PropTypes.string,
  title: React.PropTypes.string,
  details: React.PropTypes.string,
  propertyType: React.PropTypes.string,
  roomType: React.PropTypes.string,
  contactName: React.PropTypes.string,
  contactNumber: React.PropTypes.string,
  contactEmail: React.PropTypes.string,
  contactSocial: React.PropTypes.string,
  preferredContact: React.PropTypes.string,
  bond: React.PropTypes.string,
  availableStart: React.PropTypes.string,
  minTerm: React.PropTypes.string,
  propertyFeature: React.PropTypes.array,

  priceValidateState: React.PropTypes.string,
  priceHelpBlock: React.PropTypes.string,
  addressValidateState: React.PropTypes.string,
  addressHelpBlock: React.PropTypes.string,
  titleValidateState: React.PropTypes.string,
  titleHelpBlock: React.PropTypes.string,
  detailsValidateState: React.PropTypes.string,
  detailsHelpBlock: React.PropTypes.string,
  propertyTypeValidateState: React.PropTypes.string,
  propertyTypeHelpBlock: React.PropTypes.string,
  roomTypeValidateState: React.PropTypes.string,
  roomTypeHelpBlock: React.PropTypes.string,
  contactNameValidateState: React.PropTypes.string,
  contactNameHelpBlock: React.PropTypes.string,
  contactNumberValidateState: React.PropTypes.string,
  contactNumberHelpBlock: React.PropTypes.string,
  contactEmailValidateState: React.PropTypes.string,
  contactEmailHelpBlock: React.PropTypes.string,
  contactSocialValidateState: React.PropTypes.string,
  contactSocialHelpBlock: React.PropTypes.string,
  preferredContactValidateState: React.PropTypes.string,
  bondValidateState: React.PropTypes.string,
  bondHelpBlock: React.PropTypes.string,
  availableStartValidateState: React.PropTypes.string,
  availableStartHelpBlock: React.PropTypes.string,
  minTermValidateState: React.PropTypes.string,
  minTermHelpBlock: React.PropTypes.string,
  propertyFeatureValidateState: React.PropTypes.string,
  propertyFeatureHelpBlock: React.PropTypes.string,
  files: React.PropTypes.array
}

export default connectToStores(AddProperty)
