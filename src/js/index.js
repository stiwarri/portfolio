import { elements } from './utils';

/**
 * Handle dark mode toggle button
 */
const handleThemeChange = event => {
    const isDarkModeOn = event.target.checked;

    if (isDarkModeOn) {
        // body theme
        ['bg-dark', 'light-text'].forEach(cl => elements.bodyElement.classList.add(cl));

        // menu options theme
        ['bg-dark', 'light-text'].forEach(cl => elements.menuOptions.classList.remove(cl));
        ['bg-light', 'dark-text'].forEach(cl => elements.menuOptions.classList.add(cl));
    } else {
        // body theme
        ['bg-dark', 'light-text'].forEach(cl => elements.bodyElement.classList.remove(cl));

        // menu options theme
        ['bg-dark', 'light-text'].forEach(cl => elements.menuOptions.classList.add(cl));
        ['bg-light', 'dark-text'].forEach(cl => elements.menuOptions.classList.remove(cl));
    }
};

elements.darkModeCheckbox.addEventListener('change', handleThemeChange);

/**
 * Handle hamburger menu toggle button
 */
const handleMenuOptionToggle = event => {
    elements.menuOptions.classList.toggle('no-display');
    elements.menuButton.classList.toggle('primary-text');
};

elements.menuButton.addEventListener('click', handleMenuOptionToggle);

/**
 * Handle document click
 */
const handleDocumentClick = event => {
    // close menu dropdown
    if (!elements.navigationItems.contains(event.target)) {
        elements.menuOptions.classList.add('no-display');
        elements.menuButton.classList.remove('primary-text');
    }
};

document.addEventListener('click', handleDocumentClick);