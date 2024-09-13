// const { json } = require("body-parser");s

let menu = document.querySelector(".side");
let close = document.querySelector(".close");
let closewhish = document.querySelector(".whishlist .close");
let whish = document.querySelector(".whishlist");
let bmenu = document.querySelector(".menuicon");
let cart = document.querySelector("#cart");
let cart2 = document.querySelector("#cart2");
let whlist = document.querySelectorAll(".wishlist");
let cartbox = document.querySelector(".shoppingCart");
let cartbox2 = document.querySelector(".shoppingCart2");
let buy = document.querySelectorAll('.buy');


//active classes 
let submenu = document.querySelectorAll(".submenu li");
let submenua = document.querySelectorAll(".submenu li a");
let sidemenu = document.querySelectorAll(".sidemenu li");
let key;

function removeAct () {
    submenua.forEach(el => {
        el.classList.remove("active");
    })
}

const title = document.querySelector("title").innerHTML;





removeAct();
submenua.forEach(el => {
    
    if(("JustSew | "+el.innerHTML) == title) {
        el.classList.add("active");
    }  
    if (title === "JustSew | Men" || title === "JustSew | Women" || title === "JustSew | Boys" || title === "JustSew | Girls") {
        submenua[1].classList.add("active")
    }
})


bmenu.onclick = function() {
    menu.style.cssText = "display : flex;margin-right : 0px; animation-name:side;animation-duration:.5s;";
    
}

close.onclick = function() {
    menu.style.cssText = "margin-right : -300px;"
    cartbox2.style.cssText = "display : none;";
}

whlist.forEach(el =>{
    el.onclick = function() {
    whish.style.cssText = "display : flex;margin-left : 0px;"
}})

closewhish.onclick = function() {
    whish.style.cssText = "margin-left : -500px;"
}

cart.onclick = () => {
    if(getComputedStyle(cartbox).display == "none" )
        cartbox.style.cssText = "display : block;"
    else 
        cartbox.style.cssText = "display : none;"
}
if(cart2){
    cart2.onclick = () => {
        if(getComputedStyle(cartbox2).display == "none" )
            cartbox2.style.cssText = "display : block;"
        else 
            cartbox2.style.cssText = "display : none;"
    }     
}


let sar = document.getElementsByName('sar')[0];
sar.onfocus = () => {
    document.querySelector('.result').style.cssText = 'display : block'
}
// sar.onblur = () => {
//     document.querySelector('.result').style.cssText = 'display : none'
// }
function sendData (e) {
    const result = document.querySelector(".result");
    let match = e.value.match(/^[a-zA-Z]*/);
    let match2 = e.value.match(/\s*/);

    if(match2[0] === e.value) {
        result.innerHTML = '';
        return;
    }
    if(match[0] === e.value) {
        fetch("/search" , {
        method: 'POST',
        headers : {'Content-Type' : 'application/json'} ,
        body : JSON.stringify({payload : e.value})
    }).then(res => res.json()).then(data => {
        let payload = data.payload;
        result.innerHTML = '';
        if(payload.length < 1 ) {
            result.innerHTML = ' <p>Sorry . No result Found</p> ';
            
            return;
        }
        payload.forEach((elm,index) => {
            if(index > 0) result.innerHTML += '<hr>';
            
            result.innerHTML += ` <p id="${elm._id}" class ="goRes" style = "cursor : pointer"> ${elm.name}  </p> `
            result.innerHTML += `<span style ='color : #aeaeae;'> price : ${elm.price}</span>`

                        
        });
    });
    
        return;
    }
    result.innerHTML = '';
    
}

setInterval(() => {
    document.querySelectorAll(".goRes").forEach(el => {
        setInterval(clik, 3000, el);
    })
}, 3000);

    function clik(e) {
        e.onclick = () =>  location.assign("/product/"+e.id)
    }
    


buy.forEach(el => {
    el.onclick = ()=> location.assign("/payment");
})



