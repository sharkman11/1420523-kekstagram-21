"use strict";

(() => {
  const uploadForm = document.querySelector(`.img-upload__form`);
  const uploadPopup = uploadForm.querySelector(`.img-upload__overlay`);
  const uploadFile = uploadForm.querySelector(`#upload-file`);
  const uploadPopupClose = uploadPopup.querySelector(`.img-upload__cancel`);
  const preview = uploadPopup.querySelector(`.img-upload__preview img`);
  const effectsPrewiews = uploadPopup.querySelectorAll(`.effects__preview`);
  const effectLevelControl = uploadPopup.querySelector(`.effect-level`);
  const effectRange = effectLevelControl.querySelector(`.effect-level__line`);
  const effectLevelPin = effectRange.querySelector(`.effect-level__pin`);
  const scalePlusControl = uploadForm.querySelector(`.scale__control--bigger`);
  const scaleMinusControl = uploadForm.querySelector(`.scale__control--smaller`);
  const hashtagsInput = uploadForm.querySelector(`.text__hashtags`);
  const commentInput = uploadForm.querySelector(`.text__description`);

  const body = document.querySelector(`body`);

  let uploadPhoto = () => {
    const uploadFileURL = URL.createObjectURL(uploadFile.files[0]);

    preview.src = uploadFileURL;
    for (let i = 0; i < effectsPrewiews.length; i++) {
      effectsPrewiews[i].style.backgroundImage = `url(${uploadFileURL})`;
    }
  };
  const getDefaultFormSettings = () => {
    uploadForm.reset();
    window.uploadFormImageSettingsModule.getDefaultEffectSettings();
    window.uploadFormImageSettingsModule.getDefaultScaleSettings();
  };

  const onUploadPopupEscPress = (evt) => {
    if (evt.key === `Escape` && document.activeElement !== hashtagsInput && document.activeElement !== commentInput) {
      evt.preventDefault();
      closeUploadPopup();
    }
  };

  const onUploadFormSubmit = (evt) => {
    evt.preventDefault();
    window.upload(new FormData(uploadForm), onSuccess, onError);
  };

  const onSuccess = () => {
    window.uploadFormStatusMessageModule.openStatusMessage(`success`);
    closeUploadPopup();
  };

  const onError = () => {
    window.uploadFormStatusMessageModule.openStatusMessage(`error`);
    closeUploadPopup();
  };

  const openUploadPopup = () => {
    uploadPopup.classList.remove(`hidden`);
    body.classList.add(`modal-open`);

    document.addEventListener(`keydown`, onUploadPopupEscPress);
    uploadPopupClose.addEventListener(`click`, closeUploadPopup);
    uploadForm.addEventListener(`change`, window.uploadFormImageSettingsModule.onEffectChange);
    effectRange.addEventListener(`click`, window.uploadFormImageSettingsModule.onEffectRangeClick);
    effectLevelPin.addEventListener(`mousedown`, window.uploadFormImageSettingsModule.onEffectPinMouseDown);
    effectLevelPin.addEventListener(`keydown`, window.uploadFormImageSettingsModule.onEffectPinKeydown);
    scalePlusControl.addEventListener(`click`, window.uploadFormImageSettingsModule.onPlusScaleButtonClick);
    scaleMinusControl.addEventListener(`click`, window.uploadFormImageSettingsModule.onMinusScaleButtonClick);
    hashtagsInput.addEventListener(`input`, window.uploadFormValidityModule.onHashtagInputInput);
    commentInput.addEventListener(`input`, window.uploadFormValidityModule.onCommentInputInput);
    uploadForm.addEventListener(`submit`, onUploadFormSubmit);
  };

  const closeUploadPopup = () => {
    uploadPopup.classList.add(`hidden`);
    body.classList.remove(`modal-open`);

    getDefaultFormSettings();

    document.removeEventListener(`keydown`, onUploadPopupEscPress);
    uploadPopupClose.removeEventListener(`click`, closeUploadPopup);
    uploadForm.removeEventListener(`change`, window.uploadFormImageSettingsModule.onEffectChange);
    effectRange.removeEventListener(`click`, window.uploadFormImageSettingsModule.onEffectRangeClick);
    effectLevelPin.removeEventListener(`mousedown`, window.uploadFormImageSettingsModule.onEffectPinMouseDown);
    effectLevelPin.removeEventListener(`keydown`, window.uploadFormImageSettingsModule.onEffectPinKeydown);
    scalePlusControl.removeEventListener(`click`, window.uploadFormImageSettingsModule.onPlusScaleButtonClick);
    scaleMinusControl.removeEventListener(`click`, window.uploadFormImageSettingsModule.onMinusScaleButtonClick);
    hashtagsInput.removeEventListener(`input`, window.uploadFormValidityModule.onHashtagInputInput);
    commentInput.removeEventListener(`input`, window.uploadFormValidityModule.onCommentInputInput);
    uploadForm.removeEventListener(`submit`, onUploadFormSubmit);
  };

  window.pictureModule = {
    uploadPhoto,
    openUploadPopup
  };
})();
