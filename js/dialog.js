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
  var userNameInput = setup.querySelector('.setup-user-name');
  var dialogHandle = setup.querySelector('.upload');
  var form = setup.querySelector('.setup-wizard-form');
  var formSubmit = form.querySelector('.setup-submit');


  var onSetupEscPress = function (evt) {
    if (window.alerts.isError) {
      window.utils.onEscPress(evt, window.alerts.clearErrors);
      window.alerts.isError = false;
    } else {
      window.utils.onEscPress(evt, closeSetup);
    }
  };

  var onOpenBtnClick = function () {
    openSetup();
  };

  var onOpenBtnEnterPress = function (evt) {
    window.utils.onEnterPress(evt, openSetup);
  };

  var onCloseBtnEnterPress = function (evt) {
    window.utils.onEnterPress(evt, closeSetup);
  };

  var onFormSubmit = function (evt) {
    evt.preventDefault();

    if (window.alerts.isError) {
      window.alerts.clearErrors();
      window.alerts.isError = false;
    }

    formSubmit.disabled = true;
    window.backend.save(new FormData(form), function () {
      closeSetup();
      formSubmit.disabled = false;
    }, onSubmitError);
  };

  var onSubmitError = function (errorText) {
    window.alerts.showError(errorText);
    window.alerts.isError = true;
    formSubmit.disabled = false;
  };

  var openSetup = function () {
    setup.classList.remove('hidden');
    setupSimilarBlock.classList.remove('hidden');

    document.addEventListener('keydown', onSetupEscPress);
    setupOpenBtn.removeEventListener('click', onOpenBtnClick);
    setupOpenBtn.removeEventListener('keydown', onOpenBtnEnterPress);

    if (window.similar.wizards.length === 0) {
      window.similar.loadWizards();
    }
  };

  var closeSetup = function () {
    setup.classList.add('hidden');
    setup.style.left = setupInitPos.left;
    setup.style.top = setupInitPos.top;
    if (window.alerts.isError) {
      window.alerts.clearErrors();
      window.alerts.isError = false;
    }

    setupOpenBtn.addEventListener('click', onOpenBtnClick);
    setupOpenBtn.addEventListener('keydown', onOpenBtnEnterPress);
    document.removeEventListener('keydown', onSetupEscPress);
  };


  userNameInput.addEventListener('focus', function () {
    document.removeEventListener('keydown', onSetupEscPress);
  });
  userNameInput.addEventListener('blur', function () {
    document.addEventListener('keydown', onSetupEscPress);
  });
  setupOpenBtn.addEventListener('click', onOpenBtnClick);
  setupOpenBtn.addEventListener('keydown', onOpenBtnEnterPress);
  setupCloseBtn.addEventListener('click', function () {
    closeSetup();
  });
  setupCloseBtn.addEventListener('keydown', onCloseBtnEnterPress);
  form.addEventListener('submit', onFormSubmit);

  dialogHandle.addEventListener('mousedown', function (evt) {
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
          dialogHandle.removeEventListener('click', onClickPreventDefault);
        };

        dialogHandle.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
