'use strict';

window.sortPictures = (function () {

  // переменные
  var filters = document.querySelector('.filters');

  filters.classList.remove('hidden');

  return function (picturesDataStructure) {

    // функция-обработчик популярных фото
    var popularHandler = function () {
      window.utils.clearContainer();
      picturesDataStructure.forEach(function (elem, i) {
        window.utils.renderMiniPictures(window.utils.getNodeFromData(elem));
      });
    };

    // функция-обработчик новых фото
    var newHandler = function () {
      window.utils.clearContainer();
      var randomIndexArray = window.utils.getRandomIndexes(picturesDataStructure);
      randomIndexArray.forEach(function (elem) {
        window.utils.renderMiniPictures(window.utils.getNodeFromData(picturesDataStructure[elem]));
      });

    };

    // функция-обработчик обсуждаемых фото
    var discussedHandler = function () {
      window.utils.clearContainer();
      var discussedPictures = picturesDataStructure.slice();

      discussedPictures.sort(function (a, b) {
        return b.comments.length - a.comments.length;
      });

      discussedPictures.forEach(function (elem, i) {
        window.utils.renderMiniPictures(window.utils.getNodeFromData(elem, i));
      });
    };

      // Используем делегирование для фильтров
    var handler = function (evt) {
      var currentFilterHtmlFor = evt.target.htmlFor;
      switch (currentFilterHtmlFor) {
        case ('filter-new'):
          newHandler();
          break;
        case ('filter-discussed'):
          discussedHandler();
          break;
        case ('filter-popular'):
          popularHandler();
          break;
      }

    };

    // вешаем обработчик
    filters.addEventListener('click', function (evt) {
      handler(evt);
    });
  };
})();
