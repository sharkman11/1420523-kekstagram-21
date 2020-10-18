"use strict";

(function () {
  let pictureTemplate = document.querySelector(`#picture`).content;
  let pictureContainer = document.querySelector(`.pictures`);
  let fragment = document.createDocumentFragment();
  let bigPicture = document.querySelector(`.big-picture`);

  let openBigPicture = (post) => {
    bigPicture.classList.remove(`hidden`);
    document.body.classList.add(`modal-open`);

    bigPicture.querySelector(`.big-picture__img img`).src = post.url;

    document.addEventListener(`keydown`, onBigPictureEscPress);
  };

  for (let i = 0; i < window.util.posts.length; i++) {
    let post = window.util.posts[i];
    let pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector(`.picture__img`).src = post.url;
    pictureElement.querySelector(`.picture__likes`).textContent = post.likes;
    pictureElement.querySelector(`.picture__comments`).textContent =
      post.comments.length;
    pictureElement.querySelector(`.picture`).addEventListener(`click`, () => {
      openBigPicture(post);
    });
    fragment.appendChild(pictureElement);
  }
  pictureContainer.appendChild(fragment);

  let bigPictureCancel = bigPicture.querySelector(`#picture-cancel`);

  let closeBigPicture = () => {
    bigPicture.classList.add(`hidden`);
    document.body.classList.remove(`modal-open`);
    document.removeEventListener(`keydown`, onBigPictureEscPress);
  };

  let onBigPictureEscPress = (evt) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      bigPicture.classList.add(`hidden`);
    }
  };

  bigPictureCancel.addEventListener(`click`, closeBigPicture);
})();
