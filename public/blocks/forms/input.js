import Generator from '../block/block';
import  './forms.scss';


class Input extends Generator {
    constructor(type = 'text', classes = [], attrs = {}) {
        attrs['type'] = type;
        super('input', classes, attrs);
    }
}

export default Input;