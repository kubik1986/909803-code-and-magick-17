'use strict';

(function () {

  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var SIMILAR_WIZARDS_AMOUNT = 4;

  var setup = document.querySelector('.setup');
  var similarList = setup.querySelector('.setup-similar-list');
  var setupPlayer = setup.querySelector('.setup-player');
  var coatColorInput = setupPlayer.querySelector('input[name="coat-color"]');
  var eyesColorInput = setupPlayer.querySelector('input[name="eyes-color"]');
  var fireballColorInput = setupPlayer.querySelector('input[name="fireball-color"]');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');


  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

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

  window.setup = {
    renderWizardList: function (wizards) {
      var fragment = document.createDocumentFragment();
      wizards = window.utils.shuffleArray(wizards);
      var wizardsAmount = wizards.length < SIMILAR_WIZARDS_AMOUNT ? wizards.length : SIMILAR_WIZARDS_AMOUNT;

      for (var i = 0; i < wizardsAmount; i++) {
        fragment.appendChild(renderWizard(wizards[i]));
      }
      similarList.appendChild(fragment);
    }
  };


  setupPlayer.addEventListener('click', function (evt) {
    customizeWizard(evt);
  });

})();
