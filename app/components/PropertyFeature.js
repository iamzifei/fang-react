import React from 'react'
import Translate from 'react-translate-component'
import { Link } from 'react-router'

class PropertyFeature extends React.Component {

  render() {
    if (this.props.propertyFeatures) {
      var selected = this.props.selected ? this.props.selected : ''
      var propertyFeatureNodes = this.props.propertyFeatures.map(
        (propertyFeature, index) => {
          var feature
          if (selected === propertyFeature) {
            feature = (
              <li key={propertyFeature}>
                <Translate content={propertyFeature} component="strong" />
              </li>
            )
          } else if (selected !== '') {
            feature = (
              <li key={propertyFeature}>
                <Link to={`/property/feature/${propertyFeature}`}>
                  <Translate content={propertyFeature} />
                </Link>
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
  selected: React.PropTypes.string
}

export default PropertyFeature
