"use strict";

(() => {
  const bigPicture = document.querySelector(`.big-picture`);
  const bigPictureCancel = bigPicture.querySelector(`#picture-cancel`);

  const openBigPicture = (post) => {
    bigPicture.classList.remove(`hidden`);
    document.body.classList.add(`modal-open`);

    bigPicture.querySelector(`.big-picture__img img`).src = post.url;

    document.addEventListener(`keydown`, onBigPictureEscPress);
    bigPictureCancel.addEventListener(`click`, closeBigPicture);
  };

  const closeBigPicture = () => {
    bigPicture.classList.add(`hidden`);
    document.body.classList.remove(`modal-open`);

    document.removeEventListener(`keydown`, onBigPictureEscPress);
    bigPictureCancel.removeEventListener(`click`, closeBigPicture);
  };

  const onBigPictureEscPress = (evt) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      bigPicture.classList.add(`hidden`);
    }
  };

  window.previewModule = {
    openBigPicture
  };
})();
