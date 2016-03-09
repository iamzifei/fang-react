import React from 'react'
import connectToStores from 'alt-utils/lib/connectToStores'
import PropertyStore from '../stores/PropertyStore'
import PropertyActions from '../actions/PropertyActions'
import PropertyFeature from './PropertyFeature'
import GoogleMap from 'google-map-react'
import Carousel from 'nuka-carousel'
import Translate from 'react-translate-component'

class Property extends React.Component {
  static getStores() {
    return [PropertyStore]
  }

  static getPropsFromStores() {
    return PropertyStore.getState()
  }

  constructor(props) {
    super(props)
    this.createImageCarousel = this.createImageCarousel.bind(this)
  }

  componentDidMount() {
    PropertyActions.getProperty(this.props.params.id)

    $('.magnific-popup').magnificPopup({
      type: 'image',
      mainClass: 'mfp-zoom-in',
      closeOnContentClick: true,
      midClick: true,
      zoom: {
        enabled: true,
        duration: 300
      }
    })
  }

  componentDidUpdate(prevProps) {
    // Fetch new property data when URL path changes
    if (prevProps.params.id !== this.props.params.id) {
      PropertyActions.getProperty(this.props.params.id)
    }
  }

  getLatlngByAddress(map, maps, address) {
    var geocoder = new maps.Geocoder()
    geocoder.geocode({ address }, (results, status) => {
      if (status === maps.GeocoderStatus.OK) {
        PropertyActions.updateGeoLocation(results[0].geometry.location.toJSON())
        var infowindow = new maps.InfoWindow({
          content: address
        })
        var marker = new maps.Marker({
          position: results[0].geometry.location,
          map,
          title: '$'
        })
        marker.addListener('click', () => {
          infowindow.open(map, marker)
        })
      }
    })
  }

  createImageCarousel() {
    const Decorators = [
      {
        component: React.createClass({
          render() {
            return (
              <button
                style={this.getButtonStyles(this.props.currentSlide === 0)}
                onClick={this.handleClick}
              >
                <i className="fa fa-chevron-left"></i>
              </button>
            )
          },
          handleClick(e) {
            e.preventDefault()
            this.props.previousSlide()
          },
          getButtonStyles(disabled) {
            return {
              border: 0,
              background: 'rgba(0,0,0,0.4)',
              color: 'white',
              padding: 10,
              outline: 0,
              opacity: disabled ? 0.3 : 1,
              cursor: 'pointer'
            }
          }
        }),
        position: 'CenterLeft'
      },
      {
        component: React.createClass({
          render() {
            return (
              <button
                style={this.getButtonStyles(this.props.currentSlide + this.props.slidesToScroll >= this.props.slideCount)}
                onClick={this.handleClick}
              >
                <i className="fa fa-chevron-right"></i>
              </button>
            )
          },
          handleClick(e) {
            e.preventDefault()
            this.props.nextSlide()
          },
          getButtonStyles(disabled) {
            return {
              border: 0,
              background: 'rgba(0,0,0,0.4)',
              color: 'white',
              padding: 10,
              outline: 0,
              opacity: disabled ? 0.3 : 1,
              cursor: 'pointer'
            }
          }
        }),
        position: 'CenterRight'
      }
    ]

    if (this.props.imageCount > 0) {
      var rows = []
      for (var i = 1; i <= this.props.imageCount; i++) {
        var filename = 'property_image_{0}_{1}'.format(this.props._id, i)
        rows.push(<img key={filename} src={'/property_images/{0}'.format(filename)}/>)
      }
      return <Carousel dragging={true} edgeEasing="easeOutElastic" decorators={Decorators}>{rows}</Carousel>
    }
  }

  render() {
    const propertyAddress = this.props.address
      + ', ' + this.props.suburb + ', ' + this.props.postcode + ', Australia'

    function createMapOptions(maps) {
      return {
        mapTypeControl: true,
        scrollwheel: false
      }
    }

    return (
      <div className="container">
        <div className="property-img">
          {this.createImageCarousel()}
        </div>
        <div className="row">
          <div className="property-info col-sm-6">
            <h3>
              <strong>
                <Translate content="property.details.title" />:
              </strong>
            </h3>
            <h4 className="lead">
              <Translate content="property.details.suburb" />:
              <strong>{this.props.suburb}, {this.props.postcode}</strong>
            </h4>
            <h4 className="lead">
              <Translate content="property.details.address" />:<strong>{this.props.address}</strong>
            </h4>
            <h4 className="lead">
              <Translate content="property.details.price" />:
              <Translate
                price={this.props.price}
                content="property.details.priceValue"
                component="strong"
              />
            </h4>
            <h4 className="lead">
              <i className="ri-md ri  ri-swimming-pool-indoor"></i>
              Property Type: <strong>{this.props.propertyType}</strong>
            </h4>
            <h4 className="lead">
              <Translate content="property.details.roomType" />:
              <strong>{this.props.roomType}</strong>
            </h4>
          </div>
          <div className="contact-details col-sm-6">
            <h3><strong><Translate content="property.details.contact.title" />:</strong></h3>
            <h4 className="lead">
              <Translate content="property.details.contact.name" />:
              <strong>{this.props.contactName}</strong>
            </h4>
            <h4 className="lead">
              <Translate content="property.details.contact.phoneNumber" />:
              <strong>{this.props.contactNumber}</strong>
            </h4>
            <h4 className="lead">
              <Translate content="property.details.contact.email" />:
              <strong>{this.props.contactEmail}</strong>
            </h4>
            <h4 className="lead">
              <Translate content="property.details.contact.social" />:
              <strong>{this.props.contactSocial}</strong>
              <Translate content="property.details.contact.prefer" />
            </h4>
          </div>
        </div>
        <hr />
        <div className="row">
          <h2><strong>{this.props.title}</strong></h2>
          <h4 className="lead"><Translate content="property.details.details" />:
            <strong>{this.props.details}</strong>
          </h4>
        </div>
        <hr />
        <div className="row">
          <div className="property-feature col-sm-6">
            <h3 className="lead">
              <strong><Translate content="property.details.feature.title" />: </strong>
            </h3>
            <PropertyFeature propertyFeatures={this.props.propertyFeature} />
          </div>
          <div className="lease-details col-sm-6">
            <h3 className="lead">
              <strong><Translate content="property.details.lease.title" />:</strong>
            </h3>
            <ul>
              <li><Translate bond={this.props.bond} content="property.details.lease.bond" /></li>
              <li><Translate bond={this.props.minTerm} content="property.details.lease.term" /></li>
              <li>
                <Translate bond={this.props.availableStart}
                  content="property.details.lease.start"
                />
              </li>
            </ul>
          </div>
        </div>
        <div className="row">
          <h3><strong><Translate content="property.details.location.title" />:</strong></h3>
          <div className="map-container">
            <GoogleMap
              onGoogleApiLoaded={
                ({ map, maps }) => this.getLatlngByAddress(map, maps, propertyAddress)
              }
              yesIWantToUseGoogleMapApiInternals
              options={createMapOptions}
              center={this.props.geolocation}
              defaultZoom={16}
            />
          </div>
        </div>
      </div>
    )
  }
}

Property.propTypes = {
  params: React.PropTypes.object,
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
  minTerm: React.PropTypes.number,
  propertyFeature: React.PropTypes.array,
  geolocation: React.PropTypes.object
}

export default connectToStores(Property)
