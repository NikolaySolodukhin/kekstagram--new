import './../css/main.css';
import './polyfill';
import './pictures';
import initialSaturated from './initialize-saturate';
import initializeFilters from './initialize-filters';
import Form from './form';
import Utils from './utils';
import createScale from './initialize-scale';

initialSaturated();
initializeFilters();
createScale(
  document.querySelector('.upload-resize-controls-value'),
  Utils.SCALE.STEP,
  Utils.SCALE.DEFAULT,
  Form.setScale
);
