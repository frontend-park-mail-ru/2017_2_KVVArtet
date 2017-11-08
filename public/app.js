'use strict';

import Router from "./modules/router";

import MainPage from './views/mainpage/mainpage';
import Login from './views/login/login';
import Registration from './views/signup/registration';
import Info from './views/info/info';
import Game from './views/game/game';
import SinglePlay from "./views/singleplay/web";
//import test from'./views/singleplay/textures/wall.jpg'
function requireAll(r) { r.keys().forEach(r); }

require('./views/main.js');
require('./views/base.css');
require('./views/singleplay/textures/wall.jpg');


requireAll(require.context('./blocks/', true, /\.(css)$/));
requireAll(require.context('./modules/', true, /\.(js)$/));
//requireAll(require.context('./views/', true, /\.(js)$/));
//requireAll(require.context('./images/', true, /\.(png)$/));
//requireAll(require.context('./views/singleplay/textures', true, /\.(png)$/));
//requireAll(require.context('./views/singleplay/textures', true, /\.(jpg)$/));



const login = new Login();
const mainMenu = new MainPage();
const signup = new Registration();
const info = new Info();
const game = new Game();
const single = new SinglePlay();


const router = new  Router();
router.register('/', mainMenu)
    .register('/login', login)
    .register('/signup', signup)
    .register('/info', info)
    .register('/game', game)
    .register('/singleplay',single )
    .navigate();

