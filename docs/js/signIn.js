var users = [];
if (localStorage.getItem("usersStorage") != null) {
    users = JSON.parse(localStorage.getItem("usersStorage"));
}

var activeUser;
var email = document.getElementById("email");
var password = document.getElementById("password");

var finalMsg = document.getElementById("final-msg");

var form = document.querySelector("form");
form.addEventListener("submit", function (eventInfo) {
    eventInfo.preventDefault();
    signIn();
});

function isUserExists() {
    for (var i = 0; i < users.length; i++) {
        if (users[i].email == email.value && users[i].password == password.value) {
            return users[i];
        }
    }
    return null;
}

function isEmailExists() {
    for (var i = 0; i < users.length; i++) {
        if (users[i].email == email.value) {
            return true;
        }
    }
    return false;
}

function isPasswordExists() {
    for (var i = 0; i < users.length; i++) {
        if (users[i].password == password.value) {
            return true;
        }
    }
    return false;
}

function isEmptyField() {
    if (email.value == "" || password.value == "") {
        return true;
    }
    return false
}

function signIn() {
    if (isEmptyField()) {
        errorMsg("Please, Fill all fields!");
    }
    else if (isUserExists() != null) {
        console.log(isUserExists());
        activeUser = isUserExists();
        successMsg("Successfully signed in!");
        localStorage.setItem("activeUser", JSON.stringify(activeUser));
        window.location.href = "../home.html";
    }
    else {
        finalMsg.classList.replace("text-success", "text-danger");
        if (isEmailExists()) {
            errorMsg("Error, Password is incorrect!");
        }
        else if (isPasswordExists()) {
            errorMsg("Error, Email is incorrect!");
        }
        else {
            errorMsg("Error, user hasn't registered before!");
        }
    }
}

function successMsg(str) {
    finalMsg.classList.replace("text-danger", "text-success");
    finalMsg.innerHTML = str;
}

function errorMsg(str) {
    finalMsg.classList.replace("text-success", "text-danger")
    finalMsg.innerHTML = str;
}