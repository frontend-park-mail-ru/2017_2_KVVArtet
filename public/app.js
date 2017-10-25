'use strict';

function requireAll(r) { r.keys().forEach(r); }

require('./main.js');
require('./css/main.css');

requireAll(require.context('./blocks/', true, /\.(css)$/));
requireAll(require.context('./modules/', true, /\.(js)$/));
requireAll(require.context('./images/', true, /\.(png)$/));