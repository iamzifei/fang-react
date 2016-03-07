import alt from '../alt'
import request from 'superagent'

class PropertiesListingActions {
  constructor() {
    this.generateActions(
      'updateAjaxAnimation',
      'getPropertiesListSuccess',
      'getPropertiesListFail',
      'getPropertyCountSuccess',
      'getPropertyCountFail'
    )
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

  getPropertiesInSuburb(suburb, offset) {
    request.get('/api/properties/' + suburb)
    .query({ offset })
    .end((err, res) => {
      if (err) {
        this.actions.getPropertiesListFail(err.response)
      } else {
        this.actions.getPropertiesListSuccess(res.body)
      }
    })
  }
}

export default alt.createActions(PropertiesListingActions)
