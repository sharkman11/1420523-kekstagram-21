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


// ////;

let MAX_LEVEL = 100;
let MIN_BRIGHTNESS_LEVEL = 1;
let MAX_BRIGHTNESS_COEFFICIENT = 2;
let MAX_BLUR_COEFFICIENT = 3;
let MAX_SCALE = 100;
let MIN_SCALE = 25;
let SCALE_STEP = 25;

let uploadForm = document.querySelector(`.img-upload__form`);
let uploadOverlay = uploadForm.querySelector(`.img-upload__overlay`);
let uploadFile = uploadForm.querySelector(`#upload-file`);
let preview = uploadOverlay.querySelector(`.img-upload__preview img`);
let closeButton = uploadOverlay.querySelector(`.img-upload__cancel`);
let effectsList = uploadOverlay.querySelectorAll(`.effects__radio`);
let effectLevelSlider = uploadOverlay.querySelector(`.img-upload__effect-level`);
let effectLevelLine = effectLevelSlider.querySelector(`.effect-level__line`);
let effectLevelPin = effectLevelSlider.querySelector(`.effect-level__pin`);
let effectLevelDepth = effectLevelSlider.querySelector(`.effect-level__depth`);
let effectLevelValue = effectLevelSlider.querySelector(`.effect-level__value`);
let hashtagInput = uploadOverlay.querySelector(`.text__hashtags`);

let effectValue = ``;

let scaleControlSmaller = uploadOverlay.querySelector(`.scale__control--smaller`);
let scaleControlBigger = uploadOverlay.querySelector(`.scale__control--bigger`);
let scaleControlValue = uploadOverlay.querySelector(`.scale__control--value`);


let uploadPhoto = () => {
  let file = uploadFile.files[0];
  let reader = new FileReader();

  reader.addEventListener(`loadend`, () => {
    preview.src = reader.result;
  });

  if (file) {
    reader.readAsDataURL(file);
  } else {
    preview.src = ``;
  }

  uploadOverlay.classList.remove(`hidden`);
};
uploadFile.addEventListener(`change`, uploadPhoto);

let uploadCancel = uploadForm.querySelector(`#upload-cancel`);

let closeUploadForm = () => {
  uploadOverlay.classList.add(`hidden`);
  document.removeEventListener(`keydown`, onUploadOverlayEscPress);
  uploadFile.value = ``;
};

let onUploadOverlayEscPress = (evt) => {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    uploadOverlay.classList.add(`hidden`);
  }
  uploadFile.value = ``;
};


uploadCancel.addEventListener(`click`, closeUploadForm);
document.addEventListener(`keydown`, onUploadOverlayEscPress);

let changeScale = function (direction) {
  let currentValue = scaleControlValue.value.substring(0, scaleControlValue.value.length - 1);
  let newValue = currentValue;
  if (direction === `bigger` && newValue < MAX_SCALE) {
    newValue = parseInt(currentValue, 10) + SCALE_STEP;
  } else if (direction === `smaller` && newValue > MIN_SCALE) {
    newValue = parseInt(currentValue, 10) - SCALE_STEP;
  }
  scaleControlValue.value = newValue + `%`;
  preview.style.transform = `scale(` + newValue / 100 + `)`;
};

let onScaleButtonSmallerPress = function () {
  changeScale(`smaller`);
};

let onScaleButtonBiggerPress = function () {
  changeScale(`bigger`);
};

let onUseEffect = function (effect, level) {
  if (effect === `chrome`) {
    preview.style.filter = `grayscale(` + level / 100 + `)`;
  } else if (effect === `sepia`) {
    preview.style.filter = `sepia(` + level / 100 + `)`;
  } else if (effect === `marvin`) {
    preview.style.filter = `invert(` + level + `%)`;
  } else if (effect === `phobos`) {
    preview.style.filter = `blur(` + level / 100 * MAX_BLUR_COEFFICIENT + `px)`;
  } else if (effect === `heat`) {
    let brightnessLevel = MIN_BRIGHTNESS_LEVEL + (level / 100 * MAX_BRIGHTNESS_COEFFICIENT);
    preview.style.filter = `brightness(` + brightnessLevel + `)`;
  }
  effectLevelValue.value = level;
};

let onPinMove = function (evt) {
  evt.preventDefault();

  let startPosition = {
    x: evt.clientX
  };

  let onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    let shift = {
      x: startPosition.x - moveEvt.clientX
    };

    startPosition = {
      x: moveEvt.clientX
    };

    let newPosition = effectLevelPin.offsetLeft - shift.x;

    if (newPosition < 0) {
      effectLevelPin.style.left = `0`;
    } else if (newPosition > effectLevelLine.offsetWidth) {
      effectLevelPin.style.left = effectLevelLine.offsetWidth + `px`;
    } else {
      effectLevelPin.style.left = newPosition + `px`;
    }

    effectLevelDepth.style.width = effectLevelPin.style.left;
  };

  let onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);


    let currentLevel = (effectLevelPin.offsetLeft * 100 / effectLevelLine.offsetWidth).toFixed(0);

    onUseEffect(effectValue, currentLevel);
  };

  document.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);
};

let onChangeEffect = function (effect) {
  effectValue = effect.value;
  if (effectValue === `none`) {
    preview.removeAttribute(`class`);
    preview.style.filter = `none`;
    effectLevelSlider.classList.add(`hidden`);
  } else {
    effectLevelSlider.classList.remove(`hidden`);
    preview.removeAttribute(`class`);
    preview.classList.add(`effects__preview--` + effectValue);
    onUseEffect(effectValue, MAX_LEVEL);
    effectLevelPin.style.left = effectLevelLine.offsetWidth + `px`;
    effectLevelDepth.style.width = effectLevelPin.style.left;
    effectLevelPin.addEventListener(`mousedown`, onPinMove);
  }
};

uploadFile.onchange = function () {
  uploadOverlay.classList.remove(`hidden`);
  document.classList.add(`modal-open`);

  effectLevelSlider.classList.add(`hidden`);

  closeButton.addEventListener(`click`, closeUploadForm);
  document.addEventListener(`keydown`, onUploadOverlayEscPress);

  effectsList.forEach((effect) => {
    effect.addEventListener(`change`, function () {
      onChangeEffect(effect);
    });
  });
  scaleControlValue.value = MAX_SCALE + `%`;
  scaleControlSmaller.addEventListener(`click`, onScaleButtonSmallerPress);
  scaleControlBigger.addEventListener(`click`, onScaleButtonBiggerPress);
};

let onErrorCheck = function () {
  let hastagArray = hashtagInput.value.split(` `).sort();
  let re = /^#[\w]{1,19}$/;
  let errorsCount = 0;
  let tagLeft = ``;

  if (!hashtagInput.value) {
    hashtagInput.style.boxShadow = `none`;
    hashtagInput.setCustomValidity(``);
  } else {
    if (hastagArray.length > 5) {
      hashtagInput.setCustomValidity(`Может быть не более 5 хэштегов`);
      errorsCount += 1;
    } else {
      hastagArray.forEach((hashTag) => {
        hashTag = hashTag.toLowerCase();
        if (!re.test(hashTag)) {
          hashtagInput.setCustomValidity(`Хештег должен соответсвовать критериям`);
          errorsCount += 1;

        } else if (hashTag === tagLeft) {
          hashtagInput.setCustomValidity(`У вас есть повторяющиеся хэштеги`);
          errorsCount += 1;
          tagLeft = hashTag;
        } else {
          hashtagInput.style.boxShadow = `none`;
          tagLeft = hashTag;
        }
      });
    }
    if (errorsCount) {

      hashtagInput.style.boxShadow = `0 0 15px red`;
    } else {

      hashtagInput.style.boxShadow = `none`;
      hashtagInput.setCustomValidity(``);
    }
    hashtagInput.reportValidity();
  }
  return errorsCount;
};

hashtagInput.addEventListener(`input`, function () {
  onErrorCheck();
});

uploadForm.addEventListener(`submit`, function () {
  onErrorCheck();
});
