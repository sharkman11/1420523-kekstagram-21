'use strict';
(() => {


  window.debounce = (cb, DEBOUNCE_INTERVAL) => {
    DEBOUNCE_INTERVAL = 500;
    let delay = false;

    return (...parameters) => {
      if (!delay) {
        cb(...parameters);
        delay = true;
        setTimeout(() => {
          delay = false;
        }, DEBOUNCE_INTERVAL);
      }
    };
  };
})();
