import Block from '../baseview';
import './scoreboard.scss';

const rowValues = [`Username`,`Frags`,`Gold`]

class Scoreboard extends Block {
    constructor() {
        super('div', ['score'], {});
    }

    creation() {
        const wrape = document.querySelector('div.wrapper');

        if (document.querySelector('div.menu') !== undefined) {
            document.querySelector('div.menu').remove();
        }
        wrape.appendChild(this._element);
        this.appendChildBlock('table', new Block('table', ['table']));

        const table = new Block(document.querySelector('table.table'));


        const url = ('https://kvvartet2017.herokuapp.com' || `${window.location.protocol}//${window.location.host}`) + '/scoreboard';
        if (typeof window.fetch !== 'undefined') {

            fetch(url, {
                method: 'GET',
                mode: 'cors',
                credentials: 'include'
            })
                .then(function (response) {

                    let json = response.json();
                    console.log(json);
                    if (response.status >= 400) {

                        return json.then(response => {
                            throw response;
                        });
                    }
                    json.then(function (data) {
                        console.log(data);
                        for (let i = 0; i < data.length +1; ++i) {
                            table.appendChildBlock('data', new Block('tr', ['data']))
                        }
                        const array = document.getElementsByTagName('tr');
                        let value = array[0];
                        for (let i = 0; i < 3; ++i) {
                            value.appendChild(document.createElement('th'));
                            document.querySelector('tr.data').childNodes[i].innerHTML = `${rowValues[i]}`;
                        }

                        for (let i = 1; i < data.length + 1; ++i) {
                            for (let j = 0; j < 3; ++j) {
                                array[i].appendChild(document.createElement('td'));
                                if (j === 1) {
                                    array[i].childNodes[j].innerHTML = `${data[i-1].gold}`;
                                    continue;
                                }
                                else if (j === 2) {
                                    array[i].childNodes[j].innerHTML = `${data[i-1].frags}`;
                                    continue;
                                }
                                array[i].childNodes[j].innerHTML = `${data[i-1].username}`;

                            }
                        }
                    });
                });

            }

    }

}
export default Scoreboard;

