'use strict';

window.sortPictures = (function () {

   // переменные
  var filters = document.querySelector('.filters');
  var filterPopular = filters.querySelector('#filter-popular');
  var filterNew = filters.querySelector('#filter-new');
  var filterDiscussed = filters.querySelector('#filter-discussed');

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

     // развешиваем обработчики
    filterPopular.addEventListener('click', popularHandler);
    filterNew.addEventListener('click', newHandler);
    filterDiscussed.addEventListener('click', discussedHandler);
  };
})();
