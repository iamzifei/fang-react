import alt from '../alt'

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
    $.ajax({
      url: '/api/properties',
      data: { offset }
    })
    .done(data => {
      this.actions.getPropertiesListSuccess(data)
    })
    .fail(jqXhr => {
      this.actions.getPropertiesListFail(jqXhr.responseJSON.message)
    })
  }

  getPropertyCount(suburb = -1) {
    $.ajax({
      url: '/api/properties/count',
      data: { suburb }
    })
    .done((data) => {
      this.actions.getPropertyCountSuccess(data)
    })
    .fail((jqXhr) => {
      this.actions.getPropertyCountFail(jqXhr)
    })
  }

  getPropertiesInSuburb(suburb, offset) {
    $.ajax({
      url: '/api/properties/' + suburb,
      data: { offset }
    })
    .done(data => {
      this.actions.getPropertiesListSuccess(data)
    })
    .fail(jqXhr => {
      this.actions.getPropertiesListFail(jqXhr.responseJSON.message)
    })
  }
}

export default alt.createActions(PropertiesListingActions)
