import Block from '../block/block';
import Input from '../forms/input';

const fieldPrototypes = [
    {
        type: 'text',
        attributes: {
            name: 'login',
            placeholder: 'username'
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
        type: 'submit',
        attributes: {
            value: 'COMPLEATE',
            //formmethod:'post'
        }
    }
];


class Login extends Block {
    constructor() {
        super('form', ['login-form']);

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

export default Login;
