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


    // ======================= Offer slider =======================
    // ============================================================

    const slider = document.querySelector('.offer__slider'),
          prevSlide = document.querySelector('.offer__slider-prev'),
          nextSlide = document.querySelector('.offer__slider-next'),
          currentSlideNumber = document.querySelector('#current'),
          totalSlideCount = document.querySelector('#total'),
          slides = document.querySelectorAll('.offer__slide'),
          slidesWrapper = document.querySelector('.offer__slider-wrapper'),
          slidesField = document.querySelector('.offer__slider-inner'),
          width = window.getComputedStyle(slidesWrapper).width;

    let startSlider = 1,
        offset = 0;

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(item => {
        item.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol');
    indicators.classList.add('carousel-indicators');

    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');
        indicators.append(dot);
    }

    const allDots = document.querySelectorAll('.dot');

    function changeSlide() {
        currentSlideNumber.textContent = (startSlider <= 9) ? '0' + startSlider : startSlider;
        slidesField.style.transform = `translateX(-${offset}px)`;

        allDots.forEach(item => {
            item.style.opacity = '';
        });

        allDots[startSlider - 1].style.opacity = 1.0;
    }

    totalSlideCount.textContent = (slides.length <= 9) ? '0' + slides.length : slides.length;
    changeSlide();

    nextSlide.addEventListener('click', () => {
        if (offset == parseInt(width) * (slides.length - 1)) {
            offset = 0;
            startSlider = 1;
        } else {
            offset += parseInt(width);
            startSlider++;
        }

        changeSlide();
    });

    prevSlide.addEventListener('click', () => {
        if (offset == 0) {
            offset = parseInt(width) * (slides.length - 1);
            startSlider = slides.length;
        } else {
            offset -= parseInt(width);
            startSlider--;
        }

        changeSlide();
    });

    allDots.forEach((item, i) => {
        item.addEventListener('click', () => {
            startSlider = i + 1;
            offset = i * parseInt(width);
            changeSlide();
            console.log(offset);
        });
    });


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


});