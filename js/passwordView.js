var viewPasswordIcons = document.getElementsByClassName("passwordIcon");

for (var i = 0; i < viewPasswordIcons.length; i++) {
    viewPasswordIcons[i].addEventListener("click", function (eventInfo) {
        var input = eventInfo.target.previousElementSibling;
        if (input.type == "password") {
            input.type = "text";
            input.nextElementSibling.classList.replace("fa-eye", "fa-eye-slash");
        } else {
            input.type = "password";
            input.nextElementSibling.classList.replace("fa-eye-slash", "fa-eye");
        }
    })
}
