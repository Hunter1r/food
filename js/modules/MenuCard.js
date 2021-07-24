// Классы для карточек
class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...clases) {
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.descr = descr;
        this.price = price;
        this.parent = document.querySelector(parentSelector);
        this.clases = clases;
        this.transfer = 30;
        this.convertToRUB();
    }
    convertToRUB() {
        this.price = this.price * this.transfer;
    }

    render() {
        const elem = document.createElement('div');
        if (this.clases.length === 0) {
            elem.classList.add('menu__item');
        } else {
            this.clases.forEach(item => elem.classList.add(item));
        }

        elem.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                </div>
        `;
        this.parent.append(elem);
    }

}

export default MenuCard;