'use strict';

(function () {

  var similarList = document.querySelector('.setup-similar-list');


  var onWizardsLoad = function (data) {
    window.similar.wizards = data;
    window.similar.updateWizards(window.similar.wizards);
  };

  var onWizardsError = function (errorText) {
    window.alerts.showError(errorText);
    window.alerts.isError = true;
  };

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === window.setup.coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === window.setup.eyesColor) {
      rank += 1;
    }

    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  window.similar = {
    wizards: [],

    loadWizards: function () {
      window.backend.load(onWizardsLoad, onWizardsError);
    },

    updateWizards: function () {
      var wizardElements = similarList.querySelectorAll('.setup-similar-item');
      wizardElements.forEach(function (element) {
        element.remove();
      });
      var sortedWizards = window.similar.wizards.slice()
        .sort(function (left, right) {
          var rankDiff = getRank(right) - getRank(left);
          if (rankDiff === 0) {
            rankDiff = namesComparator(left.name, right.name);
          }
          return rankDiff;
        });
      window.renderWizards(sortedWizards);
    }
  };

})();
