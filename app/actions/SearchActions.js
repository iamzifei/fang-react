import alt from '../alt'
import { assign } from 'underscore'
import request from 'superagent'

class SearchActions {
  constructor() {
    this.generateActions(
      'updateAjaxAnimation',
      'updateSearchQueryValue',
      'searchPropertiesSuccess',
      'searchPropertiesFail',
      'searchSuburbSuccess',
      'searchSuburbFail'
    )
  }

  searchProperties(payload) {
    request.get('/api/properties/search')
    .query({ suburb: payload.searchQuery })
    .end((err, res) => {
      if (err) {
        this.actions.searchPropertiesFail(err.response)
      } else {
        assign(payload, res.body)
        this.actions.searchPropertiesSuccess(payload)
      }
    })
  }

  getSuburbs(suburb) {
    if (suburb.length > 2) {
      request.get('/api/suburb/')
      .query({ suburb })
      .end((err, res) => {
        if (err) {
          this.actions.searchSuburbFail(err.response)
        } else {
          this.actions.searchSuburbSuccess(res.body)
        }
      })
    }
  }
}

export default alt.createActions(SearchActions)
