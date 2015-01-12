var imagesLoaded = require('imagesloaded');

// imagesLoaded( document.querySelector('#iscroll'), function( instance ) {
//   console.log('all images are loaded');
// });

// var imgLoad = imagesLoaded('#iscroll');

// imgLoad.on( 'done', function( instance ) {
//   console.log('DONE  - all images have been successfully loaded');
// });

// imgLoad.on( 'progress', function( instance, image ) {
//   var result = image.isLoaded ? 'loaded' : 'broken';
//   console.log( 'image is ' + result + ' for ' + image.img.src );
// });





var $images = $('img');
$('.spine').each(function(){
  var el = $(this), sources, image;
  if(sources = el.css('background-image')){
    $.each(sources.split(','), function(i, source){
      if(image = source.match(/url\((['"])?(.*?)\1\)/)){
        $images = $images.add($('<img>').attr('src', image.pop()));
      }
    });
  }
});

// console.log($images);

$images.imagesLoaded()
.progress(function(instance, image){
  var result = image.isLoaded ? 'loaded' : 'broken';
  console.log('Image:', result, image.img.src);
})
.done(function(instance) {
  // console.log('Boom, done, bitches!');
});
