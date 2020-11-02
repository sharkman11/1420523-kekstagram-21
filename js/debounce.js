'use strict';
(() => {


  window.debounce = (cb, debounceInterval = 500) => {
    let delay = false;

    return (...parameters) => {
      if (!delay) {
        cb(...parameters);
        delay = true;
        setTimeout(() => {
          delay = false;
        }, debounceInterval);
      }
    };
  };
})();
