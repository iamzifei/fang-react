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
    this.filters = {
      suburb: '',
      sort: '',
      term: '',
      room: '',
      property: '',
      feature: '',
      misc: ''
    }
  }

  onUpdateAjaxAnimation(className) {
    // fadein or fadeout
    this.ajaxAnimationClass = className
  }

  onSearchPropertiesSuccess(suburb) {
    browserHistory.push({
      pathname: '/properties',
      search: `?suburb=${suburb}`
    })
  }

  onUpdateSearchQueryValue(value) {
    this.searchQuery = value
    this.filters.suburb = value
  }

  onKeepSuburbSuccess(suburb) {
    this.searchQuery = suburb
  }

  onSearchSuburbSuccess(data) {
    this.suburbs = data
  }

  onDisplayFailMessage(errorMessage) {
    toastr.error(errorMessage)
  }

  onGetPropertiesListSuccess(data) {
    this.properties = data.properties
    this.limit = data.limit
  }

  onGetPropertyCountSuccess(data) {
    this.propertiesCount = data.count
  }

  onFilterChange(filter) {
    this.filters = filter

    const queries = Object.keys(this.filters)
      //.filter(key => !!this.filters[key] && key !== 'suburb')
      .map(key => [key, this.filters[key]].join('='))
      .join('&')

    browserHistory.push({
      pathname: `/properties`,
      search: `?${queries}`
    })
  }
}

export default alt.createStore(SearchStore)
