import React from 'react';
import {Link} from 'react-router';
import PropertyFeatureStore from '../stores/PropertyFeatureStore'
import PropertyFeatureActions from '../actions/PropertyFeatureActions';
import {first, without, findWhere} from 'underscore';

class PropertyFeature extends React.Component {

  constructor(props) {
    super(props);
    this.state = PropertyFeatureStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    PropertyFeatureStore.listen(this.onChange);
  }

  componentWillUnmount() {
    PropertyFeatureStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

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
