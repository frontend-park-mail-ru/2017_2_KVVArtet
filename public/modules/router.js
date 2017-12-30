import {signin ,signup }from  '../views/main'
import Custom from '../views/custom-module/custom-module'
export default  class Router {

    constructor() {
        if (Router.__instance) {
            return Router.__instance;
        }
        this.routes = new Map();

        Router.__instance = this;
    }

    register(path, view) {
        this.routes.set(path, view);

        return this;
    }


    navigate() {
        window.onpopstate = event => {
            this.go(window.location.pathname);
        };

        document.body.addEventListener('click', event => {

            if (event.target.tagName.toLowerCase() === 'li' ) {
                event.preventDefault();
                const element = event.target;
                const pathname = element.getAttribute('value');

                if (pathname !== null) {
                   this.go(pathname);
                }
            }

            else if (event.target.tagName.toLowerCase() === 'a' &&  window.location.pathname !== '/info' ) {
                event.preventDefault();
                const element = event.target;
                const pathname = element.getAttribute('value');

                if (pathname !== null) {
                    this.go(pathname);
                }
            }
        });
        this.go(window.location.pathname);
    }

    go(path) {
        const view = this.routes.get(path);
        if (!view) {
            document.body.innerHTML = '<h class="notfound"> We didnot do such page )';
            return;
        }

        if (window.location.pathname !== path) {
            window.history.pushState({}, '', path);
        }


        view.creation();
        if (path === '/login') {
            signin(view);
        }
        else if (path === '/signup') {
            signup(view)
        }
    }
}