import React from 'react'
import { Parallax } from 'react-parallax'

class Jumbotron extends React.Component {
  render() {
    return (
      <div>
        <Parallax bgImage="/img/jumbotron.jpg" bgWidth="100%" bgHeight="350px" strength={200}>
          <br/>
          <h1> some content that is displayed above the bgImage </h1>
        </Parallax>
      </div>
    )
  }

}

export default Jumbotron
