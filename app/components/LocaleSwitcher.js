import React from 'react'
import counterpart from 'counterpart'
import Translate from 'react-translate-component'

class LocaleSwitcher extends React.Component {
  render() {
    function handleChange(e) {
      counterpart.setLocale(e.target.value)
    }
    return (
      <p>
        <span><Translate content="footer.langSwitcher.label" /></span>

        <select value="cn" onChange={handleChange}>
          <option value="en">{counterpart('footer.langSwitcher.en')}</option>
          <option value="cn">{counterpart('footer.langSwitcher.cn')}</option>
        </select>
      </p>
    )
  }
}

export default LocaleSwitcher
