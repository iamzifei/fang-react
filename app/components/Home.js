import React from 'react';
import {Link} from 'react-router';
import HomeStore from '../stores/HomeStore'
import HomeActions from '../actions/HomeActions';
import PropertyFeature from './PropertyFeature';
import {first, without, findWhere} from 'underscore';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = HomeStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    HomeStore.listen(this.onChange);
    HomeActions.getAllProperties();
  }

  componentWillUnmount() {
    HomeStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    var propertyNodes = this.state.properties.map((property, index) => {
      return (
        <Link key={property._id} to={'/property/' + property._id}>
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
                  <PropertyFeature propertyFeatures={property.propertyFeature} />
                </div>
              </div>
            </div>
          </div>
        </Link>
      );
    });

    return (
      <div className='container'>
        <h3 className='text-center'>All Properties</h3>
        <div className='row'>
          {propertyNodes}
        </div>
      </div>
    );
  }
}

export default Home;
