import React from 'react'
import { Link } from 'react-router'
import Translate from 'react-translate-component'
import counterpart from 'counterpart'
import SearchBox from './SearchBox'

class Navbar extends React.Component {

  render() {
    return (
      <nav className={`navbar navbar-default navbar-fixed-top ${this.props.pageFlag}`}>
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed"
              data-toggle="collapse" data-target="#navbar"
            >
              <span className="sr-only"><Translate content="nav.toggle" /></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link to="/" className="navbar-brand">
              <img alt={counterpart('nav.name')} src="/img/logo.png" />
            </Link>
            <SearchBox />
            <span className="glyphicon glyphicon-filter"></span>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav navbar-right">
              <li><Link to="/"><Translate content="nav.home" /></Link></li>
              <li><Link to="/add"><Translate content="nav.add" /></Link></li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

Navbar.propTypes = {
  pageFlag: React.PropTypes.string
}

export default Navbar
