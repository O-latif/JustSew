let list = document.querySelector("#list");
let grid = document.querySelector("#grid");
let all = document.querySelector(".all");
let box = document.querySelectorAll(".box");
let oneBox = document.querySelector(".box");
let det = document.querySelectorAll(".box .proddet");
let heart = document.querySelectorAll(".products .container .box::before");
let price = document.querySelectorAll(".box h4");
let addcart = document.querySelectorAll(".addCart");
let root = document.querySelector(':root');
let adit = document.querySelectorAll('.additional');
let screen = document.querySelector(".products .container");


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
        el.style.cssText = "display : inline-flex; width : 23%; top: 75%;right : auto; margin-left : 20px; height : 50px";
    });
    root.style.setProperty("--leftr", "1%");
    
    adit.forEach(el => {
        el.style.cssText ="display:block;"
    });
    
    document.querySelectorAll(".products .container .box .remove").forEach(el => {
        el.style.cssText ="right: 1%;"
    });
    let screen = document.querySelector(".products .container");
    console.log(parseInt(getComputedStyle(screen).width))
    if(parseInt(getComputedStyle(screen).width) < 720) {
        console.log("false")
        addcart.forEach(el => {
            el.style.cssText = "display : inline-flex; width : 41%; top: 75%;right : auto; margin-left : 20px; height : 50px";
        });    
    } else if(parseInt(getComputedStyle(screen).width) < 940) {
        
        addcart.forEach(el => {
            el.style.cssText = "display : inline-flex; width : 36%; top: 75%;right : auto; margin-left : 20px; height : 50px";
        });    
    } else if (parseInt(getComputedStyle(screen).width) < 1140) {
        
        addcart.forEach(el => {
            el.style.cssText = "display : inline-flex; width : 28%; top: 75%;right : auto; margin-left : 20px; height : 50px";
        });    
    } else if (parseInt(getComputedStyle(screen).width) >= 1140) {
        
        addcart.forEach(el => {
            el.style.cssText = "display : inline-flex; width : 23% !important; top: 75%;right : auto; margin-left : 20px; height : 50px";
        });
    }
}
function griid() {
    box.forEach(el => {
        el.style.width = "300px";
        el.style.height = "578px";
        
    });
    list.style.backgroundColor = "#fff";
    grid.style.backgroundColor = "#aaaaaa4a";
    document.querySelectorAll(".products .container .box .remove").forEach(el => {
        el.style.cssText ="left: 1%;"
    });
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



// change sorting type

let select = document.querySelector(".showType select");
let byName = document.querySelector(".byName");
let byDate = document.querySelector(".byDate");

select.onchange = () => {
    if(select.value === "name"){
        byName.style.cssText = "display : flex";
        byDate.style.cssText = "display : none";
    } else if (select.value === "date") {
        byName.style.cssText = "display : none";
        byDate.style.cssText = "display : flex";
    }
    // console.log((select.value));
}


let form = document.querySelectorAll(".delt");
form.forEach(el => {
    el.addEventListener("submit", async(e) => {
    e.preventDefault();

    const del = el.del.value;                                                                                                                                                                        
    
    try {
        const res = await fetch("/", {
            method : 'PUT',
            body : JSON.stringify({del}),
            headers: {'Content-Type': 'application/json'},
        });
        const data = await res.json();
        if(data.errors) {
            emerr.textContent = data.errors.email;
            mdperr.textContent = data.errors.mdp;
        }
        if(data.Product) {
            location.assign("/");
        }
    }catch(err) {
        console.log(err)
    }
})

})
