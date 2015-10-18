/**
 * Easy Gulpfile
 *
 * For simple and efficient frontend development without much overhead
 * Includes Sass, Jade and handling scripts
 * @author Philipp Nueesch for Rhinerock
 * @email phil@rhinerock.com
 * @url http://rhinerock.com
 * @license MIT
 */
'use strict';

// Requiring in the modules

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var maps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var clean = require('del');
var rename = require('gulp-rename');
var minify = require('gulp-minify-css');
var jade = require('gulp-jade');

// Handling Sass and CSS

gulp.task('compile:sass', function() {
  return gulp.src('src/scss/main.scss')
    .pipe(maps.init())
    .pipe(sass())
    .pipe(maps.write('./'))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('minify:css', ['compile:sass'], function() {
  return gulp.src('dist/css/main.css')
    .pipe(minify())
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest('dist/css'));
});

// Handling scripts

gulp.task('concat:scripts', function() {
  return gulp.src(['bower_components/jquery/dist/jquery.js',
            'bower_components/fastclick/lib/fastclick.js',
            'bower_components/foundation/js/foundation.js',
            'src/js/**/*.js'])
    .pipe(maps.init())
    .pipe(concat('app.js'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('copy:scripts', function() {
  return gulp.src(['bower_components/modernizr/modernizr.js'])
    .pipe(gulp.dest('dist/js'));
});

gulp.task('minify:scripts', ['concat:scripts', 'copy:scripts'], function() {
  return gulp.src('dist/js/**/*.js')
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist/js'));
});

// Jade templates

gulp.task('compile:jade', function() {
  return gulp.src('src/jade/*.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('dist'));
});

// Asset transfer

gulp.task('transfer:img', function() {
  gulp.src('src/img/**/*.{png,jpg,gif}', { base: 'src'})
    .pipe(gulp.dest('dist'));
});

gulp.task('transfer:assets', function() {
  gulp.src('src/assets/**/*', { base: 'src'})
    .pipe(gulp.dest('dist'));
});

// Cleaning up

gulp.task('clean', function() {
  clean(['dist']);
});

// Building application

gulp.task('build', ['minify:css', 'minify:scripts', 'compile:jade', 'transfer:img', 'transfer:assets']);

// Development Pipeline

gulp.task('serve', function() {
  gulp.watch('src/scss/**/*.scss', ['compile:sass']);
  gulp.watch('src/js/**/*.js', ['concat:scripts']);
  gulp.watch('src/jade/**/*.jade', ['compile:jade']);
  gulp.watch('src/img/**/*.{png,jpg,gif}', ['transfer:img']);
  gulp.watch('src/assets/**/*', ['transfer:assets']);
});

// Build tasks

gulp.task('default', ['clean'], function() {
  gulp.start('build');
});