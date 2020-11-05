"use strict";

const TIMEOUT_IN_MS = 10000;
const serverDownloadURL = `https://21.javascript.pages.academy/kekstagram/data`;

window.load(serverDownloadURL, `GET`, window.galleryModule.loadPictures, window.galleryModule.errorGalleryPictures, TIMEOUT_IN_MS
);
const uploadFileInput = document.querySelector(`.img-upload__input`);

window.uploadFormImageSettingsModule.getDefaultEffectSettings();
window.uploadFormImageSettingsModule.getDefaultScaleSettings();

uploadFileInput.addEventListener(`change`, () => {
  window.pictureModule.uploadPhoto();
  window.pictureModule.openUploadPopup();
});
