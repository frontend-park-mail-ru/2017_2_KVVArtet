import Tile from './Tile.js';
import Skill from './Skill.js';
export default class Action{
    constructor(){
        this.target = new Tile();
        this.sender = new Tile();
        this.ability = new Skill();
        this.toPrepare = false;
    }

    isMovement() {
        // console.log(this.target + " - target and this.ability - " + this.ability);
        return this.target !== null && this.ability === null;
    }

    isSkip() {
        return this.target === null && this.ability === null;
    }

    isAbility() {
	    return this.ability !== null;
    }

    isPrepareAbility() {
        return this.ability !== null && this.toPrepare === true;
    }
}
