// Graphics magick
var fs = require('fs');
var gm = require('gm');
var dir = __dirname + '/img/heart';
var express = require('express');

module.exports = {

  getHex: function (req, res, next) {
    var codes = req.params.hexcode.split('_');
    req.hexOne = codes[0];
    req.hexTwo = codes[1];
    next();
  },

  createHeart: function (req, res, next) {

    var hexOne = '#' + req.hexOne;
    var hexTwo = '#' + req.hexTwo;

    var newFile = '/' + req.hexOne + '_' + req.hexTwo + '.png';

    console.log(newFile);

    gm(dir + '/heart3.png')
    .transparent('white')
    .fuzz(50)
    .fill('white')
    .opaque('green')
    .fill(hexOne)
    .opaque('blue')
    .fill(hexTwo)
    .opaque('red')
    .write(dir + newFile, function (err) {
      if (err) return console.dir(arguments);
      res.status(200).send('wormie created successfully');

    });


  }

};
