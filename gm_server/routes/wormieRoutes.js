var wormieController = require('./wormieController.js');

module.exports = function(app) {
  app.param('hexcode', wormieController.getHex);
  app.get('/:hexcode', wormieController.createImage);
};
