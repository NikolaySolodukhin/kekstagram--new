'use strict';

import Utils from './utils';

class Form {
  constructor() {
    // переменные

    let activeElement;

    this.uploadForm = document.forms['upload-select-image'];
    this.uploadFile = this.uploadForm['upload-file'];

    this.uploadOverlay = document.querySelector('.upload-overlay');
    this.uploadFormCancel = this.uploadOverlay.querySelector(
      '.upload-form__cancel'
    );
    this.uploadFromBtn = this.uploadForm.querySelector('.upload-file');

    this.filterImage = this.uploadOverlay.querySelector(
      '.filter-image-preview'
    );

    this.setScale = this.setScale.bind(this);

    // Ставим фокус при открытии страницы на кнопку загрузки изображения
    this.uploadFromBtn.focus();

    this.FileType = { GIF: '', JPEG: '', PNG: '', 'SVG+XML': '' };

    /**
     * Регулярное выражение, проверяющее тип загружаемого файла. Составляется
     * из ключей FileType.
     * @type {RegExp}
     */
    this.fileRegExp = new RegExp(
      '^image/(' +
        Object.keys(this.FileType)
          .join('|')
          .replace('+', '\\+') +
        ')$',
      'i'
    );

    this.uploadFromBtn.addEventListener('keydown', evt => {
      if (Utils.isEnterPressed(evt)) {
        activeElement = document.activeElement;
        activeElement.click();
      }
    });

    this.uploadFile.addEventListener('change', evt => {
      // Проверка типа загружаемого файла, тип должен быть изображением
      // одного из форматов: JPEG, PNG, GIF или SVG.
      if (this.fileRegExp.test(evt.target.files[0].type)) {
        this.showUploadElement();
      }
    });

    this.uploadFormCancel.addEventListener('click', () =>
      this.closeUploadElement()
    );

    this.uploadFormCancel.addEventListener('keydown', evt => {
      function callback() {
        if (activeElement) {
          activeElement.focus();
          activeElement = null;
        }
      }
      this.closeUploadElement(callback, evt);
    });
  }

  showUploadElement() {
    this.uploadOverlay.classList.remove('invisible');
    this.uploadForm.classList.add('invisible');
  }

  closeUploadElement(callback, evt) {
    this.uploadOverlay.classList.add('invisible');
    this.uploadForm.classList.remove('invisible');
    if (typeof callback === 'function' && Utils.isEnterPressed(evt)) {
      callback();
    }
  }

  setScale(scaleVal, resizeInitialValue) {
    this.filterImage.style.transform =
      'scale(' + parseInt(scaleVal, 10) / resizeInitialValue + ')';
    this.filterImage.style.transition =
      'all .4s cubic-bezier(.65, .05, .36, 1)';
  }
}
export default new Form();
