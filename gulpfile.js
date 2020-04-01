/*jslint node */

// Get Node modules
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');

function dist(callback) {
    'use strict';

    gulp.src('index.js')
        .pipe(rename('sacoronavirus-link.js'))
        .pipe(gulp.dest('./dist'));
    callback();
}

function minify(callback) {
    'use strict';

    gulp.src('index.js')
        .pipe(uglify({compress: {drop_console: true}}).on('error', function (e) {
            console.log(e);
        }))
        .pipe(rename('sacoronavirus-link.min.js'))
        .pipe(gulp.dest('./dist'));
    callback();
}

exports.default = gulp.parallel(dist, minify);
