const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
const navLinks = document.querySelectorAll('.main-nav a');
const modal = document.querySelector('#video-modal');
const video = modal.querySelector('video');
const openVideoButtons = document.querySelectorAll('.open-video');
const closeModalButtons = modal.querySelectorAll('[data-close-modal]');
const contactForm = document.querySelector('#contact-form');
const backgroundElements = [...document.querySelectorAll('body > .skip-link, body > header, body > main, body > footer')];
const previousInertStates = new Map();
let lastFocusedElement = null;

function setMenuState(isOpen) {
    mainNav.classList.toggle('is-open', isOpen);
    menuToggle.classList.toggle('is-open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
}

function closeMenu() {
    setMenuState(false);
}

menuToggle.addEventListener('click', () => {
    setMenuState(menuToggle.getAttribute('aria-expanded') !== 'true');
});

navLinks.forEach((link) => link.addEventListener('click', closeMenu));

document.addEventListener('click', (event) => {
    const menuIsOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    const clickIsInsideMenu = mainNav.contains(event.target) || menuToggle.contains(event.target);

    if (menuIsOpen && !clickIsInsideMenu) closeMenu();
});

function getFocusableElements() {
    return [...modal.querySelectorAll('button, video, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')]
        .filter((element) => !element.disabled);
}

function openModal() {
    lastFocusedElement = document.activeElement;
    modal.hidden = false;
    backgroundElements.forEach((element) => {
        previousInertStates.set(element, element.hasAttribute('inert'));
        element.setAttribute('inert', '');
    });
    document.body.classList.add('modal-open');
    modal.querySelector('.modal-close').focus();
}

function closeModal() {
    video.pause();
    video.currentTime = 0;
    modal.hidden = true;
    document.body.classList.remove('modal-open');
    backgroundElements.forEach((element) => {
        if (previousInertStates.get(element)) element.setAttribute('inert', '');
        else element.removeAttribute('inert');
    });
    previousInertStates.clear();
    if (lastFocusedElement) lastFocusedElement.focus();
}

openVideoButtons.forEach((button) => button.addEventListener('click', () => {
    closeMenu();
    openModal();
}));

closeModalButtons.forEach((button) => button.addEventListener('click', closeModal));

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        if (!modal.hidden) closeModal();
        else closeMenu();
    }

    if (event.key === 'Tab' && !modal.hidden) {
        const focusableElements = getFocusableElements();
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        if (event.shiftKey && document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
        }
    }
});

function showFieldError(field, message) {
    const errorElement = field.parentElement.querySelector('.field-error');
    field.setAttribute('aria-invalid', message ? 'true' : 'false');
    errorElement.textContent = message;
}

contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const fields = [...contactForm.querySelectorAll('input, textarea')];
    const status = contactForm.querySelector('.form-status');
    let firstInvalidField = null;
    fields.forEach((field) => {
        let errorMessage = '';
        const value = field.value.trim();
        if (!value) errorMessage = 'Preencha este campo.';
        else if (field.type === 'email' && !field.validity.valid) errorMessage = 'Informe um e-mail válido.';
        showFieldError(field, errorMessage);
        if (errorMessage && !firstInvalidField) firstInvalidField = field;
    });
    if (firstInvalidField) {
        status.textContent = '';
        firstInvalidField.focus();
        return;
    }
    contactForm.reset();
    fields.forEach((field) => showFieldError(field, ''));
    status.textContent = 'Simulação concluída. Nenhuma informação foi enviada.';
});

contactForm.querySelectorAll('input, textarea').forEach((field) => {
    field.addEventListener('input', () => {
        if (field.getAttribute('aria-invalid') === 'true' && field.value.trim()) showFieldError(field, '');
        contactForm.querySelector('.form-status').textContent = '';
    });
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 960) closeMenu();
});
