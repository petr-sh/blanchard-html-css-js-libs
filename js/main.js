document.addEventListener('DOMContentLoaded', () => {
  // smooth-scroll

  document.querySelectorAll('.scroll').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();

      const goto = link.getAttribute('href');

      document.querySelector(goto).scrollIntoView({
        behavior: 'smooth',
      });
    });
  });

  // burger

  document.addEventListener('click', function(e) {
    const burgerMenu = document.querySelector('.header__nav');
    const burger = document.querySelector('.header__burger');
    const targetBurger = e.target.classList.contains('header__burger');
    const targetCross = e.target.classList.contains('header__cross');
    const targetLinks = e.target.classList.contains('header__nav-link');
    const targetLk = e.target.classList.contains('header__lk');

    if (targetBurger) {
      burger.classList.add('header__burger--hidden');
      burgerMenu.classList.add('header__nav--is-open');
      document.body.classList.add('burger-blocker');
    } else if (targetCross || targetLinks || targetLk) {
      burger.classList.remove('header__burger--hidden');
      burgerMenu.classList.remove('header__nav--is-open');
      document.body.classList.remove('burger-blocker');
    }
  });

  // search-touch

  document.addEventListener('click', function(e) {
    const searchForm = document.querySelector('.header__search-touch');
    const searchInput = document.querySelector('.header__search-input');
    const targetOpen = e.target.classList.contains('header__search-open');
    const targetClose = e.target.classList.contains('header__search-close');
    const targetSearchForm = e.target.closest('.header__search-touch');

    if (targetOpen) {
      searchForm.classList.add('header__search-touch--is-open');
    } else if (targetClose) {
      searchForm.classList.remove('header__search-touch--is-open');
    } else if (!targetSearchForm && !targetOpen) {
      searchForm.classList.remove('header__search-touch--is-open');
      searchInput.value = '';
    }
  });

  // header-simplebar

  document.querySelectorAll('.dropdown__simplebar').forEach(item => {
    new SimpleBar(item, {
    autoHide: false,
    });
  });

  // header-dropdown

  const dropdowns = document.querySelectorAll('.header__dropdown');
  const dropdownBtns = document.querySelectorAll('.header__dropdown-btn');

  dropdownBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const thisDropdown = this.parentElement.querySelector('.header__dropdown');

      dropdowns.forEach(dropdown => {
        if (dropdown != thisDropdown) {
          dropdown.classList.remove('header__dropdown--is-active');
        }
      });

      dropdownBtns.forEach(btn => {
        if (btn != this) {
          btn.classList.remove('header__dropdown-btn--is-active');
        }
      });

      thisDropdown.classList.toggle('header__dropdown--is-active');
      this.classList.toggle('header__dropdown-btn--is-active');
    });
  });

  document.addEventListener('click', function(e) {
    if (!e.target.closest('.header__list')) {
      dropdowns.forEach(dropdown => {
        dropdown.classList.remove('header__dropdown--is-active');
      });

      dropdownBtns.forEach(btn => {
        btn.classList.remove('header__dropdown-btn--is-active');
      });
    }
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      dropdowns.forEach(dropdown => {
        dropdown.classList.remove('header__dropdown--is-active');
      });
      dropdownBtns.forEach(btn => {
        btn.classList.remove('header__dropdown-btn--is-active');
      });
    }
  });

  // hero-slider

  const heroSlider = new Swiper('.hero__slider', {
    loop: true,
    allowTouchMove: false,
    autoplay: {
      delay: 2000,
    },
    speed: 2000,
    effect: 'fade',
  });

  // gallery-select

  const gallerySelect = new Choices('.gallery__select', {
    searchEnabled: false,
    shouldSort: false,
    itemSelectText: '',
    position: 'bottom',
  });

  // gallery-slider

  const gallerySlider = new Swiper('.gallery__slider', {
    speed: 1000,
    slidesPerGroup: 1,
    slidesPerView: 1,
    spaceBetween: 12,
    breakpoints: {
      577: {
        slidesPerGroup: 2,
        slidesPerView: 2,
        spaceBetween: 38,
      },
      961: {
        slidesPerGroup: 2,
        slidesPerView: 2,
        spaceBetween: 34,
      },
      1281: {
        slidesPerGroup: 3,
        slidesPerView: 3,
        spaceBetween: 34,
      },
      1441: {
        slidesPerGroup: 3,
        slidesPerView: 3,
        spaceBetween: 50,
      },
    },
    pagination: {
      el: '.gallery__pagination',
      type: 'fraction',
    },
    navigation: {
      prevEl: '.gallery__btn--prev',
      nextEl: '.gallery__btn--next',
    },
    a11y: false,
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    slideVisibleClass: 'slide-visible',
    on: {
      init: function() {
        this.slides.forEach(slide => {
          if (!slide.classList.contains('slide-visible')) {
            slide.tabIndex = '-1';
          } else {
            slide.tabIndex = '';
          }
        });
      },
      slideChange: function() {
        this.slides.forEach(slide => {
          if (!slide.classList.contains('slide-visible')) {
            slide.tabIndex = '-1';
          } else {
            slide.tabIndex = '';
          }
        });
      }
    }
  });

  // catalog-accordion

  const catalogAccordion = new Accordion('.accordion', {
    elementClass: 'accordion__item',
    triggerClass: 'accordion__trigger',
    panelClass: 'accordion__content',
    activeClass: 'accordion__item--is-active',
    duration: 300,
    openOnInit: [0]
  });

  // catalog-tab

  document.querySelectorAll('.accordion__tab-link').forEach(tabLink => {
    tabLink.addEventListener('click', function(e) {
      const path = e.currentTarget.dataset.path;
      const target = document.querySelector(`[data-target="${path}"]`);
      const mediaMaxWidth = window.matchMedia('(max-width: 960px)');

      document.querySelectorAll('.accordion__tab-link').forEach(link => {
        link.classList.remove('accordion__tab-link--is-active');
      });

      document.querySelectorAll('.catalog__tab-content').forEach(tabContent => {
        tabContent.classList.remove('catalog__tab-content--is-active');
      });

      e.currentTarget.classList.add('accordion__tab-link--is-active');
      target.classList.add('catalog__tab-content--is-active');

      if (mediaMaxWidth.matches) {
        target.scrollIntoView({
          behavior: 'smooth',
        });
      }
    });
  });

  // events-slider

  const eventsSlider = new Swiper('.events__slider', {
    speed: 1000,
    slidesPerGroup: 1,
    slidesPerView: 1,
    spaceBetween: 27,
    breakpoints: {
      701: {
        slidesPerGroup: 2,
        slidesPerView: 2,
        spaceBetween: 34,
      },
      1015: {
        slidesPerGroup: 3,
        slidesPerView: 3,
        spaceBetween: 27,
      },
      1281: {
        slidesPerGroup: 3,
        slidesPerView: 3,
        spaceBetween: 50,
      },
    },
    pagination: {
      el: '.events__pagination',
      type: 'bullets',
      clickable: true,
    },
    navigation: {
      prevEl: '.events__btn--prev',
      nextEl: '.events__btn--next',
    },
    a11y: {
      prevSlideMessage: 'К предыдущему слайду',
      nextSlideMessage: 'К следующему слайду',
      slideLabelMessage: 'Слайд {{index}}',
      paginationBulletMessage: 'К слайду {{index}}',
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    slideVisibleClass: 'slide-visible',
    on: {
      init: function() {
        this.slides.forEach(slide => {
          if (!slide.classList.contains('slide-visible')) {
            slide.tabIndex = '-1';
            slide.querySelectorAll('.card__link').forEach(link => {
              link.tabIndex = '-1';
            });
          } else {
            slide.tabIndex = '';
            slide.querySelectorAll('.card__link').forEach(link => {
              link.tabIndex = '';
            });
          }
        });
      },
      slideChange: function() {
        this.slides.forEach(slide => {
          if (!slide.classList.contains('slide-visible')) {
            slide.tabIndex = '-1';
            slide.querySelectorAll('.card__link').forEach(link => {
              link.tabIndex = '-1';
            });
          } else {
            slide.tabIndex = '';
            slide.querySelectorAll('.card__link').forEach(link => {
              link.tabIndex = '';
            });
          }
        });
      }
    }
  });

  // projects-tooltip

  tippy('.projects__tooltip-btn', {
    theme: 'tooltip-projects',
    trigger: 'click',
    maxWidth: 265,
    duration: 200,
  });

  // projects-slider

  const projectsSlider = new Swiper('.projects__slider', {
    speed: 1000,
    slidesPerGroup: 1,
    slidesPerView: 1,
    spaceBetween: 21,
    breakpoints: {
      577: {
        slidesPerGroup: 2,
        slidesPerView: 2,
        spaceBetween: 21,
      },
      701: {
        slidesPerGroup: 2,
        slidesPerView: 2,
        spaceBetween: 34,
      },
      961: {
        slidesPerGroup: 2,
        slidesPerView: 2,
        spaceBetween: 50,
      },
      1281: {
        slidesPerGroup: 3,
        slidesPerView: 3,
        spaceBetween: 50,
      },
    },
    navigation: {
      prevEl: '.projects__btn--prev',
      nextEl: '.projects__btn--next',
    },
    a11y: false,
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    slideVisibleClass: 'slide-visible',
    on: {
      init: function() {
        this.slides.forEach(slide => {
          if (!slide.classList.contains('slide-visible')) {
            slide.tabIndex = '-1';
          } else {
            slide.tabIndex = '';
          }
        });
      },
      slideChange: function() {
        this.slides.forEach(slide => {
          if (!slide.classList.contains('slide-visible')) {
            slide.tabIndex = '-1';
          } else {
            slide.tabIndex = '';
          }
        });
      }
    }
  });

  // contacts-map

  ymaps.ready(init);

  function init() {
    const map = new ymaps.Map('map', {
      center: [55.758468, 37.601088],
      zoom: 14,
      controls: [
        'geolocationControl',
        'zoomControl',
      ]
    }, {
      geolocationControlPosition: {
        top: 360,
        right: 15,
      },
      zoomControlPosition: {
        top: 270,
        right: 15,
      },
      zoomControlSize: 'small',
    });

    const placemark = new ymaps.Placemark([55.758468, 37.601088], {}, {
      iconLayout: 'default#image',
      iconImageHref: './img/placemark.svg',
      iconImageSize: [20, 20],
      iconImageOffset: [-10, -10],
    });

    map.geoObjects.add(placemark);
    map.behaviors.disable('scrollZoom');
  }

  // contacts-form

  document.querySelectorAll('.contacts__input').forEach(input => {
    input.addEventListener('input', function() {
      if (this.classList.contains('focus-visible')) {
        this.classList.remove('focus-visible')
      }
    });
    input.addEventListener('click', function() {
      if (this.classList.contains('focus-visible')) {
        this.classList.remove('focus-visible')
      }
    });
  });

  // Validate-form

  const selector = document.querySelector('input[type="tel"]');
  const im = new Inputmask('+7 999-999-99-99');

  im.mask(selector);

  const validation = new JustValidate('.contacts__form', {
    errorLabelStyle: {
      color: '#d11616',
    },
  });

  validation
    .addField('.input-name', [
      {
        rule: 'required',
        errorMessage: 'Введите имя',
      },
      {
        rule: 'minLength',
        value: 2,
        errorMessage: 'Введите не менее 2 символов',
      },
      {
        rule: 'maxLength',
        value: 20,
        errorMessage: 'Недопустимый формат',
      },
    ])
    .addField('.input-tel', [
      {
        rule: 'required',
        errorMessage: 'Введите номер телефона',
      },
      {
        validator: () => {
          const phone = selector.inputmask.unmaskedvalue();
          return phone.length === 10;
        },
        errorMessage: 'Введите 10-значный номер',
      },
    ]).onSuccess((event) => {
      console.log('Validation passes and form submitted', event);

      let formData = new FormData(event.target);

      console.log(...formData);

      let xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log('Отправлено');
          }
        }
      }

      xhr.open('POST', 'mail.php', true);
      xhr.send(formData);

      event.target.reset();
    });

  // modal-gallery

  document.querySelectorAll('.gallery__slide').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();

      const IdModal = link.getAttribute('href');
      const modal = document.querySelector(IdModal);
      const header = document.querySelector('.header');
      const main = document.querySelector('.main');
      const footer = document.querySelector('.footer');
      const scrollSize = window.innerWidth - document.body.offsetWidth;

      function openModal() {
        modal.classList.add('modal__gallery--is-open');
        document.body.classList.add('body-blocked');
        modal.style.paddingRight = scrollSize + 'px';
        document.body.style.paddingRight = scrollSize + 'px';
        header.setAttribute('inert', '');
        main.setAttribute('inert', '');
        footer.setAttribute('inert', '');
      }

      function closeModal() {
        modal.classList.remove('modal__gallery--is-open');
        document.body.classList.remove('body-blocked');
        modal.style.removeProperty('padding-right');
        document.body.style.removeProperty('padding-right');
        header.removeAttribute('inert');
        main.removeAttribute('inert');
        footer.removeAttribute('inert');
      }

      if (modal) {
        openModal();
      }

      modal.addEventListener('click', function(e) {
        const targetModal = e.target.classList.contains('modal__gallery');
        const targetClose = e.target.classList.contains('modal__gallery-close');

        if (targetModal || targetClose) {
          closeModal();
        }
      });

      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
          closeModal();
        }
      });
    });
  });

  // modal-gallery-simplebar

  document.querySelectorAll('.gallery__modal-content').forEach(item => {
    new SimpleBar(item);
  });
});
