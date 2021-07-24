function showModal(modalBox, modalTimerId) {
    modalBox.classList.toggle('show');
    if (modalBox.classList.contains('show')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
    clearInterval(modalTimerId);
}

export default showModal;