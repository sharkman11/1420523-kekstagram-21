"use strict";

(() => {
  window.pictureModule.init();
  window.formModule.initForm();
  window.load(window.galleryModule.initGallery, window.galleryModule.errorGalleryPictures);
})();
