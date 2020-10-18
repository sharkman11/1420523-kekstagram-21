"use strict";

(function () {
  let MIN_LIKES = 15;
  let MAX_LIKES = 200;


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

  let uploadForm = document.querySelector(`.img-upload__form`);

  let uploadOverlay = uploadForm.querySelector(`.img-upload__overlay`);

  let uploadFile = uploadForm.querySelector(`#upload-file`);

  let preview = uploadOverlay.querySelector(`.img-upload__preview img`);
  let closeButton = uploadOverlay.querySelector(`.img-upload__cancel`);
  let effectsList = uploadOverlay.querySelectorAll(`.effects__radio`);


  window.main = {
    comments,
    authorName,
    MIN_LIKES,
    MAX_LIKES,
    uploadOverlay,
    preview,
    closeButton,
    effectsList,
    uploadFile,
    uploadForm
  };
})();
