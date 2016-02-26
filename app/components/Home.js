import React from 'react';
import {Link} from 'react-router';
import connectToStores from 'alt-utils/lib/connectToStores';
import PropertiesListingStore from '../stores/PropertiesListingStore'
import PropertiesListingActions from '../actions/PropertiesListingActions';
import PropertyGrid from './PropertyGrid';
import ReactPaginate from 'react-paginate';

class Home extends React.Component {
  static getStores() {
    return [PropertiesListingStore];
  }

  static getPropsFromStores() {
    return PropertiesListingStore.getState();
  }

  componentDidMount() {
    PropertiesListingActions.getAllProperties(0);
    PropertiesListingActions.getPropertyCount();

    $(document).ajaxStart(() => {
      PropertiesListingActions.updateAjaxAnimation('fadeIn');
    });

    $(document).ajaxComplete(() => {
      setTimeout(() => {
        PropertiesListingActions.updateAjaxAnimation('fadeOut');
      }, 750);
    });
  }

  handlePageClick (page) {
    let selected = page.selected;
    let offset = Math.ceil(selected * this.props.limit);
    PropertiesListingActions.getAllProperties(offset);
  };

  render() {
    var propertyNodes = this.props.properties.map((property, index) => {
      return (
        <PropertyGrid property={property} key={property._id} />
      );
    });

    return (
      <div className='container'>
        <h3 className='text-center'>All {this.props.propertiesCount} Properties</h3>
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

export default connectToStores(Home);
