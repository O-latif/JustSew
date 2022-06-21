let menu = document.querySelector(".side");
let close = document.querySelector(".close");
let closewhish = document.querySelector(".whishlist .close");
let whish = document.querySelector(".whishlist");
let bmenu = document.querySelector(".menuicon");
let cart = document.querySelector("#cart");
let whlist = document.querySelector("#wishlist");
let cartbox = document.querySelector(".shoppingCart");


bmenu.onclick = function() {
    menu.style.cssText = "display : flex;margin-right : 0px; animation-name:side;animation-duration:.5s;"
}

close.onclick = function() {
    menu.style.cssText = "margin-right : -300px;"
}

whlist.onclick = function() {
    whish.style.cssText = "display : flex;margin-left : 0px;"
}
closewhish.onclick = function() {
    whish.style.cssText = "margin-left : -500px;"
}

cart.onclick = () => {
    if(getComputedStyle(cartbox).display == "none" )
        cartbox.style.cssText = "display : flex;"
    else 
        cartbox.style.cssText = "display : none;"
} 

