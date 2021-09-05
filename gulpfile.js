const { src, dest, series, watch } = require('gulp');
const webserver = require('gulp-webserver');
const postcss = require('gulp-postcss');
const cssnext = require('postcss-cssnext');
const gutil = require('gulp-util');
const sourcemaps = require('gulp-sourcemaps');

const source = 'process/css/';
const destination = 'builds/nextgen/';

const html = cb => {
    src(destination + '*.html');
    cb();
} 

const css = cb => {

  src(source + 'style.css')
  .pipe(sourcemaps.init())
  .pipe(postcss([
    require('postcss-partial-import')({prefix: '_', extension: '.css'}),
    cssnext()
  ]))
  .on('error', gutil.log)
  .pipe(sourcemaps.write('.'))
  .pipe(dest(destination + 'css'));

  cb();

};

// const server = cb => {
//   src(destination)
//     .pipe(webserver({
//       livereload: true,
//       port: 3000,
//       open: true
//     }));

//   cb();    
// };

const watcher = cb => {
    watch(source + '**/*.css').on('change', series(css));
    watch(dest + '**/*.html').on('change', series(html));
    cb();
}

exports.default = series(html, css, watcher);
