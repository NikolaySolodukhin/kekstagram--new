'use strict';

window.initializeSaturate = (function () {

  return function (filterName, onValueChanged) {
    var filterLevelBox = document.querySelector('.upload-filter-level');
    var filterLevelLine = filterLevelBox.querySelector('.upload-filter-level-line');
    var filterPin = filterLevelLine.querySelector('.upload-filter-level-pin');
    var filterLevel = filterLevelLine.querySelector('.upload-filter-level-val');
    var maxRigthValue = filterLevelLine.clientWidth;
    var currentFilterAmount = 0.75;
    window.utils.onValueChanged(filterName, currentFilterAmount);
    filterPin.style.left = maxRigthValue * currentFilterAmount + 'px';
    filterLevel.style.width = maxRigthValue * currentFilterAmount + 'px';

    filterPin.onmousedown = function (e) {
      var pinCoords = getCoords(filterPin);
      var shiftX = e.pageX - pinCoords.left;
      var newLeft = maxRigthValue / 2;

      var sliderCoords = getCoords(filterLevelBox);

      document.onmousemove = function (evt) {

        newLeft = evt.pageX - shiftX - sliderCoords.left;

        if (newLeft < 0) {
          newLeft = 0;
        }
        var rightEdge = filterLevelBox.offsetWidth - filterPin.offsetWidth - filterPin.clientWidth;
        if (newLeft > rightEdge) {
          newLeft = rightEdge;
        }

        filterPin.style.left = newLeft + 'px';
        filterLevel.style.width = newLeft + 'px';
        currentFilterAmount = 1 / (maxRigthValue / newLeft);
        window.utils.onValueChanged(filterName, currentFilterAmount);
      };

      document.onmouseup = function () {
        document.onmousemove = document.onmouseup = null;
      };

      return false;
    };

    filterPin.ondragstart = function () {
      return false;
    };

    function getCoords(elem) {
      var box = elem.getBoundingClientRect();

      return {
        left: box.left + pageXOffset
      };

    }

  };

})();
