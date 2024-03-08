/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
const headerHideTimeout = 1500;
let isScrolling;

const sectionsElements = document.querySelectorAll('section');
const navbarList = document.getElementById('navbar__list');

function getH2FromSection(section) {
    return section.querySelector('h2');
}

// Function to check if a section is in the viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
// Function to hide header when not scrolling
function hidePageHeader() {
    return function (event) {
        document.querySelector('.page__header').classList.remove('hidden');
        window.clearTimeout(isScrolling);

        // Set a timeout to run after scrolling ends
        isScrolling = setTimeout(function () {
            document.querySelector('.page__header').classList.add('hidden');
        }, headerHideTimeout);
    };
}


// Define the list items to add
navbarList.className = 'navbar__menu ul';
sectionsElements.forEach(section => {
    // Create a new li element
    const li = document.createElement('li');
    li.className = 'navbar__menu li';

    // Create a new a element
    const link = document.createElement('a');
    link.textContent = getH2FromSection(section).textContent;
    link.href = `#${section.id}`;
    link.className = 'menu__link';
    li.appendChild(link);
    navbarList.appendChild(li);
});

// Add class 'active' to section when near top of viewport
function setActiveSection() {
    const sections = document.querySelectorAll('section');
    sections.forEach((section) => {
        if (isInViewport(section)) {
            section.classList.add('active');
        } else {
            section.classList.remove('active');
        }
    });
}

// Scroll to anchor ID using scrollTO event
document.addEventListener('DOMContentLoaded', () => {
    // Select all navbar links
    const navbarLinks = document.querySelectorAll('.navbar__menu .menu__link');
    navbarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent the default anchor link behavior
            const sectionId = e.target.getAttribute('href'); // Get the href attribute of the clicked link
            const section = document.querySelector(sectionId); // Select the corresponding section

            // Scroll to the section smoothly
            section.scrollIntoView({ behavior: 'smooth' });
        });
    });
});


window.addEventListener('scroll', setActiveSection);
window.addEventListener('scroll', hidePageHeader(), false);


// Listen for scroll event



