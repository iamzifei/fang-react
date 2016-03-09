import React from 'react'
import Dropzone from 'react-dropzone'

import PropertyStore from '../stores/PropertyStore'
import PropertyActions from '../actions/PropertyActions'

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
  cursor: 'hand', // ToDo: cursor style is not working (nj)
}

const ImagePreviewStyles = {
  height: '80px',
  margin: '2px',
}

class AddProperty extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}

    this.onChange = this.onChange.bind(this)
    this.onFieldChange = this.onFieldChange.bind(this)
    this.onDrop = this.onDrop.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    PropertyStore.listen(this.onChange)
    PropertyActions.initState()
  }

  componentWillUnmount() {
    PropertyStore.unlisten(this.onChange)
  }

  onChange(state) {
    this.setState(state)
  }

  onFieldChange(event) {
    PropertyActions.fieldValueChanges({
      fieldName: event.target.name,
      fieldValue: event.target.value
    })
  }

  onDrop(files) {
    PropertyActions.selectFilesToUpload(files)
  }

  handleSubmit(event) {
    event.preventDefault()
    PropertyActions.addProperty(this.state)
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-8">
            <div className="panel panel-default">
              <div className="panel-heading">Add Property</div>
              <div className="panel-body">
                <form onSubmit={this.handleSubmit}>
                  <div className={`form-group ${this.state.suburbValidateState}`}>
                    <label className="control-label">Suburb</label>
                    <input type="text" className="form-control" ref="suburbTextField"
                      value={this.state.suburb} name="suburb" onChange={this.onFieldChange}
                      autoFocus
                    />
                    <span className="help-block">{this.state.suburbHelpBlock}</span>
                  </div>
                  <div className={`form-group ${this.state.postcodeValidateState}`}>
                    <label className="control-label">Postcode</label>
                    <input type="text" className="form-control" ref="postcodeTextField"
                      value={this.state.postcode} name="postcode" onChange={this.onFieldChange}
                    />
                    <span className="help-block">{this.state.postcodeHelpBlock}</span>
                  </div>
                  <div className={`form-group ${this.state.priceValidateState}`}>
                    <label className="control-label">Price</label>
                    <input type="text" className="form-control" ref="priceTextField"
                      value={this.state.price} name="price" onChange={this.onFieldChange}
                    />
                    <span className="help-block">{this.state.priceHelpBlock}</span>
                  </div>
                  <div className={`form-group ${this.state.addressValidateState}`}>
                    <label className="control-label">Address</label>
                    <input type="text" className="form-control" ref="addressTextField"
                      value={this.state.address} name="address" onChange={this.onFieldChange}
                    />
                    <span className="help-block">{this.state.addressHelpBlock}</span>
                  </div>
                  <div className={`form-group ${this.state.titleValidateState}`}>
                    <label className="control-label">Title</label>
                    <input type="text" className="form-control" ref="titleTextField"
                      value={this.state.title} name="title" onChange={this.onFieldChange}
                    />
                    <span className="help-block">{this.state.titleHelpBlock}</span>
                  </div>
                  <div className={`form-group ${this.state.detailsValidateState}`}>
                    <label className="control-label">Details</label>
                    <input type="text" className="form-control" ref="detailsTextField"
                      value={this.state.details} name="details" onChange={this.onFieldChange}
                    />
                    <span className="help-block">{this.state.detailsHelpBlock}</span>
                  </div>
                  <div className={`form-group ${this.state.propertyTypeValidateState}`}>
                    <div className="control-label">Property Type</div>
                    <div className="radio radio-inline">
                      <input type="radio" name="propertyType" id="apartment" value="apartment"
                        checked={this.state.propertyType === 'apartment'}
                        onChange={this.onFieldChange}
                      />
                      <label htmlFor="apartment">Apartment/Unit</label>
                    </div>
                    <div className="radio radio-inline">
                      <input type="radio" name="propertyType" id="studio" value="studio"
                        checked={this.state.propertyType === 'studio'}
                        onChange={this.onFieldChange}
                      />
                      <label htmlFor="unit">Studio</label>
                    </div>
                    <div className="radio radio-inline">
                      <input type="radio" name="propertyType" id="house" value="house"
                        checked={this.state.propertyType === 'house'}
                        onChange={this.onFieldChange}
                      />
                      <label htmlFor="house">House/Townhouse</label>
                    </div>
                    <div className="radio radio-inline">
                      <input type="radio" name="propertyType" id="whole" value="whole"
                        checked={this.state.propertyType === 'whole'}
                        onChange={this.onFieldChange}
                      />
                      <label htmlFor="unit">Entire flat</label>
                    </div>
                  </div>
                  <div className={`form-group ${this.state.roomTypeValidateState}`}>
                    <div className="control-label">Room Type</div>
                    <div className="radio radio-inline">
                      <input type="radio" name="roomType" id="private" value="private"
                        checked={this.state.roomType === 'private'} onChange={this.onFieldChange}
                      />
                      <label htmlFor="single">Single Room</label>
                    </div>
                    <div className="radio radio-inline">
                      <input type="radio" name="roomType" id="shared" value="shared"
                        checked={this.state.roomType === 'shared'} onChange={this.onFieldChange}
                      />
                      <label htmlFor="shared">Shared Room</label>
                    </div>
                    <div className="radio radio-inline">
                      <input type="radio" name="roomType" id="living" value="living"
                        checked={this.state.roomType === 'living'} onChange={this.onFieldChange}
                      />
                      <label htmlFor="living">Living Room</label>
                    </div>
                    <div className="radio radio-inline">
                      <input type="radio" name="roomType" id="master" value="master"
                        checked={this.state.roomType === 'master'} onChange={this.onFieldChange}
                      />
                      <label htmlFor="master">Master Room</label>
                    </div>
                  </div>
                  <div className={`form-group ${this.state.contactNameValidateState}`}>
                    <label className="control-label">Contact Name</label>
                    <input type="text" className="form-control" ref="contactNameTextField"
                      value={this.state.contactName} name="contactName"
                      onChange={this.onFieldChange}
                    />
                    <span className="help-block">{this.state.contactNameHelpBlock}</span>
                  </div>
                  <div className={`form-group ${this.state.contactNumberValidateState}`}>
                    <label className="control-label">Contact Name</label>
                    <input type="text" className="form-control" ref="contactNumberTextField"
                      value={this.state.contactNumber} name="contactNumber"
                      onChange={this.onFieldChange}
                    />
                    <span className="help-block">{this.state.contactNumberHelpBlock}</span>
                  </div>
                  <div className={`form-group ${this.state.contactEmailValidateState}`}>
                    <label className="control-label">Contact Email</label>
                    <input type="text" className="form-control" ref="contactEmailTextField"
                      value={this.state.contactEmail} name="contactEmail"
                      onChange={this.onFieldChange}
                    />
                    <span className="help-block">{this.state.contactEmailHelpBlock}</span>
                  </div>
                  <div className={`form-group ${this.state.contactSocialValidateState}`}>
                    <label className="control-label">Wechat</label>
                    <input type="text" className="form-control" ref="contactNameTextField"
                      value={this.state.contactSocial} onChange={this.onFieldChange}
                    />
                    <span className="help-block">{this.state.contactSocialHelpBlock}</span>
                  </div>
                  <div className={`form-group ${this.state.preferredContactValidateState}`}>
                    <div className="control-label">Preferred Contact Method</div>
                    <div className="radio radio-inline">
                      <input type="radio" name="preferredContact" id="phone" value="phone"
                        checked={this.state.preferredContact === 'phone'}
                        onChange={this.onFieldChange}
                      />
                      <label htmlFor="phone">Phone</label>
                    </div>
                    <div className="radio radio-inline">
                      <input type="radio" name="preferredContact" id="email" value="email"
                        checked={this.state.preferredContact === 'email'}
                        onChange={this.onFieldChange}
                      />
                      <label htmlFor="email">Email</label>
                    </div>
                    <div className="radio radio-inline">
                      <input type="radio" name="preferredContact" id="social" value="social"
                        checked={this.state.preferredContact === 'social'}
                        onChange={this.onFieldChange}
                      />
                      <label htmlFor="social">Wechat</label>
                    </div>
                  </div>
                  <div className={`form-group ${this.state.bondValidateState}`}>
                    <label className="control-label">Bond</label>
                    <input type="text" className="form-control" ref="bondTextField"
                      value={this.state.bond} name="bond"
                      onChange={this.onFieldChange}
                    />
                    <span className="help-block">{this.state.bondHelpBlock}</span>
                  </div>
                  <div className={`form-group ${this.state.availableStartValidateState}`}>
                    <label className="control-label">Available Date</label>
                    <input type="text" className="form-control" ref="availableStartTextField"
                      value={this.state.availableStart} name="availableStart"
                      onChange={this.onFieldChange}
                    />
                    <span className="help-block">{this.state.availableStartHelpBlock}</span>
                  </div>
                  <div className={`form-group ${this.state.minTermValidateState}`}>
                    <label className="control-label">Available Date</label>
                    <input type="text" className="form-control" ref="minTermTextField"
                      value={this.state.minTerm} name="minTerm"
                      onChange={this.onFieldChange}
                    />
                    <span className="help-block">{this.state.minTermHelpBlock}</span>
                  </div>
                  <div className={`form-group ${this.state.propertyFeatureValidateState}`}>
                    <div className="control-label">Property Features</div>
                    <div className="checkbox checkbox-inline">
                      <input type="checkbox" name="propertyFeature" id="furnished"
                        value="furnished" checked={this.state.propertyFeature === 'furnished'}
                        onChange={this.onFieldChange}
                      />
                      <label htmlFor="furnished">Furnished</label>
                    </div>
                    <div className="checkbox checkbox-inline">
                      <input type="checkbox" name="propertyFeature" id="femalePrefer"
                        value="femalePrefer" checked={this.state.propertyFeature === 'femalePrefer'}
                        onChange={this.onFieldChange}
                      />
                      <label htmlFor="femalePrefer">Female Prefer</label>
                    </div>
                    <div className="checkbox checkbox-inline">
                      <input type="checkbox" name="propertyFeature" id="nonSmoker"
                        value="nonSmoker" checked={this.state.propertyFeature === 'nonSmoker'}
                        onChange={this.onFieldChange}
                      />
                      <label htmlFor="nonSmoker">Non Smoker</label>
                    </div>
                    <div className="checkbox checkbox-inline">
                      <input type="checkbox" name="propertyFeature" id="petAllowed"
                        value="petAllowed" checked={this.state.propertyFeature === 'petAllowed'}
                        onChange={this.onFieldChange}
                      />
                      <label htmlFor="petAllowed">Pet Allowed</label>
                    </div>
                    <div className="checkbox checkbox-inline">
                      <input type="checkbox" name="propertyFeature" id="billInclude"
                        value="billInclude" checked={this.state.propertyFeature === 'billInclude'}
                        onChange={this.onFieldChange}
                      />
                      <label htmlFor="billInclude">Bill Included</label>
                    </div>
                    <div className="checkbox checkbox-inline">
                      <input type="checkbox" name="propertyFeature" id="fastInternet"
                        value="fastInternet" checked={this.state.propertyFeature === 'fastInternet'}
                        onChange={this.onFieldChange}
                      />
                      <label htmlFor="fastInternet">Fast Internet</label>
                    </div>
                  </div>
                  <div className={`form-group ${this.state.bondValidateState}`}>
                    <Dropzone onDrop={this.onDrop} style={DropzoneStyles}>
                      <div style={TextCenterDivStyles}>
                        Drop photos here or click to select photos to upload.
                      </div>
                    </Dropzone>
                    {
                      this.state.files ?
                        <div>
                          <div>
                            {
                              this.state.files.map((file, i) =>
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
    )
  }
}

export default AddProperty
