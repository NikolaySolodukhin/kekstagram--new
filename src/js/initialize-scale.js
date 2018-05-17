'use strict';

function createScale(
  element,
  resizeStep,
  resizeInitialValue,
  filterImageStyle
) {
  const buttonInc = element.parentNode.querySelector(
    '.upload-resize-controls-button-inc'
  );
  const buttonDec = element.parentNode.querySelector(
    '.upload-resize-controls-button-dec'
  );

  element.value = resizeInitialValue + '%';

  buttonDec.addEventListener('click', () => {
    if (element.value !== resizeStep + '%') {
      changeValue(-resizeStep);
    }
  });

  buttonInc.addEventListener('click', () => {
    if (element.value !== resizeInitialValue + '%') {
      changeValue(resizeStep);
    }
  });

  /**
   *
   * @param {Number} step
   */
  const changeValue = step => {
    element.value = parseInt(element.value, 10) + step + '%';
    if (typeof filterImageStyle === 'function') {
      filterImageStyle(element.value, resizeInitialValue);
    }
  };
}

export default createScale;
