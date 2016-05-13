import React, {Component, PropTypes} from 'react'
import Navbar from './Navbar'
import Select from 'react-select'
import AutoSuggest from 'react-autosuggest'
import DatePicker from 'react-datepicker'
import counterpart from 'counterpart'
import Dropzone from 'react-dropzone'
import moment from 'moment'

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

export default class AddProperty extends Component {

  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {

  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.property.property && !nextProps.property.error) {
      this.context.router.push('/');
    }
  }

  renderError(property) {
    if(property && property.error && property.error.message) {
      return (
          <div className="alert alert-danger">
            {property ? property.error.message : ''}
          </div>
      );
    } else {
      return <span></span>
    }
  }

  renderSuggestion(suggestion) {
    return (
        <span>{suggestion.label}</span>
    )
  }

  getSuggestionValue(suggestion) {
    return suggestion.value;
  }

  render() {

    const {fields: { price, bond, availableStart, minTerm, suburb, postcode, suburbSearch, address, title, details, propertyType, roomType,
        propertyFeature, files, imageCount, contactName, contactNumber, contactEmail, contactSocial, preferredContact }, 
        handleSubmit, submitting, property, onChange, onSuggestionsUpdateRequested, onFormChange, onBondChange, onAvailableStartChange,
        onMintermChange, onPropertyTypeChange, onRoomTypeChange, onPropertyFeatureChange, onDropFiles } = this.props;

    console.log(this.props);

    const value = property.suggestions.value.trim();
    if (value.indexOf(',') > -1) {
      var suburbArr = value.split(',');
      property.suburb = suburbArr[0].trim();
      property.postcode = suburbArr[1].trim();
    }

    const theme = {
      input: 'form-control',
      suggestionsContainer: 'search-results',
      suggestion: 'search-list-item'
    }
    const inputProps = {
      placeholder: counterpart('nav.search.placeholder'),
      value: property.suggestions.value,
      onChange,
      type: 'search'
    }
    
    const bondOptions = [
      { value: '0', label: 'No bond required' },
      { value: '2', label: '2 weeks bond' },
      { value: '4', label: '4 weeks bond' }
    ]

    const termOptions = [
      { value: '0', label: 'No minimum term' },
      { value: '1', label: 'At least 1 month' },
      { value: '2', label: 'At least 2 months' },
      { value: '4', label: 'At least 4 months' },
      { value: '6', label: 'At least 6 months' },
      { value: '8', label: 'At least 8 months' },
      { value: '12', label: 'At least 1 year' }
    ]

    const propertyTypeOptions = [
      { value: 'apartment', label: 'Apartment/Unit' },
      { value: 'studio', label: 'Studio' },
      { value: 'house', label: 'House/Townhouse' },
      { value: 'whole', label: 'Entire flat' }
    ]

    const roomTypeOptions = [
      { value: 'private', label: 'Single Room' },
      { value: 'shared', label: 'Shared Room' },
      { value: 'living', label: 'Living Room' },
      { value: 'master', label: 'Master Room' }
    ]

    const propertyFeatureOptions = [
      { value: 'furnished', label: 'Furnished' },
      { value: 'femalePrefer', label: 'Female Prefer' },
      { value: 'nonSmoker', label: 'Non Smoker' },
      { value: 'petAllowed', label: 'Pet Allowed' },
      { value: 'billInclude', label: 'Bill Included' },
      { value: 'fastInternet', label: 'Fast Internet' }
    ]

    return (
        <div>
          <Navbar pageFlag="addProperty" />
          <div className="container">
            {
                property.loading ? <div className="loading">Loading&#8230;</div> : ''
            }

            <h2>Add Property</h2>
            {this.renderError(property)}
            <form onSubmit={handleSubmit(this.props.addProperty.bind(this))} onChange={(e)=>onFormChange(e)} className="form-horizontal">
              <section className="basic">
                <div className={`form-group ${price.touched && price.invalid ? 'has-error' : ''}`}>
                  <label className="col-sm-3 control-label">Rent per week $(*)</label>
                  <div className="col-sm-9">
                    <input type="number" className="form-control" autofocus {...price}/>
                    <span className="help-block">{price.touched ? price.error : ''}</span>
                  </div>
                </div>
                <div className={`form-group`}>
                  <label className="col-sm-3 control-label">How many weeks bond</label>
                  <div className="col-sm-9">
                    <Select
                        simpleValue
                        value={bond.value}
                        options={bondOptions}
                        {...bond}
                        onBlur={() => bond.onBlur(bond.value)}
                        onChange={onBondChange}
                    />
                  </div>
                </div>
                <div className={`form-group`}>
                  <label className="col-sm-3 control-label">Available Date</label>
                  <div className="col-sm-9">
                    <DatePicker
                        className="form-control"
                        dateFormat="YYYY-MM-DD"
                        minDate={moment()}
                        selected={availableStart.value ? moment(availableStart.value) : moment() }
                        {...availableStart}
                        onChange={onAvailableStartChange}
                    />
                  </div>
                </div>
                <div className={`form-group`}>
                  <label className="col-sm-3 control-label">Minimum Terms</label>
                  <div className="col-sm-9">
                    <Select
                        simpleValue
                        value={minTerm.value}
                        options={termOptions}
                        {...minTerm}
                        onBlur={() => minTerm.onBlur(minTerm.value)}
                        onChange={onMintermChange}
                    />
                  </div>
                </div>
              </section>

              <section className="address">
                <div className={`form-group ${suburbSearch.touched && suburbSearch.invalid ? 'has-error' : ''}`}>
                  <label className="col-sm-3 control-label">Suburb or postcode(*)</label>
                  <div className="col-sm-9">
                    <AutoSuggest
                      theme={theme}
                      suggestions={property.suggestions.suburbs}
                      onSuggestionsUpdateRequested={onSuggestionsUpdateRequested}
                      getSuggestionValue={this.getSuggestionValue}
                      renderSuggestion={this.renderSuggestion}
                      inputProps={inputProps}
                      />
                    <span className="help-block">{suburbSearch.touched ? suburbSearch.error : ''}</span>
                  </div>
                </div>

                <div className={`form-group ${address.touched && address.invalid ? 'has-error' : ''}`}>
                  <label className="col-sm-3 control-label">Address(*)</label>
                  <div className="col-sm-9">
                    <input type="text" className="form-control" {...address}/>
                    <span className="help-block">{address.touched ? address.error : ''}</span>
                  </div>
                </div>
              </section>

              <section className="details">
                <div className={`form-group`}>
                  <label className="col-sm-3 control-label">Title</label>
                  <div className="col-sm-9">
                    <input type="text" className="form-control" {...title}/>
                  </div>
                </div>
                <div className={`form-group`}>
                  <label className="col-sm-3 control-label">Details</label>
                  <div className="col-sm-9">
                    <textarea
                        rows="4"
                        className="form-control"
                        {...details}
                    />
                  </div>
                </div>
                <div className={`form-group ${propertyType.touched && propertyType.invalid ? 'has-error' : ''}`}>
                  <label className="col-sm-3 control-label">Property Type(*)</label>
                  <div className="col-sm-9">
                    <Select
                        simpleValue
                        value={propertyType.value}
                        options={propertyTypeOptions}
                        {...propertyType}
                        onBlur={() => propertyType.onBlur(propertyType.value)}
                        onChange={onPropertyTypeChange}
                    />
                    <span className="help-block">{propertyType.touched ? propertyType.error : ''}</span>
                  </div>
                </div>
                <div className={`form-group ${roomType.touched && roomType.invalid ? 'has-error' : ''}`}>
                  <label className="col-sm-3 control-label">Room Type(*)</label>
                  <div className="col-sm-9">
                    <Select
                        simpleValue
                        value={roomType.value}
                        options={roomTypeOptions}
                        {...roomType}
                        onBlur={() => roomType.onBlur(roomType.value)}
                        onChange={onRoomTypeChange}
                    />
                    <span className="help-block">{roomType.touched ? roomType.error : ''}</span>
                  </div>
                </div>
                <div className={`form-group`}>
                  <label className="col-sm-3 control-label">Property Feature</label>
                  <div className="col-sm-9">
                    <Select
                        multi
                        value={propertyFeature.value}
                        options={propertyFeatureOptions}
                        {...propertyFeature}
                        onBlur={() => propertyFeature.onBlur(propertyFeature.value)}
                        onChange={onPropertyFeatureChange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-sm-3 control-label">Property Images</label>
                  <div className="col-sm-9">
                    <Dropzone {...files} onDrop={onDropFiles} style={DropzoneStyles}>
                      <div style={TextCenterDivStyles}>
                        Drop photos here or click to select photos to upload.
                      </div>
                    </Dropzone>
                    {
                      property.files ?
                          <div>
                            <div>
                              {
                                property.files.map((file, i) =>
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
                <div className={`form-group ${contactName.touched && contactName.invalid ? 'has-error' : ''}`}>
                  <label className="col-sm-3 control-label">Contact Name(*)</label>
                  <div className="col-sm-9">
                    <input type="text" className="form-control" {...contactName}/>
                    <span className="help-block">{contactName.touched ? contactName.error : ''}</span>
                  </div>
                </div>
                <div className={`form-group ${contactNumber.touched && contactNumber.invalid ? 'has-error' : ''}`}>
                  <label className="col-sm-3 control-label">Contact Number(*)</label>
                  <div className="col-sm-9">
                    <input type="text" className="form-control" {...contactNumber}/>
                  </div>
                </div>
                <div className={`form-group ${contactEmail.touched && contactEmail.invalid ? 'has-error' : ''}`}>
                  <label className="col-sm-3 control-label">Contact Email(*)</label>
                  <div className="col-sm-9">
                    <input type="email" className="form-control" {...contactEmail}/>
                  </div>
                </div>
                <div className={`form-group ${contactSocial.touched && contactSocial.invalid ? 'has-error' : ''}`}>
                  <label className="col-sm-3 control-label">Wechat(*)</label>
                  <div className="col-sm-9">
                    <input type="text" className="form-control" {...contactSocial}/>
                    <span className="help-block">{contactSocial.touched ? contactSocial.error : ''}</span>
                  </div>
                </div>
              </section>
              <button type="submit" className="add-property-submit btn btn-primary pull-right" disabled={submitting} >Submit</button>
            </form>
          </div>
        </div>
    )
  }
}

