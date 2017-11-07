import Block from '../baseview'
import  Background from './Background'
export default class SinglePlay extends Block {
    constructor() {
        super();

        this.template = require('./web.html');
    }

    creation() {
     //  this._element.innerHTML = this.template;
        document.body.innerHTML = this.template;

        // document.body.remove();
        //попытка напряумую вызвать методы классов для генерации контента
      // const back = new Background();
       //back.InitMapAndSprites();
    }

}