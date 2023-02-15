let like = document.querySelectorAll(".like");
let likes = document.querySelectorAll(".likes");

let contai = document.querySelectorAll(".repContai");
let com = document.querySelectorAll(".urcom");

let comment = document.querySelectorAll(".comicn");
let rply = document.querySelectorAll(".rply");

let val = document.getElementsByName("val");
let frm = document.querySelectorAll(".lik");


like.forEach((element,i) => {
    let count;
    if (element.style.color == "red") {
        count = 1;
    } else {
        count = 0;
    }
        element.onclick = function () {
        count += 1;
        if ((count % 2) == 1) {
            element.classList.remove("fa-regular");
            element.classList.add("fa-solid");
            element.style.cssText = "color: red;";
            console.log("i",i)
            likes[i].innerHTML = `<i class="fa-solid fa-heart" style="font-size: 17px;"></i> ${ parseInt(likes[i].textContent)+1} likes`;
            val[i].value = "1";
            

        } else {
            element.classList.remove("fa-solid");
            element.classList.add("fa-regular");
            element.style.cssText = "color: black;";
            likes[i].innerHTML = `<i class="fa-solid fa-heart" style="font-size: 17px;"></i> ${ parseInt(likes[i].textContent)-1} likes`;
            val[i].value = "-1";
            
        }
    }

});
rply.forEach((el,index) => {
    el.onclick = function () {
        contai[index].style.cssText = "display: block;";
    }
});
comment.forEach((el,index) => {
    el.onclick = function () {
        com[index].focus();
    }
});

frm.forEach(el => {
                el.addEventListener('submit', async (e) => {
                    e.preventDefault();
            
                    const postId = el.postId.value;
                    const val = el.val.value;
                    console.log("va ",val)
            
                    try {
                        const res = await fetch('/liked', {
                            method: 'PUT',
                            body: JSON.stringify({postId,val}),
                            headers: {'Content-Type': 'application/json'}
                        });
                        console.log(res)
                    }
                    catch(err) {
                        console.log(err);
            
                    }
                })
            });

// Sliders



let pst = document.querySelectorAll('.slider');
let movement;

pst.forEach((el , ind) => {
    var paginationElement = document.createElement('ul');

    // Set ID On Created Ul Element
    paginationElement.setAttribute('id', `pagination-ul${ind}`);

    // Create List Items Based On Slides Count
    for (var i = 1; i <= el.querySelectorAll('img').length; i++) {

    // Create The LI
    var paginationItem = document.createElement('li');

    // Set Custom Attribute
    paginationItem.setAttribute('data-index', i);

    // Append Items to The Main Ul List
    paginationElement.appendChild(paginationItem);

    }
    
    // Add The Created UL Element to The Page
    document.querySelectorAll('.indicators')[ind].appendChild(paginationElement);

    // Get The New Created UL
    var paginationCreatedUl = document.getElementById(`pagination-ul${ind}`);

    // Get Pagination Items | Array.form [ES6 Feature]
    var paginationsBullets = Array.from(document.querySelectorAll(`#pagination-ul${ind} li`));

    // Loop Through All Bullets Items
    for (var i = 0; i < paginationsBullets.length; i++) {

    paginationsBullets[i].onclick = function () {

        currentSlide = parseInt(this.getAttribute('data-index'));

        theChecker();

    }

}
    let lef = 0;
    
    el.parentElement.querySelector('.next').onclick = () => {
        lef = lef - 1;

        movement = parseFloat(getComputedStyle(el).width)/6
        el.style.marginLeft = `${lef * movement}px`;

        el.parentElement.querySelector('.previous').classList.remove('disabled')
        if(lef === -(el.querySelectorAll('img').length-1)) {
            el.parentElement.querySelector('.next').classList.add('disabled')
        } 

            // Loop Through Pagination Bullets
            document.querySelectorAll('.slider-bulls ul')[ind].querySelectorAll('li').forEach(function (bullet) {
    
                bullet.classList.remove('active');
            
            });
        
        document.querySelectorAll('.slider-bulls ul')[ind].querySelectorAll('li')[-lef].classList.add('active')
        // lef[i].classList.remove('active');
        // lef[i+1].classList.add('active');
        // i = i+1;
    }
    el.parentElement.querySelector('.previous').onclick = () => {
        lef = lef + 1;

        movement = parseFloat(getComputedStyle(el).width)/6
        el.style.marginLeft = `${lef * movement}px`;

        el.parentElement.querySelector('.next').classList.remove('disabled')
        if(lef === 0) {
            el.parentElement.querySelector('.previous').classList.add('disabled')
            
        } 
        document.querySelectorAll('.slider-bulls ul')[ind].querySelectorAll('li').forEach(function (bullet) {
    
            bullet.classList.remove('active');
        
        });
    
    document.querySelectorAll('.slider-bulls ul')[ind].querySelectorAll('li')[-lef].classList.add('active')
    }
});
document.querySelectorAll('.slider-bulls ul').forEach(ul =>{
    console.log('rr')
    ul.querySelectorAll('li')[0].classList.add('active')
})