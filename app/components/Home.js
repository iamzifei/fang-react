import React from 'react';
import {Link} from 'react-router';
import HomeStore from '../stores/HomeStore'
import HomeActions from '../actions/HomeActions';
import PropertyGrid from './PropertyGrid';
import ReactPaginate from 'react-paginate';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = HomeStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    HomeStore.listen(this.onChange);
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

  componentWillUnmount() {
    HomeStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handlePageClick (page) {
    let selected = page.selected;
    let offset = Math.ceil(selected * this.state.limit);
    HomeActions.getAllProperties(offset);
  };

  render() {
    var propertyNodes = this.state.properties.map((property, index) => {
      return (
        <PropertyGrid property={property} key={property._id} />
      );
    });

    return (
      <div className='container'>
        <h3 className='text-center'>All {this.state.totalProperties} Properties</h3>
        <div className='row'>
          {propertyNodes}
        </div>
        <div id="react-paginate">
          <ReactPaginate previousLabel={"previous"}
                       nextLabel={"next"}
                       breakLabel={<li className="break"><a href="">...</a></li>}
                       pageNum={Math.ceil(this.state.totalProperties / this.state.limit)}
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

export default Home;
