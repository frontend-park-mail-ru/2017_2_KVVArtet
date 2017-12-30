'use strict';

import Router from "./modules/router";

import MainPage from './views/mainpage/mainpage';
import Login from './views/login/login';
import Registration from './views/signup/registration';
import Info from './views/info/info';
import Scoreboard from './views/scoreboard/scoreboard';

import SinglePlay from "./views/singleplay/web";
import Choose from "./views/multiplayer/registration-module/charlist";
import GameType from "./views/multiplayer/choose/choose";
function requireAll(r) { r.keys().forEach(r); }
require('./views/main.js');
require('./css/base.css');


requireAll(require.context('./blocks/', true, /\.(css)$/));
requireAll(require.context('./blocks/', true, /\.(scss)$/));
requireAll(require.context('./modules/', true, /\.(js)$/));
requireAll(require.context('./images/', true, /\.(png)$/));

const login = new Login();
const mainMenu = new MainPage();
const signup = new Registration();
const info = new Info();
const single = new SinglePlay();
const choose = new Choose();
const scoreboard = new Scoreboard();
const typeGame = new GameType();



// navigator.serviceWorker.register("/service_worker.js", { scope: "/" })
//     .then((registration) => {
//         console.log('ServiceWorker registration', registration);
//     })
//     .catch((error) => {
//         throw new Error(`ServiceWorker error: ${error}`);
//     });

const router = new  Router();
for (let i = 0; i < 100;++i){
    router.register(`/scoreboard/${i}`, scoreboard);
}
router.register('/', mainMenu)
    .register('/login', login)
    .register('/signup', signup)
    .register('/info', info)
    .register('/singleplay',single )
    .register('/game',choose)
    .register('/scoreboard/1',scoreboard)
    .register('/scoreboard/2',scoreboard)
    .register('/scoreboard/3',scoreboard)

    .register('/mode',typeGame)
    .navigate();

