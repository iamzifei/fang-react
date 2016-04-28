import React from 'react'
import Translate from 'react-translate-component'
import config from '../../config'

class PropertyFeature extends React.Component {

  render() {
    if (this.props.propertyFeatures) {
      var from = this.props.from ? this.props.from : ''
      var featureArray = this.props.propertyFeatures.split(',')
      var propertyFeatureNodes = featureArray.map(
        (propertyFeature, index) => {
          var pf = propertyFeature.trim()
          var feature
          switch (from) {
            case 'refine':
              feature = (
                <li key={pf}>
                  <a>
                    <Translate content={pf} />
                  </a>
                </li>
              )
              break
            case 'property':
              feature = (
                <li key={pf}>
                  <i className={`property-icon ${config.iconMapping[pf]}`} />
                  <Translate content={pf} />
                </li>
              )
              break
            default:
              feature =
                <li key={pf}><Translate content={pf} /></li>
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
  propertyFeatures: React.PropTypes.string,
  from: React.PropTypes.string
}

export default PropertyFeature
