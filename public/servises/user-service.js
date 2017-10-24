import Http from '../modules/http';


    /**
     * Сервис для работы с юзерами
     * @module UserService
     */
    class UserService {
        constructor() {
            this.user = null;
            this.users = [];
        }

        /**
         * Регистрирует нового пользователя
         * @param {string} email
         * @param {string} password
         * @param {number} age
         * @param {Function} callback
         */
        signup(email, password, age, callback) {
            return Http.FetchPost('/signup', {username, password, email}, callback);
        }

        /**
         * Авторизация пользователя
         * @param {string} email
         * @param {string} password
         * @param {Function} callback
         */
        login(email, password, callback) {
            return Http.FetchPost('/signin', {email, password}, callback);
        }

        /**
         * Проверяет, авторизован ли пользователь
         * @return {boolean}
         */
        isLoggedIn() {
            return !!this.user;
        }

        /**
         * Загружает данные о текущем пользователе
         * @param {Function} callback
         * @param {boolean} [force=false] - игнорировать ли кэш?
         */
        getData(callback, force = false) {
            if (this.isLoggedIn() && !force) {
                return callback(null, this.user);
            }

            Http.Get('/game', function (err, userdata) {
                if (err) {
                    return callback(err, userdata);
                }

                this.user = userdata;
                callback(null, userdata);
            }.bind(this));
        }

        /**
         * разлоигинирует
         */
        logout() {
            if (this.isLoggedIn()) {
                this.user = null;
            }
        }
    }
export default UserService;

