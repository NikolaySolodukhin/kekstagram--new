'use strict';


window.initializeFilters = (function () {
  return function () {
    var uploadFilterControls = document.querySelector('.upload-filter-controls');

    var KEY_CODE = {
      'ENTER': 13
    };

    var changeFilterValue = function () {
      var filterMap;
      if (!filterMap) {

        filterMap = {
          'none': 'filter-none',
          'chrome': 'filter-chrome',
          'sepia': 'filter-sepia',
          'marvin': 'filter-marvin',
          'phobos': 'filter-phobos',
          'heat': 'filter-heat'
        };
      }
      var selectedFilter = [].filter.call(uploadFilterControls.parentNode['upload-filter'], function (item) {
        return item.checked;
      })[0].value;

      window.filterImage.className = 'filter-image-preview ' + filterMap[selectedFilter];
    };

    uploadFilterControls.addEventListener('click', function (evt) {
      filterChangerClick(evt);
    });

    uploadFilterControls.addEventListener('keydown', function (evt) {
      if (evt.keyCode === KEY_CODE.ENTER) {
        filterChangerEnter(evt);
      }
    });

    var filterChangerClick = function (evt) {
      if (evt.target.parentNode.classList[0] === 'upload-filter-label') {
        evt.target.parentNode.control.checked = true;
        changeFilterValue();
        changeAriaChecked(evt);
      }
    };

    var filterChangerEnter = function (evt) {
      evt.target.control.checked = true;
      changeFilterValue();
      changeAriaChecked(evt);
    };

    var changeAriaChecked = function (evt) {
      var labelElements = evt.currentTarget.querySelectorAll('.upload-filter-label');
      for (var i = 0; i < labelElements.length; i++) {
        labelElements[i].attributes['aria-checked'].nodeValue = false;
      }
      if (evt.type === 'click') {
        evt.target.parentNode.attributes['aria-checked'].nodeValue = true;
      } else if (evt.keyCode === KEY_CODE.ENTER) {
        evt.target.attributes['aria-checked'].nodeValue = true;
      }
    };
  };
})();
