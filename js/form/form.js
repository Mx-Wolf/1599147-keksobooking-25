// //модуль работы с формой
import { getOfferPlaces } from '../config.js';
import { offerValidation, createOfferPristineObject, getCheckedElementList } from './validate-form.js';

// const placeList = getOfferPlace();
const places = getOfferPlaces();

const disableElement = (element) => element.setAttribute('disabled', '');
const enableElement  = (element)=>element.removeAttribute('disabled');

const disableForm = (form) => {
  form.classList.add('ad-form--disabled');
  [...form.elements].forEach(disableElement);
};

const enableForm = (form) => {
  form.classList.remove('ad-form--disabled');
  [...form.elements].forEach(enableElement);
};

// const getCheckedElementList = (form) => {
//   const formElementList = {
//     title: form.querySelector('#title'),
//     type: form.querySelector('#type'),
//     price: form.querySelector('#price'),
//     room: form.querySelector('#room_number'),
//     capacity: form.querySelector('#capacity'),
//     checkIn: form.querySelector('#timein'),
//     checkOut: form.querySelector('#timeout'),
//   };
//   return formElementList;
// };

const prepareOfferForm = (offerForm) => {

  const offerPristineObject = createOfferPristineObject(offerForm);
  const formElementList = getCheckedElementList(offerForm);

  // formElementList.checkOut.value = '13:00';

  offerValidation(offerForm, offerPristineObject);

  const onPlaceChange = (evt) => {
    // formElementList.price.placeholder = getObjItemByValue(placeList, 'kind', evt.target.value).minPrice;
    formElementList.price.placeholder = places.get(evt.target.value).minPrice;
    formElementList.price.setAttribute('min', places.get(evt.target.value).minPrice);
    offerPristineObject.validate(formElementList.price);
  };

  const onCapacityChange = () => {
    offerPristineObject.validate(formElementList.room);
    offerPristineObject.validate(formElementList.capacity);
  };

  const onCheckListener = (srcElement, destElement) => {
    srcElement.addEventListener('change', () => {
      destElement.value = srcElement.value;
    });
  };

  const onPlaceChangeListener = () => {
    formElementList.type.addEventListener('change', (evt) => onPlaceChange(evt));
  };

  const onRoomChangeListener = () => {
    formElementList.room.addEventListener('change', onCapacityChange);
  };

  const onCapacityChangeListener = () => {
    formElementList.capacity.addEventListener('change', onCapacityChange);
  };

  onPlaceChangeListener(offerForm);
  onRoomChangeListener(formElementList, offerPristineObject);
  onCapacityChangeListener(formElementList, offerPristineObject);
  onCheckListener(formElementList.checkIn, formElementList.checkOut);
  onCheckListener(formElementList.checkOut, formElementList.checkIn);
};

export { disableForm, enableForm, prepareOfferForm, getCheckedElementList };
// onPlaceChangeListener
