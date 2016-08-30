var gulp = require('gulp'),
    stylus = require('gulp-stylus');
var uglify = require('gulp-uglify');
var browserify = require('browserify');
var path = require('path');
var concat = require('gulp-concat');
var watchify = require('watchify');
var rename = require('gulp-rename');
var fs = require('fs');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var merge = require('merge-stream');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var less = require('gulp-less');
var babel= require('gulp-babel');
var JSSrc = './resource/js/*.js';
var JSDest = './public/js/compressed';

//
//var jade = require('gulp-jade');
//
//gulp.task('jade', function() {
//  return gulp.src('./resource/views/**/*.jade')
//    .pipe(jade())
//    .pipe(gulp.dest('./resource/html'));
//});
//
//gulp.task('watch', function() {
//  gulp.watch('**/*.jade', ['jade']);
//});

gulp.task('minifyjs', function() {
    return gulp.src([JSSrc,'./resource/js/**/*.js'])
      .pipe(babel({
          presets: ['es2015']
        }))
      .pipe(gulp.dest(JSDest));
});

gulp.task('browserify.js', function () {
  var tasks = fs.readdirSync(JSDest).filter(function (fileName) {
    return fs.lstatSync(JSDest  + '/' + fileName).isFile();
  }).map(function (fileName) {
    return browserify(JSDest  + '/' + fileName, {debug: true})
      .bundle()
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .pipe(source(fileName))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      //.pipe(uglify())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('./public/js'))
      .on('end', gutil.log.bind(gutil, 'browserify \'' + path.join(JSDest, fileName) + '\'.'));
  });
  return merge(tasks);
});

gulp.task('watch.browserify.js', function () {
  function watch(fileName, dest) {
    var b = watchify(browserify(fileName, {debug: true, cache: {}, packageCache: {}, fullPaths: true}));
    var destPath = path.join('./public/js', dest);

    function bundle() {
      return b.bundle()
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(source(dest))
        .pipe(gulp.dest('./public/js'))
        .on('end', gutil.log.bind(gutil, 'browserify \'' + destPath + '\'.'));
    }

    b.on('update', bundle);
    b.on('log', gutil.log);
    return bundle();
  }

  var tasks = fs.readdirSync(JSDest).filter(function (fileName) {
    return fs.lstatSync(JSDest + '/' + fileName).isFile();
  }).map(function (fileName) {
    return watch(JSDest + '/' + fileName, fileName);
  });
  return merge(tasks);
});

gulp.task('testLess', function(){
  gulp.src(['./resource/less/*.less', '!./resource/less/**/{reset,test}.less'])
      .pipe(sourcemaps.init())
      .pipe(less())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('./public/css'));

})
gulp.task('LessWatch', function () {
  gulp.watch('./resource/**/*.less', ['testLess'])//当所有less文件发生改变时，调用testLess任务
});
gulp.task('build', ['minifyjs', 'browserify.js','testLess']);
gulp.task('watch', ['watch.browserify.js','LessWatch'],function(){
  gulp.watch('./resource/js/**/*.js', ['minifyjs']);
});