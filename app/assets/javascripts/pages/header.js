var headroom = require('headroom');

function initHeader() {

  // grab an element
  var myElement = document.querySelector("header");
  // construct an instance of Headroom, passing the element
  var headroom  = new Headroom(myElement);
  // initialise
  headroom.init({
    tolerance : {
        up : 20,
        down : 10
    }
  }); 

}

module.exports = initHeader;