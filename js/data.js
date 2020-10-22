"use strict";

(() => {
  const MIN_LIKES = 15;
  const MAX_LIKES = 200;

  const comments = [
    `Всё отлично!`,
    `В целом всё неплохо. Но не всё.`,
    `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
    `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
    `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
    `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`,
  ];
  const authorName = [
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

  const getRandomNumber = (min, max) => {
    const genNumber = Math.floor(Math.random() * (max - min + 1) + min);
    return genNumber;
  };

  const genRandomElement = function (array) {
    const elementNumber = Math.floor(Math.random() * array.length);
    return array[elementNumber];
  };

  const createComment = () => {
    return {
      avatar: `img/avatar-` + getRandomNumber(1, 6) + `.svg`,
      message: genRandomElement(comments),
      name: genRandomElement(authorName),
    };
  };

  const getComments = () => {
    const genRandomNumber = Math.floor(Math.random() * 5 + 3);
    const feedback = [];
    for (let i = 0; i <= genRandomNumber; i++) {
      let comment = createComment();
      feedback.push(comment);
    }
    return feedback;
  };

  const createElement = () => {
    return {
      url: `photos/` + getRandomNumber(1, 25) + `.jpg`,
      description: genRandomElement(comments),
      likes: getRandomNumber(MIN_LIKES, MAX_LIKES),
      comments: getComments(),
    };
  };

  const createData = () => {
    const posts = [];
    for (let i = 0; i <= 24; i++) {
      let post = createElement();
      posts.push(post);
    }
    return posts;
  };

  window.dataModule = {
    createData
  };
})();
