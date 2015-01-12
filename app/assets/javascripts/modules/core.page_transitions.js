require('pjax');
var currentPage = require('./core.current_page_is');
var pagePreloader = require('./core.page_preloader');

$.pjax({
  area: '.page-body, .header',
  callback: function(){ 
    console.log('page load callback'); 
  },
  wait: 1000,
  callback: function() {
    // bacon();
  },
  rewrite: function (document, area, host) {
    console.log('Rewriting page parts');
    var newBodyClass = $('body', document).attr('class');
    $('body').attr('class', newBodyClass);
  }
});

$(document).bind('pjax:fetch', function () {
  console.log('fetching new page');

  var pageDelay1 = setTimeout(initPreloader, 400);
  currentPage.destroy();

  function initPreloader() {
    pagePreloader.init();
  }

});
$(document).bind('pjax:render', function () {
  console.log('rendering new page');
  var pageDelay1 = setTimeout(destroyPreloader, 1000);
  var pageDelay2 = setTimeout(initNewPage, 1000);

  function destroyPreloader() {
    pagePreloader.destroy();
  }

  function initNewPage() {
    currentPage.init();
  }
});

