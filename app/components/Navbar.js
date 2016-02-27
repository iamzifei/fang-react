import React from 'react';
import {Link} from 'react-router';
import connectToStores from 'alt-utils/lib/connectToStores';
import SearchStore from '../stores/SearchStore';
import SearchActions from '../actions/SearchActions';

class Navbar extends React.Component {

  static getStores() {
    return [SearchStore];
  }

  static getPropsFromStores() {
    return SearchStore.getState();
  }

  componentDidMount() {
    $(document).ajaxStart(() => {
      SearchActions.updateAjaxAnimation('fadeIn');
    });

    $(document).ajaxComplete(() => {
      setTimeout(() => {
        SearchActions.updateAjaxAnimation('fadeOut');
      }, 750);
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    let searchQuery = this.props.searchQuery.trim();

    if (searchQuery) {
      SearchActions.searchProperties({
        searchQuery: searchQuery,
        searchForm: this.refs.searchForm,
        history: this.props.history
      });
    }
  }

  render() {
    return (
      <nav className='navbar navbar-default navbar-static-top'>
        <div className='navbar-header'>
          <button type='button' className='navbar-toggle collapsed' data-toggle='collapse' data-target='#navbar'>
            <span className='sr-only'>Toggle navigation</span>
            <span className='icon-bar'></span>
            <span className='icon-bar'></span>
            <span className='icon-bar'></span>
          </button>
          <Link to='/' className='navbar-brand'>
            <span ref='triangles' className={'triangles animated ' + this.props.ajaxAnimationClass}>
              <div className='tri invert'></div>
              <div className='tri invert'></div>
              <div className='tri'></div>
              <div className='tri invert'></div>
              <div className='tri invert'></div>
              <div className='tri'></div>
              <div className='tri invert'></div>
              <div className='tri'></div>
              <div className='tri invert'></div>
            </span>
            Fang
          </Link>
        </div>
        <div id='navbar' className='navbar-collapse collapse'>
          <form ref='searchForm' className='navbar-form navbar-left animated' onSubmit={this.handleSubmit.bind(this)}>
            <div className='input-group'>
              <input type='text' className='form-control' placeholder='Suburb/Postcode' value={this.props.searchQuery} onChange={SearchActions.updateSearchQuery} />
              <span className='input-group-btn'>
                <button className='btn btn-default' onClick={this.handleSubmit.bind(this)}><span className='glyphicon glyphicon-search'></span></button>
              </span>
            </div>
          </form>
          <ul className='nav navbar-nav'>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/add'>Add</Link></li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default connectToStores(Navbar);
