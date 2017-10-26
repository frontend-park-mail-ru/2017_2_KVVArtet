import Validate from '../forms/validation';

/**
 * @function AuthValidate
 * @return {string || null} возвращает null если ошибок нет
 */
let RegistrationValidate = (login, email, password, password_confirm) => {

    if (!Validate.validateLogin(login)) {
        Validate.formError('form.registration-form');
        return false;
    }
    if (!Validate.validateEmail(email)) {
        Validate.formError('form.registration-form');
        return false;
    }

    if (!Validate.validatePassword(password)){
        Validate.formError('form.registration-form');
        return false;
    }

    if (!Validate.validatePassword(password_confirm)) {
        Validate.formError('form.registration-form');
        return false;
    }
}

export default RegistrationValidate;