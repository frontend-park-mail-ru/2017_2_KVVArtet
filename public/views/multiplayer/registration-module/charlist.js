'use strict'
import Block from '../../baseview'
import './module.scss'
import Custom from '../../custom-module/custom-module'
import Router from '../../../modules/router';

//import {setter} from '../../main'
const enity = [
    {
        src:'../../../images/warrior.png'
    },
    {
        src:'../../../images/priest.png'
    },{
        src:'../../../images/mage.png'
    },{
        src:'../../../images/thief.png'
    }
]
let secondCounter = 0;
let counter = 0;
let globalCounter = 3;
const name = [`warrior`,`priest`,`mage`,`thief`];

let index = 0;
let i = 0;
const wrape = document.querySelector('div.wrapper');
export default class Choose extends Block{
    constructor() {
        super('div', ['choose'], {});
        this.createChildren();
        return this;
    }

    createChildren () {
        this.appendChildBlock('img',new Block('img', ['person']));
    }
    choose () {
      const left =  document.querySelector('div.choose').appendChild(document.createElement('a'));
      left.setAttribute('class','choose_left')

        const right = document.querySelector('div.choose').appendChild(document.createElement('a'));
        right.setAttribute('class','choose_right')

        let enityName = document.getElementsByTagName('li');
        enityName[i].style.color = "white";
        document.querySelector('a.choose_right').addEventListener('click', () => {
            if (index !==globalCounter) {
                ++i;
                if (i !== 0) {
                    enityName[i - 1 ].style.color = "#c58818"
                }
                ++index;
                enityName[i].style.color = "white";
                document.querySelector('img.person').setAttribute('src', enity[index].src);
            }
        });

        document.querySelector('a.choose_left').addEventListener('click', () => {
            if (index !==0) {
            --i;
                if (i !== 3) {
                    enityName[i + 1 ].style.color = "#c58818"
                }
--index;
                enityName[i].style.color = "white";
                document.querySelector('img.person').setAttribute('src', enity[index].src);
            }
        });
    }

    leftbar () {

     //  document.querySelector('div.choose').innerHTML = `<div class ="left_bar" ></div>`;
        const left_bar =document.querySelector('div.choose').appendChild(document.createElement('div'));
        left_bar.setAttribute('class','left_bar');
        let list = document.createElement("ul");
        document.querySelector('div.left_bar').appendChild(list)

        for (let i = 0; i!== 4; ++i) {
            let list = document.createElement("li");
            document.querySelector('ul').appendChild(list)
        }
        let enityName = document.getElementsByTagName('li');

        for (let i = 0; i!==4;++i) {
            enityName[i].innerHTML = name[i];
        }
        const left  = document.querySelector('div.choose').appendChild(document.createElement('a'));
        left.setAttribute('class','delete');
        left.innerHTML = 'DELETE';

        document.querySelector('a.delete').addEventListener('click', () => {
            new Custom().creation('Coming soon....', true);
        });
        // this.appendChildBlock('new_character',new Block ('a',['new_character']).setText('CREATE'))
        // wrape.appendChild(this._element)



       const newCharacter = document.querySelector('div.choose').appendChild(document.createElement('a'));
        newCharacter.setAttribute('class','new_character');
        newCharacter.innerHTML = 'CREATE';
        document.querySelector('a.new_character').addEventListener('click', () => {
            new Custom().creation('Coming soon....', true);
        })

    }
    footbarCreate() {
        // this.appendChildBlock('footbar',new Block ('a',['enter']).setText('ENTER'))
        // wrape.appendChild(this._element)
        //
        // document.querySelector('a.enter').setAttribute('value','/mode')
        //
        // this.appendChildBlock('footbar',new Block ('a',['back']).setText('BACK'))
        // wrape.appendChild(this._element)
        // document.querySelector('a.back').setAttribute('value','/')

        const a = document.querySelector('div.choose').appendChild(document.createElement('a'))//= `<a class ="enter" value = "/mode">ENTER</a>`;
        a.setAttribute('class','back');
        a.setAttribute('value','/');
        a.innerHTML = 'MENU';
        a.addEventListener('click', function() {
            new Router().go('/');
        });
        const enter=document.querySelector('div.choose').appendChild(document.createElement('a'));
        enter.setAttribute('class','enter');
        enter.setAttribute('value','/mode');
        enter.innerHTML = 'ENTER';
    }
    creation () {
        while (document.querySelector('div.wrapper').firstChild) {
            document.querySelector('div.wrapper').removeChild(document.querySelector('div.wrapper').firstChild);
        }

        const score  = document.querySelector('div.wrapper').appendChild(document.createElement('div'));
        score.setAttribute('class','choose');
        const image = document.querySelector('div.choose').appendChild(document.createElement('img'));
        image.setAttribute('class','person');
        //let test = get();
        //console.log(test)
        //this.appendChildBlock('name',new Block('h3',['name']).setText(test))
        this.footbarCreate();
        this.leftbar();
        this.choose();
        let value = document.querySelector('img.person')
        value.setAttribute('src',enity[0].src);

        if (document.cookie && !document.getElementById('user-menu')) {
            let username = getCookie('username');
            let email = getCookie('email');
            document.body.innerHTML += `<div id="user-menu" style="position:absolute;top: 0;  background: white;right: 0;"><p style="margin: 4px;">${username}
            </p><a id="logout" style="margin: 4px;">Logut</a></div>`;
            document.getElementById('logout').addEventListener('click', function() {
                deleteCookie('username');
                deleteCookie('password');
                document.getElementById('user-menu').remove();
                new UserService().logout(username, email);
            });
        }
    }
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