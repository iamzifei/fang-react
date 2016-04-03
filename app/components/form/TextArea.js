import React from 'react'

class TextArea extends React.Component {
  render() {
    return (
      <div className={`form-group ${this.props.validateState}`}>
        <label className="col-sm-3 control-label">{this.props.label}</label>
        <div className="col-sm-9">
          <textarea
            rows="4"
            className="form-control"
            value={this.props.model}
            name={this.props.fieldName}
            onChange={this.props.onChange}
          />
          <span className="help-block">{this.props.helpBlock}</span>
        </div>
      </div>
    )
  }
}

TextArea.propTypes = {
  validateState: React.PropTypes.string,
  label: React.PropTypes.string,
  model: React.PropTypes.string,
  fieldName: React.PropTypes.string,
  helpBlock: React.PropTypes.string,
  onChange: React.PropTypes.func
}

export default TextArea
