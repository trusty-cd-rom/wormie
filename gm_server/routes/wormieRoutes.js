var wormieController = require('./wormieController.js');

module.exports = function(app) {
  app.param('hexcode', wormieController.getHex);
  app.post('/:hexcode', wormieController.createImage);
};
