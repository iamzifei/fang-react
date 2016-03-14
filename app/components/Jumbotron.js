import React from 'react'
import SearchBox from './SearchBox'
import Translate from 'react-translate-component'

class Jumbotron extends React.Component {
  render() {
    return (
      <div id="carousel-home" className="carousel slide" data-ride="carousel">
        {/* Indicators */}
        {/* Wrapper for slides */}
        <div className="carousel-inner" role="listbox">
          <div className="item active">
            <img src="/img/jumbotron.jpg" alt="..." />
            <div className="carousel-caption">
              <Translate content="home.jumbotron.title" component="h1" />
              <p className="lead"><Translate content="home.jumbotron.subtitle" /></p>
            </div>
          </div>
          <SearchBox />
        </div>
        {/* Controls */}
      </div>
    )
  }
}

export default Jumbotron
