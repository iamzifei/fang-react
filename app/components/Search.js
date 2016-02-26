import React from 'react';
import {Link} from 'react-router';
import connectToStores from 'alt-utils/lib/connectToStores';
import SearchStore from '../stores/SearchStore'
import SearchActions from '../actions/SearchActions';
import PropertyGrid from './PropertyGrid';
import _ from 'underscore';

class Search extends React.Component {
  static getStores() {
    return [SearchStore];
  }

  static getPropsFromStores() {
    return SearchStore.getState();
  }

  componentDidMount() {
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

  componentDidUpdate(prevProps) {
    // Fetch new properties data when URL path changes
    if (prevProps.params.suburb !== this.props.params.suburb) {
      SearchActions.getPropertiesInSuburb(this.props.params.suburb);
    }
  }

render() {
    _.mixin({
      capitalize: function(string) {
        return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
      }
    });
    var suburbName = this.props.params.suburb;
    var propertyNodes = this.props.properties.map((property, index) => {
      suburbName = property.suburb;
      return (
        <PropertyGrid property={property} key={property._id} />
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

export default connectToStores(Search);
