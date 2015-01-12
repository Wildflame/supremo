var $preloader = $('.preload-wrapper');

function init () {
  $preloader.addClass('active');
}

function destroy () {
  $preloader.removeClass('active');
}

module.exports = {
  init: init,
  destroy: destroy
}