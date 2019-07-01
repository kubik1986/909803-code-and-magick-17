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
    if (evt.target.classList.contains('wizard-coat')) {
      window.setup.coatColor = window.utils.getNextArrayItem(COAT_COLORS, window.setup.coatColor);
      evt.target.style.fill = window.setup.coatColor;
      coatColorInput.value = window.setup.coatColor;
      window.similar.updateWizards();
    } else if (evt.target.classList.contains('wizard-eyes')) {
      window.setup.eyesColor = window.utils.getNextArrayItem(EYES_COLORS, window.setup.eyesColor);
      evt.target.style.fill = window.setup.eyesColor;
      eyesColorInput.value = window.setup.eyesColor;
      window.similar.updateWizards();
    } else if (evt.target.classList.contains('setup-fireball')) {
      window.setup.fireballColor = window.utils.getNextArrayItem(FIREBALL_COLORS, window.setup.fireballColor);
      evt.target.parentNode.style.backgroundColor = window.setup.fireballColor;
      fireballColorInput.value = window.setup.fireballColor;
    }
  };


  setupPlayer.addEventListener('click', function (evt) {
    customizeWizard(evt);
  });

  window.setup = {
    coatColor: 'rgb(101, 137, 164)',
    eyesColor: 'black',
    fireballColor: '#ee4830',
    artifacts: []
  };

})();
