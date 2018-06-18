import './../css/style.css';
import './polyfill';
import './pictures';
import initializeFilters from './initialize-filters';
import Form from './form';
import Utils from './utils';
import createScale from './initialize-scale';

initializeFilters();
createScale(
  document.querySelector('.upload-resize__controls-value'),
  Utils.SCALE.STEP,
  Utils.SCALE.DEFAULT,
  Form.setScale
);
