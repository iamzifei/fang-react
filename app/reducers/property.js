import { modeled } from 'react-redux-form'
import config from '../../config'

const initialState = {
  suburb: '',
  postcode: '',
  price: '',
  address: '',
  imageCount: 0,
  title: '',
  details: '',
  propertyType: '',
  roomType: '',
  contactName: '',
  contactNumber: '',
  contactEmail: '',
  contactSocial: '',
  preferredContact: '',
  bond: '',
  availableStart: '',
  minTerm: '',
  propertyFeature: [],
  geolocation: []
}

function propertyReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_PROPERTY':
          return state
    default:
          return state
  }
}

// wrap normal redux reducer into redux-form decorated modeled reducer
const propertyFormModelReducer = modeled(propertyReducer, config.propertyReduxModelName)

export default propertyFormModelReducer
