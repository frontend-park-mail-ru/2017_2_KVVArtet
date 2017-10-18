(function () {
    'use strict';

    const Block = window.Block;
    const Info = window.Info;

    class Info extends Block {
        constructor() {
            const el = document.createElement('div');
            super(el);
        }
    }
    window.Info = Info;

})();
