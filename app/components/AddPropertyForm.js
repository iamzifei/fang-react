import React from 'react'
import { connect } from 'react-redux'
import { Field, actions } from 'react-redux-form'

class AddPropertyForm extends React.Component {
  handleSubmit() {
    let { property, dispatch } = this.props;

    // Do whatever you like in here.
    // You can use redux simple form actions such as:
    // actions.setPending('user', true);
    // actions.setValidity('user.firstName', user.firstName.length > 0);
    // actions.setSubmitted('user', true);
    // etc.
  }
  render() {
    let { property } = this.props;

    return (
      <form onSubmit={() => this.handleSubmit()}>
        <Field model="property.suburb">
          <label>First name:</label>
          <input type="text" />
        </Field>

        <Field model="property.postcode">
          <label>Last name:</label>
          <input type="text" />
        </Field>

        <button type="submit">
          Finish registration, { property.suburb } { property.postcode }!
        </button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { property: state.property };
}

export default connect(mapStateToProps)(AddPropertyForm);
