import React from 'react'
import Translate from 'react-translate-component'

class PropertyFeature extends React.Component {

  render() {
    if (this.props.propertyFeatures) {
      var ref = this.props.ref ? this.props.ref : ''
      var propertyFeatureNodes = this.props.propertyFeatures.map(
        (propertyFeature, index) => {
          var feature
          if (ref === propertyFeature) {
            feature = (
              <li key={propertyFeature}>
                <Translate content={propertyFeature} component="strong" />
              </li>
            )
          } else if (ref === 'refine') {
            feature = (
              <li key={propertyFeature}>
                <a>
                  <Translate content={propertyFeature} />
                </a>
              </li>
            )
          } else {
            feature =
              <li key={propertyFeature}><Translate content={propertyFeature} /></li>
          }
          return feature
        }
      )

      return (
        <ul>{propertyFeatureNodes}</ul>
      )
    }
    return <ul></ul>
  }
}

PropertyFeature.propTypes = {
  propertyFeatures: React.PropTypes.array,
  ref: React.PropTypes.string
}

export default PropertyFeature
