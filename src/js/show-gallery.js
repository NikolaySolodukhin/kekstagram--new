'use strict';

import Utils from './utils';

function showGallery(currentElement, miniElement) {
  // переменные
  const gallery = document.querySelector('.gallery-overlay');
  const galleryPreview = gallery.querySelector('.gallery-overlay-preview');
  const galleryPreviewImage = galleryPreview.querySelector(
    '.gallery-overlay-image'
  );
  const galleryPreviewLikesCount = galleryPreview.querySelector('.likes-count');
  const galleryPreviewCommentsCount = galleryPreview.querySelector(
    '.comments-count'
  );
  const galleryCloseBtn = document.querySelector('.gallery-overlay-close');

  /**
   * Закрывает галерею. Удаляет обработчики и ставит фокус на закрытой фотографии.
   * @param {Object} evt
   */
  const closeGallery = evt => {
    if (
      !(
        Utils.isEnterPressed(evt) ||
        Utils.isClicked(evt) ||
        Utils.isEscapePressed(evt)
      )
    ) {
      return;
    }

    evt.preventDefault();
    gallery.classList.add('invisible');
    galleryCloseBtn.removeEventListener('click', closeGallery);
    galleryCloseBtn.removeEventListener('keydown', closeGallery);

    window.removeEventListener('keydown', closeGalleryEscapeHandler);
    miniElement.focus();
  };

  // показываем галерею, ставим фокус на кнопку закрытия
  gallery.classList.remove('invisible');
  galleryCloseBtn.focus();

  // рисуем превью
  galleryPreviewImage.src = require(`../assets/${currentElement.url}`);
  galleryPreviewLikesCount.innerHTML = currentElement.likes;
  galleryPreviewCommentsCount.innerHTML = currentElement.comments;

  // вешаем обработчики закрытия галереи
  galleryCloseBtn.addEventListener('click', evt => closeGallery(evt));

  galleryCloseBtn.addEventListener('keydown', evt => closeGallery(evt));

  window.addEventListener('keydown', evt => closeGalleryEscapeHandler(evt));

  const closeGalleryEscapeHandler = evt => {
    if (!Utils.isEscapePressed(evt)) {
      return;
    }

    closeGallery(evt);
  };
}

export default showGallery;
