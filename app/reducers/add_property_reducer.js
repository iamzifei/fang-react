import { ADD_PROPERTY, ADD_PROPERTY_SUCCESS, ADD_PROPERTY_FAILURE, GET_SUBURB_SUGGESTIONS, UPDATE_SUBURB_SUGGESTION_INPUT_VALUE, UPDATE_SUBURB_SUGGESTIONS, CLEAR_SUBURB_SUGGESTIONS,
        CHANGE_PRICE, CHANGE_BOND, CHANGE_AVAILABLESTART, CHANGE_MINTERM, CHANGE_ADDRESS, CHANGE_TITLE, CHANGE_DETAILS, CHANGE_PROPERTYTYPE, CHANGE_ROOMTYPE, CHANGE_PROPERTYFEATURE,
        CHANGE_FILES, CHANGE_CONTACTNAME, CHANGE_CONTACTNUMBER, CHANGE_CONTACTEMAIL, CHANGE_CONTACTSOCIAL, RESET_STATE }
    from '../constants/ActionTypes'

const initialState = { price: '',
                        bond: '',
                        availableStart: '',
                        minTerm: '',
                        suburb: '',
                        postcode: '',
                        suburbSearch: '',
                        address: '',
                        title: '',
                        details: '',
                        propertyType: '',
                        roomType: '',
                        propertyFeature: [],
                        files: [],
                        imageCount: 0,
                        contactName: '',
                        contactNumber: '',
                        contactEmail: '',
                        contactSocial: '',
                        preferredContact: '',
                        suggestions: {suburbs: [], value: ''},
                        loading: false,
                        error: null };

export default function (state = initialState, action = {}) {
    let error;
    
    switch (action.type) {
        case ADD_PROPERTY:
            return { ...state, loading: true };
        case ADD_PROPERTY_SUCCESS:
            return { ...state, loading: false };
        case ADD_PROPERTY_FAILURE:
            return { ...state, loading: false };
        case GET_SUBURB_SUGGESTIONS:
            return {...state, suburbSearch: action.value, suggestions: {suburbs: [], value: action.value}};
        case UPDATE_SUBURB_SUGGESTIONS:
            return {...state, suburbSearch: action.value, suggestions: {suburbs: action.suggestions, value: action.value}};
        case UPDATE_SUBURB_SUGGESTION_INPUT_VALUE:
            var val = action.value;
            var suburb, postcode;
            if (val.indexOf(',') > -1) {
                var suburbArr = val.split(',');
                suburb = suburbArr[0].trim();
                postcode = suburbArr[1].trim();
            }
            return {...state, suburb: suburb, postcode: postcode, suburbSearch: val, suggestions: {...state.suggestions, value: action.value}};
        case CLEAR_SUBURB_SUGGESTIONS:
            return {...state, suburbSearch: '', suggestions: {suburbs: [], value: ''}};
        case CHANGE_PRICE:
            return {...state, price: action.value };
        case CHANGE_BOND:
            return {...state, bond: action.value };
        case CHANGE_AVAILABLESTART:
            return {...state, availableStart: action.value };
        case CHANGE_MINTERM:
            return {...state, minTerm: action.value };
        case CHANGE_ADDRESS:
            return {...state, address: action.value };
        case CHANGE_TITLE:
            return {...state, title: action.value };
        case CHANGE_DETAILS:
            return {...state, details: action.value };
        case CHANGE_PROPERTYTYPE:
            return {...state, propertyType: action.value };
        case CHANGE_ROOMTYPE:
            return {...state, roomType: action.value };
        case CHANGE_PROPERTYFEATURE:
            return {...state, propertyFeature: action.value };
        case CHANGE_FILES:
            return {...state, files: action.value };
        case CHANGE_CONTACTNAME:
            return {...state, contactName: action.value };
        case CHANGE_CONTACTNUMBER:
            return {...state, contactNumber: action.value };
        case CHANGE_CONTACTEMAIL:
            return {...state, contactEmail: action.value };
        case CHANGE_CONTACTSOCIAL:
            return {...state, contactSocial: action.value };
        case RESET_STATE:
            return initialState;
        default:
            return state;
    }
}