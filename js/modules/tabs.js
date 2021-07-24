function tabs() {

    const tabs = document.querySelectorAll('div.tabcontent');
    const tabsParent = document.querySelector('div.tabheader__items');
    const tabsItems = document.querySelectorAll('.tabheader__item');

    function hideTabs() {
        tabs.forEach((item, i) => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
            tabsItems[i].classList.remove('tabheader__item_active');

        });
    }

    function showTab(k = 0) {
        tabs.forEach((item, i) => {
            if (k == i) {
                item.classList.add('show', 'fade');
                item.classList.remove('hide');
                tabsItems[i].classList.add('tabheader__item_active');
            }
        });
    }

    tabsParent.addEventListener('click', function (event) {
        const target = event.target;
        //Если пользователь ткнул на таб
        if (target && target.classList.contains('tabheader__item')) {
            // Перебираем все табы которые есть и сравниваем их с тем табом,
            // куда нажал пользователь
            tabsItems.forEach((item, i) => {
                if (target == item) {
                    hideTabs();
                    showTab(i);
                }

            });

        }
    });
    hideTabs();
    showTab(0);
}

export default tabs;