import React from 'react';
import PropertyStore from '../stores/PropertyStore';
import PropertyActions from '../actions/PropertyActions';
import PropertyFeature from './PropertyFeature';

class Property extends React.Component {
  constructor(props) {
    super(props);
    this.state = PropertyStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    PropertyStore.listen(this.onChange);
    PropertyActions.getProperty(this.props.params.id);

    $('.magnific-popup').magnificPopup({
      type: 'image',
      mainClass: 'mfp-zoom-in',
      closeOnContentClick: true,
      midClick: true,
      zoom: {
        enabled: true,
        duration: 300
      }
    });
  }

  componentWillUnmount() {
    PropertyStore.unlisten(this.onChange);
    $(document.body).removeClass();
  }

  componentDidUpdate(prevProps) {
    // Fetch new property data when URL path changes
    if (prevProps.params.id !== this.props.params.id) {
      PropertyActions.getProperty(this.props.params.id);
    }
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    return (
      <div className='container'>
        <div className='property-img'>
          <a className='magnific-popup' href='#'>
            <img src='/img/grid-offer.jpg' />
          </a>
        </div>
        <div className='row'>
          <div className="property-info col-sm-6">
            <h3><strong>Property Details:</strong></h3>
            <h4 className='lead'>Suburb: <strong>{this.state.suburb}, {this.state.postcode}</strong></h4>
            <h4 className='lead'>Address: <strong>{this.state.address}</strong></h4>
            <h4 className='lead'>Price: <strong>${this.state.price}</strong> per week</h4>
            <h4 className='lead'>Property Type: <strong>{this.state.propertyType}</strong></h4>
            <h4 className='lead'>Room Type: <strong>{this.state.roomType}</strong></h4>
          </div>
          <div className="contact-details col-sm-6">
            <h3><strong>Contact Details:</strong></h3>
            <h4 className='lead'>Name: <strong>{this.state.contactName}</strong></h4>
            <h4 className='lead'>Phone Number: <strong>{this.state.contactNumber}</strong></h4>
            <h4 className='lead'>Email: <strong>{this.state.contactEmail}</strong></h4>
            <h4 className='lead'>Social Network: <strong>{this.state.contactSocial}</strong> (Preferred)</h4>
          </div>
        </div>
        <hr/>
        <div className="row">
          <h2><strong>{this.state.title}</strong></h2>
          <h4 className='lead'>Details: <strong>{this.state.details}</strong></h4>
        </div>
        <hr/>
        <div className='row'>
          <div className='property-feature col-sm-6'>
            <h3 className='lead'><strong>Property Feature: </strong></h3>
            <PropertyFeature propertyFeatures={this.state.propertyFeature} />
          </div>
          <div className='lease-details col-sm-6'>
            <h3 className='lead'><strong>Lease Details:</strong></h3>
            <ul>
              <li><strong>{this.state.bond}</strong> weeks bond</li>
              <li>Minimum <strong>{this.state.minTerm}</strong> month(s) lease</li>
              <li>Available at <strong>{this.state.availableStart}</strong></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Property;
