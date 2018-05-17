'use strict';

import Utils from './utils';

function sortPictures(picturesDataStructure) {
  // переменные
  const filters = document.querySelector('.filters');

  filters.classList.remove('hidden');

  // вешаем обработчик
  filters.addEventListener('click', evt => handler(evt));

  // функция-обработчик популярных фото
  const popularHandler = () => {
    Utils.clearContainer();
    picturesDataStructure.forEach(elem =>
      Utils.pushPucturesInFragment(Utils.getNodeFromData(elem))
    );

    Utils.renderMiniPictures();
  };

  // функция-обработчик новых фото
  const newHandler = () => {
    Utils.clearContainer();
    let randomIndexArray = Utils.getRandomIndexes(picturesDataStructure);
    randomIndexArray.forEach(elem => {
      Utils.pushPucturesInFragment(
        Utils.getNodeFromData(picturesDataStructure[elem])
      );
    });

    Utils.renderMiniPictures();
  };

  // функция-обработчик обсуждаемых фото
  const discussedHandler = () => {
    Utils.clearContainer();
    const discussedPictures = picturesDataStructure.slice();

    discussedPictures.sort((a, b) => b.comments.length - a.comments.length);

    discussedPictures.forEach((elem, i) =>
      Utils.pushPucturesInFragment(Utils.getNodeFromData(elem, i))
    );

    Utils.renderMiniPictures();
  };

  // Используем делегирование для фильтров
  const handler = evt => {
    const currentFilterHtmlFor = evt.target.htmlFor;
    switch (currentFilterHtmlFor) {
      case 'filter-new':
        newHandler();
        break;
      case 'filter-discussed':
        discussedHandler();
        break;
      case 'filter-popular':
        popularHandler();
        break;
    }
  };
}

export default sortPictures;
