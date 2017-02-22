'use strict';


window.initializeFilters = (function () {
  return function () {
    var uploadFilterControls = document.querySelector('.upload-filter-controls');
    var filterMap;


    /**
     * Функция изменения фильтра. Добавляет класс из filterMap соответствующий
     * выбранному значению в форме.
     */
    var changeFilterValue = function () {
      if (!filterMap) {
        // Ленивая инициализация. Объект не создается до тех пор, пока
        // не понадобится прочитать его в первый раз, а после этого запоминается
        // навсегда.
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

      // Класс перезаписывается, а не обновляется через classList потому что нужно
      // убрать предыдущий примененный класс. Для этого нужно или запоминать его
      // состояние или просто перезаписывать.
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
      var currentFilterLabel = evt.target.parentNode;
      if (currentFilterLabel.classList.contains('upload-filter-label')) {
          // Поддержка Edge
        if (currentFilterLabel.control) {
          currentFilterLabel.control.checked = true;
        } else {
          currentFilterLabel.previousElementSibling.checked = true;
        }
        changeFilterValue();
        changeAriaChecked(evt);
      }
    };

    var filterChangerEnter = function (evt) {
      var currentFilter = evt.target;
      // Поддержка Edge
      if (currentFilter.control) {
        currentFilter.control.checked = true;
      } else {
        currentFilter.previousElementSibling.checked = true;
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
