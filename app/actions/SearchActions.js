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
      'searchSuburbFail',
      'getPropertiesListSuccess',
      'getPropertiesListFail',
      'getPropertyCountSuccess',
      'getPropertyCountFail'
    )
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

  getPropertyCount(suburb = -1) {
    request.get('/api/properties/count')
      .query({ suburb })
      .end((err, res) => {
        if (err) {
          this.actions.getPropertyCountFail(err.response)
        } else {
          this.actions.getPropertyCountSuccess(res.body)
        }
      })
  }

  getAllProperties(offset) {
    request.get('/api/properties/')
      .query({ offset })
      .end((err, res) => {
        if (err) {
          this.actions.getPropertiesListFail(err.response)
        } else {
          this.actions.getPropertiesListSuccess(res.body)
        }
      })
  }

  getPropertiesInSuburb(suburb, offset) {
    request.get(`/api/search/${suburb}`)
      .query({ offset })
      .end((err, res) => {
        if (err) {
          this.actions.getPropertiesListFail(err.response)
        } else {
          this.actions.getPropertiesListSuccess(res.body)
        }
      })
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

  /**
   * GET /api/properties/:suburb/refine
   * ?sort=desc&terms=s&room=single&property=house&feature=furnished&feature=femalePrefer
   * &feature=nonSmoker&feature=petAllowed&feature=billInclude&feature=fastInternet
   * Looks up a property by search refinement and criteria
   */
  getPropertyCountRefine(suburb = -1, sort, terms, room, property, feature, misc) {
    request.get('/api/count/refine')
      .query({
        suburb,
        sort,
        terms,
        room,
        property,
        feature,
        misc
      })
      .end((err, res) => {
        if (err) {
          this.actions.getPropertyCountFail(err.response)
        } else {
          this.actions.getPropertyCountSuccess(res.body)
        }
      })
  }

  searchPropertiesRefine(suburb, offset, sort, terms, room, property, feature, misc) {
    request.get(`/api/search/refine/${suburb}`)
    .query({
      offset,
      sort,
      terms,
      room,
      property,
      feature,
      misc
    })
    .end((err, res) => {
      if (err) {
        this.actions.getPropertiesListFail(err.response)
      } else {
        this.actions.getPropertiesListSuccess(res.body)
      }
    })
  }

}

export default alt.createActions(SearchActions)
