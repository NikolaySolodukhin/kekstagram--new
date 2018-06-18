'use strict';

import Utils from './utils';

class initialSaturated {
  constructor() {
    this.filterLevelBox = document.querySelector('.upload-filter__level');
    this.filterLevelLine = this.filterLevelBox.querySelector(
      '.upload-filter__level-line'
    );
    this.filterPin = this.filterLevelLine.querySelector(
      '.upload-filter__level-pin'
    );
    this.filterLevel = this.filterLevelLine.querySelector(
      '.upload-filter__level-val'
    );
    this.currentFilterAmount = 0.75;
  }

  init() {
    this.maxRigthValue = this.filterLevelLine.clientWidth;
    this.filterPin.style.left =
      this.maxRigthValue * this.currentFilterAmount + 'px';
    this.filterLevel.style.width =
      this.maxRigthValue * this.currentFilterAmount + 'px';
    this.move();
  }

  onValueChanged(filterName) {
    Utils.onValueChanged(filterName, this.currentFilterAmount);
    this.filterName = filterName;
  }

  move() {
    this.filterPin.onmousedown = e => {
      const pinCoords = getCoords(this.filterPin);
      const shiftX = e.pageX - pinCoords.left;
      let newLeft = this.maxRigthValue / 2;

      let sliderCoords = getCoords(this.filterLevelBox);

      document.onmousemove = evt => {
        newLeft = evt.pageX - shiftX - sliderCoords.left;

        if (newLeft < 0) {
          newLeft = 0;
        }

        let rightEdge =
          this.filterLevelBox.offsetWidth -
          this.filterPin.offsetWidth -
          this.filterPin.clientWidth;

        if (newLeft > rightEdge) {
          newLeft = rightEdge;
        }

        this.filterPin.style.left = newLeft + 'px';
        this.filterLevel.style.width = newLeft + 'px';
        this.currentFilterAmount = 1 / (this.maxRigthValue / newLeft);

        Utils.onValueChanged(this.filterName, this.currentFilterAmount);
      };

      document.onmouseup = () => {
        document.onmousemove = document.onmouseup = null;
      };

      return false;
    };
  }
}

export default new initialSaturated();

function getCoords(elem) {
  const box = elem.getBoundingClientRect();

  return {
    left: box.left + pageXOffset,
  };
}
