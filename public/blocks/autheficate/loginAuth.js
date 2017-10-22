import Validate from '../forms/validation';

/**
 * @function AuthValidate
 * @return {string || null} возвращает null если ошибок нет
 */
function LoginValidate(login,password) {

    const loginValidation = Validate.validateLogin(login);
    if (loginValidation !== true) {
        Validate.showError(0);
        return;
    }

    const passwordValidation = Validate.validatePassword(password);
    if (passwordValidation !== true) {
        Validate.showError(2);
        return;
    }

    if (errors.length === 0) {
        return null;
    }

    return errors
        .map(item => item.error)
        .join('\n');
}

export default LoginValidate;