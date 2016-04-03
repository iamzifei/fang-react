import alt from '../alt'

import request from 'superagent'

class PropertyActions {
  constructor() {
    this.generateActions(
      'getPropertySuccess',
      'displayFailMessage',
      'updateGeoLocation',
      'fieldValueChanges',
      'checkboxValueChanges',
      'addPropertySuccess',
      'selectFilesToUpload',
      'getSuburbsSuccess',
      'updateSuburbSearchSuccess'
    )
  }

  updateSuburbSearch(keyword) {
    this.actions.updateSuburbSearchSuccess(keyword)
  }

  getSuburbs(suburb) {
    if (suburb.length > 2) {
      request.get('/api/suburb/')
        .query({ suburb })
        .end((err, res) => {
          if (err) {
            this.actions.displayFailMessage(err.response)
          } else {
            this.actions.getSuburbsSuccess(res.body)
          }
        })
    }
  }

  getProperty(_id) {
    request.get(`/api/property/${_id}`)
    .end((err, res) => {
      if (err) {
        this.actions.displayFailMessage(err.response)
      } else {
        this.actions.getPropertySuccess(res.body)
      }
    })
  }

  addProperty(property) {
    var req = request.post('/api/properties')
      .set('Accept', 'application/json')

    // attach all input fields
    Object.keys(property).forEach((key, index) =>
      req.field(key, property[key])
    )

    // attach all selected files
    if (property.files) {
      property.files.map((file) =>
        req.attach(file.name, file)
      )
    }

    req.end((error, response) => {
      if (error) {
        this.actions.displayFailMessage(error)
      } else {
        this.actions.addPropertySuccess(response.body.id)
      }
    })
  }
}

export default alt.createActions(PropertyActions)
