import Block from '../baseview';
import './main-page.scss';
import ChangeTheme from './mainStyle';

export const buttons = [
    {
        name: 'First',
        text: 'New Game',
        value:'/login'

    },
    {
        name: 'Second',
        text: 'Registration',
        value:'/signup'


    },
    {
        name: 'Third',
        text: 'Information',
        value:'/info'

    },
    {
        name: 'Four',
        text: 'Singleplayer',
        value:'/singleplayer'

    },
    {
        //name: 'Change-theme',
        name: 'Change-theme',
        text: 'Change Theme'
    }
];

const blockClass = 'button';

export class MainPage extends Block {
    constructor() {
        super('div', ['main-menu'], {});
        this.createChildren();
        return this;
    }

    createChildren() {
            buttons.forEach((button) => {
                this.appendChildBlock(button.name,
                    new Block('a', [blockClass + button.name]).setText(button.text))
            });

        }
    creation() {

      let test = document.querySelector('div.wrapper');
        if (test.childNodes[0] !== undefined) {
            test.removeChild(test.childNodes[0])
        }
        test.appendChild(this._element);

        let linkFirst = document.querySelector('a.buttonFirst');
        linkFirst.setAttribute('value','/login');
        let linkSecond = document.querySelector('a.buttonSecond');
        linkSecond.setAttribute('value','/signup');
        let linkThird = document.querySelector('a.buttonThird');
        linkThird.setAttribute('value','/info');
        let linkFour = document.querySelector('a.buttonFour');
        linkFour.setAttribute('value','/singleplay');

        let changer = document.querySelector('a.buttonChange-theme');
        changer.setAttribute('value','/');
        changer.addEventListener('click', () => {
            ChangeTheme();
        });
    }
 }
export default MainPage;

