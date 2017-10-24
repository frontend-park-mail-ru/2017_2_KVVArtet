/**
 * Константы для проверки размеров полей
 */
const MAX_LOGIN_LENGTH = 30;
const MIN_LOGIN_LENGTH = 3;

//const MAX_EMAIL_LENGTH = 30;
//const MIN_EMAIL_LENGTH = 3;

const MAX_PASSWORD_LENGTH = 30;
const MIN_PASSWORD_LENGTH = 4;


/**
 * Класс для валидации полей
 * методы возвращают true если валидация прошла или строку с текстом ошибки
 * @class Validate
 */
class Validate {
    static showError(numberField) {
        let test = document.getElementsByClassName('field');
            test[numberField].className = test[numberField].className.replace('field','error');
    }

    static validateLogin(login) {
        if ((login.length < MIN_LOGIN_LENGTH) || (login.length > MAX_LOGIN_LENGTH) || (!isNaN(login))) {
            console.log("work");
            return;
        }
        return true;
    }

    static validateEmail(email) {
        if (!email.match(/@/)) {
            console.log('email');
            return ;
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