export default class Skill{
    constructor() {
        this.name = 'name';
        this.description = 'description';
        this.typeOfArea = 'point'; //point, circle
        this.area = 1;
        this.damage = [0,0];
        this.cooldown = 0;
    }


    createSkill(name, description, typeOfArea, area, damage, cooldown){
        this.name = name;
        this.description = description;
        this.typeOfArea = typeOfArea;
        this.area = area;
        this.damage = damage;
        this.cooldown = cooldown;
    }

    getDesciption() {
        if(this.damage[1] >= 0) {
            return this.name + '\nDam: ' + this.damage[0] + '-' + this.damage[1] + ' Type: ' + this.typeOfArea + ' with area: ' + this.area + '\n' + ' Cooldown: ' + this.cooldown + '\n' + this.description;
        }

        return name + '\nHeal: ' + Math.abs(this.damage[0]) + '-' + Math.abs(this.damage[1]) + ' Type: ' + this.typeOfArea + ' with area: ' + this.area + '\n' + ' Cooldown: ' + this.cooldown + '\n'  + this.description;

    }

}