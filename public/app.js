'use strict';

function requireAll(r) { r.keys().forEach(r); }

require('./css/main.css');
require('./main.js');
requireAll(require.context('./blocks/', true, /\.(css)$/));
requireAll(require.context('./modules/', true, /\.(js)$/));
requireAll(require.context('./images/', true, /\.(png)$/));
