// Graphics magick
var fs = require('fs');
var gm = require('gm');
var dir = __dirname + '/img';
var express = require('express');

module.exports = {

  getHex: function (req, res, next) {
    req.hex = req.params.hexcode;
    next();
  },

  createImage: function (req, res, next) {

    var hex = '#' + req.hex;
    var newFile = '/' + req.hex +'.png';

    var left = '/' + req.hex +'.png';
    var right = '/' + req.hex +'.png';

    gm(dir + '/wormieBig.png')
    .transparent('white')
    .fuzz(100)
    .fill('white')
    .opaque('green')
    .fill(hex)
    .opaque('red')
    .resize(50, 72)
    .write(dir + newFile, function (err) {
      if (err) return console.dir(arguments);
    });

    gm(dir + '/leftBig.png')
    .transparent('white')
    .fuzz(100)
    .fill('white')
    .opaque('green')
    .fill(hex)
    .opaque('red')
    .resize(50, 72)
    .write(dir + '/left' + left, function (err) {
      if (err) return console.dir(arguments);
    });

    gm(dir + '/rightBig.png')
    .transparent('white')
    .fuzz(100)
    .fill('white')
    .opaque('green')
    .fill(hex)
    .opaque('red')
    .resize(50, 72)
    .write(dir + '/right' + right, function (err) {
      if (err) return console.dir(arguments);
    });

    res.status(200).send(dir);

  }

};
