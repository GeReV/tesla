import domready from 'domready';
import Tesla from './js/tesla';

require('file?name=index.html!./index.html');
require('file?name=css/[name].[ext]!./css/normalize.css');
require('file?name=css/[name].[ext]!./css/main.css');

domready(() => {
  const canvas = document.createElement('canvas');

  canvas.id = 'canvas';

  document.body.appendChild(canvas);

  const tesla = new Tesla(canvas);
});
