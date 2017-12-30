"use strict";

import Mediator from "../../modules/mediator";
import Transport from "../../transport/transport.js";

export default class MultiplayerManager {
    constructor() {
        console.log('multiplayerManager_constructor_work')
        this.mediator = new Mediator();
        this.transport = new Transport();
        this.mediator.subscribe("CharacterListResponseMessage", this.characterListResponse(event).bind(this));
        this.mediator.subscribe("ActionResponseMessage", this.actionResponse().bind(this));
        this.mediator.subscribe("LobbyResponseMessage", this.lobbyResponse().bind(this));
        this.mediator.subscribe("NextRoomResponseMessage", this.nextRoomResponse().bind(this));
        this.mediator.subscribe("StayInLineResponseMessage", this.stayInLineResponse().bind(this));
        //this.mediator.publish("LOADING");

    }

    messageRequest(request, content = null) {
        this.transport.send(request, content);
    }

    characterListResponse(content = null) {

    }

    actionResponse(content) {
        this.mediator.publish("ActionRequestMessage");

        this.transport.send("ActionRequestMessage", content);
    }

    lobbyResponse(content = null) {
        this.mediator.publish("LobbyRequestMessage");

        this.transport.send("LobbyRequestMessage", content);
    }

    nextRoomResponse(content = null) {
        this.mediator.publish("NextRoomRequestMessage");

        this.transport.send("NextRoomRequestMessage", content);
    }

    stayInLineResponse(content = null) {
        this.mediator.publish("StayInLineRequestMessage");

        this.transport.send("StayInLineRequestMessage", content);
    }

    unsubscribe() {
        this.mediator.unsubscribe("CharacterListResponseMessage", this.characterListResponse().bind(this));
        this.mediator.unsubscribe("ActionResponseMessage", this.actionResponse().bind(this));
        this.mediator.unsubscribe("LobbyResponseMessage", this.lobbyResponse().bind(this));
        this.mediator.unsubscribe("NextRoomResponseMessage", this.nextRoomResponse().bind(this));
        this.mediator.unsubscribe("StayInLineResponseMessage", this.stayInLineResponse().bind(this));
        //this.mediator.publish("DELETE_GAME");
    }
}