import {signin ,signup }from  '../views/main'

export default  class Router{

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

    setNotFoundPage(view) {
        this.page404 = view;
    }

    navigate() {
        window.onpopstate = event => {
            this.go(window.location.pathname);
            console.log('reload work');
        };

        document.body.addEventListener('click', event => {

            if (event.target.tagName.toLowerCase() === 'a' ) {

                event.preventDefault();
                const element = event.target;
                const pathname = element.getAttribute('value');

                console.log(pathname);

                if (pathname !== null) {

                    this.go(pathname);
                    console.log(pathname);
                }
                this.go(window.location.pathname);
            }
        });
        this.go(window.location.pathname);
    }

    go(path) {
        let view = this.routes.get(path);
        console.log(view);

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