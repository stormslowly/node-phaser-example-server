'use strict'
var fs = require('fs')
var path = require('path')

var express = require('express');
var router = express.Router();

var config = require('../config.json')

router.get('/', function (req, res) {
    res.render('index', {
        title: 'Express'
    });
});

var base = config.examples_root
router.post('/dir', function (req, res) {
    var p = req.body.dir

    var dir = p

    var r = '<ul class="jqueryFileTree" style="display: none;">';
    try {
        r = '<ul class="jqueryFileTree" style="display: none;">';
        var files = fs.readdirSync(dir);
        files.forEach(function (f) {
            var ff = dir + f;
            var stats = fs.statSync(ff)
            if (stats.isDirectory()) {
                r += '<li class="directory collapsed"><a href="#" rel="' + ff + '/">' + f + '</a></li>';
            } else {
                var e = f.split('.')[1];
                r += '<li class="file ext_' + e + '"><a href="#" rel=' + ff + '>' + f + '</a></li>';
            }
        });
        r += '</ul>';
    } catch (e) {
        console.error('logs', e);
        r += 'Could not load directory: ' + dir;
        r += '</ul>';
    }
    res.send(r)
})

module.exports = router;
