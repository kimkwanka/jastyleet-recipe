/* global require, console */
var gulp = require('gulp');
var watch = require('gulp-watch');
var batch = require('gulp-batch');


var styluscompile   = require('gulp-stylus');
var jadecompile     = require('gulp-phpjade-mod');
var rename          = require("gulp-rename");
var cached          = require('gulp-cached');
var plumber         = require('gulp-plumber');
var replace         = require('gulp-replace');
var browserSync     = require('browser-sync').create();
var beautify        = require('gulp-prettify');
var koutoSwiss      = require('kouto-swiss');
var rupture         = require('rupture');


//CHANGE THESE TO YOUR MATCH YOUR SPECIFIC FOLDER STRUCTURE!
var htdocsPath      = 'C:/xampp/htdocs';
var wpInstallName   = 'wordpress_de';
var themeName       = 'hanachu';
var mainStylusFile  = 'style.styl';

var themesPath = htdocsPath + '/' +  wpInstallName + '/wp-content/themes/';

var SRC = themesPath + themeName;
var DIST = themesPath + themeName;

gulp.task('default', function() {
    var argv            = require('yargs').argv;
    if (argv.w){
        wpInstallName = argv.w;
    }
    if (argv.t){
        themeName = argv.t;
    }

    themesPath = htdocsPath + '/' +  wpInstallName + '/wp-content/themes/';
    SRC = themesPath + themeName;
    DIST = themesPath + themeName;

    cached.caches = {};
    browserSync.init({
        proxy: "localhost/" + wpInstallName
    });

    watch(SRC + '/**/*.styl', batch(function (events, done) {
        gulp.start('stylecompile', done);
    }));
    watch(SRC + '/**/*.jade', batch(function (events, done) {
        gulp.start('jadecompile', done);
    }));
    watch(SRC + '/**/*.php', batch(function (events, done) {
        browserSync.reload();
    }));
});

gulp.task('stylecompile', function() {
    var options = {
        use: [ koutoSwiss(), rupture() ]
    };
    gulp.src(SRC + '/stylus/' + mainStylusFile)
        .pipe(plumber())
        .pipe(styluscompile(options))
        .pipe(rename(function(file){
            file.basename = 'style';
            console.log('Compiled:',file.basename);
        }))
        .pipe(gulp.dest(DIST))
        .pipe(browserSync.stream());
});

gulp.task('jadecompile', function() {
    gulp.src(SRC + '/jade/*.jade')
        .pipe(cached('jade'))
        .pipe(plumber())
        .pipe(replace('--',':php'))
        .pipe(jadecompile())
        .pipe(rename(function(file){
            console.log('Compiled:',file.basename);
        }))
        .pipe(beautify({indentSize: 2}))
        .pipe(gulp.dest(DIST))
        .pipe(browserSync.stream());
});
