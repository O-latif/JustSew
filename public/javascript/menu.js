let menu = document.querySelector(".side");
let close = document.querySelector(".close");
let bmenu = document.querySelector(".menuicon");

bmenu.onclick = function() {
    menu.style.cssText = "margin-right : 0px;"
}
close.onclick = function() {
    menu.style.cssText = "margin-right : -300px;"
}