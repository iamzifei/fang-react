import React from 'react';
import {Link} from 'react-router';
import connectToStores from 'alt-utils/lib/connectToStores';
import HomeStore from '../stores/HomeStore'
import HomeActions from '../actions/HomeActions';
import PropertyGrid from './PropertyGrid';
import ReactPaginate from 'react-paginate';

class Home extends React.Component {
  static getStores() {
    return [HomeStore];
  }

  static getPropsFromStores() {
    return HomeStore.getState();
  }

  componentDidMount() {
    HomeActions.getAllProperties(0);
    HomeActions.getPropertyCount();

    $(document).ajaxStart(() => {
      HomeActions.updateAjaxAnimation('fadeIn');
    });

    $(document).ajaxComplete(() => {
      setTimeout(() => {
        HomeActions.updateAjaxAnimation('fadeOut');
      }, 750);
    });
  }

  handlePageClick (page) {
    let selected = page.selected;
    let offset = Math.ceil(selected * this.props.limit);
    HomeActions.getAllProperties(offset);
  };

  render() {
    var propertyNodes = this.props.properties.map((property, index) => {
      return (
        <PropertyGrid property={property} key={property._id} />
      );
    });

    return (
      <div className='container'>
        <h3 className='text-center'>All {this.props.totalProperties} Properties</h3>
        <div className='row'>
          {propertyNodes}
        </div>
        <div id="react-paginate">
          <ReactPaginate previousLabel={"previous"}
                       nextLabel={"next"}
                       breakLabel={<li className="break"><a href="">...</a></li>}
                       pageNum={Math.ceil(this.props.totalProperties / this.props.limit)}
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
