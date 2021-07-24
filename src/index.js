
    import tabs from "../js/modules/tabs";
    import timer from "../js/modules/timer";
    import modal from "../js/modules/modal";
    import bindPostData from "../js/modules/bindPostData";
    import slider from "../js/modules/slider";
    import calc from "../js/modules/calc";
    import menu from "../js/modules/menu";
    import showModal from "../js/modules/showModal";

document.addEventListener('DOMContentLoaded', function () {

    const endDiscountDate = '2021-07-19';

    const modalTimerId = setTimeout(() => {
        showModal(modal, modalTimerId);
    }, 50000);

    tabs();
    timer(endDiscountDate);
    modal(modalTimerId);

    menu();

    // отправка формы на сервер
    const forms = document.querySelectorAll('form');
    forms.forEach(item => {
        bindPostData(item);
    });

    slider();
    calc();

});