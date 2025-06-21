var users = [];
if (localStorage.getItem("usersStorage") != null) {
    users = JSON.parse(localStorage.getItem("usersStorage"));
}

var myRegex = {
    userName: /^[a-zA-Z]{3,}$/,
    email: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
    password: /^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/
}

var userName = document.getElementById("userName");
var email = document.getElementById("email");
var password = document.getElementById("password");
var confirmedPassword = document.getElementById("confirmedPassword");
var inputs = [userName, email, password, confirmedPassword];

var nameMsg = document.getElementById("name-msg");
var emailMsg = document.getElementById("email-msg");
var pwdMsg = document.getElementById("pwd-msg");
var confpwdMsg = document.getElementById("confpwd-msg");
var finalMsg = document.getElementById("final-msg");

var form = document.querySelector("form");
form.addEventListener("submit", function (eventInfo) {
    eventInfo.preventDefault();
})

for (var i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("input", function (eventInfo) {
        var currInput = eventInfo.target;
        if (currInput.id == "password" || currInput.id == "confirmedPassword") {
            currInput.nextElementSibling.classList.add("pe-4");
            currInput.nextElementSibling.classList.add("me-2");
        }
        if (currInput.id == "confirmedPassword") {
            if (password.value != currInput.value) {
                switchToInValid(currInput.id);
                errorMsg(confpwdMsg, "Not confirmed with password you entered!");
            }
            else {
                switchToValid(currInput.id);
                successMsg(confpwdMsg, "Confirmed!");
            }
        }
        else if (myRegex[currInput.id].test(currInput.value) == true) {
            switchToValid(currInput.id);
            switch (currInput.id) {
                case "userName":
                    successMsg(nameMsg, "Valid!");
                    break;
                case "email":
                    successMsg(emailMsg, "Valid!");
                    break;
                case "password":
                    successMsg(pwdMsg, "Valid!");
                    break;
            }
        }
        else {
            switchToInValid(currInput.id);
            switch (currInput.id) {
                case "userName":
                    errorMsg(nameMsg, "Minmum 3 charachters");
                    break;
                case "email":
                    errorMsg(emailMsg, "Must be a valid email");
                    break;
                case "password":
                    errorMsg(pwdMsg, "Minimum 8 characters, must contains one lower case English letter and one number");
                    break;
            }
        }
    })
}

function addUser() {
    var user = {
        userName: userName.value,
        email: email.value,
        password: password.value,
        confirmedPassword: confirmedPassword.value
    }
    if (userName.classList.contains("is-valid") && email.classList.contains("is-valid") && password.classList.contains("is-valid") && confirmedPassword.classList.contains("is-valid")) {
        if (checkUniqueEmail(user.email)) {
            users.push(user);
            updateLocalStorage();
            successMsg(finalMsg, "Successfully registered!");
        }
        else {
            errorMsg(finalMsg, "Error, Email is already exist!");
        }
    }
    else {
        errorMsg(finalMsg, "Error, Check input validation!");
    }
}

function updateLocalStorage() {
    localStorage.setItem("usersStorage", JSON.stringify(users));
}

function checkUniqueEmail(email) {
    for (var i = 0; i < users.length; i++) {
        if (users[i].email == email) {
            return false;
        }
    }
    return true;
}

function successMsg(element, msg) {
    element.classList.replace("text-danger", "text-success");
    element.innerHTML = msg;
}

function errorMsg(element, msg) {
    element.classList.replace("text-success", "text-danger")
    element.innerHTML = msg;
}

function switchToValid(input) {
    document.getElementById(input).classList.remove("is-invalid");
    document.getElementById(input).classList.add("is-valid");
}

function switchToInValid(input) {
    document.getElementById(input).classList.remove("is-valid");
    document.getElementById(input).classList.add("is-invalid");
}