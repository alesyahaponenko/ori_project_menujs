import gsap from 'gsap';

window.Webflow ||= [];
window.Webflow.push(() => {
  init();
});

function init() {
  // document.addEventListener('load', (event) => {
  // ScrollTrigger.config({ ignoreMobileResize: true });
  if (document.querySelector('.wrapscroll')) {
    document.querySelector('.wrapscroll').style.overflowX = 'hidden';
  }
  let isMobile, desktop, tablet;
  let scrollBarElement = 0;

  isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    MobileWidth: function () {
      return window.innerWidth < 992;
    },
    any: function () {
      return (
        isMobile.MobileWidth() ||
        isMobile.Android() ||
        isMobile.BlackBerry() ||
        isMobile.iOS() ||
        isMobile.Opera() ||
        isMobile.Windows()
      );
    },
  };

  if (isMobile.any()) {
    desktop = false;
    if (window.innerWidth < 992 && window.innerWidth > 478) {
      tablet = true;
    } else {
      tablet = false;
    }
  } else {
    tablet = false;
    desktop = true;
  }

  // window.scrollTo(0, 0);

  function clickMenuBtn() {
    const line1 = document.querySelector('.menu1');
    const line2 = document.querySelector('.menu2');
    const line3 = document.querySelector('.menu3');
    const btnMenu = document.querySelector('.menu-button.w-nav-button');

    let tl = gsap.timeline({ paused: true });
    tl.to(line1, { rotate: 45, y: 0, background: 'white' })
      .to(line2, { rotate: -45, y: 0, background: 'white' }, 0)
      .to(line3, { y: 4, opacity: 0, background: 'white' }, 0)
      .reverse();

    btnMenu.addEventListener('click', (e) => {
      e.stopPropagation();
      setTimeout(() => {
        const links = document.querySelectorAll('.w--nav-link-open');
        links.forEach((el) => {
          el.addEventListener('click', () => {
            tl.reverse();
            scrollBarElement.updatePluginOptions('modal', { open: false });
          });
        });
      }, 300);

      tl.reversed(!tl.reversed());

      if (btnMenu.classList.contains('w--open')) {
        // scrollBarElement.updatePluginOptions('modal', { open: false });
      } else {
        // scrollBarElement.updatePluginOptions('modal', { open: true });
      }
    });
  }

  clickMenuBtn();
}
