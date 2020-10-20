"use strict";

(function () {
  const posts = window.dataModule.createData();
  window.galleryModule.initGallery(posts);
  window.pictureModule.init();
  window.formModule.initForm();
})();
