"use strict";

const COMMENTS_STEP = 5;
const bigPicture = document.querySelector(`.big-picture`);
const bigPictureCancel = bigPicture.querySelector(`#picture-cancel`);
const descriptionPhoto = bigPicture.querySelector(`.social__caption`);
const likesCount = bigPicture.querySelector(`.likes-count`);
const commentsCount = bigPicture.querySelector(`.social__comment-count`);
const commentsList = bigPicture.querySelector(`.social__comments`);
const commentTemplate = bigPicture.querySelector(`.social__comment`);
const commentsLoader = bigPicture.querySelector(`.comments-loader`);

const body = document.querySelector(`body`);

commentsCount.innerHTML = `<span></span>${commentsCount.innerHTML.slice(1)}`;
const shownCommentsQuantity = commentsCount.querySelector(`span`);
const commentsQuantity = commentsCount.querySelector(`.comments-count`);

const renderComment = (comment) => {
  const commentElement = commentTemplate.cloneNode(true);
  const commentImage = commentElement.querySelector(`img`);

  commentImage.src = comment.avatar;
  commentImage.alt = comment.name;
  commentElement.querySelector(`.social__text`).textContent = comment.message;

  return commentElement;
};

const renderComments = (comments) => {
  let shownComments = comments.length;

  comments.forEach((item, i) => {
    let comment = renderComment(item);
    commentsList.appendChild(comment);

    if (i > COMMENTS_STEP - 1) {
      comment.classList.add(`hidden`);
      shownComments -= 1;
    }
  });

  shownCommentsQuantity.textContent = shownComments;
};

const onCommentsLoaderClick = () => {
  const hiddenComments = Array.from(commentsList.querySelectorAll(`.hidden`));

  const сommentsToShow = (hiddenComments.length <= COMMENTS_STEP) ? hiddenComments.length : COMMENTS_STEP;
  hiddenComments.forEach((hideComments) => {
    hideComments.classList.remove(`hidden`);
  });

  hiddenComments.splice(0, сommentsToShow);

  if (!hiddenComments.length) {
    commentsLoader.classList.add(`hidden`);
    commentsLoader.removeEventListener(`click`, onCommentsLoaderClick);
  }

  shownCommentsQuantity.textContent = +shownCommentsQuantity.textContent + сommentsToShow;
};

const openBigPicture = (post) => {
  bigPicture.classList.remove(`hidden`);
  body.classList.add(`modal-open`);

  bigPicture.querySelector(`.big-picture__img img`).src = post.url;
  likesCount.textContent = post.likes;
  commentsQuantity.textContent = post.comments.length;
  descriptionPhoto.textContent = post.description;

  window.utilModule.clearElement(commentsList);
  renderComments(post.comments);

  if (post.comments.length > COMMENTS_STEP) {
    commentsLoader.classList.remove(`hidden`);
    commentsLoader.addEventListener(`click`, onCommentsLoaderClick);
  } else {
    commentsLoader.classList.add(`hidden`);
  }

  document.addEventListener(`keydown`, onBigPictureEscPress);
  bigPictureCancel.addEventListener(`click`, closeBigPicture);
};

const closeBigPicture = () => {
  bigPicture.classList.add(`hidden`);
  body.classList.remove(`modal-open`);

  document.removeEventListener(`keydown`, onBigPictureEscPress);
  bigPictureCancel.removeEventListener(`click`, closeBigPicture);
};

const onBigPictureEscPress = (evt) => {
  window.utilModule.isEscEvent(evt, closeBigPicture);
};

window.previewModule = {
  openBigPicture
};

