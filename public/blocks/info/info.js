import Block from '../block/block';

const infoBlock = "textBlock";
const buttonBack = "buttonBack";

class Info extends Block {
    constructor() {
        super('div', ['info'], {});
        this.createChildren();
        return this;
    }

    createChildren() {
            this.appendChildBlock("first",
                new Block('div', [infoBlock]).setText("TextBlock"));

            this.appendChildBlock("buttonBack",
                new Block('a', [buttonBack]));
    }
}
export default Info;

