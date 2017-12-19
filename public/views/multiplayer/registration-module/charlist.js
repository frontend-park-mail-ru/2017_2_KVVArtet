'use strict'
import  Block from '../../baseview'
import './module.scss'
import Transport from'../../../transport/transport'
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
const button = [`Single Play`,`MultiPlayer`];
const classes  = [`single`,`multi`]
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
            if (globalCounter < 3) {
                ++index;
                let list = document.createElement("li");
                document.querySelector('ul').appendChild(list)
                let enityName = document.getElementsByTagName('li');
                enityName[i].innerHTML = name[i];
                ++globalCounter;
            }
        })

        this.appendChildBlock('new_character',new Block ('a',['delete']).setText('DELETE'))
        wrape.appendChild(this._element)

        document.querySelector('a.delete').addEventListener('click', () => {
            if (globalCounter !==0) {
                let enityName = document.getElementsByTagName('li');
                document.querySelector('ul').removeChild(enityName[i]);
                if (index === 0) {
                    if (counter !== 3) {
                        ++counter;
                        document.querySelector('img.person').setAttribute('src', enity[index+counter].src);
                        enityName[i].style.color = "white";
                    }
                    --globalCounter;
                }
                else {
                    ++secondCounter;
                    --index;
                    --i;
                    document.querySelector('img.person').setAttribute('src', enity[index ].src);
                    console.log(index);
                    enityName[i].style.color = "white";
                    --globalCounter;
                }
            }
        })
    }
    footbarCreate() {
        this.appendChildBlock('footbar',new Block ('a',['enter']).setText('ENTER'))
        wrape.appendChild(this._element)
        document.querySelector('a.enter').addEventListener('click', () => {
            document.querySelector('div.choose').remove();
            let variant =  wrape.appendChild(document.createElement("div"));
            variant.setAttribute('class','variant')

            for (let i = 0; i<2; ++i) {
                variant.appendChild(document.createElement("a"));
            }
            let buttons = document.getElementsByTagName('a');

            for (let i = 0; i<2;++i) {
                buttons[i].setAttribute('class',classes[i])
                buttons[i].innerHTML = button[i];
            }
        })

        this.appendChildBlock('footbar',new Block ('a',['back']).setText('BACK'))
        wrape.appendChild(this._element)
    }
    creation () {
        if ( document.querySelector('div.menu') !== null)
        {
            document.querySelector('div.menu').remove();
        }

        wrape.appendChild(this._element);
        this.footbarCreate();
        this.leftbar();
        this.choose();
        let value = document.querySelector('img.person')
        value.setAttribute('src',enity[0].src);

    }
}