import alt from '../alt'
import SearchActions from '../actions/SearchActions'
import { browserHistory } from 'react-router'

class SearchStore {
  constructor() {
    this.bindActions(SearchActions)
    this.ajaxAnimationClass = ''
    this.searchQuery = ''
    this.suburbs = []
    this.limit = 5
    this.properties = []
    this.propertiesCount = 0
    this.filters = {}
  }

  onUpdateAjaxAnimation(className) {
    // fadein or fadeout
    this.ajaxAnimationClass = className
  }

  onSearchPropertiesSuccess(payload) {
    payload.history.pushState(null, `/properties/${payload.suburb}`)
  }

  onSearchPropertiesFail(payload) {
    payload.searchForm.classList.add('shake')
    setTimeout(() => {
      payload.searchForm.classList.remove('shake')
    }, 1000)
  }

  onUpdateSearchQueryValue(value) {
    this.searchQuery = value
  }

  onSearchSuburbSuccess(data) {
    this.suburbs = data
  }

  onSearchSuburbFail(errorMessage) {
    toastr.error(errorMessage)
  }

  onGetPropertiesListSuccess(data) {
    this.properties = data.properties
    this.limit = data.limit
  }

  onGetPropertiesListFail(errorMessage) {
    toastr.error(errorMessage)
  }

  onGetPropertyCountSuccess(data) {
    this.propertiesCount = data.count
  }

  onGetPropertyCountFail(jqXhr) {
    toastr.error(jqXhr.responseJSON.message)
  }

  onFilterChange(filter) {
    this.filters = Object.assign(filter, this.filters)
    const {
      suburb,
      ...others
    } = this.filters

    const querys = Object.keys(others)
      .map(key => [key, others[key]].join('='))
      .join('&')

    // browserHistory.push({
    //   pathname: `/api/search/refine/${suburb}`,
    //   search: `?${querys}`
    // })
  }
}

export default alt.createStore(SearchStore)
