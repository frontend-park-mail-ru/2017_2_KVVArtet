import Validate from '../forms/validation';

/**
 * @function AuthValidate
 * @return {string || null} возвращает null если ошибок нет
 */
let LoginValidate = (login,password) => {
console.log('valide works')
    if (!Validate.validateLogin(login)) {
        Validate.formError('form.login');
        return false;
    }

    if (!Validate.validatePassword(password)) {
        Validate.formError('form.login');
        return false;
    }
}

export default LoginValidate;