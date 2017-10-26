import Block from '../block/block';
import Input from '../forms/input';
import  './forms.css';

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
