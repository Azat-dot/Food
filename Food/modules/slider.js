function slider({container, slide, nextArrow, prevArrow, totalCount, currentCounter, wrapper, field}) {
    //slider 2
    let offset = 0;
    let indexSlider = 1;

    const slider = document.querySelectorAll(slide),
        slider1 = document.querySelector(container),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCount),
        current = document.querySelector(currentCounter),
        slidesWrapper = document.querySelector(wrapper),
        width = window.getComputedStyle(slidesWrapper).width,
        slidesField = document.querySelector(field);

    if(slider.length < 10) {
        total.textContent = `0${slider.length}`;
        current.textContent = `0${indexSlider}`;
    }  else {
        total.textContent = slider.length;
        current.textContent = indexSlider;
    }

    slidesField.style.width = 100 * slider.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0,5s all';

    slidesWrapper.style.overflow = 'hidden';

    slider.forEach(slide => {
        slide.style.width = width;
    });

    slider1.style.position = 'relative';

    const indicators = document.createElement('ol'),
        dots = [];
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider1.append(indicators);

    for (let i = 0; i < slider.length; i++) {
        const dot = document.createElement('Li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
        box-sizing: content-box;
        flex: 0 1 auto;
        width: 30px;
        height: 6px;
        margin-right: 3px;
        margin-left: 3px;
        cursor: pointer;
        background-color: #fff;
        background-clip: padding-box;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        opacity: .5;
        transition: opacity .6s ease;
    `;
    if (i == 0) {
        dot.style.opacity = 1;
    }
    indicators.append(dot);
    dots.push(dot);
    }

    function deleteNotDigits(str) {
    return +str.replace(/\D/g, '');
    }

    next.addEventListener('click', () => {
        if (offset == deleteNotDigits(width) * (slider.length - 1)){
            offset = 0;
        } else{
            offset += deleteNotDigits(width);
        }

        slidesField.style.transform = ` translateX(-${offset}px)`;

        if(indexSlider == slider.length) {
            indexSlider = 1;
        } else {
            indexSlider++;
        }

        if (slider.length < 10) {
            current.textContent = `0${indexSlider}`;
        } else {
            current.textContent = indexSlider;
        }

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[indexSlider - 1].style.opacity = 1;

    });

    prev.addEventListener('click', () => {
        if (offset == 0){
            offset = deleteNotDigits(width) * (slider.length - 1);
        } else{
            offset -= deleteNotDigits(width);
        }

        slidesField.style.transform = ` translateX(-${offset}px)`;

        if(indexSlider == 1) {
            indexSlider = slider.length;
        } else {
            indexSlider--;
        }

        if (slider.length < 10) {
            current.textContent = `0${indexSlider}`;
        } else {
            current.textContent = indexSlider;
        }

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[indexSlider - 1].style.opacity = 1;
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            indexSlider = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);

            slidesField.style.transform = ` translateX(-${offset}px)`;

            if (slider.length < 10) {
                current.textContent = `0${indexSlider}`;
            } else {
                current.textContent = indexSlider;
            }

            dots.forEach(dot => dot.style.opacity = '.5');
            dots[indexSlider - 1].style.opacity = 1;
        });
    }); 
}

export default slider;