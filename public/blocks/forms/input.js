import Block from '../block/block';

class Input extends Block {
    constructor(type = 'text', classes = [], attrs = {}) {
        attrs['type'] = type;
        super('input', classes, attrs);
    }
}

export default Input;