import React from 'react';
import AddPropertyStore from '../stores/AddPropertyStore';
import AddPropertyActions from '../actions/AddPropertyActions';

class AddProperty extends React.Component {
  constructor(props) {
    super(props);
    this.state = AddPropertyStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    AddPropertyStore.listen(this.onChange);
  }

  componentWillUnmount() {
    AddPropertyStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleSubmit(event) {
    event.preventDefault();

    var name = this.state.name.trim();
    var gender = this.state.gender;

    if (!name) {
      AddPropertyActions.invalidName();
      this.refs.nameTextField.getDOMNode().focus();
    }

    if (!gender) {
      AddPropertyActions.invalidGender();
    }

    if (name && gender) {
      AddPropertyActions.AddProperty(name, gender);
    }
  }

  render() {
    return (
      <div className='container'>
        <div className='row flipInX animated'>
          <div className='col-sm-8'>
            <div className='panel panel-default'>
              <div className='panel-heading'>Add Property</div>
              <div className='panel-body'>
                <form onSubmit={this.handleSubmit.bind(this)}>
                  <div className={'form-group ' + this.state.suburbValidateState}>
                    <label className='control-label'>Suburb</label>
                    <input type='text' className='form-control' ref='suburbTextField' value={this.state.suburb}
                           onChange={AddPropertyActions.updateSuburb} autoFocus/>
                    <span className='help-block'>{this.state.suburbHelpBlock}</span>
                  </div>
                  <div className={'form-group ' + this.state.postcodeValidateState}>
                    <label className='control-label'>Postcode</label>
                    <input type='text' className='form-control' ref='postcodeTextField' value={this.state.postcode}
                           onChange={AddPropertyActions.updatePostcode}/>
                    <span className='help-block'>{this.state.postcodeHelpBlock}</span>
                  </div>
                  <div className={'form-group ' + this.state.priceValidateState}>
                    <label className='control-label'>Price</label>
                    <input type='text' className='form-control' ref='priceTextField' value={this.state.price}
                           onChange={AddPropertyActions.updatePrice}/>
                    <span className='help-block'>{this.state.priceHelpBlock}</span>
                  </div>
                  <div className={'form-group ' + this.state.addressValidateState}>
                    <label className='control-label'>Address</label>
                    <input type='text' className='form-control' ref='addressTextField' value={this.state.address}
                           onChange={AddPropertyActions.updateAddress}/>
                    <span className='help-block'>{this.state.addressHelpBlock}</span>
                  </div>
                  <div className={'form-group ' + this.state.titleValidateState}>
                    <label className='control-label'>Title</label>
                    <input type='text' className='form-control' ref='titleTextField' value={this.state.title}
                           onChange={AddPropertyActions.updateTitle}/>
                    <span className='help-block'>{this.state.titleHelpBlock}</span>
                  </div>
                  <div className={'form-group ' + this.state.detailsValidateState}>
                    <label className='control-label'>Details</label>
                    <input type='text' className='form-control' ref='detailsTextField' value={this.state.details}
                           onChange={AddPropertyActions.updateDetails}/>
                    <span className='help-block'>{this.state.detailsHelpBlock}</span>
                  </div>
                  <div className={'form-group ' + this.state.propertyTypeValidateState}>
                    <div className='control-label'>Property Type</div>
                    <div className='radio radio-inline'>
                      <input type='radio' name='propertyType' id='apartment' value='apartment'
                             checked={this.state.propertyType === 'apartment'}
                             onChange={AddPropertyActions.updatePropertyType}/>
                      <label htmlFor='apartment'>Apartment</label>
                    </div>
                    <div className='radio radio-inline'>
                      <input type='radio' name='propertyType' id='unit' value='unit'
                             checked={this.state.propertyType === 'unit'}
                             onChange={AddPropertyActions.updatePropertyType}/>
                      <label htmlFor='unit'>Unit</label>
                    </div>
                    <div className='radio radio-inline'>
                      <input type='radio' name='propertyType' id='house' value='house'
                             checked={this.state.propertyType === 'house'}
                             onChange={AddPropertyActions.updatePropertyType}/>
                      <label htmlFor='house'>House/Townhouse</label>
                    </div>
                  </div>
                  <div className={'form-group ' + this.state.roomTypeValidateState}>
                    <div className='control-label'>Room Type</div>
                    <div className='radio radio-inline'>
                      <input type='radio' name='roomType' id='single' value='single'
                             checked={this.state.roomType === 'single'}
                             onChange={AddPropertyActions.updateRoomType}/>
                      <label htmlFor='single'>Single Room</label>
                    </div>
                    <div className='radio radio-inline'>
                      <input type='radio' name='roomType' id='shared' value='shared'
                             checked={this.state.roomType === 'shared'}
                             onChange={AddPropertyActions.updateRoomType}/>
                      <label htmlFor='shared'>Shared Room</label>
                    </div>
                    <div className='radio radio-inline'>
                      <input type='radio' name='roomType' id='living' value='living'
                             checked={this.state.roomType === 'living'}
                             onChange={AddPropertyActions.updateRoomType}/>
                      <label htmlFor='living'>Living Room</label>
                    </div>
                    <div className='radio radio-inline'>
                      <input type='radio' name='roomType' id='master' value='master'
                             checked={this.state.roomType === 'master'}
                             onChange={AddPropertyActions.updateRoomType}/>
                      <label htmlFor='master'>Master Room</label>
                    </div>
                  </div>
                  <div className={'form-group ' + this.state.contactNameValidateState}>
                    <label className='control-label'>Contact Name</label>
                    <input type='text' className='form-control' ref='contactNameTextField' value={this.state.contactName}
                           onChange={AddPropertyActions.updateContactName}/>
                    <span className='help-block'>{this.state.contactNameHelpBlock}</span>
                  </div>
                  <div className={'form-group ' + this.state.contactNumberValidateState}>
                    <label className='control-label'>Contact Name</label>
                    <input type='text' className='form-control' ref='contactNumberTextField' value={this.state.contactNumber}
                           onChange={AddPropertyActions.updateContactNumber}/>
                    <span className='help-block'>{this.state.contactNumberHelpBlock}</span>
                  </div>
                  <div className={'form-group ' + this.state.contactEmailValidateState}>
                    <label className='control-label'>Contact Email</label>
                    <input type='text' className='form-control' ref='contactEmailTextField' value={this.state.contactEmail}
                           onChange={AddPropertyActions.updateContactEmail}/>
                    <span className='help-block'>{this.state.contactEmailHelpBlock}</span>
                  </div>
                  <div className={'form-group ' + this.state.contactSocialValidateState}>
                    <label className='control-label'>Wechat</label>
                    <input type='text' className='form-control' ref='contactNameTextField' value={this.state.contactSocial}
                           onChange={AddPropertyActions.updateContactSocial}/>
                    <span className='help-block'>{this.state.contactSocialHelpBlock}</span>
                  </div>
                  <div className={'form-group ' + this.state.preferredContactValidateState}>
                    <div className='control-label'>Preferred Contact Method</div>
                    <div className='radio radio-inline'>
                      <input type='radio' name='preferredContact' id='phone' value='phone'
                             checked={this.state.preferredContact === 'phone'}
                             onChange={AddPropertyActions.updatePreferredContact}/>
                      <label htmlFor='phone'>Phone</label>
                    </div>
                    <div className='radio radio-inline'>
                      <input type='radio' name='preferredContact' id='email' value='email'
                             checked={this.state.preferredContact === 'email'}
                             onChange={AddPropertyActions.updatePreferredContact}/>
                      <label htmlFor='email'>Email</label>
                    </div>
                    <div className='radio radio-inline'>
                      <input type='radio' name='preferredContact' id='social' value='social'
                             checked={this.state.preferredContact === 'social'}
                             onChange={AddPropertyActions.updatePreferredContact}/>
                      <label htmlFor='social'>Wechat</label>
                    </div>
                  </div>
                  <div className={'form-group ' + this.state.bondValidateState}>
                    <label className='control-label'>Bond</label>
                    <input type='text' className='form-control' ref='bondTextField' value={this.state.bond}
                           onChange={AddPropertyActions.updateBond}/>
                    <span className='help-block'>{this.state.bondHelpBlock}</span>
                  </div>
                  <div className={'form-group ' + this.state.availableStartValidateState}>
                    <label className='control-label'>Available Date</label>
                    <input type='text' className='form-control' ref='availableStartTextField' value={this.state.availableStart}
                           onChange={AddPropertyActions.updateAvailableStart}/>
                    <span className='help-block'>{this.state.availableStartHelpBlock}</span>
                  </div>
                  <div className={'form-group ' + this.state.minTermValidateState}>
                    <label className='control-label'>Available Date</label>
                    <input type='text' className='form-control' ref='minTermTextField' value={this.state.minTerm}
                           onChange={AddPropertyActions.updateMinTerm}/>
                    <span className='help-block'>{this.state.minTermHelpBlock}</span>
                  </div>
                  <div className={'form-group ' + this.state.propertyFeatureValidateState}>
                    <div className='control-label'>Property Features</div>
                    <div className='checkbox checkbox-inline'>
                      <input type='checkbox' name='propertyFeature' id='furnished' value='furnished'
                             checked={this.state.propertyFeature === 'furnished'}
                             onChange={AddPropertyActions.updatePropertyFeature}/>
                      <label htmlFor='furnished'>Furnished</label>
                    </div>
                    <div className='checkbox checkbox-inline'>
                      <input type='checkbox' name='propertyFeature' id='femalePrefer' value='femalePrefer'
                             checked={this.state.propertyFeature === 'femalePrefer'}
                             onChange={AddPropertyActions.updatePropertyFeature}/>
                      <label htmlFor='femalePrefer'>Female Prefer</label>
                    </div>
                    <div className='checkbox checkbox-inline'>
                      <input type='checkbox' name='propertyFeature' id='nonSmoker' value='nonSmoker'
                             checked={this.state.propertyFeature === 'nonSmoker'}
                             onChange={AddPropertyActions.updatePropertyFeature}/>
                      <label htmlFor='nonSmoker'>Non Smoker</label>
                    </div>
                    <div className='checkbox checkbox-inline'>
                      <input type='checkbox' name='propertyFeature' id='petAllowed' value='petAllowed'
                             checked={this.state.propertyFeature === 'petAllowed'}
                             onChange={AddPropertyActions.updatePropertyFeature}/>
                      <label htmlFor='petAllowed'>Pet Allowed</label>
                    </div>
                    <div className='checkbox checkbox-inline'>
                      <input type='checkbox' name='propertyFeature' id='billInclude' value='billInclude'
                             checked={this.state.propertyFeature === 'billInclude'}
                             onChange={AddPropertyActions.updatePropertyFeature}/>
                      <label htmlFor='billInclude'>Bill Included</label>
                    </div>
                    <div className='checkbox checkbox-inline'>
                      <input type='checkbox' name='propertyFeature' id='fastInternet' value='fastInternet'
                             checked={this.state.propertyFeature === 'fastInternet'}
                             onChange={AddPropertyActions.updatePropertyFeature}/>
                      <label htmlFor='fastInternet'>Fast Internet</label>
                    </div>
                  </div>
                  <button type='submit' className='btn btn-primary'>Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddProperty;
