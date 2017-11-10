import Block from '../baseview';
import Input from '../../blocks/forms/input';
import '../../blocks/forms/forms.scss';
import Router from '../../modules/router';

const fieldPrototypes = [
    {
        type: 'text',
        attributes: {
            name: 'username',
            placeholder: 'username'
        }
    },
    {
        type: 'text',
        attributes: {
            name: 'email',
            placeholder: 'email',
        }
    },
    {
        type: 'password',
        attributes: {
            name: 'password',
            placeholder: 'password'
        }
    },
    {
        type: 'password',
        attributes: {
            name: 'passwordConfirm',
            placeholder: 'repeat passoword'
        }
    },
    {
        type: 'submit',
        attributes: {
            value: 'COMPLEATE'
            //formmethod:'post'

        }
    }
];

class Registration extends Block {
    constructor() {
        super('form', ['registration-form']);

        fieldPrototypes.forEach((fieldPrototype) => {
            this.appendChildBlock(fieldPrototype.attributes.name,
                new Input(fieldPrototype.type, ['field'], fieldPrototype.attributes));
        });
        const buttonBack = "buttonBack";
        this.appendChildBlock("buttonBack",
            new Block('a', [buttonBack]));
    }

    creation() {

        let test = document.querySelector('div.wrapper');
        if (test.childNodes[0] !== undefined) {
            test.removeChild(test.childNodes[0])
        }
        test.appendChild(this._element);

        let navigator = document.querySelector('a.buttonBack');
        navigator.addEventListener('click', () => {
            new Router().go('/')
        });
    }

    onSubmit(callback) {
        this.on('submit', (event) => {
            event.preventDefault();
            const formdata = {};
            const elements = this._element.elements;
            for (let name in elements) {
                formdata[name] = elements[name].value;
            }
            callback(formdata);
        });
    }
}

export default Registration;
