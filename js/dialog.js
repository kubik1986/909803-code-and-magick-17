'use strict';

(function () {

  var setup = document.querySelector('.setup');
  var setupInitPos = {
    left: setup.style.left,
    top: setup.style.top
  };
  var setupOpenBtn = document.querySelector('.setup-open');
  var setupCloseBtn = setup.querySelector('.setup-close');
  var setupSimilarBlock = setup.querySelector('.setup-similar');
  var similarList = setupSimilarBlock.querySelector('.setup-similar-list');
  var userNameInput = setup.querySelector('.setup-user-name');
  var dialogHandler = setup.querySelector('.upload');


  var onSetupEscPress = function (evt) {
    window.utils.onEscPress(evt, closeSetup);
  };

  var onOpenBtnEnterPress = function (evt) {
    window.utils.onEnterPress(evt, openSetup);
  };

  var onCloseBtnEnterPress = function (evt) {
    window.utils.onEnterPress(evt, closeSetup);
  };

  var showSimilarBlock = function () {
    setupSimilarBlock.classList.remove('hidden');
  };

  var hideSimilarBlock = function () {
    setupSimilarBlock.classList.add('hidden');
    var last = similarList.lastChild;
    while (last) {
      similarList.removeChild(last);
      last = similarList.lastChild;
    }
  };

  var openSetup = function () {
    var wizards = window.setup.getWizards();

    window.setup.renderWizardList(wizards);
    setup.classList.remove('hidden');
    showSimilarBlock();

    document.addEventListener('keydown', onSetupEscPress);
  };

  var closeSetup = function () {
    setup.classList.add('hidden');
    setup.style.left = setupInitPos.left;
    setup.style.top = setupInitPos.top;
    hideSimilarBlock();

    document.removeEventListener('keydown', onSetupEscPress);
  };


  userNameInput.addEventListener('focus', function () {
    document.removeEventListener('keydown', onSetupEscPress);
  });
  userNameInput.addEventListener('blur', function () {
    document.addEventListener('keydown', onSetupEscPress);
  });
  setupOpenBtn.addEventListener('click', function () {
    openSetup();
  });
  setupOpenBtn.addEventListener('keydown', onOpenBtnEnterPress);
  setupCloseBtn.addEventListener('click', function () {
    closeSetup();
  });
  setupCloseBtn.addEventListener('keydown', onCloseBtnEnterPress);

  dialogHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var isDragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      isDragged = true;
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      setup.style.top = (setup.offsetTop - shift.y) + 'px';
      setup.style.left = (setup.offsetLeft - shift.x) + 'px';

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (isDragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          dialogHandler.removeEventListener('click', onClickPreventDefault);
        };

        dialogHandler.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
