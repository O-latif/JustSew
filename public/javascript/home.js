let list = document.querySelector("#list");
let grid = document.querySelector("#grid");
let all = document.querySelector(".all");
let box = document.querySelectorAll(".box");
let det = document.querySelectorAll(".box .proddet");
let heart = document.querySelectorAll(".products .container .box::before");
let price = document.querySelectorAll(".box h4");
let addcart = document.querySelectorAll(".addCart");
let root = document.querySelector(':root');
let adit = document.querySelectorAll('.additional');
let addProduct = document.querySelector('.leader');


function full() {
    box.forEach(el => {
        el.style.width = "100%";
        el.style.height = "404px";

    });
    price.forEach(el => {
        el.style.fontSize = "20px";
    });
    list.style.backgroundColor = "#aaaaaa4a";
    grid.style.backgroundColor = "#fff";
    
    det.forEach(el => {
        el.style.marginLeft = "20px";
    });
    addcart.forEach(el => {
        el.style.cssText = "display : inline-flex; width : 20%; top: 75%;right : auto; margin-left : 20px; height : 50px";
    });
    root.style.setProperty("--leftr", "1%");
    
    adit.forEach(el => {
        el.style.cssText ="display:block;"
    });

}
function griid() {
    box.forEach(el => {
        el.style.width = "300px";
        el.style.height = "578px";
        
    });
    list.style.backgroundColor = "#fff";
    grid.style.backgroundColor = "#aaaaaa4a";
    det.forEach(el => {
        el.style.marginLeft = "0";
    });
    addcart.forEach(el => {
        el.style.cssText = "display : none; width : 88%; top: 60%;right : 6%; height:48px !important; margin : 0;"
    });
    root.style.setProperty("--leftr", "85%");
    adit.forEach(el => {
        el.style.cssText ="display:none;"
    });
}

addProduct.onclick = () => location.assign("/addProduct")