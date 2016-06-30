var gulp        = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass        = require('gulp-sass'),
    concat      = require('gulp-concat'),
    cssmin      = require('gulp-clean-css'),
    uglify      = require('gulp-uglify'),
    watch       = require('gulp-watch'),
    cache       = require('gulp-cache'),
    rename      = require('gulp-rename'),
    imagemin    = require('gulp-imagemin'),
    notify      = require('gulp-notify'),
    del         = require('del');


gulp.task('browser-sync', function(){
    browserSync.init({
      server: {
        baseDir: './'
      }
    });
});

gulp.task('css', function(){
  return gulp.src('src/scss/*.scss')
    .pipe(sass())
    .pipe(concat('style.css'))
    .pipe(gulp.dest('assets/css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(cssmin())
    .pipe(gulp.dest('assets/css'))
    .pipe(notify({ message: 'CSS task complete' }));
});


gulp.task('scripts', function(){
  return gulp.src('src/scripts/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('assets/js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('assets/js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('images', function() {
  return gulp.src('assets/img/*.png')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('assets/img/dist'))
    .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('default', ['clean', 'css', 'scripts', 'images']);

gulp.task('watch', ['browser-sync'], function (){
  gulp.watch('src/scss/**/*.scss', ['css']);
  gulp.watch('src/scripts/*.js',['scripts']);
  gulp.watch('assets/img/*.png', ['images']);

  gulp.watch(['assets/**']).on('change', browserSync.reload);
  gulp.watch(['./*.html']).on('change', browserSync.reload);
});

gulp.task('clean', function() {
  return del(['assets/css/*.css', 'assets/js/*.js', 'assets/img/dist/*']);
});
