import Block from './baseview';

import RegistrationValidate from '../blocks/autheficate/registrationAuth';
import LoginValidate from '../blocks/autheficate/loginAuth';

import Router from "../modules/router";
import Custom from "../views/custom-module/custom-module";

import UserService from '../servises/user-service';
import Mediator from '../modules/mediator'
const userService = new UserService();

const application = new Block(document.getElementById('application'));

const wrapper = new Block('div', ['wrapper']);

 const images = "logo";
application.appendChildBlock("logo",
    new Block('img', [images]));

const logo = document.querySelector('img.logo');
logo.setAttribute('src','../images/logo2.png');

application.appendChildBlock('application', wrapper);
wrapper.appendChildBlock('menu',new Block('div',['menu']))

 function signin(login) {
    login.onSubmit((formdata) => {
        const authValidation = LoginValidate(formdata[0], formdata[1]);
        console.log(formdata[0], formdata[1]);
        if (authValidation === false) {
            return;
        }

        userService.login(formdata[0], formdata[1])
            .then(() => new Router().go('/game'))
            .then(() => {
                wrapper.appendChildBlock('name',new Block('div',['user']).setText( setter(formdata[0])));
                document.cookie = 'username' + '=' + formdata[0];
                document.cookie = 'password' + '=' + formdata[1];
            })
            .then (() => new Mediator().publish('VIEW_LOAD'))
    });
}

 function signup(registration) {
     registration.onSubmit((formdata) => {
         const authValidation = RegistrationValidate(formdata[0], formdata[1], formdata[2], formdata[3]);
         if (authValidation === false) {
             return;
         }
         userService.signup(formdata[0], formdata[1], formdata[2])
             .then(() => new Router().go('/game'))
              .then(() => {
                  wrapper.appendChildBlock('name',new Block('div',['user']).setText( setter(formdata[0])));
                  document.cookie = 'username' + '=' + formdata[0];
                  document.cookie = 'password' + '=' + formdata[1];
             })
     });
 }

if (window.innerHeight > window.innerWidth)
// && ((typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1)))
{
    if (document.querySelector('div#application'))
        document.querySelector('div#application').style.display = 'none';
    new Custom().creation('It is game only for laptop view, rotate your device');

}

window.addEventListener('resize', () => {
    const div = document.querySelector('div.win');
    if (div) {
        if (document.querySelector('div#application'))
            document.querySelector('div#application').style.display = 'block';
        div.remove();
    }
    if (window.innerHeight > window.innerWidth) {
        if (document.querySelector('div#application'))
            document.querySelector('div#application').style.display = 'none';
        new Custom().creation('It is game only for laptop view, rotate your device');
    }
});



function setter(input) {
    console.log(input);
    return String(input);
}

function setCookie(name, value, options) {
    options = options || {};

    var expires = options.expires;

    if (typeof expires == "number" && expires) {
        var d = new Date();
        d.setTime(d.getTime() + expires * 1000);
        expires = options.expires = d;
    }
    if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
    }

    value = encodeURIComponent(value);

    var updatedCookie = name + "=" + value;

    for (var propName in options) {
        updatedCookie += "; " + propName;
        var propValue = options[propName];
        if (propValue !== true) {
            updatedCookie += "=" + propValue;
        }
    }

    document.cookie = updatedCookie;
}

function deleteCookie(name) {
    setCookie(name, "", {
        expires: -1
    })
}

function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export {signup,signin,setter };


