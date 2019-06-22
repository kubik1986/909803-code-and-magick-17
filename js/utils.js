'use strict';

(function () {

  var KeyCodes = {
    ESC: 27,
    ENTER: 13
  };

  window.utils = {
    getRandomArrayItem: function (array) {
      return array[Math.floor(Math.random() * array.length)];
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

    showError: function (errorText) {
      var errorElement = document.createElement('div');
      var styles = [
        'z-index: 100',
        'position: absolute',
        'left: 0',
        'right: 0',
        'top: 0',
        'padding: 10px',
        'font-size: 30px',
        'text-align: center',
        'background-color: red'
      ];

      errorElement.classList.add('net-error');
      errorElement.style = styles.join(';');
      errorElement.textContent = errorText;
      document.body.insertAdjacentElement('afterbegin', errorElement);
    },

    clearErrors: function () {
      var errors = document.querySelectorAll('.net-error');
      errors.forEach(function (error) {
        error.remove();
      });
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
  };

})();
