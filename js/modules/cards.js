import {getResources} from '../services/services';

function cards() {

    // ================= Dinamic menu content =====================
    // ============================================================

    class MenuCard {
        constructor(parent, imgSrc, imgAlt, title, descr, cost) {
            this.parent = document.querySelector(parent);
            this.imgSrc = imgSrc;
            this.imgAlt = imgAlt;
            this.title = title;
            this.descr = descr;
            this.cost = cost * 27.47;
        }

        render() {
            this.parent.insertAdjacentHTML('beforeend', `
            <div class="menu__item">
                <img src="${this.imgSrc}" alt="${this.imgAlt}">
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.cost}</span> грн/день</div>
                </div>
            </div>
            `);
        }
    }

    getResources('http://localhost:3000/menu')
    .then(data => {
        data.forEach(({img, altimg, title, descr, price}) => {
            new MenuCard('.menu__field .container', img, altimg, title, descr, price).render();
        });
    });

}

export default cards;