import React from 'react'
import counterpart from 'counterpart'

class PropertyFeature extends React.Component {

  render() {
    var propertyFeatureNames = {
      furnished: counterpart('property.details.feature.furnished'),
      femalePrefer: counterpart('property.details.feature.female'),
      nonSmoker: counterpart('property.details.feature.nonSmoking'),
      petAllowed: counterpart('property.details.feature.pet'),
      billInclude: counterpart('property.details.feature.billIncluded'),
      fastInternet: counterpart('property.details.feature.internet')
    }

    if (this.props.propertyFeatures) {
      var propertyFeatureNodes = this.props.propertyFeatures.map(
        (propertyFeature, index) =>
          <li key={propertyFeature}>{propertyFeatureNames[propertyFeature]}</li>
      )

      return (
        <ul>{propertyFeatureNodes}</ul>
      )
    }
    return (
      <ul></ul>
    )
  }
}

PropertyFeature.propTypes = {
  propertyFeatures: React.PropTypes.array
}

export default PropertyFeature
