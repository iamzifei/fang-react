import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'


class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar history={this.props.history} />
        {this.props.children}
        <Footer />
      </div>
    )
  }
}

App.propTypes = {
  history: React.PropTypes.object,
  children: React.PropTypes.object
}

export default App
