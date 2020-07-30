import { elements, globals } from './utils';
import TypeWriter from './custom-typewriter';

// Global State
const state = {
    showProjects: false
};

/**
 * Execute on load
 */
window.onload = event => {
    // Update age
    const dob = globals.dateOfBirth;
    const age = new Date(Date.now() - dob.getTime()).getFullYear() - 1970;
    elements.ageContainer.textContent = age;
    // get and set theme
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
        elements.darkModeCheckbox.setAttribute('checked', true);
        changeTheme(true);
    } else {
        elements.darkModeCheckbox.removeAttribute('checked');
        changeTheme(false);
    }
};

/**
 * Executes when document loads 
 */
const onDOMLoad = event => {
    const typeWriterEl = elements.typeWriterElement;
    const words = JSON.parse(typeWriterEl.dataset.words);
    const typeSpeed = Number(typeWriterEl.dataset.typeSpeed);
    const deleteSpeed = Number(typeWriterEl.dataset.deleteSpeed);
    const delay = Number(typeWriterEl.dataset.delay);
    new TypeWriter(typeWriterEl, words, typeSpeed, deleteSpeed, delay);
};
document.addEventListener("DOMContentLoaded", onDOMLoad);

/**
 * Handle document click
 */
const handleDocumentClick = event => {
    // close menu dropdown
    if (!elements.navigationItems.contains(event.target)) {
        elements.menuOptions.classList.add('no-display');
        elements.menuButton.classList.remove('primary-text');
    }
    if (event.target.classList.value.includes('menu-option')) {
        elements.menuOptions.classList.add('no-display');
        elements.menuButton.classList.remove('primary-text');
    }
};
document.addEventListener('click', handleDocumentClick);

/**
 * Handle dark mode toggle button
 */
const handleThemeChange = event => {
    const isDarkModeOn = event.target.checked;
    changeTheme(isDarkModeOn);
    localStorage.setItem('theme', isDarkModeOn ? 'dark' : 'light');
};

const changeTheme = isDarkModeOn => {
    if (isDarkModeOn) {
        // body theme
        ['bg-dark', 'light-text'].forEach(cl => elements.bodyElement.classList.add(cl));
        // top navbar theme
        ['bg-light', 'dark-text'].forEach(cl => elements.topNavbar.classList.remove(cl));
        ['bg-dark', 'light-text'].forEach(cl => elements.topNavbar.classList.add(cl));
        // menu options theme
        ['bg-dark', 'light-text'].forEach(cl => elements.menuOptions.classList.remove(cl));
        ['bg-light', 'dark-text'].forEach(cl => elements.menuOptions.classList.add(cl));
        // type-writer cursor theme
        elements.typeWriterCursorElement.classList.remove('blinking-light');
        elements.typeWriterCursorElement.classList.add('blinking-dark');
        // breifcase-icon theme
        ['bg-dark', 'light-text'].forEach(cl => elements.breifcaseIcon.classList.remove(cl));
        ['bg-light', 'dark-text'].forEach(cl => elements.breifcaseIcon.classList.add(cl));
    } else {
        // body theme
        ['bg-dark', 'light-text'].forEach(cl => elements.bodyElement.classList.remove(cl));
        // top navbar theme
        ['bg-dark', 'light-text'].forEach(cl => elements.topNavbar.classList.remove(cl));
        ['bg-light', 'dark-text'].forEach(cl => elements.topNavbar.classList.add(cl));
        // menu options theme
        ['bg-dark', 'light-text'].forEach(cl => elements.menuOptions.classList.add(cl));
        ['bg-light', 'dark-text'].forEach(cl => elements.menuOptions.classList.remove(cl));
        // type-writer cursor theme
        elements.typeWriterCursorElement.classList.remove('blinking-dark');
        elements.typeWriterCursorElement.classList.add('blinking-light');
        // breifcase-icon theme
        ['bg-light', 'dark-text'].forEach(cl => elements.breifcaseIcon.classList.remove(cl));
        ['bg-dark', 'light-text'].forEach(cl => elements.breifcaseIcon.classList.add(cl));
    }
};
elements.darkModeCheckbox.addEventListener('change', handleThemeChange);

/**
 * Handle hamburger menu toggle button
 */
const handleMenuToggle = event => {
    elements.menuOptions.classList.toggle('no-display');
    elements.menuButton.classList.toggle('primary-text');
};
elements.menuButton.addEventListener('click', handleMenuToggle);

/**
 * Show more projects
 */
const showMoreProjects = event => {
    if (!state.showProjects) {
        elements.showMoreProjectsButton.innerHTML = `SHOW LESS &nbsp; <i class="fas fa-angle-up"></i>`;
    } else {
        elements.showMoreProjectsButton.innerHTML = `SHOW MORE &nbsp; <i class="fas fa-angle-down"></i>`
    }
    elements.hiddenProjects.classList.toggle('no-display');
    elements.hiddenProjects.classList.toggle('animated');
    state.showProjects = !state.showProjects;
};
elements.showMoreProjectsButton.addEventListener('click', showMoreProjects);