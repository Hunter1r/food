import postData from './postData';
import showThanksModal from './showThanksModal';

function bindPostData(form) {

    const messages = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Мы скоро свяжемся с вами',
        failure: 'Что-то пошло не так'
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const msg = document.createElement('img');
        msg.src = messages.loading;
        msg.style.cssText = `
        display: block;
        margin: 0 auto;
        `;
        form.append(msg);

        // // отправка данных с помощью fetch API
        const formData = new FormData(form);
        const json = JSON.stringify(Object.fromEntries(formData.entries()));

        postData('http://localhost:3000/requests', json)
            .then(data => {
                showThanksModal(messages.success);
                msg.remove();
            })
            .catch(() => {
                showThanksModal(messages.failure);
            })
            .finally(() => {
                form.reset();
            });
    });
}

export default bindPostData;