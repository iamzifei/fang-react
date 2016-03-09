import React from 'react'
import { Link } from 'react-router'
import PropertyFeature from './PropertyFeature'
import Translate from 'react-translate-component'

class PropertyList extends React.Component {

  render() {
    var property = this.props.property
    return (
      <li className="list-offer" id={property._id}>
        <Link to={`/property/${property._id}`}>
          <span>
            <img src="/img/grid-offer.jpg" alt="" />
            <div className="type-container">
              <div className="estate-type">{property.propertyType}</div>
              <div className="ads-flag"><Translate content="property.flags.new" /></div>
            </div>
          </span>
          <div>
            <h2>{property.suburb}</h2>
            <h3>${property.price}</h3>
            <h4>{property.address}</h4>
            <p>{property.details}</p>
            <PropertyFeature propertyFeatures={property.propertyFeature} key={property._id} />
          </div>
        </Link>
      </li>
    )
  }
}

PropertyList.propTypes = {
  property: React.PropTypes.object
}

export default PropertyList
