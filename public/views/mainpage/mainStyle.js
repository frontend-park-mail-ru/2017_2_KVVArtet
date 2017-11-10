const createStylesheet = (styles) => {
    return styles.reduce((stylesheet, current) => {

        const properties = Object.entries(current.styles)
            .map(prop => prop[0] + ':' + prop[1] + ';');
        stylesheet += `${current.selector}{${properties.join('')}}\n`;
        return stylesheet;

    }, '');
};

const buttonLogin = {
    selector: '.buttonFirst',
    styles: {
        'background-color' : '#402641',
        'text-shadow': '0 0 3px #FF0000, 0 0 5px #0000FF',

 }
};

const changeTheme = {
    selector: '.buttonChange-theme',
    styles: {
        'border-radius':'120px',
        'text-shadow': '0 0 3px #FF0000, 0 0 5px #0000FF',

    }
};
const loginForm = {
    selector: '.login-form',
    styles: {
        'border-radius':'45px',
        'text-shadow' : '-1px 0 #BDD9BF, 0 1px #BDD9BF, 1px 0 #BDD9BF, 0 -1px #BDD9BF'
    }
};

const buttonSingle = {
    selector: '.buttonSecond',
    styles: {
        'background-color' : '#402641',
        'text-shadow': '0 0 3px #FF0000, 0 0 5px #0000FF',
    }
};

const buttonSignup = {
    selector: '.buttonThird',
    styles: {
        'background-color' : '#402641',
        'text-shadow': '0 0 3px #FF0000, 0 0 5px #0000FF',
    }
};

const buttonInfo = {
    selector: '.buttonFour',
    styles: {
        'background-color' : '#402641',
        'text-shadow': '0 0 3px #FF0000, 0 0 5px #0000FF',
    }
};

const fieldsForms = {
    selector: '.field',
    styles: {
        'border-radius': '120px',
        'border-bottom-color': 'blue',
    }
};

const appendStylesheet = (stylesheet) => {
    let styleTag = document.getElementById('theme-styles');
    styleTag.innerHTML = stylesheet;
};

const registrationForm = {
    selector: '.registration-form',
    styles: {
        'border-radius': '120px',
        'border-bottom-color': 'blue',
    }
};

const text = {
    selector: '.textBlock',
    styles: {
        'border-radius': '40px',
        'border-bottom-color': 'blue',
    }
};

let hasTheme = false;
let styles = createStylesheet([buttonLogin,buttonInfo,buttonSignup,buttonSingle,changeTheme,loginForm,fieldsForms,registrationForm,text]);
export default function ChangeTheme() {
    let stylesheet =  hasTheme ? '' : styles;
    appendStylesheet(stylesheet);
    hasTheme = !hasTheme;
}