// require('jquery');
// require('modernizr');


$(document).ready(function() {

  // require('./modules/core.image_preloader');

  // var home = require('./pages/page.home');
  // home.init();

  var checkPage = require('./modules/core.current_page_is');
  checkPage.init();

  require('./modules/core.page_transitions');

});