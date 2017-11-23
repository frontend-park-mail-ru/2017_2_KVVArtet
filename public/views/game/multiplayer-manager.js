"use strict";

import Transport from "../../transport/transport";
import Mediator from "../../modules/mediator";

export default class MultiPlayerStrategy {
    constructor() {
        this.mediator = new Mediator();
        this.transport = new Transport();
        this.mediator.subscribe("START_MP_GAME", this.startGame.bind(this));
        this.mediator.subscribe("STOP_GAME", this.stopGame.bind(this));
        this.mediator.subscribe("EXIT", this.exit.bind(this));
        this.mediator.subscribe("PLAYERS_CONNECT", this.newUser.bind(this));
        this.mediator.subscribe("PLAYER_DISCONNECT", this.deleteUser.bind(this));

        this.transport.send("START_MP_GAME");

        this.mediator.publish("LOADING");
    }

    startGame(content) {
        this.mediator.publish("VIEW_LOADED");

        if (content.type !== "mp") {
            return;
        }

        content.players.forEach(player => {
            this.mediator.publish("ADD_PLAYER", player);
        });

    }

    stopGame(content) {
        this.timeout = setTimeout(() => {
            this.transport.send("STOP_MP_GAME");
            this.mediator.publish("LOADING");
        }, 5000);
    }

    exit() {
        clearTimeout(this.timeout);
        this.transport.send("EXIT", {});
        this.unsubscribe();
    }

    newUser(content) {
        content.players.forEach(player => {
            player.new = true;
            this.mediator.publish("ADD_PLAYER", player);
        });
    }

    deleteUser(content) {
        this.mediator.publish("DELETE_PLAYER", content.player);
    }

    unsubscribe() {
        this.mediator.unsubscribe("START_MP_GAME", this.startGame.bind(this));
        this.mediator.unsubscribe("STOP_GAME", this.stopGame.bind(this));
        this.mediator.unsubscribe("EXIT", this.exit.bind(this));
        this.mediator.unsubscribe("PLAYERS_CONNECT", this.newUser.bind(this));
        this.mediator.unsubscribe("PLAYER_DISCONNECT", this.deleteUser.bind(this));
        this.mediator.publish("DELETE_GAME");
    }
}
