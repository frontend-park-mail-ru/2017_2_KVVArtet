import Block from '../baseview';
import './info.scss';

const buttonBack = "buttonBack";
const authors = [
    {
        name: "Kirill",
        link:"https://github.com/KCherkasov"
    },
    {
        name: "Veniamin",
        link:"https://github.com/WorldVirus"
    },
    {
        name: "Vlad",
        link:"https://github.com/torrentino555"
    },
    {
        name: "Artur",
        link: "https://github.com/zonder129"
    }
];
class Info extends Block {
    constructor() {
        super('ul', ['info'], {});
    }

    creation() {
        const wrape = document.querySelector('div.menu');

        if (document.querySelector('div.menu').childNodes[0] !== undefined) {
            document.querySelector('div.menu').removeChild(document.querySelector('div.menu').childNodes[0]);
        }
        wrape.appendChild(this._element);

        authors.forEach((i) => {
            this.appendChildBlock('li',new Block('li', [i.name]));
            let but  =  document.querySelector('li.' + i.name);
            but.innerHTML = `<a>${i.name}</a>`;
            but.querySelector('a').setAttribute('href',i.link);
        });
    }

}
export default Info;

