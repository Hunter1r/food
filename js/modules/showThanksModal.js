import showModal from './showModal';

//Модальное окно с информацией
    //После отправки данных на сервер инпуты и кнопки с модальной формы прячутся
    //вместо них показываем сообщение. После сообщение удаляется, а инпуты 
    //становятся видимыми
    function showThanksModal(message, modalTimerId) {

        const modal = document.querySelector('.modal');
        const originModal = document.querySelector('.modal__dialog');
        originModal.classList.add('hide');

        if (!modal.classList.contains('show')) {
            showModal(modal, modalTimerId);
        }

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
            <div class="modal__close" data-close>&times;</div>
                <div class="modal__title">
                ${message}
                </div>
            </div>
        `;
        modal.insertAdjacentElement('beforeend', thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            modal.classList.add('show'); //чтобы этот класс стоглился
            showModal(modal, modalTimerId);
            originModal.classList.remove('hide');
        }, 4000);
    }

    export default showThanksModal;