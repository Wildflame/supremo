var Entities = require('html-entities').XmlEntities;

entities = new Entities();

module.exports.symbols = function(options) {

  // console.log(options.fn(this));
  return entities.decode(options.fn(this));
}

module.exports.if_odd = function(val, options) {
  var fnTrue=options.fn, fnFalse=options.inverse;
  return val % 2 ? fnTrue() : fnFalse();
}