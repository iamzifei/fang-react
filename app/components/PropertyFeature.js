import React from 'react';

class PropertyFeature extends React.Component {

  render() {
    var propertyFeatureNames = {
      furnished: "Furnished",
      femalePrefer: "Female Prefer",
      nonSmoker: "Non-smoking",
      petAllowed: "Pet Allowed",
      billInclude: "Bill Included",
      fastInternet: "Fast Internet"
    };

    var propertyFeatureNodes = this.props.propertyFeatures.map((propertyFeature, index) => {
      return (
        <li key={propertyFeature}>{propertyFeatureNames[propertyFeature]}</li>
      )
    });

    return (
      <ul>{propertyFeatureNodes}</ul>
    );
  }
}

export default PropertyFeature;
