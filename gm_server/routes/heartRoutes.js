var heartController = require('./heartController');

module.exports = function(app) {
  app.param('hexcode', heartController.getHex);
  app.get('/:hexcode', heartController.createHeart);
};
