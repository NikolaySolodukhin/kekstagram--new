'use strict';

import Utils from './utils';

function initialSaturated(filterName) {
  const filterLevelBox = document.querySelector('.upload-filter-level');
  const filterLevelLine = filterLevelBox.querySelector(
    '.upload-filter-level-line'
  );
  const filterPin = filterLevelLine.querySelector('.upload-filter-level-pin');
  const filterLevel = filterLevelLine.querySelector('.upload-filter-level-val');
  const maxRigthValue = filterLevelLine.clientWidth;
  let currentFilterAmount = 0.75;

  Utils.onValueChanged(filterName, currentFilterAmount);

  filterPin.style.left = maxRigthValue * currentFilterAmount + 'px';
  filterLevel.style.width = maxRigthValue * currentFilterAmount + 'px';

  filterPin.onmousedown = e => {
    const pinCoords = getCoords(filterPin);
    const shiftX = e.pageX - pinCoords.left;
    let newLeft = maxRigthValue / 2;

    let sliderCoords = getCoords(filterLevelBox);

    document.onmousemove = evt => {
      newLeft = evt.pageX - shiftX - sliderCoords.left;

      if (newLeft < 0) {
        newLeft = 0;
      }

      let rightEdge =
        filterLevelBox.offsetWidth -
        filterPin.offsetWidth -
        filterPin.clientWidth;

      if (newLeft > rightEdge) {
        newLeft = rightEdge;
      }

      filterPin.style.left = newLeft + 'px';
      filterLevel.style.width = newLeft + 'px';
      currentFilterAmount = 1 / (maxRigthValue / newLeft);

      Utils.onValueChanged(filterName, currentFilterAmount);
    };

    document.onmouseup = () => {
      document.onmousemove = document.onmouseup = null;
    };

    return false;
  };

  function getCoords(elem) {
    const box = elem.getBoundingClientRect();

    return {
      left: box.left + pageXOffset,
    };
  }
}

export default initialSaturated;
