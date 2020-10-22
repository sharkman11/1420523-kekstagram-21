"use strict";

(() => {
  let uploadForm = document.querySelector(`.img-upload__form`);
  let uploadOverlay = uploadForm.querySelector(`.img-upload__overlay`);
  let uploadFile = uploadForm.querySelector(`#upload-file`);

  let preview = uploadOverlay.querySelector(`.img-upload__preview img`);
  let effectsList = uploadOverlay.querySelectorAll(`.effects__radio`);
  let effectLevelSlider = uploadOverlay.querySelector(`.img-upload__effect-level`
  );
  let effectLevelLine = effectLevelSlider.querySelector(`.effect-level__line`);
  let effectLevelPin = effectLevelSlider.querySelector(`.effect-level__pin`);
  let effectLevelDepth = effectLevelSlider.querySelector(`.effect-level__depth`
  );
  let effectLevelValue = effectLevelSlider.querySelector(`.effect-level__value`
  );

  let effectValue = ``;

  let scaleControlSmaller = uploadOverlay.querySelector(`.scale__control--smaller`
  );
  let scaleControlBigger = uploadOverlay.querySelector(`.scale__control--bigger`
  );
  let scaleControlValue = uploadOverlay.querySelector(`.scale__control--value`);
  let MAX_LEVEL = 100;
  let MIN_BRIGHTNESS_LEVEL = 1;
  let MAX_BRIGHTNESS_COEFFICIENT = 2;
  let MAX_BLUR_COEFFICIENT = 3;
  let MAX_SCALE = 100;
  let MIN_SCALE = 25;
  let SCALE_STEP = 25;

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

  let onScaleButtonSmallerPress = () => {
    changeScale(`smaller`);
  };

  let onScaleButtonBiggerPress = () =>{
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
      preview.style.filter =
        `blur(` + (level / 100) * MAX_BLUR_COEFFICIENT + `px)`;
    } else if (effect === `heat`) {
      let brightnessLevel =
        MIN_BRIGHTNESS_LEVEL + (level / 100) * MAX_BRIGHTNESS_COEFFICIENT;
      preview.style.filter = `brightness(` + brightnessLevel + `)`;
    }
    effectLevelValue.value = level;
  };

  let onPinMove = function (evt) {
    evt.preventDefault();

    let startPosition = {
      x: evt.clientX,
    };

    let onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      let shift = {
        x: startPosition.x - moveEvt.clientX,
      };

      startPosition = {
        x: moveEvt.clientX,
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

      let currentLevel = (
        (effectLevelPin.offsetLeft * 100) /
        effectLevelLine.offsetWidth
      ).toFixed(0);

      onUseEffect(effectValue, currentLevel);
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  };

  let oninputEffect = function (effect) {
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


  let init = () => {
    uploadFile.addEventListener(`change`, () => {
      uploadOverlay.classList.remove(`hidden`);
      document.body.classList.add(`modal-open`);
      effectLevelSlider.classList.add(`hidden`);

      effectsList.forEach((effect) => {
        effect.addEventListener(`change`, () => {
          oninputEffect(effect);
        });
      });
      scaleControlValue.value = MAX_SCALE + `%`;
      scaleControlSmaller.addEventListener(`click`, onScaleButtonSmallerPress);
      scaleControlBigger.addEventListener(`click`, onScaleButtonBiggerPress);
    });
  };

  window.pictureModule = {
    init
  };
})();
