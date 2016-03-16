import alt from '../alt'

import request from 'superagent'

class PropertyActions {
  constructor() {
    this.generateActions(
      'getPropertySuccess',
      'getPropertyFail',
      'updateGeoLocation',
      'fieldValueChanges',
      'addPropertySuccess',
      'addPropertyFail',
      'selectFilesToUpload',
      'initState'
    )
  }

  getProperty(_id) {
    request.get(`/api/property/${_id}`)
    .end((err, res) => {
      if (err) {
        this.actions.getPropertyFail(err.response)
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

    const thisAction = this
    req.end((error, response) => {
      if (error) {
        thisAction.actions.addPropertyFail(error)
      } else {
        thisAction.actions.addPropertySuccess(response.body.id)
      }
    })
  }
}

export default alt.createActions(PropertyActions)
