const gulp = require('gulp');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const { series } = require('gulp');
const browserSync = require('browser-sync').create();

const style = () => {
  return gulp.src('./src/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./src/'))
    .pipe(browserSync.stream());
}

const view = () => {
  return gulp.src('./src/**/*.pug')
  .pipe(pug({
    pretty: true
  }))
  .pipe(gulp.dest('./src'))
  .pipe(browserSync.stream())
}

const watch = () => {
  browserSync.init({
    server: {
      baseDir: './src'
    }
  });
  gulp.watch('./src/**/*.scss', style);
  gulp.watch('./src/**/*.pug', view);
  gulp.watch('./src/**/*.html')
    .on('change', browserSync.reload);
}

exports.style = style;
exports.view = view;
exports.watch = watch;
exports.build = series(style, view, watch);