import request from 'superagent';

import { ADD_PROPERTY, ADD_PROPERTY_SUCCESS, ADD_PROPERTY_FAILURE, GET_SUBURB_SUGGESTIONS, UPDATE_SUBURB_SUGGESTION_INPUT_VALUE, UPDATE_SUBURB_SUGGESTIONS, CLEAR_SUBURB_SUGGESTIONS,
        CHANGE_PRICE, CHANGE_BOND, CHANGE_AVAILABLESTART, CHANGE_MINTERM, CHANGE_ADDRESS, CHANGE_TITLE, CHANGE_DETAILS, CHANGE_PROPERTYTYPE, CHANGE_ROOMTYPE, CHANGE_PROPERTYFEATURE,
        CHANGE_FILES, CHANGE_CONTACTNAME, CHANGE_CONTACTNUMBER, CHANGE_CONTACTEMAIL, CHANGE_CONTACTSOCIAL, RESET_STATE }
    from '../constants/ActionTypes'

export function getSuburbsFromServer(suburb) {
    const req = request.get('/api/suburb')
        .query({suburb})

    return {
        type: GET_SUBURB_SUGGESTIONS,
        payload: req,
        value: suburb
    };
}

export function getSuburbSuggestions(value) {

    return dispatch => {
        dispatch(updateSuggestions(getSuburbsFromServer(value), value));
    };
}

export function updateSuggestions(suggestions, value) {
    return {
        type: UPDATE_SUBURB_SUGGESTIONS,
        suggestions,
        value
    };
}

export function updateSuburbSuggestionValue(value) {
    return {
        type: UPDATE_SUBURB_SUGGESTION_INPUT_VALUE,
        value
    };
}

export function clearSuburbSuggestions() {
    return {
        type: CLEAR_SUBURB_SUGGESTIONS
    };
}

export function changePrice(value) {
    return {
        type: CHANGE_PRICE,
        value
    };
}

export function changeBond(value) {
    return {
        type: CHANGE_BOND,
        value
    };
}

export function changeAvailableStart(value) {
    return {
        type: CHANGE_AVAILABLESTART,
        value
    };
}

export function changeMinterm(value) {
    return {
        type: CHANGE_MINTERM,
        value
    };
}

export function changeAddress(value) {
    return {
        type: CHANGE_ADDRESS,
        value
    };
}

export function changeTitle(value) {
    return {
        type: CHANGE_TITLE,
        value
    };
}

export function changeDetails(value) {
    return {
        type: CHANGE_DETAILS,
        value
    };
}

export function changePropertyType(value) {
    return {
        type: CHANGE_PROPERTYTYPE,
        value
    };
}

export function changeRoomType(value) {
    return {
        type: CHANGE_ROOMTYPE,
        value
    };
}

export function changePropertyFeature(value) {
    return {
        type: CHANGE_PROPERTYFEATURE,
        value
    };
}

export function changeFiles(value) {
    return {
        type: CHANGE_FILES,
        value
    };
}

export function changeContactName(value) {
    return {
        type: CHANGE_CONTACTNAME,
        value
    };
}

export function changeContactNumber(value) {
    return {
        type: CHANGE_CONTACTNUMBER,
        value
    };
}

export function changeContactEmail(value) {
    return {
        type: CHANGE_CONTACTEMAIL,
        value
    };
}

export function changeContactSocial(value) {
    return {
        type: CHANGE_CONTACTSOCIAL,
        value
    };
}
//Create new property

export function addProperty(property) {
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

    return {
        type: ADD_PROPERTY,
        payload: req
    };
}

export function addPropertSuccess() {
    return {
        type: ADD_PROPERTY_SUCCESS
    };
}

export function resetForm() {
    return {
        type: RESET_STATE
    };
}
