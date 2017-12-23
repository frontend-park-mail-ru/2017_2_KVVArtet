'use strict'
import Block from '../../baseview'
import './module.scss'
import Custom from '../../custom-module/custom-module'

//import {setter} from '../../main'
import {get} from '../../../blocks/autheficate/registrationAuth'
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
        this.appendChildBlock('choose',new Block ('a',['choose_left']))
        wrape.appendChild(this._element)

        this.appendChildBlock('choose',new Block ('a',['choose_right']))
        wrape.appendChild(this._element)
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
        this.appendChildBlock('left_bar',new Block ('div',['left_bar']))
        wrape.appendChild(this._element)
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

        this.appendChildBlock('new_character',new Block ('a',['new_character']).setText('CREATE'))
        wrape.appendChild(this._element)

        document.querySelector('a.new_character').addEventListener('click', () => {
            new Custom().creation('Coming soon....')
        })


        this.appendChildBlock('new_character',new Block ('a',['delete']).setText('DELETE'))
        wrape.appendChild(this._element)

        document.querySelector('a.delete').addEventListener('click', () => {
            new Custom().creation('Coming soon....')
        })

    }
    footbarCreate() {
        this.appendChildBlock('footbar',new Block ('a',['enter']).setText('ENTER'))
        wrape.appendChild(this._element)

        document.querySelector('a.enter').setAttribute('value','/mode')

        this.appendChildBlock('footbar',new Block ('a',['back']).setText('BACK'))
        wrape.appendChild(this._element)
        document.querySelector('a.back').setAttribute('value','/')


    }
    creation () {
        while (document.querySelector('div.wrapper').firstChild) {
            document.querySelector('div.wrapper').removeChild(document.querySelector('div.wrapper').firstChild);
        }
        wrape.appendChild(this._element);
        //let test = get();
        //console.log(test)
        //this.appendChildBlock('name',new Block('h3',['name']).setText(test))
        this.footbarCreate();
        this.leftbar();
        this.choose();
        let value = document.querySelector('img.person')
        value.setAttribute('src',enity[0].src);

    }
}