import React from 'react';
import {Link} from 'react-router';
import PropertyFeature from './PropertyFeature';

class PropertyGrid extends React.Component {

  render() {
    var property = this.props.property;
    return (
      <Link to={'/property/' + property._id}>
        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-offer-col">
          <div className="panel grid-offer">
            <div className="panel-body">
              <div className="grid-offer-photo">
                <img src="/img/grid-offer.jpg" alt=""/>
                <div className="type-container">
                  <div className="estate-type">{property.propertyType}</div>
                  <div className="ads-flag">new</div>
                </div>
              </div>
              <div className="grid-offer-text">
                <div className="grid-offer-h2">{property.suburb}</div>
                <div className="grid-offer-h4">{property.address}</div>
                <div className="clearfix"></div>
                <p>{property.details}</p>
                <div className="clearfix"></div>
              </div>
              <div className="price-grid-cont">
                <div className="grid-price-label pull-left">Price:</div>
                <div className="grid-price pull-right">
                  ${property.price}
                </div>
                <div className="clearfix"></div>
              </div>
              <div className="grid-offer-params">
                <PropertyFeature propertyFeatures={property.propertyFeature} key={property._id}/>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }
}

export default PropertyGrid;
