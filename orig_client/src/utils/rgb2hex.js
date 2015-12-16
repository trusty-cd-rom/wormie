var colorUtil = {

  componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  },

  rgbToHex(r, g, b) {
    var result = "#" + this.componentToHex(Math.floor(r)) + this.componentToHex(Math.floor(g)) + this.componentToHex(Math.floor(b));
    console.log(result);
    return result;
  },
};

// console.log(colorUtil.rgbToHex(20,20,20));

module.exports = colorUtil;
