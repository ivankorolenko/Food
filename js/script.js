'use strict';

document.addEventListener('DOMContentLoaded', () => {


    // ===================== Main slider ==========================
    // ============================================================

    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');
    
    function hideTabContent() {
        tabsContent.forEach((item) => {
            item.classList.add('hide');
            item.classList.remove('show');
        });

        tabs.forEach((item) => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if(target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
    

    // ==================== Discount timer ========================
    // ============================================================

    const deadline = '2020-10-1',
          timer = document.querySelector('.timer');

    function addZerro(num) {
        return (num <= 9) ? ('0' + num) : num;
    }

    function countTime(endTime) {
        const total = Date.parse(endTime) - Date.parse(new Date()),
              days = addZerro(Math.floor(total / (1000 * 60 * 60 * 24))),
              hours = addZerro(Math.floor(total / (1000 * 60 * 60) % 24)),
              minutes = addZerro(Math.floor(total / (1000 * 60) % 60)),
              seconds = addZerro(Math.floor(total / 1000 % 60));
               
        return {
            'total': total,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }
    }

    function setTimer(endTime, parent) {
        const days = parent.querySelector('#days'),
              hours = parent.querySelector('#hours'),
              minutes = parent.querySelector('#minutes'),
              seconds = parent.querySelector('#seconds'),
              timeInterval = setInterval(updateTimer, 1000);
        
        updateTimer();

        function updateTimer() {
            const total = countTime(endTime);

            days.innerHTML = total.days;
            hours.innerHTML = total.hours;
            minutes.innerHTML = total.minutes;
            seconds.innerHTML = total.seconds;

            if (total.total <= 0) {
                clearInterval(total);
            }
        }
    }

    setTimer(deadline, timer);


    // ==================== Modal window ==========================
    // ============================================================

    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal'),
          closeModal = modal.querySelector('.modal__close');

    function showModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    function hideModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= 
            document.documentElement.scrollHeight) {
            showModal();
            window.removeEventListener(showModalByScroll);
        }
    }

    modalTrigger.forEach(item => {
        item.addEventListener('click', showModal);
    });

    closeModal.addEventListener('click', hideModal);

    modal.addEventListener('click', event => {
        if (event.target === modal) {
            hideModal();
        }
    });

    document.addEventListener('keydown', event => {
        if (event.code === 'Escape' && modal.classList.contains('show')) {
            hideModal();
        }
    });
    
    const modalTimerId = setTimeout(showModal, 5000);

    window.addEventListener('scroll', showModalByScroll);


    // ================= Dinamic menu content =====================
    // ============================================================

    class Food {
        constructor(parent, imgSrc, imgAlt, title, descr, cost) {
            this.parent = document.querySelector(parent);
            this.imgSrc = imgSrc;
            this.imgAlt = imgAlt;
            this.title = title;
            this.descr = descr;
            this.cost = cost;
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

    new Food(
        '.menu__field .container', 
        'img/tabs/vegy.jpg', 'vegy', 
        'Меню "Фитнес"', 
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 
        229
    ).render();

    new Food(
        '.menu__field .container', 
        'img/tabs/elite.jpg', 
        'elite', 
        'Меню “Премиум”', 
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 
        550
    ).render();

    new Food(
        '.menu__field .container', 
        'img/tabs/post.jpg', 
        'post', 
        'Меню "Постное"', 
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.', 
        430
    ).render();

});