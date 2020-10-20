"use strict";
(function () {

  let uploadForm = document.querySelector(`.img-upload__form`);
  let uploadOverlay = uploadForm.querySelector(`.img-upload__overlay`);
  let uploadFile = uploadForm.querySelector(`#upload-file`);

  let closeButton = uploadOverlay.querySelector(`.img-upload__cancel`);
  let uploadCancel = uploadForm.querySelector(`#upload-cancel`);

  let hashtagInput = uploadOverlay.querySelector(`.text__hashtags`);

  let closeUploadForm = () => {
    uploadOverlay.classList.add(`hidden`);
    document.removeEventListener(`keydown`, onUploadOverlayEscPress);
    uploadFile.value = ``;
  };

  let onUploadOverlayEscPress = (evt) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      uploadOverlay.classList.add(`hidden`);
    }
    uploadFile.value = ``;
  };

  let onErrorCheck = function () {
    let hastagArray = hashtagInput.value.split(` `).sort();
    let re = /^#[\w]{1,19}$/;
    let errorsCount = 0;
    let tagLeft = ``;

    if (!hashtagInput.value) {
      hashtagInput.style.boxShadow = `none`;
      hashtagInput.setCustomValidity(``);
    } else {
      if (hastagArray.length > 5) {
        hashtagInput.setCustomValidity(`Может быть не более 5 хэштегов`);
        errorsCount += 1;
      } else {
        hastagArray.forEach((hashTag) => {
          hashTag = hashTag.toLowerCase();
          if (!re.test(hashTag)) {
            hashtagInput.setCustomValidity(`Хештег должен содержать в себе данные символы (a-z A-Z 0-9 _).  Количество символов от 1 до 19.`);
            errorsCount += 1;
          } else if (hashTag === tagLeft) {
            hashtagInput.setCustomValidity(`У вас есть повторяющиеся хэштеги`);
            errorsCount += 1;
            tagLeft = hashTag;
          } else {
            hashtagInput.style.boxShadow = `none`;
            tagLeft = hashTag;
          }
        });
      }
      if (errorsCount) {
        hashtagInput.style.boxShadow = `0 0 15px red`;
      } else {
        hashtagInput.style.boxShadow = `none`;
        hashtagInput.setCustomValidity(``);
      }
      hashtagInput.reportValidity();
    }
    return errorsCount;
  };

  const form = () => {
    uploadCancel.addEventListener(`click`, closeUploadForm);
    document.addEventListener(`keydown`, onUploadOverlayEscPress);

    closeButton.addEventListener(`click`, closeUploadForm);
    document.addEventListener(`keydown`, onUploadOverlayEscPress);

    hashtagInput.addEventListener(`input`, function () {
      onErrorCheck();
    });

    uploadForm.addEventListener(`submit`, function () {
      onErrorCheck();
    });
  };

  window.formModule = {
    initForm: form
  };
})();
