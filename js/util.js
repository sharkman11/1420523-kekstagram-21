'use strict';

(function () {
  window.util = {
    getRandomNumber(min, max) {
      let genNumber = Math.floor(Math.random() * (max - min + 1) + min);
      return genNumber;
    }
  };
})();
