"use strict";

(function () {
  let comments = [
    `Всё отлично!`,
    `В целом всё неплохо. Но не всё.`,
    `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
    `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
    `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
    `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`,
  ];
  let authorName = [
    `Леонид`,
    `Максим`,
    `Екатерина`,
    `Владимир`,
    `Мария`,
    `Антон`,
    `Настя`,
    `Егор`,
    `Ира`,
    `Алексей`,
    `Саша`,
    `Рита`,
    `Михаил`,
    `Сёма`,
    `Ксюша`,
  ];
  let MIN_LIKES = 15;
  let MAX_LIKES = 200;


  let createComments = function () {
    let genRandomNumber = Math.floor(Math.random() * 5 + 3);
    let feedback = [];
    for (let i = 0; i <= genRandomNumber; i++) {
      let comment = createComment();
      feedback.push(comment);
    }
    return feedback;
  };
  let genRandomElement = function (array) {
    let elementNumber = Math.floor(Math.random() * array.length);
    return array[elementNumber];
  };

  let createElement = function () {
    return {
      url: `photos/` + window.util.getRandomNumber(1, 25) + `.jpg`,
      description: genRandomElement(comments),
      likes: window.util.getRandomNumber(MIN_LIKES, MAX_LIKES),
      comments: createComments(),
    };
  };

  let createComment = function () {
    return {
      avatar: `img/avatar-` + window.util.getRandomNumber(1, 6) + `.svg`,
      message: genRandomElement(comments),
      name: genRandomElement(authorName),
    };
  };

  let posts = [];
  for (let i = 0; i <= 24; i++) {
    let post = createElement();
    posts.push(post);
  }

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
  for (let i = 0; i < posts.length; i++) {
    let post = posts[i];
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
