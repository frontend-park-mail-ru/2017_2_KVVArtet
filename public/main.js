(function () {
    'use strict';

    var NavLoginForm = document.getElementsByClassName("login-section");
    var registrationForm = document.getElementsByClassName("signup-section");
    var infoForm = document.getElementsByClassName("info-section");

    var loginButton = document.getElementById("buttonFirst");
    var infoButton = document.getElementById("buttonSecond");
    var regButton = document.getElementById("regButton");
    var mainButton = document.getElementsByClassName("mainButton");
    var buttonBack = document.getElementById("buttonBack");


    const Block = window.Block;
    const Login = window.Login;
    const Info = window.Info;
    const Registration = window.Registration;

    window.showLogin = openLogin;
    window.showInfo = openInfo;
    window.showRegistration = openRegistration;

    const app = new Block(document.getElementById('application'));

    const sections = {

        login: Block.Create('section', {}, ['login-section']),
        signup: Block.Create('section', {}, ['signup-section']),
        info: Block.Create('section', {}, ['info-section']),


        hide() {
            this.login.hide();
            this.signup.hide();
            this.info.hide();
        },
    };

    sections.hide();

    app
        .append(sections.login)
        .append(sections.signup)
        .append(sections.info)

    function openLogin() {
        sections.hide();
        if (!sections.signup.ready) {

            sections.login.append(new Login());
            sections.login.ready = true;
            sections.login.style = true;
        }
        sections.login.show();
    }

    function openRegistration() {
        sections.hide();
        if (!sections.signup.ready) {
            sections.signup.append(new Registration());
            sections.signup.ready = true;
            sections.login.style = true;

        }
        sections.signup.show();
    }

    function openInfo() {
        sections.hide();
        if (!sections.info.ready) {
            sections.info.append(new Info());
            sections.info.ready = true;
            sections.login.style = true;

        }
        sections.info.show();
    }
   buttonBack.style.visibility = "hidden";
    regButton.style.visibility = "hidden";

    loginButton.onclick = function(){
        openLogin();
        regButton.style.visibility = "visible";
        buttonBack.style.visibility = "visible";
        mainButton[0].style.visibility = "hidden";
        NavLoginForm[0].style.visibility = "visible";
        registrationForm[0].style.visibility = "hidden";
        infoForm[0].style.visibility = "hidden";

        buttonBack.onclick = function() {
            buttonBack.style.visibility = "hidden";
            NavLoginForm[0].style.visibility = "hidden";
            mainButton[0].style.visibility = "visible";

        }
        regButton.onclick = function(){
            openRegistration();
            mainButton[0].style.visibility = "hidden";
            NavLoginForm[0].style.visibility = "hidden";
            registrationForm[0].style.visibility = "visible";
            infoForm[0].style.visibility = "hidden";

            buttonBack.onclick = function() {
                buttonBack.style.visibility = "hidden";
                NavLoginForm[0].style.visibility = "visible";
                mainButton[0].style.visibility = "visible";
                registrationForm[0].style.visibility = "hidden";

            }
        }

    }

    infoButton.onclick = function(){
        infoForm[0].style.visibility = "visible";
        buttonBack.style.visibility = "visible";
        openInfo();
        buttonBack.onclick = function() {
            buttonBack.style.visibility = "hidden";
            NavLoginForm[0].style.visibility = "hidden";
            mainButton[0].style.visibility = "visible";
            infoForm[0].style.visibility = "hidden";

        }
    }

})();



