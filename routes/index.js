'use strict'
var fs = require('fs')
var path = require('path')

var express = require('express');
var router = express.Router();

module.exports = function (example_root) {

    var base = example_root
    router.get('/', function (req, res) {

        var file = decodeURI(req.query.file || '')

        if (file) {
            var code = fs.readFileSync(path.join(example_root, file), 'utf-8')
        }

        res.render('index', {
            root: base,
            code: code || '',
            link: file || ''
        });
    });

    router.post('/dir', function (req, res) {
        var p = decodeURI(req.body.dir)

        console.log('logs', p);
        var dir = path.join(example_root, p)

        var r = '<ul class="jqueryFileTree" style="display: none;">';
        try {
            r = '<ul class="jqueryFileTree" style="display: none;">';
            var files = fs.readdirSync(dir);
            files.forEach(function (f) {
                var ff = dir + f;
                var stats = fs.statSync(ff)
                var rel = path.relative(example_root, ff)
                if (stats.isDirectory()) {

                    r += '<li class="directory collapsed"><a href="#" rel="' + rel + '/">' + f + '</a></li>';
                } else {
                    var e = path.extname(ff)
                    if (e !== '.js') return
                    r += '<li class="file ext_' + e + '"><a href="#" rel="' + rel + '">' + f + '</a></li>';
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


    return router
};
