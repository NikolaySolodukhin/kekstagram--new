'use strict';

import load from './load';
import onLoad from './onload';

function pictures() {
  const PICTURE_LOAD_URL = '../data/data.json';

  load(PICTURE_LOAD_URL, onLoad);
}
export default pictures();
