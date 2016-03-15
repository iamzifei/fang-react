import alt from '../alt'
import SearchActions from '../actions/SearchActions'
import { browserHistory } from 'react-router'

class SearchStore {
  constructor() {
    this.bindActions(SearchActions)
    this.ajaxAnimationClass = ''
    this.suburbs = []
    this.properties = []
    this.propertiesCount = 0
    this.filters = {
      suburb: '',
      offset: '0',
      sort: 'time',
      term: 'any',
      room: 'any',
      property: 'any',
      feature: 'any',
      misc: 'any'
    }
    this.offset = this.filters.offset
  }

  onUpdateAjaxAnimation(className) {
    // fadein or fadeout
    this.ajaxAnimationClass = className
  }

  onDisplayFailMessage(errorMessage) {
    toastr.error(errorMessage)
  }

  onGetSuburbsSuccess(data) {
    this.suburbs = data
  }

  onUpdateFiltersSuccess(filters) {
    this.filters = filters
  }

  // when redirected from other page, such as home,
  // onUpdateFiltersSuccess has been called before,
  // so filters are updated
  onResultPageRedirectSuccess() {
    browserHistory.push({
      pathname: '/properties',
      query: this.filters
    })
  }

  onGetPropertiesSuccess(data) {
    this.properties = data.res
    if (data.filter.suburb) {
      // make sure to update filter when query successful
      this.filters = data.filter
    }
  }

  onGetPropertiesCountSuccess(data) {
    this.propertiesCount = data.count
  }

  onUpdateOffsetSuccess(offset) {
    this.offset = offset
    this.filters.offset = offset
  }
}

export default alt.createStore(SearchStore)
