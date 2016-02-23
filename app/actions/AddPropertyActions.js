import alt from '../alt';

class AddPropertyActions {
    constructor() {
        this.generateActions(
            'AddPropertySuccess',
            'AddPropertyFail',
            'updateSuburb',
            'updatePostcode',
            'updatePrice',
            'updateAddress',
            'updateImageCount',
            'updateTitle',
            'updateDetails',
            'updatePropertyType',
            'updateRoomType',
            'updateContactName',
            'updateContactNumber',
            'updateContactEmail',
            'updateContactSocial',
            'updatePreferredContact',
            'updateBond',
            'updateAvailableStart',
            'updateMinTerm',
            'updatePropertyFeature',
            'invalidSuburb',
            'invalidPostcode',
            'invalidPrice',
            'invalidAddress',
            'invalidImageCount',
            'invalidTitle',
            'invalidDetails',
            'invalidPropertyType',
            'invalidRoomType',
            'invalidContactName',
            'invalidContactNumber',
            'invalidContactEmail',
            'invalidContactSocial',
            'invalidPreferredContact',
            'invalidBond',
            'invalidAvailableStart',
            'invalidMinTerm',
            'invalidPropertyFeature'
        );
    }

    AddProperty(suburb,postcode,price,address,imageCount,title,details,propertyType,roomType,contactName,contactNumber,contactEmail,contactSocial,preferredContact,bond,availableStart,minTerm,propertyFeature) {
        $.ajax({
                type: 'POST',
                url: '/api/properties',
                data: {
                  suburb:   suburb,
                  postcode:   postcode,
                  price:   price,
                  address:   address,
                  imageCount:   imageCount,
                  title:   title,
                  details:   details,
                  propertyType:   propertyType,
                  roomType:   roomType,
                  contactName:   contactName,
                  contactNumber:   contactNumber,
                  contactEmail:   contactEmail,
                  contactSocial:   contactSocial,
                  preferredContact:   preferredContact,
                  bond:   bond,
                  availableStart:   availableStart,
                  minTerm:   minTerm,
                  propertyFeature:   propertyFeature
                }
            })
            .done((data) => {
                this.actions.AddPropertySuccess(data.message);
            })
            .fail((jqXhr) => {
                this.actions.AddPropertyFail(jqXhr.responseJSON.message);
            });
    }
}

export default alt.createActions(AddPropertyActions);
