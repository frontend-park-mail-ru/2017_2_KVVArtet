import Block from '../../blocks/block/block';
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
        }
    }
];

class Login extends Block {
    constructor() {
        super('form', ['login']);
        fieldPrototypes.forEach((fieldPrototype) => {
            this.appendChildBlock(fieldPrototype.attributes.name,
                new Input(fieldPrototype.type, ['field'], fieldPrototype.attributes));
        });
    }

    creation() {

        if (document.cookie) {
            new Router().go('/game');
            return;
        }

        const wrappe = document.querySelector('div.menu');
        if (wrappe.childNodes[0] !== undefined) {
            wrappe.removeChild(wrappe.childNodes[0])
        }
        wrappe.appendChild(this._element);
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

function setter(input) {
    console.log(input);
    return String(input);
}

function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}


export default Login;
