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

    gm(dir + '/black.png')
    .fuzz(50)
    .fill(hex)
    .opaque('black')
    .transparent('white')
    .write(dir + newFile, function (err) {
      if (err) return console.dir(arguments);
      res.status(200).send('wormie created successfully');

    });


  }

};
