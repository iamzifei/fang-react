import alt from '../alt';
import AddPropertyActions from '../actions/AddPropertyActions';

class AddPropertyStore {
  constructor() {
    this.bindActions(AddPropertyActions);
    this.suburb = '';
    this.postcode = '';
    this.price = '';
    this.address = '';
    this.imageCount = '';
    this.title = '';
    this.details = '';
    this.propertyType = '';
    this.roomType = '';
    this.contactName = '';
    this.contactNumber = '';
    this.contactEmail = '';
    this.contactSocial = '';
    this.preferredContact = '';
    this.bond = '';
    this.availableStart = '';
    this.minTerm = '';
    this.propertyFeature = '';

    this.helpBlock = '';
    this.suburbHelpBlock = '';
    this.postcodeHelpBlock = '';
    this.priceHelpBlock = '';
    this.addressHelpBlock = '';
    this.imageCountHelpBlock = '';
    this.titleHelpBlock = '';
    this.detailsHelpBlock = '';
    this.propertyTypeHelpBlock = '';
    this.roomTypeHelpBlock = '';
    this.contactNameHelpBlock = '';
    this.contactNumberHelpBlock = '';
    this.contactEmailHelpBlock = '';
    this.contactSocialHelpBlock = '';
    this.preferredContactHelpBlock = '';
    this.bondHelpBlock = '';
    this.availableStartHelpBlock = '';
    this.minTermHelpBlock = '';
    this.propertyFeatureHelpBlock = '';

    this.suburbValidateState = '';
    this.postcodeValidateState = '';
    this.priceValidateState = '';
    this.addressValidateState = '';
    this.imageCountValidateState = '';
    this.titleValidateState = '';
    this.detailsValidateState = '';
    this.propertyTypeValidateState = '';
    this.roomTypeValidateState = '';
    this.contactNameValidateState = '';
    this.contactNumberValidateState = '';
    this.contactEmailValidateState = '';
    this.contactSocialValidateState = '';
    this.preferredContactValidateState = '';
    this.bondValidateState = '';
    this.availableStartValidateState = '';
    this.minTermValidateState = '';
    this.propertyFeatureValidateState = '';
  }

  onAddPropertySuccess(successMessage) {
    this.suburbValidateState = 'has-success';
    this.postcodeValidateState = 'has-success';
    this.priceValidateState = 'has-success';
    this.addressValidateState = 'has-success';
    this.imageCountValidateState = 'has-success';
    this.titleValidateState = 'has-success';
    this.detailsValidateState = 'has-success';
    this.propertyTypeValidateState = 'has-success';
    this.roomTypeValidateState = 'has-success';
    this.contactNameValidateState = 'has-success';
    this.contactNumberValidateState = 'has-success';
    this.contactEmailValidateState = 'has-success';
    this.contactSocialValidateState = 'has-success';
    this.preferredContactValidateState = 'has-success';
    this.bondValidateState = 'has-success';
    this.availableStartValidateState = 'has-success';
    this.minTermValidateState = 'has-success';
    this.propertyFeatureValidateState = 'has-success';
    this.helpBlock = successMessage;
  }

  onAddPropertyFail(errorMessage) {
    this.suburbValidateState = 'has-error';
    this.postcodeValidateState = 'has-error';
    this.priceValidateState = 'has-error';
    this.addressValidateState = 'has-error';
    this.imageCountValidateState = 'has-error';
    this.titleValidateState = 'has-error';
    this.detailsValidateState = 'has-error';
    this.propertyTypeValidateState = 'has-error';
    this.roomTypeValidateState = 'has-error';
    this.contactNameValidateState = 'has-error';
    this.contactNumberValidateState = 'has-error';
    this.contactEmailValidateState = 'has-error';
    this.contactSocialValidateState = 'has-error';
    this.preferredContactValidateState = 'has-error';
    this.bondValidateState = 'has-error';
    this.availableStartValidateState = 'has-error';
    this.minTermValidateState = 'has-error';
    this.propertyFeatureValidateState = 'has-error';
    this.helpBlock = errorMessage;
  }

  onUpdateSuburb(event) {
    this.suburb = event.target.value;
    this.suburbValidateState = '';
    this.suburbHelpBlock = '';
  }

  onUpdatePostcode(event) {
    this.postcode = event.target.value;
    this.postcodeValidateState = '';
    this.postcodeHelpBlock = '';
  }

  onUpdatePrice(event) {
    this.price = event.target.value;
    this.priceValidateState = '';
    this.priceHelpBlock = '';
  }

  onUpdateAddress(event) {
    this.address = event.target.value;
    this.addressValidateState = '';
    this.addressHelpBlock = '';
  }

  onUpdateImageCount(event) {
    this.imageCount = event.target.value;
    this.imageCountValidateState = '';
    this.imageCountHelpBlock = '';
  }

  onUpdateTitle(event) {
    this.title = event.target.value;
    this.titleValidateState = '';
    this.titleHelpBlock = '';
  }

  onUpdateDetails(event) {
    this.details = event.target.value;
    this.detailsValidateState = '';
    this.detailsHelpBlock = '';
  }

  onUpdatePropertyType(event) {
    this.propertyType = event.target.value;
    this.propertyTypeValidateState = '';
    this.propertyTypeHelpBlock = '';
  }

  onUpdateRoomType(event) {
    this.roomType = event.target.value;
    this.roomTypeValidateState = '';
    this.roomTypeHelpBlock = '';
  }

  onUpdateContactName(event) {
    this.contactName = event.target.value;
    this.contactNameValidateState = '';
    this.contactNameHelpBlock = '';
  }

  onUpdateContactNumber(event) {
    this.contactNumber = event.target.value;
    this.contactNumberValidateState = '';
    this.contactNumberHelpBlock = '';
  }

  onUpdateContactEmail(event) {
    this.contactEmail = event.target.value;
    this.contactEmailValidateState = '';
    this.contactEmailHelpBlock = '';
  }

  onUpdateContactSocial(event) {
    this.contactSocial = event.target.value;
    this.contactSocialValidateState = '';
    this.contactSocialHelpBlock = '';
  }

  onUpdatePreferredContact(event) {
    this.preferredContact = event.target.value;
    this.preferredContactValidateState = '';
    this.preferredContactHelpBlock = '';
  }

  onUpdateBond(event) {
    this.bond = event.target.value;
    this.bondValidateState = '';
    this.bondHelpBlock = '';
  }

  onUpdateAvailableStart(event) {
    this.availableStart = event.target.value;
    this.availableStartValidateState = '';
    this.availableStartHelpBlock = '';
  }

  onUpdateMinTerm(event) {
    this.minTerm = event.target.value;
    this.minTermValidateState = '';
    this.minTermHelpBlock = '';
  }

  onUpdatePropertyFeature(event) {
    this.propertyFeature = event.target.value;
    this.propertyFeatureValidateState = '';
    this.propertyFeatureHelpBlock = '';
  }

  onInvalidSuburb() {
    this.suburbValidateState = 'has-error';
    this.suburbHelpBlock = 'Please enter the suburb of the property';
  }

  onInvalidPostcode() {
    this.postcodeValidateState = 'has-error';
    this.postcodeHelpBlock = 'Please enter the postcode of the property';
  }

  onInvalidPrice() {
    this.priceValidateState = 'has-error';
    this.priceHelpBlock = 'Please enter the price per week of the property';
  }

  onInvalidAddress() {
    this.addressValidateState = 'has-error';
    this.addressHelpBlock = 'Please enter the address of the property';
  }

  onInvalidImageCount() {
    this.imageCountValidateState = 'has-error';
  }

  onInvalidTitle() {
    this.titleValidateState = 'has-error';
    this.titleHelpBlock = 'Please enter the advert title';
  }

  onInvalidDetails() {
    this.detailsValidateState = 'has-error';
    this.detailsHelpBlock = 'Please put some details of the property';
  }

  onInvalidPropertyType() {
    this.propertyTypeValidateState = 'has-error';
    this.propertyTypeHelpBlock = 'Please select the property type';
  }

  onInvalidRoomType() {
    this.roomTypeValidateState = 'has-error';
    this.roomTypeHelpBlock = 'Please select the room type';
  }

  onInvalidContactName() {
    this.contactNameValidateState = 'has-error';
    this.contactNameHelpBlock = 'Please enter the contact name';
  }

  onInvalidContactNumber() {
    this.contactNumberValidateState = 'has-error';
    this.contactNumberHelpBlock = 'Please enter the contact number';
  }

  onInvalidContactEmail() {
    this.contactEmailValidateState = 'has-error';
    this.contactEmailHelpBlock = 'Please enter the contact email';
  }

  onInvalidContactSocial() {
    this.contactSocialValidateState = 'has-error';
    this.contactSocialHelpBlock = 'Please enter your social network details';
  }

  onInvalidPreferredContact() {
    this.preferredContactValidateState = 'has-error';
    this.preferredContactHelpBlock = 'Please select your preferred contact method';
  }

  onInvalidBond() {
    this.bondValidateState = 'has-error';
    this.bondHelpBlock = 'Please choose how many weeks bond required';
  }

  onInvalidAvailableStart() {
    this.availableStartValidateState = 'has-error';
    this.availableStartHelpBlock = 'Please select the available date of the property';
  }

  onInvalidMinTerm() {
    this.minTermValidateState = 'has-error';
    this.minTermHelpBlock = 'Please enter the minimum lease term';
  }

  onInvalidPropertyFeature() {
    this.propertyFeatureValidateState = 'has-error';
    this.propertyFeatureHelpBlock = 'Please select the property features';
  }
}

export default alt.createStore(AddPropertyStore);
