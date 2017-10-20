const backendUrl = "https://kvvartet2017.herokuapp.com";

    /**
     * Модуль, предоставляющий методы для выполнения HTTP-запросов
     * @module Http
     */
    class Http {
        /**
         * Выполняет GET-запрос по указанному адресу
         * @param {string} address - адрес запроса
         * @param {Function} callback - функция-коллбек
         */
        static Get(address, callback) {
            const xhr = new XMLHttpRequest();
            const url = address + backendUrl;
            xhr.open('GET',url, true);
            xhr.withCredentials = true;

            xhr.onreadystatechange = function () {
                if (xhr.readyState !== 4) return;
                if (+xhr.status >= 400) {
                    return callback(xhr, null);
                }

                const response = JSON.parse(xhr.responseText);
                callback(null, response);
            };

            xhr.send();
        }

        /**
         * Выполняет POST-запрос по указанному адресу
         * @param {string} address - адрес запроса
         * @param {*} body - тело запроса (объект)
         * @param {Function} callback - функция-коллбек
         */
        static Post(address, body, callback) {
            const xhr = new XMLHttpRequest();
            const url = address + backendUrl;
            xhr.open('POST', url, true);
            xhr.withCredentials = true;
            xhr.setRequestHeader('Content-Type', 'application/json; charset=utf8');

            xhr.onreadystatechange = function () {
                if (xhr.readyState !== 4) return;
                if (+xhr.status >= 400) {
                    return callback(xhr, null);
                }

                const response = JSON.parse(xhr.responseText);
                callback(null, response);
            };

            xhr.send(JSON.stringify(body));
        }


        static FetchGet(address) {
            const url =  address +backendUrl;
            return fetch(url, {
                method: 'GET',
                mode: 'cors',
                credentials: 'include'
            })
                .then(function (response) {
                    if (response.status >= 400) {
                        throw response;
                    }
                    return response.json();
                });
        }

        static FetchPost(address,body) {
            const url = address +backendUrl;
            return fetch(url, {
                method: 'POST',
                mode: 'cors',
                credentials: 'include',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            })
        }
    }
export default Http;
