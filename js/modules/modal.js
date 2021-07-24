
import showModal from './showModal';

function modal(modalTimerId) {
// modal window
const modalTrigger = document.querySelectorAll('[data-show-modal]');
// const modalClose = document.querySelector('.modal__close');
const modal = document.querySelector('.modal');


modalTrigger.forEach((item) => {
    item.addEventListener('click', () => {
        showModal(modal, modalTimerId);
    });
});

modal.addEventListener('click', (e) => {

    if (e.target === modal || e.target.getAttribute('data-close') == '') {
        showModal(modal, modalTimerId);
    }
});
document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modal.classList.contains('show')) {
        showModal(modal, modalTimerId);
    }
});


function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >=
        document.documentElement.scrollHeight) {
        showModal(modal, modalTimerId);
        window.removeEventListener('scroll', showModalByScroll);
    }
}
window.addEventListener('scroll', showModalByScroll);
}

export default modal;