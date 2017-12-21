import Http from '../modules/http';
import Validate from '../blocks/forms/validation';

/**
 * Сервис для работы с пользователями
 * @class UserService
 */
class UserService {
    constructor() {
        /**
         * Закомментить для обращения к серверу node.js
         */
        Http.BaseUrl = 'https://kvvartet2017.herokuapp.com';
    }

    /**
     * Регистрирует нового пользователя
     * @param {string} email
     * @param {string} password
     * @param {string} username
     * @return {Promise}
     */
    signup(username, email, password) {
        return Http.Post('/signup', {username,email, password});
    }

    /**
     * Авторизация пользователя
     * @param {string} username
     * @param {string} password
     * @return {Promise}
     */
    login(username, password) {
        return Http.Post('/signin', {username, password});
    }

    /**
     * Проверяет, авторизован ли пользователь
     * @return {boolean}
     */
    isLoggedIn() {
        return Http.Post('/currentUser');
    }

    /**
     * Выход пользователя
     * @return {Promise}
     */
    logout(username,password) {
        console.log('logout work')
        return Http.Delete('/signout', {username,password});
    }


    /**
     * Загружает scoreboard
     * @return {Promise}
     */


    scores() {
        return Http.Get('/scoreboard');
    }

}

export default UserService;
