export default class SpriteManager {
  constructor(engine) {
    this.indexes = [];
    this.count = 0;
    this.engine = engine;
  }

  setIndexAndOrder(spriteIndex, order) {
    this.engine.sprites[spriteIndex].index = this.count;
    this.engine.sprites[spriteIndex].order = order;
    this.indexes[this.count] = spriteIndex;
    return this.count++;
  }

  addSprite(order, translation, texture, vertexs, blend, texCoord) {
    let spriteIndex = this.engine.addSprite(translation, texture, vertexs, blend, texCoord);
    return this.setIndexAndOrder(spriteIndex, order);
  }

  addColorSprite(order, translation, vertexs, color, blend) {
    let spriteIndex = this.engine.addColorSprite(translation, vertexs, color, blend);
    return this.setIndexAndOrder(spriteIndex, order);
  }

  getSprite(index) {
    return this.engine.sprites[this.indexes[index]];
  }

  deleteSprite(index) {
    delete this.engine.sprites[this.indexes[index]];
  }

  sortSprites() {
    this.engine.sprites.sort((a, b) => {
      if (a.order > b.order) return 1;
      return -1;
    });
    for (let i = 0; i < this.engine.sprites.length; i++) {
      if (this.engine.sprites[i] != undefined) {
        this.indexes[this.engine.sprites[i].index] = i;
      }
    }
  }
}
