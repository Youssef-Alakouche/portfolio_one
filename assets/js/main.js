
const navMenu = document.getElementById("nav-menu"),
      navToggle = document.getElementById("nav-toggle"),
      navClose = document.getElementById("nav-close");

/*=============== SHOW MENU ===============*/
// validation if constant exixt
if(navToggle){
    navToggle.addEventListener("click", () => {
        navMenu.classList.add("show-menu");
    })
}
/*============== MENU HIDDEN ===============*/
//validation if constant exist
if(navClose){
    navClose.addEventListener("click", () => {
        navMenu.classList.remove("show-menu");
    })
}
/*=============== REMOVE MENU MOBILE ===============*/
let navLinks = document.querySelectorAll(".nav-link");
let linkAction = function(){
    //when we click on each nav link, we remove the show menu class
    navMenu.classList.remove("show-menu")
}
navLinks.forEach(link => link.addEventListener("click", linkAction));

/*=============== CHANGE BACKGROUND HEADER ===============*/
let scrollHeader = function(){
    const header = document.getElementById("header");
    //add scroll-header to header if the scroll greater then 80
    if(this.scrollY >= 80) header.classList.add("scroll-header"); else header.classList.remove("scroll-header");
}

window.addEventListener("scroll", scrollHeader);
/*=============== TESTIMONIAL SWIPER ===============*/
let swiper = new Swiper(".testimonial-wrapper", {
    loop: "true",
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    }
})
/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll("section[id]");
console.log(window.innerHeight)
window.addEventListener("scroll", navHighlighter);

function navHighlighter(){
    let scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = (window.innerHeight > 710) ? current.offsetTop - 300 : current.offsetTop - 58;
        const sectionId = current.getAttribute("id");
        //console.log(sectionTop)
        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight)
        {
            document.querySelector(".nav-menu a[href*=" + sectionId + "]").classList.add("active-link")
        }
        else
        {
            document.querySelector(".nav-menu a[href*=" + sectionId + "]").classList.remove("active-link")
        }
    })
}
/*=============== PORTFOLIO ITEM FILTER ===============*/
const filterContainer = document.querySelector(".portfolio-filter-inner"),
      filterBtns = filterContainer.children,
      totalFilterBtn = filterBtns.length,
      portfolioItems = document.querySelectorAll(".portfolio-item"),
      totalPortfolioItem = portfolioItems.length;
 
      for(let i = 0; i< totalFilterBtn; i++){
        filterBtns[i].addEventListener("click", function(){
            //those thow statments should be in this range
            filterContainer.querySelector(".active").classList.remove("active");
            this.classList.add("active");

            const filterValue = this.getAttribute("data-filter");
           for(let k=0; k < totalPortfolioItem; k++){
                if(filterValue == portfolioItems[k].getAttribute("data-category"))
                {
                    portfolioItems[k].classList.remove("hide")
                    portfolioItems[k].classList.add("show");
                }else
                {
                    portfolioItems[k].classList.add("hide");
                    portfolioItems[k].classList.remove("show")
                }
                if(filterValue == "all"){
                      portfolioItems[k].classList.remove("hide")
                     portfolioItems[k].classList.add("show");
                }
           }
        })
      }

/*=============== THEME/DISPLAY CUSTOMIZATION ===============*/
const theme = document.getElementById("theme-button");
const themeModal = document.querySelector(".customize-theme");
const fontSizes = document.querySelectorAll(".choose-size span");
const colorPolette = document.querySelectorAll(".choose-color span");
var root = document.querySelector(":root");
const bg1 = document.querySelector(".bg-1");
const bg2 = document.querySelector(".bg-2");
const bg3 = document.querySelector(".bg-3");
//open modal
const openThemeModal = () => {
    themeModal.style.display = "grid";
}
const closeThemeModal = (e) => {
    if(e.target.classList.contains("customize-theme"))
    {
        themeModal.style.display = "none";
    }
}
themeModal.addEventListener("click", closeThemeModal);
theme.addEventListener("click", openThemeModal);

/*===== FONTS =====*/

//remove active class fron spans or font size selectors
const removeSizeSelector = () => {
    fontSizes.forEach(size => {
        size.classList.remove("active");
    })
}
fontSizes.forEach(size => {
    size.addEventListener("click", () => {
        removeSizeSelector();
        let fontSize;
        size.classList.toggle("active");
        if(size.classList.contains("font-size-1"))
        {
            fontSize = "12px";
        }
        else if(size.classList.contains("font-size-2"))
        {
            fontSize = "14px";
        }
        else if(size.classList.contains("font-size-3"))
        {
            fontSize = "16px";
        }
        else if(size.classList.contains("font-size-4"))
        {
            fontSize = "18px";
        }
        //change font size of the root html element
        document.querySelector("html").style.fontSize = fontSize;
    })
})
/*===== PRIMARY COLORS =====*/

//remove active class from colors
const changeActiveColorClass = () => {
    colorPolette.forEach(colorPicker => {
        colorPicker.classList.remove("active");
    })
}

colorPolette.forEach(color => {
    color.addEventListener("click", ()=>{
        changeActiveColorClass();
        let primaryHue;

        if(color.classList.contains("color-1"))
        {
            primaryHue = 252
        }
        else  if(color.classList.contains("color-2"))
        {
            primaryHue = 52
        }
        else  if(color.classList.contains("color-3"))
        {
            primaryHue = 352
        }
        else  if(color.classList.contains("color-4"))
        {
            primaryHue = 152
        }
        else  if(color.classList.contains("color-5"))
        {
            primaryHue = 202
        }
        color.classList.toggle("active");
        root.style.setProperty("--primary-color-hue", primaryHue);
    })
})
/*===== THEME BACKGROUNDS =====*/
let lightColorLightness;
let whiteColorLightness;
let darkColorLightness;

//change background color
const changeBG = () => {
    root.style.setProperty("--light-color-lightness", lightColorLightness);
    root.style.setProperty("--white-color-lightness", whiteColorLightness);
    root.style.setProperty("--dark-color-lightness", darkColorLightness);
}

bg1.addEventListener("click", () => {
 
    //add active class
    bg1.classList.add("active");
    // remove active class from the others
    bg2.classList.remove("active");
    bg3.classList.remove("active");
    
    //remove customized changes from local storage
    window.location.reload();
})

bg2.addEventListener("click", () => {
    darkColorLightness = "95%";
    whiteColorLightness = "20%";
    lightColorLightness = "15%";

    //add active class
    bg2.classList.add("active");
    // remove active class from the others
    bg1.classList.remove("active");
    bg3.classList.remove("active");
    changeBG();
})

bg3.addEventListener("click", () => {
    darkColorLightness = "95%";
    whiteColorLightness = "10%";
    lightColorLightness = "0%";

    //add active class
    bg3.classList.add("active");
    // remove active class from the others
    bg1.classList.remove("active");
    bg2.classList.remove("active");
    changeBG();
})

