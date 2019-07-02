'use strict';

(function () {

  window.alerts = {
    isError: false,

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
    }
  };

})();
