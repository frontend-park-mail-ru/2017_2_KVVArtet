(function () {
    'use strict';

    const Block = window.Block;
    const InfoTemplate = window.infoTemplate;

    class Info extends Block {
        constructor() {
            const el = document.createElement('div');
            el.innerHTML = InfoTemplate();
            super(el);
        }
    }
    window.Info = Info;

})();
