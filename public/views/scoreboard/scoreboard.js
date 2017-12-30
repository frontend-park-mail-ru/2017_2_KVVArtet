import Block from '../baseview';
import './scoreboard.scss';
//import UserService from '../../servises/user-service'
//import u from '../../modules/http'
//const score= new UserService();


const rowValues = [`Username`,`Frags`,`Gold`]
//  const buttons = [`first`,`second`,`third`,`four`];
// const data  = [{username:'gamer',gold:0,frags:0},{username:'lammer',gold:110,frags:8989},{username:'lammer96',gold:1680,frags:1560}]

class Scoreboard extends Block {
    constructor() {
        super('div', ['score'], {});
    }

    creation() {
        this.page = 1;
       // window.history.pushState({}, '', '/scoreboard/1');
        const wrape = document.querySelector('div.wrapper');

        if (document.querySelector('div.menu')) {
            document.querySelector('div.menu').remove();
        }
         if (document.querySelector('img.arrow')!==null){
             let test = document.getElementsByClassName('arrow');
             for (let i=2;i<4;++i){test[i].remove()}
        }
        //wrape.appendChild(this._element);
       const score =  wrape.appendChild(document.createElement('div'));
        score.setAttribute('class','score');
        const arrows = document.createElement('div');
        arrows.style.width = '25%';
        arrows.style.margin = 'auto';
        const img1 = document.createElement('img');
        const img2 = document.createElement('img');
        img1.src = '../images/arrow.png';
        img2.src = '../images/arrow.png';
        img1.className = 'arrow';
        img2.className = 'arrow';
        img2.style.float = 'left';
        img2.style.transform = 'scale(-1, 1)';
        arrows.appendChild(img1);
        arrows.appendChild(img2);
        wrape.appendChild(arrows);
      //  this.appendChildBlock('table', new Block('table', ['table']));

        const tabl = document.querySelector('div.score').appendChild(document.createElement('table'));
        tabl.setAttribute('class','table');
        let fun1 = function() {
            if (this.page > 1) {
                this.page -= 1;
                window.history.pushState({}, '', '/scoreboard/' + this.page);
            }
            let arr = document.getElementsByTagName('tr');
            let lastDisplay;
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].style.display !== 'none' && arr[i].id) {
                    lastDisplay = arr[i];
                    break;
                }
            }
            if (lastDisplay) {
                while(true) {
                    if (+lastDisplay.id - 1 == 0 || document.getElementById(+lastDisplay.id - 1).style.display === 'none') {
                        break;
                    } else {
                        lastDisplay = document.getElementById(+lastDisplay.id - 1);
                    }
                }
                let flag = false;
                for (let i = +lastDisplay.id - 1; i > +lastDisplay.id - 6 && i > 0; i--) {
                    document.getElementById(i).style.display = '';
                    flag = true;
                }
                if (flag) {
                    for (let i = +lastDisplay.id; i < +lastDisplay.id + 5; i++) {
                        let x = document.getElementById(i);
                        if (x) {
                            x.style.display = 'none';
                        } else {
                            break;
                        }
                    }
                }
            }
        };

        let fun2 = function() {
            let max = 1;
            while(document.getElementById(max)) {
                max += 1;
            }
            max -= 1;
            console.log(max);
            if (this.page + 1 <= Math.ceil(max/5)) {
                this.page += 1;
                window.history.pushState({}, '', '/scoreboard/' + this.page);
            }
            let arr = document.getElementsByTagName('tr');
            let lastDisplay;
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].style.display !== 'none' && arr[i].id) {
                    lastDisplay = arr[i];
                    break;
                }
            }
            if (lastDisplay) {
                while(true) {
                    let x = document.getElementById(+lastDisplay.id + 1);
                    if (x && x.style.display == 'none') {
                        break;
                    } else {
                        if (x) {
                            lastDisplay = x;
                        } else {
                            return;
                        }
                    }
                }
                for (let i = +lastDisplay.id + 1; document.getElementById(i) && i < +lastDisplay.id + 6; i++) {
                    document.getElementById(i).style.display = '';
                }
                for (let i = +lastDisplay.id; i > 0 && document.getElementById(i).style.display !== 'none'; i--) {
                    let x = document.getElementById(i);
                    if (x) {
                        x.style.display = 'none';
                    } else {
                        break;
                    }
                }
            }
        };

        img1.onclick = fun2.bind(this);
        img2.onclick = fun1.bind(this);

       // const table = new Block(document.querySelector('table.table'));
const newT = document.querySelector('table.table');

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
                           // table.appendChildBlock('data', new Block('tr', ['data']))
                            let n = newT.appendChild(document.createElement('tr'));
                            n.setAttribute('class','data');
                        }
                        const array = document.getElementsByTagName('tr');
                        let value = array[0];
                        for (let i = 0; i < 3; ++i) {
                            value.appendChild(document.createElement('th'));
                            document.querySelector('tr.data').childNodes[i].innerHTML = `${rowValues[i]}`;
                        }

                        for (let k = 0; k < Math.ceil(data.length/5); k++) {
                            for (let i = 1 + k*5; i <= data.length && i <= (k + 1)*5; ++i) {
                                array[i].id = i;
                                if (i > 5) {
                                    array[i].style.display = 'none';
                                }
                                for (let j = 0; j < 3; ++j) {
                                    let el = document.createElement('td');
                                    array[i].appendChild(el);
                                    if (j === 1) {
                                        array[i].childNodes[j].innerHTML = `${data[i - 1].gold}`;
                                        continue;
                                    }
                                    else if (j === 2) {
                                        array[i].childNodes[j].innerHTML = `${data[i - 1].frags}`;
                                        continue;
                                    }
                                    array[i].childNodes[j].innerHTML = `${data[i - 1].username}`;
                                }
                            }
                        }
                    });
                });

        }

        // if (document.cookie) {
        //     let username = getCookie('username');
        //     let email = getCookie('email');
        //     document.body.innerHTML += `<div id="user-menu" style="position:absolute;top: 0;  background: white;right: 0;"><p style="margin: 4px;">${username}
        //     </p><a id="logout" style="margin: 4px;">Logut</a></div>`;
        //     document.getElementById('logout').addEventListener('click', function() {
        //         deleteCookie('username');
        //         deleteCookie('password');
        //         document.getElementById('user-menu').remove();
        //         new UserService().logout(username, email);
        //     });
        // }

    }

}

// function setCookie(name, value, options) {
//     options = options || {};
//
//     var expires = options.expires;
//
//     if (typeof expires == "number" && expires) {
//         var d = new Date();
//         d.setTime(d.getTime() + expires * 1000);
//         expires = options.expires = d;
//     }
//     if (expires && expires.toUTCString) {
//         options.expires = expires.toUTCString();
//     }
//
//     value = encodeURIComponent(value);
//
//     var updatedCookie = name + "=" + value;
//
//     for (var propName in options) {
//         updatedCookie += "; " + propName;
//         var propValue = options[propName];
//         if (propValue !== true) {
//             updatedCookie += "=" + propValue;
//         }
//     }
//
//     document.cookie = updatedCookie;
// }
//
// function deleteCookie(name) {
//     setCookie(name, "", {
//         expires: -1
//     })
// }
//
// function getCookie(name) {
//     var matches = document.cookie.match(new RegExp(
//         "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
//     ));
//     return matches ? decodeURIComponent(matches[1]) : undefined;
// }

export default Scoreboard;
