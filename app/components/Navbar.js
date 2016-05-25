import React from 'react'
import { Link } from 'react-router'
import Translate from 'react-translate-component'
import counterpart from 'counterpart'
import SearchBox from './SearchBox'
import { connect } from 'react-redux'
import { loadUserFromToken, logoutUser } from '../actions/UserActions'

class Navbar extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  componentDidMount() {
    this.props.loadUser()
  }

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
              {/*toggle view after user login or signup*/}
              {this.props.isAuthenticated ?
                <ul className="nav navbar-nav navbar-right">
                  <li><Link to="/">hello!  {this.props.currentUser.name}</Link></li>
                  <li><button onClick={this.props.logout}>logout</button></li>
                </ul>
                :<ul className="nav navbar-nav navbar-right">
                  <li><Link to="/login"><Translate content="nav.login" /></Link></li>
                  <li><Link to="/signup"><Translate content="nav.signup" /></Link></li>
                </ul>
              }
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

function mapStateToProps(state){
  return{
    isAuthenticated : state.userState.isAuthenticated,
    currentUser : state.userState.currentUser
  }
}
function mapDispatchToProps(dispatch){
  return {
    logout : () => {
      dispatch(logoutUser())
    },
    loadUser : () =>{
      dispatch(loadUserFromToken())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
