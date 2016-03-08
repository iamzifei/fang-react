import alt from '../alt'

import request from 'superagent'

import Logger from '../../utils/Logger'

class PropertyActions {
  constructor() {
    this.generateActions(
      'getPropertySuccess',
      'getPropertyFail',
      'updateGeoLocation',
      'fieldValueChanges',
      'addPropertySuccess',
      'addPropertyFail',
      'selectFilesToUpload'
    )
  }

  // TODO: put properties CRUD actions in this one
  getProperty(_id) {
    request.get('/api/property/' + _id)
    .end((err, res) => {
      if (err) {
        this.actions.getPropertyFail(err.response)
      } else {
        this.actions.getPropertySuccess(res.body)
      }
    })
  }

  addProperty(property) {
    Logger.log('PropertyActions.addProperty(property)')

    var req = request.post('/api/properties')
    req.set('Accept', 'application/json')

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

    Logger.log('property')
    Logger.logObject(property)
    Logger.log('req')
    Logger.logObject(req)

    const thisAction = this
    req.end((error, response) => {
      if (error) {
        Logger.logObject(error)
        thisAction.actions.addPropertyFail(error)
      } else {
        Logger.logObject(response)
        thisAction.actions.addPropertySuccess(response)
      }
    })
  }
}

export default alt.createActions(PropertyActions)
