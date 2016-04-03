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
                      selected={this.props.availableStart}
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


              </section>
              <section className="contact">
              </section>



              <div className={`form-group ${this.props.propertyTypeValidateState}`}>
                <div className="control-label">Property Type</div>
                <div className="radio radio-inline">
                  <input type="radio" name="propertyType" id="apartment" value="apartment"
                    checked={this.props.propertyType === 'apartment'}
                    onChange={this.onChange}
                  />
                  <label htmlFor="apartment">Apartment/Unit</label>
                </div>
                <div className="radio radio-inline">
                  <input type="radio" name="propertyType" id="studio" value="studio"
                    checked={this.props.propertyType === 'studio'}
                    onChange={this.onChange}
                  />
                  <label htmlFor="unit">Studio</label>
                </div>
                <div className="radio radio-inline">
                  <input type="radio" name="propertyType" id="house" value="house"
                    checked={this.props.propertyType === 'house'}
                    onChange={this.onChange}
                  />
                  <label htmlFor="house">House/Townhouse</label>
                </div>
                <div className="radio radio-inline">
                  <input type="radio" name="propertyType" id="whole" value="whole"
                    checked={this.props.propertyType === 'whole'}
                    onChange={this.onChange}
                  />
                  <label htmlFor="unit">Entire flat</label>
                </div>
              </div>
              <div className={`form-group ${this.props.roomTypeValidateState}`}>
                <div className="control-label">Room Type</div>
                <div className="radio radio-inline">
                  <input type="radio" name="roomType" id="private" value="private"
                    checked={this.props.roomType === 'private'} onChange={this.onChange}
                  />
                  <label htmlFor="private">Single Room</label>
                </div>
                <div className="radio radio-inline">
                  <input type="radio" name="roomType" id="shared" value="shared"
                    checked={this.props.roomType === 'shared'} onChange={this.onChange}
                  />
                  <label htmlFor="shared">Shared Room</label>
                </div>
                <div className="radio radio-inline">
                  <input type="radio" name="roomType" id="living" value="living"
                    checked={this.props.roomType === 'living'} onChange={this.onChange}
                  />
                  <label htmlFor="living">Living Room</label>
                </div>
                <div className="radio radio-inline">
                  <input type="radio" name="roomType" id="master" value="master"
                    checked={this.props.roomType === 'master'} onChange={this.onChange}
                  />
                  <label htmlFor="master">Master Room</label>
                </div>
              </div>
              <div className={`form-group ${this.props.contactNameValidateState}`}>
                <label className="control-label">Contact Name</label>
                <input type="text" className="form-control" ref="contactNameTextField"
                  value={this.props.contactName} name="contactName"
                  onChange={this.onChange}
                />
                <span className="help-block">{this.props.contactNameHelpBlock}</span>
              </div>
              <div className={`form-group ${this.props.contactNumberValidateState}`}>
                <label className="control-label">Contact Number</label>
                <input type="text" className="form-control" ref="contactNumberTextField"
                  value={this.props.contactNumber} name="contactNumber"
                  onChange={this.onChange}
                />
                <span className="help-block">{this.props.contactNumberHelpBlock}</span>
              </div>
              <div className={`form-group ${this.props.contactEmailValidateState}`}>
                <label className="control-label">Contact Email</label>
                <input type="text" className="form-control" ref="contactEmailTextField"
                  value={this.props.contactEmail} name="contactEmail"
                  onChange={this.onChange}
                />
                <span className="help-block">{this.props.contactEmailHelpBlock}</span>
              </div>
              <div className={`form-group ${this.props.contactSocialValidateState}`}>
                <label className="control-label">Wechat</label>
                <input type="text" className="form-control" ref="contactNameTextField"
                  value={this.props.contactSocial} onChange={this.onChange}
                />
                <span className="help-block">{this.props.contactSocialHelpBlock}</span>
              </div>
              <div className={`form-group ${this.props.preferredContactValidateState}`}>
                <div className="control-label">Preferred Contact Method</div>
                <div className="radio radio-inline">
                  <input type="radio" name="preferredContact" id="phone" value="phone"
                    checked={this.props.preferredContact === 'phone'}
                    onChange={this.onChange}
                  />
                  <label htmlFor="phone">Phone</label>
                </div>
                <div className="radio radio-inline">
                  <input type="radio" name="preferredContact" id="email" value="email"
                    checked={this.props.preferredContact === 'email'}
                    onChange={this.onChange}
                  />
                  <label htmlFor="email">Email</label>
                </div>
                <div className="radio radio-inline">
                  <input type="radio" name="preferredContact" id="social" value="social"
                    checked={this.props.preferredContact === 'social'}
                    onChange={this.onChange}
                  />
                  <label htmlFor="social">Wechat</label>
                </div>
              </div>



              <div className={`form-group ${this.props.propertyFeatureValidateState}`}>
                <div className="control-label">Property Features</div>
                <div className="checkbox checkbox-inline">
                  <input type="checkbox" name="propertyFeature" id="furnished"
                    value="furnished"
                    checked={_.contains(this.props.propertyFeature, 'furnished')}
                    onChange={this.onCheckboxChange}
                  />
                  <label htmlFor="furnished">Furnished</label>
                </div>
                <div className="checkbox checkbox-inline">
                  <input type="checkbox" name="propertyFeature" id="femalePrefer"
                    value="femalePrefer"
                    checked={_.contains(this.props.propertyFeature, 'femalePrefer')}
                    onChange={this.onCheckboxChange}
                  />
                  <label htmlFor="femalePrefer">Female Prefer</label>
                </div>
                <div className="checkbox checkbox-inline">
                  <input type="checkbox" name="propertyFeature" id="nonSmoker"
                    value="nonSmoker"
                    checked={_.contains(this.props.propertyFeature, 'nonSmoker')}
                    onChange={this.onCheckboxChange}
                  />
                  <label htmlFor="nonSmoker">Non Smoker</label>
                </div>
                <div className="checkbox checkbox-inline">
                  <input type="checkbox" name="propertyFeature" id="petAllowed"
                    value="petAllowed"
                    checked={_.contains(this.props.propertyFeature, 'petAllowed')}
                    onChange={this.onCheckboxChange}
                  />
                  <label htmlFor="petAllowed">Pet Allowed</label>
                </div>
                <div className="checkbox checkbox-inline">
                  <input type="checkbox" name="propertyFeature" id="billInclude"
                    value="billInclude"
                    checked={_.contains(this.props.propertyFeature, 'billInclude')}
                    onChange={this.onCheckboxChange}
                  />
                  <label htmlFor="billInclude">Bill Included</label>
                </div>
                <div className="checkbox checkbox-inline">
                  <input type="checkbox" name="propertyFeature" id="fastInternet"
                    value="fastInternet"
                    checked={_.contains(this.props.propertyFeature, 'fastInternet')}
                    onChange={this.onCheckboxChange}
                  />
                  <label htmlFor="fastInternet">Fast Internet</label>
                </div>
              </div>
              <div className={`form-group ${this.props.bondValidateState}`}>
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
              <button type="submit" className="btn btn-primary">Submit</button>
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
  availableStart: React.PropTypes.object,
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
  roomTypeValidateState: React.PropTypes.string,
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
  files: React.PropTypes.array
}

export default connectToStores(AddProperty)
