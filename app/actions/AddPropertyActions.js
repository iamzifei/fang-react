import alt from '../alt';

import Logger from '../utils/Logger';

class AddPropertyActions {
    constructor() {
        this.generateActions('fieldValueChanges');
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
                Logger.log("this.actions.AddPropertySuccess {0}", "ok");
                this.actions.AddPropertySuccess(data.message);
            })
            .fail((jqXhr) => {
                Logger.log("this.actions.AddPropertySuccess {0}", "fail");;
                this.actions.AddPropertyFail(jqXhr.responseJSON.message);
            });
    }
}

export default alt.createActions(AddPropertyActions);
