const gulp = require('gulp');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const browserSync = require('browser-sync').create();

const style = () => {
  return gulp.src('./*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./'))
    .pipe(browserSync.stream());
}

const view = () => {
  return gulp.src('./*.pug')
  .pipe(pug({
    pretty: true
  }))
  .pipe(gulp.dest('./'))
  .pipe(browserSync.stream())
}

const watch = () => {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
  gulp.watch('./*.scss', style);
  gulp.watch('./*.pug', view);
  gulp.watch('./*.html')
    .on('change', browserSync.reload);
}

exports.style = style;
exports.view = view;
exports.watch = watch;