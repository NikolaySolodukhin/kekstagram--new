'use strict';

var uploadForm = document.forms['upload-select-image'];
var uploadFile = uploadForm['upload-file'];

var uploadOverlay = document.querySelector('.upload-overlay');
var uploadFormCancel = uploadOverlay.querySelector('.upload-form-cancel');

var buttonDec = uploadOverlay.querySelector('.upload-resize-controls-button-dec');
var buttonInc = uploadOverlay.querySelector('.upload-resize-controls-button-inc');
var resizeContValue = uploadOverlay.querySelector('.upload-resize-controls-value');
var uploadFilterControls = uploadOverlay.querySelector('.upload-filter-controls');

var filterImage = uploadOverlay.querySelector('.filter-image-preview');

uploadOverlay.setAttribute('role', 'dialog');

var changeValueStep = 25;

resizeContValue.value = '100%';

var KEY_CODE = {
  'enter': 13
};


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

  filterImage.className = 'filter-image-preview ' + filterMap[selectedFilter];
};

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

uploadFilterControls.addEventListener('click', function (evt) {
  filterChangerClick(evt);
});

uploadFilterControls.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KEY_CODE.enter) {
    filterChangerEnter(evt);
  }
});

var filterChangerClick = function (evt) {
  if (evt.target.parentNode.classList[0] === 'upload-filter-label') {
    evt.target.parentNode.control.checked = true;
    changeFilterValue();
    changeAriaChecked(evt);
  }
};

var filterChangerEnter = function (evt) {
  evt.target.control.checked = true;
  changeFilterValue();
  changeAriaChecked(evt);
};

var changeAriaChecked = function (evt) {
  var labelElements = evt.currentTarget.querySelectorAll('.upload-filter-label');
  for (var i = 0; i < labelElements.length; i++) {
    labelElements[i].attributes['aria-checked'].nodeValue = false;
  }
  if (evt.type === 'click') {
    evt.target.parentNode.attributes['aria-checked'].nodeValue = true;
  } else if (evt.keyCode === KEY_CODE.enter) {
    evt.target.attributes['aria-checked'].nodeValue = true;
  }
};

buttonDec.addEventListener('click', function () {
  if (resizeContValue.value !== changeValueStep + '%') {
    changeValue(-changeValueStep);
  }
});

buttonInc.addEventListener('click', function () {
  if (resizeContValue.value !== changeValueStep * 4 + '%') {
    changeValue(changeValueStep);
  }
});

var changeValue = function (resizeStep) {
  resizeContValue.value = (parseInt(resizeContValue.value, 10) + resizeStep) + '%';
  filterImage.style.transform = 'scale(' + parseInt(resizeContValue.value, 10) / 100 + ')';
};
