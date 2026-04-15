
// Preloader

window.addEventListener('load', function(){
    document.querySelector('.preloader').classList.add('opacity-0');
    setTimeout(function(){
        document.querySelector('.preloader').style.display = 'none';
    }, 1000);
});

// iTyped 

window.ityped.init(document.querySelector('.iTyped'), {
    strings: ["I'm a Software Engineer", 'I make battlebots', 'I teach'],
    loop: true
});

// Portfolio Item Filter

const filterContainer = document.querySelector('.portfolio-filter');

if (filterContainer) {
    const filterBtns = filterContainer.children,
        totalFilterBtn = filterBtns.length,
        portfolioItems = document.querySelectorAll('.portfolio-item'),
        totalPortfolioItem = portfolioItems.length;
        
        for (let i = 0; i < totalFilterBtn; i++) {
            filterBtns[i].addEventListener("click", function(){
                filterContainer.querySelector('.active').classList.remove('active');
                this.classList.add("active");

                const filterValue = this.getAttribute('data-filter');
                for (let k = 0; k < totalPortfolioItem; k++) {
                    if (filterValue === portfolioItems[k].getAttribute('data-category')) {
                        portfolioItems[k].classList.remove('hide');
                        portfolioItems[k].classList.add('show');
                    } else{
                        portfolioItems[k].classList.remove('show');
                        portfolioItems[k].classList.add('hide');
                    }
                    if (filterValue === 'all') {
                        portfolioItems[k].classList.remove('hide');
                        portfolioItems[k].classList.add('show');
                    }
                }
            });
        }
}

// Portfolio Lighbox

const lightbox = document.querySelector('.lightbox');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const totalPortfolioItem = portfolioItems.length;

if (lightbox && totalPortfolioItem > 0) {
    const lightboxImg = lightbox.querySelector('.lightbox-img'),
        lightboxText = lightbox.querySelector('.caption-text'),
        lightboxClose = lightbox.querySelector('.lightbox-close'),
        lightboxCounter = lightbox.querySelector('.caption-counter');

    let itemIndex = 0;

    for (let i = 0; i < totalPortfolioItem; i++) {
        portfolioItems[i].addEventListener('click', function(){
            itemIndex = i;
            changeItem();
            toggleLightbox();
        });
    }

    function toggleLightbox() {
        lightbox.classList.toggle('open');
    }

    function changeItem() {
        let imgSrc = portfolioItems[itemIndex].querySelector('.portfolio-img img').getAttribute('src');
        lightboxImg.src = imgSrc;
        lightboxText.innerHTML = portfolioItems[itemIndex].querySelector('h4').innerHTML;
        lightboxCounter.innerHTML = (itemIndex + 1) + " of " + totalPortfolioItem;
    }

    window.prevItem = function() {
        if (itemIndex === 0) {
            itemIndex = totalPortfolioItem - 1;
        } else {
            itemIndex--;
        }
        changeItem();
    }

    window.nextItem = function() {
        if (itemIndex === totalPortfolioItem - 1) {
            itemIndex = 0;
        } else {
            itemIndex++;
        }
        changeItem();
    }

    // close lightbox

    lightbox.addEventListener('click', function(event){
        if(event.target === lightboxClose || event.target === lightbox){
            toggleLightbox();
        }
    });
}

// Aside Navbar

const nav = document.querySelector('.nav'),
    navList = nav.querySelectorAll('li'),
    totalNavList = navList.length,
    allSection = document.querySelectorAll('.section'),
    totalSection = allSection.length;

for (let i = 0; i < totalNavList; i++) {
    const a = navList[i].querySelector('a');
    a.addEventListener('click', function(){
        // remove back section class
        removeBackSectionClass();

        for (let j = 0; j < totalNavList; j++) {
            if (navList[j].querySelector('a').classList.contains('active')) {
                // add back section class
                addBackSectionClass(j);
            }
            navList[j].querySelector('a').classList.remove('active');
        }

        this.classList.add('active');

        showSection(this);

        if (window.innerWidth < 1200) {
            asideSectionTogglerBtn();
        }

    });
}

function addBackSectionClass(num) 
{
    allSection[num].classList.add('back-section');
}

function removeBackSectionClass() 
{
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.remove('back-section');
    }
}

function updateNav(element) 
{
    for (let i = 0; i < totalNavList; i++) {
        navList[i].querySelector('a').classList.remove('active');
        const target = element.getAttribute('href').split('#')[1];
        if (target === navList[i].querySelector('a').getAttribute('href').split('#')[1]) {
            navList[i].querySelector('a').classList.add('active');
        }
    }
}

document.querySelector('.hire-me').addEventListener('click', function(){
    const sectionIndex = this.getAttribute('data-section-index');
    addBackSectionClass(sectionIndex);
    showSection(this);
    updateNav(this);
    removeBackSectionClass();
});

function showSection(element) 
{
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.remove('active');
    }

    const target = element.getAttribute('href').split('#')[1];

    document.querySelector('#'+target).classList.add('active');
}

const navTogglerBtn = document.querySelector('.nav-toggler'),
    aside = document.querySelector('.aside');

navTogglerBtn.addEventListener('click', asideSectionTogglerBtn);

function asideSectionTogglerBtn() 
{
    aside.classList.toggle('open');
    navTogglerBtn.classList.toggle('open');
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.toggle('open');
    }
}

// Project Carousel

// Store carousel state for each project
const carouselState = {};

// Project images for each carousel
const projectImages = {
    'Capsize': ['images/portfolio/1.jpg', 'images/portfolio/4.jpg'],
    'Test Box': ['images/portfolio/2.jpg', 'images/portfolio/5.jpg'],
    'Harmony': ['images/portfolio/3.jpg', 'images/portfolio/6.jpg']
};

// Initialize carousel state
document.querySelectorAll('.project-card').forEach((card, index) => {
    const projectTitle = card.querySelector('.project-info h3').textContent;
    carouselState[projectTitle] = 0;
});

function changeImage(event, direction) {
    // Stop propagation to prevent navigating to the link
    event.stopPropagation();
    
    const button = event.target.closest('.carousel-btn');
    if (!button) return;
    
    const carousel = button.closest('.project-carousel');
    const projectCard = carousel.closest('.project-card');
    const projectTitle = projectCard.querySelector('.project-info h3').textContent;
    const images = projectImages[projectTitle];
    
    if (!images) return;
    
    // Update carousel state
    carouselState[projectTitle] += direction;
    if (carouselState[projectTitle] < 0) {
        carouselState[projectTitle] = images.length - 1;
    } else if (carouselState[projectTitle] >= images.length) {
        carouselState[projectTitle] = 0;
    }
    
    // Update image
    const img = carousel.querySelector('.carousel-image');
    img.style.opacity = '0.5';
    setTimeout(() => {
        img.src = images[carouselState[projectTitle]];
        img.style.opacity = '1';
    }, 150);
}