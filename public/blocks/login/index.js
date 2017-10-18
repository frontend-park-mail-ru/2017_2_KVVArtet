(function () {
    'use strict';

    const Block = window.Block;
    const LoginTemplate = window.loginTemplate;

    class Login extends Block {
        constructor() {
            const el = document.createElement("div");
            el.innerHTML = LoginTemplate();
            super(el);
        }
    }
    window.Login = Login;

})();