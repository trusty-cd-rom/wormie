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

  hexToRGB(hex){
    hex = hex.slice(1);
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;
    return [r,g,b];
  },

};

// console.log(colorUtil.rgbToHex(20,20,20));

module.exports = colorUtil;
