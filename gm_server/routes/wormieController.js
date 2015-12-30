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

    gm(dir + '/wormie2.png')
    .resize(50, 72)
    .transparent('white')
    .fuzz(50)
    .fill('white')
    .opaque('green')
    .fill(hex)
    .opaque('red')
    .write(dir + newFile, function (err) {
      if (err) return console.dir(arguments);
    });

    gm(dir + '/left.png')
    .resize(50, 72)
    .transparent('white')
    .fuzz(50)
    .fill('white')
    .opaque('green')
    .fill(hex)
    .opaque('red')
    .write(dir + '/left' + left, function (err) {
      if (err) return console.dir(arguments);
    });

    gm(dir + '/right.png')
    .resize(50, 72)
    .transparent('white')
    .fuzz(50)
    .fill('white')
    .opaque('green')
    .fill(hex)
    .opaque('red')
    .write(dir + '/right' + right, function (err) {
      if (err) return console.dir(arguments);
    });

    res.status(200).send(dir);

  }

};
