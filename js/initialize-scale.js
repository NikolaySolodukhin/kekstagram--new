'use strict';

window.createScale = (function () {
  return function (element, resizeStep, resizeInitialValue, filterImageStyle) {

    var buttonInc = element.parentNode.querySelector('.upload-resize-controls-button-inc');
    var buttonDec = element.parentNode.querySelector('.upload-resize-controls-button-dec');

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

    /**
     *
     * @param {Number} step
     */
    var changeValue = function (step) {
      element.value = (parseInt(element.value, 10) + step) + '%';
      if (typeof filterImageStyle === 'function') {
        filterImageStyle(element.value, resizeInitialValue);
      }
    };
  };
})();
