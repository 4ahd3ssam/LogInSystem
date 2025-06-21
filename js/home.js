var activeUser = JSON.parse(localStorage.getItem("activeUser"));

if (!activeUser) {
    window.location.replace("../signIn.html");
}
var welcomeMsg = document.getElementById("welcomeMsg");
var logOutBtn = document.getElementById("logOut");

console.log(activeUser);
welcomeMsg.innerHTML = `
    Hello, ${activeUser.userName}!
`

logOutBtn.addEventListener("click", function () {
    localStorage.removeItem("activeUser");
    window.location.href = "../signIn.html";
})