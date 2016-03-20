import React from 'react'
import connectToStores from 'alt-utils/lib/connectToStores'
import SearchStore from '../stores/SearchStore'
import SearchActions from '../actions/SearchActions'
import AutoSuggest from 'react-autosuggest'
import counterpart from 'counterpart'
import config from '../../config'
import $ from 'jquery'

class SearchBox extends React.Component {
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
    SearchActions.updateFilters({
      suburb: object.newValue.trim(),
      price: `${config.rentalMax}`,
      offset: '0',
      sort: 'time',
      term: 'any',
      room: 'any',
      property: 'any',
      feature: 'any',
      misc: 'any'
    })
  }

  onSuggestionSelected(event, object) {
    this.propertySearch(object.suggestionValue)
  }

  getSuggestionValue(suggestion) {
    return suggestion.value
  }

  propertySearch() {
    SearchActions.resultPageRedirect()
  }

  handleSubmit(event) {
    event.preventDefault()
    this.propertySearch()
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
      value: this.props.filters.suburb,
      onChange: this.onChange,
      type: 'search',
      placeholder: counterpart('nav.search.placeholder')
    }

    return (
      <form ref="searchForm" className="navbar-form navbar-left animated"
        onSubmit={this.handleSubmit}
      >
        <div className="input-group">
          <span ref="triangles"
            className={`triangles animated ${this.props.ajaxAnimationClass}`}
          >
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
    )
  }
}

SearchBox.propTypes = {
  filters: React.PropTypes.object,
  ajaxAnimationClass: React.PropTypes.string,
  suburbs: React.PropTypes.array
}


export default connectToStores(SearchBox)
