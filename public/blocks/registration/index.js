(function () {
    'use strict';

    const Block = window.Block;
    const RegistrationTemplate = window.registrationTemplate;

    class Registration extends Block {
        constructor() {
            const el = document.createElement("div");
            el.innerHTML = RegistrationTemplate();
            super(el);
        }
    }

    window.Registration = Registration;

})();