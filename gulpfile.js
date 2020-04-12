/*jslint node */

// Get Node modules
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');

function minify(callback) {
    'use strict';
    gulp.src('dist/index.js')
        .pipe(uglify({compress: {drop_console: false}}).on('error', function (e) {
            console.log(e);
        }))
        .pipe(rename('sacoronavirus-link.min.js'))
        .pipe(gulp.dest('./dist'));
    callback();
}

exports.default = gulp.parallel(minify);
