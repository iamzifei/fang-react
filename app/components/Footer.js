import React from 'react'
import LocaleSwitcher from './LocaleSwitcher'
import Translate from 'react-translate-component'

class Footer extends React.Component {
  render() {
    return (
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-sm-5">
              <h3 className="lead"><strong>Information</strong> and <strong>Copyright</strong></h3>
              <p>Powered by <strong>Node.js</strong>, <strong>MongoDB</strong> and
                <strong>React</strong> with Flux architecture and server-side rendering.</p>
              <p>© 2015 Fang.</p>
              <LocaleSwitcher />
            </div>
            <div className="col-sm-7">
              <h3 className="lead">
                <strong>
                  <Translate content="footer.latestProperties" />
                </strong>
              </h3>
              <ul className="list-inline">
              </ul>
            </div>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer
