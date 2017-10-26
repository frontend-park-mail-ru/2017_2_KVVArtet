import Http from '../modules/http';

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
     * Выход пользователя
     * @return {Promise}
     */
    logout() {
        return Http.Post('/signout', {});
    }


    /**
     * Загружает данные о текущем пользователе
     * @return {Promise}
     */
    getData() {
        return Http.Post('/session')
            .then(userdata => {
                return userdata;
            });
    }

}

export default UserService;
