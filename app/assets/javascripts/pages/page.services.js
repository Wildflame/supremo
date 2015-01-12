require('slick.js');

function initServicesPage() {

  $('.page-header-window').addClass('active');

  $('.testimonials__slider').slick({
    dots: true,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false
  });
}

function destroyServicesPage() {
  $('.page-header-window').removeClass('active');
}

module.exports = {
  init: initServicesPage,
  destroy: destroyServicesPage
}