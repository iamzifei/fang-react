import React from 'react'
import Select from 'react-select'

class SelectInput extends React.Component {
  render() {
    return (
      <div className={`form-group ${this.props.validateState}`}>
        <label className="col-sm-3 control-label">{this.props.label}</label>
        <div className="col-sm-9">
          <Select
            multi={this.props.multi}
            value={this.props.model}
            options={this.props.options}
            name={this.props.fieldName}
            onChange={this.props.onChange}
          />
          <span className="help-block">{this.props.helpBlock}</span>
        </div>
      </div>
    )
  }
}

SelectInput.propTypes = {
  multi: React.PropTypes.bool,
  validateState: React.PropTypes.string,
  label: React.PropTypes.string,
  model: React.PropTypes.string,
  options: React.PropTypes.array,
  fieldName: React.PropTypes.string,
  helpBlock: React.PropTypes.string,
  onChange: React.PropTypes.func
}

export default SelectInput
