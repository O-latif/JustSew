    if(true){
    var sliderImages = Array.from(document.querySelectorAll(".slider img"));

    var slider = document.querySelector(".slider")

    var slidesCount = sliderImages.length;

    var currentSlide = 0;

    var startPos = 0;

    var animationID;

    var currentTranslate = 0;

    var prevTranslate = 0;

    var isDragging = false;

    var paginationElement = document.createElement('ul');

    // Set ID On Created Ul Element
    paginationElement.setAttribute('id', 'pagination-ul');



    // Create List Items Based On Slides Count
    for (var i = 1; i <= slidesCount; i++) {

        // Create The LI
        var paginationItem = document.createElement('li');

        // Set Custom Attribute
        paginationItem.setAttribute('data-index', i);

        // Append Items to The Main Ul List
        paginationElement.appendChild(paginationItem);

    }

    // Add The Created UL Element to The Page
    document.getElementById('indicators').appendChild(paginationElement);

    var paginationCreatedUl = document.getElementById('pagination-ul');

    var paginationsBullets = Array.from(document.querySelectorAll('#pagination-ul li'));
        
    for (var i = 0; i < paginationsBullets.length; i++) {

        paginationsBullets[i].onclick = function () {

        currentSlide = parseInt(this.getAttribute('data-index')) - 1 ;

        console.log(currentSlide)

        theChecker();

        setPositionByIndex();

        setSliderPos();

        }
    }

    theChecker();
    sliderImages.forEach( (slide, index) => {

        //touch events 
        slide.addEventListener('touchstart',touchStart(index));
        slide.addEventListener('touchend',touchEnd);
        slide.addEventListener('touchmove',touchMove);
    })

    window.addEventListener('resize', setPositionByIndex)

    window.oncontextmenu = function (event) {
        event.preventDefault()
        event.stopPropagation()
        return false
    }

    function touchStart(index) {
        return function(event) {
            currentSlide = index;
            isDragging = true;
            startPos = getPosX(event);
            animationID = requestAnimationFrame(animation);
            theChecker();
        }

    }

    function touchEnd() {
        isDragging = false
        cancelAnimationFrame(animationID);

        const movedBy = currentTranslate - prevTranslate;

        if( movedBy < -100 && currentSlide < sliderImages.length - 1) {
            currentSlide += 1;
        }
        if( movedBy > 100 && currentSlide > 0) {
            currentSlide -= 1;
        }
        setPositionByIndex();

        theChecker();
    }

    function touchMove(event) {
        if (isDragging) {
        const currentPos = getPosX(event);
        currentTranslate = prevTranslate + currentPos - startPos;
        theChecker();
        }
    }

    function getPosX(event) {
        return event.touches[0].clientX;
    }

    function animation() {
        setSliderPos();

        requestAnimationFrame(animation);
    }
    function setPositionByIndex() {
        currentTranslate = currentSlide * -parseInt(getComputedStyle(sliderImages[0]).width)
        prevTranslate = currentTranslate;
        setSliderPos();
        theChecker();
    }

    function setSliderPos() {
        slider.style.transform = `translateX(${currentTranslate}px)`;
    }

    function theChecker() {

        // Remove All Active Classes
        removeAllActive();

        // Set Active Class on Current Pagination Item
        paginationCreatedUl.children[currentSlide].classList.add('active');

    }

    function removeAllActive() {
        // Loop Through Pagination Bullets
        paginationsBullets.forEach(function (bullet) {

            bullet.classList.remove('active');
        
        });
    }
}

// normal size (desktop screen)

var imagesList = Array.from(document.querySelectorAll(".images img"));
var prodList = Array.from(document.querySelectorAll(".prod img"));

var prodDetails = document.querySelector(".prodDetails");

var images = document.querySelector(".images");

var prev = document.querySelector(" button.prev");
var next = document.querySelector(" button.next");

if(imagesList.length <= 5) {
    next.classList.add("disabled");
}
var rest, index ;
if((imagesList.length - 5) > 0 ) {
    rest = imagesList.length - 5;
}

next.onclick = toEnd;
prev.onclick = toTop;

function toEnd() {
    let movement =(rest * (parseInt(getComputedStyle(imagesList[0]).height)));
    images.style.transform = `translateY(-${movement}px)`;
    
    next.classList.add("disabled");
    prev.classList.remove("disabled");
}
function toTop() {
    let movement = (rest * (parseInt(getComputedStyle(imagesList[0]).height)));
    images.style.transform = `translateY(0px)`;
    console.log(parseInt(getComputedStyle(imagesList[0]).height));
    console.log(movement);
    prev.classList.add("disabled");
    next.classList.remove("disabled");
}

function removeActive (){
    document.querySelectorAll(".images img").forEach(el => {
    el.classList.remove("active");
    })
    document.querySelectorAll(".prod img").forEach(el => {
        el.classList.remove("active");
    })
}

document.querySelectorAll(".images img").forEach((el, i) => {
    el.onclick = () =>{
        removeActive();
        el.classList.add("active");
        prodList[i].classList.add("active")
    }
})

//evaluation 

let stars = document.querySelectorAll(".bigeval .image");
let count = 1;
let clicked = false;

function lightnning () {
    for(let i = 0 ; i <stars.length ; i++) {
        stars[i].onclick = () => {
            clicked = true;
            for(let k = 0; k <= i; k++) {
                stars[k].style.cssText = "background-image: url('../images/star (1).svg')";
            }
            for(let j = i+1; j < stars.length; j++){
                stars[j].style.cssText = "background-image: url('../images/star.svg'); background-size: contain;";
            }
            document.querySelector("#count").value = count;
            console.log(document.querySelector("#count").value)
        }
        
            stars[i].onmouseover = () => {
                if(clicked === false) {
                count = stars[i].getAttribute("id");
                
                for(let k = 0; k <= i; k++) {
                    stars[k].style.cssText = "background-image: url('../images/star (1).svg')";
                }
                for(let j = i+1; j < stars.length; j++){
                    stars[j].style.cssText = "background-image: url('../images/star.svg'); background-size: contain;";
                }
            }
        }
        
    }
}
document.querySelector(".bigeval").onmouseout = () => {
    if(clicked == false) {
        stars.forEach(element => {
            element.style.cssText = "background-image: url('../images/star.svg'); background-size: contain;";
        });
    } 
}
lightnning();

