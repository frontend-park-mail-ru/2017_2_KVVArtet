'use strict';

import Router from "./modules/router";

import MainPage from './views/mainpage/mainpage';
import Login from './views/login/login';
import Registration from './views/signup/registration';
import Info from './views/info/info';
import Game from './views/game/game';

function requireAll(r) { r.keys().forEach(r); }

require('./views/main.js');
require('./views/base.css');

requireAll(require.context('./blocks/', true, /\.(css)$/));
requireAll(require.context('./modules/', true, /\.(js)$/));
requireAll(require.context('./images/', true, /\.(png)$/));

const login = new Login();
const mainMenu = new MainPage();
const signup = new Registration();
const info = new Info();
const game = new Game();

const router = new  Router();
router.register('/', mainMenu)
    .register('/login', login)
    .register('/signup', signup)
    .register('/info', info)
    .register('/game', game)
    .navigate();

