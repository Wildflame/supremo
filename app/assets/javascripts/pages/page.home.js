var Bounce = require('bounce.js');
var IScroll = require('iscroll');
// var Hammer = require('hammerjs');
var hammer = require('jquery-hammerjs');

var $hexCol, $hex,
    hexCount, hexInitBaseStaggerTime,
    hexInitDuration, myScroll,

    hexInitAnimation, hexHoverInAnimation,
    hexOutAnimation,

    docWidth, docHeight, hexColWidth,
    hexColCount, hexColMarginLeft,
    introTimeout,

    stage,
    hexTotalWidth;


function initVars() {
  stage = {};
  hex = {};

  $hexCol = $('.hex_col');
  $hex = $('.spine');
  hexCount = $hex.length;
  hexInitBaseStaggerTime = 150;

  docWidth = $('body').outerWidth();
  docHeight = $('body').outerHeight();

  hexColWidth = $('.hex_col').outerWidth();
  hexColCount = $('.hex_col').length;
  hexColMarginLeft = Number($('.hex_col:nth-child(2)').css('margin-left').replace(/[^-\d\.]/g, ''));  

  /**
   * Hex Vars.
   */

  hex.colCount = $hexCol.length;
  hex.count = $hex.length;
  hex.colWidth = $('.hex_col').outerWidth();
  hex.colShiftMarginLeft = Number($('.hex_col:nth-child(2)').css('margin-left').replace(/[^-\d\.]/g, ''));  

  /**
   * Stage vars.
   */

  stage.hexCount = $hexCol.children().length;
  stage.hexInView = stage.hexCount;
  stage.totalWidth = 0;

  stage.totalColumnsOffViewToLeft = 0;
  stage.$columnsOffViewToLeft = [];
  stage.totalHexagonsOffViewToLeft = 0;
  
  stage.totalColumnsOffViewToRight = 0;
  stage.$columnsOffViewToRight = [];
  stage.totalHexagonsOffViewToRight = 0;

  stage.totalColumnsInView = 0;
  stage.$columnsInView = [];
  // stage.HexInView = 0;
  stage.firstColumnInView = 0;
  stage.firstHexInView = 0;

  updateStageVars();

  hexInitDuration = stage.hexInView * hexInitBaseStaggerTime;

  hexInitAnimation = new Bounce();
  hexHoverInAnimation = new Bounce();
  hexOutAnimation = new Bounce();
}


function initContainerWidth() {
  $('.project-list').width(hexTotalWidth);
}

// Could do with renaming to delayed mainInit
function startIntroTimer() {
  introTimeout = setTimeout(function() {
    // console.log('Intro finished');
    hexInitText();
    hexHoverBehaviour();
    hexClickBehaviour();
    updateStageVars();

    perspectiveAnimation();
    hexSlider();

    $(window).resize(function() {
      updateStageVars();
      // console.log('Resize');
    });

  }, hexInitDuration + 300);
}

function updateStageVars() {
  totalColumnsOffViewToLeft();
  totalHexagonsOffViewToLeft();
  totalColumnsOffViewToRight();
  totalColumnsInView();
  totalHexInView();
  firstColumnInView();
  firstHexInView();
}


function calcHexTotalWidth() {
  hexTotalWidth = (hexColWidth * hexColCount) + (hexColMarginLeft * (hexColCount-1));
  
  stage.totalWidth = hexTotalWidth;
  // console.log('hexTotalWidth: ' + stage.totalWidth);
}

/**
 * Find total columns off to left.
 */

function totalColumnsOffViewToLeft() {
  var offsetLeft;

  if (typeof(myScroll) === "object") {
    offsetleft = Math.abs(myScroll.x);
  } else {
    offsetLeft =  0;
  }

  stage.totalColumnsOffViewToLeft = Math.floor(offsetLeft / hex.colWidth);
}

/**
 * Find total hexagons off to left.
 */

function totalHexagonsOffViewToLeft() {
  var cols = stage.totalColumnsOffViewToLeft;

  stage.totalHexagonsOffViewToLeft = $hexCol.slice(0, cols).children().length;
}

/**
 * Find total columns off to right.
 */

function totalColumnsOffViewToRight() {
  // var offsetLeft, widthRight;

  // if (typeof(myScroll) === "object") {
  //   offsetleft = Math.abs(myScroll.x) + docWidth;
  // } else {
  //   offsetLeft =  docWidth;
  // }

  // widthRight = stage.totalWidth - offsetLeft;

  //work out cols in offsetleft

  // stage.totalColumnsOffViewToRight = Math.floor(offsetLeft / hex.colWidth);

  stage.$columnsOffViewToRight.length = 0;

  $hexCol.each(function(i, el) {
    if ($(this).offset().left > docWidth) {
      stage.$columnsOffViewToRight.push($(this));
    }
  });

  stage.totalColumnsOffViewToRight = stage.$columnsOffViewToRight.length;
  // console.log('Els off to right');
  // console.log(stage.$columnsOffViewToRight.length);
}

/**
 * Find total hexagons off to right.
 */

function totalHexagonsOffViewToRight() {
  stage.totalHexagonsOffViewToRight = stage.$totalColumnsOffViewToRight.children().length;
}

function totalColumnsInView() {

  stage.$columnsInView.length = 0;

  $hexCol.each(function(i, el) {
    if (($(this).offset().left > -(hex.colWidth)) 
      && ($(this).offset().left < docWidth)) {
        stage.$columnsInView.push($(this));
      }
  });

  stage.totalColumnsInView = stage.$columnsInView.length;
}

function totalHexInView() {
  var count = 0;

  // console.log(stage.$columnsInView);

  $.each(stage.$columnsInView, function(i, el) {
    // console.log(i, el[0]);
    // console.log($(el[0]).children().length);
    count+= $(el[0]).children().length;
  });

  // console.log('Total in view: ');
  // console.log(count);

  stage.hexInView = count;

}

function firstColumnInView() {
  var $firstCol = $(stage.$columnsInView[0][0]);

  stage.firstColumnInView = $hexCol.index($firstCol);
}

function firstHexInView() {
  var $firstHex = $(stage.$columnsInView[0][0]).children().first();

  stage.firstHexInView = $hex.index($firstHex);
}

function perspectiveAnimation() {
  $('.full-width-wrapper').toggleClass('init');
}

function hexSlider() {
  $('.hex-slider').slick({
    draggable: false,
    fade: true,
    arrows: false,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2500,
    cssEase: 'linear'
  });
}

function initHexAnimation() {

  hexInitAnimation
    .translate({
      from: { x: -300, y: 0 },
      to: { x: 0, y: 0 },
      duration: 600,
      stiffness: 9,
      bounces: 1
    })
    .rotate({
      from: -45,
      to: 0,
      duration: 1600,
      stiffness: 2,
      bounces: 2
    })
    .scale({
      from: { x: 0.5, y: 0.5 },
      to: { x: 1, y: 1 },
      duration: 2600,
      bounces: 8,
      stiffness: 7,
    });

  $hex.each(function(i, el) {
    
    var timeout = hexInitBaseStaggerTime * (i + 1),
        initAnimation;

    initAnimation = setTimeout(function() {
      $(el).removeClass('spine--init');
      hexInitAnimation.applyTo(el);
    }, timeout);

  });
}

function hexInitText() {
  $hex.each(function(i, el) {
    
    var timeout = 50 * (i + 1),
        initAnimation;

    initAnimation = setTimeout(function() {
      $(el).removeClass('spine--init-text');
    }, timeout);

  });
}



function pageOutAnimation() {

  perspectiveAnimation();

  hexOutAnimation
    // .translate({
    //   from: { x: 0, y: 0 },
    //   to: { x: 100, y: 0 },
    //   duration: 1000,
    //   stiffness: 3,
    //   bounces: 1
    // })
    // .rotate({
    //   from: 0,
    //   to: 90,
    //   duration: 1600,
    //   stiffness: 5,
    //   bounces: 2
    // })
    .scale({
      from: { x: 1, y: 1 },
      to: { x: 0.8, y: 0.8 },
      duration: 1300,
      bounces: 2,
      stiffness: 3,
    });

  /**
   * Requires hexOffViewLeft, hexInView;
   */

   // console.log(stage.firstHexInView, stage.hexInView);

  $hex.slice(stage.firstHexInView, (stage.hexInView + stage.firstHexInView)).each(function(i, el) {

    var timeout = 50 * (i + 1),
        initAnimation;

    initAnimation = setTimeout(function() {
      $(el).addClass('spine--init');
      hexOutAnimation.applyTo(el);
    }, timeout);

  });

}

function hexClickBehaviour() {

  $hex.hammer().bind('tap click', function(e) {
  // $hex.on('click', function(e) {

    if (myScroll.moved) {
      $.pjax.disable();;
      e.preventDefault();
      return;
    }; 

    // console.log('cols in view: ' + stage.totalColumnsInView);
    // console.log('first hex in view: '+ stage.firstHexInView);
    // console.log('total hex in view: ' + stage.hexInView);

    pageOutAnimation();
    $.pjax.enable();
  });
}

function hexHoverBehaviour() {

  hexHoverInAnimation
    .scale({
      from: { x: 1, y: 1 },
      to: { x: 0.98, y: 0.98 },
      duration: 1000,
      bounces: 0,
      stiffness: 2,
      delay: 0
    })
    .scale({
      from: { x: 1, y: 1 },
      to: { x: 1.02, y: 1.02 },
      duration: 1000,
      bounces: 8,
      stiffness: 2,
      delay: 250
    });

  // delay init of this
  $hex.hover(function() {
    // console.log('hover');
    hexHoverInAnimation.applyTo($(this));
  }, function() {
    // console.log('leave');
  });
}



function initHorizontalScroll() {
  myScroll = new IScroll('#iscroll', { 
    scrollY: false, scrollX: true, mouseWheel: false
  });

  myScroll.on('scrollEnd', function() {
    // console.log('scroll end');
    updateStageVars();
  });
}


function initProjectList() {
  initVars();
  calcHexTotalWidth();
  initContainerWidth();
  initHorizontalScroll();
  initHexAnimation();
  startIntroTimer();
}


// module.exports = initProjectList();

module.exports = {
  init: initProjectList,
  destroy: pageOutAnimation
}