import React from 'react';
import {Link} from 'react-router';
import SearchStore from '../stores/SearchStore'
import SearchActions from '../actions/SearchActions';
import PropertyFeature from './PropertyFeature';
import _ from 'underscore';

class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = SearchStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    SearchStore.listen(this.onChange);
    SearchActions.getPropertiesInSuburb(this.props.params.suburb);
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
    SearchStore.unlisten(this.onChange);
  }

  componentDidUpdate(prevProps) {
    // Fetch new properties data when URL path changes
    if (prevProps.params.suburb !== this.props.params.suburb) {
      SearchActions.getPropertiesInSuburb(this.props.params.suburb);
    }
  }

  onChange(state) {
    this.setState(state);
  }

render() {
    _.mixin({
      capitalize: function(string) {
        return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
      }
    });
    var suburbName = this.props.params.suburb;
    var propertyNodes = this.state.properties.map((property, index) => {
      suburbName = property.suburb;
      return (
        <div key={property.propertyId} className="col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-offer-col">
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
      );
    });

    return (
      <div className='container'>
        <h3 className='text-center'>{propertyNodes.length} Properties in {_(suburbName).capitalize()}</h3>
        <div className='row'>
          {propertyNodes}
        </div>
      </div>
    );
  }
}

export default Search;
