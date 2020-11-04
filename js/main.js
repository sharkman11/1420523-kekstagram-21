"use strict";

(() => {
  const uploadFileInput = document.querySelector(`.img-upload__input`);
  window.load(window.galleryModule.loadPictures, window.galleryModule.errorGalleryPictures);

  window.uploadFormImageSettingsModule.getDefaultEffectSettings();
  window.uploadFormImageSettingsModule.getDefaultScaleSettings();

  uploadFileInput.addEventListener(`change`, () => {
    window.pictureModule.uploadPhoto();
    window.pictureModule.openUploadPopup();
  });
})();
