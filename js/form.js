'use strict';

window.form = (function () {
  var uploadForm = document.forms['upload-select-image'];
  var uploadFile = uploadForm['upload-file'];

  var uploadOverlay = document.querySelector('.upload-overlay');
  var uploadFormCancel = uploadOverlay.querySelector('.upload-form-cancel');


  var showUploadElement = function () {
    uploadOverlay.classList.remove('invisible');
    uploadForm.classList.add('invisible');
  };

  var closeUploadElement = function () {
    uploadOverlay.classList.add('invisible');
    uploadForm.classList.remove('invisible');
  };

  uploadFile.addEventListener('change', function () {
    showUploadElement();
  });

  uploadFormCancel.addEventListener('click', function () {
    closeUploadElement();
  });
})();

window.initializeFilters();
window.createScale(document.querySelector('.upload-resize-controls-value'), 25, 100);
