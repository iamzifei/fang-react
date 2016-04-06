import React from 'react'
import alt from '../alt'
import connectToStores from 'alt-utils/lib/connectToStores'
import PropertyStore from '../stores/PropertyStore'
import PropertyActions from '../actions/PropertyActions'
import PropertyFeature from './PropertyFeature'
import GoogleMap from 'google-map-react'
import Translate from 'react-translate-component'
import Navbar from './Navbar'
import LightGallery from './LightGallery'
import counterpart from 'counterpart'
import config from '../../config'

class Property extends React.Component {
  static getStores() {
    return [PropertyStore]
  }

  static getPropsFromStores() {
    return PropertyStore.getState()
  }

  componentDidMount() {
    PropertyActions.getProperty(this.props.params.id)
  }

  componentDidUpdate(prevProps) {
    // Fetch new property data when URL path changes
    if (prevProps.params.id !== this.props.params.id) {
      PropertyActions.getProperty(this.props.params.id)
    }
  }

  componentWillUnmount() {
    alt.recycle(PropertyStore)
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

  render() {
    const propertyAddress = `${this.props.address},
    ${this.props.suburb}, ${this.props.postcode}, Australia`

    function createMapOptions(maps) {
      return {
        mapTypeControl: true,
        scrollwheel: false
      }
    }

    /**
     * the format for images array
     [
     {
       "src":"/img/jumbotron.jpg",
       "thumb":"/img/logo.png",
       "mobileSrc":"/img/grid-offer.jpg"
     },
     {
       "src":"/img/jumbotron.jpg",
       "thumb":"/img/logo.png",
       "mobileSrc":"/img/grid-offer.jpg"
     }
     ]
     **/
    var images = []
    for (var i in this.props.photos) {
      if (this.props.photos.hasOwnProperty(i)) {
        var photo = this.props.photos[i]
        var imageObj = {}
        imageObj.src = photo
        imageObj.thumb = photo
        imageObj.mobileSrc = photo
        images.push(imageObj)
      }
    }

    return (
      <div>
        <Navbar pageFlag="property" />
        <div className="container-fluid property-details-container">
          <LightGallery images={images} />
          <div className="row top-section">
            <div className="property-info col-xs-12 col-sm-8">
              <div className="row primary">
                <div className="col-xs-12 col-sm-6">
                  <span className="price">${this.props.price}</span>
                  <Translate content="property.details.priceValue" />
                  <div>{propertyAddress}</div>
                </div>
                <div className="property-type col-xs-12 col-sm-6">
                  <span className="grid">
                    <i className={`property-icon ${config.iconMapping[this.props.propertyType]}`}>
                      {counterpart(`search.refine.property.${this.props.propertyType}`)}
                    </i>
                  </span>
                  <span className="grid">
                    <i className={`property-icon ${config.iconMapping[this.props.roomType]}`}>
                      {counterpart(`search.refine.room.${this.props.roomType}`)}
                    </i>
                  </span>
                </div>
              </div>
              <div className="row desc">
                {this.props.details}
              </div>
            </div>
            <div className="contact-details col-xs-12 col-sm-4">
              <div><i className="fa fa-user" />{this.props.contactName}</div>
              <div><i className="fa fa-phone"></i>{this.props.contactNumber}</div>
              <div><i className="fa fa-envelope"></i>{this.props.contactEmail}</div>
              <div>
                <i className="fa fa-weixin"></i>
                {this.props.contactSocial}
                <Translate content="property.details.contact.prefer" />
              </div>
            </div>
          </div>
          <div className="row map-container">
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
          <div className="row property-misc">
            <div className="property-feature col-sm-6">
              <Translate content="property.details.feature.title" component="h3" />
              <PropertyFeature propertyFeatures={this.props.propertyFeature} from="property" />
            </div>
            <div className="lease-details col-sm-6">
              <Translate content="property.details.lease.title" component="h3" />
              <ul>
                <li>
                  <Translate bond={this.props.bond} content="property.details.lease.bond" />
                </li>
                <li>
                  <Translate term={this.props.minTerm} content="property.details.lease.term" />
                </li>
                <li>
                  <Translate startDate={this.props.availableStart}
                    content="property.details.lease.start"
                  />
                </li>
              </ul>
            </div>
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
  minTerm: React.PropTypes.string,
  propertyFeature: React.PropTypes.string,
  imageCount: React.PropTypes.number,
  geolocation: React.PropTypes.object,
  photos: React.PropTypes.array
}

export default connectToStores(Property)
