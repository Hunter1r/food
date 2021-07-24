/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/MenuCard.js":
/*!********************************!*\
  !*** ./js/modules/MenuCard.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Классы для карточек
class MenuCard {
  constructor(src, alt, title, descr, price, parentSelector, ...clases) {
    this.src = src;
    this.alt = alt;
    this.title = title;
    this.descr = descr;
    this.price = price;
    this.parent = document.querySelector(parentSelector);
    this.clases = clases;
    this.transfer = 30;
    this.convertToRUB();
  }

  convertToRUB() {
    this.price = this.price * this.transfer;
  }

  render() {
    const elem = document.createElement('div');

    if (this.clases.length === 0) {
      elem.classList.add('menu__item');
    } else {
      this.clases.forEach(item => elem.classList.add(item));
    }

    elem.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                </div>
        `;
    this.parent.append(elem);
  }

}

/* harmony default export */ __webpack_exports__["default"] = (MenuCard);

/***/ }),

/***/ "./js/modules/Swiper.js":
/*!******************************!*\
  !*** ./js/modules/Swiper.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
class Swiper {
  constructor(slidesLine, clickArea, width, curr) {
    this.container = slidesLine;
    this.clickArea = clickArea;
    this.startPosition = 0;
    this.slideIndex = 0;
    this.scrollValue = +width.slice(0, width.length - 2);
    this.count = slidesLine.children.length;
    this.slides = slidesLine.children;
    this.offset = 0;
    this.moving = this.moving.bind(this);
    this.endMoving = this.endMoving.bind(this);
    this.arrIndicators = [];
    this.direction = "";
    this.curr = curr;
  }

  initHandler() {
    this.clickArea.addEventListener('mousedown', e => {
      if (e.target.matches('.left')) {
        this.direction = "right";
      } else {
        this.direction = "left";
      }

      this.startPosition = e.clientX;
      document.body.addEventListener('mousemove', this.moving);
      document.body.addEventListener('mouseup', this.endMoving);
    });
  }

  changeStateIndicators(slides, curr, arrIndicators) {
    if (slides.length < 10) {
      curr.textContent = `0${this.slideIndex + 1}`;
    } else {
      curr.textContent = `${this.slideIndex + 1}`;
    }

    arrIndicators.forEach(item => item.style.opacity = '.5');
    arrIndicators[this.slideIndex].style.opacity = 1;
  }

  moving(e) {
    e.preventDefault();
    let nextPosition = e.clientX;
    let shift = this.startPosition - nextPosition + this.offset;
    this.container.style.transform = `translateX(${-shift}px)`;
  }

  endMoving(e) {
    document.body.removeEventListener('mousemove', this.moving);
    document.body.removeEventListener('mouseup', this.endMoving);
    this.container.classList.add('animate');
    let endPosition = e.clientX;
    let moveDirection = this.startPosition > endPosition ? "left" : "right";

    if (this.startPosition == endPosition) {
      moveDirection = this.direction;
    }

    let newCoordinate = 0;

    if (moveDirection === "left") {
      newCoordinate = this.offset + this.scrollValue;

      if (this.slideIndex == this.count - 1) {
        this.slideIndex = 0;
      } else {
        this.slideIndex++;
      }

      this.changeStateIndicators(this.slides, this.curr, this.arrIndicators);
    } else {
      newCoordinate = this.offset - this.scrollValue;

      if (this.slideIndex == 0) {
        this.slideIndex = this.count - 1;
      } else {
        this.slideIndex--;
      }

      this.changeStateIndicators(this.slides, this.curr, this.arrIndicators);
    }

    if (newCoordinate >= 0 && newCoordinate < this.count * this.scrollValue) {
      this.offset = newCoordinate;
    } else if (newCoordinate >= this.count * this.scrollValue) {
      this.offset = 0;
    } else if (newCoordinate < 0) {
      this.offset = this.count * this.scrollValue - this.scrollValue;
    }

    this.container.style.transform = `translateX(${-this.offset}px)`;
    this.animationTimeoutID = setTimeout(() => {
      this.container.classList.remove("animate");
    }, 300);
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Swiper);

/***/ }),

/***/ "./js/modules/bindPostData.js":
/*!************************************!*\
  !*** ./js/modules/bindPostData.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _postData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./postData */ "./js/modules/postData.js");
/* harmony import */ var _showThanksModal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./showThanksModal */ "./js/modules/showThanksModal.js");



function bindPostData(form) {
  const messages = {
    loading: 'img/form/spinner.svg',
    success: 'Спасибо! Мы скоро свяжемся с вами',
    failure: 'Что-то пошло не так'
  };
  form.addEventListener('submit', e => {
    e.preventDefault();
    const msg = document.createElement('img');
    msg.src = messages.loading;
    msg.style.cssText = `
        display: block;
        margin: 0 auto;
        `;
    form.append(msg); // // отправка данных с помощью fetch API

    const formData = new FormData(form);
    const json = JSON.stringify(Object.fromEntries(formData.entries()));
    (0,_postData__WEBPACK_IMPORTED_MODULE_0__.default)('http://localhost:3000/requests', json).then(data => {
      (0,_showThanksModal__WEBPACK_IMPORTED_MODULE_1__.default)(messages.success);
      msg.remove();
    }).catch(() => {
      (0,_showThanksModal__WEBPACK_IMPORTED_MODULE_1__.default)(messages.failure);
    }).finally(() => {
      form.reset();
    });
  });
}

/* harmony default export */ __webpack_exports__["default"] = (bindPostData);

/***/ }),

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function calc() {
  //Calc
  let hGender, activity;
  let hHeight, hWeight, hAge;
  initLocalStorage();

  function calcTotal() {
    let result = document.querySelector('.calculating__result span');

    if (!hHeight || !hWeight || !hAge) {
      result.textContent = '____';
    } else {
      if (hGender === 'male') {
        result.textContent = Math.round((88.36 + 13.4 * hWeight + 4.8 * hHeight - 5.7 * hAge) * activity);
      } else {
        result.textContent = Math.round((447.6 + 9.2 * hWeight + 3.1 * hHeight - 4.3 * hAge) * activity);
      }
    }

    localStorage.setItem('hGender', hGender);
    localStorage.setItem('activity', activity);
  }

  function setActivity(parent, activityClass) {
    const elements = document.querySelectorAll(`${parent} div`);
    elements.forEach(element => {
      element.addEventListener('click', e => {
        elements.forEach(item => {
          item.classList.remove(activityClass);
        });
        e.target.classList.add(activityClass);

        if (e.target.getAttribute('data-ratio')) {
          activity = +e.target.getAttribute('data-ratio');
        } else {
          hGender = e.target.getAttribute('id');
        }

        calcTotal();
      });
    });
  }

  function getConstitution() {
    const elements = document.querySelectorAll('.calculating__choose_medium input');
    elements.forEach(element => {
      element.addEventListener('input', e => {
        if (e.target.value.match(/\D/g)) {
          e.target.style.border = '1px solid red';
        } else {
          e.target.style.border = 'none';
        }

        switch (e.target.getAttribute('id')) {
          case 'height':
            hHeight = +e.target.value;
            break;

          case 'weight':
            hWeight = +e.target.value;
            break;

          case 'age':
            hAge = +e.target.value;
            break;
        }

        calcTotal();
      });
    });
  }

  function initLocalStorage() {
    if (localStorage.getItem('hGender')) {
      hGender = localStorage.getItem('hGender');
    } else {
      localStorage.setItem('hGender', 'female');
      hGender = localStorage.getItem('hGender');
    }

    if (localStorage.getItem('activity')) {
      activity = localStorage.getItem('activity');
    } else {
      localStorage.setItem('activity', 1.375);
      activity = localStorage.getItem('activity');
    }

    const elements = document.querySelectorAll('.calculating__choose div');
    elements.forEach(element => {
      element.classList.remove('calculating__choose-item_active');

      if (element.getAttribute('id') === hGender) {
        element.classList.add('calculating__choose-item_active');
      }

      if (element.getAttribute('data-ratio') === activity) {
        element.classList.add('calculating__choose-item_active');
      }
    });
  }

  calcTotal(); // inizialize

  getConstitution();
  setActivity('#gender', 'calculating__choose-item_active');
  setActivity('.calculating__choose_big', 'calculating__choose-item_active');
}

/* harmony default export */ __webpack_exports__["default"] = (calc);

/***/ }),

/***/ "./js/modules/getResource.js":
/*!***********************************!*\
  !*** ./js/modules/getResource.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const getResource = async url => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, status ${res.status}`);
  }

  return await res.json();
};

/* harmony default export */ __webpack_exports__["default"] = (getResource);

/***/ }),

/***/ "./js/modules/menu.js":
/*!****************************!*\
  !*** ./js/modules/menu.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _getResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getResource */ "./js/modules/getResource.js");
/* harmony import */ var _MenuCard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MenuCard */ "./js/modules/MenuCard.js");



function menu() {
  (0,_getResource__WEBPACK_IMPORTED_MODULE_0__.default)('http://localhost:3000/menu').then(data => {
    data.forEach(({
      img,
      altimg,
      title,
      descr,
      price
    }) => {
      new _MenuCard__WEBPACK_IMPORTED_MODULE_1__.default(img, altimg, title, descr, price, '.menu .container', 'menu__item').render();
    });
  });
}

/* harmony default export */ __webpack_exports__["default"] = (menu);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _showModal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./showModal */ "./js/modules/showModal.js");


function modal(modalTimerId) {
  // modal window
  const modalTrigger = document.querySelectorAll('[data-show-modal]'); // const modalClose = document.querySelector('.modal__close');

  const modal = document.querySelector('.modal');
  modalTrigger.forEach(item => {
    item.addEventListener('click', () => {
      (0,_showModal__WEBPACK_IMPORTED_MODULE_0__.default)(modal, modalTimerId);
    });
  });
  modal.addEventListener('click', e => {
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
      (0,_showModal__WEBPACK_IMPORTED_MODULE_0__.default)(modal, modalTimerId);
    }
  });
  document.addEventListener('keydown', e => {
    if (e.code === 'Escape' && modal.classList.contains('show')) {
      (0,_showModal__WEBPACK_IMPORTED_MODULE_0__.default)(modal, modalTimerId);
    }
  });

  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      (0,_showModal__WEBPACK_IMPORTED_MODULE_0__.default)(modal, modalTimerId);
      window.removeEventListener('scroll', showModalByScroll);
    }
  }

  window.addEventListener('scroll', showModalByScroll);
}

/* harmony default export */ __webpack_exports__["default"] = (modal);

/***/ }),

/***/ "./js/modules/postData.js":
/*!********************************!*\
  !*** ./js/modules/postData.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const postData = async (url, data) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: data
  });
  return await res.json();
};

/* harmony default export */ __webpack_exports__["default"] = (postData);

/***/ }),

/***/ "./js/modules/showModal.js":
/*!*********************************!*\
  !*** ./js/modules/showModal.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function showModal(modalBox, modalTimerId) {
  modalBox.classList.toggle('show');

  if (modalBox.classList.contains('show')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }

  clearInterval(modalTimerId);
}

/* harmony default export */ __webpack_exports__["default"] = (showModal);

/***/ }),

/***/ "./js/modules/showThanksModal.js":
/*!***************************************!*\
  !*** ./js/modules/showThanksModal.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _showModal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./showModal */ "./js/modules/showModal.js");
 //Модальное окно с информацией
//После отправки данных на сервер инпуты и кнопки с модальной формы прячутся
//вместо них показываем сообщение. После сообщение удаляется, а инпуты 
//становятся видимыми

function showThanksModal(message, modalTimerId) {
  const modal = document.querySelector('.modal');
  const originModal = document.querySelector('.modal__dialog');
  originModal.classList.add('hide');

  if (!modal.classList.contains('show')) {
    (0,_showModal__WEBPACK_IMPORTED_MODULE_0__.default)(modal, modalTimerId);
  }

  const thanksModal = document.createElement('div');
  thanksModal.classList.add('modal__dialog');
  thanksModal.innerHTML = `
            <div class="modal__content">
            <div class="modal__close" data-close>&times;</div>
                <div class="modal__title">
                ${message}
                </div>
            </div>
        `;
  modal.insertAdjacentElement('beforeend', thanksModal);
  setTimeout(() => {
    thanksModal.remove();
    modal.classList.add('show'); //чтобы этот класс стоглился

    (0,_showModal__WEBPACK_IMPORTED_MODULE_0__.default)(modal, modalTimerId);
    originModal.classList.remove('hide');
  }, 4000);
}

/* harmony default export */ __webpack_exports__["default"] = (showThanksModal);

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _getResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getResource */ "./js/modules/getResource.js");
/* harmony import */ var _Swiper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Swiper */ "./js/modules/Swiper.js");



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
  const width = window.getComputedStyle(slidesWrapper).width; //   const height = window.getComputedStyle(slider).height;

  const createSlide = (img, alt) => {
    const slide = document.createElement('div');
    slide.classList.add('offer__slide');
    slide.innerHTML = `<img src=${img} alt=${alt}>`;
    return slide;
  }; //получим картинки с сервера
  //используем 'chaining'. Второй then выполняется только после того, как выполнился первый.


  (0,_getResource__WEBPACK_IMPORTED_MODULE_0__.default)('http://localhost:3000/slider').then(data => {
    data.forEach(item => {
      slidesLine.append(createSlide(item.img, item.alt));
    });
    return data;
  }).then(data => {
    const slides = document.querySelectorAll('.offer__slide');
    slidesLine.style.width = 100 * slides.length + '%';
    slidesLine.style.display = 'flex';
    slidesLine.style.transition = '0.5s all';
    slidesWrapper.style.overflow = 'hidden'; //слайды могут быть разной ширины. Приведем их к одной.

    slides.forEach(item => {
      item.style.width = width;
    });
    clickArea.style.width = width;
    Array.prototype.forEach.call(clickArea.children, item => {
      item.style.width = +width.slice(0, width.length - 2) / 2 + "px";
      item.style.height = window.getComputedStyle(document.querySelector('.offer__slide')).height;
      clickArea.firstElementChild.style.width = +width.slice(0, width.length - 2) / 2 + "px";
      clickArea.firstElementChild.style.height = window.getComputedStyle(document.querySelector('.offer__slide')).height;
    });
    let swiper = new _Swiper__WEBPACK_IMPORTED_MODULE_1__.default(slidesLine, clickArea, width, curr);
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
    swiper.arrIndicators.forEach(item => {
      item.addEventListener('click', e => {
        const slideTo = e.target.getAttribute('data-slide-to');
        swiper.slideIndex = slideTo - 1;
        swiper.offset = width.slice(0, width.length - 2) * swiper.slideIndex;
        slidesLine.style.transform = `translateX(-${swiper.offset}px)`;
        swiper.changeStateIndicators(slides, curr, swiper.arrIndicators);
      });
    });
  });
}

/* harmony default export */ __webpack_exports__["default"] = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function tabs() {
  const tabs = document.querySelectorAll('div.tabcontent');
  const tabsParent = document.querySelector('div.tabheader__items');
  const tabsItems = document.querySelectorAll('.tabheader__item');

  function hideTabs() {
    tabs.forEach((item, i) => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
      tabsItems[i].classList.remove('tabheader__item_active');
    });
  }

  function showTab(k = 0) {
    tabs.forEach((item, i) => {
      if (k == i) {
        item.classList.add('show', 'fade');
        item.classList.remove('hide');
        tabsItems[i].classList.add('tabheader__item_active');
      }
    });
  }

  tabsParent.addEventListener('click', function (event) {
    const target = event.target; //Если пользователь ткнул на таб

    if (target && target.classList.contains('tabheader__item')) {
      // Перебираем все табы которые есть и сравниваем их с тем табом,
      // куда нажал пользователь
      tabsItems.forEach((item, i) => {
        if (target == item) {
          hideTabs();
          showTab(i);
        }
      });
    }
  });
  hideTabs();
  showTab(0);
}

/* harmony default export */ __webpack_exports__["default"] = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function timer(endDiscountDate) {
  function getTimeRemaining(DiscountDate) {
    const tDisc = Date.parse(DiscountDate);
    const tNow = new Date().getTime();
    let tDelta = tDisc - tNow; //в м/с

    let days, hours, minutes, seconds;

    if (tDelta >= 0) {
      days = Math.floor(tDelta / (1000 * 60 * 60 * 24));
      hours = Math.floor(tDelta / (1000 * 60 * 60) % 24);
      minutes = Math.floor(tDelta / 1000 / 60 % 60);
      seconds = Math.floor(tDelta / 1000 % 60);
    } else {
      tDelta = 0;
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    }

    return {
      'total': tDisc,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock() {
    const days = document.querySelector('#days');
    const hours = document.querySelector('#hours');
    const minutes = document.querySelector('#minutes');
    const seconds = document.querySelector('#seconds');
    const timeInterval = setInterval(updateClock, 1000);
    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endDiscountDate);
      days.textContent = getZero(t.days);
      hours.textContent = getZero(t.hours);
      minutes.textContent = getZero(t.minutes);
      seconds.textContent = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock();
}

/* harmony default export */ __webpack_exports__["default"] = (timer);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../js/modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _js_modules_timer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../js/modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _js_modules_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../js/modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _js_modules_bindPostData__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../js/modules/bindPostData */ "./js/modules/bindPostData.js");
/* harmony import */ var _js_modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../js/modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _js_modules_calc__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../js/modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _js_modules_menu__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../js/modules/menu */ "./js/modules/menu.js");
/* harmony import */ var _js_modules_showModal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../js/modules/showModal */ "./js/modules/showModal.js");








document.addEventListener('DOMContentLoaded', function () {
  const endDiscountDate = '2021-07-19';
  const modalTimerId = setTimeout(() => {
    (0,_js_modules_showModal__WEBPACK_IMPORTED_MODULE_7__.default)(_js_modules_modal__WEBPACK_IMPORTED_MODULE_2__.default, modalTimerId);
  }, 50000);
  (0,_js_modules_tabs__WEBPACK_IMPORTED_MODULE_0__.default)();
  (0,_js_modules_timer__WEBPACK_IMPORTED_MODULE_1__.default)(endDiscountDate);
  (0,_js_modules_modal__WEBPACK_IMPORTED_MODULE_2__.default)(modalTimerId);
  (0,_js_modules_menu__WEBPACK_IMPORTED_MODULE_6__.default)(); // отправка формы на сервер

  const forms = document.querySelectorAll('form');
  forms.forEach(item => {
    (0,_js_modules_bindPostData__WEBPACK_IMPORTED_MODULE_3__.default)(item);
  });
  (0,_js_modules_slider__WEBPACK_IMPORTED_MODULE_4__.default)();
  (0,_js_modules_calc__WEBPACK_IMPORTED_MODULE_5__.default)();
});
}();
/******/ })()
;
//# sourceMappingURL=bundle.js.map