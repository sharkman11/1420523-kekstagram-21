"use strict";

(function () {
  let uploadPhoto = () => {
    let file = window.main.uploadFile.files[0];
    let reader = new FileReader();

    reader.addEventListener(`loadend`, () => {
      window.main.preview.src = reader.result;
    });

    if (file) {
      reader.readAsDataURL(file);
    } else {
      window.main.preview.src = ``;
    }

    window.main.uploadOverlay.classList.remove(`hidden`);
  };
  window.main.uploadFile.addEventListener(`change`, uploadPhoto);

  let uploadCancel = window.main.uploadForm.querySelector(`#upload-cancel`);

  let closeUploadForm = () => {
    window.main.uploadOverlay.classList.add(`hidden`);
    document.removeEventListener(`keydown`, onUploadOverlayEscPress);
    window.main.uploadFile.value = ``;
  };

  let onUploadOverlayEscPress = (evt) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      window.main.uploadOverlay.classList.add(`hidden`);
    }
    window.main.uploadFile.value = ``;
  };


  uploadCancel.addEventListener(`click`, closeUploadForm);
  document.addEventListener(`keydown`, onUploadOverlayEscPress);
})();
