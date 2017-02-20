'use strict';


window.initializeFilters = (function () {
  return function () {
    var uploadFilterControls = document.querySelector('.upload-filter-controls');

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
      if (window.utils.isEnterPressed(evt)) {
        filterChangerEnter(evt);
      }
    });

    var filterChangerClick = function (evt) {
      if (evt.target.parentNode.classList[0] === 'upload-filter-label') {
          // Поддержка Edge
        if (evt.target.parentNode.control) {
          evt.target.parentNode.control.checked = true;
        } else {
          evt.target.parentNode.previousElementSibling.checked = true;
        }
        changeFilterValue();
        changeAriaChecked(evt);
      }
    };

    var filterChangerEnter = function (evt) {
      // Поддержка Edge
      if (evt.target.control) {
        evt.target.control.checked = true;
      } else {
        evt.target.previousElementSibling.checked = true;
      }
      changeFilterValue();
      changeAriaChecked(evt);
    };

    var changeAriaChecked = function (evt) {
      var labelElements = evt.currentTarget.querySelectorAll('.upload-filter-label');
      for (var i = 0; i < labelElements.length; i++) {
        labelElements[i].attributes['aria-checked'].nodeValue = false;
      }
      if (window.utils.isClicked(evt)) {
        evt.target.parentNode.attributes['aria-checked'].nodeValue = true;
      } else if (window.utils.isEnterPressed(evt)) {
        evt.preventDefault();
        evt.target.attributes['aria-checked'].nodeValue = true;
      }
    };
  };
})();
