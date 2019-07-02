'use strict';

(function () {

  var DEBOUNCE_INTERVAL = 500;

  var KeyCodes = {
    ESC: 27,
    ENTER: 13
  };

  var lastTimeout;

  window.utils = {
    getRandomArrayItem: function (array) {
      return array[Math.floor(Math.random() * array.length)];
    },

    getNextArrayItem: function (array, currentItem) {
      var currentIndex = array.indexOf(currentItem);
      if (currentIndex === -1) {
        return array[0];
      }
      var nextIndex = currentIndex + 1;
      if (nextIndex > (array.length - 1)) {
        nextIndex = 0;
      }

      return array[nextIndex];
    },

    shuffleArray: function (array) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[j];
        array[j] = array[i];
        array[i] = temp;
      }

      return array;
    },

    onEscPress: function (evt, cb) {
      if (evt.keyCode === KeyCodes.ESC) {
        cb();
      }
    },

    onEnterPress: function (evt, cb) {
      if (evt.keyCode === KeyCodes.ENTER) {
        cb();
      }
    },

    debounce: function (cb) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
    }
  };

})();
