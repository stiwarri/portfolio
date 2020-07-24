import { elements, globals } from './utils';

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
};


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

    if (isDarkModeOn) {
        // body theme
        ['bg-dark', 'light-text'].forEach(cl => elements.bodyElement.classList.add(cl));
        // top navbar theme
        ['bg-light', 'dark-text'].forEach(cl => elements.topNavbar.classList.remove(cl));
        ['bg-dark', 'light-text'].forEach(cl => elements.topNavbar.classList.add(cl));
        // menu options theme
        ['bg-dark', 'light-text'].forEach(cl => elements.menuOptions.classList.remove(cl));
        ['bg-light', 'dark-text'].forEach(cl => elements.menuOptions.classList.add(cl));
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