 /*function showError(container, errorMessage) {
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
        resetError(elems.username.parentNode);
        if (!elems.username.value) {
            showError(elems.username.parentNode, ' What is your username ?');
            return;
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
        else if (elems.password.value.length < 4) {
            showError(elems.password.parentNode, ' Passwords is too short');
        }
    }
*/