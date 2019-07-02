'use strict';

(function () {

  var SIMILAR_WIZARDS_AMOUNT = 4;

  var similarList = document.querySelector('.setup-similar-list');
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

  window.renderWizards = function (wizards) {
    var fragment = document.createDocumentFragment();
    var wizardsAmount = wizards.length < SIMILAR_WIZARDS_AMOUNT ? wizards.length : SIMILAR_WIZARDS_AMOUNT;

    for (var i = 0; i < wizardsAmount; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    similarList.appendChild(fragment);
  };

})();
