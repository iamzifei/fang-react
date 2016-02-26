import React from 'react';
import {Link} from 'react-router';
import connectToStores from 'alt-utils/lib/connectToStores';
import PropertiesListingStore from '../stores/PropertiesListingStore'
import PropertiesListingActions from '../actions/PropertiesListingActions';
import PropertyGrid from './PropertyGrid';
import ReactPaginate from 'react-paginate';
import _ from 'underscore';

class Search extends React.Component {
  static getStores() {
    return [PropertiesListingStore];
  }

  static getPropsFromStores() {
    return PropertiesListingStore.getState();
  }

  componentDidMount() {
    PropertiesListingActions.getPropertiesInSuburb(this.props.params.suburb, 0);
    PropertiesListingActions.getPropertyCount(this.props.params.suburb);
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
      PropertiesListingActions.getPropertiesInSuburb(this.props.params.suburb, 0);
      PropertiesListingActions.getPropertyCount(this.props.params.suburb);
    }
  }

  handlePageClick (page) {
    let selected = page.selected;
    let offset = Math.ceil(selected * this.props.limit);
    PropertiesListingActions.getPropertiesInSuburb(this.props.params.suburb, offset);
  };

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
        <h3 className='text-center'>{this.props.propertiesCount} Properties in {_(suburbName).capitalize()}</h3>
        <div className='row'>
          {propertyNodes}
        </div>
        <div id="react-paginate">
          <ReactPaginate previousLabel={"previous"}
                         nextLabel={"next"}
                         breakLabel={<li className="break"><a href="">...</a></li>}
                         pageNum={Math.ceil(this.props.propertiesCount / this.props.limit)}
                         marginPagesDisplayed={2}
                         pageRangeDisplayed={5}
                         clickCallback={this.handlePageClick.bind(this)}
                         containerClassName={"pagination"}
                         subContainerClassName={"pages pagination"}
                         activeClassName={"active"} />
        </div>
      </div>
    );
  }
}

export default connectToStores(Search);
