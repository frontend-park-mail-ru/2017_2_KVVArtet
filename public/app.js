'use strict';



function requireAll(r) { r.keys().forEach(r); }

require('./views/main.js');
require('./views/base.css');

requireAll(require.context('./blocks/', true, /\.(css)$/));
requireAll(require.context('./modules/', true, /\.(js)$/));
requireAll(require.context('./images/', true, /\.(png)$/));
