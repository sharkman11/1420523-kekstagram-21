"use strict";

(() => {
  const posts = window.dataModule.createData();
  window.galleryModule.initGallery(posts);
  window.pictureModule.init();
  window.formModule.initForm();
  window.load(window.galleryModule.initGallery, window.galleryModule.errorGalleryPictures);
})();
