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
          modal = document.querySelector('.modal');

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
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    modalTrigger.forEach(item => {
        item.addEventListener('click', showModal);
    });

    modal.addEventListener('click', event => {
        if (event.target === modal || event.target.getAttribute('data-close') === '') {
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

    const getResources = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    };

    getResources('http://localhost:3000/menu')
    .then(data => {
        data.forEach(({img, altimg, title, descr, price}) => {
            new MenuCard('.menu__field .container', img, altimg, title, descr, price).render();
        });
    });


    // ========================= Forms ============================
    // ============================================================

    const forms = document.querySelectorAll('form'),
          message = {
            loading: 'img/form/spinner.svg',
            success: 'Спасибо! Скоро мы с вами свяжемся',
            failure: 'Что-то пошло не так'
          };

    forms.forEach(item => BindPostData(item));

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return await res.json();
    };

    function BindPostData(form) {
        form.addEventListener('submit', event => {
            event.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;

            form.insertAdjacentElement('afterend', statusMessage);
            
            const formData = new FormData(form);
            
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            })
            .catch(() => showThanksModal(message.failure))
            .finally(() => {
                form.reset();                  
            });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        showModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);

        setTimeout(() => {
            hideModal();
            thanksModal.remove();
            prevModalDialog.classList.remove('hide');
        }, 4000);
    }


    // ============= Offer slider 1-st implementation =============
    // ============================================================

    const prevSlide = document.querySelector('.offer__slider-prev'),
          nextSlide = document.querySelector('.offer__slider-next'),
          currentSlideNumber = document.querySelector('#current'),
          totalSlideCount = document.querySelector('#total'),
          slides = document.querySelectorAll('.offer__slide');   
    let startSlider = 1;

    totalSlideCount.textContent = (slides.length <= 9) ? '0' + slides.length : slides.length;

    function setOfferSlide(slideNumber) {
        let currentSlide;

        slides.forEach(item => {
            item.classList.remove('show');
            item.classList.add('hide');
        });

        slides[slideNumber - 1].classList.remove('hide');
        slides[slideNumber - 1].classList.add('show');

        currentSlideNumber.textContent = (slideNumber <= 9) ? '0' + slideNumber : slideNumber;
    }

    setOfferSlide(startSlider);

    nextSlide.addEventListener('click', () => {
        if (startSlider === slides.length) {
            startSlider = 0;
        }

        setOfferSlide(++startSlider);
    });

    prevSlide.addEventListener('click', () => {
        if (startSlider === 1) {
            startSlider = slides.length + 1;
        }

        setOfferSlide(--startSlider);
    });


});