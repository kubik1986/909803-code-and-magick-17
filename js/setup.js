'use strict';

(function () {

  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var setup = document.querySelector('.setup');
  var setupPlayer = setup.querySelector('.setup-player');
  var coatColorInput = setupPlayer.querySelector('input[name="coat-color"]');
  var eyesColorInput = setupPlayer.querySelector('input[name="eyes-color"]');
  var fireballColorInput = setupPlayer.querySelector('input[name="fireball-color"]');


  var customizeWizard = function (evt) {
    var color;
    if (evt.target.classList.contains('wizard-coat')) {
      color = window.utils.getRandomArrayItem(COAT_COLORS);
      evt.target.style.fill = color;
      coatColorInput.value = color;
    } else if (evt.target.classList.contains('wizard-eyes')) {
      color = window.utils.getRandomArrayItem(EYES_COLORS);
      evt.target.style.fill = color;
      eyesColorInput.value = color;
    } else if (evt.target.classList.contains('setup-fireball')) {
      color = window.utils.getRandomArrayItem(FIREBALL_COLORS);
      evt.target.parentNode.style.backgroundColor = color;
      fireballColorInput.value = color;
    }
  };


  setupPlayer.addEventListener('click', function (evt) {
    customizeWizard(evt);
  });

})();
