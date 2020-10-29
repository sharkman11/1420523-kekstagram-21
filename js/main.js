"use strict";

(() => {
  window.pictureModule.init();
  window.formModule.initForm();
  window.load(window.galleryModule.loadPictures, window.galleryModule.errorGalleryPictures);
})();
