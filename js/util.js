'use strict';
(() => {
  const getRandomInteger = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

  const getRandomArrayItem = (array) => array[getRandomInteger(0, array.length - 1)];

  const clearElement = (element, exceptionsArray) => {
    const children = element.children;

    for (let i = children.length - 1; i >= 0; i--) {
      if (!exceptionsArray || !exceptionsArray.includes(children[i].tagName.toLowerCase(), 0)) {
        element.removeChild(children[i]);
      }
    }
  };

  window.utilModule = {
    getRandomInteger,
    getRandomArrayItem,
    clearElement,
  };
})();
