function calculator() {

    // ======================== Calculator ========================
    // ============================================================

    const result = document.querySelector('.calculating__result span')
    let sex, height, weight, age, ratio;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function initLocalSettings (selector) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(item => {
            item.classList.remove('calculating__choose-item_active');

            if (item.getAttribute('id') === localStorage.getItem('sex') ||
                item.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                item.classList.add('calculating__choose-item_active');
            }
        });
    }

    function calcTocal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '---';
            return;
        }

        if (sex === 'female') {
            result.textContent = Math.round((447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio);
        } else {
            result.textContent = Math.round((88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio);
        }
    }

    initLocalSettings ('#gender div');
    initLocalSettings ('.calculating__choose_big div');
    calcTocal();

    function getStaticInformation(selector) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.addEventListener('click', event => {
                if (event.target.getAttribute('data-ratio')) {
                    ratio = +event.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +event.target.getAttribute('data-ratio'));
                } else {
                    sex = event.target.getAttribute('id');
                    localStorage.setItem('sex', event.target.getAttribute('id'));
                }

                elements.forEach(item => {
                    item.classList.remove('calculating__choose-item_active');
                });

                event.target.classList.add('calculating__choose-item_active');

                calcTocal();
            });
        });
    }

    getStaticInformation('#gender div');
    getStaticInformation('.calculating__choose_big div');

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }

            switch(input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
            }

            calcTocal();
        });
    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');

}

export default calculator;