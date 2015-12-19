// returns random number in range
var randomInRange = function(value) {
  var flip = Math.random();
  var random = Math.random() * value;
  return flip > 0.5 ? random : random * -1;
};

module.exports = randomInRange;
