'use strict';

document.addEventListener('DOMContentLoaded', () => {

    // Main slider

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

    // Discount timer

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

            if (total.total <= 0){
                clearInterval(total);
            }
        }
    }

    setTimer(deadline, timer);

    // Modal window

    const modalButtons = document.querySelectorAll('[data-modal]'),
          modalBlock = document.querySelector('.modal'),
          closureButton = modalBlock.querySelector('.modal__close');

    function showModal() {
        modalBlock.classList.add('show');
        modalBlock.classList.remove('hide');
        document.body.style.overflow = 'hidden'; 
    }

    function hideModal() {
        modalBlock.classList.add('hide');
        modalBlock.classList.remove('show');
        document.body.style.overflow = '';  
    }

    modalButtons.forEach(item => {
        item.addEventListener('click', showModal);
    });

    closureButton.addEventListener('click', hideModal);

    modalBlock.addEventListener('click', event => {
        if (event.target === modalBlock) {
            hideModal();
        }
    });

    document.addEventListener('keydown', event => {
        if (event.code === 'Escape' && modalBlock.classList.contains('show')) {
            hideModal();
        }
    });

});