/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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

/* harmony default export */ __webpack_exports__["default"] = (calculator);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


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

    Object(_services_services__WEBPACK_IMPORTED_MODULE_0__["getResources"])('http://localhost:3000/menu')
    .then(data => {
        data.forEach(({img, altimg, title, descr, price}) => {
            new MenuCard('.menu__field .container', img, altimg, title, descr, price).render();
        });
    });

}

/* harmony default export */ __webpack_exports__["default"] = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(formSelector, modalTimerId) {

    // ========================= Forms ============================
    // ============================================================

    const forms = document.querySelectorAll(formSelector),
          message = {
            loading: 'img/form/spinner.svg',
            success: 'Спасибо! Скоро мы с вами свяжемся',
            failure: 'Что-то пошло не так'
          };

    forms.forEach(item => BindPostData(item));

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

            Object(_services_services__WEBPACK_IMPORTED_MODULE_1__["postData"])('http://localhost:3000/requests', json)
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
        Object(_modal__WEBPACK_IMPORTED_MODULE_0__["showModal"])('.modal', modalTimerId);

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
            Object(_modal__WEBPACK_IMPORTED_MODULE_0__["hideModal"])('.modal');
            thanksModal.remove();
            prevModalDialog.classList.remove('hide');
        }, 4000);
    }

}

/* harmony default export */ __webpack_exports__["default"] = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/*! exports provided: default, showModal, hideModal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showModal", function() { return showModal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hideModal", function() { return hideModal; });
function showModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';

    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
}

function hideModal(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimerId) {

    // ==================== Modal window ==========================
    // ============================================================

    const modalTrigger = document.querySelectorAll(triggerSelector),
          modal = document.querySelector(modalSelector);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= 
            document.documentElement.scrollHeight) {
            showModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    modalTrigger.forEach(item => {
        item.addEventListener('click', () => showModal(modalSelector, modalTimerId));
    });

    modal.addEventListener('click', event => {
        if (event.target === modal || event.target.getAttribute('data-close') === '') {
            hideModal(modalSelector);
        }
    });

    document.addEventListener('keydown', event => {
        if (event.code === 'Escape' && modal.classList.contains('show')) {
            hideModal(modalSelector);
        }
    });
    
    window.addEventListener('scroll', showModalByScroll);

}

/* harmony default export */ __webpack_exports__["default"] = (modal);


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {

    // ======================= Offer slider =======================
    // ============================================================

    const slider = document.querySelector(container),
          prevSlide = document.querySelector(prevArrow),
          nextSlide = document.querySelector(nextArrow),
          currentSlideNumber = document.querySelector(currentCounter),
          totalSlideCount = document.querySelector(totalCounter),
          slides = document.querySelectorAll(slide),
          slidesWrapper = document.querySelector(wrapper),
          slidesField = document.querySelector(field),
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

}

/* harmony default export */ __webpack_exports__["default"] = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {

    // ===================== Main slider ==========================
    // ============================================================

    const tabs = document.querySelectorAll(tabsSelector),
          tabsContent = document.querySelectorAll(tabsContentSelector),
          tabsParent = document.querySelector(tabsParentSelector);
    
    function hideTabContent() {
        tabsContent.forEach((item) => {
            item.classList.add('hide');
            item.classList.remove('show');
        });

        tabs.forEach((item) => {
            item.classList.remove(activeClass);
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if(target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
    
}

/* harmony default export */ __webpack_exports__["default"] = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function timer(id, deadline) {

    // ==================== Discount timer ========================
    // ============================================================

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
        const days = document.querySelector('#days'),
              hours = document.querySelector('#hours'),
              minutes = document.querySelector('#minutes'),
              seconds = document.querySelector('#seconds'),
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

    setTimer(deadline, id);

}

/* harmony default export */ __webpack_exports__["default"] = (timer);

/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_calculator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/calculator */ "./js/modules/calculator.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");












document.addEventListener('DOMContentLoaded', () => {
    const modalTimerId = setTimeout(() => Object(_modules_modal__WEBPACK_IMPORTED_MODULE_3__["showModal"])(modalSelector, modalTimerId), 300000);

    Object(_modules_calculator__WEBPACK_IMPORTED_MODULE_0__["default"])();
    Object(_modules_cards__WEBPACK_IMPORTED_MODULE_1__["default"])();
    Object(_modules_forms__WEBPACK_IMPORTED_MODULE_2__["default"])('form', modalTimerId);
    Object(_modules_modal__WEBPACK_IMPORTED_MODULE_3__["default"])('[data-modal]', '.modal', modalTimerId);
    Object(_modules_tabs__WEBPACK_IMPORTED_MODULE_5__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    Object(_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])('.timer', '2020-10-1');
    Object(_modules_slider__WEBPACK_IMPORTED_MODULE_4__["default"])({
        container: '.offer__slider', 
        slide: '.offer__slide', 
        nextArrow: '.offer__slider-next', 
        prevArrow: '.offer__slider-prev', 
        totalCounter: '#total', 
        currentCounter: '#current', 
        wrapper: '.offer__slider-wrapper', 
        field: '.offer__slider-inner'
    });
});

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/*! exports provided: postData, getResources */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "postData", function() { return postData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getResources", function() { return getResources; });
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

async function getResources(url) {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
};



/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map