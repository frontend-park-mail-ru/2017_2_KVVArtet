'use strict'
export default class Transport {
    constructor() {
        if (Transport.__instance) {
            return Transport.__instance;
        }
        Transport.__instance = this;
        this.connected = false;
        this.count = 0;


        this.mediator = new Mediator;
        this.url = "wss:https://kvvartet2017.herokuapp.com/game/";
        this.ws = new WebSocket(this.url);

    }
    open() {
        this.ws.onopen = function (event) {
            this.connected = true;
            this.ws.onmessage = this.handleMessage.bind(this);
            this.interval = setInterval(
                (() => {
                    this.send("UPDATE");
                }).bind(this), 5000);

            this.ws.onclose = function () {
                this.connected = false;
                clearInterval(this.interval);
                this.handleClosing();
            }.bind(this);
        }
    }

    send(type, payload) {
        if (!this.connected) {
            setTimeout(() => {
                if (this.count > 20) {
                    return;
                }
                this.count++;
                this.send(type, payload);
            }, 1000)
        }
        else {
            this.ws.send(JSON.stringify({type: type, content: payload}));
        }
    }

    close() {
        this.ws.close();
    }

}