"use strict";
let MIN_LIKES = 15;
let MAX_LIKES = 200;

let getRandomNumber = (min, max) => {
  let genNumber = Math.floor(Math.random() * (max - min + 1) + min);
  return genNumber;
};

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

let genRandomElement = function (array) {
  let elementNumber = Math.floor(Math.random() * array.length);
  return array[elementNumber];
};

let createElement = function () {
  return {
    url: `photos/` + getRandomNumber(1, 25) + `.jpg`,
    description: genRandomElement(comments),
    likes: getRandomNumber(MIN_LIKES, MAX_LIKES),
    comments: createComments(),
  };
};

let createComment = function () {
  return {
    avatar: `img/avatar-` + getRandomNumber(1, 6) + `.svg`,
    message: genRandomElement(comments),
    name: genRandomElement(authorName),
  };
};

let createComments = function () {
  let genRandomNumber = Math.floor(Math.random() * 5 + 3);
  let feedback = [];
  for (let i = 0; i <= genRandomNumber; i++) {
    let comment = createComment();
    feedback.push(comment);
  }
  return feedback;
};

let posts = [];
for (let i = 0; i <= 24; i++) {
  let post = createElement();
  posts.push(post);
}

let pictureTemplate = document.querySelector(`#picture`).content;
let pictureContainer = document.querySelector(`.pictures`);
let fragment = document.createDocumentFragment();

for (let i = 0; i < posts.length; i++) {
  let post = posts[i];
  let pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector(`.picture__img`).src = post.url;
  pictureElement.querySelector(`.picture__likes`).textContent = post.likes;
  pictureElement.querySelector(`.picture__comments`).textContent =
    post.comments.length;

  fragment.appendChild(pictureElement);
}
pictureContainer.appendChild(fragment);
