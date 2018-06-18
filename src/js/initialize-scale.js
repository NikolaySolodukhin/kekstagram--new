'use strict';

function createScale(
  element,
  resizeStep,
  resizeInitialValue,
  filterImageStyle
) {
  const buttonInc = element.parentNode.querySelector(
    '.upload-resize__controls-button--inc'
  );
  const buttonDec = element.parentNode.querySelector(
    '.upload-resize__controls-button--dec'
  );

  element.value = resizeInitialValue + '%';

  buttonDec.addEventListener('click', () => {
    if (element.value === resizeStep + '%') {
      return;
    }
    changeValue(-resizeStep);
  });

  buttonInc.addEventListener('click', () => {
    if (element.value === resizeInitialValue + '%') {
      return;
    }
    changeValue(resizeStep);
  });

  /**
   *
   * @param {Number} step
   */
  const changeValue = step => {
    if (typeof filterImageStyle !== 'function') {
      return;
    }

    element.value = parseInt(element.value, 10) + step + '%';
    filterImageStyle(element.value, resizeInitialValue);
  };
}

export default createScale;
