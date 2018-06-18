'use strict';

import Utils from './utils';
import initializeSaturate from './initialize-saturate';
import Form from './form';

function initializeFilters() {
  const uploadFilterControls = document.querySelector(
    '.upload-filter__controls'
  );

  let filterMap;

  /**
   * Функция изменения фильтра. Добавляет класс из filterMap соответствующий
   * выбранному значению в форме.
   */
  const changeFilterValue = () => {
    if (!filterMap) {
      // Ленивая инициализация. Объект не создается до тех пор, пока
      // не понадобится прочитать его в первый раз, а после этого запоминается
      // навсегда.
      filterMap = {
        none: 'filter-none',
        chrome: 'filter-chrome',
        sepia: 'filter-sepia',
        marvin: 'filter-marvin',
        phobos: 'filter-phobos',
        heat: 'filter-heat',
      };
    }

    const selectedFilter = [].filter.call(
      uploadFilterControls.parentNode['upload-filter'],
      item => item.checked
    )[0].value;

    // Передает выбранный фильтр для включения/выключения ползунка изменения CSS фильтров
    Utils.switchFilterDisplay(selectedFilter);
    initializeSaturate.onValueChanged(filterMap[selectedFilter]);
    // Класс перезаписывается, а не обновляется через classList потому что нужно
    // убрать предыдущий примененный класс. Для этого нужно или запоминать его
    // состояние или просто перезаписывать.
    Form.filterImage.className =
      'filter-image-preview ' + filterMap[selectedFilter];
  };

  uploadFilterControls.addEventListener('click', evt =>
    filterChangerClick(evt)
  );

  uploadFilterControls.addEventListener('keydown', evt => {
    if (!Utils.isEnterPressed(evt)) {
      return;
    }
    filterChangerEnter(evt);
  });

  const filterChangerClick = evt => {
    const currentFilterLabel = evt.target.parentNode;
    if (currentFilterLabel.classList.contains('upload-filter__label')) {
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

  const filterChangerEnter = evt => {
    const currentFilter = evt.target;
    // Поддержка Edge
    if (currentFilter.control) {
      currentFilter.control.checked = true;
    } else {
      currentFilter.previousElementSibling.checked = true;
    }
    changeFilterValue();
    changeAriaChecked(evt);
  };

  const changeAriaChecked = evt => {
    const labelElements = Array.from(
      evt.currentTarget.querySelectorAll('.upload-filter__label')
    );

    labelElements.forEach(
      element => (element.attributes['aria-checked'].nodeValue = false)
    );

    if (Utils.isClicked(evt)) {
      evt.target.parentNode.attributes['aria-checked'].nodeValue = true;
    }

    if (Utils.isEnterPressed(evt)) {
      evt.preventDefault();
      evt.target.attributes['aria-checked'].nodeValue = true;
    }
  };
}

export default initializeFilters;
