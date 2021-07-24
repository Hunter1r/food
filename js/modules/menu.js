import getResource from './getResource';
import MenuCard from './MenuCard';

function menu() {
    getResource('http://localhost:3000/menu')
    .then(data => {
        data.forEach(({
            img,
            altimg,
            title,
            descr,
            price
        }) => {
            new MenuCard(img,
                altimg,
                title,
                descr,
                price,
                '.menu .container', 'menu__item').render();
        });
    });
}

export default menu;