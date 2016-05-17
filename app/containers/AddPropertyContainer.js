import React, { Component } from 'react';
import { addProperty, addPropertSuccess, getSuburbsFromServer, updateSuggestions, updateSuburbSuggestionValue, clearSuburbSuggestions, changePrice, changeBond,
        changeAvailableStart, changeMinterm, changeAddress, changeTitle, changeDetails, changePropertyType, changeRoomType, changePropertyFeature,
        changeFiles, changeContactName, changeContactNumber, changeContactEmail, changeContactSocial, resetForm }
    from '../actions/PropertyActions'
import { reduxForm, change } from 'redux-form'
import { browserHistory } from 'react-router'
import AddProperty from '../components/AddProperty'
import moment from 'moment'

//Client side validation
function validate(values) {
    const errors = {};

    if (!values.price || values.price.trim() === '') {
        errors.price = 'Enter a price.';
    }
    if (!values.address || values.address.trim() === '') {
        errors.address = 'Enter an address.';
    }
    if (!values.propertyType || values.propertyType.trim() === '')
    {
        errors.propertyType = 'Select a property type.'
    }
    if (!values.roomType || values.roomType.trim() === '')
    {
        errors.roomType = 'Select a room type.'
    }
    if (!values.contactName || values.contactName.trim() === '') {
        errors.contactName = 'Enter a contact name.';
    }
    if (!values.suburbSearch || values.suburbSearch.trim() === '') {
        errors.suburbSearch = 'Enter a suburb or postcode';
    }
    if ((!values.contactNumber || values.contactNumber.trim() === '') &&
        (!values.contactEmail || values.contactEmail.trim() === '') &&
        (!values.contactSocial || values.contactSocial.trim() === ''))
    {
        errors.contactNumber = 'Enter a contact number.';
        errors.contactEmail = 'Enter a contact mail.';
        errors.contactSocial = 'Contact information is required at least one.';
    }

    return errors;
}

const validateAndAddProperty = (values, dispatch) => {
    dispatch(addProperty(values))
        .payload
        .end((err, res) => {
            if (!err) {
                dispatch(addPropertSuccess());
                dispatch(resetForm());

                browserHistory.push({
                    pathname: `/property/${res.body.id}`
                })
            }
        })
}

const mapDispatchToProps = (dispatch) => {
    return {
        addProperty: validateAndAddProperty,
        onChange(event, { newValue }) {
            dispatch(updateSuburbSuggestionValue(newValue));
            const value = newValue.trim();
            if (value === '') {
                dispatch(clearSuburbSuggestions());
            }
        },
        onSuggestionsUpdateRequested({ value }) {
            var subval = '';
            subval = value;
            if (subval.length > 2)
            {
                dispatch(getSuburbsFromServer(value))
                    .payload
                    .end((err, res) => {
                        if (!err) {
                            dispatch(updateSuggestions(res.body, value));
                        }
                    });
            }
        },
        onFormChange(e) {
            const { name, value } = e.target
            if (!name) return
            switch(name) {
                case 'price':
                    return dispatch(changePrice(value));
                case 'address':
                    return dispatch(changeAddress(value));
                case 'title':
                    return dispatch(changeTitle(value));
                case 'details':
                    return dispatch(changeDetails(value));
                case 'contactName':
                    return dispatch(changeContactName(value));
                case 'contactNumber':
                    return dispatch(changeContactNumber(value));
                case 'contactEmail':
                    return dispatch(changeContactEmail(value));
                case 'contactSocial':
                    return dispatch(changeContactSocial(value));
            }

            //fields[name].onChange(value)
            //... do some saving
        },
        onBondChange(value) {
            dispatch(changeBond(value));
        },
        onAvailableStartChange(value) {
            dispatch(changeAvailableStart(moment(value).format('YYYY-MM-DD')));
        },
        onMintermChange(value) {
            dispatch(changeMinterm(value));
        },
        onPropertyTypeChange(value) {
            dispatch(changePropertyType(value));
        },
        onRoomTypeChange(value) {
            dispatch(changeRoomType(value));
        },
        onPropertyFeatureChange(value) {
            var arr = [];
            value.map(function(val) {
                arr.push(val.value);
            })

            dispatch(changePropertyFeature(arr));
        },
        onDropFiles(value) {
            dispatch(changeFiles(value));
        }
    }
}

function mapStateToProps(state) {
    return {
        property: state.property,
        initialValues: state.property
    };
}

export default reduxForm({
    form: 'AddPropertyForm',
    fields: ['price', 'bond', 'availableStart', 'minTerm', 'suburb', 'postcode', 'suburbSearch', 'address', 'title', 'details', 'propertyType', 'roomType', 'propertyFeature', 'files', 'imageCount', 'contactName', 'contactNumber', 'contactEmail', 'contactSocial', 'preferredContact'],
    validate
}, mapStateToProps, mapDispatchToProps)(AddProperty);
