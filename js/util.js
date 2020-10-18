'use strict';

(function () {

  let getRandomNumber = (min, max) => {
    let genNumber = Math.floor(Math.random() * (max - min + 1) + min);
    return genNumber;
  };
  let genRandomElement = function (array) {
    let elementNumber = Math.floor(Math.random() * array.length);
    return array[elementNumber];
  };

  let createElement = function () {
    return {
      url: `photos/` + getRandomNumber(1, 25) + `.jpg`,
      description: genRandomElement(window.main.comments),
      likes: getRandomNumber(window.main.MIN_LIKES, window.main.MAX_LIKES),
      comments: createComments(),
    };
  };
  let createComment = function () {
    return {
      avatar: `img/avatar-` + getRandomNumber(1, 6) + `.svg`,
      message: genRandomElement(window.main.comments),
      name: genRandomElement(window.main.authorName),
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
  window.util = {
    posts
  };
})();
