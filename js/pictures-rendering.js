"use strict";

(() => {
  const pictureTemplate = document.querySelector(`#picture`).content;
  const pictureContainer = document.querySelector(`.pictures`);
  const fragment = document.createDocumentFragment();


  const renderPictures = (posts) => {
    posts.forEach((post) => {
      const pictureElement = pictureTemplate.cloneNode(true);
      pictureElement.querySelector(`.picture__img`).src = post.url;
      pictureElement.querySelector(`.picture__likes`).textContent = post.likes;
      pictureElement.querySelector(`.picture__comments`).textContent = post.comments.length;
      pictureElement.querySelector(`.picture`).addEventListener(`click`, () => {
        window.previewModule.openBigPicture(post);
      });
      fragment.appendChild(pictureElement);

      pictureContainer.appendChild(fragment);
    });
  };

  window.picturesRenderingModule = {
    renderPictures,
  };
})();
