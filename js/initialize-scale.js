'use strict';

window.createScale = (function () {
  return function (element, resizeStep, resizeInitialValue) {

    var buttonInc = element.parentNode.querySelector('.upload-resize-controls-button-inc');
    var buttonDec = element.parentNode.querySelector('.upload-resize-controls-button-dec');
    var filterImage = document.querySelector('.filter-image-preview');

    element.value = resizeInitialValue + '%';

    buttonDec.addEventListener('click', function () {
      if (element.value !== resizeStep + '%') {
        changeValue(-resizeStep);
      }
    });

    buttonInc.addEventListener('click', function () {
      if (element.value !== resizeInitialValue + '%') {
        changeValue(resizeStep);
      }
    });

    var changeValue = function (step) {
      element.value = (parseInt(element.value, 10) + step) + '%';
      filterImage.style.transform = 'scale(' + parseInt(element.value, 10) / resizeInitialValue + ')';
      filterImage.style.transition = 'all .4s cubic-bezier(.65, .05, .36, 1)';
    };
  };
})();
