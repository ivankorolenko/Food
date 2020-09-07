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

export default slider;