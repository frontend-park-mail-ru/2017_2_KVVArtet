import Block from './baseview';

import RegistrationValidate from '../blocks/autheficate/registrationAuth';
import LoginValidate from '../blocks/autheficate/loginAuth';

import Router from "../modules/router";

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
                wrapper.appendChildBlock('name',new Block('div',['user']).setText( setter(formdata[0])
                ))
                logout.addEventListener('click', function () {
                    userService.logout(formdata[0],formdata[1]);
                })
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
                  wrapper.appendChildBlock('name',new Block('div',['user']).setText( setter(formdata[0])
              ))
                  let logout = document.querySelector('a.back')
                  logout.addEventListener('click', function () {
                      userService.logout(formdata[0],formdata[1]);
                  })
             })
     });
 }

function setter(input) {
    return String(input);
}
export {signup,signin,setter };


