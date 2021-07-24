import getResource from './getResource';
import Swiper from './Swiper';

function slider() {

      //Slider Part two
      const slider = document.querySelector('.offer__slider');
      const slidesWrapper = document.querySelector('.offer__slider-wrapper');
      const slidesLine = document.querySelector('.offer__slider-inner');
      const clickArea = document.querySelector('.offer__slider-click__area');
      const total = document.querySelector('#total');
      const curr = document.querySelector('#current');
      const next = document.querySelector('.offer__slider-next');
      const prev = document.querySelector('.offer__slider-prev');
      const width = window.getComputedStyle(slidesWrapper).width;
    //   const height = window.getComputedStyle(slider).height;
      const createSlide = (img, alt) => {
          const slide = document.createElement('div');
          slide.classList.add('offer__slide');
          slide.innerHTML = `<img src=${img} alt=${alt}>`;
          return slide;
      };
  
      //получим картинки с сервера
      //используем 'chaining'. Второй then выполняется только после того, как выполнился первый.
      getResource('http://localhost:3000/slider')
          .then(data => {
              
              data.forEach((item) => {
                  slidesLine.append(createSlide(item.img, item.alt));
              });
              return data;
          })
          .then(data => {
              const slides = document.querySelectorAll('.offer__slide');
              slidesLine.style.width = 100 * slides.length + '%';
              slidesLine.style.display = 'flex';
              slidesLine.style.transition = '0.5s all';
              slidesWrapper.style.overflow = 'hidden';
              //слайды могут быть разной ширины. Приведем их к одной.
              slides.forEach(item => {
                  item.style.width = width;
              });
              clickArea.style.width = width;
              Array.prototype.forEach.call(clickArea.children,item=>{
                  
                      item.style.width = +width.slice(0,width.length-2)/2 + "px";
                      item.style.height = window.getComputedStyle(document.querySelector('.offer__slide')).height;
                      clickArea.firstElementChild.style.width = +width.slice(0,width.length-2)/2 + "px";
                      clickArea.firstElementChild.style.height = window.getComputedStyle(document.querySelector('.offer__slide')).height;
                  });
              
                  let swiper = new Swiper(slidesLine, clickArea, width, curr);
  
              swiper.initHandler();
              
              slider.style.position = 'relative';
              const indicators = document.createElement('ol');
              indicators.classList.add('carousel-indicators');
              slider.append(indicators);
              for (let i = 0; i < slides.length; i++) {
                  const indicator = document.createElement('li');
                  indicator.classList.add('dot');
                  indicator.setAttribute('data-slide-to', i + 1);
                  indicators.append(indicator);
                  if (i == 0) {
                      indicator.style.opacity = 1;
                  }
                  swiper.arrIndicators.push(indicator);
              }
  
              if (slides.length < 10) {
                  total.textContent = `0${slides.length}`;
              } else {
                  total.textContent = `${slides.length}`;
              }
              swiper.changeStateIndicators(slides, curr, swiper.arrIndicators);
  
              next.addEventListener('click', () => {
                  if (swiper.offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
                      swiper.offset = 0;
                  } else {
                      swiper.offset += +width.slice(0, width.length - 2);
                  }
                  slidesLine.style.transform = `translateX(-${swiper.offset}px)`;
                  if (swiper.slideIndex == slides.length - 1) {
                      swiper.slideIndex = 0;
                  } else {
                      swiper.slideIndex++;
                  }
                  swiper.changeStateIndicators(slides, curr, swiper.arrIndicators);
                  
              });
  
              prev.addEventListener('click', () => {
                  if (swiper.offset == 0) {
                      swiper.offset = +width.slice(0, width.length - 2) * (slides.length - 1);
                  } else {
                      swiper.offset -= +width.slice(0, width.length - 2);
                  }
                  slidesLine.style.transform = `translateX(-${swiper.offset}px)`;
                  if (swiper.slideIndex == 0) {
                      swiper.slideIndex = slides.length - 1;
                  } else {
                      swiper.slideIndex--;
                  }
                  swiper.changeStateIndicators(slides, curr, swiper.arrIndicators);
                  
              });
  
              swiper.arrIndicators.forEach(item=>{
                  item.addEventListener('click',(e)=>{
                      const slideTo = e.target.getAttribute('data-slide-to');
                      swiper.slideIndex = slideTo - 1;
                      swiper.offset = width.slice(0, width.length - 2) * (swiper.slideIndex);
                      slidesLine.style.transform = `translateX(-${swiper.offset}px)`;
                      swiper.changeStateIndicators(slides, curr, swiper.arrIndicators);
                  });
              });
          });
  
}

export default slider;