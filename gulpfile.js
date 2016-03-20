var gulp = require('gulp');
var gutil = require('gulp-util');
var gulpif = require('gulp-if');
var autoprefixer = require('gulp-autoprefixer');
var cssmin = require('gulp-cssmin');
var less = require('gulp-less');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var merge = require('merge-stream');
var plumber = require('gulp-plumber');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var babelify = require('babelify');
var browserify = require('browserify');
var watchify = require('watchify');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

var production = process.env.NODE_ENV === 'production';

var dependencies = [
  'alt',
  'react',
  'react-dom',
  'react-router',
  'underscore'
];

/*
 |--------------------------------------------------------------------------
 | Combine all JS libraries into a single file for fewer HTTP requests.
 |--------------------------------------------------------------------------
 */
gulp.task('vendor', function() {
  return gulp.src([
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/bootstrap/dist/js/bootstrap.min.js',
    'node_modules/toastr/toastr.js',
    'node_modules/lightgallery/dist/js/lightgallery.min.js',
    'node_modules/lightgallery/dist/js/lg-thumbnail.min.js',
    'utils/frontend.js'
  ]).pipe(concat('vendor.js'))
    .pipe(gulpif(production, uglify({ mangle: false })))
    .pipe(gulp.dest('public/js'));
});

/*
 |--------------------------------------------------------------------------
 | Compile third-party dependencies separately for faster performance.
 |--------------------------------------------------------------------------
 */
gulp.task('browserify-vendor', function() {
  return browserify()
    .require(dependencies)
    .bundle()
    .pipe(source('vendor.bundle.js'))
    .pipe(buffer())
    .pipe(gulpif(production, uglify({ mangle: false })))
    .pipe(gulp.dest('public/js'));
});

/*
 |--------------------------------------------------------------------------
 | Compile only project files, excluding all third-party dependencies.
 |--------------------------------------------------------------------------
 */
gulp.task('browserify', ['browserify-vendor'], function() {
  return browserify({ entries: 'app/main.js', debug: true })
    .external(dependencies)
    .transform(babelify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(gulpif(production, uglify({ mangle: false })))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('public/js'));
});

/*
 |--------------------------------------------------------------------------
 | Same as browserify task, but will also watch for changes and re-compile.
 |--------------------------------------------------------------------------
 */
gulp.task('browserify-watch', ['browserify-vendor'], function() {
  var bundler = watchify(browserify({ entries: 'app/main.js', debug: true }, watchify.args));
  bundler.external(dependencies);
  bundler.transform(babelify);
  bundler.on('update', rebundle);
  return rebundle();

  function rebundle() {
    var start = Date.now();
    return bundler.bundle()
      .on('error', function(err) {
        gutil.log(gutil.colors.red(err.toString()));
      })
      .on('end', function() {
        gutil.log(gutil.colors.green('Finished rebundling in', (Date.now() - start) + 'ms.'));
      })
      .pipe(source('bundle.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('public/js/'));
  }
});

/*
 |--------------------------------------------------------------------------
 | Compile stylesheets.
 |--------------------------------------------------------------------------
 */
gulp.task('fonts', function() {
  return gulp.src([
    'node_modules/bootstrap/dist/fonts/*',
    'node_modules/lightgallery/dist/fonts/*',
    'node_modules/font-awesome/fonts/*'
  ])
  .pipe(gulp.dest('public/fonts/'));
});

gulp.task('img', function() {
  return gulp.src([
    'node_modules/lightgallery/dist/img/*',
  ])
  .pipe(gulp.dest('public/img/'));
})

gulp.task('styles', function() {
  var lessStream = gulp.src('app/stylesheets/main.less')
    .pipe(plumber())
    .pipe(less());

  var scssStream = gulp.src('app/stylesheets/app.scss')
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError));

  var cssStream = gulp.src([
    'node_modules/lightgallery/dist/css/lightgallery.min.css',
    'node_modules/font-awesome/css/font-awesome.min.css',
    'app/stylesheets/*.css'
    ]);

  var mergedStream = merge(cssStream, lessStream, scssStream)
    .pipe(concat('styles.css'))
    .pipe(autoprefixer())
    .pipe(gulpif(production, cssmin()))
    .pipe(gulp.dest('public/css'));

  return mergedStream;
});


gulp.task('watch', function() {
  gulp.watch([
    'app/stylesheets/**/*.less',
    'app/stylesheets/**/*.scss'
  ], ['styles']);
});

gulp.task('default', ['styles', 'vendor', 'fonts', 'img', 'browserify-watch', 'watch']);
gulp.task('build', ['styles', 'vendor', 'fonts', 'img', 'browserify']);
