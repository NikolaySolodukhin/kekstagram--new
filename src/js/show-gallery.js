'use strict';

import Utils from './utils';

class Gallery {
  constructor() {
    // переменные
    this.gallery = document.querySelector('.gallery-overlay');
    this.activeIndexPicture = 0;
    this.allPictures = [];
    this.galleryPreview = this.gallery.querySelector(
      '.gallery-overlay__preview'
    );
    this.galleryPreviewImage = this.galleryPreview.querySelector(
      '.gallery-overlay__image'
    );
    this.galleryPreviewLikesCount = this.galleryPreview.querySelector(
      '.gallery-overlay__likes-count'
    );
    this.galleryPreviewCommentsCount = this.galleryPreview.querySelector(
      '.gallery-overlay__comments-count'
    );
    this.galleryCloseBtn = this.gallery.querySelector(
      '.gallery-overlay__close'
    );
    this.galleryButtonPrev = this.galleryPreview.querySelector(
      '.gallery-overlay__control--prev'
    );
    this.galleryButtonNext = this.galleryPreview.querySelector(
      '.gallery-overlay__control--next'
    );
    this.galleryButtonNext.addEventListener('click', evt => {
      this.showNextPicture(evt);
    });
    this.galleryButtonNext.addEventListener('keydown', evt =>
      this.showNextPicture(evt)
    );
    this.galleryButtonPrev.addEventListener('click', evt => {
      this.showPrevPicture(evt);
    });
    this.galleryButtonPrev.addEventListener('keydown', evt => {
      this.showPrevPicture(evt);
    });

    this.galleryCloseBtn.addEventListener('click', evt => {
      this.close(evt);
    });

    this.galleryCloseBtn.addEventListener('keydown', evt => {
      if (Utils.isClickedOrIsEnterPressed(evt)) {
        this.close(evt);
      }
    });

    window.addEventListener('keydown', evt => {
      if (Utils.isEscapePressed(evt)) {
        this.close(evt);
      }
    });
  }

  setPictures(arrayData) {
    this.allPictures = this.allPictures.concat(arrayData);
  }
  /**
   * Закрывает галерею. Удаляет обработчики и ставит фокус на закрытой фотографии.
   * @param {Object} evt
   */
  close(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.gallery.classList.add('invisible');
    this.activePicture.focus();
  }

  setFocusOncloseButton() {
    this.galleryCloseBtn.focus();
  }

  show(currentElement, activePicture) {
    // показываем галерею, ставим фокус на кнопку закрытия
    this.gallery.classList.remove('invisible');
    this.activeIndexPicture = this.allPictures.findIndex(
      elem => elem === currentElement
    );
    this.activePicture = activePicture;
    // рисуем превью
    this.galleryPreviewImage.src = require(`../assets/${currentElement.url}`);
    this.galleryPreviewLikesCount.innerHTML = currentElement.likes;
    this.galleryPreviewCommentsCount.innerHTML = currentElement.comments;
  }

  showNextPicture(evt) {
    if (!Utils.isClickedOrIsEnterPressed(evt)) {
      return;
    }
    this.show(
      this.allPictures[this.activeIndexPicture + 1] || this.allPictures[0]
    );
    this.setFocusOncloseButton();
  }

  showPrevPicture(evt) {
    if (!Utils.isClickedOrIsEnterPressed(evt)) {
      return;
    }
    this.show(
      this.allPictures[this.activeIndexPicture - 1] ||
        this.allPictures[this.allPictures.length - 1]
    );
    this.setFocusOncloseButton();
  }
}

export default new Gallery();
