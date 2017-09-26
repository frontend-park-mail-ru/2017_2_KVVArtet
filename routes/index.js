
 Just for testing and practic with DOM and SPA

'use strict'
document.getElementById('textBlock').style.visibility = 'hidden';
document.getElementById('login').style.visibility = 'hidden';
document.getElementById('buttonBack').style.visibility = 'hidden';
document.getElementById('registration').style.visibility = 'hidden';

document.getElementById('buttonSecond').onclick = function() {
    document.getElementById('buttonBack').style.visibility = 'visible';
    document.getElementById('main').style.visibility = 'hidden';
    document.getElementById('textBlock').style.visibility = 'visible';
    document.getElementById('buttonBack').onclick = function() {
        document.getElementById('textBlock').style.visibility = 'hidden';
        document.getElementById('main').style.visibility = 'visible';
    };
};

document.getElementById('buttonFirst').onclick = function() {
    document.getElementById('buttonBack').style.visibility = 'visible';
    document.getElementById('main').style.visibility = 'hidden';
    document.getElementById('login').style.visibility = 'visible';document.getElementById('buttonBack').onclick = function() {
        document.getElementById('login').style.visibility = 'hidden';
        document.getElementById('main').style.visibility = 'visible';
    };
};

document.getElementById('rg').onclick = function() {
    document.getElementById('buttonBack').style.visibility = 'visible';
    document.getElementById('login').style.visibility = 'hidden';
    document.getElementById('registration').style.visibility = 'visible';
    document.getElementById('buttonBack').onclick = function() {
        document.getElementById('registration').style.visibility = 'hidden';
        document.getElementById('login').style.visibility = 'visible';
    };

};



//Validation

function showError(container, errorMessage) {
    container.className = 'error';
    var msgElem = document.createElement('span');
    msgElem.className = "error-message";
    msgElem.innerHTML = errorMessage;
    container.appendChild(msgElem);
}

function resetError(container) {
    container.className = '';
    if (container.lastChild.className === "error-message") {
        container.removeChild(container.lastChild);
    }
}

function validate(form) {
    var elems = form.elements;
    console.log(elems.username.value.length);
    resetError(elems.username.parentNode);
    if (!elems.username.value ) {
        showError(elems.username.parentNode, ' What is your username ?');
        return ;
    }
    else if (!isNaN(elems.username.value)) {
        showError(elems.username.parentNode, ' Username have to be a type text');
        return;
    }
    resetError(elems.password.parentNode);
    if (!elems.password.value) {
        showError(elems.password.parentNode, ' What is your password  ?');
    } else if (elems.password.value !== elems.password2.value) {
        showError(elems.password.parentNode, ' Passwords is not the same');
    }
    else if (elems.password.value.length <4) {
        showError(elems.password.parentNode, ' Passwords is too short');
    }


}