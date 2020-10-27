"use strict";

(() => {
  const pictureTemplate = document.querySelector(`#picture`).content;
  const pictureContainer = document.querySelector(`.pictures`);
  const fragment = document.createDocumentFragment();

  const gallery = (posts) => {
    for (let i = 0; i < posts.length; i++) {
      let post = posts[i];
      let pictureElement = pictureTemplate.cloneNode(true);
      pictureElement.querySelector(`.picture__img`).src = post.url;
      pictureElement.querySelector(`.picture__likes`).textContent = post.likes;
      pictureElement.querySelector(`.picture__comments`).textContent =
        post.comments.length;
      pictureElement.querySelector(`.picture`).addEventListener(`click`, () => {
        window.previewModule.openBigPicture(post);
      });
      fragment.appendChild(pictureElement);
    }
    pictureContainer.appendChild(fragment);
  };

  const body = document.querySelector(`body`);

  const errorGalleryPictures = (errorMessageText) => {
    const errorMessage = document.createElement(`div`);
    const errorImage = document.createElement(`img`);
    const errorText = document.createElement(`span`);

    errorImage.src = `img/icon-warning.svg`;
    errorImage.style = `width: 30px; height: 30px; margin-right: 20px; vertical-align: bottom;`;

    errorText.textContent = errorMessageText;

    errorMessage.style = `position: absolute; top: 10px; right: 0; left: 0; padding: 10px; font-family: "Open Sans", "Arial", sans-serif; text-align: center; font-weight: 700; font-size: 20px; color: #ffe753; background-color: #3c3614; border-radius: 10px;`;
    errorMessage.classList.add(`container`);

    errorMessage.appendChild(errorImage);
    errorMessage.appendChild(errorText);

    body.appendChild(errorMessage);
  };

  window.galleryModule = {
    initGallery: gallery,
    errorGalleryPictures,
  };
})();
