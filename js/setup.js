'use strict';

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var SIMILAR_WIZARDS_AMOUNT = 4;

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var setupSimilarBlock = userDialog.querySelector('.setup-similar');

var similarList = setupSimilarBlock.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

var getRandomArrayItem = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var getWizards = function (amount, names, surnames, coatColors, eyesColors) {
  var result = [];

  for (var i = 0; i < amount; i++) {
    result.push({
      name: getRandomArrayItem(names) + ' ' + getRandomArrayItem(surnames),
      coatColor: getRandomArrayItem(coatColors),
      eyesColor: getRandomArrayItem(eyesColors)
    });
  }

  return result;
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var renderWizardList = function (wizards) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  similarList.appendChild(fragment);
};

var wizards = getWizards(SIMILAR_WIZARDS_AMOUNT, NAMES, SURNAMES, COAT_COLORS, EYES_COLORS);

renderWizardList(wizards);
setupSimilarBlock.classList.remove('hidden');
