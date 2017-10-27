/**
 * Константы для проверки размеров полей
 */
const MAX_LOGIN_LENGTH = 30;
const MIN_LOGIN_LENGTH = 3;

const MAX_PASSWORD_LENGTH = 30;
const MIN_PASSWORD_LENGTH = 4;


/**
 * Класс для валидации полей
 * методы возвращают true если валидация прошла или строку с текстом ошибки
 * @class Validate
 */
class Validate {

static userError () {
    let nameForm = 'form.login-form';
    if (document.querySelector('form.login-form') === null ) {
        nameForm = 'form.registration-form';
    }
    let form = document.querySelector(nameForm);

    let div = document.createElement('div');
    div.className = "message-error";
    div.innerHTML = "<p> Sorry,user is already exist </p> ";
    if (form.getElementsByTagName('p').length === 0 ){
        form.appendChild(div);
    }

}
    static formError(formName) {
        let form = document.querySelector(formName);
        let div = document.createElement('div');
        div.className = "message-error";
        div.innerHTML = "<p> Hey,not valid data input :) </p> ";
        if (form.getElementsByTagName('p').length === 0 ){
            form.appendChild(div);
        }
    }

    static validateLogin(login) {
        if ((login.length < MIN_LOGIN_LENGTH) || (login.length > MAX_LOGIN_LENGTH) || (!isNaN(login))) {
            return;
        }
        return true;
    }

    static validateEmail(email) {
        if (!email.match(/@/)) {
            return;
        }
        return true;
    }

    static validatePassword(password) {
        if ((password.length < MIN_PASSWORD_LENGTH) || (password.length > MAX_PASSWORD_LENGTH)) {
            return;
        }
        return true;
    }
}

export default Validate;