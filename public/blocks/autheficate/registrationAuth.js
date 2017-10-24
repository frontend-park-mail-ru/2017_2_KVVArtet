import Validate from '../forms/validation';

/**
 * @function AuthValidate
 * @return {string || null} возвращает null если ошибок нет
 */
function RegistrationValidate(login, email, password, password_confirm) {

    const loginValidation = Validate.validateLogin(login);
    if (loginValidation !== true) {
        Validate.showError(0);
        return false;
    }
    const emailValidation = Validate.validateEmail(email);
    if (emailValidation !== true) {
        Validate.showError(1);
        return false;
    }

    const passwordValidation = Validate.validatePassword(password);
    if (passwordValidation !== true) {
        Validate.showError(2);
        return false;
    }

    if (password !== password_confirm) {
        Validate.showError(3);
        return false;
    }
}

export default RegistrationValidate;