import React from 'react'
import Translate from 'react-translate-component'
import config from '../../config'

class PropertyFeature extends React.Component {

  render() {
    if (this.props.propertyFeatures) {
      var from = this.props.from ? this.props.from : ''
      var propertyFeatureNodes = this.props.propertyFeatures.map(
        (propertyFeature, index) => {
          var feature
          switch (from) {
            case 'refine':
              feature = (
                <li key={propertyFeature}>
                  <a>
                    <Translate content={propertyFeature} />
                  </a>
                </li>
              )
              break
            case 'property':
              feature = (
                <li key={propertyFeature}>
                  <i className={`property-icon ${config.iconMapping[propertyFeature]}`} />
                  <Translate content={propertyFeature} />
                </li>
              )
              break
            default:
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
  from: React.PropTypes.string
}

export default PropertyFeature
