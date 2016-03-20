import React from 'react'
import Dropzone from 'react-dropzone'
import Navbar from './Navbar'
import connectToStores from 'alt-utils/lib/connectToStores'
import PropertyStore from '../stores/PropertyStore'
import PropertyActions from '../actions/PropertyActions'
import _ from 'underscore'

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
  }

  onChange(event) {
    PropertyActions.fieldValueChanges({
      fieldName: event.target.name,
      fieldValue: event.target.value
    })
  }

  onCheckboxChange(event) {
    PropertyActions.checkboxValueChanges({
      fieldName: event.target.name,
      fieldValue: event.target.value
    })
  }

  onDrop(files) {
    PropertyActions.selectFilesToUpload(files)
  }

  handleSubmit(e) {
    e.preventDefault()
    PropertyActions.addProperty(this.props)
  }

  render() {
    return (
      <div>
        <Navbar pageFlag="addProperty" />
        <div className="container">
          <div className="row">
            <div className="col-sm-8">
              <div className="panel panel-default">
                <div className="panel-heading">Add Property</div>
                <div className="panel-body">
                  <form onSubmit={this.handleSubmit} >
                    <div className={`form-group ${this.props.suburbValidateState}`}>
                      <label className="control-label">Suburb</label>
                      <input type="text" className="form-control" ref="suburbTextField"
                        value={this.props.suburb} name="suburb" onChange={this.onChange}
                        autoFocus
                      />
                      <span className="help-block">{this.props.suburbHelpBlock}</span>
                    </div>
                    <div className={`form-group ${this.props.postcodeValidateState}`}>
                      <label className="control-label">Postcode</label>
                      <input type="text" className="form-control" ref="postcodeTextField"
                        value={this.props.postcode} name="postcode" onChange={this.onChange}
                      />
                      <span className="help-block">{this.props.postcodeHelpBlock}</span>
                    </div>
                    <div className={`form-group ${this.props.priceValidateState}`}>
                      <label className="control-label">Price</label>
                      <input type="text" className="form-control" ref="priceTextField"
                        value={this.props.price} name="price" onChange={this.onChange}
                      />
                      <span className="help-block">{this.props.priceHelpBlock}</span>
                    </div>
                    <div className={`form-group ${this.props.addressValidateState}`}>
                      <label className="control-label">Address</label>
                      <input type="text" className="form-control" ref="addressTextField"
                        value={this.props.address} name="address" onChange={this.onChange}
                      />
                      <span className="help-block">{this.props.addressHelpBlock}</span>
                    </div>
                    <div className={`form-group ${this.props.titleValidateState}`}>
                      <label className="control-label">Title</label>
                      <input type="text" className="form-control" ref="titleTextField"
                        value={this.props.title} name="title" onChange={this.onChange}
                      />
                      <span className="help-block">{this.props.titleHelpBlock}</span>
                    </div>
                    <div className={`form-group ${this.props.detailsValidateState}`}>
                      <label className="control-label">Details</label>
                      <input type="text" className="form-control" ref="detailsTextField"
                        value={this.props.details} name="details" onChange={this.onChange}
                      />
                      <span className="help-block">{this.props.detailsHelpBlock}</span>
                    </div>
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
                    <div className={`form-group ${this.props.bondValidateState}`}>
                      <label className="control-label">Bond</label>
                      <input type="text" className="form-control" ref="bondTextField"
                        value={this.props.bond} name="bond"
                        onChange={this.onChange}
                      />
                      <span className="help-block">{this.props.bondHelpBlock}</span>
                    </div>
                    <div className={`form-group ${this.props.availableStartValidateState}`}>
                      <label className="control-label">Available Date</label>
                      <input type="text" className="form-control" ref="availableStartTextField"
                        value={this.props.availableStart} name="availableStart"
                        onChange={this.onChange}
                      />
                      <span className="help-block">{this.props.availableStartHelpBlock}</span>
                    </div>
                    <div className={`form-group ${this.props.minTermValidateState}`}>
                      <label className="control-label">Minimum Terms</label>
                      <input type="text" className="form-control" ref="minTermTextField"
                        value={this.props.minTerm} name="minTerm"
                        onChange={this.onChange}
                      />
                      <span className="help-block">{this.props.minTermHelpBlock}</span>
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
            </div>
          </div>
        </div>
      </div>
    )
  }
}

AddProperty.propTypes = {
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

  suburbValidateState: React.PropTypes.string,
  suburbHelpBlock: React.PropTypes.string,
  postcodeValidateState: React.PropTypes.string,
  postcodeHelpBlock: React.PropTypes.string,
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
