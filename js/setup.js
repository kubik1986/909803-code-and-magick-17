'use strict';

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var SIMILAR_WIZARDS_AMOUNT = 4;

var KeyCodes = {
  ESC: 27,
  ENTER: 13
};

var setupOpenBtn = document.querySelector('.setup-open');
var setup = document.querySelector('.setup');
var setupCloseBtn = setup.querySelector('.setup-close');
var setupPlayer = setup.querySelector('.setup-player');
var coatColorInput = setupPlayer.querySelector('input[name="coat-color"]');
var eyesColorInput = setupPlayer.querySelector('input[name="eyes-color"]');
var fireballColorInput = setupPlayer.querySelector('input[name="fireball-color"]');
var setupSimilarBlock = setup.querySelector('.setup-similar');
var similarList = setupSimilarBlock.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');
var isWizardListRendered = false;

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

var showSimilarBlock = function () {
  setupSimilarBlock.classList.remove('hidden');
  isWizardListRendered = true;
};

var hideSimilarBlock = function () {
  setupSimilarBlock.classList.add('hidden');
  var last = similarList.lastChild;
  while (last) {
    similarList.removeChild(last);
    last = similarList.lastChild;
  }
  isWizardListRendered = false;
};

var onSetupEscPress = function (evt) {
  if (evt.keyCode === KeyCodes.ESC) {
    closeSetup();
  }
};

var openSetup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onSetupEscPress);
  if (!isWizardListRendered) {
    var wizards = getWizards(SIMILAR_WIZARDS_AMOUNT, NAMES, SURNAMES, COAT_COLORS, EYES_COLORS);
    renderWizardList(wizards);
    showSimilarBlock();
  }
};

var closeSetup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onSetupEscPress);
  hideSimilarBlock();
};

var customizeWizard = function (evt) {
  var color;
  if (evt.target.classList.contains('wizard-coat')) {
    color = getRandomArrayItem(COAT_COLORS);
    evt.target.style.fill = color;
    coatColorInput.value = color;
  } else if (evt.target.classList.contains('wizard-eyes')) {
    color = getRandomArrayItem(EYES_COLORS);
    evt.target.style.fill = color;
    eyesColorInput.value = color;
  } else if (evt.target.classList.contains('setup-fireball')) {
    color = getRandomArrayItem(FIREBALL_COLORS);
    evt.target.parentNode.style.backgroundColor = color;
    fireballColorInput.value = color;
  }
};

setup.addEventListener('focus', function (evt) {
  if (evt.target.classList.contains('setup-user-name')) {
    document.removeEventListener('keydown', onSetupEscPress);
  } else {
    document.addEventListener('keydown', onSetupEscPress);
  }
}, true);

setupOpenBtn.addEventListener('click', function () {
  openSetup();
});

setupOpenBtn.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KeyCodes.ENTER) {
    openSetup();
  }
});

setupCloseBtn.addEventListener('click', function () {
  closeSetup();
});

setupCloseBtn.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KeyCodes.ENTER) {
    closeSetup();
  }
});

setupPlayer.addEventListener('click', function (evt) {
  customizeWizard(evt);
});
