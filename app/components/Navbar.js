import React from 'react'
import { Link } from 'react-router'
import connectToStores from 'alt-utils/lib/connectToStores'
import SearchStore from '../stores/SearchStore'
import SearchActions from '../actions/SearchActions'
import AutoSuggest from 'react-autosuggest'
import Translate from 'react-translate-component'
import counterpart from 'counterpart'

class Navbar extends React.Component {

  static getStores() {
    return [SearchStore]
  }

  static getPropsFromStores() {
    return SearchStore.getState()
  }

  constructor(props, context) {
    super(props, context)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onSuggestionsUpdateRequested = this.onSuggestionsUpdateRequested.bind(this)
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this)
    this.getSuggestionValue = this.getSuggestionValue.bind(this)
    this.renderSuggestion = this.renderSuggestion.bind(this)
  }

  componentDidMount() {
    $(document).ajaxStart(() => {
      SearchActions.updateAjaxAnimation('fadeIn')
    })

    $(document).ajaxComplete(() => {
      setTimeout(() => {
        SearchActions.updateAjaxAnimation('fadeOut')
      }, 750)
    })
  }

  onSuggestionsUpdateRequested(object) {
    SearchActions.getSuburbs(object.value)
  }

  onChange(event, object) {
    SearchActions.updateSearchQueryValue(object.newValue)
  }

  onSuggestionSelected(event, object) {
    this.propertySearch(object.suggestionValue)
  }

  getSuggestionValue(suggestion) {
    return suggestion.value
  }

  propertySearch(searchQuery) {
    SearchActions.searchProperties({
      searchQuery,
      searchForm: this.refs.searchForm,
      history: this.props.history
    })
  }

  handleSubmit(event) {
    event.preventDefault()

    const searchQuery = this.props.searchQuery.trim()

    if (searchQuery) {
      this.propertySearch(searchQuery)
    }
  }

  renderSuggestion(suggestion) {
    return (
      <span>{suggestion.label}</span>
    )
  }

  render() {
    const theme = {
      input: 'form-control',
      suggestionsContainer: 'search-results',
      suggestion: 'search-list-item'
    }

    const inputProps = {
      value: this.props.searchQuery,
      onChange: this.onChange,
      type: 'search',
      placeholder: counterpart('nav.search.placeholder')
    }

    return (
      <nav className="navbar navbar-default navbar-static-top">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed"
            data-toggle="collapse" data-target="#navbar"
          >
            <span className="sr-only"><Translate content="nav.toggle" /></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <Link to="/" className="navbar-brand">
            <span ref="triangles" className={`triangles animated ${this.props.ajaxAnimationClass}`}>
              <div className="tri invert"></div>
              <div className="tri invert"></div>
              <div className="tri"></div>
              <div className="tri invert"></div>
              <div className="tri invert"></div>
              <div className="tri"></div>
              <div className="tri invert"></div>
              <div className="tri"></div>
              <div className="tri invert"></div>
            </span>
            <Translate content="nav.name" />
          </Link>
        </div>
        <div id="navbar" className="navbar-collapse collapse">
          <form ref="searchForm" className="navbar-form navbar-left animated"
            onSubmit={this.handleSubmit}
          >
            <div className="input-group">

              <AutoSuggest
                theme={theme}
                suggestions={this.props.suburbs}
                onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
                onSuggestionSelected={this.onSuggestionSelected}
                getSuggestionValue={this.getSuggestionValue}
                renderSuggestion={this.renderSuggestion}
                inputProps={inputProps}
              />

              <span className="input-group-btn">
                <button className="btn btn-default" onClick={this.handleSubmit}>
                  <span className="glyphicon glyphicon-search"></span>
                </button>
              </span>
            </div>
          </form>
          <ul className="nav navbar-nav">
            <li><Link to="/"><Translate content="nav.home" /></Link></li>
            <li><Link to="/add"><Translate content="nav.add" /></Link></li>
          </ul>

        </div>
      </nav>
    )
  }
}

Navbar.propTypes = {
  history: React.PropTypes.object,
  searchQuery: React.PropTypes.string,
  ajaxAnimationClass: React.PropTypes.string,
  suburbs: React.PropTypes.array
}

export default connectToStores(Navbar)
