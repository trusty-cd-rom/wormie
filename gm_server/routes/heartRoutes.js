var heartController = require('./heartController');

module.exports = function(app) {
  app.param('hexcode', heartController.getHex);
  app.post('/:hexcode', heartController.createHeart);
};
