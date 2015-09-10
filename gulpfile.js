/* global require, console */
var gulp = require('gulp');

var styluscompile = require('gulp-stylus');
var jadecompile = require('gulp-jade-php');
var rename = require("gulp-rename");
var cached = require('gulp-cached');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync').create();
var beautify = require('gulp-prettify');
var koutoSwiss = require('kouto-swiss');
var rupture      = require('rupture');

//CHANGE THESE TO YOUR SPECIFIC FOLDER STRUCTURE!
var htdocsPath = 'C:/xampp/htdocs/';
var wpInstallName = 'wordpress4';
var themeName = 'jastyleet';

var themesPath = htdocsPath +  wpInstallName + '/wp-content/themes/';

var SRC = themesPath + themeName;
var DIST = themesPath + themeName;

gulp.task('serve', function() {
    cached.caches = {};
    browserSync.init({
         proxy: "localhost/" + wpInstallName
    });

    gulp.watch( SRC + '/**/*.styl', ['stylecompile']);
    gulp.watch( SRC + '/**/*.jade', ['jadecompile']);
    gulp.watch( SRC + '/**/*.php').on('change', browserSync.reload);
});

gulp.task('stylecompile', function() {
    var options = {
        use: [ koutoSwiss(), rupture() ]
    };
    gulp.src(SRC + '/stylus/style.styl')
        .pipe(plumber())
        .pipe(styluscompile(options))
        .pipe(gulp.dest(DIST))
        .pipe(browserSync.stream());
});

gulp.task('jadecompile', function() {
    gulp.src(SRC + '/jade/*.jade')
        .pipe(cached('jade'))
        .pipe(plumber())
        .pipe(jadecompile())
        .pipe(rename(function(file){
            //file.extname = ".php";
            console.log('Compiled:',file.basename);
        }))
        .pipe(beautify({indentSize: 2}))
        .pipe(gulp.dest(DIST))
        .pipe(browserSync.stream());
});