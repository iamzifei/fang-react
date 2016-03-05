import React from 'react'
import counterpart from 'counterpart'

class LocaleSwitcher extends React.Component {
  render() {
    function handleChange(e) {
      counterpart.setLocale(e.target.value)
    }
    return (
      <p>
        <span>Switch Lang:</span>

        <select value="cn" onChange={handleChange}>
          <option value="en">en</option>
          <option value="cn">cn</option>
        </select>
      </p>
    )
  }
}

export default LocaleSwitcher
